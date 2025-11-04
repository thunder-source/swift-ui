import { Card, CardContent } from "@/components/ui";

type StatCardProps = {
	count: string | number;
	label: string;
	icon: React.ReactNode;
	note: string;
	noteIcon?: React.ReactNode;
	noteColor?: "success" | "danger";
};

const StatCard = ({
	count,
	label,
	icon,
	note,
	noteIcon,
	noteColor = "success",
}: StatCardProps) => {
	return (
		<Card className="flex flex-col justify-between py-3 flex-1 min-w-[250px] rounded-2xl">
			<CardContent className="px-5 py-2 flex flex-col items-start space-y-2">
				<div className="flex justify-between items-center w-full">
					<h2 className="text-3xl font-bold text-[hsl(var(--text-dark),0.8)]">
						{count}
					</h2>
					<div className=" bg-[hsla(var(--primary-blue),0.1)] p-2 rounded-full">
						<span className="text-[hsla(var(--primary-blue))]">{icon}</span>
					</div>
				</div>
				<p className="text-[hsl(var(--text-medium))] text-sm font-medium">
					{label}
				</p>
				<div className="flex items-center gap-1">
					{noteIcon && (
						<span
							className={`text-sm p-1 rounded-full ${
								noteColor === "success"
									? "bg-[hsla(var(--status-success),0.3)] text-[hsl(var(--status-success))]"
									: "bg-[hsla(var(--status-error),0.3)] text-[hsl(var(--status-error))]"
							}`}
						>
							{noteIcon}
						</span>
					)}
					<p className="text-sm whitespace-nowrap text-[hsl(var(--text-light))] mx-2 font-medium">
						{note}
					</p>
				</div>
			</CardContent>
		</Card>
	);
};
export { StatCard, type StatCardProps };
