import React from 'react';

import { cn } from '@/lib/cn';
import {
  PICK_CATEGORY_LABELS,
  PICK_STATUS_LABELS,
  type PickCategoryFilter,
  type PickStatusFilter,
} from '@/lib/picks';
import type { PickCategory, PickStatus } from '@/types';

const STATUS_ORDER: PickStatus[] = ['in-progress', 'completed', 'planned'];

const chipClasses = cn(
  'px-3 py-1.5 min-h-[36px] rounded-full text-xs font-medium border-2 cursor-pointer',
  'border-pink/30 dark:border-blue-100/30',
  'bg-warm-100/50 dark:bg-indigo-50/30',
  'hover:border-pink/70 dark:hover:border-blue-100/70',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  'focus-visible:ring-pink dark:focus-visible:ring-blue-100',
  'transition-colors duration-200 touch-manipulation',
  'aria-pressed:bg-pink/40 aria-pressed:border-pink',
  'dark:aria-pressed:bg-blue-100/30 dark:aria-pressed:border-blue-100',
);

interface ChipGroupProps<T extends string> {
  legend: string;
  options: Array<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
}

function ChipGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
}: ChipGroupProps<T>): React.JSX.Element {
  return (
    <fieldset>
      <legend className="mb-1.5 text-xs font-medium text-text-primary/80 dark:text-text-primary-dark/80">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={option.value === value}
            onClick={() => onChange(option.value)}
            className={chipClasses}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export interface MargotsPicksFiltersProps {
  /** Only categories that actually have picks get a chip */
  categories: PickCategory[];
  category: PickCategoryFilter;
  status: PickStatusFilter;
  onCategoryChange: (category: PickCategoryFilter) => void;
  onStatusChange: (status: PickStatusFilter) => void;
}

export function MargotsPicksFilters({
  categories,
  category,
  status,
  onCategoryChange,
  onStatusChange,
}: MargotsPicksFiltersProps): React.JSX.Element {
  const categoryOptions: Array<{ value: PickCategoryFilter; label: string }> = [
    { value: 'all', label: 'All' },
    ...categories.map((value) => ({
      value,
      label: PICK_CATEGORY_LABELS[value],
    })),
  ];

  const statusOptions: Array<{ value: PickStatusFilter; label: string }> = [
    { value: 'all', label: 'All' },
    ...STATUS_ORDER.map((value) => ({
      value,
      label: PICK_STATUS_LABELS[value],
    })),
  ];

  return (
    <div className="flex flex-col gap-3">
      <ChipGroup
        legend="Type"
        options={categoryOptions}
        value={category}
        onChange={onCategoryChange}
      />
      <ChipGroup
        legend="Status"
        options={statusOptions}
        value={status}
        onChange={onStatusChange}
      />
    </div>
  );
}
