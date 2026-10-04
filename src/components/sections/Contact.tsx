import { useRef } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import { useInView, usePrefersReducedMotion } from '../../hooks/useAnimations';

const Contact = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(0.1);
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <section 
      ref={containerRef}
      id="contact"
      className="relative w-full px-6 py-24 md:py-32 lg:px-12 bg-[#0a0a0f] border-t border-[rgba(255,255,255,0.06)] flex flex-col items-center justify-center min-h-[80vh]"
    >
      <div className="absolute inset-0 pointer-events-none bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-4xl mx-auto w-full flex flex-col items-center text-center relative z-10 pb-20"
      >
        <motion.p 
          variants={itemVariants}
          className="font-mono text-[#64ffda] text-sm md:text-base mb-6 tracking-widest uppercase"
        >
          04. What's Next?
        </motion.p>
        
        <motion.h2 
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[#e8e8ed] mb-8"
        >
          Let's build something <span className="font-serif italic text-[#64ffda] font-normal">meaningful.</span>
        </motion.h2>

        <motion.p 
          variants={itemVariants}
          className="text-[#9898a6] text-lg md:text-xl max-w-2xl mb-16 leading-relaxed"
        >
          I'm currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi, my inbox is always open. Let's create something extraordinary together.
        </motion.p>

        <motion.div variants={itemVariants} className="mb-20">
          <a
            href={`mailto:${personalInfo.email}`}
            className="group relative inline-flex items-center gap-4 text-2xl md:text-4xl lg:text-5xl font-medium text-[#e8e8ed] hover:text-[#64ffda] transition-colors duration-500"
          >
            <span className="relative z-10">{personalInfo.email}</span>
            <svg 
              className="w-8 h-8 md:w-12 md:h-12 transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#64ffda] transition-all duration-500 group-hover:w-full"></span>
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-8 md:gap-12">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9898a6] hover:text-[#e8e8ed] font-mono text-sm uppercase tracking-widest transition-colors duration-300 flex items-center gap-2 group"
          >
            GitHub
            <span className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-[#64ffda]">↗</span>
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9898a6] hover:text-[#e8e8ed] font-mono text-sm uppercase tracking-widest transition-colors duration-300 flex items-center gap-2 group"
          >
            LinkedIn
            <span className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-[#64ffda]">↗</span>
          </a>
          {personalInfo.resumeUrl && (
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9898a6] hover:text-[#e8e8ed] font-mono text-sm uppercase tracking-widest transition-colors duration-300 flex items-center gap-2 group"
            >
              Resume
              <span className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-[#64ffda]">↓</span>
            </a>
          )}
        </motion.div>
      </motion.div>

      <footer className="absolute bottom-8 w-full text-center z-10 flex flex-col items-center justify-center space-y-3">
        <p className="font-mono text-xs text-[#6b6b7b] hover:text-[#9898a6] transition-colors">
          Designed & Built by Aviral Kaushik
        </p>
        <p className="font-mono text-[10px] text-[#6b6b7b]">
          &copy; 2026
        </p>
      </footer>
    </section>
  );
};

export default Contact;
