import { Nav } from './components/sections/Nav';
import { Hero } from './components/sections/Hero';
import { ParticleCanvas } from './components/ui/ParticleCanvas';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';

export default function App() {
  return (
    <>
      <ParticleCanvas />
      <Nav />
      <main>
        <Hero />
        <div className="border-t border-[var(--color-border)]" />
        <About />
        <div className="border-t border-[var(--color-border)]" />
        <Experience />
        <div className="border-t border-[var(--color-border)]" />
        <Education />
        <div className="border-t border-[var(--color-border)]" />
        <Projects />
        <div className="border-t border-[var(--color-border)]" />
        <Contact />
      </main>
      <footer className="px-6 py-8 max-w-5xl mx-auto border-t border-[var(--color-border)]">
        <p className="text-xs font-mono text-[var(--color-muted)]">
          © {new Date().getFullYear()} John Fredrick N. Lim
        </p>
      </footer>
    </>
  );
}
