import React from 'react';

import type { LucideIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import type { TargetAndTransition } from 'motion/react';

import { cn } from '@/lib/cn';

interface ContactItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  ariaLabel?: string;
  isExternal?: boolean;
  valueClassName?: string;
}

const itemClasses = cn(
  'w-full flex items-center gap-4 p-4 rounded-xl transition-colors duration-300',
  'bg-transparent hover:bg-warm-100/50 dark:hover:bg-white/5',
  'text-text-primary dark:text-text-primary-dark',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  'focus-visible:ring-pink dark:focus-visible:ring-blue-100',
  'group cursor-pointer',
);

const iconContainerClasses = cn(
  'flex items-center justify-center p-2 rounded-lg transition-colors',
  'bg-white/50 dark:bg-white/5',
  'group-hover:bg-white group-hover:shadow-sm dark:group-hover:bg-white/10',
);

export const ContactItem = ({
  icon: Icon,
  label,
  value,
  href,
  ariaLabel,
  isExternal = false,
  valueClassName,
}: ContactItemProps): React.JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  const iconAnimation: TargetAndTransition = prefersReducedMotion
    ? {}
    : {
        scale: [1, 1.1, 1],
        transition: {
          duration: 0.2,
          ease: 'easeInOut',
        },
      };

  // Static item (no link)
  if (!href) {
    return (
      <li>
        <address
          className={cn(
            itemClasses,
            'cursor-default hover:bg-transparent dark:hover:bg-transparent not-italic',
          )}
        >
          <div className={iconContainerClasses}>
            <Icon size={22} className="icon-accent" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted font-medium">{label}</span>
            <span className={cn('text-base font-medium', valueClassName)}>
              {value}
            </span>
          </div>
        </address>
      </li>
    );
  }

  // Interactive link item
  return (
    <li>
      <motion.a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={itemClasses}
        whileHover={prefersReducedMotion ? {} : { x: 4 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        aria-label={ariaLabel}
      >
        <motion.div className={iconContainerClasses} whileHover={iconAnimation}>
          <Icon size={22} className="icon-accent" aria-hidden="true" />
        </motion.div>
        <div className="flex flex-col">
          <span className="text-xs text-muted font-medium">{label}</span>
          <span className={cn('text-base font-medium', valueClassName)}>
            {value}
          </span>
          {isExternal && <span className="sr-only"> (opens in new tab)</span>}
        </div>
      </motion.a>
    </li>
  );
};
