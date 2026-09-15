import type { Meta, StoryObj } from "@storybook/react";
import Sorteio from "./Sorteio";

const meta: Meta<typeof Sorteio> = {
  title: "Components/Sorteio",
  component: Sorteio,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    apiBaseUrl: {
      control: "text",
      description: "URL base da API de comentários",
    },
    excludedUsernames: {
      control: "object",
      description: "Usernames excluídos do sorteio",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sorteio>;

export const Default: Story = {
  args: {
    apiBaseUrl: "https://nutri-back-two.vercel.app",
    excludedUsernames: ["nutripolianacampos"],
  },
};

export const LocalApi: Story = {
  args: {
    apiBaseUrl: "http://localhost:3001",
    excludedUsernames: ["nutripolianacampos"],
  },
};
