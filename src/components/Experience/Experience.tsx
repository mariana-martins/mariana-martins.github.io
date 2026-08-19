import React from 'react';

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

      <ul data-testid="experience-list" className="flex flex-col">
        {data.experience.map((experience: ExperienceType) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </ul>
    </section>
  );
}

export default Experience;
