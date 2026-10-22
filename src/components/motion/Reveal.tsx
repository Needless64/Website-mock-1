'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsapWithScroll, prefersReducedMotion } from '@/lib/gsap';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'footer';
};

export function Reveal({ children, className = '', delay = 0, y = 30, as = 'div' }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsapWithScroll().gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const { gsap } = gsapWithScroll();
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y,
        opacity: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true
        }
      });
    }, el);

    return () => ctx.revert();
  }, [delay, y]);

  const Tag = as as unknown as React.ComponentType<{
    ref?: React.Ref<HTMLElement>;
    className?: string;
    children?: React.ReactNode;
  }>;

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
