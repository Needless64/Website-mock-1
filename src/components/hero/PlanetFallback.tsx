'use client';

import { useId } from 'react';

/** Rounded so the server and client serialize identical attribute strings. */
const r = (value: number) => Number(value.toFixed(4));

/**
 * Static planet used while WebGL initialises and on devices without WebGL.
 * Deliberately CSS/SVG only so essential content never depends on the canvas.
 */
export function PlanetFallback({ className = '' }: { className?: string }) {
  const uid = useId().replace(/[:]/g, '');
  const rimId = `planet-rim-${uid}`;
  const clipId = `planet-clip-${uid}`;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 w-[min(165vw,1080px)] -translate-x-1/2">
        <div className="relative aspect-square w-full overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_0%,#2a1040_0%,#150a24_38%,#08080b_72%)] shadow-[0_-1px_0_rgba(255,90,150,0.35),0_-40px_120px_rgba(122,0,200,0.28)]">
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-60">
            <defs>
              <radialGradient id={rimId} cx="50%" cy="0%" r="85%">
                <stop offset="0%" stopColor="#ff4d8d" stopOpacity="1" />
                <stop offset="45%" stopColor="#a13dff" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#2600ea" stopOpacity="0" />
              </radialGradient>
              <clipPath id={clipId}>
                <circle cx="100" cy="100" r="100" />
              </clipPath>
            </defs>
            <circle cx="100" cy="100" r="99" fill="none" stroke={`url(#${rimId})`} strokeWidth="0.8" />
            <g clipPath={`url(#${clipId})`} stroke="#c9a8e8" strokeOpacity="0.24" strokeWidth="0.35" fill="none">
              {Array.from({ length: 13 }).map((_, index) => {
                const t = (index + 1) / 14;
                const y = r(100 - Math.cos(Math.PI * t) * 100);
                const rx = r(Math.sin(Math.PI * t) * 100);
                return <ellipse key={`lat-${index}`} cx="100" cy={y} rx={rx} ry={r(Math.max(0.6, rx * 0.12))} />;
              })}
              {Array.from({ length: 9 }).map((_, index) => {
                const offset = (index / 8 - 0.5) * 2;
                return (
                  <ellipse
                    key={`lon-${index}`}
                    cx="100"
                    cy="100"
                    rx={Math.max(1, Math.abs(offset) * 100)}
                    ry="100"
                    strokeOpacity={0.18}
                  />
                );
              })}
            </g>
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[34%] left-1/2 h-px w-[min(130vw,1000px)] -translate-x-1/2 rotate-[-6deg] bg-[linear-gradient(90deg,transparent,rgba(255,2,89,0.55),rgba(139,0,200,0.5),transparent)]" />
      <div className="absolute bottom-[26%] left-1/2 h-px w-[min(150vw,1180px)] -translate-x-1/2 rotate-[5deg] bg-[linear-gradient(90deg,transparent,rgba(122,92,255,0.3),transparent)]" />
    </div>
  );
}
