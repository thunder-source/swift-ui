export interface AllEmployeeTableData {
	id: string;
	name: string;
	department: string;
	amount: number;
	status: "confirm" | "Probation";
	email: string;
	employeeId: string;
	role: string;
	location: string;
	dateOfBirth: string;
	action: "Active" | "inactive";
	joiningDate: string;
	employeeStatus: "Active" | "inactive";
}

export interface DocumentTableDataProp {
	id: string;
	name: string;
	idNumber: number;
	expiryDate: string;
	status: "Approved" | "Pending" | "Rejected";
}

export interface PeopleTableData {
	id: string;
	name: string;
	department: string;

	status: "confirm" | "Probation";
	email: string;
	employeeId: string;
	role: string;

	action: "Active" | "inactive";

	employeeStatus: "Active" | "inactive";
}

export interface MyTeamTableDataProp {
	id: string;
	name: string;
	department: string;
	phoneNumber: number;

	email: string;
	employeeId: string;
	role: string;

	employeeStatus: "Confirm" | "Probation";
}

export interface AttendanceOverviewTableData {
	id: string;
	date: string;
	punchIn: string;
	punchOut: string;
	totalHours: string;
	payableHour: string;
	status: "On Time" | "Absent" | "Late" | "Leave";
}

export interface EmployeeExpiryAlertTableData {
	id: string;
	name: string;
	idNumber: number;
	status: "Approved" | "Pending" | "Near Expiry";
	documentType: string;
}

export interface AttendanceOverviewTableData {
	id: string;
	date: string;
	punchIn: string;
	punchOut: string;
	totalHours: string;
	payableHour: string;
	status: "On Time" | "Absent" | "Late" | "Leave";
}

export interface EmployeeExpiryAlertTableData {
	id: string;
	name: string;
	idNumber: number;
	status: "Approved" | "Pending" | "Near Expiry";
	documentType: string;
}

export interface TeamsTableData {
	id: string;
	team: string;
	department: string;
	managerName: string;
	employeeId: string;
	activeCount: number;
	inactiveCount: number;
	teamCount: number;
	ManagerRole: string;
	location: string;
	employeeStatus: "Active" | "inactive";
}

export interface AttendanceTableData {
	id: string;
	name: string;
	date: string;
	email: string;

	checkIn: string;
	checkOut: string;
	location: string;

	action: "Present" | "Absent";

	employeeStatus: "Present" | "Absent";
}

export interface AttendanceTableDataEmployee {
	id: string;
	date: string;
	punchIn: string;
	punchOut: string;
	totalHours: string;
	payableHour: string;
	status: "On Time" | "Absent" | "Late" | "Leave" | "WFH";
}

export interface RegularizationRequestTableProps {
	id: string;
	dateRequestRaised: string;
	dateRequestfor: string;
	punchIn: string;
	punchOut: string;
	reason: string;
	status: "Approve" | "Pending" | "Reject";
}

export interface leaveTableData {
	id: string;
	email: string;
	name: string;
	startDate: string;
	endDate: string;
	totalLeave: number;
	reason: string;
	leaveType: string;
	action: "Approved" | "Rejected" | "Pending";
}
