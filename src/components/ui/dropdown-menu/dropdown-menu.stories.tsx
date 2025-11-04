import { Button } from "@/components/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./dropdown-menu";

const meta: Meta<typeof DropdownMenu> = {
	title: "shadcn/DropdownMenu",
	component: DropdownMenu,
	tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

const DropdownMenuDemo = () => {
	const [buttonLabel, setButtonLabel] = useState("Open Menu");
	const [item1, setItem1] = useState("Item 1");
	const [item2, setItem2] = useState("Item 2");
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
					Button Label:
					<input
						value={buttonLabel}
						onChange={(e) => setButtonLabel(e.target.value)}
						style={{ marginRight: 8 }}
					/>
				</label>
				<label>
					Item 1:
					<input
						value={item1}
						onChange={(e) => setItem1(e.target.value)}
						style={{ marginRight: 8 }}
					/>
				</label>
				<label>
					Item 2:
					<input value={item2} onChange={(e) => setItem2(e.target.value)} />
				</label>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button>{buttonLabel}</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>{item1}</DropdownMenuItem>
					<DropdownMenuItem>{item2}</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export const Default: Story = {
	render: () => <DropdownMenuDemo />,
};
