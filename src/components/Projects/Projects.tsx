import * as React from "react";

import Tag from "@components/Tag";
import clsx from "clsx";
import { ExternalLink } from "lucide-react";

import { data } from "@/data";
import type { Project } from "@/types";

const projectCardClasses = clsx(
  // Layout
  "relative group flex flex-col gap-3 md:gap-4 p-3 md:p-4",
  "w-full md:w-auto md:flex-1 min-h-[280px]",
  // Background and backdrop
  "bg-warm-100/50 dark:bg-indigo-50/30",
  "backdrop-blur-md rounded-lg",
  // Border
  "border border-pink/30 dark:border-blue-100/30",
  // Transitions and animations
  "transition-all duration-300 ease-out",
  "motion-safe:hover:-translate-y-1",
  // Hover states
  "hover:border-pink/70 dark:hover:border-blue-100/70",
  "hover:shadow-[0_8px_30px_hsl(356_75%_78%_/_0.4),0_4px_20px_0_rgba(0,0,0,0.12)]",
  "dark:hover:shadow-[0_8px_30px_hsl(200_57%_84%_/_0.5),0_4px_20px_0_rgba(0,0,0,0.3)]",
  "hover:bg-warm-100/70 dark:hover:bg-indigo-50/40",
  // Active/pressed state for mobile
  "active:shadow-[0_2px_10px_hsl(356_75%_78%_/_0.3)]",
  "dark:active:shadow-[0_2px_10px_hsl(200_57%_84%_/_0.4)]",
  // Focus states
  "focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2",
  "focus-visible:ring-[var(--color-pink)]",
  "dark:focus-visible:ring-[var(--color-blue-100)]",
  // Touch optimization
  "touch-manipulation",
);

function Projects(): React.JSX.Element {
  const projectCount = data.projects.length;

  return (
    <section
      className="col-start-1 text-text-primary dark:text-text-primary-dark h-fit py-4 md:py-8"
      aria-labelledby="projects-heading"
    >
      <h3 id="projects-heading" className="text-2xl mb-4">
        Projects
      </h3>
      <ul
        className="flex flex-col md:flex-row gap-4 md:gap-6 justify-between"
        role="list"
        aria-label="Project portfolio"
      >
        {data.projects.map((project: Project, index: number) => {
          const projectNumber = index + 1;
          const techStackSummary = project.technologies.join(", ");

          return (
            <li key={project.id} role="listitem">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} project on GitHub. Project ${projectNumber} of ${projectCount}. Built with ${techStackSummary}`}
                aria-describedby={`project-${project.id}-desc`}
                className={projectCardClasses}
              >
                {/* External link indicator */}
                <div
                  className={clsx(
                    "absolute top-3 right-3 z-10 p-1.5 rounded-full",
                    "bg-pink/80 dark:bg-blue-100/80 backdrop-blur-sm",
                    "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                    "transition-opacity duration-300",
                  )}
                  aria-hidden="true"
                >
                  <ExternalLink
                    size={16}
                    className="text-text-primary dark:text-text-primary-dark"
                  />
                </div>

                {/* Image with overlay gradient */}
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={`https://picsum.photos/seed/${project.id}/400/200`}
                    alt=""
                    role="presentation"
                    className="w-full h-40 md:h-48 object-cover"
                    loading="lazy"
                  />
                  <div
                    className={clsx(
                      "absolute inset-0 bg-gradient-to-t",
                      "from-pink/20 to-transparent dark:from-blue-100/20",
                      "opacity-0 group-hover:opacity-100",
                      "transition-opacity duration-300",
                    )}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 flex-1">
                  <h4
                    id={`project-${project.id}-title`}
                    className="text-base md:text-lg font-bold text-center"
                  >
                    {project.title}
                  </h4>

                  <p
                    id={`project-${project.id}-desc`}
                    className="hidden lg:block text-xs md:text-sm/6 text-center md:text-left"
                  >
                    {project.description}
                  </p>

                  {/* Technology tags */}
                  <ul
                    className="flex flex-wrap gap-2 justify-center lg:justify-start w-full mt-auto"
                    aria-label={`Technologies used: ${techStackSummary}`}
                  >
                    {project.technologies.map(
                      (technology: string, techIndex: number) => (
                        <li key={technology}>
                          <Tag name={technology} index={techIndex} />
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                {/* Screen reader only context */}
                <span className="sr-only">
                  Opens in a new window. External site.
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Projects;
