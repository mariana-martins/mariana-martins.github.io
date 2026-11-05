import React from 'react';

import { preloadMargotsPicks } from '@components/MargotsPicks/loadDrawer';
import { PickCard } from '@components/PickCard/PickCard';
import { Library } from 'lucide-react';

import { LEARNING_SHELF_LIMIT, MARGOTS_PICKS, SECTIONS } from '@/constants';
import { data } from '@/data';
import { getFeaturedPicks } from '@/lib/picks';

function openMargotsPicks(): void {
  window.location.hash = MARGOTS_PICKS.hash;
}

export function LearningShelf(): React.JSX.Element {
  const shelf = getFeaturedPicks(data.picks, LEARNING_SHELF_LIMIT);
  const remaining = data.picks.length - shelf.length;

  return (
    <section
      className="w-full flex flex-col gap-6 px-2 py-12 items-center text-text-primary dark:text-text-primary-dark"
      aria-labelledby={SECTIONS.learningShelf.id}
      aria-describedby="learning-shelf-description"
    >
      <div className="flex items-center gap-2">
        <h2
          id={SECTIONS.learningShelf.id}
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
        className="w-full flex flex-col gap-4"
        role="list"
        aria-label="Learning items"
      >
        {shelf.map((item) => (
          <PickCard key={item.id} item={item} />
        ))}

        <li className="flex flex-col">
          <button
            id={MARGOTS_PICKS.triggerId}
            type="button"
            onClick={openMargotsPicks}
            onPointerEnter={preloadMargotsPicks}
            onFocus={preloadMargotsPicks}
            className="dashed-action"
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
