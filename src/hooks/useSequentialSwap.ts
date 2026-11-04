import { type RefObject, useLayoutEffect, useRef, useState } from 'react';

import { prefersReducedMotion } from '@/lib/reducedMotion';

type Phase = 'idle' | 'leaving' | 'entering';

// Same timings as the previous Motion setup
const DURATION_MS = 300;
const SHIFT_PX = 20;
const REDUCED_DURATION_MS = 100;

interface UseSequentialSwapReturn<T> {
  shown: T;
  isLeaving: boolean;
  ref: RefObject<HTMLDivElement | null>;
}

function canAnimate(): boolean {
  return typeof Element.prototype.animate === 'function';
}

/**
 * The old item slides out, then the new one in, like Motion's
 * `<AnimatePresence mode="wait">`, using the Web Animations API. Key the
 * animated element by the item's id.
 */
export function useSequentialSwap<T extends { id: string }>(
  current: T,
): UseSequentialSwapReturn<T> {
  const [shown, setShown] = useState(current);
  const [phase, setPhase] = useState<Phase>('idle');
  const ref = useRef<HTMLDivElement>(null);
  // A ref, so a new item arriving mid-animation does not restart it
  const latest = useRef(current);

  useLayoutEffect(() => {
    latest.current = current;
  }, [current]);

  // Without the Web Animations API (old browsers, jsdom) swap immediately
  if (current.id !== shown.id && phase === 'idle') {
    if (canAnimate()) {
      setPhase('leaving');
    } else {
      setShown(current);
    }
  }

  // Layout effect, or the entering item flashes in for a frame
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
      () => undefined,
    );

    return () => {
      isCurrent = false;
    };
  }, [phase]);

  return { shown, isLeaving: phase === 'leaving', ref };
}
