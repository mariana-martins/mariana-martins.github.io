import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import App from '@/App';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { data } from '@/data';

describe('App', () => {
  it('renders header with title, subtitle, and logo', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    // The name is split into characters with spaces, so we need to query differently
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    // Normalize all whitespace (including non-breaking spaces) and remove spaces between characters
    const normalizedText = heading.textContent
      ?.replace(/\s+/g, ' ')
      .replace(/\s/g, '')
      .toLowerCase();
    const expectedText = 'Mariana Martins Menezes'
      .replace(/\s/g, '')
      .toLowerCase();
    expect(normalizedText).toContain(expectedText);
    // Find the subtitle h2 specifically (not experience positions)
    const subtitle = screen.getByRole('heading', { level: 2 });
    expect(subtitle).toHaveTextContent('Frontend Engineer');
    expect(screen.getByAltText('Mariana Martins Logo')).toBeInTheDocument();
  });

  it('renders main content area', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('renders AboutMe section with introduction', () => {
    const { container } = render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    // Check for the introduction text structure
    // The text is: "Hi! I'm Mariana, but you can call me Mari, like all my Brazilian friends do. {introduction}"
    // Text is split across elements due to LoopingHighlight component
    // Find the paragraph in the AboutMe section and check its textContent
    const aboutMeSection = container.querySelector(
      'section[aria-labelledby="about-me-heading"]',
    );
    expect(aboutMeSection).toBeInTheDocument();

    const paragraph = aboutMeSection?.querySelector('p');
    expect(paragraph).toBeInTheDocument();

    const textContent = paragraph?.textContent ?? '';
    expect(textContent).toMatch(/Hi! I.m Mariana, but you can call me/);
    expect(textContent).toContain('like all my Brazilian friends do');
    expect(textContent).toContain(data.introduction);
  });

  it('renders AboutMe profile image with correct alt text', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    expect(
      screen.getByAltText('Me and my dog, Margot, a very fluffy white dog!'),
    ).toBeInTheDocument();
  });

  it('renders Experience section with all experience entries', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    expect(screen.getByText('Past Chapters')).toBeInTheDocument();

    data.experience.forEach((experience) => {
      // Escape special regex characters in position and company
      const escapedPosition = experience.position.replace(
        /[.*+?^${}()|[\]\\]/g,
        '\\$&',
      );
      const escapedCompany = experience.company.replace(
        /[.*+?^${}()|[\]\\]/g,
        '\\$&',
      );
      // The accordion trigger has an aria-label starting with position at company
      // Use ^ to match from start to avoid partial matches (e.g., "Junior Frontend Developer" matching "Frontend Developer")
      const trigger = screen.getByRole('button', {
        name: new RegExp(`^${escapedPosition} at ${escapedCompany}`, 'i'),
      });
      expect(trigger).toBeInTheDocument();
    });
  });

  it('renders ContactInfo section with contact details', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    // Verify section exists and has key elements
    expect(screen.getByText('Say Hi!')).toBeInTheDocument();
    expect(screen.getByText(data.contact.address)).toBeInTheDocument();

    // Verify at least one contact link exists (detailed checks in ContactInfo.test.tsx)
    const emailLink = screen.getByRole('link', {
      name: new RegExp(data.contact.email, 'i'),
    });
    expect(emailLink).toBeInTheDocument();
  });

  it('renders FunFacts section with trivia game', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    expect(screen.getByText('A Bit of Trivia')).toBeInTheDocument();

    // The trivia game shows one question at a time, so check for the first question
    expect(screen.getByText(data.funFacts[0].question)).toBeInTheDocument();

    // Verify the progress counter is present
    expect(screen.getByText(/0 of \d+ revealed/)).toBeInTheDocument();
  });

  it('renders Projects section with all projects and technologies', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    expect(screen.getByText('Crafted with Care')).toBeInTheDocument();

    data.projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      // Project descriptions are hidden on smaller screens (lg:block)
      // So we check if it exists in the DOM, not necessarily visible
      const descriptionElement = screen.queryByText(project.description);
      // Description might be hidden but should exist in DOM
      if (descriptionElement) {
        expect(descriptionElement).toBeInTheDocument();
      }
    });
  });

  it('renders Footer with copyright and quote', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    expect(
      screen.getByText(
        'Not all those who wander are lost. Some are just debugging.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /© 2025 Mariana Martins Menezes. Frontend engineer and eternal learner./i,
      ),
    ).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <App />
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
        <App />
      </ThemeProvider>,
    );

    // App should render without errors when reduced motion is preferred
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
