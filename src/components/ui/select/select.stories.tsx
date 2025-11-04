import type { Meta, StoryObj } from "@storybook/react";
import { ListCheck } from "lucide-react";
import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./select";

type SelectVariant =
	| "default"
	| "primary"
	| "destructive"
	| "outline"
	| "secondary"
	| "danger"
	| "dark";

const meta = {
	title: "shadcn/Select",
	component: Select,
	tags: ["autodocs"],
	argTypes: {
		disabled: {
			control: "boolean",
			description: "Whether the select is disabled",
		},
		defaultValue: {
			control: "text",
			description: "The default value of the select",
		},
	},
} satisfies Meta<typeof Select>;

export default meta;
type SelectStoryArgs = {
	placeholder: string;
	options: { value: string; label: string }[];
	disabled?: boolean;
	defaultValue?: string;
	variant?: SelectVariant;
};
type Story = StoryObj<SelectStoryArgs>;

const defaultOptions = [
	{ value: "option1", label: "Option 1" },
	{ value: "option2", label: "Option 2" },
	{ value: "option3", label: "Option 3" },
];

const renderSelect = (args: SelectStoryArgs) => {
	const { placeholder, options, disabled, defaultValue, variant } = args;
	return (
		<Select disabled={disabled} defaultValue={defaultValue}>
			<SelectTrigger variant={variant}>
				<div className="flex items-center">
					<ListCheck />
					<SelectValue placeholder={placeholder} />
				</div>
			</SelectTrigger>
			<SelectContent variant={variant}>
				{options.map((opt: { value: string; label: string }) => (
					<SelectItem key={opt.value} value={opt.value} variant={variant}>
						{opt.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export const Default: Story = {
	args: {
		placeholder: "Select an option",
		options: defaultOptions,
		disabled: false,
		defaultValue: "",
		variant: "default",
	},
	render: renderSelect,
};

export const Primary: Story = {
	args: {
		...Default.args,
		variant: "primary",
	},
	render: renderSelect,
};

export const Destructive: Story = {
	args: {
		...Default.args,
		variant: "destructive",
	},
	render: renderSelect,
};

export const Outline: Story = {
	args: {
		...Default.args,
		variant: "outline",
	},
	render: renderSelect,
};

export const Secondary: Story = {
	args: {
		...Default.args,
		variant: "secondary",
	},
	render: renderSelect,
};

export const Danger: Story = {
	args: {
		...Default.args,
		variant: "danger",
	},
	render: renderSelect,
};

export const Dark: Story = {
	args: {
		...Default.args,
		variant: "dark",
	},
	render: renderSelect,
};

export const Disabled: Story = {
	args: {
		...Default.args,
		disabled: true,
	},
	render: renderSelect,
};

export const WithPreselectedValue: Story = {
	args: {
		...Default.args,
		defaultValue: "option2",
	},
	render: renderSelect,
};

export const WithSearch: Story = {
	args: {
		placeholder: "Search and select",
		options: [
			{ value: "option1", label: "Option 1" },
			{ value: "option2", label: "Option 2" },
			{ value: "option3", label: "Option 3" },
			{ value: "apple", label: "Apple" },
			{ value: "banana", label: "Banana" },
			{ value: "grape", label: "Grape" },
			{ value: "orange", label: "Orange" },
			{ value: "pear", label: "Pear" },
			{ value: "pineapple", label: "Pineapple" },
			{ value: "mango", label: "Mango" },
		],
		disabled: false,
		defaultValue: "",
		variant: "default",
	},
	render: (args) => {
		const { placeholder, options, disabled, defaultValue, variant } = args;
		const [search, _setSearch] = React.useState("");
		const filteredOptions = options.filter((opt: { label: string }) =>
			opt.label.toLowerCase().includes(search.toLowerCase()),
		);
		return (
			<Select disabled={disabled} defaultValue={defaultValue}>
				<SelectTrigger variant={variant}>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent variant={variant} searchable>
					{filteredOptions.length === 0 ? (
						<div style={{ padding: 8, color: "#888" }}>No options found</div>
					) : (
						filteredOptions.map((opt: { value: string; label: string }) => (
							<SelectItem key={opt.value} value={opt.value} variant={variant}>
								{opt.label}
							</SelectItem>
						))
					)}
				</SelectContent>
			</Select>
		);
	},
};
