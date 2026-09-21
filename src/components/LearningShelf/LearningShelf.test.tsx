import { afterEach, describe, expect, it } from '@jest/globals';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { LEARNING_SHELF_LIMIT, MARGOTS_PICKS } from '@/constants';
import { data } from '@/data';
import { getPickSubtitle } from '@/lib/picks';

import { LearningShelf, MARGOTS_PICKS_TRIGGER_ID } from './LearningShelf';

const shelf = data.picks.slice(0, LEARNING_SHELF_LIMIT);

describe('LearningShelf', () => {
  afterEach(() => {
    window.history.replaceState(null, '', window.location.pathname);
  });

  it('renders with correct heading', () => {
    render(<LearningShelf />);
    expect(
      screen.getByRole('heading', { level: 2, name: /The Learning Shelf/i }),
    ).toBeInTheDocument();
  });

  it('renders only the first picks, up to the limit', () => {
    render(<LearningShelf />);
    const list = screen.getByRole('list', { name: 'Learning items' });
    const headings = within(list).getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(shelf.length);
    expect(shelf.length).toBeLessThanOrEqual(LEARNING_SHELF_LIMIT);

    shelf.forEach((item) => {
      if (item.link) {
        expect(
          screen.getByRole('link', { name: new RegExp(item.title, 'i') }),
        ).toBeInTheDocument();
      } else {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      }
      expect(screen.getAllByText(getPickSubtitle(item)).length).toBeGreaterThan(
        0,
      );
    });
  });

  it('keeps ratings off the main page', () => {
    render(<LearningShelf />);
    expect(screen.queryByText(/out of 5 Margots/)).not.toBeInTheDocument();
  });

  it('renders links with correct attributes', () => {
    render(<LearningShelf />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders status badges', () => {
    render(<LearningShelf />);
    const labels = {
      planned: 'Planned',
      'in-progress': 'In Progress',
      completed: 'Completed',
    };
    shelf.forEach((item) => {
      expect(screen.getAllByText(labels[item.status]).length).toBeGreaterThan(
        0,
      );
    });
  });

  it('shows a trigger that counts the picks left in the drawer', () => {
    render(<LearningShelf />);
    const remaining = data.picks.length - shelf.length;
    const trigger = screen.getByRole('button', {
      name: new RegExp(`and ${remaining} more in Margot's Picks`),
    });
    expect(trigger).toHaveAttribute('id', MARGOTS_PICKS_TRIGGER_ID);
  });

  it('opens the drawer by setting the URL hash', async () => {
    const user = userEvent.setup();
    render(<LearningShelf />);
    await user.click(screen.getByRole('button', { name: /Margot's Picks/ }));
    expect(window.location.hash).toBe(MARGOTS_PICKS.hash);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<LearningShelf />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has correct aria-labelledby attribute', () => {
    render(<LearningShelf />);

    const section = screen.getByRole('region', { name: 'The Learning Shelf' });
    expect(section).toHaveAttribute(
      'aria-labelledby',
      'learning-shelf-heading',
    );
  });

  it('supports keyboard navigation for links', async () => {
    const user = userEvent.setup();
    render(<LearningShelf />);

    const links = screen.getAllByRole('link');

    await user.tab();
    expect(links[0]).toHaveFocus();

    await user.tab();
    if (links.length > 1) {
      expect(links[1]).toHaveFocus();
    }
  });
});
