// import { useAuth } from "@/contexts/authContext";
// import type { UserRole } from "@/types/roles";
// import type React from "react";

// interface RoleGuardProps {
// 	/**
// 	 * Single role or array of roles that are allowed to see the children
// 	 */
// 	allowedRoles: UserRole | UserRole[];
// 	/**
// 	 * Content to render if user has the required role
// 	 */
// 	children: React.ReactNode;
// 	/**
// 	 * Content to render if user doesn't have the required role
// 	 * @default null
// 	 */
// 	fallback?: React.ReactNode;
// 	/**
// 	 * If true, will only render children if the user is authenticated
// 	 * @default true
// 	 */
// 	requireAuth?: boolean;
// }

// /**
//  * Component for role-based rendering
//  * Only renders children if the user has one of the allowed roles
//  */
// const RoleGuard: React.FC<RoleGuardProps> = ({
// 	allowedRoles,
// 	children,
// 	fallback = null,
// 	requireAuth = true,
// }) => {
// 	const { hasRole, authState } = useAuth();

// 	// If authentication is required but user is not authenticated, return fallback
// 	if (requireAuth && !authState.isAuthenticated) {
// 		return <>{fallback}</>;
// 	}

// 	// If user has the required role, render children
// 	// Otherwise, render fallback
// 	return <>{hasRole(allowedRoles) ? children : fallback}</>;
// };

// export default RoleGuard;
