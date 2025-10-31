import * as React from "react";

import aboutMeImage from "@/assets/avatar.png";

import { data } from "../../data";

function AboutMe(): React.JSX.Element {
  const { introduction } = data;

  return (
    <section className="col-span-2 text-text-primary dark:text-text-primary-dark border-b-dashed-custom">
      <h3 className="text-2xl mb-2">About Me</h3>
      <div className="flex flex-row items-center-safe">
        <p className="basis-2/3 text-base/7 mr-8">{introduction}</p>
        <div className="basis-1/3">
          <img
            src={aboutMeImage}
            alt="Me and my dog, Margot"
            className="basis-1/3 object-cover shrink-0"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
