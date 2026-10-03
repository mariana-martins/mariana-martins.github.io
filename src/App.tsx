import React from 'react';

import { AboutMe } from '@components/AboutMe/AboutMe';
import { ContactInfo } from '@components/ContactInfo/ContactInfo';
import { Experience } from '@components/Experience/Experience';
import { Footer } from '@components/Footer/Footer';
import { FunFacts } from '@components/FunFacts/FunFacts';
import { Header } from '@components/Header/Header';
import { LearningShelf } from '@components/LearningShelf/LearningShelf';
import { MargotsPicks } from '@components/MargotsPicks/MargotsPicks';
import { Projects } from '@components/Projects/Projects';
import { SectionNav } from '@components/SectionNav/SectionNav';
import { ThemeToggle } from '@components/ThemeToggle/ThemeToggle';
import '@styles/index.css';
import { MotionConfig } from 'motion/react';

export function App(): React.JSX.Element {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen max-w-6xl mx-8 md:mx-auto flex flex-col gap-2 md:gap-4 md:px-16 justify-center items-center">
        <SectionNav />
        <ThemeToggle />
        <Header />
        <main
          id="main-content"
          className="w-full h-full py-10 px-8 mb:px-18 rounded-2xl glass-panel"
        >
          <div className="grid grid-cols-1 items-center w-full h-full border-b-dashed-custom md:grid-cols-2 md:gap-x-6">
            <AboutMe />
            <Experience />
            <div className="md:col-start-2 md:row-start-2 self-stretch flex flex-col h-full">
              <ContactInfo />
              <FunFacts />
              <LearningShelf />
            </div>
          </div>
          <Projects />
        </main>
        <MargotsPicks />
        <Footer />
      </div>
    </MotionConfig>
  );
}
