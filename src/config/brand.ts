/**
 * INTEGRATION POINT — institutional identities.
 *
 * The official logo files were not included in this workspace, so each identity
 * renders as a typographic lockup rather than a redrawn logo. To swap in the
 * real artwork:
 *   1. Drop the SVG/PNG into /public/brand/
 *   2. Set `src`, `width` and `height` below (aspect ratio is preserved)
 * The component renders the image instead of the text lockup automatically.
 */

export type IdentityKey = 'mlrit' | 'aws' | 'scope' | 'sbg';

export type Identity = {
  key: IdentityKey;
  name: string;
  detail: string;
  src?: string;
  width?: number;
  height?: number;
};

export const IDENTITIES: Record<IdentityKey, Identity> = {
  mlrit: {
    key: 'mlrit',
    name: 'MLRIT',
    detail: 'Engineering Ideas. Engineering Careers.'
  },
  aws: {
    key: 'aws',
    name: 'AWS',
    detail: 'Student Community Day'
  },
  scope: {
    key: 'scope',
    name: 'SCOPE Club',
    detail: 'Presents'
  },
  sbg: {
    key: 'sbg',
    name: 'AWS Student Builder Group',
    detail: 'at MLR Institute of Technology'
  }
};

export const HERO_IDENTITIES: IdentityKey[] = ['mlrit', 'aws', 'scope', 'sbg'];
