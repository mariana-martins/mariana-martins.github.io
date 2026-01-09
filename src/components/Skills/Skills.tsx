import React from "react";

import Tag from "@components/Tag";

import { data } from "@/data";

function Skills(): React.JSX.Element {
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
      className="text-text-primary dark:text-text-primary-dark border-b-dashed-custom h-fit gap-6 flex flex-col items-center justify-evenly p-8"
      aria-labelledby="skills-heading"
    >
      <h3 id="skills-heading" className="text-2xl text-center">
        Skills
      </h3>
      <div className="flex flex-wrap gap-y-4 gap-x-2 justify-center p-4 bg-blue-50/20 dark:bg-indigo-50/30 rounded-sm w-full items-center">
        {sortedSkills.map((skill, position) => (
          <Tag key={skill.name} name={skill.name} index={position} />
        ))}
      </div>
    </section>
  );
}

export default Skills;
