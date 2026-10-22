# ZENITH ’26 — The AI Voyage

Production build of the ZENITH ’26 site for the SCOPE Club × MLRIT national-level hackathon and
AWS Student Community Day (17–19 December 2026, MLRIT Hyderabad).

Art direction: near-black cosmic editorial, oversized gradient typography, angular shards,
restrained RGB displacement, a custom Three.js wireframe planet with orbital rings.
No grid-based decorative effects, no fabricated logos, schedules, QR codes or registration links.

## Stack

- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3
- Three.js — hand-built wireframe planet, shader rim, rings, particles (`src/components/hero`)
- GSAP + ScrollTrigger — entrance choreography and section reveals
- React Bits — vendored `GlareHover` only; `DecryptedText` reimplemented without `motion`
- Fonts: Archivo (display/body) + JetBrains Mono (technical labels) via `next/font`

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # typecheck + production build
```

## Structure

```
src/app/            layout, global design tokens, page composition
src/config/         event facts, themes, FAQs, brand identities
src/components/
  hero/             Hero, PlanetScene (WebGL), PlanetFallback, shaders
  sections/         EventStrip, ThemeExplorer, About, Journey, Prizes,
                    Registration, Faq, Footer
  layout/           SiteNav (sticky + accessible mobile menu)
  motion/           Reveal (ScrollTrigger), DecryptedLabel
  reactbits/        vendored GlareHover (MIT)
  ui/               buttons/CTA, icons, shards, star flares, orbital geometry
```

## Integration points (deliberately unfilled)

| Item | Where | Current behaviour |
| --- | --- | --- |
| Registration URL | `src/config/event.ts` → `REGISTRATION.url` or `NEXT_PUBLIC_REGISTRATION_URL` | CTA disabled in the registration panel; Hero/Nav/Footer CTA routes to `#register` and states the link is pending. No guessed URL. |
| Registration QR | `REGISTRATION.qrSrc` | No QR is generated. A dashed placeholder explains it is awaiting a verified asset. Only point this at a QR that resolves to the same verified URL. |
| Institutional logos | `src/config/brand.ts`, assets in `public/brand/` | Typographic identity lockups (nothing redrawn). Add `src/width/height` to swap in real artwork everywhere. |
| Contact email | `CONTACT_EMAIL` | Empty → hidden. Set only once the organisers confirm the event inbox. |
| Session schedule | `src/components/sections/Journey.tsx`, FAQ answer | Dates only; every schedule reference is marked pending. |
| Prize allocation | `src/components/sections/Prizes.tsx` | Total pool only; no invented breakdown. |

## Accessibility & performance notes

- Headline is real HTML text (selectable), not canvas; planet canvas is decorative and
  `aria-hidden`, with a static SVG/CSS fallback for no-WebGL.
- `prefers-reduced-motion` disables the GSAP timeline, reveals, glare sweeps, scramble text,
  and freezes the planet on a single frame.
- Mobile menu traps focus, supports Escape, restores focus and locks background scroll.
- Three.js scene caps pixel ratio, reduces particles on mobile, pauses when off-screen or the tab
  is hidden, and disposes geometry, materials and the renderer on unmount.

## Scroll choreography layer

| Moment | Where | Behaviour |
| --- | --- | --- |
| Hero dive | `src/components/hero/Hero.tsx` | Headline block, shards and star field scrub away as the planet rises and dollies in (`PlanetScene` reads scroll progress: camera dolly, ring tilt, particle scale, rim boost). Light sweeps through the ZENITH wordmark with the scroll. |
| Journey voyage | `src/components/sections/JourneyTrack.tsx` | The three days slide horizontally through a pinned stage with a progress rail (desktop ≥1024px). Falls back to a natively scrollable track without pinning and to the vertical timeline below `lg`. |
| Prize reveal | `src/components/sections/PrizeReveal.tsx` | ₹1,00,000 counts up once on entry; orbital rings draw themselves with the scroll (`strokeDashoffset` scrub). |
| Manifesto | `src/components/motion/ScrubWords.tsx` | Words brighten one after another through the About statement. |
| Track cards | `src/components/sections/ThemeExplorer.tsx` | Pointer tilt with the vendored GlareHover sweep; click opens the track detail. |
| HUD | `src/components/layout/ScrollHud.tsx` | Right-edge progress rail plus a live `VOYAGE 042%` / section readout; also refreshes ScrollTrigger after fonts load. |
| CTAs | `src/components/motion/Magnet.tsx` | Hero and prize buttons drift toward a fine pointer. |

Everything in this layer is disabled under `prefers-reduced-motion`, and no content depends on an
animation to become visible or reachable.
