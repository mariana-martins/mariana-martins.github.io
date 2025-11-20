import React from "react";

import logo from "@/assets/logo.png";

function Header(): React.JSX.Element {
  return (
    <header className="col-span-2 py-12 self-center">
      <div className="flex flex-row items-center relative">
        <div className="basis-1/2 relative max-w-36 max-h-36 bg-warm-300 border-4 border-pink rounded-md flex items-center justify-center px-1 py-4 mr-8 dark:bg-transparent dark:border-blue-100 dark:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_8px_hsl(200_57%_84%),0_0_15px_hsl(200_57%_84%),0_0_30px_hsl(200_57%_84%)]">
          <img
            src={logo}
            alt="Mariana Martins Logo"
            className="w-full object-scale-down"
          />
        </div>
        <div className="basis-2/2 text-text-primary dark:text-text-primary-dark">
          <h1 className="text-5xl font-bold font-heading tracking-[0.25rem] text-heading uppercase">
            Mariana Martins Menezes
          </h1>
          <h2 className="mt-2 text-2xl tracking-widest">Frontend Engineer</h2>
        </div>
      </div>
    </header>
  );
}

export default Header;
