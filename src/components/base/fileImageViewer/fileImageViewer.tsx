import { SvgIcon } from "@/components/base";
import {
	AlertCircle,
	ChevronLeft,
	ChevronRight,
	Download,
	Telescope,
	Trash2,
	X,
} from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

/**
 * Type representing the supported file types in the viewer
 */
type FileType = "image" | "pdf" | "unknown";

/**
 * Interface for a file item with enhanced metadata
 */
interface FileItem {
	url: string;
	title?: string;
	id?: string;
	type?: FileType;
}

/**
 * Props for the FileImageViewer component
 *
 * @interface FileImageViewerProps
 */
interface FileImageViewerProps {
	/** Array of image/PDF URLs or FileItem objects to display */
	images: string[] | FileItem[];
	/** Optional CSS class for the container */
	className?: string;
	/** Callback when delete button is clicked */
	onDelete?: (index: number) => void;
	/** Optional title for the modal */
	title?: string;
	/** Callback fired when modal opens */
	onModalOpen?: (index: number) => void;
	/** Callback fired when modal closes */
	onModalClose?: () => void;
	/** Disable keyboard navigation if true */
	disableKeyboardNavigation?: boolean;
	/** Hide thumbnails in modal if true */
	disableThumbnails?: boolean;
}

/**
 * Determines if a file is a PDF based on its URL or extension
 * @param url - The URL or file path to check
 * @returns boolean indicating if the file is a PDF
 */
const isPdf = (url: string): boolean => {
	return /\.pdf(?:\?|#|$)/i.test(url); // Better regex to detect PDFs in complex URLs
};

/**
 * Determines the file type based on URL or extension
 * @param url - The URL or file path to check
 * @returns FileType - The detected file type
 */
// Commented out since it's not currently used but may be useful in future extensions
// const getFileType = (url: string): FileType => {
//   if (isPdf(url)) return "pdf";
//   if (url.match(/\.(jpeg|jpg|gif|png|webp|avif|svg)$/i)) return "image";
//   return "unknown";
// };

/**
 * Gets the URL from either a string or FileItem object
 * @param item - The file item (string or FileItem object)
 * @returns string - The URL of the file
 */
const getFileUrl = (item: string | FileItem): string => {
	return typeof item === "string" ? item : item.url;
};

/**
 * Gets a unique key for a file item
 * @param item - The file item (string or FileItem object)
 * @param index - The index of the item in the array
 * @returns string - A unique key for the item
 */
const getFileKey = (item: string | FileItem, index: number): string => {
	if (typeof item === "object" && item.id) return item.id;
	if (typeof item === "object" && item.url) return `file-${index}-${item.url}`;
	return `file-${index}-${item}`;
};

const getFileTypeIcon = (fileUrl: string) => {
	const ext = fileUrl?.split(".").pop()?.toLowerCase();
	if (ext === "pdf") return "pdf";
	if (["doc", "docx"].includes(ext || "")) return "doc";
	if (!["jpeg", "jpg", "png", "gif"].includes(ext || "")) return "image";
	return null;
};

/**
 * Error boundary fallback component for image loading errors
 */
const ImageErrorFallback = memo(() => (
	<div className="flex flex-col items-center justify-center w-full h-full bg-red-50 text-red-600 p-2">
		<AlertCircle size={24} />
		<p className="text-xs mt-1">Failed to load</p>
	</div>
));

ImageErrorFallback.displayName = "ImageErrorFallback";

/**
 * FileImageViewer component for displaying and interacting with images and PDFs
 *
 * @component
 * @example
 * ```tsx
 * <FileImageViewer
 *   images={['https://example.com/image1.jpg', 'https://example.com/document.pdf']}
 *   onDelete={(index) => handleDelete(index)}
 * />
 * ```
 */
const FileImageViewer = memo(
	({
		images,
		className,
		title,
		onModalOpen,
		onModalClose,
		disableKeyboardNavigation = false,
		disableThumbnails = false,
	}: FileImageViewerProps) => {
		const [currentIndex, setCurrentIndex] = useState(0);
		const [isModalOpen, setIsModalOpen] = useState(false);
		const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

		// Normalize images to handle both string[] and FileItem[]
		const normalizedImages = useMemo(() => {
			return images.map((item, index) =>
				typeof item === "string" ? { url: item, id: `file-${index}` } : item,
			);
		}, [images]);

		// Define callbacks first to avoid reference errors
		const closeModal = useCallback(() => {
			setIsModalOpen(false);
		}, []);

		const prevSlide = useCallback(() => {
			setCurrentIndex((prev) =>
				prev === 0 ? normalizedImages.length - 1 : prev - 1,
			);
		}, [normalizedImages.length]);

		const nextSlide = useCallback(() => {
			setCurrentIndex((prev) =>
				prev === normalizedImages.length - 1 ? 0 : prev + 1,
			);
		}, [normalizedImages.length]);

		const openModal = useCallback(
			(index: number) => {
				setCurrentIndex(index);
				setIsModalOpen(true);
				if (onModalOpen) onModalOpen(index);
			},
			[onModalOpen],
		);

		const handleImageError = useCallback((index: number) => {
			setImageErrors((prev) => ({ ...prev, [index]: true }));
		}, []);

		// Handle keyboard navigation
		useEffect(() => {
			if (!isModalOpen || disableKeyboardNavigation) return;

			const handleKeyDown = (e: KeyboardEvent) => {
				switch (e.key) {
					case "ArrowLeft":
						prevSlide();
						break;
					case "ArrowRight":
						nextSlide();
						break;
					case "Escape":
						closeModal();
						break;
					default:
						break;
				}
			};

			window.addEventListener("keydown", handleKeyDown);
			return () => window.removeEventListener("keydown", handleKeyDown);
		}, [
			isModalOpen,
			disableKeyboardNavigation,
			prevSlide,
			nextSlide,
			closeModal,
		]);

		// Call onModalClose when modal is closed
		useEffect(() => {
			if (!isModalOpen && onModalClose) {
				onModalClose();
			}
		}, [isModalOpen, onModalClose]);

		const visibleStart = Math.max(0, currentIndex - 3);
		const showLeftArrow = visibleStart > 0;
		const showRightArrow = visibleStart + 7 < normalizedImages.length;

		if (!normalizedImages || normalizedImages.length === 0) {
			return (
				<div className="text-center text-gray-500">No images to display</div>
			);
		}
		const isImage = (url: string) => {
			return (
				/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i.test(url) ||
				url.includes("unsplash.com") ||
				url.includes("images.unsplash.com") ||
				url.includes("cloudinary.com") ||
				url.includes("picsum.photos")
			);
		};

		return (
			<div className={`flex gap-2 flex-wrap ${className || ""}`}>
				{normalizedImages.map((item, idx) => {
					const fileUrl = getFileUrl(item);
					const fileKey = getFileKey(item, idx);
					const hasError = imageErrors[idx];

					return (
						<button
							key={fileKey}
							className="w-24 h-24 rounded-lg overflow-hidden shadow cursor-pointer hover:scale-105 transition border-0 p-0"
							onClick={() => openModal(idx)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									openModal(idx);
								}
							}}
							type="button"
							aria-label={`Open file ${idx + 1}`}
						>
							{hasError ? (
								<ImageErrorFallback />
							) : isPdf(fileUrl) ? (
								<div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600 text-sm">
									PDF
								</div>
							) : (
								<img
									src={fileUrl}
									alt={`Thumbnail ${idx + 1}`}
									className="w-full h-full object-cover"
									onError={() => handleImageError(idx)}
									loading="lazy"
								/>
							)}
						</button>
					);
				})}

				{isModalOpen ? (
					<div className="z-60 fixed absolute bg-[hsla(var(--text-dark),0.6)] w-full top-0 px-5 left-0">
						<div className="flex justify-between items-center">
							<h2 className="text-xl text-white py-4  font-medium ">
								{title ||
									`File Viewer (${currentIndex + 1}/${normalizedImages.length})`}
							</h2>

							<X
								onClick={closeModal}
								size={32}
								className="w-4 cursor-pointer h-4 text-white "
							/>
						</div>
					</div>
				) : null}

				{isModalOpen && (
					<dialog
						open
						onClick={closeModal}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								closeModal();
							}
						}}
						className="fixed inset-0 bg-[hsla(var(--text-dark),0.8)] backdrop-blur-xs flex items-center justify-center z-50 p-4 m-0 w-full h-full border-0"
						aria-modal="true"
						aria-label="Image viewer"
					>
						<div
							onClick={(e) => e.stopPropagation()}
							onKeyDown={(e) => e.key === " " && e.stopPropagation()}
							className="relative"
							role="document"
						>
							{/* Main content container */}
							<div className="bg-transparent mt-12  max-w-screen-md  min-w-3xl w-auto  mx-auto  p-8 overflow-hidden relative h-[calc(100vh_-_10rem)]">
								<div className="flex items-center justify-center  h-[calc(100%_-_3rem)]">
									<div className="iframe-container overflow-hidden rounded-lg w-auto h-full">
										{(() => {
											const currentFile = getFileUrl(
												normalizedImages[currentIndex],
											);
											const fileHasError = imageErrors[currentIndex];

											if (fileHasError) {
												return <ImageErrorFallback />;
											}

											if (isPdf(currentFile)) {
												return (
													<iframe
														src={currentFile}
														title={`PDF Viewer ${currentIndex + 1}`}
														className="w-full h-full"
														// sandbox="allow-scripts allow-same-origin allow-downloads allow-popups allow-popups-to-escape-sandbox allow-forms"
													/>
												);
											}

											return (
												<img
													src={currentFile}
													alt={`Large ${currentIndex + 1}`}
													className="w-auto h-full mx-auto object-contain"
													onError={() => handleImageError(currentIndex)}
												/>
											);
										})()}
									</div>
								</div>
								{/* Navigation arrows - Perfectly centered */}
							</div>
							{!disableThumbnails && (
								<div className="flex items-center mx-12 gap-2 mt-4 justify-center relative">
									{showLeftArrow && (
										<button
											type="button"
											className="absolute left-0 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
											onClick={() =>
												setCurrentIndex(Math.max(0, currentIndex - 1))
											}
											aria-label="Previous image"
										>
											<ChevronLeft className="w-5 h-5 text-gray-700" />
										</button>
									)}
									<div className="flex items-center gap-2 overflow-hidden max-w-[300px]">
										{normalizedImages
											.slice(visibleStart, visibleStart + 7)
											.map((item, idx) => {
												const fileUrl = getFileUrl(item);
												const fileKey = getFileKey(item, idx);
												const actualIndex = visibleStart + idx;
												console.log(fileUrl, "fileUrl");
												return (
													<button
														key={fileKey}
														className={`!w-[40px] !h-[40px] rounded-md overflow-hidden cursor-pointer border-2 ${
															actualIndex === currentIndex
																? "border-blue-500"
																: "border-transparent"
														} p-0 border-0`}
														onClick={() => setCurrentIndex(actualIndex)}
														onKeyDown={(e) => {
															if (e.key === "Enter" || e.key === " ") {
																e.preventDefault();
																setCurrentIndex(actualIndex);
															}
														}}
														type="button"
														aria-label={`Select thumbnail ${actualIndex + 1}`}
														aria-selected={actualIndex === currentIndex}
													>
														{(() => {
															const iconName = getFileTypeIcon(fileUrl);
															return iconName ? (
																<div className="flex items-center justify-center w-full h-full bg-gray-300">
																	{fileUrl && isImage(fileUrl) ? (
																		<img
																			src={fileUrl}
																			alt=""
																			className="max-h-full max-w-full object-contain"
																		/>
																	) : (
																		<SvgIcon
																			name={iconName}
																			size={44}
																			color="hsl(var(--bg-light))"
																			className="rounded-sm"
																		/>
																	)}
																</div>
															) : (
																<img
																	src={fileUrl}
																	alt={`Thumbnail ${actualIndex + 1}`}
																	className="w-full h-full object-cover"
																	onError={() => handleImageError(actualIndex)}
																	loading="lazy"
																/>
															);
														})()}
													</button>
												);
											})}
									</div>
									{showRightArrow && (
										<button
											type="button"
											className="absolute right-0 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
											onClick={() =>
												setCurrentIndex(
													Math.min(
														normalizedImages.length - 1,
														currentIndex + 1,
													),
												)
											}
											aria-label="Next image"
										>
											<ChevronRight className="w-5 h-5 text-gray-700" />
										</button>
									)}
									{/* {onDelete && (
										<button
											className="bg-red-500 cursor-pointer p-2 rounded-full hover:bg-red-600 transition ml-2"
											onClick={handleDelete}
											aria-label="Delete current image"
											type="button"
										>
											<X className="w-4 h-4 text-white" />
										</button>
									)} */}
								</div>
							)}
							{/* <button
								type="button"
								onClick={closeModal}
								className="absolute -top-3 -right-2 cursor-pointer bg-[hsl(var(--primary-blue))] p-1 rounded-full text-white"
								aria-label="Close viewer"
							>
								<X />
							</button> */}
						</div>
					</dialog>
				)}

				{isModalOpen ? (
					<div className="z-60 fixed absolute   bottom-8 px-5 right-4 ">
						<div className="flex justify-between gap-3 items-center">
							<Telescope color="#fff" absoluteStrokeWidth />
							{/* <span className="h-8 w-8 bg-[hsl(var(--primary-blue))] rounded-full"> */}
							<Trash2
								size={36}
								className="bg-[hsla(var(--text-dark),0.8)] text-white rounded-full p-2"
							/>
							{/* </span> */}

							<Download color="#fff" absoluteStrokeWidth />
						</div>
					</div>
				) : null}
			</div>
		);
	},
);

export {
	FileImageViewer,
	type FileItem,
	type FileType,
	type FileImageViewerProps,
};
