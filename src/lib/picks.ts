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

const CREDIT_SEPARATOR = ' · ';

export interface PickCategoryFilterGroup {
  value: Exclude<PickCategoryFilter, 'all'>;
  label: string;
  categories: PickCategory[];
}

/** In display order */
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

const NO_RATING = 0;
const NO_DATE = '';

/** Exhaustive on purpose: a new category without a subtitle fails to compile */
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

/** Returns a new array. Picks missing the sort key sink to the bottom. */
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

/** In progress, then completed (newest first), then planned */
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
