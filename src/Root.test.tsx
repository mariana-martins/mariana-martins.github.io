import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { act } from '@testing-library/react';
import { hydrateRoot, type Root as ReactRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

import { Root } from '@/Root';

/**
 * The production page is prerendered at build time and hydrated in the
 * browser. Hydration only works if the first client render produces exactly
 * the server markup, so anything read from the browser during render
 * (storage, media queries, the URL hash, today's date) has to wait until
 * after hydration. These tests catch a component that forgets.
 */
describe('prerendered page', () => {
  let root: ReactRoot | undefined;

  afterEach(() => {
    act(() => root?.unmount());
    root = undefined;
    document.body.innerHTML = '';
    document.documentElement.className = '';
    window.localStorage.clear();
    window.history.replaceState(null, '', window.location.pathname);
  });

  function prerenderInto(): HTMLElement {
    const container = document.createElement('div');
    container.id = 'root';
    container.innerHTML = renderToString(<Root />);
    document.body.appendChild(container);
    return container;
  }

  /**
   * Returns every hydration problem React reported: thrown mismatches go to
   * onRecoverableError, attribute mismatches only to console.error - and an
   * attribute mismatch is never patched, so it would stay wrong on screen.
   */
  function hydrate(container: HTMLElement): jest.Mock {
    const problems = jest.fn();
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation((...args: unknown[]) => problems(...args));
    act(() => {
      root = hydrateRoot(container, <Root />, { onRecoverableError: problems });
    });
    consoleError.mockRestore();
    return problems;
  }

  it('renders the page content without a browser', () => {
    const html = renderToString(<Root />);

    expect(html).toContain('Mariana Martins Menezes');
    expect(html).toContain('Frontend Engineer');
    expect(html).toContain('Fit My Space');
  });

  it('hydrates without mismatches for a light-theme visitor', () => {
    const hydrationProblems = hydrate(prerenderInto());

    expect(hydrationProblems).not.toHaveBeenCalled();
  });

  it('hydrates without mismatches, then shows dark mode, for a dark-theme visitor', () => {
    const container = prerenderInto();
    window.localStorage.setItem('theme', 'dark');

    const hydrationProblems = hydrate(container);

    expect(hydrationProblems).not.toHaveBeenCalled();
    expect(container.querySelector('button[aria-pressed]')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('opens the drawer after hydrating when the link targets #shelf', () => {
    const container = prerenderInto();
    window.location.hash = '#shelf';

    const hydrationProblems = hydrate(container);

    expect(hydrationProblems).not.toHaveBeenCalled();
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
  });

  it('adds the ongoing role duration only once hydrated', () => {
    const container = prerenderInto();
    const currentRole = (): Element | null =>
      container.querySelector('[data-current="true"]');

    // Built at deploy time, the HTML cannot know how long the role has run
    expect(currentRole()?.textContent).not.toMatch(/\d+ (yr|mo)/);

    hydrate(container);

    expect(currentRole()?.textContent).toMatch(/\d+ (yr|mo)/);
  });
});
