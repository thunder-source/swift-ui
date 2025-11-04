import { InputField, type InputFieldProps } from "@/components/base";
import { FileUpload, type FileUploadProps } from "@/components/custom";

/**
 * Props for a single field in InputGroup.
 */
type InputType =
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

// Common base fields that all field types share
interface BaseFieldConfig {
	width?: string;
	type: InputType;
	name: string;
	className?: string;
	required?: boolean;
	label?: string;
	helpText?: string;
}

// Type for standard input fields (excludes file)
type StandardInputField = BaseFieldConfig &
	Omit<InputFieldProps, "type" | "name"> & {
		type: Exclude<InputType, "file">;
	};

// Type for file upload fields
type FileUploadField = BaseFieldConfig &
	Omit<FileUploadProps, "type" | "name"> & {
		type: "file";
	};

// Union type for all possible field configurations
export type FieldConfig = StandardInputField | FileUploadField;

/**
 * Props for the InputGroup component.
 */
export interface InputGroupProps {
	/**
	 * Array of field configurations.
	 */
	fields: FieldConfig[];

	/**
	 * Called when any input changes.
	 */
	onChange?: (values: Record<string, string | File[]>) => void;

	/**
	 * Current form values.
	 */
	values: Record<string, string | File[]>;

	/**
	 * Validation errors for the form fields.
	 */
	errors?: Record<string, string>;

	/**
	 * Optional number of columns for layout (default: 2).
	 */
	columns?: number;

	/**
	 * Optional wrapper class name for styling.
	 */
	className?: string;
}

/**
 * A responsive group of input fields with icon support.
 *
 * @component
 */
const InputGroup: React.FC<InputGroupProps> = ({
	fields,
	onChange,
	values,
	className = "",
	errors,
}) => {
	const handleChange = (name: string, value: string | File[]) => {
		onChange?.({ ...values, [name]: value });
	};
	return (
		<div className={`w-full mx-auto flex flex-wrap ${className}`}>
			{fields.map((field) => (
				<div
					key={field.name}
					className="p-2"
					style={{ width: field.width || "100%" }}
				>
					{field.type === "file" ? (
						<FileUpload
							className={field.className}
							acceptTypes={field.acceptTypes}
							maxFileSizeMB={field.maxFileSizeMB}
							onChange={(e) => handleChange(field.name, e.target.value)}
							{...field}
						/>
					) : (
						<InputField
							{...field}
							key={field.name}
							value={values[field.name] as string}
							onChange={(e) => handleChange(field.name, e.target.value)}
							className={field.className}
							errorMessage={errors?.[field.name]}
						/>
					)}
				</div>
			))}
		</div>
	);
};

export { InputGroup };
