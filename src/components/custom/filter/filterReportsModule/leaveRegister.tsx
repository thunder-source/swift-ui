import { CheckboxField, InputField, SelectInput } from "@/components/base";
import {
	DEPARTMENT_TEAM_OPTIONS,
	LEAVE_DAYS_COUNT_OPTIONS,
	LEAVE_STATUS_OPTIONS,
	LEAVE_TYPE_OPTIONS,
	LOCATION_OPTIONS,
} from "@/constants";
import type { FilterHandles, FilterLeaveRegisterProps } from "@/types";
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";
import { MultiSelectFilter } from "../../multiSelectFilter/multiSelectFilter";

export const FilterLeaveRegister = forwardRef<
	FilterHandles,
	FilterLeaveRegisterProps
>(
	(
		{ data, onChange, onApply, type = "onSubmit" }: FilterLeaveRegisterProps,
		ref,
	) => {
		const [localValues, setLocalValues] = useState(data);
		const [dateErrors, setDateErrors] = useState({
			from: "",
			to: "",
		});

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
					dateRange: {
						from: "",
						to: "",
					},
					leaveDaysCount: "",
				};

				// Clear any date errors
				setDateErrors({
					from: "",
					to: "",
				});

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

		const handleDateFromChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				const newFromDate = e.target.value;
				const toDate = localValues.dateRange.to;

				// Clear any previous errors
				setDateErrors((prev) => ({ ...prev, from: "" }));

				// Create updated values with the new from date
				const updatedValues = {
					...localValues,
					dateRange: {
						...localValues.dateRange,
						from: newFromDate,
					},
				};

				// If both dates are set, check if the new from date is later than the to date
				if (newFromDate && toDate) {
					// Convert dd/mm/yyyy to Date objects for comparison
					const fromDateObj = new Date(
						newFromDate.split("/").reverse().join("-"),
					);
					const toDateObj = new Date(toDate.split("/").reverse().join("-"));

					// If from date is later than to date, set an error on the to date
					if (fromDateObj > toDateObj) {
						setDateErrors((prev) => ({
							...prev,
							to: "End date cannot be earlier than start date",
						}));
					}
				}

				update(updatedValues);
			},
			[update, localValues],
		);

		const handleDateToChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				const newToDate = e.target.value;
				const fromDate = localValues.dateRange.from;

				// Clear any previous errors
				setDateErrors((prev) => ({ ...prev, to: "" }));

				// If the input is empty, just update the value without validation
				if (!newToDate) {
					update({
						...localValues,
						dateRange: {
							...localValues.dateRange,
							to: newToDate,
						},
					});
					return;
				}

				// If both dates are set, check if the new to date is earlier than the from date
				if (newToDate && fromDate) {
					// Convert dd/mm/yyyy to Date objects for comparison
					const toDateObj = new Date(newToDate.split("/").reverse().join("-"));
					const fromDateObj = new Date(fromDate.split("/").reverse().join("-"));

					// If to date is earlier than from date, set an error message
					if (toDateObj < fromDateObj) {
						setDateErrors((prev) => ({
							...prev,
							to: "End date cannot be earlier than start date",
						}));

						// Still update the value so the user can see what they typed
						update({
							...localValues,
							dateRange: {
								...localValues.dateRange,
								to: newToDate,
							},
						});
						return;
					}
				}

				// If we get here, the date is valid or the from date isn't set
				update({
					...localValues,
					dateRange: {
						...localValues.dateRange,
						to: newToDate,
					},
				});
			},
			[update, localValues],
		);

		const handleLeaveDaysCountChange = useCallback(
			(leaveDaysCount: string) => {
				update({ ...localValues, leaveDaysCount });
			},
			[update, localValues],
		);

		const leaveTypeOptions = useMemo(() => LEAVE_TYPE_OPTIONS, []);
		const statusOptions = useMemo(() => LEAVE_STATUS_OPTIONS, []);
		const locationOptions = useMemo(() => LOCATION_OPTIONS, []);
		const leaveDaysCountOptions = useMemo(() => LEAVE_DAYS_COUNT_OPTIONS, []);

		return (
			<div className="space-y-6">
				<MultiSelectFilter
					label="Leave Type"
					roles={leaveTypeOptions}
					selected={localValues.leaveTypes}
					onChange={handleLeaveTypesChange}
				/>

				<fieldset className="">
					<legend className="text-sm font-medium pb-3">Status</legend>
					<div className="space-y-3 pl-3">
						{statusOptions.map((option) => (
							<CheckboxField
								key={option.value}
								size="base"
								label={option.label}
								name={option.value}
								checked={localValues.status.includes(option.value)}
								onChange={(checked) =>
									handleStatusChange(option.value, checked)
								}
								aria-label={`Filter by ${option.label.toLowerCase()} status`}
							/>
						))}
					</div>
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
					label="Location"
					placeholder="Select location"
					options={locationOptions}
					value={localValues.location}
					onChange={handleLocationChange}
					ariaLabel="Location filter"
					triggerClassName="w-full"
				/>

				<div>
					<label
						htmlFor="dateRange"
						className="text-xs font-medium text-[hsl(var(--text-dark))]"
					>
						Date Range
					</label>
					<div className="flex gap-2">
						<InputField
							type="date"
							name="dateFrom"
							bgColor="bg-white"
							placeholder="From..."
							value={localValues.dateRange.from}
							onChange={handleDateFromChange}
							aria-label="Date range from"
							errorMessage={dateErrors.from}
						/>
						<InputField
							type="date"
							bgColor="bg-white"
							name="dateTo"
							placeholder="To..."
							value={localValues.dateRange.to}
							onChange={handleDateToChange}
							aria-label="Date range to"
							errorMessage={dateErrors.to}
							minDate={
								localValues.dateRange.from
									? new Date(
											localValues.dateRange.from.split("/").reverse().join("-"),
										)
									: undefined
							}
						/>
					</div>
				</div>

				<SelectInput
					name="leaveDaysCount"
					label="Leave Days Count"
					placeholder="Select Days..."
					options={leaveDaysCountOptions}
					value={localValues.leaveDaysCount}
					onChange={handleLeaveDaysCountChange}
					ariaLabel="Leave days count filter"
					triggerClassName="w-full"
				/>
			</div>
		);
	},
);

FilterLeaveRegister.displayName = "FilterLeaveRegister";
