import React from 'react';

import { SECTIONS } from '@/constants';
import { data } from '@/data';
import type { LearningItem } from '@/types';

import { LearningShelfItem } from './LearningShelfItem';

export function LearningShelf(): React.JSX.Element {
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
        A list of books and courses I plan to read or complete.
      </p>

      <ul
        className="w-full grow flex flex-col gap-4"
        role="list"
        aria-label="Learning items"
      >
        {data.learningShelf.map((item: LearningItem) => (
          <LearningShelfItem key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}
