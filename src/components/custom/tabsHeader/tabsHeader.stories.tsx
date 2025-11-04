import { InputField } from "@/components/base/inputField";
import type { Meta, StoryObj } from "@storybook/react";
import { CircleFadingPlus, Download } from "lucide-react";
import { TabsHeader, type TabsHeaderProps } from "./tabsHeader";

const meta: Meta<TabsHeaderProps> = {
	title: "custom/TabsHeader",
	component: TabsHeader,
	tags: ["autodocs"],
	args: {
		title: "Employees",
		description: "Manage your employees",
		count: 128,
	},
	argTypes: {
		className: { table: { disable: true } },
		buttonText: { table: { disable: true } },
		onButtonClick: { table: { disable: true } },
	},
};

export default meta;

type Story = StoryObj<TabsHeaderProps>;

export const Default: Story = {
	args: {
		button: [
			{
				buttonText: "Add Employee",
				onButtonClick: () => alert("Add Employee clicked"),
				variant: "default",
				outlined: true,
				iconLeft: <CircleFadingPlus size={20} />,
				className: "bg-blue-600 hover:bg-blue-700 text-white",
			},
		],
	},
};

export const MultipleButtons: Story = {
	args: {
		button: [
			{
				buttonText: "Add",
				onButtonClick: () => alert("Add clicked"),
				variant: "default",
				iconLeft: <CircleFadingPlus size={20} />,
				className: "bg-green-600 text-white",
			},
			{
				buttonText: "Export",
				onButtonClick: () => alert("Export clicked"),
				variant: "outline",
				iconLeft: <Download size={20} />,
				className: "text-blue-700 border-blue-700",
			},
		],
	},
};

export const LegacyButtonSupport: Story = {
	args: {
		buttonText: "Legacy Add",
		onButtonClick: () => alert("Legacy button clicked"),
	},
};

export const NoButton: Story = {
	args: {
		button: [],
	},
};

export const NoCount: Story = {
	args: {
		count: 0,
		button: [
			{
				buttonText: "Start",
				onButtonClick: () => alert("Started"),
				variant: "default",
				className: "bg-purple-600 text-white",
			},
		],
	},
};

/**
 * Example: TabsHeader with rightContent prop
 * Shows a custom action button on the far right
 */
export const WithRightContent: Story = {
	args: {
		title: "Teams",
		description: "Manage your teams and members",
		count: 5,
		rightContent: (
			<InputField
				type="date"
				name="date-filter"
				placeholder="Select date"
				className="w-[180px] ml-2"
				onChange={() => {}}
			/>
		),
	},
};
