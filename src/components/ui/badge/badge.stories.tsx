import { cn } from "@/lib/utils";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";
import { type IconMapKey, iconMap } from "./icon-map";

const meta: Meta<typeof Badge> = {
	title: "shadcn/Badge",
	component: Badge,
	tags: ["autodocs"],
	argTypes: {
		children: { control: "text" },
		variant: {
			control: "select",
			options: [
				"default",
				"secondary",
				"destructive",
				"outline",
				"info",
				"warning",
				"success",
				"gray",
			],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
		showIcon: {
			control: "boolean",
		},
		closable: {
			control: "boolean",
		},
		startIcon: {
			control: "select",
			options: [
				undefined,
				"CheckCircle",
				"AlertTriangle",
				"Info",
				"Circle",
				"Check",
				"HelpCircle",
				"Cross",
			],
		},
		endIcon: {
			control: "select",
			options: [
				undefined,
				"CheckCircle",
				"AlertTriangle",
				"Info",
				"Circle",
				"Check",
				"HelpCircle",
				"Cross",
			],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Badge>;

const renderBadge = (args: React.ComponentProps<typeof Badge>) => {
	const resolvedStartIcon =
		typeof args.startIcon === "string" && args.startIcon in iconMap
			? iconMap[args.startIcon as IconMapKey]
			: args.startIcon;
	const resolvedEndIcon =
		typeof args.endIcon === "string" && args.endIcon in iconMap
			? iconMap[args.endIcon as IconMapKey]
			: args.endIcon;

	return (
		<div className="flex gap-2 flex-wrap">
			<Badge
				{...args}
				variant={args.variant}
				showIcon={args.showIcon}
				closable={args.closable}
				onClose={args.onClose}
				startIcon={resolvedStartIcon}
				endIcon={resolvedEndIcon}
				className={cn(args.className)}
			>
				{args.children}
			</Badge>
		</div>
	);
};

export const Default: Story = {
	args: {
		children: "Badge",
		variant: "default",
	},
	render: renderBadge,
};

export const SuccessWithIcon: Story = {
	args: {
		children: "Saved",
		variant: "success",
		size: "sm",
		showIcon: true,
	},
	render: renderBadge,
};

export const InfoWithIcon: Story = {
	args: {
		children: "Syncing",
		variant: "info",
		showIcon: true,
	},
	render: renderBadge,
};

export const StartIconOnly: Story = {
	args: {
		startIcon: "CheckCircle",
		variant: "success",
	},
	render: renderBadge,
};

export const EndIconOnly: Story = {
	args: {
		endIcon: "AlertTriangle",
		variant: "warning",
	},
	render: renderBadge,
};

export const BothIconsWithLabel: Story = {
	args: {
		startIcon: "Info",
		endIcon: "CheckCircle",
		children: "Info Synced",
		variant: "info",
	},
	render: renderBadge,
};

export const CustomReactIcon: Story = {
	args: {
		startIcon: <span style={{ color: "purple", fontSize: 18 }}>★</span>,
		children: "Starred",
		variant: "secondary",
	},
	render: renderBadge,
};

export const FallbackShowIcon: Story = {
	args: {
		children: "Auto Icon",
		variant: "success",
		showIcon: true,
	},
	render: renderBadge,
};

export const Closable: Story = {
	args: {
		children: "Error",
		variant: "destructive",
		showIcon: true,
		closable: true,
		onClose: () => alert("Closed!"),
	},
	render: renderBadge,
};

export const AllVariants: Story = {
	args: {
		children: "Status",
		size: "md",
		showIcon: true,
	},
	render: (args) => {
		const variants = [
			"default",
			"secondary",
			"destructive",
			"outline",
			"info",
			"warning",
			"success",
			"gray",
		] as const;

		return (
			<div className="flex flex-wrap gap-2">
				{variants.map((variant) => (
					<Badge
						key={variant}
						className="cursor-pointer"
						{...args}
						variant={variant}
						showIcon={args.showIcon}
					>
						{variant.charAt(0).toUpperCase() + variant.slice(1)}
					</Badge>
				))}
			</div>
		);
	},
};
