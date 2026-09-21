import { describe, expect, it } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';

import { mockPicks } from '@/__mocks__/mockData';
import { usePicksList } from '@/hooks/usePicksList';

describe('usePicksList', () => {
  it('starts with everything, recent first, first page only', () => {
    const { result } = renderHook(() => usePicksList(mockPicks, 2));
    expect(result.current.filtered).toHaveLength(mockPicks.length);
    expect(result.current.visible).toHaveLength(2);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.visible[0].id).toBe('pick-movie');
  });

  it('reveals another page on showMore', () => {
    const { result } = renderHook(() => usePicksList(mockPicks, 2));
    act(() => result.current.showMore());
    expect(result.current.visible).toHaveLength(4);
    act(() => result.current.showMore());
    expect(result.current.visible).toHaveLength(5);
    expect(result.current.hasMore).toBe(false);
  });

  it('filters by category and status', () => {
    const { result } = renderHook(() => usePicksList(mockPicks));
    act(() => result.current.setCategory('book'));
    expect(result.current.filtered.map((p) => p.id)).toEqual(['pick-book']);

    act(() => result.current.setCategory('all'));
    act(() => result.current.setStatus('in-progress'));
    expect(result.current.filtered.map((p) => p.id)).toEqual([
      'pick-course',
      'pick-podcast',
    ]);
  });

  it('re-sorts the list', () => {
    const { result } = renderHook(() => usePicksList(mockPicks));
    act(() => result.current.setSort('alpha'));
    expect(result.current.visible[0].id).toBe('pick-movie');
    act(() => result.current.setSort('rating'));
    expect(result.current.visible[0].id).toBe('pick-movie');
    expect(result.current.visible[1].id).toBe('pick-book');
  });

  it('resets pagination when a filter or sort changes', () => {
    const { result } = renderHook(() => usePicksList(mockPicks, 2));
    act(() => result.current.showMore());
    expect(result.current.visible).toHaveLength(4);

    act(() => result.current.setSort('alpha'));
    expect(result.current.visible).toHaveLength(2);

    act(() => result.current.showMore());
    act(() => result.current.setStatus('all'));
    expect(result.current.visible).toHaveLength(2);
  });
});
