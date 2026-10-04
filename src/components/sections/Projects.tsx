import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/portfolio';
import { useInView, usePrefersReducedMotion } from '../../hooks/useAnimations';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

function ProjectCard({ project, index, onSelect }: any) {
  const reducedMotion = usePrefersReducedMotion();
  
  // Choose accent color by category
  const getAccentColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'full stack': return '#64ffda';
      case 'backend': return '#ffa364';
      case 'frontend': return '#64b5ff';
      default: return '#c084fc';
    }
  };
  
  const accentColor = getAccentColor(project.category);

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial={reducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`group relative flex flex-col justify-between bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-sm overflow-hidden transition-colors duration-500 hover:border-[${accentColor}50] cursor-pointer`}
      onClick={() => onSelect(project.id)}
      style={{ height: '100%' }}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />
      
      <div className="p-10 sm:p-14 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <span 
            className="text-[10px] sm:text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-sm border"
            style={{ color: accentColor, borderColor: `${accentColor}30`, backgroundColor: `${accentColor}08` }}
          >
            {project.category}
          </span>
          <span className="text-[var(--color-text-tertiary)] font-mono text-xs sm:text-sm">
            {project.year}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="serif-italic text-lg sm:text-xl text-[var(--color-text-secondary)] mb-6">
          {project.subtitle}
        </p>

        <p className="text-[var(--color-text-secondary)] body-md mb-8 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.map((tech: string) => (
            <span 
              key={tech} 
              className="text-[10px] sm:text-xs font-mono px-2 py-1 rounded-sm bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-tertiary)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectDetail({ project, onClose }: any) {
  const accentColor = '#64ffda';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-[var(--color-bg-primary)]/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-sm shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 md:p-12">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <span
            className="text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-sm border inline-block mb-6 font-mono"
            style={{ color: accentColor, borderColor: `${accentColor}30`, backgroundColor: `${accentColor}08` }}
          >
            {project.category}
          </span>

          <h3 className="text-3xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-3 tracking-tight">
            {project.title}
          </h3>
          <p className="serif-italic text-xl md:text-2xl text-[var(--color-text-secondary)] mb-12">
            {project.subtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider mb-4 text-[var(--color-accent)]">The Problem</h4>
              <p className="body-md">{project.problem}</p>
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider mb-4 text-[var(--color-accent)]">The Solution</h4>
              <p className="body-md">{project.solution}</p>
            </div>
          </div>

          <div className="mb-12">
            <h4 className="text-xs font-mono uppercase tracking-wider mb-6 text-[var(--color-accent)]">Engineering Highlights</h4>
            <ul className="space-y-4">
              {project.highlights.map((highlight: string, i: number) => (
                <li key={i} className="flex gap-4 body-md items-start">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 bg-[var(--color-accent)]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 pt-8 border-t border-[var(--color-border)]">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-[var(--color-border)] text-[var(--color-text-primary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors text-sm font-mono font-medium"
            >
              Source Code
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-[var(--color-accent)] text-[#0a0a0f] text-sm font-mono font-medium hover:opacity-90 transition-opacity"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sectionRef, inView] = useInView(0.1);
  const reducedMotion = usePrefersReducedMotion();

  const selectedProject = projects.find((p) => p.id === selectedId) || null;
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding relative">
      <div className="section-container" ref={sectionRef as any}>
        <motion.div
          variants={fadeUp}
          initial={reducedMotion ? 'visible' : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
          className="mb-6"
        >
          <span className="label">Selected Work</span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial={reducedMotion ? 'visible' : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          custom={1}
          className="heading-lg mb-6 max-w-[700px]"
        >
          Projects built with <span className="serif-italic text-[var(--color-accent)]">purpose</span>.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial={reducedMotion ? 'visible' : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          custom={2}
          className="body-lg mb-16 max-w-[600px]"
        >
          Each project represents a real problem I wanted to solve, moving beyond standard tutorials into genuine engineering challenges.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onSelect={setSelectedId} />
          ))}
        </div>

        {otherProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {otherProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={featuredProjects.length + i}
                onSelect={setSelectedId}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail project={selectedProject} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
