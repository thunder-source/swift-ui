import { Button } from "@/components/ui";
import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ActionModal, ModalVariant } from "./actionModal";

const meta = {
	title: "custom/ActionModal",
	component: ActionModal,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A reusable action modal component with predefined variants and custom configurations.",
			},
		},
	},
	argTypes: {
		type: {
			control: "select",
			options: Object.values(ModalVariant),
			description: "Predefined modal variant or custom string",
		},
		title: {
			control: "text",
			description: "Custom modal title",
		},
		description: {
			control: "text",
			description: "Custom modal description",
		},
		buttonLabel: {
			control: "text",
			description: "Custom button label",
		},
		showCancelButton: {
			control: "boolean",
			description: "Whether to show cancel button",
		},
		cancelLabel: {
			control: "text",
			description: "Custom cancel button label",
		},
		buttonVariant: {
			control: "select",
			options: [
				"default",
				"destructive",
				"outline",
				"secondary",
				"ghost",
				"link",
				"danger",
			],
			description: "Button variant",
		},
		buttonOutlined: {
			control: "boolean",
			description: "Whether button should be outlined",
		},
		loading: {
			control: "boolean",
			description: "Loading state",
		},
		disabled: {
			control: "boolean",
			description: "Disabled state",
		},
		mail: {
			control: "text",
			description: "Email address to display",
		},
		open: {
			control: "boolean",
			description: "Controlled open state",
		},
		onAction: {
			action: "action-clicked",
			description: "Action button click handler",
		},
		onCancel: {
			action: "cancel-clicked",
			description: "Cancel button click handler",
		},
		onOutsideClick: {
			action: "outside-clicked",
			description: "Outside click handler",
		},
		onOpenChange: {
			action: "open-changed",
			description: "Open state change handler",
		},
	},
	args: {
		onAction: action("action-clicked"),
		onCancel: action("cancel-clicked"),
		onOutsideClick: action("outside-clicked"),
		onOpenChange: action("open-changed"),
	},
} satisfies Meta<typeof ActionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
	args: {
		type: ModalVariant.AnnouncementSuccess,
	},
};

// Predefined variants
export const AnnouncementDelete: Story = {
	args: {
		type: ModalVariant.AnnouncementDelete,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Modal for confirming announcement deletion with danger styling.",
			},
		},
	},
};

export const LeaveApproval: Story = {
	args: {
		type: ModalVariant.LeaveApprove,
	},
	parameters: {
		docs: {
			description: {
				story: "Modal for approving leave requests with success styling.",
			},
		},
	},
};

export const LeaveDenial: Story = {
	args: {
		type: ModalVariant.LeaveDeny,
	},
	parameters: {
		docs: {
			description: {
				story: "Modal for denying leave requests with danger styling.",
			},
		},
	},
};

export const Logout: Story = {
	args: {
		type: ModalVariant.Logout,
	},
	parameters: {
		docs: {
			description: {
				story: "Modal for confirming user logout.",
			},
		},
	},
};

export const DeleteAccount: Story = {
	args: {
		type: ModalVariant.DeleteAccount,
	},
	parameters: {
		docs: {
			description: {
				story: "Modal for confirming account deletion with email display.",
			},
		},
	},
};

// Custom configuration
export const CustomConfiguration: Story = {
	args: {
		title: "Custom Action Required",
		description: "This is a completely custom modal configuration.",
		buttonLabel: "Proceed",
		showCancelButton: true,
		cancelLabel: "Go Back",
		buttonVariant: "secondary",
	},
	parameters: {
		docs: {
			description: {
				story:
					"Modal with completely custom configuration overriding defaults.",
			},
		},
	},
};

// Loading state
export const LoadingState: Story = {
	args: {
		type: ModalVariant.AnnouncementSuccess,
		loading: true,
	},
	parameters: {
		docs: {
			description: {
				story: "Modal showing skeleton loading state.",
			},
		},
	},
};

// Disabled state
export const DisabledState: Story = {
	args: {
		type: ModalVariant.DeleteAccount,
		disabled: true,
	},
	parameters: {
		docs: {
			description: {
				story: "Modal with disabled action button.",
			},
		},
	},
};

// Custom trigger button
export const CustomTrigger: Story = {
	args: {
		type: ModalVariant.Logout,
		button: <Button variant="danger">Custom Logout Button</Button>,
	},
	parameters: {
		docs: {
			description: {
				story: "Modal with custom trigger button.",
			},
		},
	},
};

// Controlled state
export const ControlledState: Story = {
	args: {
		type: ModalVariant.EditSuccess,
		open: false,
	},
	parameters: {
		docs: {
			description: {
				story: "Modal with controlled open state.",
			},
		},
	},
};

// No cancel button
export const NoCancelButton: Story = {
	args: {
		type: ModalVariant.EmployeeAdded,
		showCancelButton: false,
	},
	parameters: {
		docs: {
			description: {
				story: "Modal with only action button, no cancel option.",
			},
		},
	},
};
