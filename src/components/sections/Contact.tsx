import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import { Reveal } from '../ui/Reveal';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="section-container">
        <Reveal>
          <div className="card relative overflow-hidden px-6 py-16 text-center sm:px-12 sm:py-24">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="bg-grid absolute inset-0 opacity-60" />
              <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(74,222,128,0.16),transparent)]" />
            </div>

            <div className="relative">
              <p className="eyebrow justify-center">
                <span className="text-[var(--color-text-muted)]">05</span>
                <span className="h-px w-8 bg-[var(--color-border-strong)]" />
                Contact
              </p>
              <h2 className="heading-xl mx-auto mt-6 max-w-4xl">
                Let's build something{' '}
                <span className="serif-italic text-[var(--color-accent)]">meaningful</span>.
              </h2>
              <p className="body-lg mx-auto mt-6 max-w-xl">
                I'm open to software engineering roles and interesting projects. Whether it's an
                opportunity or just a hello, my inbox is open.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href={`mailto:${personalInfo.email}`} className="btn btn-primary group">
                  <Mail className="h-4 w-4" />
                  Say hello
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <button type="button" onClick={copyEmail} className="btn btn-ghost font-mono !text-[0.82rem]">
                  {copied ? (
                    <Check className="h-4 w-4 text-[var(--color-accent)]" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span aria-live="polite">{copied ? 'Copied to clipboard' : personalInfo.email}</span>
                </button>
              </div>

              <div className="mt-10 flex items-center justify-center gap-6 text-sm">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
