import { describe, expect, it, jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';

import { useFunFactsTrivia } from './useFunFactsTrivia';

// Mock the data module
jest.mock('@/data', () => {
  return {
    data: {
      funFacts: [
        { id: 'fact-1', question: 'Question 1?', fact: 'Answer 1' },
        { id: 'fact-2', question: 'Question 2?', fact: 'Answer 2' },
        { id: 'fact-3', question: 'Question 3?', fact: 'Answer 3' },
      ],
    },
  };
});

describe('useFunFactsTrivia', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns correct initial state', () => {
    const { result } = renderHook(() => useFunFactsTrivia());

    expect(result.current.isFlipped).toBe(false);
    expect(result.current.shouldAutoFocus).toBe(false);
    expect(result.current.revealedCount).toBe(0);
    expect(result.current.allRevealed).toBe(false);
    expect(result.current.totalFacts).toBe(3);
    expect(result.current.currentFact.id).toBe('fact-1');
  });

  it('handleFlip sets isFlipped to true', () => {
    const { result } = renderHook(() => useFunFactsTrivia());

    act(() => {
      result.current.handleFlip();
    });

    expect(result.current.isFlipped).toBe(true);
  });

  it('handleFlip adds current fact to revealed ids', () => {
    const { result } = renderHook(() => useFunFactsTrivia());

    expect(result.current.revealedCount).toBe(0);

    act(() => {
      result.current.handleFlip();
    });

    expect(result.current.revealedCount).toBe(1);
  });

  it('does not duplicate revealed id when revisiting a revealed fact', () => {
    const { result } = renderHook(() => useFunFactsTrivia());

    // Reveal first fact
    act(() => {
      result.current.handleFlip();
    });
    expect(result.current.revealedCount).toBe(1);

    // Go to next, reveal, then go back (wrap around)
    act(() => {
      result.current.handleNext();
      jest.advanceTimersByTime(150);
    });
    act(() => {
      result.current.handleFlip();
      result.current.handleNext();
      jest.advanceTimersByTime(150);
    });
    act(() => {
      result.current.handleFlip();
      result.current.handleNext();
      jest.advanceTimersByTime(150);
    });

    // Now back at fact-1, which was already revealed
    expect(result.current.currentFact.id).toBe('fact-1');
    expect(result.current.revealedCount).toBe(3);

    // Flip again - should not add duplicate
    act(() => {
      result.current.handleFlip();
    });
    expect(result.current.revealedCount).toBe(3);
  });

  it('handleNext sets isFlipped to false', () => {
    const { result } = renderHook(() => useFunFactsTrivia());

    act(() => {
      result.current.handleFlip();
    });
    expect(result.current.isFlipped).toBe(true);

    act(() => {
      result.current.handleNext();
    });
    expect(result.current.isFlipped).toBe(false);
  });

  it('handleNext sets shouldAutoFocus to true after timeout', async () => {
    const { result } = renderHook(() => useFunFactsTrivia());

    expect(result.current.shouldAutoFocus).toBe(false);

    act(() => {
      result.current.handleNext();
    });

    // Before timeout, shouldAutoFocus is still false
    expect(result.current.shouldAutoFocus).toBe(false);

    // Advance timer past the 100ms delay
    act(() => {
      jest.advanceTimersByTime(150);
    });

    expect(result.current.shouldAutoFocus).toBe(true);
  });

  it('handleNext cycles to next fact after timeout', () => {
    const { result } = renderHook(() => useFunFactsTrivia());

    expect(result.current.currentFact.id).toBe('fact-1');

    act(() => {
      result.current.handleNext();
      jest.advanceTimersByTime(150);
    });

    expect(result.current.currentFact.id).toBe('fact-2');
  });

  it('handleNext wraps around to first fact', () => {
    const { result } = renderHook(() => useFunFactsTrivia());

    // Navigate through all facts
    act(() => {
      result.current.handleNext();
      jest.advanceTimersByTime(150);
    });
    act(() => {
      result.current.handleNext();
      jest.advanceTimersByTime(150);
    });
    act(() => {
      result.current.handleNext();
      jest.advanceTimersByTime(150);
    });

    // Should wrap back to first fact
    expect(result.current.currentFact.id).toBe('fact-1');
  });

  it('handleReset resets all state', () => {
    const { result } = renderHook(() => useFunFactsTrivia());

    // Set up some state
    act(() => {
      result.current.handleFlip();
      result.current.handleNext();
      jest.advanceTimersByTime(150);
      result.current.handleFlip();
    });

    expect(result.current.currentFact.id).toBe('fact-2');
    expect(result.current.revealedCount).toBe(2);

    act(() => {
      result.current.handleReset();
    });

    expect(result.current.currentFact.id).toBe('fact-1');
    expect(result.current.isFlipped).toBe(false);
    expect(result.current.revealedCount).toBe(0);
    expect(result.current.shouldAutoFocus).toBe(true);
  });

  it('clearAutoFocus sets shouldAutoFocus to false', () => {
    const { result } = renderHook(() => useFunFactsTrivia());

    act(() => {
      result.current.handleReset();
    });
    expect(result.current.shouldAutoFocus).toBe(true);

    act(() => {
      result.current.clearAutoFocus();
    });
    expect(result.current.shouldAutoFocus).toBe(false);
  });

  it('allRevealed is true when all facts are revealed', () => {
    const { result } = renderHook(() => useFunFactsTrivia());

    // Reveal all 3 facts
    act(() => {
      result.current.handleFlip(); // fact-1
      result.current.handleNext();
      jest.advanceTimersByTime(150);
    });
    act(() => {
      result.current.handleFlip(); // fact-2
      result.current.handleNext();
      jest.advanceTimersByTime(150);
    });
    act(() => {
      result.current.handleFlip(); // fact-3
    });

    expect(result.current.revealedCount).toBe(3);
    expect(result.current.allRevealed).toBe(true);
  });
});
