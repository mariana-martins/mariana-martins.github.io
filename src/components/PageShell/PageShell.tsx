import React from 'react';

import { Breadcrumb, type Crumb } from '@components/Breadcrumb/Breadcrumb';
import { Footer } from '@components/Footer/Footer';
import { SiteMark } from '@components/SiteMark/SiteMark';
import { ThemeToggle } from '@components/ThemeToggle/ThemeToggle';

import { MAIN_CONTENT_ID, PATHS } from '@/constants';
import { cn } from '@/lib/cn';

export function PageShell({
  breadcrumbs,
  children,
}: {
  /** Home is added first */
  breadcrumbs: Crumb[];
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="relative min-h-screen max-w-4xl mx-3 sm:mx-6 md:mx-auto md:px-12 flex flex-col gap-4">
      <a
        href={`#${MAIN_CONTENT_ID}`}
        className={cn(
          'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50',
          'focus:px-4 focus:py-2 focus:rounded-lg focus:bg-warm-100 focus:text-text-primary',
          'focus:outline-none focus:ring-2 focus:ring-blue-300',
        )}
      >
        Skip to content
      </a>
      <ThemeToggle className="md:right-12" />
      <header className="pt-6 pr-16">
        <SiteMark />
      </header>
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className={cn(
          'glass-panel rounded-2xl px-4 py-8 sm:px-6 sm:py-10 md:px-12 md:py-14 focus:outline-none',
          'text-text-primary dark:text-text-primary-dark',
        )}
      >
        <div className="mb-8">
          <Breadcrumb
            items={[{ label: 'Home', href: PATHS.home }, ...breadcrumbs]}
          />
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}
