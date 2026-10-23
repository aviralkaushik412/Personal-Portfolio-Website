import { ArrowUpRight, Award } from 'lucide-react';
import { experience, education, codingProfiles, certificates } from '../../data/portfolio';
import { Reveal, SectionHeader } from '../ui/Reveal';

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-text-tertiary)]">
      {children}
    </h3>
  );
}

export default function Experience() {
  return (
    <section id="journey" className="section-padding relative">
      <div className="section-container">
        <SectionHeader
          index="03"
          label="Experience"
          title={
            <>
              Where I've <span className="serif-italic text-[var(--color-accent)]">shipped</span> so far.
            </>
          }
        />

        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          {/* Work */}
          <div>
            <SubHeading>Work</SubHeading>
            <ol className="relative space-y-6">
              {experience.map((exp) => (
                <Reveal as="li" key={exp.id}>
                  <div className="card spotlight p-6 sm:p-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h4 className="text-xl font-semibold tracking-tight">{exp.role}</h4>
                        <p className="mt-1 text-[var(--color-text-secondary)]">
                          <span className="text-[var(--color-accent)]">{exp.company}</span>
                          <span className="mx-2 text-[var(--color-text-muted)]">·</span>
                          {exp.type}
                          <span className="mx-2 text-[var(--color-text-muted)]">·</span>
                          {exp.location}
                        </p>
                      </div>
                      <span className="chip self-start">{exp.period}</span>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {exp.description.map((d) => (
                        <li key={d} className="flex gap-3 body-md">
                          <span className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-1.5 border-t border-[var(--color-border)] pt-6">
                      {exp.techStack.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Education timeline */}
          <div>
            <SubHeading>Education</SubHeading>
            <ol className="relative border-l border-[var(--color-border-strong)] pl-6">
              {education.map((edu, i) => (
                <Reveal as="li" key={edu.id} delay={i * 0.05} className="relative pb-8 last:pb-0">
                  <span
                    className={`absolute -left-[29px] top-1.5 h-[9px] w-[9px] rounded-full ring-4 ring-[var(--color-bg)] ${
                      i === 0 ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-text-muted)]'
                    }`}
                  />
                  <p className="font-mono text-xs text-[var(--color-text-tertiary)]">{edu.period}</p>
                  <h4 className="mt-1.5 font-medium leading-snug">{edu.degree}</h4>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {edu.institution} · {edu.location}
                  </p>
                  <p className="mt-2 font-mono text-sm text-[var(--color-accent)]">{edu.score}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        {/* Competitive programming */}
        <div className="mt-24">
          <SubHeading>Competitive programming</SubHeading>
          <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <div className="card relative flex h-full flex-col justify-between overflow-hidden p-6 sm:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(74,222,128,0.14),transparent)]"
                />
                <p className="text-sm text-[var(--color-text-secondary)]">Problems solved across platforms</p>
                <p className="mt-10 text-6xl font-semibold tracking-tighter sm:text-7xl">
                  1300<span className="text-[var(--color-accent)]">+</span>
                </p>
              </div>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-3">
              {codingProfiles.map((profile, i) => (
                <Reveal key={profile.platform} delay={i * 0.05}>
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card card-hover spotlight group flex h-full flex-col p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{profile.platform}</span>
                      <ArrowUpRight className="h-4 w-4 text-[var(--color-text-tertiary)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]" />
                    </div>
                    <p className="mt-1 font-mono text-xs text-[var(--color-text-tertiary)]">@{profile.handle}</p>
                    <div className="mt-auto pt-8">
                      <p className="text-3xl font-semibold tracking-tight">{profile.metricValue}</p>
                      <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{profile.metric}</p>
                      {profile.badge && (
                        <p className="mt-3 inline-flex rounded-full bg-[var(--color-accent-soft)] px-2.5 py-1 font-mono text-[0.7rem] text-[var(--color-accent)]">
                          {profile.badge}
                        </p>
                      )}
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-24">
          <SubHeading>Certifications</SubHeading>
          <Reveal>
            <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {certificates.map((cert) => (
                <li
                  key={cert.id}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 sm:grid-cols-[auto_1fr_220px_auto] sm:gap-6"
                >
                  <Award className="h-4 w-4 text-[var(--color-text-tertiary)]" />
                  <span className="font-medium">
                    {cert.title}
                    <span className="mt-0.5 block text-sm font-normal text-[var(--color-text-tertiary)] sm:hidden">
                      {cert.issuer}
                    </span>
                  </span>
                  <span className="hidden text-sm text-[var(--color-text-secondary)] sm:block">{cert.issuer}</span>
                  <span className="font-mono text-xs text-[var(--color-text-tertiary)]">{cert.year}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
