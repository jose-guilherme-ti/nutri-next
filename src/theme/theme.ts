"use client";

import { createTheme } from "@mui/material/styles";

/**
 * Tema alinhado à identidade da Nutri Poliana:
 * verde escuro (#173f35), cream, laranja de destaque.
 */
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#173f35",
      light: "#235b4c",
      dark: "#0f2a23",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#c87942",
      light: "#d99866",
      dark: "#a05f30",
      contrastText: "#ffffff",
    },
    success: {
      main: "#00c853",
      dark: "#00a844",
    },
    error: {
      main: "#ed4956",
    },
    background: {
      default: "#f6f2e9",
      paper: "#ffffff",
    },
    text: {
      primary: "#17211e",
      secondary: "#6b746f",
    },
    divider: "#ddd8cc",
  },
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 20px",
        },
        containedPrimary: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(23, 63, 53, 0.25)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});

export default theme;
