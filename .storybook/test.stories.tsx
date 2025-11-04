import type { Meta, StoryObj } from "@storybook/react";

const TestComponent = () => <div style={{ padding: "2rem" }}>Storybook is working! ✅</div>;

const meta: Meta<typeof TestComponent> = {
  title: "Test/Setup",
  component: TestComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TestComponent>;

export const Default: Story = {};
