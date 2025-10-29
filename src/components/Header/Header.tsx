import React from "react";

import logo from "@/assets/logo.png";

function Header(): React.JSX.Element {
  return (
    <header className="col-span-2 py-12 self-center">
      <div className="flex flex-row items-center relative">
        <div className="basis-1/2 relative max-w-32 max-h-32 bg-warm-300 border-4 border-pink dark:border-blue-100 rounded-md flex items-center justify-center px-1 py-4 mr-8">
          <img
            src={logo}
            alt="Mariana Martins Logo"
            className="w-full object-scale-down"
          />
        </div>
        <div className="basis-2/2 text-text-primary dark:text-text-primary-dark ">
          <h1 className="text-4xl font-bold font-heading tracking-[0.25rem] text-heading uppercase">
            Mariana Martins Menezes
          </h1>
          <h2 className="mt-2 text-xl tracking-widest">Frontend Engineer</h2>
          <a
            href="mailto:marianamartinsmenezes@gmail.com"
            className="inline-block absolute bottom-0 right-1 px-4 py-2 bg-pink text-warm-50 rounded-xl font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2"
            aria-label="Send email to Mariana Martins Menezes"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
