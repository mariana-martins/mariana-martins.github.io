import { Footer } from '@components/Footer/Footer';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('Footer', () => {
  it('renders quote text', () => {
    render(<Footer />);

    expect(
      screen.getByText(
        'Not all those who wander are lost. Some are just debugging.',
      ),
    ).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    render(<Footer />);

    expect(
      screen.getByText(
        '© 2026 Mariana Martins Menezes. Frontend & Design Engineer and eternal learner.',
      ),
    ).toBeInTheDocument();
  });

  it('renders Radix Separator', () => {
    const { container } = render(<Footer />);

    const separator = container.querySelector(
      '[data-orientation="horizontal"]',
    );
    expect(separator).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
