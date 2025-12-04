import { useContext } from "react";

import { ThemeContext } from "@/contexts/ThemeContext";

/**
 * Custom hook for accessing theme state and controls.
 * Must be used within a ThemeProvider.
 * @returns Object containing current theme and toggle function
 */
export function useTheme(): {
  theme: "light" | "dark";
  toggleTheme: () => void;
} {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
