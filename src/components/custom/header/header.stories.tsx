import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Header } from "./header";

// Define types for Storybook decorator props
interface RouterDecoratorProps {
	parameters: {
		reactRouter?: {
			routePath?: string;
		};
	};
}

// Wrapper component to handle routing
const RouterDecorator = (
	Story: React.ComponentType,
	{ parameters: { reactRouter } }: RouterDecoratorProps,
) => {
	// Default to the dashboard route if no route is specified
	const routePath = reactRouter?.routePath || "/dashboard";

	return (
		<MemoryRouter initialEntries={[routePath]}>
			<Routes>
				<Route path="*" element={<Story />} />
			</Routes>
		</MemoryRouter>
	);
};

const meta: Meta<typeof Header> = {
	title: "Custom/Header",
	component: Header,
	tags: ["autodocs"],
	decorators: [RouterDecorator],
	parameters: {
		layout: "fullscreen",
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof Header>;

export const DashboardView: Story = {
	args: {},
	parameters: {
		reactRouter: {
			routePath: "/dashboard",
		},
	},
};

export const SearchView: Story = {
	args: {},
	parameters: {
		reactRouter: {
			routePath: "/employees",
		},
	},
};

export const WithCustomUser: Story = {
	args: {
		name: "John Doe",
		img: "https://i.pravatar.cc/150?img=32",
	},
	parameters: {
		reactRouter: {
			routePath: "/dashboard",
		},
	},
};
