import { SvgIcon } from "@/components/base";
import {
	Button,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui";
import { DEFAULT_ACCEPTED_FILE_TYPES } from "@/constants";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type FileUploadProps = {
	label?: string;
	className?: string;
	acceptTypes?: string[];
	maxFileSizeMB?: number;
	name?: string;
	value?: File[] | undefined;
	onChange?: (e: { target: { name: string; value: File[] } }) => void;
	required?: boolean;
	helpText?: string;
};

function FileUpload({
	label = "Upload file",
	className = "",
	acceptTypes,
	maxFileSizeMB = 5,
	name = "",
	value = undefined,
	onChange,
	required = false,
	helpText,
}: FileUploadProps) {
	const [isDragging, setIsDragging] = useState(false);
	const [files, setFiles] = useState<File[]>(value || []);
	const [filePreviews, setFilePreviews] = useState<string[]>([]);
	const [showLeftArrow, setShowLeftArrow] = useState(false);
	const [showRightArrow, setShowRightArrow] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const acceptedTypes =
		acceptTypes && acceptTypes.length > 0
			? acceptTypes
			: DEFAULT_ACCEPTED_FILE_TYPES;
	// Helper to check file type against accepted types
	const isAcceptedFileType = (file: File, acceptedTypes: string[]) => {
		const fileExtension = file.name.split(".").pop()?.toLowerCase();
		if (!fileExtension) return false;
		// Accept both extensions with and without dot
		return acceptedTypes.some((type) => {
			const cleanType = type.replace(".", "").toLowerCase();
			return fileExtension === cleanType;
		});
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			const selectedFiles = Array.from(e.dataTransfer.files);
			const validFiles = selectedFiles.filter((file) => {
				const isValidSize = file.size <= maxFileSizeMB * 1024 * 1024;
				const isValidType = isAcceptedFileType(file, acceptedTypes);
				return isValidSize && isValidType;
			});
			if (validFiles.length < selectedFiles.length) {
				alert(
					`Some files were not allowed (wrong type or too large)! Allowed types: ${acceptedTypes.join(", ")}, Max size: ${maxFileSizeMB} MB.`,
				);
			}

			// Check for duplicate file names
			const existingFileNames = new Set(files.map((file) => file.name));
			const duplicateFiles = validFiles.filter((file) =>
				existingFileNames.has(file.name),
			);

			if (duplicateFiles.length > 0) {
				const duplicateNames = duplicateFiles
					.map((file) => file.name)
					.join(", ");
				alert(
					`The following files already exist and will be replaced: ${duplicateNames}`,
				);
			}

			// Create a map of existing files by name
			const existingFilesMap = new Map(files.map((file) => [file.name, file]));

			// Update the map with new files, replacing any duplicates
			for (const file of validFiles) {
				existingFilesMap.set(file.name, file);
			}

			// Convert map back to array
			const updatedFiles = Array.from(existingFilesMap.values());

			// Update files and previews
			setFiles(updatedFiles);
			setFilePreviews(updatedFiles.map((file) => URL.createObjectURL(file)));
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFiles = Array.from(e.target.files);
			const validFiles = selectedFiles.filter((file) => {
				const isValidSize = file.size <= maxFileSizeMB * 1024 * 1024;
				const isValidType = isAcceptedFileType(file, acceptedTypes);
				return isValidSize && isValidType;
			});
			if (validFiles.length < selectedFiles.length) {
				alert(
					`Some files were not allowed (wrong type or too large)! Allowed types: ${acceptedTypes.join(", ")}, Max size: ${maxFileSizeMB} MB.`,
				);
			}

			// Check for duplicate file names
			const existingFileNames = new Set(files.map((file) => file.name));
			const duplicateFiles = validFiles.filter((file) =>
				existingFileNames.has(file.name),
			);

			if (duplicateFiles.length > 0) {
				const duplicateNames = duplicateFiles
					.map((file) => file.name)
					.join(", ");
				alert(
					`The following files already exist and will be replaced: ${duplicateNames}`,
				);
			}

			// Create a map of existing files by name
			const existingFilesMap = new Map(files.map((file) => [file.name, file]));

			// Update the map with new files, replacing any duplicates
			for (const file of validFiles) {
				existingFilesMap.set(file.name, file);
			}

			// Convert map back to array
			const updatedFiles = Array.from(existingFilesMap.values());

			// Update files and previews
			setFiles(updatedFiles);
			setFilePreviews(updatedFiles.map((file) => URL.createObjectURL(file)));

			// Call onChange with the file names as a comma-separated string
			if (onChange) {
				onChange({
					target: {
						name,
						value: updatedFiles.map((file) => file),
					},
				});
			}

			e.target.value = ""; // Allow same file to be picked again
		}
	};

	const handleRemoveFile = (idx: number) => {
		const newFiles = files.filter((_, i) => i !== idx);
		const newPreviews = filePreviews.filter((_, i) => i !== idx);
		setFiles(newFiles);
		setFilePreviews(newPreviews);

		// Call onChange with updated file names
		if (onChange) {
			onChange({
				target: {
					name,
					value: newFiles,
				},
			});
		}
	};

	const handleUploadClick = () => {
		console.log("handleUploadClick");
		fileInputRef.current?.click();
	};

	const checkScrollButtons = useCallback(() => {
		if (scrollContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } =
				scrollContainerRef.current;
			setShowLeftArrow(scrollLeft > 0);
			setShowRightArrow(Math.ceil(scrollLeft) < scrollWidth - clientWidth);
		}
	}, []);

	useEffect(() => {
		checkScrollButtons();
		window.addEventListener("resize", checkScrollButtons);
		return () => window.removeEventListener("resize", checkScrollButtons);
	}, [checkScrollButtons]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// Check scroll buttons when files change
		checkScrollButtons();
	}, [files, checkScrollButtons]);

	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const scrollAmount = 200;
			const currentScroll = scrollContainerRef.current.scrollLeft;
			const newScroll =
				direction === "left"
					? currentScroll - scrollAmount
					: currentScroll + scrollAmount;

			scrollContainerRef.current.scrollTo({
				left: newScroll,
				behavior: "smooth",
			});

			// Check scroll position after scrolling
			setTimeout(checkScrollButtons, 300);
		}
	};

	const renderFilePreview = (preview: string, idx: number) => {
		const file = files[idx];
		const ext = file?.name?.split(".").pop()?.toLowerCase();
		let iconName: "pdf" | "doc" | "image" | null = null;
		if (ext === "pdf") iconName = "pdf";
		else if (["doc", "docx"].includes(ext || "")) iconName = "doc";
		else if (!["jpeg", "jpg", "png", "gif"].includes(ext || ""))
			iconName = "image";

		return (
			<TooltipProvider key={file?.name}>
				<Tooltip>
					<TooltipTrigger asChild>
						<div className="relative w-[36px] h-[36px] border-[hsl(var(--bg-light))] shrink-0 group flex items-center justify-center bg-transparent">
							{iconName ? (
								<SvgIcon
									name={iconName}
									size={44}
									color="hsl(var(--bg-light)) rounded-sm"
								/>
							) : (
								<img
									src={preview}
									alt={`File preview ${idx + 1}`}
									width={46}
									height={46}
									className="object-cover w-[36px] h-[36px] rounded-sm block"
								/>
							)}
							<Button
								aria-label="Remove image"
								onClick={() => handleRemoveFile(idx)}
								size="icon"
								variant="dark"
								iconLeft={<X className="p-0.5" />}
								className="absolute z-20 -top-1 -right-1 rounded-full max-w-4 max-h-4 !p-0"
							/>
						</div>
					</TooltipTrigger>
					<TooltipContent sideOffset={8}>{file?.name || ""}</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	};

	return (
		<main
			className={`flex min-h-[165px] flex-col items-center justify-center ${className}`}
		>
			<div className="w-full mx-auto">
				<h2 className="text-sm font-medium mb-2">
					{label}
					{required && <span className="text-red-500 ml-1">*</span>}
				</h2>
				{/* Always render the file input so it can be triggered by both Upload and Upload Again buttons */}
				<input
					type="file"
					className="hidden"
					ref={fileInputRef}
					onChange={handleFileChange}
					accept={acceptedTypes
						.map((type) => (type.startsWith(".") ? type : `.${type}`))
						.join(",")}
					multiple
					required={required}
				/>
				{files.length > 0 ? (
					<div
						className={`relative flex items-center w-full gap-2 bg-[hsl(var(--bg-light))] justify-between p-2 rounded-md overflow-y-visible max-w-full transition-colors ${
							isDragging
								? "border-2 border-dashed border-gray-500 bg-gray-50"
								: "border-2 border-transparent "
						}`}
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
					>
						{showLeftArrow && (
							<Button
								variant="dark"
								size="icon"
								iconLeft={<ChevronLeft className="h-4 w-4" />}
								className={`absolute -left-1 z-10 w-2 h-7 !px-3 transition-opacity duration-300 ${
									isHovered ? "opacity-50" : "opacity-0"
								}`}
								onClick={() => scroll("left")}
							/>
						)}
						<div
							ref={scrollContainerRef}
							className="flex items-center gap-2 w-[calc(100%_-_125px)] overflow-x-auto py-1 scrollbar-hide"
							onScroll={checkScrollButtons}
						>
							{filePreviews.map((preview, idx) => (
								<div key={files[idx]?.name} className="flex-shrink-0">
									{renderFilePreview(preview, idx)}
								</div>
							))}
						</div>
						{showRightArrow && (
							<Button
								variant="dark"
								size="icon"
								iconLeft={<ChevronRight className="h-4 w-4" />}
								className={`absolute right-30 z-10 w-2 h-7 !px-3 transition-opacity duration-300 ${
									isHovered ? "opacity-50" : "opacity-0"
								}`}
								onClick={() => scroll("right")}
							/>
						)}
						<Button
							variant="dark"
							size="sm"
							className="mb-0 relative z-10"
							type="button"
							onClick={handleUploadClick}
						>
							Choose File
						</Button>
					</div>
				) : (
					<div className="bg-[hsl(var(--bg-light))] min-h-[165px] rounded-md p-2">
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div
							className={`border-2  h-[165px] border-dashed rounded-md p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
								isDragging ? "border-gray-500 bg-gray-50" : "border-gray-300"
							} relative overflow-hidden`}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
							onClick={handleUploadClick}
						>
							<div className="w-10 h-10 rounded-full border-1 border-[hsl(var(--bg-grey))] bg-[hsl(var(--bg-grey))] flex items-center justify-center">
								<SvgIcon name="upload" size={44} color="hsl(var(--bg-light))" />
							</div>

							<p className="text-sm text-[hsl(var(--text-light))] text-center">
								Drag & Drop or click to upload
							</p>

							<div className="flex-1" />
							<Button variant="dark">Upload</Button>
						</div>
					</div>
				)}
				{files.length === 0 && (
					<p className="text-xs text-[hsl(var(--text-medium))] text-end mt-2">
						Files supported:{" "}
						{acceptedTypes
							.map((type) => type.replace(".", "").toUpperCase())
							.join(", ")}{" "}
						• Max size is {maxFileSizeMB} MB
						{helpText && <span className="block mt-1">{helpText}</span>}
					</p>
				)}
			</div>
		</main>
	);
}
export { FileUpload, type FileUploadProps };
