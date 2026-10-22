import { SiteNav } from '@/components/layout/SiteNav';
import { ScrollHud } from '@/components/layout/ScrollHud';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { Hero } from '@/components/hero/Hero';
import { EventStrip } from '@/components/sections/EventStrip';
import { VoyageTakeover } from '@/components/sections/VoyageTakeover';
import { ThemeExplorer } from '@/components/sections/ThemeExplorer';
import { About } from '@/components/sections/About';
import { VelocityMarquee } from '@/components/motion/VelocityMarquee';
import { Journey } from '@/components/sections/Journey';
import { Prizes } from '@/components/sections/Prizes';
import { Registration } from '@/components/sections/Registration';
import { Faq } from '@/components/sections/Faq';
import { Footer } from '@/components/sections/Footer';

const MARQUEE_ITEMS = [
  'ZENITH ’26',
  'The AI Voyage',
  '17–19 Dec 2026',
  '₹1,00,000',
  'MLRIT Hyderabad',
  '3–4 per crew'
];

export default function Page() {
  return (
    <>
      <SiteNav />
      <CustomCursor />
      <ScrollHud />
      <main id="main">
        <Hero />
        <EventStrip />
        <VoyageTakeover />
        <ThemeExplorer />
        <About />
        <VelocityMarquee items={MARQUEE_ITEMS} />
        <Journey />
        <Prizes />
        <Registration />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
