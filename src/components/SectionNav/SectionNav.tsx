import React, { useCallback, useRef } from 'react';

import { SECTIONS } from '@/constants';
import { cn } from '@/lib/cn';

function SectionNav(): React.JSX.Element {
  const navRef = useRef<HTMLElement>(null);

  const handleNavigation = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent, targetId: string): void => {
      if (
        event.type === 'click' ||
        (event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Enter' ||
            (event as React.KeyboardEvent).key === ' '))
      ) {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          // Ensure element is focusable
          if (!targetElement.hasAttribute('tabindex')) {
            targetElement.setAttribute('tabindex', '-1');
          }
          targetElement.focus();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    },
    [],
  );

  return (
    <nav
      ref={navRef}
      aria-label="Page sections"
      className={cn(
        'sr-only focus-within:not-sr-only',
        'focus-within:absolute focus-within:top-4 focus-within:left-4 focus-within:z-50',
        'focus-within:p-4 focus-within:rounded-lg',
        'focus-within:bg-warm-100 dark:focus-within:bg-blue-100',
        'focus-within:shadow-lg focus-within:ring-2',
        'focus-within:ring-pink dark:focus-within:ring-blue-200',
      )}
    >
      <h2 className="text-sm font-semibold mb-2 text-text-primary">
        Jump to section:
      </h2>
      <ul className="flex flex-col gap-1" role="list">
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(e) => handleNavigation(e, section.id)}
              onKeyDown={(e) => handleNavigation(e, section.id)}
              className={cn(
                'block px-3 py-1.5 rounded-md text-sm',
                'text-text-primary',
                'hover:bg-pink/20 dark:hover:bg-blue-100/20',
                'focus:outline-none focus-visible:ring-2',
                'focus-visible:ring-pink dark:focus-visible:ring-blue-200',
                'transition-colors duration-150',
              )}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SectionNav;
