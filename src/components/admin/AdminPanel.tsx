import { useState, useEffect, useRef } from 'react';
import type { ModelConfig, CompetencyConfig, BehaviorConfig, BehaviorType, ZoneConfig, BehaviorInterp } from '../../data/modelConfig';
import { DEFAULT_MODEL } from '../../data/modelConfig';
import { exportModelJSON, importModelJSON, lastSavedAt } from '../../data/configStore';
import { backupSupported, pickBackupFolder, storedFolderName, forgetBackupFolder, writeBackup, downloadBackup } from '../../data/backup';
import { BRAND } from '../../data/model';
import CalibControl from './CalibControl';
import SurveyManager from './SurveyManager';

interface Props {
  model: ModelConfig;
  onSave: (m: ModelConfig) => string; // zwraca ISO czasu zapisu
  onBack: () => void;
}

type Tab = 'model' | 'survey' | 'data';
const NAVY = BRAND.suusNavy;

function fmtTime(iso: string | null): string {
  if (!iso) return 'jeszcze nie zapisano';
  try {
    const d = new Date(iso);
    return d.toLocaleString('pl-PL', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
  } catch { return 'zapisano'; }
}

export default function AdminPanel({ model, onSave, onBack }: Props) {
  const [draft, setDraft] = useState<ModelConfig>(() => structuredClone(model));
  const [tab, setTab] = useState<Tab>('model');
  const [openComp, setOpenComp] = useState<string | null>(draft.competencies[0]?.id ?? null);
  const [showIO, setShowIO] = useState<'export' | 'import' | null>(null);
  const [ioText, setIoText] = useState('');
  const [ioError, setIoError] = useState('');
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(lastSavedAt());
  const [saving, setSaving] = useState(false);
  const [backupFolder, setBackupFolder] = useState<string | null>(null);
  const [lastBackup, setLastBackup] = useState<string | null>(null);
  const draftRef = useRef(draft);
  draftRef.current = draft;

  // sprawdź zapamiętany folder backupu przy wejściu
  useEffect(() => { storedFolderName().then(setBackupFolder); }, []);

  // ostrzeżenie przy wyjściu z niezapisanymi zmianami
  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);

  // AUTOZAPIS — debounce 1.2s po ostatniej zmianie; zapis localStorage + backup do folderu
  useEffect(() => {
    if (!dirty) return;
    setSaving(true);
    const t = setTimeout(async () => { await commit(draftRef.current); }, 1200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft, dirty]);

  async function commit(m: ModelConfig) {
    const iso = onSave(m);
    setSavedAt(iso);
    setDirty(false);
    if (backupFolder) {
      const ok = await writeBackup(m);
      if (ok) setLastBackup(new Date().toISOString());
    }
    setSaving(false);
  }

  function patch(updater: (d: ModelConfig) => void) {
    setDraft((prev) => { const next = structuredClone(prev); updater(next); return next; });
    setDirty(true);
  }
  const updateBehavior = (cId: string, bId: string, p: Partial<BehaviorConfig>) =>
    patch((d) => { const b = d.competencies.find((x) => x.id === cId)?.behaviors.find((x) => x.id === bId); if (b) Object.assign(b, p); });
  const updateInterp = (cId: string, bId: string, k: keyof BehaviorInterp, v: string) =>
    patch((d) => { const b = d.competencies.find((x) => x.id === cId)?.behaviors.find((x) => x.id === bId); if (b) b.interp[k] = v; });
  const updateComp = (cId: string, p: Partial<CompetencyConfig>) =>
    patch((d) => { const c = d.competencies.find((x) => x.id === cId); if (c) Object.assign(c, p); });
  const updateZone = (i: number, p: Partial<ZoneConfig>) =>
    patch((d) => { Object.assign(d.scale.zones[i], p); });

  function doSave() { commit(draft); }
  async function connectFolder() {
    try {
      const name = await pickBackupFolder();
      setBackupFolder(name);
      const ok = await writeBackup(draft);
      if (ok) setLastBackup(new Date().toISOString());
    } catch { /* anulowano wybór folderu */ }
  }
  async function disconnectFolder() { await forgetBackupFolder(); setBackupFolder(null); setLastBackup(null); }
  async function manualBackup() {
    if (backupFolder) { const ok = await writeBackup(draft); if (ok) setLastBackup(new Date().toISOString()); }
    else downloadBackup(draft);
  }
  function doExport() { setIoText(exportModelJSON(draft)); setShowIO('export'); setIoError(''); }
  function doImport() {
    try { setDraft(importModelJSON(ioText)); setDirty(true); setShowIO(null); setIoError(''); }
    catch (e) { setIoError(e instanceof Error ? e.message : 'Błąd parsowania JSON'); }
  }
  function doReset() { setDraft(structuredClone(DEFAULT_MODEL)); setDirty(true); }

  const TABS: [Tab, string][] = [['model', 'Model i kalibracja'], ['survey', 'Badanie i respondenci'], ['data', 'Dane i zapis']];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-5 pt-3 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-lg font-black" style={{ color: NAVY }}>Panel admina</h1>
            <p className="text-xs text-gray-400">Kalibracja modelu · zarządzanie badaniem · dane</p>
          </div>
          <div className="flex items-center gap-3">
            {/* status autozapisu */}
            <div className="text-right">
              <div className="text-[11px] flex items-center gap-1.5 justify-end" style={{ color: saving ? BRAND.orange : '#0a8f5b' }}>
                <span className="w-2 h-2 rounded-full" style={{ background: saving ? BRAND.orange : '#0a8f5b' }} />
                {saving ? 'Zapisywanie…' : 'Zapisano automatycznie'}
              </div>
              <div className="text-[10px] text-gray-400">
                {fmtTime(savedAt)}{backupFolder ? ` · backup: ${backupFolder.replace(' (wymaga ponownej zgody)', '')}` : ''}
              </div>
            </div>
            <button onClick={onBack} className="text-sm px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">Wróć</button>
            <button onClick={doSave} className="text-sm px-4 py-2 rounded-lg text-white font-semibold shadow-sm hover:opacity-90" style={{ background: BRAND.primary }}>
              Zapisz teraz
            </button>
          </div>
        </div>
        {/* zakładki */}
        <div className="max-w-5xl mx-auto px-5 flex gap-1 mt-2">
          {TABS.map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-2.5 text-sm font-semibold border-b-2 transition"
              style={tab === t ? { borderColor: BRAND.primary, color: BRAND.primary } : { borderColor: 'transparent', color: '#9ca3af' }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-6">
        {tab === 'survey' && <SurveyManager model={draft} />}

        {tab === 'data' && (
          <div className="space-y-5">
            {showIO && (
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-700">{showIO === 'export' ? 'Eksport modelu (skopiuj JSON)' : 'Import modelu (wklej JSON)'}</h3>
                  <button onClick={() => setShowIO(null)} className="text-sm text-gray-400 hover:text-gray-700">Zamknij</button>
                </div>
                <textarea value={ioText} onChange={(e) => setIoText(e.target.value)} readOnly={showIO === 'export'}
                  className="w-full h-56 font-mono text-xs border border-gray-200 rounded-lg p-3" placeholder={showIO === 'import' ? 'Wklej tu JSON modelu...' : ''} />
                {ioError && <p className="text-sm text-red-500 mt-2">{ioError}</p>}
                {showIO === 'import' && <button onClick={doImport} className="mt-2 text-sm px-4 py-2 rounded-lg text-white font-semibold" style={{ background: BRAND.primary }}>Wczytaj model</button>}
              </div>
            )}
            {/* AUTOZAPIS */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#0a8f5b' }} />
                <h3 className="font-bold text-gray-800">Autozapis jest włączony</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Każda zmiana zapisuje się automatycznie po chwili w tej przeglądarce (localStorage) — nie musisz klikać „Zapisz".
                Wracasz do danych przy kolejnym wejściu. Ostatni zapis: <b style={{ color: NAVY }}>{fmtTime(savedAt)}</b>.
              </p>
            </div>

            {/* BACKUP NA KOMPUTERZE */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-1">Backup na Twoim komputerze</h3>
              {backupSupported() ? (
                <>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Połącz folder na dysku raz, a aplikacja będzie zapisywać tam kopię modelu i statusów przy każdym autozapisie.
                    Plik <span className="font-mono text-[12px]">bs360-backup.json</span> zawsze ma najnowszą wersję. Działa w Chrome i Edge.
                  </p>
                  {backupFolder ? (
                    <div className="rounded-lg p-3 mb-3 flex items-center justify-between" style={{ background: '#00d0840e' }}>
                      <div className="text-sm">
                        <span className="text-gray-500">Folder backupu:</span> <b style={{ color: NAVY }}>{backupFolder}</b>
                        <div className="text-[11px] text-gray-400">{lastBackup ? `ostatni backup: ${fmtTime(lastBackup)}` : 'backup zapisze się przy najbliższej zmianie'}</div>
                      </div>
                      <button onClick={disconnectFolder} className="text-xs text-gray-400 hover:text-gray-700 underline shrink-0">odłącz</button>
                    </div>
                  ) : null}
                  <div className="flex flex-wrap gap-2">
                    <button onClick={connectFolder} className="text-sm px-4 py-2 rounded-lg text-white font-semibold" style={{ background: BRAND.primary }}>
                      {backupFolder ? 'Zmień folder' : 'Połącz folder backupu'}
                    </button>
                    <button onClick={manualBackup} className="text-sm px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">Zapisz backup teraz</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Ta przeglądarka nie pozwala na automatyczny zapis do folderu (działa w Chrome i Edge).
                    Możesz pobrać backup ręcznie jako plik JSON.
                  </p>
                  <button onClick={manualBackup} className="text-sm px-4 py-2 rounded-lg text-white font-semibold" style={{ background: BRAND.primary }}>Pobierz backup</button>
                </>
              )}
            </div>

            {/* PRZENOSZENIE MODELU */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-1">Przeniesienie modelu</h3>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                Aby przenieść kalibrację na inny komputer lub do produkcji, użyj eksportu JSON. Reset przywraca model domyślny SUUS.
              </p>
              <div className="flex flex-wrap gap-2">
                <button onClick={doExport} className="text-sm px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">Eksport JSON</button>
                <button onClick={() => { setShowIO('import'); setIoText(''); setIoError(''); }} className="text-sm px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">Import JSON</button>
                <button onClick={() => { if (confirm('Przywrócić model domyślny? Bieżąca kalibracja zostanie nadpisana (autozapis zapisze zmianę).')) doReset(); }} className="text-sm px-4 py-2 rounded-lg border border-gray-300 text-red-500 hover:bg-red-50">Reset do domyślnego</button>
              </div>
            </div>
          </div>
        )}

        {tab === 'model' && (
          <div className="space-y-5">
            {/* META */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="grid sm:grid-cols-[1fr_auto_auto] gap-4 items-end">
                <label className="block">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Klient</span>
                  <input value={draft.clientName} onChange={(e) => patch((d) => { d.clientName = e.target.value; })} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </label>
                <label className="block"><span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Skala min</span>
                  <input type="number" value={draft.scale.min} onChange={(e) => patch((d) => { d.scale.min = +e.target.value; })} className="mt-1 w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm" /></label>
                <label className="block"><span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Skala max</span>
                  <input type="number" value={draft.scale.max} onChange={(e) => patch((d) => { d.scale.max = +e.target.value; })} className="mt-1 w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm" /></label>
              </div>
            </div>

            {/* STREFY TRAFNOŚCI */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-800 mb-1">Pięć stref trafności</h3>
              <p className="text-sm text-gray-500 mb-4">Nazwy i kolory obszarów: od wyraźnego niedoboru, przez optimum, po wyraźny nadmiar. Pojawiają się w raporcie przy każdym zachowaniu.</p>
              <div className="space-y-2">
                {draft.scale.zones.map((z, i) => (
                  <div key={z.key} className="grid grid-cols-[auto_1.6fr_1fr_0.9fr] gap-3 items-center">
                    <input type="color" value={z.color} onChange={(e) => updateZone(i, { color: e.target.value })} className="w-10 h-9 rounded border border-gray-200" />
                    <input value={z.label} onChange={(e) => updateZone(i, { label: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="nazwa strefy" />
                    <input value={z.short} onChange={(e) => updateZone(i, { short: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500" placeholder="krótka etykieta" />
                    <input value={z.action} onChange={(e) => updateZone(i, { action: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="akcja" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-[auto_1.6fr_1fr_0.9fr] gap-3 mt-2 px-1 text-[10px] uppercase tracking-wide text-gray-400">
                <span>kolor</span><span>nazwa w raporcie</span><span>krótka etykieta</span><span>kierunek</span>
              </div>
            </div>

            {/* KOMPETENCJE */}
            {draft.competencies.map((comp) => (
              <div key={comp.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button onClick={() => setOpenComp(openComp === comp.id ? null : comp.id)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg text-white text-sm font-black flex items-center justify-center" style={{ background: comp.color }}>{comp.id.replace('K', '')}</span>
                    <span className="font-bold text-gray-800">{comp.name}</span>
                    <span className="text-xs text-gray-400">{comp.behaviors.length} zachowań</span>
                  </div>
                  <span className="text-gray-400">{openComp === comp.id ? '▾' : '▸'}</span>
                </button>
                {openComp === comp.id && (
                  <div className="px-5 pb-5 space-y-4">
                    <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-3">
                      <label className="block"><span className="text-xs text-gray-500">Nazwa</span>
                        <input value={comp.name} onChange={(e) => updateComp(comp.id, { name: e.target.value })} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></label>
                      <label className="block"><span className="text-xs text-gray-500">Nazwa krótka</span>
                        <input value={comp.nameShort} onChange={(e) => updateComp(comp.id, { nameShort: e.target.value })} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></label>
                      <label className="block"><span className="text-xs text-gray-500">Kolor</span>
                        <input type="color" value={comp.color} onChange={(e) => updateComp(comp.id, { color: e.target.value })} className="mt-1 w-14 h-9 border border-gray-200 rounded-lg" /></label>
                    </div>
                    <label className="block"><span className="text-xs text-gray-500">Definicja</span>
                      <textarea value={comp.definition} onChange={(e) => updateComp(comp.id, { definition: e.target.value })} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-16" /></label>
                    <div className="space-y-3">
                      {comp.behaviors.map((beh) => (
                        <BehaviorEditor key={beh.id} beh={beh} scaleMin={draft.scale.min} scaleMax={draft.scale.max} accent={comp.color} zones={draft.scale.zones}
                          onChange={(p) => updateBehavior(comp.id, beh.id, p)} onInterp={(k, v) => updateInterp(comp.id, beh.id, k, v)} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BehaviorEditor({ beh, scaleMin, scaleMax, accent, zones, onChange, onInterp }: {
  beh: BehaviorConfig; scaleMin: number; scaleMax: number; accent: string; zones: ZoneConfig[];
  onChange: (p: Partial<BehaviorConfig>) => void; onInterp: (k: keyof BehaviorInterp, v: string) => void;
}) {
  const monotonic = beh.type === 'monotonic';
  // pięć pól opisu po jednym na strefę; far_low/far_high dziedziczą, gdy puste
  const fields: { key: keyof BehaviorInterp; zone: ZoneConfig; inherits?: 'low' | 'high'; hiddenForMono?: boolean }[] = [
    { key: 'far_low', zone: zones[0], inherits: 'low' },
    { key: 'low', zone: zones[1] },
    { key: 'ok', zone: zones[2] },
    { key: 'high', zone: zones[3], hiddenForMono: true },
    { key: 'far_high', zone: zones[4], inherits: 'high', hiddenForMono: true },
  ];

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/60">
      <input value={beh.text} onChange={(e) => onChange({ text: e.target.value })}
        className="w-full font-medium text-sm border-b border-transparent hover:border-gray-200 focus:border-gray-300 bg-transparent pb-1 mb-4" />

      <div className="grid md:grid-cols-3 gap-5 mb-5">
        <div>
          <span className="text-[11px] text-gray-400 uppercase tracking-wide font-semibold block mb-1.5">Typ zachowania</span>
          <div className="flex rounded-lg overflow-hidden border border-gray-200 text-xs w-fit">
            <button onClick={() => onChange({ type: 'optimal' as BehaviorType })} className={`px-3 py-2 ${!monotonic ? 'text-white font-semibold' : 'bg-white text-gray-500'}`} style={!monotonic ? { background: accent } : {}}>środek = OK</button>
            <button onClick={() => onChange({ type: 'monotonic' as BehaviorType })} className={`px-3 py-2 ${monotonic ? 'text-white font-semibold' : 'bg-white text-gray-500'}`} style={monotonic ? { background: accent } : {}}>więcej = lepiej</button>
          </div>
        </div>
        <CalibControl label="Poziom optymalny" value={beh.target} min={scaleMin} max={scaleMax} step={0.1} accent={accent} onChange={(v) => onChange({ target: v })} />
        <CalibControl label="Pasmo ± OK" value={beh.tolerance} min={0.1} max={2.5} step={0.1} accent={accent} onChange={(v) => onChange({ tolerance: v })} />
      </div>

      {/* OPISY PER STREFA — pięć pól, każde z nazwą strefy */}
      <div className="text-[11px] text-gray-400 uppercase tracking-wide font-semibold mb-2">Opis dla każdej strefy</div>
      <div className="space-y-2.5">
        {fields.map(({ key, zone, inherits, hiddenForMono }) => {
          const disabled = monotonic && hiddenForMono;
          const val = (beh.interp[key] ?? '') as string;
          const inheritsText = inherits && !val.trim();
          return (
            <div key={key} className={`rounded-lg border ${disabled ? 'border-gray-100 bg-gray-50' : 'border-gray-200 bg-white'} p-3`}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: zone.color }} />
                  <span className="text-xs font-bold" style={{ color: '#374151' }}>{zone.label}</span>
                  <span className="text-[10px] text-gray-400">· {zone.short} · {zone.action}</span>
                </div>
                {disabled && <span className="text-[10px] text-gray-400">nie dotyczy (więcej = lepiej)</span>}
                {inheritsText && !disabled && <span className="text-[10px]" style={{ color: accent }}>puste → dziedziczy opis sąsiada</span>}
              </div>
              <textarea
                value={val}
                disabled={disabled}
                placeholder={inherits ? `Jeśli puste, użyje opisu „${inherits === 'low' ? zones[1].label : zones[3].label}". Wypełnij, by rozróżnić nasilenie.` : ''}
                onChange={(e) => onInterp(key, e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] leading-relaxed h-16 disabled:bg-gray-100 disabled:text-gray-300 focus:h-24 transition-all"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
