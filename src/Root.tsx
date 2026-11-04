import React from 'react';

import { App } from '@/App';
import { ThemeProvider } from '@/contexts/ThemeContext';

/**
 * The whole tree, shared by the browser entry (main.tsx) and the prerender
 * entry (entry-server.tsx) so both render exactly the same thing.
 */
export function Root(): React.JSX.Element {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
}
