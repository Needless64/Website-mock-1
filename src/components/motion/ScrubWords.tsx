'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsapWithScroll, prefersReducedMotion } from '@/lib/gsap';

/**
 * Words brighten one after another as the block travels through the viewport.
 * Content is real text at all times (no aria tricks), the effect only changes opacity.
 */
export function ScrubWords({
  text,
  className = '',
  dim = 0.16
}: {
  text: string;
  className?: string;
  dim?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLSpanElement>('[data-word]');
    if (prefersReducedMotion() || words.length === 0) {
      words.forEach((word) => (word.style.opacity = '1'));
      return;
    }

    const { gsap } = gsapWithScroll();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: dim },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.9,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'top 34%',
            scrub: 0.55
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, [dim, text]);

  return (
    <p ref={ref} className={className}>
      {text.split(' ').map((word, index) => (
        <span key={`${word}-${index}`} data-word className="inline-block">
          {word}
          {index < text.split(' ').length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </p>
  );
}
