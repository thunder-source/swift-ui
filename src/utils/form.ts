import type { ChangeEvent } from "react";

/**
 * Creates a synthetic change event for form elements
 *
 * @param name - The name of the form field
 * @param value - The value to set in the event
 * @returns A synthetic ChangeEvent that mimics a native input change event
 */
export function createSyntheticEvent(
	name: string,
	value: string,
): ChangeEvent<HTMLInputElement> {
	const event = {
		target: {
			name,
			value,
		},
		currentTarget: {
			name,
			value,
		},
	} as unknown as ChangeEvent<HTMLInputElement>;
	return event;
}
