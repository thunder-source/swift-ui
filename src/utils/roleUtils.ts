import type { User, UserRole } from "@/types/roles";

/**
 * Development utility to switch between different user roles
 * This should only be used in development and should be removed in production
 */
const devRoleUtils = {
	/**
	 * Get a mock user with the specified role
	 */
	getMockUser: (role: UserRole): User => ({
		id: "dev-user-123",
		name: `Dev ${role}`,
		email: `${role.toLowerCase()}@example.com`,
		role,
	}),

	/**
	 * Available roles for development
	 */
	ROLES: ["HR", "ADMIN", "MANAGER", "EMPLOYEE"] as const,
};

export default devRoleUtils;
