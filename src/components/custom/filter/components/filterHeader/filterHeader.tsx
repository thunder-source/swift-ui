import { Button } from "@/components/ui";

type FilterHeaderProps = {
	onClear: () => void;
};

function FilterHeader({ onClear }: FilterHeaderProps) {
	return (
		<>
			<div className="flex justify-between items-center">
				<h4 className="text-[hsl(var(--text-dark))] text-lg font-semibold">
					Select Filter
				</h4>

				<Button
					onClick={onClear}
					variant={"ghost"}
					size="sm"
					className="text-xs font-semi-bold text-[hsl(var(--primary-blue))]"
				>
					Clear all Filter
				</Button>
			</div>
			<hr className="mt-2 mb-4" />
		</>
	);
}

export { FilterHeader };
