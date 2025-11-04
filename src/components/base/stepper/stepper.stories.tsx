import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Stepper } from "./stepper";

const meta: Meta<typeof Stepper> = {
	title: "base/Stepper",
	component: Stepper,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		title: { control: "text" },
		subtitle: { control: "text" },
		steps: { control: "object" },
		currentStep: { control: "number" },
		onStepChange: { action: "step changed" },
		onNext: { action: "next clicked" },
		onPrev: { action: "previous clicked" },
		nextButtonText: { control: "text" },
		prevButtonText: { control: "text" },
	},
};

export default meta;

type Story = StoryObj<typeof Stepper>;

// Empty state component for educational details
const EmptyEducationState = () => (
	<div className="flex flex-col items-center justify-center py-8">
		<div className="w-64 h-64 bg-[hsl(var(--bg-light))] rounded-lg flex items-center justify-center mb-4 p-6">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100"
				height="100"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="text-[hsl(var(--text-light))]"
				aria-labelledby="documentIconTitle"
				role="img"
			>
				<title id="documentIconTitle">Document icon</title>
				<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
				<polyline points="14 2 14 8 20 8" />
				<line x1="9" y1="15" x2="15" y2="15" />
				<line x1="9" y1="11" x2="15" y2="11" />
				<line x1="9" y1="19" x2="15" y2="19" />
			</svg>
		</div>
		<h3 className="text-lg font-medium text-[hsl(var(--text-dark))] mb-2">
			No Education Details Added
		</h3>
		<p className="text-sm text-[hsl(var(--text-medium))] text-center mb-6">
			Please add details by clicking "Add Education" below
		</p>
		<button
			type="button"
			className="px-4 py-2 bg-[hsl(var(--primary-blue))] text-white rounded-md flex items-center gap-2"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-labelledby="plusIconTitle"
				role="img"
			>
				<title id="plusIconTitle">Plus icon</title>
				<line x1="12" y1="5" x2="12" y2="19" />
				<line x1="5" y1="12" x2="19" y2="12" />
			</svg>
			Add Education
		</button>
	</div>
);

// Sample form components for the stories
const SampleForm = ({ title }: { title: string }) => (
	<div className="space-y-4">
		<h2 className="text-lg font-semibold text-[hsl(var(--text-dark))] mb-4">
			{title}
		</h2>
		<div className="p-4 bg-[hsl(var(--bg-white))] rounded border border-[hsl(var(--border-grey))]">
			<div className="grid grid-cols-2 gap-6">
				<div className="space-y-2">
					<label
						htmlFor="field1"
						className="text-sm font-medium text-[hsl(var(--text-dark))]"
					>
						Field 1
					</label>
					<input
						id="field1"
						type="text"
						className="w-full p-2 border border-[hsl(var(--border-grey))] rounded"
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="field2"
						className="text-sm font-medium text-[hsl(var(--text-dark))]"
					>
						Field 2
					</label>
					<input
						id="field2"
						type="text"
						className="w-full p-2 border border-[hsl(var(--border-grey))] rounded"
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="field3"
						className="text-sm font-medium text-[hsl(var(--text-dark))]"
					>
						Field 3
					</label>
					<input
						id="field3"
						type="text"
						className="w-full p-2 border border-[hsl(var(--border-grey))] rounded"
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="field4"
						className="text-sm font-medium text-[hsl(var(--text-dark))]"
					>
						Field 4
					</label>
					<input
						id="field4"
						type="text"
						className="w-full p-2 border border-[hsl(var(--border-grey))] rounded"
					/>
				</div>
			</div>
		</div>
	</div>
);

export const Default: Story = {
	render: () => {
		const [currentStep, setCurrentStep] = useState<number>(0);

		const steps = [
			{
				label: "Employee Details",
				content: <SampleForm title="Employee Details" />,
			},
			{
				label: "Address Details",
				content: <SampleForm title="Address Details" />,
			},
			{ label: "Bank Details", content: <SampleForm title="Bank Details" /> },
			{ label: "Educational Details", content: <EmptyEducationState /> },
			{
				label: "Experience Details",
				content: <SampleForm title="Experience Details" />,
			},
			{
				label: "Document Details",
				content: <SampleForm title="Document Details" />,
			},
		];

		const handlePrev = () => {
			setCurrentStep((prev) => Math.max(0, prev - 1));
		};

		const handleNext = () => {
			setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
		};

		return (
			<Stepper
				steps={steps}
				currentStep={currentStep}
				onStepChange={setCurrentStep}
				onPrev={handlePrev}
				onNext={handleNext}
			/>
		);
	},
};

export const CustomTitleAndSubtitle: Story = {
	render: () => {
		const [currentStep, setCurrentStep] = useState<number>(0);

		const steps = [
			{
				label: "Personal Info",
				content: <SampleForm title="Personal Information" />,
			},
			{
				label: "Contact Info",
				content: <SampleForm title="Contact Information" />,
			},
			{ label: "Review", content: <SampleForm title="Review Information" /> },
		];

		const handlePrev = () => {
			setCurrentStep((prev) => Math.max(0, prev - 1));
		};

		const handleNext = () => {
			setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
		};

		return (
			<Stepper
				title="User Registration"
				subtitle="Complete the form to create your account"
				steps={steps}
				currentStep={currentStep}
				onStepChange={setCurrentStep}
				onPrev={handlePrev}
				onNext={handleNext}
				nextButtonText="Continue"
				prevButtonText="Go Back"
			/>
		);
	},
};

export const EducationalDetailsStep: Story = {
	render: () => {
		const [currentStep, setCurrentStep] = useState<number>(3);

		const steps = [
			{
				label: "Employee Details",
				content: <SampleForm title="Employee Details" />,
			},
			{
				label: "Address Detail",
				content: <SampleForm title="Address Details" />,
			},
			{ label: "Bank Details", content: <SampleForm title="Bank Details" /> },
			{ label: "Educational Details", content: <EmptyEducationState /> },
			{
				label: "Experience Details",
				content: <SampleForm title="Experience Details" />,
			},
			{
				label: "Document Details",
				content: <SampleForm title="Document Details" />,
			},
		];

		const handlePrev = () => {
			setCurrentStep((prev) => Math.max(0, prev - 1));
		};

		const handleNext = () => {
			setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
		};

		return (
			<Stepper
				title="Add Employee"
				subtitle="Complete the form to create a new employee profile."
				steps={steps}
				currentStep={currentStep}
				onStepChange={setCurrentStep}
				onPrev={handlePrev}
				onNext={handleNext}
			/>
		);
	},
};

export const LastStep: Story = {
	render: () => {
		const [currentStep, setCurrentStep] = useState<number>(5);

		const steps = [
			{
				label: "Employee Details",
				content: <SampleForm title="Employee Details" />,
			},
			{
				label: "Address Detail",
				content: <SampleForm title="Address Details" />,
			},
			{ label: "Bank Details", content: <SampleForm title="Bank Details" /> },
			{
				label: "Educational Details",
				content: <SampleForm title="Educational Details" />,
			},
			{
				label: "Experience Details",
				content: <SampleForm title="Experience Details" />,
			},
			{
				label: "Document Details",
				content: <SampleForm title="Document Details" />,
			},
		];

		const handlePrev = () => {
			setCurrentStep((prev) => Math.max(0, prev - 1));
		};

		const handleNext = () => {
			setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
		};

		return (
			<Stepper
				title="Add Employee"
				subtitle="Complete the form to create a new employee profile."
				steps={steps}
				currentStep={currentStep}
				onStepChange={setCurrentStep}
				onPrev={handlePrev}
				onNext={handleNext}
			/>
		);
	},
};
