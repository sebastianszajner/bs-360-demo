// Komponenty wizualne raportu 360° — SVG, 1:1 z wykresami PDF.
import { COMPETENCIES, ROLES, ROLE_SHORT, BRAND, type RoleKey } from '../../data/model';
import type { CompetencyScore } from '../../engine/scorer';

const ROLE_ORDER: RoleKey[] = ['sam', 'prz', 'wsp', 'pod'];

/** Donut z wynikiem jako procent maksymalnej skali (np. 78%). */
export function DonutScore({ value, max = 6, color, label }: { value: number; max?: number; color: string; label?: string }) {
  const pct = value / max;
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 140 140" className="w-32 h-32">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#eee" strokeWidth="14" />
        <circle
          cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="14" strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`} transform="rotate(-90 70 70)"
        />
        <text x="70" y="64" textAnchor="middle" fontSize="26" fontWeight="800" fill={BRAND.suusNavy}>
          {value.toFixed(2)}
        </text>
        <text x="70" y="84" textAnchor="middle" fontSize="12" fill={BRAND.grayMid}>
          {Math.round(pct * 100)}% / 6
        </text>
      </svg>
      {label && <div className="text-xs font-semibold mt-1" style={{ color }}>{label}</div>}
    </div>
  );
}

/** Poziome paski zachowań — średnia ocena otoczenia per zachowanie. */
export function BehaviorBars({ comp }: { comp: CompetencyScore }) {
  return (
    <div className="space-y-2.5">
      {comp.behaviorScores.map((b) => (
        <div key={b.id} className="flex items-center gap-3">
          <div className="flex-1 text-sm text-gray-700">{b.text}</div>
          <div className="w-40 h-2.5 rounded-full bg-gray-100 overflow-hidden shrink-0">
            <div className="h-full rounded-full" style={{ width: `${(b.avg / 6) * 100}%`, background: comp.color }} />
          </div>
          <div className="w-9 text-right text-sm font-bold shrink-0" style={{ color: BRAND.suusNavy }}>
            {b.avg.toFixed(1)}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Histogram rozkładu odpowiedzi 11 respondentów (oceny 1-6). */
export function Histogram({ dist, color }: { dist: Record<number, number>; color: string }) {
  const vals = [1, 2, 3, 4, 5, 6];
  const maxCount = Math.max(...vals.map((v) => dist[v] ?? 0), 1);
  return (
    <div className="flex items-end justify-between gap-2 h-40 pt-2">
      {vals.map((v) => {
        const count = dist[v] ?? 0;
        const h = (count / maxCount) * 100;
        return (
          <div key={v} className="flex-1 flex flex-col items-center justify-end h-full">
            <div className="text-xs font-bold mb-1" style={{ color: BRAND.suusNavy }}>{count}</div>
            <div
              className="w-full rounded-t-md transition-all"
              style={{ height: `${h}%`, minHeight: count > 0 ? 4 : 0, background: v <= 2 ? BRAND.orange : v >= 5 ? color : '#c9c9c9' }}
            />
            <div className="text-xs text-gray-500 mt-1.5 font-medium">{v}</div>
          </div>
        );
      })}
    </div>
  );
}

/** Mapa cieplna: kompetencje × grupy oceniające. */
export function Heatmap({ competencies }: { competencies: CompetencyScore[] }) {
  const cellColor = (v: number) => {
    // skala 3.0-5.5 → jasny → granat
    const t = Math.max(0, Math.min(1, (v - 3) / 2.5));
    const r = Math.round(232 - t * (232 - 0));
    const g = Math.round(238 - t * (238 - 63));
    const b = Math.round(246 - t * (246 - 138));
    return `rgb(${r},${g},${b})`;
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate" style={{ borderSpacing: 3 }}>
        <thead>
          <tr>
            <th className="text-left text-xs text-gray-400 font-medium pb-1"></th>
            {ROLE_ORDER.map((r) => (
              <th key={r} className="text-xs text-gray-500 font-semibold pb-1 px-1">{ROLE_SHORT[r]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {competencies.map((c) => (
            <tr key={c.id}>
              <td className="text-xs text-gray-600 pr-2 whitespace-nowrap font-medium">{c.id} · {COMPETENCIES.find((k) => k.id === c.id)?.nameShort}</td>
              {ROLE_ORDER.map((r) => {
                const v = c.avgByRole[r];
                const light = v >= 4.3;
                return (
                  <td
                    key={r}
                    className="text-center text-sm font-bold rounded"
                    style={{ background: cellColor(v), color: light ? '#fff' : BRAND.suusNavy, height: 38, minWidth: 56 }}
                  >
                    {v.toFixed(1)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Wizualizacja luk percepcji — każda kompetencja jako linia z dwoma punktami. */
export function GapLines({ competencies }: { competencies: CompetencyScore[] }) {
  const min = 3, max = 6;
  const xPos = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div className="space-y-4">
      {competencies.map((c) => {
        const gap = c.gap;
        const gapColor = gap > 0.4 ? BRAND.orange : gap < -0.2 ? BRAND.green : '#999';
        const nameShort = COMPETENCIES.find((k) => k.id === c.id)?.nameShort;
        return (
          <div key={c.id}>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-sm font-medium text-gray-700">{c.id} · {nameShort}</span>
              <span className="text-xs font-bold" style={{ color: gapColor }}>
                {gap > 0 ? '+' : ''}{gap.toFixed(2)}
              </span>
            </div>
            <div className="relative h-6">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200" />
              {/* średnia otoczenia — granat */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white shadow"
                style={{ left: `${xPos(c.avgOthers)}%`, background: BRAND.suusNavy }}
                title={`Otoczenie ${c.avgOthers.toFixed(2)}`}
              />
              {/* samoocena — kolor luki */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-2 border-white shadow"
                style={{ left: `${xPos(c.avgByRole.sam)}%`, background: gapColor }}
                title={`Samoocena ${c.avgByRole.sam.toFixed(2)}`}
              />
            </div>
          </div>
        );
      })}
      <div className="flex gap-5 text-xs text-gray-500 pt-1">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: BRAND.suusNavy }} /> Średnia z otoczenia</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rotate-45 inline-block" style={{ background: BRAND.orange }} /> Samoocena</span>
      </div>
    </div>
  );
}

/** Top/bottom zachowań w całym raporcie. */
export function TopBottomBehaviors({ competencies }: { competencies: CompetencyScore[] }) {
  const all = competencies.flatMap((c) =>
    c.behaviorScores.map((b) => ({ ...b, compId: c.id, color: c.color }))
  );
  const sorted = [...all].sort((a, b) => b.avg - a.avg);
  const top = sorted.slice(0, 5);
  const bottom = sorted.slice(-5).reverse();

  const Row = ({ b }: { b: { text: string; avg: number; compId: string; color: string } }) => (
    <div className="flex items-center gap-3 py-1.5">
      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white shrink-0" style={{ background: b.color }}>{b.compId}</span>
      <span className="flex-1 text-sm text-gray-700">{b.text}</span>
      <span className="text-sm font-bold shrink-0" style={{ color: BRAND.suusNavy }}>{b.avg.toFixed(1)}</span>
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: BRAND.suusGreen }}>
          Pięć najmocniejszych zachowań
        </div>
        <div className="divide-y divide-gray-100">{top.map((b) => <Row key={b.id} b={b} />)}</div>
      </div>
      <div>
        <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: BRAND.orange }}>
          Pięć obszarów do rozwoju
        </div>
        <div className="divide-y divide-gray-100">{bottom.map((b) => <Row key={b.id} b={b} />)}</div>
      </div>
    </div>
  );
}

/** Okno Johariego — 4 ćwiartki świadomości kompetencji. */
export function JohariWindow({ competencies }: { competencies: CompetencyScore[] }) {
  // ARENA: wysokie i samo i otoczenie; FASADA: samo wysoko, otoczenie nisko (ukryty);
  // ŚLEPA PLAMKA: otoczenie wyżej niż samo; NIEZNANE: oba nisko.
  const arena: string[] = [], fasada: string[] = [], slepa: string[] = [], nieznane: string[] = [];
  competencies.forEach((c) => {
    const nameShort = COMPETENCIES.find((k) => k.id === c.id)?.nameShort ?? c.id;
    const tag = `${c.id} · ${nameShort}`;
    if (c.gap < -0.1) slepa.push(tag);
    else if (c.avgOthers >= 4.5) arena.push(tag);
    else if (c.gap > 0.5) fasada.push(tag);
    else nieznane.push(tag);
  });
  const Quad = ({ title, sub, items, accent }: { title: string; sub: string; items: string[]; accent: string }) => (
    <div className="p-4 rounded-xl border" style={{ borderColor: accent + '40', background: accent + '08' }}>
      <div className="text-xs font-bold uppercase tracking-wide" style={{ color: accent }}>{title}</div>
      <div className="text-[11px] text-gray-500 mb-2">{sub}</div>
      <div className="space-y-1">
        {items.length ? items.map((i) => <div key={i} className="text-sm text-gray-700">{i}</div>) : <div className="text-sm text-gray-300">—</div>}
      </div>
    </div>
  );
  return (
    <div className="grid grid-cols-2 gap-3">
      <Quad title="ARENA" sub="Ty wiesz · inni wiedzą" items={arena} accent={BRAND.suusGreen} />
      <Quad title="ŚLEPA PLAMKA" sub="Ty nie wiesz · inni wiedzą" items={slepa} accent={BRAND.secondary} />
      <Quad title="FASADA" sub="Ty wiesz · inni nie widzą" items={fasada} accent={BRAND.orange} />
      <Quad title="POTENCJAŁ" sub="obszar dalszego odkrywania" items={nieznane} accent={BRAND.grayMid} />
    </div>
  );
}

/** Pasek perspektyw — 4 grupy jako etykietowane wartości. */
export function RoleScoreRow({ comp }: { comp: CompetencyScore }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {ROLE_ORDER.map((r) => (
        <div key={r} className="text-center rounded-lg py-2" style={{ background: '#f6f7f9' }}>
          <div className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">{ROLES[r]}</div>
          <div className="text-lg font-bold" style={{ color: BRAND.suusNavy }}>{comp.avgByRole[r].toFixed(1)}</div>
        </div>
      ))}
    </div>
  );
}
