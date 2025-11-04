// DataTablePagination.tsx
import { SmartPagination } from "@/components/ui/pagination";
import type { Table as TableType } from "@tanstack/react-table";
import type { PaginationConfig } from "./dataTable"; // Adjust path as needed

interface DataTablePaginationProps<TData> {
	table: TableType<TData>;
	paginationConfig: PaginationConfig;
	loading: boolean;
}

function DataTablePagination<TData>({
	table,
	paginationConfig,
	loading,
}: DataTablePaginationProps<TData>) {
	if (!paginationConfig.enabled) {
		return null;
	}

	return (
		<div className="flex-shrink-0">
			<SmartPagination
				totalPages={table.getPageCount()}
				currentPage={table.getState().pagination.pageIndex + 1}
				onPageChange={(page) => table.setPageIndex(page - 1)}
				showSelect={true}
				selectOptions={
					paginationConfig.pageSizeOptions?.map((size) => ({
						value: size.toString(),
						label: `${size} per page`,
					})) || []
				}
				selectDefaultValue={table.getState().pagination.pageSize.toString()}
				onSelectChange={(value) => table.setPageSize(Number(value))}
				showPageInfo={true}
				pageInfoText={`Showing ${
					table.getState().pagination.pageIndex *
						table.getState().pagination.pageSize +
					1
				}-${Math.min(
					(table.getState().pagination.pageIndex + 1) *
						table.getState().pagination.pageSize,
					table.getFilteredRowModel().rows.length,
				)} of ${table.getFilteredRowModel().rows.length} entries`}
				loading={loading}
				containerClassName="flex items-center justify-center gap-4 mt-4"
			/>
		</div>
	);
}

export { DataTablePagination };
