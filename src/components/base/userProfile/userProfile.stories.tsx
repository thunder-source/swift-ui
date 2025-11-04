import type { Meta, StoryObj } from "@storybook/react";
import { UserProfile } from "./";

const meta: Meta<typeof UserProfile> = {
	title: "base/UserProfile",
	component: UserProfile,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		name: {
			control: "text",
			description: "Name to display in the profile",
			defaultValue: "Name",
		},
		img: {
			control: {
				type: "select",
			},
			options: [
				"https://i.pravatar.cc/100?img=1",
				"https://i.pravatar.cc/100?img=2",
				"https://i.pravatar.cc/100?img=3",
				"https://i.pravatar.cc/100?img=4",
			],
			description: "Avatar image URL",
			defaultValue: "https://i.pravatar.cc/100?img=1",
		},
	},
};

export default meta;

type Story = StoryObj<typeof UserProfile>;

export const Default: Story = {
	args: {
		name: "Sonali",
		img: "https://i.pravatar.cc/100?img=1",
	},
};
