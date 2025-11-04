import { Button } from "@/components/ui";
import type { Meta, StoryObj } from "@storybook/react";
import {
	Modal,
	ModalContent,
	ModalDescription,
	ModalTitle,
	ModalTrigger,
} from "./modal";

type ModalStoryArgs = {
	modalTitle: string;
	modalDescription: string;
	buttonLabel: string;
};

const meta: Meta<ModalStoryArgs> = {
	title: "shadcn/Modal",
	component: Modal,
	tags: ["autodocs"],
	argTypes: {
		modalTitle: { control: "text", defaultValue: "Modal Title" },
		modalDescription: {
			control: "text",
			defaultValue: "This is a modal description.",
		},
		buttonLabel: { control: "text", defaultValue: "Open Modal" },
	},
};
export default meta;
type Story = StoryObj<ModalStoryArgs>;

export const Default: Story = {
	args: {
		modalTitle: "Modal Title",
		modalDescription: "This is a modal description.",
		buttonLabel: "Open Modal",
	},
	render: ({ modalTitle, modalDescription, buttonLabel }) => (
		<Modal>
			<ModalTrigger asChild>
				<Button>{buttonLabel}</Button>
			</ModalTrigger>
			<ModalContent>
				<ModalTitle>{modalTitle}</ModalTitle>
				<ModalDescription>{modalDescription}</ModalDescription>
			</ModalContent>
		</Modal>
	),
};
