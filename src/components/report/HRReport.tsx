import type { ModelConfig } from '../../data/modelConfig';
import { computeGroup } from '../../data/groupData';
import { buildZoneMap } from '../../engine/fitness';
import { BRAND } from '../../data/model';

interface Props {
  model: ModelConfig;
  onBack: () => void;
}

const NAVY = BRAND.suusNavy;

// kolor komórki wg dopasowania (czerwony → żółty → zielony)
function fitColor(pct: number): string {
  const t = Math.max(0, Math.min(1, (pct - 55) / 40));
  const r = Math.round(255 - t * (255 - 0));
  const g = Math.round(120 + t * (208 - 120));
  const b = Math.round(70 + t * (132 - 70));
  return `rgb(${r},${g},${b})`;
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 md:p-9">{children}</section>;
}
function H1({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-black tracking-tight mb-4" style={{ color: NAVY }}>{children}</h2>;
}

export default function HRReport({ model, onBack }: Props) {
  const zones = buildZoneMap(model.scale.zones);
  const group = computeGroup(model);
  const comps = model.competencies;

  // przekrój per kompetencja
  const byComp = comps.map((c) => {
    const cells = group.map((g) => g.fitness.competencies.find((x) => x.id === c.id)!);
    const avgFit = Math.round(cells.reduce((a, b) => a + b.fitnessPct, 0) / cells.length);
    const offCount = cells.filter((x) => x.state !== 'ok').length;
    return { comp: c, avgFit, offCount, cells };
  });
  const groupAvg = Math.round(byComp.reduce((a, b) => a + b.avgFit, 0) / byComp.length);
  const weakest = [...byComp].sort((a, b) => a.avgFit - b.avgFit).slice(0, 2);
  const strongest = [...byComp].sort((a, b) => b.avgFit - a.avgFit)[0];
  const ranking = [...group].sort((a, b) => b.fitness.globalFitnessPct - a.fitness.globalFitnessPct);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="no-print sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
          <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-800">← Mapa raportu</button>
          <div className="text-xs text-gray-400 hidden sm:block">Raport zbiorczy dla HR · PREMIUM</div>
          <button onClick={() => window.print()} className="text-sm font-semibold text-white px-4 py-2 rounded-lg shadow-sm hover:opacity-90" style={{ background: BRAND.primary }}>Pobierz PDF</button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* COVER */}
        <Section>
          <div className="font-mono text-[11px] tracking-[0.15em] uppercase mb-2" style={{ color: BRAND.primary }}>Raport zbiorczy · widok organizacyjny</div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight mb-1" style={{ color: NAVY }}>Grupa menedżerów operacyjnych</h1>
              <p className="text-gray-500">{group.length} menedżerów · {comps.length} kompetencji · badanie 360</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black" style={{ color: fitColor(groupAvg) }}>{groupAvg}%</div>
              <div className="text-xs text-gray-400">średnia trafność grupy</div>
            </div>
          </div>
          <p className="text-[15px] leading-relaxed text-gray-700 mt-4">
            Ten raport pokazuje wzorzec całej grupy, nie pojedyncze osoby. Tam, gdzie ta sama kompetencja jest słaba u wielu
            menedżerów, mówimy o luce systemowej — sygnale do działania zespołowego (szkolenie, standard), nie indywidualnego.
          </p>
        </Section>

        {/* MAPA CIEPLNA */}
        <Section>
          <H1>Mapa trafności — menedżerowie × kompetencje</H1>
          <p className="text-gray-500 mb-4 text-[15px]">Każda komórka to dopasowanie menedżera do optimum w danej kompetencji. Czytaj kolumnami: pionowy pas czerwieni to luka systemowa.</p>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderSpacing: 4, borderCollapse: 'separate' }}>
              <thead>
                <tr>
                  <th></th>
                  {comps.map((c) => <th key={c.id} className="text-[11px] font-semibold text-gray-500 pb-1 px-1 align-bottom" style={{ minWidth: 70 }}>{c.nameShort}</th>)}
                  <th className="text-[11px] font-semibold text-gray-400 pb-1 px-1">śr.</th>
                </tr>
              </thead>
              <tbody>
                {group.map((g) => (
                  <tr key={g.manager.id}>
                    <td className="text-xs text-gray-700 pr-2 whitespace-nowrap font-medium">{g.manager.name} <span className="text-gray-400">· {g.manager.location}</span></td>
                    {comps.map((c) => {
                      const cell = g.fitness.competencies.find((x) => x.id === c.id)!;
                      return (
                        <td key={c.id} className="p-0">
                          <div className="rounded-md flex items-center justify-center text-[11px] font-bold text-white" style={{ background: fitColor(cell.fitnessPct), height: 36 }} title={`${zones[cell.state].label}`}>
                            {cell.fitnessPct}
                          </div>
                        </td>
                      );
                    })}
                    <td className="text-center text-sm font-black" style={{ color: NAVY }}>{g.fitness.globalFitnessPct}</td>
                  </tr>
                ))}
                <tr>
                  <td className="text-xs font-bold text-gray-500 pr-2 pt-1">Średnia grupy</td>
                  {byComp.map((b) => (
                    <td key={b.comp.id} className="p-0 pt-1">
                      <div className="rounded-md flex items-center justify-center text-[11px] font-black" style={{ background: fitColor(b.avgFit) + '33', color: NAVY, height: 30 }}>{b.avgFit}</div>
                    </td>
                  ))}
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* WZORCE SYSTEMOWE */}
        <Section>
          <div className="font-mono text-[11px] tracking-[0.15em] uppercase mb-2" style={{ color: BRAND.orange }}>Co robić zespołowo</div>
          <H1>Wzorce systemowe w grupie</H1>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-xl p-5" style={{ background: BRAND.orange + '0d' }}>
              <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: BRAND.orange }}>Luki systemowe — priorytet HR</div>
              {weakest.map((b) => (
                <div key={b.comp.id} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-bold" style={{ color: NAVY }}>{b.comp.nameShort}</span>
                    <span className="text-sm font-black" style={{ color: fitColor(b.avgFit) }}>{b.avgFit}%</span>
                  </div>
                  <div className="text-[13px] text-gray-600">{b.offCount} z {group.length} menedżerów poza pasmem optimum. To kandydat na wspólny standard lub szkolenie grupowe.</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-5" style={{ background: BRAND.green + '0d' }}>
              <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#0a8f5b' }}>Mocna strona grupy</div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold" style={{ color: NAVY }}>{strongest.comp.nameShort}</span>
                <span className="text-sm font-black" style={{ color: fitColor(strongest.avgFit) }}>{strongest.avgFit}%</span>
              </div>
              <div className="text-[13px] text-gray-600 mt-1">Najwyższe dopasowanie w grupie. Warto opisać, co konkretnie robią najlepsi, i przenieść to jako dobrą praktykę do reszty zespołu.</div>
            </div>
          </div>
        </Section>

        {/* RANKING */}
        <Section>
          <H1>Trafność indywidualna w grupie</H1>
          <p className="text-gray-500 mb-4 text-[15px]">Nie ranking „najlepszy menedżer", tylko dopasowanie profilu do poziomów optymalnych. Skrajne pozycje to dobre punkty startu do rozmów rozwojowych.</p>
          <div className="space-y-2">
            {ranking.map((g, i) => (
              <div key={g.manager.id} className="flex items-center gap-3">
                <span className="font-mono text-xs text-gray-400 w-5">{i + 1}</span>
                <span className="text-sm font-medium text-gray-700 w-56 shrink-0">{g.manager.name}</span>
                <div className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${g.fitness.globalFitnessPct}%`, background: fitColor(g.fitness.globalFitnessPct) }} />
                </div>
                <span className="text-sm font-bold w-10 text-right" style={{ color: NAVY }}>{g.fitness.globalFitnessPct}%</span>
              </div>
            ))}
          </div>
        </Section>

        {/* WNIOSEK */}
        <Section>
          <div className="rounded-xl p-6 border-l-4" style={{ borderColor: BRAND.primary, background: '#f7f4fd' }}>
            <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: BRAND.primary }}>Kluczowy wniosek dla HR</div>
            <p className="text-[15px] leading-relaxed text-gray-700">
              Najsłabszym ogniwem grupy jest <b>{weakest[0].comp.nameShort.toLowerCase()}</b> — średnio {weakest[0].avgFit}% dopasowania,
              {' '}poza pasmem u {weakest[0].offCount} z {group.length} menedżerów. To nie problem pojedynczych osób, tylko grupy, więc
              {' '}najwyższy zwrot da działanie wspólne: jeden standard i jedno krótkie szkolenie zamiast pięciu osobnych rozmów.
              {' '}Najmocniejszy obszar, <b>{strongest.comp.nameShort.toLowerCase()}</b>, użyj jako wewnętrznego wzorca dobrych praktyk.
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
}
