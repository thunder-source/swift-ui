import { SelectInput } from "@/components/base";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Calendar, ChevronDown, FilterIcon } from "lucide-react";
import type React from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Tooltip as RechartsTooltip,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";
import { TabsHeader } from "../tabsHeader";

interface HeadcountData {
	department: string;
	india: number;
	dubai: number;
}

interface ChartConfigItem {
	label: string;
	color: string;
}

interface barGraphCardProps {
	/** Data to visualize */
	data: HeadcountData[];

	/** Max Y-Axis value */
	maxValue?: number;

	/** Chart configuration for colors and labels */
	config?: Record<"india" | "dubai", ChartConfigItem>;

	/** Chart title */
	title?: string;

	/** Subtext or description */
	description?: string;

	/** Show filter button */
	showFilter?: boolean;

	/** Custom className for styling */
	className?: string;

	/** Custom height for chart */
	height?: string;
}

/**
 * barGraphCard component shows a grouped bar chart comparing headcounts by location.
 *
 * @component
 * @example
 * <barGraphCard data={sampleData} />
 */
const BarGraphCard: React.FC<barGraphCardProps> = ({
	data,
	maxValue = 600,
	height = "350px",
	config = {
		india: { label: "India", color: "hsl(var(--primary-blue))" },
		dubai: { label: "Dubai", color: "hsla(var(--primary-orange), 0.3)" },
	},
	title = "Headcount by department/location",
	description = "Visual distribution across locations.",
	showFilter = true,
	className = "",
}) => {
	const selectOptions = [
		{ value: "lastDay", label: "Last Day" },
		{ value: "lastWeek", label: "Last Week" },
		{ value: "lastMonth", label: "Last Month" },
	];

	const rightContent = (
		<div className="flex items-center gap-4">
			<div className="flex items-center gap-4" aria-label="Legend">
				<div className="flex items-center gap-1">
					<div
						className="h-2 w-2 rounded-full"
						style={{ backgroundColor: config.india.color }}
						aria-hidden="true"
					/>
					<span className="text-sm">{config.india.label}</span>
				</div>
				<div className="flex items-center gap-1">
					<div
						className="h-2 w-2 rounded-full"
						style={{ backgroundColor: "hsl(var(--primary-orange))" }}
						aria-hidden="true"
					/>
					<span className="text-sm">{config.dubai.label}</span>
				</div>
			</div>

			<SelectInput
				label=""
				leftIcon={
					<Calendar size={14} className="text-[hsl(var(--primary-blue))]" />
				}
				rightIcon={
					<ChevronDown size={16} className="text-[hsl(var(--primary-blue))]" />
				}
				triggerChildrenClassName="text-[hsl(var(--primary-blue))]"
				triggerClassName="bg-white min-w-34 text-sm h-10 border-[hsl(var(--primary-blue))] text-[hsl(var(--primary-blue))]"
				options={selectOptions}
				placeholder="Select"
			/>

			{showFilter && (
				<Button
					variant="dark"
					size="md"
					className="text-white gap-2"
					iconLeft={<FilterIcon size={16} />}
					iconRight={<ChevronDown size={16} />}
					aria-label="Filter chart"
				>
					Filter
				</Button>
			)}
		</div>
	);

	return (
		<div
			className={`w-full p-8 pb-6 rounded-2xl shadow space-y-4 border-[hsla(var(--border-grey),0.5)] border ${className}`}
		>
			<TabsHeader
				title={title}
				description={description}
				rightContent={rightContent}
			/>

			<ChartContainer
				config={config}
				className="mt-12 w-full"
				style={{ height }}
			>
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={data}
						margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
						barGap={10}
					>
						<CartesianGrid vertical={false} strokeDasharray="3 3" />
						<XAxis
							dataKey="department"
							axisLine={false}
							tickLine={false}
							className="font-semibold"
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							domain={[0, maxValue]}
							ticks={Array.from({ length: 7 }, (_, i) => i * 100)}
							className="font-semibold"
						/>
						<RechartsTooltip content={<ChartTooltipContent />} />
						<Bar
							dataKey="india"
							fill={config.india.color}
							radius={[8, 8, 0, 0]}
							label={({ x, y, width, value }) => (
								<text
									x={(x ?? 0) + (width ?? 0) / 2}
									y={(y ?? 0) - 10}
									fill="hsl(var(--text-light))"
									textAnchor="middle"
									fontSize={12}
								>
									{value}/600
								</text>
							)}
						/>
						<Bar
							dataKey="dubai"
							fill={config.dubai.color}
							radius={[8, 8, 0, 0]}
							label={({ x, y, width, value }) => (
								<text
									x={(x ?? 0) + (width ?? 0) / 2}
									y={(y ?? 0) - 10}
									fill="hsl(var(--text-light))"
									textAnchor="middle"
									fontSize={12}
								>
									{value}/600
								</text>
							)}
						/>
					</BarChart>
				</ResponsiveContainer>
			</ChartContainer>
			<div className="text-center text-sm font-medium">
				Headcount By Department
			</div>
		</div>
	);
};

export { BarGraphCard };
