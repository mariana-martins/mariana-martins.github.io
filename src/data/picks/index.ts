import type { PickItem } from '@/types';

import { audiobooks } from './audiobooks';
import { books } from './books';
import { courses } from './courses';
import { filmAndTv } from './filmAndTv';

/**
 * Margot's Picks, one file per category. The main page shows the entries
 * marked `featured`; the drawer lists everything, sorted by the user.
 */
export const picks: PickItem[] = [
  ...courses,
  ...books,
  ...audiobooks,
  ...filmAndTv,
];
