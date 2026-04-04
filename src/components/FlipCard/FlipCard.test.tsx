import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FlipCard } from './FlipCard';

const mockFunFact = {
  id: 'test-1',
  question: 'What is your favorite color?',
  fact: 'My favorite color is blue because it reminds me of the ocean.',
};

describe('FlipCard', () => {
  const mockOnFlip = jest.fn();
  const mockOnNext = jest.fn();
  const mockOnReset = jest.fn();

  beforeEach(() => {
    mockOnFlip.mockClear();
    mockOnNext.mockClear();
    mockOnReset.mockClear();
  });

  it('renders question card when not flipped', () => {
    render(
      <FlipCard
        funFact={mockFunFact}
        isFlipped={false}
        onFlip={mockOnFlip}
        onNext={mockOnNext}
        onReset={mockOnReset}
        allRevealed={false}
      />,
    );

    expect(screen.getByText(mockFunFact.question)).toBeInTheDocument();
    expect(screen.getByText('Click to reveal')).toBeInTheDocument();
  });

  it('calls onFlip when question card is clicked', () => {
    render(
      <FlipCard
        funFact={mockFunFact}
        isFlipped={false}
        onFlip={mockOnFlip}
        onNext={mockOnNext}
        onReset={mockOnReset}
        allRevealed={false}
      />,
    );

    const questionButton = screen.getByRole('button', {
      name: /Question: What is your favorite color\?/i,
    });
    fireEvent.click(questionButton);

    expect(mockOnFlip).toHaveBeenCalledTimes(1);
  });

  it('calls onFlip when Enter key is pressed on question card', () => {
    render(
      <FlipCard
        funFact={mockFunFact}
        isFlipped={false}
        onFlip={mockOnFlip}
        onNext={mockOnNext}
        onReset={mockOnReset}
        allRevealed={false}
      />,
    );

    const questionButton = screen.getByRole('button', {
      name: /Question: What is your favorite color\?/i,
    });
    fireEvent.keyDown(questionButton, { key: 'Enter' });

    expect(mockOnFlip).toHaveBeenCalledTimes(1);
  });

  it('calls onFlip when Space key is pressed on question card', () => {
    render(
      <FlipCard
        funFact={mockFunFact}
        isFlipped={false}
        onFlip={mockOnFlip}
        onNext={mockOnNext}
        onReset={mockOnReset}
        allRevealed={false}
      />,
    );

    const questionButton = screen.getByRole('button', {
      name: /Question: What is your favorite color\?/i,
    });
    fireEvent.keyDown(questionButton, { key: ' ' });

    expect(mockOnFlip).toHaveBeenCalledTimes(1);
  });

  it('renders answer when flipped', () => {
    render(
      <FlipCard
        funFact={mockFunFact}
        isFlipped={true}
        onFlip={mockOnFlip}
        onNext={mockOnNext}
        onReset={mockOnReset}
        allRevealed={false}
      />,
    );

    // The answer should be in the document
    expect(screen.getByText(mockFunFact.fact)).toBeInTheDocument();
  });

  it('shows Next fact button when flipped and not all revealed', () => {
    render(
      <FlipCard
        funFact={mockFunFact}
        isFlipped={true}
        onFlip={mockOnFlip}
        onNext={mockOnNext}
        onReset={mockOnReset}
        allRevealed={false}
      />,
    );

    const nextButton = screen.getByRole('button', {
      name: /See next fun fact/i,
    });
    expect(nextButton).toBeInTheDocument();
    expect(screen.getByText('Next fact')).toBeInTheDocument();
  });

  it('calls onNext when Next fact button is clicked', () => {
    render(
      <FlipCard
        funFact={mockFunFact}
        isFlipped={true}
        onFlip={mockOnFlip}
        onNext={mockOnNext}
        onReset={mockOnReset}
        allRevealed={false}
      />,
    );

    const nextButton = screen.getByRole('button', {
      name: /See next fun fact/i,
    });
    fireEvent.click(nextButton);

    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  it('shows Play again button when flipped and all revealed', () => {
    render(
      <FlipCard
        funFact={mockFunFact}
        isFlipped={true}
        onFlip={mockOnFlip}
        onNext={mockOnNext}
        onReset={mockOnReset}
        allRevealed={true}
      />,
    );

    const resetButton = screen.getByRole('button', {
      name: /Play again from the beginning/i,
    });
    expect(resetButton).toBeInTheDocument();
    expect(screen.getByText('Play again')).toBeInTheDocument();
  });

  it('calls onReset when Play again button is clicked', () => {
    render(
      <FlipCard
        funFact={mockFunFact}
        isFlipped={true}
        onFlip={mockOnFlip}
        onNext={mockOnNext}
        onReset={mockOnReset}
        allRevealed={true}
      />,
    );

    const resetButton = screen.getByRole('button', {
      name: /Play again from the beginning/i,
    });
    fireEvent.click(resetButton);

    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });

  it('has proper ARIA attributes', () => {
    const { container } = render(
      <FlipCard
        funFact={mockFunFact}
        isFlipped={false}
        onFlip={mockOnFlip}
        onNext={mockOnNext}
        onReset={mockOnReset}
        allRevealed={false}
      />,
    );

    const questionButton = screen.getByRole('button', {
      name: /Question: What is your favorite color\?/i,
    });
    expect(questionButton).toHaveAttribute('tabIndex', '0');

    // The live region should exist for screen reader announcements
    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
  });

  it('announces answer to screen readers when flipped', () => {
    const { container } = render(
      <FlipCard
        funFact={mockFunFact}
        isFlipped={true}
        onFlip={mockOnFlip}
        onNext={mockOnNext}
        onReset={mockOnReset}
        allRevealed={false}
      />,
    );

    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).toHaveTextContent(`Answer: ${mockFunFact.fact}`);
  });

  it('sets correct tabIndex when flipped', () => {
    render(
      <FlipCard
        funFact={mockFunFact}
        isFlipped={true}
        onFlip={mockOnFlip}
        onNext={mockOnNext}
        onReset={mockOnReset}
        allRevealed={false}
      />,
    );

    const questionButton = screen.getByRole('button', {
      name: /Question: What is your favorite color\?/i,
    });
    expect(questionButton).toHaveAttribute('tabIndex', '-1');

    const nextButton = screen.getByRole('button', {
      name: /See next fun fact/i,
    });
    expect(nextButton).toHaveAttribute('tabIndex', '0');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <FlipCard
        funFact={mockFunFact}
        isFlipped={false}
        onFlip={mockOnFlip}
        onNext={mockOnNext}
        onReset={mockOnReset}
        allRevealed={false}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations when flipped', async () => {
    const { container } = render(
      <FlipCard
        funFact={mockFunFact}
        isFlipped={true}
        onFlip={mockOnFlip}
        onNext={mockOnNext}
        onReset={mockOnReset}
        allRevealed={false}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe('Auto-focus behavior', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('accepts shouldAutoFocus prop without error', () => {
      expect(() => {
        render(
          <FlipCard
            funFact={mockFunFact}
            isFlipped={false}
            onFlip={mockOnFlip}
            onNext={mockOnNext}
            onReset={mockOnReset}
            allRevealed={false}
            shouldAutoFocus={true}
          />,
        );
      }).not.toThrow();
    });

    it('calls onAutoFocusComplete when shouldAutoFocus is true', () => {
      const mockOnAutoFocusComplete = jest.fn();

      render(
        <FlipCard
          funFact={mockFunFact}
          isFlipped={false}
          onFlip={mockOnFlip}
          onNext={mockOnNext}
          onReset={mockOnReset}
          allRevealed={false}
          shouldAutoFocus={true}
          onAutoFocusComplete={mockOnAutoFocusComplete}
        />,
      );

      // Advance timers to trigger the focus effect
      jest.advanceTimersByTime(150);

      expect(mockOnAutoFocusComplete).toHaveBeenCalledTimes(1);
    });

    it('does not call onAutoFocusComplete when shouldAutoFocus is false', () => {
      const mockOnAutoFocusComplete = jest.fn();

      render(
        <FlipCard
          funFact={mockFunFact}
          isFlipped={false}
          onFlip={mockOnFlip}
          onNext={mockOnNext}
          onReset={mockOnReset}
          allRevealed={false}
          shouldAutoFocus={false}
          onAutoFocusComplete={mockOnAutoFocusComplete}
        />,
      );

      jest.advanceTimersByTime(150);

      expect(mockOnAutoFocusComplete).not.toHaveBeenCalled();
    });

    it('focuses front card when shouldAutoFocus is true and not flipped', () => {
      render(
        <FlipCard
          funFact={mockFunFact}
          isFlipped={false}
          onFlip={mockOnFlip}
          onNext={mockOnNext}
          onReset={mockOnReset}
          allRevealed={false}
          shouldAutoFocus={true}
        />,
      );

      jest.advanceTimersByTime(150);

      const card = screen.getByRole('button', {
        name: /Question: What is your favorite color\?/i,
      });
      expect(document.activeElement).toBe(card);
    });
  });
});
