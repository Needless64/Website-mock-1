'use client';

import { useId, useState } from 'react';
import { FAQS } from '@/config/event';
import { Reveal } from '@/components/motion/Reveal';
import { MaskHeading } from '@/components/motion/MaskHeading';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" className="section relative border-t border-white/10">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">FAQ</p>
              <MaskHeading
                lines={['Before you', 'embark']}
                lineClass={[undefined, 'text-outline']}
                className="display mt-5 text-[clamp(2.4rem,5vw,3.8rem)]"
              />
              <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                Confirmed details only. Anything the organisers have not published is flagged
                instead of filled in.
              </p>
              <div className="mt-7 flex items-center gap-3">
                <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 border border-white/40" />
                <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-[var(--muted)]">
                  Need more? Call Vignesh or Pranadeep
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul className="border-t border-white/15">
              {FAQS.map((item, index) => {
                const isOpen = open === index;
                const panelId = `${baseId}-panel-${index}`;
                const buttonId = `${baseId}-button-${index}`;
                return (
                  <Reveal as="li" key={item.q} delay={index * 0.03} className="border-b border-white/10">
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? null : index)}
                        className="group flex w-full items-start justify-between gap-5 py-5 text-left sm:py-6"
                      >
                        <span className="flex items-start gap-4">
                          <span className="mt-1 font-mono text-[0.5625rem] tracking-[0.2em] text-[var(--muted)]">
                            0{index + 1}
                          </span>
                          <span
                            className={`text-[1.0625rem] font-medium leading-snug transition-colors duration-300 sm:text-lg ${
                              isOpen ? 'text-pink' : 'text-fog group-hover:text-pink'
                            }`}
                          >
                            {item.q}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="relative mt-1 block h-4 w-4 shrink-0 border border-white/30"
                        >
                          <span className="absolute left-1/2 top-1/2 h-px w-2 -translate-x-1/2 -translate-y-1/2 bg-fog" />
                          <span
                            className={`absolute left-1/2 top-1/2 h-2 w-px -translate-x-1/2 -translate-y-1/2 bg-fog transition-transform duration-300 ${
                              isOpen ? 'scale-y-0' : 'scale-y-100'
                            }`}
                          />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="grid transition-[grid-template-rows] duration-500 ease-out"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-6 pl-8 pr-8">
                          <p className="max-w-2xl text-pretty text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                            {item.a}
                          </p>
                          {item.pending && (
                            <p className="mt-3 inline-flex items-center gap-2 border border-white/15 px-2.5 py-1 font-mono text-[0.5rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                              <span aria-hidden="true" className="h-1 w-1 rotate-45 border border-pink" />
                              Awaiting organiser confirmation
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
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
