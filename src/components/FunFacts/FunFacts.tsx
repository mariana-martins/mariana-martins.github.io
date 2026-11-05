import React from 'react';

import { FlipCard } from '@components/FlipCard/FlipCard';

import { SECTIONS } from '@/constants';
import { useFunFactsTrivia } from '@/hooks/useFunFactsTrivia';
import { useSequentialSwap } from '@/hooks/useSequentialSwap';
import { cn } from '@/lib/cn';

export function FunFacts(): React.JSX.Element {
  const {
    currentFact,
    totalFacts,
    revealedCount,
    isFlipped,
    allRevealed,
    shouldAutoFocus,
    handleFlip,
    handleNext,
    handleReset,
    clearAutoFocus,
  } = useFunFactsTrivia();
  const { shown, isLeaving, ref } = useSequentialSwap(currentFact);

  return (
    <section
      className={cn(
        'w-full h-fit flex flex-col items-center gap-4 px-4 py-12',
        'text-text-primary dark:text-text-primary-dark',
        'border-b-dashed-custom',
      )}
      aria-labelledby={SECTIONS.funFacts.id}
    >
      <h2
        id={SECTIONS.funFacts.id}
        tabIndex={-1}
        className="text-xl font-semibold"
      >
        {SECTIONS.funFacts.label}
      </h2>

      <p role="status" className="text-sm text-muted">
        {revealedCount} of {totalFacts} revealed
      </p>

      <div className="relative w-full max-w-md">
        {/* Keyed so each fact gets a fresh, unrotated card */}
        <div
          key={shown.id}
          ref={ref}
          inert={isLeaving}
          className="relative z-30"
        >
          <FlipCard
            funFact={shown}
            isFlipped={isFlipped}
            onFlip={handleFlip}
            onNext={handleNext}
            onReset={handleReset}
            allRevealed={allRevealed && isFlipped}
            shouldAutoFocus={shouldAutoFocus && !isLeaving}
            onAutoFocusComplete={clearAutoFocus}
          />
        </div>
      </div>
    </section>
  );
}
