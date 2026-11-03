import { useLang } from '../i18n/LanguageContext';
import Marquee from './Marquee';
import { SectionHead } from './Sections';
import chevrolet from '../assets/clients/chevrolet.webp';
import nissan from '../assets/clients/nissan.webp';
import volkswagen from '../assets/clients/volkswagen.webp';
import yacopini from '../assets/clients/yacopini.webp';
import vacaNegra from '../assets/clients/vaca-negra.webp';
import globoPadel from '../assets/clients/globo-padel.webp';
import wildFox from '../assets/clients/wild-fox-produccione.webp';
import deLaOstia from '../assets/clients/de-la-ostia.webp';
import lucho from '../assets/clients/lucho-mercado.webp';

type Logo = { name: string; src: string; w: number; h: number; tone: 'light' | 'dark' };

// tone = tile background that keeps each logo legible
const ROW_A: Logo[] = [
  { name: 'Yacopini Motors — Chevrolet', src: chevrolet, w: 600, h: 102, tone: 'dark' },
  { name: 'Nissan — Yacopini', src: nissan, w: 300, h: 115, tone: 'light' },
  { name: 'Volkswagen — Yacopini Süd', src: volkswagen, w: 300, h: 72, tone: 'light' },
  { name: 'Territorio Yacopini', src: yacopini, w: 322, h: 117, tone: 'dark' },
  { name: 'Vaca Negra', src: vacaNegra, w: 140, h: 140, tone: 'light' },
];
const ROW_B: Logo[] = [
  { name: 'Wild Fox Producciones', src: wildFox, w: 140, h: 140, tone: 'dark' },
  { name: 'Globo Padel', src: globoPadel, w: 150, h: 140, tone: 'light' },
  { name: 'De La Ostia', src: deLaOstia, w: 80, h: 80, tone: 'dark' },
  { name: 'Lucho Mercado Trainer', src: lucho, w: 190, h: 117, tone: 'dark' },
  { name: 'Yacopini Motors — Chevrolet', src: chevrolet, w: 600, h: 102, tone: 'dark' },
  { name: 'Nissan — Yacopini', src: nissan, w: 300, h: 115, tone: 'light' },
];

const Tile = ({ l }: { l: Logo }) => (
  <div className={`logo-tile is-${l.tone}`} title={l.name}>
    <img src={l.src} alt={l.name} width={l.w} height={l.h} loading="lazy" decoding="async" />
  </div>
);

export default function Clients() {
  const { t } = useLang();
  return (
    <section id="clients" className="section clients">
      <div className="container">
        <SectionHead label={t.clients.label} title={t.clients.title} accent={t.clients.titleAccent} center />
      </div>
      <div className="clients-rows" data-reveal>
        <Marquee speed={38} label={t.clients.label}>
          {[...ROW_A, ...ROW_A].map((l, i) => (
            <Tile key={i} l={l} />
          ))}
        </Marquee>
        <Marquee speed={44} reverse>
          {[...ROW_B, ...ROW_B].map((l, i) => (
            <Tile key={i} l={l} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
