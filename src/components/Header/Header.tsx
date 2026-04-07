import React from 'react';

import logo from '@/assets/logo.webp';
import { cn } from '@/lib/cn';

function Header(): React.JSX.Element {
  const name = 'Mariana Martins Menezes';

  return (
    <header
      className={cn(
        'w-full pt-12 pb-8 gap-x-8 self-center relative',
        'flex flex-col lg:flex-row items-center justify-center lg:justify-space-between',
      )}
    >
      <div
        className={cn(
          'relative max-w-24 max-h-24 md:max-w-36 md:max-h-36',
          'bg-warm-300 border-4 border-pink rounded-md',
          'px-1 py-4 mb-8 lg:mb-0',
          // Dark mode neon glow effect
          'dark:bg-transparent dark:border-blue-100',
          'dark:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_8px_hsl(200_57%_84%),0_0_15px_hsl(200_57%_84%),0_0_30px_hsl(200_57%_84%)]',
        )}
      >
        <img
          src={logo}
          alt="Mariana Martins Logo"
          width={817}
          height={589}
          className="w-fit object-scale-down"
        />
      </div>

      <div className="text-text-primary dark:text-text-primary-dark">
        <h1
          className={cn(
            'text-2xl lg:text-5xl font-medium font-heading',
            'tracking-[0.25rem] text-heading uppercase',
            'lg:text-left text-center',
            'max-w-[300px] md:max-w-[900px]',
          )}
        >
          {name}
        </h1>
        <h2
          className={cn(
            'mt-2 text-xl lg:text-2xl tracking-widest',
            'lg:text-left text-center',
          )}
        >
          Frontend & Design Engineer
        </h2>
      </div>
    </header>
  );
}

export default Header;
