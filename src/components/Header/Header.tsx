import React from "react";

import logo from "@/assets/logo.png";

function Header(): React.JSX.Element {
  return (
    <header className="w-full pt-12 pb-8 gap-x-8 self-center relative flex flex-col lg:flex-row items-center justify-center lg:justify-space-between">
      <div className="relative max-w-24 max-h-24 md:max-w-36 md:max-h-36 bg-warm-300 border-4 border-pink rounded-md px-1 py-4 mb-8 lg:mb-0 dark:bg-transparent dark:border-blue-100 dark:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_8px_hsl(200_57%_84%),0_0_15px_hsl(200_57%_84%),0_0_30px_hsl(200_57%_84%)]">
        <img
          src={logo}
          alt="Mariana Martins Logo"
          className="w-fit object-scale-down"
        />
      </div>
      <div className=" text-text-primary dark:text-text-primary-dark">
        <h1 className="text-2xl lg:text-5xl font-bold font-heading tracking-[0.25rem] text-heading uppercase lg:text-left text-center">
          Mariana Martins Menezes
        </h1>
        <h2 className="mt-2 text-xl lg:text-2xl tracking-widest lg:text-left text-center">
          Frontend Engineer
        </h2>
      </div>
    </header>
  );
}

export default Header;
