import { useLang } from '../i18n/LanguageContext';
import { spotlight, useCountUp, useScrollProgress } from '../hooks/motion';
import Marquee from './Marquee';
import { ServiceIcon } from './icons';

export function SectionHead({ label, title, accent, sub, center = false }: { label: string; title: string; accent?: string; sub?: string; center?: boolean }) {
  return (
    <header className={`section-head ${center ? 'is-center' : ''}`}>
      <p className="label" data-reveal>
        {label}
      </p>
      <h2 className="h2" data-reveal style={{ ['--d' as string]: '80ms' }}>
        {title} {accent && <em className="accent-word">{accent}</em>}
      </h2>
      {sub && (
        <p className="lead" data-reveal style={{ ['--d' as string]: '160ms' }}>
          {sub}
        </p>
      )}
    </header>
  );
}

/** Big outlined words sliding infinitely under the hero. */
export function ServiceTicker() {
  const { t } = useLang();
  return (
    <div className="ticker">
      <Marquee speed={45}>
        {t.marquee.map((w, i) => (
          <span key={w} className={`ticker-word ${i % 2 ? 'is-outline' : ''}`}>
            {w}
            <i className="ticker-star" aria-hidden="true">
              ✦
            </i>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/** Words light up one by one as the user scrolls through the section. */
export function Manifesto() {
  const { t } = useLang();
  const ref = useScrollProgress<HTMLDivElement>(0.9, 0.45);
  const words = t.manifesto.text.split(' ');
  return (
    <section className="section manifesto">
      <div className="container">
        <p className="label" data-reveal>
          {t.manifesto.label}
        </p>
        <div ref={ref} className="manifesto-text" style={{ ['--n' as string]: words.length }}>
          {words.map((w, i) => (
            <span key={i} style={{ ['--i' as string]: i }} className={/system|sistema|code|código|convierte|converts/i.test(w) ? 'hl' : ''}>
              {w}{' '}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const { t } = useLang();
  const s = t.services;
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHead label={s.label} title={s.title} accent={s.titleAccent} sub={s.sub} />
        <div className="services-grid">
          {s.items.map((it, i) => (
            <article key={it.key} className={`card service-card is-${it.key}`} onPointerMove={spotlight} data-reveal style={{ ['--d' as string]: `${i * 110}ms` }}>
              <div className="service-top">
                <ServiceIcon kind={it.key} />
                <span className="service-num">0{i + 1}</span>
              </div>
              <h3 className="h3">{it.title}</h3>
              <p className="muted">{it.text}</p>
              <ul className="service-points">
                {it.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const { t } = useLang();
  const p = t.process;
  const ref = useScrollProgress<HTMLOListElement>(0.8, 0.5);
  return (
    <section id="process" className="section process">
      <div className="container">
        <SectionHead label={p.label} title={p.title} accent={p.titleAccent} />
        <ol ref={ref} className="process-list">
          <span className="process-rail" aria-hidden="true">
            <span />
          </span>
          {p.steps.map((s, i) => (
            <li key={s.title} className="process-step" data-reveal style={{ ['--d' as string]: `${i * 90}ms`, ['--k' as string]: i / (p.steps.length - 1) }}>
              <span className="process-dot" aria-hidden="true" />
              <span className="process-num">0{i + 1}</span>
              <h3 className="h3">{s.title}</h3>
              <p className="muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, val } = useCountUp(value);
  return (
    <div className="stat" data-reveal>
      <span className="stat-value">
        <span ref={ref}>{val}</span>
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export function Stats() {
  const { t } = useLang();
  return (
    <section className="stats" aria-label="Picksys in numbers">
      <div className="container stats-grid">
        {t.stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
