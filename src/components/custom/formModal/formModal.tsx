import { InputField, type InputFieldProps } from "@/components/base";
import {
	Button,
	type ButtonProps,
	Modal,
	ModalContent,
	ModalDescription,
	ModalHeader,
	ModalTitle,
	ModalTrigger,
} from "@/components/ui";
import { X } from "lucide-react";
import React from "react";

export interface FormModalProps {
	initialOpen?: boolean;
	title?: string;
	description?: string;
	onOpenChange?: (open: boolean) => void;
	className?: string;
	/** Array of field configurations to render */
	fields?: InputFieldProps[];
	modalButton?: ButtonProps & {
		text: string;
	};
	primaryButtonText?: string;
	cancelButtonText?: string;
	onPrimaryClick?: () => void;
	onCancelClick?: () => void;
	hideCancelButton?: boolean;
	buttonClass?: string;
	/** Custom header content to replace the default header */
	customHeader?: React.ReactNode;
	/** Custom content to replace the default form fields */
	customContent?: React.ReactNode;
	/** Custom footer content to replace the default footer */
	customFooter?: React.ReactNode;
}

/**
 * `FormModal` - A modal component with configurable input fields.
 *
 * @remarks
 * This component supports accessibility, theming, responsiveness, and customization.
 */
const FormModal: React.FC<FormModalProps> = ({
	initialOpen = false,
	title = "Add Note",
	description = "Note for Sheetal Sharma",
	onOpenChange,
	className = "",
	fields = [],
	modalButton = {
		text: "Add Note", // Default text
		onClick: () => {
			console.log("Note added");
		},
		size: "md",
		variant: "default", // Default variant
		iconLeft: null,
		iconRight: null,
		borderRadius: "md",
		borderRadiusHover: "md",
		HoverOutlined: true,
		outlined: true,
		widthFull: true,
		loading: false,
		disabled: false,
		asChild: false,
	},
	primaryButtonText,
	buttonClass,
	cancelButtonText,
	onPrimaryClick,
	onCancelClick,
	hideCancelButton = false,
	customHeader,
	customContent,
	customFooter,
}) => {
	const [open, setOpen] = React.useState(initialOpen);

	const handleOpenChange = (isOpen: boolean) => {
		if (onOpenChange) onOpenChange(isOpen);
		setOpen(isOpen);
	};

	return (
		<Modal open={open} onOpenChange={handleOpenChange}>
			<ModalTrigger asChild>
				<Button
					onClick={() => setOpen(true)}
					aria-haspopup="dialog"
					size={modalButton.size || "md"}
					className={modalButton.className}
					iconLeft={modalButton.iconLeft}
					iconRight={modalButton.iconRight}
					variant={modalButton.variant || "default"} // Default to "default" if variant is not provided
				>
					{modalButton.text || "Open Modal"}{" "}
					{/* Default to "Open Modal" if no text is provided */}
				</Button>
			</ModalTrigger>
			<ModalContent
				className={`px-6 py-4 w-full max-w-lg rounded-lg ${className}`}
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				<ModalHeader className="relative py-1">
					<Button
						onClick={() => setOpen(false)}
						size="icon"
						variant="default"
						iconLeft={<X className="h-4 w-4 text-white" />}
						className="absolute -right-9     -top-7 rounded-full shadow-md"
						aria-label="Close"
					/>

					{customHeader ? (
						customHeader
					) : (
						<>
							<ModalTitle
								id="modal-title"
								className="text-xl font-semibold text-[hsl(var(--text-dark))]"
							>
								{title}
							</ModalTitle>
							<p
								id="modal-description"
								className="text-sm text-[hsl(var(--text-light))]"
							>
								{description}
							</p>
							<hr />
						</>
					)}
				</ModalHeader>

				<ModalDescription className="text-base !text-[hsl(var(--text-medium))] ">
					{customContent ? (
						customContent
					) : (
						<div className="space-y-4">
							{fields.map((field) => (
								<InputField key={field.name} {...field} />
							))}
						</div>
					)}

					{customFooter ? (
						customFooter
					) : (
						<div className="flex justify-end gap-4 ">
							{!hideCancelButton && (
								<Button
									size="md"
									variant="outline"
									onClick={() => {
										onCancelClick?.();
										setOpen(false);
									}}
									className={buttonClass}
								>
									{cancelButtonText || "Cancel"}
								</Button>
							)}
							<Button
								size="md"
								variant={"destructive"} // Default variant here as well
								onClick={onPrimaryClick}
								className={buttonClass}
							>
								{primaryButtonText || "Send"}
							</Button>
						</div>
					)}
				</ModalDescription>
			</ModalContent>
		</Modal>
	);
};

export { FormModal };
