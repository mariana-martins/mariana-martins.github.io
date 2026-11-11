import { ProjectCard } from '@components/Projects/ProjectCard';
import { Projects } from '@components/Projects/Projects';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

jest.mock('@/data', () => {
  const { mockPortfolioData } = require('@/__mocks__/mockData');
  return {
    data: mockPortfolioData,
  };
});

describe('Projects', () => {
  it('renders section heading', () => {
    render(<Projects />);

    expect(screen.getByText('Crafted with Care')).toBeInTheDocument();
  });

  it('renders all projects', () => {
    render(<Projects />);

    expect(screen.getByText('Contact App')).toBeInTheDocument();
    expect(screen.getByText('Husky Rescue Org. Website')).toBeInTheDocument();
  });

  it('renders featured project description', () => {
    render(<Projects />);

    expect(
      screen.getByText('A single-page contact list application.'),
    ).toBeInTheDocument();
  });

  it('renders project links with correct hrefs', () => {
    render(<Projects />);

    expect(
      screen.getByRole('link', { name: /^Code on GitHub for Contact App/ }),
    ).toHaveAttribute('href', 'https://github.com/mariana-martins/contact-app');
    expect(
      screen.getByRole('link', {
        name: /^Code on GitHub for Husky Rescue Org\. Website/,
      }),
    ).toHaveAttribute(
      'href',
      'https://github.com/mariana-martins/husky-rescue',
    );
  });

  it('renders project links with target and rel attributes', () => {
    render(<Projects />);

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      if (link.getAttribute('href')?.startsWith('https://github.com')) {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
    });
  });

  it('starts each link name with its visible label, then the project', () => {
    render(<Projects />);

    expect(
      screen.getByRole('link', {
        name: 'Code on GitHub for Contact App (opens in a new tab)',
      }),
    ).toBeInTheDocument();
  });

  it('leaves the title as a heading, not a link', () => {
    render(<Projects />);

    expect(
      screen.getByRole('heading', { level: 3, name: 'Contact App' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /^Contact App/ }),
    ).not.toBeInTheDocument();
  });

  it('renders technologies/Tags for each project', () => {
    render(<Projects />);

    const reactTags = screen.getAllByText('React');
    expect(reactTags.length).toBeGreaterThan(0);
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Bootstrap 4')).toBeInTheDocument();
    expect(screen.getByText('Sass')).toBeInTheDocument();
  });

  it('has correct aria-labelledby attribute', () => {
    render(<Projects />);

    const section = screen.getByRole('region', { name: 'Crafted with Care' });
    expect(section).toHaveAttribute('aria-labelledby', 'projects-heading');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Projects />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('says "Read the case study" when a project has one, with Storybook and code as extra links', () => {
    render(
      <ProjectCard
        project={{
          id: 'case',
          title: 'Case Project',
          description: 'A project with a write-up.',
          technologies: ['React'],
          githubUrl: 'https://github.com/example/case',
          storybookUrl: 'https://example.github.io/case/',
          caseStudyPath: '/projects/case/',
        }}
        isFeatured
      />,
    );

    const cta = screen.getByRole('link', {
      name: 'Read the case study of Case Project',
    });
    expect(cta).toHaveAttribute('href', '/projects/case/');
    expect(cta).not.toHaveAttribute('target');
    expect(
      screen.getByRole('link', {
        name: 'Live Storybook for Case Project (opens in a new tab)',
      }),
    ).toHaveAttribute('href', 'https://example.github.io/case/');
    expect(
      screen.getByRole('link', {
        name: 'Code on GitHub for Case Project (opens in a new tab)',
      }),
    ).toHaveAttribute('href', 'https://github.com/example/case');
  });

  it('leaves out the Storybook link when a project has none', () => {
    render(
      <ProjectCard
        project={{
          id: 'case',
          title: 'Case Project',
          description: 'A project with a write-up.',
          technologies: ['React'],
          githubUrl: 'https://github.com/example/case',
          caseStudyPath: '/projects/case/',
        }}
        isFeatured
      />,
    );

    expect(
      screen.queryByRole('link', { name: /Live Storybook/ }),
    ).not.toBeInTheDocument();
  });

  it('links to how this site was built', () => {
    render(<Projects />);

    expect(
      screen.getByRole('link', { name: 'how it was built' }),
    ).toHaveAttribute('href', '/how-this-site-was-built/');
  });

  it('shows the one-line summary, not the full description, on smaller cards', () => {
    render(
      <ProjectCard
        project={{
          id: 'small',
          title: 'Small Project',
          description: 'The long description.',
          summary: 'The one-line summary.',
          technologies: ['React'],
          githubUrl: 'https://github.com/example/small',
        }}
        isFeatured={false}
      />,
    );

    expect(screen.getByText('The one-line summary.')).toBeInTheDocument();
    expect(screen.queryByText('The long description.')).not.toBeInTheDocument();
  });
});
