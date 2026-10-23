import { Code2, Layout, Server, Database, Wrench } from 'lucide-react';
import { skillCategories } from '../../data/portfolio';
import { Reveal, SectionHeader } from '../ui/Reveal';

const icons = [Code2, Layout, Server, Database, Wrench];

const Skills = () => {
  return (
    <section id="skills" className="section-padding relative">
      <div className="section-container">
        <SectionHeader
          index="04"
          label="Skills"
          title={
            <>
              The <span className="serif-italic text-[var(--color-accent)]">toolkit</span>.
            </>
          }
          description="Languages and tools I reach for day to day — chosen for the problem, not the hype."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {skillCategories.map((category, i) => {
            const Icon = icons[i % icons.length];
            // 3 on top, 2 wider below on large screens.
            const span = i < 3 ? 'lg:col-span-2' : 'lg:col-span-3';
            return (
              <Reveal key={category.name} delay={(i % 3) * 0.05} className={`${span} ${i === skillCategories.length - 1 && skillCategories.length % 2 === 1 ? 'sm:col-span-2 lg:col-span-3' : ''}`}>
                <div className="card card-hover spotlight h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-3)]">
                      <Icon className="h-4 w-4 text-[var(--color-accent)]" />
                    </span>
                    <h3 className="font-medium">{category.name}</h3>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-lg border border-[var(--color-border)] bg-white/[0.02] px-3 py-1.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent-line)] hover:text-[var(--color-text-primary)]"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
