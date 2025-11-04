import { cn } from "@/lib/utils";
import * as React from "react";

const Label = React.forwardRef<
	HTMLLabelElement,
	React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
	<label
		htmlFor={props.htmlFor}
		ref={ref}
		className={cn(
			"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
			className,
		)}
		{...props}
	>
		{props.children || "Label"}
	</label>
));
Label.displayName = "Label";

export { Label };
