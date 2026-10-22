import { EVENT } from '@/config/event';
import { StarFlare } from '@/components/ui/Decor';
import { RegisterCta } from '@/components/ui/RegisterCta';
import { Magnet } from '@/components/motion/Magnet';
import { Reveal } from '@/components/motion/Reveal';
import { PrizeCounter, PrizeOrbit } from './PrizeReveal';

export function Prizes() {
  return (
    <section
      id="prizes"
      className="relative overflow-hidden border-y border-white/10 bg-[#09080D] py-[clamp(4.5rem,9vw,8rem)]"
    >
      <PrizeOrbit
        className="pointer-events-none absolute -right-[18%] top-1/2 h-[min(140vw,900px)] w-[min(140vw,900px)] -translate-y-1/2 opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,2,89,0.14),transparent_65%)] blur-2xl"
      />

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4">
              <span className="label-mono">Total prize pool</span>
              <span aria-hidden="true" className="h-px w-16 bg-[linear-gradient(90deg,#FF0259,transparent)]" />
            </div>
            <Reveal>
              <p className="mt-4 flex flex-wrap items-start">
                <span className="display text-[clamp(3.6rem,12vw,10rem)] leading-[0.82]">
                  <span className="text-outline" aria-hidden="true">
                    ₹
                  </span>
                  <span className="gradient-text inline-block">
                    <PrizeCounter value={100000} />
                  </span>
                </span>
                <span className="mt-2 font-mono text-2xl text-[var(--muted)] sm:mt-5">/-</span>
              </p>
            </Reveal>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <p className="max-w-md text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                One prize pool across three voyage tracks. Individual allocations will be announced
                by the organisers.
              </p>
              <div className="hidden h-12 w-px bg-white/15 sm:block" />
              <div>
                <p className="font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-[var(--muted)]">
                  Registration
                </p>
                <p className="mt-1 text-xl font-bold text-fog">
                  {EVENT.fee} <span className="text-[0.75rem] font-normal text-muted">/ as posted</span>
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 lg:justify-self-end">
            <div className="relative border-l border-white/15 pl-6 sm:pl-8">
              <StarFlare size={26} className="absolute -left-[13px] top-0" color="#FF0259" />
              <p className="eyebrow">The wager</p>
              <p className="mt-4 max-w-sm text-pretty text-[1.05rem] leading-relaxed text-fog">
                Build something that survives contact with the real world.
              </p>
              <p className="mt-3 max-w-sm text-[0.875rem] leading-relaxed text-[var(--muted)]">
                Three days at MLRIT, Hyderabad. Teams of three to four. Three tracks.
              </p>
              <div className="mt-7">
                <Magnet>
                  <RegisterCta label="Register Now" />
                </Magnet>
              </div>
              <p className="mt-3 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-[var(--muted)]">
                No individual prize breakdown published
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
