import type { Meta, StoryObj } from "@storybook/react";
import { type BirthdayMember, TeamBirthdayList } from "./teamBirthdayCard";

/**
 * Mock data for testing the component
 */
const mockMembers: BirthdayMember[] = [
	{
		id: "1",
		name: "Alice Johnson",
		position: "Senior Frontend Developer",
		img: "https://images.unsplash.com/photo-1494790108755-2616b332c5b2?w=100&h=100&fit=crop&crop=face",
		date: "2024-06-15T00:00:00.000Z",
	},
	{
		id: "2",
		name: "Bob Smith",
		position: "UX Designer",
		img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
		date: "2024-06-18T00:00:00.000Z",
	},
	{
		id: "3",
		name: "Carol Davis",
		position: "Product Manager",
		date: "2024-06-22T00:00:00.000Z",
	},
	{
		id: "4",
		name: "David Wilson",
		position: "Backend Developer",
		img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
		date: "2024-06-25T00:00:00.000Z",
	},
	{
		id: "5",
		name: "Eva Martinez",
		position: "DevOps Engineer",
		img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
		date: "2024-06-28T00:00:00.000Z",
	},
];

const meta: Meta<typeof TeamBirthdayList> = {
	title: "base/TeamBirthdayList",
	component: TeamBirthdayList,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component: `
A comprehensive component for displaying team members with upcoming birthdays. 
Features include:
- Loading states with skeleton UI
- Customizable display options
- Accessibility support
- Responsive design
- Performance optimizations
				`.trim(),
			},
		},
	},
	argTypes: {
		members: {
			description: "Array of team members with birthday information",
			control: "object",
		},
		loading: {
			description: "Loading state configuration",
			control: "object",
		},
		emptyMessage: {
			description: "Custom message shown when no members are present",
			control: "text",
		},
		maxMembers: {
			description: "Maximum number of members to display",
			control: { type: "number", min: 1, max: 10 },
		},
		showPositions: {
			description: "Whether to show member job positions",
			control: "boolean",
		},
		showDates: {
			description: "Whether to show birthday dates",
			control: "boolean",
		},
		sectionLabel: {
			description: "Accessible label for the section",
			control: "text",
		},
		className: {
			description: "Additional CSS classes",
			control: "text",
		},
	},
	args: {
		members: mockMembers,
		loading: { isLoading: false, skeletonCount: 3 },
		emptyMessage: "No upcoming birthdays.",
		showPositions: true,
		showDates: true,
		sectionLabel: "Team Birthday List",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story showing all features
 */
export const Default: Story = {};

/**
 * Loading state with skeleton UI
 */
export const Loading: Story = {
	args: {
		loading: {
			isLoading: true,
			skeletonCount: 4,
		},
	},
	parameters: {
		docs: {
			description: {
				story: "Loading state with customizable skeleton items.",
			},
		},
	},
};

/**
 * Empty state when no members are present
 */
export const Empty: Story = {
	args: {
		members: [],
		emptyMessage: "No team birthdays this month. 🎂",
	},
	parameters: {
		docs: {
			description: {
				story: "Empty state with customizable message.",
			},
		},
	},
};

/**
 * Limited display with maxMembers
 */
export const LimitedDisplay: Story = {
	args: {
		maxMembers: 3,
	},
	parameters: {
		docs: {
			description: {
				story: 'Display limited number of members with "more" indicator.',
			},
		},
	},
};

/**
 * Minimal display without positions and dates
 */
export const Minimal: Story = {
	args: {
		showPositions: false,
		showDates: false,
	},
	parameters: {
		docs: {
			story: "Minimal display showing only names and avatars.",
		},
	},
};

/**
 * Single member
 */
export const SingleMember: Story = {
	args: {
		members: [mockMembers[0]],
	},
	parameters: {
		docs: {
			description: {
				story: "Component with a single member.",
			},
		},
	},
};

/**
 * Members without images
 */
export const WithoutImages: Story = {
	args: {
		members: mockMembers.map((member) => ({ ...member, img: undefined })),
	},
	parameters: {
		docs: {
			description: {
				story: "Members without profile images showing initials fallbacks.",
			},
		},
	},
};

/**
 * Large dataset performance test
 */
export const LargeDataset: Story = {
	args: {
		members: Array.from({ length: 20 }, (_, i) => ({
			id: `member-${i}`,
			name: `Team Member ${i + 1}`,
			position: ["Developer", "Designer", "Manager", "Analyst"][i % 4],
			date: new Date(2024, 5, 1 + i).toISOString(),
		})),
		maxMembers: 10,
	},
	parameters: {
		docs: {
			description: {
				story: "Performance test with large dataset and limited display.",
			},
		},
	},
};

/**
 * Custom styling example
 */
export const CustomStyling: Story = {
	args: {
		className: "border-2 border-dashed border-orange-400 bg-orange-50",
		sectionLabel: "Special Birthday List",
	},
	parameters: {
		docs: {
			description: {
				story: "Example with custom styling and accessibility label.",
			},
		},
	},
};
