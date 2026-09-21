import type { PickCategory, PickItem, PickStatus } from '@/types';

export type PickSort = 'recent' | 'rating' | 'alpha';
export type PickCategoryFilter = 'all' | PickCategory;
export type PickStatusFilter = 'all' | PickStatus;

export const PICK_CATEGORY_LABELS: Record<PickCategory, string> = {
  book: 'Book',
  course: 'Course',
  movie: 'Movie',
  series: 'TV Show',
  podcast: 'Podcast',
};

export const PICK_STATUS_LABELS: Record<PickStatus, string> = {
  planned: 'Planned',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export const PICK_SORT_LABELS: Record<PickSort, string> = {
  recent: 'Recent first',
  rating: 'Top rated',
  alpha: 'A to Z',
};

/** Separator between a creator and a platform or year in the credit line */
const CREDIT_SEPARATOR = ' · ';

/** Display order for category chips */
const CATEGORY_ORDER: PickCategory[] = [
  'book',
  'course',
  'movie',
  'series',
  'podcast',
];

/** Sentinel for picks with no rating; sorts below every real score */
const NO_RATING = 0;
/** Sentinel for picks with no finish date; sorts below every real date */
const NO_DATE = '';

/**
 * Who gets the credit line under the title. Each category names its
 * creator differently, so the switch is exhaustive on purpose: adding a
 * category without a subtitle fails to compile.
 */
export function getPickSubtitle(item: PickItem): string {
  switch (item.category) {
    case 'book':
      return item.author;
    case 'course':
      return joinCredit(item.author, item.platform);
    case 'movie':
      return joinCredit(item.director, item.year);
    case 'series':
      return joinCredit(item.creator, item.year);
    case 'podcast':
      return item.host;
  }
}

function joinCredit(creator: string, detail?: string | number): string {
  if (detail === undefined) {
    return creator;
  }
  return `${creator}${CREDIT_SEPARATOR}${detail}`;
}

export function filterPicks(
  picks: PickItem[],
  category: PickCategoryFilter,
  status: PickStatusFilter,
): PickItem[] {
  const result: PickItem[] = [];

  for (const pick of picks) {
    const matchesCategory = category === 'all' || pick.category === category;
    const matchesStatus = status === 'all' || pick.status === status;

    if (matchesCategory && matchesStatus) {
      result.push(pick);
    }
  }

  return result;
}

/**
 * Returns a new sorted array; never mutates the input.
 * Picks missing the sort key (no date, no rating) sink to the bottom so the
 * list never leads with blanks.
 */
export function sortPicks(picks: PickItem[], sort: PickSort): PickItem[] {
  const sorted = [...picks];

  switch (sort) {
    case 'alpha':
      sorted.sort(byTitle);
      break;
    case 'rating':
      sorted.sort(byRatingDescending);
      break;
    case 'recent':
      sorted.sort(byFinishDateDescending);
      break;
  }

  return sorted;
}

function byTitle(first: PickItem, second: PickItem): number {
  return first.title.localeCompare(second.title, 'en', {
    sensitivity: 'base',
  });
}

function byRatingDescending(first: PickItem, second: PickItem): number {
  const firstRating = first.rating ?? NO_RATING;
  const secondRating = second.rating ?? NO_RATING;
  return secondRating - firstRating;
}

function byFinishDateDescending(first: PickItem, second: PickItem): number {
  // "YYYY-MM" strings compare correctly as plain text
  const firstDate = first.finishedAt ?? NO_DATE;
  const secondDate = second.finishedAt ?? NO_DATE;
  return secondDate.localeCompare(firstDate);
}

/** Categories that actually have picks, in a stable display order */
export function getAvailableCategories(picks: PickItem[]): PickCategory[] {
  const present = new Set<PickCategory>();
  for (const pick of picks) {
    present.add(pick.category);
  }

  const available: PickCategory[] = [];
  for (const category of CATEGORY_ORDER) {
    if (present.has(category)) {
      available.push(category);
    }
  }

  return available;
}
