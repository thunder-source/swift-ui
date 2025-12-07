import { CheckboxField, SelectInput } from "@/components/base";
import { MultiSelectFilter } from "@/components/custom";
import {
	DEFAULT_STATUS_OPTIONS,
	DEPARTMENT_TEAM_OPTIONS,
	LOCATION_OPTIONS,
	PUNCH_SOURCE_OPTIONS,
} from "@/constants";
import type {
	AttendanceStatus,
	FilterAttendanceManagementProps,
	FilterHandles,
} from "@/types";
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";

export const FilterAttendanceManagement = forwardRef<
	FilterHandles,
	FilterAttendanceManagementProps
>(
	(
		{
			data,
			onChange,
			onApply,
			type = "onSubmit",
		}: FilterAttendanceManagementProps,
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
					location: "",
					departmentTeam: "" as "" | "Department" | "Team",
					status: [] as AttendanceStatus[],
					punchSource: [] as string[],
					lateArrivalsOnly: false,
					missingPunches: false,
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

		const handleLocationChange = useCallback(
			(location: string) => {
				update({ ...localValues, location });
			},
			[update, localValues],
		);

		const handleDepartmentTeamChange = useCallback(
			(departmentTeam: "Department" | "Team" | "") => {
				update({ ...localValues, departmentTeam });
			},
			[update, localValues],
		);

		const handleStatusChange = useCallback(
			(status: AttendanceStatus, checked: boolean) => {
				const newStatus = checked
					? [...localValues.status, status]
					: localValues.status.filter((s) => s !== status);
				update({ ...localValues, status: newStatus });
			},
			[update, localValues],
		);

		const handlePunchSourceChange = useCallback(
			(punchSource: string[]) => {
				update({ ...localValues, punchSource });
			},
			[update, localValues],
		);

		const handleLateArrivalsChange = useCallback(
			(checked: boolean) => {
				update({ ...localValues, lateArrivalsOnly: checked });
			},
			[update, localValues],
		);

		const handleMissingPunchesChange = useCallback(
			(checked: boolean) => {
				update({ ...localValues, missingPunches: checked });
			},
			[update, localValues],
		);

		const locationOptions = useMemo(() => LOCATION_OPTIONS, []);
		const statusOptions = useMemo(() => DEFAULT_STATUS_OPTIONS, []);
		const punchSourceOptions = useMemo(() => PUNCH_SOURCE_OPTIONS, []);

		return (
			<div className="space-y-6">
				<SelectInput
					name="location"
					label="Location"
					placeholder="Select location"
					options={locationOptions}
					value={localValues.location}
					onChange={handleLocationChange}
					ariaLabel="Location filter"
					triggerClassName="w-full"
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

				<fieldset className="space-y-3 pl-3">
					<legend className="text-sm font-medium -ml-3">Status</legend>
					{statusOptions.map((option) => (
						<CheckboxField
							key={option.value}
							size="base"
							label={option.label}
							name={option.value}
							checked={localValues.status.includes(option.value)}
							onChange={(checked) => handleStatusChange(option.value, checked)}
							aria-label={`Filter by ${option.label.toLowerCase()} status`}
						/>
					))}
				</fieldset>

				<MultiSelectFilter
					label="Punch Source"
					roles={punchSourceOptions}
					selected={localValues.punchSource}
					onChange={handlePunchSourceChange}
				/>

				<CheckboxField
					name="lateArrivalsOnly"
					single
					label="Late Arrivals Only"
					placeHolder="View Late arrival"
					checked={localValues.lateArrivalsOnly}
					onChange={handleLateArrivalsChange}
					aria-label="Filter for late arrivals only"
				/>

				<CheckboxField
					name="missingPunches"
					single
					label="Missing Punches"
					placeHolder="Identify incomplete logs"
					checked={localValues.missingPunches}
					onChange={handleMissingPunchesChange}
					aria-label="Filter for missing punches"
				/>
			</div>
		);
	},
);

FilterAttendanceManagement.displayName = "FilterAttendanceManagement";
