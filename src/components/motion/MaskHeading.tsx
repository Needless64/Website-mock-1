'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsapWithScroll, prefersReducedMotion } from '@/lib/gsap';

/**
 * Section headings that rise out of a mask, one line at a time.
 * Lines are plain text in the DOM, so nothing depends on the animation.
 */
export function MaskHeading({
  lines,
  className = '',
  lineClass = [],
  as = 'h2'
}: {
  lines: string[];
  className?: string;
  lineClass?: (string | undefined)[];
  as?: 'h2' | 'h3';
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const inners = el.querySelectorAll<HTMLElement>('[data-line]');
    if (prefersReducedMotion() || inners.length === 0) return;

    const { gsap } = gsapWithScroll();
    const ctx = gsap.context(() => {
      gsap.from(inners, {
        yPercent: 115,
        rotate: 2.5,
        duration: 1.05,
        ease: 'expo.out',
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const Tag = as as 'h2';

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <span
            data-line
            className={`block will-change-transform ${lineClass[index] ?? ''}`}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
