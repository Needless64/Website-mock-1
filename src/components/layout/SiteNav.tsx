'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { NAV_LINKS } from '@/config/event';
import { IdentityMark } from '@/components/brand/IdentityMark';
import { RegisterCta } from '@/components/ui/RegisterCta';
import { ArrowUpRight } from '@/components/ui/Arrow';

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((el) => el.offsetParent !== null);

    const timer = window.setTimeout(() => {
      focusables()[0]?.focus({ preventScroll: true });
    }, 40);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(timer);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? 'border-b border-white/10 bg-[#08080B]/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-6 sm:h-[76px]">
          <a
            href="#top"
            aria-label="ZENITH ’26 — back to top"
            className="flex items-center gap-3 py-2 sm:gap-5"
            onClick={() => setOpen(false)}
          >
            <IdentityMark identity="mlrit" variant="nav" />
            <span aria-hidden="true" className="h-8 w-px bg-white/20" />
            <IdentityMark identity="scope" variant="nav" />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative inline-flex min-h-[44px] items-center py-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[var(--muted)] transition-colors hover:text-fog focus-visible:text-fog"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-pink transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <RegisterCta
              label="Register"
              className="hidden min-h-[42px] px-5 py-3 text-[0.6875rem] sm:inline-flex"
            />
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
              className="relative flex h-11 w-11 items-center justify-center border border-white/20 text-fog transition-colors hover:border-pink/70 lg:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ${
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-y-auto border-t border-white/10 bg-[#08080B] sm:top-[76px] lg:hidden"
      >
        <div className="shell flex min-h-full flex-col justify-between py-8">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link, index) => (
                <li key={link.href} className="border-b border-white/10">
                  <a
                    href={link.href}
                    onClick={close}
                    className="flex min-h-[64px] items-center justify-between gap-4 py-4 text-[clamp(1.75rem,9vw,2.5rem)] font-extrabold uppercase leading-none tracking-[-0.03em] transition-colors hover:text-pink"
                  >
                    {link.label}
                    <span className="font-mono text-[0.625rem] tracking-[0.2em] text-[var(--muted)]">
                      0{index + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <RegisterCta label="Register Now" className="w-full" />
              <a href="#register" onClick={close} className="btn btn-ghost w-full">
                Registration details
                <ArrowUpRight />
              </a>
            </div>
          </nav>

          <div className="mt-12 border-t border-white/10 pt-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <IdentityMark identity="mlrit" variant="nav" />
              <IdentityMark identity="aws" variant="nav" />
              <IdentityMark identity="scope" variant="nav" />
            </div>
            <p className="mt-5 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[var(--muted)]">
              MLRIT · Hyderabad · 17–19 Dec 2026
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
