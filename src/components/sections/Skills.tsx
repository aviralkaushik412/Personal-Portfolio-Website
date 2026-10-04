import { useRef } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../../data/portfolio';
import { useInView, usePrefersReducedMotion } from '../../hooks/useAnimations';

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(0.1);
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <span className="label">Capabilities</span>
            <h2 className="heading-lg max-w-[700px]">
              Technical <span className="serif-italic text-[var(--color-accent)]">Expertise</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-16 border-t border-[var(--color-border)] pt-12">
            {skillCategories.map((category) => (
              <motion.div 
                key={category.name}
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12"
              >
                <div>
                  <h3 className="font-mono text-sm tracking-wider text-[var(--color-text-secondary)] uppercase mt-2">
                    {category.name}
                  </h3>
                </div>
                
                <ul className="flex flex-wrap gap-x-4 gap-y-3">
                  {category.skills.map((skill) => (
                    <li 
                      key={skill}
                      className="px-5 py-3 rounded-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] transition-colors duration-300 ease-out text-sm font-medium cursor-default"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
