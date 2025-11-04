import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/dateFormatter";
import { Calendar } from "lucide-react";
import type { ComponentPropsWithoutRef, FC } from "react";
import { memo, useMemo } from "react";

/**
 * Represents a team member with birthday information.
 * @interface BirthdayMember
 */
export interface BirthdayMember {
	/** Unique identifier for the member */
	readonly id: string;
	/** Full name of the team member */
	readonly name: string;
	/** Job position or role (optional) */
	readonly position?: string;
	/** Profile image URL (optional) */
	readonly img?: string;
	/** Birthday date in ISO format (optional) */
	readonly date?: string;
	/** Additional member metadata (optional) */
	readonly metadata?: Record<string, unknown>;
}

/**
 * Loading state configuration for the component.
 */
interface LoadingState {
	/** Whether the component is in loading state */
	readonly isLoading: boolean;
	/** Number of skeleton items to show during loading */
	readonly skeletonCount?: number;
}

/**
 * Props for the TeamBirthdayList component.
 * @interface TeamBirthdayListProps
 */
export interface TeamBirthdayListProps
	extends ComponentPropsWithoutRef<"section"> {
	/** Array of team members with birthday information */
	readonly members: readonly BirthdayMember[];
	/** Loading state configuration */
	readonly loading?: LoadingState;
	/** Custom empty state message */
	readonly emptyMessage?: string;
	/** Maximum number of members to display */
	readonly maxMembers?: number;
	/** Whether to show member positions */
	readonly showPositions?: boolean;
	/** Whether to show birthday dates */
	readonly showDates?: boolean;
	/** Custom date format function */
	readonly formatDateFn?: (date: string) => string;
	/** Accessible label for the section */
	readonly sectionLabel?: string;
}

/**
 * Skeleton loading component for individual birthday member items.
 */
const BirthdayMemberSkeleton: FC = memo(() => (
	<li className="flex items-center gap-4 p-2">
		<Skeleton className="h-10 w-10 rounded-md" />
		<div className="flex-1 space-y-1">
			<Skeleton className="h-4 w-24" />
			<Skeleton className="h-3 w-20" />
		</div>
		<Skeleton className="h-3 w-16" />
	</li>
));
BirthdayMemberSkeleton.displayName = "BirthdayMemberSkeleton";

/**
 * Individual birthday member item component with optimized rendering.
 */
const BirthdayMemberItem: FC<{
	readonly member: BirthdayMember;
	readonly showPosition: boolean;
	readonly showDate: boolean;
	readonly formatDateFn: (date: string) => string;
}> = memo(({ member, showPosition, showDate, formatDateFn }) => {
	const initials = useMemo(() => {
		const nameParts = member.name.trim().split(" ");
		return nameParts.length > 1
			? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
			: member.name.slice(0, 2).toUpperCase();
	}, [member.name]);

	return (
		<li className="flex items-center gap-4 p-2 rounded-lg hover:bg-[hsl(var(--bg-light))] transition-colors duration-200">
			<Avatar
				variant="square"
				className="h-10 w-10 rounded-md border border-[hsl(var(--border-grey))]"
			>
				<AvatarImage
					src={member.img}
					alt={`${member.name}'s profile picture`}
					loading="lazy"
					className="object-cover"
				/>
				<AvatarFallback
					variant="square"
					className="bg-[hsl(var(--primary-blue))] text-white text-sm font-medium"
					aria-label={`${member.name} initials`}
				>
					{initials}
				</AvatarFallback>
			</Avatar>

			<div className="flex justify-between items-center w-full min-w-0">
				<div className="flex-1 min-w-0">
					<h3 className="text-[12px] font-semibold text-[hsl(var(--text-dark))] truncate">
						{member.name}
					</h3>
					{showPosition && (
						<p className="text-[10px] font-light text-[hsl(var(--text-medium))] truncate">
							{member.position || "—"}
						</p>
					)}
				</div>

				{showDate && member.date && (
					<time
						dateTime={member.date}
						className="text-[10px] text-light text-[hsl(var(--text-light))] flex items-center gap-1 flex-shrink-0"
						aria-label={`Birthday: ${formatDateFn(member.date)}`}
					>
						<Calendar className="h-3 w-3" aria-hidden="true" />
						{formatDateFn(member.date)}
					</time>
				)}
			</div>
		</li>
	);
});
BirthdayMemberItem.displayName = "BirthdayMemberItem";

/**
 * TeamBirthdayList displays team members with upcoming birthdays in an accessible,
 * performant component with loading states and customizable display options.
 *
 * @example
 * ```tsx
 * <TeamBirthdayList
 *   members={birthdayMembers}
 *   loading={{ isLoading: false }}
 *   maxMembers={5}
 *   showPositions={true}
 *   showDates={true}
 * />
 * ```
 */
export const TeamBirthdayList: FC<TeamBirthdayListProps> = memo(
	({
		members,
		loading = { isLoading: false, skeletonCount: 3 },
		emptyMessage = "No upcoming birthdays.",
		maxMembers,
		showPositions = true,
		showDates = true,
		formatDateFn = formatDate,
		sectionLabel = "Team Birthday List",
		className,
		...sectionProps
	}) => {
		// Memoize displayed members to prevent unnecessary re-renders
		const displayedMembers = useMemo(() => {
			if (loading.isLoading) return [];
			return maxMembers ? members.slice(0, maxMembers) : members;
		}, [members, maxMembers, loading.isLoading]);

		const hasMoreMembers = useMemo(
			() => maxMembers && members.length > maxMembers,
			[maxMembers, members.length],
		);

		return (
			<section
				{...sectionProps}
				className={cn(
					"p-4 border border-[hsl(var(--border-grey))] rounded-lg shadow-sm",
					"bg-[hsl(var(--bg-white))] space-y-4 transition-all duration-200",
					className,
				)}
				aria-label={sectionLabel}
			>
				<header className="flex w-full justify-between items-center">
					<h2 className="text-lg font-bold text-[hsl(var(--text-dark))]">
						Team's Birthday
					</h2>
					<Select defaultValue="today">
						<SelectTrigger variant="dark" className="w-[120px]">
							<SelectValue placeholder="Select date" />
						</SelectTrigger>
						<SelectContent variant="dark">
							<SelectItem value="today">Today</SelectItem>
							<SelectItem value="this-week">This Week</SelectItem>
							<SelectItem value="this-month">This Month</SelectItem>
							<SelectItem value="next-month">Next Month</SelectItem>
						</SelectContent>
					</Select>
				</header>

				<div
					id="birthday-list-content"
					className="rounded-md border border-[hsl(var(--border-grey))] overflow-hidden"
				>
					{loading.isLoading ? (
						<ul className="space-y-2 p-4" aria-label="Loading birthday list">
							{Array.from({ length: loading.skeletonCount || 3 }, (_) => (
								<BirthdayMemberSkeleton key={`skeleton-${_}`} />
							))}
						</ul>
					) : displayedMembers.length === 0 ? (
						<div className="p-6 text-center">
							<Calendar className="h-8 w-8 text-[hsl(var(--text-light))] mx-auto mb-2" />
							<p className="text-sm text-[hsl(var(--text-light))]">
								{emptyMessage}
							</p>
						</div>
					) : (
						<>
							<ul
								className="space-y-1 p-4"
								aria-label={`${displayedMembers.length} team members with birthdays`}
							>
								{displayedMembers.map((member) => (
									<BirthdayMemberItem
										key={member.id}
										member={member}
										showPosition={showPositions}
										showDate={showDates}
										formatDateFn={formatDateFn}
									/>
								))}
							</ul>

							{hasMoreMembers && (
								<div className="px-4 pb-4">
									<p className="text-xs text-[hsl(var(--text-light))] text-center py-2 border-t border-[hsl(var(--border-grey))]">
										+{members.length - (maxMembers || 0)} more birthdays
									</p>
								</div>
							)}
						</>
					)}
				</div>
			</section>
		);
	},
);

TeamBirthdayList.displayName = "TeamBirthdayList";

export default TeamBirthdayList;
