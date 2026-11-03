import { useLang } from '../i18n/LanguageContext';
import { site } from '../i18n/content';
import FunnelCanvas from './FunnelCanvas';
import { Arrow } from './icons';

export default function Hero() {
  const { t, lang } = useLang();
  const h = t.hero;
  const book = site.bookingUrl || '#contact';

  return (
    <section id="top" className="hero">
      <div className="aurora" aria-hidden="true">
        <span className="a1" />
        <span className="a2" />
        <span className="a3" />
      </div>
      <div className="hero-grid" aria-hidden="true" />
      <FunnelCanvas labels={h.funnel} />

      {/* key forces the intro animation to replay on language change */}
      <div className="container hero-inner" key={lang}>
        <p className="eyebrow hero-in" style={{ ['--d' as string]: '0ms' }}>
          <span className="pulse-dot" />
          {h.eyebrow}
        </p>
        <h1 className="hero-title">
          <span className="line">
            <span className="hero-in" style={{ ['--d' as string]: '80ms' }}>{h.titleA}</span>
          </span>
          <span className="line">
            <span className="hero-in" style={{ ['--d' as string]: '180ms' }}>
              {h.titleB} <em className="accent-word">{h.titleAccent}</em> {h.titleC}
            </span>
          </span>
        </h1>
        <p className="hero-sub hero-in" style={{ ['--d' as string]: '320ms' }}>
          {h.sub}
        </p>
        <div className="hero-ctas hero-in" style={{ ['--d' as string]: '420ms' }}>
          <a href={book} className="btn btn-grad btn-lg" {...(site.bookingUrl ? { target: '_blank', rel: 'noopener' } : {})}>
            {h.primary}
            <Arrow />
          </a>
          <a href="#work" className="btn btn-ghost btn-lg">
            {h.secondary}
          </a>
        </div>
        <ul className="hero-badges hero-in" style={{ ['--d' as string]: '520ms' }}>
          {h.badges.map((b) => (
            <li key={b}>
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <a href="#services" className="scroll-cue" aria-label={h.scroll}>
        <span />
      </a>
    </section>
  );
}
