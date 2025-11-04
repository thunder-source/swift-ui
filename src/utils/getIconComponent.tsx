import * as LucideIcons from "lucide-react";
import type { ReactElement } from "react";

/**
 * Dynamically renders a Lucide icon by name, or returns null if not found or "None".
 * @param iconName The name of the Lucide icon component (e.g., "User", "ArrowRight").
 * @returns The Lucide icon ReactElement, or null.
 */
export function getIconComponent(iconName: string): ReactElement | null {
	if (!iconName || iconName === "None") return null;
	const Icon = (
		LucideIcons as unknown as Record<
			string,
			React.ComponentType<LucideIcons.LucideProps> | undefined
		>
	)[iconName];
	return Icon ? <Icon color="currentColor" size={20} /> : null;
}
