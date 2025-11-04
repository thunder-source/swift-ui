import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
	title: "shadcn/Skeleton",
	component: Skeleton,
	tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
	args: {
		style: { width: 100, height: 20 },
	},
};
