import { describe, expect, it } from '@jest/globals';
import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';

import { App } from '@/App';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { data } from '@/data';

describe('App', () => {
  it('renders header with title, subtitle, and logo', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    const normalizedText = heading.textContent
      ?.replace(/\s+/g, ' ')
      .replace(/\s/g, '')
      .toLowerCase();
    const expectedText = 'Mariana Martins Menezes'
      .replace(/\s/g, '')
      .toLowerCase();
    expect(normalizedText).toContain(expectedText);
    // The job title is not a heading: it labels no section
    const sectionHeadings = screen
      .getAllByRole('heading', { level: 2 })
      .map((h) => h.textContent);
    expect(sectionHeadings).not.toContain('Frontend Engineer');

    const banner = screen.getByRole('banner');
    expect(within(banner).getByText('Frontend Engineer')).toBeInTheDocument();
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

    const aboutMeSection = container.querySelector(
      'section[aria-labelledby="about-me-heading"]',
    );
    expect(aboutMeSection).toBeInTheDocument();

    const paragraph = aboutMeSection?.querySelector('p');
    expect(paragraph).toBeInTheDocument();

    const textContent = paragraph?.textContent ?? '';
    expect(textContent).toEqual(data.introduction);
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

    const pastChaptersElements = screen.getAllByText('Past Chapters');
    expect(pastChaptersElements.length).toBeGreaterThanOrEqual(1);

    data.experience.forEach((experience) => {
      const escapedPosition = experience.position.replace(
        /[.*+?^${}()|[\]\\]/g,
        '\\$&',
      );
      // Anchored, or "Frontend Developer" also matches the Junior role
      const headings = screen.getAllByRole('heading', {
        level: 3,
        name: new RegExp(`^${escapedPosition}$`, 'i'),
      });
      expect(headings.length).toBeGreaterThan(0);

      const entry = headings
        .map((heading) => heading.closest('[data-testid="experience-entry"]'))
        .find((candidate) =>
          candidate?.textContent?.includes(experience.company),
        );
      expect(entry).toBeTruthy();
    });
  });

  it('renders ContactInfo section with contact details', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    const sayHiElements = screen.getAllByText('Say Hi!');
    expect(sayHiElements.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(data.contact.address)).toBeInTheDocument();

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

    const triviaElements = screen.getAllByText('A Bit of Trivia');
    expect(triviaElements.length).toBeGreaterThanOrEqual(1);

    expect(screen.getByText(data.funFacts[0].question)).toBeInTheDocument();

    expect(screen.getByText(/0 of \d+ revealed/)).toBeInTheDocument();
  });

  it('renders Projects section with all projects and technologies', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    const craftedElements = screen.getAllByText('Crafted with Care');
    expect(craftedElements.length).toBeGreaterThanOrEqual(1);

    data.projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      const descriptionElement = screen.queryByText(project.description);
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
        '© 2026 Mariana Martins Menezes. Frontend & Design engineer and eternal learner.',
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

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
