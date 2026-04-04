import React from 'react';

import { FlipCard } from '@components/FlipCard';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { SECTIONS } from '@/constants';
import { useFunFactsTrivia } from '@/hooks/useFunFactsTrivia';
import { cn } from '@/lib/cn';

function FunFacts(): React.JSX.Element {
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
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className={cn(
        'w-full h-fit flex flex-col items-center gap-4 px-4 py-12',
        'text-text-primary dark:text-text-primary-dark',
        'border-b-dashed-custom',
      )}
      aria-labelledby="fun-facts-heading"
    >
      <h3
        id="fun-facts-heading"
        tabIndex={-1}
        className="text-xl font-semibold"
      >
        {SECTIONS.funFacts.label}
      </h3>

      <p className="text-sm text-muted">
        {revealedCount} of {totalFacts} revealed
      </p>

      {/* Card container */}
      <div className="relative w-full">
        <div className="relative z-30">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFact.id}
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
            >
              <FlipCard
                funFact={currentFact}
                isFlipped={isFlipped}
                onFlip={handleFlip}
                onNext={handleNext}
                onReset={handleReset}
                allRevealed={allRevealed && isFlipped}
                shouldAutoFocus={shouldAutoFocus}
                onAutoFocusComplete={clearAutoFocus}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default FunFacts;
