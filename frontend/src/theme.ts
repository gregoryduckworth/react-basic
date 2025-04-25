import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  palette: {
    mode: "light",
    background: {
      default: "#e9eef6",
      paper: "#fff",
    },
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  palette: {
    mode: "dark",
    background: {
      default: "#181a20",
      paper: "#23272f",
    },
    text: {
      primary: "#fff",
      secondary: "#b0b3b8",
    },
  },
});
