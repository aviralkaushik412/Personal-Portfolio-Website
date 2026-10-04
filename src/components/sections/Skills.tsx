import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../../data/portfolio';
import { useInView, usePrefersReducedMotion } from '../../hooks/useAnimations';

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(0.1);
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section id="skills" ref={sectionRef} className="py-32 bg-[var(--color-bg-primary)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--color-text-primary)]">
              Expertise
            </h2>
            <div className="w-16 h-1 bg-[var(--color-accent)]/30 rounded-full" />
          </motion.div>

          <div className="space-y-12">
            {skillCategories.map((category) => (
              <motion.div 
                key={category.name}
                variants={itemVariants}
                className="flex flex-col md:flex-row md:items-start gap-4 md:gap-16 border-t border-[var(--color-border)] pt-8"
              >
                <div className="md:w-1/4 shrink-0">
                  <h3 className="font-mono text-sm uppercase tracking-wider text-[var(--color-accent)]">
                    {category.name}
                  </h3>
                </div>
                
                <div className="md:w-3/4">
                  <ul className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => (
                      <li 
                        key={skill}
                        className="px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] transition-all duration-300 ease-out font-medium text-sm cursor-default"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
