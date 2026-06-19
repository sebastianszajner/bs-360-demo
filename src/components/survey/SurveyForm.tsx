import { useState } from 'react';
import { ROLE_DEFS, type ModelConfig, type RoleKey } from '../../data/modelConfig';
import { BRAND } from '../../data/model';

interface Props {
  role: RoleKey;
  model: ModelConfig;
  onBack: () => void;
}

// Ankieta zbiera NATĘŻENIE zachowania (jak często / jak intensywnie) w skali modelu.
// Odchył od poziomu optymalnego liczy dopiero raport (panel admina kalibruje target).
// Zabezpieczenie ryzyka #1: pojedynczy respondent kończy ekranem podziękowania,
// a nie zepsutym raportem z brakującymi perspektywami.
export default function SurveyForm({ role, model, onBack }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const comps = model.competencies;
  const comp = comps[step];
  const total = comps.length;
  const progress = Math.round((step / total) * 100);
  const roleLabel = ROLE_DEFS.find((r) => r.key === role)?.label ?? role;
  const scaleVals = Array.from({ length: model.scale.max - model.scale.min + 1 }, (_, i) => model.scale.min + i);

  function setScore(behId: string, val: number) {
    setAnswers((prev) => ({ ...prev, [behId]: val }));
  }
  const allAnswered = comp.behaviors.every((b) => (answers[b.id] ?? 0) > 0);

  function next() {
    if (step < total - 1) { setStep(step + 1); window.scrollTo(0, 0); }
    else { setDone(true); window.scrollTo(0, 0); }
  }
  function prev() {
    if (step > 0) { setStep(step - 1); window.scrollTo(0, 0); }
    else onBack();
  }

  // EKRAN PODZIĘKOWANIA — zabezpieczenie: jeden respondent nie tworzy raportu
  if (done) {
    const answered = Object.keys(answers).length;
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-8 text-center">
          <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: BRAND.green + '22' }}>
            <span className="text-2xl" style={{ color: '#0a8f5b' }}>✓</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Dziękujemy za wypełnienie ankiety</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            Oceniłeś {answered} zachowań jako <b>{roleLabel}</b>. Tak wygląda ankieta jednego respondenta.
          </p>
          <div className="text-left rounded-xl p-4 mb-5" style={{ background: '#f4f8fc' }}>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              Raport końcowy menadżera powstaje dopiero po zebraniu wszystkich perspektyw — samooceny,
              przełożonego, współpracowników i podwładnych. Pojedyncza ankieta to jeden głos w tym obrazie,
              dlatego nie generujemy z niej raportu. Pełny raport zobaczysz w trybie demo.
            </p>
          </div>
          <button onClick={onBack} className="w-full py-3 rounded-xl text-white font-semibold hover:opacity-90 shadow-md" style={{ background: BRAND.primary }}>
            Wróć do startu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div style={{ background: BRAND.primary }} className="text-white py-4 px-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-purple-200 uppercase tracking-wide">Badanie 360° · {model.clientName}</p>
            <p className="font-semibold text-sm">{roleLabel} — oceniasz Jana Kowalskiego</p>
          </div>
          <p className="text-xs text-purple-200">Kompetencja {step + 1} z {total}</p>
        </div>
        <div className="max-w-2xl mx-auto mt-3">
          <div className="h-1.5 bg-purple-800 rounded-full">
            <div className="h-1.5 bg-white rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="inline-block text-xs font-bold px-2 py-1 rounded mb-2 text-white" style={{ background: comp.color }}>{comp.id}</div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">{comp.name}</h2>
          <p className="text-sm text-gray-500">{comp.definition}</p>
        </div>

        <div className="rounded-lg px-4 py-2.5 mb-5 text-[13px] text-gray-600" style={{ background: '#f4f8fc' }}>
          Oceń, <b>jak często / jak intensywnie</b> Jan pokazuje każde zachowanie. Skala {model.scale.min}–{model.scale.max}.
          Nie chodzi o „im więcej tym lepiej" — raport sam wyliczy, czy to za mało, w sam raz, czy za dużo.
        </div>

        <div className="space-y-6">
          {comp.behaviors.map((beh, idx) => (
            <div key={beh.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="font-medium text-gray-800 mb-4 text-sm leading-relaxed">
                <span className="text-gray-400 mr-2">{idx + 1}.</span>{beh.text}
              </p>
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${scaleVals.length}, 1fr)` }}>
                {scaleVals.map((val) => {
                  const selected = answers[beh.id] === val;
                  return (
                    <button
                      key={val}
                      onClick={() => setScore(beh.id, val)}
                      title={model.scale.labels[val - model.scale.min]}
                      className={`h-11 rounded-lg text-sm font-bold border-2 transition-all ${selected ? 'text-white border-transparent shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-purple-300 hover:text-purple-700'}`}
                      style={selected ? { background: BRAND.primary, borderColor: BRAND.primary } : {}}
                    >{val}</button>
                  );
                })}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2 px-0.5">
                <span>{model.scale.min} — {model.scale.labels[0]}</span>
                <span>{model.scale.max} — {model.scale.labels[model.scale.labels.length - 1]}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8">
          <button onClick={prev} className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            {step === 0 ? 'Anuluj' : '← Wstecz'}
          </button>
          <button onClick={next} disabled={!allAnswered}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all ${allAnswered ? 'hover:opacity-90 shadow-md' : 'opacity-40 cursor-not-allowed'}`}
            style={{ background: BRAND.primary }}>
            {step < total - 1 ? 'Dalej →' : 'Zakończ ankietę →'}
          </button>
        </div>
      </div>
    </div>
  );
}
