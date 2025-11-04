import type { Meta, StoryObj } from "@storybook/react";
import { Notification } from "./";

const meta: Meta<typeof Notification> = {
	title: "base/Notification",
	component: Notification,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const Default: Story = {
	render: () => <Notification />,
};
