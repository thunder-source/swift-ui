import type { Meta, StoryObj } from "@storybook/react";

type DialogStoryArgs = {
	dialogTitle: string;
	dialogDescription: string;
	buttonLabel: string;
};
import { Button } from "../button/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "./dialog";

const meta: Meta<DialogStoryArgs> = {
	title: "shadcn/Dialog",
	component: Dialog,
	tags: ["autodocs"],
	argTypes: {
		dialogTitle: { control: "text", defaultValue: "Dialog Title" },
		dialogDescription: {
			control: "text",
			defaultValue: "This is a dialog description.",
		},
		buttonLabel: { control: "text", defaultValue: "Open Dialog" },
	},
};
export default meta;
type Story = StoryObj<DialogStoryArgs>;

export const Default: Story = {
	args: {
		dialogTitle: "Dialog Title",
		dialogDescription: "This is a dialog description.",
		buttonLabel: "Open Dialog",
	},
	render: ({ dialogTitle, dialogDescription, buttonLabel }) => (
		<Dialog>
			<DialogTrigger asChild>
				<Button>{buttonLabel}</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>{dialogTitle}</DialogTitle>
				<DialogDescription>{dialogDescription}</DialogDescription>
			</DialogContent>
		</Dialog>
	),
};
