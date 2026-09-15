import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme/theme";
import Sorteio from "./Sorteio";

const meta: Meta<typeof Sorteio> = {
  title: "Components/Sorteio",
  component: Sorteio,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
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
