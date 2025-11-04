import { InputField } from "@/components/base";
import { cn } from "@/lib/utils";

/**
 * Props for the SearchHeader component
 */
export type SearchHeaderProps = {
	/** Optional className for custom styling */
	className?: string;
	/** Placeholder for the search input */
	placeholder?: string;
	/** JSX element(s) for the right-side actions (e.g., filters, dropdowns) */
	actions?: React.ReactNode;
};

/**
 * SearchHeader – a themed, responsive search bar with actions.
 *
 * @param {SearchHeaderProps} props
 */
const SearchHeader = ({
	className = "",
	placeholder = "Search Employee by name, ID...",
	actions,
}: SearchHeaderProps) => {
	return (
		<header
			className={cn(
				"flex flex-col flex-1 sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 bg-[hsl(var(--bg-white))] border rounded-sm py-2 pr-4",
				className,
			)}
			aria-label="Employee search and filters"
		>
			<div className="flex-1 min-w-0">
				<InputField
					type="search"
					name="search"
					placeholder={placeholder}
					className="w-full border-none px-0 autofill:transition-colors autofill:duration-[5000000ms]
!bg-transparent !text-sm focus:ring-0 focus:border-none focus:outline-none focus-visible:ring-0 !ring-0"
				/>
			</div>
			{actions && (
				<div className="flex-shrink-0 flex items-center gap-3 ml-4">
					{actions}
				</div>
			)}
		</header>
	);
};

export { SearchHeader };
