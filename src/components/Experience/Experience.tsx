import React from 'react';

import * as Accordion from '@radix-ui/react-accordion';

import { SECTIONS } from '@/constants';
import { data } from '@/data';
import type { Experience as ExperienceType } from '@/types';

import { ExperienceCard } from './ExperienceCard';

function Experience(): React.JSX.Element {
  return (
    <section
      className="col-start-1 md:row-start-2 text-text-primary dark:text-text-primary-dark border-b-dashed-custom md:border-b-0-dashed-custom md:border-r-dashed-custom flex-1 flex flex-col self-stretch px-2 py-12"
      aria-labelledby="experience-heading"
    >
      <h3
        id="experience-heading"
        tabIndex={-1}
        className="text-xl font-semibold mb-6"
      >
        {SECTIONS.experience.label}
      </h3>

      <div className="relative flex-1 flex flex-col">
        <div
          className="absolute left-4 top-4 bottom-4 w-0.5 bg-pink/40 dark:bg-blue-100/40"
          aria-hidden="true"
        />

        <Accordion.Root
          type="single"
          collapsible
          defaultValue={data.experience[0]?.id}
          className="flex-1 flex flex-col justify-between gap-4"
        >
          {data.experience.map((experience: ExperienceType) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}

export default Experience;
