import { useSyncExternalStore } from 'react';

function subscribeToNothing(): () => void {
  return () => undefined;
}

/**
 * `false` when prerendering and during hydration, `true` after. Gate values
 * that prerendered HTML cannot know, like today's date.
 */
export function useHasHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}
