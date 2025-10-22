import "./styles/index.css";

function App() {
  return (
    // <div className="min-h-screen bg-background text-foreground">
    //   <main className="container mx-auto px-4 py-8">
    //     <h1 className="text-4xl font-bold text-center mb-8">

    //     </h1>

    //   </main>
    // </div>

    <div className="min-h-screen grid grid-cols-2 grid-rows-3 gap-4">
      <header className="col-span-2">
        <h1 className="text-4xl font-bold font-heading tracking-[0.25rem] text-heading">
          Welcome to Mariana Martins Portfolio
        </h1>
        <h2>Frontend Engineer</h2>
      </header>
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
