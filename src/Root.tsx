import React from 'react';

import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';

import { ThemeProvider } from '@/contexts/ThemeContext';

interface RootProps {
  page: React.ComponentType;
}

/** Rendered by both main.tsx and entry-server.tsx, so the two trees match */
export function Root({ page: Page }: RootProps): React.JSX.Element {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <ErrorBoundary>
          <Page />
        </ErrorBoundary>
      </ThemeProvider>
    </React.StrictMode>
  );
}
