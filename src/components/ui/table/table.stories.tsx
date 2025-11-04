import type { Meta, StoryObj } from "@storybook/react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./table";

const meta: Meta = {
	title: "shadcn/Table",
	tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Header 1</TableHead>
					<TableHead>Header 2</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>Cell 1</TableCell>
					<TableCell>Cell 2</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	),
};
