import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
	title: "shadcn/Input",
	component: Input,
	tags: ["autodocs"],
	argTypes: {
		disabled: { control: "boolean" },
		placeholder: { control: "text" },
		showSearchIcon: { control: "boolean" },
	},
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
	args: {
		placeholder: "Type here...",
	},
};

export const Disabled: Story = {
	args: {
		placeholder: "Disabled",
		disabled: true,
	},
};
export const Search: Story = {
	args: {
		showSearchIcon: true,
		placeholder: "Search Employee By Name Id...",
		type: "search",
	},
};
