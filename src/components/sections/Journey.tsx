import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { experience, education, codingProfiles, certificates } from '../../data/portfolio';
import { useInView, usePrefersReducedMotion } from '../../hooks/useAnimations';

const TimelineItem = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(0.1);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] as const }}
      className="relative pl-8 md:pl-0"
    >
      <div className="md:hidden absolute left-[3.5px] top-6 w-2 h-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)] -translate-x-1/2" />
      {children}
    </motion.div>
  );
};

const Journey = () => {
  return (
    <section id="journey" className="py-24 md:py-32 relative bg-[var(--color-bg-primary)]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[var(--color-text-primary)] mb-6 tracking-tight">
            The <span className="text-[var(--color-accent)] italic font-[var(--font-serif)]">Journey</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-transparent" />
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)] md:-translate-x-1/2" />

          {/* Experience Section */}
          <div className="mb-24">
            <h3 className="text-2xl md:text-3xl font-light text-[var(--color-text-primary)] mb-12 pl-8 md:pl-0 md:text-center">Experience</h3>
            <div className="space-y-16">
              {experience.map((exp, index) => (
                <TimelineItem key={exp.id} index={index}>
                  <div className={`md:flex items-start justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="hidden md:block w-[calc(50%-3rem)]" />
                    <div className="hidden md:block absolute left-1/2 top-8 w-3 h-3 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent-dim)] -translate-x-1/2 z-10" />
                    <div className="w-full md:w-[calc(50%-3rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 md:p-8 rounded-2xl hover:border-[var(--color-accent-dim)] transition-colors duration-300 group">
                      <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-4 gap-2">
                        <h4 className="text-xl md:text-2xl font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">{exp.role}</h4>
                        <span className="text-sm font-[var(--font-mono)] text-[var(--color-accent)] whitespace-nowrap">{exp.period}</span>
                      </div>
                      <div className="text-[var(--color-text-secondary)] mb-6 font-medium flex items-center gap-2">
                        {exp.company}
                        <span className="text-[var(--color-text-tertiary)] text-sm hidden sm:inline">• {exp.location}</span>
                      </div>
                      <ul className="space-y-3 mb-8">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="text-[var(--color-text-secondary)] text-sm leading-relaxed flex items-start gap-3">
                            <span className="text-[var(--color-accent)] mt-1 text-[10px]">▹</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {exp.techStack.map((tech, i) => (
                          <span key={i} className="text-xs font-[var(--font-mono)] text-[var(--color-text-tertiary)] bg-[var(--color-bg-tertiary)] px-3 py-1.5 rounded-full border border-[var(--color-border)]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TimelineItem>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-24">
            <h3 className="text-2xl md:text-3xl font-light text-[var(--color-text-primary)] mb-12 pl-8 md:pl-0 md:text-center">Education</h3>
            <div className="space-y-12">
              {education.map((edu, index) => (
                <TimelineItem key={edu.id} index={index}>
                  <div className={`md:flex items-center justify-between w-full ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="hidden md:block w-[calc(50%-3rem)]" />
                    <div className="hidden md:block absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-text-tertiary)] -translate-x-1/2 -translate-y-1/2 z-10" />
                    <div className="w-full md:w-[calc(50%-3rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 md:p-8 rounded-2xl hover:bg-[var(--color-bg-tertiary)] transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-2">
                        <h4 className="text-lg font-medium text-[var(--color-text-primary)]">{edu.degree}</h4>
                        <span className="text-sm font-[var(--font-mono)] text-[var(--color-text-tertiary)] whitespace-nowrap">{edu.period}</span>
                      </div>
                      <div className="text-[var(--color-text-secondary)] mb-4 text-base">
                        {edu.institution}
                      </div>
                      <div className="flex justify-between items-center text-sm pt-4 border-t border-[var(--color-border)]">
                        <span className="text-[var(--color-text-tertiary)]">{edu.location}</span>
                        <span className="text-[var(--color-accent)] font-[var(--font-mono)] font-medium">{edu.score}</span>
                      </div>
                    </div>
                  </div>
                </TimelineItem>
              ))}
            </div>
          </div>

          {/* DSA & Coding Profiles */}
          <div className="mb-24">
            <h3 className="text-2xl md:text-3xl font-light text-[var(--color-text-primary)] mb-12 pl-8 md:pl-0 md:text-center">Problem Solving</h3>
            <TimelineItem index={0}>
              <div className="md:flex items-center justify-center w-full">
                <div className="hidden md:block absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-accent)] -translate-x-1/2 -translate-y-1/2 z-10" />
                <div className="w-full md:w-4/5 lg:w-3/4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 md:p-10 rounded-2xl relative overflow-hidden group hover:border-[var(--color-accent-dim)] transition-colors duration-500">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-center mb-10">
                    <div className="text-5xl md:text-6xl font-[var(--font-mono)] text-[var(--color-text-primary)] mb-3 font-light tracking-tight">1300<span className="text-[var(--color-accent)]">+</span></div>
                    <div className="text-[var(--color-text-secondary)] tracking-[0.2em] uppercase text-xs md:text-sm">Total Problems Solved</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {codingProfiles.map((profile, i) => (
                      <a 
                        key={i} 
                        href={profile.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group/link flex flex-col p-5 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-accent-dim)] transition-all duration-300"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[var(--color-text-primary)] font-medium group-hover/link:text-[var(--color-accent)] transition-colors">{profile.platform}</span>
                          {profile.badge && <span className="text-[10px] font-[var(--font-mono)] text-[var(--color-accent)] bg-[var(--color-accent-dim)] px-2 py-1 rounded-full uppercase tracking-wider">{profile.badge}</span>}
                        </div>
                        <div className="text-sm text-[var(--color-text-secondary)] mb-2 font-[var(--font-mono)]">{profile.handle}</div>
                        <div className="text-sm text-[var(--color-text-tertiary)] mt-auto pt-3 border-t border-[var(--color-border)]">
                          {profile.metric}: <span className="text-[var(--color-text-primary)] font-[var(--font-mono)] ml-1">{profile.metricValue}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </TimelineItem>
          </div>

          {/* Certificates */}
          <div>
            <h3 className="text-2xl md:text-3xl font-light text-[var(--color-text-primary)] mb-12 pl-8 md:pl-0 md:text-center">Certifications</h3>
            <TimelineItem index={0}>
               <div className="md:flex items-center justify-center w-full">
                <div className="hidden md:block absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-text-tertiary)] -translate-x-1/2 -translate-y-1/2 z-10" />
                <div className="w-full md:w-4/5 lg:w-3/4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 md:p-8 rounded-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {certificates.slice(0, 5).map((cert) => (
                      <div key={cert.id} className="p-5 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-bg-primary)] transition-colors">
                        <h4 className="text-[var(--color-text-primary)] font-medium text-sm mb-4 leading-relaxed">{cert.title}</h4>
                        <div className="flex justify-between items-center text-xs mt-auto">
                          <span className="text-[var(--color-text-secondary)] truncate mr-2">{cert.issuer}</span>
                          <span className="text-[var(--color-text-tertiary)] font-[var(--font-mono)] shrink-0">{cert.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TimelineItem>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
