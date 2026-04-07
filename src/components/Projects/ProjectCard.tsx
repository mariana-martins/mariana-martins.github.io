import * as React from 'react';

import {
  Card,
  CardContent,
  CardDecoration,
  CardFooter,
  CardHeader,
} from '@components/Card';
import Tag from '@components/Tag';
import { ExternalLink, Sparkles } from 'lucide-react';

import { cn } from '@/lib/cn';
import type { Project } from '@/types';

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
  index: number;
  isFeatured: boolean;
  projectCount: number;
}

export function ProjectCard({
  project,
  index,
  isFeatured,
  projectCount,
}: ProjectCardProps): React.JSX.Element {
  const projectNumber = index + 1;
  const techStackSummary = project.technologies.join(', ');
  const decoration = projectDecorations[project.id] || {
    shape: 'blob' as const,
    color: 'violet' as const,
  };

  // Show more tags for featured card
  const visibleTechnologies = isFeatured
    ? project.technologies
    : project.technologies.slice(0, 3);
  const hiddenCount = project.technologies.length - visibleTechnologies.length;

  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${project.title} project on GitHub. Project ${projectNumber} of ${projectCount}. Built with ${techStackSummary}`}
      aria-describedby={isFeatured ? `project-${project.id}-desc` : undefined}
      className={cn(
        'block h-full',
        'transition-transform duration-150 ease-out',
        'hover:scale-[1.02] active:scale-[0.98]',
        'motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100',
      )}
    >
      <Card
        variant="interactive"
        size={isFeatured ? 'lg' : 'md'}
        className={cn(
          'h-full flex flex-col',
          isFeatured ? 'min-h-[280px]' : 'min-h-[120px]',
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
          <ExternalLink
            size={isFeatured ? 18 : 14}
            className="text-text-primary dark:text-text-primary-dark"
          />
        </div>

        <CardHeader className={cn('relative z-10', isFeatured && 'pt-10')}>
          <h4
            id={`project-${project.id}-title`}
            className={cn(
              'font-bold text-text-primary dark:text-text-primary-dark text-balance',
              isFeatured ? 'text-xl md:text-2xl' : 'text-base md:text-lg',
            )}
          >
            {project.title}
          </h4>
        </CardHeader>

        <CardContent className="relative z-10">
          {isFeatured && (
            <p
              id={`project-${project.id}-desc`}
              className="text-sm md:text-base/6 text-text-primary/80 dark:text-text-primary-dark/80 mt-2 text-pretty"
            >
              {project.description}
            </p>
          )}
        </CardContent>

        <CardFooter className="relative z-10 flex-wrap">
          {visibleTechnologies.map((technology: string, techIndex: number) => (
            <Tag key={technology} name={technology} index={techIndex} />
          ))}
          {hiddenCount > 0 && (
            <span
              className={cn(
                'text-xs px-2 py-0.5 rounded-md',
                'bg-pink/20 dark:bg-blue-100/20',
                'text-text-primary/70 dark:text-text-primary-dark/70',
              )}
            >
              +{hiddenCount}
            </span>
          )}
        </CardFooter>

        <span className="sr-only">Opens in a new window. External site.</span>
      </Card>
    </a>
  );
}
