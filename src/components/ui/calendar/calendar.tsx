import { Button, buttonVariants } from "@/components/ui";
import { ErrorBoundary } from "@/hooks/useErrorBoundary";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { forwardRef, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import type {
	DayPickerDefaultProps,
	DayPickerMultipleProps,
	DayPickerRangeProps,
	DayPickerSingleProps,
} from "react-day-picker";

/**
 * CalendarProps extends DayPicker props with additional functionality
 * @property {boolean} showFooter - Whether to show footer controls with cancel/apply buttons
 * @property {() => void} onCancel - Callback function when cancel button is clicked
 * @property {() => void} onApply - Callback function when apply button is clicked
 * @property {boolean} showOutsideDays - Whether to show days from previous/next months
 * @property {React.ReactNode} loadingState - Content to display when in loading state
 * @property {boolean} isLoading - Whether the calendar is in loading state
 */
type CalendarPropsBase = {
	showFooter?: boolean;
	onCancel?: () => void;
	onApply?: () => void;
	showOutsideDays?: boolean;
	loadingState?: React.ReactNode;
	isLoading?: boolean;
	className?: string;
};

type CalendarPropsDefault = CalendarPropsBase &
	Omit<DayPickerDefaultProps, "showOutsideDays">;
type CalendarPropsSingle = CalendarPropsBase &
	Omit<DayPickerSingleProps, "showOutsideDays">;
type CalendarPropsMultiple = CalendarPropsBase &
	Omit<DayPickerMultipleProps, "showOutsideDays">;
type CalendarPropsRange = CalendarPropsBase &
	Omit<DayPickerRangeProps, "showOutsideDays">;

export type CalendarProps =
	| CalendarPropsDefault
	| CalendarPropsSingle
	| CalendarPropsMultiple
	| CalendarPropsRange;

/**
 * Calendar component for date selection built on react-day-picker
 *
 * @example
 * // Basic usage
 * <Calendar />
 *
 * @example
 * // With range selection
 * <Calendar
 *   mode="range"
 *   selected={{ from: new Date(2023, 0, 1), to: new Date(2023, 0, 15) }}
 *   onSelect={(range) => console.log(range)}
 * />
 *
 * @example
 * // With footer controls
 * <Calendar
 *   showFooter
 *   onCancel={() => console.log('Cancelled')}
 *   onApply={() => console.log('Applied')}
 * />
 */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
	(
		{
			className,
			classNames,
			showFooter = false,
			showOutsideDays = true,
			onCancel,
			onApply,
			isLoading = false,
			loadingState,
			...props
		},
		ref,
	) => {
		// Memoize class names for performance
		const mergedClassNames = useMemo(
			() => ({
				months: "flex flex-col sm:flex-row gap-2",
				month: "flex flex-col gap-4",
				caption: "flex justify-center pt-1 relative items-center w-full",
				caption_label: "text-sm font-semibold",
				nav: "flex items-center justify-between ml-auto gap-1",
				nav_button: cn(
					buttonVariants({ variant: "ghost", size: "sm" }),
					"size-5 rounded-sm bg-[hsl(var(--bg-light))] p-0 opacity-50 hover:opacity-100",
				),
				nav_button_previous: "aria-label='Go to previous month'",
				nav_button_next: "aria-label='Go to next month'",
				table: "w-full border-collapse space-x-1",
				head_row: "flex",
				head_cell:
					"text-[hsl(var(--text-dark))] border-t-1 border-[hsl(var(--border-grey))] pt-4 pb-2 w-10 font-semibold text-[0.8rem]",
				row: "flex w-full mt-1",
				cell: cn(
					"relative p-0 px-1 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-[hsl(var(--bg-light))] [&:has([aria-selected].day-range-end)]:rounded-r-xl",
					props.mode === "range"
						? "[&:has(>.day-range-end)]:rounded-r-full pr-[-5px] [&:has(>.day-range-start)]:rounded-l-full first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full"
						: "[&:has([aria-selected])]:rounded-full pr-[-5px]",
				),
				day: cn(
					buttonVariants({ variant: "ghost" }),
					"size-8 p-0 font-medium aria-selected:opacity-100 rounded-full hover:rounded-full",
				),
				day_range_start:
					"day-range-start aria-selected:bg-[hsl(var(--primary-blue))] aria-selected:text-primary-foreground",
				day_range_end:
					"day-range-end aria-selected:bg-[hsl(var(--primary-blue))] aria-selected:text-primary-foreground",
				day_selected:
					"bg-[hsl(var(--primary-blue))] !rounded-full text-primary-foreground hover:bg-[hsl(var(--primary-blue))] hover:text-primary-foreground focus:bg-[hsl(var(--primary-blue))] focus:text-primary-foreground",
				day_today:
					"rounded-full [&:not([aria-selected])]:bg-accent [&:not([aria-selected])]:text-accent-foreground",
				day_outside:
					"day-outside text-[hsla(var(--text-medium),0.3)] aria-selected:text-muted-foreground",
				day_disabled: "text-muted-foreground opacity-50",
				day_range_middle:
					"aria-selected:bg-accent aria-selected:text-accent-foreground",
				day_hidden: "invisible",
				...classNames,
			}),
			[classNames, props.mode],
		);

		const formatters = useMemo(
			() => ({
				formatWeekdayName: (date: Date) =>
					date.toLocaleDateString("en-US", { weekday: "narrow" }),
			}),
			[],
		);

		if (isLoading) {
			return (
				<div
					className={cn(
						"rounded-xl shadow-sm overflow-hidden w-fit flex items-center justify-center p-8",
						className,
					)}
					ref={ref}
				>
					{loadingState || <p>Loading calendar...</p>}
				</div>
			);
		}

		const handleApply = () => {
			if (onApply) {
				onApply();
			}
		};
		return (
			<ErrorBoundary
				fallback={
					<div className="rounded-xl shadow-sm overflow-hidden w-fit p-4 bg-red-50 text-red-800">
						Something went wrong with the calendar. Please try again.
					</div>
				}
			>
				<div
					className={cn(
						"rounded-xl shadow-sm overflow-hidden w-fit",
						className,
					)}
					ref={ref}
					data-testid="calendar-component"
				>
					<DayPicker
						showOutsideDays={showOutsideDays}
						className={cn("p-3 bg-[hsl(var(--bg-white))]")}
						classNames={mergedClassNames}
						formatters={formatters}
						components={{
							IconLeft: ({ className, ...props }) => (
								<ChevronLeft
									className={cn("size-3", className)}
									aria-hidden="true"
									{...props}
								/>
							),
							IconRight: ({ className, ...props }) => (
								<ChevronRight
									className={cn("size-3", className)}
									aria-hidden="true"
									{...props}
								/>
							),
						}}
						{...props}
					/>
					{showFooter && (
						<div
							className="text-xs p-3 border-t text-[hsl(var(--text-dark))] -mt-2 bg-[hsl(var(--bg-white))] border"
							aria-live="polite"
						>
							<p>*You can choose multiple dates</p>
							<div className="flex gap-2 pt-4 justify-end">
								<Button variant="outline" onClick={onCancel} type="button">
									Cancel
								</Button>
								<Button
									variant="destructive"
									onClick={handleApply}
									type="button"
								>
									Apply Now
								</Button>
							</div>
						</div>
					)}
				</div>
			</ErrorBoundary>
		);
	},
);

Calendar.displayName = "Calendar";
