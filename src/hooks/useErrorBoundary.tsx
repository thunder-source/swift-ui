/**
 * Error Boundary component to catch JavaScript errors anywhere in the child component tree
 * and display a fallback UI instead of crashing the whole application.
 *
 * @module ErrorBoundary
 */
import React from "react";

interface ErrorBoundaryProps {
	/** Content to render when no error is detected */
	children: React.ReactNode;
	/** UI to display when an error is caught */
	fallback: React.ReactNode;
}

interface ErrorBoundaryState {
	/** Indicates whether an error has been caught */
	hasError: boolean;
	/** The caught error object */
	error: Error | null;
}

/**
 * Error Boundary component that catches JavaScript errors in its child component tree
 * and displays a fallback UI instead of crashing the whole application.
 */
export class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		// Update state so the next render will show the fallback UI
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		// You can log the error to an error reporting service
		console.error("Error caught by ErrorBoundary:", error, errorInfo);
	}

	render(): React.ReactNode {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return this.props.fallback;
		}

		return this.props.children;
	}
}

/**
 * Hook version of ErrorBoundary for use in function components
 *
 * @param fallback - UI to display when an error is caught
 * @returns A tuple with the error boundary component and a function to manually trigger an error
 *
 * @example
 * const [ErrorBoundary, triggerError] = useErrorBoundary(<FallbackUI />);
 *
 * return (
 *   <ErrorBoundary>
 *     <ComponentThatMightError />
 *   </ErrorBoundary>
 * );
 */
export function useErrorBoundary(
	fallback: React.ReactNode,
): [React.FC<{ children: React.ReactNode }>, (error: Error) => void] {
	const [error, setError] = React.useState<Error | null>(null);

	const ErrorBoundaryComponent: React.FC<{ children: React.ReactNode }> = ({
		children,
	}) => {
		if (error) {
			return <>{fallback}</>;
		}
		return <>{children}</>;
	};

	const triggerError = (error: Error) => {
		setError(error);
		console.error("Error triggered manually:", error);
	};

	return [ErrorBoundaryComponent, triggerError];
}
