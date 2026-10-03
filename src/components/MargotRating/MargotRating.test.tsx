import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { MargotRating } from './MargotRating';

describe('MargotRating', () => {
  it('announces the score as text', () => {
    render(<MargotRating rating={3} />);
    expect(screen.getByText('Rated 3 out of 5 Margots')).toBeInTheDocument();
  });

  it('renders five icons with the first N filled', () => {
    const { container } = render(<MargotRating rating={2} />);
    const icons = container.querySelectorAll('svg');
    expect(icons).toHaveLength(5);
    const filled = Array.from(icons).map(
      (icon) => icon.getAttribute('data-filled') === 'true',
    );
    expect(filled).toEqual([true, true, false, false, false]);
  });

  it('only glows the filled icons', () => {
    const { container } = render(<MargotRating rating={4} />);
    const glowing = container.querySelectorAll('svg.margot-glow');
    expect(glowing).toHaveLength(4);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<MargotRating rating={5} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('sparkles only the fifth Margot on a perfect score', () => {
    const { container } = render(<MargotRating rating={5} />);
    const icons = Array.from(container.querySelectorAll('svg'));
    expect(icons.map((icon) => icon.hasAttribute('data-sparkles'))).toEqual([
      false,
      false,
      false,
      false,
      true,
    ]);
  });

  it('never sparkles below a perfect score', () => {
    const { container } = render(<MargotRating rating={4} />);
    expect(container.querySelector('svg[data-sparkles]')).toBeNull();
  });
});
