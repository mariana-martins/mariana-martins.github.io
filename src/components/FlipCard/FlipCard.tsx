import React from 'react';

import clsx from 'clsx';
import { ArrowRight, MousePointerClick, RotateCcw } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

import type { FunFact } from '@/types';

import { Card } from '../Card';

export interface FlipCardProps {
  funFact: FunFact;
  isFlipped: boolean;
  onFlip: () => void;
  onNext: () => void;
  onReset: () => void;
  allRevealed: boolean;
}

export function FlipCard({
  funFact,
  isFlipped,
  onFlip,
  onNext,
  onReset,
  allRevealed,
}: FlipCardProps): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isFlipped) {
        onFlip();
      }
    }
  };

  const handleNextKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (allRevealed) {
        onReset();
      } else {
        onNext();
      }
    }
  };

  return (
    <div className="relative w-full min-h-[230px] perspective-1000">
      <motion.div
        className="relative w-full h-full preserve-3d will-change-transform"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.5,
          ease: 'easeInOut',
        }}
      >
        {/* Front - Question */}
        <Card
          variant="interactive"
          className={clsx(
            'absolute inset-0 w-full min-h-[230px]',
            'flex flex-col items-center justify-center gap-4',
            'backface-hidden',
          )}
          role="button"
          tabIndex={isFlipped ? -1 : 0}
          onClick={!isFlipped ? onFlip : undefined}
          onKeyDown={!isFlipped ? handleKeyDown : undefined}
          aria-label={`Question: ${funFact.question}. Click to reveal answer.`}
        >
          <p className="text-base md:text-lg text-center font-medium px-2">
            {funFact.question}
          </p>
          <div className="flex items-center gap-2 text-sm text-text-primary/60 dark:text-text-primary-dark/60">
            <MousePointerClick size={18} aria-hidden="true" />
            <span>Click to reveal</span>
          </div>
        </Card>

        {/* Back - Answer */}
        <Card
          variant="default"
          className={clsx(
            'absolute inset-0 w-full min-h-[230px]',
            'flex flex-col justify-between',
            'backface-hidden rotate-y-180',
          )}
          aria-hidden={!isFlipped}
        >
          <div className="flex-1 flex items-center">
            <p className="text-sm md:text-base leading-relaxed">
              {funFact.fact}
            </p>
          </div>

          {/* Next/Reset button */}
          <button
            type="button"
            className={clsx(
              'mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-md cursor-pointer',
              'bg-pink/20 dark:bg-blue-100/20',
              'hover:bg-pink/30 dark:hover:bg-blue-100/30',
              'text-sm font-medium',
              'transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-pink dark:focus-visible:ring-blue-100',
            )}
            onClick={allRevealed ? onReset : onNext}
            onKeyDown={handleNextKeyDown}
            tabIndex={isFlipped ? 0 : -1}
            aria-label={
              allRevealed
                ? 'Play again from the beginning'
                : 'See next fun fact'
            }
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
      </motion.div>

      {/* Screen reader announcement */}
      <div aria-live="polite" className="sr-only">
        {isFlipped ? `Answer: ${funFact.fact}` : ''}
      </div>
    </div>
  );
}
