import { Outlet, useLocation } from "react-router-dom";
import { AppLayout } from "./appLayout";

const RootLayout = () => {
	const location = useLocation();

	// Define public routes that don't require authentication
	const publicRoutes = ["/login", "/forgot-password", "/"];

	// Check if current route is public
	const isPublicRoute = publicRoutes.includes(location.pathname);

	return (
		<div className="min-h-screen bg-gray-100">
			{isPublicRoute ? (
				<div className="flex items-center justify-center min-h-screen">
					<Outlet />
				</div>
			) : (
				<AppLayout>
					<Outlet />
				</AppLayout>
			)}
		</div>
	);
};

export { RootLayout };
