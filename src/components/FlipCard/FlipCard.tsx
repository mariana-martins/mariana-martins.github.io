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

  // Keyboard loop: reveal moves focus to "Next fact", once the flip shows it
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

  // ...and "Next fact" moves focus to the new question
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
      <div
        className={cn(
          'relative w-full h-full preserve-3d will-change-transform',
          'transition-transform duration-500 ease-in-out motion-reduce:transition-none',
          isFlipped && 'rotate-y-180',
        )}
      >
        <Card
          asChild
          variant="interactive"
          className={cn(
            'absolute inset-0 w-full min-h-[230px] cursor-pointer',
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
            {/* Buttons only allow phrasing content: spans, not p/div */}
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

          <button
            ref={nextButtonRef}
            type="button"
            className={cn(
              'mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-md cursor-pointer',
              'bg-pink/20 dark:bg-blue-100/20',
              'hover:bg-pink/30 dark:hover:bg-blue-100/30',
              'text-sm font-medium',
              'transition-colors duration-200',
              'focus-ring',
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

      <div aria-live="polite" className="sr-only">
        {isFlipped ? `Answer: ${funFact.fact}` : ''}
      </div>
    </div>
  );
}
