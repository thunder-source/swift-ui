import { Button } from "@/components/ui";
import type { ButtonProps } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { CircleFadingPlus } from "lucide-react";
import type React from "react";

/**
 * Define variants for TabsHeader title component
 */
const titleVariants = cva("font-semibold text-[hsl(var(--text-dark))]", {
	variants: {
		size: {
			sm: "text-xl",
			md: "text-2xl",
		},
	},
	defaultVariants: {
		size: "sm",
	},
});

/**
 * Define variants for TabsHeader count component
 */
const countVariants = cva(
	"text-xs font-medium bg-[hsla(var(--primary-blue),0.1)] px-2 py-1 rounded-full text-[hsl(var(--primary-blue))]",
	{
		variants: {
			size: {
				sm: "",
				md: "",
			},
		},
		defaultVariants: {
			size: "sm",
		},
	},
);

/**
 * Define variants for TabsHeader description component
 */
const descriptionVariants = cva(
	"font-normal pt-1 text-[hsl(var(--text-light))]",
	{
		variants: {
			size: {
				sm: "text-sm",
				md: "text-sm",
			},
		},
		defaultVariants: {
			size: "sm",
		},
	},
);

/**
 * Props for TabsHeader component
 */
export interface TabsHeaderProps extends VariantProps<typeof titleVariants> {
	/**
	 * Optional content to be rendered at the far right of the header (e.g. custom actions, menus, etc.)
	 */
	rightContent?: React.ReactNode;
	/** Title displayed on the header */
	title?: string;
	/** Description or subtitle text */
	description?: string;
	/** Number of items (e.g., employee count) */
	count?: number;
	/** Legacy single-button text */
	buttonText?: string;
	/** Optional array of button configs */
	button?: Array<
		Pick<
			ButtonProps,
			| "variant"
			| "size"
			| "outlined"
			| "HoverOutlined"
			| "iconLeft"
			| "iconRight"
			| "className"
			| "tooltip"
			| "tooltipSide"
			| "disabled"
			| "loading"
		> & {
			buttonText: string;
			onButtonClick: () => void;
		}
	>;
	/** Legacy single-button click handler */
	onButtonClick?: () => void;
	/** Additional class names for styling */
	className?: string;
}

/**
 * @component TabsHeader
 * @description A flexible header with title, subtitle, count badge, and action buttons.
 * @example
 * ```tsx
 * <TabsHeader
 *   title="Employees"
 *   description="Manage your employees"
 *   count={42}
 *   button={[
 *     {
 *       buttonText: "Add Employee",
 *       onButtonClick: () => console.log("Add clicked"),
 *       variant: "default",
 *       iconLeft: <PlusIcon />,
 *     }
 *   ]}
 * />
 * ```
 */
export const TabsHeader: React.FC<TabsHeaderProps> = ({
	title = "Employees",
	description = "",
	count = 0,
	buttonText,
	onButtonClick,
	size = "sm",
	button,
	className = "",
	rightContent,
}) => {
	const renderButtons = () => {
		// Check if `button` is provided and has items
		if (button && button.length > 0) {
			return button.map((btn, idx) => (
				<Button
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={idx}
					variant={btn.variant}
					size={btn.size}
					outlined={btn.outlined}
					HoverOutlined={btn.HoverOutlined}
					onClick={btn.onButtonClick}
					iconLeft={btn.iconLeft}
					iconRight={btn.iconRight}
					className={btn.className}
					tooltip={btn.tooltip}
					tooltipSide={btn.tooltipSide}
					disabled={btn.disabled}
					loading={btn.loading}
					aria-label={btn.buttonText}
				>
					{btn.buttonText}
				</Button>
			));
		}

		// Show fallback legacy button if `button` is not provided or empty
		if (!button && buttonText && onButtonClick) {
			return (
				<Button
					variant="default"
					size="default"
					outlined
					onClick={onButtonClick}
					aria-label={`Create new ${title.toLowerCase()}`}
					iconLeft={<CircleFadingPlus size={22} strokeWidth={1.25} />}
					className="ml-auto"
					tooltip={`Create new ${title.toLowerCase()}`}
				>
					{buttonText}
				</Button>
			);
		}

		return null;
	};

	return (
		<div
			className={`flex flex-col md:flex-row md:items-center md:justify-between gap-3 flex-wrap ${className}`}
			aria-label="tabs-header"
		>
			<div>
				<div className="flex items-center gap-2">
					<h1 className={cn(titleVariants({ size }))}>{title}</h1>

					{typeof count === "number" && count > 0 && (
						<p
							className={cn(countVariants({ size }))}
							aria-label={`${title} count`}
						>
							{count}
						</p>
					)}
				</div>

				{description && (
					<p className={cn(descriptionVariants({ size }))}>{description}</p>
				)}
			</div>

			<div className="flex gap-2 items-center">
				{rightContent && (
					<div className="ml-2 flex items-center">{rightContent}</div>
				)}
				{renderButtons()}
			</div>
		</div>
	);
};
