import React from 'react';

import LoopingHighlight from '@components/LoopingHighlight/';
import { motion, useReducedMotion } from 'motion/react';

import aboutMeImage from '@/assets/avatar.png';
import { data } from '@/data';

function AboutMe(): React.JSX.Element {
  const { introduction } = data;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="col-start-1 h-full text-text-primary dark:text-text-primary-dark md:col-span-full md:row-start-1 px-2 md:pb-0 border-b-dashed-custom"
      aria-labelledby="about-me-heading"
    >
      <div className="flex flex-col gap-8 md:gap-12 md:flex-row md:items-center py-8 md:py-12">
        {/* Text Content */}
        <motion.div
          className="flex-1 order-2 md:order-1 flex flex-col gap-4"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3
            id="about-me-heading"
            className="text-2xl md:text-3xl font-bold font-heading self-start text-balance"
          >
            A Little Bit of Everything
          </h3>
          <p className="text-base/7 md:text-lg/8 tracking-wide text-pretty font-light">
            Hi! I’m Mariana, but you can call me{' '}
            <LoopingHighlight>Mari</LoopingHighlight>, like all my Brazilian
            friends do. {introduction}
          </p>
        </motion.div>

        {/* Image Content */}
        <div className="order-1 md:order-2 self-center md:self-auto">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={aboutMeImage}
              alt="Me and my dog, Margot, a very fluffy white dog!"
              fetchPriority="high"
              className="w-48 h-48 md:w-64 md:h-64 object-cover shape-blob bg-linear-to-tr from-warm-400 via-warm-200 to-pink dark:from-purple dark:to-blue-50"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
