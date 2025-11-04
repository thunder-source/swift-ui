import { Button } from "@/components/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./tooltip";

const meta: Meta<typeof Tooltip> = {
	title: "shadcn/Tooltip",
	component: Tooltip,
	tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

const TooltipDemo = () => {
	const [label, setLabel] = useState("Hover me");
	const [content, setContent] = useState("Tooltip content");
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 12,
				alignItems: "flex-start",
			}}
		>
			<div>
				<label>
					Button Label:{" "}
					<input
						value={label}
						onChange={(e) => setLabel(e.target.value)}
						style={{ marginRight: 8 }}
					/>
				</label>
				<label>
					Tooltip Content:{" "}
					<input value={content} onChange={(e) => setContent(e.target.value)} />
				</label>
			</div>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button>{label}</Button>
				</TooltipTrigger>
				<TooltipContent>{content}</TooltipContent>
			</Tooltip>
		</div>
	);
};

export const Default: Story = {
	render: () => (
		<TooltipProvider>
			<TooltipDemo />
		</TooltipProvider>
	),
};
