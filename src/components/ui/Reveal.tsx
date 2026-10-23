import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '../../hooks/useAnimations';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'article';
}

/** Fades content up once when it scrolls into view. */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

export function SectionHeader({
  index,
  label,
  title,
  description,
}: {
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <div className="mb-14 md:mb-20 max-w-3xl">
      <Reveal>
        <p className="eyebrow">
          <span className="text-[var(--color-text-muted)]">{index}</span>
          <span className="h-px w-8 bg-[var(--color-border-strong)]" />
          {label}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="heading-lg mt-5">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="body-lg mt-5 max-w-2xl">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
