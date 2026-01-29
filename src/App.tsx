import React from "react";

import AboutMe from "@components/AboutMe";
import ContactInfo from "@components/ContactInfo";
import Experience from "@components/Experience";
import Footer from "@components/Footer/Footer";
import FunFacts from "@components/FunFacts/FunFacts";
import Header from "@components/Header";
import Projects from "@components/Projects/Projects";
import SkipLink from "@components/SkipLink";
import ThemeToggle from "@components/ThemeToggle";
import "@styles/index.css";
import { MotionConfig } from "motion/react";

function App(): React.JSX.Element {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen max-w-6xl mx-8 md:mx-auto flex flex-col gap-2 md:gap-4 md:px-16 justify-center items-center">
        <ThemeToggle />
        <SkipLink targetId="about-me-heading" />
        <Header />
        <main
          id="main-content"
          className="w-full h-full py-10 px-8 mb:px-18 rounded-2xl bg-white/50 backdrop-blur-md supports-backdrop-filter:bg-white/40 ring-1 ring-slate-900/10 shadow-lg dark:bg-white/10 dark:backdrop-blur-md dark:ring-1 dark:ring-white/10 dark:shadow-lg dark:shadow-black/20"
        >
          <div className="grid grid-cols-1 items-center w-full h-full border-b-dashed-custom md:grid-cols-2 md:gap-x-6">
            <AboutMe />
            <Experience />
            <div className="md:col-start-2 md:row-start-2 self-stretch flex flex-col h-full">
              <ContactInfo />
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
    </MotionConfig>
  );
}

export default App;
