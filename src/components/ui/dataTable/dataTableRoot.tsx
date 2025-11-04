// DataTableRoot.tsx
import {
	type ColumnDef,
	type ColumnFiltersState,
	type OnChangeFn,
	type PaginationState,
	type RowSelectionState,
	type SortingState,
	type Table as TableType,
	type VisibilityState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

// Assuming these interfaces are defined elsewhere or passed down
import type {
	FilterConfig,
	PaginationConfig,
	RowSelectionConfig,
} from "./dataTable"; // Adjust path as needed

interface DataTableRootProps<TData> {
	data: TData[];
	columns: ColumnDef<TData>[];
	withSorting: boolean;
	withFiltering: boolean | FilterConfig;
	withColumnVisibility: boolean;
	withRowSelection: boolean | RowSelectionConfig<TData>;
	withPagination: boolean | PaginationConfig;

	// Controlled state props
	sorting?: SortingState;
	onSortingChange?: OnChangeFn<SortingState>;
	columnFilters?: ColumnFiltersState;
	onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
	columnVisibility?: VisibilityState;
	onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
	rowSelection?: RowSelectionState;
	onRowSelectionChange?: OnChangeFn<RowSelectionState>;
	pagination?: PaginationState;
	onPaginationChange?: OnChangeFn<PaginationState>;

	children: (
		table: TableType<TData>,
		configs: {
			filterConfig: FilterConfig;
			rowSelectionConfig: RowSelectionConfig<TData>;
			paginationConfig: PaginationConfig;
		},
	) => React.ReactNode;
}

function DataTableRoot<TData>({
	data,
	columns,
	withSorting,
	withFiltering,
	withColumnVisibility,
	withRowSelection,
	withPagination,
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
	children,
}: DataTableRootProps<TData>) {
	// Internal state (used when not controlled)
	const [internalSorting, setInternalSorting] = React.useState<SortingState>(
		[],
	);
	const [internalColumnFilters, setInternalColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const [internalColumnVisibility, setInternalColumnVisibility] =
		React.useState<VisibilityState>({});
	const [internalRowSelection, setInternalRowSelection] =
		React.useState<RowSelectionState>({});
	const [internalPagination, setInternalPagination] =
		React.useState<PaginationState>({
			pageIndex: 0,
			pageSize:
				typeof withPagination === "object"
					? (withPagination.pageSize ?? 10)
					: 10,
		});

	// Determine if state is controlled
	const isControlledSorting = controlledSorting !== undefined;
	const isControlledFiltering = controlledColumnFilters !== undefined;
	const isControlledVisibility = controlledColumnVisibility !== undefined;
	const isControlledRowSelection = controlledRowSelection !== undefined;
	const isControlledPagination = controlledPagination !== undefined;

	// Use controlled or internal state
	const sorting = isControlledSorting ? controlledSorting : internalSorting;
	const columnFilters = isControlledFiltering
		? controlledColumnFilters
		: internalColumnFilters;
	const columnVisibility = isControlledVisibility
		? controlledColumnVisibility
		: internalColumnVisibility;
	const rowSelection = isControlledRowSelection
		? controlledRowSelection
		: internalRowSelection;
	const pagination = isControlledPagination
		? controlledPagination
		: internalPagination;

	// State setters
	const setSorting = React.useCallback(
		(updater: SortingState | ((old: SortingState) => SortingState)) => {
			if (isControlledSorting) {
				onControlledSortingChange?.(updater);
			} else {
				setInternalSorting(updater);
			}
		},
		[isControlledSorting, onControlledSortingChange],
	);

	const setColumnFilters = React.useCallback(
		(
			updater:
				| ColumnFiltersState
				| ((old: ColumnFiltersState) => ColumnFiltersState),
		) => {
			if (isControlledFiltering) {
				onControlledColumnFiltersChange?.(updater);
			} else {
				setInternalColumnFilters(updater);
			}
		},
		[isControlledFiltering, onControlledColumnFiltersChange],
	);

	const setColumnVisibility = React.useCallback(
		(
			updater: VisibilityState | ((old: VisibilityState) => VisibilityState),
		) => {
			if (isControlledVisibility) {
				onControlledColumnVisibilityChange?.(updater);
			} else {
				setInternalColumnVisibility(updater);
			}
		},
		[isControlledVisibility, onControlledColumnVisibilityChange],
	);

	const setRowSelection = React.useCallback(
		(
			updater:
				| RowSelectionState
				| ((old: RowSelectionState) => RowSelectionState),
		) => {
			if (isControlledRowSelection) {
				onControlledRowSelectionChange?.(updater);
			} else {
				setInternalRowSelection(updater);
			}
		},
		[isControlledRowSelection, onControlledRowSelectionChange],
	);

	const setPagination = React.useCallback(
		(
			updater: PaginationState | ((old: PaginationState) => PaginationState),
		) => {
			if (isControlledPagination) {
				onControlledPaginationChange?.(updater);
			} else {
				setInternalPagination(updater);
			}
		},
		[isControlledPagination, onControlledPaginationChange],
	);

	// Parse filter config
	const filterConfig = React.useMemo(() => {
		if (typeof withFiltering === "boolean") {
			return withFiltering
				? { enabled: true, columnId: undefined, placeholder: "Filter..." }
				: { enabled: false };
		}
		return {
			enabled: true,
			columnId: undefined,
			placeholder: "Filter...",
			...withFiltering,
		};
	}, [withFiltering]);

	// Parse row selection config
	const rowSelectionConfig = React.useMemo(() => {
		if (typeof withRowSelection === "boolean") {
			return { enabled: withRowSelection };
		}
		return { enabled: true, ...withRowSelection };
	}, [withRowSelection]);

	// Parse pagination config
	const paginationConfig = React.useMemo(() => {
		if (typeof withPagination === "boolean") {
			return {
				enabled: withPagination,
				pageSize: 10,
				pageSizeOptions: [10, 20, 50, 100],
			};
		}
		return {
			enabled: true,
			pageSize: 10,
			pageSizeOptions: [10, 20, 50, 100],
			...withPagination,
		};
	}, [withPagination]);

	// Auto-detect filter column if not specified
	const effectiveFilterConfig = React.useMemo(() => {
		if (!filterConfig.enabled) return filterConfig;

		if (filterConfig.enabled && columns.length > 0) {
			// Find first string column that's not a selection column
			const firstStringColumn = columns.find(
				(col) => col.id !== "select" && col.id !== "actions" && col.id,
			);

			return {
				...filterConfig,
				columnId: firstStringColumn?.id || columns[0]?.id,
			};
		}

		return filterConfig;
	}, [filterConfig, columns]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		...(paginationConfig.enabled && {
			getPaginationRowModel: getPaginationRowModel(),
		}),
		...(withSorting && {
			getSortedRowModel: getSortedRowModel(),
			onSortingChange: setSorting,
		}),
		...(effectiveFilterConfig.enabled && {
			getFilteredRowModel: getFilteredRowModel(),
			onColumnFiltersChange: setColumnFilters,
		}),
		...(withColumnVisibility && {
			onColumnVisibilityChange: setColumnVisibility,
		}),
		...(rowSelectionConfig.enabled && {
			onRowSelectionChange: setRowSelection,
			enableRowSelection: true,
		}),
		...(paginationConfig.enabled && {
			onPaginationChange: setPagination,
		}),
		state: {
			...(withSorting && { sorting }),
			...(effectiveFilterConfig.enabled && { columnFilters }),
			...(withColumnVisibility && { columnVisibility }),
			...(rowSelectionConfig.enabled && { rowSelection }),
			...(paginationConfig.enabled && { pagination }),
		},
		manualPagination: false,
		manualSorting: false,
		manualFiltering: false,
	});

	// Handle row selection callback
	React.useEffect(() => {
		if (rowSelectionConfig.onSelectionChange && rowSelectionConfig.enabled) {
			const selectedRows = table.getFilteredSelectedRowModel().rows;
			rowSelectionConfig.onSelectionChange(selectedRows);
		}
	}, [table, rowSelectionConfig.onSelectionChange, rowSelectionConfig.enabled]);

	return (
		<>
			{children(table, {
				filterConfig: effectiveFilterConfig,
				rowSelectionConfig,
				paginationConfig,
			})}
		</>
	);
}

export { DataTableRoot };
