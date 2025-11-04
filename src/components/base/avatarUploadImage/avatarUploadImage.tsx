import { Camera } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";

/**
 * Props for AvatarUploadImage
 */
interface AvatarUploadImageProps {
	/** URL of the avatar image */
	imageUrl: string;
	/** Size of the avatar in pixels (default: 120px) */
	size?: number;
	/** Callback for file changes */
	onChange: (file: File) => void | Promise<void>;
	/** Extra classNames */
	className?: string;
	/** Alt text for the avatar image */
	alt?: string;
}

/**
 * Renders a round avatar image with an upload button overlay.
 *
 * Supports accessibility, loading state, and error fallback.
 */
const AvatarUploadImage: React.FC<AvatarUploadImageProps> = ({
	imageUrl,
	size = 120,
	onChange,
	className,
	alt = "User avatar",
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleImageClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			try {
				setLoading(true);
				setError(null);
				await onChange(file);
			} catch (err) {
				setError("Image upload failed.");
			} finally {
				setLoading(false);
			}
		}
	};

	/**
	 * Handles error fallback for avatar image.
	 */
	const handleImgError = () => setError("Failed to load avatar.");

	return (
		<div
			className={`relative rounded-full cursor-pointer group outline-none ${className ?? ""}`}
			aria-label="Change Avatar"
			style={{ width: size, height: size }}
			onClick={handleImageClick}
			onKeyUp={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					handleImageClick();
				}
			}}
		>
			{loading ? (
				<div className="flex items-center justify-center w-full h-full rounded-full bg-gray-100">
					{/* Add your spinner here or custom loading indicator */}
					<span className="text-xs text-gray-400">Uploading...</span>
				</div>
			) : error ? (
				<div className="flex items-center justify-center w-full h-full rounded-full bg-gray-200 text-sm text-red-500">
					{error}
				</div>
			) : (
				<img
					src={imageUrl}
					alt={alt}
					width={size}
					height={size}
					className="object-cover w-full h-full rounded-full"
					draggable={false}
					onError={handleImgError}
				/>
			)}
			<div
				className="absolute bg-black rounded-full border-2 border-white flex items-center justify-center"
				style={{
					top: size * 0.05,
					right: size * 0.05,
					width: size * 0.25,
					height: size * 0.25,
				}}
			>
				<Camera
					aria-label="Upload new avatar"
					className="text-white"
					style={{ width: size * 0.15, height: size * 0.15 }}
				/>
			</div>
			<input
				type="file"
				accept="image/*"
				ref={fileInputRef}
				className="hidden"
				onChange={handleFileChange}
				tabIndex={-1}
				aria-hidden="true"
			/>
		</div>
	);
};

export { AvatarUploadImage, type AvatarUploadImageProps };
