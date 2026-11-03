import { useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { site } from '../i18n/content';
import { spotlight } from '../hooks/motion';
import { SectionHead } from './Sections';
import { LinkedIn } from './icons';

/** Photo with an elegant monogram fallback until the real photo is added to /public/team. */
function Portrait({ src, initials, name }: { src: string; initials: string; name: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="portrait">
      {!failed ? (
        <img src={src} alt={name} width="640" height="800" loading="lazy" decoding="async" onError={() => setFailed(true)} />
      ) : (
        <div className="portrait-fallback" role="img" aria-label={name}>
          <span>{initials}</span>
        </div>
      )}
      <div className="portrait-shine" aria-hidden="true" />
    </div>
  );
}

export default function Founders() {
  const { t } = useLang();
  const f = t.founders;
  return (
    <section id="founders" className="section founders">
      <div className="container">
        <SectionHead label={f.label} title={f.title} accent={f.titleAccent} sub={f.sub} />

        <p className="equation" data-reveal aria-label={`${f.equation[0]} + ${f.equation[1]} = ${f.equation[2]}`}>
          <span className="eq-a">{f.equation[0]}</span>
          <span className="eq-op">+</span>
          <span className="eq-b">{f.equation[1]}</span>
          <span className="eq-op">=</span>
          <span className="eq-c">{f.equation[2]}</span>
        </p>

        <div className="founders-grid">
          {f.people.map((p, i) => {
            const cfg = site.founders[p.id];
            return (
              <article key={p.id} className={`card founder is-${p.id}`} onPointerMove={spotlight} data-reveal style={{ ['--d' as string]: `${i * 140}ms` }}>
                <Portrait src={cfg.photo} initials={cfg.initials} name={p.name} />
                <div className="founder-body">
                  <p className="founder-role">{p.role}</p>
                  <h3 className="founder-name">{p.name}</h3>
                  <p className="founder-tagline">“{p.tagline}”</p>
                  <p className="muted founder-bio">{p.bio}</p>
                  <ul className="chips">
                    {p.skills.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <div className="founder-foot">
                    <span className="founder-stack">{p.stack}</span>
                    <a href={cfg.linkedin} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label={`${p.name} — ${f.linkedin}`}>
                      <LinkedIn />
                      {f.linkedin}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
