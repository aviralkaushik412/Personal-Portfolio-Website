import { useRef } from 'react';
import { motion } from 'framer-motion';
import { experience, education, codingProfiles, certificates } from '../../data/portfolio';
import { useInView, usePrefersReducedMotion } from '../../hooks/useAnimations';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
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

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(0.1);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="journey" ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        <motion.div
          variants={fadeUp}
          initial={reducedMotion ? 'visible' : 'hidden'}
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          className="mb-6"
        >
          <span className="label">Background</span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial={reducedMotion ? 'visible' : 'hidden'}
          animate={isInView ? 'visible' : 'hidden'}
          custom={1}
          className="heading-lg mb-20 max-w-[700px]"
        >
          My <span className="serif-italic text-[var(--color-accent)]">Journey</span> so far.
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-12 lg:gap-0 relative">
          {/* Desktop Center Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)] -translate-x-1/2 z-0" />

          {/* EXPERIENCE SECTION */}
          <div className="lg:pr-16 relative z-10">
            <h3 className="heading-md mb-8 text-[var(--color-text-primary)]">Experience</h3>
            <div className="space-y-12">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={fadeUp}
                  initial={reducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  custom={index}
                  className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8 rounded-sm hover:border-[var(--color-accent-dim)] transition-colors relative"
                >
                  <div className="hidden lg:block absolute top-8 -right-[64px] w-3 h-3 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-accent)] z-20" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-2">
                    <div>
                      <h4 className="text-xl font-bold text-[var(--color-text-primary)]">{exp.role}</h4>
                      <div className="text-[var(--color-accent)] font-medium mt-1">{exp.company}</div>
                    </div>
                    <span className="text-xs font-mono text-[var(--color-text-secondary)] bg-[var(--color-bg-tertiary)] px-3 py-1.5 rounded-sm border border-[var(--color-border)] shrink-0 self-start">
                      {exp.period}
                    </span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-[var(--color-text-secondary)] body-md flex items-start gap-3">
                        <span className="text-[var(--color-accent)] mt-2 w-1 h-1 rounded-full shrink-0" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono text-[var(--color-text-tertiary)] bg-[var(--color-bg-tertiary)] px-2 py-1 rounded-sm border border-[var(--color-border)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop Spacer for Layout */}
          <div className="hidden lg:block" />

          {/* Desktop Spacer for Layout */}
          <div className="hidden lg:block" />

          {/* EDUCATION SECTION */}
          <div className="lg:pl-16 relative z-10 lg:-mt-32">
            <h3 className="heading-md mb-8 text-[var(--color-text-primary)]">Education</h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  variants={fadeUp}
                  initial={reducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  custom={index}
                  className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8 rounded-sm relative"
                >
                  <div className="hidden lg:block absolute top-8 -left-[64px] w-3 h-3 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-text-tertiary)] z-20" />
                  
                  <div className="flex flex-col mb-4">
                    <h4 className="text-lg font-bold text-[var(--color-text-primary)]">{edu.degree}</h4>
                    <span className="text-sm text-[var(--color-text-secondary)] mt-1">{edu.institution}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm pt-4 border-t border-[var(--color-border)]">
                    <span className="text-[var(--color-text-tertiary)]">{edu.period}</span>
                    <span className="text-[var(--color-accent)] font-mono font-medium">{edu.score}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* PROBLEM SOLVING SECTION */}
        <div className="mt-32">
          <motion.div
            variants={fadeUp}
            initial={reducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8 md:p-16 rounded-sm relative overflow-hidden"
          >
            <div className="text-center mb-16">
              <h3 className="font-mono text-sm tracking-widest uppercase text-[var(--color-accent)] mb-6">Problem Solving</h3>
              <div className="text-7xl md:text-8xl font-sans font-bold text-[var(--color-text-primary)] mb-2 tracking-tighter">
                1300<span className="text-[var(--color-accent)]">+</span>
              </div>
              <div className="text-[var(--color-text-secondary)] tracking-widest uppercase text-sm font-medium">Total Problems Solved</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {codingProfiles.map((profile, i) => (
                <a 
                  key={i} 
                  href={profile.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col p-6 bg-[var(--color-bg-tertiary)] rounded-sm border border-[var(--color-border)] hover:border-[var(--color-accent-dim)] transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[var(--color-text-primary)] font-medium group-hover:text-[var(--color-accent)] transition-colors">{profile.platform}</span>
                    {profile.badge && <span className="text-[10px] font-mono text-[var(--color-accent)] bg-[var(--color-accent-dim)] px-2 py-1 rounded-sm uppercase tracking-wider">{profile.badge}</span>}
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)] mb-4 font-mono">{profile.handle}</div>
                  <div className="text-sm text-[var(--color-text-tertiary)] mt-auto pt-4 border-t border-[var(--color-border)]">
                    {profile.metric}: <span className="text-[var(--color-text-primary)] font-mono ml-1">{profile.metricValue}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="mt-32">
          <motion.div
            variants={fadeUp}
            initial={reducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="mb-12"
          >
            <h3 className="heading-md text-[var(--color-text-primary)] text-center">Certifications</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.slice(0, 5).map((cert, i) => (
              <motion.div 
                key={cert.id} 
                variants={fadeUp}
                initial={reducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={i}
                className="p-8 bg-[var(--color-bg-secondary)] rounded-sm border border-[var(--color-border)] flex flex-col h-full"
              >
                <h4 className="text-[var(--color-text-primary)] font-medium text-base mb-6 leading-relaxed flex-grow">{cert.title}</h4>
                <div className="flex justify-between items-center text-xs mt-auto pt-4 border-t border-[var(--color-border)]">
                  <span className="text-[var(--color-text-secondary)] truncate pr-4">{cert.issuer}</span>
                  <span className="text-[var(--color-text-tertiary)] font-mono shrink-0">{cert.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
