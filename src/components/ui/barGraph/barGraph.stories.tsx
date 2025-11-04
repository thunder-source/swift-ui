import type { ChartConfig } from "@/components/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { Component as BarGraph } from "./barGraph";

const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
];

const bars = [
	{
		dataKey: "desktop",
		color: "#2563eb",
		radius: 4,
		name: "Desktop",
	},
	{
		dataKey: "mobile",
		color: "#60a5fa",
		radius: 4,
		name: "Mobile",
	},
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "#2563eb",
	},
	mobile: {
		label: "Mobile",
		color: "#60a5fa",
	},
} satisfies ChartConfig;

const meta: Meta<typeof BarGraph> = {
	title: "shadcn/BarGraph",
	component: BarGraph,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof BarGraph>;

export const Default: Story = {
	args: {
		chartConfig: chartConfig,
		data: chartData,
		bars: bars,
		xAxis: {
			show: true,
			dataKey: "month",
			// tickFormatter is not controllable via Storybook UI, so we leave it as default in the component
		},
		yAxis: {
			show: true,
			// tickFormatter is not controllable via Storybook UI, so we leave it as default in the component
		},
		height: 300,
		width: "100%",
		showGrid: true,
		className: "",
	},
	argTypes: {
		chartConfig: {
			control: "object",
			description: "Chart configuration for legend/colors",
		},
		data: { control: "object", description: "Data array for the bar chart" },
		bars: {
			control: "object",
			description: "Array of bar configuration objects",
		},
		xAxis: { control: "object", description: "X Axis configuration" },
		yAxis: { control: "object", description: "Y Axis configuration" },
		height: { control: "number", description: "Height of the chart" },
		width: {
			control: "text",
			description: "Width of the chart (number or string)",
		},
		showGrid: { control: "boolean", description: "Show grid lines" },
		className: { control: "text", description: "Custom className for styling" },
		tooltipContent: { table: { disable: true } }, // Not controllable via UI
	},
};
