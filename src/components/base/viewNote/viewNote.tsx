import {
	Button,
	type ButtonProps,
	Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalTrigger,
} from "@/components/ui";
import { X } from "lucide-react";
import React, { useCallback, useMemo } from "react";

/**
 * Represents a note with metadata and content
 */
export interface Note {
	/** Unique identifier for the note */
	id: string;
	/** Display label for the note */
	label: string;
	/** Hex color code for the label background (e.g., "#17A2B8") */
	labelColor: string;
	/** Author's full name */
	author: string;
	/** Author's role or title */
	role: string;
	/** ISO 8601 timestamp or formatted date string */
	timestamp: string;
	/** Note content/body text */
	content: string;
}

/**
 * Props for the modal trigger button
 */
export interface ModalTriggerButtonProps extends Omit<ButtonProps, "children"> {
	/** Button text content */
	text: string;
}

/**
 * Props for the ViewNote modal component
 */
export interface ViewNoteModalProps {
	/** Whether the modal is open (controlled) */
	open?: boolean;
	/** Callback fired when open state changes */
	onOpenChange?: (open: boolean) => void;
	/** Modal title */
	title?: string;
	/** Modal description/subtitle */
	description?: string;
	/** CSS class name for the modal content */
	className?: string;
	/** Configuration for the modal trigger button */
	modalButton?: ModalTriggerButtonProps;
	/** List of notes to display */
	notes?: readonly Note[];
	/** Custom header content (replaces default header) */
	customHeader?: React.ReactNode;
	/** Custom content (replaces entire modal body) */
	customContent?: React.ReactNode;
	/** Whether to hide the close button */
	hideCloseButton?: boolean;
	/** Accessible label for the modal */
	"aria-label"?: string;
	/** ID of element that describes the modal */
	"aria-describedby"?: string;
}

/**
 * Default configuration for the modal trigger button
 */
const DEFAULT_MODAL_BUTTON: ModalTriggerButtonProps = {
	text: "View Notes",
	size: "md",
	variant: "default",
	outlined: true,
	widthFull: false,
	loading: false,
	disabled: false,
} as const;

/**
 * ViewNote Modal Component
 *
 * A fully controlled modal component for displaying a collection of notes with metadata.
 * Supports accessibility features, customization, and follows modern React patterns.
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * const notes = [
 *   {
 *     id: '1',
 *     label: 'Important',
 *     labelColor: '#dc3545',
 *     author: 'John Doe',
 *     role: 'Manager',
 *     timestamp: '2024-01-15T10:30:00Z',
 *     content: 'This is an important note about the project.'
 *   }
 * ];
 *
 * <ViewNote
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Project Notes"
 *   notes={notes}
 * />
 * ```
 */
export const ViewNote = React.memo<ViewNoteModalProps>(
	({
		open = false,
		onOpenChange,
		title = "View Notes",
		description,
		className = "",
		modalButton = DEFAULT_MODAL_BUTTON,
		notes = [],
		customHeader,
		customContent,
		hideCloseButton = false,
		"aria-label": ariaLabel,
		"aria-describedby": ariaDescribedBy,
	}) => {
		const buttonConfig = useMemo(
			() => ({ ...DEFAULT_MODAL_BUTTON, ...modalButton }),
			[modalButton],
		);

		const handleClose = useCallback(() => {
			onOpenChange?.(false);
		}, [onOpenChange]);

		const handleTriggerClick = useCallback(() => {
			onOpenChange?.(true);
		}, [onOpenChange]);

		const modalId = useMemo(
			() => `modal-${Math.random().toString(36).substr(2, 9)}`,
			[],
		);
		const titleId = `${modalId}-title`;
		const descriptionId = description ? `${modalId}-description` : undefined;

		const renderedNotes = useMemo(() => {
			if (!Array.isArray(notes) || notes.length === 0) {
				return (
					<div className="text-center py-8">
						<p className="text-sm text-[hsl(var(--text-light))]">
							No notes to display
						</p>
					</div>
				);
			}

			return (
				<div className="space-y-6" aria-label="Notes list">
					{notes.map((note) => (
						<article
							key={note.id}
							className="space-y-2"
							aria-labelledby={`note-${note.id}-author`}
						>
							<div className="flex items-center gap-2">
								<span
									className="inline-flex items-center px-3 py-1 rounded text-white text-sm font-medium"
									style={{ backgroundColor: note.labelColor }}
									aria-label={`Note category: ${note.label}`}
								>
									{note.label}
								</span>
							</div>

							<div className="flex flex-col gap-1">
								<p
									id={`note-${note.id}-author`}
									className="text-sm font-semibold text-[hsl(var(--text-dark))]"
								>
									{note.author}
									{note.role && (
										<span className="font-normal text-[hsl(var(--text-light))]">
											({note.role})
										</span>
									)}
								</p>
								<time
									className="text-xs text-[hsl(var(--text-light))]"
									dateTime={note.timestamp}
									title={new Date(note.timestamp).toLocaleString()}
								>
									{note.timestamp}
								</time>
							</div>

							<div className="px-4 py-3 rounded bg-[hsl(var(--bg-light))] border border-[hsl(var(--border))]">
								<p className="text-sm text-[hsl(var(--text-dark))] whitespace-pre-wrap">
									{note.content}
								</p>
							</div>
						</article>
					))}
				</div>
			);
		}, [notes]);

		return (
			<Modal open={open} onOpenChange={onOpenChange}>
				<ModalTrigger asChild>
					<Button
						{...buttonConfig}
						onClick={handleTriggerClick}
						aria-haspopup="dialog"
						aria-expanded={open}
						aria-controls={open ? modalId : undefined}
					>
						{buttonConfig.text}
					</Button>
				</ModalTrigger>

				<ModalContent
					id={modalId}
					className={`px-6 py-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg ${className}`}
					aria-labelledby={titleId}
					aria-describedby={ariaDescribedBy || descriptionId}
					aria-label={ariaLabel}
					aria-modal="true"
				>
					<ModalHeader className="relative pb-4">
						{!hideCloseButton && (
							<Button
								onClick={handleClose}
								size="icon"
								variant="ghost"
								className="absolute -right-2 -top-2 rounded-full hover:bg-[hsl(var(--bg-light))]"
								aria-label="Close modal"
								type="button"
							>
								<X className="h-4 w-4" aria-hidden="true" />
							</Button>
						)}

						{customHeader ?? (
							<div className="space-y-2">
								<ModalTitle
									id={titleId}
									className="text-xl font-semibold text-[hsl(var(--text-dark))] pr-8"
								>
									{title}
								</ModalTitle>
								{description && (
									<p
										id={descriptionId}
										className="text-sm text-[hsl(var(--text-light))]"
									>
										{description}
									</p>
								)}
							</div>
						)}
					</ModalHeader>

					<div className="space-y-4">
						{customContent ?? (
							<>
								{(customHeader || title || description) && (
									<hr className="border-[hsl(var(--border))]" />
								)}

								<div className="min-h-[200px]">{renderedNotes}</div>

								<hr className="border-[hsl(var(--border))]" />

								<div className="flex justify-end pt-2">
									<Button onClick={handleClose} variant="outline" type="button">
										Close
									</Button>
								</div>
							</>
						)}
					</div>
				</ModalContent>
			</Modal>
		);
	},
);

ViewNote.displayName = "ViewNote";
