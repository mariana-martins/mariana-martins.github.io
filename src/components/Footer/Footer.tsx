import React from 'react';

import { Separator } from '@radix-ui/react-separator';

import { cn } from '@/lib/cn';

function Footer(): React.JSX.Element {
  return (
    <footer
      className={cn(
        'col-start-1 h-fit py-17',
        'text-text-primary dark:text-text-primary-dark',
      )}
    >
      <h3 className="text-lg mb-4 text-center">
        Not all those who wander are lost. Some are just debugging.
      </h3>
      <Separator
        className={cn(
          'my-4 opacity-30 bg-current',
          'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full',
          'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        )}
        decorative
      />
      <p className="text-sm text-center">
        © 2026 Mariana Martins Menezes. Frontend & Design engineer and eternal
        learner.
      </p>
    </footer>
  );
}

export default Footer;
