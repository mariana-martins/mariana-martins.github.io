import React from 'react';

import { TagList } from '@components/TagList/TagList';
import { ExternalLink } from 'lucide-react';

import { useHasHydrated } from '@/hooks/useHasHydrated';
import { cn } from '@/lib/cn';
import { formatDate, formatDuration } from '@/lib/utils';
import type { Experience as ExperienceType } from '@/types';

const MAX_VISIBLE_TECHNOLOGIES = 3;

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
        'scroll-reveal relative pl-6 pb-9 last:pb-0',
        'border-l-2 border-dashed border-accent last:border-transparent',
      )}
    >
      <p className="relative flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        <span
          aria-hidden="true"
          className={cn(
            'absolute -left-[31px] top-1/2 -translate-y-1/2 size-3 rounded-full',
            'border-2 border-pink dark:border-blue-100',
            isCurrent
              ? 'bg-pink dark:bg-blue-100'
              : 'bg-warm-50 dark:bg-indigo-200',
          )}
        />
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
                'focus-ring focus-visible:underline',
                'focus-visible:decoration-pink dark:focus-visible:decoration-blue-100',
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
