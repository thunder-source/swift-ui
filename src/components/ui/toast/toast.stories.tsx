import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./toast";

const meta: Meta<typeof Toast> = {
	title: "shadcn/Toast",
	component: Toast,
	tags: ["autodocs"],
	argTypes: {
		open: { control: "boolean" },
		message: { control: "text" },
		type: {
			control: "select",
			options: ["success", "error", "info", "warning"],
		},
	},
};
export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
	args: {
		open: true,
		message: "This is a toast message!",
		type: "info",
	},
};
