/**
 * ZENITH ’26 — single source of truth for confirmed event information.
 *
 * Only details confirmed on the official event poster are populated here.
 * Anything the organisers have not supplied is left blank or flagged, and the
 * UI shows an explicit "pending" state rather than invented content.
 */

export type Contact = { name: string; phone: string; tel: string };

export type Theme = {
  id: 'agri-tech' | 'med-tech' | 'ed-tech';
  index: string;
  name: string;
  tagline: string;
  description: string;
  detail: string;
  focus: string[];
};

export const EVENT = {
  name: 'ZENITH ’26',
  wordmark: 'ZENITH',
  year: '2026',
  tagline: 'The AI Voyage',
  presenter: 'SCOPE Club Presents',
  kind: '2-Day National-Level Hackathon & AWS Student Community Day',
  dates: '17–19 December 2026',
  dateParts: ['17', '18', '19'],
  dateLabel: '17TH, 18TH & 19TH DECEMBER ’26',
  teamSize: '3–4',
  fee: '₹350',
  venue: 'MLRIT, Hyderabad',
  venueFull: 'MLR Institute of Technology, Dundigal, Hyderabad',
  prize: '₹1,00,000',
  prizeSuffix: '/-',
  city: 'Hyderabad, India',
  coordinates: '17.59° N / 78.48° E'
} as const;

/**
 * Registration — INTEGRATION POINT.
 *
 * The real registration URL has not been supplied, so it is intentionally
 * blank. Set NEXT_PUBLIC_REGISTRATION_URL (or paste it below) and every CTA
 * switches to a live external link automatically. While it is blank the CTA
 * renders a disabled state and the registration section says so plainly.
 *
 * Never add a guessed URL, URL shortener or generated QR code here.
 */
export const REGISTRATION = {
  url: (process.env.NEXT_PUBLIC_REGISTRATION_URL ?? '').trim(),
  /**
   * Set to a verified QR asset (e.g. /brand/registration-qr.png) only after
   * confirming it resolves to the same destination as REGISTRATION.url.
   */
  qrSrc: '',
  qrDestinationNote: 'QR asset awaiting verification by the organisers'
} as const;

export const REGISTRATION_OPEN = REGISTRATION.url.length > 0;

export const CONTACTS: Contact[] = [
  { name: 'Vignesh', phone: '89783 71629', tel: '+918978371629' },
  { name: 'Pranadeep', phone: '79812 13067', tel: '+917981213067' }
];

/**
 * Contact email — only rendered when supplied. The general SCOPE Club inbox
 * has not been confirmed as the event contact, so it stays blank.
 */
export const CONTACT_EMAIL = '';

export const THEMES: Theme[] = [
  {
    id: 'agri-tech',
    index: '01',
    name: 'Agri-Tech',
    tagline: 'Intelligence for the field',
    description:
      'AI for agriculture, crop monitoring, farming intelligence, and resource optimization.',
    detail:
      'Teams work on the distance between a sensor reading and a decision a farmer can act on: crop health, yield signals, irrigation and input efficiency.',
    focus: ['Crop monitoring', 'Farming intelligence', 'Resource optimization']
  },
  {
    id: 'med-tech',
    index: '02',
    name: 'Med-Tech',
    tagline: 'Signal inside the system',
    description:
      'AI for healthcare workflows, medical assistance, and clinical operations.',
    detail:
      'The problem space sits in care delivery rather than hype: assistive tooling for clinicians, operational load across a hospital, and access to dependable medical guidance.',
    focus: ['Healthcare workflows', 'Medical assistance', 'Clinical operations']
  },
  {
    id: 'ed-tech',
    index: '03',
    name: 'Ed-Tech',
    tagline: 'Learning, recompiled',
    description:
      'AI for personalized learning, educational accessibility, and learning productivity.',
    detail:
      'Build for learners at different speeds and with different access needs — adaptive pathways, assistive access, and tools that give back study time instead of taking it.',
    focus: ['Personalized learning', 'Educational accessibility', 'Learning productivity']
  }
];

export const FAQS = [
  {
    q: 'Who can participate?',
    a: 'ZENITH ’26 is a national-level student hackathon hosted at MLRIT, Hyderabad. The exact eligibility rules — eligible institutions, year of study, and whether inter-college teams are permitted — are pending confirmation from the organisers.',
    pending: true
  },
  {
    q: 'What is the team size?',
    a: 'Teams must have 3 to 4 members, as confirmed on the official event poster.',
    pending: false
  },
  {
    q: 'What is the registration fee?',
    a: 'The registration fee is ₹350, as listed on the official poster. Whether the fee applies per participant or per team is pending confirmation from the organisers.',
    pending: true
  },
  {
    q: 'When and where is the event?',
    a: 'ZENITH ’26 runs from 17 to 19 December 2026 at MLR Institute of Technology (MLRIT), Hyderabad. A day-wise session schedule has not been published yet.',
    pending: false
  },
  {
    q: 'Which themes can participants choose?',
    a: 'Three tracks: Agri-Tech (AI for agriculture, crop monitoring, farming intelligence and resource optimization), Med-Tech (healthcare workflows, medical assistance and clinical operations) and Ed-Tech (personalized learning, educational accessibility and learning productivity).',
    pending: false
  },
  {
    q: 'How can I register?',
    a: 'Registration is handled by the organisers. The official registration link has not been supplied to this site yet — once it is, every Register button here becomes the live link. Until then, contact Vignesh or Pranadeep directly.',
    pending: true
  }
] as const;

export const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#themes', label: 'Themes' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#prizes', label: 'Prizes' },
  { href: '#faq', label: 'FAQ' }
] as const;
