import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/cn';

type CardVariant = 'default' | 'interactive' | 'accent';
type CardSize = 'sm' | 'md' | 'lg';

interface CardContextValue {
  variant: CardVariant;
  size: CardSize;
}

const CardContext = React.createContext<CardContextValue>({
  variant: 'default',
  size: 'md',
});

const cardVariants: Record<CardVariant, string> = {
  default: cn(
    'bg-warm-100/50 dark:bg-indigo-50/30',
    'border border-pink/30 dark:border-blue-100/30',
  ),
  interactive: cn(
    'bg-warm-100/50 dark:bg-indigo-50/30',
    'border border-pink/30 dark:border-blue-100/30',
    'cursor-pointer',
    'hover:border-pink/70 dark:hover:border-blue-100/70',
    'hover:bg-warm-100/70 dark:hover:bg-indigo-50/40',
    'hover:shadow-[0_4px_20px_hsl(356_75%_78%/0.2)]',
    'dark:hover:shadow-[0_4px_20px_hsl(200_57%_84%/0.2)]',
  ),
  accent: cn(
    'bg-blue-50/20 dark:bg-indigo-50/30',
    'border border-pink/30 dark:border-blue-100/30',
  ),
};

const cardSizes: Record<CardSize, string> = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5 md:p-6',
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  variant?: CardVariant;
  size?: CardSize;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { asChild = false, variant = 'default', size = 'md', className, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <CardContext.Provider value={{ variant, size }}>
        <Comp
          ref={ref}
          className={cn(
            // Base styles
            'relative overflow-hidden',
            'backdrop-blur-md rounded-xl',
            'transition-all duration-300 ease-out',
            // Focus styles
            'focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2',
            'focus-visible:ring-pink dark:focus-visible:ring-blue-100',
            // Variant and size
            cardVariants[variant],
            cardSizes[size],
            className,
          )}
          {...props}
        />
      </CardContext.Provider>
    );
  },
);

Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className={cn('flex flex-col gap-1.5', className)}
        {...props}
      />
    );
  },
);

CardHeader.displayName = 'CardHeader';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return <Comp ref={ref} className={cn('flex-1', className)} {...props} />;
  },
);

CardContent.displayName = 'CardContent';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className={cn('flex items-center gap-2 mt-auto pt-3', className)}
        {...props}
      />
    );
  },
);

CardFooter.displayName = 'CardFooter';

type DecorationShape = 'blob' | 'wave' | 'diagonal';
type DecorationColor = 'violet' | 'blue' | 'green' | 'pink';

const decorationShapes: Record<DecorationShape, string> = {
  blob: 'clip-path-blob',
  wave: 'clip-path-wave',
  diagonal: 'clip-path-diagonal',
};

const decorationColors: Record<DecorationColor, string> = {
  violet:
    'bg-gradient-to-br from-[var(--color-highlight-violet)] to-[var(--color-purple)]',
  blue: 'bg-gradient-to-br from-[var(--color-highlight-blue)] to-[var(--color-blue-100)]',
  green:
    'bg-gradient-to-br from-[var(--color-highlight-green)] to-[var(--color-green)]',
  pink: 'bg-gradient-to-br from-[var(--color-highlight-red)] to-[var(--color-pink)]',
};

export interface CardDecorationProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: DecorationShape;
  color?: DecorationColor;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const CardDecoration = React.forwardRef<HTMLDivElement, CardDecorationProps>(
  (
    {
      shape = 'blob',
      color = 'violet',
      position = 'top-right',
      className,
      ...props
    },
    ref,
  ) => {
    const positionClasses: Record<string, string> = {
      'top-right': 'top-0 right-0',
      'top-left': 'top-0 left-0',
      'bottom-right': 'bottom-0 right-0',
      'bottom-left': 'bottom-0 left-0',
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          'absolute w-24 h-24 md:w-32 md:h-32 opacity-60',
          positionClasses[position],
          decorationShapes[shape],
          decorationColors[color],
          className,
        )}
        {...props}
      />
    );
  },
);

CardDecoration.displayName = 'CardDecoration';

export { Card, CardHeader, CardContent, CardFooter, CardDecoration };
