// DataTableControls.tsx
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import type { Table as TableType } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import type { FilterConfig } from "./dataTable"; // Adjust path as needed

interface DataTableControlsProps<TData> {
	table: TableType<TData>;
	filterConfig: FilterConfig;
	withColumnVisibility: boolean;
}

function DataTableControls<TData>({
	table,
	filterConfig,
	withColumnVisibility,
}: DataTableControlsProps<TData>) {
	return (
		<div className="flex items-center justify-between py-4 gap-4 flex-shrink-0">
			{filterConfig.enabled && filterConfig.columnId && (
				<div className="flex items-center space-x-2">
					<Input
						placeholder={filterConfig.placeholder}
						value={
							(table
								.getColumn(filterConfig.columnId)
								?.getFilterValue() as string) ?? ""
						}
						onChange={(event) =>
							filterConfig.columnId &&
							table
								.getColumn(filterConfig.columnId)
								?.setFilterValue(event.target.value)
						}
						className="max-w-sm"
						aria-label={`Filter by ${filterConfig.columnId}`}
					/>
				</div>
			)}

			{withColumnVisibility && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-48">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => (
								<DropdownMenuCheckboxItem
									key={column.id}
									className="capitalize"
									checked={column.getIsVisible()}
									onCheckedChange={(value) => column.toggleVisibility(!!value)}
								>
									{column.id}
								</DropdownMenuCheckboxItem>
							))}
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	);
}

export { DataTableControls };
