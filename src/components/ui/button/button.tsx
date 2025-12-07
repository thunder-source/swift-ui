import { SvgIcon } from "@/components/base/svgIcon";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../tooltip";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

const buttonVariants = cva(
	"inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default:
					"bg-[hsl(var(--primary-blue))]  text-primary-foreground shadow-xs border-1 !px-4  border-[hsl(var(--primary-blue))] hover:border-[hsl(var(--primary-blue))]/90 hover:bg-[hsl(var(--primary-blue))]/90 dark:bg-input/30 ",
				destructive:
					"bg-[hsl(var(--primary-orange))] text-white shadow-xs hover:bg-white border-1 !px-4 border-[hsl(var(--primary-orange))] hover:border-[hsl(var(--primary-orange))]/90 hover:bg-[hsl(var(--primary-orange))]/90 dark:bg-input/30 ",
				outline:
					"border bg-background border-1 border-[hsl(var(--bg-grey))] text-[hsl(var(--text-medium))] !px-4 shadow-xs hover:bg-accent hover:text-[hsl(var(--text-medium))]/80 dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
				secondary:
					"bg-[hsl(var(--text-medium))] !px-4 text-white shadow-xs hover:bg-[hsl(var(--text-medium))]/90  border-1 border-[hsl(var(--text-medium))] ",
				danger:
					" bg-[hsl(var(--status-error))] border-1 border-[hsl(var(--status-error))] text-primary-foreground shadow-xs hover:bg-[hsl(var(--status-error))]/90 !px-4 ",
				dark: "bg-[hsl(var(--text-dark))] border-1 border-[hsl(var(--text-dark))] text-white shadow-xs hover:bg-[hsl(var(--text-dark))]/90  !px-4",
				defaultOutline:
					"bg-[hsl(var(--primary-blue))]  text-primary-foreground shadow-xs border-1 !px-4  border-[hsl(var(--primary-blue))] hover:border-[hsl(var(--primary-blue))]/90 hover:bg-[hsl(var(--primary-blue))]/90 dark:bg-input/30 ",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-10 px-4 py-2 has-[>svg]:px-3", // Default size
				sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5", // Small size
				md: "h-10 px-4 py-2 has-[>svg]:px-3 ", // 40px height
				lg: "h-14 px-4 py-2 min-w-[200px] has-[>svg]:px-4", // 56px height
				icon: "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

/**
 * Button component with optional tooltip support.
 * @param tooltip - Optional tooltip text to display on hover/focus.
 */
export type ButtonProps = React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
		iconLeft?: React.ReactNode | string;
		iconRight?: React.ReactNode | string;
		HoverOutlined?: boolean;
		borderRadius?: string;
		borderRadiusHover?: string;
		outlined?: boolean;
		widthFull?: boolean;
		loading?: boolean;
		height?: string;
		/** Tooltip text to display on hover/focus */
		tooltip?: string;
		/** Tooltip side (position): top, right, bottom, left */
		tooltipSide?: "top" | "right" | "bottom" | "left";
	};
function Button({
	className,
	variant,
	size,
	asChild = false,
	iconLeft = null,
	iconRight = null,
	borderRadius = "",
	borderRadiusHover = "",
	HoverOutlined = false,
	outlined = false,
	widthFull = false,
	loading = false,
	disabled = false,
	children,
	tooltip,
	tooltipSide = "top",
	...props
}: ButtonProps) {
	const Comp = asChild ? Slot : "button";

	let hoverClass = "";
	if (outlined) {
		switch (variant) {
			case "default":
				hoverClass =
					"hover:bg-[hsl(var(--primary-blue))] bg-white text-[hsl(var(--primary-blue))] hover:text-white border-1 border-[hsl(var(--primary-blue))]";
				break;
			case "destructive":
				hoverClass =
					"hover:bg-[hsl(var(--primary-orange))] bg-white text-[hsl(var(--primary-orange))] hover:text-white border-1 border-[hsl(var(--primary-orange))]";
				break;
			case "secondary":
				hoverClass =
					"hover:bg-[hsl(var(--text-medium))] bg-white text-[hsl(var(--text-medium))] hover:text-white border-1 border-[hsl(var(--text-medium))]";
				break;
			case "danger":
				hoverClass =
					"hover:bg-[hsl(var(--status-error))] bg-white text-[hsl(var(--status-error))] hover:text-white border-1 border-[hsl(var(--status-error))]";
				break;
			case "dark":
				hoverClass =
					"hover:bg-[hsl(var(--text-dark))] bg-white text-[hsl(var(--text-dark))] hover:text-white border-1 border-[hsl(var(--text-dark))]";
				break;
			case "outline":
				hoverClass =
					"hover:bg-[hsl(var(--bg-grey))] bg-white text-[hsl(var(--bg-grey))] hover:text-white border-1 border-[hsl(var(--bg-grey))]";
				break;
			default:
				hoverClass =
					"hover:bg-[hsl(var(--primary-blue))] bg-white text-[hsl(var(--primary-blue))] hover:text-white border-1 border-[hsl(var(--primary-blue))]";
				break;
		}
	}
	if (HoverOutlined) {
		switch (variant) {
			case "default":
				hoverClass =
					"hover:bg-white hover:text-[hsl(var(--primary-blue))] hover:border-[hsl(var(--primary-blue))]";
				break;
			case "destructive":
				hoverClass =
					"hover:bg-white hover:text-[hsl(var(--primary-orange))] hover:border-[hsl(var(--primary-orange))]";
				break;
			case "secondary":
				hoverClass =
					"hover:bg-white hover:text-[hsl(var(--text-medium))] hover:border-[hsl(var(--text-medium))]";
				break;
			case "danger":
				hoverClass =
					"hover:bg-white hover:text-[hsl(var(--status-error))] hover:border-[hsl(var(--status-error))]";
				break;
			case "dark":
				hoverClass =
					"hover:bg-white hover:text-[hsl(var(--text-dark))] hover:border-[hsl(var(--text-dark))]";
				break;
			case "outline":
				hoverClass =
					"hover:bg-white  hover:text-[hsl(var(--text-medium))]/80  hover:border-[hsl(var(--bg-grey))]";
				break;
			default:
				hoverClass =
					"hover:bg-white hover:text-[hsl(var(--primary-blue))] hover:border-[hsl(var(--primary-blue))]";
		}
	}
	if (widthFull) {
		hoverClass += " w-full";
	}
	if (disabled && HoverOutlined) {
		hoverClass +=
			" text-[hsl(var(--text-light))] hover:text-[hsl(var(--text-light))] !cursor-not-allowed bg-[#E0E0E080] hover:bg-[#E0E0E080] border-[hsl(var(--text-light))]/50  hover:border-[hsl(var(--text-light))]/50";
	}
	if (disabled && !HoverOutlined) {
		hoverClass +=
			" text-[hsl(var(--text-light))] hover:text-[hsl(var(--text-light))] !cursor-not-allowed bg-white hover:bg-white border-[hsl(var(--text-light))]/50  hover:border-[hsl(var(--text-light))]/50";
	}
	if (borderRadius) {
		hoverClass += ` rounded-${borderRadius}`;
	}
	if (borderRadiusHover) {
		hoverClass += ` hover:rounded-${borderRadiusHover}`;
	}

	const buttonContent = (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size }), hoverClass, className)}
			disabled={disabled || loading}
			aria-busy={loading}
			{...props}
		>
			{loading && (
				<span
					className="flex items-center justify-center mr-2"
					aria-hidden="true"
				>
					<SvgIcon
						name="loader"
						className="animate-spin"
						size={20}
						color={"currentColor"}
					/>
				</span>
			)}
			{size === "icon" ? (
				loading ? null : (
					iconLeft
				)
			) : (
				<span
					className={cn(
						"flex items-center gap-2 justify-center w-full",
						loading ? "opacity-60" : "",
					)}
				>
					{iconLeft}
					{children}
					{iconRight}
				</span>
			)}
		</Comp>
	);

	if (tooltip) {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
					<TooltipContent side={tooltipSide}>{tooltip}</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	}

	return buttonContent;
}

export { Button, buttonVariants };
