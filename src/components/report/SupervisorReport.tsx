import type { FitnessResult, CompetencyFitness, ZoneMap } from '../../engine/fitness';
import { buildZoneMap } from '../../engine/fitness';
import type { ModelConfig } from '../../data/modelConfig';
import type { PersonaData } from '../../engine/scorer';
import { BRAND } from '../../data/model';
import {
  SUPERVISOR_INTRO, SUPERVISOR_READING, COACHING_QUESTIONS, SUPERVISOR_STRUCTURE, SUPERVISOR_WATCHOUTS,
} from '../../data/supervisorGuide';
import { StateBadge } from './FitnessVisuals';

interface Props {
  fitness: FitnessResult;
  persona: PersonaData;
  model: ModelConfig;
  onBack: () => void;
}

const NAVY = BRAND.suusNavy;

type Situation = 'gap_high' | 'too_low' | 'too_high' | 'ok';

function situationOf(c: CompetencyFitness): Situation {
  if (c.perceptionGap > 0.5) return 'gap_high';
  if (c.state === 'high' || c.state === 'far_high') return 'too_high';
  if (c.state === 'low' || c.state === 'far_low') return 'too_low';
  return 'ok';
}
const SITUATION_LABEL: Record<Situation, string> = {
  gap_high: 'Duża luka percepcji', too_low: 'Zachowanie poniżej normy', too_high: 'Zachowanie przegięte', ok: 'Obszar w równowadze',
};

// priorytet do rozmowy = waga luki + udział zachowań poza pasmem
function priorityScore(c: CompetencyFitness): number {
  return Math.abs(c.perceptionGap) + (c.offTargetCount / Math.max(c.behaviors.length, 1)) * 0.6;
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 md:p-9">{children}</section>;
}
function H1({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-black tracking-tight mb-4" style={{ color: NAVY }}>{children}</h2>;
}

export default function SupervisorReport({ fitness, persona, model, onBack }: Props) {
  const zones: ZoneMap = buildZoneMap(model.scale.zones);
  const priorities = [...fitness.competencies].sort((a, b) => priorityScore(b) - priorityScore(a)).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="no-print sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-5 py-3 flex items-center justify-between">
          <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-800">← Mapa raportu</button>
          <div className="text-xs text-gray-400 hidden sm:block">Przewodnik dla przełożonego · ROZBUDOWANY</div>
          <button onClick={() => window.print()} className="text-sm font-semibold text-white px-4 py-2 rounded-lg shadow-sm hover:opacity-90" style={{ background: BRAND.primary }}>Pobierz PDF</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* COVER */}
        <Section>
          <div className="font-mono text-[11px] tracking-[0.15em] uppercase mb-2" style={{ color: BRAND.secondary }}>Przewodnik dla przełożonego</div>
          <h1 className="text-3xl font-black tracking-tight mb-2" style={{ color: NAVY }}>Rozmowa rozwojowa — {persona.name}</h1>
          <p className="text-gray-500 mb-5">{persona.position} · raport 360 z {fitness.totalRespondents} perspektyw</p>
          {SUPERVISOR_INTRO.map((p, i) => <p key={i} className="text-[15px] leading-relaxed text-gray-700 mb-3">{p}</p>)}
        </Section>

        {/* JAK CZYTAĆ LUKI */}
        <Section>
          <H1>Jak czytać to, co zobaczysz</H1>
          <div className="space-y-3">
            {SUPERVISOR_READING.map(([t, d]) => (
              <div key={t} className="border-l-3 pl-4 py-1" style={{ borderLeft: `3px solid ${BRAND.secondary}` }}>
                <div className="text-sm font-bold text-gray-800">{t}</div>
                <div className="text-[14px] text-gray-600">{d}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* PRIORYTETY DO ROZMOWY */}
        <Section>
          <div className="font-mono text-[11px] tracking-[0.15em] uppercase mb-2" style={{ color: BRAND.orange }}>Na to zwróć uwagę najpierw</div>
          <H1>Trzy obszary do rozmowy</H1>
          <p className="text-gray-500 mb-5 text-[15px]">Wybrane z danych: największe luki percepcji i przegięcia. Do każdego masz gotowe pytania coachingowe. Wybierz na rozmowę najwyżej dwa.</p>
          <div className="space-y-5">
            {priorities.map((c, i) => {
              const sit = situationOf(c);
              const worst = [...c.behaviors].sort((a, b) => a.fitnessPct - b.fitnessPct)[0];
              return (
                <div key={c.id} className="rounded-xl border border-gray-100 p-5" style={{ background: c.color + '06' }}>
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="w-7 h-7 rounded-lg text-white text-sm font-black flex items-center justify-center shrink-0" style={{ background: c.color }}>{i + 1}</span>
                    <span className="font-bold text-lg" style={{ color: NAVY }}>{c.nameShort}</span>
                    <StateBadge state={c.state} small zones={zones} />
                    <span className="text-xs text-gray-400">{SITUATION_LABEL[sit]} · luka {c.perceptionGap > 0 ? '+' : ''}{c.perceptionGap.toFixed(2)}</span>
                  </div>
                  <p className="text-[14px] text-gray-600 mb-3 ml-10">
                    Najsłabiej wypada: <span className="text-gray-800">„{worst.text}"</span>. {worst.interpretation}
                  </p>
                  <div className="ml-10">
                    <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: BRAND.primary }}>Pytania coachingowe</div>
                    <ul className="space-y-2">
                      {COACHING_QUESTIONS[sit].map((q, j) => (
                        <li key={j} className="text-[14px] text-gray-700 flex gap-2">
                          <span style={{ color: c.color }}>—</span><span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* STRUKTURA ROZMOWY */}
        <Section>
          <H1>Struktura rozmowy — 45 minut</H1>
          <p className="text-gray-500 mb-5 text-[15px]">Cztery kroki w modelu prowadzenia rozmowy rozwojowej. Pilnuj czasu i proporcji: więcej słuchasz, niż mówisz.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {SUPERVISOR_STRUCTURE.map(([t, d], i) => (
              <div key={t} className="rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold" style={{ color: BRAND.primary }}>0{i + 1}</span>
                  <span className="text-sm font-bold" style={{ color: NAVY }}>{t}</span>
                </div>
                <p className="text-[14px] text-gray-600">{d}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* NA CO UWAŻAĆ */}
        <Section>
          <H1>Cztery pułapki, których warto uniknąć</H1>
          <ul className="space-y-2.5">
            {SUPERVISOR_WATCHOUTS.map((w, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-gray-700">
                <span className="font-mono text-xs font-bold mt-1 shrink-0" style={{ color: BRAND.orange }}>0{i + 1}</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
