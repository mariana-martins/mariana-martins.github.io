import { type RefObject, useLayoutEffect, useRef, useState } from 'react';

import { prefersReducedMotion } from '@/lib/reducedMotion';

type Phase = 'idle' | 'leaving' | 'entering';

/** Each half of the swap, matching the previous Motion setup */
const DURATION_MS = 300;
const SHIFT_PX = 20;
/** Reduced motion keeps a short fade with no movement, as Motion did */
const REDUCED_DURATION_MS = 100;

interface UseSequentialSwapReturn<T> {
  /** The item to render: the old one while it leaves, then the new one */
  shown: T;
  /** True while the old item plays out; it should not be interactive */
  isLeaving: boolean;
  /** Attach to the element that animates */
  ref: RefObject<HTMLDivElement | null>;
}

function canAnimate(): boolean {
  return typeof Element.prototype.animate === 'function';
}

/**
 * Swaps one item for the next in sequence: the old one slides and fades
 * out, then the new one in - what Motion's `<AnimatePresence mode="wait">`
 * did here, with the browser's own Web Animations API instead of a library.
 *
 * The old item stays a live element while it leaves (a flip card keeps
 * turning back as it goes), and the first render never animates, so
 * prerendered HTML shows the item in place. Key the animated element by the
 * item's id so each item gets a fresh element.
 */
export function useSequentialSwap<T extends { id: string }>(
  current: T,
): UseSequentialSwapReturn<T> {
  const [shown, setShown] = useState(current);
  const [phase, setPhase] = useState<Phase>('idle');
  const ref = useRef<HTMLDivElement>(null);
  // The newest item, for when the leaving animation ends. A ref, so a new
  // item arriving mid-animation does not restart the animation in flight.
  const latest = useRef(current);

  useLayoutEffect(() => {
    latest.current = current;
  }, [current]);

  // A new item arrived. Derived during render, not in an effect, so React
  // re-renders before painting. Without animation support (old browsers,
  // jsdom) the swap is immediate.
  if (current.id !== shown.id && phase === 'idle') {
    if (canAnimate()) {
      setPhase('leaving');
    } else {
      setShown(current);
    }
  }

  // Layout effect: the entering item must start at opacity 0 before the
  // browser paints it, or it flashes in for a frame
  useLayoutEffect(() => {
    const node = ref.current;
    if (phase === 'idle' || !node) {
      return;
    }

    const reduced = prefersReducedMotion();
    const shift = reduced ? 0 : SHIFT_PX;
    const isLeaving = phase === 'leaving';
    const keyframes = isLeaving
      ? [
          { opacity: 1, transform: 'translateX(0)' },
          { opacity: 0, transform: `translateX(${-shift}px)` },
        ]
      : [
          { opacity: 0, transform: `translateX(${shift}px)` },
          { opacity: 1, transform: 'translateX(0)' },
        ];

    const animation = node.animate(keyframes, {
      duration: reduced ? REDUCED_DURATION_MS : DURATION_MS,
      easing: isLeaving ? 'ease-in' : 'ease-out',
      // The leaving item holds at opacity 0 until it is swapped out
      fill: isLeaving ? 'forwards' : 'none',
    });

    let isCurrent = true;
    animation.finished.then(
      () => {
        if (!isCurrent) {
          return;
        }
        if (isLeaving) {
          setShown(latest.current);
          setPhase('entering');
        } else {
          setPhase('idle');
        }
      },
      // Cancelled when the element unmounts; nothing to do
      () => undefined,
    );

    return () => {
      isCurrent = false;
    };
  }, [phase]);

  return { shown, isLeaving: phase === 'leaving', ref };
}
