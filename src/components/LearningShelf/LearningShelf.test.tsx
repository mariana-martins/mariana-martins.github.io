import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { data } from '@/data';

import LearningShelf from './LearningShelf';

describe('LearningShelf', () => {
  it('renders with correct heading', () => {
    render(<LearningShelf />);
    expect(
      screen.getByRole('heading', { level: 3, name: /The Learning Shelf/i }),
    ).toBeInTheDocument();
  });

  it('renders all learning shelf items', () => {
    render(<LearningShelf />);
    data.learningShelf.forEach((item) => {
      // Check title presence
      if (item.link) {
        // If it's a link, we need to match the text slightly differently if we want to be precise,
        // but getByText generally works. For stricter checks, look for the link.
        expect(
          screen.getByRole('link', { name: new RegExp(item.title, 'i') }),
        ).toBeInTheDocument();
      } else {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      }
      expect(screen.getAllByText(item.author).length).toBeGreaterThan(0);
    });
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
    // We can't guarantee all are present in data, but we can check if rendered items have valid statuses.
    data.learningShelf.forEach((item) => {
      // Determine label based on status
      let label = '';
      if (item.status === 'planned') {
        label = 'Planned';
      } else if (item.status === 'in-progress') {
        label = 'In Progress';
      } else if (item.status === 'completed') {
        label = 'Completed';
      }

      if (label) {
        // There might be multiple of the same status, so verify at least one is there
        expect(screen.getAllByText(label).length).toBeGreaterThan(0);
      }
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<LearningShelf />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
