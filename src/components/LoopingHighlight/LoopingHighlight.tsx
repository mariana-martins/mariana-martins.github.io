import React from "react";

import { motion } from "motion/react";

const LoopingHighlight = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  const colors = [
    "var(--color-highlight-red)",
    "var(--color-highlight-orange)",
    "var(--color-highlight-yellow)",
    "var(--color-highlight-green)",
    "var(--color-highlight-blue)",
    "var(--color-highlight-indigo)",
    "var(--color-highlight-violet)",
  ];

  return (
    <span className="relative inline-block px-1">
      <motion.span
        autoFocus
        className="absolute inset-0 -z-10 bottom-1 h-[60%] my-auto rounded-sm opacity-50 dark:opacity-80"
        animate={{
          backgroundColor: colors,
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          // Adding a slight skew or rotation makes it feel hand-drawn
          transform: "rotate(-1deg) skewX(-2deg)",
        }}
      />

      <span className="relative z-10 font-medium font-highlight  text-base md:text-lg tracking-wider text-text-primary dark:text-text-primary-dark">
        {children}
      </span>
    </span>
  );
};

export default LoopingHighlight;
