import React from "react";

import * as Accordion from "@radix-ui/react-accordion";
import Tag from "@components/Tag";
import clsx from "clsx";
import { ChevronDown, ExternalLink, Star } from "lucide-react";

import { data } from "@/data";
import { formatDate } from "@/lib/utils";
import type { Experience as ExperienceType } from "@/types";

import { Card } from "../Card";

function TimelineNode(): React.JSX.Element {
  return (
    <div
      className={clsx(
        "absolute left-0 w-8 h-8 rounded-full z-10",
        "flex items-center justify-center",
        "bg-pink dark:bg-blue-100",
        "ring-4 ring-warm-100/80 dark:ring-indigo-50/80",
        "transition-all duration-300 ease-out",
        "group-hover:ring-pink/50 dark:group-hover:ring-blue-100/50",
        "group-hover:scale-110",
      )}
    >
      <Star size={16} className="text-text-primary " aria-hidden="true" />
    </div>
  );
}

function ExperienceCard({
  experience,
}: {
  experience: ExperienceType;
}): React.JSX.Element {
  const dateRange = `${formatDate(experience.startDate)} - ${experience.endDate ? formatDate(experience.endDate) : "Present"}`;

  return (
    <div className="relative pl-12 pb-8 last:pb-0 group">
      <TimelineNode />

      <Card
        asChild
        variant="interactive"
        className="p-0 transition-all duration-300 hover:shadow-[0_4px_20px_hsl(356_75%_78%/0.2)] dark:hover:shadow-[0_4px_20px_hsl(200_57%_84%/0.2)] data-[state=open]:border-pink/70 dark:data-[state=open]:border-blue-100/70"
      >
        <Accordion.Item value={experience.id}>
          <Accordion.Header asChild>
            <h4>
              <Accordion.Trigger
                className={clsx(
                  "w-full p-3 md:p-4 text-left",
                  "flex flex-col gap-1",
                  "cursor-pointer",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  "focus-visible:ring-pink dark:focus-visible:ring-blue-100",
                  "group/trigger",
                  "min-h-[44px]",
                )}
                aria-label={`${experience.position} at ${experience.company}, ${dateRange}. Click to ${experience.id === "expanded" ? "collapse" : "expand"} details.`}
              >
                <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between md:gap-2 w-full">
                  <div className="flex-1 min-w-0">
                    <span className="text-base md:text-lg font-bold block leading-tight">
                      {experience.position}
                    </span>
                    <span className="text-sm md:text-base">
                      {experience.company}
                    </span>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-2 mt-1 md:mt-0">
                    <span className="text-xs md:text-sm text-text-primary/70 dark:text-text-primary-dark/70">
                      {dateRange}
                    </span>
                    <ChevronDown
                      size={20}
                      className={clsx(
                        "shrink-0 transition-transform duration-300",
                        "group-data-[state=open]/trigger:rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Accordion.Trigger>
            </h4>
          </Accordion.Header>

          <Accordion.Content
            className={clsx(
              "overflow-hidden",
              "data-[state=open]:animate-accordion-down",
              "data-[state=closed]:animate-accordion-up",
            )}
          >
            <div className="px-3 md:px-4 pb-3 md:pb-4">
              {experience.website && (
                <a
                  href={experience.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    "inline-flex items-center gap-1 mb-3 text-sm",
                    "text-pink dark:text-blue-100",
                    "hover:underline",
                    "focus:outline-none focus-visible:underline focus-visible:ring-2 focus-visible:ring-offset-2",
                    "focus-visible:ring-pink dark:focus-visible:ring-blue-100",
                    "transition-colors",
                  )}
                  aria-label={`Visit ${experience.company} website (opens in new tab)`}
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  Visit company website
                </a>
              )}

              <ul className="hidden md:block text-sm/6 mb-4 list-disc list-inside space-y-2">
                {experience.description.map((paragraph) => (
                  <li
                    key={`${experience.id}-${paragraph.substring(0, 30)}`}
                    className="text-text-primary/90 dark:text-text-primary-dark/90"
                  >
                    {paragraph}
                  </li>
                ))}
              </ul>

              <div
                className="flex flex-wrap gap-2"
                role="list"
                aria-label="Technologies used"
              >
                {experience.technologies.map((tech, techIndex) => (
                  <span key={tech} role="listitem">
                    <Tag name={tech} index={techIndex} />
                  </span>
                ))}
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Card>
    </div>
  );
}

function Experience(): React.JSX.Element {
  return (
    <section
      className="col-start-1 md:row-start-2 text-text-primary dark:text-text-primary-dark border-r-dashed-custom h-auto self-stretch pt-8 md:pb-8"
      aria-labelledby="experience-heading"
    >
      <h3 id="experience-heading" className="text-xl font-semibold mb-6">
        Past Chapters
      </h3>

      <div className="relative">
        <div
          className="absolute left-4 top-4 bottom-4 w-0.5 bg-pink/40 dark:bg-blue-100/40"
          aria-hidden="true"
        />

        <Accordion.Root
          type="single"
          collapsible
          defaultValue={data.experience[0]?.id}
          className="flex flex-col"
        >
          {data.experience.map((experience: ExperienceType) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}

export default Experience;
