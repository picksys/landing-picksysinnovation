import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { content, type Content, type Lang } from './content';

type Ctx = { lang: Lang; t: Content; setLang: (l: Lang) => void };
const LanguageContext = createContext<Ctx | null>(null);
const KEY = 'picksys-lang';

function initialLang(): Lang {
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'es' || q === 'en') return q;
    const saved = localStorage.getItem(KEY);
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    /* storage unavailable */
  }
  return 'en'; // English by default
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
      const url = new URL(window.location.href);
      if (l === 'en') url.searchParams.delete('lang');
      else url.searchParams.set('lang', l);
      window.history.replaceState(null, '', url);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const t = content[lang];
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [lang]);

  const value = useMemo(() => ({ lang, t: content[lang], setLang }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}
