import { cn } from "@/lib/utils";
import * as React from "react";

const Progress = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & { value?: number }
>(({ className, value, ...props }, ref) => (
	<div
		ref={ref}
		role="progressbar"
		tabIndex={0}
		aria-valuenow={value}
		aria-valuemin={0}
		aria-valuemax={100}
		className={cn(
			"relative h-2 w-full overflow-hidden rounded-full bg-secondary",
			className,
		)}
		{...props}
	>
		<div
			className="h-full bg-primary transition-all"
			style={{ width: `${value}%` }}
		/>
	</div>
));
Progress.displayName = "Progress";

export { Progress };
