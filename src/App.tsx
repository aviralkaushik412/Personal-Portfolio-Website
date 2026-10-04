import { useEffect } from 'react';
import Lenis from 'lenis';
import { Navigation } from './components/layout/Navigation';
import { Hero } from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Journey from './components/sections/Journey';
import Contact from './components/sections/Contact';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Grain texture overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <Hero />
        
        <div className="section-divider" />
        <About />
        
        <div className="section-divider" />
        <Projects />
        
        <div className="section-divider" />
        <Skills />
        
        <div className="section-divider" />
        <Journey />
        
        <div className="section-divider" />
        <Contact />
      </main>
    </>
  );
}
