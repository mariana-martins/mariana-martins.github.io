import * as React from 'react';

import { ArrowRight } from 'lucide-react';

import { PATHS, SECTIONS } from '@/constants';
import { data } from '@/data';
import { cn } from '@/lib/cn';
import type { Project } from '@/types';

import { ProjectCard } from './ProjectCard';

export function Projects(): React.JSX.Element {
  return (
    <section
      className="w-full text-body px-2 py-12 border-b-dashed-custom"
      aria-labelledby={SECTIONS.projects.id}
    >
      <h2
        id={SECTIONS.projects.id}
        tabIndex={-1}
        className="text-xl font-semibold mb-6"
      >
        {SECTIONS.projects.label}
      </h2>

      <div
        className="grid gap-4 grid-cols-1 md:grid-cols-[1.3fr_1fr] md:grid-rows-2 md:grid-flow-dense"
        role="list"
        aria-label="Project portfolio"
      >
        {data.projects.map((project: Project, index: number) => {
          const isFeatured = index === 0;
          return (
            <div
              key={project.id}
              role="listitem"
              className={cn(
                isFeatured && 'md:col-start-1 md:row-span-2 md:row-start-1',
              )}
            >
              <ProjectCard project={project} isFeatured={isFeatured} />
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-base">
        This site is a project too:{' '}
        <a
          href={PATHS.siteBuild}
          className={cn(
            'inline-flex items-center gap-1.5 min-h-[44px] rounded-sm',
            'link-underline',
            'focus-ring',
          )}
        >
          how it was built
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </p>
    </section>
  );
}
