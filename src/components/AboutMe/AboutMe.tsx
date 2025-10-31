import * as React from "react";

import aboutMeImage from "@/assets/avatar.png";

function AboutMe(): React.JSX.Element {
  return (
    <section className="col-span-2 text-text-primary dark:text-text-primary-dark border-b-dashed-custom">
      <h3 className="text-2xl mb-2">About Me</h3>
      <div className="flex flex-row items-center-safe">
        <p className="basis-2/3 text-base/7 mr-8">
          Cupcake ipsum dolor sit amet cake. Danish jelly soufflé wafer
          chocolate. Chocolate bar dragée carrot cake jujubes dessert gummi
          bears pastry tiramisu I love. Gummies cheesecake candy sweet I love.
          Danish gummies carrot cake gummi bears muffin. Wafer tootsie roll
          powder jelly beans sugar plum muffin fruitcake bonbon chocolate bar.
          Oat cake bear claw toffee gummies macaroon I love tootsie roll toffee.
          Cookie cupcake cupcake sugar plum tiramisu. Lollipop jelly carrot cake
          powder tiramisu I love brownie sweet roll. Liquorice tootsie roll
          pudding dessert tiramisu lemon drops.
        </p>
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
