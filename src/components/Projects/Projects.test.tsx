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

    const contactAppLink = screen.getByRole('link', {
      name: /^Contact App/i,
    });
    expect(contactAppLink).toHaveAttribute(
      'href',
      'https://github.com/mariana-martins/contact-app',
    );

    const huskyRescueLink = screen.getByRole('link', {
      name: /^Husky Rescue Org\. Website/i,
    });
    expect(huskyRescueLink).toHaveAttribute(
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

  it('names each project link after its title', () => {
    render(<Projects />);

    expect(
      screen.getByRole('link', { name: /^Contact App/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: /^Husky Rescue Org\. Website/i,
      }),
    ).toBeInTheDocument();
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

  it('opens the case study when a project has one, with the code as a second link', () => {
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

    const title = screen.getByRole('link', {
      name: /^Case Project\s*, case study$/,
    });
    expect(title).toHaveAttribute('href', '/projects/case/');
    expect(title).not.toHaveAttribute('target');
    expect(
      screen.getByRole('link', { name: /Code on GitHub for Case Project/ }),
    ).toHaveAttribute('href', 'https://github.com/example/case');
  });

  it('links to how this site was built', () => {
    render(<Projects />);

    expect(
      screen.getByRole('link', { name: 'how it was built' }),
    ).toHaveAttribute('href', '/how-this-site-was-built/');
  });
});
