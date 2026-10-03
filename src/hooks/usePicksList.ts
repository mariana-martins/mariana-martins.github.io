import { useCallback, useMemo, useState } from 'react';

import { MARGOTS_PICKS } from '@/constants';
import {
  filterPicks,
  type PickCategoryFilter,
  type PickSort,
  type PickStatusFilter,
  sortPicks,
} from '@/lib/picks';
import type { PickItem } from '@/types';

interface UsePicksListReturn {
  category: PickCategoryFilter;
  status: PickStatusFilter;
  sort: PickSort;
  /** Everything matching the filters, in order */
  filtered: PickItem[];
  /** The slice currently on screen */
  visible: PickItem[];
  hasMore: boolean;
  setCategory: (category: PickCategoryFilter) => void;
  setStatus: (status: PickStatusFilter) => void;
  setSort: (sort: PickSort) => void;
  showMore: () => void;
}

export function usePicksList(
  picks: PickItem[],
  pageSize: number = MARGOTS_PICKS.pageSize,
): UsePicksListReturn {
  const [category, setCategoryState] = useState<PickCategoryFilter>('all');
  const [status, setStatusState] = useState<PickStatusFilter>('all');
  const [sort, setSortState] = useState<PickSort>('recent');
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const filtered = useMemo(
    () => sortPicks(filterPicks(picks, category, status), sort),
    [picks, category, status, sort],
  );
  const visible = filtered.slice(0, visibleCount);

  // Any change to what is listed starts the pagination over
  const setCategory = useCallback(
    (next: PickCategoryFilter) => {
      setCategoryState(next);
      setVisibleCount(pageSize);
    },
    [pageSize],
  );

  const setStatus = useCallback(
    (next: PickStatusFilter) => {
      setStatusState(next);
      setVisibleCount(pageSize);
    },
    [pageSize],
  );

  const setSort = useCallback(
    (next: PickSort) => {
      setSortState(next);
      setVisibleCount(pageSize);
    },
    [pageSize],
  );

  const showMore = useCallback(() => {
    setVisibleCount((count) => count + pageSize);
  }, [pageSize]);

  return {
    category,
    status,
    sort,
    filtered,
    visible,
    hasMore: visibleCount < filtered.length,
    setCategory,
    setStatus,
    setSort,
    showMore,
  };
}
