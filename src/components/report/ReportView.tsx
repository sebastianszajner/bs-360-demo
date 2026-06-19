import { useRef } from 'react';
import type { ScoringResult } from '../../engine/scorer';
import { ROLE_COLORS, ROLES, type RoleKey } from '../../data/model';
import { generateRecs, generateGlobalAnalysis } from '../../data/recommendations';
import RadarChartComponent from './RadarChart';
import GapChart from './GapChart';

interface Props {
  result: ScoringResult;
  onReset: () => void;
}

function ScoreBadge({ value, role }: { value: number; role: RoleKey }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
      style={{ background: ROLE_COLORS[role] + '18', color: ROLE_COLORS[role] }}
    >
      <span
        className="inline-block w-2 h-2 rounded-full"
        style={{ background: ROLE_COLORS[role] }}
      />
      {ROLES[role]}: {value.toFixed(1)}
    </span>
  );
}

function GapIndicator({ gap }: { gap: number }) {
  const abs = Math.abs(gap);
  const color = abs > 0.7 ? '#ef4444' : abs > 0.4 ? '#f59e0b' : '#10b981';
  const label =
    abs > 0.7
      ? 'Duża luka — priorytet'
      : abs > 0.4
      ? 'Umiarkowana luka'
      : 'Mała luka — dobry wgląd';

  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
      style={{ background: color + '15', color }}
    >
      {gap > 0 ? '+' : ''}{gap.toFixed(2)} {label}
    </span>
  );
}

export default function ReportView({ result, onReset }: Props) {
  const reportRef = useRef<HTMLDivElement>(null);

  const globalAnalysis = generateGlobalAnalysis(
    Object.fromEntries(
      result.competencies.map((c) => [
        c.id,
        c.avgByRole as Record<string, number>,
      ])
    )
  );

  function handlePrint() {
    window.print();
  }

  const roles: RoleKey[] = ['sam', 'prz', 'wsp', 'pod'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top action bar */}
      <div className="no-print sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <button
          onClick={onReset}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          ← Nowe badanie
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 bg-amber-50 text-amber-600 px-2 py-1 rounded font-medium">
            DEMO — Przykładowy raport
          </span>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-md hover:opacity-90 transition"
            style={{ background: '#7a00df' }}
          >
            Pobierz PDF
          </button>
        </div>
      </div>

      <div ref={reportRef} className="report-container max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Cover */}
        <div
          className="rounded-2xl p-8 text-white report-section"
          style={{ background: 'linear-gradient(135deg, #7a00df 0%, #0693e3 100%)' }}
        >
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-purple-200 text-xs uppercase tracking-widest mb-1">Brain Stream</p>
              <p className="text-white/80 text-sm">Raport 360 stopni</p>
            </div>
            <div
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(255,255,255,0.2)' }}
            >
              DEMO
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">{result.persona.name}</h1>
          <p className="text-purple-100 text-lg mb-1">{result.persona.position}</p>
          <p className="text-purple-200 text-sm">{result.persona.location}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-purple-100">
            <span>Badanie: {result.persona.tenure}</span>
            <span>Respondenci: {Object.values(result.respondentCount).reduce((a, b) => a + b, 0)} osób</span>
            <span>Kompetencje: 5</span>
          </div>
        </div>

        {/* Wyniki w pigułce */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 report-section">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Wyniki w pigułce</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left pb-3 text-gray-500 font-medium">Kompetencja</th>
                  {roles.map((r) => (
                    <th key={r} className="text-center pb-3 font-medium" style={{ color: ROLE_COLORS[r] }}>
                      {ROLES[r]}
                    </th>
                  ))}
                  <th className="text-center pb-3 text-gray-500 font-medium">Luka</th>
                </tr>
              </thead>
              <tbody>
                {result.competencies.map((c) => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-700">
                      <span
                        className="inline-block w-6 h-6 rounded text-white text-xs font-bold text-center leading-6 mr-2"
                        style={{ background: '#7a00df' }}
                      >
                        {c.id.replace('K', '')}
                      </span>
                      {c.name}
                    </td>
                    {roles.map((r) => (
                      <td key={r} className="text-center py-3">
                        <span
                          className="inline-block w-10 h-7 rounded text-xs font-bold text-center leading-7"
                          style={{
                            background: ROLE_COLORS[r] + '18',
                            color: ROLE_COLORS[r],
                          }}
                        >
                          {c.avgByRole[r].toFixed(1)}
                        </span>
                      </td>
                    ))}
                    <td className="text-center py-3">
                      <GapIndicator gap={c.gap} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">Skala 1-6 (trafność zachowania) · Luka = samoocena minus średnia innych</p>
        </div>

        {/* Wykresy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 report-section">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-700 mb-4">Profil kompetencji (radar)</h3>
            <RadarChartComponent competencies={result.competencies} />
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-700 mb-4">Porównanie perspektyw</h3>
            <GapChart competencies={result.competencies} />
          </div>
        </div>

        {/* Analiza globalna AI */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 report-section">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="px-2 py-0.5 rounded text-xs font-bold"
              style={{ background: '#7a00df18', color: '#7a00df' }}
            >
              Analiza AI
            </div>
            <h2 className="text-lg font-bold text-gray-800">Profil rozwojowy — analiza globalna</h2>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">{globalAnalysis.summary}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl p-4" style={{ background: '#00d08410' }}>
              <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#00d084' }}>
                Mocne strony (top kompetencje)
              </p>
              {globalAnalysis.strengths.map((s, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <p className="font-semibold text-gray-800 text-sm">{s.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4" style={{ background: '#ff690010' }}>
              <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#ff6900' }}>
                Priorytety rozwojowe
              </p>
              {globalAnalysis.developments.map((d, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <p className="font-semibold text-gray-800 text-sm">{d.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-4 border border-amber-100" style={{ background: '#fefce8' }}>
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">
              Kluczowy wniosek z badania
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{globalAnalysis.keyInsight}</p>
          </div>
        </div>

        {/* Rekomendacje per kompetencja */}
        {result.competencies.map((comp) => {
          const rec = generateRecs(
            comp.id,
            comp.avgByRole.sam,
            comp.avgOthers,
            'pod'
          );

          return (
            <div
              key={comp.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 report-section print-break"
            >
              {/* Nagłówek kompetencji */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-8 h-8 rounded-lg text-white text-sm font-bold flex items-center justify-center"
                      style={{ background: '#7a00df' }}
                    >
                      {comp.id.replace('K', '')}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800">{comp.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {roles.map((r) => (
                      comp.avgByRole[r] > 0 && (
                        <ScoreBadge key={r} value={comp.avgByRole[r]} role={r} />
                      )
                    ))}
                    <GapIndicator gap={comp.gap} />
                  </div>
                </div>
              </div>

              {/* Scores per behavior */}
              <div className="mb-5">
                {comp.behaviorScores.map((b) => (
                  <div key={b.id} className="flex items-center gap-3 py-1.5 border-b border-gray-50 last:border-0">
                    <div className="flex-1 text-xs text-gray-600">{b.text}</div>
                    <div className="flex items-center gap-1 shrink-0">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(b.avg / 6) * 100}%`,
                            background: '#7a00df',
                          }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-700 w-7 text-right">
                        {b.avg.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI interpretacja */}
              <div className="rounded-xl p-4 mb-4" style={{ background: '#7a00df08', border: '1px solid #7a00df20' }}>
                <p className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: '#7a00df' }}>
                  Interpretacja AI
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{rec.intro}</p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2 italic">{rec.direction}</p>
              </div>

              {/* Rekomendacja 1 */}
              <div className="rounded-xl border border-gray-100 p-4 mb-3">
                <p className="font-semibold text-gray-800 text-sm mb-2">
                  Rekomendacja 1: {rec.keyRec.title}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">{rec.keyRec.body}</p>
                <div className="mb-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Działania:</p>
                  <ul className="space-y-1">
                    {rec.keyRec.actions.map((a, i) => (
                      <li key={i} className="flex gap-2 text-xs text-gray-600">
                        <span style={{ color: '#7a00df' }} className="font-bold shrink-0">•</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Wskaźniki sukcesu:</p>
                  <ul className="space-y-1">
                    {rec.keyRec.indicators.map((ind, i) => (
                      <li key={i} className="flex gap-2 text-xs text-gray-500">
                        <span style={{ color: '#00d084' }} className="font-bold shrink-0">✓</span>
                        {ind}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Rekomendacja 2 */}
              <div className="rounded-xl border border-gray-100 p-4 mb-3">
                <p className="font-semibold text-gray-800 text-sm mb-2">
                  Rekomendacja 2: {rec.secondRec.title}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">{rec.secondRec.body}</p>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Działania:</p>
                  <ul className="space-y-1">
                    {rec.secondRec.actions.map((a, i) => (
                      <li key={i} className="flex gap-2 text-xs text-gray-600">
                        <span style={{ color: '#7a00df' }} className="font-bold shrink-0">•</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Na co zwrócić uwagę */}
              <div className="rounded-xl p-3" style={{ background: '#f8f9fa' }}>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Pytania do refleksji
                </p>
                <ul className="space-y-1">
                  {rec.watchFor.map((w, i) => (
                    <li key={i} className="text-xs text-gray-500 flex gap-2">
                      <span className="text-gray-400 shrink-0">?</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

        {/* Footer */}
        <div className="text-center py-4 text-xs text-gray-400">
          <p>Raport wygenerowany przez system Brain Stream 360°</p>
          <p className="mt-1">brain-stream.pl · Wersja demonstracyjna</p>
        </div>
      </div>
    </div>
  );
}
