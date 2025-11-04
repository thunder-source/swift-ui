import { CheckboxField, InputField, SelectInput } from "@/components/base";
import {
	ANNOUNCEMENT_STATUS_OPTIONS,
	CREATOR_OPTIONS,
	TARGET_AUDIENCE_OPTIONS,
} from "@/constants";
import type { FilterAnnouncementProps } from "@/types";
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";

export const FilterAnnouncement = forwardRef(
	(
		{ data, onChange, onApply, type = "onSubmit" }: FilterAnnouncementProps,
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
					targetAudience: "",
					status: [],
					creator: "",
					announcementDate: "",
					containsAttachments: false,
					pushNotificationSent: false,
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

		const handleTargetAudienceChange = useCallback(
			(targetAudience: string) => {
				update({ ...localValues, targetAudience });
			},
			[update, localValues],
		);

		const handleCreatorChange = useCallback(
			(creator: string) => {
				update({ ...localValues, creator });
			},
			[update, localValues],
		);

		const handleAnnouncementDateChange = useCallback(
			(announcementDate: string) => {
				update({ ...localValues, announcementDate });
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

		const handleAttachmentsChange = useCallback(
			(containsAttachments: boolean) => {
				update({ ...localValues, containsAttachments });
			},
			[update, localValues],
		);

		const handlePushNotificationChange = useCallback(
			(pushNotificationSent: boolean) => {
				update({ ...localValues, pushNotificationSent });
			},
			[update, localValues],
		);

		const targetAudienceOptions = useMemo(() => TARGET_AUDIENCE_OPTIONS, []);
		const creatorOptions = useMemo(() => CREATOR_OPTIONS, []);
		const statusOptions = useMemo(() => ANNOUNCEMENT_STATUS_OPTIONS, []);

		return (
			<div className="space-y-6">
				<SelectInput
					name="targetAudience"
					label="Target Audience"
					placeholder="Select Audience..."
					options={targetAudienceOptions}
					value={localValues.targetAudience}
					onChange={handleTargetAudienceChange}
					ariaLabel="Target audience filter"
					triggerClassName="w-full"
				/>

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

				<SelectInput
					name="creator"
					label="Creator"
					placeholder="Posted by..."
					options={creatorOptions}
					value={localValues.creator}
					onChange={handleCreatorChange}
					ariaLabel="Creator filter"
					triggerClassName="w-full"
				/>

				<InputField
					type="date"
					name="announcementDate"
					bgColor="bg-white"
					placeholder="Select Date..."
					label="Announcement Date"
					value={localValues.announcementDate}
					onChange={(e) => handleAnnouncementDateChange(e.target.value)}
					aria-label="Announcement date filter"
				/>

				<fieldset className="space-y-2">
					<legend className="text-sm font-medium pb-2">
						Contains Attachments
					</legend>
					<div className="flex gap-4 pl-3">
						<CheckboxField
							name="attachmentsYes"
							label="Yes"
							size="base"
							checked={localValues.containsAttachments === true}
							onChange={() => handleAttachmentsChange(true)}
							aria-label="Filter for announcements with attachments"
						/>
						<CheckboxField
							name="attachmentsNo"
							label="No"
							size="base"
							checked={localValues.containsAttachments === false}
							onChange={() => handleAttachmentsChange(false)}
							aria-label="Filter for announcements without attachments"
						/>
					</div>
				</fieldset>

				<fieldset className="space-y-2">
					<legend className="text-sm font-medium pb-2">
						Push Notification Sent
					</legend>
					<div className="flex gap-4 pl-3">
						<CheckboxField
							name="notificationYes"
							label="Yes"
							size="base"
							checked={localValues.pushNotificationSent === true}
							onChange={() => handlePushNotificationChange(true)}
							aria-label="Filter for announcements with push notifications"
						/>
						<CheckboxField
							name="notificationNo"
							label="No"
							size="base"
							checked={localValues.pushNotificationSent === false}
							onChange={() => handlePushNotificationChange(false)}
							aria-label="Filter for announcements without push notifications"
						/>
					</div>
				</fieldset>
			</div>
		);
	},
);

FilterAnnouncement.displayName = "FilterAnnouncement";
