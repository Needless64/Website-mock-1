import Image from 'next/image';
import { IDENTITIES, type IdentityKey } from '@/config/brand';

type Variant = 'nav' | 'hero' | 'footer';

const NAME_SIZE: Record<Variant, string> = {
  nav: 'text-[1.05rem]',
  hero: 'text-[1.35rem] sm:text-[1.5rem]',
  footer: 'text-[1.15rem]'
};

const DETAIL_SIZE: Record<Variant, string> = {
  nav: 'text-[0.5rem] tracking-[0.18em]',
  hero: 'text-[0.55rem] sm:text-[0.6rem] tracking-[0.2em]',
  footer: 'text-[0.55rem] tracking-[0.18em]'
};

export function IdentityMark({
  identity,
  variant = 'hero',
  className = ''
}: {
  identity: IdentityKey;
  variant?: Variant;
  className?: string;
}) {
  const item = IDENTITIES[identity];

  if (item.src) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <Image
          src={item.src}
          alt={item.name}
          width={item.width ?? 160}
          height={item.height ?? 48}
          className="h-9 w-auto object-contain sm:h-11"
          priority={variant === 'hero'}
        />
      </span>
    );
  }

  const isWordmark = identity === 'mlrit' || identity === 'aws';

  return (
    <span className={`inline-flex flex-col justify-center ${className}`}>
      <span
        className={`${NAME_SIZE[variant]} font-black uppercase leading-none ${
          isWordmark ? 'tracking-[-0.045em]' : 'tracking-[-0.02em]'
        } ${identity === 'aws' ? 'lowercase' : ''} ${
          identity === 'sbg' ? 'text-[1rem] sm:text-[1.15rem]' : ''
        }`}
      >
        {item.name}
        {identity === 'scope' && <span className="text-pink">.</span>}
      </span>
      <span className={`mt-1.5 font-mono uppercase leading-tight text-[var(--muted)] ${DETAIL_SIZE[variant]}`}>
        {item.detail}
      </span>
    </span>
  );
}
