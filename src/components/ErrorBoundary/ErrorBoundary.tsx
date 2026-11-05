import React from 'react';

import { MAIN_CONTENT_ID, PATHS } from '@/constants';
import { cn } from '@/lib/cn';

interface ErrorBoundaryState {
  hasError: boolean;
}

/** Without it, an error while rendering unmounts the whole page and leaves it blank */
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render(): React.ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }
    const linkClass = cn(
      'min-h-[44px] underline underline-offset-4 rounded-sm',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-focus',
    );
    return (
      <main
        id={MAIN_CONTENT_ID}
        className="max-w-xl mx-auto my-24 px-6 flex flex-col gap-4 text-center text-text-primary dark:text-text-primary-dark"
      >
        <h1 className="font-heading text-3xl font-medium">
          Something went wrong
        </h1>
        <p className="text-lg/8">
          This page hit an error it could not recover from. Reloading usually
          fixes it.
        </p>
        <p className="flex justify-center gap-6">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className={cn(linkClass, 'cursor-pointer')}
          >
            Reload the page
          </button>
          <a href={PATHS.home} className={linkClass}>
            Go to the home page
          </a>
        </p>
      </main>
    );
  }
}
