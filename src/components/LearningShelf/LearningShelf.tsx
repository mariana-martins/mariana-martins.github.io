import React from 'react';

import clsx from 'clsx';
import { BookOpen, GraduationCap, Video } from 'lucide-react';

import { Card } from '@/components/Card';
import { data } from '@/data';
import type { LearningItem } from '@/types';

const statusConfig = {
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

const categoryLabels = {
  book: 'Book',
  course: 'Course',
};

const categoryIcon = {
  book: <BookOpen size={16} aria-hidden="true" />,
  course: <Video size={16} aria-hidden="true" />,
};

function LearningShelf(): React.JSX.Element {
  return (
    <section
      className="w-full flex-1 flex flex-col gap-6 p-4 md:p-8 items-center text-text-primary dark:text-text-primary-dark"
      aria-labelledby="learning-shelf-heading"
      aria-describedby="learning-shelf-description"
    >
      <div className="flex items-center gap-2">
        <GraduationCap
          className="text-pink dark:text-blue-100"
          size={24}
          aria-hidden="true"
        />
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
          <li key={item.id} role="listitem">
            <Card
              variant="default"
              size="sm"
              className="flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <div
                className={clsx(
                  'p-2 rounded-full shrink-0 self-start sm:self-center text-text-primary dark:text-text-primary-dark',
                  item.category === 'book'
                    ? 'bg-warm-200 dark:bg-warm-200/50'
                    : 'bg-purple dark:bg-purple/50',
                )}
              >
                <span className="sr-only">{categoryLabels[item.category]}</span>
                {categoryIcon[item.category]}
              </div>

              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <h4 className="font-medium text-sm md:text-base">
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={clsx(
                        'underline decoration-transparent hover:decoration-current',
                        'focus:decoration-current focus:outline-none',
                        'hover:text-pink dark:hover:text-blue-100',
                        'transition-all duration-200',
                        'decoration-2 underline-offset-2',
                      )}
                    >
                      {item.title}
                      <span className="sr-only">
                        {' '}
                        (opens in new tab, {
                          categoryLabels[item.category]
                        } by {item.author})
                      </span>
                    </a>
                  ) : (
                    item.title
                  )}
                </h4>
                <p className="text-xs md:text-sm text-text-primary/70 dark:text-text-primary-dark/70">
                  {item.author}
                </p>
              </div>

              <span
                className={clsx(
                  'self-start sm:self-center px-2.5 py-0.5 rounded-full text-xs font-medium border-2',
                  statusConfig[item.status].colors,
                )}
                aria-label={`Status: ${statusConfig[item.status].label}`}
              >
                {statusConfig[item.status].label}
              </span>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LearningShelf;
