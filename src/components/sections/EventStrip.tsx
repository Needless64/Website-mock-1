import { EVENT } from '@/config/event';
import { CalendarIcon, TeamIcon, VenueIcon, TicketIcon } from '@/components/ui/Icons';
import { MeasurementTicks } from '@/components/ui/Decor';
import { Reveal } from '@/components/motion/Reveal';

const FACTS = [
  {
    label: 'Dates',
    value: EVENT.dates,
    detail: 'As confirmed by the organisers.',
    icon: CalendarIcon
  },
  { label: 'Team size', value: `${EVENT.teamSize} members`, detail: 'Build together.', icon: TeamIcon },
  { label: 'Venue', value: 'MLRIT', detail: 'Dundigal, Hyderabad.', icon: VenueIcon },
  { label: 'Registration', value: EVENT.fee, detail: 'As listed on the official poster.', icon: TicketIcon }
];

export function EventStrip() {
  return (
    <section aria-label="Event information" className="relative border-y border-white/10 bg-[#0A090E]">
      <div className="shell">
        <div className="grid gap-10 py-12 lg:grid-cols-12 lg:gap-14 lg:py-16">
          <Reveal className="lg:col-span-5">
            <p className="label-mono">Prize pool</p>
            <p className="mt-3 flex items-start">
              <span className="gradient-text display text-[clamp(3.6rem,9vw,7.5rem)]">
                {EVENT.prize}
              </span>
              <span className="mt-2 font-mono text-xl text-[var(--muted)] sm:mt-4">/-</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
              One pool, three voyage tracks. Individual prize allocations will be published by the
              organisers.
            </p>
            <div className="mt-7 hidden lg:block">
              <MeasurementTicks count={18} />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 sm:grid-cols-2">
              {FACTS.map((fact, index) => {
                const Icon = fact.icon;
                return (
                  <Reveal
                    as="li"
                    key={fact.label}
                    delay={index * 0.05}
                    className={`flex gap-4 border-white/10 py-5 sm:py-6 ${
                      index === 0 ? 'border-t sm:pr-8' : ''
                    } ${index === 1 ? 'border-t sm:border-l sm:pl-8' : ''} ${
                      index === 2 ? 'border-y sm:border-b-0 sm:border-t sm:pr-8' : ''
                    } ${index === 3 ? 'border-b sm:border-b-0 sm:border-l sm:border-t sm:pl-8' : ''}`}
                  >
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 bg-[#121018] text-pink">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="label-mono block text-[0.5625rem]">{fact.label}</span>
                      <span className="mt-2 block text-[1.05rem] font-semibold leading-tight text-fog">
                        {fact.value}
                      </span>
                      <span className="mt-1 block text-[0.8125rem] leading-snug text-[var(--muted)]">
                        {fact.detail}
                      </span>
                    </span>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
