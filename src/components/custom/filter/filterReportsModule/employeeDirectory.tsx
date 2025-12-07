import { CheckboxField, InputField, SelectInput } from "@/components/base";
import { DEPARTMENT_TEAM_OPTIONS, LOCATION_OPTIONS } from "@/constants";
import type { FilterEmployeeDirectoryProps, FilterHandles } from "@/types";
import {
	type ChangeEvent,
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";
import { MultiSelectFilter } from "../../multiSelectFilter/multiSelectFilter";

export const FilterEmployeeDirectory = forwardRef<
	FilterHandles,
	FilterEmployeeDirectoryProps
>(
	(
		{
			data,
			onChange,
			onApply,
			type = "onSubmit",
		}: FilterEmployeeDirectoryProps,
		ref,
	) => {
		const [localValues, setLocalValues] = useState(data);

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
				const cleared = {
					employeeStatus: [],
					departmentTeam: "" as "" | "Department" | "Team",
					location: "",
					joiningDate: {
						from: "",
						to: "",
					},
					employeeType: "",
				};
				if (type === "onChange") {
					onChange(cleared);
					onApply?.(cleared);
				} else {
					setLocalValues(cleared);
				}
			},
		}));

		const update = useCallback(
			(newValues: typeof data) => {
				if (type === "onChange") {
					onChange(newValues);
					onApply?.(newValues);
				} else {
					setLocalValues(newValues);
				}
			},
			[onChange, onApply, type],
		);

		const handleEmployeeTypeChange = useCallback(
			(selected: string[]) => {
				update({
					...localValues,
					employeeType: selected.length > 0 ? selected[0] : "",
				});
			},
			[update, localValues],
		);

		const handleDepartmentTeamChange = useCallback(
			(departmentTeam: "Department" | "Team" | "") => {
				update({ ...localValues, departmentTeam });
			},
			[update, localValues],
		);

		const handleLocationChange = useCallback(
			(location: string) => {
				update({ ...localValues, location });
			},
			[update, localValues],
		);

		const handleEmployeeStatusChange = useCallback(
			(status: string, checked: boolean) => {
				const newStatus = checked
					? [...localValues.employeeStatus, status]
					: localValues.employeeStatus.filter((s) => s !== status);
				update({ ...localValues, employeeStatus: newStatus });
			},
			[update, localValues],
		);

		const handleJoiningDateChange = useCallback(
			(field: "from" | "to", date: string) => {
				update({
					...localValues,
					joiningDate: {
						...localValues.joiningDate,
						[field]: date,
					},
				});
			},
			[update, localValues],
		);

		const locationOptions = useMemo(() => LOCATION_OPTIONS, []);
		const roles = useMemo(() => ["Admin", "HR", "Manager", "Employee"], []);

		return (
			<div className="space-y-6">
				<MultiSelectFilter
					label="Role"
					roles={roles}
					selected={localValues.employeeType ? [localValues.employeeType] : []}
					onChange={handleEmployeeTypeChange}
				/>

				<fieldset className="space-y-2">
					<legend className="text-sm font-medium pb-2">Department/Team</legend>
					<div className="flex gap-4 pl-3">
						{DEPARTMENT_TEAM_OPTIONS.map((option) => (
							<CheckboxField
								key={option}
								name={option.toLowerCase()}
								label={option}
								size="base"
								checked={localValues.departmentTeam === option}
								onChange={(checked) =>
									handleDepartmentTeamChange(checked ? option : "")
								}
								aria-label={`Filter by ${option.toLowerCase()}`}
							/>
						))}
					</div>
				</fieldset>

				<SelectInput
					name="location"
					label="Office Location"
					placeholder="Select location"
					options={locationOptions}
					value={localValues.location}
					onChange={handleLocationChange}
				/>

				<div>
					<p className="pb-2 text-sm font-medium">Employment Status </p>
					<div className="flex gap-4 pl-3 ">
						<CheckboxField
							name="Confirmed"
							label="Confirmed"
							size="base"
							checked={localValues.employeeStatus.includes("Confirmed")}
							onChange={(checked) =>
								handleEmployeeStatusChange("Confirmed", checked)
							}
						/>
						<CheckboxField
							name="Probation"
							label="Probation"
							size="base"
							checked={localValues.employeeStatus.includes("Probation")}
							onChange={(checked) =>
								handleEmployeeStatusChange("Probation", checked)
							}
						/>
					</div>
				</div>

				<div>
					<p className="pb-2 text-sm font-medium">Biometric ID Linked </p>
					<div className="flex gap-4 pl-3 ">
						<CheckboxField
							name="Yes"
							label="Yes"
							size="base"
							checked={localValues.employeeStatus.includes("Yes")}
							onChange={(checked) => handleEmployeeStatusChange("Yes", checked)}
						/>
						<CheckboxField
							name="No"
							label="No"
							size="base"
							checked={localValues.employeeStatus.includes("No")}
							onChange={(checked) => handleEmployeeStatusChange("No", checked)}
						/>
					</div>
				</div>

				<div>
					<p className="pb-2 text-sm font-medium">Account Status </p>
					<div className="flex gap-4 pl-3 ">
						<CheckboxField
							name="Active"
							label="Active"
							size="base"
							checked={localValues.employeeStatus.includes("Active")}
							onChange={(checked) =>
								handleEmployeeStatusChange("Active", checked)
							}
						/>
						<CheckboxField
							name="Inactive"
							label="Inactive"
							size="base"
							checked={localValues.employeeStatus.includes("Inactive")}
							onChange={(checked) =>
								handleEmployeeStatusChange("Inactive", checked)
							}
						/>
					</div>
				</div>

				<InputField
					type="date"
					name="joiningDate"
					bgColor="bg-white"
					placeholder="Select Date..."
					label="Joining Date"
					value={localValues.joiningDate.from}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						handleJoiningDateChange("from", e.target.value)
					}
				/>
			</div>
		);
	},
);

FilterEmployeeDirectory.displayName = "FilterEmployeeDirectory";
