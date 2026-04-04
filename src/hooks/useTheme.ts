import { useContext } from 'react';

import { ThemeContext } from '@/contexts/ThemeContext';

/**
 * Return type for the useTheme hook.
 */
export interface UseThemeReturn {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

/**
 * Custom hook for accessing theme state and controls.
 * Must be used within a ThemeProvider.
 * @returns Object containing current theme and toggle function
 */
export function useTheme(): UseThemeReturn {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
