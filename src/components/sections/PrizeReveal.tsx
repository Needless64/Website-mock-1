'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsapWithScroll, prefersReducedMotion } from '@/lib/gsap';

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-IN').format(Math.round(value));
}

/** Counts the prize pool up once, the first time it enters the viewport. */
export function PrizeCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finalText = formatNumber(value);
    if (prefersReducedMotion()) {
      el.textContent = finalText;
      return;
    }

    const { gsap } = gsapWithScroll();
    const proxy = { v: 0 };

    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        v: value,
        duration: 1.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: () => {
          el.textContent = formatNumber(proxy.v);
        },
        onComplete: () => {
          el.textContent = finalText;
        }
      });
    }, el);

    return () => ctx.revert();
  }, [value]);

  return <span ref={ref}>{formatNumber(value)}</span>;
}

/** Orbital geometry that draws itself as the section is scrubbed. */
export function PrizeOrbit({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    const rings = svg.querySelectorAll<SVGCircleElement>('[data-ring]');
    if (prefersReducedMotion()) {
      rings.forEach((ring) => ring.style.setProperty('stroke-dashoffset', '0'));
      return;
    }

    const { gsap } = gsapWithScroll();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rings,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          stagger: 0.12,
          scrollTrigger: {
            trigger: svg,
            start: 'top 92%',
            end: 'bottom 55%',
            scrub: 0.8
          }
        }
      );
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 640 640"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <circle
        data-ring
        cx="320"
        cy="320"
        r="240"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
        stroke="rgba(255,2,89,0.45)"
        strokeWidth="1"
      />
      <circle
        data-ring
        cx="320"
        cy="320"
        r="238"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
        stroke="rgba(122,0,212,0.32)"
        strokeWidth="0.6"
      />
      <ellipse
        data-ring
        cx="320"
        cy="320"
        rx="310"
        ry="118"
        transform="rotate(-18 320 320)"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
        stroke="rgba(255,2,89,0.3)"
        strokeWidth="1"
      />
      <ellipse
        data-ring
        cx="320"
        cy="320"
        rx="256"
        ry="96"
        transform="rotate(14 320 320)"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
        stroke="rgba(167,120,255,0.26)"
        strokeWidth="1"
      />
      <circle data-ring cx="320" cy="320" r="6" pathLength={1} strokeDasharray="1" strokeDashoffset="1" stroke="#FF0259" strokeWidth="1" />
    </svg>
  );
}
