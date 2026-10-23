import Lenis from 'lenis';

let lenis: Lenis | null = null;

const HEADER_OFFSET = -72;

export function initLenis() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  let frame = 0;
  const raf = (time: number) => {
    lenis?.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(frame);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: id === 'home' ? 0 : HEADER_OFFSET });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + (id === 'home' ? 0 : HEADER_OFFSET);
    window.scrollTo({ top, behavior: 'smooth' });
  }
  history.replaceState(null, '', `#${id}`);
}

/** Freeze page scroll (modals, mobile menu). */
export function lockScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? 'hidden' : '';
  if (locked) lenis?.stop();
  else lenis?.start();
}
