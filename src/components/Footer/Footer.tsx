import * as React from "react";

function Footer(): React.JSX.Element {
  return (
    <footer className="col-start-1 text-text-primary dark:text-text-primary-dark h-fit py-17">
      <h3 className="text-lg mb-4 text-center">
        Not all those who wander are lost. Some are just debugging.
      </h3>
      <hr className="my-4 opacity-30" />
      <p className="text-sm text-center">
        © 2025 Mariana Martins Menezes. Frontend engineer and eternal learner.
      </p>
    </footer>
  );
}

export default Footer;
