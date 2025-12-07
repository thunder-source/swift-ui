import { CheckboxField, InputField, SelectInput } from "@/components/base";
import { MultiSelectFilter } from "@/components/custom";
import {
	ACCOUNT_STATUS_OPTIONS,
	CONFIRMATION_OPTIONS,
	EMPLOYEE_STATUS_OPTIONS,
	LOCATION_OPTIONS,
} from "@/constants";
import type {
	FilterAllEmployeesProps,
	FilterAllEmployeesValues,
	FilterHandles,
} from "@/types";
import { Search } from "lucide-react";
import {
	type ChangeEvent,
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";

export const FilterAllEmployees = forwardRef<
	FilterHandles,
	FilterAllEmployeesProps
>(
	(
		{ data, onChange, onApply, type = "onSubmit" }: FilterAllEmployeesProps,
		ref,
	) => {
		const [localValues, setLocalValues] =
			useState<FilterAllEmployeesValues>(data);

		// Sync when values prop changes in onChange mode
		useEffect(() => {
			if (type === "onChange") {
				setLocalValues(data);
			}
		}, [data, type]);

		// Expose submit and reset to parent
		useImperativeHandle(ref, () => ({
			submit: () => {
				onChange(localValues);
				onApply?.(localValues);
			},
			reset: () => {
				const cleared: FilterAllEmployeesValues = {
					search: "",
					departments: [],
					roles: [],
					location: "",
					employeeStatus: [],
					accountStatus: "",
					biometricLinked: "",
					joiningDate: "",
					dateOfBirth: "",
				};
				if (type === "onChange") {
					onChange(cleared);
					onApply?.(cleared);
				} else {
					setLocalValues(cleared);
				}
			},
		}));

		// Unified updater
		const update = useCallback(
			(newValues: FilterAllEmployeesValues) => {
				if (type === "onChange") {
					onChange(newValues);
					onApply?.(newValues);
				} else {
					setLocalValues(newValues);
				}
			},
			[onChange, onApply, type],
		);

		// Handlers
		const handleSearchChange = useCallback(
			(e: ChangeEvent<HTMLInputElement>) => {
				update({ ...localValues, search: e.target.value });
			},
			[localValues, update],
		);

		const handleDepartmentsChange = useCallback(
			(selected: string[]) => {
				update({ ...localValues, departments: selected });
			},
			[localValues, update],
		);

		const handleRolesChange = useCallback(
			(selected: string[]) => {
				update({ ...localValues, roles: selected });
			},
			[localValues, update],
		);

		const handleLocationChange = useCallback(
			(value: string) => {
				update({ ...localValues, location: value });
			},
			[localValues, update],
		);

		const handleEmployeeStatusChange = useCallback(
			(status: string, checked: boolean) => {
				const newStatus = checked
					? [...localValues.employeeStatus, status]
					: localValues.employeeStatus.filter((s) => s !== status);
				update({ ...localValues, employeeStatus: newStatus });
			},
			[localValues, update],
		);

		const handleAccountStatusChange = useCallback(
			(value: string) => {
				update({ ...localValues, accountStatus: value });
			},
			[localValues, update],
		);

		const handleBiometricChange = useCallback(
			(value: string) => {
				update({ ...localValues, biometricLinked: value });
			},
			[localValues, update],
		);

		const handleJoiningDateChange = useCallback(
			(e: ChangeEvent<HTMLInputElement>) => {
				update({ ...localValues, joiningDate: e.target.value });
			},
			[localValues, update],
		);

		const handleDobChange = useCallback(
			(e: ChangeEvent<HTMLInputElement>) => {
				update({ ...localValues, dateOfBirth: e.target.value });
			},
			[localValues, update],
		);

		return (
			<div className="space-y-6">
				<InputField
					name="search"
					label="Search"
					bgColor="bg-white"
					type="text"
					iconRight={<Search size={18} />}
					placeholder="By name, email, phone number..."
					value={localValues.search}
					onChange={handleSearchChange}
				/>

				<MultiSelectFilter
					label="Department"
					roles={["HR", "Sales", "IT"]}
					selected={localValues.departments}
					onChange={handleDepartmentsChange}
				/>

				<MultiSelectFilter
					label="Role"
					roles={["Admin", "HR", "Manager", "Employee"]}
					selected={localValues.roles}
					onChange={handleRolesChange}
				/>

				<SelectInput
					name="location"
					label="Location"
					placeholder="Select location"
					options={LOCATION_OPTIONS}
					value={localValues.location}
					onChange={handleLocationChange}
				/>

				<div>
					<p className="pb-3 text-sm font-medium">Employee Status</p>
					<div className="space-y-3 pl-3">
						{EMPLOYEE_STATUS_OPTIONS.map((status) => (
							<CheckboxField
								key={status}
								size="base"
								label={status}
								name={status}
								checked={localValues.employeeStatus.includes(status)}
								onChange={(checked) =>
									handleEmployeeStatusChange(status, checked)
								}
							/>
						))}
					</div>
				</div>

				<div>
					<p className="pb-2 text-sm font-medium">Account Status</p>
					<div className="flex gap-4 pl-3">
						{ACCOUNT_STATUS_OPTIONS.map((status) => (
							<CheckboxField
								key={status}
								name={status}
								label={status}
								size="base"
								checked={localValues.accountStatus === status}
								onChange={(checked) => {
									handleAccountStatusChange(checked ? status : "");
								}}
							/>
						))}
					</div>
				</div>

				<div>
					<p className="pb-2 text-sm font-medium">Biometric ID Linked</p>
					<div className="flex gap-4 pl-3">
						{CONFIRMATION_OPTIONS.map((option) => (
							<CheckboxField
								key={option}
								name={option}
								label={option}
								size="base"
								checked={localValues.biometricLinked === option}
								onChange={(checked) =>
									handleBiometricChange(checked ? option : "no")
								}
							/>
						))}
					</div>
				</div>

				<InputField
					type="date"
					bgColor="bg-white"
					name="joiningDate"
					label="Joining Date"
					value={localValues.joiningDate}
					onChange={handleJoiningDateChange}
				/>

				<InputField
					type="date"
					bgColor="bg-white"
					name="dateOfBirth"
					label="Date of Birth"
					value={localValues.dateOfBirth}
					onChange={handleDobChange}
				/>
			</div>
		);
	},
);

FilterAllEmployees.displayName = "FilterAllEmployees";
