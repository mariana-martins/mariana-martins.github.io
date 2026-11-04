import type React from 'react';

import type { MargotsPicksDrawerProps } from './MargotsPicksDrawer';

export function loadDrawer(): Promise<{
  default: React.ComponentType<MargotsPicksDrawerProps>;
}> {
  return import('./MargotsPicksDrawer');
}

/** Fetches the drawer's code ahead of the click, on hover or focus */
export function preloadMargotsPicks(): void {
  void loadDrawer();
}
