import {
	Calendar,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui";
import { REGEX } from "@/constants";
import {
	DEFAULT_AMOUNT_UNITS,
	DEFAULT_TEL_UNITS,
	INPUT_FIELD_PLACEHOLDERS,
	TIME_FORMAT,
	VALIDATION_MESSAGES,
} from "@/constants/inputField";
import { cn } from "@/lib/utils";
import { createSyntheticEvent } from "@/utils";
import { format, isValid, parse } from "date-fns";
import { Calendar1Icon, Clock, Search } from "lucide-react";
import {
	type ChangeEvent,
	type FocusEvent,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useState,
} from "react";
import { SvgIcon } from "../svgIcon";
import { TimeSelector } from "../time";
import { PasswordEyeIcon } from "./index";

/**
 * Unit option for select dropdowns
 */
interface UnitOption {
	readonly value: string;
	readonly label: string;
}

/**
 * Supported input field types
 */
type InputType =
	| "text"
	| "email"
	| "number"
	| "tel"
	| "password"
	| "search"
	| "date"
	| "customTime"
	| "amount"
	| "textArea";

/**
 * Validation result containing error message and validity status
 */
interface ValidationResult {
	readonly isValid: boolean;
	readonly error: string;
}

/**
 * Props for the InputField component
 */
interface InputFieldProps {
	/** Name attribute for the input field (required for form handling) */
	readonly name: string;
	/** Input field type */
	readonly type?: InputType;
	/** Custom validation regex pattern */
	readonly regex?: RegExp;
	/** Field label text */
	readonly label?: string;
	/** Whether the field is required */
	readonly required?: boolean;
	/** Icon to display on the left side */
	readonly iconLeft?: React.ReactNode;
	/** Icon to display on the right side */
	readonly iconRight?: React.ReactNode;
	/** Placeholder text */
	readonly placeholder?: string;
	/** Default value for uncontrolled usage */
	readonly defaultValue?: string;
	/** Controlled value */
	readonly value?: string;
	/** Custom error message override */
	readonly errorMessage?: string;
	/** Whether the field is disabled */
	readonly disabled?: boolean;
	/** Whether to show search icon on the right */
	readonly rightSearchIcon?: boolean;
	/** Additional CSS classes */
	readonly className?: string;
	/** Available units for amount type */
	readonly amountUnits?: readonly UnitOption[];
	/** Available country codes for tel type */
	readonly telUnits?: readonly UnitOption[];
	/** Background color override */
	readonly bgColor?: string;
	/** Minimum allowed date for date type */
	readonly minDate?: Date;
	/** Maximum allowed date for date type */
	readonly maxDate?: Date;
	/** Callback fired when input value changes */
	readonly onChange?: (
		event: ChangeEvent<HTMLInputElement>,
		validation: ValidationResult,
	) => void;
	/** Callback fired when input loses focus */
	readonly onBlur?: (
		event: FocusEvent<HTMLInputElement>,
		validation: ValidationResult,
	) => void;
	/** Callback fired when unit selection changes (amount/tel types) */
	readonly onUnitChange?: (unit: string) => void;
}

/**
 * Validates input value based on type and custom rules
 */
const validateInput = (
	value: string,
	type: InputType,
	required: boolean,
	regex?: RegExp,
	errorMessage?: string,
): ValidationResult => {
	// Required field validation
	if (!value && required) {
		return { isValid: false, error: "This field is required" };
	}

	// Skip validation for optional empty fields
	if (!value && !required) {
		return { isValid: true, error: "" };
	}

	// Custom regex validation
	if (regex) {
		const isMatch = regex.test(value);
		return {
			isValid: isMatch,
			error: isMatch ? "" : errorMessage || "Input format is invalid",
		};
	}

	// Type-specific validation
	const validators: Record<InputType, () => ValidationResult> = {
		text: () => ({ isValid: true, error: "" }),
		textArea: () => ({ isValid: true, error: "" }),
		search: () => ({ isValid: true, error: "" }),
		password: () => ({ isValid: true, error: "" }),
		amount: () => ({ isValid: true, error: "" }),
		email: () => ({
			isValid: REGEX.EMAIL.test(value),
			error: REGEX.EMAIL.test(value)
				? ""
				: errorMessage || VALIDATION_MESSAGES.email,
		}),
		number: () => ({
			isValid: REGEX.NUMBER.test(value),
			error: REGEX.NUMBER.test(value)
				? ""
				: errorMessage || VALIDATION_MESSAGES.number,
		}),
		tel: () => ({
			isValid: REGEX.PHONE.test(value),
			error: REGEX.PHONE.test(value)
				? ""
				: errorMessage || VALIDATION_MESSAGES.phone,
		}),
		date: () => ({
			isValid: REGEX.DATE_DDMMYYYY.test(value),
			error: REGEX.DATE_DDMMYYYY.test(value)
				? ""
				: errorMessage || VALIDATION_MESSAGES.date,
		}),
		customTime: () => ({
			isValid: REGEX.TIME_FORMAT.test(value),
			error: REGEX.TIME_FORMAT.test(value)
				? ""
				: errorMessage || VALIDATION_MESSAGES.time,
		}),
	};

	return validators[type]();
};

/**
 * A flexible input field component supporting multiple types including date, time, amount, and telephone inputs.
 *
 * @example
 * ```tsx
 * // Basic text input
 * <InputField name="username" label="Username" required />
 *
 * // Controlled email input with validation
 * <InputField
 *   name="email"
 *   type="email"
 *   value={email}
 *   onChange={(e, validation) => {
 *     setEmail(e.target.value);
 *     setEmailValid(validation.isValid);
 *   }}
 * />
 *
 * // Date input with constraints
 * <InputField
 *   name="birthdate"
 *   type="date"
 *   minDate={new Date('1900-01-01')}
 *   maxDate={new Date()}
 * />
 * ```
 */
const InputField = ({
	name,
	type = "text",
	regex,
	label,
	required = false,
	iconLeft,
	iconRight,
	placeholder = "",
	defaultValue = "",
	errorMessage = "",
	value,
	disabled = false,
	rightSearchIcon = false,
	className,
	amountUnits,
	telUnits,
	bgColor,
	minDate,
	maxDate,
	onChange,
	onBlur,
	onUnitChange,
}: InputFieldProps) => {
	// Generate stable IDs for accessibility
	const fieldId = useId();
	const errorId = useId();

	// Component state
	const [inputValue, setInputValue] = useState(defaultValue || value || "");
	const [error, setError] = useState(errorMessage || "");
	const [touched, setTouched] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showCalendar, setShowCalendar] = useState(false);
	const [showTime, setShowTime] = useState(false);
	const [displayTime, setDisplayTime] = useState<string>("");
	const [month, setMonth] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

	// Memoized unit options
	const units = useMemo((): readonly UnitOption[] => {
		switch (type) {
			case "amount":
				return amountUnits || DEFAULT_AMOUNT_UNITS;
			case "tel":
				return telUnits || DEFAULT_TEL_UNITS;
			default:
				return [];
		}
	}, [type, amountUnits, telUnits]);

	const [selectedUnit, setSelectedUnit] = useState(units[0]?.value || "");

	// Sync selectedUnit with units changes
	useEffect(() => {
		if (units.length > 0) {
			const currentUnitExists = units.some((u) => u.value === selectedUnit);
			if (!currentUnitExists) {
				setSelectedUnit(units[0].value);
			}
		}
	}, [units, selectedUnit]);

	// Sync internal state with controlled value
	useEffect(() => {
		if (value !== undefined) {
			setInputValue(value);
		}
	}, [value]);

	// Memoized validation function
	const performValidation = useCallback(
		(val: string): ValidationResult =>
			validateInput(val, type, required, regex, errorMessage),
		[type, required, regex, errorMessage],
	);

	// Optimized date validation
	const validateDateRange = useCallback(
		(date: Date): boolean => {
			const isBeforeMin = minDate && date < minDate;
			const isAfterMax = maxDate && date > maxDate;
			return !isBeforeMin && !isAfterMax;
		},
		[minDate, maxDate],
	);

	// Enhanced date input handler
	const handleDateInput = useCallback(
		(newValue: string): boolean => {
			if (newValue === "") {
				setInputValue("");
				return true;
			}

			const dateParts = newValue.split("/");

			// Validate each part as user types
			if (dateParts.length === 1) {
				if (!REGEX.DATE_DAY.test(dateParts[0])) return false;
				if (dateParts[0].length === 2) {
					const day = Number.parseInt(dateParts[0], 10);
					if (day < 1 || day > 31) return false;
				}
			} else if (dateParts.length === 2) {
				if (!REGEX.DATE_MONTH.test(dateParts[1])) return false;
				if (dateParts[1].length === 2) {
					const month = Number.parseInt(dateParts[1], 10);
					if (month < 1 || month > 12) return false;
				}
			} else if (dateParts.length === 3) {
				if (!REGEX.DATE_YEAR.test(dateParts[2])) return false;
			} else {
				return false;
			}

			if (!REGEX.DATE_CHARACTERS.test(newValue)) {
				return false;
			}

			// Validate complete date
			if (newValue.length === 10) {
				if (!REGEX.DATE_FORMAT.test(newValue)) return false;

				const parsedDate = parse(newValue, "dd/MM/yyyy", new Date());
				if (isValid(parsedDate)) {
					if (validateDateRange(parsedDate)) {
						setSelectedDate(parsedDate);
						setMonth(parsedDate);
					} else {
						setSelectedDate(undefined);
					}
				} else {
					setSelectedDate(undefined);
				}
			}

			setInputValue(newValue);
			return true;
		},
		[validateDateRange],
	);

	// Enhanced time input handler
	const handleTimeInput = useCallback((newValue: string): boolean => {
		if (newValue === "") {
			setInputValue("");
			setDisplayTime("");
			return true;
		}

		if (!REGEX.TIME_CHARACTERS.test(newValue)) {
			return false;
		}

		let formattedValue = newValue;

		// Auto-format time input
		if (formattedValue.length === 2 && !formattedValue.includes(":")) {
			formattedValue += ":";
		}

		formattedValue = formattedValue.replace(/am|pm/gi, (match) =>
			match.toUpperCase(),
		);

		setInputValue(formattedValue);
		setDisplayTime(formattedValue);
		return true;
	}, []);

	// Unified change handler
	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const newValue = e.target.value;
			let shouldUpdate = true;

			// Type-specific input handling
			if (type === "date") {
				shouldUpdate = handleDateInput(newValue);
			} else if (type === "customTime") {
				shouldUpdate = handleTimeInput(newValue);
			} else {
				setInputValue(newValue);
			}

			if (!shouldUpdate) return;

			// Validation and callback execution
			if (touched) {
				const validation = performValidation(newValue);
				setError(validation.error);

				if (onChange) {
					const inputEvent = e as unknown as ChangeEvent<HTMLInputElement>;
					onChange(inputEvent, validation);
				}
			} else if (onChange) {
				const inputEvent = e as unknown as ChangeEvent<HTMLInputElement>;
				onChange(inputEvent, { isValid: true, error: "" });
			}
		},
		[
			type,
			touched,
			performValidation,
			onChange,
			handleDateInput,
			handleTimeInput,
		],
	);

	// Unified blur handler
	const handleBlur = useCallback(
		(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setTouched(true);
			const validation = performValidation(e.target.value);
			setError(validation.error);

			if (onBlur) {
				const inputEvent = e as unknown as FocusEvent<HTMLInputElement>;
				onBlur(inputEvent, validation);
			}
		},
		[performValidation, onBlur],
	);

	// Calendar handlers
	const handleCalendarToggle = useCallback(() => {
		setShowCalendar((prev) => !prev);
	}, []);

	const handleDateSelect = useCallback(
		(date: Date | undefined) => {
			if (!date) {
				setInputValue("");
				setSelectedDate(undefined);
				setTouched(true);
				const validation = performValidation("");
				setError(validation.error);

				if (onChange) {
					const event = createSyntheticEvent(name, "");
					onChange(event, validation);
				}
				return;
			}

			if (!validateDateRange(date)) return;

			const formattedDate = format(date, "dd/MM/yyyy");
			setSelectedDate(date);
			setMonth(date);
			setInputValue(formattedDate);
			setTouched(true);

			const validation = performValidation(formattedDate);
			setError(validation.error);

			if (onChange) {
				const event = createSyntheticEvent(name, formattedDate);
				onChange(event, validation);
			}
		},
		[validateDateRange, performValidation, onChange, name],
	);

	// Time handlers
	const handleTimeToggle = useCallback(() => {
		setShowTime((prev) => !prev);
	}, []);

	const handleTimeSelect = useCallback(
		(_date: Date, hour: number, minute: number, period: "AM" | "PM") => {
			const formattedTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${period}`;
			setInputValue(formattedTime);
			setDisplayTime(formattedTime);
			setShowTime(false);
			setTouched(true);

			const validation = performValidation(formattedTime);
			setError(validation.error);

			if (onChange) {
				const event = createSyntheticEvent(name, formattedTime);
				onChange(event, validation);
			}
		},
		[performValidation, onChange, name],
	);

	// Unit selection handler
	const handleUnitChange = useCallback(
		(unitValue: string) => {
			setSelectedUnit(unitValue);
			onUnitChange?.(unitValue);
		},
		[onUnitChange],
	);

	// Utility functions
	const parseTimeString = useCallback((timeStr: string): Date | undefined => {
		if (!timeStr) return undefined;
		try {
			const parsedDate = parse(timeStr, TIME_FORMAT.display, new Date());
			if (isValid(parsedDate)) return parsedDate;

			const parsedDate2 = parse(timeStr, TIME_FORMAT.input, new Date());
			if (isValid(parsedDate2)) return parsedDate2;

			return undefined;
		} catch {
			return undefined;
		}
	}, []);

	const getDisplayValue = useCallback((): string => {
		if (type === "customTime") {
			return displayTime || "";
		}
		return inputValue;
	}, [type, displayTime, inputValue]);

	// Memoized styles
	const inputClasses = useMemo(
		() =>
			cn(
				{
					"border-[hsl(var(--status-error))] focus-visible:ring-[hsl(var(--status-error))]/50 autofill:transition-colors autofill:duration-[5000000ms]":
						error && touched,
				},
				className,
			),
		[error, touched, className],
	);

	const backgroundStyle = useMemo(
		() => bgColor || "hsl(var(--bg-light))",
		[bgColor],
	);

	// Memoized placeholder
	const effectivePlaceholder = useMemo(() => {
		if (placeholder) return placeholder;

		const placeholders: Record<InputType, string> = {
			amount: INPUT_FIELD_PLACEHOLDERS.amount,
			tel: INPUT_FIELD_PLACEHOLDERS.tel,
			customTime: INPUT_FIELD_PLACEHOLDERS.customTime,
			date: INPUT_FIELD_PLACEHOLDERS.date,
			text: "",
			email: "",
			number: "",
			password: "",
			search: "",
			textArea: "",
		};

		return placeholders[type] || "";
	}, [placeholder, type]);

	// Calendar disabled dates
	const disabledDates = useMemo(
		() => [
			...(minDate ? [{ before: minDate }] : []),
			...(maxDate ? [{ after: maxDate }] : []),
		],
		[minDate, maxDate],
	);

	const iconClass = useMemo(() => {
		let tempClass = "";
		if (
			iconLeft ||
			(iconLeft && type === "password") ||
			(type === "search" && !rightSearchIcon)
		) {
			tempClass = `${tempClass} pl-10`;
		}
		if (
			iconRight ||
			type === "password" ||
			type === "date" ||
			type === "customTime" ||
			(type === "search" && rightSearchIcon)
		) {
			tempClass = `${tempClass} pr-10`;
		}
		return tempClass;
	}, [iconRight, iconLeft, type, rightSearchIcon]);

	return (
		<div className="w-full">
			{label && (
				<div className="mb-1">
					<label
						htmlFor={fieldId}
						className="text-sm text-[hsl(var(--text-medium))]"
					>
						{label}
					</label>
					{required && (
						<span
							className="text-[hsl(var(--status-error))] ml-1"
							aria-label="required"
						>
							*
						</span>
					)}
				</div>
			)}

			{type === "textArea" ? (
				<textarea
					id={fieldId}
					name={name}
					value={getDisplayValue()}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={effectivePlaceholder}
					disabled={disabled}
					className={`${inputClasses} text-sm p-3 rounded-md bg-[${backgroundStyle}] shadow-none w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary-blue))]`}
					aria-invalid={!!error}
					aria-describedby={error ? errorId : undefined}
					required={required}
				/>
			) : (
				<div className="relative">
					{type === "amount" || type === "tel" ? (
						<div className="relative">
							<Select
								disabled={disabled}
								value={selectedUnit}
								onValueChange={handleUnitChange}
							>
								<SelectTrigger
									className="absolute !ring-0 left-0 top-1/2 -translate-y-1/2 h-11 rounded-md bg-[hsl(var(--bg-light))] border border-input text-sm text-center px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary-blue))] z-10 w-[80px]"
									aria-label={
										type === "amount" ? "Select unit" : "Select country code"
									}
								>
									<SelectValue
										className="text-[hsl(var(--text-medium))] !text-sm"
										placeholder={type === "amount" ? "Unit" : "Code"}
									/>
								</SelectTrigger>
								<SelectContent>
									{units.map((unit) => (
										<SelectItem key={unit.value} value={unit.value}>
											{unit.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Input
								id={fieldId}
								name={name}
								type={type === "amount" ? "number" : "tel"}
								value={getDisplayValue()}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder={effectivePlaceholder}
								error={error}
								disabled={disabled}
								className={`${inputClasses} ${iconClass} bg-[${backgroundStyle}] shadow-none pl-24`}
								aria-invalid={!!error}
								aria-describedby={error ? errorId : undefined}
								required={required}
								min={type === "amount" ? 0 : undefined}
							/>
						</div>
					) : (
						<Input
							id={fieldId}
							name={name}
							error={error}
							type={type === "password" && !showPassword ? "password" : "text"}
							value={getDisplayValue()}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder={effectivePlaceholder}
							disabled={disabled}
							className={`${inputClasses} ${iconClass} bg-[${backgroundStyle}] shadow-none`}
							aria-invalid={!!error}
							aria-describedby={error ? errorId : undefined}
							required={required}
						/>
					)}

					{type === "date" && (
						<Popover open={showCalendar} onOpenChange={setShowCalendar}>
							<PopoverTrigger asChild>
								<button
									type="button"
									className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-transparent border-0 cursor-pointer"
									onClick={handleCalendarToggle}
									aria-label="Open calendar"
								>
									{iconRight ? iconRight : <Calendar1Icon size={24} />}
								</button>
							</PopoverTrigger>
							<PopoverContent
								sideOffset={20}
								alignOffset={6}
								className="p-0 border-0"
								align="end"
							>
								<Calendar
									month={month}
									onMonthChange={setMonth}
									mode="single"
									selected={selectedDate}
									onSelect={handleDateSelect}
									disabled={disabledDates}
								/>
							</PopoverContent>
						</Popover>
					)}

					{type === "customTime" && (
						<Popover open={showTime} onOpenChange={setShowTime}>
							<PopoverTrigger asChild>
								<button
									type="button"
									className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-transparent border-0 cursor-pointer"
									onClick={handleTimeToggle}
									aria-label="Open time picker"
								>
									{iconRight ? iconRight : <Clock size={24} />}
								</button>
							</PopoverTrigger>
							<PopoverContent
								sideOffset={20}
								alignOffset={-12}
								className="p-0 border-0"
								align="end"
							>
								<TimeSelector
									selected={parseTimeString(inputValue)}
									onSelect={handleTimeSelect}
									onCancel={() => setShowTime(false)}
								/>
							</PopoverContent>
						</Popover>
					)}

					{/* Password toggle */}
					{type === "password" && !iconRight && (
						<PasswordEyeIcon
							className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-transparent border-0 cursor-pointer"
							onClick={() => setShowPassword((prev) => !prev)}
							shown={showPassword}
							size={24}
							aria-label={showPassword ? "Hide password" : "Show password"}
						/>
					)}

					{/* Left side icons */}
					{iconLeft && type !== "amount" && type !== "tel" && (
						<div
							className="absolute left-3 top-1/2 -translate-y-1/2 p-1 bg-transparent border-0"
							aria-hidden="true"
						>
							{iconLeft}
						</div>
					)}
					{iconRight && type !== "date" && type !== "customTime" && (
						<div
							className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-transparent border-0"
							aria-hidden="true"
						>
							{iconRight}
						</div>
					)}
					{type === "search" && !iconRight && (
						<Search
							size={24}
							className={cn(
								rightSearchIcon ? "right-3" : "left-3",
								"absolute top-1/2 -translate-y-1/2 p-1 text-[hsl(var(--text-medium))]",
							)}
							aria-hidden="true"
						/>
					)}
				</div>
			)}

			{/* Error message */}
			{error && touched && (
				<div className="flex items-center gap-1 mt-1" role="alert">
					<SvgIcon
						name="alert"
						size={18}
						className="text-[hsl(var(--status-error))]"
						aria-hidden="true"
					/>
					<p id={errorId} className="text-xs text-[hsl(var(--status-error))]">
						{error}
					</p>
				</div>
			)}
		</div>
	);
};

export {
	InputField,
	type InputFieldProps,
	type UnitOption,
	type ValidationResult,
	type InputType,
};
