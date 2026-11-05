import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { act, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';

import { CountUp } from './CountUp';
import { formatCountValue, parseCountValue } from './countValue';

describe('parseCountValue', () => {
  it.each([
    ['100 kB', { prefix: '', target: 100, decimals: 0, suffix: ' kB' }],
    ['97+', { prefix: '', target: 97, decimals: 0, suffix: '+' }],
    ['5.5:1', { prefix: '', target: 5.5, decimals: 1, suffix: ':1' }],
    ['292', { prefix: '', target: 292, decimals: 0, suffix: '' }],
  ])('splits %s into number and text', (value, expected) => {
    expect(parseCountValue(value)).toEqual(expected);
  });

  it('has nothing to count for zero or text', () => {
    expect(parseCountValue('0')).toBeNull();
    expect(parseCountValue('none')).toBeNull();
  });

  it('formats with the original decimals', () => {
    const parsed = parseCountValue('5.5:1');
    expect(parsed && formatCountValue(parsed, 2.345)).toBe('2.3:1');
  });
});

type ObserverCallback = (entries: Array<{ isIntersecting: boolean }>) => void;

describe('CountUp', () => {
  const originalObserver = globalThis.IntersectionObserver;
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    globalThis.IntersectionObserver = originalObserver;
    window.matchMedia = originalMatchMedia;
    jest.restoreAllMocks();
  });

  /** Captures the observer callback so the test decides when it is visible */
  function stubObserver(): { becomeVisible: () => void } {
    let callback: ObserverCallback = () => undefined;
    globalThis.IntersectionObserver = class {
      constructor(cb: ObserverCallback) {
        callback = cb;
      }
      observe(): void {
        // no-op
      }
      disconnect(): void {
        // no-op
      }
    } as unknown as typeof IntersectionObserver;
    return { becomeVisible: () => callback([{ isIntersecting: true }]) };
  }

  /** Runs every animation frame at once, with the clock past the duration */
  function finishFramesImmediately(): void {
    let now = 0;
    jest.spyOn(window.performance, 'now').mockImplementation(() => now);
    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((tick: FrameRequestCallback) => {
        now += 2000;
        tick(now);
        return 1;
      });
  }

  function setReducedMotion(reduced: boolean): void {
    window.matchMedia = ((query: string) => ({
      matches: reduced && query.includes('reduce'),
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })) as unknown as typeof window.matchMedia;
  }

  /** The visible number; the other copy only reserves its width */
  const visibleNumber = (): HTMLElement =>
    screen
      .getAllByText(/./)
      .find((element) => !element.hasAttribute('aria-hidden')) as HTMLElement;

  it('prerenders the final value', () => {
    expect(renderToString(<CountUp value="100 kB" />)).toContain('100 kB');
  });

  it('starts from zero and counts to the value once visible', () => {
    setReducedMotion(false);
    const { becomeVisible } = stubObserver();
    finishFramesImmediately();

    render(<CountUp value="100 kB" />);
    expect(visibleNumber()).toHaveTextContent('0 kB');

    act(() => becomeVisible());
    expect(visibleNumber()).toHaveTextContent('100 kB');
  });

  it('shows the value without counting for reduced motion', () => {
    setReducedMotion(true);
    stubObserver();

    render(<CountUp value="100 kB" />);

    expect(visibleNumber()).toHaveTextContent('100 kB');
  });

  it('keeps its width from the hidden final value', () => {
    const { container } = render(<CountUp value="292" />);
    const placeholder = container.querySelector('[aria-hidden="true"]');

    expect(placeholder).toHaveTextContent('292');
    expect(placeholder).toHaveClass('invisible');
  });
});
