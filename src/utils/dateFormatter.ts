/**
 * Default date formatter following internationalization best practices.
 *
 * @param dateString - ISO date string to format
 * @returns Formatted date string or fallback
 */
export const defaultDateFormatter = (dateString: string): string => {
	try {
		const date = new Date(dateString);

		// Validate date
		if (Number.isNaN(date.getTime())) {
			console.warn(`Invalid date string provided: ${dateString}`);
			return "Invalid date";
		}

		// Use Intl.DateTimeFormat for better performance and i18n
		return new Intl.DateTimeFormat("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		}).format(date);
	} catch (error) {
		console.error("Date formatting error:", error);
		return "—";
	}
};

/**
 * Formats a given ISO date string to 'DD MMM YYYY' format.
 * @param dateString - The date string to format.
 * @returns Formatted date string or fallback
 */
export const formatDate = (dateString?: string): string => {
	if (!dateString) return "—";
	const date = new Date(dateString);
	if (Number.isNaN(date.getTime())) return "Invalid date";
	return date.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
};
