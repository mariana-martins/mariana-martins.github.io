import React from 'react';

import { AboutMe } from '@components/AboutMe/AboutMe';
import { Contact } from '@components/Contact/Contact';
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

import { MAIN_CONTENT_ID } from '@/constants';

export function App(): React.JSX.Element {
  return (
    <div className="relative min-h-screen max-w-6xl mx-8 md:mx-auto flex flex-col gap-2 md:gap-4 md:px-16 justify-center items-center">
      <SectionNav />
      <ThemeToggle className="md:right-16" />
      <Header />
      <main
        id={MAIN_CONTENT_ID}
        className="w-full h-full py-10 px-8 rounded-2xl glass-panel"
      >
        <AboutMe />
        <Projects />
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 border-b-dashed-custom">
          <Experience />
          <div className="flex flex-col">
            <FunFacts />
            <LearningShelf />
          </div>
        </div>
        <Contact />
      </main>
      <MargotsPicks />
      <Footer />
    </div>
  );
}
