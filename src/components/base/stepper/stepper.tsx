import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { FC, ReactNode } from "react";

type StepperProps = {
	title?: string;
	subtitle?: string;
	steps: { label: string; content: ReactNode }[];
	currentStep: number;
	onStepChange: (index: number) => void;
	onNext: () => void;
	onPrev: () => void;
	className?: string;
	nextButtonText?: string;
	prevButtonText?: string;
};

const Stepper: FC<StepperProps> = ({
	title = "Add Employee",
	subtitle = "Complete the form to create a new employee profile.",
	steps,
	currentStep,
	onStepChange,
	onNext,
	onPrev,
	className,
	nextButtonText,
	prevButtonText = "Back",
}) => {
	const isFirstStep = currentStep === 0;
	const isLastStep = currentStep === steps.length - 1;

	// Determine the text for the next button based on whether we're on the last step
	const nextBtnText =
		nextButtonText || (isLastStep ? "Complete" : "Preview Form");

	return (
		<div
			className={cn(
				"max-w-6xl mx-auto p-6 bg-[hsl(var(--bg-white))] rounded-lg shadow-sm",
				className,
			)}
		>
			{/* Header */}
			{(title || subtitle) && (
				<div className="mb-4">
					{title && (
						<h1 className="text-xl font-semibold mb-1 text-[hsl(var(--text-dark))]">
							{title}
						</h1>
					)}
					{subtitle && (
						<p className="text-sm text-[hsla(var(--text-medium),0.7)]">
							{subtitle}
						</p>
					)}
				</div>
			)}

			{/* Stepper navigation */}
			<nav aria-label="Progress" className="mb-6">
				<div className="w-full h-1 bg-[hsl(var(--border-grey))] rounded-full overflow-hidden">
					{/* Progress bar */}
					<div
						className="h-full bg-[hsl(var(--primary-blue))] transition-all duration-300"
						style={{
							width: `${((currentStep + 1) / steps.length) * 100}%`,
						}}
						aria-hidden="true"
					/>
				</div>
				<div className="flex justify-between mb-1">
					{steps.map((step, index) => {
						const isActive = index <= currentStep;
						const isCurrent = index === currentStep;

						return (
							<button
								key={step.label}
								type="button"
								onClick={() => onStepChange(index)}
								className={cn(
									"text-sm font-medium py-1 px-2 focus:outline-none cursor-pointer",
									isActive
										? "text-[hsl(var(--primary-blue))]"
										: "text-[hsl(var(--text-light))]",
								)}
								aria-current={isCurrent ? "step" : undefined}
							>
								{step.label}
							</button>
						);
					})}
				</div>
			</nav>

			{/* Content */}
			<div className="min-h-[400px] flex flex-col">
				{/* Main content area */}
				<div className="flex-grow">{steps[currentStep].content}</div>

				{/* Navigation buttons */}
				<div className="mt-6 flex justify-end gap-4">
					{!isFirstStep && (
						<Button
							variant="outline"
							size="md"
							onClick={onPrev}
							aria-label="Go to previous step"
						>
							{prevButtonText}
						</Button>
					)}
					<Button
						variant={isLastStep ? "destructive" : "default"}
						size="md"
						onClick={onNext}
						aria-label={isLastStep ? "Complete process" : "Go to next step"}
					>
						{nextBtnText}
					</Button>
				</div>
			</div>
		</div>
	);
};

export { Stepper, type StepperProps };
