import type { ScoringResult, CompetencyScore } from '../../engine/scorer';
import {
  ROLE_SHORT, BRAND, COMPETENCIES, DISTRIBUTIONS, COMP_VOICES,
  competencyZone, type RoleKey,
} from '../../data/model';
import {
  COMPETENCY_NARRATIVES, GLOBAL_ANALYSIS, KLUCZOWY_WNIOSEK, ANALITYKA_LUKI,
  REFLEKSJA_LUKI, PYTANIA_OTWARTE, PLAN_DZIALAN, SLOWNIK, LEGENDA_KOLORY,
  SCENARIUSZE, MANIFEST, SKALA,
} from '../../data/reportContent';
import type { FitnessResult, CompetencyFitness, ZoneMap } from '../../engine/fitness';
import { buildZoneMap } from '../../engine/fitness';
import type { ModelConfig } from '../../data/modelConfig';
import RadarChartComponent from './RadarChart';
import GapChart from './GapChart';
import {
  DonutScore, BehaviorBars, Histogram, Heatmap, GapLines, TopBottomBehaviors,
  JohariWindow, RoleScoreRow,
} from './ReportVisuals';
import {
  StateBadge, BehaviorFitnessRow, GaussCurve, FitnessMatrix, FitnessRing,
} from './FitnessVisuals';
import Hint from '../ui/Hint';
import { PLAN_TEMPLATE, KALENDARZ_90 } from '../../data/reportExtras';

interface Props {
  result: ScoringResult;
  fitness: FitnessResult;
  model: ModelConfig;
  surveyDate: string;
  onReset: () => void;
  onSupervisor: () => void;
  onHR: () => void;
}

const ROLE_ORDER: RoleKey[] = ['sam', 'prz', 'wsp', 'pod'];

/* ---------- helpery prezentacyjne ---------- */

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-7 md:p-9 print-break ${className}`}>
      {children}
    </section>
  );
}

function Eyebrow({ children, color = BRAND.suusGreen }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="text-[11px] font-bold uppercase tracking-[0.12em] mb-1.5" style={{ color }}>
      {children}
    </div>
  );
}

function H1({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4" style={{ color: BRAND.suusNavy }}>{children}</h2>;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-bold mb-2 mt-6" style={{ color: BRAND.primary }}>{children}</h3>;
}

function Para({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] leading-relaxed text-gray-700 mb-3 text-justify">{children}</p>;
}

function gapMeta(gap: number) {
  if (gap > 0.7) return { color: BRAND.orange, label: 'Duża luka · priorytet' };
  if (gap > 0.4) return { color: '#e0920a', label: 'Umiarkowana luka' };
  if (gap < -0.2) return { color: BRAND.suusGreen, label: 'Pozytywny wpływ' };
  return { color: '#9ca3af', label: 'Mała luka · dobry wgląd' };
}

function GapBadge({ gap }: { gap: number }) {
  const m = gapMeta(gap);
  return (
    <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap" style={{ background: m.color + '18', color: m.color }}>
      {gap > 0 ? '+' : ''}{gap.toFixed(2)} {m.label}
    </span>
  );
}

function CompNum({ n, color }: { n: number; color: string }) {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-white text-sm font-black shrink-0" style={{ background: color }}>
      {n}
    </span>
  );
}

/* ---------- sekcja kompetencji ---------- */

function CompetencySection({ comp, fit, idx, zones }: { comp: CompetencyScore; fit: CompetencyFitness; idx: number; zones: ZoneMap }) {
  const narr = COMPETENCY_NARRATIVES[comp.id];
  const def = COMPETENCIES.find((k) => k.id === comp.id)!;
  const voice = COMP_VOICES[comp.id];
  const zone = competencyZone(comp.avgOthers);

  return (
    <Section>
      <Eyebrow color={comp.color}>Kompetencja {idx + 1} z 5 · Jan Kowalski</Eyebrow>
      <div className="flex items-center gap-3 mb-1">
        <CompNum n={idx + 1} color={comp.color} />
        <h2 className="text-xl md:text-2xl font-black tracking-tight" style={{ color: BRAND.suusNavy }}>{def.name}</h2>
      </div>
      <div className="text-xs text-gray-400 mb-5 ml-10">6 min czytania · interpretacja · 6 kierunków rozwoju · 1 callout do refleksji</div>

      <H2>Definicja kompetencji</H2>
      <Para>{def.definition}</Para>

      <H2>Wynik w jednym spojrzeniu</H2>
      <div className="grid md:grid-cols-[auto_1fr] gap-6 items-center mb-2">
        <DonutScore value={comp.avgOthers} color={comp.color} label={zone} />
        <div className="space-y-3">
          <RoleScoreRow comp={comp} />
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Średnia z otoczenia <b style={{ color: BRAND.suusNavy }}>{comp.avgOthers.toFixed(2)}</b></span>
            <GapBadge gap={comp.gap} />
          </div>
        </div>
      </div>

      <H2>Trafność zachowań · punkty przegięcia <Hint text="Cel to optimum, nie maksimum. Marker po lewej znaczy za mało, po prawej za dużo. Romb to samoocena, kropka to średnia otoczenia." color={comp.color} /></H2>
      <p className="text-sm text-gray-500 mb-3">
        Każde zachowanie ma poziom optymalny. Suwak pokazuje, czy otoczenie widzi je jako za mało, w sam raz, czy za dużo.
        Romb to samoocena, kropka to średnia otoczenia.
      </p>
      <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
        <div>
          {fit.behaviors.map((b) => <BehaviorFitnessRow key={b.id} beh={b} zones={zones} />)}
        </div>
        <div className="flex flex-col items-center gap-2 md:pt-2">
          <FitnessRing pct={fit.fitnessPct} color={comp.color} label="dopasowanie" />
          <div className="text-center">
            <div className="text-xs text-gray-400">poza optimum</div>
            <div className="text-sm font-bold" style={{ color: BRAND.suusNavy }}>{fit.offTargetCount} z {fit.behaviors.length} zachowań</div>
          </div>
        </div>
      </div>

      <H2>Szczegółowe natężenie · średnia z otoczenia</H2>
      <BehaviorBars comp={comp} />

      <H2>Rozkład odpowiedzi respondentów</H2>
      <p className="text-sm text-gray-500 mb-1">Im bardziej rozkład jest skupiony po prawej, tym wyższa zgodność oceny.</p>
      <Histogram dist={DISTRIBUTIONS[comp.id]} color={comp.color} />

      <H2>Interpretacja i kierunek rozwoju</H2>
      <Para>{narr.wprowadzenie}</Para>
      <Para>{narr.znaczenie}</Para>
      <div className="border-l-4 pl-4 py-1 my-3 italic text-[15px] text-gray-600" style={{ borderColor: comp.color }}>
        {narr.kierunek}
      </div>

      <H2>Sześć kierunków rozwoju w tej kompetencji</H2>
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-5 mt-2">
        {narr.punkty.map(([tytul, opis], i) => (
          <div key={i}>
            <div className="flex items-start gap-2 mb-1">
              <span className="text-sm font-black shrink-0" style={{ color: comp.color }}>#{i + 1}</span>
              <span className="text-sm font-bold text-gray-800">{tytul}</span>
            </div>
            <p className="text-[13px] leading-relaxed text-gray-600 text-justify">{opis}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-7">
        <div className="rounded-xl p-4" style={{ background: BRAND.suusGreen + '0e' }}>
          <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: BRAND.suusGreen }}>Rekomendowane działania</div>
          <ul className="space-y-1.5">
            {narr.dzialania.map((d, i) => (
              <li key={i} className="text-[13px] text-gray-700 flex gap-2"><span style={{ color: BRAND.suusGreen }}>•</span><span>{d}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl p-4" style={{ background: BRAND.secondary + '0e' }}>
          <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: BRAND.secondary }}>Wskaźniki postępu</div>
          <ul className="space-y-1.5">
            {narr.wskazniki.map((w, i) => (
              <li key={i} className="text-[13px] text-gray-700 flex gap-2"><span style={{ color: BRAND.secondary }}>•</span><span>{w}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <H2>Głosy zespołu · co mówią respondenci</H2>
      <blockquote className="border-l-4 pl-4 py-2 italic text-gray-700" style={{ borderColor: comp.color }}>
        „{voice.text}”
        <footer className="text-sm text-gray-400 not-italic mt-1">— {voice.author}</footer>
      </blockquote>
    </Section>
  );
}

/* ---------- główny widok ---------- */

export default function ReportView({ result, fitness, model, surveyDate, onReset, onSupervisor, onHR }: Props) {
  const { competencies, persona } = result;
  const fitById = Object.fromEntries(fitness.competencies.map((f) => [f.id, f]));
  const byOthers = [...competencies].sort((a, b) => b.avgOthers - a.avgOthers);
  const top3 = byOthers.slice(0, 3);
  const bottom3 = [...competencies].sort((a, b) => b.gap - a.gap).slice(0, 3);
  const counts = fitness.respondentCounts;
  const roleBreakdown = model.roles.map((r) => ({ label: r.label, count: counts[r.key] ?? 0 }));
  const zones = buildZoneMap(model.scale.zones);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="no-print sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-5 py-3 flex items-center justify-between">
          <button onClick={onReset} className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1">← Mapa raportu</button>
          <div className="flex items-center gap-2">
            <button onClick={onSupervisor} className="text-sm font-medium px-3 py-2 rounded-lg border hover:bg-gray-50 hidden md:block" style={{ borderColor: BRAND.secondary + '55', color: BRAND.secondary }}>
              Dla przełożonego
            </button>
            <button onClick={onHR} className="text-sm font-medium px-3 py-2 rounded-lg border hover:bg-gray-50 hidden md:block" style={{ borderColor: BRAND.primary + '55', color: BRAND.primary }}>
              Raport zbiorczy HR
            </button>
            <button onClick={() => window.print()} className="text-sm font-semibold text-white px-4 py-2 rounded-lg shadow-sm hover:opacity-90" style={{ background: BRAND.primary }}>
              Pobierz PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">

        {/* 1 · COVER / BRIEFING WYKONAWCZY */}
        <Section className="overflow-hidden !p-0">
          <div className="p-8 md:p-10 text-white" style={{ background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.secondary} 55%, ${BRAND.suusNavy} 100%)` }}>
            <div className="flex justify-between items-start">
              <div>
                <div className="text-white/70 text-sm tracking-wide">Brain Stream · SUUS Logistics</div>
                <div className="text-white/90 text-lg font-light mt-1">Raport rozwojowy 360°</div>
              </div>
              <span className="text-xs font-bold bg-white/15 px-3 py-1 rounded-full">DEMO</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mt-6">{persona.name}</h1>
            <div className="text-white/90 text-lg mt-1">{persona.position}</div>
            <div className="text-white/70">{persona.location}</div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-5 text-sm text-white/80">
              <span>Badanie: {surveyDate}</span>
              <span>Respondenci: {fitness.totalRespondents} osób</span>
              <span>Kompetencje: {model.competencies.length}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {roleBreakdown.map((r) => (
                <span key={r.label} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/85">
                  {r.label}: <b>{r.count}</b>
                </span>
              ))}
            </div>
          </div>
          <div className="p-7 md:p-9">
            <Eyebrow>Briefing wykonawczy · 2 minuty czytania</Eyebrow>
            <Para>
              Jeśli masz tylko 2 minuty na ten raport, przeczytaj tę stronę. Znajdziesz tu pięć wyników, trzy mocne strony,
              trzy obszary do rozwoju i kluczowy wniosek całego badania.
            </Para>
            <div className="grid md:grid-cols-2 gap-5 mt-4">
              <div className="rounded-xl p-5" style={{ background: BRAND.suusGreen + '0e' }}>
                <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: BRAND.suusGreen }}>Twoje 3 mocne strony</div>
                {top3.map((c, i) => (
                  <div key={c.id} className="flex justify-between items-baseline py-1 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-700"><b>#{i + 1}</b> {COMPETENCIES.find((k) => k.id === c.id)?.nameShort}</span>
                    <span className="text-sm font-bold" style={{ color: BRAND.suusNavy }}>{c.avgOthers.toFixed(2)}/6</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-5" style={{ background: BRAND.orange + '0e' }}>
                <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: BRAND.orange }}>Twoje 3 obszary do rozwoju</div>
                {bottom3.map((c, i) => (
                  <div key={c.id} className="flex justify-between items-baseline py-1 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-700"><b>#{i + 1}</b> {COMPETENCIES.find((k) => k.id === c.id)?.nameShort}</span>
                    <span className="text-sm font-bold" style={{ color: BRAND.orange }}>luka +{c.gap.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 rounded-xl p-5 border-l-4" style={{ borderColor: BRAND.suusNavy, background: '#f4f8fc' }}>
              <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: BRAND.suusNavy }}>Kluczowy wniosek całego raportu</div>
              <p className="text-[15px] leading-relaxed text-gray-700">{KLUCZOWY_WNIOSEK}</p>
            </div>
          </div>
        </Section>

        {/* 2 · LEGENDA */}
        <Section>
          <H1>Legenda raportu</H1>
          <Para>Ten raport ma jeden spójny język wizualny. Poniższa legenda pokazuje, co znaczą poszczególne kolory i bloki.</Para>
          <div className="space-y-2 mt-3">
            {LEGENDA_KOLORY.map(([hex, label, desc]) => (
              <div key={label} className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-md shrink-0 mt-0.5" style={{ background: hex }} />
                <div>
                  <div className="text-sm font-bold" style={{ color: BRAND.suusNavy }}>{label}</div>
                  <div className="text-[13px] text-gray-500">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 3 · JAK CZYTAĆ */}
        <Section>
          <H1>Jak czytać ten raport</H1>
          <Para>Raport został zaprojektowany tak, abyś mógł skorzystać z niego niezależnie od tego, czy masz 10, 30, czy 90 minut.</Para>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {SCENARIUSZE.map((s) => (
              <div key={s.czas} className="rounded-xl border border-gray-100 p-4">
                <div className="text-2xl font-black" style={{ color: BRAND.primary }}>{s.czas}</div>
                <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">{s.nazwa}</div>
                <ul className="space-y-1.5">
                  {s.punkty.map((p, i) => (
                    <li key={i} className="text-[13px] text-gray-600 flex gap-1.5"><span style={{ color: BRAND.primary }}>•</span><span>{p}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* 4 · SŁOWNIK + JOHARI */}
        <Section>
          <H1>Słownik kluczowych pojęć</H1>
          <div className="grid md:grid-cols-3 gap-4">
            {SLOWNIK.map((s) => (
              <div key={s.termin} className="rounded-xl p-4" style={{ background: '#f6f7f9' }}>
                <div className="text-sm font-bold mb-1" style={{ color: BRAND.primary }}>{s.termin}</div>
                <div className="text-[13px] leading-relaxed text-gray-600">{s.opis}</div>
              </div>
            ))}
          </div>
          <H2>Okno Johariego · Twoja mapa świadomości</H2>
          <p className="text-sm text-gray-500 mb-3">Cztery ćwiartki świadomości kompetencji w zależności od tego, co Ty wiesz o sobie i co wiedzą inni (Luft i Ingham, 1955).</p>
          <JohariWindow competencies={competencies} />
        </Section>

        {/* 5 · METODOLOGIA */}
        <Section>
          <H1>Metodologia w pigułce</H1>
          <Para>
            Badanie 360° to forma informacji zwrotnej, w której na ten sam zestaw zachowań menedżerskich odpowiada kilka grup
            respondentów: menedżer ocenia siebie, jego przełożony, współpracownicy oraz pracownicy podlegli. Różnice między
            tymi perspektywami są najcenniejszą informacją.
          </Para>
          <div className="grid md:grid-cols-2 gap-6 mt-3">
            <div>
              <H2>Kto wziął udział w badaniu</H2>
              <div className="space-y-1">
                {roleBreakdown.map((r) => (
                  <div key={r.label} className="flex justify-between text-sm border-b border-gray-100 py-1.5">
                    <span className="text-gray-600">{r.label}</span><span className="font-bold" style={{ color: BRAND.suusNavy }}>{r.count}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm py-1.5 font-bold">
                  <span>RAZEM</span><span style={{ color: BRAND.suusNavy }}>{fitness.totalRespondents}</span>
                </div>
              </div>
            </div>
            <div>
              <H2>Skala odpowiedzi 1–6</H2>
              <div className="space-y-1">
                {SKALA.map(([n, d]) => (
                  <div key={n} className="flex gap-2 text-[13px]">
                    <span className="font-bold w-4 shrink-0" style={{ color: BRAND.primary }}>{n}</span>
                    <span className="text-gray-600">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* 6 · WYNIKI W PIGUŁCE */}
        <Section>
          <Eyebrow>Pięć kompetencji menedżerskich · ocena z otoczenia</Eyebrow>
          <H1>Wyniki w pigułce</H1>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b-2" style={{ borderColor: BRAND.suusNavy }}>
                  <th className="py-2 pr-2 font-semibold text-gray-500">Kompetencja</th>
                  {ROLE_ORDER.map((r) => <th key={r} className="py-2 px-1.5 text-center font-semibold" style={{ color: BRAND.suusNavy }}>{ROLE_SHORT[r]}</th>)}
                  <th className="py-2 px-1.5 text-center font-semibold text-gray-500">Śr.</th>
                  <th className="py-2 pl-2 text-center font-semibold text-gray-500">Luka</th>
                </tr>
              </thead>
              <tbody>
                {competencies.map((c, i) => (
                  <tr key={c.id} className="border-b border-gray-100">
                    <td className="py-2.5 pr-2">
                      <div className="flex items-center gap-2">
                        <CompNum n={i + 1} color={c.color} />
                        <span className="text-gray-700">{COMPETENCIES.find((k) => k.id === c.id)?.name}</span>
                      </div>
                    </td>
                    {ROLE_ORDER.map((r) => (
                      <td key={r} className="py-2.5 px-1.5 text-center font-bold" style={{ color: r === 'sam' ? BRAND.primary : BRAND.suusNavy }}>{c.avgByRole[r].toFixed(1)}</td>
                    ))}
                    <td className="py-2.5 px-1.5 text-center font-bold text-gray-400">{c.avgOthers.toFixed(2)}</td>
                    <td className="py-2.5 pl-2 text-center"><GapBadge gap={c.gap} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">Średnia obliczona z ocen przełożonego, współpracowników i podwładnych (bez samooceny). Skala 1–6.</p>
        </Section>

        {/* 7 · ANALITYKA POGŁĘBIONA */}
        <Section>
          <Eyebrow>Cztery spojrzenia: pajęczyna, mapa cieplna, luki, top/bottom</Eyebrow>
          <H1>Analityka pogłębiona</H1>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <H2>Pełny profil · pajęczyna kompetencji</H2>
              <RadarChartComponent competencies={competencies} />
            </div>
            <div>
              <H2>Porównanie perspektyw</H2>
              <GapChart competencies={competencies} />
            </div>
          </div>
          <H2>Mapa cieplna: kompetencje × grupy oceniające</H2>
          <p className="text-sm text-gray-500 mb-3">Im ciemniejsza komórka, tym wyższa ocena. Pokazuje, gdzie zespół jest jednomyślny.</p>
          <Heatmap competencies={competencies} />
          <H2>Luki percepcji · samoocena na tle ocen otoczenia <Hint text="Luka to różnica między tym, jak menedżer ocenia siebie, a jak widzi go otoczenie. Dodatnia znaczy, że widzi siebie wyżej niż zespół." /></H2>
          <GapLines competencies={competencies} />
          <div className="mt-5 rounded-xl p-5 border-l-4" style={{ borderColor: BRAND.suusNavy, background: '#f4f8fc' }}>
            <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: BRAND.suusNavy }}>Co ten wykres pokazuje · wnioski z badania</div>
            {ANALITYKA_LUKI.map((p, i) => <p key={i} className="text-[14px] leading-relaxed text-gray-700 mb-2 last:mb-0">{p}</p>)}
          </div>
          <div className="mt-4 rounded-xl p-5" style={{ background: BRAND.orange + '0e' }}>
            <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: BRAND.orange }}>Pytanie do samodzielnej refleksji</div>
            <p className="text-[14px] leading-relaxed text-gray-700">{REFLEKSJA_LUKI}</p>
          </div>
          <H2>Pięć najmocniejszych i pięć rozwojowych zachowań</H2>
          <TopBottomBehaviors competencies={competencies} />
        </Section>

        {/* 7b · PUNKTY PRZEGIĘCIA · MATRYCA TRAFNOŚCI */}
        <Section>
          <Eyebrow color={BRAND.green}>To, co wyróżnia ten raport</Eyebrow>
          <H1>Punkty przegięcia · matryca trafności</H1>
          <Para>
            To nie jest skala, w której więcej zawsze znaczy lepiej. Każde zachowanie ma poziom optymalny.
            Można go robić za mało (trzeba wzmocnić), w sam raz (utrzymać), albo za dużo (warto odpuścić).
            Dopiero trafienie w ten poziom to adekwatność.
          </Para>
          <div className="grid md:grid-cols-3 gap-3 my-4">
            <div className="rounded-xl p-4" style={{ background: '#cfe8b8' }}>
              <div className="text-sm font-bold" style={{ color: '#3d6b1f' }}>Za mało</div>
              <div className="text-[13px] text-gray-700 mt-1">Zachowanie poniżej poziomu, którego potrzebuje rola. Kierunek: wzmocnić.</div>
            </div>
            <div className="rounded-xl p-4" style={{ background: BRAND.green + '22' }}>
              <div className="text-sm font-bold" style={{ color: '#0a8f5b' }}>W sam raz</div>
              <div className="text-[13px] text-gray-700 mt-1">Zachowanie w paśmie optymalnym. Kierunek: utrzymać i świadomie wykorzystywać.</div>
            </div>
            <div className="rounded-xl p-4" style={{ background: '#ffcc80' }}>
              <div className="text-sm font-bold" style={{ color: '#b5560a' }}>Za dużo</div>
              <div className="text-[13px] text-gray-700 mt-1">Zachowanie w nadmiarze. Tu szkodzi, więc kierunek to odpuścić i wyważyć.</div>
            </div>
          </div>

          <H2>Mapa trafności wszystkich zachowań</H2>
          <p className="text-sm text-gray-500 mb-3">Każda komórka to jedno zachowanie. Kolor mówi, czy jest w optimum, czy przegięte w którąś stronę.</p>
          <FitnessMatrix competencies={fitness.competencies} zones={zones} />

          <H2>Profil trafności per kompetencja</H2>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-5 mt-2">
            {fitness.competencies.map((cf) => (
              <div key={cf.id} className="flex items-center gap-3">
                <div className="w-36 shrink-0"><GaussCurve comp={cf} height={110} zones={zones} /></div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold mb-1" style={{ color: BRAND.suusNavy }}>{cf.nameShort}</div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-black" style={{ color: cf.color }}>{cf.fitnessPct}%</span>
                    <StateBadge state={cf.state} small zones={zones} />
                  </div>
                  <div className="text-xs text-gray-400">dopasowanie · {cf.offTargetCount} z {cf.behaviors.length} poza pasmem</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl p-5 border-l-4 flex items-center gap-4" style={{ borderColor: BRAND.green, background: BRAND.green + '0e' }}>
            <FitnessRing pct={fitness.globalFitnessPct} color={BRAND.green} />
            <div>
              <div className="text-sm font-bold uppercase tracking-wide" style={{ color: '#0a8f5b' }}>Trafność całościowa</div>
              <p className="text-[14px] text-gray-700 mt-1">
                Średnie dopasowanie profilu do poziomów optymalnych wynosi {fitness.globalFitnessPct}%.
                Im bliżej 100%, tym bardziej zachowania menedżera trafiają w poziom adekwatny do roli.
              </p>
            </div>
          </div>
        </Section>

        {/* 8 · ANALIZA GLOBALNA */}
        <Section>
          <Eyebrow color={BRAND.primary}>Profil całościowy · synteza pięciu kompetencji</Eyebrow>
          <H1>Analiza globalna</H1>
          {GLOBAL_ANALYSIS.wprowadzenie.map((p, i) => <Para key={i}>{p}</Para>)}
          <H2>Główne wnioski z perspektywy całościowej</H2>
          {GLOBAL_ANALYSIS.wnioski_glowne.map((p, i) => <Para key={i}>{p}</Para>)}

          <H2>Mocne strony ujawniające się w obrazie globalnym</H2>
          <div className="grid md:grid-cols-2 gap-4">
            {GLOBAL_ANALYSIS.mocne_strony.map(([t, d]) => (
              <div key={t} className="rounded-xl p-4 border-l-4" style={{ borderColor: BRAND.suusGreen, background: BRAND.suusGreen + '0a' }}>
                <div className="text-sm font-bold mb-1" style={{ color: BRAND.suusNavy }}>{t}</div>
                <div className="text-[13px] leading-relaxed text-gray-600">{d}</div>
              </div>
            ))}
          </div>

          <H2>Kluczowe obszary do rozwoju</H2>
          <div className="grid md:grid-cols-2 gap-4">
            {GLOBAL_ANALYSIS.obszary_rozwoju.map(([t, d]) => (
              <div key={t} className="rounded-xl p-4 border-l-4" style={{ borderColor: BRAND.orange, background: BRAND.orange + '0a' }}>
                <div className="text-sm font-bold mb-1" style={{ color: BRAND.suusNavy }}>{t}</div>
                <div className="text-[13px] leading-relaxed text-gray-600">{d}</div>
              </div>
            ))}
          </div>

          <H2>Synteza profilu kompetencyjnego</H2>
          {GLOBAL_ANALYSIS.synteza.map((p, i) => <Para key={i}>{p}</Para>)}

          <H2>Rekomendacje końcowe · kierunki dalszej pracy</H2>
          <div className="space-y-3">
            {GLOBAL_ANALYSIS.kierunki_koncowe.map(([t, d]) => (
              <div key={t}>
                <div className="text-sm font-bold" style={{ color: BRAND.primary }}>{t}</div>
                <p className="text-[14px] leading-relaxed text-gray-600">{d}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 9-13 · PIĘĆ KOMPETENCJI */}
        {competencies.map((c, i) => <CompetencySection key={c.id} comp={c} fit={fitById[c.id]} idx={i} zones={zones} />)}

        {/* 14 · PYTANIA OTWARTE */}
        <Section>
          <H1>Pytania otwarte</H1>
          <H2>Za co najbardziej cenisz opisywaną osobę?</H2>
          <div className="space-y-2">
            {PYTANIA_OTWARTE.za_co.map(([autor, cytat], i) => (
              <blockquote key={i} className="border-l-3 pl-3 py-1 text-[14px] text-gray-700" style={{ borderLeft: `3px solid ${BRAND.suusGreen}` }}>
                „{cytat}” <span className="text-gray-400 text-sm">— {autor}</span>
              </blockquote>
            ))}
          </div>
          <H2>Co warto rozwijać lub zmienić w sposobie pracy tej osoby?</H2>
          <div className="space-y-2">
            {PYTANIA_OTWARTE.do_rozwoju.map(([autor, cytat], i) => (
              <blockquote key={i} className="border-l-3 pl-3 py-1 text-[14px] text-gray-700" style={{ borderLeft: `3px solid ${BRAND.orange}` }}>
                „{cytat}” <span className="text-gray-400 text-sm">— {autor}</span>
              </blockquote>
            ))}
          </div>
        </Section>

        {/* 15 · PLAN DZIAŁAŃ */}
        <Section>
          <Eyebrow color={BRAND.primary}>Rozdział końcowy</Eyebrow>
          <H1>Plan działań na najbliższe 90 dni</H1>
          <Para>Trzy priorytety w trzech horyzontach czasowych. Zasada jest jedna: skupiamy się na trzech rzeczach i się ich trzymamy.</Para>

          <H2>Trzy obszary do utrzymania i wzmacniania</H2>
          <div className="grid md:grid-cols-3 gap-4">
            {PLAN_DZIALAN.utrzymac.map(([t, d], i) => (
              <div key={i} className="rounded-xl p-4" style={{ background: BRAND.suusGreen + '0e' }}>
                <div className="text-xs font-bold mb-1" style={{ color: BRAND.suusGreen }}>#{i + 1}</div>
                <div className="text-sm font-bold mb-1" style={{ color: BRAND.suusNavy }}>{t}</div>
                <div className="text-[13px] text-gray-600">{d}</div>
              </div>
            ))}
          </div>

          <H2>Trzy obszary wymagające zmiany</H2>
          <div className="grid md:grid-cols-3 gap-4">
            {PLAN_DZIALAN.zmienic.map(([t, d], i) => (
              <div key={i} className="rounded-xl p-4" style={{ background: BRAND.orange + '0e' }}>
                <div className="text-xs font-bold mb-1" style={{ color: BRAND.orange }}>#{i + 1}</div>
                <div className="text-sm font-bold mb-1" style={{ color: BRAND.suusNavy }}>{t}</div>
                <div className="text-[13px] text-gray-600">{d}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 mt-6">
            {PLAN_DZIALAN.priorytety.map((p, i) => (
              <div key={i} className="rounded-xl border border-gray-100 p-5">
                <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: i === 0 ? BRAND.orange : i === 1 ? BRAND.secondary : BRAND.primary }}>{p.naglowek}</div>
                <div className="text-base font-black mb-2" style={{ color: BRAND.suusNavy }}>{p.tytul}</div>
                {p.tresc.map((t, j) => <p key={j} className="text-[14px] leading-relaxed text-gray-700 mb-1.5">{t}</p>)}
              </div>
            ))}
          </div>

          <H2>Co dalej? Wybierz swoją ścieżkę wdrożenia</H2>
          <div className="grid md:grid-cols-3 gap-4">
            {PLAN_DZIALAN.sciezki.map((s) => (
              <div key={s.nr} className="rounded-xl border border-gray-100 p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-gray-400">{s.nr}</div>
                <div className="text-sm font-black mb-2" style={{ color: BRAND.primary }}>{s.tytul}</div>
                <ul className="space-y-1.5">
                  {s.kroki.map((k, i) => <li key={i} className="text-[13px] text-gray-600 flex gap-1.5"><span style={{ color: BRAND.primary }}>•</span><span>{k}</span></li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* plan do wypełnienia */}
          <H2>Twój plan rozwoju · do wypełnienia</H2>
          <p className="text-sm text-gray-500 mb-3">{PLAN_TEMPLATE.intro}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  {PLAN_TEMPLATE.columns.map((c, i) => (
                    <th key={i} className="text-left text-xs font-bold uppercase tracking-wide text-gray-500 border-b-2 pb-2 pr-3" style={{ borderColor: BRAND.suusNavy }}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: PLAN_TEMPLATE.rows }).map((_, r) => (
                  <tr key={r}>
                    {PLAN_TEMPLATE.columns.map((_, c) => (
                      <td key={c} className="border-b border-gray-200 h-12 pr-3">
                        {c === 0 && <span className="text-gray-300 font-bold">{r + 1}</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* kalendarz 90 dni */}
          <H2>Kalendarz 90 dni · do wycięcia</H2>
          <p className="text-sm text-gray-500 mb-3">{KALENDARZ_90.intro}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {KALENDARZ_90.phases.map((ph, pi) => (
              <div key={pi} className="rounded-xl border border-gray-100 p-4">
                <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: [BRAND.suusGreen, BRAND.secondary, BRAND.orange, BRAND.primary][pi] }}>{ph.name}</div>
                <div className="space-y-2">
                  {ph.weeks.map(([w, a], wi) => (
                    <div key={wi} className="flex gap-3 items-start">
                      <span className="text-[11px] font-mono font-bold text-gray-400 w-16 shrink-0 pt-0.5">{w}</span>
                      <span className="text-[13px] text-gray-700">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 16 · MANIFEST */}
        <Section className="!p-0 overflow-hidden">
          <div className="p-9 md:p-12 text-white" style={{ background: `linear-gradient(135deg, ${BRAND.suusNavy} 0%, ${BRAND.primary} 100%)` }}>
            <div className="text-2xl md:text-3xl font-black mb-4">{MANIFEST.naglowek}</div>
            <p className="text-white/85 text-[15px] leading-relaxed max-w-2xl">{MANIFEST.tresc}</p>
            <div className="text-white/50 text-xs mt-8">{MANIFEST.podpis}</div>
          </div>
        </Section>

        <div className="no-print text-center py-4">
          <button onClick={() => window.print()} className="text-sm font-semibold text-white px-6 py-3 rounded-xl shadow hover:opacity-90" style={{ background: BRAND.primary }}>
            Pobierz raport jako PDF
          </button>
        </div>
      </div>
    </div>
  );
}
