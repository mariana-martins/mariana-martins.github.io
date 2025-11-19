import React from "react";

import { data } from "@/data";

function AboutMe(): React.JSX.Element {
  const { introduction } = data;

  return (
    <section
      className="col-1 text-text-primary dark:text-text-primary-dark h-full content-around"
      aria-labelledby="about-me-heading"
    >
      <h3 id="about-me-heading" className="text-2xl mb-4">
        About Me
      </h3>
      <p className="text-base/7">{introduction}</p>
    </section>
  );
}

export default AboutMe;
