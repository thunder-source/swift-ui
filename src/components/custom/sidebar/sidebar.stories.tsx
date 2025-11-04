// Temporarily disabled - uncomment when ready to use
export default {
	title: "Custom/Sidebar",
	tags: ["autodocs"],
};

// import { SidebarProvider } from "@/components/ui";
// import { StorybookContextWrapper } from "@/utils";
// import type { Meta, StoryObj } from "@storybook/react";
// import { AppSidebar } from "./sidebar";

// const meta: Meta<typeof SidebarWithProvider> = {
// 	title: "Custom/Sidebar",
// 	component: AppSidebar,
// 	tags: ["autodocs"],
// };

// export default meta;

// type Story = StoryObj<typeof AppSidebar>;

// export function SidebarWithProvider(props: {
// 	defaultOpen?: boolean;
// 	children?: React.ReactNode;
// }) {
// 	return (
// 		<StorybookContextWrapper>
// 			<SidebarProvider defaultOpen={props.defaultOpen}>
// 				<AppSidebar />
// 				{props.children}
// 			</SidebarProvider>
// 		</StorybookContextWrapper>
// 	);
// }

// export const Default: Story = {
// 	render: () => <SidebarWithProvider />,
// 	parameters: {
// 		docs: {
// 			description: {
// 				story: "The default sidebar with all navigation items.",
// 			},
// 		},
// 	},
// };
// export const RightSide: Story = {
// 	render: () => <SidebarWithProvider />,
// 	parameters: {
// 		docs: {
// 			description: {
// 				story: "The default sidebar with all navigation items.",
// 			},
// 		},
// 	},
// };

// export const Collapsed: Story = {
// 	render: () => <SidebarWithProvider defaultOpen={false} />,
// 	parameters: {
// 		docs: {
// 			description: {
// 				story: "Sidebar in its collapsed (icon-only) state.",
// 			},
// 		},
// 	},
// };

// export const Playground: Story = {
// 	render: () => <SidebarWithProvider />, // For future prop-based customization
// 	parameters: {
// 		docs: {
// 			description: {
// 				story: "Playground for future prop-based customization.",
// 			},
// 		},
// 	},
// };
