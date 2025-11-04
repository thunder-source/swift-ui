import type { Meta, StoryObj } from "@storybook/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./card";

const meta: Meta = {
	title: "shadcn/Card",
	tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => (
		<Card>
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>Card description goes here.</CardDescription>
			</CardHeader>
			<CardContent>Card content goes here.</CardContent>
			<CardFooter>Card footer</CardFooter>
		</Card>
	),
};
