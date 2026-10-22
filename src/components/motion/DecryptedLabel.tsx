'use client';

import { useEffect, useRef, useState } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>*#';

/**
 * Decrypted text (adapted from React Bits' DecryptedText) reimplemented with
 * plain React + setInterval, so the project does not need `motion` as an extra
 * dependency. The real characters are server-rendered and announced to screen
 * readers; only the visual glyphs scramble.
 */
export function DecryptedLabel({
  text,
  className = '',
  speed = 34,
  animateOn = 'view'
}: {
  text: string;
  className?: string;
  speed?: number;
  animateOn?: 'view' | 'hover' | 'mount';
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(text);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let interval: ReturnType<typeof setInterval> | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let observer: IntersectionObserver | undefined;

    const run = () => {
      if (started.current) return;
      started.current = true;
      let frame = 0;
      const total = Math.max(8, Math.round(480 / speed));
      interval = setInterval(() => {
        frame += 1;
        const revealed = Math.floor((frame / total) * text.length);
        setDisplay(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' ';
              if (i < revealed) return char;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join('')
        );
        if (frame >= total) {
          window.clearInterval(interval);
          setDisplay(text);
        }
      }, speed);
    };

    if (animateOn === 'mount') {
      timeout = setTimeout(run, 120);
    } else if (animateOn === 'hover') {
      el.addEventListener('pointerenter', run);
      el.addEventListener('focus', run);
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            run();
            observer?.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
    }

    return () => {
      window.clearInterval(interval);
      clearTimeout(timeout);
      observer?.disconnect();
      el.removeEventListener('pointerenter', run);
      el.removeEventListener('focus', run);
    };
  }, [animateOn, speed, text]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
