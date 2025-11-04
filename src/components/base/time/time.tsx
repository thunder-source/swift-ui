import { Button } from "@/components/ui";
import { useProgrammaticScroll } from "@/utils";
import { isValid } from "date-fns";
import { useEffect, useRef, useState } from "react";

type Period = "AM" | "PM";

interface TimeSelectorProps {
	selected?: Date;
	onSelect: (date: Date, hour: number, minute: number, period: Period) => void;
	onCancel?: () => void;
}

function TimeSelector({ selected, onSelect, onCancel }: TimeSelectorProps) {
	const [selectedHour, setSelectedHour] = useState(1);
	const [selectedMinute, setSelectedMinute] = useState(0);
	const [selectedPeriod, setSelectedPeriod] = useState<Period>("AM");

	// Initialize state when selected prop changes
	useEffect(() => {
		if (selected && isValid(selected)) {
			const hours = selected.getHours();
			const minutes = selected.getMinutes();

			// Convert 24-hour to 12-hour format
			let hour12 = hours % 12;
			if (hour12 === 0) hour12 = 12;

			setSelectedHour(hour12);
			setSelectedMinute(minutes);
			setSelectedPeriod(hours >= 12 ? "PM" : "AM");

			// Scroll to the selected values
			setTimeout(() => {
				if (hourRef.current) {
					hourRef.current.scrollTo({
						top: (hour12 - 1) * ITEM_HEIGHT,
						behavior: "smooth",
					});
				}
				if (minuteRef.current) {
					minuteRef.current.scrollTo({
						top: minutes * ITEM_HEIGHT,
						behavior: "smooth",
					});
				}
				if (periodRef.current) {
					periodRef.current.scrollTo({
						top: (hours >= 12 ? 1 : 0) * ITEM_HEIGHT,
						behavior: "smooth",
					});
				}
			}, 100);
		}
	}, [selected]);

	const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	const minutes = Array.from({ length: 60 }, (_, i) => i);
	const periods: Period[] = ["AM", "PM"];

	const hourRef = useRef<HTMLDivElement | null>(null);
	const minuteRef = useRef<HTMLDivElement | null>(null);
	const periodRef = useRef<HTMLDivElement | null>(null);

	// Track if scroll is programmatic to prevent feedback loop
	const hourProgrammaticScroll = useProgrammaticScroll();
	const minuteProgrammaticScroll = useProgrammaticScroll();
	const periodProgrammaticScroll = useProgrammaticScroll();

	const ITEM_HEIGHT = 40;

	// Generic handleScroll for type safety, now with programmatic scroll prevention
	const handleScroll = <T,>(
		ref: React.RefObject<HTMLDivElement | null>,
		items: T[],
		setter: (val: T) => void,
		programmaticScrollRef: React.MutableRefObject<boolean>,
	) => {
		if (!ref.current) return;
		if (programmaticScrollRef.current) {
			// Ignore scroll events triggered by our own scrollTo
			return;
		}
		const scrollTop = ref.current.scrollTop;
		const index = Math.round(scrollTop / ITEM_HEIGHT);
		setter(items[index]);
		// Only snap after user stops scrolling (debounced)
		debouncedScrollToItem(ref, index, programmaticScrollRef);
	};

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const useDebouncedCallback = <T extends (...args: any[]) => void>(
		callback: T,
		delay: number,
	) => {
		const timeout = useRef<NodeJS.Timeout | null>(null);

		return (...args: Parameters<T>) => {
			if (timeout.current) clearTimeout(timeout.current);
			timeout.current = setTimeout(() => callback(...args), delay);
		};
	};

	const debouncedScrollToItem = useDebouncedCallback(
		(
			ref: React.RefObject<HTMLDivElement | null>,
			index: number,
			programmaticScrollRef?: React.MutableRefObject<boolean>,
		) => {
			if (ref.current) {
				if (programmaticScrollRef) programmaticScrollRef.current = true;
				ref.current.scrollTo({
					top: index * ITEM_HEIGHT,
					behavior: "smooth",
				});
				// Clear flag after scroll animation (smooth scroll ~300ms)
				if (programmaticScrollRef) {
					setTimeout(() => {
						programmaticScrollRef.current = false;
					}, 400);
				}
			}
		},
		500, // increased delay after scroll stops for touchpad users
	);

	// Constrain createScrollPicker to string | number for ReactNode safety
	const createScrollPicker = <T extends string | number>(
		ref: React.RefObject<HTMLDivElement | null>,
		items: T[],
		selected: T,
		setter: (val: T) => void,
		programmaticScrollRef: React.MutableRefObject<boolean>,
	) => {
		// Helper to handle click: set selected and scroll to center
		const handleItemClick = (item: T, index: number) => {
			setter(item);
			// Instantly scroll to the clicked item for immediate feedback
			if (ref.current) {
				ref.current.scrollTo({
					top: index * ITEM_HEIGHT,
					behavior: "smooth",
				});
			}
		};

		return (
			<div className="relative h-[220px] overflow-hidden w-full">
				{/* Center highlight box */}
				<div
					ref={ref}
					onScroll={() =>
						handleScroll(ref, items, setter, programmaticScrollRef)
					}
					// Removed custom onWheel for natural touchpad scrolling
					className="overflow-y-scroll -y-scroll snap-y snap-mandatory no-scrollbar relative scrollbar-hide h-full"
				>
					<div className="pt-[90px] pb-[90px]">
						{items.map((item, i) => (
							<div
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={i}
								className={`h-10 snap-center flex items-center justify-center text-sm cursor-pointer transition-colors duration-150 select-none ${
									selected === item
										? "text-[hsl(var(--primary-blue))] font-bold"
										: "text-gray-400"
								}`}
								onClick={() => handleItemClick(item, i)}
								tabIndex={0}
								// biome-ignore lint/a11y/useSemanticElements: <explanation>
								role="button"
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										handleItemClick(item, i);
									}
								}}
							>
								{typeof item === "number"
									? item.toString().padStart(2, "0")
									: item}
							</div>
						))}
					</div>
				</div>
			</div>
		);
	};

	// Handler for Apply Now
	const handleApply = () => {
		// Compose a Date with today's date and selected time
		const now = new Date();
		let hour = selectedHour % 12;
		if (selectedPeriod === "PM") hour += 12;
		if (selectedPeriod === "AM" && hour === 12) hour = 0;
		now.setHours(hour, selectedMinute, 0, 0);
		onSelect(now, selectedHour, selectedMinute, selectedPeriod);
	};

	return (
		<div className="w-full bg-white h-[356px] border-[hsla(var(--bg-grey),0.5)] border scrollbar-hide rounded-lg shadow-lg p-4">
			<h2 className="text-md font-bold text-gray-900">Select Time</h2>
			<div className="mt-2 border-t border-gray-200" />
			<div className="absolute bg-[hsla(var(--bg-light),1)] top-1/2  w-[220px] mt-[-12px] h-10 -translate-y-1/2   rounded-md  pointer-events-none" />

			<div className="mt-2 px-8 grid grid-cols-3 gap-0 relative overflow-hidden">
				{/* Top fade overlay */}
				<div
					className="pointer-events-none absolute left-0 right-0 top-0 h-10 z-10"
					style={{
						background:
							"linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0.5))",
					}}
				/>
				{/* Bottom fade overlay */}
				<div
					className="pointer-events-none absolute left-0 right-0 bottom-0 h-10 z-10"
					style={{
						background:
							"linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0.5))",
					}}
				/>
			{createScrollPicker(
				hourRef,
				hours,
				selectedHour,
				(val) => setSelectedHour(val as number),
				hourProgrammaticScroll,
			)}
			{createScrollPicker(
				minuteRef,
				minutes,
				selectedMinute,
				(val) => setSelectedMinute(val as number),
				minuteProgrammaticScroll,
			)}
			{createScrollPicker(
				periodRef,
				periods,
				selectedPeriod,
				(val) => setSelectedPeriod(val as Period),
				periodProgrammaticScroll,
			)}
			</div>

			<div className="pt-4 gap-4 flex justify-between border-t border-gray-200">
				<Button variant={"outline"} onClick={onCancel}>
					Cancel
				</Button>
				<Button
					variant={"destructive"}
					className="text-md font-md "
					onClick={handleApply}
				>
					Apply Now
				</Button>
			</div>
		</div>
	);
}

export { TimeSelector, type TimeSelectorProps, type Period };
