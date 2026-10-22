'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { THEMES, type Theme } from '@/config/event';
import { ThemeIcon } from '@/components/ui/Icons';
import { ArrowUpRight } from '@/components/ui/Arrow';
import { MaskHeading } from '@/components/motion/MaskHeading';
import { PlanetMotif } from '@/components/ui/Decor';
import { gsapWithScroll, prefersReducedMotion } from '@/lib/gsap';
import GlareHover from '@/components/reactbits/GlareHover';

const FRAMES = [
  {
    clip: 'polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 0 100%)',
    accent: 'rgba(255,2,89,0.20)',
    offset: 'lg:mt-0'
  },
  {
    clip: 'polygon(0 0, 100% 0, 100% calc(100% - 26px), calc(100% - 26px) 100%, 0 100%)',
    accent: 'rgba(122,0,212,0.22)',
    offset: 'lg:mt-10'
  },
  {
    clip: 'polygon(26px 0, 100% 0, 100% 100%, 0 100%, 0 26px)',
    accent: 'rgba(38,0,234,0.24)',
    offset: 'lg:mt-4'
  }
];

export function ThemeExplorer() {
  const [active, setActive] = useState<Theme['id']>('agri-tech');
  const selected = THEMES.find((theme) => theme.id === active);
  const gridRef = useRef<HTMLDivElement>(null);

  // Cards arrive with a stagger instead of a plain fade.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return;

    const { gsap } = gsapWithScroll();
    const ctx = gsap.context(() => {
      gsap.from('[data-tilt]', {
        y: 96,
        rotate: 1.6,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: grid, start: 'top 84%', once: true }
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  // Pointer tilt — fine pointers only, reset on leave, off for reduced motion.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-tilt]'));
    const handlers = cards.map((card) => {
      const onMove = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1100px) rotateX(${(-py * 4.5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(
          2
        )}deg) translateZ(0)`;
      };
      const onLeave = () => {
        card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      };
      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', onLeave);
      return () => {
        card.removeEventListener('pointermove', onMove);
        card.removeEventListener('pointerleave', onLeave);
      };
    });

    return () => handlers.forEach((dispose) => dispose());
  }, []);

  return (
    <section id="themes" className="section relative overflow-hidden">
      <PlanetMotif className="absolute -right-24 top-6 hidden h-[340px] w-[340px] opacity-50 xl:block" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12%] top-[18%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(38,0,234,0.22),transparent_68%)] blur-2xl"
      />

      <div className="shell relative">
        <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Hackathon themes</p>
            <MaskHeading
              lines={['Choose your', 'voyage']}
              lineClass={[undefined, 'gradient-text']}
              className="display mt-5 text-[clamp(2.4rem,6.4vw,5.2rem)]"
            />
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="max-w-md text-pretty text-[0.9375rem] leading-relaxed text-[var(--muted)]">
              Three tracks, one voyage. Pick the problem space where your team can build something
              that holds up outside the demo — then follow it for three days.
            </p>
            <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[var(--muted)]">
              03 tracks / 01 mission
            </p>
          </div>
        </div>

        <div ref={gridRef} className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-3">
          {THEMES.map((theme, index) => {
            const frame = FRAMES[index];
            const isActive = active === theme.id;
            return (
              <div key={theme.id} className={`${frame.offset} h-full`}>
                <div
                  data-tilt
                  className="h-full will-change-transform transition-transform duration-300 ease-out"
                >
                <GlareHover
                  width="100%"
                  borderRadius="0px"
                  background="#0C0A11"
                  borderColor="rgba(255,255,255,0.15)"
                  glareColor="#FF6A9D"
                  glareOpacity={0.32}
                  glareSize={34}
                  variant="streak"
                  className="theme-card group relative w-full text-left transition-colors duration-500 hover:!border-[rgba(255,2,89,0.45)]"
                  style={{ clipPath: frame.clip }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(120% 90% at 20% 0%, ${frame.accent}, transparent 62%)`
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setActive(theme.id)}
                    aria-expanded={isActive}
                    aria-controls="theme-detail"
                    className="relative flex h-full w-full flex-col items-start gap-6 p-6 text-left focus-visible:outline-offset-[-4px] sm:p-7"
                  >
                    <span className="flex w-full items-center justify-between">
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                        {theme.index} / Track
                      </span>
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 rotate-45 border transition-colors ${
                          isActive ? 'border-pink bg-pink' : 'border-white/40'
                        }`}
                      />
                    </span>

                    <span className="mt-2 flex items-center gap-4">
                      <span className="relative block h-16 w-16 text-fog">
                        <span className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,2,89,0.35),rgba(38,0,234,0.35))]" />
                        <ThemeIcon id={theme.id} className="relative h-16 w-16 p-3" />
                      </span>
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                        {theme.tagline}
                      </span>
                    </span>

                    <span
                      role="heading"
                      aria-level={3}
                      className="display block text-[clamp(2.2rem,4.4vw,3.1rem)] leading-[0.9]"
                    >
                      {theme.name}
                    </span>

                    <span className="theme-desc block min-h-[3.25rem] text-pretty text-[0.875rem] leading-relaxed text-[var(--muted)]">
                      {theme.description}
                    </span>

                    <span className="mt-2 inline-flex items-center gap-2 border-t border-white/10 pt-4 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-fog">
                      {isActive ? 'Open track' : 'View track'}
                      <ArrowUpRight />
                    </span>
                  </button>
                </GlareHover>
                </div>
              </div>
            );
          })}
        </div>

        {selected && (
          <div
            id="theme-detail"
            key={selected.id}
            role="region"
            aria-live="polite"
            aria-label={`${selected.name} track detail`}
            className="detail-in relative mt-6 border border-white/15 bg-[#0E0B14]"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-full w-[3px] bg-[linear-gradient(180deg,#FF0259,#2600EA)]"
            />
            <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <p className="label-mono">{selected.index} / Selected track</p>
                <h3 className="display mt-3 text-[clamp(2rem,4vw,3.2rem)]">{selected.name}</h3>
                <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-pink">
                  {selected.tagline}
                </p>
              </div>
              <div className="lg:col-span-7">
                <p className="max-w-2xl text-pretty text-[0.9375rem] leading-relaxed text-fog/90">
                  {selected.detail}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {selected.focus.map((item) => (
                    <li
                      key={item}
                      className="border border-white/15 px-3 py-2 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-[var(--muted)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-white/10 pt-4 text-[0.8125rem] leading-relaxed text-[var(--muted)]">
                  Official problem statements will be released by the organisers. Nothing here
                  implies a specific challenge brief.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
