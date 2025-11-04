import type {
	FilterAnnouncementValues,
	FilterAttendanceManagementValues,
	FilterAttendanceSummaryValues,
	FilterDashboardValues,
	FilterDocumentValues,
	FilterEmployeeDirectoryValues,
	FilterLeaveManagementValues,
	FilterLeaveRegisterValues,
	FilterMyTeamValues,
	FilterSalaryOverviewValues,
} from "@/types";
import type { FilterAllEmployeesValues } from "@/types"; // ← import your AllEmployees values type
import { typedOnChange } from "@/utils";
import { action } from "@storybook/addon-actions";
import type { Meta } from "@storybook/react";
import { useState } from "react";
import type { ComponentProps } from "react";
import { Filter } from "./filter";

const meta: Meta<typeof Filter> = {
	title: "Custom/Filter",
	component: Filter,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		buttonLabel: {
			control: "text",
			description: "Label shown on the trigger button",
		},
		variant: {
			control: "select",
			options: [
				"userManagementAllEmployees",
				"userManagementTeam",
				"dashboard",
				"attendanceManagement",
				"leaveManagement",
				"document",
				"announcement",
				"reportsModuleAttendanceSummary",
				"reportsModuleLeaveRegister",
				"reportsModuleEmployeeDirectory",
				"reportsModuleSalaryOverview",
				"myTeamEmployee",
			],
			description: "Filter content and button style",
		},
	},
};

export default meta;

// ─── AllEmployees (refactored) ────────────────────────────────────────────────

// We're now using the typedOnChange utility function from @/utils

const AllEmployeesTemplate = (args: ComponentProps<typeof Filter>) => {
	const [values, setValues] = useState<FilterAllEmployeesValues>({
		search: "",
		departments: [],
		roles: [],
		location: "",
		employeeStatus: [],
		accountStatus: "",
		biometricLinked: "",
		joiningDate: "",
		dateOfBirth: "",
	});

	// Use our type-safe wrapper function
	const handleChange = typedOnChange<"userManagementAllEmployees">(setValues);

	return (
		<Filter
			{...args}
			buttonLabel="Filter Employees"
			variant="userManagementAllEmployees"
			data={values}
			onChange={handleChange}
			onApply={action("onApply")}
		/>
	);
};

export const AllEmployees = AllEmployeesTemplate.bind({});

// ─── Dashboard ───────────────────────────────────────────────────────────────

const DashboardTemplate = (args: ComponentProps<typeof Filter>) => {
	const [values, setValues] = useState<FilterDashboardValues>({
		location: "",
		status: [],
	});

	// Use our type-safe wrapper function
	const handleChange = typedOnChange<"dashboard">(setValues);

	return (
		<Filter
			{...args}
			buttonLabel="Filter Dashboard"
			variant="dashboard"
			data={values}
			onChange={handleChange}
			onApply={action("onApply")}
		/>
	);
};
export const DashboardFilter = DashboardTemplate.bind({});

// ─── Attendance Management ───────────────────────────────────────────────────────

const AttendanceTemplate = (args: ComponentProps<typeof Filter>) => {
	const [values, setValues] = useState<FilterAttendanceManagementValues>({
		location: "",
		departmentTeam: "",
		status: [],
		punchSource: [],
		lateArrivalsOnly: false,
		missingPunches: false,
	});

	// Use our type-safe wrapper function
	const handleChange = typedOnChange<"attendanceManagement">(setValues);

	return (
		<Filter
			{...args}
			buttonLabel="Attendance Filter"
			variant="attendanceManagement"
			data={values}
			onChange={handleChange}
			onApply={action("onApply")}
		/>
	);
};

export const AttendanceFilter = AttendanceTemplate.bind({});

// ─── Leave Management ───────────────────────────────────────────────────────

const LeaveManagementTemplate = (args: ComponentProps<typeof Filter>) => {
	const [values, setValues] = useState<FilterLeaveManagementValues>({
		leaveTypes: [],
		status: [],
		departmentTeam: "",
		location: "",
		submissionDate: "",
		carryForwardEligible: false,
		punchSource: [],
		approver: "",
	});

	// Use our type-safe wrapper function
	const handleChange = typedOnChange<"leaveManagement">(setValues);

	return (
		<Filter
			{...args}
			buttonLabel="Leave Filter"
			variant="leaveManagement"
			data={values}
			onChange={handleChange}
			onApply={action("onApply")}
		/>
	);
};

export const LeaveFilter = LeaveManagementTemplate.bind({});

// ─── Document Filter ───────────────────────────────────────────────────────

const DocumentFilterTemplate = (args: ComponentProps<typeof Filter>) => {
	const [values, setValues] = useState<FilterDocumentValues>({
		documentTypes: [],
		status: [],
		expiryDateRange: {
			from: "",
			to: "",
		},
		uploadedDate: "",
		reviewedBy: "",
		expiredOnly: false,
	});

	// Use our type-safe wrapper function
	const handleChange = typedOnChange<"document">(setValues);

	return (
		<Filter
			{...args}
			buttonLabel="Document Filter"
			variant="document"
			data={values}
			onChange={handleChange}
			onApply={action("onApply")}
		/>
	);
};

export const DocumentFilter = DocumentFilterTemplate.bind({});

// ─── Announcement ───────────────────────────────────────────────────────────────

const AnnouncementTemplate = (args: ComponentProps<typeof Filter>) => {
	const [values, setValues] = useState<FilterAnnouncementValues>({
		targetAudience: "",
		status: [],
		creator: "",
		announcementDate: "",
		containsAttachments: false,
		pushNotificationSent: false,
	});

	// Use our type-safe wrapper function
	const handleChange = typedOnChange<"announcement">(setValues);

	return (
		<Filter
			{...args}
			buttonLabel="Announcement Filter"
			variant="announcement"
			data={values}
			onChange={handleChange}
			onApply={action("onApply")}
		/>
	);
};

export const AnnouncementFilter = AnnouncementTemplate.bind({});

// ─── Attendance Summary ───────────────────────────────────────────────────────

const AttendanceSummaryTemplate = (args: ComponentProps<typeof Filter>) => {
	const [values, setValues] = useState<FilterAttendanceSummaryValues>({
		location: "",
		departmentTeam: "",
		dateRange: {
			from: "",
			to: "",
		},
		status: [],
	});

	// Use our type-safe wrapper function
	const handleChange =
		typedOnChange<"reportsModuleAttendanceSummary">(setValues);

	return (
		<Filter
			{...args}
			buttonLabel="Attendance Summary"
			variant="reportsModuleAttendanceSummary"
			data={values}
			onChange={handleChange}
			onApply={action("onApply")}
		/>
	);
};

export const AttendanceSummary = AttendanceSummaryTemplate.bind({});

// ─── Leave Register ───────────────────────────────────────────────────────

const LeaveRegisterTemplate = (args: ComponentProps<typeof Filter>) => {
	const [values, setValues] = useState<FilterLeaveRegisterValues>({
		leaveTypes: [],
		status: [],
		departmentTeam: "",
		location: "",
		dateRange: {
			from: "",
			to: "",
		},
		leaveDaysCount: "",
	});

	// Use our type-safe wrapper function
	const handleChange = typedOnChange<"reportsModuleLeaveRegister">(setValues);

	return (
		<Filter
			{...args}
			buttonLabel="Leave Register"
			variant="reportsModuleLeaveRegister"
			data={values}
			onChange={handleChange}
			onApply={action("onApply")}
		/>
	);
};

export const LeaveRegister = LeaveRegisterTemplate.bind({});

// ─── Employee Directory ───────────────────────────────────────────────────────

const EmployeeDirectoryTemplate = (args: ComponentProps<typeof Filter>) => {
	const [values, setValues] = useState<FilterEmployeeDirectoryValues>({
		employeeStatus: [],
		departmentTeam: "",
		location: "",
		joiningDate: {
			from: "",
			to: "",
		},
		employeeType: "",
	});

	// Use our type-safe wrapper function
	const handleChange =
		typedOnChange<"reportsModuleEmployeeDirectory">(setValues);

	return (
		<Filter
			{...args}
			buttonLabel="Employee Directory"
			variant="reportsModuleEmployeeDirectory"
			data={values}
			onChange={handleChange}
			onApply={action("onApply")}
		/>
	);
};

export const EmployeeDirectory = EmployeeDirectoryTemplate.bind({});

// ─── Salary Overview ───────────────────────────────────────────────────────

const SalaryOverviewTemplate = (args: ComponentProps<typeof Filter>) => {
	const [values, setValues] = useState<FilterSalaryOverviewValues>({
		department: "",
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
	});

	// Use our type-safe wrapper function
	const handleChange = typedOnChange<"reportsModuleSalaryOverview">(setValues);

	return (
		<Filter
			{...args}
			buttonLabel="Salary Overview"
			variant="reportsModuleSalaryOverview"
			data={values}
			onChange={handleChange}
			onApply={action("onApply")}
		/>
	);
};

export const SalaryOverview = SalaryOverviewTemplate.bind({});

// ─── My Team ───────────────────────────────────────────────────────

const MyTeamTemplate = (args: ComponentProps<typeof Filter>) => {
	const [values, setValues] = useState<FilterMyTeamValues>({
		employeeStatus: [],
	});

	// Use our type-safe wrapper function
	const handleChange = typedOnChange<"myTeamEmployee">(setValues);

	return (
		<Filter
			{...args}
			buttonLabel="My Team"
			variant="myTeamEmployee"
			data={values}
			onChange={handleChange}
			onApply={action("onApply")}
		/>
	);
};

export const MyTeam = MyTeamTemplate.bind({});
