import React from 'react';

import { Download } from 'lucide-react';

import { CV, SECTIONS } from '@/constants';
import { data } from '@/data';
import type { Experience as ExperienceType } from '@/types';

import { ExperienceCard } from './ExperienceCard';

export function Experience(): React.JSX.Element {
  return (
    <section
      className="w-full flex flex-col px-2 py-12 text-text-primary dark:text-text-primary-dark border-b-dashed-custom md:border-b-0-dashed-custom md:border-r-dashed-custom"
      aria-labelledby={SECTIONS.experience.id}
    >
      <h2
        id={SECTIONS.experience.id}
        tabIndex={-1}
        className="text-xl font-semibold mb-6"
      >
        {SECTIONS.experience.label}
      </h2>

      <ul data-testid="experience-list" className="flex flex-col ml-[5px] mb-8">
        {data.experience.map((experience: ExperienceType) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </ul>

      <a
        href={CV.href}
        download={CV.fileName}
        className="dashed-action mt-auto"
      >
        <Download size={16} aria-hidden="true" />
        The full history is in my CV (PDF)
      </a>
    </section>
  );
}
