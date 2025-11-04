import { Button } from "@/components/ui";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type React from "react";
import { memo, useCallback, useMemo, useState } from "react";

/**
 * Represents different types of calendar events/statuses
 */
export type EventType =
	| "present"
	| "sick-leave"
	| "casual-leave"
	| "leave-without-pay"
	| "holiday";

/**
 * CalendarPlus event data structure
 */
export interface CalendarEvent {
	/** Day of the month (1-31) */
	date: number;
	/** Type of event/status */
	type: EventType;
	/** Display label for the event */
	label: string;
	/** Optional unique identifier */
	id?: string;
	/** Optional additional metadata */
	metadata?: Record<string, unknown>;
}

/**
 * CalendarPlus navigation direction
 */
export type NavigationDirection = "prev" | "next";

/**
 * Props for the CalendarPlus component
 */
export interface CalendarPlusProps {
	/** Current year to display */
	year?: number;
	/** Current month to display (0-based, 0 = January) */
	month?: number;
	/** Array of calendar events */
	events?: readonly CalendarEvent[];
	/** Loading state */
	isLoading?: boolean;
	/** Callback when month changes */
	onMonthChange?: (year: number, month: number) => void;
	/** Callback when a date is clicked */
	onDateClick?: (date: Date, event?: CalendarEvent) => void;
	/** Custom class name for the container */
	className?: string;
	/** Whether navigation is disabled */
	navigationDisabled?: boolean;
	/** Minimum date that can be navigated to */
	minDate?: Date;
	/** Maximum date that can be navigated to */
	maxDate?: Date;
	/** ARIA label for the calendar */
	ariaLabel?: string;
}

/**
 * Style configuration for event types
 */
const EVENT_TYPE_STYLES: Record<EventType, string> = {
	present: "bg-green-100 border-l-4 border-green-500 text-green-800",
	"sick-leave": "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800",
	"casual-leave": "bg-blue-100 border-l-4 border-blue-500 text-blue-800",
	"leave-without-pay": "bg-red-100 border-l-4 border-red-500 text-red-800",
	holiday: "bg-cyan-100 border-l-4 border-cyan-500 text-cyan-800",
} as const;

/**
 * Legend configuration
 */
const LEGEND_CONFIG: Array<{ type: EventType; label: string; color: string }> =
	[
		{
			type: "present",
			label: "Present",
			color: "bg-green-100 border-green-500",
		},
		{
			type: "sick-leave",
			label: "Sick Leave",
			color: "bg-yellow-100 border-yellow-500",
		},
		{
			type: "casual-leave",
			label: "Casual Leave",
			color: "bg-blue-100 border-blue-500",
		},
		{
			type: "leave-without-pay",
			label: "Leave Without Pay",
			color: "bg-red-100 border-red-500",
		},
		{ type: "holiday", label: "Holiday", color: "bg-cyan-100 border-cyan-500" },
	] as const;

/**
 * Month names for display
 */
const MONTH_NAMES = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
] as const;

/**
 * Day names for headers
 */
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

/**
 * Sample events for demonstration
 */
const DEFAULT_EVENTS: readonly CalendarEvent[] = [
	{ date: 1, type: "sick-leave", label: "Sick Leave", id: "1" },
	{ date: 2, type: "present", label: "Present", id: "2" },
	{ date: 3, type: "present", label: "Present", id: "3" },
	{ date: 5, type: "present", label: "Present", id: "5" },
	{ date: 6, type: "present", label: "Present", id: "6" },
	{ date: 7, type: "present", label: "Present", id: "7" },
	{ date: 8, type: "casual-leave", label: "Casual Leave", id: "8" },
	{ date: 9, type: "sick-leave", label: "Sick Leave", id: "9" },
	{ date: 10, type: "present", label: "Present", id: "10" },
	{ date: 12, type: "casual-leave", label: "Casual Leave", id: "12" },
	{ date: 13, type: "casual-leave", label: "Casual Leave", id: "13" },
	{ date: 25, type: "leave-without-pay", label: "Leave Without Pay", id: "25" },
	{ date: 27, type: "leave-without-pay", label: "Leave Without Pay", id: "27" },
	{ date: 28, type: "holiday", label: "Holiday", id: "28" },
] as const;

/**
 * Skeleton component for loading state
 */
const CalendarSkeleton: React.FC = () => (
	<div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg animate-pulse">
		{/* Header Skeleton */}
		<div className="flex items-center justify-between p-6 border-b">
			<div className="w-20 h-10 bg-gray-200 rounded-md" />
			<div className="w-48 h-8 bg-gray-200 rounded-md" />
			<div className="w-20 h-10 bg-gray-200 rounded-md" />
		</div>

		{/* CalendarPlus Grid Skeleton */}
		<div className="p-6">
			{/* Day Headers Skeleton */}
			<div className="grid grid-cols-7 gap-2 mb-4">
				{DAY_NAMES.map((day) => (
					<div
						key={`skeleton-header-${day}`}
						className="h-12 bg-gray-100 rounded-md"
					/>
				))}
			</div>

			{/* CalendarPlus Days Skeleton */}
			<div className="grid grid-cols-7 gap-2">
				{Array.from({ length: 35 }).map((_, i) => (
					<div
						key={`skeleton-day-${i + 1}`}
						className="min-h-24 bg-gray-50 border border-gray-100 rounded-md p-2"
					>
						<div className="w-6 h-4 bg-gray-200 rounded mb-2 ml-auto" />
						{i % 3 === 0 && <div className="w-full h-6 bg-gray-200 rounded" />}
					</div>
				))}
			</div>
		</div>

		{/* Legend Skeleton */}
		<div className="p-6 border-t bg-gray-50">
			<div className="w-16 h-4 bg-gray-200 rounded mb-3" />
			<div className="flex flex-wrap gap-4">
				{LEGEND_CONFIG.map(({ type }) => (
					<div
						key={`skeleton-legend-${type}`}
						className="flex items-center gap-2"
					>
						<div className="w-4 h-4 bg-gray-200 rounded-sm" />
						<div className="w-20 h-4 bg-gray-200 rounded" />
					</div>
				))}
			</div>
		</div>
	</div>
);

/**
 * Individual calendar day component
 */
interface CalendarDayProps {
	day: Date;
	isCurrentMonth: boolean;
	event?: CalendarEvent;
	onClick?: (date: Date, event?: CalendarEvent) => void;
}

const CalendarDay = memo<CalendarDayProps>(
	({ day, isCurrentMonth, event, onClick }) => {
		const dayNumber = day.getDate();

		const handleClick = useCallback(() => {
			onClick?.(day, event);
		}, [day, event, onClick]);

		const handleKeyDown = useCallback(
			(e: React.KeyboardEvent) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					handleClick();
				}
			},
			[handleClick],
		);

		return (
			<td
				className={`min-h-24 p-2 border flex flex-col justify-between rounded-md transition-colors cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ${
					isCurrentMonth
						? "bg-white border-gray-200"
						: "bg-gray-50 border-gray-100"
				}`}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				// biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
				tabIndex={0}
				aria-label={`${day.toLocaleDateString()}${event ? `, ${event.label}` : ""}`}
			>
				<div
					className={`text-right mb-2 ${
						isCurrentMonth ? "text-gray-900 font-medium" : "text-gray-400"
					}`}
				>
					{dayNumber.toString().padStart(2, "0")}
				</div>

				{event && (
					<div
						className={`px-2 py-1 rounded-xs text-xs font-medium ${EVENT_TYPE_STYLES[event.type]}`}
						title={event.label}
					>
						{event.label}
					</div>
				)}
			</td>
		);
	},
);

CalendarDay.displayName = "CalendarDay";

/**
 * Navigation button component
 */
interface NavigationButtonProps {
	direction: NavigationDirection;
	onClick: () => void;
	disabled?: boolean;
}

const NavigationButton = memo<NavigationButtonProps>(
	({ direction, onClick, disabled }) => (
		<Button
			variant="ghost"
			onClick={onClick}
			disabled={disabled}
			aria-label={`Navigate to ${direction === "prev" ? "previous" : "next"} month`}
		>
			{direction === "prev" ? "← Previous" : "Next →"}
		</Button>
	),
);

NavigationButton.displayName = "NavigationButton";

/**
 * CalendarPlus legend component
 */
const CalendarLegend = memo(() => (
	<div className="p-6 border-t bg-gray-50">
		<h3 className="text-sm font-semibold text-gray-700 mb-3">Legend:</h3>
		<ul className="flex flex-wrap gap-4">
			{LEGEND_CONFIG.map(({ type, label, color }) => (
				<li key={type} className="flex items-center gap-2">
					<div
						className={`w-4 h-4 ${color} border-l-4 rounded-xs`}
						aria-hidden="true"
					/>
					<span className="text-sm text-gray-700">{label}</span>
				</li>
			))}
		</ul>
	</div>
));

CalendarLegend.displayName = "CalendarLegend";

/**
 * Custom CalendarPlus Component
 *
 * A fully accessible calendar component for displaying attendance and leave data.
 * Supports keyboard navigation, screen readers, and customizable event types.
 *
 * @example
 * ```tsx
 * <CalendarPlus
 *   year={2024}
 *   month={5}
 *   events={events}
 *   onMonthChange={(year, month) => console.log(year, month)}
 *   onDateClick={(date, event) => console.log(date, event)}
 * />
 * ```
 */
export const CalendarPlus: React.FC<CalendarPlusProps> = ({
	year: propYear,
	month: propMonth,
	events = DEFAULT_EVENTS,
	isLoading = false,
	onMonthChange,
	onDateClick,
	className = "",
	navigationDisabled = false,
	minDate,
	maxDate,
	ariaLabel = "CalendarPlus",
}) => {
	// Internal state for uncontrolled usage
	const [internalYear, setInternalYear] = useState(new Date().getFullYear());
	const [internalMonth, setInternalMonth] = useState(new Date().getMonth());

	// Use prop values if provided, otherwise use internal state
	const currentYear = propYear ?? internalYear;
	const currentMonth = propMonth ?? internalMonth;

	// Memoized current date calculation
	const currentDate = useMemo(
		() => new Date(currentYear, currentMonth, 1),
		[currentYear, currentMonth],
	);

	// Memoized events lookup map for O(1) access
	const eventsMap = useMemo(() => {
		const map = new Map<number, CalendarEvent>();
		for (const event of events) {
			map.set(event.date, event);
		}
		return map;
	}, [events]);

	// Memoized calendar days calculation
	const calendarDays = useMemo(() => {
		const firstDay = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			1,
		);
		const lastDay = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth() + 1,
			0,
		);
		const startDate = new Date(firstDay);
		startDate.setDate(startDate.getDate() - firstDay.getDay());

		const days: Date[] = [];
		const endDate = new Date(lastDay);
		endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

		for (
			let date = new Date(startDate);
			date <= endDate;
			date.setDate(date.getDate() + 1)
		) {
			days.push(new Date(date));
		}

		return days;
	}, [currentDate]);

	// Helper function to update date
	const updateDate = useCallback(
		(newYear: number, newMonth: number) => {
			if (onMonthChange) {
				onMonthChange(newYear, newMonth);
			} else {
				setInternalYear(newYear);
				setInternalMonth(newMonth);
			}
		},
		[onMonthChange],
	);

	// Navigation handlers
	const handleNavigation = useCallback(
		(direction: NavigationDirection) => {
			const newDate = new Date(currentYear, currentMonth, 1);
			if (direction === "prev") {
				newDate.setMonth(newDate.getMonth() - 1);
			} else {
				newDate.setMonth(newDate.getMonth() + 1);
			}

			// Check date boundaries
			if (minDate && newDate < minDate) return;
			if (maxDate && newDate > maxDate) return;

			updateDate(newDate.getFullYear(), newDate.getMonth());
		},
		[currentYear, currentMonth, updateDate, minDate, maxDate],
	);

	const handlePrevMonth = useCallback(
		() => handleNavigation("prev"),
		[handleNavigation],
	);
	const handleNextMonth = useCallback(
		() => handleNavigation("next"),
		[handleNavigation],
	);

	// Dropdown handlers
	const handleMonthSelect = useCallback(
		(month: string) => {
			updateDate(currentYear, Number(month));
		},
		[currentYear, updateDate],
	);

	const handleYearSelect = useCallback(
		(year: string) => {
			updateDate(Number(year), currentMonth);
		},
		[currentMonth, updateDate],
	);

	// Generate year options (current year ± 10 years)
	const yearOptions = useMemo(() => {
		const currentYearValue = new Date().getFullYear();
		const startYear = currentYearValue - 10;
		const endYear = currentYearValue + 10;
		const years: number[] = [];

		for (let year = startYear; year <= endYear; year++) {
			years.push(year);
		}

		return years;
	}, []);

	// Check if navigation should be disabled
	const isPrevDisabled = useMemo(() => {
		if (navigationDisabled) return true;
		if (!minDate) return false;
		const prevMonth = new Date(currentYear, currentMonth, 1);
		prevMonth.setMonth(prevMonth.getMonth() - 1);
		return prevMonth < minDate;
	}, [navigationDisabled, minDate, currentYear, currentMonth]);

	const isNextDisabled = useMemo(() => {
		if (navigationDisabled) return true;
		if (!maxDate) return false;
		const nextMonth = new Date(currentYear, currentMonth, 1);
		nextMonth.setMonth(nextMonth.getMonth() + 1);
		return nextMonth > maxDate;
	}, [navigationDisabled, maxDate, currentYear, currentMonth]);

	if (isLoading) {
		return <CalendarSkeleton />;
	}

	return (
		<div
			className={`w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg ${className}`}
			role="application"
			aria-label={ariaLabel}
		>
			{/* Header */}
			<div className="flex items-center justify-between p-6 border-b">
				<NavigationButton
					direction="prev"
					onClick={handlePrevMonth}
					disabled={isPrevDisabled}
				/>

				{/* Month and Year Dropdowns */}
				<div className="flex items-center gap-4">
					<Select
						value={currentMonth.toString()}
						onValueChange={handleMonthSelect}
					>
						<SelectTrigger className="w-40">
							<SelectValue placeholder="Select month" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{MONTH_NAMES.map((monthName, index) => (
									<SelectItem key={monthName} value={index.toString()}>
										{monthName}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>

					<Select
						value={currentYear.toString()}
						onValueChange={handleYearSelect}
					>
						<SelectTrigger className="w-28">
							<SelectValue placeholder="Select year" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{yearOptions.map((year) => (
									<SelectItem key={year} value={year.toString()}>
										{year}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<NavigationButton
					direction="next"
					onClick={handleNextMonth}
					disabled={isNextDisabled}
				/>
			</div>

			{/* CalendarPlus Grid */}
			<div className="p-6">
				{/* Day Headers */}
				<tr className="grid grid-cols-7 gap-2 mb-4">
					{DAY_NAMES.map((day) => (
						<th
							key={day}
							className="p-3 text-center font-semibold text-gray-700 bg-gray-50 rounded-md"
							aria-label={day}
						>
							{day}
						</th>
					))}
				</tr>

				{/* CalendarPlus Days */}
				<table
					className="grid grid-cols-7 gap-2"
					aria-label="CalendarPlus days"
				>
					{calendarDays.map((day, index) => {
						const isCurrentMonth = day.getMonth() === currentDate.getMonth();
						const dayNumber = day.getDate();
						const event = isCurrentMonth ? eventsMap.get(dayNumber) : undefined;

						return (
							<CalendarDay
								key={`${day.getTime()}-${index}`}
								day={day}
								isCurrentMonth={isCurrentMonth}
								event={event}
								onClick={onDateClick}
							/>
						);
					})}
				</table>
			</div>

			{/* Legend */}
			<CalendarLegend />
		</div>
	);
};

CalendarPlus.displayName = "CalendarPlus";

export default CalendarPlus;
