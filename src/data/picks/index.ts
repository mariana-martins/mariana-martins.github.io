import type { PickItem } from '@/types';

import { audiobooks } from './audiobooks';
import { books } from './books';
import { courses } from './courses';
import { filmAndTv } from './filmAndTv';

export const picks: PickItem[] = [
  ...courses,
  ...books,
  ...audiobooks,
  ...filmAndTv,
];
