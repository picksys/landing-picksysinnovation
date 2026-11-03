import { useLang } from '../i18n/LanguageContext';
import { site } from '../i18n/content';
import { LangSwitch } from './Nav';
import mark from '../assets/mark.png';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={mark} width="40" height="40" alt="" loading="lazy" />
            <p>{t.footer.tagline}</p>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <a href="#services">{t.nav.services}</a>
            <a href="#founders">{t.nav.founders}</a>
            <a href="#work">{t.nav.work}</a>
            <a href="#contact">{t.nav.cta}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </nav>
          <LangSwitch />
        </div>
        <p className="footer-word" aria-hidden="true">
          PICKSYS
        </p>
        <div className="footer-bottom">
          <span>
            © {year} Picksys Innovation. {t.footer.rights}
          </span>
          <span>{t.footer.made}</span>
          <a href="#top">{t.footer.top} ↑</a>
        </div>
      </div>
    </footer>
  );
}
