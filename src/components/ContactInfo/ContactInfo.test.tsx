import ContactInfo from '@components/ContactInfo/ContactInfo';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

// Mock the data module
jest.mock('@/data', () => {
  const { mockPortfolioData } = require('@/__mocks__/mockData');
  return {
    data: mockPortfolioData,
  };
});

describe('ContactInfo', () => {
  it('renders section heading', () => {
    render(<ContactInfo />);

    expect(screen.getByText('Say Hi!')).toBeInTheDocument();
  });

  it('renders address', () => {
    render(<ContactInfo />);

    expect(screen.getByText('Melbourne, Australia')).toBeInTheDocument();
  });

  it('renders email link with correct mailto href', () => {
    render(<ContactInfo />);

    const emailLink = screen.getByRole('link', {
      name: /Send email to mariana@example.com/i,
    });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:mariana@example.com');
  });

  it('renders LinkedIn link with correct attributes', () => {
    render(<ContactInfo />);

    const linkedInLink = screen.getByRole('link', {
      name: /Visit LinkedIn profile/i,
    });
    expect(linkedInLink).toBeInTheDocument();
    expect(linkedInLink).toHaveAttribute(
      'href',
      'https://linkedin.com/in/mariana-martins',
    );
    expect(linkedInLink).toHaveAttribute('target', '_blank');
    expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders GitHub link with correct attributes', () => {
    render(<ContactInfo />);

    const githubLink = screen.getByRole('link', {
      name: /Visit GitHub profile/i,
    });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/mariana-martins',
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has icons with aria-hidden attribute', () => {
    const { container } = render(<ContactInfo />);

    // Lucide React icons are SVGs, not images
    // They should have aria-hidden="true" attribute
    const icons = container.querySelectorAll('[aria-hidden="true"]');
    expect(icons.length).toBeGreaterThan(0);
    icons.forEach((icon) => {
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('has correct aria-labelledby attribute', () => {
    render(<ContactInfo />);

    const section = screen.getByRole('region', { name: 'Say Hi!' });
    expect(section).toHaveAttribute('aria-labelledby', 'contact-info-heading');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ContactInfo />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('handles hover interactions on address', async () => {
    const user = userEvent.setup();
    render(<ContactInfo />);

    const address = screen.getByText('Melbourne, Australia').closest('address');
    expect(address).toBeInTheDocument();

    if (address) {
      await user.hover(address);
      // Component should handle hover without errors
      expect(address).toBeInTheDocument();
    }
  });

  it('handles hover interactions on email link', async () => {
    const user = userEvent.setup();
    render(<ContactInfo />);

    const emailLink = screen.getByRole('link', {
      name: /Send email to mariana@example.com/i,
    });
    await user.hover(emailLink);
    // Component should handle hover without errors
    expect(emailLink).toBeInTheDocument();
  });

  it('handles hover interactions on LinkedIn link', async () => {
    const user = userEvent.setup();
    render(<ContactInfo />);

    const linkedInLink = screen.getByRole('link', {
      name: /Visit LinkedIn profile/i,
    });
    await user.hover(linkedInLink);
    // Component should handle hover without errors
    expect(linkedInLink).toBeInTheDocument();
  });

  it('handles hover interactions on GitHub link', async () => {
    const user = userEvent.setup();
    render(<ContactInfo />);

    const githubLink = screen.getByRole('link', {
      name: /Visit GitHub profile/i,
    });
    await user.hover(githubLink);
    // Component should handle hover without errors
    expect(githubLink).toBeInTheDocument();
  });

  it('handles mouse leave events', async () => {
    const user = userEvent.setup();
    render(<ContactInfo />);

    const emailLink = screen.getByRole('link', {
      name: /Send email to mariana@example.com/i,
    });
    await user.hover(emailLink);
    await user.unhover(emailLink);
    // Component should handle unhover without errors
    expect(emailLink).toBeInTheDocument();
  });
});
