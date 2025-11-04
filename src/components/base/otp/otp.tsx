import { InputOTP, InputOTPSlot } from "@/components/ui";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import type React from "react";

interface OTPProps {
	maxLength?: number;
	value?: string;
	onChange?: (value: string) => void;
	disabled?: boolean;
	className?: string;
}
/**
 * Reusable OTP input component built on top of InputOTP and InputOTPSlot.
 *
 * Exports:
 * - OTP: Main component (default and named export)
 * - InputOTPDemo: Backward-compatible demo version
 */
const OTP: React.FC<OTPProps> = ({
	maxLength = 6,
	value = "",
	onChange,
	disabled = false,
	className = "",
}) => {
	return (
		<InputOTP
			pattern={REGEXP_ONLY_DIGITS}
			maxLength={maxLength}
			value={value}
			onChange={onChange}
			disabled={disabled}
			className={className}
		>
			{/* Using index as key is acceptable here because OTP length is fixed and order never changes */}
			{Array.from({ length: maxLength }).map((_, idx) => (
				<InputOTPSlot
					key={`otp-slot-${
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						idx
					}`}
					index={idx}
				/>
			))}
		</InputOTP>
	);
};
OTP.displayName = "OTP";

export { OTP, type OTPProps };
