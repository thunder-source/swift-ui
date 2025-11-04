import {
	Button,
	Modal,
	ModalContent,
	ModalDescription,
	ModalHeader,
	ModalTitle,
	ModalTrigger,
	Skeleton,
	SvgIcon,
	type SvgName,
	type buttonVariants,
} from "@/components";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import React, { useCallback, useMemo } from "react";

/**
 * Predefined modal variants with specific configurations
 */
enum ModalVariant {
	LeaveDeny = "LeaveDeny",
	LeaveApprove = "LeaveApprove",
	AnnouncementSuccess = "AnnouncementSuccess",
	AnnouncementDelete = "AnnouncementDelete",
	Logout = "logout",
	EmployeeAdded = "EmployeeAdded",
	EditSuccess = "EditSuccess",
	DeleteAccount = "DeleteAccount",
	PasswordChange = "PasswordChange",
}

/**
 * Icon configuration for modal variants
 */
interface IconConfig {
	readonly name: SvgName;
	readonly width: number;
	readonly height: number;
}

/**
 * Base modal configuration interface
 */
interface BaseModalConfig {
	readonly title: string;
	readonly description?: string;
	readonly buttonLabel: string;
	readonly showCancelButton: boolean;
	readonly cancelLabel?: string;
	readonly buttonBgClass?: string;
	readonly buttonVariant?: VariantProps<typeof buttonVariants>["variant"];
	readonly buttonOutlined?: boolean;
	readonly mail?: string;
}

/**
 * Props for the ActionModal component
 */
interface ActionModalProps {
	/** Modal variant type or custom string */
	type?: ModalVariant | string;
	/** Custom modal title */
	title?: string;
	/** Custom modal description */
	description?: string;
	/** Custom button label */
	buttonLabel?: string;
	/** Whether to show cancel button */
	showCancelButton?: boolean;
	/** Custom cancel button label */
	cancelLabel?: string;
	/** Custom button background class */
	buttonBgClass?: string;
	/** Button variant */
	buttonVariant?: VariantProps<typeof buttonVariants>["variant"];
	/** Whether button should be outlined */
	buttonOutlined?: boolean;
	/** Email address to display */
	mail?: string;
	/** Controlled open state */
	open?: boolean;
	/** Controlled open state change handler */
	onOpenChange?: (open: boolean) => void;
	/** Custom trigger button */
	button?: React.ReactNode;
	/** Loading state */
	loading?: boolean;
	/** Disabled state */
	disabled?: boolean;
	/** Action button click handler */
	onAction?: () => void | Promise<void>;
	/** Cancel button click handler */
	onCancel?: () => void;
	/** Outside click handler */
	onOutsideClick?: () => void;
	/** ARIA label for accessibility */
	"aria-label"?: string;
	/** Test ID for testing */
	"data-testid"?: string;
}

/**
 * Icon configurations for different modal types
 */
const iconConfigs: Record<string, IconConfig> = {
	danger: { name: "danger", width: 107, height: 107 },
	denied: { name: "denied", width: 107, height: 107 },
	logout: { name: "logout", width: 107, height: 107 },
	success: { name: "success", width: 220, height: 126 },
} as const;

/**
 * Default modal configurations for each variant
 */
const modalConfigs: Record<ModalVariant, BaseModalConfig> = {
	[ModalVariant.AnnouncementDelete]: {
		title: "Delete Announcement",
		description:
			"Remove outdated or unnecessary announcements from the system with a single click.",
		buttonLabel: "Delete",
		showCancelButton: true,
		cancelLabel: "Cancel",
		buttonVariant: "danger",
		buttonOutlined: false,
	},
	[ModalVariant.AnnouncementSuccess]: {
		title: "Announcement Added Successfully",
		description: "You added new announcement successfully!",
		buttonLabel: "Track Leave Status",
		showCancelButton: false,
		buttonVariant: "destructive",
		buttonOutlined: false,
	},
	[ModalVariant.EditSuccess]: {
		title: "You have Successfully edited your profile",
		buttonLabel: "Continue",
		showCancelButton: false,
		buttonVariant: "destructive",
		buttonOutlined: false,
	},
	[ModalVariant.PasswordChange]: {
		title: "You have Successfully Changed your Password!",
		buttonLabel: "Continue",
		showCancelButton: false,
		buttonVariant: "destructive",
		buttonOutlined: false,
	},
	[ModalVariant.EmployeeAdded]: {
		title: "Employee has been Added Successfully",
		description:
			"The new employee profile has been created added to the directory.",
		buttonLabel: "Back to User Management",
		showCancelButton: false,
		buttonVariant: "destructive",
		buttonOutlined: false,
	},
	[ModalVariant.Logout]: {
		title: "Hope to see you back soon",
		description: "Are you sure you want to logout from Admin Account?",
		buttonLabel: "Yes, I'm Sure",
		showCancelButton: true,
		cancelLabel: "Cancel",
		buttonVariant: "danger",
		buttonOutlined: false,
	},
	[ModalVariant.LeaveDeny]: {
		title: "Deny Leave Request",
		description: "Please confirm you want to deny the leave request.",
		buttonLabel: "Yes",
		showCancelButton: true,
		cancelLabel: "No",
		buttonVariant: "danger",
		buttonOutlined: true,
	},
	[ModalVariant.LeaveApprove]: {
		title: "Approve Leave Request",
		description: "Are you sure you want to approve this leave request?",
		buttonBgClass:
			"bg-[hsl(var(--status-success))] hover:bg-[hsl(var(--status-success),0.8)] border-[hsl(var(--status-success))] hover:border-[hsl(var(--status-success),0.8)]",
		buttonLabel: "Yes",
		showCancelButton: true,
		cancelLabel: "No",
		buttonOutlined: false,
	},
	[ModalVariant.DeleteAccount]: {
		title: "Delete Account",
		description: "Are you sure you want to delete the account linked to ",
		mail: "sonalisaluja12@gmail.com",
		buttonLabel: "Delete",
		showCancelButton: true,
		cancelLabel: "Cancel",
		buttonVariant: "danger",
		buttonOutlined: false,
	},
} as const;

/**
 * Get icon configuration for a specific modal type
 */
const getIconByType = (type: ModalVariant): React.ReactElement => {
	let iconConfig: IconConfig;

	switch (type) {
		case ModalVariant.AnnouncementDelete:
		case ModalVariant.DeleteAccount:
			iconConfig = iconConfigs.danger;
			break;
		case ModalVariant.LeaveDeny:
			iconConfig = iconConfigs.denied;
			break;
		case ModalVariant.Logout:
			iconConfig = iconConfigs.logout;
			break;
		default:
			iconConfig = iconConfigs.success;
	}

	return (
		<SvgIcon
			color="transparent"
			name={iconConfig.name}
			style={{ width: iconConfig.width, height: iconConfig.height }}
			className="mx-auto"
			aria-hidden="true"
		/>
	);
};

/**
 * Skeleton loading component for modal content
 */
const ModalSkeleton: React.FC = () => (
	<div className="animate-pulse">
		<div className="flex justify-center mb-4">
			<Skeleton className="rounded-full w-24 h-24" />
		</div>
		<div className="space-y-3">
			<Skeleton className=" h-6 rounded w-3/4 mx-auto" />
			<Skeleton className=" h-4 rounded w-full mx-auto" />
			<Skeleton className=" h-4 rounded w-2/3 mx-auto" />
		</div>
		<div className="mt-6 flex gap-4 justify-end">
			<Skeleton className=" h-10 rounded w-20" />
			<Skeleton className=" h-10 rounded w-24" />
		</div>
	</div>
);

/**
 * A reusable action modal component with predefined variants and custom configurations
 *
 * @example
 * ```tsx
 * // Using predefined variant
 * <ActionModal
 *   type={ModalVariant.DeleteAccount}
 *   onAction={() => handleDelete()}
 * />
 *
 * // Custom configuration
 * <ActionModal
 *   title="Custom Title"
 *   description="Custom description"
 *   buttonLabel="Confirm"
 *   onAction={() => handleCustomAction()}
 * />
 *
 * // Controlled state
 * <ActionModal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   type={ModalVariant.Logout}
 * />
 * ```
 */
const ActionModal: React.FC<ActionModalProps> = ({
	type = ModalVariant.AnnouncementSuccess,
	button,
	open: controlledOpen,
	onOpenChange: controlledOnOpenChange,
	loading = false,
	disabled = false,
	onAction,
	onCancel,
	onOutsideClick,
	"aria-label": ariaLabel,
	"data-testid": testId,
	...customProps
}) => {
	const [internalOpen, setInternalOpen] = React.useState(false);
	const [actionLoading, setActionLoading] = React.useState(false);

	// Use controlled state if provided, otherwise use internal state
	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : internalOpen;
	const setOpen = isControlled
		? (controlledOnOpenChange ?? (() => {}))
		: setInternalOpen;

	const defaultConfig = useMemo(
		() => modalConfigs[type as ModalVariant] || {},
		[type],
	);
	const modalConfig = { ...defaultConfig, ...customProps };

	/**
	 * Handle cancel button click
	 */
	const handleCancel = useCallback(() => {
		setOpen(false);
		onCancel?.();
	}, [setOpen, onCancel]);

	/**
	 * Handle action button click with async support
	 */
	const handleAction = useCallback(async () => {
		if (!onAction || actionLoading || disabled) return;

		try {
			setActionLoading(true);
			await onAction();
		} catch (error) {
			console.error("Action failed:", error);
		} finally {
			setActionLoading(false);
		}
	}, [onAction, actionLoading, disabled]);

	/**
	 * Handle modal open state change
	 */
	const handleOpenChange = useCallback(
		(isOpen: boolean) => {
			if (!isOpen && open && onOutsideClick) {
				onOutsideClick();
			}
			setOpen(isOpen);
		},
		[open, onOutsideClick, setOpen],
	);

	/**
	 * Render action buttons based on configuration
	 */
	const renderActionButtons = useMemo(() => {
		const isActionDisabled = disabled || actionLoading;
		const buttonText = actionLoading ? "Loading..." : modalConfig.buttonLabel;

		if (modalConfig.showCancelButton) {
			return (
				<div className="text-center flex justify-end gap-4">
					<Button
						className="text-sm border-[hsl(var(--bg-grey)] border-1 !px-6"
						size="md"
						variant="outline"
						onClick={handleCancel}
						disabled={actionLoading}
						data-testid={testId ? `${testId}-cancel` : undefined}
					>
						{modalConfig.cancelLabel || "Cancel"}
					</Button>
					<Button
						className={cn("text-sm !px-6", modalConfig.buttonBgClass)}
						size="md"
						outlined={modalConfig.buttonOutlined}
						variant={modalConfig.buttonVariant}
						onClick={handleAction}
						disabled={isActionDisabled}
						data-testid={testId ? `${testId}-action` : undefined}
					>
						{buttonText}
					</Button>
				</div>
			);
		}

		return (
			<Button
				size="lg"
				className="w-full text-base"
				outlined={modalConfig.buttonOutlined}
				variant={modalConfig.buttonVariant}
				onClick={handleAction}
				disabled={isActionDisabled}
				data-testid={testId ? `${testId}-action` : undefined}
			>
				{buttonText}
			</Button>
		);
	}, [
		modalConfig.buttonLabel,
		modalConfig.showCancelButton,
		modalConfig.cancelLabel,
		modalConfig.buttonBgClass,
		modalConfig.buttonOutlined,
		modalConfig.buttonVariant,
		handleCancel,
		handleAction,
		disabled,
		actionLoading,
		testId,
	]);

	return (
		<Modal open={open} onOpenChange={handleOpenChange} aria-label={ariaLabel}>
			<ModalTrigger asChild>
				{button ? (
					button
				) : (
					<Button
						onClick={() => setOpen(true)}
						disabled={disabled}
						data-testid={testId ? `${testId}-trigger` : undefined}
					>
						Open Modal
					</Button>
				)}
			</ModalTrigger>
			<ModalContent data-testid={testId}>
				{loading ? (
					<ModalSkeleton />
				) : (
					<>
						<ModalHeader className="px-4 py-2 flex flex-col gap-2">
							<div className="flex justify-center mb-2">
								{getIconByType(type as ModalVariant)}
							</div>
							<ModalTitle className="text-center !text-3xl leading-[1.2] !text-[hsl(var(--text-dark))]">
								{modalConfig.title}
							</ModalTitle>
							{modalConfig.description && (
								<ModalDescription className="text-center text-base !text-[hsl(var(--text-medium))]">
									{modalConfig.description}
									{modalConfig.mail && (
										<p className="text-[hsl(var(--text-dark))] font-bold">
											{modalConfig.mail}
										</p>
									)}
								</ModalDescription>
							)}
						</ModalHeader>
						{renderActionButtons}
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export {
	ActionModal,
	ModalVariant,
	type ActionModalProps,
	type BaseModalConfig,
	modalConfigs,
	getIconByType,
};
