import React from "react";

import AboutMe from "@components/AboutMe";
import ContactInfo from "@components/ContactInfo";
import Experience from "@components/Experience";
import FunFacts from "@components/FunFacts/FunFacts";
import Header from "@components/Header";
import ProfileImage from "@components/ProfileImage/ProfileImage";
import Skills from "@components/Skills/Skills";
import "@styles/index.css";

function App(): React.JSX.Element {
  return (
    <div className="min-h-screen max-w-6xl mx-auto grid grid-cols-2 auto-rows-auto gap-4 px-16 place-content-center place-items-center">
      <Header />
      <main className="col-span-2 w-full h-full py-10 px-18 rounded-2xl bg-white/50 backdrop-blur-md supports-[backdrop-filter]:bg-white/40 ring-1 ring-slate-900/10 shadow-lg dark:bg-white/10 dark:backdrop-blur-md dark:ring-1 dark:ring-white/10 dark:shadow-lg dark:shadow-black/20">
        <div className="grid grid-cols-[2fr_1fr] gap-y-8 items-stretch auto-rows-auto ">
          <AboutMe />
          <ProfileImage />
          <Experience />
          <div className="col-start-2 row-start-2">
            <ContactInfo />
            <Skills />
            <FunFacts />
          </div>
          <section>Projects</section>
        </div>
      </main>
      <footer className="col-span-2">Footer</footer>
    </div>
  );
}

export default App;
