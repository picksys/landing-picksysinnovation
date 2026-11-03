type P = { size?: number };

export const Arrow = ({ size = 18 }: P) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="ico-arrow">
    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowUpRight = ({ size = 18 }: P) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="ico-arrow">
    <path d="M7 17L17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LinkedIn = ({ size = 16 }: P) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path
      fill="currentColor"
      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
    />
  </svg>
);

/** Service icons — simple geometric line art in brand colors. */
export const ServiceIcon = ({ kind }: { kind: string }) => {
  if (kind === 'software')
    return (
      <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">
        <rect x="5" y="9" width="38" height="28" rx="5" fill="none" stroke="url(#gs)" strokeWidth="2" />
        <path d="M18 19l-5 4 5 4M30 19l5 4-5 4M26 17l-4 12" fill="none" stroke="url(#gs)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 42h14" stroke="url(#gs)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  if (kind === 'marketing')
    return (
      <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">
        <path d="M6 38l11-12 8 7 16-18" fill="none" stroke="url(#gs)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M33 15h8v8" fill="none" stroke="url(#gs)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17" cy="26" r="2.5" fill="url(#gs)" />
        <circle cx="25" cy="33" r="2.5" fill="url(#gs)" />
      </svg>
    );
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">
      <path d="M6 8h36l-13 16v12l-10 5V24z" fill="none" stroke="url(#gs)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 14h24" stroke="url(#gs)" strokeWidth="2" strokeLinecap="round" opacity=".6" />
    </svg>
  );
};

/** Shared gradient defs, rendered once. */
export const SvgDefs = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="gs" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#3BE8FF" />
        <stop offset=".55" stopColor="#8B5CFF" />
        <stop offset="1" stopColor="#FFB547" />
      </linearGradient>
    </defs>
  </svg>
);
