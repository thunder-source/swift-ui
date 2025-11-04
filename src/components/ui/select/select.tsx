import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { type VariantProps, cva } from "class-variance-authority";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";

const selectVariants = cva(
	"flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
	{
		variants: {
			variant: {
				default:
					"bg-[hsl(var(--bg-white))] border-input text-[hsl(var(--text-medium))] data-[placeholder]:text-[hsl(var(--text-medium))]/60",
				primary:
					"bg-[hsl(var(--primary-blue))] text-white shadow-xs border-1 border-[hsl(var(--primary-blue))] hover:border-[hsl(var(--primary-blue))]/90 hover:bg-[hsl(var(--primary-blue))]/90 dark:bg-input/30 data-[placeholder]:text-white/80",
				destructive:
					"bg-[hsl(var(--primary-orange))] text-white shadow-xs hover:bg-white border-1 border-[hsl(var(--primary-orange))] hover:border-[hsl(var(--primary-orange))]/90 hover:bg-[hsl(var(--primary-orange))]/90 dark:bg-input/30 data-[placeholder]:text-white/80",
				outline:
					"border bg-background border-1 border-[hsl(var(--bg-grey))] text-[hsl(var(--text-medium))] shadow-xs hover:bg-accent hover:text-[hsl(var(--text-medium))]/80 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 data-[placeholder]:text-[hsl(var(--text-medium))]/60",
				secondary:
					"bg-[hsl(var(--text-medium))] text-white shadow-xs hover:bg-[hsl(var(--text-medium))]/90 border-1 border-[hsl(var(--text-medium))] data-[placeholder]:text-white/80",
				danger:
					"bg-[hsl(var(--status-error))] border-1 border-[hsl(var(--status-error))] text-white shadow-xs hover:bg-[hsl(var(--status-error))]/90 data-[placeholder]:text-white/80",
				dark: "bg-[hsl(var(--text-dark))] border-1 border-[hsl(var(--text-dark))] text-white shadow-xs hover:bg-[hsl(var(--text-dark))]/90 data-[placeholder]:text-white/80",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const selectContentVariants = cva(
	"relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[var(--radix-select-content-transform-origin)]",
	{
		variants: {
			variant: {
				default:
					"bg-white border-[hsl(var(--bg-grey))] text-[hsl(var(--text-medium))]",
				primary:
					"bg-[hsl(var(--primary-blue))] border-[hsl(var(--primary-blue))] text-white",
				destructive:
					"bg-[hsl(var(--primary-orange))] border-[hsl(var(--primary-orange))] text-white",
				outline:
					"bg-white border-[hsl(var(--bg-grey))] text-[hsl(var(--text-medium))]",
				secondary:
					"bg-[hsl(var(--text-medium))] border-[hsl(var(--text-medium))] text-white",
				danger:
					"bg-[hsl(var(--status-error))] border-[hsl(var(--status-error))] text-white",
				dark: "bg-[hsl(var(--text-dark))] border-[hsl(var(--text-dark))] text-white",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
		icon?: React.ReactNode;
		renderIcon?: () => React.ReactNode;
		variant?: VariantProps<typeof selectVariants>["variant"];
	}
>(({ className, children, icon, renderIcon, variant, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className={cn(selectVariants({ variant }), className)}
		{...props}
	>
		{children}
		<SelectPrimitive.Icon asChild>
			{renderIcon
				? renderIcon()
				: (icon ?? <ChevronDown className="h-4 w-4 opacity-50" />)}
		</SelectPrimitive.Icon>
	</SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollUpButton
		ref={ref}
		className={cn(
			"flex cursor-default items-center justify-center py-1",
			className,
		)}
		{...props}
	>
		<ChevronUp className="h-4 w-4" />
	</SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollDownButton
		ref={ref}
		className={cn(
			"flex cursor-default items-center justify-center py-1",
			className,
		)}
		{...props}
	>
		<ChevronDown className="h-4 w-4" />
	</SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
	SelectPrimitive.ScrollDownButton.displayName;

export interface SelectContentProps
	extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
	searchable?: boolean;
	searchPlaceholder?: string;
	noResultsElement?: React.ReactNode;
	searchClassName?: string;
	variant?: VariantProps<typeof selectContentVariants>["variant"];
}

const SelectContent = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Content>,
	SelectContentProps
>(
	(
		{
			className,
			children,
			position = "popper",
			searchable = false,
			searchPlaceholder = "Search...",
			noResultsElement,
			searchClassName,
			variant,
			...props
		},
		ref,
	) => {
		const [searchTerm, setSearchTerm] = React.useState("");
		// helper: extract text from React nodes
		const extractText = (node: React.ReactNode): string => {
			if (typeof node === "string") return node;
			if (Array.isArray(node)) return node.map(extractText).join("");
			if (React.isValidElement(node)) {
				const elem = node as React.ReactElement<{ children?: React.ReactNode }>;
				return extractText(elem.props.children);
			}
			return "";
		};

		const collectItems = (
			nodes: React.ReactNode,
		): React.ReactElement<
			React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
		>[] => {
			return React.Children.toArray(nodes).flatMap((child) => {
				if (!React.isValidElement(child)) return [];
				// If it's an Item, return it
				if (
					(child.type &&
						(child.type as { displayName?: string }).displayName) ===
					SelectPrimitive.Item.displayName
				) {
					return [
						child as React.ReactElement<
							React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
						>,
					];
				}
				// If it has children, recurse
				const reactChild = child as React.ReactElement<{
					children?: React.ReactNode;
				}>;
				if (reactChild.props?.children) {
					return collectItems(reactChild.props.children);
				}
				return [];
			});
		};

		const allItems = collectItems(children);
		const searchLower = searchTerm.toLowerCase();
		const results =
			searchable && searchTerm
				? allItems.filter((child) => {
						const elem = child as React.ReactElement<{
							value?: string;
							children?: React.ReactNode;
						}>;
						const label = extractText(elem.props.children);
						const value = String(elem.props.value ?? "");
						return (
							label.toLowerCase().includes(searchLower) ||
							value.toLowerCase().includes(searchLower)
						);
					})
				: allItems;
		const itemsToRender = results.map((child, i) =>
			React.cloneElement(child, { key: child.key ?? i }),
		);
		const noResults = noResultsElement ?? (
			<div className="px-2 py-2 text-sm text-muted-foreground">
				No results found.
			</div>
		);
		return (
			<SelectPrimitive.Portal>
				<SelectPrimitive.Content
					ref={ref}
					className={cn(
						selectContentVariants({ variant }),
						position === "popper" &&
							"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
						className,
					)}
					position={position}
					{...props}
				>
					{searchable && (
						<div className="p-2">
							<input
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								onKeyPress={(e) => e.stopPropagation()}
								onKeyDown={(e) => e.stopPropagation()}
								onKeyUp={(e) => e.stopPropagation()}
								placeholder={searchPlaceholder}
								className={cn(
									"w-full px-2 py-1 mb-1 border border-input rounded",
									searchClassName,
								)}
							/>
						</div>
					)}
					<SelectScrollUpButton />
					<SelectPrimitive.Viewport
						className={cn(
							"p-1",
							position === "popper" &&
								"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
						)}
					>
						{itemsToRender.length > 0 ? itemsToRender : noResults}
					</SelectPrimitive.Viewport>
					<SelectScrollDownButton />
				</SelectPrimitive.Content>
			</SelectPrimitive.Portal>
		);
	},
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Label
		ref={ref}
		className={cn("px-2 py-1.5 text-sm font-semibold", className)}
		{...props}
	/>
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
		variant?: VariantProps<typeof selectContentVariants>["variant"];
	}
>(({ className, children, variant, ...props }, ref) => (
	<>
		<SelectPrimitive.Item
			ref={ref}
			className={cn(
				"relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				"hover:bg-accent/60 hover:text-accent-foreground focus:bg-accent/60 focus:text-accent-foreground",
				className,
			)}
			{...props}
		>
			<span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<Check className="h-4 w-4" />
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
		<hr
			className={cn(
				"mx-1 my-1 h-px border-0 last:hidden",
				variant === "primary" && "bg-[hsl(var(--primary-blue))]/20",
				variant === "destructive" && "bg-[hsl(var(--primary-orange))]/20",
				variant === "secondary" && "bg-[hsl(var(--text-medium))]/20",
				variant === "danger" && "bg-[hsl(var(--status-error))]/20",
				variant === "dark" && "bg-[hsl(var(--text-dark))]/20",
				!variant && "bg-muted",
			)}
		/>
	</>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Separator
		ref={ref}
		className={cn("-mx-1 my-1 h-px bg-muted", className)}
		{...props}
	/>
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
	Select,
	SelectGroup,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectLabel,
	SelectItem,
	SelectSeparator,
	SelectScrollUpButton,
	SelectScrollDownButton,
};
