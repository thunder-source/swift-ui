import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { Bell, Ellipsis, ListCheck, Volume2Icon } from "lucide-react";
import { useState } from "react";

type NotificationItem = {
	id: string;
	title: string;
	time: string;
	content: string;
	avatarSrc?: string;
	avatarFallbackText?: string;
	avatarFallbackIcon?: React.ReactNode;
	isRead?: boolean;
};

const mockNotifications: NotificationItem[] = [
	{
		id: "1",
		title: "Announcement",
		time: "Now",
		content: "Lorem Ipsum is simply text ...",
		avatarFallbackIcon: <Volume2Icon size={20} />,
		isRead: false,
	},
	{
		id: "2",
		title: "Announcement",
		time: "Now",
		content: "Lorem Ipsum is simply text ...",
		avatarSrc: "https://i.pravatar.cc/100",
		avatarFallbackText: "AB",
		isRead: false,
	},
	{
		id: "3",
		title: "Announcement",
		time: "Now",
		content: "Lorem Ipsum is simply text ...",
		avatarSrc: "",
		avatarFallbackText: "AB",
		isRead: false,
	},
	{
		id: "4",
		title: "Announcement",
		time: "Now",
		content: "Lorem Ipsum is simply text ...",
		avatarFallbackIcon: <Volume2Icon size={20} />,
		isRead: true,
	},
];

function Notification() {
	const [isOpen, setIsOpen] = useState(false);
	const [notifications, _setNotifications] =
		useState<NotificationItem[]>(mockNotifications);

	return (
		<>
			{isOpen && (
				<div className="fixed inset-0 bg-[hsla(var(--text-dark),0.2)] backdrop-blur-xs z-40" />
			)}
			<DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
				<DropdownMenuTrigger asChild>
					<div className="relative cursor-pointer">
						<Bell className="h-4.5 w-4.5 text-[hsl(var(--text-light))]" />
						{notifications.some((n) => !n.isRead) && (
							<span className="absolute -top-0 -right-0 h-2 w-2 bg-[hsl(var(--status-error))] rounded-full" />
						)}
					</div>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="p-5 mt-2 w-sm rounded-2xl">
					<div className="flex justify-between pb-4 px-2">
						<p className="text-xl font-semibold">Notification</p>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Ellipsis size={20} className="cursor-pointer" />
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="p-0">
								<DropdownMenuItem className="flex">
									<ListCheck size={20} className="mr-2" /> Mark all as read
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					{notifications.map((notification, index) => (
						<div key={notification.id}>
							<DropdownMenuItem className="flex py-2 items-start w-full gap-2">
								<Avatar>
									{notification.avatarSrc && (
										<AvatarImage src={notification.avatarSrc} alt="Avatar" />
									)}
									<AvatarFallback
										className={
											notification.isRead
												? "bg-[hsla(var(--status-info),0.1)]"
												: "bg-[hsla(var(--primary-orange),0.2)]"
										}
									>
										{notification.avatarFallbackIcon ||
											notification.avatarFallbackText}
									</AvatarFallback>
								</Avatar>
								<div className="flex-1">
									<div className="flex justify-between w-full">
										<h6 className="text-base font-semibold">
											{notification.title}
										</h6>
										<p
											className={`text-[10px] text-[hsl(var(--text-medium))] ${
												notification.isRead &&
												"text-[hsla(var(--text-light),1)]"
											}`}
										>
											{notification.time}
										</p>
									</div>
									<div className="flex justify-between items-center">
										<p
											className={cn(
												"text-sm text-[hsl(var(--text-medium))]",
												notification.isRead &&
													"text-[hsla(var(--text-light),1)]",
											)}
										>
											{notification.content}
										</p>
										{!notification.isRead && (
											<div
												className={cn(
													"h-1 w-1 outline outline-[hsla(var(--status-error),0.2)] bg-[hsl(var(--status-error))] rounded-full",
												)}
											/>
										)}
									</div>
								</div>
							</DropdownMenuItem>
							{index !== notifications.length - 1 && <hr className="my-1" />}
						</div>
					))}

					<Button
						className="w-full mt-4 text-md font-medium"
						variant={"destructive"}
					>
						See All Notifications
					</Button>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}

export { Notification };
