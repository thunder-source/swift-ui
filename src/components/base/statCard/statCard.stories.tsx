import { Plus, TrendingUp } from "lucide-react";
import { SvgIcon } from "../svgIcon";
import { StatCard } from "./statCard";

export default {
	title: "base/StatCard",
	tags: ["autodocs"],
	component: StatCard,
};

export const TotalEmployees = () => (
	<StatCard
		count={452}
		label="Total Employees"
		icon={<SvgIcon name="usersMore" size={25} fill="transparent" />}
		note="2 new employees added!"
		noteIcon={<Plus size={8} />}
		noteColor="success"
	/>
);

export const PresentToday = () => (
	<StatCard
		count={410}
		label="Present Today"
		icon={<SvgIcon name="userRight" size={25} fill="transparent" />}
		note="10% increase than Yesterday"
		noteIcon={<TrendingUp size={8} />}
		noteColor="success"
	/>
);

export const OnLeave = () => (
	<StatCard
		count={42}
		label="On Leave"
		icon={<SvgIcon name="usersCheck" size={25} fill="transparent" />}
		note="2% less than Yesterday"
		noteIcon={<SvgIcon name="trendingDown" size={8} fill="transparent" />}
		noteColor="danger"
	/>
);

export const Absent = () => (
	<StatCard
		count={150}
		label="Absent"
		icon={<SvgIcon name="usersCheck" size={25} fill="transparent" />}
		note="2% less than Yesterday"
		noteIcon={<SvgIcon name="trendingDown" size={8} fill="transparent" />}
		noteColor="danger"
	/>
);

export const AllVariants = () => (
	<div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
		<TotalEmployees />
		<PresentToday />
		<OnLeave />
		<Absent />
	</div>
);
