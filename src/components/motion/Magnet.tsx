'use client';

import { useEffect, useRef } from 'react';

/**
 * Pulls its child a few pixels toward a fine pointer. Disabled on touch devices
 * and for reduced motion; the content itself never moves out of reach.
 */
export function Magnet({
  children,
  className = '',
  strength = 0.22
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(dx, dy);
        const reach = Math.max(rect.width, rect.height) * 1.1;
        if (distance < reach) {
          el.style.transform = `translate3d(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(1)}px, 0)`;
        } else {
          el.style.transform = 'translate3d(0, 0, 0)';
        }
        frame = 0;
      });
    };

    const onLeave = () => {
      el.style.transform = 'translate3d(0, 0, 0)';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.style.transform = 'translate3d(0, 0, 0)';
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-flex transition-transform duration-500 ${className}`}>
      {children}
    </span>
  );
}
