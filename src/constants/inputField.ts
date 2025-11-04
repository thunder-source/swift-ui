export const DEFAULT_AMOUNT_UNITS = [
	{ value: "USD", label: "USD" },
	{ value: "EUR", label: "EUR" },
	{ value: "INR", label: "INR" },
];

export const DEFAULT_TEL_UNITS = [
	{ value: "+1", label: "+1" },
	{ value: "+91", label: "+91" },
	{ value: "+44", label: "+44" },
];

export const INPUT_FIELD_PLACEHOLDERS = {
	amount: "E.g 50,000/-",
	tel: "E.g 9876543210",
	date: "dd/mm/yyyy",
	customTime: "E.g 09:30 AM",
} as const;

export const VALIDATION_MESSAGES = {
	required: "This field is required",
	email: "Invalid email address",
	number: "Must be a number",
	phone: "Invalid phone number",
	date: "Invalid date format. Use dd/mm/yyyy",
	time: "Invalid time format. Use hh:mm AM/PM",
} as const;

export const FIELD_LABELS = {
	email: "Email Address",
	phone: "Phone Number",
	amount: "Amount",
	date: "Date",
	time: "Time",
} as const;

export const TIME_FORMAT = {
	display: "hh:mm a",
	input: "HH:mm",
} as const;
