import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../../data/portfolio';
import { useActiveSection } from '../../hooks/useAnimations';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const sectionIds = navItems.map((item) => item.id);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
          isScrolled 
            ? 'bg-[var(--color-bg-primary)]/90 backdrop-blur-md border-b border-[var(--color-border)] py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="section-container flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection('home', e)}
            className="text-xl md:text-2xl font-bold tracking-tighter text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors font-sans relative z-50"
          >
            AK
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(item.id, e)}
                  className={`relative text-sm font-medium transition-colors hover:text-[var(--color-text-primary)] font-mono ${
                    isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[var(--color-accent)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-50 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-4">
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="absolute top-0 left-0 w-6 h-[2px] bg-[var(--color-text-primary)] block transition-transform origin-center"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="absolute top-1.5 left-0 w-6 h-[2px] bg-[var(--color-text-primary)] block transition-opacity"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 3 }}
                className="absolute top-3 left-0 w-6 h-[2px] bg-[var(--color-text-primary)] block transition-transform origin-center"
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--color-bg-primary)]/95 backdrop-blur-xl flex flex-col justify-center items-center w-full h-full"
          >
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(item.id, e)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                    className={`text-2xl font-medium tracking-wide transition-colors font-mono ${
                      isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)]'
                    }`}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
