import * as React from "react";

import {
  Card,
  CardContent,
  CardDecoration,
  CardFooter,
  CardHeader,
} from "@components/Card";
import Tag from "@components/Tag";
import clsx from "clsx";
import { ExternalLink, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { data } from "@/data";
import type { Project } from "@/types";

const projectDecorations: Record<
  string,
  {
    shape: "blob" | "wave" | "diagonal";
    color: "violet" | "blue" | "green";
  }
> = {
  "fit-my-space": { shape: "blob", color: "violet" },
  "frontend-practice-abstract": { shape: "wave", color: "blue" },
  "contact-app": { shape: "diagonal", color: "green" },
};

interface ProjectCardProps {
  project: Project;
  index: number;
  isFeatured: boolean;
  projectCount: number;
}

function ProjectCard({
  project,
  index,
  isFeatured,
  projectCount,
}: ProjectCardProps): React.JSX.Element {
  const projectNumber = index + 1;
  const techStackSummary = project.technologies.join(", ");
  const decoration = projectDecorations[project.id] || {
    shape: "blob" as const,
    color: "violet" as const,
  };

  // Show more tags for featured card
  const visibleTechnologies = isFeatured
    ? project.technologies
    : project.technologies.slice(0, 3);
  const hiddenCount = project.technologies.length - visibleTechnologies.length;

  return (
    <motion.a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${project.title} project on GitHub. Project ${projectNumber} of ${projectCount}. Built with ${techStackSummary}`}
      aria-describedby={isFeatured ? `project-${project.id}-desc` : undefined}
      className="block h-full"
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Card
        variant="interactive"
        size={isFeatured ? "lg" : "md"}
        className={clsx(
          "h-full flex flex-col",
          isFeatured ? "min-h-[280px]" : "min-h-[120px]",
        )}
      >
        <CardDecoration
          shape={decoration.shape}
          color={decoration.color}
          position="top-right"
        />

        {isFeatured && (
          <div
            className={clsx(
              "absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full",
              "bg-pink/80 dark:bg-blue-100/80 backdrop-blur-sm",
              "text-xs font-medium text-text-primary ",
            )}
          >
            <Sparkles size={12} aria-hidden="true" />
            <span>Featured</span>
          </div>
        )}

        <div
          className={clsx(
            "absolute z-10 p-2 rounded-full",
            "bg-pink/20 dark:bg-blue-100/20",
            "opacity-60 hover:opacity-100",
            "transition-opacity duration-300",
            isFeatured ? "bottom-4 right-4" : "top-3 right-3",
          )}
          aria-hidden="true"
        >
          <ExternalLink
            size={isFeatured ? 18 : 14}
            className="text-text-primary dark:text-text-primary-dark"
          />
        </div>

        <CardHeader className={clsx("relative z-10", isFeatured && "pt-10")}>
          <h4
            id={`project-${project.id}-title`}
            className={clsx(
              "font-bold text-text-primary dark:text-text-primary-dark",
              isFeatured ? "text-xl md:text-2xl" : "text-sm md:text-base",
            )}
          >
            {project.title}
          </h4>
        </CardHeader>

        <CardContent className="relative z-10">
          {isFeatured && (
            <p
              id={`project-${project.id}-desc`}
              className="text-sm md:text-base/6 text-text-primary/80 dark:text-text-primary-dark/80 mt-2"
            >
              {project.description}
            </p>
          )}
        </CardContent>

        <CardFooter className="relative z-10 flex-wrap">
          {visibleTechnologies.map((technology: string, techIndex: number) => (
            <Tag key={technology} name={technology} index={techIndex} />
          ))}
          {hiddenCount > 0 && (
            <span
              className={clsx(
                "text-xs px-2 py-0.5 rounded-md",
                "bg-pink/20 dark:bg-blue-100/20",
                "text-text-primary/70 dark:text-text-primary-dark/70",
              )}
            >
              +{hiddenCount}
            </span>
          )}
        </CardFooter>

        <span className="sr-only">Opens in a new window. External site.</span>
      </Card>
    </motion.a>
  );
}

function Projects(): React.JSX.Element {
  const projectCount = data.projects.length;

  return (
    <section
      className="w-full text-text-primary dark:text-text-primary-dark py-6 md:py-10"
      aria-labelledby="projects-heading"
    >
      <h3 id="projects-heading" className="text-xl font-semibold mb-6">
        Crafted with Care
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
              className={clsx(
                isFeatured && "md:col-start-1 md:row-span-2 md:row-start-1",
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
