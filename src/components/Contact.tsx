import { useRef, useState, type FormEvent } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { content, site, type Question } from '../i18n/content';
import { SectionHead } from './Sections';
import { Arrow } from './icons';

type Status = 'idle' | 'sending' | 'ok' | 'error';
type Answers = Record<string, string | string[]>;

const CONTACT_FIELDS = ['name', 'restaurant', 'email', 'phone', 'city'] as const;

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

  const setOne = (id: string, v: string) => setAnswers((a) => ({ ...a, [id]: v }));
  const toggleMany = (id: string, v: string) =>
    setAnswers((a) => {
      const cur = (a[id] as string[] | undefined) ?? [];
      return { ...a, [id]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] };
    });

  /** Native validity for inputs in the visible step + required multi-choice groups. */
  function stepIsValid(): boolean {
    const box = formRef.current?.querySelector<HTMLElement>(`[data-step="${step}"]`);
    const bad = box?.querySelector<HTMLInputElement | HTMLTextAreaElement>(':invalid');
    if (bad) {
      bad.reportValidity();
      return false;
    }
    const req = questions.find((q) => q.step === step && q.required && !((answers[q.id] as string[] | undefined)?.length));
    setMissing(req ? req.id : null);
    if (req) {
      formRef.current?.querySelector<HTMLElement>(`#q-${req.id}`)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return false;
    }
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
    const en = content.en.contact;
    const data = new FormData();
    for (const f of CONTACT_FIELDS) data.set(en.fields[f], String(answers[f] ?? ''));
    (en.questions as Question[]).forEach((q, i) => {
      const v = answers[q.id];
      data.set(`${i + 1}. ${q.q}`, Array.isArray(v) ? v.join(', ') : (v ?? ''));
    });
    data.set('language', lang);
    data.set('_replyto', String(answers.email ?? ''));
    data.set('_subject', `Restaurant review request: ${answers.restaurant ?? ''}`);

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

  const text = (id: (typeof CONTACT_FIELDS)[number], type = 'text', required = false, autoComplete?: string) => (
    <label className="field">
      <input
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder=" "
        value={String(answers[id] ?? '')}
        onChange={(e) => setOne(id, e.target.value)}
      />
      <span>{c.fields[id]}</span>
    </label>
  );

  const renderQuestion = (q: Question) => {
    if (q.kind === 'text')
      return (
        <label key={q.id} id={`q-${q.id}`} className="field survey-q">
          <textarea name={q.id} rows={3} placeholder=" " value={String(answers[q.id] ?? '')} onChange={(e) => setOne(q.id, e.target.value)} />
          <span>{q.q}</span>
        </label>
      );
    const many = q.kind === 'many';
    const cur = answers[q.id];
    return (
      <fieldset key={q.id} id={`q-${q.id}`} className={`interest survey-q ${missing === q.id ? 'is-missing' : ''}`}>
        <legend>
          {q.q}
          <small>{many ? c.pickMany : c.pickOne}</small>
        </legend>
        <div className="interest-chips">
          {q.options.map((o) => {
            const on = many ? ((cur as string[] | undefined) ?? []).includes(o) : cur === o;
            return (
              <label key={o} className={`choice ${on ? 'is-on' : ''}`}>
                <input
                  type={many ? 'checkbox' : 'radio'}
                  name={q.id}
                  value={o}
                  checked={on}
                  onChange={() => {
                    if (many) toggleMany(q.id, o);
                    else setOne(q.id, o);
                    if (missing === q.id) setMissing(null);
                  }}
                />
                <span>{o}</span>
              </label>
            );
          })}
        </div>
        {missing === q.id && (
          <p className="survey-error" role="alert">
            {c.required}
          </p>
        )}
      </fieldset>
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
            <p className="form-status is-ok survey-done" role="status">
              {c.ok}
            </p>
          ) : (
            <>
              <div className="survey-head">
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
                    <>
                      <div className="field-row">
                        {text('name', 'text', true, 'name')}
                        {text('restaurant', 'text', true, 'organization')}
                      </div>
                      <div className="field-row">
                        {text('email', 'email', true, 'email')}
                        {text('phone', 'tel', false, 'tel')}
                      </div>
                      {text('city', 'text', false, 'address-level2')}
                    </>
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
