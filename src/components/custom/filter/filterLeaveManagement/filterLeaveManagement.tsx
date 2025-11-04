import { CheckboxField, InputField, SelectInput } from "@/components/base";
import { MultiSelectFilter } from "@/components/custom";
import {
	APPROVER_OPTIONS,
	DEPARTMENT_TEAM_OPTIONS,
	LEAVE_STATUS_OPTIONS,
	LEAVE_TYPE_OPTIONS,
	LOCATION_OPTIONS,
	PUNCH_SOURCE_OPTIONS,
} from "@/constants";
import type { FilterLeaveManagementProps } from "@/types";
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";

export const FilterLeaveManagement = forwardRef(
	(
		{ data, onChange, onApply, type = "onSubmit" }: FilterLeaveManagementProps,
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
					leaveTypes: [] as string[],
					status: [] as string[],
					departmentTeam: "" as "" | "Department" | "Team",
					location: "",
					submissionDate: "",
					carryForwardEligible: false,
					punchSource: [] as string[],
					approver: "",
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

		const handleLeaveTypesChange = useCallback(
			(leaveTypes: string[]) => {
				update({ ...localValues, leaveTypes });
			},
			[update, localValues],
		);

		const handleStatusChange = useCallback(
			(status: string, checked: boolean) => {
				const newStatus = checked
					? [...localValues.status, status]
					: localValues.status.filter((s) => s !== status);
				update({ ...localValues, status: newStatus });
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

		const handleSubmissionDateChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				update({ ...localValues, submissionDate: e.target.value });
			},
			[update, localValues],
		);

		const handleCarryForwardChange = useCallback(
			(carryForwardEligible: boolean) => {
				update({ ...localValues, carryForwardEligible });
			},
			[update, localValues],
		);

		const handlePunchSourceChange = useCallback(
			(punchSource: string[]) => {
				update({ ...localValues, punchSource });
			},
			[update, localValues],
		);

		const handleApproverChange = useCallback(
			(approver: string) => {
				update({ ...localValues, approver });
			},
			[update, localValues],
		);

		const leaveTypeOptions = useMemo(() => LEAVE_TYPE_OPTIONS, []);
		const statusOptions = useMemo(() => LEAVE_STATUS_OPTIONS, []);
		const locationOptions = useMemo(() => LOCATION_OPTIONS, []);
		const punchSourceOptions = useMemo(() => PUNCH_SOURCE_OPTIONS, []);
		const approverOptions = useMemo(() => APPROVER_OPTIONS, []);

		return (
			<div className="space-y-6">
				<MultiSelectFilter
					label="Leave Type"
					roles={leaveTypeOptions}
					selected={localValues.leaveTypes}
					onChange={handleLeaveTypesChange}
				/>

				<fieldset className="space-y-3 pl-3">
					<legend className="text-sm font-medium -ml-3	">Status</legend>
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
					placeholder="Select location..."
					options={locationOptions}
					value={localValues.location}
					onChange={handleLocationChange}
					ariaLabel="Location filter"
					triggerClassName="w-full"
				/>

				<InputField
					bgColor="bg-white"
					type="date"
					name="submissionDate"
					label="Leave Submission Date"
					value={localValues.submissionDate}
					onChange={handleSubmissionDateChange}
					aria-label="Leave submission date filter"
				/>

				<fieldset className="space-y-2">
					<legend className="text-sm font-medium pb-2">
						Carry Forward Eligible
					</legend>
					<div className="flex gap-4 pl-3">
						<CheckboxField
							name="carryForwardYes"
							label="Yes"
							size="base"
							checked={localValues.carryForwardEligible === true}
							onChange={() => handleCarryForwardChange(true)}
							aria-label="Filter for carry forward eligible leaves"
						/>
						<CheckboxField
							name="carryForwardNo"
							label="No"
							size="base"
							checked={localValues.carryForwardEligible === false}
							onChange={() => handleCarryForwardChange(false)}
							aria-label="Filter for non-carry forward eligible leaves"
						/>
					</div>
				</fieldset>

				<MultiSelectFilter
					label="Punch Source"
					roles={punchSourceOptions}
					selected={localValues.punchSource}
					onChange={handlePunchSourceChange}
				/>

				<SelectInput
					name="approver"
					label="Approver"
					placeholder="Select approver..."
					options={approverOptions}
					value={localValues.approver}
					onChange={handleApproverChange}
					ariaLabel="Approver filter"
					triggerClassName="w-full"
				/>
			</div>
		);
	},
);

FilterLeaveManagement.displayName = "FilterLeaveManagement";
