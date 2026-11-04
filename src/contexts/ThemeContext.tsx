/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

/** Also read by the inline script in index.html */
export const THEME_STORAGE_KEY = 'theme';
const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';

/**
 * A stored choice wins, otherwise the system preference.
 * @returns The theme to use
 */
export function getInitialTheme(): Theme {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return window.matchMedia(DARK_SCHEME_QUERY).matches ? 'dark' : 'light';
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

const toggleListeners = new Set<() => void>();

/** Toggles here, in another tab (`storage`), or a system change */
function subscribe(onStoreChange: () => void): () => void {
  const media = window.matchMedia(DARK_SCHEME_QUERY);
  const handleExternalChange = (): void => {
    applyTheme(getInitialTheme());
    onStoreChange();
  };

  toggleListeners.add(onStoreChange);
  media.addEventListener('change', handleExternalChange);
  window.addEventListener('storage', handleExternalChange);

  return () => {
    toggleListeners.delete(onStoreChange);
    media.removeEventListener('change', handleExternalChange);
    window.removeEventListener('storage', handleExternalChange);
  };
}

function getServerTheme(): Theme {
  return 'light';
}

/**
 * ThemeProvider component that provides theme state and controls to the app.
 *
 * Hydrates as 'light' to match the prerendered HTML, then re-renders with the
 * real theme. Never sync the `dark` class in an effect: it would run with
 * 'light' first and flash the page. The inline script in index.html sets it.
 *
 * @param children - React children components
 * @returns JSX element wrapping children with theme context
 */
export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const theme = useSyncExternalStore(
    subscribe,
    getInitialTheme,
    getServerTheme,
  );

  const toggleTheme = useCallback((): void => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    applyTheme(next);
    for (const listener of toggleListeners) {
      listener();
    }
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
