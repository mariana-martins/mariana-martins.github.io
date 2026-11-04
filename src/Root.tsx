import React from 'react';

import { App } from '@/App';
import { ThemeProvider } from '@/contexts/ThemeContext';

/** Rendered by both main.tsx and entry-server.tsx, so the two trees match */
export function Root(): React.JSX.Element {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
}
