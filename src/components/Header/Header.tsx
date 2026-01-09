import React from "react";

import { motion, useReducedMotion } from "motion/react";

import logo from "@/assets/logo.png";

function Header(): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const name = "Mariana Martins Menezes";

  // Split name into characters, preserving spaces
  const characters = name.split("");

  // Animation variants for the logo
  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
        duration: 0.6,
      },
    },
  };

  // Animation variants for the name container
  const nameContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2,
      },
    },
  };

  // Animation variants for each letter
  const letterVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
      },
    },
  };

  // Animation variants for subtitle
  const subtitleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 1,
        duration: 0.5,
      },
    },
  };

  // Reduced motion variants (simple fade-in or instant)
  const reducedMotionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <header className="w-full pt-12 pb-8 gap-x-8 self-center relative flex flex-col lg:flex-row items-center justify-center lg:justify-space-between">
      <motion.div
        className="relative max-w-24 max-h-24 md:max-w-36 md:max-h-36 bg-warm-300 border-4 border-pink rounded-md px-1 py-4 mb-8 lg:mb-0 dark:bg-transparent dark:border-blue-100 dark:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_8px_hsl(200_57%_84%),0_0_15px_hsl(200_57%_84%),0_0_30px_hsl(200_57%_84%)]"
        initial="hidden"
        animate="visible"
        variants={prefersReducedMotion ? reducedMotionVariants : logoVariants}
      >
        <img
          src={logo}
          alt="Mariana Martins Logo"
          className="w-fit object-scale-down"
        />
      </motion.div>
      <div className=" text-text-primary dark:text-text-primary-dark">
        <h1 className="text-2xl lg:text-5xl font-bold font-heading tracking-[0.25rem] text-heading uppercase lg:text-left text-center">
          {prefersReducedMotion ? (
            <motion.span
              initial="hidden"
              animate="visible"
              variants={reducedMotionVariants}
            >
              {name}
            </motion.span>
          ) : (
            <motion.span
              initial="hidden"
              animate="visible"
              variants={nameContainerVariants}
              className="inline-block"
            >
              {characters.map((char, index) => (
                <motion.span
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${char}-${index}`}
                  variants={letterVariants}
                  className="inline-block"
                  style={{ display: char === " " ? "inline" : "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          )}
        </h1>
        <motion.h2
          className="mt-2 text-xl lg:text-2xl tracking-widest lg:text-left text-center"
          initial="hidden"
          animate="visible"
          variants={
            prefersReducedMotion ? reducedMotionVariants : subtitleVariants
          }
        >
          Frontend Engineer
        </motion.h2>
      </div>
    </header>
  );
}

export default Header;
