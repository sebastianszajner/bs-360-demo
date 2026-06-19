// Mapa startu raportu — prestiżowy ekran intro w brandzie Brain Stream.
// Pełna szerokość strony, hiperrealistyczne obrazy odsłaniane na hover (vibe gry),
// editorial typografia (Playfair Display + JetBrains Mono).
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

const IMG = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

// paleta Brain Stream
const BS = {
  primary: '#7a00df',
  secondary: '#0693e3',
  green: '#00d084',
  orange: '#ff6900',
  ink: '#0c0420',     // bardzo ciemny fiolet (tło)
  ink2: '#150a33',
  navy: '#003f8a',
};

const PILLARS = [
  { img: 'pillar-balance.jpg', glow: BS.primary, eyebrow: 'Model', title: 'Punkty przegięcia', body: 'Każde zachowanie ma poziom optymalny. Może być za mało, w sam raz, albo za dużo — i każdy stan to inny kierunek pracy.' },
  { img: 'pillar-perspectives.jpg', glow: BS.secondary, eyebrow: '360 stopni', title: 'Cztery perspektywy', body: 'Te same zachowania ocenia samoocena, przełożony, współpracownicy i podwładni. Najwięcej mówią różnice między nimi.' },
  { img: 'pillar-plan.jpg', glow: BS.green, eyebrow: 'Od diagnozy do działania', title: 'Interpretacja i plan', body: 'Każda kompetencja kończy się gotową interpretacją i kierunkiem rozwoju. Na końcu plan na 90 dni: trzy priorytety.' },
];

const ROLE_GUIDE = [
  { img: 'role-manager.jpg', glow: BS.primary, who: 'Jesteś ocenianym menedżerem', what: 'Zacznij od briefingu i punktów przegięcia. Zatrzymaj się przy największej luce. Wybierz jeden priorytet i wpisz go do kalendarza w tym tygodniu.' },
  { img: 'role-supervisor.jpg', glow: BS.secondary, who: 'Jesteś przełożonym', what: 'Skup się na lukach percepcji i planie 90 dni. To materiał do rozmowy rozwojowej, pytania coachingowe zamiast oceny. Umów rozmowę w ciągu 7 dni.' },
  { img: 'role-hr.jpg', glow: BS.orange, who: 'Jesteś HR / HRBP', what: 'Czytaj matrycę trafności i analizę globalną. Szukaj wzorca: które zachowania są przegięte, gdzie zespół jest jednomyślny, co powtarza się w grupie menedżerów.' },
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

// Kafel z hiperrealistycznym obrazem odsłanianym na hover (vibe gry).
function ImageTile({ img, glow, eyebrow, title, body, large = false }: { img: string; glow: string; eyebrow?: string; title: string; body: string; large?: boolean }) {
  return (
    <div
      className="group relative overflow-hidden rounded-3xl cursor-default transition-all duration-500 hover:-translate-y-1.5"
      style={{ minHeight: large ? 320 : 280, border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 40px rgba(0,0,0,0.35)' }}
    >
      {/* obraz tła — przyciemniony, rozjaśnia się na hover */}
      <img src={IMG(img)} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25 saturate-[0.85] transition-all duration-700 group-hover:opacity-65 group-hover:scale-110 group-hover:saturate-100" />
      {/* gradient dla czytelności tekstu */}
      <div className="absolute inset-0 transition-opacity duration-500" style={{ background: `linear-gradient(180deg, ${BS.ink}cc 0%, ${BS.ink}66 45%, ${BS.ink}f2 100%)` }} />
      {/* glow border na hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 0 1.5px ${glow}, 0 0 50px ${glow}55` }} />
      {/* treść */}
      <div className="relative z-10 h-full flex flex-col justify-end p-7" style={{ minHeight: large ? 320 : 280 }}>
        {eyebrow && <div className="font-mono text-[10px] tracking-[0.22em] uppercase mb-2 transition-colors" style={{ color: glow }}>{eyebrow}</div>}
        <h3 className="font-display font-bold text-white tracking-tight mb-2" style={{ fontSize: large ? 30 : 24 }}>{title}</h3>
        <p className="text-[14px] leading-relaxed text-white/65 group-hover:text-white/90 transition-colors duration-500">{body}</p>
        <div className="mt-3 h-0.5 w-10 rounded-full transition-all duration-500 group-hover:w-20" style={{ background: glow }} />
      </div>
    </div>
  );
}

export default function ReportIntro({ persona, fitness, model, surveyDate, onEnter, onBack }: Props) {
  return (
    <div className="min-h-screen font-serif-body text-white" style={{ background: BS.ink }}>
      {/* górny pasek */}
      <div className="no-print sticky top-0 z-20" style={{ background: `${BS.ink}e6`, backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BS.primary}33` }}>
        <div className="max-w-[1500px] mx-auto px-8 py-3.5 flex items-center justify-between">
          <button onClick={onBack} className="font-mono text-xs tracking-widest uppercase opacity-70 hover:opacity-100 transition">← Start</button>
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase" style={{ color: BS.primary }}>Brain Stream</span>
          <button onClick={onEnter} className="font-mono text-xs tracking-widest uppercase px-5 py-2.5 rounded-lg font-semibold transition hover:-translate-y-0.5" style={{ background: BS.primary, color: '#fff', boxShadow: `0 0 24px ${BS.primary}66` }}>
            Wejdź do raportu →
          </button>
        </div>
      </div>

      {/* HERO — pełna szerokość */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(1200px 600px at 78% 28%, ${BS.primary}33, transparent 65%), radial-gradient(900px 500px at 12% 80%, ${BS.secondary}22, transparent 60%)` }} />
        <div className="relative max-w-[1500px] mx-auto px-8 pt-20 pb-16">
          <div className="font-mono text-[12px] tracking-[0.38em] uppercase flex items-center gap-3 mb-8" style={{ color: BS.secondary }}>
            <span style={{ width: 48, height: 2, background: BS.secondary, display: 'inline-block' }} />
            Raport rozwojowy 360°
          </div>
          <h1 className="font-display font-black leading-[0.9] tracking-tight mb-8" style={{ fontSize: 'clamp(48px, 8vw, 112px)' }}>
            Zanim zaczniesz —<br /><span style={{ color: BS.primary, fontStyle: 'italic', fontWeight: 400 }}>mapa</span> tego raportu
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed max-w-3xl text-white/75">
            To nie zestaw wykresów. To <strong className="text-white">system kalibracji zachowań menedżerskich</strong> —
            pokazuje nie tylko, jak wysoko jesteś oceniany, ale czy danego zachowania jest tyle, ile potrzebuje Twoja rola.
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-2 mt-10 font-mono text-xs tracking-wider uppercase text-white/45">
            <span>Dla: <span className="text-white/90">{persona.name}</span></span>
            <span>{persona.position}</span>
            <span>{surveyDate}</span>
            <span>{fitness.totalRespondents} respondentów · {model.competencies.length} kompetencji</span>
          </div>
        </div>
      </section>

      {/* FILARY — kafle hover-reveal, pełna szerokość */}
      <section className="relative">
        <div className="max-w-[1500px] mx-auto px-8 py-10">
          <div className="font-mono text-[12px] tracking-[0.3em] uppercase mb-3" style={{ color: BS.primary }}>Na czym to polega</div>
          <h2 className="font-display font-black tracking-tight mb-9" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}>
            Trzy rzeczy, które ten raport <span style={{ color: BS.primary, fontStyle: 'italic', fontWeight: 400 }}>robi inaczej</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((p) => <ImageTile key={p.title} {...p} large />)}
          </div>

          {/* mini-skala trafności */}
          <div className="mt-10 rounded-2xl p-7" style={{ background: BS.ink2, border: `1px solid ${BS.primary}22` }}>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4 text-white/50">Skala trafności zachowania</div>
            <div className="flex items-stretch rounded-xl overflow-hidden h-12 text-center text-sm font-semibold">
              <div className="flex-1 flex items-center justify-center" style={{ background: '#3d6b1f', color: '#dff0c8' }}>za mało · wzmocnij</div>
              <div className="flex-[1.25] flex items-center justify-center text-white" style={{ background: BS.green }}>w sam raz · utrzymaj</div>
              <div className="flex-1 flex items-center justify-center text-white" style={{ background: BS.orange }}>za dużo · odpuść</div>
            </div>
            <p className="text-[14px] mt-3 text-white/55">
              „Udziela informacji zwrotnej": za mało znaczy, że jej brakuje; za dużo, że feedback męczy zespół i traci wagę. Cel to środek, nie maksimum.
            </p>
          </div>
        </div>
      </section>

      {/* MAPA RAPORTU — pełna szerokość */}
      <section style={{ background: BS.ink2 }}>
        <div className="max-w-[1500px] mx-auto px-8 py-14">
          <div className="font-mono text-[12px] tracking-[0.3em] uppercase mb-3" style={{ color: BS.secondary }}>Co znajdziesz w środku</div>
          <h2 className="font-display font-black tracking-tight mb-9" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}>Mapa raportu</h2>
          <div className="grid md:grid-cols-2 gap-x-14 gap-y-1">
            {REPORT_MAP.map(([num, title, desc]) => (
              <div key={num} className="flex gap-5 py-4 items-start group" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="font-mono text-base font-semibold pt-0.5 transition-colors group-hover:text-white" style={{ color: BS.primary }}>{num}</span>
                <div>
                  <div className="font-display font-bold text-xl text-white">{title}</div>
                  <div className="text-[14px] leading-snug text-white/55">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERSPEKTYWY — kafle ról hover-reveal */}
      <section className="relative">
        <div className="max-w-[1500px] mx-auto px-8 py-14">
          <div className="font-mono text-[12px] tracking-[0.3em] uppercase mb-3" style={{ color: BS.orange }}>Z czyjej perspektywy czytasz</div>
          <h2 className="font-display font-black tracking-tight mb-9" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}>
            Co przeczytać <span style={{ color: BS.orange, fontStyle: 'italic', fontWeight: 400 }}>najpierw</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {ROLE_GUIDE.map((r) => <ImageTile key={r.who} img={r.img} glow={r.glow} title={r.who} body={r.what} large />)}
          </div>

          {/* ścieżki czasu */}
          <div className="font-mono text-[12px] tracking-[0.3em] uppercase mb-4 mt-14 text-white/50">Ile masz czasu</div>
          <div className="grid md:grid-cols-3 gap-6">
            {SCENARIUSZE.map((s, i) => (
              <div key={s.czas} className="rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1" style={{ background: BS.ink2, border: `1px solid ${[BS.primary, BS.secondary, BS.green][i]}44` }}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-display font-black text-4xl tracking-tight text-white">{s.czas}</span>
                  <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: [BS.primary, BS.secondary, BS.green][i] }}>{s.nazwa}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {s.punkty.map((p, j) => (
                    <li key={j} className="text-[14px] flex gap-2 text-white/70">
                      <span style={{ color: [BS.primary, BS.secondary, BS.green][i] }}>→</span><span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${BS.primary} 0%, ${BS.navy} 100%)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(700px 400px at 28% 50%, ${BS.secondary}55, transparent 60%)` }} />
        <div className="relative max-w-[1100px] mx-auto px-8 py-24 text-center">
          <div className="font-mono text-[12px] tracking-[0.3em] uppercase mb-6 text-white/70">Masz mapę — czas wejść w teren</div>
          <h2 className="font-display font-black leading-tight tracking-tight mb-8 text-white" style={{ fontSize: 'clamp(40px, 6vw, 76px)' }}>
            Raport nie zmienia nic.<br /><span style={{ fontStyle: 'italic', fontWeight: 400 }}>Pierwszy ruch</span> — owszem.
          </h2>
          <button onClick={onEnter} className="font-mono text-sm tracking-widest uppercase px-11 py-5 rounded-xl font-semibold transition hover:-translate-y-1 hover:scale-105" style={{ background: '#fff', color: BS.primary, boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
            Wejdź do raportu →
          </button>
        </div>
      </section>
    </div>
  );
}
