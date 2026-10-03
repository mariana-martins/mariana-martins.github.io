import type { PickCategory, PickItem, PickStatus } from '@/types';

export type PickSort = 'recent' | 'rating' | 'alpha';
/** A chip in the drawer; `screen` covers films and TV shows together */
export type PickCategoryFilter =
  'all' | 'book' | 'audiobook' | 'course' | 'screen';
export type PickStatusFilter = 'all' | PickStatus;

export const PICK_CATEGORY_LABELS: Record<PickCategory, string> = {
  book: 'Book',
  audiobook: 'Audiobook',
  course: 'Course',
  movie: 'Movie',
  series: 'TV Show',
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

export interface PickCategoryFilterGroup {
  value: Exclude<PickCategoryFilter, 'all'>;
  label: string;
  categories: PickCategory[];
}

/** Chips in display order; each one may cover more than one category */
export const PICK_CATEGORY_FILTERS: PickCategoryFilterGroup[] = [
  { value: 'book', label: 'Book', categories: ['book'] },
  { value: 'audiobook', label: 'Audiobook', categories: ['audiobook'] },
  { value: 'course', label: 'Course', categories: ['course'] },
  { value: 'screen', label: 'Film & TV', categories: ['movie', 'series'] },
];

function categoriesFor(
  filter: Exclude<PickCategoryFilter, 'all'>,
): PickCategory[] {
  const group = PICK_CATEGORY_FILTERS.find((entry) => entry.value === filter);
  return group === undefined ? [] : group.categories;
}

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
    case 'audiobook':
      return item.author;
    case 'course':
      return joinCredit(item.author, item.platform);
    case 'movie':
      return joinCredit(item.director, item.year);
    case 'series':
      return joinCredit(item.creator, item.year);
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
    const matchesCategory =
      category === 'all' || categoriesFor(category).includes(pick.category);
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
      sorted.sort(byRecent);
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

/**
 * "Recent first" reads as a timeline: what is being read now, then what was
 * finished (newest first), then what is still to come.
 */
const RECENT_STATUS_ORDER: Record<PickStatus, number> = {
  'in-progress': 0,
  completed: 1,
  planned: 2,
};

function byRecent(first: PickItem, second: PickItem): number {
  const byStatus =
    RECENT_STATUS_ORDER[first.status] - RECENT_STATUS_ORDER[second.status];
  if (byStatus !== 0) {
    return byStatus;
  }
  return byFinishDateDescending(first, second);
}

function byFinishDateDescending(first: PickItem, second: PickItem): number {
  // "YYYY-MM" strings compare correctly as plain text
  const firstDate = first.finishedAt ?? NO_DATE;
  const secondDate = second.finishedAt ?? NO_DATE;
  return secondDate.localeCompare(firstDate);
}

/** The picks flagged for the main page, in data order, capped at `limit` */
export function getFeaturedPicks(picks: PickItem[], limit: number): PickItem[] {
  const featured: PickItem[] = [];
  for (const pick of picks) {
    if (pick.featured) {
      featured.push(pick);
    }
    if (featured.length === limit) {
      break;
    }
  }
  return featured;
}

/** Chips whose categories actually have picks, in display order */
export function getAvailableFilters(
  picks: PickItem[],
): PickCategoryFilterGroup[] {
  const present = new Set<PickCategory>();
  for (const pick of picks) {
    present.add(pick.category);
  }

  return PICK_CATEGORY_FILTERS.filter((group) =>
    group.categories.some((category) => present.has(category)),
  );
}
