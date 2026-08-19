import React from 'react';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/cn';

export function ThemeToggle(): React.JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      className={cn(
        'absolute top-0 right-0 md:right-1.5 lg:right-0 rounded-b-md pt-8 px-2 pb-2 transition-colors cursor-pointer',
        'flex items-center justify-center',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'bg-pink text-text-primary',
        'hover:bg-pink/70',
        'dark:bg-blue-100 dark:text-blue-200',
        'dark:hover:bg-blue-100/90',
        'focus-visible:ring-pink',
        'dark:focus-visible:ring-blue-100',
        'z-50',
        'min-w-[44px] min-h-[44px]',
        'touch-manipulation',
        'active:scale-[0.96] transition-transform duration-300',
      )}
    >
      <span className="sr-only">Toggle theme</span>
      <div className="relative w-6 h-6 flex items-center justify-center">
        <Sun
          size={24}
          aria-hidden="true"
          className={cn(
            'absolute transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]',
            isDark
              ? 'opacity-0 scale-[0.25] blur-xs'
              : 'opacity-100 scale-100 blur-0',
          )}
        />
        <Moon
          size={24}
          aria-hidden="true"
          className={cn(
            'absolute transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]',
            isDark
              ? 'opacity-100 scale-100 blur-0'
              : 'opacity-0 scale-[0.25] blur-xs',
          )}
        />
      </div>
    </button>
  );
}
