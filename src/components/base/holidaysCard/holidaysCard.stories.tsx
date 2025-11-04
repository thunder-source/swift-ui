import type { Meta, StoryObj } from "@storybook/react";
import { type HolidayMember, HolidaysCard } from "./holidaysCard";

const mockMembers: HolidayMember[] = [
	{
		id: "1",
		name: "Alice Johnson",
		position: "Senior Developer",
		date: "2024-06-15",
		img: "https://images.unsplash.com/photo-1494790108755-2616b612b1e?w=150&h=150&fit=crop&crop=face",
	},
	{
		id: "2",
		name: "Bob Smith",
		position: "Product Manager",
		date: "2024-06-20",
		img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
	},
	{
		id: "3",
		name: "Carol Davis",
		position: "UX Designer",
		date: "2024-07-01",
	},
	{
		id: "4",
		name: "David Wilson",
		date: "2024-07-15",
	},
];

const meta: Meta<typeof HolidaysCard> = {
	title: "base/HolidaysCard",
	component: HolidaysCard,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"A card component that displays upcoming holidays with member avatars, names, positions, and dates. Supports loading states, controlled expansion, and accessibility features.",
			},
		},
	},
	argTypes: {
		members: {
			description: "Array of holiday members to display",
			control: { type: "object" },
		},
		isLoading: {
			description: "Shows skeleton loading state when true",
			control: { type: "boolean" },
		},
		maxItems: {
			description: "Maximum number of items to display",
			control: { type: "number", min: 1, max: 20 },
		},
		emptyMessage: {
			description: "Custom message to show when no holidays are available",
			control: { type: "text" },
		},
		className: {
			description: "Additional CSS classes to apply",
			control: { type: "text" },
		},
		"data-testid": {
			description: "Test ID for automated testing",
			control: { type: "text" },
		},
	},
	args: {
		members: mockMembers,
		isLoading: false,
		maxItems: 10,
		emptyMessage: "No upcoming holidays.",
	},
} satisfies Meta<typeof HolidaysCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story with sample holiday data
 */
export const Default: Story = {};

/**
 * Loading state with skeleton placeholders
 */
export const Loading: Story = {
	args: {
		isLoading: true,
		members: [],
	},
};

/**
 * Collapsed state showing only the header
 */
export const Collapsed: Story = {
	args: {
		members: [],
	},
};

/**
 * Empty state when no holidays are available
 */
export const Empty: Story = {
	args: {
		members: [],
		isLoading: false,
	},
};

/**
 * Custom empty message
 */
export const CustomEmptyMessage: Story = {
	args: {
		members: [],
		emptyMessage: "All team members are working hard! 🎉",
	},
};

/**
 * Limited number of items displayed
 */
export const LimitedItems: Story = {
	args: {
		maxItems: 2,
	},
};

/**
 * Members without profile images
 */
export const WithoutImages: Story = {
	args: {
		members: [
			{
				id: "1",
				name: "John Doe",
				position: "Developer",
				date: "2024-06-15",
			},
			{
				id: "2",
				name: "Jane Smith",
				position: "Designer",
				date: "2024-06-20",
			},
		],
	},
};

/**
 * Members without positions
 */
export const WithoutPositions: Story = {
	args: {
		members: [
			{
				id: "1",
				name: "Alice Johnson",
				date: "2024-06-15",
				img: "https://images.unsplash.com/photo-1494790108755-2616b612b1e?w=150&h=150&fit=crop&crop=face",
			},
			{
				id: "2",
				name: "Bob Smith",
				date: "2024-06-20",
				img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
			},
		],
	},
};

/**
 * Invalid dates to test error handling
 */
export const InvalidDates: Story = {
	args: {
		members: [
			{
				id: "1",
				name: "Test User",
				date: "invalid-date",
			},
			{
				id: "2",
				name: "Another User",
				date: "2024-13-45", // Invalid date
			},
		],
	},
};

/**
 * Long names to test text truncation
 */
export const LongNames: Story = {
	args: {
		members: [
			{
				id: "1",
				name: "Alexander Christopher Montgomery-Wellington",
				position: "Senior Full-Stack Software Engineer and Technical Lead",
				date: "2024-06-15",
			},
			{
				id: "2",
				name: "Elizabeth Catherine Pemberton-Smythe",
				position: "Principal User Experience Designer and Researcher",
				date: "2024-06-20",
			},
		],
	},
};

/**
 * Simple component example
 */
export const Simple: Story = {
	parameters: {
		docs: {
			description: {
				story: "Simple holidays card without any interactive controls.",
			},
		},
	},
};

/**
 * Custom styling example
 */
export const CustomStyling: Story = {
	args: {
		className: "border-2 border-blue-200 bg-blue-50",
	},
};

/**
 * Accessibility test story
 */
export const AccessibilityTest: Story = {
	parameters: {
		a11y: {
			config: {
				rules: [
					{
						id: "color-contrast",
						enabled: true,
					},
					{
						id: "keyboard-navigation",
						enabled: true,
					},
				],
			},
		},
	},
};
