import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Plus } from 'lucide-react';
import { projects, type Project } from '../../data/portfolio';
import { lockScroll } from '../../lib/scroll';
import { Reveal, SectionHeader } from '../ui/Reveal';
import { GithubIcon } from '../ui/Icons';

const categoryLabel: Record<Project['category'], string> = {
  fullstack: 'Full-stack',
  backend: 'Backend',
  frontend: 'Frontend',
  tools: 'Dev tooling',
  algorithms: 'Algorithms',
};

function ProjectLinks({ project, compact = false }: { project: Project; compact?: boolean }) {
  const size = compact ? '!h-9 !px-3.5 text-[0.82rem]' : '';
  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={`btn btn-ghost ${size}`}
        aria-label={`${project.title} source code on GitHub`}
      >
        <GithubIcon className="h-4 w-4" />
        Code
      </a>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`btn btn-ghost ${size}`}
          aria-label={`${project.title} live demo`}
        >
          Live
          <ArrowUpRight className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  wide,
  onOpen,
}: {
  project: Project;
  index: number;
  wide: boolean;
  onOpen: () => void;
}) {
  return (
    <Reveal as="article" delay={(index % 2) * 0.06} className={wide ? 'md:col-span-2' : ''}>
      <div
        className={`card card-hover spotlight group flex h-full flex-col p-6 sm:p-8 ${
          wide ? 'lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:p-10' : ''
        }`}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
              {String(index + 1).padStart(2, '0')} · {categoryLabel[project.category]}
            </span>
            <span className="font-mono text-xs text-[var(--color-text-tertiary)]">{project.year}</span>
          </div>

          <h3 className="mt-6 text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1.5 text-[var(--color-text-tertiary)]">{project.subtitle}</p>

          <p className="body-md mt-5">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8">
            <ProjectLinks project={project} compact />
            <button
              type="button"
              onClick={onOpen}
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
              aria-haspopup="dialog"
            >
              Case study
              <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>
        </div>

        {wide && (
          <ul className="mt-8 hidden flex-col justify-center gap-px overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-border)] lg:mt-0 lg:flex">
            {project.highlights.slice(0, 4).map((h) => (
              <li key={h} className="flex gap-3 bg-[var(--color-surface)] px-5 py-4 text-[0.9rem] text-[var(--color-text-secondary)]">
                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    lockScroll(true);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lockScroll(false);
      prev?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="card relative max-h-[92svh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-b-none sm:rounded-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface-2)]/90 px-6 py-4 backdrop-blur sm:px-8">
          <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
            Case study · {categoryLabel[project.category]} · {project.year}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-8 sm:px-8 sm:py-10">
          <h3 id="project-dialog-title" className="heading-lg">
            {project.title}
          </h3>
          <p className="mt-2 text-lg text-[var(--color-text-tertiary)]">{project.subtitle}</p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="eyebrow">The problem</h4>
              <p className="body-md mt-3">{project.problem}</p>
            </div>
            <div>
              <h4 className="eyebrow">The solution</h4>
              <p className="body-md mt-3">{project.solution}</p>
            </div>
          </div>

          <div className="mt-10">
            <h4 className="eyebrow">Engineering highlights</h4>
            <ul className="mt-4 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 py-3.5 text-[0.95rem] text-[var(--color-text-secondary)]">
                  <span className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <ProjectLinks project={project} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const ordered = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];

  return (
    <section id="projects" className="section-padding relative">
      <div className="section-container">
        <SectionHeader
          index="02"
          label="Selected work"
          title={
            <>
              Projects built with <span className="serif-italic text-[var(--color-accent)]">purpose</span>.
            </>
          }
          description="Real problems I wanted solved — engineered past the tutorial stage, measured, and shipped."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {ordered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              wide={i === 0 || (i === ordered.length - 1 && (ordered.length - 1) % 2 === 1)}
              onOpen={() => setSelected(project)}
            />
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <a
            href="https://github.com/aviralkaushik412?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            More on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>

      <AnimatePresence>
        {selected && <ProjectDialog project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
