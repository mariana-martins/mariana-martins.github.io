import React, { lazy, Suspense, useState } from 'react';

import { useShelfHash } from '@/hooks/useShelfHash';

import { loadDrawer } from './loadDrawer';

const MargotsPicksDrawer = lazy(loadDrawer);

/**
 * Margot's Picks, opened by the `#shelf` hash.
 *
 * Renders nothing until the first open, so the drawer's code - Radix Dialog,
 * the filters, the whole list - is only downloaded by visitors who want it.
 * After that it stays mounted, so closing can animate out.
 */
export function MargotsPicks(): React.JSX.Element | null {
  const { isOpen, close } = useShelfHash();
  const [hasOpened, setHasOpened] = useState(isOpen);

  // Derived during render rather than in an effect: React re-renders
  // straight away, before painting
  if (isOpen && !hasOpened) {
    setHasOpened(true);
  }

  if (!hasOpened) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <MargotsPicksDrawer isOpen={isOpen} onClose={close} />
    </Suspense>
  );
}
