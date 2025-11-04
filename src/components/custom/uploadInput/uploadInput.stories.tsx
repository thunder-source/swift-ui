import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "./uploadInput"; // Adjust the import path as needed

const meta: Meta<typeof FileUpload> = {
	title: "base/FileUpload",
	component: FileUpload,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		className: { control: "text" },
		acceptTypes: { control: "select" },
		maxFileSizeMB: { control: "number" },
	},
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
	args: {
		className: "",
		acceptTypes: [], // 👈 default accepted types
		maxFileSizeMB: 5,
	},
	render: (args) => (
		<div className="w-[580px]">
			<FileUpload {...args} />
		</div>
	),
};
