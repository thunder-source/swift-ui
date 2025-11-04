import type { Meta, StoryObj } from "@storybook/react";
import { BarGraphCard } from "./barGraphCard";

const meta: Meta<typeof BarGraphCard> = {
	title: "custom/barGraphCard",
	component: BarGraphCard,
};

export default meta;

type Story = StoryObj<typeof BarGraphCard>;

const sampleData = [
	{ department: "IT", india: 510, dubai: 350 },
	{ department: "Sales", india: 410, dubai: 300 },
	{ department: "HR", india: 210, dubai: 190 },
	{ department: "Marketing", india: 600, dubai: 500 },
	{ department: "Finance", india: 210, dubai: 190 },
	{ department: "Marketing", india: 600, dubai: 500 },
	{ department: "Finance", india: 210, dubai: 190 },
];

export const Default: Story = {
	args: {
		data: sampleData,
	},
};

export const WithCustomTitle: Story = {
	args: {
		data: sampleData,
		title: "Team Distribution",
		height: "400px",
		description: "Comparing teams across regions.",
	},
};

export const NoFilterButton: Story = {
	args: {
		data: sampleData,
		showFilter: false,
	},
};
