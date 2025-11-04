import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { forwardRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { SvgIcon, type SvgName } from "../svgIcon";

// Optimized variants with better semantic naming
export const userWrapperVariants = cva(
	"flex items-center cursor-pointer relative transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
	{
		variants: {
			variant: {
				default: "gap-2.5",
				card: "gap-1 py-1 px-2 bg-gray-50 rounded-md shadow-sm border hover:bg-gray-100",
				compact: "gap-1 text-sm",
			},
			size: {
				sm: "text-sm",
				md: "text-base",
				lg: "text-lg",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
);

/**
 * Menu action configuration for the user profile dropdown
 */
export interface UserProfileAction {
	/** Unique identifier for the action */
	id: string;
	/** Display label for the action */
	label: string;
	/** Icon name from the SvgIcon component */
	icon: SvgName;
	/** Click handler for the action */
	onClick: () => void;
	/** Whether the action is disabled */
	disabled?: boolean;
	/** Whether to show a separator after this item */
	showSeparator?: boolean;
	/** Link to the action */
	link?: string;
}

/**
 * Props for the UserProfile component
 */
export interface UserProfileProps
	extends VariantProps<typeof userWrapperVariants> {
	/** User's profile image URL */
	img?: string;
	/** User's display name */
	name: string;
	/** User's job title or position (shown in card variant) */
	position?: string;
	/** Custom CSS class name */
	className?: string;
	/** Whether the dropdown is controlled externally */
	isOpen?: boolean;
	/** Callback when dropdown open state changes */
	onOpenChange?: (open: boolean) => void;
	/** Custom actions for the dropdown menu */
	actions?: UserProfileAction[];
	/** Accessibility label for the trigger button */
	ariaLabel?: string;
	/** Whether to show the backdrop overlay */
	showBackdrop?: boolean;
	/** Loading state for the avatar */
	isLoading?: boolean;
	/** Whether the component is disabled */
	disabled?: boolean;
	dropdownIcon?: React.ReactNode;
}

/**
 * Default actions for the user profile dropdown
 */
const DEFAULT_ACTIONS: UserProfileAction[] = [
	{
		id: "manage-account",
		label: "Manage Account",
		icon: "manageAccount",
		onClick: () => console.log("Manage Account clicked"),
		showSeparator: true,
		link: "/manage-account",
	},
	{
		id: "change-password",
		label: "Change Password",
		icon: "passwordChange",
		onClick: () => console.log("Change Password clicked"),
		showSeparator: true,
		link: "/change-password",
	},
	{
		id: "logout",
		label: "Logout",
		icon: "logoutHeader",
		onClick: () => console.log("Logout clicked"),
		link: "/",
	},
];

/**
 * UserProfile component displays a user's avatar, name, and optional position
 * with a dropdown menu for user actions.
 *
 * @example
 * ```tsx
 * <UserProfile
 *   name="John Doe"
 *   position="Senior Developer"
 *   variant="card"
 *   actions={customActions}
 * />
 * ```
 */
export const UserProfile = forwardRef<HTMLDivElement, UserProfileProps>(
	(
		{
			img,
			name,
			position,
			variant = "default",
			size = "md",
			className,
			isOpen,
			onOpenChange,
			actions = DEFAULT_ACTIONS,
			ariaLabel,
			showBackdrop = true,
			isLoading = false,
			disabled = false,
			dropdownIcon,
			...props
		},
		ref,
	) => {
		// Memoize computed values for performance
		const avatarFallback = useMemo(() => {
			if (!name || isLoading) return "?";
			return name.charAt(0).toUpperCase();
		}, [name, isLoading]);

		const effectiveAriaLabel = useMemo(() => {
			return ariaLabel || `${name} user menu`;
		}, [ariaLabel, name]);

		// Optimize click handlers
		const handleActionClick = useCallback((action: UserProfileAction) => {
			if (!action.disabled) {
				action.onClick();
			}
		}, []);

		// Memoize menu items to prevent unnecessary re-renders
		const menuItems = useMemo(() => {
			return actions.map((action) => (
				<Link to={action.link ?? ""} key={action.id}>
					<DropdownMenuItem
						className="flex items-center gap-2 hover:bg-[hsl(var(--bg-light))] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:bg-[hsl(var(--bg-light))] focus:outline-none"
						onClick={() => handleActionClick(action)}
						disabled={action.disabled}
						role="menuitem"
						tabIndex={-1}
					>
						<SvgIcon
							fill="transparent"
							name={action.icon}
							size={20}
							aria-hidden="true"
						/>
						{action.label}
					</DropdownMenuItem>
					{action.showSeparator && <DropdownMenuSeparator className="my-1" />}
				</Link>
			));
		}, [actions, handleActionClick]);

		if (isLoading) {
			return (
				<div
					className={cn(userWrapperVariants({ variant, size }), className)}
					aria-label="Loading user profile"
				>
					<div className="animate-pulse">
						<div className="w-8 h-8 bg-gray-300 rounded-full" />
					</div>
					<div className="animate-pulse flex flex-col gap-1">
						<div className="h-4 bg-gray-300 rounded w-20" />
						{variant === "card" && (
							<div className="h-3 bg-gray-300 rounded w-16" />
						)}
					</div>
				</div>
			);
		}

		return (
			<>
				{showBackdrop && isOpen && (
					<div
						className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
						aria-hidden="true"
					/>
				)}

				<DropdownMenu onOpenChange={onOpenChange} open={isOpen}>
					<DropdownMenuTrigger asChild>
						<div
							ref={ref}
							className={cn(
								userWrapperVariants({ variant, size }),
								disabled && "opacity-50 cursor-not-allowed",
								className,
							)}
							aria-label={effectiveAriaLabel}
							aria-expanded={isOpen}
							aria-haspopup="menu"
							tabIndex={disabled ? -1 : 0}
							{...props}
						>
							<Avatar size="md" variant="square">
								<AvatarImage
									src={img}
									alt={`${name}'s profile picture`}
									loading="lazy"
								/>
								<AvatarFallback>{avatarFallback}</AvatarFallback>
							</Avatar>

							<div className="flex flex-col min-w-0 flex-1">
								<div
									className="font-medium text-sm text-[hsl(var(--text-dark))] truncate"
									title={name}
								>
									{name}
								</div>
								{variant === "card" && position && (
									<div
										className="text-xs text-muted-foreground truncate"
										title={position}
									>
										{position}
									</div>
								)}
							</div>

							{dropdownIcon !== null && dropdownIcon !== undefined && (
								<span className="ml-1">
									{dropdownIcon ?? (
										<ChevronDown
											className={cn(
												"h-4 w-4 text-gray-500 transition-transform duration-200 flex-shrink-0",
												isOpen && "rotate-180",
											)}
										/>
									)}
								</span>
							)}
						</div>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						align="end"
						className="w-[206px] text-[hsl(var(--text-medium))] font-medium mt-2 relative z-50 bg-white"
					>
						{menuItems}
					</DropdownMenuContent>
				</DropdownMenu>
			</>
		);
	},
);

UserProfile.displayName = "UserProfile";
