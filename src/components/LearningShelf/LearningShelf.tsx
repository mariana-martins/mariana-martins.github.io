import React from 'react';

import { PickCard } from '@components/PickCard/PickCard';
import { Library } from 'lucide-react';

import { LEARNING_SHELF_LIMIT, MARGOTS_PICKS, SECTIONS } from '@/constants';
import { data } from '@/data';
import { cn } from '@/lib/cn';
import { getFeaturedPicks } from '@/lib/picks';

export const MARGOTS_PICKS_TRIGGER_ID = 'margots-picks-trigger';

function openMargotsPicks(): void {
  // The drawer listens for hashchange, so the URL is the single source of truth
  window.location.hash = MARGOTS_PICKS.hash;
}

export function LearningShelf(): React.JSX.Element {
  const shelf = getFeaturedPicks(data.picks, LEARNING_SHELF_LIMIT);
  const remaining = data.picks.length - shelf.length;

  return (
    <section
      className="w-full flex-1 flex flex-col gap-6 px-4 py-12 items-center text-text-primary dark:text-text-primary-dark"
      aria-labelledby="learning-shelf-heading"
      aria-describedby="learning-shelf-description"
    >
      <div className="flex items-center gap-2">
        <h2
          id="learning-shelf-heading"
          tabIndex={-1}
          className="text-xl font-semibold"
        >
          {SECTIONS.learningShelf.label}
        </h2>
      </div>

      <p id="learning-shelf-description" className="sr-only">
        A short list of books, courses, films and more I am reading, watching or
        planning to. The full shelf lives in {MARGOTS_PICKS.label}.
      </p>

      <ul
        className="w-full grow flex flex-col gap-4"
        role="list"
        aria-label="Learning items"
      >
        {shelf.map((item) => (
          <PickCard key={item.id} item={item} />
        ))}

        {/* Not hidden, not shouted: the quiet door to the full shelf */}
        <li className="flex flex-col">
          <button
            id={MARGOTS_PICKS_TRIGGER_ID}
            type="button"
            onClick={openMargotsPicks}
            className={cn(
              'w-full min-h-[44px] p-3 rounded-xl cursor-pointer',
              'flex items-center justify-center gap-2',
              'border-2 border-dashed border-pink/50 dark:border-blue-100/50',
              'text-sm text-text-primary/80 dark:text-text-primary-dark/80',
              'hover:border-pink dark:hover:border-blue-100',
              'hover:bg-warm-100/50 dark:hover:bg-indigo-50/30',
              'focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2',
              'focus-visible:ring-pink dark:focus-visible:ring-blue-100',
              'transition-colors duration-300 ease-out touch-manipulation',
            )}
          >
            <Library size={16} aria-hidden="true" />
            <span>
              {remaining > 0
                ? `…and ${remaining} more in ${MARGOTS_PICKS.label}`
                : `Open ${MARGOTS_PICKS.label}`}
            </span>
          </button>
        </li>
      </ul>
    </section>
  );
}
