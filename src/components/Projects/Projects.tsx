import * as React from "react";

import Tag from "@components/Tag";

import { data } from "@/data";
import type { Project } from "@/types";

const projectCardClasses = [
  "flex flex-col gap-4 p-4",
  "bg-warm-100/50 dark:bg-indigo-50/30",
  "backdrop-blur-md rounded-lg",
  "border border-pink/30 dark:border-blue-100/30",
  "hover:border-pink/70 dark:hover:border-blue-100/70",
  "hover:shadow-[0_0_20px_hsl(356_75%_78%_/_0.5),0_4px_16px_0_rgba(0,0,0,0.1)]",
  "dark:hover:shadow-[0_0_20px_hsl(200_57%_84%_/_0.6),0_4px_16px_0_rgba(0,0,0,0.3)]",
].join(" ");

function Projects(): React.JSX.Element {
  return (
    <section className="col-start-1 text-text-primary dark:text-text-primary-dark h-fit py-8">
      <h3 className="text-2xl mb-4 ">Projects</h3>
      <div className="flex flex-row gap-8 justify-between h-full ">
        {data.projects.map((project: Project) => (
          <div key={project.id} className={projectCardClasses}>
            <div className="h-20 w-full bg-warm-200/40 dark:bg-indigo-50/30 rounded-sm flex items-center justify-center text-center border-2 border-warm-50">
              <h4 className="text-lg font-bold mb-1 text-center">
                {project.title}
              </h4>
            </div>
            <p className="text-sm/6">{project.description}</p>
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((technology: string, index: number) => (
                <li key={technology}>
                  <Tag name={technology} index={index} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
