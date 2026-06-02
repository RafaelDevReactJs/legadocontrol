"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffc300",
      light: "#ffd033",
      contrastText: "#000000",
    },
    background: {
      default: "#0a0a0a",
      paper: "#141414",
    },
    text: {
      primary: "#ffffff",
      secondary: "#a0a0a0",
    },
    error: {
      main: "#f87171",
    },
    divider: "#333333",
  },
  typography: {
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0a0a0a",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#0a0a0a",
          borderRadius: 6,
          "& fieldset": {
            borderColor: "#333333",
            borderWidth: "1px",
          },
          "&:hover fieldset": {
            borderColor: "#555555",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#ffc300",
            borderWidth: "1px",
          },
        },
        input: {
          color: "#ffffff",
          fontSize: "0.875rem",
          padding: "0.875rem 1rem",
          "&::placeholder": {
            color: "#555555",
            opacity: 1,
          },
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #0a0a0a inset",
            WebkitTextFillColor: "#ffffff",
            caretColor: "#ffffff",
            transition: "background-color 5000s ease-in-out 0s",
          },
          "&:-webkit-autofill:hover": {
            WebkitBoxShadow: "0 0 0 1000px #0a0a0a inset",
            WebkitTextFillColor: "#ffffff",
          },
          "&:-webkit-autofill:focus": {
            WebkitBoxShadow: "0 0 0 1000px #0a0a0a inset",
            WebkitTextFillColor: "#ffffff",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "medium",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#0a0a0a",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            boxShadow: "0 0 20px rgba(255, 195, 0, 0.35)",
            "&:hover": {
              boxShadow: "0 0 28px rgba(255, 195, 0, 0.5)",
            },
          },
        },
      ],
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
        },
      },
    },
  },
});

export default theme;
