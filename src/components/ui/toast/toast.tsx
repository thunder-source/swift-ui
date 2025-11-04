import { cn } from "@/lib/utils";
import * as React from "react";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	duration?: number;
	type?: "success" | "error" | "info" | "warning";
	message: string;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
	(
		{
			open,
			onOpenChange,
			duration = 3000,
			type = "info",
			message,
			className,
			...props
		},
		ref,
	) => {
		React.useEffect(() => {
			if (open) {
				const timer = setTimeout(() => {
					onOpenChange(false);
				}, duration);
				return () => clearTimeout(timer);
			}
		}, [open, duration, onOpenChange]);

		return open ? (
			<div
				ref={ref}
				className={cn(
					"fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-md px-4 py-2 text-sm shadow-lg transition-all",
					type === "success" && "bg-green-500 text-white",
					type === "error" && "bg-red-500 text-white",
					type === "info" && "bg-blue-500 text-white",
					type === "warning" && "bg-yellow-500 text-black",
					className,
				)}
				{...props}
			>
				{message}
			</div>
		) : null;
	},
);
Toast.displayName = "Toast";

export { Toast };
