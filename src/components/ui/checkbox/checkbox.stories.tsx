import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heart, Shield, Star, Zap } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "./checkbox";

const meta = {
	title: "shadcn/Checkbox",
	component: Checkbox,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A customizable checkbox component built on top of Radix UI's Checkbox primitive. Supports controlled/uncontrolled modes, multiple variants, and full accessibility.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: { type: "radio" },
			options: ["sm", "md", "lg"],
			description: "Size variant of the checkbox",
			table: {
				type: { summary: "sm | md | lg" },
				defaultValue: { summary: "md" },
			},
		},
		variant: {
			control: { type: "radio" },
			options: ["default", "orange", "success", "error"],
			description: "Visual variant of the checkbox",
			table: {
				type: { summary: "default | orange | success | error" },
				defaultValue: { summary: "default" },
			},
		},
		checked: {
			control: { type: "boolean" },
			description: "Controlled checked state",
			table: {
				type: { summary: "boolean" },
			},
		},
		defaultChecked: {
			control: { type: "boolean" },
			description: "Default checked state for uncontrolled usage",
			table: {
				type: { summary: "boolean" },
			},
		},
		disabled: {
			control: { type: "boolean" },
			description: "Whether the checkbox is disabled",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		required: {
			control: { type: "boolean" },
			description: "Whether the checkbox is required",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		name: {
			control: { type: "text" },
			description: "Name attribute for form submission",
			table: {
				type: { summary: "string" },
			},
		},
		value: {
			control: { type: "text" },
			description: "Value attribute for form submission",
			table: {
				type: { summary: "string" },
			},
		},
		"aria-label": {
			control: { type: "text" },
			description: "Accessible label for screen readers",
			table: {
				type: { summary: "string" },
			},
		},
		"aria-describedby": {
			control: { type: "text" },
			description: "ID of element that describes the checkbox",
			table: {
				type: { summary: "string" },
			},
		},
		onCheckedChange: {
			action: "checked changed",
			description: "Callback fired when checked state changes",
			table: {
				type: { summary: "(checked: boolean) => void" },
			},
		},
	},
	args: {
		onCheckedChange: fn(),
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default checkbox with medium size and default variant
 */
export const Default: Story = {
	args: {
		"aria-label": "Default checkbox",
	},
};

/**
 * Controlled checkbox example showing state management
 */
export const Controlled: Story = {
	render: (args) => {
		const [checked, setChecked] = useState(false);

		return (
			<div className="flex flex-col gap-4">
				<Checkbox
					{...args}
					checked={checked}
					onCheckedChange={setChecked}
					aria-label="Controlled checkbox"
				/>
				<p className="text-sm text-muted-foreground">
					Checked: {checked ? "Yes" : "No"}
				</p>
			</div>
		);
	},
};

/**
 * Different size variants
 */
export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-6">
			<div className="flex flex-col items-center gap-2">
				<Checkbox size="sm" defaultChecked aria-label="Small checkbox" />
				<span className="text-xs text-[hsl(var(--text-medium))]">Small</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Checkbox size="md" defaultChecked aria-label="Medium checkbox" />
				<span className="text-xs text-[hsl(var(--text-medium))]">Medium</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Checkbox size="lg" defaultChecked aria-label="Large checkbox" />
				<span className="text-xs text-[hsl(var(--text-medium))]">Large</span>
			</div>
		</div>
	),
};

/**
 * Custom icons demonstration
 */
export const CustomIcons: Story = {
	render: () => (
		<div className="grid grid-cols-2 gap-6">
			<div className="flex items-center gap-3">
				<Checkbox
					variant="error"
					icon={Heart}
					defaultChecked
					aria-label="Heart checkbox"
				/>
				<span className="text-sm text-[hsl(var(--text-dark))]">
					Like this item
				</span>
			</div>
			<div className="flex items-center gap-3">
				<Checkbox
					variant="orange"
					icon={Star}
					defaultChecked
					aria-label="Star checkbox"
				/>
				<span className="text-sm text-[hsl(var(--text-dark))]">
					Add to favorites
				</span>
			</div>
			<div className="flex items-center gap-3">
				<Checkbox
					variant="success"
					icon={Zap}
					defaultChecked
					aria-label="Zap checkbox"
				/>
				<span className="text-sm text-[hsl(var(--text-dark))]">
					Enable fast mode
				</span>
			</div>
			<div className="flex items-center gap-3">
				<Checkbox
					variant="default"
					icon={Shield}
					defaultChecked
					aria-label="Shield checkbox"
				/>
				<span className="text-sm text-[hsl(var(--text-dark))]">
					Enable protection
				</span>
			</div>
		</div>
	),
};

/**
 * Custom JSX element as icon
 */
export const CustomJSXIcon: Story = {
	render: () => (
		<div className="flex items-center gap-6">
			<div className="flex items-center gap-3">
				<Checkbox
					variant="success"
					icon={<span style={{ fontSize: "12px", fontWeight: "bold" }}>✓</span>}
					defaultChecked
					aria-label="Custom checkmark"
				/>
				<span className="text-sm text-[hsl(var(--text-dark))]">
					Custom checkmark
				</span>
			</div>
			<div className="flex items-center gap-3">
				<Checkbox
					variant="orange"
					icon={<span style={{ fontSize: "10px" }}>🎯</span>}
					defaultChecked
					aria-label="Target emoji"
				/>
				<span className="text-sm text-[hsl(var(--text-dark))]">
					Target achieved
				</span>
			</div>
		</div>
	),
};

/**
 * Different visual variants using your custom color scheme
 */
export const Variants: Story = {
	render: () => (
		<div className="flex items-center gap-6">
			<div className="flex flex-col items-center gap-2">
				<Checkbox
					variant="default"
					defaultChecked
					aria-label="Default variant"
				/>
				<span className="text-xs text-[hsl(var(--text-medium))]">Default</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Checkbox variant="orange" defaultChecked aria-label="Orange variant" />
				<span className="text-xs text-[hsl(var(--text-medium))]">Orange</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Checkbox
					variant="success"
					defaultChecked
					aria-label="Success variant"
				/>
				<span className="text-xs text-[hsl(var(--text-medium))]">Success</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Checkbox variant="error" defaultChecked aria-label="Error variant" />
				<span className="text-xs text-[hsl(var(--text-medium))]">Error</span>
			</div>
		</div>
	),
};

/**
 * Disabled states
 */
export const Disabled: Story = {
	render: () => (
		<div className="flex items-center gap-6">
			<div className="flex flex-col items-center gap-2">
				<Checkbox disabled aria-label="Disabled unchecked" />
				<span className="text-xs text-[hsl(var(--text-medium))]">
					Unchecked
				</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Checkbox disabled defaultChecked aria-label="Disabled checked" />
				<span className="text-xs text-[hsl(var(--text-medium))]">Checked</span>
			</div>
		</div>
	),
};

/**
 * Form integration example
 */
export const FormIntegration: Story = {
	render: () => {
		const [formData, setFormData] = useState<Record<string, boolean>>({});

		const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault();
			const form = e.target as HTMLFormElement;
			const data = new FormData(form);
			const result: Record<string, boolean> = {};

			// Get all checkbox values
			for (const [key, value] of data.entries()) {
				result[key] = value === "on";
			}

			setFormData(result);
		};

		return (
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-3">
					<div className="flex items-center gap-2">
						<Checkbox id="terms" name="terms" value="accepted" required />
						<label htmlFor="terms" className="text-sm cursor-pointer">
							Accept terms and conditions{" "}
							<span className="text-destructive">*</span>
						</label>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox id="newsletter" name="newsletter" value="subscribed" />
						<label htmlFor="newsletter" className="text-sm cursor-pointer">
							Subscribe to newsletter
						</label>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox id="marketing" name="marketing" value="opted-in" />
						<label htmlFor="marketing" className="text-sm cursor-pointer">
							Receive marketing emails
						</label>
					</div>
				</div>

				<button
					type="submit"
					className="rounded bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
				>
					Submit
				</button>

				{Object.keys(formData).length > 0 && (
					<div className="mt-4 rounded border p-3">
						<h4 className="text-sm font-medium">Form Data:</h4>
						<pre className="mt-2 text-xs">
							{JSON.stringify(formData, null, 2)}
						</pre>
					</div>
				)}
			</form>
		);
	},
};

/**
 * Accessibility showcase
 */
export const Accessibility: Story = {
	render: () => (
		<div className="space-y-6">
			<div>
				<h3 className="mb-3 text-sm font-medium">With Labels</h3>
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<Checkbox id="visible-label" />
						<label htmlFor="visible-label" className="text-sm cursor-pointer">
							Option with visible label
						</label>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox
							id="hidden-label"
							aria-label="Option with aria-label only"
						/>
						<label htmlFor="hidden-label" className="text-sm cursor-pointer">
							Option with hidden label (has aria-label)
						</label>
					</div>
				</div>
			</div>

			<div>
				<h3 className="mb-3 text-sm font-medium">With Descriptions</h3>
				<div className="space-y-2">
					<div className="flex items-start gap-2">
						<Checkbox
							id="complex-option"
							className="mt-0.5"
							aria-describedby="complex-description"
						/>
						<div>
							<label
								htmlFor="complex-option"
								className="text-sm cursor-pointer"
							>
								Complex option
							</label>
							<div
								id="complex-description"
								className="text-xs text-muted-foreground mt-1"
							>
								This option has additional context provided via aria-describedby
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="rounded border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950">
				<p className="text-xs text-amber-800 dark:text-amber-200">
					💡 Try navigating with Tab/Shift+Tab and activating with Space or
					Enter
				</p>
			</div>
		</div>
	),
};
