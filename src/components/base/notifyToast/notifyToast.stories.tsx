import { Button } from "@/components/ui";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { Heart } from "lucide-react";
import { useCallback, useState } from "react";
import { NotifyToast, type ToastType } from "./notifyToast";

const meta: Meta<typeof NotifyToast> = {
	title: "base/NotifyToast",
	component: NotifyToast,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: `
A highly customizable and accessible toast notification component with support for different types, variants, and positions.

## Features
- ♿ Full accessibility support (WCAG 2.1 AA)
- 🎨 Multiple variants and themes
- ⌨️ Keyboard navigation
- 📱 Responsive design
- 🎭 Smooth animations
- 🔧 Controlled state management
        `,
			},
		},
	},
	argTypes: {
		message: {
			control: "text",
			description: "The message to display in the toast",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: '"Notification"' },
			},
		},
		type: {
			control: "select",
			options: ["info", "success", "error"],
			description: "The type of toast notification",
			table: {
				type: { summary: "ToastType" },
				defaultValue: { summary: '"info"' },
			},
		},
		variant: {
			control: "select",
			options: ["default", "subtle", "solid"],
			description: "Visual variant of the toast",
			table: {
				type: { summary: "ToastVariant" },
				defaultValue: { summary: '"default"' },
			},
		},
		position: {
			control: "select",
			options: [
				"top-left",
				"top-center",
				"top-right",
				"bottom-left",
				"bottom-center",
				"bottom-right",
			],
			description: "Position of the toast on screen",
			table: {
				type: { summary: "ToastPosition" },
				defaultValue: { summary: '"top-right"' },
			},
		},
		duration: {
			control: {
				type: "range",
				min: 0,
				max: 10000,
				step: 500,
			},
			description:
				"Duration in milliseconds before auto-close (0 = no auto-close)",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "3000" },
			},
		},
		width: {
			control: "text",
			description: "Custom width (CSS value)",
			table: { type: { summary: "string" } },
		},
		height: {
			control: "text",
			description: "Custom height (CSS value)",
			table: { type: { summary: "string" } },
		},
		bgColor: {
			control: "color",
			description: "Custom background color",
			table: { type: { summary: "string" } },
		},
		textColor: {
			control: "color",
			description: "Custom text color",
			table: { type: { summary: "string" } },
		},
		isVisible: {
			control: "boolean",
			description: "Whether the toast is currently visible (controlled)",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" },
			},
		},
		showCloseButton: {
			control: "boolean",
			description: "Whether to show the close button",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		dismissible: {
			control: "boolean",
			description: "Whether the toast can be dismissed by clicking",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" },
			},
		},
		animated: {
			control: "boolean",
			description: "Whether to animate the toast entrance/exit",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" },
			},
		},
		className: {
			control: "text",
			description: "Custom className for additional styling",
			table: { type: { summary: "string" } },
		},
		testId: {
			control: "text",
			description: "Custom test ID for testing",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: '"notify-toast"' },
			},
		},
		onClose: {
			action: "onClose",
			description: "Callback fired when toast should be closed",
			table: { type: { summary: "() => void" } },
		},
		onClick: {
			action: "onClick",
			description: "Callback fired when toast is clicked",
			table: { type: { summary: "() => void" } },
		},
	},
	args: {
		message: "This is a notification message",
		type: "info",
		variant: "default",
		position: "top-right",
		duration: 3000,
		isVisible: true,
		showCloseButton: false,
		dismissible: true,
		animated: true,
		onClose: action("onClose"),
		onClick: action("onClick"),
	},
};

export default meta;
type Story = StoryObj<typeof NotifyToast>;

// Basic Stories
export const Default: Story = {
	args: {
		message: "This is a default notification",
	},
};

export const Success: Story = {
	args: {
		message: "Operation completed successfully!",
		type: "success",
	},
};

export const Errors: Story = {
	args: {
		message: "An error occurred while processing your request",
		type: "error",
	},
};

export const Info: Story = {
	args: {
		message: "Here is some important information",
		type: "info",
	},
};

// Variant Stories
export const DefaultVariant: Story = {
	args: {
		message: "Default variant with subtle background",
		type: "info",
		variant: "default",
	},
};

export const SubtleVariant: Story = {
	args: {
		message: "Subtle variant with minimal styling",
		type: "success",
		variant: "subtle",
	},
};

export const SolidVariant: Story = {
	args: {
		message: "Solid variant with bold styling",
		type: "error",
		variant: "solid",
	},
};

// Position Stories
export const TopLeft: Story = {
	args: {
		message: "Toast in top-left corner",
		position: "top-left",
		type: "success",
	},
};

export const TopCenter: Story = {
	args: {
		message: "Toast in top-center",
		position: "top-center",
		type: "info",
	},
};

export const BottomRight: Story = {
	args: {
		message: "Toast in bottom-right corner",
		position: "bottom-right",
		type: "error",
	},
};

// Feature Stories
export const WithCloseButton: Story = {
	args: {
		message: "This toast has a close button",
		showCloseButton: true,
		type: "info",
	},
};

export const NonDismissible: Story = {
	args: {
		message: "This toast cannot be dismissed by clicking",
		dismissible: false,
		type: "error",
		duration: 0, // No auto-close
	},
};

export const LongDuration: Story = {
	args: {
		message: "This toast will stay visible for 10 seconds",
		duration: 10000,
		type: "success",
	},
};

export const NoAnimation: Story = {
	args: {
		message: "This toast appears without animation",
		animated: false,
		type: "info",
	},
};

export const CustomStyling: Story = {
	args: {
		message: "This toast has custom colors and sizing",
		bgColor: "#FF6B6B",
		textColor: "#FFFFFF",
		width: "350px",
		type: "info",
	},
};

export const CustomIcon: Story = {
	args: {
		message: "This toast has a custom heart icon",
		customIcon: <Heart size={20} className="text-pink-500" />,
		type: "info",
	},
};

export const LongMessage: Story = {
	args: {
		message:
			"This is a very long message that demonstrates how the toast component handles text wrapping and maintains good readability across multiple lines of content.",
		type: "info",
		width: "400px",
	},
};

// Interactive Stories with Hooks
export const ControlledToast: Story = {
	render: (args) => {
		const [isVisible, setIsVisible] = useState(true);

		const handleClose = useCallback(() => {
			setIsVisible(false);
			action("onClose")();
			// Reset after 2 seconds for demo purposes
			setTimeout(() => setIsVisible(true), 2000);
		}, []);

		return (
			<div>
				<p style={{ marginBottom: "1rem", color: "#666" }}>
					This toast will reappear 2 seconds after closing
				</p>
				<NotifyToast {...args} isVisible={isVisible} onClose={handleClose} />
			</div>
		);
	},
	args: {
		message: "Click to dismiss, will reappear in 2 seconds",
		type: "success",
	},
};

export const ToastManager: Story = {
	render: () => {
		const [toasts, setToasts] = useState<
			Array<{
				id: string;
				message: string;
				type: ToastType;
				visible: boolean;
			}>
		>([]);

		const addToast = useCallback((message: string, type: ToastType) => {
			const id = Math.random().toString(36).substr(2, 9);
			setToasts((prev) => [...prev, { id, message, type, visible: true }]);
		}, []);

		const removeToast = useCallback((id: string) => {
			setToasts((prev) =>
				prev.map((toast) =>
					toast.id === id ? { ...toast, visible: false } : toast,
				),
			);
			// Remove from array after animation
			setTimeout(() => {
				setToasts((prev) => prev.filter((toast) => toast.id !== id));
			}, 300);
		}, []);

		return (
			<div style={{ padding: "2rem" }}>
				<div
					style={{
						marginBottom: "2rem",
						display: "flex",
						gap: "1rem",
						flexWrap: "wrap",
					}}
				>
					<Button
						type="button"
						onClick={() => addToast("Success message!", "success")}
						style={{
							padding: "8px 16px",
							backgroundColor: "#38A169",
							color: "white",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}
					>
						Add Success Toast
					</Button>
					<Button
						type="button"
						onClick={() => addToast("Error occurred!", "error")}
						style={{
							padding: "8px 16px",
							backgroundColor: "#E53E3E",
							color: "white",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}
					>
						Add Error Toast
					</Button>
					<Button
						type="button"
						onClick={() => addToast("Information for you", "info")}
						style={{
							padding: "8px 16px",
							backgroundColor: "#3182CE",
							color: "white",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}
					>
						Add Info Toast
					</Button>
				</div>

				{toasts.map((toast, index) => (
					<NotifyToast
						key={toast.id}
						message={toast.message}
						type={toast.type}
						isVisible={toast.visible}
						position="top-right"
						onClose={() => removeToast(toast.id)}
						style={{
							top: `${1 + index * 5}rem`, // Stack toasts
						}}
					/>
				))}
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"Interactive demo showing multiple toasts with a toast manager pattern.",
			},
		},
	},
};

// Accessibility Stories
export const AccessibilityDemo: Story = {
	render: (args) => (
		<div>
			<div
				style={{
					marginBottom: "1rem",
					padding: "1rem",
					backgroundColor: "#f8f9fa",
					borderRadius: "4px",
				}}
			>
				<h4 style={{ margin: "0 0 0.5rem 0" }}>Accessibility Features:</h4>
				<ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
					<li>
						Press <kbd>Escape</kbd> to close
					</li>
					<li>
						Press <kbd>Enter</kbd> or <kbd>Space</kbd> to interact
					</li>
					<li>Screen reader announces toast content</li>
					<li>Error toasts get immediate focus</li>
				</ul>
			</div>
			<NotifyToast {...args} />
		</div>
	),
	args: {
		message: "Use keyboard to interact with this toast",
		type: "info",
		showCloseButton: true,
	},
};

// All Variants Showcase
export const AllVariants: Story = {
	render: () => (
		<div
			style={{
				display: "grid",
				gap: "1rem",
				gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
			}}
		>
			{(["info", "success", "error"] as const).map((type) =>
				(["default", "subtle", "solid"] as const).map((variant) => (
					<div
						key={`${type}-${variant}`}
						style={{ position: "relative", minHeight: "60px" }}
					>
						<NotifyToast
							message={`${type} - ${variant} variant`}
							type={type}
							variant={variant}
							position="top-left"
							duration={0}
							style={{ position: "relative", top: 0, left: 0 }}
						/>
					</div>
				)),
			)}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: "Showcase of all type and variant combinations.",
			},
		},
	},
};

// Performance Test
export const PerformanceTest: Story = {
	render: () => {
		const [count, setCount] = useState(0);
		const [toasts, setToasts] = useState<number[]>([]);

		const addManyToasts = useCallback(() => {
			const newToasts = Array.from({ length: 10 }, (_, i) => count + i);
			setToasts((prev) => [...prev, ...newToasts]);
			setCount((prev) => prev + 10);
		}, [count]);

		const clearToasts = useCallback(() => {
			setToasts([]);
			setCount(0);
		}, []);

		return (
			<div style={{ padding: "2rem" }}>
				<div style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
					<Button onClick={addManyToasts} style={{ padding: "8px 16px" }}>
						Add 10 Toasts
					</Button>
					<Button onClick={clearToasts} style={{ padding: "8px 16px" }}>
						Clear All ({toasts.length})
					</Button>
				</div>

				{toasts.map((id, index) => (
					<NotifyToast
						key={id}
						message={`Performance test toast #${id}`}
						type={["info", "success", "error"][index % 3] as ToastType}
						position="top-right"
						duration={0}
						onClose={() => setToasts((prev) => prev.filter((t) => t !== id))}
						// style={{ top: `${1 + (index % 5) * 5}rem` }}
					/>
				))}
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"Performance test with multiple toasts to verify memory management and rendering efficiency.",
			},
		},
	},
};
