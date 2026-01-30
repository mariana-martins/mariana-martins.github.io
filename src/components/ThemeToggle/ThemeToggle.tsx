import React from 'react';

import clsx from 'clsx';
import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { useTheme } from '@/hooks/useTheme';

function ThemeToggle(): React.JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  // Animation variants based on reduced motion preference
  const hoverAnimation = prefersReducedMotion
    ? {}
    : {
        rotate: [0, -10, 10, -10, 10, 0],
        transition: {
          duration: 0.5,
          ease: 'easeInOut' as const,
        },
      };

  const tapAnimation = prefersReducedMotion
    ? {}
    : {
        scale: 0.9,
        transition: {
          type: 'spring' as const,
          stiffness: 400,
          damping: 10,
        },
      };

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      className={clsx(
        'absolute top-0 right-0 md:right-1.5 lg:right-0 rounded-b-md pt-8 px-2 pb-2 transition-colors cursor-pointer',
        'flex items-center justify-center', // Add this to center the icons
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'bg-pink text-text-primary',
        'hover:bg-pink/70',
        'dark:bg-[var(--color-blue-100)] dark:text-[var(--color-blue-200)]',
        'dark:hover:bg-[var(--color-blue-100)]/90',
        'focus:ring-[var(--color-pink)]',
        'dark:focus:ring-[var(--color-blue-100)]',
        'z-50',
        'min-w-[44px] min-h-[44px]',
        'touch-manipulation',
      )}
      style={{ touchAction: 'manipulation' }} // Alternative: inline style
    >
      <span className="sr-only">Toggle theme</span>
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, rotate: -180 }
            }
            animate={{ opacity: 1, rotate: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, rotate: 180 }
            }
            transition={{
              duration: prefersReducedMotion ? 0.15 : 0.3,
              ease: 'easeInOut' as const,
            }}
          >
            <Sun size={24} aria-hidden="true" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, rotate: 180 }
            }
            animate={{ opacity: 1, rotate: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, rotate: -180 }
            }
            transition={{
              duration: prefersReducedMotion ? 0.15 : 0.3,
              ease: 'easeInOut' as const,
            }}
          >
            <Moon size={24} aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default ThemeToggle;
