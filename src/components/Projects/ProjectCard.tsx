import * as React from 'react';

import { ButtonLink } from '@components/ButtonLink/ButtonLink';
import {
  Card,
  CardContent,
  CardDecoration,
  CardFooter,
  CardHeader,
} from '@components/Card/Card';
import { TagList } from '@components/TagList/TagList';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

import { cn } from '@/lib/cn';
import type { Project } from '@/types';

/** One line of tags on the smaller cards */
const MAX_VISIBLE_TECHNOLOGIES = 3;

const projectDecorations: Record<
  string,
  {
    shape: 'blob' | 'wave' | 'diagonal';
    color: 'violet' | 'blue' | 'green';
  }
> = {
  'fit-my-space': { shape: 'blob', color: 'violet' },
  'frontend-practice-abstract': { shape: 'wave', color: 'blue' },
  'contact-app': { shape: 'diagonal', color: 'green' },
};

interface ExternalCardLinkProps {
  href: string;
  label: string;
  projectTitle: string;
}

function ExternalCardLink({
  href,
  label,
  projectTitle,
}: ExternalCardLinkProps): React.JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-1.5 min-h-[44px] text-sm font-medium text-body',
        'link-underline focus-ring rounded-sm',
      )}
    >
      {label}
      <ExternalLink size={14} aria-hidden="true" />
      <span className="sr-only"> for {projectTitle} (opens in a new tab)</span>
    </a>
  );
}

export interface ProjectCardProps {
  project: Project;
  isFeatured: boolean;
}

export function ProjectCard({
  project,
  isFeatured,
}: ProjectCardProps): React.JSX.Element {
  const decoration = projectDecorations[project.id] || {
    shape: 'blob' as const,
    color: 'violet' as const,
  };
  const { caseStudyPath } = project;

  return (
    <Card
      variant="interactive"
      size={isFeatured ? 'lg' : 'md'}
      className={cn(
        'h-full flex flex-col',
        isFeatured ? 'min-h-[280px]' : 'min-h-[120px]',
        'transition-transform duration-150 ease-out',
        'motion-safe:hover:scale-[1.02]',
      )}
    >
      <CardDecoration
        shape={decoration.shape}
        color={decoration.color}
        position="top-right"
      />

      {isFeatured && (
        <div
          className={cn(
            'absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full',
            'bg-pink/80 dark:bg-blue-100/80 backdrop-blur-sm',
            'text-xs font-medium text-text-primary',
          )}
        >
          <Sparkles size={12} aria-hidden="true" />
          <span>Featured</span>
        </div>
      )}

      <CardHeader
        className={cn('relative z-10 pr-20 md:pr-28', isFeatured && 'pt-10')}
      >
        <h3
          id={`project-${project.id}-title`}
          className={cn(
            'font-bold text-body text-balance',
            isFeatured ? 'text-xl md:text-2xl' : 'text-base md:text-lg',
          )}
        >
          {project.title}
        </h3>
      </CardHeader>

      <CardContent className="relative z-10">
        {isFeatured ? (
          <p className="text-sm md:text-base/6 text-text-primary/85 dark:text-text-primary-dark/85 mt-2 text-pretty">
            {project.description}
          </p>
        ) : (
          project.summary && (
            <p className="mt-2 pr-20 md:pr-28 text-sm/6 text-text-primary/85 dark:text-text-primary-dark/85 text-pretty">
              {project.summary}
            </p>
          )
        )}
      </CardContent>

      <CardFooter className="relative z-10">
        <TagList
          technologies={project.technologies}
          label={`Technologies used in ${project.title}`}
          max={isFeatured ? undefined : MAX_VISIBLE_TECHNOLOGIES}
          className="w-full"
        />
      </CardFooter>

      <div className="relative z-10 flex flex-col items-start gap-1 pt-4 mt-auto">
        {caseStudyPath !== undefined && (
          <ButtonLink href={caseStudyPath} className="group/cta">
            Read the case study
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-200 ease-out motion-safe:group-hover/cta:translate-x-1"
            />
            <span className="sr-only"> of {project.title}</span>
          </ButtonLink>
        )}
        <div className="flex flex-wrap gap-x-4">
          {project.storybookUrl && (
            <ExternalCardLink
              href={project.storybookUrl}
              label="Live Storybook"
              projectTitle={project.title}
            />
          )}
          {project.githubUrl && (
            <ExternalCardLink
              href={project.githubUrl}
              label="Code on GitHub"
              projectTitle={project.title}
            />
          )}
        </div>
      </div>
    </Card>
  );
}
