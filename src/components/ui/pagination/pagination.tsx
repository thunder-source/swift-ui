import { type Button, buttonVariants } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, MoreHorizontal } from "lucide-react";
import type * as React from "react";

// Skeleton components for loading state
const PaginationItemSkeleton = () => (
	<div className="flex items-center justify-center">
		<Skeleton className="h-9 w-9 rounded-md" />
	</div>
);

const PageNumberSkeleton = () => (
	<div className="flex items-center justify-center">
		<Skeleton className="h-9 w-8 rounded-md" />
	</div>
);

const SelectSkeleton = () => (
	<div className="w-[200px]">
		<Skeleton className="h-9 w-full rounded-md" />
	</div>
);

interface PaginationProps extends React.ComponentProps<"nav"> {
	showInfoText?: boolean;
	infoText?: string;
	children: React.ReactNode;
}

function Pagination({
	className,
	showInfoText,
	infoText,
	children,
	...props
}: PaginationProps) {
	return (
		<nav
			aria-label="pagination"
			data-slot="pagination"
			className={cn(
				"flex w-full flex-wrap  items-center gap-2",
				showInfoText ? "justify-start" : "justify-start",
				className,
			)}
			{...props}
		>
			{children}
			{showInfoText && infoText && (
				<div className="text-sm text-muted-foreground">{infoText}</div>
			)}
		</nav>
	);
}

function PaginationContent({
	className,
	...props
}: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn("flex flex-row items-center gap-1", className)}
			{...props}
		/>
	);
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			className={cn("flex items-center justify-center", className)}
			data-slot="pagination-item"
			{...props}
		/>
	);
}

type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
	React.ComponentProps<"a">;

function PaginationLink({
	className,
	isActive,
	size = "icon",
	...props
}: PaginationLinkProps) {
	return (
		<a
			aria-current={isActive ? "page" : undefined}
			data-slot="pagination-link"
			data-active={isActive}
			className={cn(
				buttonVariants({
					variant: isActive ? "outline" : "ghost",
					size,
				}),
				"cursor-pointer select-none   hover:border-[hsl(var(--primary-blue))] [[data-active=true]]:text-[hsl(var(--primary-blue))] [[data-active=true]]:border-[hsl(var(--primary-blue))]",
				className,
			)}
			{...props}
		/>
	);
}

function PaginationPrevious({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			size="default"
			className={cn(
				"gap-1 border-1 border-[hsl(hsl(var(--border-grey)))] px-2.5 sm:pl-2.5",
				className,
			)}
			{...props}
		>
			<ArrowLeft className="" />
		</PaginationLink>
	);
}

function PaginationNext({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			size="default"
			className={cn(
				"gap-1 border-1 border-[hsl(hsl(var(--border-grey)))] px-2.5 sm:pr-2.5",
				className,
			)}
			{...props}
		>
			<ArrowRight />
		</PaginationLink>
	);
}

function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn(
				"w-9 h-9 flex items-center justify-center text-muted-foreground",
				className,
			)}
			{...props}
		>
			<MoreHorizontal className="w-4 h-4" />
		</span>
	);
}

// Enhanced SmartPagination with integrated Select and page info
interface SmartPaginationProps {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	className?: string;
	// Loading state
	loading?: boolean;
	// Select options
	showSelect?: boolean;
	selectOptions?: Array<{ value: string; label: string }>;
	selectDefaultValue?: string;
	selectPlaceholder?: string;
	selectDisabled?: boolean;
	selectClassName?: string;
	onSelectChange?: (value: string) => void;
	// Page info options
	showPageInfo?: boolean;
	pageInfoText?: string;
	pageInfoClassName?: string;
	// Container options
	containerClassName?: string;
	gap?: string;
}

function SmartPagination({
	totalPages,
	currentPage,
	onPageChange,
	className,
	// Loading state
	loading = false,
	// Select props
	showSelect = true,
	selectOptions = [
		{ value: "5", label: "5 per page" },
		{ value: "10", label: "10 per page" },
		{ value: "20", label: "20 per page" },
		{ value: "50", label: "50 per page" },
	],
	selectDefaultValue = "10",
	selectPlaceholder = "Items per page",
	selectDisabled = false,
	selectClassName = "w-[200px] m-0",
	onSelectChange,
	// Page info props
	showPageInfo = true,
	pageInfoText,
	pageInfoClassName = "text-center whitespace-nowrap text-sm text-muted-foreground",
	// Container props
	containerClassName = "flex items-center gap-4",
	gap = "gap-4",
}: SmartPaginationProps) {
	const getVisiblePageNumbers = () => {
		// For small number of pages, just show all pages without ellipsis
		if (totalPages <= 5) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const visiblePages = [];

		// Always show first page
		visiblePages.push(1);

		// Define the range around current page
		let startPage = Math.max(2, currentPage - 1);
		let endPage = Math.min(totalPages - 1, currentPage + 1);

		// Adjust range to ensure we always show a consistent number of pages
		if (currentPage <= 3) {
			// Near the start, show pages 1-4 then ellipsis then last page
			startPage = 2;
			endPage = 5;
		} else if (currentPage >= totalPages - 2) {
			// Near the end, show first page, ellipsis, then last 4 pages
			startPage = totalPages - 4;
			endPage = totalPages - 1;
		}

		// Add ellipsis after first page if there's a gap
		if (startPage > 2) {
			visiblePages.push("ellipsis-start");
		}

		// Add the range of pages
		for (let i = startPage; i <= endPage; i++) {
			visiblePages.push(i);
		}

		// Add ellipsis before last page if there's a gap
		if (endPage < totalPages - 1) {
			visiblePages.push("ellipsis-end");
		}

		// Always show last page
		if (totalPages > 1) {
			visiblePages.push(totalPages);
		}

		return visiblePages;
	};

	const visiblePages = getVisiblePageNumbers();

	const defaultPageInfoText =
		pageInfoText || `Current Page: ${currentPage} of ${totalPages}`;

	if (loading) {
		return (
			<div className={cn(containerClassName, gap, "animate-pulse w-full")}>
				<div className="flex items-center space-x-2 flex-1">
					<PaginationItemSkeleton />
					{Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
						const key = `skeleton-${i}-${Date.now()}`;
						return <PageNumberSkeleton key={key} />;
					})}
					<PaginationItemSkeleton />
				</div>

				{showSelect && <SelectSkeleton />}

				{showPageInfo && (
					<div className={pageInfoClassName}>
						<Skeleton className="h-4 w-32" />
					</div>
				)}
			</div>
		);
	}

	return (
		<div className={cn(containerClassName, gap)}>
			<Pagination className={className} showInfoText={false}>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
							style={{
								opacity: currentPage === 1 ? 0.5 : 1,
								cursor: currentPage === 1 ? "not-allowed" : "pointer",
							}}
						/>
					</PaginationItem>

					{visiblePages.map((page) => {
						if (page === "ellipsis-start" || page === "ellipsis-end") {
							return (
								<PaginationItem key={page}>
									<PaginationEllipsis />
								</PaginationItem>
							);
						}

						return (
							<PaginationItem key={`page-${page}`}>
								<PaginationLink
									isActive={currentPage === page}
									onClick={() => onPageChange(page as number)}
								>
									{page}
								</PaginationLink>
							</PaginationItem>
						);
					})}
					<PaginationItem>
						<PaginationNext
							onClick={() =>
								currentPage < totalPages && onPageChange(currentPage + 1)
							}
							style={{
								opacity: currentPage === totalPages ? 0.5 : 1,
								cursor: currentPage === totalPages ? "not-allowed" : "pointer",
							}}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>

			{showSelect && (
				<Select
					disabled={selectDisabled}
					defaultValue={selectDefaultValue}
					onValueChange={onSelectChange}
				>
					<SelectTrigger className={selectClassName}>
						<SelectValue placeholder={selectPlaceholder} />
					</SelectTrigger>
					<SelectContent>
						{selectOptions.map((opt) => (
							<SelectItem key={opt.value} value={opt.value}>
								{opt.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}

			{showPageInfo && (
				<div className={pageInfoClassName}>{defaultPageInfoText}</div>
			)}
		</div>
	);
}

export {
	Pagination,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
	SmartPagination,
};
