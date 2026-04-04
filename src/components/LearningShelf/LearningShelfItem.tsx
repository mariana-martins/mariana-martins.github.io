import React from 'react';

import { Card } from '@components/Card';
import { BookOpen, Video } from 'lucide-react';

import { cn } from '@/lib/cn';
import type { LearningItem } from '@/types';

interface StatusConfig {
  label: string;
  colors: string;
}

const statusConfig: Record<LearningItem['status'], StatusConfig> = {
  planned: {
    label: 'Planned',
    colors:
      'bg-blue-50 text-primary dark:bg-blue-200/40 dark:text-primary-dark border-blue-100 dark:border-blue-100/50',
  },
  'in-progress': {
    label: 'In Progress',
    colors:
      'bg-warm-300 text-primary dark:bg-warm-300/20 dark:text-primary-dark border-warm-400 dark:border-warm-300/30',
  },
  completed: {
    label: 'Completed',
    colors:
      'bg-green/40 text-text-primary dark:bg-green/20 dark:text-green border-green dark:border-green/30',
  },
};

const categoryLabels: Record<LearningItem['category'], string> = {
  book: 'Book',
  course: 'Course',
};

const categoryIcon: Record<LearningItem['category'], React.ReactNode> = {
  book: <BookOpen size={16} aria-hidden="true" />,
  course: <Video size={16} aria-hidden="true" />,
};

const categoryColors: Record<LearningItem['category'], string> = {
  book: 'bg-warm-200 dark:bg-warm-200/50',
  course: 'bg-purple dark:bg-purple/50',
};

interface LearningShelfItemProps {
  item: LearningItem;
}

function LearningItemCategory({
  category,
}: {
  category: LearningItem['category'];
}): React.JSX.Element {
  return (
    <div
      className={cn(
        'p-2 rounded-full shrink-0 text-text-primary dark:text-text-primary-dark',
        categoryColors[category],
      )}
    >
      <span className="sr-only">{categoryLabels[category]}</span>
      {categoryIcon[category]}
    </div>
  );
}

function LearningItemAuthor({ author }: { author: string }): React.JSX.Element {
  return (
    <p className="text-sm text-text-primary/70 dark:text-text-primary-dark/70">
      {author}
    </p>
  );
}

function LearningItemStatus({
  status,
}: {
  status: LearningItem['status'];
}): React.JSX.Element {
  return (
    <span
      className={cn(
        'px-2.5 py-0.5 rounded-full text-xs font-medium border-2',
        statusConfig[status].colors,
      )}
      aria-label={`Status: ${statusConfig[status].label}`}
    >
      {statusConfig[status].label}
    </span>
  );
}

function LearningItemTitle({
  item,
}: {
  item: LearningItem;
}): React.JSX.Element {
  return (
    <h4 className="font-medium text-base text-balance leading-snug">
      {item.link ? (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'underline decoration-transparent hover:decoration-current',
            'focus:decoration-current focus:outline-none',
            'focus-visible:ring-2 focus-visible:ring-offset-2',
            'focus-visible:ring-pink dark:focus-visible:ring-blue-100',
            'hover:text-pink dark:hover:text-blue-100',
            'transition-all duration-200',
            'decoration-2 underline-offset-2',
          )}
        >
          {item.title}
          <span className="sr-only">
            {' '}
            (opens in new tab, {categoryLabels[item.category]} by {item.author})
          </span>
        </a>
      ) : (
        item.title
      )}
    </h4>
  );
}

export function LearningShelfItem({
  item,
}: LearningShelfItemProps): React.JSX.Element {
  return (
    <li role="listitem">
      <Card
        variant="default"
        size="sm"
        className="flex flex-col items-center sm:flex-row sm:items-center gap-3"
      >
        <LearningItemCategory category={item.category} />

        <div className="flex-1 flex flex-col gap-1 min-w-0 text-center sm:text-left">
          <LearningItemTitle item={item} />
          <LearningItemAuthor author={item.author} />
        </div>

        <LearningItemStatus status={item.status} />
      </Card>
    </li>
  );
}
