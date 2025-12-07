import type { Meta, StoryObj } from "@storybook/react-vite";
import GeneralDetailCard from "./generalDetailCard";

const meta: Meta<typeof GeneralDetailCard> = {
	title: "base/GeneralDetailCard",
	component: GeneralDetailCard,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"A reusable card component for displaying key-value data pairs in a responsive grid layout.",
			},
		},
	},
	argTypes: {
		data: {
			control: "object",
			description: "The data to display as key-value pairs",
			table: {
				type: { summary: "Record<string, string | number | null | undefined>" },
			},
		},
		config: {
			control: "object",
			description: "Configuration options for customizing the card",
			table: {
				type: { summary: "GeneralDetailCardConfig" },
				defaultValue: { summary: "{}" },
			},
		},
		className: {
			control: "text",
			description: "Additional CSS classes to apply",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: '""' },
			},
		},
		testId: {
			control: "text",
			description: "Test ID for testing purposes",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: '"general-detail-card"' },
			},
		},
		onDetailClick: {
			action: "detail-clicked",
			description: "Callback fired when a detail item is clicked",
			table: {
				type: { summary: "(key: string, value: string) => void" },
			},
		},
		keyFormatter: {
			control: false,
			description: "Custom formatter for keys",
			table: {
				type: { summary: "(key: string) => string" },
			},
		},
		valueFormatter: {
			control: false,
			description: "Custom formatter for values",
			table: {
				type: { summary: "(key: string, value: string | number) => string" },
			},
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof GeneralDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data sets for different scenarios
const sampleUserData = {
	firstName: "John",
	lastName: "Doe",
	emailAddress: "john.doe@example.com",
	phoneNumber: "+1-555-0123",
	dateOfBirth: "1990-01-15",
	city: "New York",
	country: "United States",
	jobTitle: "Software Engineer",
};

const sampleCompanyData = {
	companyName: "Acme Corporation",
	industry: "Technology",
	foundedYear: 1995,
	employeeCount: 5000,
	headquarters: "San Francisco, CA",
	website: "https://acme.com",
	stockSymbol: "ACME",
	revenue: "$1.2B",
};

const sampleProductData = {
	productName: "Widget Pro",
	sku: "WP-2024-001",
	price: 199.99,
	category: "Electronics",
	inStock: 42,
	weight: "2.5 kg",
	dimensions: "30cm x 20cm x 10cm",
	warranty: "2 years",
};

/**
 * Default story showcasing the adaptive layout behavior
 */
export const Default: Story = {
	args: {
		data: sampleUserData,
		className: "bg-blue-50 border-2 border-blue-200 shadow-lg !w-[50%]",
		
	},
};

/**
 * Balanced columns - items distributed evenly across columns
 */
export const BalancedColumns: Story = {
	args: {
		data: {
			firstName: "John",
			lastName: "Doe",
			email: "john@example.com",
			phone: "+1-555-0123",
			department: "IT",
			role: "Developer",
		},
		config: {
			balancedColumns: true,
			maxColumns: 2,
			headerText: "Balanced Layout (3 items per column)",
		},
		
	},
};

/**
 * Sequential filling - default CSS Grid behavior
 */
export const SequentialFilling: Story = {
	args: {
		data: {
			firstName: "John",
			lastName: "Doe",
			email: "john@example.com",
			phone: "+1-555-0123",
			department: "IT",
			role: "Developer",
			apple: "frot",
			banana: "banana",
			orange: "orange",
			grape: "grape",
			mango: "mango",
			pineapple: "pineapple",
			watermelon: "watermelon",
			strawberry: "strawberry",
			blueberry: "blueberry",
			raspberry: "raspberry",
			cherry: "cherry",
			peach: "peach",
			kiwi: "kiwi",
			coconut: "coconut",
			lemon: "lemon",
			lime: "lime",
			papaya: "papaya",
			tangerine: "tangerine",
			tomato: "tomato",
			avocado: "avocado",
			eggplant: "eggplant",
			cucumber: "cucumber",
		},
		className: "",
		config: {
			balancedColumns: false,
			maxColumns: 2,
			headerText: "Sequential Layout (fills first column first)",
		},
		
	},
};

/**
 * Many items - automatically adapts to multiple columns
 */
export const ManyItems: Story = {
	args: {
		data: {
			...sampleUserData,
			...sampleCompanyData,
			...sampleProductData,
			field1: "Value 1",
			field2: "Value 2",
			field3: "Value 3",
		},

		config: {
			adaptiveLayout: true,
			headerText: "Comprehensive Details",
		},
		
	},
};

/**
 * Compact density for space-constrained layouts
 */
export const CompactDensity: Story = {
	args: {
		data: sampleUserData,
		config: {
			density: "compact",
			maxColumns: 2,
		},
		
	},
};

/**
 * Spacious density for better readability
 */
export const SpaciousDensity: Story = {
	args: {
		data: sampleCompanyData,
		config: {
			density: "spacious",
			maxColumns: 2,
		},
		
	},
};

/**
 * Fixed layout - overrides adaptive behavior
 */
export const FixedTwoColumns: Story = {
	args: {
		data: {
			firstName: "John",
			lastName: "Doe",
			email: "john@example.com",
		},
		config: {
			adaptiveLayout: false,
			maxColumns: 2,
			headerText: "Fixed 2-Column Layout",
		},
		
	},
};

/**
 * Fixed single column layout
 */
export const FixedSingleColumn: Story = {
	args: {
		data: sampleUserData,
		config: {
			adaptiveLayout: false,
			maxColumns: 1,
			density: "comfortable",
		},
		
	},
};

/**
 * Three column layout for wide displays
 */
export const ThreeColumns: Story = {
	args: {
		data: {
			...sampleUserData,
			...sampleProductData,
			additionalField1: "Value 1",
			additionalField2: "Value 2",
			additionalField3: "Value 3",
		},
		config: {
			maxColumns: 3,
			density: "comfortable",
		},
		
	},
};

/**
 * Without header for embedded usage
 */
export const WithoutHeader: Story = {
	args: {
		data: sampleUserData,
		config: {
			showHeader: false,
			maxColumns: 2,
		},
		
	},
};

/**
 * Custom header text
 */
export const CustomHeader: Story = {
	args: {
		data: sampleCompanyData,
		config: {
			headerText: "Company Information",
			maxColumns: 2,
		},
		
	},
};

/**
 * With truncated values for long content
 */
export const TruncatedValues: Story = {
	args: {
		data: {
			shortField: "Short value",
			longField:
				"This is a very long value that should be truncated with ellipsis when the truncateValues option is enabled",
			anotherLongField:
				"Another extremely long value that demonstrates the truncation behavior in action",
			normalField: "Normal length value",
		},
		config: {
			truncateValues: true,
			maxColumns: 2,
		},
		
	},
};

/**
 * Empty data state
 */
export const EmptyData: Story = {
	args: {
		data: {},
		config: {
			maxColumns: 2,
		},
	},
};

/**
 * Data with null and undefined values (filtered out)
 */
export const FilteredData: Story = {
	args: {
		data: {
			validField1: "Valid Value 1",
			nullField: null,
			undefinedField: undefined,
			emptyStringField: "",
			validField2: "Valid Value 2",
			zeroValue: 0,
			falseValue: false,
		},
		config: {
			maxColumns: 2,
		},
		
	},
};

/**
 * Interactive example with click handlers
 */
export const Interactive: Story = {
	args: {
		data: sampleUserData,
		config: {
			maxColumns: 2,
			density: "comfortable",
		},
	},
};

/**
 * Custom formatters example
 */
export const CustomFormatters: Story = {
	args: {
		data: {
			user_id: 12345,
			created_at: "2024-01-15T10:30:00Z",
			last_login: "2024-05-31T08:45:00Z",
			account_balance: 1250.75,
			is_premium: "true",
		},
		config: {
			maxColumns: 2,
			headerText: "User Account Details",
		},
		keyFormatter: (key: string) => {
			const customLabels: Record<string, string> = {
				user_id: "User ID",
				created_at: "Account Created",
				last_login: "Last Login",
				account_balance: "Balance",
				is_premium: "Premium Member",
			};
			return customLabels[key] || key;
		},
		valueFormatter: (key: string, value: string | number) => {
			if (key === "account_balance") {
				return `$${Number(value).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
			}
			if (key === "created_at" || key === "last_login") {
				return new Date(value).toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				});
			}
			if (key === "is_premium") {
				return value === "true" ? "Yes" : "No";
			}
			return String(value);
		},
		
	},
};

/**
 * With custom styling
 */
export const CustomStyling: Story = {
	args: {
		data: sampleProductData,
		config: {
			maxColumns: 2,
			headerText: "Product Details",
			density: "comfortable",
		},
		className: "bg-blue-50 border-2 border-blue-200 shadow-lg",
		
	},
};

export const custommy: Story = {
	render: () => (
		<GeneralDetailCard
			className="bg-blue-50 border-2 border-blue-200 shadow-lg w-[50%]"
			data={{
				firstName: "John",
				lastName: "Doe",
				emailAddress: "john.doe@example.com",
				phoneNumber: "+1-555-0123",
				dateOfBirth: "1990-01-15",
				city: "New York",
				country: "United States",
				jobTitle: "Software Engineer",
			}}
			config={{
				headerText: "General Details",
			}}
		/>
	),
};

/**
 * Paired fields (side by side) example
 */
export const PairedFields: Story = {
	args: {
		data: {
			firstName: "Sheetal",
			lastName: "Jain",
			personalEmailId: "sheetal23@gmail.com",
			officialEmailId: "sheetalui/uxhj@gmail.com",
			personalPhoneNo: "000-0000-000",
			workPhoneNo: "000-0000-000",
			role: "UI/UX Designer",
			reportingTo: "Vishal Singh",
			dateOfBirth: "20/12/2000",
			nationality: "Indian",
			gender: "Female",
			maritalStatus: "Unmarried",
			sourceOfHire: "HR",
			officeLocation: "India",
			timeZone: "GMT+5:30",
			currency: "INR",
			salary: "30,000",
			effectiveFrom: "1 Apr, 2025",
			department: "IT",
			joiningDate: "1 Apr, 2025",
			biometricId: "196",
			employeeStatus: "Confirmed",
			bloodGroup: "A+",
			probationPeriod: "6 Month",
		},
		fieldPairs: [
			["firstName", "sourceOfHire"],
			["lastName", "officeLocation"],
			["personalEmailId", "timeZone"],
			["officialEmailId", "currency"],
			["personalPhoneNo", "salary"],
			["workPhoneNo", "effectiveFrom"],
			["role", "department"],
			["reportingTo", "joiningDate"],
			["dateOfBirth", "biometricId"],
			["nationality", "employeeStatus"],
			["gender", "bloodGroup"],
			["maritalStatus", "probationPeriod"],
		],
		config: {
			headerText: "General Details",
			maxColumns: 3,
			density: "comfortable",
		},
		className: "shadow-lg",
		onEditClick: () => alert("Edit button clicked!"),
	},
};
