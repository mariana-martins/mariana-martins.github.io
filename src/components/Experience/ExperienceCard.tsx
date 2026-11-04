import React from 'react';

import { TagList } from '@components/TagList/TagList';
import { ExternalLink } from 'lucide-react';

import { useHasHydrated } from '@/hooks/useHasHydrated';
import { cn } from '@/lib/cn';
import { formatDate, formatDuration } from '@/lib/utils';
import type { Experience as ExperienceType } from '@/types';

/** Two lines of tags in the narrow column */
const MAX_VISIBLE_TECHNOLOGIES = 5;

export interface ExperienceCardProps {
  experience: ExperienceType;
}

export const ExperienceCard = ({
  experience,
}: ExperienceCardProps): React.JSX.Element => {
  const isCurrent = !experience.endDate;
  const dateRange = `${formatDate(experience.startDate)} - ${experience.endDate ? formatDate(experience.endDate) : 'Present'}`;
  const hasHydrated = useHasHydrated();
  // Depends on today's date, so the prerendered HTML cannot include it
  const duration =
    isCurrent && !hasHydrated
      ? null
      : formatDuration(experience.startDate, experience.endDate);

  return (
    <li
      data-testid="experience-entry"
      data-current={isCurrent || undefined}
      className={cn(
        'scroll-reveal group',
        'pl-4 pt-5 first:pt-0 pb-5',
        'border-l-2',
        isCurrent
          ? 'border-l-pink dark:border-l-blue-100'
          : 'border-l-transparent',
        'border-b border-b-pink/20 dark:border-b-blue-100/20',
        'last:border-b-0 last:pb-0',
      )}
    >
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        <span className="tabular-nums text-muted">{dateRange}</span>
        {duration !== null && (
          <>
            <span className="text-muted" aria-hidden="true">
              &middot;
            </span>
            <span className="tabular-nums text-muted">{duration}</span>
          </>
        )}
        {isCurrent && (
          <span
            aria-hidden="true"
            className={cn(
              'px-2 py-0.5 rounded-full text-[11px] font-medium',
              'bg-pink/25 text-text-primary',
              'dark:bg-blue-100 dark:text-blue-300',
            )}
          >
            Current
          </span>
        )}
      </p>

      <h3 className="mt-1 text-base font-bold leading-snug text-balance">
        {experience.position}
      </h3>

      {experience.company && (
        <p className="mt-0.5 text-sm text-muted">
          {experience.website ? (
            <a
              href={experience.website}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-1',
                'hover:underline hover:decoration-pink decoration-2',
                'dark:hover:text-blue-100 dark:hover:decoration-blue-100',
                'focus:outline-none focus-visible:underline',
                'focus-visible:decoration-pink dark:focus-visible:decoration-blue-100',
                'focus-visible:ring-2 focus-visible:ring-offset-2',
                'focus-visible:ring-focus',
                'transition-colors',
              )}
            >
              {experience.company}
              <ExternalLink size={13} aria-hidden="true" className="shrink-0" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            experience.company
          )}
        </p>
      )}

      <p className="mt-2.5 text-sm/6 text-pretty text-text-primary/90 dark:text-text-primary-dark/90">
        {experience.description}
      </p>

      <TagList
        technologies={experience.technologies}
        label="Technologies used"
        max={MAX_VISIBLE_TECHNOLOGIES}
        className="mt-3"
      />
    </li>
  );
};
