// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  spacing: 2, // 1 = 4px
  palette: {
    primary: {
      main: "#4A90E2",  // Primary Color for main buttons, headers, and CTAs
    },
    secondary: {
      main: "#F5A623", // Secondary Color for secondary buttons, minor actions, and icons
    },
    accent: {
      main: "#CD7574", // Accent Color for notifications, badges, and alerts
    },
    background: {
      default: "#50E3C2", // Background Accent Color for section backgrounds or card highlights
      paper: "#FFFFFF", // White for card backgrounds or containers for contrast
    },
    info: {
      main: "#008CBA", // Link/Interaction Color for links and hover states
    },
    text: {
      primary: "#333333", // Dark text color for main readability on backgrounds
      secondary: "#555555", // Lighter text color for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 10, // border radius in px
  },
  shadows: [
    ...Array(25).fill("none"),
    "0px 2px 4px rgba(0, 0, 0, 0.1)",
    "0px 2px 2px rgba(0, 0, 0, 1)",
  ],
  customShadows: {
    blackText: "0px 1px 1px rgba(0, 0, 0, 1)", // Provides hardy text color
    primaryText: "0px 2px 2px rgba(0, 0, 0, 1)", // Primary text shadow
    secondaryText: "0px 2px 4px rgba(0, 0, 0), 0px 2px 1px rgba(0, 0, 0)", // Secondary text shadow
  },
});

export default theme;
