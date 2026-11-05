import React from 'react';

import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/cn';

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }): React.JSX.Element {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-x-1">
            {index > 0 && (
              <ChevronRight size={14} aria-hidden="true" className="shrink-0" />
            )}
            {item.href ? (
              <a
                href={item.href}
                className={cn(
                  'inline-flex items-center min-h-[44px] px-1 rounded-sm',
                  'link-underline',
                  'focus-ring',
                )}
              >
                {item.label}
              </a>
            ) : (
              <span aria-current="page" className="px-1 font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
