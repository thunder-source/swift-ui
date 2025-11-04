import {   Header } from "@/components/custom";
import { SidebarProvider, useSidebar } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Wrapper that gives Header *and* Main the same
 * px‑12 / py‑8 padding and the sidebar‑aware width.
 */
const ContentWrapper = ({ children }: { children: ReactNode }) => {
	const { state } = useSidebar();

	// Sidebar is 18 rem when expanded, 5.75 rem when collapsed.
	const expandedW = "w-[calc(100vw_-_17rem)]";
	const collapsedW = "w-[calc(100vw_-_5.75rem)]";

	return (
		<div
			className={cn(
				"flex flex-col  py-8 transition-all duration-300 ease-in-out gap-8 overflow-auto reveal-scrollbar",
				state === "expanded" ? expandedW : collapsedW,
			)}
		>
			{children}
		</div>
	);
};

const AppLayout = ({ children }: { children: ReactNode }) => (
	<SidebarProvider>
		<div className="flex h-screen w-screen overflow-hidden bg-[hsla(var(--bg-light),0.3)]">
			{/* Sidebar */}
			{/* <AppSidebar /> */}

			{/* Main column */}
			<div className="flex-1 overflow-auto reveal-scrollbar">
				<ContentWrapper>
					{/* Header */}
					<Header name="Vinita" />

					{/* Page body */}
					<main className="flex-col flex flex-1 gap-8 px-12">{children}</main>
				</ContentWrapper>
			</div>
		</div>
	</SidebarProvider>
);

export { AppLayout };
