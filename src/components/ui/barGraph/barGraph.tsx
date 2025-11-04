import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui";
import type React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type BarConfig = {
	dataKey: string;
	color: string;
	radius?: number;
	name?: string;
};

type XAxisConfig = {
	show?: boolean;
	dataKey?: string;
	tickFormatter?: (value: string) => string;
};

type YAxisConfig = {
	show?: boolean;
	tickFormatter?: (value: number) => string;
};

type BarGraphData = {
	[key: string]: string | number;
};

type ChartConfig = {
	[key: string]: {
		label: string;
		color: string;
	};
};

interface BarGraphProps {
	chartConfig: ChartConfig;
	data: BarGraphData[];
	xAxis?: XAxisConfig;
	yAxis?: YAxisConfig;
	bars: BarConfig[];
	height?: number;
	width?: number | string;
	showGrid?: boolean;
	tooltipContent?: React.ReactNode;
	className?: string;
}

function Component({
	chartConfig,
	data,
	xAxis = { show: true, dataKey: "month" },
	yAxis = { show: true },
	bars,
	height = 300,
	width = "100%",
	showGrid = true,
}: BarGraphProps) {
	return (
		<ChartContainer config={chartConfig} className="min-h-[300px] w-full ">
			<BarGraph
				data={data}
				xAxis={{
					show: xAxis.show ?? true,
					dataKey: xAxis.dataKey ?? "month",
					tickFormatter: (value) => value.slice(0, 3),
				}}
				yAxis={{
					show: yAxis.show ?? true,
				}}
				bars={bars}
				height={height}
				width={width}
				showGrid={showGrid}
				tooltipContent={<ChartTooltipContent />}
				className=""
				chartConfig={{}}
			/>
		</ChartContainer>
	);
}

function BarGraph({
	data,
	xAxis = { show: true, dataKey: "month" },
	yAxis = { show: true },
	bars,
	height = 300,
	width = "100%",
	showGrid = true,
	className = "",
}: BarGraphProps) {
	return (
		<div className={className} style={{ width, minHeight: height }}>
			<BarChart
				data={data}
				width={typeof width === "number" ? width : undefined}
				height={height}
			>
				{showGrid && <CartesianGrid vertical={false} />}
				{yAxis.show && (
					<YAxis
						tickLine={false}
						axisLine={false}
						tickMargin={10}
						tickFormatter={yAxis.tickFormatter}
					/>
				)}
				{xAxis.show && (
					<XAxis
						dataKey={xAxis.dataKey}
						tickLine={false}
						axisLine={false}
						tickMargin={10}
						tickFormatter={xAxis.tickFormatter}
					/>
				)}
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="dashed" />}
				/>
				{bars.map((bar) => (
					<Bar
						key={bar.dataKey}
						dataKey={bar.dataKey}
						fill={bar.color}
						radius={bar.radius ?? 4}
						name={bar.name}
					/>
				))}
			</BarChart>
		</div>
	);
}

export {
	Component,
	BarGraph,
	type BarGraphProps,
	type XAxisConfig,
	type YAxisConfig,
	type BarConfig,
};
