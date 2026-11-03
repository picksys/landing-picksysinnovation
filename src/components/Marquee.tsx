import type { ReactNode } from 'react';

/**
 * Infinite marquee — pure CSS transform animation (GPU composited, no JS per frame).
 * Content is rendered twice; the track slides by -50% and loops seamlessly.
 */
export default function Marquee({
  children,
  reverse = false,
  speed = 40,
  className = '',
  label,
}: {
  children: ReactNode;
  reverse?: boolean;
  speed?: number; // seconds per loop
  className?: string;
  label?: string;
}) {
  return (
    <div className={`marquee ${reverse ? 'is-reverse' : ''} ${className}`} style={{ ['--speed' as string]: `${speed}s` }} aria-label={label}>
      <div className="marquee-track">
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
