import { useLang } from './i18n/LanguageContext';
import { useRevealAll } from './hooks/motion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import { Manifesto, Process, ServiceTicker, Services, Stats } from './components/Sections';
import Founders from './components/Founders';
import Work from './components/Work';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { SvgDefs } from './components/icons';

export default function App() {
  const { lang } = useLang();
  useRevealAll(lang);
  return (
    <>
      <SvgDefs />
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main id="main">
        <Hero />
        <ServiceTicker />
        <Manifesto />
        <Services />
        <Founders />
        <Process />
        <Work />
        <Stats />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
