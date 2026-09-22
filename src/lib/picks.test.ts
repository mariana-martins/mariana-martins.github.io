import { describe, expect, it } from '@jest/globals';

import type { PickItem } from '@/types';

import {
  filterPicks,
  getAvailableFilters,
  getFeaturedPicks,
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
const audiobook: PickItem = {
  id: 'audiobook',
  title: 'Epsilon Audiobook',
  category: 'audiobook',
  author: 'Abe Author',
  status: 'completed',
  rating: 4,
  finishedAt: '2023-06',
};

const picks = [book, course, movie, series, audiobook];

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

  it('returns the author for audiobooks', () => {
    expect(getPickSubtitle(audiobook)).toBe('Abe Author');
  });

  it('filters by category', () => {
    expect(filterPicks(picks, 'book', 'all')).toEqual([book]);
    // One chip for films and TV shows
    expect(filterPicks(picks, 'screen', 'all')).toEqual([movie, series]);
  });

  it('filters by status', () => {
    expect(filterPicks(picks, 'all', 'completed')).toEqual([
      book,
      movie,
      audiobook,
    ]);
  });

  it('combines both filters', () => {
    expect(filterPicks(picks, 'book', 'planned')).toEqual([]);
    expect(filterPicks(picks, 'screen', 'planned')).toEqual([series]);
  });
});

describe('sortPicks', () => {
  it('sorts alphabetically, case-insensitive', () => {
    expect(sortPicks(picks, 'alpha').map((p) => p.id)).toEqual([
      'course',
      'book',
      'series',
      'audiobook',
      'movie',
    ]);
  });

  it('sorts by rating descending with unrated last', () => {
    expect(sortPicks(picks, 'rating').map((p) => p.id)).toEqual([
      'movie',
      'audiobook',
      'book',
      'course',
      'series',
    ]);
  });

  it('sorts in progress first, then completed by date, then planned', () => {
    expect(sortPicks(picks, 'recent').map((p) => p.id)).toEqual([
      'course',
      'movie',
      'book',
      'audiobook',
      'series',
    ]);
  });

  it('does not mutate the input', () => {
    const input = [...picks];
    sortPicks(input, 'alpha');
    expect(input).toEqual(picks);
  });
});

describe('getFeaturedPicks', () => {
  it('keeps only featured picks, in order, up to the limit', () => {
    const featured = picks.map((pick) => ({ ...pick, featured: true }));
    const mixed = [picks[0], featured[1], featured[2], picks[3], featured[4]];
    expect(getFeaturedPicks(mixed, 2).map((p) => p.id)).toEqual([
      'course',
      'movie',
    ]);
    expect(getFeaturedPicks(mixed, 10)).toHaveLength(3);
    expect(getFeaturedPicks(picks, 5)).toEqual([]);
  });
});

describe('getAvailableFilters', () => {
  it('returns chips with picks, in display order', () => {
    expect(getAvailableFilters([audiobook, book]).map((f) => f.value)).toEqual([
      'book',
      'audiobook',
    ]);
  });

  it('shows one chip when either films or TV shows exist', () => {
    expect(getAvailableFilters([series]).map((f) => f.label)).toEqual([
      'Film & TV',
    ]);
    expect(getAvailableFilters([movie, series])).toHaveLength(1);
  });

  it('returns an empty array for no picks', () => {
    expect(getAvailableFilters([])).toEqual([]);
  });
});
