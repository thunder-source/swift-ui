import { Button } from "@/components/ui/button/button";
import { PencilLine } from "lucide-react";
import type React from "react";
import { memo, useMemo } from "react";

/**
 * Represents a single detail entry with key-value pair
 */
interface DetailEntry {
	/** The key identifier for the detail */
	key: string;
	/** The display value for the detail */
	value: string;
	/** Optional custom label override */
	label?: string;
}

/**
 * Configuration options for the GeneralDetailCard component
 */
interface GeneralDetailCardConfig {
	/** Maximum number of columns in the grid layout (auto-adaptive based on content) */
	maxColumns?: 1 | 2 | 3;
	/** Whether layout should be adaptive (automatically adjust columns based on item count) */
	adaptiveLayout?: boolean;
	/** Whether to balance items evenly across columns instead of filling columns sequentially */
	balancedColumns?: boolean;
	/** Whether to show the header */
	showHeader?: boolean;
	/** Custom header text */
	headerText?: string;
	/** Density of the layout */
	density?: "compact" | "comfortable" | "spacious";
	/** Whether values should be truncated with ellipsis */
	truncateValues?: boolean;
}

/**
 * Props for the GeneralDetailCard component
 */
interface GeneralDetailCardProps {
	/**
	 * The data to display as key-value pairs
	 * @example { firstName: "John", lastName: "Doe", email: "john@example.com" }
	 */
	data: Record<string, string | number | null | undefined>;
	/**
	 * Optional configuration for customizing the card appearance and behavior
	 */
	config?: GeneralDetailCardConfig;
	/**
	 * Optional CSS class name to apply to the root element
	 */
	className?: string;
	/**
	 * Optional test ID for testing purposes
	 */
	testId?: string;
	/**
	 * Callback fired when a detail item is clicked
	 */
	onDetailClick?: (key: string, value: string) => void;
	/**
	 * Optional custom formatter for keys
	 */
	keyFormatter?: (key: string) => string;
	/**
	 * Optional custom formatter for values
	 */
	valueFormatter?: (key: string, value: string | number) => string;
	/**
	 * Optional array of field key pairs to display side by side (left and right fields per row)
	 * Example: [["firstName", "sourceOfHire"], ["lastName", "officeLocation"]]
	 */
	fieldPairs?: [string, string][];
	/**
	 * Function to call when the edit button in the header is clicked
	 */
	onEditClick?: () => void;
}

/**
 * Default configuration values
 */
const DEFAULT_CONFIG: Required<GeneralDetailCardConfig> = {
	maxColumns: 3,
	adaptiveLayout: true,
	balancedColumns: true,
	showHeader: true,
	headerText: "General Details",
	density: "comfortable",
	truncateValues: false,
} as const;

/**
 * Determines the number of columns to use based on item count and configuration
 */
const getColumnCount = (
	itemCount: number,
	config: Required<GeneralDetailCardConfig>,
): number => {
	if (!config.adaptiveLayout) {
		return config.maxColumns;
	}

	if (itemCount <= 2) return 1;
	if (itemCount <= 4) return 2;
	if (itemCount <= 8 && config.maxColumns >= 2) return 2;
	if (config.maxColumns >= 3) return 3;
	return 2;
};

/**
 * Distributes items evenly across columns for balanced layout
 */
const distributeItemsAcrossColumns = (
	items: DetailEntry[],
	columnCount: number,
): DetailEntry[][] => {
	if (columnCount === 1) return [items];

	const columns: DetailEntry[][] = Array.from(
		{ length: columnCount },
		() => [],
	);

	// Distribute items round-robin style for balanced columns
	items.forEach((item, index) => {
		const columnIndex = index % columnCount;
		columns[columnIndex].push(item);
	});

	return columns;
};

const formatKey = (key: string): string => {
	if (!key || typeof key !== "string") return "";

	return (
		key
			// Replace underscores and hyphens with spaces
			.replace(/[_\-]/g, " ")
			// Insert space between lowercase and uppercase letters (camelCase)
			.replace(/([a-z])([A-Z])/g, "$1 $2")
			// Insert space between letters and numbers
			.replace(/([a-zA-Z])(\d)/g, "$1 $2")
			.replace(/(\d)([a-zA-Z])/g, "$1 $2")
			// Convert to title case
			.toLowerCase()
			.replace(/\b\w/g, (char) => char.toUpperCase())
			// Clean up multiple spaces
			.replace(/\s+/g, " ")
			.trim()
	);
};

/**
 * Filters and transforms data entries, removing null/undefined values
 * and converting numbers to strings
 */
const useProcessedData = (
	data: Record<string, string | number | null | undefined>,
	keyFormatter?: (key: string) => string,
	valueFormatter?: (key: string, value: string | number) => string,
): DetailEntry[] => {
	return useMemo(() => {
		return Object.entries(data)
			.filter(([, value]) => value != null && value !== "")
			.map(([key, value]) => {
				const stringValue = String(value);
				return {
					key,
					value:
						valueFormatter && value != null
							? valueFormatter(key, value)
							: stringValue,
					label: keyFormatter ? keyFormatter(key) : formatKey(key),
				};
			});
	}, [data, keyFormatter, valueFormatter]);
};

/**
 * A reusable card component for displaying key-value data pairs in a clean,
 * responsive grid layout with customizable styling and behavior.
 *
 * @example
 * ```tsx
 * const userData = {
 *   firstName: "John",
 *   lastName: "Doe",
 *   emailAddress: "john.doe@example.com",
 *   phoneNumber: "+1-555-0123"
 * };
 *
 * <GeneralDetailCard
 *   data={userData}
 *   config={{ maxColumns: 2, density: "comfortable" }}
 *   onDetailClick={(key, value) => console.log(`Clicked ${key}: ${value}`)}
 * />
 * ```
 */
const GeneralDetailCard: React.FC<GeneralDetailCardProps> = memo(
	({
		data,
		config = {},
		className = "",
		testId = "general-detail-card",
		onDetailClick,
		keyFormatter,
		valueFormatter,
		fieldPairs,
		onEditClick,
	}) => {
		console.log(className);
		const mergedConfig = { ...DEFAULT_CONFIG, ...config };
		const processedData = useProcessedData(data, keyFormatter, valueFormatter);
		const columnCount = getColumnCount(processedData.length, mergedConfig);

		// Map for quick lookup
		const processedDataMap = useMemo(() => {
			const map: Record<string, DetailEntry> = {};
			for (const entry of processedData) {
				map[entry.key] = entry;
			}
			return map;
		}, [processedData]);

		// If fieldPairs is provided, render pairs side by side
		if (fieldPairs && fieldPairs.length > 0) {
			return (
				<div
					className={`card shadow-md rounded-lg flex flex-col mx-auto ${className} ${mergedConfig.density === "compact" ? "p-4" : mergedConfig.density === "spacious" ? "p-8" : "p-6"}`}
					data-testid={testId}
					aria-label={
						mergedConfig.showHeader
							? mergedConfig.headerText
							: "Detail information"
					}
				>
					{mergedConfig.showHeader && (
						<div className="flex items-center justify-between mb-4 border-b pb-2">
							<h2
								className="text-xl font-bold"
								data-testid={`${testId}-header`}
							>
								{mergedConfig.headerText}
							</h2>
							{onEditClick && (
								<Button
									variant="ghost"
									size="icon"
									aria-label="Edit details"
									onClick={onEditClick}
									iconLeft={
										<PencilLine
											className="text-[hsl(var(--text-light))]"
											size={20}
											aria-hidden="true"
										/>
									}
									tooltip="Edit details"
								/>
							)}
						</div>
					)}
					<div className="grid grid-cols-2 gap-x-12 gap-y-3">
						{fieldPairs.map(([leftKey, rightKey]) => {
							const left = processedDataMap[leftKey];
							const right = processedDataMap[rightKey];
							return (
								<div key={leftKey ?? rightKey} className="contents">
									{/* Left field */}
									{left ? (
										<div
											className={`flex gap-8 justify-between text-sm sm:text-base ${onDetailClick ? "cursor-pointer hover:bg-gray-50 rounded px-2 py-1 -mx-2 -my-1 transition-colors" : ""}`}
											data-testid={`${testId}-item-${left.key}`}
											onClick={
												onDetailClick
													? () => onDetailClick(left.key, left.value)
													: undefined
											}
											onKeyDown={
												onDetailClick
													? (e) => {
															if (e.key === "Enter" || e.key === " ") {
																e.preventDefault();
																onDetailClick(left.key, left.value);
															}
														}
													: undefined
											}
											role={onDetailClick ? "button" : undefined}
											tabIndex={onDetailClick ? 0 : undefined}
											aria-label={
												onDetailClick
													? `${left.label}: ${left.value}`
													: undefined
											}
										>
											<span
												className="text-gray-500 font-medium"
												data-testid={`${testId}-key-${left.key}`}
											>
												{left.label}
											</span>
											<span
												className={`font-medium text-gray-900 text-right ${mergedConfig.truncateValues ? "truncate max-w-[200px]" : ""}`}
												data-testid={`${testId}-value-${left.key}`}
											>
												{left.value}
											</span>
										</div>
									) : (
										<div />
									)}
									{/* Right field */}
									{right ? (
										<div
											className={`flex gap-8 justify-between text-sm sm:text-base ${onDetailClick ? "cursor-pointer hover:bg-gray-50 rounded px-2 py-1 -mx-2 -my-1 transition-colors" : ""}`}
											data-testid={`${testId}-item-${right.key}`}
											onClick={
												onDetailClick
													? () => onDetailClick(right.key, right.value)
													: undefined
											}
											onKeyDown={
												onDetailClick
													? (e) => {
															if (e.key === "Enter" || e.key === " ") {
																e.preventDefault();
																onDetailClick(right.key, right.value);
															}
														}
													: undefined
											}
											role={onDetailClick ? "button" : undefined}
											tabIndex={onDetailClick ? 0 : undefined}
											aria-label={
												onDetailClick
													? `${right.label}: ${right.value}`
													: undefined
											}
										>
											<span
												className="text-gray-500 font-medium"
												data-testid={`${testId}-key-${right.key}`}
											>
												{right.label}
											</span>
											<span
												className={`font-medium text-gray-900 text-right ${mergedConfig.truncateValues ? "truncate max-w-[200px]" : ""}`}
												data-testid={`${testId}-value-${right.key}`}
											>
												{right.value}
											</span>
										</div>
									) : (
										<div />
									)}
								</div>
							);
						})}
					</div>
				</div>
			);
		}

		// Distribute items across columns for balanced layout
		const columnData = useMemo(() => {
			if (mergedConfig.balancedColumns && columnCount > 1) {
				return distributeItemsAcrossColumns(processedData, columnCount);
			}
			return [processedData]; // Single array for CSS Grid to handle
		}, [processedData, mergedConfig.balancedColumns, columnCount]);

		const densityClasses = useMemo(() => {
			const densityMap = {
				compact: "p-4 gap-x-6 gap-y-2",
				comfortable: "p-6 gap-x-10 gap-y-3",
				spacious: "p-8 gap-x-12 gap-y-4",
			} as const;

			return densityMap[mergedConfig.density];
		}, [mergedConfig.density]);

		// Early return for empty data
		if (!processedData.length) {
			return (
				<div
					className={`card shadow-md rounded-lg p-6 w-full mx-auto ${className}`.trim()}
					data-testid={`${testId}-empty`}
					aria-label="No details available"
				>
					<p className="text-gray-500 text-center">No details available</p>
				</div>
			);
		}

		if (mergedConfig.balancedColumns && columnCount > 1) {
			return (
				<div
					className={`card shadow-md rounded-lg flex flex-col  mx-auto ${densityClasses}`}
					data-testid={testId}
					aria-label={
						mergedConfig.showHeader
							? mergedConfig.headerText
							: "Detail information"
					}
				>
					{mergedConfig.showHeader && (
						<div className="flex items-center justify-between mb-4 border-b pb-2">
							<h2
								className="text-xl font-bold"
								data-testid={`${testId}-header`}
							>
								{mergedConfig.headerText}
							</h2>
							{onEditClick && (
								<Button
									variant="ghost"
									size="icon"
									aria-label="Edit details"
									onClick={onEditClick}
									iconLeft={
										<PencilLine
											className="text-[hsl(var(--text-light))]"
											size={20}
											aria-hidden="true"
										/>
									}
									tooltip="Edit details"
								/>
							)}
						</div>
					)}
					{/*  dyanamic classes i want ok chat gpt  */}
					<div className={`  ${densityClasses}`}>
						{columnData.map((columnItems, columnIndex) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<div key={columnIndex} className="space-y-3">
								{columnItems.map(({ key, value, label }) => (
									<div
										key={key}
										className={`flex ${className}  gap-8 justify-between text-sm sm:text-base ${
											onDetailClick
												? "cursor-pointer hover:bg-gray-50 rounded px-2 py-1 -mx-2 -my-1 transition-colors"
												: ""
										}`}
										data-testid={`${testId}-item-${key}`}
										onClick={
											onDetailClick
												? () => onDetailClick(key, value)
												: undefined
										}
										onKeyDown={
											onDetailClick
												? (e) => {
														if (e.key === "Enter" || e.key === " ") {
															e.preventDefault();
															onDetailClick(key, value);
														}
													}
												: undefined
										}
										role={onDetailClick ? "button" : undefined}
										tabIndex={onDetailClick ? 0 : undefined}
										aria-label={
											onDetailClick ? `${label}: ${value}` : undefined
										}
									>
										<span
											className="text-gray-500 font-medium"
											data-testid={`${testId}-key-${key}`}
										>
											{label}
										</span>
										<span
											className={`font-medium text-gray-900 text-right ${
												mergedConfig.truncateValues
													? "truncate max-w-[200px]"
													: ""
											}`}
											data-testid={`${testId}-value-${key}`}
										>
											{value}
										</span>
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			);
		}
	},
);

GeneralDetailCard.displayName = "GeneralDetailCard";

export default GeneralDetailCard;
export type { GeneralDetailCardProps, GeneralDetailCardConfig, DetailEntry };
