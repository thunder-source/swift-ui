// MultiSelectFilter.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelectFilter } from "./multiSelectFilter";

const meta: Meta<typeof MultiSelectFilter> = {
	title: "Custom/MultiSelectFilter",
	component: MultiSelectFilter,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		roles: {
			control: {
				type: "select",
			},
			description: "List of roles to display as filter buttons",
		},
		label: {
			control: {
				type: "text",
			},
			description: "Label displayed above the roles",
		},
	},
	args: {
		label: "Role",
		roles: ["Admin", "HR", "Manager", "Employee"],
	},
};

export default meta;

type Story = StoryObj<typeof MultiSelectFilter>;

export const Default: Story = {
	render: (args) => <MultiSelectFilter {...args} />,
};
