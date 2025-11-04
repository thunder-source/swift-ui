import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { Skeleton } from "../skeleton/skeleton";

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

/** Avatar shape variants */
const AVATAR_VARIANTS = ["circle", "square"] as const;
type AvatarVariant = (typeof AVATAR_VARIANTS)[number];

/** Avatar size variants */
const AVATAR_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
type AvatarSize = (typeof AVATAR_SIZES)[number];

/** Loading states for avatar image */
type LoadingState = "idle" | "loading" | "loaded" | "error";

/** Avatar data structure for stack component */
interface AvatarData {
	/** Image source URL */
	src?: string;
	/** Alt text for accessibility */
	alt?: string;
	/** Online/active status indicator */
	isActive?: boolean;
	/** Unique identifier for keying */
	id?: string | number;
}

// ============================================================================
// STYLES
// ============================================================================

const avatarVariants = cva(
	"relative flex items-center justify-center border border-[hsl(var(--border-grey))]",
	{
		variants: {
			variant: {
				circle: "rounded-full",
				square: "rounded-md",
			} satisfies Record<AvatarVariant, string>,
			size: {
				xs: "h-6 w-6 max-h-6 max-w-6 min-h-6 min-w-6 text-xs",
				sm: "h-8 w-8 max-h-8 max-w-8 min-h-8 min-w-8 text-xs",
				md: "h-10 w-10 max-h-10 max-w-10 min-h-10 min-w-10 text-sm",
				lg: "h-12 w-12 max-h-12 max-w-12 min-h-12 min-w-12 text-base",
				xl: "h-16 w-16 max-h-16 max-w-16 min-h-16 min-w-16 text-lg",
			} satisfies Record<AvatarSize, string>,
		},
		defaultVariants: {
			variant: "circle",
			size: "md",
		},
	},
);

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Custom hook for managing image loading state with error handling
 * @param src - Image source URL
 * @param onLoadStateChange - Optional callback for state changes
 */
const useImageLoader = (
	src?: string,
	onLoadStateChange?: (state: LoadingState) => void,
) => {
	const [loadingState, setLoadingState] = React.useState<LoadingState>("idle");

	const updateState = React.useCallback(
		(newState: LoadingState) => {
			setLoadingState(newState);
			onLoadStateChange?.(newState);
		},
		[onLoadStateChange],
	);

	React.useEffect(() => {
		if (!src?.trim()) {
			updateState("idle");
			return;
		}

		updateState("loading");

		const img = new Image();
		let isCancelled = false;

		img.onload = () => {
			if (!isCancelled) {
				updateState("loaded");
			}
		};

		img.onerror = () => {
			if (!isCancelled) {
				updateState("error");
			}
		};

		img.src = src;

		return () => {
			isCancelled = true;
			img.onload = null;
			img.onerror = null;
		};
	}, [src, updateState]);

	return {
		loadingState,
		isLoading: loadingState === "loading",
		hasError: loadingState === "error",
		isLoaded: loadingState === "loaded",
	};
};

// ============================================================================
// AVATAR IMAGE COMPONENT
// ============================================================================

interface AvatarImageProps
	extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "variant"> {
	/** Shape variant of the avatar */
	variant?: AvatarVariant;
	/** Controlled loading state callback */
	onLoadStateChange?: (state: LoadingState) => void;
}

/**
 * Avatar image component with optimized loading and error handling
 */
const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
	(
		{
			className,
			src,
			alt = "User avatar",
			variant = "circle",
			onLoadStateChange,
			...props
		},
		ref,
	) => {
		const altText = alt || "User avatar";
		const { loadingState } = useImageLoader(src, onLoadStateChange);

		if (!src?.trim()) return null;

		return (
			// biome-ignore lint/a11y/useAltText: alt prop is provided via props
			<img
				ref={ref}
				className={cn(
					"h-full w-full object-cover transition-opacity duration-200",
					variant === "circle" ? "rounded-full" : "rounded-md",
					loadingState === "loading" ? "opacity-0" : "opacity-100",
					className,
				)}
				src={src}
				alt={alt}
				aria-label={!altText ? "User avatar" : undefined}
				loading="lazy"
				decoding="async"
				{...props}
			/>
		);
	},
);
AvatarImage.displayName = "AvatarImage";

// ============================================================================
// AVATAR FALLBACK COMPONENT
// ============================================================================

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
	/** Shape variant of the avatar */
	variant?: AvatarVariant;
}

/**
 * Avatar fallback component shown when image fails to load or is unavailable
 */
const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
	({ className, children, variant = "circle", ...props }, ref) => (
		<span
			ref={ref}
			className={cn(
				"flex h-full w-full items-center justify-center bg-[hsla(var(--bg-pale),1)] text-[hsl(var(--text-medium))] font-medium select-none",
				variant === "circle" ? "rounded-full" : "rounded-md",
				className,
			)}
			role="img"
			aria-label="Avatar fallback"
			{...props}
		>
			{children || "?"}
		</span>
	),
);
AvatarFallback.displayName = "AvatarFallback";

// ============================================================================
// MAIN AVATAR COMPONENT
// ============================================================================

interface AvatarProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "variant">,
		VariantProps<typeof avatarVariants> {
	/** Online/active status indicator */
	isActive?: boolean;
	/** Shape variant of the avatar */
	variant?: AvatarVariant;
	/** Size variant of the avatar */
	size?: AvatarSize;
	/** Child components (AvatarImage, AvatarFallback) */
	children?: React.ReactNode;
	/** Controlled loading state callback */
	onLoadStateChange?: (state: LoadingState) => void;
	/** Custom loading component */
	loadingComponent?: React.ReactNode;
	/** Disable loading skeleton */
	hideLoadingSkeleton?: boolean;
}

/**
 * Avatar component with image loading, fallback support, and status indicators
 *
 * @example
 * ```tsx
 * <Avatar size="lg" isActive={true}>
 *   <AvatarImage src="/user.jpg" alt="John Doe" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
	(
		{
			className,
			isActive,
			children,
			variant = "circle",
			size = "md",
			onLoadStateChange,
			loadingComponent,
			hideLoadingSkeleton = false,
			...props
		},
		ref,
	) => {
		const [internalLoadingState, setInternalLoadingState] =
			React.useState<LoadingState>("idle");

		const handleLoadStateChange = React.useCallback(
			(state: LoadingState) => {
				setInternalLoadingState(state);
				onLoadStateChange?.(state);
			},
			[onLoadStateChange],
		);

		const childrenArray = React.Children.toArray(children);

		const avatarImage = childrenArray.find(
			(child): child is React.ReactElement<AvatarImageProps> =>
				React.isValidElement(child) && child.type === AvatarImage,
		);

		const avatarFallback = childrenArray.find(
			(child): child is React.ReactElement<AvatarFallbackProps> =>
				React.isValidElement(child) && child.type === AvatarFallback,
		);

		const src = avatarImage?.props.src?.trim();
		const isLoading = internalLoadingState === "loading";
		const hasError = internalLoadingState === "error";
		const shouldShowImage = !!src && !hasError;

		const statusIndicatorSize = React.useMemo(() => {
			const sizeMap: Record<AvatarSize, string> = {
				xs: "h-1.5 w-1.5 border-[0.5px]",
				sm: "h-2 w-2 border-[1px]",
				md: "h-3 w-3 border-[1.5px]",
				lg: "h-3.5 w-3.5 border-[2px]",
				xl: "h-4 w-4 border-[2px]",
			};
			return sizeMap[size];
		}, [size]);

		return (
			<div
				ref={ref}
				className={cn(avatarVariants({ variant, size }), className)}
				role="img"
				aria-label="User avatar"
				{...props}
			>
				{/* Loading State */}
				{isLoading && !hideLoadingSkeleton && (
					<div className="absolute inset-0 z-10">
						{loadingComponent || (
							<Skeleton
								className={cn(
									"h-full w-full ",
									variant === "circle" ? "rounded-full" : "rounded-md",
								)}
							/>
						)}
					</div>
				)}

				{/* Main Content */}
				<div
					className={cn("h-full w-full", isLoading ? "invisible" : "visible")}
				>
					{shouldShowImage && avatarImage
						? React.cloneElement(avatarImage, {
								variant,
								onLoadStateChange: handleLoadStateChange,
							})
						: avatarFallback || <AvatarFallback variant={variant} />}
				</div>

				{/* Status Indicator */}
				{typeof isActive === "boolean" && (
					<span
						className={cn(
							"absolute bottom-0 right-0 rounded-full border-[hsl(var(--bg-white))] z-20 transition-colors duration-200",
							statusIndicatorSize,
							isActive
								? "bg-[hsl(var(--status-success))]"
								: "bg-[hsl(var(--status-error))]",
							"ring-2 ring-[hsl(var(--bg-white))] dark:ring-[hsl(var(--text-dark))]",
						)}
						role="status"
						aria-label={isActive ? "Online" : "Offline"}
					/>
				)}
			</div>
		);
	},
);
Avatar.displayName = "Avatar";

// ============================================================================
// AVATAR STACK COMPONENT
// ============================================================================

interface AvatarStackProps {
	/** Array of avatar data */
	avatars: AvatarData[];
	/** Maximum number of avatars to display before showing overflow */
	maxDisplay?: number;
	/** Custom CSS classes */
	className?: string;
	/** Size of avatars in the stack */
	size?: AvatarSize;
	/** Variant of avatars in the stack */
	variant?: AvatarVariant;
	/** Custom overflow component */
	overflowComponent?: (count: number) => React.ReactNode;
	/** Callback when avatar is clicked */
	onAvatarClick?: (avatar: AvatarData, index: number) => void;
}

/**
 * Avatar stack component for displaying multiple avatars with overflow indicator
 *
 * @example
 * ```tsx
 * <AvatarStack
 *   avatars={users}
 *   maxDisplay={3}
 *   onAvatarClick={(avatar) => console.log('Clicked:', avatar)}
 * />
 * ```
 */
const AvatarStack = React.memo<AvatarStackProps>(
	({
		avatars,
		maxDisplay = 4,
		className,
		size = "md",
		variant = "circle",
		overflowComponent,
		onAvatarClick,
	}) => {
		const visibleAvatars = React.useMemo(
			() => avatars.slice(0, maxDisplay),
			[avatars, maxDisplay],
		);

		// Determine spacing based on avatar size
		const getSpacingBySize = React.useMemo(() => {
			const spacingMap: Record<AvatarSize, string> = {
				xs: "-2px",
				sm: "-5px",
				md: "-6px",
				lg: "-8px",
				xl: "-10px",
			};
			return spacingMap[size];
		}, [size]);

		const extraCount = Math.max(0, avatars.length - maxDisplay);

		const defaultOverflow = React.useCallback(
			(count: number) => (
				<button
					style={{
						zIndex: avatars.length + 1,
						marginLeft: `calc(3 * ${getSpacingBySize})`,
					}}
					className={cn(
						"relative flex items-center justify-center bg-[hsl(var(--text-dark))] text-xs font-medium text-[hsl(var(--bg-white))] border-2 border-[hsl(var(--bg-white))] cursor-pointer hover:bg-[hsl(var(--text-medium))] transition-colors",
						avatarVariants({ size, variant }),
					)}
					type="button"
					aria-label={`${count} more users`}
				>
					+{count}
				</button>
			),
			[size, variant, avatars.length, getSpacingBySize],
		);

		return (
			<fieldset className={cn("flex", className)} aria-label="User avatars">
				{visibleAvatars.map((avatar, index) => {
					const key = avatar.id ?? avatar.alt ?? index;
					const handleClick = onAvatarClick
						? () => onAvatarClick(avatar, index)
						: undefined;
					const zIndex = index + 1;

					return (
						<div
							key={key}
							className={cn(
								"hover:!z-10 transition-transform hover:scale-105",
								onAvatarClick ? "cursor-pointer" : undefined,
							)}
							onClick={handleClick}
							onKeyDown={(e) => {
								if (handleClick && (e.key === "Enter" || e.key === " ")) {
									e.preventDefault();
									handleClick();
								}
							}}
							style={{ zIndex, marginLeft: `calc(3 * ${getSpacingBySize})` }}
							tabIndex={onAvatarClick ? 0 : undefined}
							role={onAvatarClick ? "button" : undefined}
						>
							<Avatar size={size} variant={variant} isActive={avatar.isActive}>
								{avatar.src ? (
									<AvatarImage src={avatar.src} alt={avatar.alt || "User"} />
								) : (
									<AvatarFallback>
										{avatar.alt?.charAt(0).toUpperCase() || "?"}
									</AvatarFallback>
								)}
							</Avatar>
						</div>
					);
				})}

				{extraCount > 0 &&
					(overflowComponent?.(extraCount) || defaultOverflow(extraCount))}
			</fieldset>
		);
	},
);
AvatarStack.displayName = "AvatarStack";

// ============================================================================
// ERROR BOUNDARY
// ============================================================================

interface AvatarErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

interface AvatarErrorBoundaryProps {
	children: React.ReactNode;
	fallback?: React.ComponentType<{ error?: Error }>;
}

/**
 * Error boundary specifically for Avatar components
 */
class AvatarErrorBoundary extends React.Component<
	AvatarErrorBoundaryProps,
	AvatarErrorBoundaryState
> {
	constructor(props: AvatarErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): AvatarErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Avatar Error Boundary caught an error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			const FallbackComponent = this.props.fallback;

			if (FallbackComponent) {
				return <FallbackComponent error={this.state.error} />;
			}

			return (
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 text-xs">
					!
				</div>
			);
		}

		return this.props.children;
	}
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
	Avatar,
	AvatarImage,
	AvatarFallback,
	AvatarStack,
	AvatarErrorBoundary,
	useImageLoader,
	type AvatarProps,
	type AvatarImageProps,
	type AvatarFallbackProps,
	type AvatarStackProps,
	type AvatarData,
	type AvatarVariant,
	type AvatarSize,
	type LoadingState,
};
