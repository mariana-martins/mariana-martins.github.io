import AboutMe from '@components/AboutMe/AboutMe';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ThemeProvider } from '@/contexts/ThemeContext';

// Mock the data module
jest.mock('@/data', () => {
  const { mockPortfolioData } = require('@/__mocks__/mockData');
  return {
    data: {
      ...mockPortfolioData,
      introduction:
        "Hello, I'm Mariana Martins Menezes, but you can call me Mari! I'm a Frontend Engineer with a passion for building user-friendly and efficient web applications.",
    },
  };
});

describe('AboutMe', () => {
  it('renders introduction text with correct structure', () => {
    const { container } = render(
      <ThemeProvider>
        <AboutMe />
      </ThemeProvider>,
    );

    // Text is split across elements due to LoopingHighlight component
    // Find the paragraph element and check its textContent
    const paragraph = container.querySelector('p');
    expect(paragraph).toBeInTheDocument();

    const textContent = paragraph?.textContent ?? '';
    expect(textContent).toMatch(/Hi! I.m Mariana, but you can call me/);
    expect(textContent).toContain('like all my Brazilian friends do');
  });

  it('renders LoopingHighlight component with Mari text', () => {
    render(
      <ThemeProvider>
        <AboutMe />
      </ThemeProvider>,
    );

    expect(screen.getByText('Mari')).toBeInTheDocument();
  });

  it('renders profile image with correct alt text', () => {
    render(
      <ThemeProvider>
        <AboutMe />
      </ThemeProvider>,
    );

    expect(
      screen.getByAltText('Me and my dog, Margot, a very fluffy white dog!'),
    ).toBeInTheDocument();
  });

  it('has correct aria-labelledby attribute', () => {
    render(
      <ThemeProvider>
        <AboutMe />
      </ThemeProvider>,
    );

    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('aria-labelledby', 'about-me-heading');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <AboutMe />
      </ThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('handles reduced motion preference', () => {
    // Mock matchMedia for reduced motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => {
        if (query === '(prefers-reduced-motion: reduce)') {
          return {
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          };
        }
        return {
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        };
      }),
    });

    render(
      <ThemeProvider>
        <AboutMe />
      </ThemeProvider>,
    );

    // Component should render without errors when reduced motion is preferred
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
  });
});
