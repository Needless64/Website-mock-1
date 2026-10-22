import type { Config } from 'tailwindcss';

const channel = (name: string) => `rgb(var(--${name}-rgb) / <alpha-value>)`;

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: channel('bg'),
        surface: channel('surface'),
        raised: channel('raised'),
        indigo: channel('deep-indigo'),
        violet: channel('violet'),
        pink: channel('pink'),
        magenta: channel('magenta'),
        fog: channel('fg'),
        muted: channel('muted'),
        hairline: 'var(--border)'
      },
      fontFamily: {
        sans: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace']
      },
      maxWidth: {
        shell: '92rem'
      }
    }
  },
  plugins: []
};

export default config;
