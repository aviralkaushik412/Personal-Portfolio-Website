import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import { scrollToId } from '../../lib/scroll';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="section-container flex flex-col-reverse items-start gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-[var(--color-text-tertiary)]">
          © {YEAR} {personalInfo.name} · Built with React, TypeScript & Tailwind
        </p>
        <div className="flex items-center gap-2">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-full text-[var(--color-text-tertiary)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-full text-[var(--color-text-tertiary)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => scrollToId('home')}
            className="ml-2 inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3.5 font-mono text-xs text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
