import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { type Note, ViewNote, type ViewNoteModalProps } from "./viewNote";

/**
 * ViewNote component displays a modal with a collection of notes.
 * Each note includes metadata like author, role, timestamp, and content.
 */
const meta = {
	title: "base/ViewNote",
	component: ViewNote,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A modal component for displaying notes with rich metadata and customization options.",
			},
		},
	},
	argTypes: {
		open: {
			control: "boolean",
			description: "Controls whether the modal is open",
		},
		title: {
			control: "text",
			description: "Modal title",
		},
		description: {
			control: "text",
			description: "Modal description/subtitle",
		},
		notes: {
			control: "object",
			description: "Array of notes to display",
		},
		hideCloseButton: {
			control: "boolean",
			description: "Hide the close button",
		},
		modalButton: {
			control: "object",
			description: "Configuration for the trigger button",
		},
		className: {
			control: "text",
			description: "Additional CSS classes",
		},
		onOpenChange: {
			action: "openChanged",
			description: "Callback when modal open state changes",
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ViewNote>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample notes data
const sampleNotes: Note[] = [
	{
		id: "1",
		label: "Important",
		labelColor: "#dc3545",
		author: "John Doe",
		role: "Project Manager",
		timestamp: "2024-01-15T10:30:00Z",
		content:
			"This is an important note about the project timeline. We need to ensure all deliverables are completed by the end of the month.",
	},
	{
		id: "2",
		label: "Follow-up",
		labelColor: "#17a2b8",
		author: "Jane Smith",
		role: "Developer",
		timestamp: "2024-01-14T14:20:00Z",
		content:
			"Follow up on the API integration. The endpoints are ready for testing.",
	},
	{
		id: "3",
		label: "Meeting",
		labelColor: "#28a745",
		author: "Mike Johnson",
		role: "Designer",
		timestamp: "2024-01-13T09:15:00Z",
		content:
			"Meeting notes from design review:\n- Approved new color scheme\n- Updated typography guidelines\n- Finalized component library structure",
	},
];

/**
 * Controlled component wrapper for Storybook
 */
const ControlledViewNote = (props: ViewNoteModalProps) => {
	const [open, setOpen] = useState(props.open || false);

	return (
		<ViewNote
			{...props}
			open={open}
			onOpenChange={(isOpen) => {
				setOpen(isOpen);
				props.onOpenChange?.(isOpen);
			}}
		/>
	);
};

// Default story
export const Default: Story = {
	render: (args) => <ControlledViewNote {...args} />,
	args: {
		title: "Project Notes",
		description: "Notes for Sheetal Sharma",
		notes: sampleNotes,
		modalButton: {
			text: "View Notes",
			variant: "default",
			size: "md",
		},
	},
};

// Empty state
export const EmptyState: Story = {
	render: (args) => <ControlledViewNote {...args} />,
	args: {
		title: "Project Notes",
		description: "No notes available",
		notes: [],
		modalButton: {
			text: "View Notes",
			variant: "outline",
		},
	},
};

// Single note
export const SingleNote: Story = {
	render: (args) => <ControlledViewNote {...args} />,
	args: {
		title: "Quick Note",
		notes: [sampleNotes[0]],
		modalButton: {
			text: "View Note",
			variant: "secondary",
		},
	},
};

// Custom button styling
export const CustomButton: Story = {
	render: (args) => <ControlledViewNote {...args} />,
	args: {
		title: "Important Notes",
		notes: sampleNotes.filter((note) => note.label === "Important"),
		modalButton: {
			text: "🔥 View Important Notes",
			variant: "destructive",
			size: "lg",
		},
	},
};

// No close button
export const NoCloseButton: Story = {
	render: (args) => <ControlledViewNote {...args} />,
	args: {
		title: "Mandatory Review",
		description: "Please review all notes before proceeding",
		notes: sampleNotes,
		hideCloseButton: true,
		modalButton: {
			text: "Start Review",
		},
	},
};

// Custom header
export const CustomHeader: Story = {
	render: (args) => <ControlledViewNote {...args} />,
	args: {
		notes: sampleNotes,
		customHeader: (
			<div className="text-center space-y-2">
				<h2 className="text-2xl font-bold text-purple-600">
					📝 Team Notes Dashboard
				</h2>
				<p className="text-sm text-gray-600">
					Latest updates from your team members
				</p>
				<div className="flex justify-center gap-2 mt-4">
					<span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
						{sampleNotes.length} notes
					</span>
					<span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
						All reviewed
					</span>
				</div>
			</div>
		),
		modalButton: {
			text: "Open Dashboard",
			variant: "default",
		},
	},
};

// Long content
export const LongContent: Story = {
	render: (args) => <ControlledViewNote {...args} />,
	args: {
		title: "Detailed Notes",
		notes: [
			{
				id: "long-1",
				label: "Documentation",
				labelColor: "#6f42c1",
				author: "Technical Writer",
				role: "Documentation Team",
				timestamp: "2024-01-16T11:00:00Z",
				content: `This is a comprehensive note with extensive content that demonstrates how the component handles longer text content gracefully.

Key points covered:
• System architecture overview
• Database schema design principles  
• API endpoint documentation standards
• Testing methodology and best practices
• Deployment procedures and rollback strategies

The component should maintain readability and proper spacing even with substantial amounts of text content. This ensures a good user experience regardless of note length.

Additional considerations:
- Mobile responsiveness
- Accessibility compliance
- Performance optimization
- Error handling scenarios`,
			},
			...sampleNotes,
		],
		modalButton: {
			text: "View Documentation",
		},
	},
};

// Accessibility focused
export const AccessibilityShowcase: Story = {
	render: (args) => <ControlledViewNote {...args} />,
	args: {
		title: "Accessibility Compliant Notes",
		description: "Demonstrating proper ARIA labels and semantic markup",
		notes: sampleNotes,
		"aria-label": "Project notes modal",
		"aria-describedby": "modal-description",
		modalButton: {
			text: "Open Accessible Modal",
			variant: "outline",
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					"This story showcases the accessibility features including proper ARIA labels, semantic HTML, and keyboard navigation support.",
			},
		},
	},
};
