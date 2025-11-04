import { Button } from "@/components/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchHeader } from "./index";

const meta: Meta<typeof SearchHeader> = {
	title: "Custom/SearchHeader",
	component: SearchHeader,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SearchHeader>;

export const Default: Story = {
	args: {
		placeholder: "Search Employee by name, ID...",
		actions: (
			<>
				<Button size="md" className="bg-white text-[hsl(var(--text-dark))]">
					All Office
				</Button>
				<Button size="md" variant="dark">
					Filter
				</Button>
			</>
		),
	},
};

export const CustomPlaceholder: Story = {
	args: {
		placeholder: "Find by team, role, or email...",
		actions: (
			<>
				<Button variant="outline">Department</Button>
				<Button variant="dark">Apply Filters</Button>
			</>
		),
	},
};
