import React, { useEffect, useRef } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { PickCard } from '@components/PickCard/PickCard';
import { X } from 'lucide-react';

import margotPark from '@/assets/margot-park.webp';
import margot from '@/assets/margot.webp';
import { MARGOTS_PICKS } from '@/constants';
import { data } from '@/data';
import { usePicksList } from '@/hooks/usePicksList';
import { cn } from '@/lib/cn';
import { getAvailableFilters } from '@/lib/picks';

import { MargotsPicksFilters } from './MargotsPicksFilters';
import { MargotsPicksSort } from './MargotsPicksSort';

const focusRing = cn('focus-ring');

function EmptyState(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="relative size-52">
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 shape-blob rotate-12 translate-x-3 translate-y-2 opacity-80',
            'bg-gradient-to-br from-green-200 to-green-100',
          )}
        />
        <div className="absolute inset-0 shape-blob overflow-hidden">
          <img
            src={margotPark}
            alt="Margot, a white Japanese Spitz, running across the grass"
            width={640}
            height={640}
            loading="lazy"
            className="size-full object-cover"
          />
        </div>
      </div>
      <p className="text-center text-sm italic">
        Nothing here yet. Margot went looking for more.
      </p>
    </div>
  );
}

function MargotsPicksContent(): React.JSX.Element {
  const {
    category,
    status,
    sort,
    filtered,
    visible,
    hasMore,
    setCategory,
    setStatus,
    setSort,
    showMore,
  } = usePicksList(data.picks);
  const filters = getAvailableFilters(data.picks);

  // After "Show more", land the keyboard on the first newly revealed card
  const listRef = useRef<HTMLUListElement>(null);
  const focusIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const index = focusIndexRef.current;
    if (index === null) {
      return;
    }
    focusIndexRef.current = null;
    const item = listRef.current?.querySelectorAll<HTMLElement>('li')[index];
    if (!item) {
      return;
    }
    const link = item.querySelector<HTMLElement>('a, button');
    if (link) {
      link.focus();
      return;
    }
    item.tabIndex = -1;
    item.focus();
  }, [visible.length]);

  const handleShowMore = (): void => {
    focusIndexRef.current = visible.length;
    showMore();
  };

  const countLabel =
    filtered.length === 1 ? '1 pick' : `${filtered.length} picks`;

  return (
    <>
      <div
        className={cn(
          'sticky top-0 z-10 flex flex-col gap-4 px-6 pt-6 pb-4',
          // Opaque so scrolled cards never bleed through the header
          'bg-warm-50 dark:bg-blue-300',
          'border-b border-soft',
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Halo hides the cut-out's matting fringe */}
            <span
              className={cn(
                'size-12 shrink-0 rounded-full overflow-hidden',
                'bg-gradient-to-b from-warm-50 to-pink/40',
                'dark:from-indigo-50 dark:to-blue-100/30',
                'ring-2 ring-pink dark:ring-blue-100',
              )}
            >
              <img
                src={margot}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                className={cn(
                  'size-full object-cover object-top brightness-110',
                  'drop-shadow-[0_0_1px_white]',
                )}
              />
            </span>
            <div>
              <Dialog.Title className="text-xl font-semibold font-heading">
                {MARGOTS_PICKS.label}
              </Dialog.Title>
              <Dialog.Description className="text-sm text-text-primary/80 dark:text-text-primary-dark/80">
                Books, audiobooks, courses, films and TV shows, rated by Margot.
              </Dialog.Description>
            </div>
          </div>
          <Dialog.Close
            aria-label={`Close ${MARGOTS_PICKS.label}`}
            className={cn(
              'shrink-0 min-w-[44px] min-h-[44px] rounded-full cursor-pointer',
              'flex items-center justify-center',
              'hover:bg-warm-100/70 dark:hover:bg-indigo-50/40',
              'transition-colors duration-200 touch-manipulation',
              focusRing,
            )}
          >
            <X size={20} aria-hidden="true" />
          </Dialog.Close>
        </div>

        <MargotsPicksFilters
          filters={filters}
          category={category}
          status={status}
          onCategoryChange={setCategory}
          onStatusChange={setStatus}
        />
      </div>

      <div className="flex flex-col gap-4 px-6 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="text-sm text-muted">
            {countLabel}
          </p>
          <MargotsPicksSort sort={sort} onSortChange={setSort} />
        </div>

        {visible.length === 0 ? (
          <EmptyState />
        ) : (
          <ul
            ref={listRef}
            role="list"
            aria-label={MARGOTS_PICKS.label}
            className="flex flex-col gap-4"
          >
            {visible.map((item) => (
              <PickCard key={item.id} item={item} showRating showNote />
            ))}
          </ul>
        )}

        {hasMore && (
          <button
            type="button"
            onClick={handleShowMore}
            className={cn(
              'self-center min-h-[44px] px-5 py-2 rounded-full cursor-pointer',
              'text-sm font-medium border-2',
              'border-pink/50 dark:border-blue-100/50',
              'hover:border-pink hover:bg-warm-100/50',
              'dark:hover:border-blue-100 dark:hover:bg-indigo-50/30',
              'transition-colors duration-200 touch-manipulation',
              focusRing,
            )}
          >
            Show more
          </button>
        )}
      </div>
    </>
  );
}

export interface MargotsPicksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Lazy-loaded by MargotsPicks */
export default function MargotsPicksDrawer({
  isOpen,
  onClose,
}: MargotsPicksDrawerProps): React.JSX.Element {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 z-40 bg-blue-300/30 dark:bg-black/50 backdrop-blur-sm',
            'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
          )}
        />
        <Dialog.Content
          onCloseAutoFocus={(event) => {
            // Opened via hash, so Radix has no trigger to return focus to
            event.preventDefault();
            document.getElementById(MARGOTS_PICKS.triggerId)?.focus();
          }}
          className={cn(
            'fixed inset-y-0 right-0 z-50 w-full sm:max-w-md overflow-y-auto',
            'glass-panel',
            'text-body',
            'data-[state=open]:animate-slide-in-right',
            'data-[state=closed]:animate-slide-out-right',
          )}
        >
          <MargotsPicksContent />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
