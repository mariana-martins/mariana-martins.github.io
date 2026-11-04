import { afterEach, describe, expect, it } from '@jest/globals';
import { act, render, screen } from '@testing-library/react';

import { useSequentialSwap } from './useSequentialSwap';

interface Item {
  id: string;
}

function Probe({ item }: { item: Item }): React.JSX.Element {
  const { shown, isLeaving, ref } = useSequentialSwap(item);
  return (
    <div key={shown.id} ref={ref} data-leaving={isLeaving}>
      {shown.id}
    </div>
  );
}

/** jsdom has no element.animate; each test decides when animations finish */
function stubAnimate(): {
  calls: Keyframe[][];
  finishCurrent: () => Promise<void>;
} {
  const calls: Keyframe[][] = [];
  let resolveCurrent: (() => void) | undefined;

  Object.defineProperty(Element.prototype, 'animate', {
    configurable: true,
    value: (keyframes: Keyframe[]) => {
      calls.push(keyframes);
      return {
        finished: new Promise<void>((resolve) => {
          resolveCurrent = resolve;
        }),
      };
    },
  });

  return {
    calls,
    finishCurrent: async () => {
      await act(async () => {
        resolveCurrent?.();
      });
    },
  };
}

describe('useSequentialSwap', () => {
  afterEach(() => {
    Reflect.deleteProperty(Element.prototype, 'animate');
  });

  it('does not animate the first render', () => {
    const { calls } = stubAnimate();
    render(<Probe item={{ id: 'first' }} />);

    expect(screen.getByText('first')).toHaveAttribute('data-leaving', 'false');
    expect(calls).toHaveLength(0);
  });

  it('plays the old item out before showing the new one', async () => {
    const { calls, finishCurrent } = stubAnimate();
    const { rerender } = render(<Probe item={{ id: 'first' }} />);

    rerender(<Probe item={{ id: 'second' }} />);

    expect(screen.getByText('first')).toHaveAttribute('data-leaving', 'true');
    expect(calls[0][calls[0].length - 1]).toMatchObject({ opacity: 0 });

    await finishCurrent();

    expect(screen.getByText('second')).toHaveAttribute('data-leaving', 'false');
    expect(calls[1][0]).toMatchObject({ opacity: 0 });
  });

  it('swaps at once where the Web Animations API is missing', () => {
    const { rerender } = render(<Probe item={{ id: 'first' }} />);

    rerender(<Probe item={{ id: 'second' }} />);

    expect(screen.getByText('second')).toBeInTheDocument();
  });

  it('moves on to an item that arrived while the last one was entering', async () => {
    const { calls, finishCurrent } = stubAnimate();
    const { rerender } = render(<Probe item={{ id: 'first' }} />);

    rerender(<Probe item={{ id: 'second' }} />);
    await finishCurrent(); // first has left; second is entering
    rerender(<Probe item={{ id: 'third' }} />);
    await finishCurrent(); // second has entered; third is now due

    expect(screen.getByText('second')).toHaveAttribute('data-leaving', 'true');
    await finishCurrent();
    expect(screen.getByText('third')).toBeInTheDocument();
    expect(calls).toHaveLength(4);
  });
});
