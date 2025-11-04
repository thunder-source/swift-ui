import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import React from "react";

export interface SelectOption {
	value: string;
	label: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[key: string]: any;
}

/** Function to render an option */
export type RenderOptionFn<T = SelectOption> = (
	option: T,
	selected: boolean,
	idx: number,
) => React.ReactNode;

export interface SelectInputProps<T = SelectOption> {
	/** List of options */
	options: T[];
	/** Label */
	label: string;
	/** Optional selectable placeholder */
	placeholder?: string;
	/** Disable select */
	disabled?: boolean;
	/** Uncontrolled value */
	defaultValue?: string;
	/** Controlled value (recommended for controlled usage) */
	value?: string;
	/** On change handler */
	onChange?: (value: string) => void;
	/** aria-label for accessibility */
	ariaLabel?: string;
	/**
	 * Custom class for the trigger
	 * @default ""
	 */
	triggerClassName?: string;
	triggerChildrenClassName?: string;
	contentClassName?: string;
	itemClassName?: string;
	/** Custom trigger; gets { value } */
	renderTriggerChildren?: (props: { value?: string }) => React.ReactNode;
	/** Icon to the left of the value */
	leftIcon?: React.ReactNode;
	renderLeftIcon?: (selectedValue?: string) => React.ReactNode;
	rightIcon?: React.ReactNode;
	renderRightIcon?: (selectedValue?: string) => React.ReactNode;
	/** Custom renderer per item */
	renderOption?: RenderOptionFn<T>;
	/** Add props for Select.Primitive (forwarded) */
	selectProps?: React.ComponentProps<typeof Select>;
	/** Searchable UI */
	searchable?: boolean;
	searchPlaceholder?: string;
	onSearch?: (query: string) => void;
	/** Custom element to show when no results/options are found */
	noResultsElement?: React.ReactNode;
	/** Optional id, name, etc. for accessibility */
	name?: string;
}

/**
 * A customizable, accessible select/dropdown input.
 *
 * @example
 * <SelectInput options={[{value:'1',label:'A'}]} />
 */
export function SelectInput<T extends SelectOption = SelectOption>({
	label,
	options,
	placeholder = "Select...",
	disabled,
	defaultValue,
	value,
	onChange,
	renderTriggerChildren,
	leftIcon,
	renderLeftIcon,
	rightIcon,
	renderRightIcon,
	renderOption,
	triggerClassName,
	triggerChildrenClassName,
	contentClassName,
	itemClassName,
	selectProps = {},
	searchable,
	searchPlaceholder,
	onSearch,
	noResultsElement,
	ariaLabel,
	name,
}: SelectInputProps<T>) {
	// Controlled vs uncontrolled state
	const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
	const isControlled = value !== undefined;
	const selectedValue = isControlled ? value : internalValue;

	// Optionally handle search state
	const [searchTerm, setSearchTerm] = React.useState("");
	const shownOptions = React.useMemo(
		() =>
			searchable && searchTerm
				? options.filter((opt) =>
						opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
					)
				: options,
		[options, searchTerm, searchable],
	);

	const handleValueChange = React.useCallback(
		(val: string) => {
			if (!isControlled) setInternalValue(val);
			onChange?.(val);
		},
		[isControlled, onChange],
	);

	// Handle search events if enabled
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		onSearch?.(e.target.value);
	};

	const optionList = React.useMemo(() => {
		if (shownOptions.length === 0 && noResultsElement)
			return (
				<div
					role="alert"
					aria-live="polite"
					className="p-2 text-muted-foreground"
				>
					{noResultsElement}
				</div>
			);
		return shownOptions.map((opt, idx) =>
			renderOption ? (
				<React.Fragment key={opt.value}>
					{renderOption(opt, selectedValue === opt.value, idx)}
				</React.Fragment>
			) : (
				<SelectItem
					key={opt.value}
					value={opt.value}
					className={itemClassName}
					aria-selected={selectedValue === opt.value}
				>
					{opt.label}
				</SelectItem>
			),
		);
	}, [
		shownOptions,
		renderOption,
		selectedValue,
		itemClassName,
		noResultsElement,
	]);

	return (
		<div className="w-full ">
			{label && <p className="pb-2 text-sm font-medium">{label}</p>}
			<Select
				disabled={disabled}
				value={selectedValue}
				defaultValue={defaultValue}
				onValueChange={handleValueChange}
				aria-label={ariaLabel}
				name={name}
				{...selectProps}
			>
				<SelectTrigger
					className={triggerClassName}
					aria-label={ariaLabel}
					aria-haspopup="listbox"
					// Right icon handling
					renderIcon={
						renderRightIcon ? () => renderRightIcon(selectedValue) : undefined
					}
					icon={!renderRightIcon ? rightIcon : undefined}
				>
					{renderTriggerChildren ? (
						renderTriggerChildren({ value: selectedValue })
					) : (
						<div
							className={cn(
								"flex items-center gap-2 w-full",
								triggerChildrenClassName,
							)}
						>
							{renderLeftIcon
								? renderLeftIcon(selectedValue)
								: leftIcon && <span>{leftIcon}</span>}
							<SelectValue placeholder={placeholder} />
						</div>
					)}
				</SelectTrigger>
				<SelectContent data-radix-select-content className={contentClassName}>
					{searchable && (
						<div className="px-2 py-2">
							<input
								className="w-full px-2 py-1 border rounded mb-2"
								placeholder={searchPlaceholder || "Search..."}
								value={searchTerm}
								onChange={handleSearch}
								aria-label={searchPlaceholder || "Search options"}
							/>
						</div>
					)}
					{optionList}
				</SelectContent>
			</Select>
		</div>
	);
}
