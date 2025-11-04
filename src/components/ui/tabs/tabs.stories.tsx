import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta: Meta<typeof Tabs> = {
	title: "shadcn/Tabs",
	tags: ["autodocs"],
	component: Tabs,
	parameters: {
		docs: {
			description: {
				component:
					"A composable Tabs component built on Radix UI primitives with multiple styling variants and accessibility features.",
			},
		},
	},
	argTypes: {
		defaultValue: {
			control: "text",
			description: "The initial active tab",
		},
		value: {
			control: "text",
			description: "Controlled value for active tab",
		},
		onValueChange: {
			action: "valueChanged",
			description: "Callback when active tab changes",
		},
		orientation: {
			options: ["horizontal", "vertical"],
			control: { type: "radio" },
			description: "Orientation of the tabs",
			defaultValue: "horizontal",
		},
		dir: {
			options: ["ltr", "rtl"],
			control: { type: "radio" },
			description: "Text direction",
			defaultValue: "ltr",
		},
		activationMode: {
			options: ["automatic", "manual"],
			control: { type: "radio" },
			description: "When tabs are activated",
			defaultValue: "automatic",
		},
	},
	args: {
		defaultValue: "tab1",
	},
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
	render: (args) => (
		<Tabs {...args} className="w-full">
			<TabsList>
				<TabsTrigger value="tab1">Account</TabsTrigger>
				<TabsTrigger value="tab2">Password</TabsTrigger>
				<TabsTrigger value="tab3">Settings</TabsTrigger>
			</TabsList>
			<TabsContent value="tab1">
				<div className="space-y-4">
					<h3 className="text-lg font-medium">Account Settings</h3>
					<p>Configure your account preferences and profile information.</p>
				</div>
			</TabsContent>
			<TabsContent value="tab2">
				<div className="space-y-4">
					<h3 className="text-lg font-medium">Password Settings</h3>
					<p>Update your password and security preferences.</p>
				</div>
			</TabsContent>
			<TabsContent value="tab3">
				<div className="space-y-4">
					<h3 className="text-lg font-medium">General Settings</h3>
					<p>Configure application settings and preferences.</p>
				</div>
			</TabsContent>
		</Tabs>
	),
};

export const ShadcnVariant: Story = {
	render: (args) => (
		<Tabs {...args} className="w-full">
			<TabsList variant="shadcn">
				<TabsTrigger variant="shadcn" value="tab1">
					Account
				</TabsTrigger>
				<TabsTrigger variant="shadcn" value="tab2">
					Password
				</TabsTrigger>
				<TabsTrigger variant="shadcn" value="tab3">
					Settings
				</TabsTrigger>
			</TabsList>
			<TabsContent value="tab1">
				<div className="space-y-4">
					<h3 className="text-lg font-medium">Account Settings</h3>
					<p>Configure your account preferences and profile information.</p>
				</div>
			</TabsContent>
			<TabsContent value="tab2">
				<div className="space-y-4">
					<h3 className="text-lg font-medium">Password Settings</h3>
					<p>Update your password and security preferences.</p>
				</div>
			</TabsContent>
			<TabsContent value="tab3">
				<div className="space-y-4">
					<h3 className="text-lg font-medium">General Settings</h3>
					<p>Configure application settings and preferences.</p>
				</div>
			</TabsContent>
		</Tabs>
	),
};

export const WithDisabledTab: Story = {
	render: (args) => (
		<Tabs {...args} className="w-full">
			<TabsList>
				<TabsTrigger value="tab1">Account</TabsTrigger>
				<TabsTrigger value="tab2" isDisabled>
					Password
				</TabsTrigger>
				<TabsTrigger value="tab3">Settings</TabsTrigger>
			</TabsList>
			<TabsContent value="tab1">
				<div className="space-y-4">
					<h3 className="text-lg font-medium">Account Settings</h3>
					<p>Configure your account preferences and profile information.</p>
				</div>
			</TabsContent>
			<TabsContent value="tab2">
				<div className="space-y-4">
					<h3 className="text-lg font-medium">Password Settings</h3>
					<p>This tab is disabled.</p>
				</div>
			</TabsContent>
			<TabsContent value="tab3">
				<div className="space-y-4">
					<h3 className="text-lg font-medium">General Settings</h3>
					<p>Configure application settings and preferences.</p>
				</div>
			</TabsContent>
		</Tabs>
	),
};

export const LoadingState: Story = {
	render: (args) => (
		<Tabs {...args} className="w-full">
			<TabsList>
				<TabsTrigger value="tab1">Ready</TabsTrigger>
				<TabsTrigger value="tab2">Loading</TabsTrigger>
			</TabsList>
			<TabsContent value="tab1">
				<div className="space-y-4">
					<h3 className="text-lg font-medium">Content loaded</h3>
					<p>This content is ready to display.</p>
				</div>
			</TabsContent>
			<TabsContent value="tab2" isLoading>
				<div className="space-y-4">
					<h3 className="text-lg font-medium">This won't be shown</h3>
					<p>Because the loading state is active.</p>
				</div>
			</TabsContent>
		</Tabs>
	),
};

export const Controlled: Story = {
	render: () => {
		const [activeTab, setActiveTab] = useState("tab1");

		return (
			<div className="space-y-4 w-full">
				<div className="flex gap-2">
					<button
						type="button"
						onClick={() => setActiveTab("tab1")}
						className="px-3 py-1 border rounded"
					>
						Show Tab 1
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("tab2")}
						className="px-3 py-1 border rounded"
					>
						Show Tab 2
					</button>
				</div>

				<Tabs value={activeTab} onValueChange={setActiveTab}>
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						<TabsTrigger value="tab2">Tab 2</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">
						<div className="space-y-4">
							<h3 className="text-lg font-medium">Tab 1 Content</h3>
							<p>This is controlled by external state.</p>
						</div>
					</TabsContent>
					<TabsContent value="tab2">
						<div className="space-y-4">
							<h3 className="text-lg font-medium">Tab 2 Content</h3>
							<p>This is controlled by external state.</p>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		);
	},
};

export const ContentVariants: Story = {
	render: (args) => (
		<div className="space-y-8">
			<Tabs {...args} className="w-full">
				<h2 className="mb-2 font-semibold">Default Content Style</h2>
				<TabsList>
					<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					<TabsTrigger value="tab2">Tab 2</TabsTrigger>
				</TabsList>
				<TabsContent value="tab1" variant="default">
					<p>Default style with border and padding</p>
				</TabsContent>
				<TabsContent value="tab2" variant="default">
					<p>Default style content</p>
				</TabsContent>
			</Tabs>

			<Tabs defaultValue="tab1" className="w-full">
				<h2 className="mb-2 font-semibold">Ghost Content Style</h2>
				<TabsList>
					<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					<TabsTrigger value="tab2">Tab 2</TabsTrigger>
				</TabsList>
				<TabsContent value="tab1" variant="ghost">
					<p>Ghost style with minimal styling</p>
				</TabsContent>
				<TabsContent value="tab2" variant="ghost">
					<p>Ghost style content</p>
				</TabsContent>
			</Tabs>

			<Tabs defaultValue="tab1" className="w-full">
				<h2 className="mb-2 font-semibold">Card Content Style</h2>
				<TabsList>
					<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					<TabsTrigger value="tab2">Tab 2</TabsTrigger>
				</TabsList>
				<TabsContent value="tab1" variant="card">
					<p>Card style with shadow and rounded corners</p>
				</TabsContent>
				<TabsContent value="tab2" variant="card">
					<p>Card style content</p>
				</TabsContent>
			</Tabs>
		</div>
	),
};

export const Vertical: Story = {
	render: (args) => (
		<Tabs {...args} orientation="vertical" className="flex gap-4">
			<TabsList className="flex-col h-auto">
				<TabsTrigger value="tab1" className="justify-start">
					Profile
				</TabsTrigger>
				<TabsTrigger value="tab2" className="justify-start">
					Account
				</TabsTrigger>
				<TabsTrigger value="tab3" className="justify-start">
					Notifications
				</TabsTrigger>
			</TabsList>
			<div className="flex-1">
				<TabsContent value="tab1" className="m-0">
					<div className="space-y-4">
						<h3 className="text-lg font-medium">Profile Settings</h3>
						<p>Configure your profile information and preferences.</p>
					</div>
				</TabsContent>
				<TabsContent value="tab2" className="m-0">
					<div className="space-y-4">
						<h3 className="text-lg font-medium">Account Settings</h3>
						<p>Manage your account details and security options.</p>
					</div>
				</TabsContent>
				<TabsContent value="tab3" className="m-0">
					<div className="space-y-4">
						<h3 className="text-lg font-medium">Notification Settings</h3>
						<p>Configure when and how you receive notifications.</p>
					</div>
				</TabsContent>
			</div>
		</Tabs>
	),
};
