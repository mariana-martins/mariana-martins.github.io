import React from "react";

import clsx from "clsx";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/useTheme";

function ThemeToggle(): React.JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      className={clsx(
        "absolute top-0 right-0 rounded-b-md pt-8 px-2 pb-2 transition-colors cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "bg-pink text-text-primary",
        "hover:bg-pink/70",
        "dark:bg-[var(--color-blue-100)] dark:text-[var(--color-blue-200)]",
        "dark:hover:bg-[var(--color-blue-100)]/90",
        "focus:ring-[var(--color-pink)]",
        "dark:focus:ring-[var(--color-blue-100)]",
      )}
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? (
        <Sun size={24} aria-hidden="true" />
      ) : (
        <Moon size={24} aria-hidden="true" />
      )}
    </button>
  );
}

export default ThemeToggle;
