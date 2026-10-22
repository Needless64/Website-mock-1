import { REGISTRATION, REGISTRATION_OPEN } from '@/config/event';
import { ArrowUpRight } from './Arrow';

type Props = {
  label?: string;
  variant?: 'primary' | 'ghost';
  className?: string;
  showArrow?: boolean;
};

/**
 * While no verified registration URL is configured, the CTA routes to the
 * #register section which states plainly that the link is pending. It never
 * pretends a registration succeeded and never links to a guessed destination.
 */
export function RegisterCta({
  label = 'Register Now',
  variant = 'primary',
  className = '',
  showArrow = true
}: Props) {
  const base = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`;

  if (REGISTRATION_OPEN) {
    return (
      <a
        href={REGISTRATION.url}
        target="_blank"
        rel="noopener noreferrer"
        className={base}
        data-registration="live"
      >
        <span>{label}</span>
        {showArrow && <ArrowUpRight />}
      </a>
    );
  }

  return (
    <a href="#register" className={base} data-registration="pending">
      <span>{label}</span>
      {showArrow && <ArrowUpRight />}
      <span className="sr-only">
        The official registration link has not been published yet. This opens the registration
        information section.
      </span>
    </a>
  );
}

export function RegistrationStatusLine({ className = '' }: { className?: string }) {
  return (
    <p className={`font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.2em] ${className}`}>
      {REGISTRATION_OPEN ? (
        <a
          href={REGISTRATION.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--muted)] underline decoration-white/30 underline-offset-4 transition-colors hover:text-fog"
        >
          Official registration link ↗
        </a>
      ) : (
        <span className="text-[var(--muted)]">
          Registration link pending · contact the organisers
        </span>
      )}
    </p>
  );
}
