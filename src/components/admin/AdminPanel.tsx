import { useState } from 'react';
import type { ModelConfig, CompetencyConfig, BehaviorConfig, BehaviorType } from '../../data/modelConfig';
import { DEFAULT_MODEL } from '../../data/modelConfig';
import { exportModelJSON, importModelJSON } from '../../data/configStore';
import { BRAND } from '../../data/model';

interface Props {
  model: ModelConfig;
  onSave: (m: ModelConfig) => void;
  onBack: () => void;
}

const NAVY = BRAND.suusNavy;

export default function AdminPanel({ model, onSave, onBack }: Props) {
  const [draft, setDraft] = useState<ModelConfig>(() => structuredClone(model));
  const [openComp, setOpenComp] = useState<string | null>(draft.competencies[0]?.id ?? null);
  const [showIO, setShowIO] = useState<'export' | 'import' | null>(null);
  const [ioText, setIoText] = useState('');
  const [ioError, setIoError] = useState('');
  const [dirty, setDirty] = useState(false);

  function patch(updater: (d: ModelConfig) => void) {
    setDraft((prev) => {
      const next = structuredClone(prev);
      updater(next);
      return next;
    });
    setDirty(true);
  }

  function updateBehavior(compId: string, behId: string, p: Partial<BehaviorConfig>) {
    patch((d) => {
      const c = d.competencies.find((x) => x.id === compId);
      const b = c?.behaviors.find((x) => x.id === behId);
      if (b) Object.assign(b, p);
    });
  }
  function updateBehaviorInterp(compId: string, behId: string, key: 'low' | 'ok' | 'high', val: string) {
    patch((d) => {
      const b = d.competencies.find((x) => x.id === compId)?.behaviors.find((x) => x.id === behId);
      if (b) b.interp[key] = val;
    });
  }
  function updateComp(compId: string, p: Partial<CompetencyConfig>) {
    patch((d) => {
      const c = d.competencies.find((x) => x.id === compId);
      if (c) Object.assign(c, p);
    });
  }

  function doExport() {
    setIoText(exportModelJSON(draft));
    setShowIO('export');
    setIoError('');
  }
  function doImport() {
    try {
      const m = importModelJSON(ioText);
      setDraft(m);
      setDirty(true);
      setShowIO(null);
      setIoError('');
    } catch (e) {
      setIoError(e instanceof Error ? e.message : 'Błąd parsowania JSON');
    }
  }
  function doReset() {
    setDraft(structuredClone(DEFAULT_MODEL));
    setDirty(true);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-lg font-black" style={{ color: NAVY }}>Panel admina — model kompetencji</h1>
            <p className="text-xs text-gray-400">Kalibracja skal, poziomów optymalnych i interpretacji odchyłu</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="text-sm px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">Wróć</button>
            <button onClick={doReset} className="text-sm px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">Reset do domyślnego</button>
            <button onClick={() => { setShowIO('import'); setIoText(''); setIoError(''); }} className="text-sm px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">Import JSON</button>
            <button onClick={doExport} className="text-sm px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">Eksport JSON</button>
            <button onClick={() => onSave(draft)} className="text-sm px-4 py-2 rounded-lg text-white font-semibold shadow-sm hover:opacity-90" style={{ background: BRAND.primary }}>
              Zapisz model{dirty ? ' •' : ''}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-6 space-y-5">
        {/* IO PANEL */}
        {showIO && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-700">{showIO === 'export' ? 'Eksport modelu (skopiuj JSON)' : 'Import modelu (wklej JSON)'}</h3>
              <button onClick={() => setShowIO(null)} className="text-sm text-gray-400 hover:text-gray-700">Zamknij</button>
            </div>
            <textarea
              value={ioText}
              onChange={(e) => setIoText(e.target.value)}
              readOnly={showIO === 'export'}
              className="w-full h-48 font-mono text-xs border border-gray-200 rounded-lg p-3"
              placeholder={showIO === 'import' ? 'Wklej tu JSON modelu...' : ''}
            />
            {ioError && <p className="text-sm text-red-500 mt-2">{ioError}</p>}
            {showIO === 'import' && (
              <button onClick={doImport} className="mt-2 text-sm px-4 py-2 rounded-lg text-white font-semibold" style={{ background: BRAND.primary }}>Wczytaj model</button>
            )}
          </div>
        )}

        {/* META */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="grid sm:grid-cols-[1fr_auto_auto] gap-4 items-end">
            <label className="block">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Klient</span>
              <input value={draft.clientName} onChange={(e) => patch((d) => { d.clientName = e.target.value; })}
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </label>
            <label className="block">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Skala min</span>
              <input type="number" value={draft.scale.min} onChange={(e) => patch((d) => { d.scale.min = +e.target.value; })}
                className="mt-1 w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </label>
            <label className="block">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Skala max</span>
              <input type="number" value={draft.scale.max} onChange={(e) => patch((d) => { d.scale.max = +e.target.value; })}
                className="mt-1 w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </label>
          </div>
          {/* liczby ról */}
          <div className="mt-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Maksymalna liczba respondentów per rola</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
              {draft.roles.map((r, ri) => (
                <label key={r.key} className="block">
                  <span className="text-xs text-gray-500">{r.label}</span>
                  <input type="number" min={1} value={r.maxCount}
                    onChange={(e) => patch((d) => { d.roles[ri].maxCount = +e.target.value; })}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* KOMPETENCJE */}
        {draft.competencies.map((comp) => (
          <div key={comp.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => setOpenComp(openComp === comp.id ? null : comp.id)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg text-white text-sm font-black flex items-center justify-center" style={{ background: comp.color }}>{comp.id.replace('K', '')}</span>
                <span className="font-bold text-gray-800">{comp.name}</span>
                <span className="text-xs text-gray-400">{comp.behaviors.length} zachowań</span>
              </div>
              <span className="text-gray-400">{openComp === comp.id ? '▾' : '▸'}</span>
            </button>

            {openComp === comp.id && (
              <div className="px-5 pb-5 space-y-4">
                {/* meta kompetencji */}
                <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-3">
                  <label className="block">
                    <span className="text-xs text-gray-500">Nazwa</span>
                    <input value={comp.name} onChange={(e) => updateComp(comp.id, { name: e.target.value })} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                  </label>
                  <label className="block">
                    <span className="text-xs text-gray-500">Nazwa krótka</span>
                    <input value={comp.nameShort} onChange={(e) => updateComp(comp.id, { nameShort: e.target.value })} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                  </label>
                  <label className="block">
                    <span className="text-xs text-gray-500">Kolor</span>
                    <input type="color" value={comp.color} onChange={(e) => updateComp(comp.id, { color: e.target.value })} className="mt-1 w-14 h-9 border border-gray-200 rounded-lg" />
                  </label>
                </div>
                <label className="block">
                  <span className="text-xs text-gray-500">Definicja</span>
                  <textarea value={comp.definition} onChange={(e) => updateComp(comp.id, { definition: e.target.value })} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-16" />
                </label>

                {/* zachowania */}
                <div className="space-y-3">
                  {comp.behaviors.map((beh) => (
                    <BehaviorEditor
                      key={beh.id}
                      beh={beh}
                      scaleMin={draft.scale.min}
                      scaleMax={draft.scale.max}
                      onChange={(p) => updateBehavior(comp.id, beh.id, p)}
                      onInterp={(k, v) => updateBehaviorInterp(comp.id, beh.id, k, v)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BehaviorEditor({
  beh, scaleMin, scaleMax, onChange, onInterp,
}: {
  beh: BehaviorConfig;
  scaleMin: number;
  scaleMax: number;
  onChange: (p: Partial<BehaviorConfig>) => void;
  onInterp: (k: 'low' | 'ok' | 'high', v: string) => void;
}) {
  const monotonic = beh.type === 'monotonic';
  // pozycja targetu na pasku skali (0-100)
  const targetPct = ((beh.target - scaleMin) / (scaleMax - scaleMin)) * 100;
  const tolPct = (beh.tolerance / (scaleMax - scaleMin)) * 100;

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/60">
      <input
        value={beh.text}
        onChange={(e) => onChange({ text: e.target.value })}
        className="w-full font-medium text-sm border-b border-transparent hover:border-gray-200 focus:border-gray-300 bg-transparent pb-1 mb-3"
      />

      <div className="grid sm:grid-cols-[auto_auto_auto_1fr] gap-4 items-center mb-3">
        {/* typ */}
        <div>
          <span className="text-[11px] text-gray-400 block mb-1">Typ</span>
          <div className="flex rounded-lg overflow-hidden border border-gray-200 text-xs">
            <button
              onClick={() => onChange({ type: 'optimal' as BehaviorType })}
              className={`px-2.5 py-1.5 ${!monotonic ? 'text-white font-semibold' : 'bg-white text-gray-500'}`}
              style={!monotonic ? { background: BRAND.primary } : {}}
            >środek = OK</button>
            <button
              onClick={() => onChange({ type: 'monotonic' as BehaviorType })}
              className={`px-2.5 py-1.5 ${monotonic ? 'text-white font-semibold' : 'bg-white text-gray-500'}`}
              style={monotonic ? { background: BRAND.primary } : {}}
            >więcej = lepiej</button>
          </div>
        </div>
        {/* target */}
        <label className="block">
          <span className="text-[11px] text-gray-400 block mb-1">Poziom optymalny</span>
          <input type="number" step="0.1" min={scaleMin} max={scaleMax} value={beh.target}
            onChange={(e) => onChange({ target: +e.target.value })}
            className="w-20 border border-gray-200 rounded-lg px-2 py-1.5 text-sm" />
        </label>
        {/* tolerancja */}
        <label className="block">
          <span className="text-[11px] text-gray-400 block mb-1">Pasmo ± OK</span>
          <input type="number" step="0.1" min={0.1} value={beh.tolerance}
            onChange={(e) => onChange({ tolerance: +e.target.value })}
            className="w-20 border border-gray-200 rounded-lg px-2 py-1.5 text-sm" />
        </label>
        {/* podgląd suwaka */}
        <div>
          <span className="text-[11px] text-gray-400 block mb-1">Podgląd pasma optimum</span>
          <div className="relative h-3 rounded-full bg-gradient-to-r from-green-100 via-green-400 to-orange-300 overflow-visible">
            {!monotonic && (
              <div className="absolute top-0 h-full bg-green-500/30 border-x border-green-600" style={{ left: `${targetPct - tolPct}%`, width: `${tolPct * 2}%` }} />
            )}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white shadow" style={{ left: `${targetPct}%`, background: BRAND.green }} />
          </div>
        </div>
      </div>

      {/* interpretacje */}
      <div className="grid sm:grid-cols-3 gap-2">
        <label className="block">
          <span className="text-[11px] font-semibold" style={{ color: '#3d6b1f' }}>Gdy za mało</span>
          <textarea value={beh.interp.low} onChange={(e) => onInterp('low', e.target.value)} className="mt-1 w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs h-20" />
        </label>
        <label className="block">
          <span className="text-[11px] font-semibold" style={{ color: '#0a8f5b' }}>Gdy w sam raz</span>
          <textarea value={beh.interp.ok} onChange={(e) => onInterp('ok', e.target.value)} className="mt-1 w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs h-20" />
        </label>
        <label className="block">
          <span className="text-[11px] font-semibold" style={{ color: monotonic ? '#bbb' : '#b5560a' }}>Gdy za dużo {monotonic && '(nie dotyczy)'}</span>
          <textarea value={beh.interp.high} disabled={monotonic} onChange={(e) => onInterp('high', e.target.value)} className="mt-1 w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs h-20 disabled:bg-gray-100 disabled:text-gray-400" />
        </label>
      </div>
    </div>
  );
}
