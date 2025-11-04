/**
 * @file Announcement.tsx
 * @description Accessible and performant Announcement component for displaying time-based announcements
 * @module components/Announcement
 * @version 2.0.0
 * @author [Your Name]
 * @since 1.0.0
 */

import { Skeleton } from "@/components/ui";
import { Button } from "@/components/ui/button/button";
import { clsx } from "clsx";
import { MoreVertical } from "lucide-react";
import { type FC, memo, useCallback, useMemo } from "react";

/**
 * Represents a single announcement item with validation constraints
 * @interface AnnouncementItem
 * @since 1.0.0
 */
export interface AnnouncementItem {
	/** Unique identifier for the announcement */
	readonly id: string;
	/** Time in HH:mm format (24-hour) */
	readonly time: string;
	/** Brief announcement title (max 100 chars recommended) */
	readonly title: string;
	/** Detailed description (max 500 chars recommended) */
	readonly description: string;
	/** Optional priority level for styling */
	readonly priority?: "low" | "medium" | "high";
	/** Optional category for filtering */
	readonly category?: string;
}

/**
 * Props for the Announcement component with full type safety
 * @interface AnnouncementProps
 * @since 1.0.0
 */
export interface AnnouncementProps {
	/**
	 * List of announcement entries to display
	 * @minimum 0
	 * @maximum 50 (for performance)
	 */
	readonly items: readonly AnnouncementItem[];

	/**
	 * Selected date in ISO format or display string
	 * @default Current date
	 * @example "2025-07-06" or "Wednesday, 06 July 2025"
	 */
	readonly date?: string;

	/**
	 * Callback for options button click
	 * @param event - Click event
	 */
	readonly onOptionsClick?: (
		event: React.MouseEvent<HTMLButtonElement>,
	) => void;

	/**
	 * Optional CSS class names for styling customization
	 */
	readonly className?: string;

	/**
	 * Loading state for async data
	 * @default false
	 */
	readonly isLoading?: boolean;

	/**
	 * Error state with optional message
	 */
	readonly error?: string | null;

	/**
	 * Callback for announcement item selection
	 * @param item - Selected announcement item
	 */
	readonly onItemSelect?: (item: AnnouncementItem) => void;

	/**
	 * Maximum number of items to display
	 * @default undefined (show all)
	 */
	readonly maxItems?: number;

	/**
	 * Accessibility label override
	 * @default "Announcements"
	 */
	readonly ariaLabel?: string;

	/**
	 * Show footer with maxItems count
	 * @default false
	 */
	readonly footer?: boolean;
}

/**
 * Priority-based styling configuration
 */

/**
 * Default date formatter with memoization
 */
const formatDate = (dateInput?: string): string => {
	if (!dateInput) {
		return new Intl.DateTimeFormat("en-GB", {
			weekday: "long",
			day: "2-digit",
			month: "long",
			year: "numeric",
		}).format(new Date());
	}

	// Handle ISO dates
	if (/^\d{4}-\d{2}-\d{2}/.test(dateInput)) {
		return new Intl.DateTimeFormat("en-GB", {
			weekday: "long",
			day: "2-digit",
			month: "long",
			year: "numeric",
		}).format(new Date(dateInput));
	}

	return dateInput;
};

/**
 * Validates time format (HH:mm)
 */
const isValidTimeFormat = (time: string): boolean => {
	return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
};

/**
 * Individual announcement item component for better performance
 */
const AnnouncementItem: FC<{
	readonly item: AnnouncementItem;
	readonly onSelect?: (item: AnnouncementItem) => void;
	readonly compact?: boolean;
}> = memo(({ item, onSelect, compact = false }) => {
	const handleSelect = useCallback(() => {
		onSelect?.(item);
	}, [item, onSelect]);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			if ((event.key === "Enter" || event.key === " ") && onSelect) {
				event.preventDefault();
				handleSelect();
			}
		},
		[handleSelect, onSelect],
	);

	const isInteractive = Boolean(onSelect);

	return (
		<li
			className={clsx(
				"flex gap-3 items-start transition-colors duration-200",
				isInteractive && "cursor-pointer hover:bg-gray-50 rounded p-2 -m-2",
				compact && "gap-2",
			)}
			onClick={isInteractive ? handleSelect : undefined}
			onKeyDown={isInteractive ? handleKeyDown : undefined}
			tabIndex={isInteractive ? 0 : undefined}
			role={isInteractive ? "button" : undefined}
			aria-label={
				isInteractive ? `Select announcement: ${item.title}` : undefined
			}
		>
			<time
				dateTime={item.time}
				className={clsx(
					"font-mono font-medium min-w-[3.5rem] text-gray-900 flex-shrink-0 my-auto",
					compact ? "text-sm" : "text-base",
					!isValidTimeFormat(item.time) && "text-red-600",
				)}
				aria-label={`Time: ${item.time}`}
			>
				{item.time}
			</time>
			<div className="relative">
				<div className="gradient-border -my-2" />
				<div className={clsx("flex-1 min-w-0 pl-5")}>
					<h3
						className={clsx(
							"text-gray-900 break-words",
							compact ? "text-sm" : "text-base",
						)}
					>
						{item.title}
					</h3>
					<p
						className={clsx(
							"text-gray-600 break-words leading-relaxed ",
							compact ? "text-xs mt-0.5" : "text-sm mt-1",
						)}
					>
						{item.description}
					</p>
					{item.category && (
						<span
							className="inline-block px-2 py-0.5 mt-1 text-xs bg-gray-100 text-gray-700 rounded-full"
							aria-label={`Category: ${item.category}`}
						>
							{item.category}
						</span>
					)}
				</div>
			</div>
		</li>
	);
});

AnnouncementItem.displayName = "AnnouncementItem";

/**
 * Loading skeleton component
 */
const AnnouncementSkeleton: FC<{ readonly count?: number }> = ({
	count = 3,
}) => (
	<div className="space-y-4 min-w-2xs" aria-label="Loading announcements">
		<Skeleton className="w-full h-10" />
		{Array.from({ length: count }, (_, index) => (
			// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
			<div key={index} className="flex gap-3 items-start animate-pulse">
				<Skeleton className="w-14 h-5 rounded my-auto" />
				<div className="flex-1 border-l-2 pl-3">
					<Skeleton className="w-3/4 h-4 rounded mb-2" />
					<Skeleton className="w-full h-3 rounded" />
				</div>
			</div>
		))}
	</div>
);

/**
 * Performant and accessible Announcement component with controlled state management
 *
 * @example
 * ```tsx
 * <Announcement
 *   items={announcements}
 *   date="2025-07-06"
 *   onItemSelect={(item) => console.log('Selected:', item)}
 *   maxItems={10}
 * />
 * ```
 *
 * @param props - Component props
 * @returns Rendered announcement list
 */
const AnnouncementCard: FC<AnnouncementProps> = ({
	items,
	date,
	onOptionsClick,
	className,
	isLoading = false,
	error = null,
	onItemSelect,
	maxItems,
	ariaLabel = "Announcements",
	footer = false,
}) => {
	// Memoize expensive computations
	const formattedDate = useMemo(() => formatDate(date), [date]);

	const displayItems = useMemo(() => {
		const validItems = items.filter(
			(item) => item.id && item.time && item.title && item.description,
		);
		return maxItems ? validItems.slice(0, maxItems) : validItems;
	}, [items, maxItems]);

	// Error state
	if (error) {
		return (
			<section
				className={clsx(
					"p-4 bg-red-50 border border-red-200 rounded-lg",
					className,
				)}
				role="alert"
				aria-label="Announcement error"
			>
				<h2 className="text-lg font-semibold text-red-800 mb-2">
					Error Loading Announcements
				</h2>
				<p className="text-red-700">{error}</p>
			</section>
		);
	}

	return (
		<section
			className={clsx(
				"bg-white rounded-lg shadow-sm border border-gray-200 transition-shadow duration-200 hover:shadow-md p-6",
				className,
			)}
			aria-label={ariaLabel}
		>
			{isLoading ? (
				<AnnouncementSkeleton count={displayItems.length || 3} />
			) : displayItems.length === 0 ? (
				<div className="text-center py-8 text-gray-500">
					<p className="text-sm">No announcements for this date.</p>
				</div>
			) : (
				<>
					<header className="flex justify-between items-center mb-4">
						<h2 className={clsx("text-xl text-[hsl(var(--text-dark))]")}>
							{formattedDate}
						</h2>
						<Button
							variant="ghost"
							size="icon"
							onClick={onOptionsClick ?? undefined}
							aria-label="More options"
							tooltip="More options"
							iconLeft={<MoreVertical />}
						/>
					</header>
					<ul className="flex flex-col gap-6">
						{displayItems.map((item) => (
							<AnnouncementItem
								key={item.id}
								item={item}
								onSelect={onItemSelect}
							/>
						))}
					</ul>
				</>
			)}

			{footer && maxItems && items.length > maxItems && (
				<div className="mt-4 pt-4 border-t border-gray-200">
					<p className="text-sm text-gray-600 text-center">
						Showing {maxItems} of {items.length} announcements
					</p>
				</div>
			)}
		</section>
	);
};

// Set display name for debugging
AnnouncementCard.displayName = "Announcement";

export default memo(AnnouncementCard);
