import { useState } from 'react';
import type { ModelConfig, RoleKey } from '../../data/modelConfig';
import { BRAND } from '../../data/model';
import { DEMO_CAMPAIGN, reminderText, loadReminders, saveReminder, type Respondent } from '../../data/surveyData';
import { RoleIcon, StatusIcon } from './RoleIcons';

const NAVY = BRAND.suusNavy;

// Widok zarządzania badaniem: kto ma oceniać, kto uzupełnił, kogo i jak przypomnieć.
// Liczniki per poziom liczone na żywo z danych kampanii.
export default function SurveyManager({ model }: { model: ModelConfig }) {
  const c = DEMO_CAMPAIGN;
  const [reminders, setReminders] = useState<Record<string, string>>(() => loadReminders());
  const [openRem, setOpenRem] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const total = c.respondents.length;
  const done = c.respondents.filter((r) => r.completed).length;
  const overallPct = Math.round((done / total) * 100);

  function markReminded(id: string) {
    const when = new Date().toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' });
    saveReminder(id, when);
    setReminders((p) => ({ ...p, [id]: when }));
  }
  async function copyReminder(r: Respondent) {
    try {
      await navigator.clipboard.writeText(reminderText(r, c));
      setCopied(r.id);
      setTimeout(() => setCopied(null), 1800);
    } catch { /* schowek niedostępny */ }
  }

  return (
    <div className="space-y-5">
      {/* nagłówek menadżera */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: BRAND.primary }}>Badanie 360° · menadżer</div>
            <h2 className="text-2xl font-black" style={{ color: NAVY }}>{c.managerName}</h2>
            <div className="text-sm text-gray-500">{c.position} · {c.location}</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black" style={{ color: done === total ? BRAND.green : BRAND.orange }}>{done}<span className="text-gray-300">/{total}</span></div>
            <div className="text-xs text-gray-400">uzupełniło · termin {c.deadline}</div>
          </div>
        </div>
        {/* pasek postępu ogólny */}
        <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${overallPct}%`, background: done === total ? BRAND.green : BRAND.primary }} />
        </div>
      </div>

      {/* liczniki per rola — na żywo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {model.roles.map((role) => {
          const group = c.respondents.filter((r) => r.role === role.key);
          const gd = group.filter((r) => r.completed).length;
          const pct = group.length ? Math.round((gd / group.length) * 100) : 0;
          return (
            <div key={role.key} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <RoleIcon role={role.key} color={role.color} />
                <span className="text-xs font-semibold text-gray-600">{role.label}</span>
              </div>
              <div className="text-2xl font-black tabular-nums" style={{ color: NAVY }}>{gd}<span className="text-gray-300 text-lg">/{group.length}</span></div>
              <div className="mt-2 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: role.color }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* lista respondentów per rola */}
      {model.roles.map((role) => {
        const group = c.respondents.filter((r) => r.role === role.key);
        if (!group.length) return null;
        return (
          <div key={role.key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 flex items-center gap-2 border-b border-gray-100" style={{ background: role.color + '0c' }}>
              <RoleIcon role={role.key} color={role.color} />
              <span className="font-bold text-sm" style={{ color: NAVY }}>{role.label}</span>
              <span className="text-xs text-gray-400">· {group.filter((r) => r.completed).length} z {group.length} uzupełniło</span>
            </div>
            <div className="divide-y divide-gray-100">
              {group.map((r) => {
                const reminded = reminders[r.id];
                return (
                  <div key={r.id}>
                    <div className="px-5 py-3 flex items-start gap-3">
                      <div className="pt-0.5"><StatusIcon done={r.completed} /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-gray-800">{r.name}</span>
                          <span className="text-xs text-gray-400">{r.email}</span>
                          {r.completed
                            ? <span className="text-[11px] font-medium" style={{ color: '#0a8f5b' }}>uzupełnił · {r.completedAt}</span>
                            : <span className="text-[11px] font-medium" style={{ color: BRAND.orange }}>czeka na odpowiedź</span>}
                        </div>
                        <div className="text-[12px] text-gray-500 mt-0.5">{r.reason}</div>
                        {reminded && <div className="text-[11px] mt-1" style={{ color: BRAND.secondary }}>↻ przypomniano {reminded}</div>}
                      </div>
                      {!r.completed && (
                        <button
                          onClick={() => setOpenRem(openRem === r.id ? null : r.id)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg shrink-0 transition"
                          style={{ background: openRem === r.id ? BRAND.primary : BRAND.primary + '12', color: openRem === r.id ? '#fff' : BRAND.primary }}
                        >
                          {openRem === r.id ? 'Zwiń' : 'Przypomnij'}
                        </button>
                      )}
                    </div>
                    {/* panel przypomnienia */}
                    {openRem === r.id && !r.completed && (
                      <div className="px-5 pb-4">
                        <div className="rounded-xl p-4" style={{ background: '#f7f9fc' }}>
                          <div className="text-[11px] text-gray-500 mb-2">
                            Dlaczego ta osoba: <span className="text-gray-700">{r.reason}</span>
                          </div>
                          <textarea
                            readOnly
                            value={reminderText(r, c)}
                            className="w-full h-44 text-[12px] font-mono border border-gray-200 rounded-lg p-3 bg-white leading-relaxed"
                          />
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => copyReminder(r)} className="text-xs font-semibold px-4 py-2 rounded-lg text-white" style={{ background: BRAND.primary }}>
                              {copied === r.id ? '✓ Skopiowano' : 'Kopiuj treść maila'}
                            </button>
                            <button onClick={() => markReminded(r.id)} className="text-xs font-semibold px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">
                              Oznacz jako przypomniane
                            </button>
                          </div>
                          <p className="text-[11px] text-gray-400 mt-2">Maila wysyłasz samodzielnie ze swojej skrzynki — kopiujemy gotową treść, nie wysyłamy w Twoim imieniu.</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export type { RoleKey };
