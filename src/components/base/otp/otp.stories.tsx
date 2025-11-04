import { useState } from "react";
import { OTP } from "./otp";
import type { OTPProps } from "./otp";

export default {
	title: "Base/OTP",
	component: OTP,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		maxLength: { control: { type: "number", min: 1, max: 10 } },
		value: { control: "text" },
		disabled: { control: "boolean" },
		onChange: { action: "changed" },
	},
};

export const Default = {
	args: {
		maxLength: 6,
		value: "",
		disabled: false,
	},
	render: (args: OTPProps) => <OTP {...args} />,
};

export const Interactive = {
	render: (args: OTPProps) => {
		const [value, setValue] = useState("");
		return (
			<OTP
				{...args}
				value={value}
				onChange={(val) => {
					setValue(val);
					if (args.onChange) args.onChange(val);
				}}
			/>
		);
	},
	args: {
		maxLength: 6,
		disabled: false,
	},
};
