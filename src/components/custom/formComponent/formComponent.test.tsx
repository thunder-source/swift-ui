import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { FormComponent, type EnhancedFieldConfig } from "./formComponent";

// Mock SvgIcon to avoid JSDOM SVG parsing issues
vi.mock("@/components/base/svgIcon", () => ({
	SvgIcon: () => <div data-testid="mock-svg-icon" />,
}));

// Cleanup after each test
afterEach(() => {
	cleanup();
});

describe("FormComponent Validation", () => {
	const fields: EnhancedFieldConfig[] = [
		{
			name: "email",
			label: "Email",
			type: "email",
			validationRules: [
				{ type: "required", message: "Email is required" },
				{ type: "email", message: "Invalid email" },
			],
		},
		{
			name: "username",
			label: "Username",
			type: "text",
			validationRules: [
				{ type: "required", message: "Username is required" },
				{ type: "minLength", value: 3, message: "Min 3 chars" },
			],
		},
	];

	it("should show required error on submit when fields are empty", async () => {
		const onSubmit = vi.fn();
		render(
			<FormComponent title="Test Form" fields={fields} onSubmit={onSubmit} />,
		);

		const submitBtn = screen.getByRole("button", { name: /submit/i });
		await userEvent.click(submitBtn);

		expect(onSubmit).not.toHaveBeenCalled();
		expect(screen.getByText("Email is required")).toBeInTheDocument();
		expect(screen.getByText("Username is required")).toBeInTheDocument();
	});

	it("should validate email format", async () => {
		const onSubmit = vi.fn();
		render(
			<FormComponent
				title="Test Form"
				fields={fields}
				onSubmit={onSubmit}
				validateOnChange
			/>,
		);

		const emailInput = screen.getByLabelText("Email");
		await userEvent.type(emailInput, "invalid-email");

		// Click outside to trigger blur if needed, or rely on validateOnChange
		await userEvent.click(document.body);

		expect(screen.getByText("Invalid email")).toBeInTheDocument();
	});

	it("should validate minLength", async () => {
		const onSubmit = vi.fn();
		render(
			<FormComponent
				title="Test Form"
				fields={fields}
				onSubmit={onSubmit}
				validateOnChange
			/>,
		);

		const usernameInput = screen.getByLabelText("Username");
		await userEvent.type(usernameInput, "ab");

		expect(screen.getByText("Min 3 chars")).toBeInTheDocument();
	});

	it("should submit when form is valid", async () => {
		const onSubmit = vi.fn();
		render(
			<FormComponent title="Test Form" fields={fields} onSubmit={onSubmit} />,
		);

		await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
		await userEvent.type(screen.getByLabelText("Username"), "user123");

		await userEvent.click(screen.getByRole("button", { name: /submit/i }));

		expect(onSubmit).toHaveBeenCalledWith({
			email: "test@example.com",
			username: "user123",
		});
	});
});
