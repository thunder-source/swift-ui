// import { useAuth } from "@/contexts/authContext";
// import type { UserRole } from "@/types/roles";

// interface WithRoleProps {
// 	allowedRoles: UserRole | UserRole[];
// 	fallback?: React.ReactNode;
// }

// /**
//  * Higher-Order Component for role-based access control
//  * @param WrappedComponent - The component to protect
//  * @param options - Configuration options
//  * @returns A new component with role-based access control
//  */
// const withRole = <P extends object>(
// 	WrappedComponent: React.ComponentType<P>,
// 	options: WithRoleProps,
// ) => {
// 	const { allowedRoles, fallback = null } = options;

// 	const WithRole: React.FC<P> = (props) => {
// 		const { hasRole } = useAuth();

// 		// If user has the required role, render the component
// 		// If not, render the fallback (or null)
// 		return hasRole(allowedRoles) ? (
// 			<WrappedComponent {...(props as P)} />
// 		) : (
// 			<>{fallback}</>
// 		);
// 	};

// 	// Set a display name for the HOC
// 	const displayName =
// 		WrappedComponent.displayName || WrappedComponent.name || "Component";
// 	WithRole.displayName = `withRole(${displayName})`;

// 	return WithRole;
// };

// export default withRole;
