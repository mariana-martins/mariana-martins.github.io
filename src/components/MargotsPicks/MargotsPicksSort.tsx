import React from 'react';

import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { ArrowUpDown } from 'lucide-react';

import { cn } from '@/lib/cn';
import { PICK_SORT_LABELS, type PickSort } from '@/lib/picks';

const SORT_ORDER: PickSort[] = ['recent', 'rating', 'alpha'];

export interface MargotsPicksSortProps {
  sort: PickSort;
  onSortChange: (sort: PickSort) => void;
}

/**
 * Deliberately not a chip row: filters narrow the list, this reorders it, so
 * it gets a different shape (segmented) and Radix handles the roving focus
 * and arrow-key semantics.
 */
export function MargotsPicksSort({
  sort,
  onSortChange,
}: MargotsPicksSortProps): React.JSX.Element {
  return (
    <div className="inline-flex items-center gap-2">
      <ArrowUpDown
        size={16}
        aria-hidden="true"
        className="shrink-0 text-text-primary/70 dark:text-text-primary-dark/70"
      />
      <ToggleGroup.Root
        type="single"
        value={sort}
        onValueChange={(next: PickSort | '') => {
          // Clicking the active segment reports "" (deselect); keep a sort always on
          if (next) {
            onSortChange(next);
          }
        }}
        aria-label="Sort by"
        className={cn(
          'inline-flex rounded-lg border-2 overflow-hidden',
          'border-pink/30 dark:border-blue-100/30',
          'bg-warm-100/50 dark:bg-indigo-50/30',
        )}
      >
        {SORT_ORDER.map((value) => (
          <ToggleGroup.Item
            key={value}
            value={value}
            className={cn(
              'px-2.5 min-h-[30px] text-xs font-medium cursor-pointer',
              'border-l-2 first:border-l-0 border-pink/30 dark:border-blue-100/30',
              'hover:bg-warm-100 dark:hover:bg-indigo-50/60',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset',
              'focus-visible:ring-pink dark:focus-visible:ring-blue-100',
              'transition-colors duration-200 touch-manipulation',
              'data-[state=on]:bg-pink/40 dark:data-[state=on]:bg-blue-100/30',
            )}
          >
            {PICK_SORT_LABELS[value]}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
}
