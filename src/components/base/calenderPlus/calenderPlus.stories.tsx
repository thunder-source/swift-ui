import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import CalendarPlus, {
	type CalendarEvent,
	type EventType,
} from "./calenderPlus";

// Mock data for stories
const mockEvents: CalendarEvent[] = [
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
	{ date: 15, type: "holiday", label: "Public Holiday", id: "15" },
	{ date: 25, type: "leave-without-pay", label: "Leave Without Pay", id: "25" },
];

// Wrapper component to handle state
const CalendarPlusWrapper = (
	props: React.ComponentProps<typeof CalendarPlus>,
) => {
	const [year, setYear] = useState(props.year ?? new Date().getFullYear());
	const [month, setMonth] = useState(props.month ?? new Date().getMonth());

	const handleMonthChange = (newYear: number, newMonth: number) => {
		setYear(newYear);
		setMonth(newMonth);
		props.onMonthChange?.(newYear, newMonth);
	};

	return (
		<CalendarPlus
			{...props}
			year={year}
			month={month}
			onMonthChange={handleMonthChange}
		/>
	);
};

const meta: Meta<typeof CalendarPlusWrapper> = {
	title: "Base/CalendarPlus",
	component: CalendarPlusWrapper,
	tags: ["autodocs"],
	args: {
		year: new Date().getFullYear(),
		month: new Date().getMonth(),
		events: mockEvents,
		ariaLabel: "Employee Attendance Calendar",
	},
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A fully accessible calendar component for displaying attendance and leave data.\n\n**Features:**\n- Keyboard navigation\n- Screen reader support\n- Customizable event types\n- Loading states\n- Date range constraints",
			},
		},
		a11y: {
			config: {
				rules: [
					{
						id: "color-contrast",
						enabled: true,
					},
				],
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
	args: {
		isLoading: true,
	},
};

export const DisabledNavigation: Story = {
	args: {
		navigationDisabled: true,
	},
};

export const WithDateRange: Story = {
	args: {
		minDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
		maxDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
	},
};

export const WithCustomEvents: Story = {
	args: {
		events: [
			{ date: 1, type: "present", label: "Work from home" },
			{ date: 2, type: "present", label: "Office" },
			{ date: 3, type: "sick-leave", label: "Sick Leave" },
			{ date: 4, type: "casual-leave", label: "Casual Leave" },
			{ date: 5, type: "holiday", label: "Public Holiday" },
		],
	},
};

export const InteractiveTest: Story = {
	args: {
		events: [
			{ date: 15, type: "holiday", label: "Public Holiday" },
			{ date: 25, type: "leave-without-pay", label: "Leave Without Pay" },
		],
	},
};

export const WithCustomTheme: Story = {
	args: {
		className: "dark",
		events: mockEvents,
	},
};

export const WithNoEvents: Story = {
	args: {
		events: [],
	},
};

export const WithCustomMonth: Story = {
	args: {
		year: 2024,
		month: 5, // June
		events: [
			{ date: 1, type: "present", label: "Present" },
			{ date: 15, type: "holiday", label: "Public Holiday" },
		],
	},
};

export const EdgeCases: Story = {
	args: {
		events: Array.from({ length: 31 }, (_, i) => ({
			date: i + 1,
			type: [
				"present",
				"sick-leave",
				"casual-leave",
				"leave-without-pay",
				"holiday",
			][i % 5] as EventType,
			label: `Event ${i + 1}`,
			id: `${i + 1}`,
		})),
	},
};

export const Responsive: Story = {
	parameters: {
		viewport: {
			defaultViewport: "mobile",
		},
	},
};
