import type React from 'react';

import type { MargotsPicksDrawerProps } from './MargotsPicksDrawer';

/** The drawer's own chunk; the browser caches the request after the first */
export function loadDrawer(): Promise<{
  default: React.ComponentType<MargotsPicksDrawerProps>;
}> {
  return import('./MargotsPicksDrawer');
}

/**
 * Starts fetching the drawer's code without opening it. Called on intent
 * (hovering or focusing the Learning Shelf button) so the drawer is usually
 * loaded by the time it is clicked. Repeat calls reuse the same request.
 */
export function preloadMargotsPicks(): void {
  void loadDrawer();
}
