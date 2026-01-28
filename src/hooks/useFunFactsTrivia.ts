import { useCallback, useState } from "react";

import { data } from "@/data";
import type { FunFact } from "@/types";

interface UseFunFactsTriviaReturn {
  currentFact: FunFact;
  totalFacts: number;
  revealedCount: number;
  isFlipped: boolean;
  allRevealed: boolean;
  handleFlip: () => void;
  handleNext: () => void;
  handleReset: () => void;
}

export function useFunFactsTrivia(): UseFunFactsTriviaReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);

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
    }, 100);
  }, [totalFacts]);

  const handleReset = useCallback(() => {
    setRevealedIds([]);
    setIsFlipped(false);
    setCurrentIndex(0);
  }, []);

  return {
    currentFact,
    totalFacts,
    revealedCount: revealedIds.length,
    isFlipped,
    allRevealed,
    handleFlip,
    handleNext,
    handleReset,
  };
}
