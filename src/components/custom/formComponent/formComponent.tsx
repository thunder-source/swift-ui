import { Button } from "@/components/ui";
import React from "react";
import {
	type AriaAttributes,
	type ReactNode,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useState,
} from "react";
import { type FieldConfig, InputGroup } from "../inputGroup";

// Enhanced type definitions with better constraints
export type FormValues = Record<string, string | File[]>;
export type ValidationErrors = Record<string, string>;
export type ValidationFunction = (values: FormValues) => ValidationErrors;

/**
 * Form loading states for better UX
 */
export type FormLoadingState = "idle" | "submitting" | "loading" | "error";

/**
 * Enhanced error boundary props
 */
export interface FormErrorBoundaryProps {
	/** Custom error message to display */
	fallback?: ReactNode;
	/** Callback when error occurs */
	onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * Validation rule configuration for type-safe validation
 */
export interface ValidationRule {
	readonly type:
		| "required"
		| "email"
		| "phone"
		| "minLength"
		| "maxLength"
		| "pattern"
		| "custom";
	readonly message: string;
	readonly value?: number | string | RegExp;
	readonly validator?: (value: string, values: FormValues) => boolean;
}

/**
 * Enhanced field configuration with validation rules
 */
export type EnhancedFieldConfig = (
	| FieldConfig
	| (FieldConfig & {
			/** Array of validation rules for this field */
			readonly validationRules?: readonly ValidationRule[];
			/** Whether the field is required */
			readonly required?: boolean;
			/** Label for the field */
			readonly label?: string;
			/** Name of the field */
			readonly name: string;
			/** Type of the field */
			readonly type:
				| "number"
				| "email"
				| "text"
				| "tel"
				| "password"
				| "search"
				| "date"
				| "customTime"
				| "amount"
				| "textArea"
				| "file";
	  })
) & {
	/** Array of validation rules for this field */
	readonly validationRules?: readonly ValidationRule[];
};

/**
 * Main form component props with strict typing and comprehensive options
 */
export interface FormComponentProps extends AriaAttributes {
	/** Array of field configurations defining the form structure */
	readonly fields: EnhancedFieldConfig[];
	/** Form title displayed at the top */
	readonly title: string;
	/** Initial values for form fields (uncontrolled mode) */
	readonly initialValues?: Readonly<FormValues>;
	/** Current form values (controlled mode) */
	readonly values?: Readonly<FormValues>;
	/** Current validation errors (controlled mode) */
	readonly errors?: Readonly<ValidationErrors>;
	/** Custom validation function that returns errors object */
	readonly validate?: ValidationFunction;
	/** Callback fired when form is submitted with valid data */
	readonly onSubmit: (values: FormValues) => void | Promise<void>;
	/** Callback fired when any field value changes */
	readonly onChange?: (values: FormValues, changedField: string) => void;
	/** Callback fired when validation errors change */
	readonly onErrorsChange?: (errors: ValidationErrors) => void;
	/** Additional CSS classes for the form container */
	readonly className?: string;
	/** Label text for the submit button */
	readonly submitLabel?: string;
	/** Label text for the cancel button */
	readonly cancelLabel?: string;
	/** Callback fired when cancel button is clicked */
	readonly onCancel?: () => void;
	/** Current loading state of the form */
	readonly loadingState?: FormLoadingState;
	/** Whether to show the cancel button */
	readonly showCancelButton?: boolean;
	/** Whether to auto-focus the first field */
	readonly autoFocus?: boolean;
	/** Whether to validate on blur */
	readonly validateOnBlur?: boolean;
	/** Whether to validate on change */
	readonly validateOnChange?: boolean;
	/** Debounce delay for validation (ms) */
	readonly validationDebounce?: number;
	/** Test ID for testing frameworks */
	readonly "data-testid"?: string;
	/** Custom footer for the form */
	readonly customFooter?: React.ReactNode;
}

/**
 * Enhanced validation hook with rule-based validation
 */
const useFormValidation = (
	fields: readonly EnhancedFieldConfig[],
	customValidate?: ValidationFunction,
) => {
	const validateField = useCallback(
		(
			field: EnhancedFieldConfig,
			value: string | File[],
			allValues: FormValues,
		): string | null => {
			// Skip validation for File[] values
			if (Array.isArray(value)) {
				return null;
			}

			const trimmedValue = value?.trim() ?? "";

			// Check validation rules
			if (field.validationRules) {
				for (const rule of field.validationRules) {
					switch (rule.type) {
						case "required":
							if (!trimmedValue) return rule.message;
							break;
						case "email":
							if (
								trimmedValue &&
								!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)
							) {
								return rule.message;
							}
							break;
						case "phone":
							if (trimmedValue && !/^\+?[\d\s\-\(\)]+$/.test(trimmedValue)) {
								return rule.message;
							}
							break;
						case "minLength":
							if (
								trimmedValue &&
								typeof rule.value === "number" &&
								trimmedValue.length < rule.value
							) {
								return rule.message;
							}
							break;
						case "maxLength":
							if (
								trimmedValue &&
								typeof rule.value === "number" &&
								trimmedValue.length > rule.value
							) {
								return rule.message;
							}
							break;
						case "pattern":
							if (
								trimmedValue &&
								rule.value instanceof RegExp &&
								!rule.value.test(trimmedValue)
							) {
								return rule.message;
							}
							break;
						case "custom":
							if (rule.validator && !rule.validator(trimmedValue, allValues)) {
								return rule.message;
							}
							break;
					}
				}
			}

			// Fallback to legacy validation
			if (field.required && !trimmedValue) {
				return `${field.label ?? field.name} is required`;
			}

			if (
				trimmedValue &&
				field.type === "email" &&
				!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)
			) {
				return "Please enter a valid email address";
			}

			return null;
		},
		[],
	);

	const validate = useCallback(
		(values: FormValues): ValidationErrors => {
			const errors: ValidationErrors = {};

			// Field-level validation
			for (const field of fields) {
				const fieldError = validateField(
					field,
					values[field.name] ?? "",
					values,
				);
				if (fieldError) {
					errors[field.name] = fieldError;
				}
			}

			// Custom form-level validation
			if (customValidate) {
				const customErrors = customValidate(values);
				Object.assign(errors, customErrors);
			}

			return errors;
		},
		[fields, validateField, customValidate],
	);

	return { validate, validateField };
};

/**
 * Enhanced form state management with controlled/uncontrolled modes
 */
interface UseFormStateOptions {
	readonly initialValues: FormValues;
	readonly fields: readonly EnhancedFieldConfig[];
	readonly controlledValues?: FormValues;
	readonly controlledErrors?: ValidationErrors;
	readonly onChange?: (values: FormValues, changedField: string) => void;
	readonly onErrorsChange?: (errors: ValidationErrors) => void;
}

const useFormState = ({
	initialValues,
	fields,
	controlledValues,
	controlledErrors,
	onChange,
	onErrorsChange,
}: UseFormStateOptions) => {
	const [internalValues, setInternalValues] = useState<FormValues>(() =>
		fields.reduce<FormValues>((acc, field) => {
			acc[field.name] = initialValues[field.name] ?? "";
			return acc;
		}, {}),
	);

	const [internalErrors, setInternalErrors] = useState<ValidationErrors>({});
	const isControlled = controlledValues !== undefined;

	const values = isControlled ? controlledValues : internalValues;
	const errors = controlledErrors ?? internalErrors;

	const updateValues = useCallback(
		(newValues: FormValues, changedField?: string) => {
			if (isControlled) {
				onChange?.(newValues, changedField ?? Object.keys(newValues)[0]);
			} else {
				setInternalValues((prev) => {
					const updated = { ...prev, ...newValues };
					onChange?.(updated, changedField ?? Object.keys(newValues)[0]);
					return updated;
				});
			}
		},
		[isControlled, onChange],
	);

	const updateErrors = useCallback(
		(newErrors: ValidationErrors) => {
			if (controlledErrors === undefined) {
				setInternalErrors(newErrors);
			}
			onErrorsChange?.(newErrors);
		},
		[controlledErrors, onErrorsChange],
	);

	const clearErrors = useCallback(
		(fieldNames: readonly string[]) => {
			if (controlledErrors === undefined) {
				setInternalErrors((prev) => {
					const updated = { ...prev };
					for (const fieldName of fieldNames) {
						delete updated[fieldName];
					}
					return updated;
				});
			}
		},
		[controlledErrors],
	);

	const reset = useCallback(() => {
		const defaultValues = fields.reduce<FormValues>((acc, field) => {
			acc[field.name] = initialValues[field.name] ?? "";
			return acc;
		}, {});

		if (isControlled) {
			onChange?.(defaultValues, "");
		} else {
			setInternalValues(defaultValues);
			setInternalErrors({});
		}
	}, [fields, initialValues, isControlled, onChange]);

	return {
		values,
		errors,
		updateValues,
		updateErrors,
		clearErrors,
		reset,
		isControlled,
	} as const;
};

/**
 * Form submission handler with enhanced error handling
 */
interface UseFormSubmissionOptions {
	readonly onSubmit: (values: FormValues) => void | Promise<void>;
	readonly validate: (values: FormValues) => ValidationErrors;
	readonly values: FormValues;
	readonly updateErrors: (errors: ValidationErrors) => void;
	readonly fields: readonly EnhancedFieldConfig[];
	readonly loadingState?: FormLoadingState;
}

const useFormSubmission = ({
	onSubmit,
	validate,
	values,
	updateErrors,
	fields,
	loadingState = "idle",
}: UseFormSubmissionOptions) => {
	const [internalLoadingState, setInternalLoadingState] =
		useState<FormLoadingState>("idle");
	const [submitError, setSubmitError] = useState<string | null>(null);

	const isExternallyControlled = loadingState !== "idle";
	const currentLoadingState = isExternallyControlled
		? loadingState
		: internalLoadingState;

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			if (currentLoadingState === "submitting") return;

			setSubmitError(null);
			if (!isExternallyControlled) {
				setInternalLoadingState("submitting");
			}

			try {
				// Validate form
				const validationErrors = validate(values);
				const hasErrors = Object.keys(validationErrors).length > 0;

				updateErrors(validationErrors);

				if (hasErrors) {
					// Focus first field with error
					const firstErrorField = fields.find(
						(field) => validationErrors[field.name],
					);
					if (firstErrorField) {
						const fieldElement = document.querySelector(
							`[name="${firstErrorField.name}"]`,
						) as HTMLElement;
						fieldElement?.focus();
					}
					return;
				}

				await onSubmit(values);
			} catch (error) {
				console.error("Form submission error:", error);
				const errorMessage =
					error instanceof Error
						? error.message
						: "An error occurred while submitting the form";
				setSubmitError(errorMessage);

				if (!isExternallyControlled) {
					setInternalLoadingState("error");
				}
			} finally {
				if (!isExternallyControlled) {
					setInternalLoadingState("idle");
				}
			}
		},
		[
			currentLoadingState,
			validate,
			values,
			updateErrors,
			fields,
			onSubmit,
			isExternallyControlled,
		],
	);

	return {
		handleSubmit,
		loadingState: currentLoadingState,
		submitError,
		clearSubmitError: useCallback(() => setSubmitError(null), []),
	} as const;
};

/**
 * Accessibility IDs and ARIA attributes generator
 */
const useAccessibility = (title: string) => {
	const formId = useId();
	const titleId = `${title}-title`;
	const errorSummaryId = `${title}-error-summary`;
	const descriptionId = `${title}-description`;

	return {
		formId,
		titleId,
		errorSummaryId,
		descriptionId,
		getFieldId: (fieldName: string) => `${formId}-${fieldName}`,
		getFieldErrorId: (fieldName: string) => `${formId}-${fieldName}-error`,
	} as const;
};

/**
 * Dynamic, accessible, and customizable form component with enhanced TypeScript support.
 *
 * @description A comprehensive form component that supports both controlled and uncontrolled modes,
 * with built-in validation, accessibility features, error boundaries, and loading states.
 *
 * @example Uncontrolled form with validation rules
 * ```tsx
 * const fields: EnhancedFieldConfig[] = [
 *   {
 *     name: 'email',
 *     label: 'Email',
 *     type: 'email',
 *     validationRules: [
 *       { type: 'required', message: 'Email is required' },
 *       { type: 'email', message: 'Please enter a valid email address' }
 *     ]
 *   },
 *   {
 *     name: 'password',
 *     label: 'Password',
 *     type: 'password',
 *     validationRules: [
 *       { type: 'required', message: 'Password is required' },
 *       { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' }
 *     ]
 *   }
 * ];
 *
 * <FormComponent
 *   fields={fields}
 *   title="Login Form"
 *   onSubmit={async (values) => {
 *     await loginUser(values);
 *   }}
 *   validateOnChange
 *   autoFocus
 * />
 * ```
 *
 * @example Controlled form with external state
 * ```tsx
 * const [formValues, setFormValues] = useState({ name: '', email: '' });
 * const [formErrors, setFormErrors] = useState({});
 *
 * <FormComponent
 *   fields={fields}
 *   title="User Registration"
 *   values={formValues}
 *   errors={formErrors}
 *   onChange={(values, changedField) => {
 *     setFormValues(values);
 *     // Clear error for changed field
 *     if (formErrors[changedField]) {
 *       setFormErrors(prev => ({ ...prev, [changedField]: undefined }));
 *     }
 *   }}
 *   onErrorsChange={setFormErrors}
 *   onSubmit={handleSubmit}
 *   loadingState={isSubmitting ? 'submitting' : 'idle'}
 * />
 * ```
 *
 * @component
 * @version 2.0.0
 * @author Your Team
 * @since 1.0.0
 */
const FormComponent = React.memo<FormComponentProps>(
	({
		customFooter,
		fields,
		initialValues = {},
		title,
		values: controlledValues,
		errors: controlledErrors,
		validate: customValidate,
		onSubmit,
		onChange,
		onErrorsChange,
		className = "",
		submitLabel = "Submit",
		cancelLabel = "Cancel",
		onCancel,
		loadingState = "idle",
		showCancelButton = true,
		autoFocus = false,
		validateOnBlur = true,
		validateOnChange = false,
		validationDebounce = 300,
		"data-testid": testId,
		"aria-describedby": ariaDescribedBy,
		...ariaProps
	}) => {
		// Generate stable IDs for accessibility
		const { formId, titleId, errorSummaryId } = useAccessibility(title);

		// Use form validation hook
		const { validate, validateField } = useFormValidation(
			fields,
			customValidate,
		);

		// Use form state hook
		const { values, errors, updateValues, updateErrors, clearErrors, reset } =
			useFormState({
				initialValues,
				fields,
				controlledValues,
				controlledErrors,
				onChange,
				onErrorsChange,
			});

		// Use form submission hook
		const {
			handleSubmit,
			loadingState: currentLoadingState,
			submitError,
			clearSubmitError,
		} = useFormSubmission({
			onSubmit,
			validate,
			values,
			updateErrors,
			fields,
			loadingState,
		});

		// Optimized change handler
		const handleChange = useCallback(
			(newValues: FormValues) => {
				const changedField = Object.keys(newValues)[0];
				updateValues(newValues, changedField);

				// Clear submit error when form changes
				if (submitError) {
					clearSubmitError();
				}

				if (validateOnChange && changedField) {
					const field = fields.find((f) => f.name === changedField);
					if (field) {
						const error = validateField(
							field,
							newValues[changedField] as string,
							newValues,
						);

						// We need to be careful with error updates to avoid race conditions
						// or overwriting other errors
						if (error) {
							updateErrors({ ...errors, [changedField]: error });
						} else if (errors[changedField]) {
							const newErrors = { ...errors };
							delete newErrors[changedField];
							updateErrors(newErrors);
						}
						return;
					}
				}

				// Default behavior: Clear errors for changed fields if not validating
				if (Object.keys(errors).length > 0) {
					clearErrors(Object.keys(newValues));
				}
			},
			[
				updateValues,
				errors,
				clearErrors,
				submitError,
				clearSubmitError,
				validateOnChange,
				fields,
				validateField,
				updateErrors,
			],
		);

		// Handle blur for validation
		const handleBlur = useCallback(
			(name: string, value: string) => {
				if (validateOnBlur) {
					const field = fields.find((f) => f.name === name);
					if (field) {
						const error = validateField(field, value, values);
						if (error) {
							updateErrors({ ...errors, [name]: error });
						} else {
							// Clear error if valid
							if (errors[name]) {
								const newErrors = { ...errors };
								delete newErrors[name];
								updateErrors(newErrors);
							}
						}
					}
				}
			},
			[validateOnBlur, fields, validateField, values, errors, updateErrors],
		);

		// Reset form handler
		const handleReset = useCallback(() => {
			reset();
			if (submitError) {
				clearSubmitError();
			}
			onCancel?.();
		}, [reset, submitError, clearSubmitError, onCancel]);

		// Auto-focus first field
		useEffect(() => {
			if (autoFocus && fields.length > 0) {
				const firstField = document.querySelector(
					`[name="${fields[0].name}"]`,
				) as HTMLElement;
				firstField?.focus();
			}
		}, [autoFocus, fields]);

		// Memoize error summary for accessibility
		const errorSummary = useMemo(() => {
			const errorEntries = Object.entries(errors);
			if (errorEntries.length === 0 && !submitError) return null;

			return (
				<div
					id={errorSummaryId}
					role="alert"
					aria-live="polite"
					className="mb-4 p-3 border border-red-300 bg-red-50 rounded-md"
				>
					<h2 className="text-sm font-medium text-red-800 mb-2">
						Please correct the following errors:
					</h2>
					<ul className="text-sm text-red-700 space-y-1">
						{submitError && <li className="font-medium">{submitError}</li>}
						{errorEntries.map(([fieldName, error]) => (
							<li key={fieldName}>{error}</li>
						))}
					</ul>
				</div>
			);
		}, [errors, submitError, errorSummaryId]);

		// Calculate if submit button should be disabled
		const isSubmitDisabled = useMemo(() => {
			return (
				currentLoadingState === "submitting" || Object.keys(errors).length > 0
			);
		}, [currentLoadingState, errors]);

		return (
			<form
				id={formId}
				onSubmit={handleSubmit}
				aria-labelledby={titleId}
				aria-describedby={
					ariaDescribedBy
						? `${ariaDescribedBy} ${errorSummaryId}`
						: errorSummaryId
				}
				className={`border border-gray-200 p-6 rounded-lg bg-white shadow-sm ${className}`}
				noValidate
				data-testid={testId}
				{...ariaProps}
			>
				<h1 id={titleId} className="text-xl font-semibold text-gray-900 mb-4">
					{title}
				</h1>

				<hr className="border-gray-200 mb-6" />

				{errorSummary}

				{currentLoadingState === "loading" ? (
					<div className="flex items-center justify-center py-8">
						<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
						<span className="ml-2 text-gray-600">Loading form...</span>
					</div>
				) : (
					<InputGroup
						fields={fields}
						values={values}
						onChange={handleChange}
						onBlur={handleBlur}
						errors={errors}
					/>
				)}

				{customFooter ? (
					customFooter
				) : (
					<div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
						{showCancelButton && (
							<Button
								type="button"
								variant="outline"
								onClick={handleReset}
								disabled={currentLoadingState === "submitting"}
								aria-label={`${cancelLabel} and reset form`}
							>
								{cancelLabel}
							</Button>
						)}
						<Button
							type="submit"
							variant="default"
							disabled={isSubmitDisabled}
							aria-describedby={
								Object.keys(errors).length > 0 || submitError
									? errorSummaryId
									: undefined
							}
						>
							{currentLoadingState === "submitting"
								? "Submitting..."
								: submitLabel}
						</Button>
					</div>
				)}
			</form>
		);
	},
);

FormComponent.displayName = "FormComponent";

// Export hooks and utilities for external use
export {
	useFormValidation,
	useFormState,
	useFormSubmission,
	useAccessibility,
	FormComponent,
};
