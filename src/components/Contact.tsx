import { useRef, useState, type FormEvent } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { content, site, type Question } from '../i18n/content';
import { SectionHead } from './Sections';
import { Arrow } from './icons';

type Status = 'idle' | 'sending' | 'ok' | 'error';
type Answers = Record<string, string | string[]>;

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const SCALE = Array.from({ length: 11 }, (_, i) => String(i));

/** Replica of the Tally survey (tally.so/r/GeKZMO): 2 pages, required questions, conditional follow-ups. */
export default function Contact() {
  const { t, lang } = useLang();
  const c = t.contact;
  const questions = c.questions as Question[];
  const total = c.steps.length;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [missing, setMissing] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  // Conditions compare option indexes, so they work the same in both languages.
  const visible = (q: Question) => {
    if (!q.showIf) return true;
    const src = questions.find((x) => x.id === q.showIf!.id);
    const v = answers[q.showIf.id];
    const idx = src?.options?.indexOf(String(v)) ?? -1;
    return q.showIf.values.includes(idx);
  };

  const set = (id: string, v: string | string[]) => {
    setAnswers((a) => ({ ...a, [id]: v }));
    if (missing === id) setMissing(null);
  };
  const toggle = (id: string, v: string) => {
    const cur = (answers[id] as string[] | undefined) ?? [];
    set(id, cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]);
  };

  function stepIsValid(): boolean {
    const req = questions.find((q) => q.step === step && q.required && visible(q) && !String(answers[q.id] ?? '').trim() && !(answers[q.id] as string[] | undefined)?.length);
    if (req) {
      setMissing(req.id);
      formRef.current?.querySelector<HTMLElement>(`#q-${req.id}`)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return false;
    }
    const bad = formRef.current?.querySelector<HTMLElement>(`[data-step="${step}"]`)?.querySelector<HTMLInputElement>(':invalid');
    if (bad) {
      bad.reportValidity();
      return false;
    }
    setMissing(null);
    return true;
  }

  function go(to: number) {
    setStep(to);
    formRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stepIsValid()) return;
    if (step < total - 1) return go(step + 1);

    // Keys always in English so the team reads the same labels whatever language the visitor used.
    const enQ = content.en.contact.questions as Question[];
    const data = new FormData();
    let n = 0;
    questions.forEach((q, i) => {
      if (q.kind === 'note') return;
      n++;
      const v = answers[q.id];
      data.set(`${n}. ${enQ[i].q}`, visible(q) ? (Array.isArray(v) ? v.join(', ') : (v ?? '')) : '');
    });
    data.set('language', lang);
    if (answers.email) data.set('_replyto', String(answers.email));
    data.set('_subject', `Survey response: ${answers.niche || answers.trade || ''}`);

    setStatus('sending');
    try {
      const res = await fetch(site.formspree, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      setAnswers({});
      setStep(0);
      setStatus('ok');
    } catch {
      setStatus('error');
    }
  }

  const err = (q: Question) =>
    missing === q.id && (
      <p className="survey-error" role="alert">
        {c.required}
      </p>
    );

  const title = (q: Question) => (
    <>
      {q.q}
      {q.required && <i className="survey-req" aria-hidden="true"> *</i>}
    </>
  );

  const renderQuestion = (q: Question) => {
    if (!visible(q)) return null;
    const cur = answers[q.id];

    if (q.kind === 'note')
      return (
        <div key={q.id} className="survey-note">
          <h3>{q.q}</h3>
          {q.text && <p>{q.text}</p>}
        </div>
      );

    if (q.kind === 'one' || q.kind === 'many') {
      const many = q.kind === 'many';
      return (
        <fieldset key={q.id} id={`q-${q.id}`} className={`survey-q ${missing === q.id ? 'is-missing' : ''}`}>
          <legend>
            <span>{title(q)}</span>
            {many && <small>{c.pickMany}</small>}
          </legend>
          <div className="survey-options">
            {q.options!.map((o, i) => {
              const on = many ? ((cur as string[] | undefined) ?? []).includes(o) : cur === o;
              return (
                <label key={o} className={`option ${on ? 'is-on' : ''}`}>
                  <input type={many ? 'checkbox' : 'radio'} name={q.id} value={o} checked={on} onChange={() => (many ? toggle(q.id, o) : set(q.id, o))} />
                  <b aria-hidden="true">{LETTERS[i]}</b>
                  <span>{o}</span>
                </label>
              );
            })}
          </div>
          {err(q)}
        </fieldset>
      );
    }

    if (q.kind === 'scale')
      return (
        <fieldset key={q.id} id={`q-${q.id}`} className={`survey-q ${missing === q.id ? 'is-missing' : ''}`}>
          <legend>
            <span>{title(q)}</span>
          </legend>
          <div className="survey-scale">
            {SCALE.map((v) => (
              <label key={v} className={`scale-btn ${cur === v ? 'is-on' : ''}`}>
                <input type="radio" name={q.id} value={v} checked={cur === v} onChange={() => set(q.id, v)} />
                <span>{v}</span>
              </label>
            ))}
          </div>
          <div className="survey-scale-legend" aria-hidden="true">
            <span>{c.scaleLow}</span>
            <span>{c.scaleHigh}</span>
          </div>
          {err(q)}
        </fieldset>
      );

    const type = q.kind === 'email' ? 'email' : q.kind === 'phone' ? 'tel' : 'text';
    const common = {
      id: `in-${q.id}`,
      name: q.id,
      placeholder: q.placeholder ?? '',
      value: String(cur ?? ''),
    };
    return (
      <div key={q.id} id={`q-${q.id}`} className={`survey-q ${missing === q.id ? 'is-missing' : ''}`}>
        <label className="survey-label" htmlFor={common.id}>
          {title(q)}
        </label>
        {q.kind === 'textarea' ? (
          <textarea {...common} rows={4} className="survey-input" onChange={(e) => set(q.id, e.target.value)} />
        ) : (
          <input
            {...common}
            type={type}
            className="survey-input"
            autoComplete={q.kind === 'email' ? 'email' : q.kind === 'phone' ? 'tel' : 'off'}
            onChange={(e) => set(q.id, e.target.value)}
          />
        )}
        {err(q)}
      </div>
    );
  };

  return (
    <section id="contact" className="section contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="container contact-grid">
        <div className="contact-intro">
          <SectionHead label={c.label} title={c.title} accent={c.titleAccent} sub={c.sub} />
          <ul className="service-points contact-perks" data-reveal>
            {c.perks.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="contact-direct" data-reveal>
            {c.direct}{' '}
            <a href={`mailto:${site.email}`} className="link-grad">
              {site.email}
            </a>
          </p>
        </div>

        <form ref={formRef} className="card contact-form survey" onSubmit={onSubmit} noValidate data-reveal style={{ ['--d' as string]: '120ms' }}>
          {status === 'ok' ? (
            <div className="survey-done" role="status">
              <p>{c.ok}</p>
              <p className="survey-sign">{c.signature}</p>
            </div>
          ) : (
            <>
              <div className="survey-head">
                <h3 className="survey-title">{c.surveyTitle}</h3>
                <p className="survey-step">
                  {c.stepLabel} {step + 1} {c.of} {total} · <strong>{c.steps[step]}</strong>
                </p>
                <div className="survey-bar" aria-hidden="true">
                  <span style={{ transform: `scaleX(${(step + 1) / total})` }} />
                </div>
              </div>

              {c.steps.map((_, i) => (
                <div key={i} data-step={i} className="survey-step-body" hidden={i !== step}>
                  {i === 0 && (
                    <div className="survey-intro">
                      {c.intro.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  )}
                  {questions.filter((q) => q.step === i).map(renderQuestion)}
                </div>
              ))}

              <div className="survey-nav">
                {step > 0 && (
                  <button type="button" className="btn btn-ghost btn-lg" onClick={() => go(step - 1)}>
                    {c.back}
                  </button>
                )}
                <button type="submit" className="btn btn-grad btn-lg survey-next" disabled={status === 'sending'}>
                  {step < total - 1 ? c.next : status === 'sending' ? c.sending : c.send}
                  <Arrow />
                </button>
              </div>

              <p className={`form-status is-${status}`} role="status" aria-live="polite">
                {status === 'error' ? c.error : ''}
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
