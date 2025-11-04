import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import { TimeSelector } from "./time"; // Adjust the import based on your file structure

export default {
	title: "base/TimeSelector",
	component: TimeSelector,
	parameters: {
		layout: "centered", // Centers the component in the viewport
	},
} as Meta;

const Template: StoryFn = (args) => (
	<TimeSelector onSelect={action("time-selected")} {...args} />
);

// The default story that will be loaded when the component is clicked in the Storybook UI
export const Default = {
	args: {
		selected: new Date(),
		onSelect: action("time-selected"),
	},
};

export const CustomTime = Template.bind({});
CustomTime.args = {
	selected: new Date(2023, 0, 1, 4, 29),
	onSelect: (date: Date) =>
		alert(`Selected time: ${date.toLocaleTimeString()}`),
};
