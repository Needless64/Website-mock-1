'use client';

import { useLayoutEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/gsap';
import { StarFlare } from '@/components/ui/Decor';

const TREATMENT = ['text-outline', 'gradient-text', ''];

/**
 * A giant band whose speed and direction follow your scroll gesture — flick
 * down and it rockets, scroll up and it reverses. Static when reduced motion.
 */
export function VelocityMarquee({ items, className = '' }: { items: string[]; className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (prefersReducedMotion()) return;

    let x = 0;
    let velocity = 0;
    let lastY = window.scrollY;
    let width = 0;
    let visible = true;
    let raf = 0;

    const measure = () => {
      width = track.scrollWidth / 2;
    };
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersectionObserver.observe(track);

    const tick = () => {
      raf = window.requestAnimationFrame(tick);
      const y = window.scrollY;
      velocity = y - lastY;
      lastY = y;
      if (!visible || width < 1) return;

      x -= 1.1 + velocity * 0.24;
      if (x <= -width) x += width;
      if (x > 0) x -= width;
      track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  const Row = ({ hidden }: { hidden?: boolean }) => (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden ? 'true' : undefined}>
      {items.map((item, index) => (
        <span key={item} className="flex items-center gap-10">
          <span
            className={`display whitespace-nowrap text-[clamp(1.6rem,4.4vw,3.4rem)] ${
              TREATMENT[index % TREATMENT.length]
            }`}
          >
            {item}
          </span>
          <StarFlare size={12} color="#FF0259" />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`relative overflow-hidden border-y border-white/10 bg-[#09080D] ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-[linear-gradient(90deg,#09080D,transparent)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-[linear-gradient(270deg,#09080D,transparent)]" />
      <div ref={trackRef} className="flex w-max items-center py-6 will-change-transform">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
