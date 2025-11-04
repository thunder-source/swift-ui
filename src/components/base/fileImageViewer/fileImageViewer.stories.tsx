import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { FileImageViewer, type FileItem } from "./fileImageViewer";

/**
 * FileImageViewer component for displaying and interacting with images and PDFs.
 * Supports both simple string arrays and enhanced FileItem objects with metadata.
 */
const meta: Meta<typeof FileImageViewer> = {
	title: "Base/FileImageViewer",
	component: FileImageViewer,
	tags: ["autodocs"],
	parameters: {
		componentSubtitle:
			"A versatile component for displaying and previewing images and PDFs",
		docs: {
			description: {
				component: `
          The FileImageViewer component provides a flexible way to display and interact with images and PDFs.  
          It supports both simple string arrays and enhanced FileItem objects with metadata.
          Features include:  
          - Thumbnail grid view with modal preview  
          - PDF support with iframe viewer  
          - Keyboard navigation  
          - Error handling for failed images  
          - Accessibility features  
          - Delete functionality  
        `,
			},
		},
	},
	argTypes: {
		className: {
			control: "text",
			description: "Tailwind CSS class for wrapper (optional)",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "''" },
			},
		},
		images: {
			control: { type: "object" },
			description: "Array of image/PDF URLs or FileItem objects",
			table: {
				type: { summary: "string[] | FileItem[]" },
				defaultValue: { summary: "[]" },
			},
		},
		onDelete: {
			action: "deleted",
			description: "Callback when delete button is clicked",
			table: {
				type: { summary: "(index: number) => void" },
				defaultValue: { summary: "undefined" },
			},
		},
		title: {
			control: "text",
			description: "Title for the viewer modal",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" },
			},
		},
		onModalOpen: {
			action: "modalOpened",
			description: "Callback fired when modal opens",
			table: {
				type: { summary: "(index: number) => void" },
				defaultValue: { summary: "undefined" },
			},
		},
		onModalClose: {
			action: "modalClosed",
			description: "Callback fired when modal closes",
			table: {
				type: { summary: "() => void" },
				defaultValue: { summary: "undefined" },
			},
		},
		disableKeyboardNavigation: {
			control: "boolean",
			description: "Disable keyboard navigation",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		disableThumbnails: {
			control: "boolean",
			description: "Hide thumbnails in the modal",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof FileImageViewer>;

// Sample images for stories
const sampleImages = [
	// Common image formats
	"https://images.unsplash.com/photo-1551295022-de5522c94e08?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // JPG
	"https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png", // PNG
	"https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif", // GIF
	"https://upload.wikimedia.org/wikipedia/commons/6/6b/Bitmap_VS_SVG.svg", // SVG
	"https://web.dev/images/webp.webp", // WEBP
	"https://upload.wikimedia.org/wikipedia/commons/6/6b/Bitmap_VS_SVG.svg", // SVG
	"https://upload.wikimedia.org/wikipedia/commons/6/6b/Bitmap_VS_SVG.svg", // SVG
	// PDF files
	// Common image formats
	"https://images.unsplash.com/photo-1551295022-de5522c94e08?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // JPG
	"https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png", // PNG
	"https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif", // GIF
	"https://upload.wikimedia.org/wikipedia/commons/6/6b/Bitmap_VS_SVG.svg", // SVG
	"https://web.dev/images/webp.webp", // WEBP
	"https://upload.wikimedia.org/wikipedia/commons/6/6b/Bitmap_VS_SVG.svg", // SVG
	"https://upload.wikimedia.org/wikipedia/commons/6/6b/Bitmap_VS_SVG.svg", // SVG
	// PDF files
	// Common image formats
	"https://images.unsplash.com/photo-1551295022-de5522c94e08?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // JPG
	"https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png", // PNG
	"https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif", // GIF
	"https://upload.wikimedia.org/wikipedia/commons/6/6b/Bitmap_VS_SVG.svg", // SVG
	"https://web.dev/images/webp.webp", // WEBP
	"https://upload.wikimedia.org/wikipedia/commons/6/6b/Bitmap_VS_SVG.svg", // SVG
	"https://upload.wikimedia.org/wikipedia/commons/6/6b/Bitmap_VS_SVG.svg", // SVG
	// PDF files
	"/evisapdf.pdf", // Local PDF
	"https://pdfobject.com/pdf/sample.pdf", // Remote PDF
];

/**
 * Basic example with a single image
 */
export const SingleImagePreview: Story = {
	args: {
		images: [sampleImages[0]],
	},
};

/**
 * Example with multiple images in a carousel
 */
export const MultipleImagesCarousel: Story = {
	args: {
		images: sampleImages,
		onDelete: action("image-deleted"),
	},
};

/**
 * Example with custom styling for the wrapper
 */
export const CustomStyledWrapper: Story = {
	args: {
		images: [
			"https://via.placeholder.com/600x400?text=Custom+1",
			"https://via.placeholder.com/600x400?text=Custom+2",
		],
		className: "p-4 border-2 border-dashed border-purple-500 rounded-xl",
	},
};

/**
 * Example with a PDF file
 */
export const PDFViewer: Story = {
	args: {
		images: [sampleImages[5]],
		title: "Sample PDF Document",
	},
};

/**
 * Example with mixed content (images and PDFs)
 */
export const MixedContent: Story = {
	args: {
		images: [sampleImages[0], sampleImages[5], sampleImages[1]],
		title: "Mixed Content Gallery",
	},
};

/**
 * Example using FileItem objects with metadata
 */
export const WithFileItems: Story = {
	args: {
		images: [
			{ url: sampleImages[0], id: "img-1", title: "Mountain View" },
			{ url: sampleImages[5], id: "pdf-1", title: "Important Document" },
			{ url: sampleImages[1], id: "img-2", title: "Sunset" },
		] as FileItem[],
		title: "Files with Metadata",
	},
};

/**
 * Example with thumbnails disabled
 */
export const NoThumbnails: Story = {
	args: {
		images: sampleImages,
		disableThumbnails: true,
	},
};

/**
 * Example with keyboard navigation disabled
 */
export const NoKeyboardNavigation: Story = {
	args: {
		images: sampleImages,
		disableKeyboardNavigation: true,
	},
};

/**
 * Example showing all supported file formats
 */
export const AllFileTypes: Story = {
	args: {
		images: sampleImages,
		title: "All Supported File Types",
	},
};
