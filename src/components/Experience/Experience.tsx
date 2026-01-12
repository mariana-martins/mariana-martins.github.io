import React from "react";

import { data } from "@/data";
import { formatDate } from "@/lib/utils";
import type { Experience as ExperienceType } from "@/types";

function Experience(): React.JSX.Element {
  return (
    <section
      className="col-start-1 md:row-start-2 text-text-primary dark:text-text-primary-dark border-r-dashed-custom  h-fit pt-8 md:pb-8"
      aria-labelledby="experience-heading"
    >
      <h3 id="experience-heading" className="text-2xl mb-4">
        Experience
      </h3>
      <div className="flex flex-col gap-4 justify-between h-full">
        {data.experience.map((experience: ExperienceType) => (
          <div key={experience.id}>
            <h4 className="text-lg font-bold mb-1">
              {experience.position} at {experience.company}
            </h4>
            <p className="text-base font-semibold mb-1">
              {formatDate(experience.startDate)} -{" "}
              {experience.endDate ? formatDate(experience.endDate) : "Present"}
            </p>
            <p className="text-sm/6">{experience.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
