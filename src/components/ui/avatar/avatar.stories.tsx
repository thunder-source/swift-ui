import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import {
	Avatar,
	AvatarErrorBoundary,
	AvatarFallback,
	AvatarImage,
	AvatarStack,
	type AvatarVariant,
	type LoadingState,
} from "./avatar";

// ============================================================================
// META CONFIGURATION
// ============================================================================

const meta = {
	title: "shadcn/Avatar",
	component: Avatar,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: `
A flexible avatar component with image loading, fallback support, status indicators, and accessibility features.

## Features
- Multiple sizes and variants
- Image loading states with skeleton
- Status indicators (online/offline)
- Keyboard navigation
- Screen reader support
- Error boundaries
- Controlled state management
        `.trim(),
			},
		},
	},
	argTypes: {
		variant: {
			control: "radio",
			options: ["circle", "square"],
			description: "The shape of the avatar",
			defaultValue: "circle",
			table: {
				type: { summary: "AvatarVariant" },
				defaultValue: { summary: "circle" },
			},
		},
		size: {
			control: "radio",
			options: ["xs", "sm", "md", "lg", "xl"],
			description: "The size of the avatar",
			defaultValue: "md",
			table: {
				type: { summary: "AvatarSize" },
				defaultValue: { summary: "md" },
			},
		},
		isActive: {
			control: "boolean",
			description: "Whether the avatar has an active status indicator",
			table: {
				type: { summary: "boolean | undefined" },
			},
		},
		hideLoadingSkeleton: {
			control: "boolean",
			description: "Disable the loading skeleton animation",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		onLoadStateChange: {
			action: "load-state-changed",
			description: "Callback fired when image loading state changes",
			table: {
				type: { summary: "(state: LoadingState) => void" },
			},
		},
	},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof Avatar>;

// ============================================================================
// BASIC STORIES
// ============================================================================

export const Default: Story = {
	args: {
		onLoadStateChange: action("load-state-changed"),
	},
	render: (args) => (
		<Avatar {...args}>
			<AvatarImage
				src="https://i.pravatar.cc/100?seed=default"
				alt="Default Avatar"
			/>
			<AvatarFallback>AB</AvatarFallback>
		</Avatar>
	),
};

export const Playground: Story = {
	args: {
		variant: "circle",
		size: "md",
		isActive: undefined,
		hideLoadingSkeleton: false,
		onLoadStateChange: action("load-state-changed"),
	},
	render: (args) => (
		<Avatar {...args}>
			<AvatarImage
				src="https://i.pravatar.cc/100?seed=playground"
				alt="Playground Avatar"
			/>
			<AvatarFallback>PG</AvatarFallback>
		</Avatar>
	),
};

// ============================================================================
// SIZE VARIANTS
// ============================================================================

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"Avatar component supports 4 different sizes: sm (32px), md (40px), lg (48px), and xl (64px).",
			},
		},
	},
	render: () => (
		<div className="flex items-end gap-4">
			<div className="flex flex-col items-center gap-2">
				<Avatar size="sm">
					<AvatarImage
						src="https://i.pravatar.cc/100?seed=sm"
						alt="Small Avatar"
					/>
					<AvatarFallback>SM</AvatarFallback>
				</Avatar>
				<span className="text-xs text-gray-500">Small (32px)</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Avatar size="md">
					<AvatarImage
						src="https://i.pravatar.cc/100?seed=md"
						alt="Medium Avatar"
					/>
					<AvatarFallback>MD</AvatarFallback>
				</Avatar>
				<span className="text-xs text-gray-500">Medium (40px)</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Avatar size="lg">
					<AvatarImage
						src="https://i.pravatar.cc/100?seed=lg"
						alt="Large Avatar"
					/>
					<AvatarFallback>LG</AvatarFallback>
				</Avatar>
				<span className="text-xs text-gray-500">Large (48px)</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Avatar size="xl">
					<AvatarImage
						src="https://i.pravatar.cc/100?seed=xl"
						alt="Extra Large Avatar"
					/>
					<AvatarFallback>XL</AvatarFallback>
				</Avatar>
				<span className="text-xs text-gray-500">Extra Large (64px)</span>
			</div>
		</div>
	),
};

// ============================================================================
// SHAPE VARIANTS
// ============================================================================

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Avatar supports both circular and square variants.",
			},
		},
	},
	render: () => (
		<div className="flex gap-6">
			<div className="flex flex-col items-center gap-2">
				<Avatar variant="circle" size="lg">
					<AvatarImage
						src="https://i.pravatar.cc/100?seed=circle"
						alt="Circle Avatar"
					/>
					<AvatarFallback>CI</AvatarFallback>
				</Avatar>
				<span className="text-sm text-gray-500">Circle</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Avatar variant="square" size="lg">
					<AvatarImage
						src="https://i.pravatar.cc/100?seed=square"
						alt="Square Avatar"
					/>
					<AvatarFallback>SQ</AvatarFallback>
				</Avatar>
				<span className="text-sm text-gray-500">Square</span>
			</div>
		</div>
	),
};

// ============================================================================
// STATUS INDICATORS
// ============================================================================

export const WithStatus: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"Avatar can display online/offline status indicators with proper accessibility labels.",
			},
		},
	},
	render: () => (
		<div className="flex gap-6">
			<div className="flex flex-col items-center gap-2">
				<Avatar isActive={true} size="lg">
					<AvatarImage
						src="https://i.pravatar.cc/100?seed=active"
						alt="Active User"
					/>
					<AvatarFallback>ON</AvatarFallback>
				</Avatar>
				<span className="text-sm text-green-600">Online</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Avatar isActive={false} size="lg">
					<AvatarImage
						src="https://i.pravatar.cc/100?seed=inactive"
						alt="Inactive User"
					/>
					<AvatarFallback>OFF</AvatarFallback>
				</Avatar>
				<span className="text-sm text-gray-500">Offline</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Avatar size="lg">
					<AvatarImage
						src="https://i.pravatar.cc/100?seed=nostatus"
						alt="User without status"
					/>
					<AvatarFallback>NS</AvatarFallback>
				</Avatar>
				<span className="text-sm text-gray-500">No Status</span>
			</div>
		</div>
	),
};

// ============================================================================
// FALLBACK STATES
// ============================================================================

export const WithFallback: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"When images fail to load or are unavailable, the avatar displays a fallback with initials or placeholder text.",
			},
		},
	},
	render: () => (
		<div className="flex gap-4">
			<div className="flex flex-col items-center gap-2">
				<Avatar>
					<AvatarImage src="" alt="No Image" />
					<AvatarFallback>AB</AvatarFallback>
				</Avatar>
				<span className="text-xs text-gray-500">Empty src</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Avatar>
					<AvatarImage
						src="https://invalid-url-that-will-fail.com/image.jpg"
						alt="Invalid Image"
					/>
					<AvatarFallback>CD</AvatarFallback>
				</Avatar>
				<span className="text-xs text-gray-500">Invalid URL</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Avatar>
					<AvatarFallback>EF</AvatarFallback>
				</Avatar>
				<span className="text-xs text-gray-500">Fallback only</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Avatar>
					<AvatarImage
						src="https://invalid-url.com/test.jpg"
						alt="No fallback"
					/>
				</Avatar>
				<span className="text-xs text-gray-500">Default fallback</span>
			</div>
		</div>
	),
};

// ============================================================================
// LOADING STATES
// ============================================================================

export const LoadingStates: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"Avatar shows loading skeleton while images are being fetched. You can customize or disable the loading state.",
			},
		},
	},
	render: () => (
		<div className="flex gap-6">
			<div className="flex flex-col items-center gap-2">
				<Avatar>
					<AvatarImage
						src={`https://i.pravatar.cc/100?seed=slow&cachebust=${Date.now()}`}
						alt="Slow loading image"
					/>
					<AvatarFallback>SL</AvatarFallback>
				</Avatar>
				<span className="text-xs text-gray-500">With skeleton</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Avatar hideLoadingSkeleton>
					<AvatarImage
						src={`https://i.pravatar.cc/100?seed=noskeleton&cachebust=${Date.now()}`}
						alt="No skeleton"
					/>
					<AvatarFallback>NS</AvatarFallback>
				</Avatar>
				<span className="text-xs text-gray-500">No skeleton</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Avatar
					loadingComponent={
						<div className="h-full w-full bg-blue-200 animate-pulse rounded-full flex items-center justify-center">
							<span className="text-blue-600 text-xs">...</span>
						</div>
					}
				>
					<AvatarImage
						src={`https://i.pravatar.cc/100?seed=custom&cachebust=${Date.now()}`}
						alt="Custom loading"
					/>
					<AvatarFallback>CL</AvatarFallback>
				</Avatar>
				<span className="text-xs text-gray-500">Custom loading</span>
			</div>
		</div>
	),
};

// ============================================================================
// CONTROLLED STATE
// ============================================================================

export const ControlledState: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"Avatar supports controlled state management for external monitoring of loading states.",
			},
		},
	},
	render: () => {
		const [loadingState, setLoadingState] =
			React.useState<LoadingState>("idle");

		return (
			<div className="flex flex-col items-center gap-4">
				<Avatar onLoadStateChange={setLoadingState}>
					<AvatarImage
						src={`https://i.pravatar.cc/100?seed=controlled&cachebust=${Date.now()}`}
						alt="Controlled Avatar"
					/>
					<AvatarFallback>CT</AvatarFallback>
				</Avatar>
				<div className="text-sm">
					<span className="font-medium">Loading State: </span>
					<span
						className={`
            px-2 py-1 rounded text-xs font-medium
            ${loadingState === "loading" ? "bg-blue-100 text-blue-800" : ""}
            ${loadingState === "loaded" ? "bg-green-100 text-green-800" : ""}
            ${loadingState === "error" ? "bg-red-100 text-red-800" : ""}
            ${loadingState === "idle" ? "bg-gray-100 text-gray-800" : ""}
          `}
					>
						{loadingState}
					</span>
				</div>
			</div>
		);
	},
};

// ============================================================================
// COMPREHENSIVE COMBINATIONS
// ============================================================================

export const VariantSizeCombinations: Story = {
	parameters: {
		docs: {
			description: {
				story: "Complete matrix of all size and variant combinations.",
			},
		},
	},
	render: () => (
		<div className="grid grid-cols-4 gap-6">
			{(["sm", "md", "lg", "xl"] as const).flatMap((size) =>
				["circle", "square"].map((variant) => (
					<div
						key={`${variant}-${size}`}
						className="flex flex-col items-center gap-2"
					>
						<Avatar variant={variant as AvatarVariant} size={size}>
							<AvatarImage
								src={`https://i.pravatar.cc/100?seed=${variant}-${size}`}
								alt={`${size} ${variant} avatar`}
							/>
							<AvatarFallback>
								{size.toUpperCase().slice(0, 1)}
								{variant.toUpperCase().slice(0, 1)}
							</AvatarFallback>
						</Avatar>
						<span className="text-xs text-gray-500 text-center">
							{size} {variant}
						</span>
					</div>
				)),
			)}
		</div>
	),
};

// ============================================================================
// AVATAR STACK STORIES
// ============================================================================

export const StackedAvatars: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"AvatarStack component for displaying multiple avatars with overflow handling.",
			},
		},
	},
	render: () => (
		<div className="flex flex-col gap-6">
			<div>
				<h3 className="text-sm font-medium mb-2">Default Stack</h3>
				<AvatarStack
					avatars={[
						{
							id: 1,
							src: "https://i.pravatar.cc/100?seed=user1",
							alt: "Alice Johnson",
							isActive: true,
						},
						{
							id: 2,
							src: "https://i.pravatar.cc/100?seed=user2",
							alt: "Bob Smith",
						},
						{ id: 3, alt: "Charlie Brown", isActive: false },
						{ id: 4, alt: "Diana Prince" },
						{ id: 5, alt: "Edward Norton" },
						{ id: 6, alt: "Fiona Green" },
					]}
				/>
			</div>

			<div>
				<h3 className="text-sm font-medium mb-2">Different Sizes</h3>
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-4">
						<span className="text-xs text-gray-500 w-16">Small:</span>
						<AvatarStack
							size="sm"
							avatars={[
								{ src: "https://i.pravatar.cc/100?seed=sm1", alt: "User 1" },
								{ src: "https://i.pravatar.cc/100?seed=sm2", alt: "User 2" },
								{ alt: "User 3" },
								{ alt: "User 4" },
							]}
						/>
					</div>
					<div className="flex items-center gap-4">
						<span className="text-xs text-gray-500 w-16">Large:</span>
						<AvatarStack
							size="lg"
							avatars={[
								{ src: "https://i.pravatar.cc/100?seed=lg1", alt: "User 1" },
								{ src: "https://i.pravatar.cc/100?seed=lg2", alt: "User 2" },
								{ alt: "User 3" },
								{ alt: "User 4" },
							]}
						/>
					</div>
				</div>
			</div>
		</div>
	),
};

export const InteractiveAvatarStack: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"Avatar stack with click handlers and keyboard navigation support.",
			},
		},
	},
	render: () => (
		<div className="flex flex-col gap-4">
			<AvatarStack
				avatars={[
					{
						id: 1,
						src: "https://i.pravatar.cc/100?seed=int1",
						alt: "Alice (click me)",
						isActive: true,
					},
					{
						id: 2,
						src: "https://i.pravatar.cc/100?seed=int2",
						alt: "Bob (click me)",
					},
					{ id: 3, alt: "Charlie (click me)", isActive: false },
					{ id: 4, alt: "Diana (click me)" },
					{ id: 5, alt: "Edward (click me)" },
				]}
				onAvatarClick={action("avatar-clicked")}
				maxDisplay={3}
			/>
			<p className="text-xs text-gray-500">
				Try clicking on the avatars or using keyboard navigation (Tab +
				Enter/Space)
			</p>
		</div>
	),
};

export const CustomOverflowStack: Story = {
	parameters: {
		docs: {
			description: {
				story: "Avatar stack with custom overflow component styling.",
			},
		},
	},
	render: () => (
		<AvatarStack
			maxDisplay={2}
			avatars={Array.from({ length: 8 }, (_, i) => ({
				id: i + 1,
				src: `https://i.pravatar.cc/100?seed=overflow${i + 1}`,
				alt: `User ${i + 1}`,
				isActive: i % 3 === 0,
			}))}
			overflowComponent={(count) => (
				<div className="flex h-10 w-10 -ml-3 z-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-xs font-bold text-white border-2 border-white shadow-lg">
					+{count}
				</div>
			)}
		/>
	),
};

// ============================================================================
// ERROR HANDLING
// ============================================================================

export const WithErrorBoundary: Story = {
	parameters: {
		docs: {
			description: {
				story: "Avatar with error boundary for graceful error handling.",
			},
		},
	},
	render: () => (
		<div className="flex gap-4">
			<AvatarErrorBoundary>
				<Avatar>
					<AvatarImage
						src="https://i.pravatar.cc/100?seed=safe"
						alt="Safe Avatar"
					/>
					<AvatarFallback>SF</AvatarFallback>
				</Avatar>
			</AvatarErrorBoundary>

			<AvatarErrorBoundary
				fallback={() => (
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-xs border border-orange-200">
						⚠️
					</div>
				)}
			>
				<Avatar>
					<AvatarImage
						src="https://i.pravatar.cc/100?seed=custom-error"
						alt="Custom Error Avatar"
					/>
					<AvatarFallback>CE</AvatarFallback>
				</Avatar>
			</AvatarErrorBoundary>
		</div>
	),
};

// ============================================================================
// ACCESSIBILITY TESTING
// ============================================================================

export const AccessibilityDemo: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"Demonstration of accessibility features including keyboard navigation and screen reader support.",
			},
		},
	},
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex gap-4">
				<Avatar isActive={true} tabIndex={0}>
					<AvatarImage
						src="https://i.pravatar.cc/100?seed=a11y1"
						alt="Online user Alice Johnson"
					/>
					<AvatarFallback>AJ</AvatarFallback>
				</Avatar>
				<Avatar isActive={false} tabIndex={0}>
					<AvatarImage
						src="https://i.pravatar.cc/100?seed=a11y2"
						alt="Offline user Bob Smith"
					/>
					<AvatarFallback>BS</AvatarFallback>
				</Avatar>
				<Avatar tabIndex={0}>
					<AvatarFallback>No status user Charlie</AvatarFallback>
				</Avatar>
			</div>
			<p className="text-xs text-gray-500">
				Try using Tab to navigate and screen reader to test accessibility
			</p>
		</div>
	),
};
