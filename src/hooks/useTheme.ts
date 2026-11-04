import { useContext } from 'react';

import { ThemeContext } from '@/contexts/ThemeContext';

export interface UseThemeReturn {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function useTheme(): UseThemeReturn {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
