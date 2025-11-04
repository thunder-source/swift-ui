import { cn } from "@/lib/utils";
import type * as React from "react";

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"animate-pulse rounded-md bg-gray-200 border-gray-200 border",
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
