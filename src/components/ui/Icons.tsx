type IconProps = { className?: string };

export function CalendarIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="3" y="5" width="18" height="16" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3 9.5h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7.5 13h3v3h-3z" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

export function TeamIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8M17.5 15.2c1.9.6 3 2.2 3 4.8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function VenueIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 21h20" stroke="currentColor" strokeWidth="1" opacity="0.45" />
    </svg>
  );
}

export function PrizeIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 5.5H4V8a3 3 0 0 0 3 3M17 5.5h3V8a3 3 0 0 1-3 3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12 14v4M8.5 21h7l-.8-3h-5.4l-.8 3Z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function TicketIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M3 8V6h18v2a3 3 0 0 0 0 6v4H3v-4a3 3 0 0 0 0-6Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 6v2M9 11v2M9 16v2" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1 3" />
    </svg>
  );
}

export function ThemeIcon({ id, className = '' }: IconProps & { id: 'agri-tech' | 'med-tech' | 'ed-tech' }) {
  if (id === 'agri-tech') {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
        <path d="M24 40V20" stroke="currentColor" strokeWidth="1.4" />
        <path d="M24 26c0-8 6-13 15-13 0 9-6 14-15 14Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M24 33c0-6-5-10-12-10 0 7 5 11 12 11Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M6 40h36" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="36" cy="8" r="2" fill="currentColor" />
        <path d="M36 10v5M33 12h6" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </svg>
    );
  }
  if (id === 'med-tech') {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
        <path d="M24 8c-9 0-16 6-16 16s7 16 16 16 16-6 16-16" stroke="currentColor" strokeWidth="1.4" />
        <path d="M24 8c5 0 9 3 12 7" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
        <path d="M14 24h6l3-7 4 14 3-7h4" stroke="currentColor" strokeWidth="1.4" />
        <path d="M36 6v8M32 10h8" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <path d="M6 34 24 24l18 10-18 10L6 34Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 25 24 15l18 10M6 16 24 6l18 10" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <path d="M24 24v20" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <circle cx="38" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}
