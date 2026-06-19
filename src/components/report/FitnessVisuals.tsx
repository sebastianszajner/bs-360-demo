// Wizualizacje modelu trafności (punkty przegięcia).
// Suwak 5-stopniowy, krzywa Gaussa z pasmem optimum, matryca trafności, badge stanu.
import { BRAND } from '../../data/model';
import { STATE_LABEL, STATE_COLOR, STATE_ACTION, type BehaviorFitness, type CompetencyFitness } from '../../engine/fitness';
import type { FitnessState } from '../../data/modelConfig';

// Badge stanu trafności (za mało / OK / za dużo).
export function StateBadge({ state, small = false }: { state: FitnessState; small?: boolean }) {
  const color = STATE_COLOR[state];
  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full whitespace-nowrap ${small ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-0.5'}`}
      style={{ background: color + '22', color: state === 'far_high' ? '#d32f2f' : state === 'ok' ? '#0a8f5b' : color }}
    >
      {STATE_LABEL[state]}
    </span>
  );
}

// Suwak 5-stopniowy: za mało ↔ OK ↔ za dużo, z markerem pozycji wyniku.
export function FitnessSlider({ beh }: { beh: BehaviorFitness }) {
  const monotonic = beh.type === 'monotonic';
  // segmenty: [za mało x2][OK][za dużo x2]; dla monotonic prawa strona też OK
  const segs = monotonic
    ? ['#e8f3e0', '#cfe8b8', '#00d084', '#7ed9a8', '#bdeccd']
    : ['#eef6e8', '#cfe8b8', '#00d084', '#ffcc80', '#ff7961'];
  const markerColor = STATE_COLOR[beh.state];

  return (
    <div className="w-full">
      <div className="relative h-3 rounded-full overflow-hidden flex">
        {segs.map((c, i) => <div key={i} className="h-full flex-1" style={{ background: c }} />)}
        {/* marker pozycji wyniku otoczenia */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md z-10"
          style={{ left: `${beh.sliderPos}%`, background: markerColor }}
          title={`Otoczenie: ${beh.avgIntensity.toFixed(2)} · target ${beh.target}`}
        />
        {/* znacznik samooceny (mniejszy, romb) */}
        {beh.selfIntensity > 0 && (
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 border border-white z-10"
            style={{ left: `${selfPos(beh)}%`, background: BRAND.primary }}
            title={`Samoocena: ${beh.selfIntensity.toFixed(2)}`}
          />
        )}
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 mt-1">
        <span>{monotonic ? 'za mało' : 'za mało'}</span>
        <span className="font-semibold" style={{ color: BRAND.green }}>OK</span>
        <span>{monotonic ? 'pełne' : 'za dużo'}</span>
      </div>
    </div>
  );
}

function selfPos(beh: BehaviorFitness): number {
  // pozycja samooceny na tej samej skali co marker otoczenia
  const span = beh.target - 1;
  const above = 6 - beh.target;
  if (beh.selfIntensity <= beh.target) return Math.round((span > 0 ? (beh.selfIntensity - 1) / span : 1) * 50);
  return Math.round(50 + (above > 0 ? (beh.selfIntensity - beh.target) / above : 0) * 50);
}

// Wiersz zachowania: tekst + suwak + badge + akcja.
export function BehaviorFitnessRow({ beh }: { beh: BehaviorFitness }) {
  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-sm text-gray-700 flex-1">{beh.text}</span>
        <StateBadge state={beh.state} small />
      </div>
      <FitnessSlider beh={beh} />
      <div className="text-[12px] text-gray-500 mt-1.5 leading-snug">{beh.interpretation}</div>
    </div>
  );
}

// Krzywa Gaussa efektywności: pasmo OK w środku, marker wyniku.
export function GaussCurve({ comp, height = 150 }: { comp: CompetencyFitness; height?: number }) {
  const w = 320, h = height, pad = 18;
  // krzywa dzwonowa
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const x = i / 60;                       // 0..1
    const px = pad + x * (w - 2 * pad);
    const bell = Math.exp(-Math.pow((x - 0.5) * 4.2, 2)); // szczyt w środku
    const py = (h - pad) - bell * (h - 2 * pad);
    pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }
  // marker: średnia trafność kompetencji → odległość od środka.
  // wysoka trafność = blisko środka (szczyt); niska = na zboczu.
  const fit = comp.fitnessPct / 100;
  // kierunek odchyłu: jeśli więcej zachowań "za dużo" → prawo, inaczej lewo
  const tooHigh = comp.behaviors.filter((b) => b.state === 'high' || b.state === 'far_high').length;
  const tooLow = comp.behaviors.filter((b) => b.state === 'low' || b.state === 'far_low').length;
  const dir = tooHigh > tooLow ? 1 : -1;
  const offset = (1 - fit) * 0.42 * dir;
  const mx = 0.5 + offset;
  const markerX = pad + mx * (w - 2 * pad);
  const bellM = Math.exp(-Math.pow((mx - 0.5) * 4.2, 2));
  const markerY = (h - pad) - bellM * (h - 2 * pad);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: height }}>
      {/* pasmo OK */}
      <rect x={pad + 0.4 * (w - 2 * pad)} y={pad} width={0.2 * (w - 2 * pad)} height={h - 2 * pad} fill={BRAND.green} opacity={0.1} />
      {/* oś */}
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#e5e7eb" />
      {/* krzywa */}
      <polyline points={pts.join(' ')} fill="none" stroke="#cbd5e1" strokeWidth={2} />
      {/* marker */}
      <line x1={markerX} y1={markerY} x2={markerX} y2={h - pad} stroke={STATE_COLOR[comp.state]} strokeWidth={2} strokeDasharray="3 2" />
      <circle cx={markerX} cy={markerY} r={6} fill={STATE_COLOR[comp.state]} stroke="#fff" strokeWidth={2} />
      {/* etykiety */}
      <text x={pad} y={h - 4} fontSize={9} fill="#9ca3af">za mało</text>
      <text x={w / 2} y={h - 4} fontSize={9} fill={BRAND.green} textAnchor="middle" fontWeight="600">optimum</text>
      <text x={w - pad} y={h - 4} fontSize={9} fill="#9ca3af" textAnchor="end">za dużo</text>
    </svg>
  );
}

// Matryca trafności: kompetencje × zachowania, kolor = stan.
export function FitnessMatrix({ competencies }: { competencies: CompetencyFitness[] }) {
  const maxBeh = Math.max(...competencies.map((c) => c.behaviors.length));
  return (
    <div className="overflow-x-auto">
      <table className="w-full" style={{ borderSpacing: 3, borderCollapse: 'separate' }}>
        <tbody>
          {competencies.map((c) => (
            <tr key={c.id}>
              <td className="text-xs text-gray-600 pr-3 whitespace-nowrap font-medium align-middle">
                {c.id} · {c.nameShort}
              </td>
              {Array.from({ length: maxBeh }).map((_, i) => {
                const b = c.behaviors[i];
                if (!b) return <td key={i} />;
                return (
                  <td key={i} className="p-0">
                    <div
                      className="rounded-md flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ background: STATE_COLOR[b.state], height: 34, minWidth: 52 }}
                      title={`${b.text} — ${STATE_LABEL[b.state]} (${STATE_ACTION[b.state]})`}
                    >
                      {b.avgIntensity.toFixed(1)}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-wrap gap-3 mt-3 text-[11px] text-gray-500">
        {(['far_low', 'ok', 'far_high'] as FitnessState[]).map((s) => (
          <span key={s} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded inline-block" style={{ background: STATE_COLOR[s] }} />
            {s === 'far_low' ? 'za mało (wzmocnij)' : s === 'ok' ? 'w sam raz' : 'za dużo (odpuść)'}
          </span>
        ))}
      </div>
    </div>
  );
}

// Pierścień trafności kompetencji (% dopasowania do optimum).
export function FitnessRing({ pct, color, label }: { pct: number; color: string; label?: string }) {
  const r = 52, circ = 2 * Math.PI * r, dash = circ * (pct / 100);
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 140 140" className="w-28 h-28">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#eee" strokeWidth="13" />
        <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="13" strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`} transform="rotate(-90 70 70)" />
        <text x="70" y="66" textAnchor="middle" fontSize="24" fontWeight="800" fill={BRAND.suusNavy}>{pct}%</text>
        <text x="70" y="86" textAnchor="middle" fontSize="10" fill={BRAND.grayMid}>trafność</text>
      </svg>
      {label && <div className="text-xs font-semibold mt-1" style={{ color }}>{label}</div>}
    </div>
  );
}
