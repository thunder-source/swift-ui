import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

const meta: Meta<typeof Alert> = {
	title: "shadcn/Alert",
	component: Alert,
	tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
	render: () => (
		<Alert>
			<AlertTitle>Heads up!</AlertTitle>
			<AlertDescription>This is an alert component.</AlertDescription>
		</Alert>
	),
};
