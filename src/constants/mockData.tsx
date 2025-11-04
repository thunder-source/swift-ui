import type {
	AnnouncementTableItem,
	BirthdayMember,
	EmployeeData,
	HolidayMember,
	NotificationCardProps,
} from "@/components";
import type {
	AllEmployeeTableData,
	AttendanceOverviewTableData,
	AttendanceTableData,
	AttendanceTableDataEmployee,
	DocumentTableDataProp,
	EmployeeExpiryAlertTableData,
	MyTeamTableDataProp,
	RegularizationRequestTableProps,
	TeamsTableData,
	leaveTableData,
} from "@/types/table";
import {
	AlarmClock,
	CalendarClock,
	CalendarSearch,
	Plus,
	TrendingDown,
	TrendingUp,
	UserCheck,
	UserX,
	Users,
} from "lucide-react";
import type { ReactNode } from "react";

/**
 * Stat card data for dashboard
 */
export const DASHBOARD_STAT_CARDS: Array<{
	count: number;
	label: string;
	icon: ReactNode;
	note: string;
	noteIcon?: ReactNode;
	noteColor?: "success" | "danger";
}> = [
	{
		count: 452,
		label: "Total Employees",
		icon: <Users />,
		noteIcon: <Plus size={16} />,
		note: "2 new employees added!",
		noteColor: "success",
	},
	{
		count: 410,
		label: "Present Today",
		icon: <UserCheck />,
		noteIcon: <TrendingUp size={16} />,
		note: "10% increase than Yesterday",
		noteColor: "success",
	},
	{
		count: 100,
		label: "On Leave",
		icon: <UserX />,
		noteColor: "danger",
		noteIcon: <TrendingDown size={16} />,
		note: "2% Less than Yesterday",
	},
	{
		count: 100,
		label: "Absent",
		icon: <UserX />,
		noteColor: "danger",
		noteIcon: <TrendingDown size={16} />,
		note: "2% Less than Yesterday",
	},
];
export const DASHBOARD_EMPLOYEE_STAT_CARDS: Array<{
	count: string;
	label: string;
	icon: ReactNode;
	note: string;
	noteIcon?: ReactNode;
	noteColor?: "success" | "danger";
}> = [
	{
		count: "12",
		label: "Total Present Days",
		icon: <Users />,
		note: "Out of 30 Working Days",
		noteColor: "success",
	},
	{
		count: "12 Days",
		label: "Leave Balance",
		icon: <CalendarSearch />,
		noteIcon: <Plus size={16} />,
		note: "4 leave's carryforward from last month",
		noteColor: "success",
	},
	{
		count: "96 HRS",
		label: "Time logged",
		icon: <AlarmClock />,
		noteIcon: <Plus size={16} />,
		note: "1 Casual Leave has been added.",
	},
	{
		count: "2",
		label: "Late Marks This Month",
		icon: <CalendarClock />,
		noteIcon: <Plus size={16} />,
		note: "1 late mark New added by system!",
	},
];
export const LEAVE_STAT_CARDS: Array<{
	count: string;
	label: string;
	icon: ReactNode;
	note: string;
	noteIcon?: ReactNode;
	noteColor?: "success" | "danger";
}> = [
	{
		count: "2 Days",
		label: "Casual Leave",
		icon: <Users />,
		note: "Booked:   2 Days",
		noteColor: "success",
	},
	{
		count: "12 Days",
		label: "Sick Leave",
		icon: <CalendarSearch />,

		note: "Availed:   12 Days",
		noteColor: "success",
	},
	{
		count: "0 Days",
		label: "Leave Without Pay (LWP)",
		icon: <AlarmClock />,

		note: "Booked: 2 Days",
	},
	{
		count: "0 Days",
		label: "Late Marks This Month",
		icon: <CalendarClock />,

		note: "1 late mark New added by system!",
	},
];
/**
 * Department headcount data for bar graph
 */
export const DEPARTMENT_HEADCOUNT_DATA = [
	{ department: "IT", india: 510, dubai: 350 },
	{ department: "Sales", india: 410, dubai: 300 },
	{ department: "HR", india: 210, dubai: 190 },
	{ department: "Marketing", india: 600, dubai: 500 },
	{ department: "Finance", india: 210, dubai: 190 },
	{ department: "Marketing", india: 600, dubai: 500 },
	{ department: "Finance", india: 210, dubai: 190 },
];

/**
 * Chart configuration for bar graph
 */
export const CHART_CONFIG = {
	india: { label: "India", color: "hsl(var(--primary-blue))" },
	dubai: { label: "Dubai", color: "hsla(var(--primary-orange), 0.3)" },
};

/**
 * Mock data for ShortTable component
 */
export const SHORT_TABLE_MOCK_DATA: EmployeeData[] = [
	{
		id: "1",
		employeeName: "John Doe",
		leaveType: "Unpaid",
		email: "john.doe@example.com",
		employeeId: "123456",
		status: "pending",
		amount: 1000,
		startDate: "2023-01-01",
		endDate: "2023-01-10",
	},
	{
		id: "2",
		employeeName: "Jane Smith",
		leaveType: "Paid",
		email: "jane.smith@example.com",
		employeeId: "654321",
		status: "success",
		amount: 2000,
		startDate: "2023-02-01",
		endDate: "2023-02-10",
	},
	{
		id: "3",
		employeeName: "Tom Wilson",
		leaveType: "Sick",
		email: "tom.wilson@example.com",
		employeeId: "789012",
		status: "rejected",
		amount: 1500,
		startDate: "2023-03-01",
		endDate: "2023-03-05",
	},
];

/**
 * Mock data for Late Arrival component
 */
export const LATE_ARRIVAL_MOCK_DATA: EmployeeData[] = [
	{
		id: "1",
		employeeName: "John Doe",
		email: "john.doe@example.com",
		employeeId: "123456",
		punchIn: "10:00 AM",
		punchOut: "12:00 PM",
		date: "2023-01-01",
	},
	{
		id: "2",
		employeeName: "Jane Smith",
		email: "jane.smith@example.com",
		employeeId: "654321",
		punchIn: "10:00 AM",
		punchOut: "12:00 PM",
		date: "2023-02-01",
	},
	{
		id: "3",
		employeeName: "Tom Wilson",
		email: "tom.wilson@example.com",
		employeeId: "789012",
		punchIn: "10:00 AM",
		punchOut: "12:00 PM",
		date: "2023-03-01",
	},
	{
		id: "4",
		employeeName: "Tom Wilson",
		email: "tom.wilson@example.com",
		employeeId: "789012",
		punchIn: "10:00 AM",
		punchOut: "12:00 PM",
		date: "2023-03-01",
	},
	{
		id: "5",
		employeeName: "Tom Wilson",
		employeeId: "789012",
		email: "tom.wilson@example.com",
		punchIn: "10:00 AM",
		punchOut: "12:00 PM",
		date: "2023-03-01",
	},
	{
		id: "6",
		employeeName: "Tom Wilson",
		email: "tom.wilson@example.com",
		punchIn: "10:00 AM",
		punchOut: "12:00 PM",
		date: "2023-03-01",
	},
];

/**
 * Mock data for Expiry Alert component
 */
export const EXPIRY_ALERT_MOCK_DATA: EmployeeData[] = [
	{
		id: "1",
		employeeName: "John Doe",
		employeeId: "123456",
		email: "john.doe@example.com",
		docType: "Passport",
		status: "Near Expiry",
	},
	{
		id: "2",
		employeeName: "Jane Smith",
		employeeId: "654321",
		email: "jane.smith@example.com",
		docType: "Passport",
		status: "Expired",
	},
	{
		id: "3",
		employeeName: "Tom Wilson",
		employeeId: "789012",
		email: "tom.wilson@example.com",
		docType: "Passport",
		status: "Near Expiry",
	},
];

/**
 * Mock data for Leave Approval component
 */
export const LEAVE_APPROVAL_MOCK_DATA: EmployeeData[] = [
	{
		id: "1",
		employeeName: "John Doe",
		leaveType: "Unpaid",
		email: "john.doe@example.com",
		employeeId: "123456",
		status: "pending",
		startDate: "2023-01-01",
		endDate: "2023-01-10",
	},
	{
		id: "2",
		employeeName: "Jane Smith",
		leaveType: "Paid",
		email: "jane.smith@example.com",
		employeeId: "654321",
		status: "success",
		startDate: "2023-02-01",
		endDate: "2023-02-10",
	},
	{
		id: "3",
		employeeName: "Tom Wilson",
		leaveType: "Sick",
		email: "tom.wilson@example.com",
		employeeId: "789012",
		status: "rejected",
		startDate: "2023-03-01",
		endDate: "2023-03-05",
	},
];

export const ANNOUNCEMENTS_MOCK_DATA: AnnouncementTableItem[] = [
	{
		date: "Apr.10",
		title: "Birthday Announcement",
		description: "ABC's Birthday is coming on 18th Apr.",
	},
	{
		date: "Apr.10",
		title: "Birthday Announcement",
		description: "ABC's Birthday is coming on 18th Apr.",
	},
	{
		date: "Apr.10",
		title: "Birthday Announcement",
		description: "ABC's Birthday is coming on 18th Apr.",
	},
	{
		date: "Apr.10",
		title: "Birthday Announcement",
		description: "ABC's Birthday is coming on 18th Apr.",
	},
	{
		date: "Apr.10",
		title: "Birthday Announcement",
		description: "ABC's Birthday is coming on 18th Apr.",
	},
	{
		date: "Apr.10",
		title: "Birthday Announcement",
		description: "ABC's Birthday is coming on 18th Apr.",
	},
];

//userManagement All empoyee table Data
export const AllEmployeeTable: AllEmployeeTableData[] = Array.from(
	{ length: 30 },
	(_, i) => ({
		id: `id-${i + 1}`,
		name: [
			"Sheetal Sharma",
			"Isha Gupta",
			"Sonali Saluja",
			"Rohit Mehra",
			"Priya Singh",
			"Amit Patel",
			"Neha Verma",
			"Rahul Jain",
			"Aarav Kapoor",
			"Simran Kaur",
		][i % 10],
		department: "Designer",
		amount: Math.round(Math.random() * 1000),
		status: (["confirm", "Probation", "confirm", "confirm"] as const)[i % 4],
		email: `user${i + 1}@example.com`,
		employeeId: `#HJ${234500 + i}`,
		role: "Sr. Product Des...",
		location: "Dubai, UAE",
		dateOfBirth: "1990-01-01",
		action: (["Active", "inactive"] as const)[i % 2],
		joiningDate: "2022-01-01",
		employeeStatus: "Active",
	}),
);

const statuses = ["Confirm", "Probation"] as const;

export const MyTeamTableData: MyTeamTableDataProp[] = Array.from(
	{ length: 12 },
	(_, i) => ({
		id: `id-${i + 1}`,
		name: [
			"Sheetal Sharma",
			"Isha Gupta",
			"Sonali Saluja",
			"Rohit Mehra",
			"Priya Singh",
			"Amit Patel",
			"Neha Verma",
			"Rahul Jain",
			"Aarav Kapoor",
			"Simran Kaur",
		][i % 10],
		department: ["Development", "Design", "Marketing", "HR"][i % 4],
		phoneNumber: 1234567890 + i,
		email: `user${i + 1}@example.com`,
		employeeId: `#HJ${234500 + i}`,
		role: ["Developer", "Designer", "Manager", "HR"][i % 4],
		employeeStatus: statuses[i % statuses.length],
	}),
);

export const DocumentTableData: DocumentTableDataProp[] = Array.from(
	{ length: 12 },
	(_, i) => ({
		id: `id-${i + 1}`,
		name: [
			"Passport",
			"Aadhar",
			"Offer Letter	",
			"Visa",
			"Bank Statement",
			"Tax Certificate",
		][i % 6],
		idNumber: 1234453453456,
		status: ["Approved" as const, "Pending" as const, "Rejected" as const][
			i % 3
		],
		expiryDate: "2023-01-01",
	}),
);

export const AttendanceOverviewTable: AttendanceOverviewTableData[] =
	Array.from({ length: 6 }, (_, i) => ({
		id: `id-${i + 1}`,
		date: "2023-01-01",
		punchIn: "10:00 AM",
		punchOut: "12:00 PM",
		totalHours: "2 HRS",
		payableHour: "2 HRS",

		status: (["On Time", "Absent", "Late", "Leave"] as const)[i % 4],
	}));

export const EmployeeExpiryAlertTable: EmployeeExpiryAlertTableData[] =
	Array.from({ length: 4 }, (_, i) => ({
		id: `id-${i + 1}`,
		name: "Sheetal Sharma",
		idNumber: 123456,
		status: (["Near Expiry", "Approved", "Pending"] as const)[i % 3],
		documentType: "Passport",
	}));

export const TeamsTable: TeamsTableData[] = Array.from(
	{ length: 30 },
	(_, i) => ({
		id: `id-${i + 1}`,
		team: [
			"Sheetal Sharma",
			"Isha Gupta",
			"Sonali Saluja",
			"Rohit Mehra",
			"Priya Singh",
			"Amit Patel",
			"Neha Verma",
			"Rahul Jain",
			"Aarav Kapoor",
			"Simran Kaur",
		][i % 10],
		department: "Designer",
		managerName: "Sheetal Sharma",
		employeeId: `#HJ${234500 + i}`,
		activeCount: i % 2 ? 1 : 0,
		inactiveCount: i % 2 ? 1 : 0,
		teamCount: i % 2 ? 1 : 0,
		ManagerRole: "Sr. Product Des...",
		location: "Dubai, UAE",
		employeeStatus: "Active",
	}),
);

//attendance system table data
export const AttendanceTable: AttendanceTableData[] = Array.from(
	{ length: 30 },
	(_, i) => ({
		id: `id-${i + 1}`,
		name: [
			"Setal Sharma",
			"Isha Gupta",
			"Sonali Saluja",
			"Rohit Mehra",
			"Prima Singh",
			"Adit Patel",
			"Neha Verma",
			"Rahul Jain",
			"Aarav Kapoor",
			"Simran Kaur",
		][i % 10],
		date: new Date(2023, i % 12, i % 28).toLocaleDateString("en-US"),
		// amount: Math.round(Math.random() * 1000),
		checkIn: "09 : 50 AM",
		checkOut: "09 : 50 AM",
		location: "Dubai, UAE",

		email: `user${i + 1}@example.com`,
		employeeId: `#HJ${234500 + i}`,
		// role: "Sr. Product Des...",
		// dateOfBirth: "1990-01-01",
		action: (["Absent", "Present"] as const)[i % 2],
		employeeStatus: (["Absent", "Present"] as const)[i % 2],
	}),
);

export const AttendanceTableEmployeeData: AttendanceTableDataEmployee[] =
	Array.from({ length: 30 }, (_, i) => ({
		id: `id-${i + 1}`,
		date: new Date(2023, i % 12, i % 28).toLocaleDateString("en-US"),
		punchIn: "09 : 50 AM",
		punchOut: "09 : 50 AM",
		totalHours: "8 Hr 10 Min",
		payableHour: "2 HRS",
		status: (["On Time", "Late", "Absent", "Leave", "WFH"] as const)[i % 5],
	}));

export const RegularizationRequestTableData: RegularizationRequestTableProps[] =
	Array.from({ length: 30 }, (_, i) => ({
		id: `id-${i + 1}`,
		dateRequestRaised: "01-Apr-2025",
		dateRequestfor: "01-Apr-2025",
		punchIn: "09 : 50 AM",
		punchOut: "09 : 50 AM",
		reason: "Lorem Ipsum is simply dummy text of the printing industry...",
		status: "Pending",
	}));

export const LeaveData: leaveTableData[] = Array.from(
	{ length: 30 },
	(_, i) => ({
		id: `id-${i + 1}`,

		name: [
			"Sheetal Sharma",
			"Isha Gupta",
			"Sonali Saluja",
			"Rohit Mehra",
			"Priya Singh",
			"Amit Patel",
			"Neha Verma",
			"Rahul Jain",
			"Aarav Kapoor",
			"Simran Kaur",
		][i % 10],
		startDate: "01-Apr-2025",
		endDate: "10-Apr-2025",
		totalLeave: 100,

		leaveType: (["Sick", "Paid", "Unpaid"] as const)[i % 3],
		reason: (
			["Emergency", "Engagement", "Sick Leave", "wedding", "sick"] as const
		)[i % 4],

		email: `user${i + 1}@example.com`,
		employeeId: `#HJ${234500 + i}`,
		role: "Sr. Product Des...",
		location: "Dubai, UAE",
		dateOfBirth: "1990-01-01",
		action: (["Pending", "Rejected", "Approved"] as const)[i % 3],
		joiningDate: "2022-01-01",
		employeeStatus: "Active",
	}),
);

export const LeaveDataEmployee: leaveTableData[] = Array.from(
	{ length: 8 },
	(_, i) => ({
		id: `id-${i + 1}`,

		name: [
			"Sheetal Sharma",
			"Isha Gupta",
			"Sonali Saluja",
			"Rohit Mehra",
			"Priya Singh",
			"Amit Patel",
			"Neha Verma",
			"Rahul Jain",
			"Aarav Kapoor",
			"Simran Kaur",
		][i % 10],
		startDate: "01-Apr-2025",
		endDate: "10-Apr-2025",
		totalLeave: 100,

		leaveType: "Sick" as const,
		reason: (
			["Emergency", "Engagement", "Sick Leave", "wedding", "sick"] as const
		)[i % 4],

		email: `user${i + 1}@example.com`,
		employeeId: `#HJ${234500 + i}`,
		role: "Sr. Product Des...",
		location: "Dubai, UAE",
		dateOfBirth: "1990-01-01",
		action: "Pending" as const,
		joiningDate: "2022-01-01",
		employeeStatus: "Active",
	}),
);

/**
 * Mock data for employee notifications
 */
export const EMPLOYEE_NOTIFICATIONS: Omit<NotificationCardProps, "onClick">[] =
	[
		{
			title: "Office Timings Update",
			description:
				"Please be informed that the office timings have been updated from 9:00 AM - 6:00 PM to 9:30 AM - 6:30 PM effective from next Monday. This change is being implemented to better align with client working hours.",
			dateLabel: "Today, 10:30 AM",
			maxChars: 220,
			className: "max-w-full",
		},
		{
			title: "Team Building Event",
			description:
				"We're excited to announce our quarterly team building event happening this Friday. The event will include team activities, lunch, and prizes. Please confirm your attendance by Wednesday.",
			dateLabel: "Yesterday, 2:15 PM",
			maxChars: 220,
			className: "max-w-full",
		},
		{
			title: "New Employee Onboarding",
			description:
				"Please welcome our new team members who will be joining us next week. We have scheduled a welcome lunch on Monday at 1:00 PM in the cafeteria. Everyone is encouraged to join and make them feel welcome.",
			dateLabel: "Jun 1, 11:45 AM",
			maxChars: 220,
			className: "max-w-full",
		},
		{
			title: "System Maintenance Notice",
			description:
				"There will be a scheduled system maintenance this weekend from 10:00 PM Saturday to 6:00 AM Sunday. During this time, the HRMS portal will be unavailable. Please plan your work accordingly.",
			dateLabel: "May 30, 4:20 PM",
			maxChars: 220,
			className: "max-w-full",
		},
		{
			title: "Quarterly Performance Reviews",
			description:
				"The quarterly performance review cycle will begin next week. Managers are requested to complete all performance evaluations by the end of the month. The HR team will be conducting calibration sessions as needed.",
			dateLabel: "May 28, 9:15 AM",
			maxChars: 220,
			className: "max-w-full",
		},
	];

export const HolidaysCardData: HolidayMember[] = [
	{
		id: "1",
		name: "Republic Day",
		position: "National Holiday",
		date: "2025-01-26",
		img: "https://i.pravatar.cc/100?img=15",
	},
	{
		id: "2",
		name: "New Year",
		position: "National Holiday",
		date: "2025-01-01",
		img: "https://i.pravatar.cc/100?img=15",
	},
	{
		id: "3",
		name: "Holi",
		position: "Festival",
		date: "2025-03-17",
		img: "https://i.pravatar.cc/100?img=16",
	},
	{
		id: "4",
		name: "Independence Day",
		position: "Festival",
		date: "2025-03-17",
		img: "https://i.pravatar.cc/100?img=16",
	},
	{
		id: "5",
		name: "Republic Day",
		position: "Festival",
		date: "2025-03-17",
		img: "https://i.pravatar.cc/100?img=16",
	},
];

export const BirthdayCardData: BirthdayMember[] = [
	{
		id: "1",
		name: "John Smith",
		position: "Senior Developer",
		img: "https://i.pravatar.cc/150?img=1",
		date: "2024-03-15",
	},
	{
		id: "2",
		name: "Sarah Johnson",
		position: "Product Manager",
		img: "https://i.pravatar.cc/150?img=2",
		date: "2024-03-20",
	},
	{
		id: "3",
		name: "Michael Brown",
		position: "UX Designer",
		img: "https://i.pravatar.cc/150?img=3",
		date: "2024-03-25",
	},
	{
		id: "4",
		name: "Emily Davis",
		position: "Marketing Specialist",
		img: "https://i.pravatar.cc/150?img=4",
		date: "2024-04-01",
	},
	{
		id: "5",
		name: "David Wilson",
		position: "HR Manager",
		img: "https://i.pravatar.cc/150?img=5",
		date: "2024-04-05",
	},
];
