import React from 'react';

import { MargotRating } from '@components/MargotRating/MargotRating';
import { BookOpen, Film, GraduationCap, Headphones, Tv } from 'lucide-react';

import { cn } from '@/lib/cn';
import {
  getPickSubtitle,
  PICK_CATEGORY_LABELS,
  PICK_STATUS_LABELS,
} from '@/lib/picks';
import type { PickCategory, PickItem, PickStatus } from '@/types';

// One colour per status; the stamp's border and outline pick it up via
// currentColor.
const stampColors: Record<PickStatus, string> = {
  planned: 'text-blue-200 dark:text-blue-100',
  'in-progress': 'text-purple-200 dark:text-warm-400',
  completed: 'text-green-400 dark:text-green-100',
};

const categoryIcon: Record<PickCategory, React.ReactNode> = {
  book: <BookOpen size={16} aria-hidden="true" />,
  audiobook: <Headphones size={16} aria-hidden="true" />,
  course: <GraduationCap size={16} aria-hidden="true" />,
  movie: <Film size={16} aria-hidden="true" />,
  series: <Tv size={16} aria-hidden="true" />,
};

const spineColors: Record<PickCategory, string> = {
  book: 'bg-warm-200',
  audiobook: 'bg-blue-100',
  course: 'bg-purple-50',
  movie: 'bg-blue-50',
  series: 'bg-green-50',
};

function PickSpine({
  category,
}: {
  category: PickCategory;
}): React.JSX.Element {
  return (
    <div
      className={cn(
        'flex items-center gap-2.5 h-14 px-4',
        '@sm:flex-col @sm:justify-center @sm:gap-1.5 @sm:h-auto @sm:w-18 @sm:px-0 @sm:py-3',
        'text-text-primary',
        // Perforation between stub and body
        'border-dashed border-text-primary/40 dark:border-indigo-50/50',
        'border-b-2 @sm:border-b-0 @sm:border-r-2',
        spineColors[category],
      )}
    >
      <div className="relative grid place-items-center size-9 @sm:size-11">
        <div
          aria-hidden="true"
          className={cn('absolute inset-0 shape-blob rotate-12 bg-warm-50/70')}
        />
        <span className="relative">{categoryIcon[category]}</span>
      </div>
      <span className="font-heading text-[11px] @sm:text-[9px] tracking-[0.12em] @sm:tracking-[0.08em] uppercase opacity-80">
        {PICK_CATEGORY_LABELS[category]}
      </span>
    </div>
  );
}

/** Status as a rubber stamp: double border, a little crooked, never a pill */
function PickStatusStamp({
  status,
}: {
  status: PickStatus;
}): React.JSX.Element {
  return (
    <span
      className={cn(
        'self-end mt-auto pt-3 mb-3 -rotate-8',
        'font-heading text-[11px] font-semibold tracking-[0.18em] uppercase',
        'px-2.5 py-0.5 rounded',
        'border-2 border-current outline outline-1 outline-current outline-offset-2',
        stampColors[status],
      )}
    >
      <span className="sr-only">Status: </span>
      {PICK_STATUS_LABELS[status]}
    </span>
  );
}

function PickTitle({ item }: { item: PickItem }): React.JSX.Element {
  return (
    <h3 className="font-medium text-base text-balance leading-snug">
      {item.link ? (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'underline decoration-2 underline-offset-2 decoration-transparent',
            'hover:decoration-pink focus:decoration-pink',
            'dark:hover:text-blue-100 dark:hover:decoration-blue-100',
            'dark:focus:decoration-blue-100',
            'focus:outline-none',
            'focus-visible:ring-2 focus-visible:ring-offset-2',
            'focus-visible:ring-pink dark:focus-visible:ring-blue-100',
            'transition-colors duration-200',
          )}
        >
          {item.title}
          <span className="sr-only">
            {' '}
            (opens in new tab, {PICK_CATEGORY_LABELS[item.category]} by{' '}
            {getPickSubtitle(item)})
          </span>
        </a>
      ) : (
        item.title
      )}
    </h3>
  );
}

export interface PickCardProps {
  item: PickItem;
  /** The main page keeps scores private; the drawer shows them */
  showRating?: boolean;
  showNote?: boolean;
}

export function PickCard({
  item,
  showRating = false,
  showNote = false,
}: PickCardProps): React.JSX.Element {
  const rating =
    showRating && item.status === 'completed' ? item.rating : undefined;
  const note = showNote ? item.note : undefined;

  return (
    <li
      className={cn(
        'grow flex flex-col @container rounded-2xl ticket-lift',
        'motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-0.5',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'focus-visible:ring-pink dark:focus-visible:ring-blue-100',
      )}
    >
      <div
        className={cn(
          'ticket-card grow flex flex-col @sm:flex-row rounded-2xl',
          'bg-white/70 dark:bg-indigo-200/80',
          'border border-indigo-200/10 dark:border-white/10',
        )}
      >
        <PickSpine category={item.category} />

        <div className="flex-1 flex flex-col gap-1 min-w-0 p-4 @sm:pl-[18px]">
          <PickTitle item={item} />
          <p className="text-sm text-text-primary/70 dark:text-text-primary-dark/70">
            {getPickSubtitle(item)}
          </p>
          {rating !== undefined && (
            <MargotRating rating={rating} className="my-3" />
          )}
          {note && (
            <p className="text-sm italic text-text-primary/80 dark:text-text-primary-dark/80 mb-3">
              {note}
            </p>
          )}
          <PickStatusStamp status={item.status} />
        </div>
      </div>
    </li>
  );
}
