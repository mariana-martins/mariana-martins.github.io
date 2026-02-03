import React, { useRef } from 'react';

import { motion, useInView, useReducedMotion } from 'motion/react';

const LoopingHighlight = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  const colors = [
    'var(--color-highlight-red)',
    'var(--color-highlight-orange)',
    'var(--color-highlight-yellow)',
    'var(--color-highlight-green)',
    'var(--color-highlight-blue)',
    'var(--color-highlight-indigo)',
    'var(--color-highlight-violet)',
  ];

  // Final resting color after animation
  const finalColor = 'var(--color-highlight-violet)';

  return (
    <span ref={ref} className="relative inline-block px-1">
      <motion.span
        className="absolute inset-0 -z-10 bottom-1 h-[60%] my-auto rounded-sm opacity-50 dark:opacity-80 will-change-bg"
        initial={{ backgroundColor: colors[0] }}
        animate={
          isInView && !prefersReducedMotion
            ? { backgroundColor: [...colors, finalColor] }
            : { backgroundColor: finalColor }
        }
        transition={{
          duration: prefersReducedMotion ? 0 : 3.5,
          ease: 'linear',
        }}
      />

      <span className="relative z-10 font-medium font-highlight text-base md:text-lg tracking-wider text-text-primary dark:text-text-primary-dark">
        {children}
      </span>
    </span>
  );
};

export default LoopingHighlight;
