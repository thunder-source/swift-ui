// DataTable.tsx
import { cn } from "@/lib/utils";
import type {
	ColumnDef,
	ColumnFiltersState,
	OnChangeFn,
	PaginationState,
	Row,
	RowSelectionState,
	SortingState,
	VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";

import { DataTableContent } from "./dataTableContent";
import { DataTableControls } from "./dataTableControls";
import { DataTablePagination } from "./dataTablePagination";
import { DataTableRoot } from "./dataTableRoot";
import { DataTableSelectionInfo } from "./dataTableSelectionInfo";

/**
 * Configuration for DataTable pagination
 */
interface PaginationConfig {
	/** Initial page size */
	pageSize?: number;
	/** Available page size options */
	pageSizeOptions?: number[];
	/** Whether to show pagination controls */
	enabled?: boolean;
}

/**
 * Configuration for DataTable filtering
 */
interface FilterConfig {
	/** Column ID to filter on */
	columnId?: string;
	/** Placeholder text for filter input */
	placeholder?: string;
	/** Whether filtering is enabled */
	enabled?: boolean;
}

/**
 * Configuration for DataTable row selection
 */
interface RowSelectionConfig<TData = unknown> {
	/** Whether row selection is enabled */
	enabled?: boolean;
	/** Callback when row selection changes */
	onSelectionChange?: (selectedRows: Row<TData>[]) => void;
}

/**
 * Props for the DataTable component
 * @template TData - The type of data in each row
 */
interface DataTableProps<TData = unknown> {
	/** The data to display in the table */
	data: TData[];
	/** Column definitions for the table */
	columns: ColumnDef<TData>[];

	// Feature flags
	/** Enable sorting functionality */
	withSorting?: boolean;
	/** Enable column filtering */
	withFiltering?: boolean | FilterConfig;
	/** Enable column visibility toggle */
	withColumnVisibility?: boolean;
	/** Enable row selection */
	withRowSelection?: boolean | RowSelectionConfig<TData>;
	/** Show pagination footer */
	withPagination?: boolean | PaginationConfig;

	// Controlled state props
	/** Controlled sorting state */
	sorting?: SortingState;
	/** Callback for sorting changes */
	onSortingChange?: OnChangeFn<SortingState>;
	/** Controlled column filters */
	columnFilters?: ColumnFiltersState;
	/** Callback for column filter changes */
	onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
	/** Controlled column visibility */
	columnVisibility?: VisibilityState;
	/** Callback for column visibility changes */
	onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
	/** Controlled row selection */
	rowSelection?: RowSelectionState;
	/** Callback for row selection changes */
	onRowSelectionChange?: OnChangeFn<RowSelectionState>;
	/** Controlled pagination state */
	pagination?: PaginationState;
	/** Callback for pagination changes */
	onPaginationChange?: OnChangeFn<PaginationState>;

	// Styling and layout
	/** Custom height for the table container - can be string like "400px", "50vh", or number */
	height?: string | number;
	/** Maximum height for the table container */
	maxHeight?: string | number;
	/** Minimum height for the table container */
	minHeight?: string | number;
	/** Custom className for the container */
	className?: string;
	/** Whether to make table scrollable horizontally */
	scrollable?: boolean;
	/** Loading state */
	loading?: boolean;
	/** Empty state message */
	emptyMessage?: string;
	/** Whether to fit table to viewport height (useful for full-screen tables) */
	fitToViewport?: boolean;
	/** Offset from viewport edges when fitToViewport is true */
	viewportOffset?: { bottom?: number };

	// Accessibility
	/** ARIA label for the table */
	ariaLabel?: string;
	/** ARIA description for the table */
	ariaDescription?: string;

	// Callbacks
	/** Callback when a row is clicked */
	onRowClick?: (row: Row<TData>, event: React.MouseEvent) => void;
	/** Callback to get row props */
	getRowProps?: (row: Row<TData>) => React.HTMLAttributes<HTMLTableRowElement>;
}

function DataTable<TData = unknown>({
	data,
	columns,
	withSorting = false,
	withFiltering = false,
	withColumnVisibility = false,
	withRowSelection = false,
	withPagination = false,

	// Controlled state
	sorting: controlledSorting,
	onSortingChange: onControlledSortingChange,
	columnFilters: controlledColumnFilters,
	onColumnFiltersChange: onControlledColumnFiltersChange,
	columnVisibility: controlledColumnVisibility,
	onColumnVisibilityChange: onControlledColumnVisibilityChange,
	rowSelection: controlledRowSelection,
	onRowSelectionChange: onControlledRowSelectionChange,
	pagination: controlledPagination,
	onPaginationChange: onControlledPaginationChange,

	// Styling and layout
	height,
	maxHeight,
	minHeight = "200px",
	className = "",
	scrollable = true,
	loading = false,
	emptyMessage = "No results found.",
	fitToViewport = false,
	viewportOffset = { bottom: 0 },

	// Accessibility
	ariaLabel = "Data table",
	ariaDescription,

	// Callbacks
	onRowClick,
	getRowProps,
}: DataTableProps<TData>) {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const controlsRef = React.useRef<HTMLDivElement>(null);
	const selectionRef = React.useRef<HTMLDivElement>(null);
	const paginationRef = React.useRef<HTMLDivElement>(null);
	const [containerHeight, setContainerHeight] = React.useState<string>("100%");

	// Calculate dynamic height based on viewport and content
	React.useEffect(() => {
		if (!fitToViewport && !height) return;

		const calculateHeight = () => {
			if (containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				const viewportHeight = window.innerHeight;
				const { bottom: bottomOffset = 0 } = viewportOffset;

				if (fitToViewport) {
					// Calculate available height from current position to bottom of viewport
					const availableSpace = viewportHeight - 32 - rect.top - bottomOffset;
					setContainerHeight(`${Math.max(availableSpace, 200)}px`);
				} else if (height) {
					// Use explicit height
					const heightValue =
						typeof height === "number" ? `${height}px` : height;
					setContainerHeight(heightValue);
				}
			}
		};

		// Initial calculation
		calculateHeight();

		// Recalculate on window resize
		window.addEventListener("resize", calculateHeight);

		// Use ResizeObserver for more responsive updates
		const resizeObserver = new ResizeObserver(calculateHeight);
		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		return () => {
			window.removeEventListener("resize", calculateHeight);
			resizeObserver.disconnect();
		};
	}, [height, fitToViewport, viewportOffset]);

	// Calculate container styles with proper height accounting for fixed elements
	const containerStyles = React.useMemo(() => {
		const styles: React.CSSProperties = {};

		if (height || fitToViewport) {
			styles.height = containerHeight;
		}

		if (maxHeight) {
			styles.maxHeight =
				typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;
		}

		if (minHeight) {
			styles.minHeight =
				typeof minHeight === "number" ? `${minHeight}px` : minHeight;
		}

		return styles;
	}, [containerHeight, maxHeight, minHeight, height, fitToViewport]);

	// Calculate the height available for the table content (excluding fixed elements)
	const getTableContentHeight = React.useCallback(() => {
		if (!height && !fitToViewport) return undefined;

		let fixedElementsHeight = 0;

		// Add heights of fixed elements
		if (controlsRef.current) {
			fixedElementsHeight += controlsRef.current.offsetHeight;
		}
		if (selectionRef.current) {
			fixedElementsHeight += selectionRef.current.offsetHeight;
		}
		if (paginationRef.current) {
			fixedElementsHeight += paginationRef.current.offsetHeight;
		}

		const totalHeight = containerRef.current?.offsetHeight || 0;
		const availableHeight = totalHeight - fixedElementsHeight;

		return Math.max(availableHeight, 150); // Minimum 150px for table content
	}, [height, fitToViewport]);

	// Recalculate when pagination or other controls change
	const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		// Force recalculation after a brief delay to allow DOM updates
		const timer = setTimeout(forceUpdate, 100);
		return () => clearTimeout(timer);
	}, [withPagination, withFiltering, withRowSelection]);

	return (
		<DataTableRoot
			data={data}
			columns={columns}
			withSorting={withSorting}
			withFiltering={withFiltering}
			withColumnVisibility={withColumnVisibility}
			withRowSelection={withRowSelection}
			withPagination={withPagination}
			sorting={controlledSorting}
			onSortingChange={onControlledSortingChange}
			columnFilters={controlledColumnFilters}
			onColumnFiltersChange={onControlledColumnFiltersChange}
			columnVisibility={controlledColumnVisibility}
			onColumnVisibilityChange={onControlledColumnVisibilityChange}
			rowSelection={controlledRowSelection}
			onRowSelectionChange={onControlledRowSelectionChange}
			pagination={controlledPagination}
			onPaginationChange={onControlledPaginationChange}
		>
			{(table, { filterConfig, rowSelectionConfig, paginationConfig }) => (
				<div
					ref={containerRef}
					className={cn(
						"w-full bg-white flex flex-col",
						// Ensure the container doesn't overflow
						"max-w-full overflow-hidden",
						className,
					)}
					style={containerStyles}
				>
					{ariaDescription && (
						<div id="table-description" className="sr-only">
							{ariaDescription}
						</div>
					)}

					{/* Controls - Fixed height section */}
					{(filterConfig.enabled || withColumnVisibility) && (
						<div ref={controlsRef} className="flex-shrink-0">
							<DataTableControls
								table={table}
								filterConfig={filterConfig}
								withColumnVisibility={withColumnVisibility}
							/>
						</div>
					)}

					{/* Row Selection Info - Fixed height section */}
					{rowSelectionConfig.enabled && (
						<div ref={selectionRef} className="flex-shrink-0">
							<DataTableSelectionInfo
								rowSelection={table.getState().rowSelection}
							/>
						</div>
					)}

					{/* Table Container - Flexible height section */}
					<div
						className={cn(
							"rounded-md border flex-1 min-h-0",
							// Ensure proper scrolling behavior
							scrollable ? "overflow-auto" : "overflow-hidden",
							// Custom scrollbar styling
							"scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100",
						)}
						style={
							height || fitToViewport
								? { maxHeight: `${getTableContentHeight()}px` }
								: undefined
						}
					>
						<DataTableContent
							table={table}
							columns={columns}
							withSorting={withSorting}
							loading={loading}
							emptyMessage={emptyMessage}
							ariaLabel={ariaLabel}
							ariaDescription={ariaDescription}
							onRowClick={onRowClick}
							getRowProps={getRowProps}
							pageSize={paginationConfig.pageSize || 10}
						/>
					</div>

					{/* Footer with Pagination - Fixed height section */}
					{paginationConfig.enabled && (
						<div ref={paginationRef} className="flex-shrink-0">
							<DataTablePagination
								table={table}
								paginationConfig={paginationConfig}
								loading={loading}
							/>
						</div>
					)}
				</div>
			)}
		</DataTableRoot>
	);
}

export {
	DataTable,
	type DataTableProps,
	type FilterConfig,
	type PaginationConfig,
	type RowSelectionConfig,
};
