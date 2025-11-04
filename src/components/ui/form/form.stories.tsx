import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "./form";

const meta: Meta<typeof Form> = {
	title: "shadcn/Form",
	component: Form,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
	args: {
		children: (
			<div className="space-y-4">
				<h3>Sample Form</h3>
				<p>Form content goes here</p>
			</div>
		),
	},
};

export const HorizontalLayout: Story = {
	args: {
		...Default.args,
		layout: "horizontal",
	},
};

export const WithValidation: Story = {
	args: {
		children: (
			<div className="space-y-4">
				<h3>Contact Form</h3>
				<input
					type="email"
					placeholder="Email"
					className="border p-2 rounded"
					required
				/>
				<p className="text-red-500 text-sm">Email is required</p>
			</div>
		),
		showValidation: true,
	},
};

export const SubmittingState: Story = {
	args: {
		...Default.args,
		isSubmitting: true,
		submitButtonText: "Processing...",
	},
};
