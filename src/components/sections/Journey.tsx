import { EVENT } from '@/config/event';
import { Reveal } from '@/components/motion/Reveal';
import { MaskHeading } from '@/components/motion/MaskHeading';
import { JourneyTrack } from './JourneyTrack';

const DAYS = [
  {
    date: '17',
    month: 'December 2026',
    label: 'Day 01',
    note: 'Detailed schedule pending organiser confirmation.'
  },
  {
    date: '18',
    month: 'December 2026',
    label: 'Day 02',
    note: 'Detailed schedule pending organiser confirmation.'
  },
  {
    date: '19',
    month: 'December 2026',
    label: 'Day 03',
    note: 'Detailed schedule pending organiser confirmation.'
  }
];

export function Journey() {
  return (
    <section id="schedule" className="relative overflow-hidden border-t border-white/10 pb-[clamp(4.75rem,10vw,9.5rem)] pt-[clamp(4.75rem,10vw,9.5rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_100%_0%,rgba(38,0,234,0.16),transparent_60%)]"
      />
      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow">Event journey</p>
            <MaskHeading
              lines={['17 — 19', 'December']}
              lineClass={[undefined, 'gradient-text']}
              className="display mt-5 text-[clamp(2.4rem,6.4vw,5.2rem)]"
            />
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="text-[0.9375rem] leading-relaxed text-[var(--muted)]">
              Three days, sequentially. Keep scrolling to travel through them.
            </p>
          </div>
        </div>
      </div>

      <JourneyTrack days={DAYS} />

      {/* Mobile / narrow */}
      <ol className="shell relative mt-10 lg:hidden">
        {DAYS.map((day, index) => (
          <Reveal as="li" key={day.date} delay={index * 0.05} className="relative border-l border-white/15 pl-6">
            <span
              aria-hidden="true"
              className="absolute -left-[7px] top-2 h-3 w-3 rotate-45 border border-pink bg-[#08080B]"
            />
            <div className="pb-10">
              <p className="font-mono text-[0.5625rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                {day.label} — {day.month}
              </p>
              <p className="display mt-2 text-[4rem] leading-none">{day.date}</p>
              <p className="mt-2 max-w-xs text-[0.875rem] leading-relaxed text-fog/80">{day.note}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <div className="shell relative">
        <div className="mt-4 flex flex-col gap-3 border border-white/15 bg-[#0D0B12] p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[var(--muted)]">
            <span className="text-pink">Pending</span> · Detailed session timings and activities
          </p>
          <p className="text-[0.8125rem] text-[var(--muted)]">
            Dates are confirmed. The organisers will publish the full run-sheet.
          </p>
        </div>

        <p className="mt-6 font-mono text-[0.5625rem] uppercase tracking-[0.24em] text-[var(--muted)]">
          {EVENT.venueFull}
        </p>
      </div>
    </section>
  );
}
