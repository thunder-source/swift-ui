import {
	AlertTriangle,
	Check,
	Circle,
	CircleCheck,
	HelpCircle,
	Info,
	X,
} from "lucide-react";
import React, { type JSX } from "react";

// Internal icon keys for badge variant mapping
export type IconMapKey =
	| "CheckCircle"
	| "AlertTriangle"
	| "Info"
	| "Circle"
	| "Check"
	| "HelpCircle"
	| "Cross";

// Internal icon map for badge variant inference
export const iconMap: Record<IconMapKey, JSX.Element> = {
	CheckCircle: <CircleCheck className="w-4 h-4" />,
	Check: <Check className="w-4 h-4" />,
	AlertTriangle: <AlertTriangle className="w-4 h-4" />,
	Info: <Info className="w-4 h-4" />,
	Circle: <Circle className="w-4 h-4" />,
	HelpCircle: <HelpCircle className="w-4 h-4" />,
	Cross: <X className="w-4 h-4" />,
};

/**
 * BadgeIcon is for internal use in badge variant mapping.
 */
export type BadgeIcon = IconMapKey | React.ReactElement<{ className?: string }>;

/**
 * Returns the icon as a ReactElement, merging in the provided className.
 * Used internally for badge variant icon inference.
 */
export function resolveIcon(
	icon?: BadgeIcon,
	className?: string,
): React.ReactNode {
	if (!icon) return null;
	if (typeof icon === "string" && iconMap[icon as IconMapKey]) {
		const mapped = iconMap[icon as IconMapKey];
		const mappedEl = mapped as React.ReactElement<{ className?: string }>;
		return React.cloneElement(mappedEl, {
			className: [mappedEl.props.className, className]
				.filter(Boolean)
				.join(" "),
		});
	}
	if (React.isValidElement(icon)) {
		const el = icon as React.ReactElement<{ className?: string }>;
		return React.cloneElement(el, {
			className: [el.props.className, className].filter(Boolean).join(" "),
		});
	}
	return icon;
}
