import React from "react";

import AboutMe from "./components/AboutMe";
import Header from "./components/Header";
import "./styles/index.css";

function App(): React.JSX.Element {
  return (
    <div className="min-h-screen max-w-6xl mx-auto grid grid-cols-2 auto-rows-auto gap-4 px-16 place-content-center place-items-center">
      <Header />
      <main className="col-span-2 w-full h-full py-16 px-18 rounded-2xl bg-white/50 backdrop-blur-md supports-[backdrop-filter]:bg-white/40 ring-1 ring-slate-900/10 shadow-lg dark:bg-white/10 dark:backdrop-blur-md dark:ring-1 dark:ring-white/10 dark:shadow-lg dark:shadow-black/20">
        <div className="grid grid-cols-2 grid-rows-3 gap-16">
          <AboutMe />
          <div className="col-start-1">
            <section>Experience</section>
            <section>Projects</section>
            <section>Fun Facts</section>
          </div>
          <div className="col-start-2">
            <section>Contact Info</section>
            <section>Skills</section>
          </div>
        </div>
      </main>
      <footer className="col-span-2">Footer</footer>
    </div>
  );
}

export default App;
