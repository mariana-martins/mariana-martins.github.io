import React from "react";

import Header from "./components/Header";
import "./styles/index.css";

function App(): React.JSX.Element {
  return (
    <div className="min-h-screen grid grid-cols-2 grid-rows-3 gap-4 px-16 justify-items-center">
      <Header />
      <main className="col-span-2">
        <div className="grid grid-cols-2 grid-rows-3 gap-4">
          <section className="col-span-2">About Me</section>
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
