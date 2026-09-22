import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import type * as constants from '@/constants';
import { mockPicks } from '@/__mocks__/mockData';
import { MARGOTS_PICKS } from '@/constants';

import { MargotsPicks } from './MargotsPicks';

jest.mock('@/data', () => ({
  data: {
    picks: jest.requireActual<{ mockPicks: unknown }>('@/__mocks__/mockData')
      .mockPicks,
  },
}));

jest.mock('@/constants', () => {
  const actual = jest.requireActual<typeof constants>('@/constants');
  // A small page so "Show more" is reachable with five mock picks
  return {
    ...actual,
    MARGOTS_PICKS: { ...actual.MARGOTS_PICKS, pageSize: 3 },
  };
});

function renderOpen(): ReturnType<typeof render> {
  window.location.hash = MARGOTS_PICKS.hash;
  return render(<MargotsPicks />);
}

function getDialog(): HTMLElement {
  return screen.getByRole('dialog', { name: "Margot's Picks" });
}

function visibleTitles(): string[] {
  const list = within(getDialog()).getByRole('list', {
    name: "Margot's Picks",
  });
  return (
    within(list)
      .getAllByRole('heading', { level: 3 })
      // Drop the sr-only "(opens in new tab, ...)" suffix on linked titles
      .map((heading) =>
        (heading.textContent ?? '').replace(/ \(opens in new tab.*$/, ''),
      )
  );
}

describe('MargotsPicks', () => {
  afterEach(() => {
    window.history.replaceState(null, '', window.location.pathname);
  });

  it('stays closed without the hash', () => {
    render(<MargotsPicks />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens when the page loads with the hash', () => {
    renderOpen();
    expect(getDialog()).toBeInTheDocument();
    expect(
      within(getDialog()).getByRole('heading', { name: "Margot's Picks" }),
    ).toBeInTheDocument();
  });

  it('lists the first page, recent first, with ratings and notes', async () => {
    renderOpen();
    expect(visibleTitles()).toEqual([
      'React Testing Library',
      'The Courage to Be Disliked',
      'Arrival',
    ]);
    expect(screen.getByText('Rated 5 out of 5 Margots')).toBeInTheDocument();
    await userEvent
      .setup()
      .click(screen.getByRole('button', { name: 'Show more' }));
    expect(screen.getByText('Still argue with chapter 3.')).toBeInTheDocument();
    expect(screen.getByText(`${mockPicks.length} picks`)).toBeInTheDocument();
  });

  it('reveals more on "Show more" and focuses the first new card', async () => {
    const user = userEvent.setup();
    renderOpen();
    await user.click(screen.getByRole('button', { name: 'Show more' }));
    expect(visibleTitles()).toHaveLength(5);
    // Fourth in "recent" order is Clean Code, which has no link: the card itself takes focus
    expect(document.activeElement?.tagName).toBe('LI');
    expect(document.activeElement).toHaveTextContent('Clean Code');
  });

  it('hides "Show more" once everything is visible', async () => {
    const user = userEvent.setup();
    renderOpen();
    await user.click(screen.getByRole('button', { name: 'Show more' }));
    expect(
      screen.queryByRole('button', { name: 'Show more' }),
    ).not.toBeInTheDocument();
  });

  it('filters by type and updates the count', async () => {
    const user = userEvent.setup();
    renderOpen();
    await user.click(screen.getByRole('button', { name: 'Book' }));
    expect(visibleTitles()).toEqual(['Clean Code']);
    expect(screen.getByText('1 pick')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Book' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('filters by status', async () => {
    const user = userEvent.setup();
    renderOpen();
    await user.click(screen.getByRole('button', { name: 'Planned' }));
    expect(visibleTitles()).toEqual(['Severance']);
  });

  it('shows an empty state when nothing matches', async () => {
    const user = userEvent.setup();
    renderOpen();
    await user.click(screen.getByRole('button', { name: 'Audiobook' }));
    await user.click(screen.getByRole('button', { name: 'Completed' }));
    expect(
      screen.getByText('Nothing here yet. Margot went looking for more.'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /running across the grass/ }),
    ).toBeInTheDocument();
  });

  it('re-sorts alphabetically', async () => {
    const user = userEvent.setup();
    renderOpen();
    await user.click(screen.getByRole('radio', { name: 'A to Z' }));
    expect(visibleTitles()).toEqual([
      'Arrival',
      'Clean Code',
      'React Testing Library',
    ]);
    await user.click(screen.getByRole('button', { name: 'Show more' }));
    expect(visibleTitles()).toEqual([
      'Arrival',
      'Clean Code',
      'React Testing Library',
      'Severance',
      'The Courage to Be Disliked',
    ]);
  });

  it('closes on Escape and clears the hash', async () => {
    const user = userEvent.setup();
    renderOpen();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(window.location.hash).toBe('');
  });

  it('closes from the close button and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    render(
      <>
        <button id="margots-picks-trigger" type="button">
          trigger
        </button>
        <MargotsPicks />
      </>,
    );
    act(() => {
      window.location.hash = MARGOTS_PICKS.hash;
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: "Close Margot's Picks" }),
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'trigger' })).toHaveFocus();
  });

  it('has no accessibility violations while open', async () => {
    renderOpen();
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
