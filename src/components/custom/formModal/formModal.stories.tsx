import { Button } from "@/components/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { FormModal } from "./formModal";

const meta: Meta<typeof FormModal> = {
	title: "Custom/FormModal",
	component: FormModal,
	args: {
		title: "Add Note",
		description: "Note for Sheetal Sharma",
		fields: [
			{
				name: "noteTitle",
				label: "Note Title",
				placeholder: "Enter Note Title",
			},
			{
				name: "noteBody",
				label: "Note",
				type: "textArea",
				placeholder: "Enter Note",
			},
		],
	},
};

export default meta;

type Story = StoryObj<typeof FormModal>;

export const Default: Story = {};

export const WithInitialOpen: Story = {
	args: {
		initialOpen: true,
	},
};

export const FeedbackModal: Story = {
	args: {
		title: "Send Feedback",
		description: "Tell us what you think about our product",
		fields: [
			{
				name: "subject",
				label: "Subject",
				placeholder: "Enter subject",
			},
			{
				name: "message",
				label: "Message",
				type: "textArea",
				placeholder: "Your message",
			},
		],
	},
};

export const WithCustomHeader: Story = {
	args: {
		customHeader: (
			<div className="p-4 bg-blue-50 rounded-t-lg">
				<h2 className="text-2xl font-bold text-blue-700">Custom Header</h2>
				<p className="text-blue-600">
					This is a completely custom header component
				</p>
			</div>
		),
		fields: [
			{
				name: "name",
				label: "Name",
				placeholder: "Enter your name",
			},
		],
	},
};

export const WithCustomContent: Story = {
	args: {
		title: "Custom Content Example",
		description: "This modal has custom content instead of form fields",
		customContent: (
			<div className="p-6 space-y-4">
				<div className="bg-gray-100 p-4 rounded-lg">
					<h3 className="font-medium text-gray-800">Custom Content Area</h3>
					<p className="text-gray-600 mt-2">
						This area can contain any React components, not just form fields.
						You can add images, charts, tables, or any other content here.
					</p>
				</div>
				<div className="flex items-center space-x-2 bg-yellow-50 p-3 rounded-md">
					<span className="text-yellow-600">⚠️</span>
					<p className="text-yellow-700 text-sm">
						This is a custom notification element
					</p>
				</div>
			</div>
		),
	},
};

export const WithCustomFooter: Story = {
	args: {
		title: "Custom Footer Example",
		description: "This modal has a custom footer with different buttons",
		fields: [
			{
				name: "email",
				label: "Email",
				placeholder: "Enter your email",
			},
		],
		customFooter: (
			<div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
				<Button variant="outline" size="sm">
					Save Draft
				</Button>
				<div className="space-x-2">
					<Button variant="outline" size="sm">
						Cancel
					</Button>
					<Button variant="default" size="sm">
						Submit
					</Button>
				</div>
			</div>
		),
	},
};

export const FullyCustomized: Story = {
	args: {
		initialOpen: true,
		customHeader: (
			<div className="p-4 bg-purple-50 rounded-t-lg text-center">
				<h2 className="text-2xl font-bold text-purple-700">Subscription</h2>
				<p className="text-purple-600">Choose your plan</p>
			</div>
		),
		customContent: (
			<div className="p-4 space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="border border-gray-200 p-4 rounded-lg hover:border-purple-500 cursor-pointer">
						<h3 className="font-bold">Basic Plan</h3>
						<p className="text-2xl font-bold mt-2">$9.99</p>
						<p className="text-sm text-gray-500 mt-1">per month</p>
						<ul className="mt-4 space-y-2 text-sm">
							<li>✓ Feature one</li>
							<li>✓ Feature two</li>
							<li className="text-gray-400">✗ Feature three</li>
						</ul>
					</div>
					<div className="border border-purple-500 p-4 rounded-lg bg-purple-50">
						<h3 className="font-bold">Pro Plan</h3>
						<p className="text-2xl font-bold mt-2">$19.99</p>
						<p className="text-sm text-gray-500 mt-1">per month</p>
						<ul className="mt-4 space-y-2 text-sm">
							<li>✓ Feature one</li>
							<li>✓ Feature two</li>
							<li>✓ Feature three</li>
						</ul>
					</div>
				</div>
			</div>
		),
		customFooter: (
			<div className="p-4 border-t border-gray-200">
				<Button
					variant="default"
					className="w-full bg-purple-600 hover:bg-purple-700"
				>
					Select Plan
				</Button>
				<p className="text-xs text-center text-gray-500 mt-2">
					By subscribing, you agree to our Terms and Conditions
				</p>
			</div>
		),
	},
};
