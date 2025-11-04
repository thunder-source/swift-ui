import type { Meta, StoryObj } from "@storybook/react";
import { Mail, Search as SearchIcon, User } from "lucide-react";
import { InputField } from "./inputField";

const iconOptions = {
	None: undefined,
	Search: SearchIcon,
	User: User,
	Mail: Mail,
};

const meta: Meta<typeof InputField> = {
	title: "Base/InputField",
	component: InputField,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "select",
			options: [
				"text",
				"email",
				"password",
				"number",
				"tel",
				"date",
				"search",
				"amount",
				"customTime",
			],
			description: "Input type",
		},
		rightSearchIcon: {
			control: "boolean",
			description: "Whether the search icon is on the right",
		},
		required: {
			control: "boolean",
			description: "Whether the field is required",
		},
		disabled: {
			control: "boolean",
			description: "Whether the field is disabled",
		},
		regex: {
			control: "object",
			description: "Regex for custom validation",
		},
		iconLeft: {
			control: { type: "select" },
			options: Object.keys(iconOptions),
			description: "Left icon",
		},
		iconRight: {
			control: { type: "select" },
			options: Object.keys(iconOptions),
			description: "Right icon",
		},
	},
};

export default meta;
type Story = StoryObj<typeof InputField>;

function getIconComponent(iconKey: keyof typeof iconOptions) {
	const Icon = iconOptions[iconKey];
	return Icon ? <Icon size={16} /> : undefined;
}

export const Default: Story = {
	args: {
		name: "default",
		label: "Default Input",
		placeholder: "Type something...",
		iconLeft: "None",
		iconRight: "None",
	},
	render: (args) => {
		return (
			<InputField
				{...args}
				iconLeft={getIconComponent(args.iconLeft as keyof typeof iconOptions)}
				iconRight={getIconComponent(args.iconRight as keyof typeof iconOptions)}
			/>
		);
	},
};

export const Required: Story = {
	args: {
		name: "required",
		label: "Required Input",
		placeholder: "This field is required",
		required: true,
		iconLeft: "None",
		iconRight: "None",
	},
	render: (args) => (
		<InputField
			{...args}
			iconLeft={getIconComponent(args.iconLeft as keyof typeof iconOptions)}
			iconRight={getIconComponent(args.iconRight as keyof typeof iconOptions)}
		/>
	),
};

export const Email: Story = {
	args: {
		name: "email",
		label: "Email Address",
		type: "email",
		placeholder: "your@email.com",
		required: true,
		iconLeft: "None",
		iconRight: "None",
	},
	render: (args) => (
		<InputField
			{...args}
			iconLeft={getIconComponent(args.iconLeft as keyof typeof iconOptions)}
			iconRight={getIconComponent(args.iconRight as keyof typeof iconOptions)}
		/>
	),
};

//add time
export const Time: Story = {
	args: {
		name: "time",
		label: "Time",
		type: "customTime",
		placeholder: "Select time",
		errorMessage: "Please enter a valid time",
		iconLeft: "None",
		iconRight: "None",
	},
	render: (args) => (
		<InputField
			{...args}
			iconLeft={getIconComponent(args.iconLeft as keyof typeof iconOptions)}
			iconRight={getIconComponent(args.iconRight as keyof typeof iconOptions)}
		/>
	),
};

export const Amount: Story = {
	args: {
		name: "amount",
		label: "Amount",
		type: "amount",
		errorMessage: "Please enter a valid amount",
		iconLeft: "None",
		iconRight: "None",
	},
	render: (args) => (
		<InputField
			{...args}
			iconLeft={getIconComponent(args.iconLeft as keyof typeof iconOptions)}
			iconRight={getIconComponent(args.iconRight as keyof typeof iconOptions)}
		/>
	),
};

export const Password: Story = {
	args: {
		name: "password",
		label: "Password",
		type: "password",
		placeholder: "Enter your password",
		required: true,
		iconLeft: "None",
		iconRight: "None",
	},
	render: (args) => (
		<InputField
			{...args}
			iconLeft={getIconComponent(args.iconLeft as keyof typeof iconOptions)}
			iconRight={getIconComponent(args.iconRight as keyof typeof iconOptions)}
		/>
	),
};

export const SearchInput: Story = {
	args: {
		name: "search",
		label: "Search",
		placeholder: "Search...",
		type: "search",
		iconLeft: "None",
		iconRight: "None",
	},
	render: (args) => (
		<InputField
			{...args}
			iconLeft={getIconComponent(args.iconLeft as keyof typeof iconOptions)}
			iconRight={getIconComponent(args.iconRight as keyof typeof iconOptions)}
		/>
	),
};

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export const Number: Story = {
	args: {
		name: "number",
		label: "Age",
		type: "number",
		placeholder: "Enter your age",
		iconLeft: "None",
		iconRight: "None",
	},
	render: (args) => (
		<InputField
			{...args}
			iconLeft={getIconComponent(args.iconLeft as keyof typeof iconOptions)}
			iconRight={getIconComponent(args.iconRight as keyof typeof iconOptions)}
		/>
	),
};

export const Phone: Story = {
	args: {
		name: "phone",
		label: "Phone Number",
		type: "tel",
		placeholder: "Enter your phone number",
		errorMessage: "Please enter a valid phone number",
		iconLeft: "None",
		iconRight: "None",
	},
	render: (args) => (
		<InputField
			{...args}
			iconLeft={getIconComponent(args.iconLeft as keyof typeof iconOptions)}
			iconRight={getIconComponent(args.iconRight as keyof typeof iconOptions)}
		/>
	),
};

export const Disabled: Story = {
	args: {
		name: "disabled",
		label: "Disabled Input",
		placeholder: "This input is disabled",
		disabled: true,
		value: "Can't edit this",
		iconLeft: "None",
		iconRight: "None",
	},
	render: (args) => (
		<InputField
			{...args}
			iconLeft={getIconComponent(args.iconLeft as keyof typeof iconOptions)}
			iconRight={getIconComponent(args.iconRight as keyof typeof iconOptions)}
		/>
	),
};

export const DateInput: Story = {
	args: {
		name: "date",
		label: "Date",
		type: "date",
		errorMessage: "",
		iconLeft: "None",
		iconRight: "None",
	},
	render: (args) => (
		<InputField
			{...args}
			iconLeft={getIconComponent(args.iconLeft as keyof typeof iconOptions)}
			iconRight={getIconComponent(args.iconRight as keyof typeof iconOptions)}
		/>
	),
};

export const WithCustomZodSchema: Story = {
	args: {
		name: "custom-schema",
		label: "Username",
		placeholder: "Enter a username (3-10 characters)",
		required: true,
		iconLeft: "None",
		iconRight: "None",
	},
	render: (args) => (
		<InputField
			{...args}
			iconLeft={getIconComponent(args.iconLeft as keyof typeof iconOptions)}
			iconRight={getIconComponent(args.iconRight as keyof typeof iconOptions)}
		/>
	),
};

export const WithDefaultValue: Story = {
	args: {
		name: "default-value",
		label: "Input with Default Value",
		defaultValue: "This is a default value",
		iconLeft: "None",
		iconRight: "None",
	},
	render: (args) => (
		<InputField
			{...args}
			iconLeft={getIconComponent(args.iconLeft as keyof typeof iconOptions)}
			iconRight={getIconComponent(args.iconRight as keyof typeof iconOptions)}
		/>
	),
};
