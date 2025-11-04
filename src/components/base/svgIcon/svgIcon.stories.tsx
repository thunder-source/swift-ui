import type { Meta, StoryObj } from "@storybook/react";
import { type IconProps, SvgIcon, availableSvgNames } from "./svgIcon";

const meta: Meta<typeof SvgIcon> = {
	title: "Base/SvgIcon",
	component: SvgIcon,
	tags: ["autodocs"],
	argTypes: {
		name: {
			control: "select",
			options: availableSvgNames,
			description: "Name of the SVG icon to render.",
		},
		size: {
			control: "number",
			description: "Size of the icon.",
			defaultValue: 24,
		},
		color: {
			control: "color",
			description: "Color of the icon.",
			defaultValue: "currentColor",
		},
		className: {
			control: "text",
			description: "Additional CSS classes.",
		},
	},
};

export default meta;
type Story = StoryObj<typeof SvgIcon>;

export const Default: Story = {
	args: {
		name: availableSvgNames[0],
		size: 48,
		color: "#61dafb",
	} as IconProps,
};

export const AllIcons: Story = {
	render: (args) => (
		<div style={{ display: "flex", gap: 24 }}>
			{availableSvgNames.map((name) => (
				<div
					key={name}
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<SvgIcon {...args} name={name} />
					<span style={{ marginTop: 8 }}>{name}</span>
				</div>
			))}
		</div>
	),
	args: {
		size: 32,
		color: "currentColor",
	},
};
