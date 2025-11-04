import { ErrorBoundary } from "@/hooks/useErrorBoundary"; // Assume this is defined elsewhere
/**
 * A composable Tabs component built on Radix UI's primitives with
 * multiple styling variants and accessibility features.
 *
 * @module Tabs
 */
import { cn } from "@/lib/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

// Re-export the root component
/**
 * Root Tabs component that manages tab state
 *
 * @example
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 */
const Tabs = TabsPrimitive.Root;

/**
 * Variant definitions for the TabsList component
 */
const tabsListVariants = cva(
	"inline-flex h-10 items-center justify-center text-muted-foreground",
	{
		variants: {
			variant: {
				default:
					"w-full border-b-2 px-0 pb-0 border-[hsl(var(--bg-pale))] justify-start",
				shadcn: "bg-muted rounded-md",
				outline: "rounded-md border border-border",
				ghost: "bg-transparent",
			},
			size: {
				sm: "",
				default: "",
				lg: "",
				md: "h-9",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

/**
 * Variant definitions for TabsTrigger component
 */
const tabsTriggerVariants = cva(
	"inline-flex items-center justify-center rounded-md text-muted-foreground cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"rounded-[0px] text-[hsl(var(--text-light))] data-[state=active]:text-[hsl(var(--primary-blue))] data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary-blue))] data-[state=inactive]:border-b-2 data-[state=inactive]:border-transparent !mx-0",
				outline:
					"border border-border text-muted-foreground bg-transparent hover:bg-muted/40",
				soft: "bg-muted text-foreground hover:bg-muted/80",
				ghost: "bg-transparent text-muted-foreground hover:bg-muted",
				shadcn:
					"inline-flex items-center !rounded-md justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=active]:bg-background data-[state=active]:text-foreground",
			},
			size: {
				sm: "px-2 py-1 text-xs",
				default: "px-3 py-1.5",
				lg: "px-4 py-2 text-base",
				md: "px-2 py-2 text-sm font-medium",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

/**
 * Props interface for the TabsList component
 */
interface TabsListProps
	extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
		VariantProps<typeof tabsListVariants> {}

/**
 * Container for tab triggers that provides layout and styling
 *
 * @param props - Props for the TabsList component
 * @returns TabsList component
 */
const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	TabsListProps
>(({ className, variant, size, ...props }, ref) => {
	return (
		<TabsPrimitive.List
			ref={ref}
			className={cn(tabsListVariants({ variant, size }), className)}
			{...props}
			aria-label={props["aria-label"] || "Tabs"}
		/>
	);
});

TabsList.displayName = "TabsList";

/**
 * Props interface for the TabsTrigger component
 */
interface TabsTriggerProps
	extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
		VariantProps<typeof tabsTriggerVariants> {
	/** Optionally disable this tab trigger */
	isDisabled?: boolean;
}

/**
 * Clickable tab element that controls visibility of associated content
 *
 * @param props - Props for the TabsTrigger component
 * @returns TabsTrigger component
 */
const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	TabsTriggerProps
>(({ className, variant, size, isDisabled, ...props }, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(tabsTriggerVariants({ variant, size }), className)}
		disabled={isDisabled}
		{...props}
	/>
));

TabsTrigger.displayName = "TabsTrigger";

/**
 * Styling variants for the TabsContent component
 */
const tabsContentVariants = cva("mt-2", {
	variants: {
		variant: {
			default: "border bg-background  ",
			ghost: "p-4",
			card: "rounded-lg border shadow-sm bg-background ",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

/**
 * Props interface for the TabsContent component
 */
interface TabsContentProps
	extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
		VariantProps<typeof tabsContentVariants> {
	/** Render fallback UI when content fails to load */
	fallback?: React.ReactNode;
	/** Show loading state instead of children */
	isLoading?: boolean;
}

/**
 * Container for tab content that is shown when associated tab is active
 *
 * @param props - Props for the TabsContent component
 * @returns TabsContent component
 */
const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	TabsContentProps
>(
	(
		{ className, variant = "default", fallback, isLoading, children, ...props },
		ref,
	) => (
		<ErrorBoundary fallback={fallback || <div>Something went wrong</div>}>
			<TabsPrimitive.Content
				ref={ref}
				className={cn(tabsContentVariants({ variant }), className)}
				{...props}
			>
				{isLoading ? (
					<div className="flex justify-center items-center min-h-[100px]">
						<div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
					</div>
				) : (
					children
				)}
			</TabsPrimitive.Content>
		</ErrorBoundary>
	),
);

TabsContent.displayName = "TabsContent";

export {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
	type TabsListProps,
	type TabsTriggerProps,
	type TabsContentProps,
};
