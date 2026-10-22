'use client';

import dynamic from 'next/dynamic';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { EVENT } from '@/config/event';
import { HERO_IDENTITIES } from '@/config/brand';
import { IdentityMark } from '@/components/brand/IdentityMark';
import { RegisterCta, RegistrationStatusLine } from '@/components/ui/RegisterCta';
import { ArrowDown } from '@/components/ui/Arrow';
import { DecryptedLabel } from '@/components/motion/DecryptedLabel';
import { Magnet } from '@/components/motion/Magnet';
import { MeasurementTicks, ShardCluster, StarField } from '@/components/ui/Decor';
import { PlanetFallback } from './PlanetFallback';
import { gsapWithScroll, prefersReducedMotion } from '@/lib/gsap';

const PlanetScene = dynamic(() => import('./PlanetScene'), { ssr: false });

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const [planetReady, setPlanetReady] = useState(false);
  const onPlanetReady = useCallback(() => setPlanetReady(true), []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion()) {
      setPlanetReady(true);
      return;
    }

    const { gsap } = gsapWithScroll();
    let tearTimer = 0;

    const ctx = gsap.context(() => {
      // 1. Entrance choreography
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('[data-hero-item]', { y: 14, opacity: 0, duration: 0.6, stagger: 0.07 }, 0.1)
        .from('[data-hero="eyebrow"]', { opacity: 0, y: 10, duration: 0.5 }, 0.15)
        .from('[data-hero="title-inner"]', { yPercent: 108, duration: 1.15, ease: 'expo.out' }, 0.26)
        .from('[data-hero="year"]', { opacity: 0, y: 18, duration: 0.7 }, 0.85)
        .from('[data-hero="tagline"]', { opacity: 0, y: 16, duration: 0.7 }, 0.98)
        .from('[data-hero="desc"]', { opacity: 0, y: 16, duration: 0.7 }, 1.08)
        .from('[data-hero="cta"] > *', { opacity: 0, y: 16, duration: 0.7, stagger: 0.09 }, 1.18)
        .from('[data-shard]', { opacity: 0, scale: 0.55, duration: 0.9, stagger: 0.12, ease: 'power2.out' }, 0.5)
        .from('[data-hero="foot"]', { opacity: 0, duration: 0.8 }, 1.35)
        .add(() => {
          const node = titleRef.current;
          if (!node) return;
          node.classList.add('rgb-tear');
          tearTimer = window.setTimeout(() => node.classList.remove('rgb-tear'), 520);
        }, 1.02);

      // 2. Shards: rest angle, pointer drift, scroll exit
      const shards = gsap.utils.toArray<HTMLElement>('[data-shard-parallax]');
      shards.forEach((shard, index) => gsap.set(shard, { rotate: index === 0 ? -6 : 8 }));

      if (shards.length) {
        gsap.to(shards, {
          y: -220,
          opacity: 0,
          rotate: (index) => (index === 0 ? -22 : 28),
          ease: 'none',
          stagger: 0.18,
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.8 }
        });
      }

      // 3. The hero dives away as the planet rises into it
      gsap.to('[data-hero="content"]', {
        y: 150,
        scale: 1.06,
        opacity: 0,
        filter: 'blur(6px)',
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.5 }
      });

      gsap.to('[data-hero="strip"]', {
        y: -70,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: '60% top', scrub: 0.6 }
      });

      gsap.to('[data-hero="stars"]', {
        y: -90,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 1 }
      });

      // 4. Light travels through the wordmark as you scroll
      gsap.fromTo(
        '[data-hero="title-inner"]',
        { backgroundPositionX: '0%' },
        {
          backgroundPositionX: '100%',
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.9 }
        }
      );
    }, section);

    const shardElements = gsap.utils.toArray<HTMLElement>('[data-shard-parallax]');
    const xTo = shardElements.map((shard, index) =>
      gsap.quickTo(shard, 'x', { duration: 0.8, ease: 'power3.out' })
    );
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const nx = event.clientX / window.innerWidth - 0.5;
        xTo.forEach((to, index) => to(nx * (index === 0 ? 34 : -28)));
        frame = 0;
      });
    };

    if (finePointer) window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.clearTimeout(tearTimer);
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_-10%,rgba(38,0,234,0.28),transparent_58%),radial-gradient(ellipse_at_82%_8%,rgba(255,2,89,0.14),transparent_55%)]"
      />
      <div data-hero="stars" className="absolute inset-0">
        <StarField className="opacity-70" />
      </div>

      <div className="shell relative z-10 flex flex-1 flex-col pb-[28vh] pt-[80px] sm:pb-[26vh] sm:pt-[92px]">
        {/* Institutional identities */}
        <div data-hero="strip" className="grid grid-cols-2 gap-x-6 gap-y-3.5 border-y border-white/10 py-3.5 md:flex md:items-center md:justify-between md:gap-6 md:py-4">
          {HERO_IDENTITIES.map((identity) => (
            <div key={identity} data-hero-item className="md:flex md:items-center">
              <IdentityMark identity={identity} variant="hero" />
            </div>
          ))}
        </div>

        {/* Headline block */}
        <div data-hero="content" className="relative mt-6 sm:mt-9">
          <div
            data-shard-parallax
            className="pointer-events-none absolute -left-4 -top-7 w-12 opacity-90 will-change-transform sm:-left-10 sm:-top-14 sm:w-24 lg:w-28"
            aria-hidden="true"
          >
            <div data-shard>
              <ShardCluster className="h-auto w-full" />
            </div>
          </div>
          <div
            data-shard-parallax
            className="pointer-events-none absolute right-0 top-[42%] hidden w-12 opacity-80 will-change-transform sm:-right-4 sm:block sm:w-20"
            aria-hidden="true"
          >
            <div data-shard>
              <ShardCluster className="h-auto w-full" />
            </div>
          </div>

          <div data-hero="eyebrow">
            <DecryptedLabel text="Scope Club Presents" className="eyebrow" speed={28} />
          </div>

          <h1 className="relative mt-3 sm:mt-4">
            <span className="sr-only">ZENITH ’26 — The AI Voyage</span>
            <span aria-hidden="true" className="block overflow-hidden pb-[0.06em]">
              <span
                ref={titleRef}
                data-hero="title-inner"
                className="gradient-text gradient-shift display block will-change-transform"
                style={{ fontSize: 'clamp(4.6rem, 18vw, 15rem)' }}
              >
                ZENITH
              </span>
            </span>
          </h1>

          <div data-hero="year" className="mt-1 flex items-center gap-4 sm:mt-2 sm:gap-6">
            <span className="border border-white/25 bg-[#101014] px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-fog sm:text-[0.625rem]">
              The Year of
            </span>
            <span className="gradient-text text-[clamp(1.9rem,4.6vw,3.4rem)] font-black leading-none tracking-[-0.04em]">
              2026
            </span>
            <span
              aria-hidden="true"
              className="hidden h-px flex-1 bg-[linear-gradient(90deg,rgba(255,2,89,0.5),rgba(255,255,255,0.06))] sm:block"
            />
            <span className="hidden font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[var(--muted)] md:block">
              {EVENT.city}
            </span>
          </div>

          <p
            data-hero="tagline"
            className="mt-4 text-[clamp(1.25rem,3.2vw,2.4rem)] font-bold uppercase leading-none tracking-[0.06em] sm:mt-6 sm:tracking-[0.12em]"
          >
            The AI Voyage<span className="text-pink">.</span>
          </p>

          <p
            data-hero="desc"
            className="mt-4 max-w-[34rem] text-pretty text-[0.925rem] leading-relaxed text-[var(--muted)] sm:mt-5 sm:text-base"
          >
            Join us for a{' '}
            <span className="font-semibold text-fog">2-Day National-Level Hackathon</span> and{' '}
            <span className="font-semibold text-fog">AWS Student Community Day</span> at MLRIT,
            Hyderabad.
          </p>

          <div
            data-hero="cta"
            className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center sm:gap-4"
          >
            <Magnet className="w-full sm:w-auto">
              <RegisterCta label="Register Now" className="w-full sm:w-auto" />
            </Magnet>
            <Magnet className="w-full sm:w-auto">
              <a href="#themes" className="btn btn-ghost w-full sm:w-auto">
                Explore the Voyage
                <ArrowDown />
              </a>
            </Magnet>
          </div>
          <div data-hero="cta" className="mt-3 sm:mt-4">
            <RegistrationStatusLine />
          </div>
        </div>
      </div>

      {/* Foot line — sits over the planet's horizon */}
      <div
        data-hero="foot"
        className="shell pointer-events-none absolute inset-x-0 bottom-5 z-20 flex items-end justify-between gap-6 sm:bottom-7"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.24em] text-[var(--muted)]">
            01 / Scroll
          </span>
          <span className="block h-8 w-px bg-[linear-gradient(180deg,rgba(255,2,89,0.8),transparent)]" />
        </div>
        <div className="hidden flex-col items-end gap-2 sm:flex">
          <MeasurementTicks count={14} />
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.24em] text-[var(--muted)]">
            {EVENT.coordinates}
          </span>
        </div>
      </div>

      {/* Planet — emerges from the bottom edge, never covers the copy above */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[58vh] min-h-[320px]">
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            planetReady ? 'opacity-0' : 'opacity-60'
          }`}
        >
          <PlanetFallback />
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
            planetReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <PlanetScene onReady={onPlanetReady} />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,#08080B_0%,rgba(8,8,11,0)_100%)]"
        />
      </div>
    </section>
  );
}
