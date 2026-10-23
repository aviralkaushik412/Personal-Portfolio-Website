import { MapPin, GraduationCap, Briefcase, Target } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import { Reveal, SectionHeader } from '../ui/Reveal';

const facts = [
  { icon: Briefcase, label: 'Currently', value: 'LLM Trainer at Turing' },
  { icon: GraduationCap, label: 'Education', value: 'B.Tech CSE, Chitkara · 9.37 CGPA' },
  { icon: Target, label: 'Focus', value: 'Backend & full-stack engineering' },
  { icon: MapPin, label: 'Based in', value: `${personalInfo.location} · Open to remote` },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="section-container">
        <SectionHeader
          index="01"
          label="About"
          title={
            <>
              I build things that work — and obsess over{' '}
              <span className="serif-italic text-[var(--color-accent)]">how</span> they work.
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-20">
          <div className="space-y-6">
            <Reveal>
              <p className="body-lg">
                I'm a Computer Science student at Chitkara University focused on full-stack
                engineering and algorithmic problem-solving. I pair rigorous DSA foundations with
                practical product engineering — I don't just solve problems, I build systems around
                them.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="body-lg">
                At <span className="text-[var(--color-text-primary)]">Turing</span>, I build Python
                backends, Docker-based task environments and automated verification suites used to
                evaluate frontier LLMs. Before that I architected{' '}
                <span className="text-[var(--color-text-primary)]">SkillMirror</span>, a SaaS
                platform serving 100+ users with daily DSA challenges and performance analytics.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body-lg">
                Outside of shipping, I'm usually in a competitive programming contest or reading
                about how backend systems behave under real-world load.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
                {facts.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex gap-4 bg-[var(--color-bg)] p-5">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                    <div>
                      <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
                        {label}
                      </p>
                      <p className="mt-1 text-[0.95rem] text-[var(--color-text-primary)]">{value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mx-auto w-full max-w-[360px] lg:mx-0">
            <figure className="card overflow-hidden p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] bg-[var(--color-surface-3)]">
                <img
                  src={personalInfo.profileImage}
                  alt={`Portrait of ${personalInfo.name}`}
                  className="h-full w-full object-cover grayscale-[20%] transition-[filter,transform] duration-700 hover:scale-[1.02] hover:grayscale-0"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              <figcaption className="flex items-center justify-between px-3 pt-3 pb-1.5">
                <span className="text-sm font-medium">{personalInfo.name}</span>
                <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                  SWE · {personalInfo.location}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
