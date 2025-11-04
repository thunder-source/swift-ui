import type { Meta, StoryObj } from "@storybook/react";
import { UserCardProfile } from "./userProfileCard";

const meta: Meta<typeof UserCardProfile> = {
	title: "base/UserCardProfile",
	component: UserCardProfile,
	tags: ["autodocs"],
	argTypes: {
		showUserProfile: { control: "boolean" },
	},
};

export default meta;

type Story = StoryObj<typeof UserCardProfile>;

export const Default: Story = {
	args: {
		name: "Dibakar Das",
		position: "Frontend Developer",
		employmentStatus: "Permanent",
		img: "https://i.pravatar.cc/150?img=4",
		avatarFallback: "D",
		showUserProfile: true,
	},
};

export const WithoutDropdown: Story = {
	args: {
		name: "Alex Johnson",
		position: "UI/UX Designer",
		employmentStatus: "Contract",
		img: "https://i.pravatar.cc/150?img=3",
		avatarFallback: "A",
		showUserProfile: false,
		className: "bg-gray-50",
	},
};

export const CustomLabels: Story = {
	args: {
		name: "Jane Doe",
		position: "Lead Developer",
		employmentStatus: "Permanent",
		designation: "Tech Lead",
		department: "Engineering",
		location: "Pune",
		img: "https://i.pravatar.cc/150?img=7",
		showUserProfile: true,
		labels: {
			employmentStatus: "Status",
			designation: "Job Title",
			department: "Team",
		},
	},
};

export const ThreeFields: Story = {
	args: {
		name: "Dibakar Das",
		position: "IT Manager",
		employmentStatus: "Permanent",
		designation: "IT Manager",
		department: "IT",
		img: "https://i.pravatar.cc/150?img=10",
		showUserProfile: true,
		labels: {
			employmentStatus: "Employment Status",
			designation: "Designation",
			department: "Department",
		},
	},
};
