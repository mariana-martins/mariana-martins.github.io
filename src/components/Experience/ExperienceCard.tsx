import React from 'react';

import Tag from '@components/Tag';
import { ExternalLink } from 'lucide-react';

import { cn } from '@/lib/cn';
import { formatDate, formatDuration } from '@/lib/utils';
import type { Experience as ExperienceType } from '@/types';

/** Keeps the tag row to two lines in the narrow experience column. */
const MAX_VISIBLE_TECHNOLOGIES = 5;

export interface ExperienceCardProps {
  experience: ExperienceType;
}

export const ExperienceCard = ({
  experience,
}: ExperienceCardProps): React.JSX.Element => {
  const isCurrent = !experience.endDate;
  const dateRange = `${formatDate(experience.startDate)} - ${experience.endDate ? formatDate(experience.endDate) : 'Present'}`;
  const duration = formatDuration(experience.startDate, experience.endDate);

  const visibleTechnologies = experience.technologies.slice(
    0,
    MAX_VISIBLE_TECHNOLOGIES,
  );
  const hiddenTechnologies = experience.technologies.slice(
    MAX_VISIBLE_TECHNOLOGIES,
  );

  return (
    <li
      data-testid="experience-entry"
      data-current={isCurrent || undefined}
      className={cn(
        'scroll-reveal group',
        'pl-4 pt-5 first:pt-0 pb-5',
        // Accent bar marks the ongoing role; the others keep the same
        // indent with a transparent border.
        'border-l-2',
        isCurrent
          ? 'border-l-pink dark:border-l-blue-100'
          : 'border-l-transparent',
        // Hairline between entries, none after the last one
        'border-b border-b-pink/20 dark:border-b-blue-100/20',
        'last:border-b-0 last:pb-0',
      )}
    >
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        <span className="tabular-nums text-muted">{dateRange}</span>
        <span className="text-muted" aria-hidden="true">
          &middot;
        </span>
        <span className="tabular-nums text-muted">{duration}</span>
        {isCurrent && (
          <span
            aria-hidden="true"
            className={cn(
              'px-2 py-0.5 rounded-full text-[11px] font-medium',
              'bg-pink/25 dark:bg-blue-100/25',
              'text-text-primary dark:text-text-primary-dark',
            )}
          >
            Current
          </span>
        )}
      </p>

      <h4 className="mt-1 text-base font-bold leading-snug text-balance">
        {experience.position}
      </h4>

      <p className="mt-0.5 text-sm text-muted">
        {experience.website ? (
          <a
            href={experience.website}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-1',
              'hover:underline hover:text-pink dark:hover:text-blue-100',
              'focus:outline-none focus-visible:underline',
              'focus-visible:ring-2 focus-visible:ring-offset-2',
              'focus-visible:ring-pink dark:focus-visible:ring-blue-100',
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

      <p className="hidden md:block mt-2.5 text-sm/6 text-pretty text-text-primary/90 dark:text-text-primary-dark/90">
        {experience.description}
      </p>

      <ul
        aria-label="Technologies used"
        className="flex flex-wrap items-center gap-2 mt-3"
      >
        {visibleTechnologies.map((tech, techIndex) => (
          <li key={tech}>
            <Tag name={tech} index={techIndex} />
          </li>
        ))}
        {hiddenTechnologies.length > 0 && (
          <li
            className={cn(
              // Same 24px box as Tag, so the chip sits on the same baseline
              'inline-flex items-center h-6 px-2.5 rounded-md text-xs',
              'bg-pink/20 dark:bg-blue-100/20',
              'text-text-primary/70 dark:text-text-primary-dark/70',
            )}
          >
            <span aria-hidden="true">+{hiddenTechnologies.length}</span>
            {/* The overflow is only visual - keep the hidden names readable */}
            <span className="sr-only">{hiddenTechnologies.join(', ')}</span>
          </li>
        )}
      </ul>
    </li>
  );
};
