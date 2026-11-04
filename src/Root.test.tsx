import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { act, screen } from '@testing-library/react';
import { hydrateRoot, type Root as ReactRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

import { Root } from '@/Root';

/** Fails if a component reads the browser during render and breaks hydration */
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

  // Attribute mismatches only reach console.error, and React never patches them
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

  it('opens the drawer after hydrating when the link targets #shelf', async () => {
    const container = prerenderInto();
    window.location.hash = '#shelf';

    const hydrationProblems = hydrate(container);

    expect(hydrationProblems).not.toHaveBeenCalled();
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('adds the ongoing role duration only once hydrated', () => {
    const container = prerenderInto();
    const currentRole = (): Element | null =>
      container.querySelector('[data-current="true"]');

    expect(currentRole()?.textContent).not.toMatch(/\d+ (yr|mo)/);

    hydrate(container);

    expect(currentRole()?.textContent).toMatch(/\d+ (yr|mo)/);
  });
});
