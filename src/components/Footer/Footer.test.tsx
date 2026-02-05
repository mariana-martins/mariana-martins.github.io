import Footer from '@components/Footer';
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
        /© 2025 Mariana Martins Menezes. Frontend engineer and eternal learner./i,
      ),
    ).toBeInTheDocument();
  });

  it('renders Radix Separator', () => {
    const { container } = render(<Footer />);

    // Radix Separator with decorative prop doesn't have a role
    // Check for the separator element by its data attribute or className
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
