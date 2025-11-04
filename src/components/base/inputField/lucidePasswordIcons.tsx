import { Eye, EyeOff } from "lucide-react";
import type React from "react";

const PasswordEyeIcon = ({
	shown,
	...props
}: { shown: boolean } & React.ComponentProps<typeof Eye>) =>
	shown ? <EyeOff {...props} /> : <Eye {...props} />;
export { PasswordEyeIcon };
