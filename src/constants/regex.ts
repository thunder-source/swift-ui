const REGEX = {
	// Date validation
	DATE_CHARACTERS: /[0-9/]/,
	DATE_FORMAT: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
	DATE_MONTH: /^\d{0,2}$/,
	DATE_DAY: /^\d{0,2}$/,
	DATE_YEAR: /^\d{0,4}$/,

	// Email validation
	EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

	// Number validation
	NUMBER: /^-?\d+(\.\d+)?$/,

	// Phone number validation
	PHONE: /^\d+$/,

	// Password validation
	PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,

	// Date format (dd/mm/yyyy)
	DATE_DDMMYYYY: /^\d{2}\/\d{2}\/\d{4}$/,

	// Time validation
	TIME_FORMAT: /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i,
	TIME_CHARACTERS: /^[0-9:amp\s]*$/i,
	TIME_HOURS: /^(0?[1-9]|1[0-2])$/,
	TIME_MINUTES: /^[0-5][0-9]$/,
	TIME_PERIOD: /^(AM|PM)$/i,
} as const;

export { REGEX };
