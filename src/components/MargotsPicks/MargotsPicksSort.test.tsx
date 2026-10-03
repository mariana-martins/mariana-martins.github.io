import React, { useState } from 'react';

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import type { PickSort } from '@/lib/picks';

import { MargotsPicksSort } from './MargotsPicksSort';

function Harness({
  initial = 'recent',
}: {
  initial?: PickSort;
}): React.JSX.Element {
  const [sort, setSort] = useState<PickSort>(initial);
  return <MargotsPicksSort sort={sort} onSortChange={setSort} />;
}

describe('MargotsPicksSort', () => {
  it('renders a labelled group with the current sort pressed', () => {
    render(<Harness />);
    expect(
      screen.getByRole('radiogroup', { name: 'Sort by' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Recent first' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'A to Z' })).not.toBeChecked();
  });

  it('changes the sort on click', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('radio', { name: 'Top rated' }));
    expect(screen.getByRole('radio', { name: 'Top rated' })).toBeChecked();
  });

  it('never lets the sort be deselected', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('radio', { name: 'Recent first' }));
    expect(screen.getByRole('radio', { name: 'Recent first' })).toBeChecked();
  });

  it('is one tab stop and arrow keys move the selection', async () => {
    const user = userEvent.setup();
    render(<Harness initial="rating" />);
    await user.tab();
    expect(screen.getByRole('radio', { name: 'Top rated' })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('radio', { name: 'A to Z' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('radio', { name: 'A to Z' })).toBeChecked();
    await user.tab();
    expect(document.body).toHaveFocus();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Harness />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
