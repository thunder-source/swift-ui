import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
	type EnhancedFieldConfig,
	FormComponent,
	type FormValues,
	type ValidationErrors,
} from "./formComponent"; // Adjust the import path as needed

const meta: Meta<typeof FormComponent> = {
	title: "custom/FormComponent",
	component: FormComponent,
	tags: ["autodocs"],
	argTypes: {
		title: {
			control: "text",
			description: "The title displayed at the top of the form.",
		},
		fields: {
			control: "object",
			description:
				"An array of field configurations defining the form structure.",
		},
		initialValues: {
			control: "object",
			description: "Initial values for form fields (uncontrolled mode).",
		},
		values: {
			control: "object",
			description: "Current form values (controlled mode).",
		},
		errors: {
			control: "object",
			description: "Current validation errors (controlled mode).",
		},
		onSubmit: {
			action: "submitted",
			description: "Callback fired when form is submitted with valid data.",
		},
		onChange: {
			action: "changed",
			description: "Callback fired when any field value changes.",
		},
		onErrorsChange: {
			action: "errors changed",
			description: "Callback fired when validation errors change.",
		},
		className: {
			control: "text",
			description: "Additional CSS classes for the form container.",
		},
		submitLabel: {
			control: "text",
			description: "Label text for the submit button.",
		},
		cancelLabel: {
			control: "text",
			description: "Label text for the cancel button.",
		},
		onCancel: {
			action: "cancelled",
			description: "Callback fired when cancel button is clicked.",
		},
		loadingState: {
			control: "select",
			options: ["idle", "submitting", "loading", "error"],
			description: "Current loading state of the form.",
		},
		showCancelButton: {
			control: "boolean",
			description: "Whether to show the cancel button.",
		},
		autoFocus: {
			control: "boolean",
			description: "Whether to auto-focus the first field.",
		},
		validateOnBlur: {
			control: "boolean",
			description: "Whether to validate on blur.",
		},
		validateOnChange: {
			control: "boolean",
			description: "Whether to validate on change.",
		},
		validationDebounce: {
			control: "number",
			description: "Debounce delay for validation (ms).",
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"A comprehensive form component that supports both controlled and uncontrolled modes, with built-in validation, accessibility features, error boundaries, and loading states.",
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof FormComponent>;

// ---
// Common Field Configurations
// ---

const loginFields: EnhancedFieldConfig[] = [
	{
		name: "email",
		label: "Email Address",
		type: "email",
		placeholder: "Enter your email",
		validationRules: [
			{ type: "required", message: "Email is required." },
			{ type: "email", message: "Please enter a valid email address." },
		],
	},
	{
		name: "password",
		label: "Password",
		type: "password",
		placeholder: "Enter your password",
		validationRules: [
			{ type: "required", message: "Password is required." },
			{
				type: "minLength",
				value: 8,
				message: "Password must be at least 8 characters.",
			},
		],
	},
];

const registrationFields: EnhancedFieldConfig[] = [
	{
		name: "username",
		label: "Username",
		type: "text",
		placeholder: "Choose a username",
		validationRules: [
			{ type: "required", message: "Username is required." },
			{
				type: "minLength",
				value: 3,
				message: "Username must be at least 3 characters.",
			},
		],
	},
	...loginFields, // Reusing email and password fields
	{
		name: "confirmPassword",
		label: "Confirm Password",
		type: "password",
		placeholder: "Confirm your password",
		validationRules: [
			{ type: "required", message: "Please confirm your password." },
			{
				type: "custom",
				message: "Passwords do not match.",
				validator: (value, allValues) => value === allValues.password,
			},
		],
	},
	{
		name: "phone",
		label: "Phone Number",
		type: "tel",
		placeholder: "Optional phone number",
		validationRules: [
			{ type: "phone", message: "Please enter a valid phone number." },
		],
	},
];

const contactFields: EnhancedFieldConfig[] = [
	{
		name: "name",
		label: "Full Name",
		type: "text",
		placeholder: "Your full name",
		validationRules: [{ type: "required", message: "Name is required." }],
	},
	{
		name: "email",
		label: "Email Address",
		type: "email",
		placeholder: "your@example.com",
		validationRules: [
			{ type: "required", message: "Email is required." },
			{ type: "email", message: "Please enter a valid email address." },
		],
	},
	{
		name: "subject",
		label: "Subject",
		type: "text",
		placeholder: "Subject of your message",
		validationRules: [{ type: "required", message: "Subject is required." }],
	},
	{
		name: "message",
		label: "Message",
		type: "textArea",
		placeholder: "Your message...",
		validationRules: [
			{ type: "required", message: "Message cannot be empty." },
			{
				type: "maxLength",
				value: 500,
				message: "Message is too long (max 500 characters).",
			},
		],
	},
];

// ---
// Stories
// ---

export const DefaultUncontrolled: Story = {
	args: {
		title: "Login to Your Account",
		fields: loginFields,
		onSubmit: async (values) => {
			console.log("Login submitted:", values);
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async
			alert("Login successful (check console)");
		},
		submitLabel: "Log In",
		showCancelButton: false,
		autoFocus: true,
		validateOnBlur: true,
		validateOnChange: false,
	},
};

export const UncontrolledWithAllFeatures: Story = {
	args: {
		title: "Register New Account",
		fields: registrationFields,
		initialValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			phone: "",
		},
		onSubmit: async (values) => {
			console.log("Registration submitted:", values);
			await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate async
			alert("Registration successful! (check console)");
		},
		onCancel: () => alert("Registration cancelled!"),
		submitLabel: "Register",
		cancelLabel: "Clear Form",
		showCancelButton: true,
		autoFocus: true,
		validateOnBlur: true,
		validateOnChange: true,
		validationDebounce: 500,
		className: "max-w-md mx-auto my-8 p-6",
	},
};

export const ControlledForm: Story = {
	render: (args) => {
		const [values, setValues] = useState<FormValues>({
			name: "John Doe",
			email: "john@example.com",
			subject: "",
			message: "",
		});
		const [errors, setErrors] = useState<ValidationErrors>({});
		const [loadingState, setLoadingState] = useState<"idle" | "submitting">(
			"idle",
		);

		const handleSubmit = async (formValues: FormValues) => {
			setLoadingState("submitting");
			console.log("Controlled form submitted:", formValues);
			await new Promise((resolve) => setTimeout(resolve, 2000));
			setLoadingState("idle");
			alert("Contact form submitted (check console)");
			setValues({ name: "", email: "", subject: "", message: "" }); // Reset form
		};

		const handleErrorsChange = (newErrors: ValidationErrors) => {
			console.log("Controlled errors changed:", newErrors);
			setErrors(newErrors);
		};

		const handleChange = (newValues: FormValues, changedField: string) => {
			console.log(
				"Controlled values changed:",
				newValues,
				"Field:",
				changedField,
			);
			setValues(newValues);
			// Optionally clear error for the changed field
			if (errors[changedField]) {
				setErrors((prev) => {
					const newErrs = { ...prev };
					delete newErrs[changedField];
					return newErrs;
				});
			}
		};

		return (
			<FormComponent
				{...args}
				values={values}
				errors={errors}
				onChange={handleChange}
				onErrorsChange={handleErrorsChange}
				onSubmit={handleSubmit}
				loadingState={loadingState}
			/>
		);
	},
	args: {
		title: "Controlled Contact Form",
		fields: contactFields,
		submitLabel: "Send Message",
		showCancelButton: false,
		validateOnBlur: true,
		validateOnChange: true,
		validationDebounce: 400,
	},
};

export const FormWithErrorState: Story = {
	args: {
		title: "Payment Information",
		fields: [
			{
				name: "cardNumber",
				label: "Card Number",
				type: "text",
				validationRules: [
					{ type: "required", message: "Card number is required." },
				],
			},
			{
				name: "expiry",
				label: "Expiry Date",
				type: "text",
				validationRules: [
					{ type: "required", message: "Expiry date is required." },
				],
			},
			{
				name: "cvv",
				label: "CVV",
				type: "text",
				validationRules: [{ type: "required", message: "CVV is required." }],
			},
		],
		initialValues: { cardNumber: "", expiry: "", cvv: "" },
		onSubmit: async (values) => {
			console.log("Attempting payment with:", values);
			await new Promise((_, reject) =>
				setTimeout(() => reject(new Error("Invalid card details")), 1500),
			);
		},
		submitLabel: "Process Payment",
		loadingState: "idle",
		showCancelButton: false,
	},
};

export const LoadingForm: Story = {
	args: {
		title: "Loading User Profile",
		fields: [
			{ name: "name", label: "Name", type: "text" },
			{ name: "email", label: "Email", type: "email" },
		],
		initialValues: {},
		onSubmit: async () => {}, // No actual submission needed for loading state demo
		loadingState: "loading",
		submitLabel: "Save",
		showCancelButton: false,
	},
};

export const EmptyFields: Story = {
	args: {
		title: "New Item Details",
		fields: [
			{
				name: "itemName",
				label: "Item Name",
				type: "text",
				validationRules: [
					{ type: "required", message: "Item name is required." },
				],
			},
			{
				name: "description",
				label: "Description",
				type: "textArea",
				required: false,
			},
			{
				name: "quantity",
				label: "Quantity",
				type: "number",
				validationRules: [
					{ type: "required", message: "Quantity is required." },
				],
			},
		],
		initialValues: { itemName: "", description: "", quantity: "" },
		onSubmit: async (values) => {
			console.log("New item submitted:", values);
			alert("Item added!");
		},
		submitLabel: "Add Item",
		showCancelButton: true,
	},
};

export const WithCustomValidation: Story = {
	args: {
		title: "User Signup with Custom Validation",
		fields: [
			{
				name: "username",
				label: "Username",
				type: "text",
				validationRules: [
					{ type: "required", message: "Username is required." },
					{
						type: "custom",
						message: "Username must be unique (e.g., 'testuser' is taken).",
						validator: (value) => value !== "testuser", // Simulate taken username
					},
				],
			},
			{
				name: "age",
				label: "Age",
				type: "number",
				validationRules: [
					{ type: "required", message: "Age is required." },
					{
						type: "custom",
						message: "You must be at least 18 years old.",
						validator: (value) => Number.parseInt(value) >= 18,
					},
				],
			},
		],
		onSubmit: async (values) => {
			console.log("Custom validation form submitted:", values);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			alert("User signed up!");
		},
		validateOnBlur: true,
		validateOnChange: true,
	},
};

export const AccessibilityTest: Story = {
	args: {
		title: "Accessibility Form",
		fields: [
			{ name: "name", label: "Your Name", type: "text", required: true },
			{
				name: "preferences",
				label: "Preferences",
				type: "text",
				placeholder: "e.g., dark mode",
			},
		],
		onSubmit: async (values) =>
			console.log("Accessibility test form submitted:", values),
		"data-testid": "accessibility-form",
		"aria-describedby": "some-external-description",
	},
};
