import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Download, ArrowRight } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import { usePrefersReducedMotion } from '../../hooks/useAnimations';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      }
    },
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]"
      id="home"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,#64ffda10,transparent)]" />
      </div>

      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16 flex flex-col justify-center"
        style={prefersReducedMotion ? undefined : { y, opacity }}
        variants={prefersReducedMotion ? undefined : staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeInUp} className="mb-4">
          <p className="text-[#64ffda] font-mono text-lg tracking-wider">
            Hi, my name is
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="mb-2">
          <h1 
            className="text-[#e8e8ed] font-sans font-extrabold tracking-tight" 
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: '1.1' }}
          >
            {personalInfo?.name || "Aviral Kaushik"}.
          </h1>
        </motion.div>

        <motion.div variants={fadeInUp} className="mb-8">
          <h2 
            className="text-[#9898a6] font-sans font-extrabold tracking-tight flex flex-wrap gap-x-4 items-center" 
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1.1' }}
          >
            Software <span className="font-serif italic text-[#e8e8ed] font-normal" style={{ fontFamily: '"Instrument Serif", serif' }}>Engineer</span>.
          </h2>
        </motion.div>

        <motion.div variants={fadeInUp} className="max-w-2xl mb-12">
          <p className="text-[#9898a6] text-lg sm:text-xl leading-relaxed">
            Building scalable systems, solving hard problems, and engineering products that matter.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6 mb-16">
          <a 
            href="#projects"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#64ffda] text-[#0a0a0f] font-mono font-medium rounded-sm overflow-hidden transition-transform hover:scale-[1.02]"
          >
            <span>View My Work</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          
          <a 
            href={personalInfo?.resumeUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 border border-[#64ffda] text-[#64ffda] font-mono font-medium rounded-sm hover:bg-[#64ffda] hover:text-[#0a0a0f] transition-colors"
          >
            <span>Download Resume</span>
            <Download className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex items-center gap-6 text-[#9898a6]">
          <a 
            href={personalInfo?.github || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#64ffda] transition-colors p-2 -ml-2"
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          <a 
            href={personalInfo?.linkedin || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#64ffda] transition-colors p-2"
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#9898a6] z-10 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="font-mono text-xs tracking-widest uppercase text-[#64ffda]">Scroll</span>
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-[#64ffda]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
