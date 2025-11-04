import type { Meta, StoryObj } from "@storybook/react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from "./sidebar";

const meta: Meta<typeof Sidebar> = {
	title: "shadcn/Sidebar",
	component: Sidebar,
	tags: ["autodocs"],
};

export default meta;
type SidebarStoryArgs = React.ComponentProps<typeof Sidebar> & {
	showHeader?: boolean;
	showFooter?: boolean;
	defaultOpen?: boolean;
};
type Story = StoryObj<typeof Sidebar>;

// Helper for menu with submenus, badges, actions, skeleton, etc.
import {
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarInput,
	SidebarInset,
	SidebarMenuAction,
	SidebarMenuBadge,
	SidebarMenuSkeleton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
	SidebarSeparator,
} from "./sidebar";

const MenuWithAllFeatures = () => (
	<SidebarContent>
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton isActive>Dashboard</SidebarMenuButton>
			</SidebarMenuItem>
			<SidebarMenuItem>
				<SidebarMenuButton tooltip="Users section">
					Users <SidebarMenuBadge>3</SidebarMenuBadge>
				</SidebarMenuButton>
				<SidebarMenuSub>
					<SidebarMenuSubItem>
						<SidebarMenuSubButton isActive>Admins</SidebarMenuSubButton>
					</SidebarMenuSubItem>
					<SidebarMenuSubItem>
						<SidebarMenuSubButton>Guests</SidebarMenuSubButton>
					</SidebarMenuSubItem>
				</SidebarMenuSub>
			</SidebarMenuItem>
			<SidebarMenuItem>
				<SidebarMenuButton>Settings</SidebarMenuButton>
				<SidebarMenuAction showOnHover>⚙️</SidebarMenuAction>
			</SidebarMenuItem>
			<SidebarMenuItem>
				<SidebarMenuButton disabled>Disabled Item</SidebarMenuButton>
			</SidebarMenuItem>
			<SidebarMenuItem>
				<SidebarMenuSkeleton showIcon />
			</SidebarMenuItem>
		</SidebarMenu>
		<SidebarSeparator />
		<SidebarGroup>
			<SidebarGroupLabel>Group Label</SidebarGroupLabel>
			<SidebarGroupAction>+</SidebarGroupAction>
			<SidebarGroupContent>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton>Group Item</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
		<SidebarInput placeholder="Search..." />
	</SidebarContent>
);

const Template = (args: SidebarStoryArgs = {}) => (
	<SidebarProvider defaultOpen={args.defaultOpen ?? true}>
		<div style={{ display: "flex", height: 500 }}>
			{/* SidebarRail placed outside Sidebar to demonstrate its usage */}
			<SidebarRail />
			<Sidebar
				{...args}
				style={{ border: "1px solid #e5e7eb", background: "#fff", flex: 1 }}
			>
				{args.showHeader ? <SidebarHeader>Sidebar Header</SidebarHeader> : null}
				<MenuWithAllFeatures />
				{args.showFooter ? <SidebarFooter>Sidebar Footer</SidebarFooter> : null}
			</Sidebar>
		</div>
	</SidebarProvider>
);

const CollapsedTemplate = (args: SidebarStoryArgs = {}) => (
	<SidebarProvider defaultOpen={false}>
		<div style={{ display: "flex", height: 500 }}>
			<SidebarRail />
			<Sidebar
				{...args}
				style={{ border: "1px solid #e5e7eb", background: "#fff", flex: 1 }}
			>
				<SidebarHeader>Sidebar Header</SidebarHeader>
				<MenuWithAllFeatures />
				<SidebarFooter>Sidebar Footer</SidebarFooter>
			</Sidebar>
		</div>
	</SidebarProvider>
);

const NoHeaderFooterTemplate = (args: SidebarStoryArgs = {}) => (
	<SidebarProvider>
		<div style={{ display: "flex", height: 500 }}>
			<SidebarRail />
			<Sidebar
				{...args}
				style={{ border: "1px solid #e5e7eb", background: "#fff", flex: 1 }}
			>
				<MenuWithAllFeatures />
			</Sidebar>
		</div>
	</SidebarProvider>
);

// Simulated mobile version (Sheet)
const MobileTemplate = (args: SidebarStoryArgs = {}) => {
	// Simulate mobile by forcing isMobile to true
	// This requires mocking the useIsMobile hook in the real app, but for Storybook, we just show a Sheet version
	return (
		<SidebarProvider>
			<Sidebar
				{...args}
				style={{ height: 500, border: "1px solid #e5e7eb", background: "#fff" }}
			>
				<SidebarHeader>Sidebar Header</SidebarHeader>
				<MenuWithAllFeatures />
				<SidebarFooter>Sidebar Footer</SidebarFooter>
			</Sidebar>
			<div style={{ marginTop: 16, color: "#888" }}>
				<em>
					Note: Actual mobile behavior depends on viewport and useIsMobile hook.
				</em>
			</div>
		</SidebarProvider>
	);
};

export const Default: Story = {
	args: {
		side: "left",
		variant: "sidebar",
		collapsible: "offcanvas",
	},
	render: Template,
	parameters: {
		controls: {
			include: [
				"side",
				"variant",
				"collapsible",
				"showHeader",
				"showFooter",
				"defaultOpen",
			],
		},
	},
};

export const RightSide: Story = {
	args: { side: "right" },
	render: Template,
};

export const Floating: Story = {
	args: { variant: "floating" },
	render: Template,
};

export const Inset: Story = {
	args: { variant: "inset" },
	render: (args) => (
		<SidebarProvider>
			<Sidebar {...args} />
			<SidebarInset>
				<div style={{ padding: 32 }}>
					Main content goes here (Inset Example)
				</div>
			</SidebarInset>
		</SidebarProvider>
	),
};

export const CollapsibleIcon: Story = {
	args: { collapsible: "icon" },
	render: Template,
};

export const CollapsibleNone: Story = {
	args: { collapsible: "none" },
	render: Template,
};

export const Collapsed: Story = {
	args: { side: "left", variant: "sidebar", collapsible: "offcanvas" },
	render: CollapsedTemplate,
};

export const NoHeaderFooter: Story = {
	args: {},
	render: NoHeaderFooterTemplate,
};

export const Mobile: Story = {
	args: {},
	render: MobileTemplate,
};
