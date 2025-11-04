import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTable } from "@/components/ui/dataTable";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpRight, MessageSquarePlus, MoreVertical } from "lucide-react";
import React, { useState } from "react";
import { FormModal } from "../formModal/formModal";
import { TabsHeader } from "../tabsHeader";

export interface EmployeeData {
	id: string;
	employeeName?: string;
	leaveType?: string;
	email?: string;
	employeeId?: string;
	status?: "pending" | "success" | "rejected" | string;
	amount?: number;
	startDate?: string;
	endDate?: string;
	docType?: string;
	date?: string;
	punchIn?: string;
	punchOut?: string;
}

export interface ShortTableProps {
	data: EmployeeData[];
	onSeeMoreClick?: () => void;
	header?: {
		title: string;
		description: string;
	};
	actionItem?: {
		icon: React.ReactNode;
		text: string;
	}[];
	action?: boolean;
	notes?: boolean;
}

/**
 * Checks if a given field exists in at least one data row
 */
const fieldExists = (data: EmployeeData[], key: keyof EmployeeData) => {
	return data.some((row) => row[key] !== undefined && row[key] !== null);
};

/**
 * Dynamically generates columns based on the available data
 */
const getFilteredColumns = (
	data: EmployeeData[],
	actionEnabled: boolean,
	notesEnabled: boolean,
	actionItem?: {
		icon: React.ReactNode;
		text: string;
	}[],
): ColumnDef<EmployeeData>[] => {
	const columns: ColumnDef<EmployeeData>[] = [];
	console.log(actionItem, "actionItem");
	if (fieldExists(data, "employeeName")) {
		columns.push({
			accessorKey: "employeeName",
			header: "Employee Name",
			cell: ({ row }: { row: Row<EmployeeData> }) => (
				<div className="flex items-center gap-2">
					<Avatar size="xs">
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div>
						<div className="capitalize font-medium">
							{row.getValue("employeeName")}
						</div>
						{row.original.employeeId && (
							<div className="text-[10px] text-[hsl(var(--text-light))]">
								{row.original.employeeId}
							</div>
						)}
					</div>
				</div>
			),
		});
	}

	if (fieldExists(data, "leaveType")) {
		columns.push({
			accessorKey: "leaveType",
			header: "Leave Type",
			cell: ({ row }: { row: Row<EmployeeData> }) => (
				<div className="capitalize">{row.getValue("leaveType")}</div>
			),
		});
	}

	if (fieldExists(data, "startDate")) {
		columns.push({
			accessorKey: "startDate",
			header: "Start Date",
			cell: ({ row }: { row: Row<EmployeeData> }) => (
				<div>{row.getValue("startDate")}</div>
			),
		});
	}

	if (fieldExists(data, "endDate")) {
		columns.push({
			accessorKey: "endDate",
			header: "End Date",
			cell: ({ row }: { row: Row<EmployeeData> }) => (
				<div>{row.getValue("endDate")}</div>
			),
		});
	}

	if (fieldExists(data, "date")) {
		columns.push({
			accessorKey: "date",
			header: "Date",
			cell: ({ row }: { row: Row<EmployeeData> }) => (
				<div>{row.getValue("date")}</div>
			),
		});
	}

	if (fieldExists(data, "punchIn")) {
		columns.push({
			accessorKey: "punchIn",
			header: "Punch In",
			cell: ({ row }: { row: Row<EmployeeData> }) => (
				<div>{row.getValue("punchIn")}</div>
			),
		});
	}

	if (fieldExists(data, "punchOut")) {
		columns.push({
			accessorKey: "punchOut",
			header: "Punch Out",
			cell: ({ row }: { row: Row<EmployeeData> }) => (
				<div>{row.getValue("punchOut")}</div>
			),
		});
	}

	if (fieldExists(data, "amount")) {
		columns.push({
			accessorKey: "amount",
			header: "Amount",
			cell: ({ row }: { row: Row<EmployeeData> }) => (
				<div>${row.getValue("amount")}</div>
			),
		});
	}

	if (fieldExists(data, "docType")) {
		columns.push({
			accessorKey: "docType",
			header: "Doc Type",
			cell: ({ row }: { row: Row<EmployeeData> }) => (
				<div>{row.getValue("docType")}</div>
			),
		});
	}

	if (fieldExists(data, "status")) {
		columns.push({
			accessorKey: "status",
			header: "Status",
			cell: ({ row }: { row: Row<EmployeeData> }) => {
				const status = row.getValue("status");
				const statusStyles: Record<string, string> = {
					success:
						"bg-[hsla(var(--status-success),0.1)] text-[hsl(var(--status-success))] text-xs",
					pending:
						"bg-[hsla(var(--status-warning),0.1)] text-[hsl(var(--status-warning))] text-xs",
					rejected:
						"bg-[hsla(var(--status-error),0.1)] text-[hsl(var(--status-error))] text-xs",
				};
				return (
					<span
						className={`capitalize px-2 py-1 rounded-full ${
							statusStyles[status as string] ||
							"bg-[hsla(var(--status-info),0.2)] text-[hsl(var(--text-dark))] text-xs"
						}`}
					>
						{status as string}
					</span>
				);
			},
		});
	}

	if (actionEnabled) {
		columns.push({
			accessorKey: "action",
			header: "Action",
			cell: () => {
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild className="cursor-pointer">
							<MoreVertical size={20} />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="p-1">
							{actionItem?.map((item, index) => (
								<React.Fragment key={item.text}>
									<DropdownMenuItem className="flex text-[hsl(var(--text-medium))] py-2 px-3 items-center gap-2">
										{item.icon}
										{item.text}
									</DropdownMenuItem>
									{index < actionItem.length - 1 && <DropdownMenuSeparator />}
								</React.Fragment>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		});
	}

	if (notesEnabled) {
		columns.push({
			accessorKey: "notes",
			header: "Notes",
			cell: ({ row }: { row: Row<EmployeeData> }) => {
				const [open, setOpen] = useState(false);
				const { id } = row.original;

				return (
					<>
						<FormModal
							modalButton={{
								size: "icon",
								text: "Add Note",
								onClick: () => {
									console.log("Note added");
								},
								// variant: "dark",
								className:
									"bg-white shadow-none !border-none !outline-none hover:bg-white",
								iconLeft: (
									<MessageSquarePlus
										size={30}
										className="cursor-pointer text-[hsl(var(--text-dark))]  "
										onClick={() => setOpen(true)}
									/>
								),
							}}
							initialOpen={open}
							onOpenChange={setOpen}
							title="Add Note"
							description={`Note for employee ID: ${id}`}
							fields={[
								{
									name: "noteTitle",
									label: "Note Title",
									placeholder: "Enter Note Title",
								},
								{
									name: "noteBody",
									label: "Note",
									type: "textArea",
									placeholder: "Enter Note",
								},
							]}
							primaryButtonText="Save"
							cancelButtonText="Cancel"
							onPrimaryClick={() => {
								setOpen(false);
								console.log("Note saved for:", id);
							}}
							onCancelClick={() => setOpen(false)}
						/>
					</>
				);
			},
		});
	}

	return columns;
};

const ShortTable: React.FC<ShortTableProps> = ({
	data,
	onSeeMoreClick = () => {},
	header = {
		title: "Leave Approval",
		description: "Pending leave approvals",
	},
	actionItem,
	action = true,
	notes = false,
}) => {
	const columns = React.useMemo(
		() => getFilteredColumns(data, action, notes, actionItem),
		[data, action, notes, actionItem],
	);

	return (
		<div className="w-full bg-white p-8 card overflow-x-auto flex flex-col gap-6">
			<TabsHeader
				title={header.title}
				description={header.description}
				button={[
					{
						buttonText: "See more",
						onButtonClick: onSeeMoreClick,
						variant: "default",
						iconRight: <ArrowUpRight size={20} />,
						outlined: true,
						className: "rounded-sm",
					},
				]}
			/>
			<DataTable data={data} columns={columns} withRowSelection={false} />
		</div>
	);
};

export { ShortTable };
