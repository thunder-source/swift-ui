import type { Meta, StoryObj } from "@storybook/react";
import {
	Building,
	Calendar,
	CreditCard,
	DollarSign,
	FileText,
	Lock,
	Mail,
	MapPin,
	Phone,
	Search,
	User,
} from "lucide-react";
import { useState } from "react";
import { InputGroup, type InputGroupProps } from ".";

const meta: Meta<typeof InputGroup> = {
	title: "Custom/InputGroup",
	component: InputGroup,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"A flexible input group component that supports various field types including text, email, password, file uploads, and more. Features responsive layout, icon support, and comprehensive validation.",
			},
		},
	},
	argTypes: {
		columns: {
			control: { type: "number", min: 1, max: 4 },
			description: "Number of columns for responsive layout",
		},
		className: {
			control: "text",
			description: "Additional CSS classes for the wrapper",
		},
	},
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

// Interactive wrapper component for stateful stories
const InteractiveInputGroup = (args: InputGroupProps) => {
	const [values, setValues] = useState(args.values);
	const [errors, setErrors] = useState(args.errors || {});

	const handleChange = (newValues: Record<string, string | File[]>) => {
		setValues(newValues);

		// Simple validation example
		const newErrors: Record<string, string> = {};

		// Email validation
		if (
			newValues.email &&
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValues.email as string)
		) {
			newErrors.email = "Please enter a valid email address";
		}

		// Required field validation
		for (const field of args.fields ?? []) {
			if (
				field.required &&
				(!newValues[field.name] || newValues[field.name] === "")
			) {
				newErrors[field.name] = `${field.label || field.name} is required`;
			}
		}

		setErrors(newErrors);
		args.onChange?.(newValues);
	};

	console.log("lorem ------", values);

	return (
		<InputGroup
			{...args}
			values={values}
			errors={errors}
			onChange={handleChange}
		/>
	);
};

export const Default: Story = {
	render: (args) => <InteractiveInputGroup {...args} />,
	args: {
		fields: [
			{
				name: "username",
				label: "Username",
				width: "50%",
				type: "text",
				placeholder: "Enter username",
				iconLeft: <User size={16} />,
				required: true,
			},
			{
				name: "email",
				label: "Email",
				width: "50%",
				type: "email",
				placeholder: "Enter email",
				iconRight: <Mail size={16} />,
				required: true,
			},
			{
				name: "search",
				label: "Search",
				type: "search",
				placeholder: "Search here...",
				iconLeft: <Search size={16} />,
				helpText: "Search across all content",
			},
			{
				name: "uploadFile",
				label: "Upload File",
				type: "file",
				width: "100%",
				acceptTypes: [".jpg", ".png", ".gif", ".jpeg", ".pdf", ".doc", ".docx"],
				maxFileSizeMB: 5,
				helpText:
					"Maximum file size: 5MB. Accepted formats: JPG, PNG, GIF, PDF, DOC, DOCX",
			},
		],
		values: {
			username: "",
			email: "",
			search: "",
			uploadFile: [],
		},
		columns: 2,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Basic example with common field types including text, email, search, and file upload. Features validation and helpful text.",
			},
		},
	},
};

export const UserRegistrationForm: Story = {
	render: (args) => <InteractiveInputGroup {...args} />,
	args: {
		fields: [
			{
				name: "firstName",
				label: "First Name",
				width: "50%",
				type: "text",
				placeholder: "John",
				iconLeft: <User size={16} />,
				required: true,
			},
			{
				name: "lastName",
				label: "Last Name",
				width: "50%",
				type: "text",
				placeholder: "Doe",
				iconLeft: <User size={16} />,
				required: true,
			},
			{
				name: "email",
				label: "Email Address",
				width: "100%",
				type: "email",
				placeholder: "john.doe@example.com",
				iconLeft: <Mail size={16} />,
				required: true,
				helpText: "We'll never share your email with anyone else",
			},
			{
				name: "phone",
				label: "Phone Number",
				width: "50%",
				type: "tel",
				placeholder: "+1 (555) 123-4567",
				iconLeft: <Phone size={16} />,
			},
			{
				name: "birthDate",
				label: "Date of Birth",
				width: "50%",
				type: "date",
				iconLeft: <Calendar size={16} />,
				required: true,
			},
			{
				name: "password",
				label: "Password",
				width: "50%",
				type: "password",
				placeholder: "Enter password",
				iconLeft: <Lock size={16} />,
				required: true,
				helpText: "Must be at least 8 characters long",
			},
			{
				name: "confirmPassword",
				label: "Confirm Password",
				width: "50%",
				type: "password",
				placeholder: "Confirm password",
				iconLeft: <Lock size={16} />,
				required: true,
			},
			{
				name: "bio",
				label: "Bio",
				width: "100%",
				type: "textArea",
				placeholder: "Tell us about yourself...",
				helpText: "Optional: Share a brief description about yourself",
			},
			{
				name: "profilePicture",
				label: "Profile Picture",
				type: "file",
				width: "100%",
				acceptTypes: [".jpg", ".png", ".gif", ".jpeg"],
				maxFileSizeMB: 2,
				helpText: "Upload a profile picture (max 2MB, JPG/PNG only)",
			},
		],
		values: {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			birthDate: "",
			password: "",
			confirmPassword: "",
			bio: "",
			profilePicture: [],
		},
		columns: 2,
		className: "max-w-4xl",
	},
	parameters: {
		docs: {
			description: {
				story:
					"Complete user registration form showcasing various field types, validation, and responsive layout.",
			},
		},
	},
};

export const PaymentForm: Story = {
	render: (args) => <InteractiveInputGroup {...args} />,
	args: {
		fields: [
			{
				name: "cardNumber",
				label: "Card Number",
				width: "100%",
				type: "text",
				placeholder: "1234 5678 9012 3456",
				iconLeft: <CreditCard size={16} />,
				required: true,
			},
			{
				name: "expiryDate",
				label: "Expiry Date",
				width: "33.33%",
				type: "text",
				placeholder: "MM/YY",
				iconLeft: <Calendar size={16} />,
				required: true,
			},
			{
				name: "cvv",
				label: "CVV",
				width: "33.33%",
				type: "password",
				placeholder: "123",
				iconLeft: <Lock size={16} />,
				required: true,
			},
			{
				name: "amount",
				label: "Amount",
				width: "33.33%",
				type: "amount",
				placeholder: "0.00",
				iconLeft: <DollarSign size={16} />,
				required: true,
			},
			{
				name: "billingName",
				label: "Billing Name",
				width: "50%",
				type: "text",
				placeholder: "John Doe",
				iconLeft: <User size={16} />,
				required: true,
			},
			{
				name: "billingEmail",
				label: "Billing Email",
				width: "50%",
				type: "email",
				placeholder: "john@example.com",
				iconLeft: <Mail size={16} />,
				required: true,
			},
			{
				name: "billingAddress",
				label: "Billing Address",
				width: "100%",
				type: "textArea",
				placeholder: "123 Main St, City, State, ZIP",
				iconLeft: <MapPin size={16} />,
				required: true,
				helpText: "Enter your complete billing address",
			},
		],
		values: {
			cardNumber: "",
			expiryDate: "",
			cvv: "",
			amount: "",
			billingName: "",
			billingEmail: "",
			billingAddress: "",
		},
		columns: 3,
		className: "max-w-5xl bg-gray-50 p-6 rounded-lg",
	},
	parameters: {
		docs: {
			description: {
				story:
					"Payment form example with financial input types and secure field handling.",
			},
		},
	},
};

export const CompanyProfileForm: Story = {
	render: (args) => <InteractiveInputGroup {...args} />,
	args: {
		fields: [
			{
				name: "companyName",
				label: "Company Name",
				width: "100%",
				type: "text",
				placeholder: "Acme Corporation",
				iconLeft: <Building size={16} />,
				required: true,
			},
			{
				name: "website",
				label: "Website",
				width: "50%",
				type: "text",
				placeholder: "https://www.example.com",
				iconLeft: <Search size={16} />,
			},
			{
				name: "industry",
				label: "Industry",
				width: "50%",
				type: "text",
				placeholder: "Technology",
				iconLeft: <Building size={16} />,
				required: true,
			},
			{
				name: "description",
				label: "Company Description",
				width: "100%",
				type: "textArea",
				placeholder: "Describe your company...",
				helpText: "Provide a brief overview of your company and services",
			},
			{
				name: "logo",
				label: "Company Logo",
				type: "file",
				width: "50%",
				acceptTypes: [".jpg", ".png", ".svg"],
				maxFileSizeMB: 1,
				helpText: "Upload company logo (max 1MB)",
			},
			{
				name: "documents",
				label: "Legal Documents",
				type: "file",
				width: "50%",
				acceptTypes: [".pdf", ".doc", ".docx"],
				maxFileSizeMB: 10,
				helpText: "Upload incorporation papers, licenses, etc.",
			},
		],
		values: {
			companyName: "",
			website: "",
			industry: "",
			description: "",
			logo: [],
			documents: [],
		},
		columns: 2,
		className: "max-w-4xl",
	},
	parameters: {
		docs: {
			description: {
				story:
					"Business profile form with mixed content types and file uploads for different purposes.",
			},
		},
	},
};

export const SingleColumn: Story = {
	render: (args) => <InteractiveInputGroup {...args} />,
	args: {
		fields: [
			{
				name: "title",
				label: "Article Title",
				type: "text",
				placeholder: "Enter article title",
				iconLeft: <FileText size={16} />,
				required: true,
			},
			{
				name: "author",
				label: "Author",
				type: "text",
				placeholder: "Author name",
				iconLeft: <User size={16} />,
				required: true,
			},
			{
				name: "content",
				label: "Article Content",
				type: "textArea",
				placeholder: "Write your article content here...",
				helpText: "Markdown formatting is supported",
			},
			{
				name: "tags",
				label: "Tags",
				type: "text",
				placeholder: "technology, web-development, react",
				helpText: "Separate tags with commas",
			},
			{
				name: "featuredImage",
				label: "Featured Image",
				type: "file",
				acceptTypes: [".jpg", ".png", ".webp"],
				maxFileSizeMB: 3,
				helpText: "Upload a featured image for the article",
			},
		],
		values: {
			title: "",
			author: "",
			content: "",
			tags: "",
			featuredImage: [],
		},
		columns: 1,
		className: "max-w-2xl",
	},
	parameters: {
		docs: {
			description: {
				story:
					"Single column layout ideal for forms with longer content like articles or blog posts.",
			},
		},
	},
};

export const WithValidationErrors: Story = {
	args: {
		fields: [
			{
				name: "username",
				label: "Username",
				width: "50%",
				type: "text",
				placeholder: "Enter username",
				iconLeft: <User size={16} />,
				required: true,
			},
			{
				name: "email",
				label: "Email",
				width: "50%",
				type: "email",
				placeholder: "Enter email",
				iconRight: <Mail size={16} />,
				required: true,
			},
			{
				name: "password",
				label: "Password",
				type: "password",
				placeholder: "Enter password",
				iconLeft: <Lock size={16} />,
				required: true,
			},
		],
		values: {
			username: "jo",
			email: "invalid-email",
			password: "",
		},
		errors: {
			username: "Username must be at least 3 characters long",
			email: "Please enter a valid email address",
			password: "Password is required",
		},
		columns: 2,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Example showing validation error states for different field types.",
			},
		},
	},
};

export const CustomStyling: Story = {
	render: (args) => <InteractiveInputGroup {...args} />,
	args: {
		fields: [
			{
				name: "search",
				label: "Search Products",
				type: "search",
				placeholder: "What are you looking for?",
				iconLeft: <Search size={20} />,
				className:
					"border-2 border-blue-300 focus:border-blue-500 rounded-lg text-lg",
			},
			{
				name: "category",
				label: "Category",
				type: "text",
				placeholder: "Electronics, Books, etc.",
				className:
					"border-2 border-green-300 focus:border-green-500 rounded-lg",
			},
		],
		values: {
			search: "",
			category: "",
		},
		columns: 2,
		className:
			"bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl shadow-lg",
	},
	parameters: {
		docs: {
			description: {
				story:
					"Example with custom styling applied to both individual fields and the container.",
			},
		},
	},
};

export const AllFieldTypes: Story = {
	render: (args) => <InteractiveInputGroup {...args} />,
	args: {
		fields: [
			{
				name: "text",
				label: "Text Input",
				type: "text",
				placeholder: "Text input",
				width: "33.33%",
			},
			{
				name: "email",
				label: "Email Input",
				type: "email",
				placeholder: "email@example.com",
				width: "33.33%",
			},
			{
				name: "tel",
				label: "Phone Input",
				type: "tel",
				placeholder: "+1234567890",
				width: "33.33%",
			},
			{
				name: "password",
				label: "Password Input",
				type: "password",
				placeholder: "Password",
				width: "33.33%",
			},
			{
				name: "search",
				label: "Search Input",
				type: "search",
				placeholder: "Search...",
				width: "33.33%",
			},
			{
				name: "date",
				label: "Date Input",
				type: "date",
				width: "33.33%",
			},
			{
				name: "number",
				label: "Number Input",
				type: "number",
				placeholder: "123",
				width: "33.33%",
			},
			{
				name: "amount",
				label: "Amount Input",
				type: "amount",
				placeholder: "0.00",
				width: "33.33%",
			},
			{
				name: "customTime",
				label: "Custom Time",
				type: "customTime",
				width: "33.33%",
			},
			{
				name: "textArea",
				label: "Text Area",
				type: "textArea",
				placeholder: "Multi-line text...",
				width: "100%",
			},
			{
				name: "file",
				label: "File Upload",
				type: "file",
				acceptTypes: [".jpg", ".png", ".pdf"],
				maxFileSizeMB: 5,
				width: "100%",
			},
		],
		values: {
			text: "",
			email: "",
			tel: "",
			password: "",
			search: "",
			date: "",
			number: "",
			amount: "",
			customTime: "",
			textArea: "",
			file: [],
		},
		columns: 3,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Comprehensive showcase of all available field types supported by the InputGroup component.",
			},
		},
	},
};
