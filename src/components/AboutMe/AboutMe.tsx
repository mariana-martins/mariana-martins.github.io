import React from 'react';

import LoopingHighlight from '@components/LoopingHighlight/';

import aboutMeImage from '@/assets/avatar.png';
import { data } from '@/data';

function AboutMe(): React.JSX.Element {
  const { introduction } = data;

  return (
    <section
      className="col-start-1 h-full  text-text-primary  dark:text-text-primary-dark md:col-span-full md:row-start-1 md:pb-0 border-b-dashed-custom"
      aria-labelledby="about-me-heading"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[3fr_1fr] md:items-center ">
        <div className="order-1 md:order-2">
          <img
            src={aboutMeImage}
            alt="Me and my dog, Margot, a very fluffy white dog!"
            className="h-full object-cover justify-self-center shape-blob bg-linear-to-tr from-warm-400 via-warm-200 to-pink dark:from-purple dark:to-blue-50"
          />
        </div>

        <div className="order-2 md:order-1">
          <p className="text-sm/4 md:text-base/6 tracking-wide text-justify">
            Hi! I’m Mariana, but you can call me{' '}
            <LoopingHighlight>Mari</LoopingHighlight>, like all my Brazilian
            friends do. {introduction}
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
