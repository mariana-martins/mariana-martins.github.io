import { useCallback, useState } from 'react';

import { data } from '@/data';
import type { FunFact } from '@/types';

interface UseFunFactsTriviaReturn {
  currentFact: FunFact;
  totalFacts: number;
  revealedCount: number;
  isFlipped: boolean;
  allRevealed: boolean;
  shouldAutoFocus: boolean;
  handleFlip: () => void;
  handleNext: () => void;
  handleReset: () => void;
  clearAutoFocus: () => void;
}

export function useFunFactsTrivia(): UseFunFactsTriviaReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shouldAutoFocus, setShouldAutoFocus] = useState(false);

  const totalFacts = data.funFacts.length;
  const currentFact = data.funFacts[currentIndex];
  const allRevealed = revealedIds.length === totalFacts;

  const handleFlip = useCallback(() => {
    setIsFlipped(true);
    if (!revealedIds.includes(currentFact.id)) {
      setRevealedIds((prev) => [...prev, currentFact.id]);
    }
  }, [currentFact.id, revealedIds]);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    window.setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalFacts);
      setShouldAutoFocus(true);
    }, 100);
  }, [totalFacts]);

  const handleReset = useCallback(() => {
    setRevealedIds([]);
    setIsFlipped(false);
    setCurrentIndex(0);
    setShouldAutoFocus(true);
  }, []);

  const clearAutoFocus = useCallback(() => {
    setShouldAutoFocus(false);
  }, []);

  return {
    currentFact,
    totalFacts,
    revealedCount: revealedIds.length,
    isFlipped,
    allRevealed,
    shouldAutoFocus,
    handleFlip,
    handleNext,
    handleReset,
    clearAutoFocus,
  };
}
