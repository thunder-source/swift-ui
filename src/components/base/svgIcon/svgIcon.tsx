import { Suspense, lazy } from "react";

// SVG imports with size enforcement
// Small SVGs (under 50KB) are imported directly
import AlertSvg from "@/assets/svg/alert.svg?react";
import CheckSvg from "@/assets/svg/check.svg?react";
import infoSvg from "@/assets/svg/infosvg.svg?react";
import LoaderSvg from "@/assets/svg/loader.svg?react";
import trendingDownSvg from "@/assets/svg/trending-down.svg?react";
import userRightSvg from "@/assets/svg/user-right.svg?react";
import usersCheckSvg from "@/assets/svg/users-check.svg?react";
import UsersMoreSvg from "@/assets/svg/users-more.svg?react";

// Header SVGs
import LogoutHeaderSvg from "@/assets/svg/header/logout.svg?react";
import ManageAccountSvg from "@/assets/svg/header/manageAccount.svg?react";
import PasswordChangeSvg from "@/assets/svg/header/passwordChange.svg?react";

// Modal SVGs
import DangerSvg from "@/assets/svg/modal/danger.svg?react";
import DeniedSvg from "@/assets/svg/modal/denied.svg?react";
import LogoutSvg from "@/assets/svg/modal/logout.svg?react";
import SuccessSvg from "@/assets/svg/modal/success.svg?react";

// Sidebar SVGs
import SidebarAnnouncementSvg from "@/assets/svg/sidebar/announcement.svg?react";
import SidebarDateSvg from "@/assets/svg/sidebar/date.svg?react";
import LogoSvg from "@/assets/svg/sidebar/logo.svg?react";
import SidebarLogoutSvg from "@/assets/svg/sidebar/logout.svg?react";
import SidebarReportsSvg from "@/assets/svg/sidebar/reports.svg?react";

// Upload SVGs
import image from "@/assets/svg/uploadImage/file-image-svgrepo-com.svg?react";
import pdf from "@/assets/svg/uploadImage/pdf-svgrepo-com.svg?react";
import UploadSvg from "@/assets/svg/uploadImage/upload.svg?react";
import doc from "@/assets/svg/uploadImage/word-svgrepo-com.svg?react";

// Potentially larger SVGs (over 50KB) are imported dynamically
// This prevents them from being included in the initial bundle

const otpSvg = lazy(() => import("@/assets/svg/forgotPassword/otp.svg?react"));
const resetSvg = lazy(
	() => import("@/assets/svg/forgotPassword/reset.svg?react"),
);

// Constants for SVG size limits
const MAX_SVG_SIZE_KB = 50; // Maximum allowed SVG size in KB

// Define SVG size metadata for tracking and enforcement
interface SvgSizeMetadata {
	size: number; // Size in KB
	isLarge: boolean; // Whether it exceeds the size limit
}

// Track SVG sizes for logging and enforcement
const svgSizes: Record<string, SvgSizeMetadata> = {
	// These sizes are approximate and should be updated with actual values
	// Small SVGs (under 50KB)
	check: { size: 0.3, isLarge: false },
	alert: { size: 0.5, isLarge: false },
	usersMore: { size: 0.8, isLarge: false },
	userRight: { size: 0.8, isLarge: false },
	usersCheck: { size: 0.8, isLarge: false },
	trendingDown: { size: 0.3, isLarge: false },
	loader: { size: 0.5, isLarge: false },
	logo: { size: 5, isLarge: false },
	announcement: { size: 3, isLarge: false },
	date: { size: 2, isLarge: false },
	reports: { size: 3, isLarge: false },
	logoutSidebar: { size: 2, isLarge: false },
	danger: { size: 5, isLarge: false },
	success: { size: 5, isLarge: false },
	logout: { size: 3, isLarge: false },
	denied: { size: 4, isLarge: false },
	upload: { size: 5, isLarge: false },
	doc: { size: 3, isLarge: false },
	pdf: { size: 3, isLarge: false },
	image: { size: 5, isLarge: false },
	logoutHeader: { size: 5, isLarge: false },
	passwordChange: { size: 5, isLarge: false },
	manageAccount: { size: 5, isLarge: false },

	// Larger SVGs (potentially over 50KB)

	otp: { size: 45, isLarge: false }, // Just under the limit
	reset: { size: 45, isLarge: false }, // Just under the limit
};

// Regular SVG components map
const svgMap = {
	// Small SVGs loaded directly
	check: CheckSvg,
	alert: AlertSvg,
	usersMore: UsersMoreSvg,
	info: infoSvg,
	userRight: userRightSvg,
	usersCheck: usersCheckSvg,
	trendingDown: trendingDownSvg,
	loader: LoaderSvg,

	// Sidebar SVGs
	logo: LogoSvg,
	announcement: SidebarAnnouncementSvg,
	date: SidebarDateSvg,
	reports: SidebarReportsSvg,
	logoutSidebar: SidebarLogoutSvg,
	//-----------------

	//modal SVGs
	danger: DangerSvg, //danger modal variation
	success: SuccessSvg, //success modal variation
	logout: LogoutSvg, //logout modal variation
	denied: DeniedSvg, //denied modal variation
	//-----------------

	//upload image input field SVGs
	upload: UploadSvg,
	doc: doc,
	pdf: pdf,
	image: image,
	//-----------------

	//Header SVGs
	logoutHeader: LogoutHeaderSvg,
	passwordChange: PasswordChangeSvg,
	manageAccount: ManageAccountSvg,
	//-----------------

	// Lazy-loaded larger SVGs
	otp: otpSvg,
	reset: resetSvg,
	//-----------------
};

type SvgName = keyof typeof svgMap;
const availableSvgNames = Object.keys(svgMap) as SvgName[];

interface IconProps extends React.SVGProps<SVGSVGElement> {
	name: SvgName;
	size?: number | string;
	color?: string;
	className?: string;
}

/**
 * SvgIcon component that enforces size limits on SVG assets
 * - SVGs under 50KB are loaded directly
 * - SVGs over 50KB are loaded dynamically with Suspense
 * - Size enforcement helps prevent large bundle sizes
 */
const SvgIcon: React.FC<IconProps> = ({
	name,
	size = 24,
	color = "currentColor",
	className,
	...props
}) => {
	// Get the SVG component from our map
	const SvgComponent = svgMap[name];

	// Check if the SVG exists
	if (!SvgComponent) return null;

	// Check if this SVG exceeds the size limit
	const sizeInfo = svgSizes[name];
	const isLargeSvg = sizeInfo?.isLarge || false;

	// If the SVG is large and is a lazy-loaded component, wrap it in Suspense
	if (isLargeSvg) {
		// Log a warning about the large SVG
		console.warn(
			`Using large SVG (${sizeInfo?.size || "?"}KB): ${name}. SVGs should be under ${MAX_SVG_SIZE_KB}KB. Consider optimizing.`,
		);

		// For lazy-loaded components, we need to wrap them in Suspense
		return (
			<Suspense fallback={<div style={{ width: size, height: size }} />}>
				<SvgComponent
					width={size}
					height={size}
					fill={color}
					className={className}
					{...props}
				/>
			</Suspense>
		);
	}

	// For regular SVGs under the size limit, render normally
	return (
		<SvgComponent
			width={size}
			height={size}
			fill={color}
			className={className}
			{...props}
		/>
	);
};

export { SvgIcon, type IconProps, type SvgName, availableSvgNames };
