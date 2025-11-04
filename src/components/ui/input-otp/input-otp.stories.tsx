import React from "react";
import { InputOTP, InputOTPSeparator, InputOTPSlot } from "./input-otp";

export default {
	title: "shadcn/InputOTP",
	component: InputOTP,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
};

const otpSlotKeys = ["otp-a", "otp-b", "otp-c", "otp-d", "otp-e", "otp-f"];
const otpSlotKeys4 = ["otp-1", "otp-2", "otp-3", "otp-4"];

export const Default = {
	render: function DefaultStory() {
		const [value, setValue] = React.useState("");
		return (
			<InputOTP maxLength={6} value={value} onChange={setValue}>
				{otpSlotKeys.map((slotKey, idx) => (
					<InputOTPSlot key={slotKey} index={idx} />
				))}
			</InputOTP>
		);
	},
};

export const WithPrefilledValue = {
	render: function WithPrefilledValueStory() {
		const [value, setValue] = React.useState("123456");
		return (
			<InputOTP maxLength={6} value={value} onChange={setValue}>
				{otpSlotKeys.map((slotKey, idx) => (
					<InputOTPSlot key={slotKey} index={idx} />
				))}
			</InputOTP>
		);
	},
};

export const Disabled = {
	render: () => (
		<InputOTP maxLength={6} disabled>
			{otpSlotKeys.map((slotKey, idx) => (
				<InputOTPSlot key={slotKey} index={idx} />
			))}
		</InputOTP>
	),
};

export const ErrorState = {
	render: function ErrorStateStory() {
		const [value, setValue] = React.useState("");
		return (
			<InputOTP maxLength={6} value={value} onChange={setValue}>
				{otpSlotKeys.map((slotKey, idx) => (
					<InputOTPSlot
						key={slotKey}
						index={idx}
						className={
							idx === 2 ? "border-red-500 ring-1 ring-red-500" : undefined
						}
					/>
				))}
			</InputOTP>
		);
	},
};

export const CustomLength = {
	render: function CustomLengthStory() {
		const [value, setValue] = React.useState("");
		return (
			<InputOTP maxLength={4} value={value} onChange={setValue}>
				{otpSlotKeys4.map((slotKey, idx) => (
					<InputOTPSlot key={slotKey} index={idx} />
				))}
			</InputOTP>
		);
	},
};

export const WithSeparator = {
	render: function WithSeparatorStory() {
		const [value, setValue] = React.useState("");
		return (
			<InputOTP maxLength={6} value={value} onChange={setValue}>
				{otpSlotKeys.slice(0, 3).map((slotKey, idx) => (
					<InputOTPSlot key={slotKey} index={idx} />
				))}
				<InputOTPSeparator />
				{otpSlotKeys.slice(3).map((slotKey, idx) => (
					<InputOTPSlot key={slotKey} index={idx + 3} />
				))}
			</InputOTP>
		);
	},
};

export const ReadOnly = {
	render: () => (
		<InputOTP maxLength={6} value="654321" readOnly>
			{otpSlotKeys.map((slotKey, idx) => (
				<InputOTPSlot key={slotKey} index={idx} />
			))}
		</InputOTP>
	),
};

export const CustomStyling = {
	render: function CustomStylingStory() {
		const [value, setValue] = React.useState("");
		return (
			<InputOTP
				maxLength={6}
				className="bg-yellow-50 text-center"
				containerClassName="gap-4 p-4 border border-dashed border-blue-200 rounded-lg"
				value={value}
				onChange={setValue}
				textAlign="center"
				inputMode="numeric"
				placeholder="-"
				pasteTransformer={(pasted) => pasted.replace(/-/g, "")}
				pushPasswordManagerStrategy="increase-width"
				noScriptCSSFallback={null}
				onComplete={() => {}}
			>
				{otpSlotKeys.map((slotKey, idx) => (
					<InputOTPSlot
						key={slotKey}
						index={idx}
						className="rounded-full border-blue-400 text-lg"
					/>
				))}
			</InputOTP>
		);
	},
};

export const Controlled = {
	render: function ControlledStory() {
		const [value, setValue] = React.useState("");
		return (
			<InputOTP
				maxLength={6}
				value={value}
				onChange={setValue}
				containerClassName="gap-4 p-4 border border-green-200 rounded-lg"
				className="bg-green-50 text-center"
				textAlign="center"
				inputMode="numeric"
				placeholder="*"
				pasteTransformer={(pasted) => pasted.replace(/-/g, "")}
				pushPasswordManagerStrategy="increase-width"
				noScriptCSSFallback={null}
				onComplete={() => alert("Complete!")}
			>
				{otpSlotKeys.map((slotKey, idx) => (
					<InputOTPSlot key={slotKey} index={idx} />
				))}
			</InputOTP>
		);
	},
};
