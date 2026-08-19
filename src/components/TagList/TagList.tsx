import React from 'react';

import Tag from '@components/Tag';

import { cn } from '@/lib/cn';

export interface TagListProps {
  /** Tags to render, in priority order */
  technologies: string[];
  /** Accessible name for the list */
  label: string;
  /**
   * Maximum number of tags to render before the rest collapse into a "+N"
   * chip. Omit to render every tag.
   */
  max?: number;
  className?: string;
}

/**
 * Renders a wrapping row of technology tags, optionally truncated.
 *
 * The "+N" chip is presentational only: the names it stands for are still
 * exposed to assistive technology, so truncation never costs information.
 */
function TagList({
  technologies,
  label,
  max,
  className,
}: TagListProps): React.JSX.Element | null {
  if (technologies.length === 0) {
    return null;
  }

  const visible = max === undefined ? technologies : technologies.slice(0, max);
  const hidden = max === undefined ? [] : technologies.slice(max);

  return (
    <ul
      aria-label={label}
      className={cn('flex flex-wrap items-center gap-2', className)}
    >
      {visible.map((technology, index) => (
        <li key={technology}>
          <Tag name={technology} index={index} />
        </li>
      ))}

      {hidden.length > 0 && (
        <li
          className={cn(
            // Same 24px box as Tag, so the chip sits on the same baseline
            'inline-flex items-center h-6 px-2.5 rounded-md text-xs',
            'bg-pink/20 dark:bg-blue-100/20',
            'text-text-primary/70 dark:text-text-primary-dark/70',
          )}
        >
          <span aria-hidden="true">+{hidden.length}</span>
          <span className="sr-only">{hidden.join(', ')}</span>
        </li>
      )}
    </ul>
  );
}

export default TagList;
