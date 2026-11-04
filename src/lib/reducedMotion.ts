const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Reads the preference at call time.
 *
 * For JavaScript that starts motion itself - `scrollIntoView`'s `behavior`,
 * a View Transition, a focus delay timed to an animation. These run in event
 * handlers or effects, where the value is needed once and must be current,
 * so there is no subscription and no re-render. Motion declared in CSS
 * carries its own guard instead (`motion-safe:` / `motion-reduce:`, or the
 * media query in index.css).
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
