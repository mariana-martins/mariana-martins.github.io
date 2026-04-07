import React from 'react';

import * as Accordion from '@radix-ui/react-accordion';
import { Card } from '@components/Card';
import Tag from '@components/Tag';
import { ChevronDown, ExternalLink, Star } from 'lucide-react';

import { cn } from '@/lib/cn';
import { formatDate } from '@/lib/utils';
import type { Experience as ExperienceType } from '@/types';

function TimelineNode(): React.JSX.Element {
  return (
    <div
      className={cn(
        'absolute left-0 top-8 w-8 h-8 rounded-full z-10',
        'flex items-center justify-center',
        'bg-pink dark:bg-blue-100',
        'ring-4 ring-warm-100/80 dark:ring-indigo-50/80',
        'transition-[color,background-color,ring-color,transform] duration-300 ease-out',
        'group-hover:ring-pink/50 dark:group-hover:ring-blue-100/50',
        'group-hover:scale-110',
      )}
    >
      <Star size={16} className="text-text-primary" aria-hidden="true" />
    </div>
  );
}

export interface ExperienceCardProps {
  experience: ExperienceType;
}

export const ExperienceCard = ({
  experience,
}: ExperienceCardProps): React.JSX.Element => {
  const dateRange = `${formatDate(experience.startDate)} - ${experience.endDate ? formatDate(experience.endDate) : 'Present'}`;

  return (
    <div className="relative pl-12 group">
      <TimelineNode />

      <Card
        asChild
        variant="interactive"
        className={cn(
          'p-0',
          'data-[state=open]:border-pink/70 dark:data-[state=open]:border-blue-100/70',
          'focus-within:ring-4 focus-within:ring-offset-2',
          'focus-within:ring-pink dark:focus-within:ring-blue-100',
        )}
      >
        <Accordion.Item value={experience.id}>
          <Accordion.Header asChild>
            <h4>
              <Accordion.Trigger
                className={cn(
                  'w-full p-4 md:p-5 text-left',
                  'flex flex-col gap-1',
                  'cursor-pointer',
                  'focus:outline-none',
                  'group/trigger',
                  'min-h-[48px]',
                )}
                aria-label={`${experience.position} at ${experience.company}, ${dateRange}. Click to ${experience.id === 'expanded' ? 'collapse' : 'expand'} details.`}
              >
                <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between md:gap-2 w-full">
                  <div className="flex-1 min-w-0">
                    <span className="text-base md:text-lg font-bold block leading-snug text-balance">
                      {experience.position}
                    </span>
                    <span className="text-sm md:text-base">
                      {experience.company}
                    </span>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-2 mt-1 md:mt-0">
                    <span className="text-xs md:text-sm text-text-primary/70 dark:text-text-primary-dark/70">
                      {dateRange}
                    </span>
                    <ChevronDown
                      size={20}
                      className={cn(
                        'shrink-0 transition-transform duration-300',
                        'group-data-[state=open]/trigger:rotate-180',
                      )}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Accordion.Trigger>
            </h4>
          </Accordion.Header>

          <Accordion.Content
            className={cn(
              'overflow-hidden',
              'data-[state=open]:animate-accordion-down',
              'data-[state=closed]:animate-accordion-up',
            )}
          >
            <div className="px-3 md:px-4 pb-3 md:pb-4">
              {experience.website && (
                <a
                  href={experience.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center gap-1 mb-3 text-sm',
                    'icon-accent',
                    'hover:underline',
                    'focus:outline-none focus-visible:underline focus-visible:ring-2 focus-visible:ring-offset-2',
                    'focus-visible:ring-pink dark:focus-visible:ring-blue-100',
                    'transition-colors',
                  )}
                  aria-label={`Visit ${experience.company} website (opens in new tab)`}
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  Visit company website
                </a>
              )}

              <ul className="hidden md:block text-sm/6 mb-4 list-disc list-inside space-y-2">
                {experience.description.map((paragraph) => (
                  <li
                    key={`${experience.id}-${paragraph.substring(0, 30)}`}
                    className="text-text-primary/90 dark:text-text-primary-dark/90"
                  >
                    {paragraph}
                  </li>
                ))}
              </ul>

              <div
                className="flex flex-wrap gap-2"
                role="list"
                aria-label="Technologies used"
              >
                {experience.technologies.map((tech, techIndex) => (
                  <span key={tech} role="listitem">
                    <Tag name={tech} index={techIndex} />
                  </span>
                ))}
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Card>
    </div>
  );
};
