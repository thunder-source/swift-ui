import { CheckboxField, InputField, SelectInput } from "@/components/base";
import { MultiSelectFilter } from "@/components/custom";
import {
	DOCUMENT_STATUS_OPTIONS,
	DOCUMENT_TYPE_OPTIONS,
	REVIEWER_OPTIONS,
} from "@/constants";
import type { FilterDocumentProps, FilterHandles } from "@/types";
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";

export const FilterDocument = forwardRef<FilterHandles, FilterDocumentProps>(
	(
		{ data, onChange, onApply, type = "onSubmit" }: FilterDocumentProps,
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
					documentTypes: [] as string[],
					status: [] as string[],
					expiryDateRange: {
						from: "",
						to: "",
					},
					uploadedDate: "",
					reviewedBy: "",
					expiredOnly: false,
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

		const handleDocumentTypeChange = useCallback(
			(docType: string, checked: boolean) => {
				const newDocTypes = checked
					? [...localValues.documentTypes, docType]
					: localValues.documentTypes.filter((dt) => dt !== docType);
				update({ ...localValues, documentTypes: newDocTypes });
			},
			[update, localValues],
		);

		const handleStatusChange = useCallback(
			(status: string[]) => {
				update({ ...localValues, status });
			},
			[update, localValues],
		);

		const handleExpiryDateFromChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				update({
					...localValues,
					expiryDateRange: {
						...localValues.expiryDateRange,
						from: e.target.value,
					},
				});
			},
			[update, localValues],
		);

		const handleExpiryDateToChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				update({
					...localValues,
					expiryDateRange: {
						...localValues.expiryDateRange,
						to: e.target.value,
					},
				});
			},
			[update, localValues],
		);

		const handleUploadedDateChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				update({ ...localValues, uploadedDate: e.target.value });
			},
			[update, localValues],
		);

		const handleReviewedByChange = useCallback(
			(reviewedBy: string) => {
				update({ ...localValues, reviewedBy });
			},
			[update, localValues],
		);

		const handleExpiredOnlyChange = useCallback(
			(checked: boolean) => {
				update({ ...localValues, expiredOnly: checked });
			},
			[update, localValues],
		);

		const documentTypeOptions = useMemo(() => DOCUMENT_TYPE_OPTIONS, []);
		const documentStatusOptions = useMemo(() => DOCUMENT_STATUS_OPTIONS, []);
		const reviewerOptions = useMemo(() => REVIEWER_OPTIONS, []);

		return (
			<div className="space-y-6">
				<fieldset className="space-y-3">
					<legend className="text-sm font-medium">Document Type</legend>
					<div className="space-y-3 pl-3">
						{documentTypeOptions.map((docType) => (
							<CheckboxField
								key={docType}
								size="base"
								label={docType}
								name={docType}
								checked={localValues.documentTypes.includes(docType)}
								onChange={(checked) =>
									handleDocumentTypeChange(docType, checked)
								}
								aria-label={`Filter by ${docType.toLowerCase()} document type`}
							/>
						))}
					</div>
				</fieldset>

				<MultiSelectFilter
					label="Status"
					roles={documentStatusOptions}
					selected={localValues.status}
					onChange={handleStatusChange}
				/>

				<div>
					<label
						htmlFor="expiryDateRange"
						className="text-xs font-medium text-[hsl(var(--text-dark))]"
					>
						Expiry Date Range
					</label>
					<div className="flex gap-2">
						<InputField
							type="date"
							name="expiryDateFrom"
							bgColor="bg-white"
							placeholder="From..."
							value={localValues.expiryDateRange.from}
							onChange={handleExpiryDateFromChange}
							aria-label="Expiry date range from"
						/>
						<InputField
							type="date"
							bgColor="bg-white"
							name="expiryDateTo"
							placeholder="To..."
							value={localValues.expiryDateRange.to}
							onChange={handleExpiryDateToChange}
							aria-label="Expiry date range to"
						/>
					</div>
				</div>

				<InputField
					bgColor="bg-white"
					type="date"
					name="uploadedDate"
					label="Uploaded Date"
					value={localValues.uploadedDate}
					onChange={handleUploadedDateChange}
					aria-label="Document uploaded date filter"
				/>

				<SelectInput
					name="reviewedBy"
					label="Reviewed by"
					placeholder="Select reviewer..."
					options={reviewerOptions}
					value={localValues.reviewedBy}
					onChange={handleReviewedByChange}
					ariaLabel="Reviewer filter"
					triggerClassName="w-full"
				/>

				<CheckboxField
					name="expiredOnly"
					single
					label="Expired Only"
					placeHolder="View expired doc..."
					checked={localValues.expiredOnly}
					onChange={handleExpiredOnlyChange}
					aria-label="Filter for expired documents only"
				/>
			</div>
		);
	},
);

FilterDocument.displayName = "FilterDocument";
