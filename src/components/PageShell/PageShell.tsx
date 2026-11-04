import React from 'react';

import { Footer } from '@components/Footer/Footer';
import { ThemeToggle } from '@components/ThemeToggle/ThemeToggle';
import { ArrowLeft } from 'lucide-react';

import { PATHS } from '@/constants';
import { cn } from '@/lib/cn';

const MAIN_ID = 'main-content';

/** Layout for every page except home, which has its own */
export function PageShell({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="relative min-h-screen max-w-4xl mx-6 md:mx-auto md:px-12 flex flex-col gap-4">
      <a
        href={`#${MAIN_ID}`}
        className={cn(
          'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50',
          'focus:px-4 focus:py-2 focus:rounded-lg focus:bg-warm-100 focus:text-text-primary',
          'focus:outline-none focus:ring-2 focus:ring-blue-300',
        )}
      >
        Skip to content
      </a>
      <ThemeToggle />
      <header className="pt-10 pr-16 text-text-primary dark:text-text-primary-dark">
        <a
          href={PATHS.home}
          className={cn(
            'inline-flex items-center gap-2 min-h-[44px] rounded-md',
            'font-heading text-lg tracking-[0.15rem] uppercase',
            'underline decoration-2 underline-offset-4 decoration-transparent hover:decoration-current',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-focus',
          )}
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Mariana Martins Menezes
          <span className="sr-only">, home</span>
        </a>
      </header>
      <main
        id={MAIN_ID}
        tabIndex={-1}
        className={cn(
          'glass-panel rounded-2xl px-6 py-10 md:px-12 md:py-14 focus:outline-none',
          'text-text-primary dark:text-text-primary-dark',
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
