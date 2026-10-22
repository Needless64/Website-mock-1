'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsapWithScroll, prefersReducedMotion } from '@/lib/gsap';
import { PlanetMotif } from '@/components/ui/Decor';

const STREAKS = [
  { left: '8%', top: '22%', width: '22%' },
  { left: '62%', top: '16%', width: '30%' },
  { left: '18%', top: '74%', width: '26%' },
  { left: '54%', top: '82%', width: '34%' },
  { left: '34%', top: '38%', width: '18%' },
  { left: '72%', top: '58%', width: '20%' },
  { left: '4%', top: '52%', width: '16%' },
  { left: '44%', top: '8%', width: '14%' }
];

/**
 * A pinned interlude: the voyage pulls you through the planet.
 * Static composition is a poster; the scrub adds the travel.
 */
export function VoyageTakeover() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return;

    const { gsap } = gsapWithScroll();
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=140%',
            pin: true,
            scrub: 0.75,
            anticipatePin: 1
          }
        });

        tl.to('[data-take-left]', { xPercent: -140, opacity: 0, ease: 'none' }, 0)
          .to('[data-take-right]', { xPercent: 140, opacity: 0, ease: 'none' }, 0)
          .to('[data-take-mid]', { scale: 7, opacity: 0, ease: 'power1.in' }, 0.12)
          .fromTo(
            '[data-take-planet]',
            { scale: 0.92, rotate: 0 },
            { scale: 3.1, rotate: 38, ease: 'power1.in' },
            0
          )
          .fromTo(
            '[data-take-streak]',
            { scaleX: 0.2, opacity: 0 },
            { scaleX: 2.4, opacity: 1, ease: 'none', stagger: 0.02 },
            0
          )
          .to('[data-take-label]', { opacity: 0, ease: 'none' }, 0)
          .to('[data-take-glow]', { opacity: 1, scale: 1.4, ease: 'power1.in' }, 0.2);
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-hidden="true"
      className="relative h-[100svh] min-h-[480px] overflow-hidden border-y border-white/10 bg-[#06060A]"
    >
      <div
        data-take-glow
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(224,0,114,0.35),rgba(38,0,234,0.18)_42%,transparent_68%)] opacity-40 blur-3xl"
      />

      <div className="pointer-events-none absolute inset-0">
        {STREAKS.map((streak) => (
          <span
            key={`${streak.left}-${streak.top}`}
            data-take-streak
            className="absolute h-px origin-left bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)]"
            style={{ left: streak.left, top: streak.top, width: streak.width }}
          />
        ))}
      </div>

      <div
        data-take-planet
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(78vw,520px)] w-[min(78vw,520px)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <PlanetMotif className="h-full w-full opacity-80" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-6">
        <span
          data-take-left
          className="text-outline display block text-[clamp(2.8rem,11vw,8rem)] leading-[0.85]"
        >
          The
        </span>
        <span
          data-take-mid
          className="gradient-text display block text-[clamp(3.4rem,14vw,10rem)] leading-[0.85] will-change-transform"
        >
          AI
        </span>
        <span
          data-take-right
          className="display block text-[clamp(2.8rem,11vw,8rem)] leading-[0.85] text-fog"
        >
          Voyage
        </span>
      </div>

      <p
        data-take-label
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[0.5625rem] uppercase tracking-[0.32em] text-[var(--muted)]"
      >
        Keep scrolling
      </p>
    </section>
  );
}
