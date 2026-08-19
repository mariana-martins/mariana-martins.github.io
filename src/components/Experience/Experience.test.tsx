import { Experience } from '@components/Experience/Experience';
import { describe, expect, it } from '@jest/globals';
import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';

// Mock the data module
jest.mock('@/data', () => {
  const { mockPortfolioData } = require('@/__mocks__/mockData');
  return {
    data: mockPortfolioData,
  };
});

describe('Experience', () => {
  it('renders experience section with title', () => {
    render(<Experience />);

    const heading = screen.getByText('Past Chapters');
    expect(heading).toBeInTheDocument();

    // The section should have proper aria-labelledby
    const section = heading.closest('section');
    expect(section).toHaveAttribute('aria-labelledby', 'experience-heading');
  });

  it('renders experience entries with position and company', () => {
    render(<Experience />);

    // Check that position and company are rendered (they're separate elements now)
    expect(screen.getByText('Test Position')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  it('renders experience entries with end date', () => {
    render(<Experience />);

    // Check date range is displayed (abbreviated month format)
    expect(screen.getByText('Jan 2020 - Dec 2021')).toBeInTheDocument();

    // Every description is rendered, no expanding required
    expect(
      screen.getByText('Test description with end date'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Test description without end date'),
    ).toBeInTheDocument();
  });

  it("renders 'Present' when endDate is undefined", () => {
    render(<Experience />);

    // Check position and company
    expect(screen.getByText('Current Position')).toBeInTheDocument();
    expect(screen.getByText('Current Company')).toBeInTheDocument();

    // Check date range shows "Present" (abbreviated month format)
    expect(screen.getByText('Jan 2022 - Present')).toBeInTheDocument();
  });

  it('renders technologies as tags', () => {
    render(<Experience />);

    // Technologies are rendered for every entry
    expect(screen.getAllByText('React')).toHaveLength(2);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('exposes every entry as a heading, with no disclosure to expand', () => {
    render(<Experience />);

    const positions = screen
      .getAllByRole('heading', { level: 4 })
      .map((heading) => heading.textContent);
    expect(positions).toEqual(['Test Position', 'Current Position']);

    // Content is always rendered, so there is nothing to toggle
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders every entry in a single list, marking the ongoing role', () => {
    render(<Experience />);

    const list = screen.getByTestId('experience-list');
    expect(list.tagName).toBe('UL');

    const entries = screen.getAllByTestId('experience-entry');
    expect(entries).toHaveLength(2);

    // Only the entry without an end date is flagged as current
    expect(entries[0]).not.toHaveAttribute('data-current');
    expect(entries[1]).toHaveAttribute('data-current');
  });

  it('renders the duration alongside the date range', () => {
    render(<Experience />);

    // Jan 2020 - Dec 2021, inclusive of both months
    expect(screen.getByText('2 yr')).toBeInTheDocument();
  });

  it('renders technologies list with proper accessibility attributes', () => {
    render(<Experience />);

    // One technologies list per entry, each with proper role and name
    const techLists = screen.getAllByRole('list', {
      name: 'Technologies used',
    });
    expect(techLists).toHaveLength(2);

    // Check for listitems
    const listItems = within(techLists[0]).getAllByRole('listitem');
    expect(listItems.length).toBeGreaterThan(0);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Experience />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
