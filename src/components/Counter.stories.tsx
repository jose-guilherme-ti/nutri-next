import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Counter from "./Counter";

const meta: Meta<typeof Counter> = {
  title: "Components/Counter",
  component: Counter,
  tags: ["autodocs"],
  argTypes: {
    target: { control: { type: "number" } },
    suffix: { control: "text" },
    prefix: { control: "text" },
    decimals: { control: { type: "number", min: 0, max: 2 } },
    duration: { control: { type: "number" } },
  },
};

export default meta;
type Story = StoryObj<typeof Counter>;

export const Default: Story = {
  args: {
    target: 120,
    suffix: "+",
    duration: 1500,
  },
};

export const WithDecimals: Story = {
  args: {
    target: 8.4,
    decimals: 1,
    suffix: " kg",
    duration: 2000,
  },
};

export const Prefix: Story = {
  args: {
    target: 500,
    prefix: "+",
    suffix: " pacientes",
  },
};
