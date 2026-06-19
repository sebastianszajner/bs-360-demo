// Mapa startu raportu — prestiżowy ekran intro.
// Editorial język wizualny z szajner.com (Playfair Display + JetBrains Mono),
// brandowe ikony ic-* (R13, nie generatywne). Wyjaśnia model, mapuje sekcje
// i pokazuje, co czytać z perspektywy danego odbiorcy.
import type { FitnessResult } from '../../engine/fitness';
import type { ModelConfig } from '../../data/modelConfig';
import type { PersonaData } from '../../engine/scorer';
import { SCENARIUSZE } from '../../data/reportContent';

interface Props {
  persona: PersonaData;
  fitness: FitnessResult;
  model: ModelConfig;
  surveyDate: string;
  onEnter: () => void;
  onBack: () => void;
}

const ICON = (name: string) => `${import.meta.env.BASE_URL}icons/${name}`;

// paleta editorial (most szajner.com ↔ raport SUUS)
const NAVY = '#0d1f33';
const AMBER = '#e8a020';
const CREAM = '#f5f0e8';

const PILLARS = [
  {
    icon: 'fit-balance.png',
    eyebrow: 'Model',
    title: 'Punkty przegięcia',
    body: 'To nie skala, w której więcej znaczy lepiej. Każde zachowanie ma poziom optymalny. Może być za mało, w sam raz, albo za dużo — i każdy stan to inny kierunek pracy.',
  },
  {
    icon: 'fit-perspectives.png',
    eyebrow: '360 stopni',
    title: 'Cztery perspektywy',
    body: 'Te same zachowania ocenia samoocena, przełożony, współpracownicy i podwładni. Najwięcej mówią nie same wyniki, lecz różnice między tym, jak widzisz siebie, a jak widzą Cię inni.',
  },
  {
    icon: 'fit-growth.png',
    eyebrow: 'Od diagnozy do działania',
    title: 'Interpretacja i plan',
    body: 'Każda kompetencja kończy się gotową interpretacją i kierunkiem rozwoju. Na końcu czeka plan na 90 dni: trzy priorytety, nie pięć obietnic.',
  },
];

const REPORT_MAP = [
  ['01', 'Briefing wykonawczy', 'Pięć wyników, trzy mocne strony, trzy obszary rozwoju — w dwie minuty.'],
  ['02', 'Punkty przegięcia', 'Matryca trafności wszystkich zachowań i krzywe optimum per kompetencja.'],
  ['03', 'Wyniki w pigułce', 'Tabela czterech perspektyw z luką między samooceną a otoczeniem.'],
  ['04', 'Analityka pogłębiona', 'Profil radarowy, mapa cieplna, luki percepcji, najmocniejsze i rozwojowe zachowania.'],
  ['05', 'Analiza globalna', 'Synteza całego profilu — wzorzec działania, nie pięć osobnych wyników.'],
  ['06', 'Pięć kompetencji', 'Każda z osobna: suwaki trafności, interpretacja, sześć kierunków rozwoju, głosy zespołu.'],
  ['07', 'Plan działań 90 dni', 'Trzy priorytety w trzech horyzontach czasowych i ścieżki wdrożenia.'],
] as const;

const ROLE_GUIDE = [
  ['Jesteś ocenianym menedżerem', 'Zacznij od briefingu i punktów przegięcia. Zatrzymaj się przy największej luce. Wybierz jeden priorytet z planu i wpisz go do kalendarza w tym tygodniu.'],
  ['Jesteś przełożonym', 'Skup się na lukach percepcji i planie 90 dni. To materiał do rozmowy rozwojowej — pytania coachingowe zamiast oceny. Umów rozmowę w ciągu 7 dni od raportu.'],
  ['Jesteś HR / HRBP', 'Czytaj matrycę trafności i analizę globalną. Szukaj wzorca: które zachowania są przegięte, gdzie zespół jest jednomyślny, co powtarza się w grupie menedżerów.'],
] as const;

export default function ReportIntro({ persona, fitness, model, surveyDate, onEnter, onBack }: Props) {
  return (
    <div className="min-h-screen font-serif-body" style={{ background: NAVY, color: CREAM }}>
      {/* górny pasek */}
      <div className="no-print sticky top-0 z-10" style={{ background: 'rgba(13,31,51,0.85)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${AMBER}33` }}>
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <button onClick={onBack} className="font-mono text-xs tracking-widest uppercase opacity-70 hover:opacity-100">← Start</button>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: AMBER }}>Brain Stream</span>
          <button onClick={onEnter} className="font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-sm transition hover:-translate-y-0.5" style={{ background: AMBER, color: NAVY }}>
            Wejdź do raportu →
          </button>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 75% 35%, ${AMBER}14, transparent 60%)` }} />
        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-12">
          <div className="font-mono text-[11px] tracking-[0.35em] uppercase flex items-center gap-3 mb-7" style={{ color: AMBER }}>
            <span style={{ width: 42, height: 2, background: AMBER, display: 'inline-block' }} />
            Raport rozwojowy 360°
          </div>
          <h1 className="font-display font-black leading-[0.95] tracking-tight mb-7" style={{ fontSize: 'clamp(40px, 6.5vw, 78px)' }}>
            Zanim zaczniesz —<br /><span style={{ color: AMBER, fontStyle: 'italic', fontWeight: 400 }}>mapa</span> tego raportu
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mb-2" style={{ color: '#d8dfe8' }}>
            Ten raport to nie zestaw wykresów. To <strong style={{ color: CREAM }}>system kalibracji zachowań menedżerskich</strong> —
            pokazuje nie tylko, jak wysoko jesteś oceniany, ale czy danego zachowania jest tyle, ile potrzebuje Twoja rola.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-8 font-mono text-xs tracking-wider uppercase" style={{ color: '#9fb0c2' }}>
            <span>Dla: <span style={{ color: CREAM }}>{persona.name}</span></span>
            <span>{persona.position}</span>
            <span>{surveyDate}</span>
            <span>{fitness.totalRespondents} respondentów · {model.competencies.length} kompetencji</span>
          </div>
        </div>
      </section>

      {/* NA CZYM TO POLEGA — 3 filary */}
      <section style={{ background: CREAM, color: '#1c2b3a' }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: '#c8442a' }}>Na czym to polega</div>
          <h2 className="font-display font-black tracking-tight mb-10" style={{ fontSize: 'clamp(30px, 4vw, 48px)' }}>
            Trzy rzeczy, które ten raport <span style={{ color: '#c8442a', fontStyle: 'italic', fontWeight: 400 }}>robi inaczej</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {PILLARS.map((p) => (
              <div key={p.title}>
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5" style={{ background: '#fff', boxShadow: '0 12px 30px rgba(28,43,58,0.12)' }}>
                  <img src={ICON(p.icon)} alt="" className="w-16 h-16 object-contain" />
                </div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: AMBER }}>{p.eyebrow}</div>
                <h3 className="font-display font-bold text-2xl mb-3 tracking-tight">{p.title}</h3>
                <p className="text-[15px] leading-relaxed" style={{ color: '#3a4654' }}>{p.body}</p>
              </div>
            ))}
          </div>

          {/* mini-skala punktów przegięcia */}
          <div className="mt-12 rounded-2xl p-7" style={{ background: '#fff', boxShadow: '0 12px 30px rgba(28,43,58,0.08)' }}>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: '#6b7a8d' }}>Skala trafności zachowania</div>
            <div className="flex items-stretch rounded-lg overflow-hidden h-11 text-center text-xs font-semibold">
              <div className="flex-1 flex items-center justify-center" style={{ background: '#cfe8b8', color: '#3d6b1f' }}>za mało · wzmocnij</div>
              <div className="flex-[1.2] flex items-center justify-center text-white" style={{ background: '#00d084' }}>w sam raz · utrzymaj</div>
              <div className="flex-1 flex items-center justify-center" style={{ background: '#ffcc80', color: '#b5560a' }}>za dużo · odpuść</div>
            </div>
            <p className="text-[13px] mt-3" style={{ color: '#6b7a8d' }}>
              Przykład: „udziela informacji zwrotnej" — za mało znaczy, że jej brakuje; za dużo, że feedback męczy zespół i traci wagę. Cel to środek, nie maksimum.
            </p>
          </div>
        </div>
      </section>

      {/* CO ZNAJDZIESZ — mapa sekcji */}
      <section style={{ background: NAVY }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: AMBER }}>Co znajdziesz w środku</div>
          <h2 className="font-display font-black tracking-tight mb-9" style={{ fontSize: 'clamp(30px, 4vw, 48px)', color: CREAM }}>
            Mapa raportu
          </h2>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-1">
            {REPORT_MAP.map(([num, title, desc]) => (
              <div key={num} className="flex gap-4 py-3 items-start" style={{ borderBottom: '1px solid rgba(245,240,232,0.1)' }}>
                <span className="font-mono text-sm font-semibold pt-0.5" style={{ color: AMBER }}>{num}</span>
                <div>
                  <div className="font-display font-bold text-lg" style={{ color: CREAM }}>{title}</div>
                  <div className="text-[13px] leading-snug" style={{ color: '#9fb0c2' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DLA KOGO — perspektywa odbiorcy */}
      <section style={{ background: CREAM, color: '#1c2b3a' }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: '#c8442a' }}>Z czyjej perspektywy czytasz</div>
          <h2 className="font-display font-black tracking-tight mb-9" style={{ fontSize: 'clamp(30px, 4vw, 48px)' }}>
            Co przeczytać <span style={{ color: '#c8442a', fontStyle: 'italic', fontWeight: 400 }}>najpierw</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {ROLE_GUIDE.map(([who, what], i) => (
              <div key={who} className="rounded-2xl p-6" style={{ background: '#fff', boxShadow: '0 10px 28px rgba(28,43,58,0.08)', borderTop: `3px solid ${['#003f8a', '#7a00df', '#c8442a'][i]}` }}>
                <div className="font-display font-bold text-lg mb-3 tracking-tight">{who}</div>
                <p className="text-[14px] leading-relaxed" style={{ color: '#3a4654' }}>{what}</p>
              </div>
            ))}
          </div>

          {/* ile masz czasu — ścieżki 10/30/90 z istniejących scenariuszy */}
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4 mt-14" style={{ color: '#6b7a8d' }}>Ile masz czasu</div>
          <div className="grid md:grid-cols-3 gap-6">
            {SCENARIUSZE.map((s) => (
              <div key={s.czas} className="rounded-2xl p-6 border" style={{ borderColor: '#e4ddd0', background: '#fffdf9' }}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-display font-black text-3xl tracking-tight">{s.czas}</span>
                  <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: AMBER }}>{s.nazwa}</span>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {s.punkty.map((p, j) => (
                    <li key={j} className="text-[13px] flex gap-2" style={{ color: '#3a4654' }}>
                      <span style={{ color: '#c8442a' }}>—</span><span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA końcowe */}
      <section className="relative overflow-hidden" style={{ background: '#c8442a', color: CREAM }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 50%, ${NAVY}55, transparent 60%)` }} />
        <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase mb-5" style={{ color: '#ffd9a0' }}>Masz mapę — czas wejść w teren</div>
          <h2 className="font-display font-black leading-tight tracking-tight mb-6" style={{ fontSize: 'clamp(34px, 5vw, 60px)' }}>
            Raport nie zmienia nic.<br /><span style={{ fontStyle: 'italic', fontWeight: 400 }}>Pierwszy ruch</span> — owszem.
          </h2>
          <button onClick={onEnter} className="font-mono text-sm tracking-widest uppercase px-9 py-4 rounded-sm transition hover:-translate-y-0.5 font-semibold" style={{ background: NAVY, color: CREAM }}>
            Wejdź do raportu →
          </button>
        </div>
      </section>
    </div>
  );
}
