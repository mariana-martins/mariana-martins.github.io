import { useCallback, useSyncExternalStore } from 'react';

import { MARGOTS_PICKS } from '@/constants';

interface UseShelfHashReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

function hashIsOpen(): boolean {
  return window.location.hash === MARGOTS_PICKS.hash;
}

function hashIsOpenOnServer(): boolean {
  return false;
}

/** replaceState fires no event, so `close` notifies these itself */
const closeListeners = new Set<() => void>();

function subscribe(onStoreChange: () => void): () => void {
  closeListeners.add(onStoreChange);
  window.addEventListener('hashchange', onStoreChange);
  return () => {
    closeListeners.delete(onStoreChange);
    window.removeEventListener('hashchange', onStoreChange);
  };
}

/**
 * The URL hash is the drawer's only source of truth: any component can open
 * it by setting `#shelf`, a shared link opens it on load, and the browser's
 * back button closes it.
 */
export function useShelfHash(): UseShelfHashReturn {
  const isOpen = useSyncExternalStore(
    subscribe,
    hashIsOpen,
    hashIsOpenOnServer,
  );

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
    for (const listener of closeListeners) {
      listener();
    }
  }, []);

  return { isOpen, open, close };
}
