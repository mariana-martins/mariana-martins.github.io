import React from 'react';

import { Tag } from '@components/Tag/Tag';

import { cn } from '@/lib/cn';

export interface TagListProps {
  /** In priority order */
  technologies: string[];
  label: string;
  /** The rest collapse into a "+N" chip; omit to show all */
  max?: number;
  className?: string;
}

/** Hidden tags stay readable by screen readers behind the "+N" chip */
export function TagList({
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
            'inline-flex items-center h-6 px-2.5 rounded-md text-xs',
            // Stronger blue in dark drops the text below 4.5:1
            'bg-pink/20 dark:bg-blue-100/10',
            'text-body',
          )}
        >
          <span aria-hidden="true">+{hidden.length}</span>
          <span className="sr-only">{hidden.join(', ')}</span>
        </li>
      )}
    </ul>
  );
}
