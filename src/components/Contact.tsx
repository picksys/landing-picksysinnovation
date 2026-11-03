import { useState, type FormEvent } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { site } from '../i18n/content';
import { SectionHead } from './Sections';
import { Arrow } from './icons';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export default function Contact() {
  const { t, lang } = useLang();
  const c = t.contact;
  const [status, setStatus] = useState<Status>('idle');
  const [interests, setInterests] = useState<string[]>([]);

  const toggle = (v: string) => setInterests((xs) => (xs.includes(v) ? xs.filter((x) => x !== v) : [...xs, v]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set('interests', interests.join(', '));
    data.set('language', lang);
    setStatus('sending');
    try {
      const res = await fetch(site.formspree, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setInterests([]);
      setStatus('ok');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="container contact-grid">
        <div className="contact-intro">
          <SectionHead label={c.label} title={c.title} accent={c.titleAccent} sub={c.sub} />
          <p className="contact-direct" data-reveal>
            {c.direct}{' '}
            <a href={`mailto:${site.email}`} className="link-grad">
              {site.email}
            </a>
          </p>
        </div>

        <form className="card contact-form" onSubmit={onSubmit} data-reveal style={{ ['--d' as string]: '120ms' }}>
          <div className="field-row">
            <label className="field">
              <input name="name" required autoComplete="name" placeholder=" " />
              <span>{c.name}</span>
            </label>
            <label className="field">
              <input name="email" type="email" required autoComplete="email" placeholder=" " />
              <span>{c.email}</span>
            </label>
          </div>
          <div className="field-row">
            <label className="field">
              <input name="company" autoComplete="organization" placeholder=" " />
              <span>{c.company}</span>
            </label>
            <label className="field">
              <input name="phone" type="tel" autoComplete="tel" placeholder=" " />
              <span>{c.phone}</span>
            </label>
          </div>

          <fieldset className="interest">
            <legend>{c.interest}</legend>
            <div className="interest-chips">
              {c.interests.map((it) => (
                <button type="button" key={it} aria-pressed={interests.includes(it)} className={interests.includes(it) ? 'is-on' : ''} onClick={() => toggle(it)}>
                  {it}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="field">
            <textarea name="message" required rows={4} placeholder=" " />
            <span>{c.message}</span>
          </label>

          <button type="submit" className="btn btn-grad btn-lg btn-block" disabled={status === 'sending'}>
            {status === 'sending' ? c.sending : c.send}
            <Arrow />
          </button>

          <p className={`form-status is-${status}`} role="status" aria-live="polite">
            {status === 'ok' ? c.ok : status === 'error' ? c.error : ''}
          </p>
        </form>
      </div>
    </section>
  );
}
