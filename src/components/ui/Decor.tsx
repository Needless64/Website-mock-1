type FlareProps = {
  size?: number;
  className?: string;
  color?: string;
};

/** Sharp four-point star flare — SVG, no canvas. */
export function StarFlare({ size = 18, className = '', color = '#F8F7FC' }: FlareProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.35))' }}
    >
      <path
        d="M12 0c.42 6.94 5.06 11.58 12 12-6.94.42-11.58 5.06-12 12-.42-6.94-5.06-11.58-12-12C6.94 11.58 11.58 6.94 12 0Z"
        fill={color}
      />
    </svg>
  );
}

/** Angular pink-violet shard cluster built from flat polygons. */
export function ShardCluster({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 200"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M30 8 66 74 34 62 8 96Z" fill="#FF0259" />
      <path d="M66 74 96 44 78 104Z" fill="#FF0259" opacity="0.55" />
      <path d="M30 8 34 62 8 96Z" fill="#E00072" opacity="0.75" />
      <path d="M148 118 208 138 176 154 200 176 140 164Z" fill="#4B22FF" />
      <path d="M148 118 176 154 132 150Z" fill="#2600EA" opacity="0.75" />
      <path d="M176 154 208 138 200 176Z" fill="#8B00C8" opacity="0.9" />
    </svg>
  );
}

/** Sparse four-point star field. */
export function StarField({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <StarFlare size={14} className="absolute left-[8%] top-[22%] opacity-80" />
      <StarFlare size={9} className="absolute left-[26%] top-[34%] opacity-50" />
      <StarFlare size={11} className="absolute right-[16%] top-[26%] opacity-70" />
      <StarFlare size={7} className="absolute right-[9%] top-[48%] opacity-40" />
      <StarFlare size={8} className="absolute left-[46%] top-[16%] opacity-30" />
      <span className="absolute left-[19%] top-[58%] h-px w-px rounded-full bg-white/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.35)]" />
      <span className="absolute right-[28%] top-[62%] h-px w-px rounded-full bg-white/60 shadow-[0_0_6px_2px_rgba(255,255,255,0.3)]" />
      <span className="absolute left-[63%] top-[42%] h-px w-px rounded-full bg-pink/80 shadow-[0_0_8px_2px_rgba(255,2,89,0.5)]" />
    </div>
  );
}

export function MeasurementTicks({ count = 24, className = '' }: { count?: number; className?: string }) {
  return (
    <div className={`pointer-events-none flex items-end gap-[7px] ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="block w-px bg-white/20"
          style={{ height: i % 6 === 0 ? 12 : 5 }}
        />
      ))}
    </div>
  );
}

/** Lightweight planet motif — a coordinated echo of the hero's Three.js scene. */
export function PlanetMotif({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <div className="relative h-full w-full rounded-full border border-white/10 bg-[radial-gradient(circle_at_50%_8%,#2a1040_0%,#150a24_42%,#08080b_76%)] shadow-[inset_0_1px_0_rgba(255,90,150,0.4),0_0_90px_rgba(122,0,200,0.3)]">
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <svg viewBox="0 0 200 200" className="h-full w-full opacity-50">
            {Array.from({ length: 11 }).map((_, index) => {
              const t = (index + 1) / 12;
              const y = Number((100 - Math.cos(Math.PI * t) * 100).toFixed(4));
              const rx = Number((Math.sin(Math.PI * t) * 100).toFixed(4));
              return (
                <ellipse
                  key={`m-lat-${index}`}
                  cx="100"
                  cy={y}
                  rx={rx}
                  ry={Number(Math.max(0.5, rx * 0.1).toFixed(4))}
                  fill="none"
                  stroke="#c9a8e8"
                  strokeOpacity="0.35"
                  strokeWidth="0.4"
                />
              );
            })}
            {Array.from({ length: 7 }).map((_, index) => {
              const offset = (index / 6 - 0.5) * 2;
              return (
                <ellipse
                  key={`m-lon-${index}`}
                  cx="100"
                  cy="100"
                  rx={Number(Math.max(1, Math.abs(offset) * 100).toFixed(4))}
                  ry="100"
                  fill="none"
                  stroke="#c9a8e8"
                  strokeOpacity="0.16"
                  strokeWidth="0.4"
                />
              );
            })}
          </svg>
        </div>
      </div>
      <span className="absolute left-1/2 top-1/2 h-[48%] w-[132%] -translate-x-1/2 -translate-y-1/2 rotate-[-16deg] rounded-[50%] border border-pink/25" />
      <span className="absolute left-1/2 top-1/2 h-[34%] w-[118%] -translate-x-1/2 -translate-y-1/2 rotate-[12deg] rounded-[50%] border border-[#7a5cff]/25" />
    </div>
  );
}

/** Thin orbital arc used as a recurring motif outside the hero. */
export function OrbitalArc({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 640" fill="none" aria-hidden="true" className={className}>
      <circle cx="320" cy="320" r="240" stroke="rgba(255,2,89,0.42)" strokeWidth="1" />
      <circle cx="320" cy="320" r="238" stroke="rgba(122,0,212,0.3)" strokeWidth="0.6" />
      <ellipse cx="320" cy="320" rx="310" ry="118" stroke="rgba(255,2,89,0.28)" strokeWidth="1" transform="rotate(-18 320 320)" />
      <ellipse cx="320" cy="320" rx="256" ry="96" stroke="rgba(167,120,255,0.22)" strokeWidth="1" transform="rotate(14 320 320)" />
    </svg>
  );
}
