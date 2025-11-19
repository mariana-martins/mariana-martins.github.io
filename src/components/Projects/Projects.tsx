import * as React from "react";

import Tag from "@components/Tag";

import { data } from "@/data";
import type { Project } from "@/types";

const projectCardClasses = [
  // Layout
  "flex flex-col gap-4 p-4",
  // Background and backdrop
  "bg-warm-100/50 dark:bg-indigo-50/30",
  "backdrop-blur-md rounded-lg",
  // Border
  "border border-pink/30 dark:border-blue-100/30",
  // Hover states
  "hover:border-pink/70 dark:hover:border-blue-100/70",
  "hover:shadow-[0_0_20px_hsl(356_75%_78%_/_0.5),0_4px_16px_0_rgba(0,0,0,0.1)]",
  "dark:hover:shadow-[0_0_20px_hsl(200_57%_84%_/_0.6),0_4px_16px_0_rgba(0,0,0,0.3)]",
  // Focus states - matching SkipLink colors
  "focus:outline-none focus:ring-2 focus:ring-offset-2",
  "focus:ring-[var(--color-pink)]",
  "dark:focus:ring-[var(--color-blue-100)]",
].join(" ");

function Projects(): React.JSX.Element {
  return (
    <section
      className="col-start-1 text-text-primary dark:text-text-primary-dark h-fit py-8"
      aria-labelledby="projects-heading"
    >
      <h3 id="projects-heading" className="text-2xl mb-4 ">
        Projects
      </h3>
      <div className="flex flex-row gap-8 justify-between h-full ">
        {data.projects.map((project: Project) => {
          return (
            <a
              key={project.id}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className={`${projectCardClasses} `}
            >
              <div className="h-20 w-full bg-warm-200/40 dark:bg-indigo-50/30 rounded-sm flex items-center justify-center text-center border-2 border-warm-50">
                <h4
                  id={`project-${project.id}-title`}
                  className="text-lg font-bold mb-1 text-center"
                >
                  {project.title}
                </h4>
              </div>
              <p className="text-sm/6">{project.description}</p>
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map(
                  (technology: string, index: number) => (
                    <li key={technology}>
                      <Tag name={technology} index={index} />
                    </li>
                  ),
                )}
              </ul>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default Projects;
