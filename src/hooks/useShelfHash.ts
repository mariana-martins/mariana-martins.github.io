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

/** The `#shelf` hash is the drawer's state: linkable, and "back" closes it */
export function useShelfHash(): UseShelfHashReturn {
  const isOpen = useSyncExternalStore(
    subscribe,
    hashIsOpen,
    hashIsOpenOnServer,
  );

  const open = useCallback(() => {
    window.location.hash = MARGOTS_PICKS.hash;
  }, []);

  const close = useCallback(() => {
    // replaceState avoids leaving a dangling "#"
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
