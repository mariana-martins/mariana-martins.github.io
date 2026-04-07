/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

export const THEME_STORAGE_KEY = 'theme';

/**
 * Gets the initial theme from localStorage or system preference.
 * @returns The initial theme to use
 */
export function getInitialTheme(): Theme {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

/**
 * Applies the theme to the document element.
 * @param theme - The theme to apply
 */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;

  // Enable transitions only during theme change
  root.classList.add('theme-transitioning');
  root.classList.toggle('dark', theme === 'dark');

  // Remove transition class after animations complete
  window.setTimeout(() => {
    root.classList.remove('theme-transitioning');
  }, 500);
}

/**
 * ThemeProvider component that provides theme state and controls to the app.
 * @param children - React children components
 * @returns JSX element wrapping children with theme context
 */
export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
