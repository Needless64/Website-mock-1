import { CONTACTS, CONTACT_EMAIL, EVENT, NAV_LINKS } from '@/config/event';
import { IdentityMark } from '@/components/brand/IdentityMark';
import { RegisterCta } from '@/components/ui/RegisterCta';
import { MeasurementTicks, StarFlare } from '@/components/ui/Decor';
import { ArrowUpRight } from '@/components/ui/Arrow';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#070609]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,2,89,0.6),rgba(38,0,234,0.6),transparent)]"
      />
      <div className="shell relative">
        <div className="flex flex-col gap-8 border-b border-white/10 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="display max-w-2xl text-[clamp(1.9rem,4.4vw,3.5rem)]">
            The voyage <span className="gradient-text">starts here.</span>
          </p>
          <RegisterCta label="Register Now" className="self-start sm:self-auto" />
        </div>

        <div className="grid gap-10 py-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="text-[1.5rem] font-black uppercase leading-none tracking-[-0.04em]">
              ZENITH <span className="gradient-text">’26</span>
            </p>
            <p className="mt-2 font-mono text-[0.5625rem] uppercase tracking-[0.24em] text-[var(--muted)]">
              {EVENT.tagline} · MLRIT, Hyderabad
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
              <IdentityMark identity="mlrit" variant="footer" />
              <IdentityMark identity="aws" variant="footer" />
              <IdentityMark identity="scope" variant="footer" />
              <IdentityMark identity="sbg" variant="footer" />
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="label-mono">Index</p>
            <ul className="mt-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="link-underline inline-flex min-h-[36px] items-center text-[0.875rem] text-[var(--muted)] transition-colors hover:text-fog"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#register"
                  className="link-underline inline-flex min-h-[36px] items-center text-[0.875rem] text-fog transition-colors hover:text-pink"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="label-mono">For queries</p>
            <ul className="mt-4 space-y-3">
              {CONTACTS.map((contact) => (
                <li key={contact.name}>
                  <a
                    href={`tel:${contact.tel}`}
                    className="group flex items-baseline justify-between gap-4 border-b border-white/10 pb-3 transition-colors hover:border-pink/50"
                  >
                    <span className="text-[0.9375rem] text-fog">{contact.name}</span>
                    <span className="font-mono text-[0.75rem] tracking-[0.06em] text-[var(--muted)] group-hover:text-pink">
                      {contact.phone}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            {CONTACT_EMAIL && (
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] text-[var(--muted)] transition-colors hover:text-fog"
              >
                {CONTACT_EMAIL}
                <ArrowUpRight />
              </a>
            )}
            <p className="mt-6 text-[0.8125rem] leading-relaxed text-[var(--muted)]">
              17–19 December 2026
              <br />
              MLR Institute of Technology
              <br />
              Dundigal, Hyderabad
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-[var(--muted)]">
            © 2026 ZENITH · SCOPE Club, MLRIT
          </p>
          <div className="flex items-center gap-6">
            <MeasurementTicks count={10} className="hidden sm:flex" />
            <a
              href="#top"
              className="inline-flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-[var(--muted)] transition-colors hover:text-fog"
            >
              Back to top
              <StarFlare size={9} color="#FF0259" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
