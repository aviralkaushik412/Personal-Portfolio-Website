import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import { useInView, usePrefersReducedMotion } from '../../hooks/useAnimations';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function About() {
  const reducedMotion = usePrefersReducedMotion();
  const [sectionRef, inView] = useInView(0.15);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const stats = [
    { value: '1300+', label: 'DSA Problems Solved' },
    { value: '2060', label: 'LeetCode Rating' },
    { value: '100+', label: 'Users on SkillMirror' },
    { value: '9.37', label: 'CGPA' },
  ];

  return (
    <section id="about" ref={parallaxRef} className="section-padding relative">
      <div className="section-container" ref={sectionRef as React.RefObject<HTMLDivElement>}>
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial={reducedMotion ? 'visible' : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
          className="mb-16"
        >
          <span className="label">About</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left — Text content */}
          <div className="lg:col-span-7 space-y-8">
            <motion.h2
              variants={fadeUp}
              initial={reducedMotion ? 'visible' : 'hidden'}
              animate={inView ? 'visible' : 'hidden'}
              custom={1}
              className="heading-lg"
            >
              I build things that{' '}
              <span className="serif-italic text-[var(--color-accent)]">work</span> — and
              I obsess over{' '}
              <span className="serif-italic text-[var(--color-accent)]">how</span> they work.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial={reducedMotion ? 'visible' : 'hidden'}
              animate={inView ? 'visible' : 'hidden'}
              custom={2}
              className="body-lg max-w-[600px]"
            >
              I'm a Computer Science student at Chitkara University with a deep focus on
              full-stack engineering and algorithmic problem-solving. My approach combines
              rigorous DSA foundations with practical product engineering — I don't just
              solve problems, I build systems around them.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial={reducedMotion ? 'visible' : 'hidden'}
              animate={inView ? 'visible' : 'hidden'}
              custom={3}
              className="body-md max-w-[600px]"
            >
              Currently working at <strong className="text-[var(--color-text-primary)]">Turing</strong> as
              an LLM Trainer, developing Python backend applications, building automated
              test suites, and designing Docker-based task environments across multi-service
              architectures. Previously, I architected{' '}
              <strong className="text-[var(--color-text-primary)]">SkillMirror</strong> — a SaaS
              platform serving 100+ users with daily DSA challenges and performance analytics.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial={reducedMotion ? 'visible' : 'hidden'}
              animate={inView ? 'visible' : 'hidden'}
              custom={4}
              className="body-md max-w-[600px]"
            >
              When I'm not shipping features, I'm deep in competitive programming contests
              or exploring how backend systems scale under real-world constraints.
            </motion.p>

            {/* Stats grid */}
            <motion.div
              variants={fadeUp}
              initial={reducedMotion ? 'visible' : 'hidden'}
              animate={inView ? 'visible' : 'hidden'}
              custom={5}
              className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 border-t border-[var(--color-border)]"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider font-[var(--font-mono)]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Profile image */}
          <div className="lg:col-span-5 flex items-start justify-center lg:justify-end">
            <motion.div
              variants={fadeUp}
              initial={reducedMotion ? 'visible' : 'hidden'}
              animate={inView ? 'visible' : 'hidden'}
              custom={3}
              style={{ y: reducedMotion ? 0 : imageY }}
              className="relative"
            >
              <div className="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[400px] rounded-2xl overflow-hidden">
                {/* Accent border glow */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[var(--color-accent)] via-transparent to-[var(--color-accent)] opacity-20" />
                <div className="absolute inset-0 rounded-2xl bg-[var(--color-bg-secondary)] m-[1px]">
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-center rounded-2xl"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Floating accent element */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-[var(--color-accent)] rounded-lg opacity-20" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[var(--color-accent-dim)] rounded-full blur-xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
