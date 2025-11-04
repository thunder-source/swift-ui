import { Avatar, AvatarImage } from "@/components/ui";
import { ChevronDown } from "lucide-react";
import { UserProfile } from "../userProfile";

export interface UserCardProfileProps {
	img?: string;
	name: string;
	position?: string;
	employmentStatus?: string;
	designation?: string;
	department?: string;
	location?: string;
	avatarFallback?: string;
	showUserProfile?: boolean;
	className?: string;
	labels?: {
		employmentStatus?: string;
		designation?: string;
		department?: string;
		location?: string;
	};
}

export const UserCardProfile = ({
	img = "https://i.pravatar.cc/100",
	name,
	position = "Employee",
	employmentStatus = "Permanent",
	designation,
	department,
	location,
	showUserProfile = true,
	className = "",
	labels = {},
}: UserCardProfileProps) => {
	const infoMap: Record<string, string | undefined> = {
		employmentStatus,
		designation,
		department,
		location,
	};

	return (
		<div
			className={`p-6 border rounded-md shadow-md space-y-2 w-96 ${className}`}
		>
			{/* Avatar and Name */}
			<div className="flex items-center flex-col gap-3">
				<Avatar size="xl" className="w-[150px] h-full" variant="circle">
					<AvatarImage
						src={img}
						alt={`${name}'s profile picture`}
						loading="lazy"
					/>
				</Avatar>
				<div className="mt-3 text-center">
					<h3 className="text-sm font-medium">{name}</h3>
					<h4 className="text-xs text-gray-500">{position}</h4>
				</div>
			</div>

			<div className="mt-5 space-y-2 text-sm text-gray-600">
				{labels &&
					Object.entries(labels).map(([key, label]) => {
						const value = infoMap[key];
						if (!value) return null;

						return (
							<div
								key={key}
								className="grid grid-cols-[1fr_auto_1fr] items-center gap-2"
							>
								<h4 className="text-[#AAAAAA] text-left">{label}</h4>
								<span className="text-center text-[#AAAAAA]">-</span>
								<span className="font-semibold text-right">{value}</span>
							</div>
						);
					})}
			</div>

			{/* User Profile Dropdown */}
			{showUserProfile && (
				<UserProfile
					className="mt-5"
					name={name}
					position={position}
					variant="card"
					img={img}
					//pass the icons also ok not neccesory but if pass then show
					dropdownIcon={<ChevronDown />}
				/>
			)}
		</div>
	);
};
