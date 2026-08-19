import { describe, expect, it } from '@jest/globals';
import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';

import TagList from './TagList';

const technologies = ['React', 'TypeScript', 'Vite', 'Jest', 'Axe'];

describe('TagList', () => {
  it('renders every tag when no maximum is given', () => {
    render(<TagList technologies={technologies} label="Technologies used" />);

    const list = screen.getByRole('list', { name: 'Technologies used' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(
      technologies.length,
    );
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });

  it('truncates to the maximum and counts the remainder', () => {
    render(
      <TagList technologies={technologies} label="Technologies used" max={2} />,
    );

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.queryByText('Vite')).not.toBeInTheDocument();
    expect(screen.getByText('+3')).toBeInTheDocument();
  });

  it('keeps the truncated names available to assistive technology', () => {
    render(
      <TagList technologies={technologies} label="Technologies used" max={2} />,
    );

    // The "+3" is decorative; the names it stands for are still readable
    const list = screen.getByRole('list', { name: 'Technologies used' });
    expect(list).toHaveTextContent('Vite, Jest, Axe');
    expect(screen.getByText('+3')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders nothing when there are no tags', () => {
    const { container } = render(
      <TagList technologies={[]} label="Technologies used" />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TagList technologies={technologies} label="Technologies used" max={2} />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
