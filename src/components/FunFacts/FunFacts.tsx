import React from "react";

import { data } from "@/data";
import type { FunFact } from "@/types";

function FunFacts(): React.JSX.Element {
  return (
    <section
      className="text-text-primary dark:text-text-primary-dark p-8 h-full place-content-center"
      aria-labelledby="fun-facts-heading"
    >
      <h3 id="fun-facts-heading" className="text-2xl mb-4">
        Fun Facts
      </h3>
      <ul className="flex flex-col gap-6 not-italic ml-6">
        {data.funFacts.map((funFact: FunFact) => (
          <li key={funFact.id} className="text-base">
            {funFact.fact}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FunFacts;
