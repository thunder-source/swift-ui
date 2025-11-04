export type UserRole = "HR" | "ADMIN" | "MANAGER" | "EMPLOYEE";

export interface User {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	// Add other user properties as needed
}

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}
