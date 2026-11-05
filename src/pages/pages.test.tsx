import { describe, expect, it } from '@jest/globals';
import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ThemeProvider } from '@/contexts/ThemeContext';

import FitMySpacePage from './FitMySpacePage';
import SiteBuildPage from './SiteBuildPage';

const pages = [
  { name: 'Fit My Space case study', Page: FitMySpacePage, h1: 'Fit My Space' },
  {
    name: 'How this site was built',
    Page: SiteBuildPage,
    h1: 'How this site was built',
  },
];

describe.each(pages)('$name', ({ Page, h1 }) => {
  function renderPage(): ReturnType<typeof render> {
    return render(
      <ThemeProvider>
        <Page />
      </ThemeProvider>,
    );
  }

  it('has one h1 and section headings below it', () => {
    renderPage();

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(h1);
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThan(
      2,
    );
  });

  it('has banner, main and footer landmarks, and a way home', () => {
    renderPage();

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    const banner = screen.getByRole('banner');
    expect(
      within(banner).getByRole('link', {
        name: /Mariana Martins Menezes\s*, home/,
      }),
    ).toHaveAttribute('href', '/');
    expect(
      screen.getByRole('link', { name: 'Skip to content' }),
    ).toHaveAttribute('href', '#main-content');
  });

  it('shows where the page sits with a breadcrumb', () => {
    renderPage();

    const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' });
    const items = within(breadcrumb).getAllByRole('listitem');
    expect(
      within(items[0]).getByRole('link', { name: 'Home' }),
    ).toHaveAttribute('href', '/');
    const current = items[items.length - 1];
    expect(within(current).queryByRole('link')).toBeNull();
    expect(within(current).getByText(h1)).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('says when a link opens a new tab', () => {
    renderPage();

    for (const link of screen.getAllByRole('link')) {
      if (link.getAttribute('target') === '_blank') {
        expect(link).toHaveAccessibleName(/opens in a new tab/);
      }
    }
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderPage();
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('Fit My Space case study', () => {
  it('walks a token through all three tiers in order', () => {
    render(
      <ThemeProvider>
        <FitMySpacePage />
      </ThemeProvider>,
    );

    const figure = screen.getByText(/How one colour reaches/).closest('figure');
    expect(figure).not.toBeNull();
    const steps = within(figure as HTMLElement)
      .getAllByRole('listitem')
      .map((item) => item.textContent);
    expect(steps).toHaveLength(4);
    expect(steps[0]).toContain('color.sage.700');
    expect(steps[0]).toContain('#335f3f');
    expect(steps[2]).toContain(
      'component.button.primary.fill.background.default',
    );
  });
});
