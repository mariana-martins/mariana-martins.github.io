import { describe, expect, it } from '@jest/globals';

import type { PickItem } from '@/types';

import {
  filterPicks,
  getAvailableCategories,
  getPickSubtitle,
  sortPicks,
} from './picks';

const book: PickItem = {
  id: 'book',
  title: 'Beta Book',
  category: 'book',
  author: 'Ann Author',
  status: 'completed',
  rating: 3,
  finishedAt: '2024-02',
};
const course: PickItem = {
  id: 'course',
  title: 'alpha course',
  category: 'course',
  author: 'Ian Instructor',
  platform: 'Frontend Masters',
  status: 'in-progress',
};
const movie: PickItem = {
  id: 'movie',
  title: 'Gamma Movie',
  category: 'movie',
  director: 'Dana Director',
  year: 2001,
  status: 'completed',
  rating: 5,
  finishedAt: '2025-01',
};
const series: PickItem = {
  id: 'series',
  title: 'Delta Series',
  category: 'series',
  creator: 'Cris Creator',
  status: 'planned',
};
const podcast: PickItem = {
  id: 'podcast',
  title: 'Epsilon Podcast',
  category: 'podcast',
  host: 'Hana Host',
  status: 'completed',
  rating: 4,
  finishedAt: '2023-06',
};

const picks = [book, course, movie, series, podcast];

describe('getPickSubtitle', () => {
  it('returns the author for books', () => {
    expect(getPickSubtitle(book)).toBe('Ann Author');
  });

  it('joins author and platform for courses', () => {
    expect(getPickSubtitle(course)).toBe('Ian Instructor · Frontend Masters');
    expect(getPickSubtitle({ ...course, platform: undefined })).toBe(
      'Ian Instructor',
    );
  });

  it('joins director and year for movies', () => {
    expect(getPickSubtitle(movie)).toBe('Dana Director · 2001');
    expect(getPickSubtitle({ ...movie, year: undefined })).toBe(
      'Dana Director',
    );
  });

  it('joins creator and year for series', () => {
    expect(getPickSubtitle(series)).toBe('Cris Creator');
    expect(getPickSubtitle({ ...series, year: 2022 })).toBe(
      'Cris Creator · 2022',
    );
  });

  it('returns the host for podcasts', () => {
    expect(getPickSubtitle(podcast)).toBe('Hana Host');
  });
});

describe('filterPicks', () => {
  it('returns everything for all/all', () => {
    expect(filterPicks(picks, 'all', 'all')).toHaveLength(5);
  });

  it('filters by category', () => {
    expect(filterPicks(picks, 'movie', 'all')).toEqual([movie]);
  });

  it('filters by status', () => {
    expect(filterPicks(picks, 'all', 'completed')).toEqual([
      book,
      movie,
      podcast,
    ]);
  });

  it('combines both filters', () => {
    expect(filterPicks(picks, 'book', 'planned')).toEqual([]);
    expect(filterPicks(picks, 'series', 'planned')).toEqual([series]);
  });
});

describe('sortPicks', () => {
  it('sorts alphabetically, case-insensitive', () => {
    expect(sortPicks(picks, 'alpha').map((p) => p.id)).toEqual([
      'course',
      'book',
      'series',
      'podcast',
      'movie',
    ]);
  });

  it('sorts by rating descending with unrated last', () => {
    expect(sortPicks(picks, 'rating').map((p) => p.id)).toEqual([
      'movie',
      'podcast',
      'book',
      'course',
      'series',
    ]);
  });

  it('sorts by finishedAt descending with undated last', () => {
    expect(sortPicks(picks, 'recent').map((p) => p.id)).toEqual([
      'movie',
      'book',
      'podcast',
      'course',
      'series',
    ]);
  });

  it('does not mutate the input', () => {
    const input = [...picks];
    sortPicks(input, 'alpha');
    expect(input).toEqual(picks);
  });
});

describe('getAvailableCategories', () => {
  it('returns present categories in display order', () => {
    expect(getAvailableCategories([podcast, book])).toEqual([
      'book',
      'podcast',
    ]);
  });

  it('returns an empty array for no picks', () => {
    expect(getAvailableCategories([])).toEqual([]);
  });
});
