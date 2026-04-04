import * as React from 'react';

import { SECTIONS } from '@/constants';
import { data } from '@/data';
import { cn } from '@/lib/cn';
import type { Project } from '@/types';

import { ProjectCard } from './ProjectCard';

function Projects(): React.JSX.Element {
  const projectCount = data.projects.length;

  return (
    <section
      className="w-full text-text-primary dark:text-text-primary-dark px-2 py-12"
      aria-labelledby="projects-heading"
    >
      <h3
        id="projects-heading"
        tabIndex={-1}
        className="text-xl font-semibold mb-6"
      >
        {SECTIONS.projects.label}
      </h3>

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
              <ProjectCard
                project={project}
                index={index}
                isFeatured={isFeatured}
                projectCount={projectCount}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Projects;
