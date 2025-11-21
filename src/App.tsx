import React from "react";

import AboutMe from "@components/AboutMe";
import ContactInfo from "@components/ContactInfo";
import Experience from "@components/Experience";
import Footer from "@components/Footer/Footer";
import FunFacts from "@components/FunFacts/FunFacts";
import Header from "@components/Header";
import ProfileImage from "@components/ProfileImage/ProfileImage";
import Projects from "@components/Projects/Projects";
import Skills from "@components/Skills/Skills";
import SkipLink from "@components/SkipLink";
import ThemeToggle from "@components/ThemeToggle";
import "@styles/index.css";

function App(): React.JSX.Element {
  return (
    <div className="relative min-h-screen max-w-6xl mx-auto flex flex-col gap-4 px-16 justify-center items-center">
      <ThemeToggle />
      <SkipLink targetId="about-me-heading" />
      <Header />
      <main
        id="main-content"
        className="w-full h-full py-10 px-18 rounded-2xl bg-white/50 backdrop-blur-md supports-[backdrop-filter]:bg-white/40 ring-1 ring-slate-900/10 shadow-lg dark:bg-white/10 dark:backdrop-blur-md dark:ring-1 dark:ring-white/10 dark:shadow-lg dark:shadow-black/20"
      >
        <div className="grid grid-cols-[3fr_1fr] gap-y-8 items-stretch h-full border-b-dashed-custom">
          <AboutMe />
          <ProfileImage />
          <Experience />
          <div className="col-start-2 row-start-2 self-stretch flex flex-col h-full">
            <ContactInfo />
            <Skills />
            <FunFacts />
          </div>
        </div>
        <Projects />
      </main>
      <Footer />
      <SkipLink
        targetId="about-me-heading"
        position="bottom"
        label="Back to About Me"
      />
    </div>
  );
}

export default App;
