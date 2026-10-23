import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { personalInfo, stats } from '../../data/portfolio';
import { usePrefersReducedMotion } from '../../hooks/useAnimations';
import { scrollToId } from '../../lib/scroll';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

const ease = [0.16, 1, 0.3, 1] as const;

function CodeCard() {
  const k = 'text-[#c4b5fd]'; // keyword
  const p = 'text-[#93c5fd]'; // property
  const s = 'text-[#86efac]'; // string
  const c = 'text-[var(--color-text-muted)]'; // punctuation / comment
  const list = (items: string[]) => (
    <>
      <span className={c}>[</span>
      {items.map((item, i) => (
        <span key={item}>
          <span className={s}>"{item}"</span>
          {i < items.length - 1 && <span className={c}>, </span>}
        </span>
      ))}
      <span className={c}>]</span>
    </>
  );

  return (
    <div className="card relative overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#3f3f46]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3f3f46]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3f3f46]" />
        <span className="ml-3 font-mono text-xs text-[var(--color-text-tertiary)]">aviral.ts</span>
      </div>
      <pre className="overflow-x-auto px-5 py-5 font-mono text-[0.8rem] leading-[1.85] text-[var(--color-text-secondary)]">
        <code>
          <span className={c}>{'// '}hello, world</span>
          {'\n'}
          <span className={k}>const</span> engineer <span className={c}>=</span> <span className={c}>{'{'}</span>
          {'\n  '}
          <span className={p}>name</span>
          <span className={c}>: </span>
          <span className={s}>"{personalInfo.name}"</span>
          <span className={c}>,</span>
          {'\n  '}
          <span className={p}>role</span>
          <span className={c}>: </span>
          <span className={s}>"Software Engineer"</span>
          <span className={c}>,</span>
          {'\n  '}
          <span className={p}>focus</span>
          <span className={c}>: </span>
          {list(['Backend', 'Full-stack', 'LLM evals'])}
          <span className={c}>,</span>
          {'\n  '}
          <span className={p}>stack</span>
          <span className={c}>: </span>
          {list(['Java', 'Spring', 'TS', 'React'])}
          <span className={c}>,</span>
          {'\n  '}
          <span className={p}>currently</span>
          <span className={c}>: </span>
          <span className={s}>"LLM Trainer @ Turing"</span>
          <span className={c}>,</span>
          {'\n  '}
          <span className={p}>openTo</span>
          <span className={c}>: </span>
          <span className={s}>"SDE roles"</span>
          <span className={c}>,</span>
          {'\n'}
          <span className={c}>{'};'}</span>
          <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-[3px] animate-pulse bg-[var(--color-accent)]" />
        </code>
      </pre>
    </div>
  );
}

export const Hero = () => {
  const reduced = usePrefersReducedMotion();

  const item = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease },
        };

  return (
    <section id="home" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute left-1/2 top-[-20%] h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(74,222,128,0.10),transparent)]" />
      </div>

      <div className="section-container relative flex min-h-[100svh] flex-col justify-center pt-28 pb-16">
        <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <motion.div {...item(0.05)}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/70 py-1.5 pl-3 pr-4 text-[0.8rem] text-[var(--color-text-secondary)] backdrop-blur">
                <span className="pulse-dot" />
                Open to SDE roles · {personalInfo.location}
              </span>
            </motion.div>

            <motion.h1 {...item(0.12)} className="heading-xl mt-7">
              {personalInfo.name}
            </motion.h1>

            <motion.p
              {...item(0.2)}
              className="mt-6 max-w-xl text-[clamp(1.25rem,2.1vw,1.6rem)] leading-snug tracking-tight text-[var(--color-text-secondary)]"
            >
              Software engineer building{' '}
              <span className="serif-italic text-[1.15em] text-[var(--color-text-primary)]">scalable</span>{' '}
              full-stack systems — from Spring Boot APIs to LLM evaluation infrastructure.
            </motion.p>

            <motion.div {...item(0.28)} className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId('projects');
                }}
                className="btn btn-primary group"
              >
                View my work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Resume
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <span className="mx-1 hidden h-6 w-px bg-[var(--color-border-strong)] sm:block" />
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-11 w-11 place-items-center rounded-full text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-full text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </motion.div>
          </div>

          <motion.div
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, y: 30, rotate: 0.5 },
                  animate: { opacity: 1, y: 0, rotate: 0 },
                  transition: { duration: 1, delay: 0.3, ease },
                })}
            className="hidden lg:block"
          >
            <CodeCard />
          </motion.div>
        </div>

        <motion.dl
          {...item(0.4)}
          className="mt-16 grid grid-cols-2 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)] gap-px sm:grid-cols-4 lg:mt-24"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[var(--color-bg)]/90 px-5 py-5 sm:px-6">
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
                {stat.label}
              </dt>
              <dd className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
};
