// DataTableSelectionInfo.tsx
import type { RowSelectionState } from "@tanstack/react-table";

interface DataTableSelectionInfoProps {
	rowSelection: RowSelectionState;
}

function DataTableSelectionInfo({ rowSelection }: DataTableSelectionInfoProps) {
	if (Object.keys(rowSelection).length === 0) {
		return null;
	}

	return (
		<div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200 flex-shrink-0">
			<p className="text-sm text-blue-700">
				{Object.keys(rowSelection).length} row(s) selected
			</p>
		</div>
	);
}

export { DataTableSelectionInfo };
