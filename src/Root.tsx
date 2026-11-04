import React from 'react';

import { ThemeProvider } from '@/contexts/ThemeContext';

interface RootProps {
  page: React.ComponentType;
}

/** Rendered by both main.tsx and entry-server.tsx, so the two trees match */
export function Root({ page: Page }: RootProps): React.JSX.Element {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </React.StrictMode>
  );
}
