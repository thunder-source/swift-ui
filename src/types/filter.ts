/**
 * Status types for attendance
 */
export type AttendanceStatus =
	| "Present"
	| "Absent"
	| "OnLeave"
	| "WFH"
	| "Late"
	| "ShortLeave"
	| "EarnLeave"
	| "SickLeave"
	| "CasualLeave"
	| "PBMA"
	| "WithoutInformationAbsent";

/**
 * Option interfaces for better type safety
 */
export interface SelectOption {
	value: string;
	label: string;
}

export interface StatusOption {
	value: AttendanceStatus;
	label: string;
}

/**
 * Form values interface
 */
export interface FilterDashboardValues {
	location: string;
	status: AttendanceStatus[];
}

/**
 * Component props interface
 */
export interface FilterDashboardProps {
	data: FilterDashboardValues;
	onChange: (data: FilterDashboardValues) => void;
	onApply?: (data: FilterDashboardValues) => void;
	type?: "onChange" | "onSubmit";
}

export type FilterVariant =
	| "userManagementAllEmployees"
	| "userManagementTeam"
	| "dashboard"
	| "attendanceManagement"
	| "leaveManagement"
	| "document"
	| "announcement"
	| "reportsModuleAttendanceSummary"
	| "reportsModuleLeaveRegister"
	| "reportsModuleEmployeeDirectory"
	| "reportsModuleSalaryOverview"
	| "myTeamEmployee";

export type FilterDataMap = {
	dashboard: FilterDashboardValues;
	userManagementAllEmployees: FilterAllEmployeesValues;
	userManagementTeam: FilterAllEmployeesValues;
	attendanceManagement: FilterAttendanceManagementValues;
	leaveManagement: FilterLeaveManagementValues;
	document: FilterDocumentValues;
	announcement: FilterAnnouncementValues;
	reportsModuleAttendanceSummary: FilterAttendanceSummaryValues;
	reportsModuleLeaveRegister: FilterLeaveRegisterValues;
	reportsModuleEmployeeDirectory: FilterEmployeeDirectoryValues;
	reportsModuleSalaryOverview: FilterSalaryOverviewValues;
	myTeamEmployee: FilterMyTeamValues;
};

export type FilterVariantWithData = keyof FilterDataMap;

export interface FilterProps<T extends FilterVariantWithData> {
	buttonLabel: string;
	variant: T;
	data: FilterDataMap[T];
	onChange: (data: FilterDataMap[T]) => void;
	onApply?: (data: FilterDataMap[T]) => void;
	type?: "onChange" | "onSubmit";
	button?: React.ReactNode;
}

// the shape of your form’s values
export interface FilterAllEmployeesValues {
	search: string;
	departments: string[]; // MultiSelectFilter for “Department”
	roles: string[]; // MultiSelectFilter for “Role”
	location: string; // SelectInput
	employeeStatus: string[]; // CheckboxField group
	accountStatus: string; // CheckboxField group
	biometricLinked: string; // CheckboxField group
	joiningDate: string; // InputField date
	dateOfBirth: string; // InputField date
}

// what the parent can call on your component
export interface FilterAllEmployeesHandles {
	submit: () => void; // trigger apply
	reset: () => void; // clear all filters
}

// props your component accepts
export interface FilterAllEmployeesProps {
	data: FilterAllEmployeesValues;
	onChange: (data: FilterAllEmployeesValues) => void;
	onApply?: (data: FilterAllEmployeesValues) => void;
	type?: "onChange" | "onSubmit";
}

// Announcement filter values
export interface FilterAnnouncementValues {
	targetAudience: string;
	status: string[];
	creator: string;
	announcementDate: string;
	containsAttachments: boolean;
	pushNotificationSent: boolean;
}

// Announcement filter props
export interface FilterAnnouncementProps {
	data: FilterAnnouncementValues;
	onChange: (data: FilterAnnouncementValues) => void;
	onApply?: (data: FilterAnnouncementValues) => void;
	type?: "onChange" | "onSubmit";
}

// Attendance Management filter values
export interface FilterAttendanceManagementValues {
	location: string;
	departmentTeam: "Department" | "Team" | "";
	status: AttendanceStatus[];
	punchSource: string[];
	lateArrivalsOnly: boolean;
	missingPunches: boolean;
}

// Attendance Management filter props
export interface FilterAttendanceManagementProps {
	data: FilterAttendanceManagementValues;
	onChange: (data: FilterAttendanceManagementValues) => void;
	onApply?: (data: FilterAttendanceManagementValues) => void;
	type?: "onChange" | "onSubmit";
}

// Leave Management filter values
export interface FilterLeaveManagementValues {
	leaveTypes: string[];
	status: string[];
	departmentTeam: "Department" | "Team" | "";
	location: string;
	submissionDate: string;
	carryForwardEligible: boolean;
	punchSource: string[];
	approver: string;
}

// Leave Management filter props
export interface FilterLeaveManagementProps {
	data: FilterLeaveManagementValues;
	onChange: (data: FilterLeaveManagementValues) => void;
	onApply?: (data: FilterLeaveManagementValues) => void;
	type?: "onChange" | "onSubmit";
}

// Document filter values
export interface FilterDocumentValues {
	documentTypes: string[];
	status: string[];
	expiryDateRange: {
		from: string;
		to: string;
	};
	uploadedDate: string;
	reviewedBy: string;
	expiredOnly: boolean;
}

// Document filter props
export interface FilterDocumentProps {
	data: FilterDocumentValues;
	onChange: (data: FilterDocumentValues) => void;
	onApply?: (data: FilterDocumentValues) => void;
	type?: "onChange" | "onSubmit";
}

// Attendance Summary filter values
export interface FilterAttendanceSummaryValues {
	location: string;
	departmentTeam: "Department" | "Team" | "";
	dateRange: {
		from: string;
		to: string;
	};
	status: string[];
}

// Attendance Summary filter props
export interface FilterAttendanceSummaryProps {
	data: FilterAttendanceSummaryValues;
	onChange: (data: FilterAttendanceSummaryValues) => void;
	onApply?: (data: FilterAttendanceSummaryValues) => void;
	type?: "onChange" | "onSubmit";
}

// Leave Register filter values
export interface FilterLeaveRegisterValues {
	leaveTypes: string[];
	status: string[];
	departmentTeam: "Department" | "Team" | "";
	location: string;
	dateRange: {
		from: string;
		to: string;
	};
	leaveDaysCount: string;
}

// Leave Register filter props
export interface FilterLeaveRegisterProps {
	data: FilterLeaveRegisterValues;
	onChange: (data: FilterLeaveRegisterValues) => void;
	onApply?: (data: FilterLeaveRegisterValues) => void;
	type?: "onChange" | "onSubmit";
}

// Employee Directory filter values
export interface FilterEmployeeDirectoryValues {
	employeeStatus: string[];
	departmentTeam: "Department" | "Team" | "";
	location: string;
	joiningDate: {
		from: string;
		to: string;
	};
	employeeType: string;
}

// Employee Directory filter props
export interface FilterEmployeeDirectoryProps {
	data: FilterEmployeeDirectoryValues;
	onChange: (data: FilterEmployeeDirectoryValues) => void;
	onApply?: (data: FilterEmployeeDirectoryValues) => void;
	type?: "onChange" | "onSubmit";
}

// Salary Overview filter values
export interface FilterSalaryOverviewValues {
	department: "HR" | "Sales" | "IT" | "";
	location: string;
	employeeType: string;
	currencies: string[];
	salaryRange: {
		from: string;
		to: string;
	};
	dateRange: {
		from: string;
		to: string;
	};
}

// Salary Overview filter props
export interface FilterSalaryOverviewProps {
	data: FilterSalaryOverviewValues;
	onChange: (data: FilterSalaryOverviewValues) => void;
	onApply?: (data: FilterSalaryOverviewValues) => void;
	type?: "onChange" | "onSubmit";
}

// My Team filter values
export interface FilterMyTeamValues {
	employeeStatus: string[];
}

// My Team filter props
export interface FilterMyTeamProps {
	data: FilterMyTeamValues;
	onChange: (data: FilterMyTeamValues) => void;
	onApply?: (data: FilterMyTeamValues) => void;
	type?: "onChange" | "onSubmit";
}

// if you use a variant‐to‐data mapping:
// Uniform handle interface
export type FilterHandles = {
	submit: () => void;
	reset: () => void;
};
