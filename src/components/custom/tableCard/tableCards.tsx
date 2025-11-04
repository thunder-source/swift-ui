import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui";
import clsx from "clsx";
import { MoreHorizontal } from "lucide-react";
import React from "react";

/**
 * Type representing a single announcement item.
 */
export interface AnnouncementTableItem {
	/** Short date label */
	date: string;
	/** Title of the announcement */
	title: string;
	/** Description or details of the announcement */
	description: string;
}

/**
 * Props for TableCards component.
 */
export interface TableCardsProps {
	/** List of announcements to display */
	announcements: AnnouncementTableItem[];
	/** Optional className for styling */
	className?: string;
	actionItem?: {
		icon: React.ReactNode;
		text: string;
	}[];
}

/**
 * Renders a responsive, accessible card list of announcements.
 *
 * @component
 * @example
 * <TableCards announcements={[{ date: 'Apr.10', title: 'Birthday', description: 'Someone’s birthday is near.' }]} />
 */
export const TableCards: React.FC<TableCardsProps> = React.memo(
	({ announcements, className, actionItem }) => {
		if (!announcements || announcements.length === 0) return null;

		return (
			<div className={clsx("space-y-3", className)}>
				{announcements.map((announcement) => (
					<div
						key={announcement.date}
						className="flex flex-col space-y-3 sm:flex-row sm:items-center gap-3"
					>
						<div
							className="flex h-10 w-14 items-center justify-center rounded-full bg-[hsla(var(--primary-orange),0.1)] text-xs font-medium text-[hsl(var(--text-dark))]"
							aria-hidden="true"
						>
							{announcement.date}
						</div>
						<div className="flex-1">
							<h3 className="font-medium text-xs  text-[hsl(var(--text-dark))]">
								{announcement.title}
							</h3>
							<p className="text-[10px] pt-1 text-[hsl(var(--text-light))]">
								{announcement.description}
							</p>
						</div>
						<div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild className="cursor-pointer">
									<MoreHorizontal aria-hidden="true" />
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									{actionItem?.map((item, index) => (
										<React.Fragment key={item.text}>
											<DropdownMenuItem className="flex text-[hsl(var(--text-medium))] py-2 px-3 items-center gap-2">
												{item.icon}
												{item.text}
											</DropdownMenuItem>
											{index < actionItem.length - 1 && (
												<DropdownMenuSeparator />
											)}
										</React.Fragment>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				))}
			</div>
		);
	},
);

TableCards.displayName = "TableCards";
