'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

const LABELS: Record<string, string> = {
  top: 'Hero',
  themes: 'Tracks',
  about: 'Manifesto',
  schedule: 'Journey',
  prizes: 'Stakes',
  register: 'Boarding',
  faq: 'Intel'
};

export function ScrollHud() {
  const [pct, setPct] = useState(0);
  const [label, setLabel] = useState('Hero');
  const barRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      const next = Math.round(progress * 100);
      setPct((current) => (current === next ? current : next));
      if (barRef.current) barRef.current.style.transform = `scaleY(${progress.toFixed(4)})`;
      if (readoutRef.current) readoutRef.current.textContent = String(next).padStart(3, '0');
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
            const name = LABELS[entry.target.id];
            if (name) setLabel(name);
          }
        }
      },
      { threshold: [0.25, 0.6] }
    );

    Object.keys(LABELS).forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    if (!prefersReducedMotion() && typeof document !== 'undefined') {
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-y-0 right-0 z-40 hidden sm:block" aria-hidden="true">
      <div className="absolute right-0 top-0 h-full w-px bg-white/10">
        <div
          ref={barRef}
          className="h-full w-full origin-top bg-[linear-gradient(180deg,#FF0259,#E00072_45%,#2600EA)]"
          style={{ transform: 'scaleY(0)' }}
        />
      </div>
      <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
        <span className="font-mono text-[0.5625rem] uppercase tracking-[0.24em] text-[var(--muted)]">
          {label}
        </span>
        <span className="flex items-baseline gap-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-fog">
          Voyage
          <span ref={readoutRef} className="text-pink tabular-nums">
            000
          </span>
          %
        </span>
      </div>
    </div>
  );
}
