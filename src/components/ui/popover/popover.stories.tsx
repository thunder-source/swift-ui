import { Button } from "@/components/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/**
 * Popover component displays content on top of another element when triggered.
 * Useful for tooltips, dropdowns, and more.
 */
const meta: Meta<typeof Popover> = {
	title: "shadcn/Popover",
	component: Popover,
	tags: ["autodocs"],
	// Custom controls (buttonLabel, content) are not Popover props, so not in argTypes.
	parameters: {
		docs: {
			description: {
				component:
					"Popover is used to show content on top of another element, typically triggered by a button or other control.",
			},
		},
		controls: {
			include: ["buttonLabel", "content"],
		},
	},
};
export default meta;
type Story = StoryObj<{ buttonLabel: string; content?: string }>; // args are for story controls only

/**
 * Default popover with customizable button label and content.
 */
export const Default: Story = {
	args: {
		buttonLabel: "Open Popover",
		content: "This is the popover content.",
	},
	render: ({ buttonLabel, content }) => (
		<Popover>
			<PopoverTrigger asChild>
				<Button>{buttonLabel}</Button>
			</PopoverTrigger>
			<PopoverContent>{content}</PopoverContent>
		</Popover>
	),
};

/**
 * Popover with custom JSX content.
 */
export const CustomContent: Story = {
	args: {
		buttonLabel: "Show Info",
	},
	render: ({ buttonLabel }) => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">{buttonLabel}</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div style={{ minWidth: 200 }}>
					<h4 style={{ margin: 0 }}>Popover Title</h4>
					<p style={{ margin: 0 }}>
						You can put <b>any JSX</b> here, including{" "}
						<a
							href="https://storybook.js.org/"
							target="_blank"
							rel="noopener noreferrer"
						>
							links
						</a>{" "}
						and more.
					</p>
				</div>
			</PopoverContent>
		</Popover>
	),
	parameters: {
		docs: {
			description: {
				story:
					"This story demonstrates how to use custom JSX as popover content.",
			},
		},
	},
};
