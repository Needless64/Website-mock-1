import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const display = Archivo({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900']
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600']
});

export const metadata: Metadata = {
  title: 'ZENITH ’26 — The AI Voyage | MLRIT × SCOPE Club',
  description:
    'ZENITH ’26 — The AI Voyage. A 2-day national-level hackathon and AWS Student Community Day at MLRIT, Hyderabad. 17–19 December 2026. ₹1,00,000 prize pool.',
  openGraph: {
    title: 'ZENITH ’26 — The AI Voyage',
    description:
      'A 2-day national-level hackathon and AWS Student Community Day at MLRIT, Hyderabad. 17–19 December 2026.',
    type: 'website'
  }
};

export const viewport: Viewport = {
  themeColor: '#08080B',
  colorScheme: 'dark'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <div className="grain-layer" aria-hidden="true" />
      </body>
    </html>
  );
}
