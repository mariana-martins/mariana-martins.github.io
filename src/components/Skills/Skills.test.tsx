import Skills from '@components/Skills/Skills';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

// Mock the data module
jest.mock('@/data', () => {
  const { mockPortfolioData } = require('@/__mocks__/mockData');
  return {
    data: mockPortfolioData,
  };
});

describe('Skills', () => {
  it('renders section heading', () => {
    render(<Skills />);

    expect(screen.getByText('Skills')).toBeInTheDocument();
  });

  it('renders all skills', () => {
    render(<Skills />);

    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Git')).toBeInTheDocument();
    expect(screen.getByText('Figma')).toBeInTheDocument();
  });

  it('sorts skills correctly - frontend first, then by level', () => {
    render(<Skills />);

    const skillElements = screen.getAllByText(
      /JavaScript|React|Python|Git|Figma/,
    );
    const skillTexts = skillElements.map((el) => el.textContent);

    // Frontend skills (expert level) should come first
    expect(skillTexts[0]).toBe('JavaScript');
    expect(skillTexts[1]).toBe('React');

    // Then tools (advanced level)
    expect(skillTexts[2]).toBe('Git');

    // Then design (advanced level)
    expect(skillTexts[3]).toBe('Figma');

    // Then backend (intermediate level)
    expect(skillTexts[4]).toBe('Python');
  });

  it('renders Tag components for each skill', () => {
    render(<Skills />);

    // All skills should be rendered as Tag components
    const skillNames = ['JavaScript', 'React', 'Python', 'Git', 'Figma'];
    skillNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('has correct aria-labelledby attribute', () => {
    render(<Skills />);

    const section = screen.getByRole('region', { name: 'Skills' });
    expect(section).toHaveAttribute('aria-labelledby', 'skills-heading');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Skills />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
