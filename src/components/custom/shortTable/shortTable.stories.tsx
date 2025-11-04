import { SHORT_TABLE_MOCK_DATA } from "@/constants";
import type { Meta, StoryObj } from "@storybook/react";
import { ShortTable, type ShortTableProps } from "./shortTable";

export default {
	title: "custom/ShortTable",
	component: ShortTable,
	parameters: {
		layout: "fullscreen",
	},
} as Meta<typeof ShortTable>;

const Template: StoryObj<ShortTableProps> = {
	render: (args) => <ShortTable {...args} />,
};

export const Default = {
	...Template,
	args: {
		data: SHORT_TABLE_MOCK_DATA,
		onSeeMoreClick: () => alert("See more clicked"),
		header: {
			title: "Leave Approval",
			description: "Pending leave approvals",
		},
	},
};

export const Empty = {
	...Template,
	args: {
		data: [],

		onSeeMoreClick: () => alert("Nothing to show"),
		header: {
			title: "Leave Approval",
			description: "Pending leave approvals",
		},
	},
};
