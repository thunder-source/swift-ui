import { Button } from "@/components/ui";
import { useEffect, useState } from "react";

interface MultiSelectFilterProps {
	label: string;
	roles: string[];
	selected: string[];
	onChange: (newValues: string[]) => void;
	className?: string;
}

function MultiSelectFilter({
	roles,
	label,
	selected,
	onChange,
	className,
}: MultiSelectFilterProps) {
	// Keep internal selectedRoles in sync with the value prop
	const [selectedRoles, setSelectedRoles] = useState<string[]>(selected);

	useEffect(() => {
		setSelectedRoles(selected);
	}, [selected]);

	const toggleRole = (role: string) => {
		setSelectedRoles((prev) => {
			const newSelected = prev.includes(role)
				? prev.filter((r) => r !== role)
				: [...prev, role];
			// Notify parent immediately
			onChange(newSelected);
			return newSelected;
		});
	};

	return (
		<div className={`space-y-2 ${className}`}>
			<p className="text-sm font-medium text-[hsl(var(--text-dark))]">
				{label}
			</p>
			<div className="flex flex-wrap gap-2">
				{roles.map((role) => {
					const isSelected = selectedRoles.includes(role);
					return (
						<Button
							variant={"dark"}
							size={"sm"}
							key={role}
							onClick={() => toggleRole(role)}
							className={`px-3 py-0 rounded-full text-[13px] font-medium border transition ${
								isSelected
									? "bg-[hsl(var(--primary-blue))] text-white border-[hsl(var(--primary-blue))] hover:text-white hover:bg-[hsl(var(--primary-blue))]"
									: "bg-[hsl(var(--bg-light))] text-gray-700 border-transparent hover:text-white hover:bg-[hsl(var(--primary-blue))]/60"
							}`}
						>
							{role}
						</Button>
					);
				})}
			</div>
		</div>
	);
}

export { MultiSelectFilter };
