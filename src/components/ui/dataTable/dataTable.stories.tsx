import type { Meta, StoryObj } from "@storybook/react";
import type { ColumnDef, Row } from "@tanstack/react-table";
import type React from "react";
import { useMemo, useState } from "react";
import { Badge } from "../badge";
import { Button } from "../button";
import { DataTable, type FilterConfig } from "./dataTable";

// Sample data type
interface Payment {
	id: string;
	amount: number;
	status: "pending" | "processing" | "success" | "failed";
	email: string;
	date: string;
	method: string;
}

// Sample data
const sampleData: Payment[] = [
	{
		id: "1",
		amount: 100,
		status: "pending",
		email: "user1@example.com",
		date: "2023-01-01",
		method: "Credit Card",
	},
	{
		id: "2",
		amount: 200,
		status: "processing",
		email: "user2@example.com",
		date: "2023-01-02",
		method: "PayPal",
	},
	{
		id: "3",
		amount: 300,
		status: "success",
		email: "user3@example.com",
		date: "2023-01-03",
		method: "Bank Transfer",
	},
	{
		id: "4",
		amount: 400,
		status: "failed",
		email: "user4@example.com",
		date: "2023-01-04",
		method: "Credit Card",
	},
	{
		id: "5",
		amount: 500,
		status: "pending",
		email: "user5@example.com",
		date: "2023-01-05",
		method: "PayPal",
	},
];

// Column definitions
const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: "id",
		header: "ID",
		size: 60,
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => (
			<span className="font-medium">{row.getValue("email")}</span>
		),
	},
	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({ row }) => {
			const amount = Number.parseFloat(row.getValue("amount"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount);

			return <div className="text-right font-medium">{formatted}</div>;
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as string;
			const variantMap = {
				pending: "warning",
				processing: "info",
				success: "success",
				failed: "destructive",
			} as const;

			return (
				<Badge
					variant={variantMap[status as keyof typeof variantMap] || "default"}
				>
					{status}
				</Badge>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "date",
		header: "Date",
	},
	{
		accessorKey: "method",
		header: "Payment Method",
	},
];

const meta: Meta<typeof DataTable<Payment>> = {
	title: "UI/DataTable",
	component: DataTable,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"A highly customizable data table component built with TanStack Table.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		data: { control: "object" },
		columns: { control: "object" },
		withSorting: { control: "boolean" },
		withFiltering: { control: "boolean" },
		withColumnVisibility: { control: "boolean" },
		withRowSelection: { control: "boolean" },
		withPagination: { control: "boolean" },
		loading: { control: "boolean" },
		emptyMessage: { control: "text" },
		height: { control: "text" },
		scrollable: { control: "boolean" },
	},
	args: {
		data: sampleData,
		columns,
		withSorting: true,
		withFiltering: true,
		withColumnVisibility: true,
		withRowSelection: true,
		withPagination: true,
		loading: false,
		emptyMessage: "No results found.",
		height: "500px",
		scrollable: true,
		ariaLabel: "Payments table",
		ariaDescription: "A table showing payment information",
	},
};

export default meta;
type Story = StoryObj<typeof DataTable<Payment>>;

export const Default: Story = {};

export const WithInitialSorting: Story = {
	args: {
		withSorting: true,
		sorting: [{ id: "amount", desc: true }],
	},
};

export const WithCustomFiltering: Story = {
	args: {
		withFiltering: {
			enabled: true,
			columnId: "status",
			placeholder: "Filter by status...",
		} as FilterConfig,
	},
};

export const WithoutPagination: Story = {
	args: {
		withPagination: false,
	},
};

export const WithRowSelection: Story = {
	args: {
		withRowSelection: {
			enabled: true,
			onSelectionChange: (selectedRows) => {
				console.log("Selected rows:", selectedRows);
			},
		},
	},
};

export const WithControlledPagination: Story = {
	render: () => {
		const [pagination, setPagination] = useState({
			pageIndex: 0,
			pageSize: 2,
		});

		return (
			<DataTable
				data={sampleData}
				columns={columns}
				pagination={pagination}
				onPaginationChange={setPagination}
				withPagination={{
					enabled: true,
					pageSize: 2,
					pageSizeOptions: [2, 5, 10],
				}}
			/>
		);
	},
};

export const WithRowClick: Story = {
	args: {
		onRowClick: (row: Row<Payment>, event: React.MouseEvent) => {
			event.preventDefault();
			alert(`Row clicked: ${row.getValue("email")}`);
		},
	},
};

export const LoadingState: Story = {
	args: {
		loading: true,
	},
};

export const EmptyState: Story = {
	args: {
		data: [],
		emptyMessage:
			"No payments found. Try adjusting your filters or create a new payment.",
	},
};

export const WithCustomHeight: Story = {
	args: {
		height: "300px",
	},
};

// Example with row actions
export const WithRowActions: Story = {
	render: () => {
		const actionColumns = useMemo<ColumnDef<Payment>[]>(
			() => [
				...columns,
				{
					id: "actions",
					header: "Actions",
					cell: ({ row }) => (
						<div className="flex space-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => alert(`Edit ${row.original.email}`)}
							>
								Edit
							</Button>
							<Button
								variant="destructive"
								size="sm"
								onClick={() => {
									if (confirm(`Delete ${row.original.email}?`)) {
										alert("Deleted!");
									}
								}}
							>
								Delete
							</Button>
						</div>
					),
				},
			],
			[],
		);

		return <DataTable data={sampleData} columns={actionColumns} />;
	},
};
