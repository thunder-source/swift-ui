import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { X } from "lucide-react";

const badgeVariants = cva(
	"inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-[hsla(var(--primary-blue),0.1)] text-[hsl(var(--primary-blue))] hover:bg-[hsla(var(--primary-blue),0.18)]",
				secondary:
					"border-transparent bg-[hsla(var(--primary-orange),0.1)] text-[hsl(var(--primary-orange))] hover:bg-[hsla(var(--primary-orange),0.18)]",
				destructive:
					"border-transparent bg-[hsla(var(--status-error),0.1)] text-[hsl(var(--status-error))] hover:bg-[hsla(var(--status-error),0.18)]",
				outline:
					"border-[hsl(var(--border-grey))] text-[hsl(var(--status-gray))] hover:bg-[hsla(var(--status-gray),0.18)]",
				info: "bg-[hsla(var(--status-info),0.1)] text-[hsl(var(--status-info))] hover:bg-[hsla(var(--status-info),0.18)]",
				warning:
					"bg-[hsla(var(--status-warning),0.1)] text-[hsl(var(--status-warning))] hover:bg-[hsla(var(--status-warning),0.18)]",
				success:
					"bg-[hsla(var(--status-success),0.1)] text-[hsl(var(--status-success))] hover:bg-[hsla(var(--status-success),0.18)]",
				gray: "bg-[hsla(var(--status-gray),0.1)] text-[hsl(var(--status-gray))] hover:bg-[hsla(var(--status-gray),0.18)]",
			},
			size: {
				sm: "px-2 py-0.5 text-xs",
				md: "px-3 py-1 text-sm",
				lg: "px-4 py-1.5 text-base",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
);

import type { BadgeIcon } from "./icon-map";

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {
	/** Badge label (optional) */
	children?: React.ReactNode;
	/** Badge style variant (color/status) */
	variant?:
		| "default"
		| "secondary"
		| "destructive"
		| "outline"
		| "info"
		| "warning"
		| "success"
		| "gray";
	/** Badge size */
	size?: "sm" | "md" | "lg";
	/** Show a status icon inferred from variant if no explicit icons */
	showIcon?: boolean;
	/** Show a close button */
	closable?: boolean;
	/** Callback when the close button is clicked */
	onClose?: () => void;
	/** Additional class names */
	className?: string;
	/** Custom icon to render at the start (overrides showIcon) */
	startIcon?: BadgeIcon;
	/** Custom icon to render at the end */
	endIcon?: BadgeIcon;
}

import React from "react";

/**
 * A badge component with various styles and sizes.
 */
import { resolveIcon } from "./icon-map";

/**
 * Badge component with minimal props. Use `variant` for status, `children` for label, and `showIcon` to display a status icon automatically.
 * Optionally make badge closable.
 *
 * @prop children - Badge label (optional)
 * @prop variant - Badge style variant (status)
 * @prop size - Badge size
 * @prop showIcon - Show icon inferred from variant
 * @prop closable - Show close button
 * @prop onClose - Callback for close button
 * @prop className - Additional class names
 */
const Badge: React.FC<BadgeProps> = React.memo(
	({
		children,
		variant = "default",
		size = "md",
		showIcon = true,
		closable = false,
		onClose,
		className,
		startIcon,
		endIcon,
		...props
	}) => {
		// Map variant to icon
		const variantIconMap: Partial<Record<string, BadgeIcon>> = {
			success: "CheckCircle",
			warning: "AlertTriangle",
			info: "Info",
		};
		// Decide which icon(s) to render
		const resolvedStartIcon = startIcon
			? resolveIcon(startIcon, "w-4 h-4")
			: showIcon && !endIcon
				? resolveIcon(variantIconMap[variant || "default"], "w-4 h-4")
				: null;
		const resolvedEndIcon = endIcon ? resolveIcon(endIcon, "w-4 h-4") : null;

		// If only one icon and no children, render as a rounded icon badge
		const isIconOnly =
			!children && ((!!startIcon && !endIcon) || (!startIcon && !!endIcon));
		const iconOnly = resolvedStartIcon || resolvedEndIcon;

		if (isIconOnly && iconOnly) {
			// Custom padding for icon-only badges ONLY (no badgeVariants, no default padding)
			const iconOnlyPadding =
				size === "lg" ? "p-1.5" : size === "sm" ? "p-0.5" : "p-1";
			return (
				<div
					className={cn(
						"flex items-center justify-center rounded-full aspect-square",
						badgeVariants({ variant, size }),
						iconOnlyPadding,
						className,
					)}
					{...props}
				>
					{iconOnly}
				</div>
			);
		}

		return (
			<div
				className={cn(
					"flex gap-1.5 items-center",
					badgeVariants({ variant, size }),
					className,
				)}
				{...props}
			>
				{resolvedStartIcon && <span>{resolvedStartIcon}</span>}
				{children && <span>{children}</span>}
				{resolvedEndIcon && <span>{resolvedEndIcon}</span>}
				{closable && (
					<button
						type="button"
						onClick={onClose}
						className="rounded-full p-0.5 cursor-pointer"
						aria-label="Close badge"
					>
						<X className="h-4 w-4" />
					</button>
				)}
			</div>
		);
	},
);

Badge.displayName = "Badge";
export { Badge };
