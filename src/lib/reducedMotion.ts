import { useSyncExternalStore } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Reads the preference at call time.
 *
 * Use inside event handlers, where the value is needed once and must be
 * current: no subscription, no state, no re-render. This is the right form
 * for APIs whose explicit option overrides CSS - `scrollIntoView`'s
 * `behavior`, for instance, wins over the `scroll-behavior` property, so the
 * stylesheet cannot express the preference on its own.
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function subscribe(onStoreChange: () => void): () => void {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener('change', onStoreChange);

  return () => query.removeEventListener('change', onStoreChange);
}

/**
 * Reads the preference during render, and re-renders when it changes.
 *
 * Use when the value decides what gets rendered. For a value only read inside
 * an event handler, prefer {@link prefersReducedMotion} - a hook there costs a
 * dependency and a re-render that changes nothing on screen.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, prefersReducedMotion, () => false);
}
