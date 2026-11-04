import * as React from 'react';

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
  const hasCaseStudy = project.caseStudyPath !== undefined;
  const CornerIcon = hasCaseStudy ? ArrowRight : ExternalLink;

  return (
    <Card
      variant="interactive"
      size={isFeatured ? 'lg' : 'md'}
      className={cn(
        'group h-full flex flex-col',
        isFeatured ? 'min-h-[280px]' : 'min-h-[120px]',
        'transition-transform duration-150 ease-out',
        // The title link covers the card, so its states drive the card's
        'has-[[data-card-link]:hover]:scale-[1.02] has-[[data-card-link]:active]:scale-[0.98]',
        'has-[[data-card-link]:focus-visible]:ring-4 has-[[data-card-link]:focus-visible]:ring-offset-2',
        'has-[[data-card-link]:focus-visible]:ring-focus',
        'motion-reduce:transition-none',
        'motion-reduce:has-[[data-card-link]:hover]:scale-100 motion-reduce:has-[[data-card-link]:active]:scale-100',
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

      <div
        className={cn(
          'absolute z-10 p-2 rounded-full',
          'bg-pink/20 dark:bg-blue-100/20',
          'opacity-60 hover:opacity-100',
          'transition-opacity duration-300',
          isFeatured ? 'bottom-4 right-4' : 'top-3 right-3',
        )}
        aria-hidden="true"
      >
        <CornerIcon
          size={isFeatured ? 18 : 14}
          className="text-text-primary dark:text-text-primary-dark"
        />
      </div>

      {/*
        Not `relative`, so the link overlay covers the whole Card. Right
        padding keeps the title off the corner decoration (contrast).
      */}
      <CardHeader className={cn('z-20 pr-20 md:pr-28', isFeatured && 'pt-10')}>
        <h3
          id={`project-${project.id}-title`}
          className={cn(
            'font-bold text-text-primary dark:text-text-primary-dark text-balance',
            isFeatured ? 'text-xl md:text-2xl' : 'text-base md:text-lg',
          )}
        >
          <a
            data-card-link
            href={project.caseStudyPath ?? project.githubUrl}
            target={hasCaseStudy ? undefined : '_blank'}
            rel={hasCaseStudy ? undefined : 'noopener noreferrer'}
            className={cn(
              "after:content-[''] after:absolute after:inset-0 after:z-20",
              'focus:outline-none',
            )}
          >
            {project.title}
            <span className="sr-only">
              {hasCaseStudy ? ', case study' : ' (opens in a new tab)'}
            </span>
          </a>
        </h3>
      </CardHeader>

      <CardContent className="relative z-10">
        {isFeatured && (
          <p className="text-sm md:text-base/6 text-text-primary/80 dark:text-text-primary-dark/80 mt-2 text-pretty">
            {project.description}
          </p>
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

      {hasCaseStudy && project.githubUrl && (
        // Above the title link's overlay, so it stays clickable
        <div className="relative z-30 pt-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-1.5 min-h-[44px] text-sm font-medium',
              'underline underline-offset-4 decoration-1 hover:decoration-2',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-focus rounded-sm',
            )}
          >
            Code on GitHub
            <ExternalLink size={14} aria-hidden="true" />
            <span className="sr-only">
              {' '}
              for {project.title} (opens in a new tab)
            </span>
          </a>
        </div>
      )}
    </Card>
  );
}
