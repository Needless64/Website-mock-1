import { Reveal } from '@/components/motion/Reveal';
import { MaskHeading } from '@/components/motion/MaskHeading';
import { ScrubWords } from '@/components/motion/ScrubWords';
import { StarFlare } from '@/components/ui/Decor';

const PILLARS = [
  {
    title: 'Real-world problem solving',
    body: 'Work on the distance between a working model and a decision someone can actually use.'
  },
  {
    title: 'Interdisciplinary collaboration',
    body: 'Teams of three to four, built across disciplines rather than a single skill stack.'
  },
  {
    title: 'AI-driven innovation',
    body: 'Applied intelligence across agriculture, healthcare and education — not AI as decoration.'
  },
  {
    title: 'AWS Student Builder community',
    body: 'Part of the AWS Student Community Day, connected to a national builder network.'
  },
  {
    title: 'A national-level stage',
    body: 'Three days, one voyage, and a ₹1,00,000 prize pool at MLRIT, Hyderabad.'
  }
];

export function About() {
  return (
    <section id="about" className="section relative overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/3 h-[320px] w-px bg-[linear-gradient(180deg,transparent,rgba(255,2,89,0.45),transparent)]"
      />
      <div className="shell relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="eyebrow">About ZENITH ’26</p>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[var(--muted)]">
            MLRIT · SCOPE Club · AWS SBG
          </p>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <MaskHeading
              lines={['Build what', 'Comes next.']}
              lineClass={[undefined, 'text-outline']}
              className="display text-[clamp(2.6rem,7.4vw,6rem)]"
            />
            <div className="mt-8 flex items-center gap-5">
              <StarFlare size={22} className="text-pink" color="#FF0259" />
              <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,2,89,0.45),transparent)]" />
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                Est. 2026 / Hyderabad
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 lg:pt-3">
            <ScrubWords
              text="ZENITH brings participants together to develop AI-powered solutions across agriculture, healthcare and education."
              className="text-pretty text-[clamp(1.1rem,2vw,1.5rem)] font-medium leading-snug text-fog"
            />
            <p className="mt-5 text-pretty text-[0.9375rem] leading-relaxed text-[var(--muted)]">
              Hosted by SCOPE Club at MLR Institute of Technology for a national-level hackathon and
              AWS Student Community Day, the three-day voyage is built around one idea: the next
              useful thing is still unbuilt.
            </p>
            <p className="mt-5 text-pretty text-[0.9375rem] leading-relaxed text-[var(--muted)]">
              No invented case studies, no stage-only innovation. Teams arrive with a track, leave
              with something measurable.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid border-t border-white/10 sm:grid-cols-2 lg:mt-20">
          {PILLARS.map((pillar, index) => (
            <Reveal
              as="li"
              key={pillar.title}
              delay={index * 0.04}
              className={`group border-b border-white/10 py-6 sm:py-7 ${
                index % 2 === 0 ? 'sm:pr-10' : 'sm:border-l sm:pl-10'
              } ${index === PILLARS.length - 1 ? 'sm:col-span-2 sm:border-l-0 sm:pl-0' : ''}`}
            >
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-[0.625rem] tracking-[0.2em] text-pink">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-[1.0625rem] font-semibold leading-snug text-fog transition-colors duration-300 group-hover:text-pink sm:text-lg">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-[0.875rem] leading-relaxed text-[var(--muted)]">
                    {pillar.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
