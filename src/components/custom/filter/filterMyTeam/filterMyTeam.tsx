import { CheckboxField } from "@/components/base";
import { MY_TEAM_STATUS_OPTIONS } from "@/constants";
import type { FilterHandles, FilterMyTeamValues } from "@/types";
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";

interface FilterMyTeamProps {
	data: FilterMyTeamValues;
	onChange: (values: FilterMyTeamValues) => void;
	onApply?: (values: FilterMyTeamValues) => void;
	type?: "onChange" | "onSubmit";
}

export const FilterMyTeamEmployee = forwardRef<
	FilterHandles,
	FilterMyTeamProps
>(({ data, onChange, onApply, type = "onSubmit" }, ref) => {
	const [localValues, setLocalValues] = useState<FilterMyTeamValues>(data);

	// Sync values if type is onChange OR values prop changes
	useEffect(() => {
		if (type === "onChange") {
			setLocalValues(data);
		}
	}, [data, type]);

	// Expose submit function to parent
	useImperativeHandle(ref, () => ({
		submit: () => {
			onChange(localValues);
			onApply?.(localValues);
		},
		reset: () => {
			const cleared = { employeeStatus: [] };
			if (type === "onChange") {
				onChange(cleared);
				onApply?.(cleared);
			} else {
				setLocalValues(cleared);
			}
		},
	}));

	const update = useCallback(
		(newValues: FilterMyTeamValues) => {
			if (type === "onChange") {
				onChange(newValues);
				onApply?.(newValues);
			} else {
				setLocalValues(newValues);
			}
		},
		[onChange, onApply, type],
	);

	const handleEmployeeStatusChange = useCallback(
		(status: string, checked: boolean) => {
			const newStatus = checked
				? [...(localValues.employeeStatus || []), status]
				: localValues.employeeStatus?.filter((s) => s !== status) || [];
			update({ ...localValues, employeeStatus: newStatus });
		},
		[update, localValues],
	);

	return (
		<div className="space-y-6">
			<fieldset className="space-y-3 pl-3">
				<legend className="text-sm font-medium -ml-3">Employee Status</legend>
				{MY_TEAM_STATUS_OPTIONS.map((option) => (
					<CheckboxField
						key={option.value}
						size="base"
						label={option.label}
						name={option.value}
						checked={
							localValues.employeeStatus?.includes(option.value) || false
						}
						onChange={(checked) =>
							handleEmployeeStatusChange(option.value, checked)
						}
						aria-label={`Filter by ${option.label.toLowerCase()} status`}
					/>
				))}
			</fieldset>
		</div>
	);
});

FilterMyTeamEmployee.displayName = "FilterMyTeamEmployee";
