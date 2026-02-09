import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { SECTIONS } from '@/constants';

import SectionNav from './SectionNav';

describe('SectionNav', () => {
  const mockScrollIntoView = jest.fn();
  const mockFocus = jest.fn();

  beforeEach(() => {
    // Mock scrollIntoView method
    HTMLElement.prototype.scrollIntoView = mockScrollIntoView;

    // Mock focus method
    Object.defineProperty(HTMLElement.prototype, 'focus', {
      value: mockFocus,
      writable: true,
      configurable: true,
    });

    // Create target elements for each section
    SECTIONS.forEach((section) => {
      const targetElement = document.createElement('h3');
      targetElement.id = section.id;
      targetElement.textContent = section.label;
      document.body.appendChild(targetElement);
    });

    mockScrollIntoView.mockClear();
    mockFocus.mockClear();
  });

  afterEach(() => {
    // Clean up target elements
    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        element.remove();
      }
    });
  });

  it('renders navigation with correct aria-label', () => {
    render(<SectionNav />);

    const nav = screen.getByRole('navigation', { name: 'Page sections' });
    expect(nav).toBeInTheDocument();
  });

  it('renders heading with correct text', () => {
    render(<SectionNav />);

    expect(screen.getByText('Jump to section:')).toBeInTheDocument();
  });

  it('renders all section links', () => {
    render(<SectionNav />);

    SECTIONS.forEach((section) => {
      const link = screen.getByRole('link', { name: section.label });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `#${section.id}`);
    });
  });

  it('handles click and navigates to target section', async () => {
    const user = userEvent.setup();
    render(<SectionNav />);

    const firstSectionLink = screen.getByRole('link', {
      name: SECTIONS[0].label,
    });
    await user.click(firstSectionLink);

    await waitFor(() => {
      expect(mockFocus).toHaveBeenCalled();
    });

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('handles Enter key press', async () => {
    render(<SectionNav />);

    const firstSectionLink = screen.getByRole('link', {
      name: SECTIONS[0].label,
    });

    fireEvent.keyDown(firstSectionLink, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockFocus).toHaveBeenCalled();
    });

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('handles Space key press', async () => {
    render(<SectionNav />);

    const firstSectionLink = screen.getByRole('link', {
      name: SECTIONS[0].label,
    });

    fireEvent.keyDown(firstSectionLink, { key: ' ', code: 'Space' });

    await waitFor(() => {
      expect(mockFocus).toHaveBeenCalled();
    });

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('does not navigate on other key presses', () => {
    render(<SectionNav />);

    const firstSectionLink = screen.getByRole('link', {
      name: SECTIONS[0].label,
    });

    mockFocus.mockClear();
    mockScrollIntoView.mockClear();

    fireEvent.keyDown(firstSectionLink, { key: 'Tab', code: 'Tab' });

    expect(mockFocus).not.toHaveBeenCalled();
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it('sets tabIndex on target element if not already set', async () => {
    const user = userEvent.setup();
    render(<SectionNav />);

    const targetElement = document.getElementById(SECTIONS[0].id);
    expect(targetElement).not.toHaveAttribute('tabindex');

    const firstSectionLink = screen.getByRole('link', {
      name: SECTIONS[0].label,
    });
    await user.click(firstSectionLink);

    expect(targetElement).toHaveAttribute('tabindex', '-1');
  });

  it('has sr-only class by default', () => {
    render(<SectionNav />);

    const nav = screen.getByRole('navigation', { name: 'Page sections' });
    expect(nav).toHaveClass('sr-only');
  });

  it('renders list with correct role', () => {
    render(<SectionNav />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<SectionNav />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
