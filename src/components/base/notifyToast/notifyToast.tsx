import { CheckCircle, Info, XCircle } from "lucide-react";
import { type CSSProperties, useCallback, useEffect, useRef } from "react";

/**
 * Toast notification types
 */
export type ToastType = "info" | "success" | "error";

/**
 * Toast variant styles for consistent theming
 */
export type ToastVariant = "default" | "subtle" | "solid";

/**
 * Position options for toast placement
 */
export type ToastPosition =
	| "top-left"
	| "top-center"
	| "top-right"
	| "bottom-left"
	| "bottom-center"
	| "bottom-right";

/**
 * Props for the NotifyToast component
 */
export interface NotifyToastProps {
	/** The message to display in the toast */
	message?: string;
	/** The type of toast notification */
	type?: ToastType;
	/** Visual variant of the toast */
	variant?: ToastVariant;
	/** Position of the toast on screen */
	position?: ToastPosition;
	/** Custom width (CSS value) */
	width?: string;
	/** Custom height (CSS value) */
	height?: string;
	/** Custom background color (hex, rgb, or CSS color name) */
	bgColor?: string;
	/** Custom text color (hex, rgb, or CSS color name) */
	textColor?: string;
	/** Duration in milliseconds before auto-close (0 = no auto-close) */
	duration?: number;
	/** Whether the toast is currently visible (controlled) */
	isVisible?: boolean;
	/** Whether to show the close button */
	showCloseButton?: boolean;
	/** Whether the toast can be dismissed by clicking */
	dismissible?: boolean;
	/** Callback fired when toast should be closed */
	onClose?: () => void;
	/** Callback fired when toast is clicked */
	onClick?: () => void;
	/** Custom className for additional styling */
	className?: string;
	/** Custom test ID for testing */
	testId?: string;
	/** Custom icon to override default type icon */
	customIcon?: React.ReactNode;
	/** Whether to animate the toast entrance/exit */
	animated?: boolean;
	style?: CSSProperties;
}

/**
 * Default theme configurations for different toast types and variants
 */
const THEME_CONFIG = {
	info: {
		default: { bg: "#EBF8FF", text: "#2B6CB0", border: "#BEE3F8" },
		subtle: { bg: "#F7FAFC", text: "#4A5568", border: "#E2E8F0" },
		solid: { bg: "#3182CE", text: "#FFFFFF", border: "#3182CE" },
	},
	success: {
		default: { bg: "#F0FFF4", text: "#2F855A", border: "#C6F6D5" },
		subtle: { bg: "#F7FAFC", text: "#4A5568", border: "#E2E8F0" },
		solid: { bg: "#38A169", text: "#FFFFFF", border: "#38A169" },
	},
	error: {
		default: { bg: "#FED7D7", text: "#C53030", border: "#FEB2B2" },
		subtle: { bg: "#F7FAFC", text: "#4A5568", border: "#E2E8F0" },
		solid: { bg: "#E53E3E", text: "#FFFFFF", border: "#E53E3E" },
	},
} as const;

/**
 * Icon mapping for different toast types
 */
const ICON_MAP: Record<ToastType, React.ReactNode> = {
	info: <Info size={20} aria-hidden="true" />,
	success: <CheckCircle size={20} aria-hidden="true" />,
	error: <XCircle size={20} aria-hidden="true" />,
};

/**
 * Position styles for toast placement
 */
const POSITION_STYLES: Record<ToastPosition, React.CSSProperties> = {
	"top-left": { top: "1rem", left: "1rem" },
	"top-center": { top: "1rem", left: "50%", transform: "translateX(-50%)" },
	"top-right": { top: "1rem", right: "1rem" },
	"bottom-left": { bottom: "1rem", left: "1rem" },
	"bottom-center": {
		bottom: "1rem",
		left: "50%",
		transform: "translateX(-50%)",
	},
	"bottom-right": { bottom: "1rem", right: "1rem" },
};

/**
 * NotifyToast - A highly customizable and accessible toast notification component
 *
 * @example
 * ```tsx
 * <NotifyToast
 *   message="Operation completed successfully"
 *   type="success"
 *   duration={5000}
 *   onClose={() => setShowToast(false)}
 * />
 * ```
 */
export const NotifyToast = ({
	message = "Notification",
	type = "info",
	variant = "default",
	position = "top-right",
	width = "fit-content",
	height = "auto",
	bgColor,
	textColor,
	duration = 3000,
	isVisible = true,
	showCloseButton = false,
	dismissible = true,
	onClose,
	onClick,
	className = "",
	testId = "notify-toast",
	customIcon,
	animated = true,
	style,
}: NotifyToastProps) => {
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const toastRef = useRef<HTMLDivElement>(null);

	/**
	 * Handle toast close with cleanup
	 */
	const handleClose = useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
		onClose?.();
	}, [onClose]);

	/**
	 * Handle toast click
	 */
	const handleClick = useCallback(() => {
		onClick?.();
		if (dismissible) {
			handleClose();
		}
	}, [onClick, dismissible, handleClose]);

	/**
	 * Handle keyboard events for accessibility
	 */
	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			if (event.key === "Escape") {
				handleClose();
			}
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				handleClick();
			}
		},
		[handleClose, handleClick],
	);

	/**
	 * Auto-close timer effect
	 */
	useEffect(() => {
		if (!isVisible || duration <= 0) return;

		timerRef.current = setTimeout(handleClose, duration);

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
			}
		};
	}, [duration, handleClose, isVisible]);

	/**
	 * Focus management for accessibility
	 */
	useEffect(() => {
		if (isVisible && toastRef.current && type === "error") {
			// Focus error toasts for screen readers
			toastRef.current.focus();
		}
	}, [isVisible, type]);

	if (!isVisible) return null;

	// Get theme colors
	const theme = THEME_CONFIG[type][variant];
	const finalBgColor = bgColor || theme.bg;
	const finalTextColor = textColor || theme.text;
	const icon = customIcon || ICON_MAP[type];

	// Calculate dynamic styles
	const positionStyle = POSITION_STYLES[position];
	const animationStyle: React.CSSProperties = animated
		? {
				animation: isVisible
					? "toast-slide-in 0.3s ease-out"
					: "toast-slide-out 0.3s ease-in",
			}
		: {};

	return (
		<>
			{/* CSS animations */}
			<style>{`
        @keyframes toast-slide-in {
          from {
            opacity: 0;
            transform: translateY(-100%) ${positionStyle.transform || ""};
          }
          to {
            opacity: 1;
            transform: translateY(0) ${positionStyle.transform || ""};
          }
        }
        @keyframes toast-slide-out {
          from {
            opacity: 1;
            transform: translateY(0) ${positionStyle.transform || ""};
          }
          to {
            opacity: 0;
            transform: translateY(-100%) ${positionStyle.transform || ""};
          }
        }
      `}</style>

			<div
				ref={toastRef}
				role="alert"
				aria-live={type === "error" ? "assertive" : "polite"}
				aria-atomic="true"
				tabIndex={dismissible ? 0 : -1}
				data-testid={testId}
				className={`toast-notification ${className}`}
				onClick={dismissible ? handleClick : undefined}
				onKeyDown={handleKeyDown}
				style={{
					position: "fixed",
					...positionStyle,
					...animationStyle,
					width,
					height,
					minWidth: "200px",
					maxWidth: "400px",
					backgroundColor: finalBgColor,
					color: finalTextColor,
					border: `1px solid ${theme.border}`,
					borderRadius: "8px",
					padding: "12px 16px",
					display: "flex",
					alignItems: "center",
					gap: "12px",
					fontSize: "14px",
					fontWeight: 500,
					lineHeight: "1.4",
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
					cursor: dismissible ? "pointer" : "default",
					zIndex: 9999,
					// Accessibility enhancements
					outline: "none",
					...(dismissible && {
						":focus": {
							outline: "2px solid #4A90E2",
							outlineOffset: "2px",
						},
					}),
					...style,
				}}
			>
				{/* Icon */}
				<div
					style={{
						flexShrink: 0,
						color: variant === "solid" ? "inherit" : theme.text,
					}}
				>
					{icon}
				</div>

				{/* Message */}
				<span
					style={{
						flex: 1,
						wordBreak: "break-word",
					}}
				>
					{message}
				</span>

				{/* Close button */}
				{showCloseButton && (
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							handleClose();
						}}
						aria-label="Close notification"
						style={{
							background: "none",
							border: "none",
							color: "inherit",
							cursor: "pointer",
							padding: "4px",
							borderRadius: "4px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							opacity: 0.7,
							transition: "opacity 0.2s",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.opacity = "1";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.opacity = "0.7";
						}}
					>
						<XCircle size={16} />
					</button>
				)}
			</div>
		</>
	);
};

export default NotifyToast;
