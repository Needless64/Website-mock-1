'use client';

import { useEffect, useRef, useState } from 'react';
import { gsapWithScroll } from '@/lib/gsap';

/**
 * An accent cursor ring that trails a fine pointer and swells over anything
 * interactive. The native cursor is kept for usability; this only adds feel.
 */
export function CustomCursor() {
  const [armed, setArmed] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const { gsap } = gsapWithScroll();
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2' });

    let shown = false;

    const onMove = (event: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.to([ring, dot], { opacity: 1, duration: 0.35 });
      }
      ringX(event.clientX);
      ringY(event.clientY);
      dotX(event.clientX);
      dotY(event.clientY);
    };

    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest?.('a, button, [role="button"], [data-tilt]');
      gsap.to(ring, { scale: target ? 1.85 : 1, duration: 0.35, ease: 'power3.out' });
    };

    const onLeave = () => {
      gsap.to([ring, dot], { opacity: 0, duration: 0.25 });
      shown = false;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf([ring, dot]);
    };
  }, [armed]);

  if (!armed) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] hidden lg:block" aria-hidden="true">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 -ml-[18px] -mt-[18px] h-9 w-9 rounded-full border border-white/60 opacity-0 mix-blend-difference will-change-transform"
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-[#FF0259] opacity-0 will-change-transform"
      />
    </div>
  );
}
