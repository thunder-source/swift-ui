import { cn } from "@/lib/utils";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

function Slider({
	className,
	defaultValue,
	onValueChange,
	value,
	min = 0,
	max = 100,
	...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
	const [internalValue, setInternalValue] = React.useState<number[]>(
		Array.isArray(value)
			? value
			: Array.isArray(defaultValue)
				? defaultValue
				: [min, max],
	);

	const handleChange = (val: number[]) => {
		setInternalValue(val);
		onValueChange?.(val);
	};

	return (
		<div className="relative mt-8 w-full">
			{/* Static min and max labels */}
			<div className="absolute  -top-6 flex justify-between w-full text-sm font-semibold text-[hsl(var(--text-dark))]">
				<span>${min}</span>
				<span>${max}</span>
			</div>

			<SliderPrimitive.Root
				data-slot="slider"
				defaultValue={defaultValue}
				value={value}
				min={min}
				max={max}
				onValueChange={handleChange}
				className={cn(
					"relative flex w-full pt-2 touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
					className,
				)}
				{...props}
			>
				<SliderPrimitive.Track
					data-slot="slider-track"
					className={cn(
						"bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
					)}
				>
					<SliderPrimitive.Range
						data-slot="slider-range"
						className={cn(
							"bg-[hsl(var(--primary-blue))] absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
						)}
					/>
				</SliderPrimitive.Track>
				{internalValue.map((_val, idx) => (
					<SliderPrimitive.Thumb
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={idx}
						data-slot="slider-thumb"
						className="border-[hsl(var(--bg-light))] border-2 bg-[hsl(var(--primary-blue))] ring-ring/50 block size-4 shrink-0 rounded-full shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden"
					/>
				))}
			</SliderPrimitive.Root>
		</div>
	);
}

export { Slider };
