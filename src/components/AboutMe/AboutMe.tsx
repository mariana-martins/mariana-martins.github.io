import React from "react";

import LoopingHighlight from "@components/LoopingHighlight/";

import aboutMeImageDark from "@/assets/darkAvatar.png";
import aboutMeImageLight from "@/assets/lightAvatar.png";
import { data } from "@/data";
import { useTheme } from "@/hooks/useTheme";

function AboutMeProfileImage(): React.JSX.Element {
  const { theme } = useTheme();
  const aboutMeImage = theme === "dark" ? aboutMeImageDark : aboutMeImageLight;

  return (
    <figure className="relative place-self-center w-full text-text-primary dark:text-text-primary-dark md:mx-8">
      <img
        src={aboutMeImage}
        alt="Me and my dog, Margot"
        className="h-full max-h-50 object-cover justify-self-center"
      />
    </figure>
  );
}

function AboutMe(): React.JSX.Element {
  const { introduction } = data;

  return (
    <section
      className="col-start-1 h-full  text-text-primary  dark:text-text-primary-dark md:col-span-full md:row-start-1 md:pb-0 border-b-dashed-custom"
      aria-labelledby="about-me-heading"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[3fr_1fr] md:items-center ">
        <div className="order-1 md:order-2">
          <AboutMeProfileImage />
        </div>

        <div className="order-2 md:order-1">
          <p className="text-sm/4 md:text-base/6 tracking-wide text-justify">
            Hi! I’m Mariana, but you can call me{" "}
            <LoopingHighlight>Mari</LoopingHighlight>, like all my Brazilian
            friends do. {introduction}
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
