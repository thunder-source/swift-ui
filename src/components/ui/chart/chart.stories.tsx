import type { Meta, StoryObj } from "@storybook/react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "./chart";

const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
];

const chartConfig: ChartConfig = {
	desktop: {
		label: "Desktop Users",
		color: "#2563eb",
	},
	mobile: {
		label: "Mobile Users",
		color: "#60a5fa",
	},
};

const meta: Meta = {
	title: "SHADCN/Chart",
	component: ChartContainer,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
	render: () => (
		<ChartContainer config={chartConfig} className="min-h-[500px] w-full">
			<BarChart data={chartData}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="month" />
				<YAxis />
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />
				<Bar
					dataKey="desktop"
					fill="hsl(var(--primary-blue))"
					radius={[8, 8, 0, 0]}
				/>
				<Bar
					dataKey="mobile"
					fill="hsla(var(--primary-orange),0.3)"
					radius={[4, 4, 0, 0]}
				/>
			</BarChart>
		</ChartContainer>
	),
};
