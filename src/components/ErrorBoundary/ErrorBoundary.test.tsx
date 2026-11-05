import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ErrorBoundary } from './ErrorBoundary';

function Broken(): React.JSX.Element {
  throw new Error('render failed');
}

describe('ErrorBoundary', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders its children when nothing fails', () => {
    render(
      <ErrorBoundary>
        <p>Page content</p>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('replaces a page that throws with a way to recover', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);

    const { container } = render(
      <ErrorBoundary>
        <Broken />
      </ErrorBoundary>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Something went wrong' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Reload the page' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Go to the home page' }),
    ).toHaveAttribute('href', '/');
    expect(await axe(container)).toHaveNoViolations();
  });
});
