import * as React from "react";

import { data } from "@/data";

function Skills(): React.JSX.Element {
  const colorOptions = [
    "bg-blue-50 text-blue-200",
    "bg-warm-400 text-blue-200",
    "bg-warm-200 text-blue-200",
    "bg-green text-blue-200",
    "bg-purple text-blue-200",
  ];

  // Priority order for categories (frontend is most important)
  const categoryPriority: Record<string, number> = {
    frontend: 0,
    tools: 1,
    design: 2,
    backend: 3,
  };

  // Priority order for levels (expert is highest)
  const levelPriority: Record<string, number> = {
    expert: 0,
    advanced: 1,
    intermediate: 2,
    beginner: 3,
  };

  const getColorByPosition = (position: number): string => {
    return colorOptions[position % colorOptions.length];
  };

  /**
   * Sorts skills to prioritize Frontend career relevance.
   * Order: Frontend skills first (by level: expert > advanced > intermediate > beginner),
   * then other categories (by level).
   */
  const sortedSkills = [...data.skills].sort((firstSkill, secondSkill) => {
    const categoryDiff =
      categoryPriority[firstSkill.category] -
      categoryPriority[secondSkill.category];
    const levelDiff =
      levelPriority[firstSkill.level] - levelPriority[secondSkill.level];

    return (
      categoryDiff ||
      levelDiff ||
      firstSkill.name.localeCompare(secondSkill.name)
    );
  });

  return (
    <section
      className="text-text-primary dark:text-text-primary-dark border-b-dashed-custom h-fit flex flex-col items-center px-6"
      aria-labelledby="skills-heading"
    >
      <h3 id="skills-heading" className="text-2xl mt-8 text-center">
        Skills
      </h3>
      <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center bg-warm-100/50 dark:bg-indigo-50/30 rounded-sm mt-4 mb-8 ml-5 w-full items-center px-4 py-6">
        {sortedSkills.map((skill, position) => (
          <span
            key={skill.name}
            className={`text-sm px-3 py-1 rounded-md ${getColorByPosition(position)}`}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </section>
  );
}

export default Skills;
