import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { AlertTriangle, Bell, CheckCircle, XCircle } from "lucide-react";
import React from "react";
import NotificationList from "./notificationList";

const meta: Meta<typeof NotificationList> = {
	title: "base/NotificationList",
	component: NotificationList,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A flexible notification card component with expand/collapse functionality and semantic severity levels.",
			},
		},
	},
	argTypes: {
		title: {
			control: "text",
			description: "The notification title",
			table: {
				type: { summary: "string" },
			},
		},
		description: {
			control: "text",
			description: "The notification content text",
			table: {
				type: { summary: "string" },
			},
		},
		dateLabel: {
			control: "text",
			description: "Optional date/time label",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" },
			},
		},
		maxChars: {
			control: { type: "range", min: 50, max: 500, step: 10 },
			description: "Maximum characters before truncation",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "130" },
			},
		},
		severity: {
			control: "select",
			options: ["info", "warning", "error", "success"],
			description: "Notification severity level",
			table: {
				type: { summary: "NotificationSeverity" },
				defaultValue: { summary: "info" },
			},
		},
		interactive: {
			control: "boolean",
			description: "Whether the notification is interactive",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" },
			},
		},
		expanded: {
			control: "boolean",
			description: "Controlled expand state",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "undefined" },
			},
		},
		onToggleExpand: {
			action: "onToggleExpand",
			description: "Callback when expand state changes",
			table: {
				type: { summary: "(expanded: boolean) => void" },
			},
		},
		onClick: {
			action: "onClick",
			description: "Callback when notification is clicked",
			table: {
				type: { summary: "() => void" },
			},
		},
	},
	args: {
		title: "System Notification",
		description:
			"This is a sample notification with some content that demonstrates the expand/collapse functionality when the text exceeds the maximum character limit.",
		dateLabel: "Today",
		maxChars: 130,
		severity: "info",
		interactive: true,
		onToggleExpand: action("onToggleExpand"),
		onClick: action("onClick"),
	},
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default notification with all basic features
 */
export const Default: Story = {};

/**
 * Short notification that doesn't need expansion
 */
export const Short: Story = {
	args: {
		title: "Quick Update",
		description: "This is a short notification.",
		dateLabel: "5 min ago",
	},
};

/**
 * Long notification that demonstrates expansion
 */
export const Long: Story = {
	args: {
		title: "Detailed System Maintenance Notice",
		description:
			"We will be performing scheduled maintenance on our servers this weekend from Saturday 2:00 AM to Sunday 6:00 AM EST. During this time, some services may be temporarily unavailable. We apologize for any inconvenience this may cause and appreciate your patience as we work to improve our infrastructure and provide you with better service.",
		maxChars: 100,
		dateLabel: "1 hour ago",
	},
};

/**
 * Different severity levels
 */
export const SeverityLevels: Story = {
	render: () => (
		<div className="space-y-4">
			<NotificationList
				title="Information"
				description="This is an informational notification for general updates."
				severity="info"
				dateLabel="Now"
			/>
			<NotificationList
				title="Warning"
				description="This is a warning notification that requires attention."
				severity="warning"
				dateLabel="2 min ago"
			/>
			<NotificationList
				title="Error"
				description="This is an error notification indicating something went wrong."
				severity="error"
				dateLabel="5 min ago"
			/>
			<NotificationList
				title="Success"
				description="This is a success notification confirming a completed action."
				severity="success"
				dateLabel="10 min ago"
			/>
		</div>
	),
	parameters: {
		layout: "padded",
	},
};

/**
 * Custom icons for different notification types
 */
export const CustomIcons: Story = {
	render: () => (
		<div className="space-y-4">
			<NotificationList
				title="New Message"
				description="You have received a new message from the support team."
				icon={Bell}
				severity="info"
				dateLabel="Just now"
			/>
			<NotificationList
				title="Security Alert"
				description="Unusual login activity detected on your account."
				icon={AlertTriangle}
				severity="warning"
				dateLabel="1 hour ago"
			/>
			<NotificationList
				title="Backup Failed"
				description="The scheduled backup process encountered an error."
				icon={XCircle}
				severity="error"
				dateLabel="2 hours ago"
			/>
			<NotificationList
				title="Task Completed"
				description="Your data export has been successfully completed."
				icon={CheckCircle}
				severity="success"
				dateLabel="3 hours ago"
			/>
		</div>
	),
	parameters: {
		layout: "padded",
	},
};

/**
 * Controlled expansion state
 */
export const Controlled: Story = {
	render: function ControlledExample() {
		const [expanded, setExpanded] = React.useState(false);

		return (
			<NotificationList
				title="Controlled Expansion"
				description="This notification has its expansion state controlled externally. The expand/collapse state is managed by the parent component, allowing for programmatic control over the notification's visibility."
				expanded={expanded}
				onToggleExpand={setExpanded}
				dateLabel="Now"
			/>
		);
	},
};

/**
 * Non-interactive notification
 */
export const NonInteractive: Story = {
	args: {
		title: "Read-Only Notification",
		description:
			"This notification is not interactive and cannot be expanded or clicked.",
		interactive: false,
		dateLabel: "System",
	},
};

/**
 * Without date label
 */
export const WithoutDate: Story = {
	args: {
		title: "Timeless Notification",
		description: "This notification does not display a date or time label.",
		dateLabel: undefined,
	},
};

/**
 * Clickable notification
 */
export const Clickable: Story = {
	args: {
		title: "Clickable Notification",
		description:
			"This entire notification card is clickable and will trigger an action when clicked.",
		onClick: action("notification-clicked"),
	},
};

/**
 * Different character limits
 */
export const CharacterLimits: Story = {
	render: () => (
		<div className="space-y-4">
			<NotificationList
				title="Very Short Limit (50 chars)"
				description="This notification has a very short character limit to demonstrate early truncation behavior."
				maxChars={50}
				dateLabel="Test"
			/>
			<NotificationList
				title="Medium Limit (100 chars)"
				description="This notification has a medium character limit that allows for more content before truncation occurs."
				maxChars={100}
				dateLabel="Test"
			/>
			<NotificationList
				title="Long Limit (200 chars)"
				description="This notification has a longer character limit which permits much more content to be displayed before the truncation and read more functionality is triggered."
				maxChars={200}
				dateLabel="Test"
			/>
		</div>
	),
	parameters: {
		layout: "padded",
	},
};

/**
 * Accessibility showcase
 */
export const Accessibility: Story = {
	args: {
		title: "Accessible Notification",
		description:
			"This notification demonstrates proper accessibility features including ARIA labels, keyboard navigation, and semantic HTML structure.",
		id: "accessible-notification",
		"aria-label": "Important system notification with expand functionality",
		onClick: action("accessible-click"),
	},
};
