import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';

import { MargotIcon } from './MargotIcon';

function getPaths(container: HTMLElement): SVGPathElement[] {
  return Array.from(container.querySelectorAll('path'));
}

describe('MargotIcon', () => {
  it('is hidden from assistive technology', () => {
    const { container } = render(<MargotIcon filled />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('focusable', 'false');
  });

  it('fills the letter when filled', () => {
    const { container } = render(<MargotIcon filled />);
    const [letter] = getPaths(container);
    expect(letter).toHaveAttribute('fill', 'currentColor');
    expect(letter).toHaveAttribute('stroke', 'currentColor');
  });

  it('outlines the letter when empty', () => {
    const { container } = render(<MargotIcon filled={false} />);
    const [letter] = getPaths(container);
    expect(letter).toHaveAttribute('fill', 'none');
    expect(letter).toHaveAttribute('stroke', 'currentColor');
  });

  it('keeps the viewBox aspect ratio for a custom size', () => {
    const { container } = render(<MargotIcon filled size={105} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('height', '105');
    expect(svg).toHaveAttribute('width', '148');
  });

  it('adds four coloured sparkles around the letter when asked', () => {
    const { container } = render(<MargotIcon filled sparkles />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('data-sparkles', 'true');
    expect(svg).toHaveClass('overflow-visible');
    const paths = getPaths(container);
    expect(paths).toHaveLength(6);
    const colours = paths.slice(2).map((path) => path.getAttribute('class'));
    expect(new Set(colours).size).toBe(4);
    paths.slice(2).forEach((path) => {
      expect(path).toHaveAttribute('fill', 'currentColor');
      expect(path.getAttribute('class')).toMatch(
        /^text-(warm|green|highlight)-/,
      );
    });
  });

  it('keeps the same box with sparkles so the row stays aligned', () => {
    const { container } = render(<MargotIcon filled sparkles size={105} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 148 105');
    expect(svg).toHaveAttribute('height', '105');
    expect(svg).toHaveAttribute('width', '148');
  });
});
