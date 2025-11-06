import * as React from "react";

import { data } from "../../data";

function AboutMe(): React.JSX.Element {
  const { introduction } = data;

  return (
    <section className="col-1 text-text-primary dark:text-text-primary-dark  border-b-dashed-custom  h-full  content-around">
      <h3 className="text-2xl mb-4">About Me</h3>
      <p className="text-base/7">{introduction}</p>
    </section>
  );
}

export default AboutMe;
