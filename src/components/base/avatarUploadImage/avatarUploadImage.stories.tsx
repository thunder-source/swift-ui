import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { AvatarUploadImage } from "./avatarUploadImage";

import { action } from "@storybook/addon-actions";

const meta: Meta<typeof AvatarUploadImage> = {
	title: "base/AvatarUploadImage",
	component: AvatarUploadImage,
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: { type: "number" },
		},
		imageUrl: {
			control: { type: "text" },
		},
		onChange: { action: "changed" },
		className: { control: { type: "text" } },
	},
};

export default meta;
type Story = StoryObj<typeof AvatarUploadImage>;

export const Default: Story = {
	args: {
		size: 120,
		imageUrl:
			"https://imgs.search.brave.com/1_MFDZ8TKrKGkEGMYIQ63nXecumb2LVlwgq4q_3w8YE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vMC8wMi9J/cm9uX01hbl8oMjAw/OF9maWxtKV9wb3N0/ZXIuanBn",
		className: "",
	},
	render: (args) => {
		const [imageUrl, setImageUrl] = useState(args.imageUrl);
		useEffect(() => {
			setImageUrl(args.imageUrl);
		}, [args.imageUrl]);
		const handleChange = (file: File) => {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result) {
					setImageUrl(reader.result as string);
				}
			};
			reader.readAsDataURL(file);
			action("onChange")(file);
		};
		return (
			<AvatarUploadImage
				{...args}
				imageUrl={imageUrl}
				onChange={handleChange}
			/>
		);
	},
};

export const LargeSize: Story = {
	args: {
		size: 200,
		imageUrl: "https://randomuser.me/api/portraits/men/75.jpg",
		className: "border-4 border-blue-500",
	},
	render: (args) => {
		const [imageUrl, setImageUrl] = useState(args.imageUrl);
		useEffect(() => {
			setImageUrl(args.imageUrl);
		}, [args.imageUrl]);
		const handleChange = (file: File) => {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result) {
					setImageUrl(reader.result as string);
				}
			};
			reader.readAsDataURL(file);
			action("onChange")(file);
		};
		return (
			<AvatarUploadImage
				{...args}
				imageUrl={imageUrl}
				onChange={handleChange}
			/>
		);
	},
};
