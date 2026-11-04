import { Header } from '@components/Header/Header';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('Header', () => {
  it('renders header element', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('renders the logo as a decorative image', () => {
    const { container } = render(<Header />);

    const logo = container.querySelector('img');
    expect(logo).toHaveAttribute('alt', '');
    expect(logo).toHaveAttribute('src');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders name heading', () => {
    render(<Header />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    const normalizedText = heading.textContent
      ?.replace(/\s+/g, ' ')
      .replace(/\s/g, '')
      .toLowerCase();
    const expectedText = 'Mariana Martins Menezes'
      .replace(/\s/g, '')
      .toLowerCase();
    expect(normalizedText).toContain(expectedText);
  });

  it('renders title subtitle', () => {
    render(<Header />);

    expect(screen.getByText('Frontend & Design Engineer')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Header />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('offers projects, the CV and email as calls to action', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: 'View projects' })).toHaveAttribute(
      'href',
      '#projects-heading',
    );
    const cv = screen.getByRole('link', { name: 'Download CV (PDF)' });
    expect(cv).toHaveAttribute('href', '/Mariana-Martins-Menezes-CV.pdf');
    expect(cv).toHaveAttribute('download');
    expect(screen.getByRole('link', { name: 'Email me' })).toHaveAttribute(
      'href',
      expect.stringMatching(/^mailto:/),
    );
  });

  it('states work rights and where the roles can be', () => {
    render(<Header />);

    expect(
      screen.getByText('NZ citizen with full Australian work rights'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Open to roles across Australia'),
    ).toBeInTheDocument();
  });
});
