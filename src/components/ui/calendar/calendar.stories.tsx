import type { Meta, StoryObj } from "@storybook/react";
import { addDays } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "./calendar";

const meta: Meta<typeof Calendar> = {
	title: "shadcn/Calendar",
	component: Calendar,
	tags: ["autodocs"],
	argTypes: {
		mode: {
			control: "select",
			options: ["default", "range", "multiple"],
			description: "The selection mode of the calendar",
			defaultValue: "default",
		},
		showFooter: {
			control: "boolean",
			description: "Whether to show the footer with cancel/apply buttons",
			defaultValue: false,
		},
		showOutsideDays: {
			control: "boolean",
			description: "Whether to show days from previous/next months",
			defaultValue: true,
		},
		isLoading: {
			control: "boolean",
			description: "Whether the calendar is in loading state",
			defaultValue: false,
		},
		disabled: {
			control: "boolean",
			description: "Whether the calendar is disabled",
			defaultValue: false,
		},
		onCancel: { action: "cancelled" },
		onApply: { action: "applied" },
	},
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// Default Calendar
export const Default: Story = {
	args: {
		mode: "default",
		showFooter: false,
		showOutsideDays: true,
	},
};

// Calendar with Footer
export const WithFooter: Story = {
	args: {
		showFooter: true,
		onCancel: () => console.log("Cancelled"),
		onApply: () => console.log("Applied"),
	},
};

// Range Selection Calendar
export const RangeSelection: Story = {
	render: (args) => {
		const [range, setRange] = useState<DateRange | undefined>({
			from: new Date(),
			to: addDays(new Date(), 7),
		});

		// Create a wrapper function that adapts the react-day-picker handler to work with useState
		const handleSelect = (selectedRange: DateRange | undefined) => {
			setRange(selectedRange);
		};

		return (
			<Calendar
				{...args}
				mode="range"
				selected={range}
				onSelect={handleSelect}
			/>
		);
	},
	args: {
		showFooter: true,
	},
};

// Multiple Selection Calendar
export const MultipleSelection: Story = {
	render: (args) => {
		const [days, setDays] = useState<Date[]>([
			new Date(),
			addDays(new Date(), 2),
			addDays(new Date(), 5),
		]);

		// Create a wrapper function that adapts the react-day-picker handler to work with useState
		const handleSelect = (selectedDays: Date[] | undefined) => {
			if (selectedDays) {
				setDays(selectedDays);
			}
		};

		return (
			<Calendar
				{...args}
				mode="multiple"
				selected={days}
				onSelect={handleSelect}
			/>
		);
	},
	args: {
		showFooter: true,
	},
};

// Loading State Calendar
export const Loading: Story = {
	args: {
		isLoading: true,
		loadingState: (
			<div className="animate-pulse flex space-x-4 p-4">
				<div className="rounded-md bg-slate-200 h-32 w-32" />
				<div className="flex-1 space-y-6 py-1">
					<div className="h-2 bg-slate-200 rounded" />
					<div className="space-y-3">
						<div className="grid grid-cols-3 gap-4">
							<div className="h-2 bg-slate-200 rounded col-span-2" />
							<div className="h-2 bg-slate-200 rounded col-span-1" />
						</div>
					</div>
				</div>
			</div>
		),
	},
};

// Disabled Calendar
export const Disabled: Story = {
	args: {
		disabled: true,
		showFooter: true,
	},
};

// Calendar with Custom Styling
export const CustomStyling: Story = {
	args: {
		className: "border-2 border-blue-500",
		classNames: {
			day_selected: "bg-blue-500 text-white rounded-full",
			day_today: "border border-blue-500 rounded-full",
		},
	},
};

// Calendar with Disabled Days
export const WithDisabledDays: Story = {
	args: {
		disabled: [{ from: addDays(new Date(), 1), to: addDays(new Date(), 5) }],
		showFooter: true,
	},
};
