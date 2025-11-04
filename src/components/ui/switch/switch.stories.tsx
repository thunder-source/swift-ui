import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Switch } from "./switch";

const meta: Meta = {
	title: "shadcn/Switch",
	tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => {
		const [checked, setChecked] = useState(false);
		return <Switch checked={checked} onCheckedChange={setChecked} />;
	},
};
