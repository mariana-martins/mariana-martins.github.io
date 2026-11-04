import React from 'react';

import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/cn';

type ButtonLinkVariant = 'primary' | 'secondary';

const variants: Record<ButtonLinkVariant, string> = {
  primary: cn(
    'bg-pink text-text-primary hover:bg-pink/80',
    'dark:bg-blue-100 dark:text-blue-300 dark:hover:bg-blue-100/85',
  ),
  secondary: cn(
    'border-2 border-text-primary/70 text-text-primary hover:bg-warm-100/60',
    'dark:border-text-primary-dark/70 dark:text-text-primary-dark dark:hover:bg-white/10',
  ),
};

export interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonLinkVariant;
  icon?: LucideIcon;
}

/** A link styled as a button: it navigates, so it stays an <a> */
export function ButtonLink({
  variant = 'primary',
  icon: Icon,
  className,
  children,
  ...props
}: ButtonLinkProps): React.JSX.Element {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-full',
        'text-sm font-medium transition-colors duration-200 touch-manipulation',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-focus',
        variants[variant],
        className,
      )}
      {...props}
    >
      {Icon && <Icon size={16} aria-hidden="true" />}
      {children}
    </a>
  );
}
