import { type ClassValue, clsx } from "clsx";
import { type LucideIcon, Megaphone } from "lucide-react";
import React, { useCallback, useMemo } from "react";

/**
 * Notification severity levels for semantic styling
 */
export type NotificationSeverity = "info" | "warning" | "error" | "success";

/**
 * Props for the NotificationCard component
 */
export interface NotificationCardProps {
	/**
	 * Notification title - should be concise and descriptive
	 * @example "System Maintenance Scheduled"
	 */
	title: string;

	/**
	 * Notification content text - supports plain text only
	 * @example "We'll be performing scheduled maintenance on our servers..."
	 */
	description: string;

	/**
	 * Optional date/time label
	 * @default undefined
	 * @example "Today", "2 hours ago", "Mar 15"
	 */
	dateLabel?: string;

	/**
	 * Maximum characters to display before truncating
	 * @default 130
	 * @minimum 50
	 */
	maxChars?: number;

	/**
	 * Notification severity level for semantic styling
	 * @default "info"
	 */
	severity?: NotificationSeverity;

	/**
	 * Custom icon to override default severity icon
	 */
	icon?: LucideIcon;

	/**
	 * Additional CSS class names
	 */
	className?: ClassValue;

	/**
	 * Controlled expand state - when provided, component becomes controlled
	 */
	expanded?: boolean;

	/**
	 * Callback fired when expand/collapse is toggled
	 * @param expanded - The new expanded state
	 */
	onToggleExpand?: (expanded: boolean) => void;

	/**
	 * Callback fired when notification is clicked (optional)
	 */
	onClick?: () => void;

	/**
	 * Whether the notification can be interacted with
	 * @default true
	 */
	interactive?: boolean;

	/**
	 * Unique identifier for the notification
	 */
	id?: string;

	/**
	 * ARIA label for the notification
	 */
	"aria-label"?: string;
}

/**
 * Severity-based styling configuration
 */
const SEVERITY_STYLES = {
	info: {
		container: "border-blue-200 bg-[hsl(var(--bg-light))]",
		iconBg: "bg-blue-100",
		iconColor: "text-[hsl(var(--primary-blue))]",
		dateColor: "text-[hsl(var(--primary-blue))]",
		buttonColor: "text-[hsl(var(--primary-blue))] hover:text-blue-800",
	},
	warning: {
		container: "border-yellow-200 bg-yellow-50",
		iconBg: "bg-yellow-100",
		iconColor: "text-yellow-700",
		dateColor: "text-yellow-700",
		buttonColor: "text-yellow-700 hover:text-yellow-800",
	},
	error: {
		container: "border-red-200 bg-red-50",
		iconBg: "bg-red-100",
		iconColor: "text-red-700",
		dateColor: "text-red-700",
		buttonColor: "text-red-700 hover:text-red-800",
	},
	success: {
		container: "border-green-200 bg-green-50",
		iconBg: "bg-green-100",
		iconColor: "text-green-700",
		dateColor: "text-green-700",
		buttonColor: "text-green-700 hover:text-green-800",
	},
} as const;

/**
 * Validates maxChars prop value
 */
const validateMaxChars = (maxChars: number): number => {
	if (maxChars < 50) {
		console.warn(
			"NotificationCard: maxChars should be at least 50 for usability",
		);
		return 50;
	}
	return Math.floor(maxChars);
};

/**
 * NotificationCard - A reusable notification component with expand/collapse functionality
 *
 * Features:
 * - Controlled and uncontrolled expand state
 * - Semantic severity levels with appropriate styling
 * - Accessible with proper ARIA attributes
 * - Optimized rendering with useMemo and useCallback
 * - TypeScript strict mode compatible
 *
 * @example
 * ```tsx
 * // Uncontrolled usage
 * <NotificationCard
 *   title="New Feature Available"
 *   description="We've added a new dashboard feature that allows you to track your progress more effectively."
 *   severity="info"
 *   dateLabel="2 hours ago"
 * />
 *
 * // Controlled usage
 * <NotificationCard
 *   title="System Alert"
 *   description="Important system maintenance will occur tonight from 2-4 AM EST."
 *   severity="warning"
 *   expanded={isExpanded}
 *   onToggleExpand={setIsExpanded}
 * />
 * ```
 */
export const NotificationList = React.memo<NotificationCardProps>(
	({
		title,
		description,
		dateLabel,
		maxChars = 130,
		severity = "info",
		icon: CustomIcon,
		className,
		expanded,
		onToggleExpand,
		onClick,
		interactive = true,
		id,
		"aria-label": ariaLabel,
	}) => {
		// Validate and normalize maxChars
		const validatedMaxChars = useMemo(
			() => validateMaxChars(maxChars),
			[maxChars],
		);

		// Controlled vs uncontrolled state logic
		const [internalExpanded, setInternalExpanded] = React.useState(false);
		const isControlled = expanded !== undefined;
		const isExpanded = isControlled ? expanded : internalExpanded;

		// Memoize text processing
		const textConfig = useMemo(() => {
			const isLong = description.length > validatedMaxChars;
			const displayText =
				isExpanded || !isLong
					? description
					: `${description.slice(0, validatedMaxChars)}...`;

			return { isLong, displayText };
		}, [description, validatedMaxChars, isExpanded]);

		// Memoize styling
		const styles = useMemo(() => SEVERITY_STYLES[severity], [severity]);

		// Optimized toggle handler
		const handleToggleExpand = useCallback(() => {
			if (!interactive) return;

			if (isControlled && onToggleExpand) {
				onToggleExpand(!expanded);
			} else {
				setInternalExpanded((prev) => !prev);
			}
		}, [isControlled, expanded, onToggleExpand, interactive]);

		// Optimized click handler
		const handleClick = useCallback(() => {
			if (interactive && onClick) {
				onClick();
			}
		}, [interactive, onClick]);

		// Generate unique IDs for accessibility
		const titleId = `${id || "notification"}-title`;
		const descriptionId = `${id || "notification"}-description`;

		// Determine icon component
		const IconComponent = CustomIcon || Megaphone;

		return (
			<div
				aria-labelledby={titleId}
				aria-describedby={descriptionId}
				aria-label={ariaLabel}
				className={clsx(
					// Base styles
					"flex items-start gap-4 p-4 rounded-lg border shadow-sm w-full max-w-3xl transition-colors duration-200",
					// Severity-based styles
					styles.container,
					// Interactive styles
					interactive && onClick && "cursor-pointer hover:shadow-md",
					// Custom className
					className,
				)}
				onClick={handleClick}
				onKeyDown={
					interactive && onClick
						? (e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									handleClick();
								}
							}
						: undefined
				}
				tabIndex={interactive && onClick ? 0 : undefined}
			>
				{/* Icon */}
				<div
					className={clsx(
						"p-2 rounded-full shrink-0 transition-colors duration-200",
						styles.iconBg,
					)}
					aria-hidden="true"
				>
					<IconComponent
						className={clsx("h-5 w-5", styles.iconColor)}
						aria-hidden="true"
					/>
				</div>

				{/* Content */}
				<div className="flex-1 min-w-0">
					<h3
						id={titleId}
						className="font-semibold text-sm text-gray-900 leading-tight"
					>
						{title}
					</h3>
					<div
						id={descriptionId}
						className="text-sm text-gray-700 mt-1 leading-relaxed"
					>
						{textConfig.displayText}
						{textConfig.isLong && interactive && (
							<button
								type="button"
								className={clsx(
									"ml-1 font-semibold cursor-pointer transition-colors duration-200 focus:outline-none   rounded-sm",
									styles.buttonColor,
								)}
								onClick={(e) => {
									e.stopPropagation(); // Prevent triggering parent onClick
									handleToggleExpand();
								}}
								aria-expanded={isExpanded}
								aria-label={
									isExpanded ? "Show less content" : "Show more content"
								}
								aria-controls={descriptionId}
							>
								{isExpanded ? " Show Less" : " Read More"}
							</button>
						)}
					</div>
				</div>

				{/* Date */}
				{dateLabel && (
					<div
						className={clsx(
							"text-sm font-medium whitespace-nowrap",
							styles.dateColor,
						)}
						aria-label={`Notification date: ${dateLabel}`}
					>
						{dateLabel}
					</div>
				)}
			</div>
		);
	},
);

NotificationList.displayName = "NotificationList";

export default NotificationList;
