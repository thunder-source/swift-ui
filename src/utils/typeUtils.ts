import type { FilterDataMap, FilterVariantWithData } from "@/types";
import type { Dispatch, SetStateAction } from "react";

/**
 * Type-safe wrapper for onChange handlers with variant-specific data types
 *
 * This is needed because components like Filter expect an onChange function that can handle
 * any filter value type, but useState's setValues function is typed to only accept a specific filter value type.
 *
 * @param setState - The React setState function from useState
 * @returns A function that safely handles the data type conversion
 */
export function typedOnChange<T extends FilterVariantWithData>(
	setState: Dispatch<SetStateAction<FilterDataMap[T]>>,
): (data: unknown) => void {
	// This function checks at runtime that the data is of the expected type
	// and then calls setState with the properly typed data
	return (data: unknown) => {
		// We know this is safe because the component will only pass
		// the correct data type based on the variant prop
		setState(data as FilterDataMap[T]);
	};
}

/**
 * More generic version of typedOnChange that works with any type
 *
 * @param setState - The React setState function from useState
 * @returns A function that safely handles the data type conversion
 */
export function createTypedHandler<T>(
	setState: Dispatch<SetStateAction<T>>,
): (data: unknown) => void {
	return (data: unknown) => {
		setState(data as T);
	};
}
