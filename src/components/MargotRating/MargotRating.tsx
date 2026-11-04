import React from 'react';

import { MargotIcon } from '@components/MargotIcon/MargotIcon';

import { cn } from '@/lib/cn';
import type { PickRating } from '@/types';

export const MAX_RATING = 5;

export interface MargotRatingProps {
  rating: PickRating;
  className?: string;
}

/** Icons are decorative; screen readers get one sentence instead */
export function MargotRating({
  rating,
  className,
}: MargotRatingProps): React.JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-pink dark:text-blue-100',
        className,
      )}
    >
      <span className="sr-only">
        Rated {rating} out of {MAX_RATING} Margots
      </span>
      {Array.from({ length: MAX_RATING }, (_, index) => {
        const filled = index < rating;
        const sparkles = rating === MAX_RATING && index === MAX_RATING - 1;
        return (
          <MargotIcon
            key={index}
            filled={filled}
            sparkles={sparkles}
            className={filled ? 'margot-glow' : undefined}
          />
        );
      })}
    </span>
  );
}
