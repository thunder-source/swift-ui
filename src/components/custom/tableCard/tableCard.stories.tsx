import type { Meta, StoryObj } from "@storybook/react";
import { type AnnouncementTableItem, TableCards } from "./tableCards";

const meta: Meta<typeof TableCards> = {
	title: "custom/TableCards",
	component: TableCards,
	tags: ["autodocs"],
};

export default meta;

const mockAnnouncements: AnnouncementTableItem[] = [
	{
		date: "Apr.10",
		title: "Birthday",
		description: "John's birthday is coming on 18th.",
	},
	{ date: "Apr.12", title: "Meeting", description: "Project kickoff at 3 PM." },
];

export const Default: StoryObj<typeof TableCards> = {
	args: {
		announcements: mockAnnouncements,
	},
};
