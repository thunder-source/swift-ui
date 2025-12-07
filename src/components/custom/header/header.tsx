import {
	InputField,
	Notification,
	SvgIcon,
	UserProfile,
	type UserProfileProps,
} from "@/components/base";
import { ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";

interface HeaderProps extends Partial<Pick<UserProfileProps, "name" | "img">> {}

function Header({
	name = "User",
	img = "https://i.pravatar.cc/100",
}: HeaderProps) {
	const location = useLocation();
	const path = location.pathname;
	return (
		<header
			className={`flex items-center justify-between ${path === "/dashboard" ? null : "bg-white shadow-lg shadow-[hsl(var(--bg-light))] pb-2 pt-8 -mt-8"}  px-12 `}
		>
			{/* Left section - Welcome message and dashboard title */}
			{path === "/dashboard" ? (
				<div className="">
					<h1 className="text-2xl flex items-center font-bold text-[hsl(var(--text-dark))]">
						Welcome back, {name}!{" "}
						<span className="ml-1">
							👋
						</span>
					</h1>
					<p className="text-[hsl(var(--text-medium))] text-sm -mt-1">
						Admin Dashboard
					</p>
				</div>
			) : (
				<InputField
					type="search"
					name="search"
					className="border-none !bg-transparent !text-xs focus:ring-0 focus:border-none focus:outline-none focus-visible:ring-0 !ring-0"
					placeholder="Search Employee by name, ID..."
				/>
			)}

			{/* Right section - Search, notifications, and profile */}
			<div className="flex items-center gap-4 pl-6">
				{/* Search bar */}
				{path === "/dashboard" && (
					<InputField
						type="search"
						name="search"
						className="!bg-transparent w-80 !text-xs !shadow-md shadow-[hsla(var(--text-dark),0.05)]"
						placeholder="Search Employee by name, ID..."
					/>
				)}
				{/* Notification bell */}
				<Notification />

				{/* User profile */}
				<UserProfile
					name={name}
					position={"develoiper"}
					variant="card"
					img={img}
					dropdownIcon={<ChevronDown />}
				/>
			</div>
		</header>
	);
}

export { Header };
