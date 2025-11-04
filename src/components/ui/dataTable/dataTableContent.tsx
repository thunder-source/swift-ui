// DataTableContent.tsx
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { ColumnDef, Row, Table as TableType } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import * as React from "react";

interface DataTableContentProps<TData> {
	table: TableType<TData>;
	columns: ColumnDef<TData>[];
	withSorting: boolean;
	loading: boolean;
	emptyMessage: string;
	ariaLabel?: string;
	ariaDescription?: string;
	onRowClick?: (row: Row<TData>, event: React.MouseEvent) => void;
	getRowProps?: (row: Row<TData>) => React.HTMLAttributes<HTMLTableRowElement>;
	pageSize: number; // Passed from pagination config
}

function DataTableContent<TData>({
	table,
	columns,
	withSorting,
	loading,
	emptyMessage,
	ariaLabel,
	ariaDescription,
	onRowClick,
	getRowProps,
	pageSize,
}: DataTableContentProps<TData>) {
	// Create skeleton rows for loading state
	const createSkeletonRows = React.useCallback(
		(count = 5) => {
			return Array.from({ length: count }, (_, rowIndex) => {
				const rowKey = `skeleton-row-${rowIndex}`;
				return (
					<TableRow key={rowKey}>
						{columns.map((column, colIndex) => {
							const cellKey = `${rowKey}-col-${column.id || colIndex}`;
							return (
								<TableCell key={cellKey} className="px-4 py-3">
									<Skeleton className="h-4 w-full" />
								</TableCell>
							);
						})}
					</TableRow>
				);
			});
		},
		[columns],
	);

	return (
		<Table
			aria-label={ariaLabel}
			aria-describedby={ariaDescription ? "table-description" : undefined}
		>
			<TableHeader className="bg-slate-50 sticky top-0 z-10">
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow
						key={headerGroup.id}
						className="text-slate-900 font-medium border-b"
					>
						{headerGroup.headers.map((header) => (
							<TableHead
								key={header.id}
								className="text-slate-900 font-semibold text-xs px-4 py-3 text-left"
								style={{
									width:
										header.getSize() !== 150 ? header.getSize() : undefined,
								}}
							>
								{header.isPlaceholder ? null : withSorting &&
									header.column.getCanSort() ? (
									<button
										type="button"
										className="flex items-center gap-2 select-none hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-sm p-1 -m-1"
										onClick={header.column.getToggleSortingHandler()}
										aria-label={`Sort by ${header.column.id}`}
										aria-sort={
											header.column.getIsSorted() === "asc"
												? "ascending"
												: header.column.getIsSorted() === "desc"
													? "descending"
													: "none"
										}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
										{header.column.getIsSorted() === "asc" && (
											<ArrowUp className="w-4 h-4" aria-hidden="true" />
										)}
										{header.column.getIsSorted() === "desc" && (
											<ArrowDown className="w-4 h-4" aria-hidden="true" />
										)}
										{!header.column.getIsSorted() && (
											<ArrowUpDown
												className="w-4 h-4 opacity-30"
												aria-hidden="true"
											/>
										)}
									</button>
								) : (
									<div className="">
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</div>
								)}
							</TableHead>
						))}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{loading ? (
					createSkeletonRows(pageSize)
				) : table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map((row) => {
						const rowProps = getRowProps?.(row) || {};
						const handleKeyDown = (
							e: React.KeyboardEvent<HTMLTableRowElement>,
						) => {
							if (onRowClick && (e.key === "Enter" || e.key === " ")) {
								e.preventDefault();
								onRowClick(row, e as unknown as React.MouseEvent);
							}
						};

						return (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() ? "selected" : undefined}
								className={cn(
									"text-slate-900 text-sm font-normal hover:bg-slate-50 transition-colors",
									onRowClick && "cursor-pointer",
									row.getIsSelected() && "bg-blue-50",
									rowProps.className,
								)}
								onClick={onRowClick ? (e) => onRowClick(row, e) : undefined}
								onKeyDown={onRowClick ? handleKeyDown : undefined}
								tabIndex={onRowClick ? 0 : undefined}
								{...rowProps}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className="px-4 py-3">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						);
					})
				) : (
					<TableRow>
						<TableCell
							colSpan={columns.length}
							className="h-24 text-center text-slate-500"
						>
							{emptyMessage}
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}

export { DataTableContent };
