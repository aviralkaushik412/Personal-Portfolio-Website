import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { navItems, personalInfo } from '../../data/portfolio';
import { useActiveSection } from '../../hooks/useAnimations';
import { lockScroll, scrollToId } from '../../lib/scroll';

const sectionIds = navItems.map((item) => item.id);

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      lockScroll(false);
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // Let the scroll lock release before scrolling.
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 border-b ${
          isScrolled || open
            ? 'bg-[var(--color-bg)]/75 backdrop-blur-xl border-[var(--color-border)]'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="section-container flex h-16 items-center justify-between gap-6">
          <a
            href="#home"
            onClick={go('home')}
            className="group flex items-center gap-2.5 font-semibold tracking-tight"
            aria-label="Aviral Kaushik — home"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-2)] font-mono text-[0.8rem] text-[var(--color-accent)] transition-colors group-hover:border-[var(--color-accent-line)]">
              AK
            </span>
            <span className="hidden sm:inline text-[0.95rem]">Aviral Kaushik</span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-1 backdrop-blur">
              {navItems
                .filter((item) => item.id !== 'home')
                .map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        onClick={go(item.id)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`relative block rounded-full px-4 py-1.5 text-sm transition-colors ${
                          isActive
                            ? 'text-[var(--color-text-primary)]'
                            : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]'
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-[var(--color-surface-3)] ring-1 ring-[var(--color-border-strong)]"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                        {item.label}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost hidden md:inline-flex !h-9 !px-4 text-[0.85rem]"
            >
              Resume
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border-strong)]"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${
                    open ? 'top-[5px] rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${
                    open ? 'top-[5px] -rotate-45' : 'top-[10px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 z-40 bg-[var(--color-bg)]/95 backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Mobile" className="section-container flex h-full flex-col pt-8 pb-10">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-[var(--color-border)]"
                  >
                    <a
                      href={item.href}
                      onClick={go(item.id)}
                      className={`flex items-baseline justify-between py-5 text-3xl font-medium tracking-tight ${
                        activeSection === item.id
                          ? 'text-[var(--color-text-primary)]'
                          : 'text-[var(--color-text-tertiary)]'
                      }`}
                    >
                      {item.label}
                      <span className="font-mono text-xs text-[var(--color-text-muted)]">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-auto w-full"
              >
                View Resume
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
