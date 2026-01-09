import React from "react";

import { data } from "@/data";
import type { FunFact } from "@/types";

function FunFacts(): React.JSX.Element {
  return (
    <section
      className="w-full h-full flex flex-col items-center justify-center gap-6 p-8 text-text-primary dark:text-text-primary-dark"
      aria-labelledby="fun-facts-heading"
    >
      <h3 id="fun-facts-heading" className="text-2xl">
        Fun Facts
      </h3>
      <ul className="w-fit h-fit flex flex-col gap-6">
        {data.funFacts.map((funFact: FunFact) => (
          <li
            key={funFact.id}
            className="text-base break-words w-full max-w-[350px] flex-wrap lg:max-w-full"
          >
            {funFact.fact}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FunFacts;
