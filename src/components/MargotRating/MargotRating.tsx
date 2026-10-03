import React from 'react';

import { MargotIcon } from '@components/MargotIcon/MargotIcon';

import { cn } from '@/lib/cn';
import type { PickRating } from '@/types';

export const MAX_RATING = 5;

export interface MargotRatingProps {
  rating: PickRating;
  className?: string;
}

/**
 * Read-only 1-5 score. Five decorative icons plus one sr-only sentence, so
 * screen readers hear the number instead of five images.
 */
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
        // A perfect score earns sparkles on the last Margot
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
