import { useLang } from '../i18n/LanguageContext';
import { spotlight } from '../hooks/motion';
import { SectionHead } from './Sections';
import { ArrowUpRight } from './icons';
import pedilo from '../assets/products/pedilo-wapido.webp';
import iqr from '../assets/products/invitaciones-qr.svg';
import club from '../assets/products/club-agenda.webp';

const LOGOS: Record<string, { src: string; w: number; h: number }> = {
  pedilo: { src: pedilo, w: 480, h: 281 },
  iqr: { src: iqr, w: 256, h: 256 },
  club: { src: club, w: 480, h: 480 },
};

export default function Work() {
  const { t } = useLang();
  const w = t.work;
  return (
    <section id="work" className="section work">
      <div className="container">
        <SectionHead label={w.label} title={w.title} accent={w.titleAccent} sub={w.sub} />

        <div className="work-grid">
          {w.products.map((p, i) => {
            const logo = LOGOS[p.id];
            const Tag = p.url ? 'a' : 'div';
            return (
              <Tag
                key={p.id}
                className={`card product is-${p.id} ${i === 0 ? 'is-feature' : ''}`}
                onPointerMove={spotlight}
                data-reveal
                style={{ ['--d' as string]: `${i * 110}ms` }}
                {...(p.url ? { href: p.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <div className="product-visual">
                  <div className="product-orb" aria-hidden="true" />
                  <img src={logo.src} width={logo.w} height={logo.h} alt={`${p.name} logo`} loading="lazy" decoding="async" />
                </div>
                <div className="product-body">
                  <p className="product-kind">{p.kind}</p>
                  <h3 className="h3">{p.name}</h3>
                  <p className="muted">{p.text}</p>
                  <ul className="chips chips-sm">
                    {p.tags.map((tg) => (
                      <li key={tg}>{tg}</li>
                    ))}
                  </ul>
                  {p.url && (
                    <span className="product-link">
                      {w.visit}
                      <ArrowUpRight size={16} />
                    </span>
                  )}
                </div>
              </Tag>
            );
          })}
        </div>

        <div className="cases" data-reveal>
          <p className="label">{w.caseLabel}</p>
          <ul>
            {w.cases.map((c, i) => (
              <li key={c.title} className="case-row">
                <span className="case-num">0{i + 1}</span>
                <span className="case-title">{c.title}</span>
                <span className="case-client">{c.client}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
