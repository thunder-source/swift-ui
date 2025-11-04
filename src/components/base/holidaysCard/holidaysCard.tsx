import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { defaultDateFormatter } from "@/utils/dateFormatter";
import { memo, useMemo } from "react";
import type { ComponentPropsWithoutRef, FC } from "react";

/**
 * Represents a single holiday entry with comprehensive type safety.
 */
interface HolidayMember {
	/** Unique identifier for the holiday member */
	readonly id: string;
	/** Display name of the person */
	readonly name: string;
	/** Optional job title or position */
	readonly position?: string;
	/** Profile image URL */
	readonly img?: string;
	/** ISO date string for the holiday date */
	readonly date?: string;
}

/**
 * Props for the HolidaysCard component with improved type safety.
 */
interface HolidaysCardProps
	extends Omit<ComponentPropsWithoutRef<"section">, "children"> {
	/** Array of holiday members to display */
	readonly members: readonly HolidayMember[];
	/** Loading state for skeleton display */
	readonly isLoading?: boolean;
	/** Maximum number of members to display */
	readonly maxItems?: number;
	/** Custom empty state message */
	readonly emptyMessage?: string;
	/** Custom date formatter function */
	readonly dateFormatter?: (date: string) => string;
	/** Custom test ID for testing */
	readonly "data-testid"?: string;
}

/**
 * Validates holiday member data structure.
 *
 * @param member - Holiday member to validate
 * @returns True if valid, false otherwise
 */
const isValidHolidayMember = (member: HolidayMember): boolean => {
	return Boolean(member.id && member.name);
};

/**
 * Skeleton component for loading states.
 */
const HolidayMemberSkeleton: FC = () => (
	<li className="flex bg-[hsla(var(--bg-light),0.5)] border-[hsl(var(--bg-light))] p-1.5 pr-3.5 rounded-md border items-center gap-4">
		<Skeleton className="w-8 h-8 rounded-md" />
		<div className="flex justify-between items-center w-full">
			<div className="space-y-1">
				<Skeleton className="h-3 w-20" />
			</div>
			<Skeleton className="h-2 w-16" />
		</div>
	</li>
);

/**
 * Individual holiday member item component.
 */
const HolidayMemberItem: FC<{
	readonly member: HolidayMember;
	readonly dateFormatter: (date: string) => string;
}> = memo(({ member, dateFormatter }) => {
	const formattedDate = useMemo(() => {
		return member.date ? dateFormatter(member.date) : "—";
	}, [member.date, dateFormatter]);

	return (
		<li
			className="flex bg-[hsla(var(--bg-light),0.5)] border-[hsl(var(--bg-light))] p-1.5 pr-3.5 rounded-md border items-center gap-4 transition-colors hover:bg-[hsla(var(--bg-light),0.7)]"
			data-testid={`holiday-member-${member.id}`}
		>
			<Avatar size="sm" variant="square">
				<AvatarImage
					src={member.img}
					alt={`${member.name}'s profile image`}
					loading="lazy"
				/>
				<AvatarFallback aria-label={`${member.name} initials`}>
					{member.name.charAt(0).toUpperCase()}
				</AvatarFallback>
			</Avatar>

			<div className="flex justify-between items-center w-full min-w-0">
				<div className="min-w-0 flex-1">
					<p className="text-xs text-[hsl(var(--text-dark))] font-semibold truncate">
						{member.name}
					</p>
					{member.position && (
						<p className="text-[10px] text-[hsl(var(--text-medium))] truncate">
							{member.position}
						</p>
					)}
				</div>
				<time
					dateTime={member.date}
					className="text-[10px] font-light text-[hsl(var(--text-medium))] whitespace-nowrap ml-2"
					title={member.date ? `Holiday date: ${formattedDate}` : undefined}
				>
					{formattedDate}
				</time>
			</div>
		</li>
	);
});

HolidayMemberItem.displayName = "HolidayMemberItem";

/**
 * HolidaysCard component displays upcoming holidays with member avatars and info.
 *
 * Features:
 * - Skeleton loading states
 * - Accessibility compliance
 * - Performance optimizations
 * - Type safety
 *
 * @example
 * ```tsx
 * const members = [
 *   { id: '1', name: 'John Doe', date: '2024-12-25', position: 'Developer' }
 * ];
 *
 * <HolidaysCard
 *   members={members}
 *   isLoading={false}
 * />
 * ```
 */
const HolidaysCard: FC<HolidaysCardProps> = memo(
	({
		members,
		isLoading = false,
		maxItems = 10,
		emptyMessage = "No upcoming holidays.",
		dateFormatter = defaultDateFormatter,
		className = "",
		"data-testid": testId = "holidays-card",
		...sectionProps
	}) => {
		// Memoize filtered and validated members
		const validMembers = useMemo(() => {
			return members.filter(isValidHolidayMember).slice(0, maxItems);
		}, [members, maxItems]);

		const hasMembers = validMembers.length > 0;
		const showSkeleton = isLoading;

		// Generate skeleton items
		const skeletonItems = useMemo(() => {
			return Array.from({ length: Math.min(3, maxItems) }, (_) => (
				<HolidayMemberSkeleton key={`skeleton-${_}`} />
			));
		}, [maxItems]);

		return (
			<section
				{...sectionProps}
				className={`p-6 w-full card space-y-4 ${className}`}
				aria-label="Upcoming Holidays"
				data-testid={testId}
			>
				<header className="flex justify-between items-center">
					<h2 className="text-lg font-semibold" id="holidays-heading">
						Upcoming Holidays
					</h2>
				</header>

				<div aria-labelledby="holidays-heading" data-testid="holidays-list">
					{showSkeleton ? (
						<div className="space-y-4 p-4 card shadow-none rounded-lg">
							<ul className="space-y-4" aria-label="Loading holidays">
								{skeletonItems}
							</ul>
						</div>
					) : !hasMembers ? (
						<p className="text-sm text-gray-500" data-testid="empty-state">
							{emptyMessage}
						</p>
					) : (
						<div className="space-y-4 p-4 card shadow-none rounded-lg">
							<ul
								className="space-y-4"
								aria-label={`${validMembers.length} upcoming holidays`}
							>
								{validMembers.map((member) => (
									<HolidayMemberItem
										key={member.id}
										member={member}
										dateFormatter={dateFormatter}
									/>
								))}
							</ul>
						</div>
					)}
				</div>
			</section>
		);
	},
);

HolidaysCard.displayName = "HolidaysCard";

export {
	HolidaysCard,
	isValidHolidayMember,
	type HolidayMember,
	type HolidaysCardProps,
};
