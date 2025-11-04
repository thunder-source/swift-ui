import type { Meta, StoryObj } from "@storybook/react";
import { ChevronDown, Star } from "lucide-react";
import React from "react";
import { SelectInput } from "./selectInput";

// If you use your own custom icons, import them here

const meta: Meta<typeof SelectInput> = {
	title: "base/SelectInput",
	component: SelectInput,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SelectInput>;

const fruitOptions = [
	{ value: "apple", label: "Apple 🍏" },
	{ value: "banana", label: "Banana 🍌" },
	{ value: "grape", label: "Grape 🍇" },
	{ value: "orange", label: "Orange 🍊" },
];

const animalOptions = [
	{ value: "dog", label: "Dog 🐶" },
	{ value: "cat", label: "Cat 🐱" },
	{ value: "bird", label: "Bird 🐦" },
];

// Story 1: Basic usage
export const Basic: Story = {
	args: {
		options: fruitOptions,
		placeholder: "Pick a fruit",
		label: "Fruit",
	},
};

// Story 2: With left/right static icon
export const WithIcons: Story = {
	args: {
		options: fruitOptions,
		leftIcon: <Star size={16} color="orange" />,
		rightIcon: <ChevronDown />,
		placeholder: "Fruit with icons",
	},
};

// Story 3: Dynamic left icon (renderLeftIcon)
export const DynamicIcon: Story = {
	args: {
		options: animalOptions,
		renderLeftIcon: (value) => {
			if (value === "dog")
				return (
					<span role="img" aria-label="Dog">
						🐶
					</span>
				);
			if (value === "cat")
				return (
					<span role="img" aria-label="Cat">
						🐱
					</span>
				);
			if (value === "bird")
				return (
					<span role="img" aria-label="Bird">
						🐦
					</span>
				);
			return <Star size={16} />;
		},
		rightIcon: <ChevronDown />,
		placeholder: "Animal (dynamic icon)",
	},
};

// Story 4: Custom option rendering (renderOption)
export const CustomOptionRender: Story = {
	args: {
		options: [
			{ value: "sedan", label: "Sedan", group: "Car" },
			{ value: "pickup", label: "Pickup", group: "Truck" },
			{ value: "suv", label: "SUV", group: "Car" },
		],
		renderOption: (opt, selected) => (
			<div
				style={{
					padding: 8,
					background: selected ? "var(--primary, #daf)" : "transparent",
					borderRadius: 4,
					display: "flex",
					alignItems: "center",
				}}
			>
				<span style={{ fontWeight: "bold" }}>{opt.label}</span>
				<span style={{ marginLeft: "auto", fontSize: 12, opacity: 0.7 }}>
					{opt.group}
				</span>
			</div>
		),
		label: "Vehicle",
		placeholder: "Custom vehicle list",
	},
};

// Story 5: Controlled usage
export const Controlled: Story = {
	render: (args) => {
		const [value, setValue] = React.useState<string | undefined>("banana");
		return (
			<SelectInput
				{...args}
				value={value}
				onChange={setValue}
				rightIcon={<Star />}
			/>
		);
	},
	args: {
		options: fruitOptions,
		placeholder: "Controlled value",
		label: "Fruit",
	},
};

// Story 6: Searchable select
export const Searchable: Story = {
	args: {
		options: Array.from({ length: 40 }).map((_, i) => ({
			value: `item${i + 1}`,
			label: `Item ${i + 1}`,
		})),
		searchable: true,
		placeholder: "Search for item...",
		label: "Item",
	},
};

// Story 7: All custom styling
export const CustomStyling: Story = {
	args: {
		options: fruitOptions,
		placeholder: "With custom classes",
		triggerClassName: "border-2 border-green-500 text-xl p-3",
		contentClassName: "bg-green-50",
		itemClassName: "text-green-700 hover:bg-green-100",
		leftIcon: <Star color="green" />,
	},
};

// Story 8: Custom trigger render
export const CustomTrigger: Story = {
	args: {
		options: fruitOptions,
		renderTriggerChildren: ({ value }) => (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 8,
					fontWeight: "bold",
					color: "crimson",
				}}
			>
				<span>🍽️</span>
				<span>
					{value
						? `Your meal: ${fruitOptions.find((f) => f.value === value)?.label}`
						: "No meal selected"}
				</span>
				<ChevronDown />
			</div>
		),
	},
};

// You may add more stories for edge cases, empty/no options, etc.
