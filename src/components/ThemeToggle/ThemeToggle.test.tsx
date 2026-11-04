import { ThemeToggle } from '@components/ThemeToggle/ThemeToggle';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { ThemeProvider } from '@/contexts/ThemeContext';

describe('ThemeToggle', () => {
  it('renders theme toggle button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('names the setting, not the action, so aria-pressed reads correctly', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    expect(screen.getByRole('button', { name: 'Dark mode' })).toHaveAttribute(
      'aria-pressed',
    );
  });

  it('toggles theme when clicked', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    const button = screen.getByRole('button');
    const initialAriaPressed = button.getAttribute('aria-pressed');

    await user.click(button);

    const newAriaPressed = button.getAttribute('aria-pressed');
    expect(newAriaPressed).not.toBe(initialAriaPressed);
  });

  it('shows correct icon for light theme', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'light'),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('shows correct icon for dark theme', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'dark'),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
