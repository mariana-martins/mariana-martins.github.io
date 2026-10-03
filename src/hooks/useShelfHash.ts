import { useCallback, useEffect, useState } from 'react';

import { MARGOTS_PICKS } from '@/constants';

interface UseShelfHashReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

function hashIsOpen(): boolean {
  return window.location.hash === MARGOTS_PICKS.hash;
}

/**
 * The URL hash is the drawer's only source of truth: any component can open
 * it by setting `#shelf`, a shared link opens it on load, and the browser's
 * back button closes it.
 */
export function useShelfHash(): UseShelfHashReturn {
  const [isOpen, setIsOpen] = useState(hashIsOpen);

  useEffect(() => {
    const sync = (): void => setIsOpen(hashIsOpen());
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const open = useCallback(() => {
    // Assigning the hash pushes a history entry, so "back" closes the drawer
    window.location.hash = MARGOTS_PICKS.hash;
  }, []);

  const close = useCallback(() => {
    // replaceState avoids leaving a dangling "#" and does not fire hashchange
    window.history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search,
    );
    setIsOpen(false);
  }, []);

  return { isOpen, open, close };
}
