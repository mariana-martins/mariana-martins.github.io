import React, { lazy, Suspense, useState } from 'react';

import { useShelfHash } from '@/hooks/useShelfHash';

import { loadDrawer } from './loadDrawer';

const MargotsPicksDrawer = lazy(loadDrawer);

/**
 * Renders nothing until first opened, so the drawer's chunk only loads when
 * wanted. Stays mounted afterwards so closing can animate out.
 */
export function MargotsPicks(): React.JSX.Element | null {
  const { isOpen, close } = useShelfHash();
  const [hasOpened, setHasOpened] = useState(isOpen);

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
