/**
 * @file Announcement.stories.tsx
 * @description Storybook stories for the Announcement component
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import AnnouncementCard from "./announcementCard";

// Sample data for stories
const sampleAnnouncements = [
	{
		id: "1",
		time: "09:00",
		title: "Team Meeting",
		description: "Weekly sync-up with the development team",
		category: "Meeting",
	},
	{
		id: "2",
		time: "11:30",
		title: "Project Deadline",
		description: "Final submission for Q2 deliverables",
		priority: "high" as const,
		category: "Deadline",
	},
	{
		id: "3",
		time: "14:00",
		title: "Client Call",
		description: "Discussion with client about new requirements",
		category: "Meeting",
	},
];

const meta = {
	title: "Base/AnnouncementCard",
	component: AnnouncementCard,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A flexible and accessible announcement component for displaying time-based events and notifications.",
			},
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof AnnouncementCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
	args: {
		items: sampleAnnouncements,
		date: "2024-03-20",
	},
};

// Interactive story with callbacks
export const Interactive: Story = {
	args: {
		items: sampleAnnouncements,
		date: "2024-03-20",
	},
};

// Loading state
export const Loading: Story = {
	args: {
		items: [],
		isLoading: true,
	},
};

// Error state
export const ErrorState: Story = {
	args: {
		items: [],
		error: "Failed to load announcements. Please try again later.",
	},
};

// Empty state
export const Empty: Story = {
	args: {
		items: [],
		date: "2024-03-20",
	},
};

// Many items with limit
export const WithMaxItems: Story = {
	args: {
		items: sampleAnnouncements,
		date: "2024-03-20",
		maxItems: 2,
	},
};

// Priority variants
export const PriorityVariants: Story = {
	args: {
		items: [
			{
				id: "high-1",
				time: "09:00",
				title: "Critical System Maintenance",
				description: "Urgent server maintenance required",
				priority: "high",
				// category: "System",
			},
			{
				id: "medium-1",
				time: "14:00",
				title: "Team Meeting",
				description: "Regular weekly sync",
				priority: "medium",
				// category: "Meeting",
			},
			{
				id: "low-1",
				time: "16:00",
				title: "Optional Training",
				description: "Skill development session",
				priority: "low",
				// category: "Training",
			},
		],
		date: "Wednesday, 06 July 2025",
	},
};

// Long content stress test
export const LongContent: Story = {
	args: {
		items: [
			{
				id: "long-1",
				time: "09:00",
				title:
					"This is a very long title that should wrap properly and not break the layout even when it contains many words",
				description:
					"This is an extremely long description that tests how the component handles text wrapping and layout when content exceeds normal lengths. It should maintain proper spacing and readability even with extensive content that spans multiple lines and contains detailed information about the announcement.",
				priority: "medium",
				category: "Long Category Name",
			},
		],
		date: "Wednesday, 06 July 2025",
	},
};

// Dropdown controlled state
export const DropdownControlled: Story = {
	args: {
		items: sampleAnnouncements,
		date: "Wednesday, 06 July 2025",
	},
};

// Custom styling
export const CustomStyling: Story = {
	args: {
		items: sampleAnnouncements,
		date: "Wednesday, 06 July 2025",
		className: "border-2 border-blue-200 bg-blue-50",
	},
};

// Accessibility test story
export const AccessibilityTest: Story = {
	args: {
		items: sampleAnnouncements,
		date: "Wednesday, 06 July 2025",
		// onItemSelect: fn(),
		ariaLabel: "Daily Schedule Announcements",
	},
};

// Performance test with many items
export const PerformanceTest: Story = {
	args: {
		items: Array.from({ length: 100 }, (_, i) => ({
			id: `perf-${i}`,
			time: `${String(Math.floor(i / 6) + 8).padStart(2, "0")}:${String((i % 6) * 10).padStart(2, "0")}`,
			title: `Performance Test Item ${i + 1}`,
			description: `Description for performance test item ${i + 1}`,
			priority: (["low", "medium", "high"] as const)[i % 3],
			category: `Category ${Math.floor(i / 10) + 1}`,
		})),
		maxItems: 20,
		date: "Wednesday, 06 July 2025",
	},
};

// New options button functionality
export const WithOptions: Story = {
	args: {
		items: sampleAnnouncements,
		date: "2024-03-20",
		onOptionsClick: () => alert("Options clicked!"),
	},
};

// Item selection functionality
export const WithItemSelection: Story = {
	args: {
		items: sampleAnnouncements,
		date: "2024-03-20",
		onItemSelect: (item) => alert(`Selected: ${item.title}`),
	},
};
