import React, { useEffect, useRef } from 'react';

import { Card } from '@components/Card/Card';
import { ArrowRight, Eye, RotateCcw } from 'lucide-react';

import { cn } from '@/lib/cn';
import { prefersReducedMotion } from '@/lib/reducedMotion';
import type { FunFact } from '@/types';

/** Matches `duration-500` on the rotating wrapper */
const FLIP_DURATION_MS = 500;

export interface FlipCardProps {
  funFact: FunFact;
  isFlipped: boolean;
  onFlip: () => void;
  onNext: () => void;
  onReset: () => void;
  allRevealed: boolean;
  shouldAutoFocus?: boolean;
  onAutoFocusComplete?: () => void;
}

export function FlipCard({
  funFact,
  isFlipped,
  onFlip,
  onNext,
  onReset,
  allRevealed,
  shouldAutoFocus = false,
  onAutoFocusComplete,
}: FlipCardProps): React.JSX.Element {
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const frontCardRef = useRef<HTMLButtonElement>(null);

  /**
   * Focus Management for Keyboard Navigation
   *
   * These effects create a seamless keyboard loop:
   * 1. User presses Enter on question card → card flips → focus moves to "Next fact" button
   * 2. User presses Enter on "Next fact" → new question appears → focus moves to new card
   *
   * This eliminates the need for extra tab presses between interactions.
   */

  // Effect 1: Move focus to the action button when revealing the answer
  // Delay accounts for the flip animation so focus moves after the button is visible
  useEffect(() => {
    if (isFlipped && nextButtonRef.current) {
      const timeoutId = window.setTimeout(
        () => {
          nextButtonRef.current?.focus();
        },
        prefersReducedMotion() ? 0 : FLIP_DURATION_MS * 0.6,
      );
      return () => window.clearTimeout(timeoutId);
    }
  }, [isFlipped]);

  // Effect 2: Move focus to the new question card after navigation
  // The parent sets `shouldAutoFocus` AFTER mounting the new card to avoid race conditions
  // Shorter delay (100ms) since the card is already visible when this runs
  useEffect(() => {
    if (shouldAutoFocus && !isFlipped && frontCardRef.current) {
      const timeoutId = window.setTimeout(
        () => {
          frontCardRef.current?.focus();
          onAutoFocusComplete?.(); // Clear the flag to prevent re-triggering
        },
        prefersReducedMotion() ? 0 : 100,
      );
      return () => window.clearTimeout(timeoutId);
    }
  }, [shouldAutoFocus, isFlipped, onAutoFocusComplete]);

  return (
    <div className="relative w-full min-h-[230px] perspective-1000">
      {/* A plain CSS transition: the browser runs it on the compositor */}
      <div
        className={cn(
          'relative w-full h-full preserve-3d will-change-transform',
          'transition-transform duration-500 ease-in-out motion-reduce:transition-none',
          isFlipped && 'rotate-y-180',
        )}
      >
        {/* Front - Question */}
        <Card
          asChild
          variant="interactive"
          className={cn(
            'absolute inset-0 w-full min-h-[230px]',
            'flex flex-col items-center justify-center gap-4',
            'backface-hidden',
          )}
        >
          <button
            ref={frontCardRef}
            type="button"
            onClick={onFlip}
            inert={isFlipped}
          >
            {/* A button only allows phrasing content, so spans, not p/div */}
            <span className="block text-base md:text-lg text-center font-medium px-2 text-balance">
              <span className="sr-only">Question: </span>
              {funFact.question}
            </span>
            <span className="flex items-center gap-2 text-sm text-muted">
              <Eye size={18} aria-hidden="true" />
              <span>Reveal the answer</span>
            </span>
          </button>
        </Card>

        {/* Back - Answer */}
        <Card
          variant="default"
          className={cn(
            'absolute inset-0 w-full min-h-[230px]',
            'flex flex-col justify-between',
            'backface-hidden rotate-y-180',
          )}
          inert={!isFlipped}
        >
          <div className="flex-1 flex items-center">
            <p className="text-sm md:text-base leading-relaxed text-pretty">
              {funFact.fact}
            </p>
          </div>

          {/* Next/Reset button */}
          <button
            ref={nextButtonRef}
            type="button"
            className={cn(
              'mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-md cursor-pointer',
              'bg-pink/20 dark:bg-blue-100/20',
              'hover:bg-pink/30 dark:hover:bg-blue-100/30',
              'text-sm font-medium',
              'transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus',
            )}
            onClick={allRevealed ? onReset : onNext}
          >
            {allRevealed ? (
              <>
                <RotateCcw size={16} aria-hidden="true" />
                <span>Play again</span>
              </>
            ) : (
              <>
                <span>Next fact</span>
                <ArrowRight size={16} aria-hidden="true" />
              </>
            )}
          </button>
        </Card>
      </div>

      {/* Screen reader announcement */}
      <div aria-live="polite" className="sr-only">
        {isFlipped ? `Answer: ${funFact.fact}` : ''}
      </div>
    </div>
  );
}
