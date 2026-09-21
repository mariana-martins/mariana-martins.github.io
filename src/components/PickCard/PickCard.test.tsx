import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { mockPicks } from '@/__mocks__/mockData';
import type { PickItem } from '@/types';

import { PickCard } from './PickCard';

function renderCard(item: PickItem, props = {}): ReturnType<typeof render> {
  return render(
    <ul>
      <PickCard item={item} {...props} />
    </ul>,
  );
}

const byCategory = Object.fromEntries(
  mockPicks.map((pick) => [pick.category, pick]),
) as Record<PickItem['category'], PickItem>;

describe('PickCard', () => {
  it('renders title, category and subtitle', () => {
    renderCard(byCategory.movie);
    expect(
      screen.getByRole('heading', { level: 3, name: 'Arrival' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Movie')).toBeInTheDocument();
    expect(screen.getByText('Denis Villeneuve · 2016')).toBeInTheDocument();
  });

  it.each([
    ['book', 'Robert C. Martin'],
    ['course', 'Kent C. Dodds · Testing JavaScript'],
    ['series', 'Dan Erickson · 2022'],
    ['podcast', 'Wes Bos and Scott Tolinski'],
  ] as const)('renders the %s credit line', (category, subtitle) => {
    renderCard(byCategory[category]);
    expect(screen.getByText(subtitle)).toBeInTheDocument();
  });

  it('renders an external link when the pick has one', () => {
    renderCard(byCategory.course);
    const link = screen.getByRole('link', { name: /React Testing Library/ });
    expect(link).toHaveAttribute('href', 'https://testingjavascript.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the status badge with a hidden label', () => {
    renderCard(byCategory.series);
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('Planned')).toBeInTheDocument();
  });

  it('hides the rating and note by default', () => {
    renderCard(byCategory.book);
    expect(screen.queryByText(/out of 5 Margots/)).not.toBeInTheDocument();
    expect(
      screen.queryByText('Still argue with chapter 3.'),
    ).not.toBeInTheDocument();
  });

  it('shows the rating and note when asked', () => {
    renderCard(byCategory.book, { showRating: true, showNote: true });
    expect(screen.getByText('Rated 4 out of 5 Margots')).toBeInTheDocument();
    expect(screen.getByText('Still argue with chapter 3.')).toBeInTheDocument();
  });

  it('never shows a rating for unfinished picks', () => {
    const unfinished: PickItem = {
      ...byCategory.book,
      status: 'in-progress',
      rating: 3,
    };
    renderCard(unfinished, { showRating: true });
    expect(screen.queryByText(/out of 5 Margots/)).not.toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderCard(byCategory.book, {
      showRating: true,
      showNote: true,
    });
    expect(await axe(container)).toHaveNoViolations();
  });
});
