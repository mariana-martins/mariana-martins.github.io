import React from 'react';

import { data } from '@/data';
import type { LearningItem } from '@/types';

import { LearningShelfItem } from './LearningShelfItem';

function LearningShelf(): React.JSX.Element {
  return (
    <section
      className="w-full flex-1 flex flex-col gap-6 p-4 md:p-8 items-center text-text-primary dark:text-text-primary-dark"
      aria-labelledby="learning-shelf-heading"
      aria-describedby="learning-shelf-description"
    >
      <div className="flex items-center gap-2">
        <h3 id="learning-shelf-heading" className="text-xl font-semibold">
          The Learning Shelf
        </h3>
      </div>

      <p id="learning-shelf-description" className="sr-only">
        A list of books and courses I plan to read or complete.
      </p>

      <ul
        className="w-full flex-1 flex flex-col justify-between gap-4"
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

export default LearningShelf;
