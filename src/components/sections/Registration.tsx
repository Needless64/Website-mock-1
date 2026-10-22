import Image from 'next/image';
import { CONTACTS, CONTACT_EMAIL, EVENT, REGISTRATION, REGISTRATION_OPEN } from '@/config/event';
import { RegisterCta } from '@/components/ui/RegisterCta';
import { CalendarIcon, PrizeIcon, TeamIcon, TicketIcon, VenueIcon } from '@/components/ui/Icons';
import { Reveal } from '@/components/motion/Reveal';
import { MaskHeading } from '@/components/motion/MaskHeading';
import { ArrowUpRight } from '@/components/ui/Arrow';

const DETAILS = [
  { label: 'Event dates', value: EVENT.dates, icon: CalendarIcon },
  { label: 'Team size', value: `${EVENT.teamSize} members`, icon: TeamIcon },
  { label: 'Registration fee', value: EVENT.fee, icon: TicketIcon },
  { label: 'Venue', value: EVENT.venueFull, icon: VenueIcon },
  { label: 'Prize pool', value: `${EVENT.prize}/-`, icon: PrizeIcon }
];

export function Registration() {
  return (
    <section id="register" className="section relative overflow-hidden border-t border-white/10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_55%,rgba(224,0,114,0.12),transparent_55%)]"
      />
      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow">Registration</p>
            <MaskHeading
              lines={['Secure', 'your spot']}
              lineClass={[undefined, 'gradient-text']}
              className="display mt-5 text-[clamp(2.5rem,7vw,5.6rem)]"
            />
          </div>
          <div className="lg:col-span-4 lg:pb-4">
            <p className="text-[0.9375rem] leading-relaxed text-[var(--muted)]">
              Three days at MLRIT, Hyderabad. Bring a team of three to four and a track you want to
              push.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <dl className="border-t border-white/15">
              {DETAILS.map((detail) => {
                const Icon = detail.icon;
                return (
                  <div
                    key={detail.label}
                    className="flex items-center justify-between gap-6 border-b border-white/10 py-4 sm:py-5"
                  >
                    <dt className="flex items-center gap-3 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[var(--muted)]">
                      <Icon className="h-4 w-4 text-pink" />
                      {detail.label}
                    </dt>
                    <dd className="max-w-[62%] text-right text-[0.9375rem] font-medium leading-snug text-fog">
                      {detail.value}
                    </dd>
                  </div>
                );
              })}
            </dl>

            <div className="mt-7 border border-white/15 bg-[#0D0B12] p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-fog">
                  {REGISTRATION_OPEN ? 'Registration is live' : 'Registration link pending'}
                </p>
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rotate-45 ${
                    REGISTRATION_OPEN ? 'bg-pink' : 'border border-white/50'
                  }`}
                />
              </div>
              <p id="registration-status" className="mt-3 text-[0.875rem] leading-relaxed text-[var(--muted)]">
                {REGISTRATION_OPEN
                  ? 'The official registration destination is configured by the organisers. You will be taken to their platform to complete the process.'
                  : 'The organisers have not supplied the official registration URL. The button is disabled on purpose: this page will not send anyone to a guessed or unverified destination. Contact the team below to register.'}
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                {REGISTRATION_OPEN ? (
                  <RegisterCta label="Secure your spot" />
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-describedby="registration-status"
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    Secure your spot
                    <ArrowUpRight />
                  </button>
                )}
                <p className="font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.18em] text-[var(--muted)]">
                  This site does not process payments or register teams directly.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="relative h-full border border-white/15 bg-[#0C0A11] p-6 sm:p-8">
              <span
                aria-hidden="true"
                className="absolute right-0 top-0 h-20 w-20 bg-[linear-gradient(225deg,rgba(255,2,89,0.22),transparent_65%)]"
              />
              <p className="label-mono">Registration fee</p>
              <p className="gradient-text display mt-2 text-[clamp(3rem,7vw,4.5rem)]">
                {EVENT.fee}
              </p>
              <p className="mt-2 max-w-xs text-[0.8125rem] leading-relaxed text-[var(--muted)]">
                As listed on the official event poster. Per participant or per team is pending
                organiser confirmation.
              </p>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="label-mono">Registration QR</p>
                {REGISTRATION.qrSrc ? (
                  <div className="mt-3 w-fit bg-white p-2">
                    <Image
                      src={REGISTRATION.qrSrc}
                      alt="QR code for ZENITH ’26 registration"
                      width={132}
                      height={132}
                      className="h-[132px] w-[132px]"
                    />
                  </div>
                ) : (
                  <div className="mt-3 flex items-start gap-4">
                    <div
                      aria-hidden="true"
                      className="relative grid h-[88px] w-[88px] shrink-0 place-items-center border border-dashed border-white/25 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05)_0_1px,transparent_1px_7px)]"
                    >
                      <span className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                        QR
                      </span>
                    </div>
                    <p className="max-w-[11rem] text-[0.75rem] leading-relaxed text-[var(--muted)]">
                      {REGISTRATION.qrDestinationNote}. No QR code has been generated for this site.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="label-mono">For queries</p>
                <ul className="mt-3 space-y-2">
                  {CONTACTS.map((contact) => (
                    <li key={contact.name} className="flex items-baseline justify-between gap-4">
                      <span className="text-[0.9375rem] font-medium text-fog">{contact.name}</span>
                      <a
                        href={`tel:${contact.tel}`}
                        className="link-underline font-mono text-[0.75rem] tracking-[0.08em] text-[var(--muted)] transition-colors hover:text-pink"
                      >
                        {contact.phone}
                      </a>
                    </li>
                  ))}
                </ul>
                {CONTACT_EMAIL && (
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-3 inline-block font-mono text-[0.75rem] text-[var(--muted)] underline decoration-white/25 underline-offset-4"
                  >
                    {CONTACT_EMAIL}
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
