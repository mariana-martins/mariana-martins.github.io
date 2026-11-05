import React from 'react';

import logo from '@/assets/logo.webp';
import { PATHS } from '@/constants';
import { cn } from '@/lib/cn';

export function SiteMark(): React.JSX.Element {
  return (
    <a
      href={PATHS.home}
      className={cn(
        'inline-flex items-center gap-3 rounded-md min-h-[44px]',
        'text-body',
        'focus-ring',
      )}
    >
      <span
        className={cn(
          'flex items-center justify-center size-12 shrink-0 p-1 rounded-md',
          'bg-warm-300 border-2 border-pink',
          'dark:bg-transparent dark:border-blue-100',
          'dark:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_6px_var(--color-blue-100),0_0_12px_var(--color-blue-100)]',
        )}
      >
        <img
          src={logo}
          alt=""
          width={272}
          height={197}
          className="w-full object-contain"
        />
      </span>
      <span className="font-heading text-base md:text-lg tracking-[0.15rem] uppercase">
        Mariana Martins Menezes
        <span className="sr-only">, home</span>
      </span>
    </a>
  );
}
