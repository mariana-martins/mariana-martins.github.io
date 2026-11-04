const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * For motion started from JavaScript. Motion declared in CSS uses
 * `motion-safe:` / `motion-reduce:` instead.
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
