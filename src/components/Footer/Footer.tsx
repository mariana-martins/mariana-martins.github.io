import React from 'react';

import { Separator } from '@radix-ui/react-separator';

import { PATHS } from '@/constants';
import { cn } from '@/lib/cn';

export function Footer(): React.JSX.Element {
  return (
    <footer
      className={cn(
        'col-start-1 h-fit py-17',
        'text-text-primary dark:text-text-primary-dark',
      )}
    >
      <p className="text-lg mb-4 text-center">
        Not all those who wander are lost. Some are just debugging.
      </p>
      <Separator
        className={cn(
          'my-4 opacity-30 bg-current',
          'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full',
          'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        )}
        decorative
      />
      <p className="text-sm text-center">
        © 2026 Mariana Martins Menezes. Frontend & Design Engineer and eternal
        learner.
      </p>
      <p className="mt-2 text-sm text-center">
        <a
          href={PATHS.siteBuild}
          className={cn(
            'inline-flex items-center min-h-[44px] rounded-sm',
            'underline underline-offset-4 decoration-1 hover:decoration-2',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-focus',
          )}
        >
          How this site was built
        </a>
      </p>
    </footer>
  );
}
