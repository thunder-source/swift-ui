import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxField } from "./checkboxField";

const meta: Meta<typeof CheckboxField> = {
	title: "Base/CheckboxField",
	component: CheckboxField,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "select",
			options: ["sm", "base", "md", "lg"],
			description: "Size of the checkbox",
		},
		color: {
			control: "text",
			description:
				"Color of the checkbox when checked (CSS variable or color name)",
		},
		required: {
			control: "boolean",
			description: "Whether the checkbox is required",
		},
		checked: {
			control: "boolean",
			description: "Controlled checked state",
		},
		error: {
			control: "text",
			description: "Error message to display",
		},
		single: {
			control: "boolean",
			description: "Whether the checkbox is a single checkbox",
		},
		placeHolder: {
			control: "text",
			description: "Placeholder text for the single checkbox",
		},
	},
};

export default meta;
type Story = StoryObj<typeof CheckboxField>;

export const Default: Story = {
	args: {
		name: "default-checkbox",
		label: "Accept terms and conditions",
		single: true,
		placeHolder: "Accept terms and conditions",
	},
};

export const Checked: Story = {
	args: {
		single: true,
		name: "checked-checkbox",
		label: "Checked by default",
		checked: true,
	},
};

export const Required: Story = {
	args: {
		name: "required-checkbox",
		label: "Required checkbox",
		required: true,
	},
};

export const WithError: Story = {
	args: {
		name: "error-checkbox",
		label: "Accept terms",
		error: "You must accept the terms to continue",
	},
};

export const Small: Story = {
	args: {
		name: "small-checkbox",
		label: "Small checkbox",
		size: "sm",
	},
};

export const Large: Story = {
	args: {
		name: "large-checkbox",
		label: "Large checkbox",
		size: "lg",
	},
};

export const CustomColor: Story = {
	args: {
		name: "custom-color-checkbox",
		label: "Custom color checkbox",
		color: "hsl(var(--primary-orange))",
		checked: true,
	},
};

export const WithCustomStyling: Story = {
	args: {
		name: "custom-styling-checkbox",
		label: "Custom styled checkbox",
		color: "hsl(var(--primary-blue))",
		checked: true,
		className: "border-2 border-blue-500 p-1 rounded-lg",
	},
};

export const WithErrorAndRequired: Story = {
	args: {
		name: "error-required-checkbox",
		label: "Terms and conditions",
		required: true,
		error: "This field is required",
	},
};

export const ControlledExample: Story = {
	render: (args) => {
		return (
			<div className="space-y-4">
				<p className="text-sm text-gray-500">
					This example demonstrates a controlled checkbox (using the checked
					prop). In a real application, you would manage this state in your
					component.
				</p>
				<CheckboxField
					{...args}
					name="controlled-checkbox"
					label="Controlled checkbox"
					checked={true}
					single={true}
					onChange={(checked) => console.log("Checkbox changed:", checked)}
				/>
			</div>
		);
	},
};
