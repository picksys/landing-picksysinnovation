import { useEffect, useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import mark from '../assets/mark.png';

export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label="Language">
      <span className="lang-thumb" data-pos={lang} aria-hidden="true" />
      {(['en', 'es'] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          className={lang === l ? 'is-active' : ''}
          onClick={() => setLang(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Nav() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = false;
    const onScroll = () => {
      const s = window.scrollY > 24;
      if (s !== last) {
        last = s;
        setScrolled(s);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = [
    ['#services', t.nav.services],
    ['#founders', t.nav.founders],
    ['#process', t.nav.process],
    ['#work', t.nav.work],
    ['#clients', t.nav.clients],
  ] as const;

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav-inner">
        <a href="#top" className="brand" aria-label="Picksys Innovation" onClick={() => setOpen(false)}>
          <img src={mark} width="30" height="30" alt="" className="brand-mark" />
          <span className="brand-word">
            Picksys<span>Innovation</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <LangSwitch />
          <a href="#contact" className="btn btn-sm btn-light nav-cta">
            {t.nav.cta}
          </a>
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile">
          {links.map(([href, label], i) => (
            <a key={href} href={href} onClick={() => setOpen(false)} style={{ ['--i' as string]: i }}>
              <small>0{i + 1}</small>
              {label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-grad" onClick={() => setOpen(false)}>
          {t.nav.cta}
        </a>
      </div>
    </header>
  );
}
