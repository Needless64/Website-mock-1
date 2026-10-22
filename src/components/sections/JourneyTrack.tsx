'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsapWithScroll, prefersReducedMotion } from '@/lib/gsap';
import { StarFlare } from '@/components/ui/Decor';

type Day = { date: string; month: string; label: string; note: string };

const TREATMENT = ['gradient-text', 'text-outline', ''];

/**
 * Desktop journey: the three days slide through a pinned stage as you scroll,
 * with a progress rail. Without pinning support the track stays natively
 * scrollable, so the content is never trapped.
 */
export function JourneyTrack({ days }: { days: Day[] }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = gsapWithScroll();
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const previousOverflow = pin.style.overflowX;
      pin.style.overflowX = 'hidden';

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 140);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top 24%',
          end: () => `+=${distance() + window.innerHeight * 0.5}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (railRef.current) railRef.current.style.transform = `scaleX(${self.progress.toFixed(4)})`;
          }
        }
      });

      return () => {
        pin.style.overflowX = previousOverflow;
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      mm.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div className="no-scrollbar hidden overflow-x-auto lg:block" ref={pinRef}>
      <div className="shell py-10">
        <div ref={trackRef} className="flex gap-10 will-change-transform xl:gap-16">
          {days.map((day, index) => (
            <article
              key={day.date}
              className="relative w-[52vw] max-w-[46rem] shrink-0 border-t border-white/15 pt-7"
            >
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-3 w-3 rotate-45 border border-pink bg-[#08080B] shadow-[0_0_18px_rgba(255,2,89,0.55)]"
                />
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                  {day.label}
                </span>
                <span className="ml-auto font-mono text-[0.625rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                  0{index + 1} / 03
                </span>
              </div>

              <div className="relative mt-6 flex items-start justify-between gap-6">
                <p className={`display text-[clamp(8rem,13vw,13.5rem)] leading-[0.78] ${TREATMENT[index]}`}>
                  {day.date}
                </p>
                <StarFlare
                  size={index === 1 ? 22 : 14}
                  color={index === 2 ? '#2600EA' : '#FF0259'}
                  className="mt-6 shrink-0"
                />
              </div>

              <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                {day.month}
              </p>
              <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-fog/80">{day.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 h-px w-full bg-white/10">
          <div
            ref={railRef}
            className="h-px w-full origin-left bg-[linear-gradient(90deg,#FF0259,#E00072_50%,#2600EA)]"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </div>
  );
}
