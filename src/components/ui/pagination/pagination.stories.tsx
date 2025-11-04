import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	SmartPagination,
} from "../pagination/pagination";

const meta: Meta<typeof SmartPagination> = {
	title: "shadcn/Pagination",
	component: SmartPagination,
	tags: ["autodocs"],
	argTypes: {
		totalPages: {
			control: { type: "number", min: 1, max: 100 },
			defaultValue: 10,
		},
		currentPage: {
			control: { type: "number", min: 1 },
			defaultValue: 1,
		},
		showSelect: {
			control: "boolean",
			defaultValue: true,
		},
		showPageInfo: {
			control: "boolean",
			defaultValue: true,
		},
		selectDisabled: {
			control: "boolean",
			defaultValue: false,
		},
		selectPlaceholder: {
			control: "text",
			defaultValue: "Items per page",
		},
		selectDefaultValue: {
			control: "text",
			defaultValue: "10",
		},
		pageInfoText: {
			control: "text",
		},
		containerClassName: {
			control: "text",
			defaultValue: "flex items-center gap-4",
		},
		gap: {
			control: "text",
			defaultValue: "gap-4",
		},
	},
	args: {
		totalPages: 10,
		currentPage: 1,
		onPageChange: (page: number) => console.log("Page changed to:", page),
		onSelectChange: (value: string) =>
			console.log("Items per page changed to:", value),
		showSelect: true,
		showPageInfo: true,
		selectDisabled: false,
		selectPlaceholder: "Items per page",
		selectDefaultValue: "10",
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic SmartPagination with all features
export const Default: Story = {
	name: "Default SmartPagination",
	args: {
		totalPages: 10,
		currentPage: 1,
		onPageChange: (page: number) => console.log("Page changed to:", page),
		selectDefaultValue: "10",
		onSelectChange: (value: string) =>
			console.log("Items per page changed to:", value),
		showSelect: true,
		showPageInfo: true,
	},
	render: (args) => {
		const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
		const [itemsPerPage, setItemsPerPage] = useState(
			args.selectDefaultValue || "10",
		);

		return (
			<SmartPagination
				{...args}
				totalPages={args.totalPages}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
				onSelectChange={setItemsPerPage}
				selectDefaultValue={itemsPerPage}
			/>
		);
	},
};

// Custom Select Options
export const CustomSelectOptions: Story = {
	name: "Custom Select Options",
	args: {
		totalPages: 10,
		currentPage: 1,
		onPageChange: (page: number) => console.log("Page changed to:", page),
		selectOptions: [
			{ value: "3", label: "3 items" },
			{ value: "8", label: "8 items" },
			{ value: "15", label: "15 items" },
			{ value: "25", label: "25 items" },
			{ value: "100", label: "100 items" },
		],
		selectDefaultValue: "8",
		showSelect: true,
		showPageInfo: true,
	},
	render: (args) => {
		const [currentPage, setCurrentPage] = useState(1);
		const [itemsPerPage, setItemsPerPage] = useState(
			args.selectDefaultValue || "8",
		);

		return (
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Custom Items Per Page Options</h3>
				<SmartPagination
					{...args}
					totalPages={args.totalPages}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
					onSelectChange={setItemsPerPage}
				/>
				<p className="text-sm text-gray-600">
					Current selection: {itemsPerPage} items per page
				</p>
			</div>
		);
	},
};

// Minimal Version (no select, no page info)
export const MinimalPagination: Story = {
	name: "Minimal Pagination",
	args: {
		showSelect: false,
		showPageInfo: false,
		totalPages: 5,
	},
	render: (args) => {
		const [currentPage, setCurrentPage] = useState(1);

		return (
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Just Pagination Controls</h3>
				<SmartPagination
					{...args}
					totalPages={args.totalPages}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
			</div>
		);
	},
};

// Custom Page Info Text
export const CustomPageInfo: Story = {
	name: "Custom Page Info",
	args: {
		totalPages: 15,
		showSelect: false,
	},
	render: (args) => {
		const [currentPage, setCurrentPage] = useState(1);

		return (
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">
					Custom Page Information Display
				</h3>
				<SmartPagination
					{...args}
					totalPages={args.totalPages}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
					pageInfoText={`You are viewing page ${currentPage} out of ${args.totalPages} total pages`}
					pageInfoClassName="text-blue-600 font-medium text-base"
				/>
			</div>
		);
	},
};

// Disabled Select
export const DisabledSelect: Story = {
	name: "Disabled Select",
	args: {
		totalPages: 10,
		currentPage: 1,
		onPageChange: (page: number) => console.log("Page changed to:", page),
		onSelectChange: (value: string) =>
			console.log("Items per page changed to:", value),
		selectDisabled: true,
		selectDefaultValue: "20",
		showSelect: true,
		showPageInfo: true,
	},
	render: (args) => {
		const [currentPage, setCurrentPage] = useState(1);

		return (
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">
					Disabled Items Per Page Select
				</h3>
				<SmartPagination
					{...args}
					totalPages={args.totalPages}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
				<p className="text-sm text-gray-600">
					The select dropdown is disabled in this example
				</p>
			</div>
		);
	},
};

// Different Layout Styles
export const CustomLayout: Story = {
	name: "Custom Layout & Styling",
	args: {
		totalPages: 10,
		currentPage: 1,
		onPageChange: (page: number) => console.log("Page changed to:", page),
		onSelectChange: (value: string) =>
			console.log("Items per page changed to:", value),
		showSelect: true,
		showPageInfo: true,
		selectDefaultValue: "10",
		containerClassName:
			"flex flex-col items-center gap-6 p-6 border rounded-lg bg-gray-50",
		gap: "gap-6",
		selectClassName: "w-[250px] m-0 border-blue-300",
		pageInfoClassName: "text-lg font-bold text-purple-600",
	},
	render: (args) => {
		const [currentPage, setCurrentPage] = useState(1);
		const [_itemsPerPage, setItemsPerPage] = useState("10");

		return (
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Custom Vertical Layout</h3>
				<SmartPagination
					{...args}
					totalPages={args.totalPages}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
					onSelectChange={setItemsPerPage}
				/>
			</div>
		);
	},
};

// Large Dataset Example
export const LargeDataset: Story = {
	name: "Large Dataset",
	args: {
		totalPages: 50,
		currentPage: 25,
		onPageChange: (page: number) => console.log("Page changed to:", page),
		onSelectChange: (value: string) =>
			console.log("Items per page changed to:", value),
		selectOptions: [
			{ value: "10", label: "10 per page" },
			{ value: "25", label: "25 per page" },
			{ value: "50", label: "50 per page" },
			{ value: "100", label: "100 per page" },
		],
		showSelect: true,
		showPageInfo: true,
	},
	render: (args) => {
		const [currentPage, setCurrentPage] = useState(args.currentPage || 25);
		const [itemsPerPage, setItemsPerPage] = useState("25");

		return (
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Large Dataset (50 pages)</h3>
				<SmartPagination
					{...args}
					totalPages={args.totalPages}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
					onSelectChange={setItemsPerPage}
				/>
				<div className="text-sm text-gray-600 space-y-1">
					<p>Total items: {Number(itemsPerPage) * (args.totalPages || 0)}</p>
					<p>Items per page: {itemsPerPage}</p>
					<p>Current page: {currentPage}</p>
				</div>
			</div>
		);
	},
};

// Interactive Demo with All Features
export const InteractiveDemo: Story = {
	name: "Interactive Demo",
	args: {
		totalPages: 10,
		currentPage: 1,
		onPageChange: (page: number) => console.log("Page changed to:", page),
		onSelectChange: (value: string) =>
			console.log("Items per page changed to:", value),
		showSelect: true,
		showPageInfo: true,
		selectDefaultValue: "10",
	},
	render: () => {
		const [currentPage, setCurrentPage] = useState(1);
		const [totalPages, setTotalPages] = useState(10);
		const [itemsPerPage, setItemsPerPage] = useState("10");
		const [showSelect, setShowSelect] = useState(true);
		const [showPageInfo, setShowPageInfo] = useState(true);

		const handleItemsPerPageChange = (value: string) => {
			setItemsPerPage(value);
			// Reset to first page when changing items per page
			setCurrentPage(1);
		};

		return (
			<div className="space-y-6">
				<h3 className="text-lg font-semibold">Interactive Demo</h3>

				{/* Configuration Controls */}
				<div className="p-4 border rounded-lg bg-gray-50 space-y-4">
					<h4 className="font-medium">Configuration</h4>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
						<div>
							<label
								htmlFor="totalPagesInput"
								className="block text-sm font-medium mb-1"
							>
								Total Pages:
							</label>
							<input
								id="totalPagesInput"
								type="number"
								min="1"
								value={totalPages}
								onChange={(e) => {
									const newTotal = Number(e.target.value) || 1;
									setTotalPages(newTotal);
									if (currentPage > newTotal) {
										setCurrentPage(newTotal);
									}
								}}
								className="border rounded px-2 py-1 w-full"
							/>
						</div>

						<div>
							<label
								htmlFor="currentPageInput"
								className="block text-sm font-medium mb-1"
							>
								Current Page:
							</label>
							<input
								id="currentPageInput"
								type="number"
								min="1"
								max={totalPages}
								value={currentPage}
								onChange={(e) => setCurrentPage(Number(e.target.value))}
								className="border rounded px-2 py-1 w-full"
							/>
						</div>
					</div>

					<div className="flex gap-4">
						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="checkbox"
								checked={showSelect}
								onChange={(e) => setShowSelect(e.target.checked)}
								className="h-4 w-4"
							/>
							<span>Show Select</span>
						</label>

						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="checkbox"
								checked={showPageInfo}
								onChange={(e) => setShowPageInfo(e.target.checked)}
								className="h-4 w-4"
							/>
							<span>Show Page Info</span>
						</label>
					</div>
				</div>

				{/* The Pagination Component */}
				<SmartPagination
					totalPages={totalPages}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
					showSelect={showSelect}
					showPageInfo={showPageInfo}
					onSelectChange={handleItemsPerPageChange}
				/>

				{/* Status Display */}
				<div className="p-4 border rounded-lg">
					<h4 className="font-medium mb-2">Current State:</h4>
					<div className="text-sm space-y-1">
						<p>
							Page: {currentPage} of {totalPages}
						</p>
						<p>Items per page: {itemsPerPage}</p>
						<p>Total items: {Number(itemsPerPage) * totalPages}</p>
						<p>
							Items shown:{" "}
							{Math.min(
								Number(itemsPerPage),
								(totalPages - currentPage + 1) * Number(itemsPerPage),
							)}
						</p>
					</div>
				</div>
			</div>
		);
	},
};

// Small Dataset (shows behavior with few pages)
export const SmallDataset: Story = {
	name: "Small Dataset",
	args: {
		totalPages: 3,
		currentPage: 1,
		onPageChange: (page: number) => console.log("Page changed to:", page),
		onSelectChange: (value: string) =>
			console.log("Items per page changed to:", value),
		showSelect: true,
		showPageInfo: true,
		selectDefaultValue: "10",
	},
	render: (args) => {
		const [currentPage, setCurrentPage] = useState(1);

		return (
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Small Dataset (3 pages)</h3>
				<SmartPagination
					{...args}
					totalPages={args.totalPages}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
				<p className="text-sm text-gray-600">
					Notice how pagination adapts for small datasets without ellipsis
				</p>
			</div>
		);
	},
};

// Original Basic Pagination for comparison
export const BasicPagination: StoryObj<typeof Pagination> = {
	name: "Basic Pagination (Original)",
	render: (args) => (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">Original Basic Pagination</h3>
			<Pagination {...args} className="user-select-none">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink className="user-select-none" href="#" isActive>
							1
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink className="user-select-none" href="#">
							2
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">3</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis className="user-select-none" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">10</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href="#" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
			<p className="text-sm text-gray-600">
				This is the original basic pagination for comparison
			</p>
		</div>
	),
};
