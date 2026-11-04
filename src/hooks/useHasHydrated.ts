import { useSyncExternalStore } from 'react';

function subscribeToNothing(): () => void {
  return () => undefined;
}

/**
 * `false` while building the prerendered HTML and during hydration, `true`
 * on every render after that.
 *
 * For values that depend on when or where the page is viewed - "today",
 * for instance - and so cannot be baked into HTML built at deploy time.
 * Rendering them only once hydrated keeps the server and client markup
 * identical, which hydration requires.
 */
export function useHasHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}
