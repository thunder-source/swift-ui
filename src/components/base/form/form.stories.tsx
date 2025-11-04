import type { Meta, StoryObj } from "@storybook/react";
import { ProfileForm } from "./form";

const meta: Meta<typeof ProfileForm> = {
	title: "Base/Form",
	component: ProfileForm,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
};

export default meta;

type Story = StoryObj<typeof ProfileForm>;

export const Default: Story = {
	render: () => <ProfileForm />,
};
