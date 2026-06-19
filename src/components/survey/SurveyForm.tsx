import { useState } from 'react';
import { COMPETENCIES, ROLES, type RoleKey } from '../../data/model';
import type { SurveyAnswers } from '../../engine/scorer';

interface Props {
  role: RoleKey;
  onComplete: (answers: SurveyAnswers) => void;
  onBack: () => void;
}

const SCALE_LABELS: Record<number, string> = {
  1: 'Zdecydowanie za rzadko',
  2: 'Za rzadko',
  3: 'Raczej rzadko',
  4: 'Raczej często',
  5: 'Często',
  6: 'Zdecydowanie często / wzorowo',
};

export default function SurveyForm({ role, onComplete, onBack }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>({});

  const comp = COMPETENCIES[step];
  const total = COMPETENCIES.length;
  const progress = Math.round(((step) / total) * 100);

  function setScore(behaviorId: string, score: number) {
    setAnswers((prev) => ({
      ...prev,
      [behaviorId]: { ...prev[behaviorId], [role]: score },
    }));
  }

  function getScore(behaviorId: string): number {
    return answers[behaviorId]?.[role] ?? 0;
  }

  function allAnswered(): boolean {
    return comp.behaviors.every((b) => getScore(b.id) > 0);
  }

  function next() {
    if (step < total - 1) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      onComplete(answers);
    }
  }

  function prev() {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    } else {
      onBack();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div style={{ background: '#7a00df' }} className="text-white py-4 px-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-purple-200 uppercase tracking-wide">Badanie 360° SUUS</p>
            <p className="font-semibold text-sm">
              {ROLES[role]} — oceniasz Jana Kowalskiego
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-purple-200">
              Kompetencja {step + 1} z {total}
            </p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mt-3">
          <div className="h-1.5 bg-purple-800 rounded-full">
            <div
              className="h-1.5 bg-white rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Competency header */}
        <div className="mb-6">
          <div
            className="inline-block text-xs font-bold px-2 py-1 rounded mb-2"
            style={{ background: '#7a00df', color: 'white' }}
          >
            {comp.id}
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">{comp.name}</h2>
          <p className="text-sm text-gray-500">{comp.definition}</p>
        </div>

        {/* Behaviors */}
        <div className="space-y-6">
          {comp.behaviors.map((beh, idx) => (
            <div key={beh.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="font-medium text-gray-800 mb-4 text-sm leading-relaxed">
                <span className="text-gray-400 mr-2">{idx + 1}.</span>
                {beh.text}
              </p>
              <div className="grid grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6].map((val) => {
                  const selected = getScore(beh.id) === val;
                  return (
                    <button
                      key={val}
                      onClick={() => setScore(beh.id, val)}
                      title={SCALE_LABELS[val]}
                      className={`
                        h-11 rounded-lg text-sm font-bold border-2 transition-all
                        ${selected
                          ? 'text-white border-transparent shadow-md'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-purple-300 hover:text-purple-700'
                        }
                      `}
                      style={selected ? { background: '#7a00df', borderColor: '#7a00df' } : {}}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2 px-0.5">
                <span>1 — Zdecydowanie za rzadko</span>
                <span>6 — Wzorowo</span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prev}
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {step === 0 ? 'Anuluj' : '← Wstecz'}
          </button>
          <button
            onClick={next}
            disabled={!allAnswered()}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all
              ${allAnswered()
                ? 'hover:opacity-90 shadow-md'
                : 'opacity-40 cursor-not-allowed'
              }`}
            style={{ background: '#7a00df' }}
          >
            {step < total - 1 ? 'Dalej →' : 'Generuj raport →'}
          </button>
        </div>
      </div>
    </div>
  );
}
