import { Experience } from '@components/Experience/Experience';
import { ExperienceCard } from '@components/Experience/ExperienceCard';
import { describe, expect, it } from '@jest/globals';
import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';

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

    const section = heading.closest('section');
    expect(section).toHaveAttribute('aria-labelledby', 'experience-heading');
  });

  it('renders experience entries with position and company', () => {
    render(<Experience />);

    expect(screen.getByText('Test Position')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  it('renders experience entries with end date', () => {
    render(<Experience />);

    expect(screen.getByText('Jan 2020 - Dec 2021')).toBeInTheDocument();

    expect(
      screen.getByText('Test description with end date'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Test description without end date'),
    ).toBeInTheDocument();
  });

  it("renders 'Present' when endDate is undefined", () => {
    render(<Experience />);

    expect(screen.getByText('Current Position')).toBeInTheDocument();
    expect(screen.getByText('Current Company')).toBeInTheDocument();

    expect(screen.getByText('Jan 2022 - Present')).toBeInTheDocument();
  });

  it('renders technologies as tags', () => {
    render(<Experience />);

    expect(screen.getAllByText('React')).toHaveLength(2);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('exposes every entry as a heading, with no disclosure to expand', () => {
    render(<Experience />);

    const positions = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent);
    expect(positions).toEqual(['Test Position', 'Current Position']);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders every entry in a single list, marking the ongoing role', () => {
    render(<Experience />);

    const list = screen.getByTestId('experience-list');
    expect(list.tagName).toBe('UL');

    const entries = screen.getAllByTestId('experience-entry');
    expect(entries).toHaveLength(2);

    expect(entries[0]).not.toHaveAttribute('data-current');
    expect(entries[1]).toHaveAttribute('data-current');
  });

  it('renders the duration alongside the date range', () => {
    render(<Experience />);

    // Both end months count
    expect(screen.getByText('2 yr')).toBeInTheDocument();
  });

  it('renders technologies list with proper accessibility attributes', () => {
    render(<Experience />);

    const techLists = screen.getAllByRole('list', {
      name: 'Technologies used',
    });
    expect(techLists).toHaveLength(2);

    const listItems = within(techLists[0]).getAllByRole('listitem');
    expect(listItems.length).toBeGreaterThan(0);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Experience />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('leaves out the company line for independent work', () => {
    render(
      <ul>
        <ExperienceCard
          experience={{
            id: 'independent',
            position: 'Independent Work',
            startDate: '2024-05',
            description: 'Own projects.',
            technologies: [],
          }}
        />
      </ul>,
    );

    const entry = screen.getByTestId('experience-entry');
    expect(
      within(entry).getByRole('heading', { name: 'Independent Work' }),
    ).toBeInTheDocument();
    expect(entry.querySelectorAll('p.text-muted')).toHaveLength(0);
  });
});
