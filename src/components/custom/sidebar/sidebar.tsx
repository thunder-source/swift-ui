// import {
// 	Button,
// 	Sidebar,
// 	SidebarContent,
// 	SidebarFooter,
// 	SidebarGroup,
// 	SidebarGroupContent,
// 	SidebarMenu,
// 	SidebarMenuButton,
// 	SidebarMenuItem,
// 	SvgIcon,
// 	useSidebar,
// } from "@/components";
// import { useAuth } from "@/contexts/authContext";
// import { useAppDispatch } from "@/lib";
// import { logout } from "@/lib/slices/authSlice";
// import { Clock4, FileText, LayoutGrid, Users } from "lucide-react";
// import { type ReactNode, useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";

// type SidebarItem = {
// 	title: string;
// 	url: string;
// 	icon: ReactNode;
// };

// const adminRoutes: SidebarItem[] = [
// 	{
// 		title: "Dashboard",
// 		url: "/dashboard",
// 		icon: <LayoutGrid />,
// 	},
// 	{
// 		title: "User Management",
// 		url: "/user-management",
// 		icon: <Users />,
// 	},
// 	{
// 		title: "Attendance",
// 		url: "/attendance",
// 		icon: <Clock4 />,
// 	},
// 	{
// 		title: "Leave Management",
// 		url: "/leave",
// 		icon: <SvgIcon name="date" />,
// 	},
// 	{
// 		title: "Document System",
// 		url: "/document-system",
// 		icon: <FileText />,
// 	},
// 	{
// 		title: "Announcement",
// 		url: "/announcement",
// 		icon: <SvgIcon name="announcement" />,
// 	},
// 	{
// 		title: "Report Module",
// 		url: "/report",
// 		icon: <SvgIcon name="reports" />,
// 	},
// ];

// const employeeRoutes: SidebarItem[] = [
// 	{
// 		title: "Dashboard",
// 		url: "/dashboard",
// 		icon: <LayoutGrid />,
// 	},
// 	{
// 		title: "My Team",
// 		url: "/my-team",
// 		icon: <Users />,
// 	},
// 	{
// 		title: "Attendance",
// 		url: "/attendance",
// 		icon: <Clock4 />,
// 	},
// 	{
// 		title: "Leave Tracker",
// 		url: "/leave",
// 		icon: <SvgIcon name="date" />,
// 	},
// 	{
// 		title: "Document System",
// 		url: "/document-system",
// 		icon: <FileText />,
// 	},
// 	{
// 		title: "Announcement",
// 		url: "/announcement",
// 		icon: <SvgIcon name="announcement" />,
// 	},
// ];

// const hrRoutes: SidebarItem[] = [
// 	{
// 		title: "Dashboard",
// 		url: "/dashboard",
// 		icon: <LayoutGrid />,
// 	},
// 	{
// 		title: "People",
// 		url: "/people",
// 		icon: <Users />,
// 	},
// ];

// const managerRoutes: SidebarItem[] = [
// 	{
// 		title: "Dashboard",
// 		url: "/dashboard",
// 		icon: <LayoutGrid />,
// 	},
// 	{
// 		title: "Manager",
// 		url: "/manager",
// 		icon: <Users />,
// 	},
// ];

// function AppSidebar() {
// 	const { hasRole } = useAuth();
// 	const [activeUrl, setActiveUrl] = useState<string>(window.location.pathname);
// 	const { state } = useSidebar();
// 	const dispatch = useAppDispatch();

// 	const handleLogout = () => {
// 		dispatch(logout());
// 	};

// 	useEffect(() => {
// 		const handleHashChange = () => setActiveUrl(window.location.pathname);
// 		window.addEventListener("hashchange", handleHashChange);
// 		return () => window.removeEventListener("hashchange", handleHashChange);
// 	}, []);

// 	// Set Routes based on user role

// 	let roleBasedRoutes = employeeRoutes;
// 	if (hasRole("ADMIN")) roleBasedRoutes = adminRoutes;
// 	else if (hasRole("HR")) roleBasedRoutes = hrRoutes;
// 	else if (hasRole("MANAGER")) roleBasedRoutes = managerRoutes;

// 	return (
// 		<Sidebar collapsible="icon" className="!bg-[hsl(var(--bg-light))]">
// 			<SidebarContent
// 				SidebarTrigger
// 				className=" shadow-lg !p-6 group-data-[collapsible=icon]:!p-3 group-data-[collapsible=icon]:!py-6 overflow-hidden"
// 			>
// 				<div className="flex items-center group-data-[collapsible=icon]:pl-3.5 pb-1 gap-2 ">
// 					<SvgIcon name="logo" size={40} className="!min-w-10" />
// 					<span className="text-md font-bold group-data-[collapsible=icon]:hidden">
// 						HRMSoftware
// 					</span>
// 				</div>
// 				<hr className="" />
// 				<SidebarGroup className="group-data-[collapsible=icon]:!p-3 !px-0">
// 					<div className="flex items-center group-data-[collapsible=icon]:ml-1.5 text-[hsl(var(--text-dark))] pb-2 gap-1">
// 						<span>Main </span>
// 						{state !== "collapsed" && <span> Menu</span>}
// 					</div>

// 					<SidebarGroupContent className="">
// 						<SidebarMenu>
// 							{roleBasedRoutes.map((item) => {
// 								const isActive = activeUrl === item.url;
// 								return (
// 									<SidebarMenuItem key={item.title} className="py-0.5">
// 										<SidebarMenuButton
// 											tooltip={item.title}
// 											asChild
// 											className={`flex items-center gap-2 text-[hsl(var(--text-light))] px-4 py-5 rounded-md  ${
// 												isActive
// 													? "!bg-[hsl(var(--primary-blue))] !text-white shadow-sm"
// 													: "hover:bg-[hsl(var(--bg-light))] hover:text-[hsl(var(--primary-blue))]"
// 											}`}
// 										>
// 											<NavLink
// 												to={item.url}
// 												onClick={() => setActiveUrl(item.url)}
// 												className="flex items-center !min-w-11 !h-10 gap-3"
// 											>
// 												{item.icon}
// 												<span>{item.title}</span>
// 											</NavLink>
// 										</SidebarMenuButton>
// 									</SidebarMenuItem>
// 								);
// 							})}
// 						</SidebarMenu>
// 					</SidebarGroupContent>
// 				</SidebarGroup>
// 				<SidebarFooter className="mt-auto p-0">
// 					<Button
// 						tooltip={state === "collapsed" ? "Log Out" : undefined}
// 						tooltipSide="right"
// 						className={`rounded-sm overflow-hidden bg-[hsl(var(--bg-light))] ${state === "collapsed" && "w-10 mx-auto"}`}
// 						variant={state === "expanded" ? "danger" : "danger"}
// 						iconRight={<SvgIcon name="logoutSidebar" className="size-5" />}
// 						outlined
// 						onClick={handleLogout}
// 					>
// 						{state === "expanded" ? "Log Out" : ""}
// 					</Button>
// 				</SidebarFooter>
// 			</SidebarContent>
// 		</Sidebar>
// 	);
// }
// export { AppSidebar };
