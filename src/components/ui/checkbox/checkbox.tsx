import { cn } from "@/lib/utils";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { type VariantProps, cva } from "class-variance-authority";
import { CheckIcon } from "lucide-react";
import type * as React from "react";
import { cloneElement, forwardRef, isValidElement } from "react";

// CVA variants for better style management
const checkboxVariants = cva(
	// Base styles
	[
		"peer shrink-0 rounded-[6px] border transition-all duration-200 outline-none",
		"disabled:cursor-not-allowed disabled:opacity-50",
		"focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary-blue))]/30 focus-visible:ring-offset-2",
		"aria-invalid:ring-2 aria-invalid:ring-[hsl(var(--status-error))]/30",
	],
	{
		variants: {
			size: {
				sm: "size-4",
				md: "size-5",
				lg: "size-6",
			},
			variant: {
				default: [
					"border-[hsl(var(--border-grey))] bg-[hsl(var(--bg-white))]",
					"data-[state=checked]:bg-[hsl(var(--primary-blue))]",
					"data-[state=checked]:text-white",
					"data-[state=checked]:border-[hsl(var(--primary-blue))]",
					"hover:border-[hsl(var(--primary-blue))]/60",
				],
				orange: [
					"border-[hsl(var(--border-grey))] bg-[hsl(var(--bg-white))]",
					"data-[state=checked]:bg-[hsl(var(--primary-orange))]",
					"data-[state=checked]:text-white",
					"data-[state=checked]:border-[hsl(var(--primary-orange))]",
					"hover:border-[hsl(var(--primary-orange))]/60",
				],
				success: [
					"border-[hsl(var(--border-grey))] bg-[hsl(var(--bg-white))]",
					"data-[state=checked]:bg-[hsl(var(--status-success))]",
					"data-[state=checked]:text-white",
					"data-[state=checked]:border-[hsl(var(--status-success))]",
					"hover:border-[hsl(var(--status-success))]/60",
				],
				error: [
					"border-[hsl(var(--border-grey))] bg-[hsl(var(--bg-white))]",
					"data-[state=checked]:bg-[hsl(var(--status-error))]",
					"data-[state=checked]:text-white",
					"data-[state=checked]:border-[hsl(var(--status-error))]",
					"hover:border-[hsl(var(--status-error))]/60",
				],
			},
		},
		defaultVariants: {
			size: "md",
			variant: "default",
		},
	},
);

const checkboxIconVariants = cva(
	"flex items-center justify-center text-current transition-all duration-150 data-[state=unchecked]:scale-0 data-[state=checked]:scale-100",
	{
		variants: {
			size: {
				sm: "w-3 h-3",
				md: "w-4 h-4",
				lg: "w-5 h-5",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

/**
 * Checkbox component props extending Radix UI CheckboxPrimitive.Root
 */
export interface CheckboxProps
	extends Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, "asChild">,
		VariantProps<typeof checkboxVariants> {
	/**
	 * Additional CSS class names to apply to the checkbox
	 */
	className?: string;
	/**
	 * The controlled checked state of the checkbox
	 */
	checked?: boolean | "indeterminate";
	/**
	 * The default checked state when uncontrolled
	 */
	defaultChecked?: boolean | "indeterminate";
	/**
	 * Event handler called when the checked state changes
	 */
	onCheckedChange?: (checked: boolean) => void;
	/**
	 * When true, prevents the user from interacting with the checkbox
	 */
	disabled?: boolean;
	/**
	 * When true, indicates that the user must check the checkbox before submitting
	 */
	required?: boolean;
	/**
	 * The name of the checkbox when used in forms
	 */
	name?: string;
	/**
	 * The value of the checkbox when used in forms
	 */
	value?: string;
	/**
	 * Accessible label for screen readers
	 */
	"aria-label"?: string;
	/**
	 * ID of the element that describes the checkbox
	 */
	"aria-describedby"?: string;
	/**
	 * Custom icon component to display when checked (defaults to CheckIcon from lucide-react)
	 * The icon will receive className prop for styling
	 */
	icon?: React.ComponentType<{ className?: string }> | React.ReactElement;
}

/**
 * A customizable checkbox component built on top of Radix UI's Checkbox primitive.
 *
 * Features:
 * - Fully accessible with ARIA support
 * - Controlled and uncontrolled modes
 * - Multiple size and style variants
 * - Keyboard navigation support
 * - Screen reader friendly
 * - Form integration ready
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Checkbox />
 *
 * // Controlled
 * <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
 *
 * // With variants
 * <Checkbox size="lg" variant="destructive" />
 *
 * // With form integration
 * <Checkbox name="terms" value="accepted" required />
 * ```
 */
const Checkbox = forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	CheckboxProps
>(
	(
		{
			className,
			size,
			variant,
			checked,
			defaultChecked,
			onCheckedChange,
			disabled = false,
			required = false,
			name,
			value,
			icon: CustomIcon = CheckIcon,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedby,
			...props
		},
		ref,
	) => {
		// Handle both component and element icons
		const renderIcon = () => {
			const iconProps = { className: "w-full h-full" };

			if (isValidElement<{ className?: string }>(CustomIcon)) {
				const element = CustomIcon as React.ReactElement<{
					className?: string;
				}>;
				return cloneElement(element, {
					...iconProps,
					className: cn(iconProps.className, element.props.className),
				});
			}

			if (typeof CustomIcon === "function") {
				const IconComponent = CustomIcon as React.ComponentType<{
					className?: string;
				}>;
				return <IconComponent {...iconProps} />;
			}

			return <CheckIcon {...iconProps} />;
		};
		return (
			<CheckboxPrimitive.Root
				ref={ref}
				data-slot="checkbox"
				className={cn(checkboxVariants({ size, variant }), className)}
				checked={checked}
				defaultChecked={defaultChecked}
				onCheckedChange={onCheckedChange}
				disabled={disabled}
				required={required}
				name={name}
				value={value}
				aria-label={ariaLabel}
				aria-describedby={ariaDescribedby}
				{...props}
			>
				<CheckboxPrimitive.Indicator
					data-slot="checkbox-indicator"
					className={cn(checkboxIconVariants({ size }), "mx-auto")}
				>
					{renderIcon()}
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>
		);
	},
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, checkboxVariants };

// Export types for external usage
export type { VariantProps };
export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
