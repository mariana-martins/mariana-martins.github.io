import { afterEach, describe, expect, it } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';

import { MARGOTS_PICKS } from '@/constants';
import { useShelfHash } from '@/hooks/useShelfHash';

function fireHashChange(): void {
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}

describe('useShelfHash', () => {
  afterEach(() => {
    window.history.replaceState(null, '', window.location.pathname);
  });

  it('starts closed without the hash', () => {
    const { result } = renderHook(() => useShelfHash());
    expect(result.current.isOpen).toBe(false);
  });

  it('starts open when the page loads with the hash', () => {
    window.location.hash = MARGOTS_PICKS.hash;
    const { result } = renderHook(() => useShelfHash());
    expect(result.current.isOpen).toBe(true);
  });

  it('opens by setting the hash', () => {
    const { result } = renderHook(() => useShelfHash());
    act(() => {
      result.current.open();
      fireHashChange();
    });
    expect(window.location.hash).toBe(MARGOTS_PICKS.hash);
    expect(result.current.isOpen).toBe(true);
  });

  it('follows external hash changes, like the back button', () => {
    const { result } = renderHook(() => useShelfHash());
    act(() => {
      window.location.hash = MARGOTS_PICKS.hash;
      fireHashChange();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      window.location.hash = '';
      fireHashChange();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('closes and clears the hash', () => {
    window.location.hash = MARGOTS_PICKS.hash;
    const { result } = renderHook(() => useShelfHash());
    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
    expect(window.location.hash).toBe('');
  });
});
