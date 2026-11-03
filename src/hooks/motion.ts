import { useEffect, useRef, useState, type RefObject } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * One shared IntersectionObserver for every [data-reveal] element.
 * Adds .is-in once, then stops observing (zero cost after reveal).
 */
export function useRevealAll(dep: unknown) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'));
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

/**
 * Writes scroll progress (0 → 1) of an element as the CSS variable --p.
 * Only listens while the element is on screen; one style write per frame.
 */
export function useScrollProgress<T extends HTMLElement>(start = 0.85, end = 0.35): RefObject<T> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.setProperty('--p', '1');
      return;
    }
    let raf = 0;
    let active = false;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const from = vh * start;
      const to = vh * end - r.height;
      const p = Math.min(1, Math.max(0, (from - r.top) / (from - to)));
      el.style.setProperty('--p', p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !active) {
        active = true;
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        update();
      } else if (!e.isIntersecting && active) {
        active = false;
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        update();
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [start, end]);
  return ref;
}

/** Counts up to `to` the first time the element becomes visible. */
export function useCountUp(to: number, duration = 1600) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(to < 100 ? 0 : Math.floor(to * 0.97));
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setVal(to);
      return;
    }
    const from = to < 100 ? 0 : Math.floor(to * 0.97);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - k, 4);
        setVal(Math.round(from + (to - from) * eased));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);
  return { ref, val };
}

/** Mouse-follow spotlight: sets --mx/--my on the hovered card (no React re-render). */
export function spotlight(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}
