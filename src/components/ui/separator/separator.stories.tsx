import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";

const meta: Meta<typeof Separator> = {
	title: "shadcn/Separator",
	component: Separator,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
	args: {
		orientation: "horizontal",
		decorative: true,
	},
};

export const Vertical: Story = {
	args: {
		orientation: "vertical",
		decorative: true,
	},
};

export const ThemedSeparator: Story = {
	args: {
		...Horizontal.args,
		className: "bg-blue-500 h-1",
	},
};

export const TextSeparator: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Separator className="flex-1" />
			<span className="text-sm text-gray-500">OR</span>
			<Separator className="flex-1" />
		</div>
	),
};
