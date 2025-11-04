import type { SelectOption, StatusOption } from "@/types";

/**
 * Default status options for attendance filtering
 */
export const DEFAULT_STATUS_OPTIONS: StatusOption[] = [
	{ value: "Present", label: "Present" },
	{ value: "Absent", label: "Absent" },
	{ value: "OnLeave", label: "On Leave" },
	{ value: "WFH", label: "WFH" },
	{ value: "Late", label: "Late" },
	{ value: "ShortLeave", label: "Short Leave" },
	{ value: "EarnLeave", label: "Earn Leave" },
	{ value: "SickLeave", label: "Sick Leave" },
	{ value: "CasualLeave", label: "Casual Leave" },
	{ value: "PBMA", label: "Present But Marked Absent (PBMA)" },
	{ value: "WithoutInformationAbsent", label: "Without Information Absent" },
];

/**
 * Location options for attendance filtering
 */
export const LOCATION_OPTIONS: SelectOption[] = [
	{ value: "Bangalore", label: "Bangalore" },
	{ value: "Chennai", label: "Chennai" },
	{ value: "Delhi", label: "Delhi" },
	{ value: "Hyderabad", label: "Hyderabad" },
	{ value: "Kolkata", label: "Kolkata" },
	{ value: "Mumbai", label: "Mumbai" },
	{ value: "Pune", label: "Pune" },
];

// src/constants.ts
export const EMPLOYEE_STATUS_OPTIONS = [
	"Confirmed",
	"Probation",
	"Resigned",
	"Terminated",
] as const;

export const ACCOUNT_STATUS_OPTIONS = ["Active", "Inactive"] as const;

export const CONFIRMATION_OPTIONS = ["Yes", "No"] as const;

/**
 * Announcement status options
 */
export const ANNOUNCEMENT_STATUS_OPTIONS: SelectOption[] = [
	{ value: "Live", label: "Live" },
	{ value: "Archived", label: "Archived" },
	{ value: "Scheduled", label: "Scheduled" },
];

/**
 * Target audience options for announcements
 */
export const TARGET_AUDIENCE_OPTIONS: SelectOption[] = [
	{ value: "SelectAudience1", label: "Select audience 1" },
	{ value: "SelectAudience2", label: "Select audience 2" },
];

/**
 * Creator options for announcements
 */
export const CREATOR_OPTIONS: SelectOption[] = [
	{ value: "CreatedBy1", label: "Created by 1" },
	{ value: "CreatedBy2", label: "Created by 2" },
];

/**
 * Punch source options for attendance
 */
export const PUNCH_SOURCE_OPTIONS: string[] = ["Biometric", "Mobile", "Manual"];

/**
 * Department/Team options
 */
export const DEPARTMENT_TEAM_OPTIONS = ["Department", "Team"] as const;

/**
 * Department options
 */
export const DEPARTMENT_OPTIONS = ["HR", "Sales", "IT"] as const;

/**
 * Leave type options
 */
export const LEAVE_TYPE_OPTIONS: string[] = ["Paid", "Sick", "Casual", "WFH"];

/**
 * Leave status options
 */
export const LEAVE_STATUS_OPTIONS: SelectOption[] = [
	{ value: "Pending", label: "Pending" },
	{ value: "Approved", label: "Approved" },
	{ value: "Rejected", label: "Rejected" },
	{ value: "Cancelled", label: "Cancelled" },
];

/**
 * My Team status options
 */
export const MY_TEAM_STATUS_OPTIONS = [
	{ value: "Confirmed", label: "Confirmed" },
	{ value: "Probation", label: "Probation" },
	{ value: "Resigned", label: "Resigned" },
	{ value: "Terminated", label: "Terminated" },
] as const;

/**
 * Approver options
 */
export const APPROVER_OPTIONS: SelectOption[] = [
	{ value: "approver1", label: "Approver 1" },
	{ value: "approver2", label: "Approver 2" },
];

/**
 * Document type options
 */
export const DOCUMENT_TYPE_OPTIONS: string[] = [
	"Passport",
	"Visa",
	"ID Proof",
	"Offer Letter",
];

/**
 * Document status options
 */
export const DOCUMENT_STATUS_OPTIONS: string[] = [
	"Pending",
	"Approved",
	"Rejected",
];

/**
 * Reviewer options
 */
export const REVIEWER_OPTIONS: SelectOption[] = [
	{ value: "SelectReviewer1", label: "Select reviewer 1" },
	{ value: "SelectReviewer2", label: "Select reviewer 2" },
];

/**
 * Attendance status options
 */
export const ATTENDANCE_STATUS_OPTIONS: string[] = [
	"Present",
	"Absent",
	"Late",
];

/**
 * Leave days count options
 */
export const LEAVE_DAYS_COUNT_OPTIONS: SelectOption[] = [
	{ value: "all", label: "All" },
	{ value: "1", label: "1 Day" },
	{ value: "2", label: "2 Days" },
	{ value: "3", label: "3 Days" },
	{ value: "4+", label: "4+ Days" },
];

/**
 * Employee directory status options
 */
export const EMPLOYEE_DIRECTORY_STATUS_OPTIONS: string[] = [
	"Active",
	"Inactive",
	"On Notice",
	"On Leave",
];

/**
 * Employee type options
 */
export const EMPLOYEE_TYPE_OPTIONS: SelectOption[] = [
	{ value: "fullTime", label: "Full Time" },
	{ value: "partTime", label: "Part Time" },
	{ value: "contract", label: "Contract" },
	{ value: "intern", label: "Intern" },
];
