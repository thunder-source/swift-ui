import { Checkbox } from "@/components/ui";
import { cn } from "@/lib/utils";
import { type ChangeEvent, useEffect, useState } from "react";
import { SvgIcon } from "../svgIcon";

interface CheckboxFieldProps {
	name: string;
	label?: string;
	placeHolder?: string;
	checked?: boolean;
	required?: boolean;
	className?: string;
	onChange?: (checked: boolean, e?: ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	size?: "sm" | "base" | "md" | "lg";
	color?: string;
	single?: boolean;
}

const CheckboxField = ({
	single = false,
	name,
	label,
	checked,
	required = false,
	className,
	placeHolder,
	error,
	size = "md",
	color = "hsl(var(--primary-blue))",
	onChange,
}: CheckboxFieldProps) => {
	// Internal state to show tick, sync with `checked` prop
	const [isChecked, setIsChecked] = useState(checked ?? false);

	useEffect(() => {
		if (checked !== undefined) {
			setIsChecked(checked);
		}
	}, [checked]);

	const handleToggle = () => {
		const newVal = !isChecked;
		setIsChecked(newVal);
		onChange?.(newVal);
	};

	return (
		<>
			{single ? (
				<div className="w-full">
					<label
						htmlFor=""
						className="mb-1 text-sm text-[hsl(var(--text-dark))] font-medium"
					>
						{label}
					</label>
					<div className="flex justify-between items-center rounded-md border border-[#EDEDED] p-2 mt-1">
						<div className="text-sm text-[hsl(var(--text-light))]">
							{placeHolder}
						</div>
						<Checkbox
							checked={isChecked}
							onClick={handleToggle}
							className="w-6 h-6 rounded-md data-[state=checked]:bg-[hsl(var(--primary-blue))]"
							style={{
								backgroundColor: isChecked ? color : undefined,
							}}
						/>
					</div>
				</div>
			) : (
				<div className={cn("flex items-center gap-2 select-none", className)}>
					<div className="relative">
						{/* Actual input for accessibility */}
						<input
							type="checkbox"
							id={name}
							name={name}
							checked={isChecked}
							required={required}
							onChange={(e) => {
								const newVal = e.target.checked;
								setIsChecked(newVal);
								onChange?.(newVal, e);
							}}
							className="sr-only peer"
							aria-invalid={!!error}
							aria-describedby={error ? `${name}-error` : undefined}
						/>

						{/* Custom checkbox design */}
						<div
							className={cn(
								"flex items-center justify-center rounded-md border-1 cursor-pointer peer-checked:bg-[hsl(var(--primary-blue))]",
								{
									"w-4 h-4": size === "sm",
									"w-5 h-5": size === "base",
									"w-6 h-6": size === "md",
									"w-8 h-8": size === "lg",
									"border-gray-200 bg-white": !isChecked,
								},
								size === "base" ? "p-0.5 " : "",
								className,
							)}
							style={{
								borderColor: size === "base" ? "#E0E0E0" : color,

								backgroundColor: isChecked ? color : undefined,
							}}
							onClick={handleToggle}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									handleToggle();
								}
							}}
							aria-checked={isChecked}
						>
							{isChecked && (
								<SvgIcon
									name="check"
									size={size === "sm" ? 10 : size === "lg" ? 22 : 18}
									color={color}
								/>
							)}
						</div>
					</div>

					{/* Label */}
					{label && (
						<label
							htmlFor={name}
							className={`text-sm font-normal ${size === "base" ? "text-[hsl(var(--text-medium))]" : "text-[hsl(var(--text-dark))]"} cursor-pointer select-none`}
						>
							{label}
							{required && (
								<span className="text-[hsl(var(--status-error))] ml-1">*</span>
							)}
						</label>
					)}

					{/* Error message */}
					{error && (
						<div className="flex items-center gap-1 mt-1">
							{/* Use SvgIcon for alert */}
							<SvgIcon
								name="alert"
								size={16}
								className="text-[hsl(var(--status-error))]"
							/>
							<p
								id={`${name}-error`}
								className="text-xs text-[hsl(var(--status-error))]"
							>
								{error}
							</p>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export { CheckboxField, type CheckboxFieldProps };
