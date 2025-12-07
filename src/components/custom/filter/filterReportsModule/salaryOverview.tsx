import { CheckboxField, InputField, SelectInput } from "@/components/base";
import { MultiSelectFilter } from "@/components/custom";
import { Slider } from "@/components/ui";
import { DEPARTMENT_OPTIONS, LOCATION_OPTIONS } from "@/constants/filter";
import type {
	FilterSalaryOverviewProps,
	FilterSalaryOverviewValues,
	FilterHandles,
} from "@/types/filter";
import { typedOnChange } from "@/utils/typeUtils";
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";

export const FilterSalaryOverview = forwardRef<
	FilterHandles,
	FilterSalaryOverviewProps
>(
	(
		{ data, onChange, onApply, type = "onSubmit" }: FilterSalaryOverviewProps,
		ref,
	) => {
		const [localValues, setLocalValues] = useState(data);
		const [salaryRange, setSalaryRange] = useState<[number, number]>([
			localValues.salaryRange.from ? Number(localValues.salaryRange.from) : 0,
			localValues.salaryRange.to ? Number(localValues.salaryRange.to) : 100,
		]);

		// Currency options
		const currencyOptions = ["USD", "EUR", "GBP", "INR", "JPY"];

		// Sync values if type is onChange OR values prop changes
		useEffect(() => {
			if (type === "onChange") {
				setLocalValues(data);
				setSalaryRange([
					data.salaryRange.from ? Number(data.salaryRange.from) : 0,
					data.salaryRange.to ? Number(data.salaryRange.to) : 100,
				]);
			}
		}, [data, type]);

		// Expose submit function to parent
		useImperativeHandle(ref, () => ({
			submit: () => {
				onChange(localValues);
				onApply?.(localValues);
			},
			reset: () => {
				// Explicitly type the cleared object to match FilterSalaryOverviewValues
				const cleared: FilterSalaryOverviewValues = {
					department: "", // This is now correctly typed as "HR" | "Sales" | "IT" | ""
					location: "",
					employeeType: "",
					currencies: [],
					salaryRange: {
						from: "",
						to: "",
					},
					dateRange: {
						from: "",
						to: "",
					},
				};

				// Reset salary range slider
				setSalaryRange([0, 100]);

				// No date errors to clear in this version

				if (type === "onChange") {
					onChange(cleared);
					onApply?.(cleared);
				} else {
					setLocalValues(cleared);
				}
			},
		}));

		// Use the typedOnChange utility function to handle type-safe updates
		const handleChange =
			typedOnChange<"reportsModuleSalaryOverview">(setLocalValues);

		const update = useCallback(
			(newValues: typeof data) => {
				if (type === "onChange") {
					onChange(newValues);
					onApply?.(newValues);
				} else {
					// Use the type-safe handler
					handleChange(newValues);
				}
			},
			[onChange, onApply, type, handleChange],
		);

		const handleDepartmentTeamChange = useCallback(
			(department: "HR" | "Sales" | "IT" | "") => {
				update({ ...localValues, department });
			},
			[update, localValues],
		);

		const handleLocationChange = useCallback(
			(location: string) => {
				update({ ...localValues, location });
			},
			[update, localValues],
		);

		const handleCurrenciesChange = useCallback(
			(currencies: string[]) => {
				update({ ...localValues, currencies });
			},
			[update, localValues],
		);

		const handleSalaryMinChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				const newMin = Number(e.target.value);
				const max = salaryRange[1];

				// Ensure min value is not greater than max
				if (newMin <= max) {
					setSalaryRange([newMin, max]);
					update({
						...localValues,
						salaryRange: {
							...localValues.salaryRange,
							from: String(newMin),
						},
					});
				} else {
					// If min is greater than max, set both to min
					setSalaryRange([max, max]);
					update({
						...localValues,
						salaryRange: {
							...localValues.salaryRange,
							from: String(max),
						},
					});
				}
			},
			[update, localValues, salaryRange],
		);

		const handleSalaryMaxChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				const min = salaryRange[0];
				const newMax = Number(e.target.value);

				// Ensure max value is not less than min
				if (newMax >= min) {
					setSalaryRange([min, newMax]);
					update({
						...localValues,
						salaryRange: {
							...localValues.salaryRange,
							to: String(newMax),
						},
					});
				} else {
					// If max is less than min, set both to max
					setSalaryRange([newMax, newMax]);
					update({
						...localValues,
						salaryRange: {
							...localValues.salaryRange,
							to: String(newMax),
							from: String(newMax),
						},
					});
				}
			},
			[update, localValues, salaryRange],
		);

		const handleSliderChange = useCallback(
			(val: [number, number]) => {
				setSalaryRange(val);
				update({
					...localValues,
					salaryRange: {
						from: String(val[0]),
						to: String(val[1]),
					},
				});
			},
			[update, localValues],
		);

		const handleDateChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				const newDate = e.target.value;

				update({
					...localValues,
					dateRange: {
						...localValues.dateRange,
						from: newDate,
					},
				});
			},
			[update, localValues],
		);

		const locationOptions = useMemo(() => LOCATION_OPTIONS, []);

		return (
			<div className="space-y-6">
				<fieldset className="space-y-2">
					<legend className="text-sm font-medium pb-2">Department</legend>
					<div className="flex gap-4 pl-3">
						{DEPARTMENT_OPTIONS.map((option) => (
							<CheckboxField
								key={option}
								name={option.toLowerCase()}
								label={option}
								size="base"
								checked={localValues.department === option}
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

				<MultiSelectFilter
					label="Currency"
					roles={currencyOptions}
					selected={localValues.currencies}
					onChange={handleCurrenciesChange}
				/>

				<div>
					<label
						htmlFor="salaryRange"
						className="text-sm font-medium text-[hsl(var(--text-dark))]"
					>
						Salary Range
					</label>
					<div className="flex gap-4">
						<InputField
							name="salaryMin"
							bgColor="bg-white"
							placeholder="Min"
							value={String(salaryRange[0])}
							onChange={handleSalaryMinChange}
							aria-label="Minimum salary"
						/>

						<InputField
							name="salaryMax"
							placeholder="Max"
							value={String(salaryRange[1])}
							bgColor="bg-white"
							onChange={handleSalaryMaxChange}
							aria-label="Maximum salary"
						/>
					</div>
					<Slider
						value={salaryRange}
						onValueChange={handleSliderChange}
						aria-label="Salary range slider"
					/>
				</div>

				<div>
					<InputField
						type="date"
						name="date"
						bgColor="bg-white"
						placeholder="Select..."
						label="Effective From"
						value={localValues.dateRange.from}
						onChange={handleDateChange}
						aria-label="Effective from date"
					/>
				</div>
			</div>
		);
	},
);

FilterSalaryOverview.displayName = "FilterSalaryOverview";
