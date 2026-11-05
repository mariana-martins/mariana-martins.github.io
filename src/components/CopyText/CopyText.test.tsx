import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { CopyText } from './CopyText';

const EMAIL = 'mari@example.com';

const liveRegion = (): HTMLElement =>
  document.querySelector('[aria-live="polite"]') as HTMLElement;

describe('CopyText', () => {
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  function mockClipboard(
    writeText: (text: string) => Promise<void>,
  ): jest.Mock<(text: string) => Promise<void>> {
    const mock = jest.fn(writeText);
    Object.defineProperty(window.navigator, 'clipboard', {
      value: { writeText: mock },
      configurable: true,
    });
    return mock;
  }

  it('shows the text, named so it says it copies', () => {
    render(<CopyText text={EMAIL} />);

    expect(
      screen.getByRole('button', { name: `${EMAIL} (copy to clipboard)` }),
    ).toBeInTheDocument();
  });

  it('copies on click and announces it, then resets', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const writeText = mockClipboard(() => Promise.resolve());
    render(<CopyText text={EMAIL} />);

    await user.click(screen.getByRole('button'));

    expect(writeText).toHaveBeenCalledWith(EMAIL);
    await waitFor(() =>
      expect(liveRegion()).toHaveTextContent('Copied to clipboard'),
    );

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(liveRegion()).toHaveTextContent('');
  });

  it('selects the text when the clipboard is unavailable', async () => {
    const user = userEvent.setup();
    mockClipboard(() => Promise.reject(new Error('denied')));
    render(<CopyText text={EMAIL} />);

    await user.click(screen.getByRole('button'));

    await waitFor(() => expect(window.getSelection()?.toString()).toBe(EMAIL));
    expect(liveRegion()).toHaveTextContent('');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <p>
        Reach me: <CopyText text={EMAIL} />
      </p>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
