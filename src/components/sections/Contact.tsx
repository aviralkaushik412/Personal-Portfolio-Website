import { useRef } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import { useInView, usePrefersReducedMotion } from '../../hooks/useAnimations';
import { ArrowRight } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(0.1);
  const prefersReducedMotion = usePrefersReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        <motion.div
          variants={fadeUp}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto text-center space-y-12"
        >
          <span className="label">What's Next?</span>
          
          <h2 className="heading-xl">
            Let's build something <span className="serif-italic text-[var(--color-accent)]">meaningful</span>.
          </h2>
          
          <p className="body-lg max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
          </p>

          <div className="pt-8 pb-16">
            <a 
              href={`mailto:${personalInfo.email}`}
              className="group relative inline-flex items-center gap-2 px-10 py-5 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-mono font-medium rounded-sm overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <span>Say Hello</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="flex justify-center items-center gap-8 text-[var(--color-text-secondary)]">
            <a 
              href={personalInfo.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[var(--color-accent)] transition-colors p-2"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a 
              href={personalInfo.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[var(--color-accent)] transition-colors p-2"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </motion.div>
      </div>

      <footer className="mt-32 py-8 text-center border-t border-[var(--color-border)]">
        <p className="font-mono text-xs text-[var(--color-text-tertiary)]">
          Designed & Built by Aviral Kaushik &copy; 2026
        </p>
      </footer>
    </section>
  );
};

export default Contact;
