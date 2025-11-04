import { cn } from "@/lib/utils";
import * as React from "react";

interface InputProps extends React.ComponentProps<"input"> {
	label?: string;
	error?: string;
	required?: boolean;
	showSearchIcon?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			label,
			required,
			placeholder,
			name,
			showSearchIcon = false,
			error,
			...props
		},
		ref,
	) => {
		return (
			<div className="w-full relative">
				{label && (
					<label
						className="block text-sm text-[hsl(var(--text-dark))] mb-1"
						htmlFor={name}
					>
						{label}
						{required && (
							<span className="text-[hsl(var(--status-error))] ml-1">*</span>
						)}
					</label>
				)}
				<input
					id={name}
					name={name}
					placeholder={placeholder}
					className={cn(
						"flex h-11 w-full rounded-md border bg-transparent pl-4 pr-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
						error
							? "border-[hsl(var(--status-error))] focus-visible:ring-[hsl(var(--status-error))] hover:border-[hsl(var(--status-error))]"
							: "border-input focus-visible:ring-[hsl(var(--primary-blue))]",
						className,
					)}
					ref={ref}
					aria-invalid={!!error}
					aria-describedby={error ? `${name || label}-error` : undefined}
					required={required}
					{...props}
				/>
			</div>
		);
	},
);
Input.displayName = "Input";

export { Input, type InputProps };
