import { getIconComponent } from "@/utils/getIconComponent";
import type { Meta, StoryObj } from "@storybook/react";
import * as LucideIcons from "lucide-react";
import { Button } from "./button";

const lucideIconNames = ["None", ...Object.keys(LucideIcons)];

const meta: Meta<typeof Button> = {
	title: "shadcn/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: [
				"default",
				"destructive",
				"outline",
				"secondary",
				"danger",
				"dark",
				"defaultOutline",
			],
		},
		size: {
			control: "select",
			options: ["default", "sm", "lg", "icon"],
		},
		disabled: { control: "boolean" },
		iconLeft: {
			control: { type: "select" },
			options: lucideIconNames,
			defaultValue: "None",
			description: "Lucide icon for the left side (dynamic)",
		},
		iconRight: {
			control: { type: "select" },
			options: lucideIconNames,
			defaultValue: "None",
			description: "Lucide icon for the right side (dynamic)",
		},
	},
};
type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		children: "Button",
		variant: "default",
		size: "default",
		iconLeft: "None",
		iconRight: "None",
	},
	render: (args) => {
		const label = typeof args.children === "string" ? args.children : "Button";
		return (
			<Button
				{...args}
				iconLeft={getIconComponent(args.iconLeft as string)}
				iconRight={getIconComponent(args.iconRight as string)}
			>
				{label}
			</Button>
		);
	},
};

export const WithLeftIcon: Story = {
	args: {
		children: "Left Icon",
		iconLeft: "User",
		iconRight: "None",
		variant: "default",
		size: "default",
	},
	render: Default.render,
};

export const WithRightIcon: Story = {
	args: {
		children: "Right Icon",
		iconLeft: "None",
		iconRight: "ArrowRight",
		variant: "default",
		size: "default",
	},
	render: Default.render,
};

export const WithBothIcons: Story = {
	args: {
		children: "Both Icons",
		iconLeft: "User",
		iconRight: "Check",
		variant: "default",
		size: "default",
	},
	render: Default.render,
};

export const Destructive: Story = {
	args: {
		children: "Destructive",
		variant: "destructive",
	},
};

export const Outline: Story = {
	args: {
		children: "Outline",
		variant: "outline",
	},
};

// --- All Variants Example ---
export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
			{/* Default Size */}
			<div>
				<div style={{ fontWeight: 600, marginBottom: 8 }}>Default Size</div>
				<div style={{ display: "flex", gap: 16 }}>
					<Button variant="default" size="default">
						Default
					</Button>
					<Button variant="destructive" size="default">
						Destructive
					</Button>
					<Button variant="outline" size="default">
						Outline
					</Button>
					<Button variant="secondary" size="default">
						Secondary
					</Button>
					<Button variant="danger" size="default">
						Danger
					</Button>
					<Button variant="dark" size="default">
						Dark
					</Button>
					<Button variant="defaultOutline" size="default">
						DefaultOutline
					</Button>
				</div>
			</div>
			{/* Small Size */}
			<div>
				<div style={{ fontWeight: 600, marginBottom: 8 }}>Small Size</div>
				<div style={{ display: "flex", gap: 16 }}>
					<Button variant="default" size="sm">
						Default
					</Button>
					<Button variant="destructive" size="sm">
						Destructive
					</Button>
					<Button variant="outline" size="sm">
						Outline
					</Button>
					<Button variant="secondary" size="sm">
						Secondary
					</Button>
					<Button variant="danger" size="sm">
						Danger
					</Button>
					<Button variant="dark" size="sm">
						Dark
					</Button>
					<Button variant="defaultOutline" size="sm">
						DefaultOutline
					</Button>
				</div>
			</div>
			{/* Large Size */}
			<div>
				<div style={{ fontWeight: 600, marginBottom: 8 }}>Large Size</div>
				<div style={{ display: "flex", gap: 16 }}>
					<Button variant="default" size="lg">
						Default
					</Button>
					<Button variant="destructive" size="lg">
						Destructive
					</Button>
					<Button variant="outline" size="lg">
						Outline
					</Button>
					<Button variant="secondary" size="lg">
						Secondary
					</Button>
					<Button variant="danger" size="lg">
						Danger
					</Button>
					<Button variant="dark" size="lg">
						Dark
					</Button>
					<Button variant="defaultOutline" size="lg">
						DefaultOutline
					</Button>
				</div>
			</div>
			{/* Icon Size */}
			<div>
				<div style={{ fontWeight: 600, marginBottom: 8 }}>Icon Size</div>
				<div style={{ display: "flex", gap: 16 }}>
					<Button
						variant="default"
						size="icon"
						aria-label="User"
						style={{ padding: 0, width: 40, height: 40 }}
						iconLeft={getIconComponent("User")}
					/>
					<Button
						variant="destructive"
						size="icon"
						aria-label="ArrowRight"
						style={{ padding: 0, width: 40, height: 40 }}
						iconLeft={getIconComponent("ArrowRight")}
					/>
					<Button
						variant="outline"
						size="icon"
						aria-label="Check"
						style={{ padding: 0, width: 40, height: 40 }}
						iconLeft={getIconComponent("Check")}
					/>
					<Button
						variant="secondary"
						size="icon"
						aria-label="Mail"
						style={{ padding: 0, width: 40, height: 40 }}
						iconLeft={getIconComponent("Mail")}
					/>
					<Button
						variant="danger"
						size="icon"
						aria-label="AlertTriangle"
						style={{ padding: 0, width: 40, height: 40 }}
						iconLeft={getIconComponent("AlertTriangle")}
					/>
					<Button
						variant="dark"
						size="icon"
						aria-label="Eye"
						style={{ padding: 0, width: 40, height: 40 }}
						iconLeft={getIconComponent("Eye")}
					/>
					<Button
						variant="defaultOutline"
						size="icon"
						aria-label="Star"
						style={{ padding: 0, width: 40, height: 40 }}
						iconLeft={getIconComponent("Star")}
					/>
				</div>
			</div>
			{/* Prop Combos */}
			<div>
				<div style={{ fontWeight: 600, marginBottom: 8 }}>Prop Combos</div>
				<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
					<Button variant="secondary" disabled>
						Secondary, Disabled
					</Button>
					<Button variant="danger" outlined>
						Danger, Outlined
					</Button>
					<Button variant="dark" widthFull style={{ minWidth: 120 }}>
						Dark, Full Width
					</Button>
					<Button variant="defaultOutline" borderRadius="full">
						DefaultOutline, Rounded
					</Button>
					<Button variant="default" HoverOutlined>
						Default, HoverOutlined
					</Button>
					<Button variant="outline" borderRadiusHover="lg">
						Outline, Hover Rounded
					</Button>
				</div>
			</div>
			{/* Icon Examples */}
			<div>
				<div style={{ fontWeight: 600, marginBottom: 8 }}>Icon Examples</div>
				<div
					style={{
						display: "flex",
						gap: 16,
						flexWrap: "wrap",
						alignItems: "center",
					}}
				>
					{/* Left Icon */}
					<Button variant="default" iconLeft={getIconComponent("User")}>
						Left Icon
					</Button>
					{/* Right Icon */}
					<Button variant="default" iconRight={getIconComponent("ArrowRight")}>
						Right Icon
					</Button>
					{/* Both Icons */}
					<Button
						variant="default"
						iconLeft={getIconComponent("User")}
						iconRight={getIconComponent("Check")}
					>
						Both Icons
					</Button>
					{/* Icon Only */}
					<Button
						variant="default"
						size="icon"
						aria-label="User Icon Only"
						iconLeft={getIconComponent("User")}
					/>
				</div>
			</div>
		</div>
	),
};

export default meta;
