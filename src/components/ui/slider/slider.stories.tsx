import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./slider";

const meta: Meta<typeof Slider> = {
	title: "shadcn/Slider",
	component: Slider,
	tags: ["autodocs"],
	argTypes: {
		min: { control: { type: "number" } },
		max: { control: { type: "number" } },
		defaultValue: { control: { type: "object" } },
		value: { control: { type: "object" } },
		className: { control: false },
	},
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
	args: {
		min: 0,
		max: 100,
		defaultValue: [30],
	},
};

export const Range: Story = {
	args: {
		min: 0,
		max: 100,
		defaultValue: [20, 80],
	},
};
