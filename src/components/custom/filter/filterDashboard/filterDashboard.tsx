import { CheckboxField, SelectInput } from "@/components/base";
import { DEFAULT_STATUS_OPTIONS, LOCATION_OPTIONS } from "@/constants";
import type { AttendanceStatus, FilterDashboardProps } from "@/types";
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";

const FilterDashboard = forwardRef(
	(
		{ data, onChange, onApply, type = "onSubmit" }: FilterDashboardProps,
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
				const cleared = { location: "", status: [] };
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

		const handleStatusChange = useCallback(
			(status: AttendanceStatus, checked: boolean) => {
				const newStatus = checked
					? [...localValues.status, status]
					: localValues.status.filter((s) => s !== status);
				update({ ...localValues, status: newStatus });
			},
			[update, localValues],
		);

		const locationOptions = useMemo(() => LOCATION_OPTIONS, []);
		const statusOptions = useMemo(() => DEFAULT_STATUS_OPTIONS, []);

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

				<fieldset className="space-y-3 pl-3">
					<legend className="text-sm font-medium">Status</legend>
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
			</div>
		);
	},
);

FilterDashboard.displayName = "FilterDashboard";
export { FilterDashboard };
