import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/portfolio';
import { useInView, usePrefersReducedMotion, useIsTouchDevice } from '../../hooks/useAnimations';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const categoryColors: Record<string, string> = {
  fullstack: '#64ffda',
  backend: '#ffa364',
  frontend: '#64b5ff',
  tools: '#c084fc',
  algorithms: '#f472b6',
};

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: (typeof projects)[0];
  index: number;
  onSelect: (id: string) => void;
}) {
  const [sectionRef, inView] = useInView(0.1);
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const accentColor = categoryColors[project.category] || '#64ffda';

  return (
    <motion.div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      variants={fadeUp}
      initial={reducedMotion ? 'visible' : 'hidden'}
      animate={inView ? 'visible' : 'hidden'}
      custom={index}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        
        
        onClick={() => onSelect(project.id)}
        className="group relative cursor-pointer rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] transition-all duration-500 hover:border-[var(--color-border-hover)] overflow-hidden"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(project.id);
          }
        }}
        aria-label={`View details for ${project.title}`}
      >
        {/* Hover gradient spotlight */}
        {!isTouch && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, ${accentColor}08, transparent 40%)`,
            }}
          />
        )}

        <div className="relative p-8 sm:p-10">
          {/* Top row — Category + Year */}
          <div className="flex items-center justify-between mb-6">
            <span
              className="text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full border"
              style={{
                color: accentColor,
                borderColor: `${accentColor}30`,
                backgroundColor: `${accentColor}08`,
                fontFamily: 'var(--font-mono)',
              }}
            >
              {project.category}
            </span>
            <span className="text-sm text-[var(--color-text-tertiary)]" style={{ fontFamily: 'var(--font-mono)' }}>
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300">
            {project.title}
          </h3>

          {/* Subtitle */}
          <p className="text-sm text-[var(--color-text-secondary)] mb-6 serif-italic text-lg">
            {project.subtitle}
          </p>

          {/* Description */}
          <p className="body-md mb-8 line-clamp-3">
            {project.description}
          </p>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1.5 rounded-md bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span
                className="text-xs px-3 py-1.5 rounded-md text-[var(--color-text-tertiary)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                +{project.techStack.length - 5}
              </span>
            )}
          </div>

          {/* Bottom row — Links + arrow */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300 flex items-center gap-1.5"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Code
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300 flex items-center gap-1.5"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live
                </a>
              )}
            </div>

            {/* Arrow indicator */}
            <div className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent-dim)] transition-all duration-300">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transform"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectDetail({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) {
  const accentColor = categoryColors[project.category] || '#64ffda';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-3xl w-full max-h-[85vh] overflow-y-auto rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8 sm:p-12"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-all duration-300"
          aria-label="Close project details"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Category */}
        <span
          className="text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full border inline-block mb-6"
          style={{
            color: accentColor,
            borderColor: `${accentColor}30`,
            backgroundColor: `${accentColor}08`,
            fontFamily: 'var(--font-mono)',
          }}
        >
          {project.category}
        </span>

        {/* Title */}
        <h3 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
          {project.title}
        </h3>
        <p className="serif-italic text-xl text-[var(--color-text-secondary)] mb-8">
          {project.subtitle}
        </p>

        {/* Problem / Solution */}
        <div className="space-y-6 mb-8">
          <div>
            <h4
              className="text-xs font-medium uppercase tracking-wider mb-3"
              style={{ color: accentColor, fontFamily: 'var(--font-mono)' }}
            >
              The Problem
            </h4>
            <p className="body-md">{project.problem}</p>
          </div>
          <div>
            <h4
              className="text-xs font-medium uppercase tracking-wider mb-3"
              style={{ color: accentColor, fontFamily: 'var(--font-mono)' }}
            >
              The Solution
            </h4>
            <p className="body-md">{project.solution}</p>
          </div>
        </div>

        {/* Key highlights */}
        <div className="mb-8">
          <h4
            className="text-xs font-medium uppercase tracking-wider mb-4"
            style={{ color: accentColor, fontFamily: 'var(--font-mono)' }}
          >
            Engineering Highlights
          </h4>
          <ul className="space-y-3">
            {project.highlights.map((highlight, i) => (
              <li key={i} className="flex gap-3 body-md">
                <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div className="mb-8">
          <h4
            className="text-xs font-medium uppercase tracking-wider mb-4"
            style={{ color: accentColor, fontFamily: 'var(--font-mono)' }}
          >
            Technology
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1.5 rounded-md bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-6 border-t border-[var(--color-border)]">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300 text-sm font-medium"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View Source
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300"
              style={{
                backgroundColor: accentColor,
                color: '#0a0a0f',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sectionRef, inView] = useInView(0.05);
  const reducedMotion = usePrefersReducedMotion();

  const selectedProject = projects.find((p) => p.id === selectedId) || null;
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding relative">
      <div className="section-container" ref={sectionRef as React.RefObject<HTMLDivElement>}>
        {/* Section header */}
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
          className="heading-lg mb-4 max-w-[700px]"
        >
          Projects built with{' '}
          <span className="serif-italic text-[var(--color-accent)]">purpose</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial={reducedMotion ? 'visible' : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          custom={2}
          className="body-lg mb-16 max-w-[550px]"
        >
          Each project represents a real problem I wanted to solve — not a tutorial I
          followed. Click any project to explore its engineering story.
        </motion.p>

        {/* Featured projects — larger cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onSelect={setSelectedId} />
          ))}
        </div>

        {/* Other projects — smaller row */}
        {otherProjects.length > 0 && (
          <div className="grid grid-cols-1 gap-6">
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

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail project={selectedProject} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
