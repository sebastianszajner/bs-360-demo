import { useState } from 'react';
import { ROLES, DEMO_SCORES, DEMO_BEHAVIOR_SCORES, DEMO_PERSONA, type RoleKey } from './data/model';
import { scoreAnswers, buildDemoResult, type ScoringResult, type PersonaData } from './engine/scorer';
import SurveyForm from './components/survey/SurveyForm';
import ReportView from './components/report/ReportView';

type Screen = 'home' | 'setup' | 'survey' | 'report';

interface SetupData {
  role: RoleKey;
  persona: PersonaData;
  respondentCount: Record<RoleKey, number>;
}

const DEFAULT_RESPONDENT_COUNT: Record<RoleKey, number> = {
  sam: 1, prz: 1, wsp: 4, pod: 5,
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [setup, setSetup] = useState<SetupData>({
    role: 'pod',
    persona: {
      name: DEMO_PERSONA.name,
      position: DEMO_PERSONA.position,
      location: DEMO_PERSONA.location,
      teamSize: DEMO_PERSONA.teamSize,
      tenure: DEMO_PERSONA.surveyDate,
    },
    respondentCount: DEFAULT_RESPONDENT_COUNT,
  });
  const [result, setResult] = useState<ScoringResult | null>(null);

  function loadDemo() {
    const scored = buildDemoResult(
      DEMO_SCORES,
      DEMO_BEHAVIOR_SCORES,
      setup.persona,
      DEFAULT_RESPONDENT_COUNT
    );
    setResult(scored);
    setScreen('report');
  }

  function handleSurveyComplete(answers: Record<string, Partial<Record<RoleKey, number>>>) {
    const scored = scoreAnswers(
      answers as Parameters<typeof scoreAnswers>[0],
      setup.persona,
      setup.respondentCount
    );
    setResult(scored);
    setScreen('report');
  }

  function reset() {
    setResult(null);
    setScreen('home');
  }

  if (screen === 'report' && result) {
    return <ReportView result={result} onReset={reset} />;
  }

  if (screen === 'survey') {
    return (
      <SurveyForm
        role={setup.role}
        onComplete={handleSurveyComplete}
        onBack={() => setScreen('setup')}
      />
    );
  }

  if (screen === 'setup') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-8">
          <button
            onClick={() => setScreen('home')}
            className="text-sm text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1"
          >
            ← Wróć
          </button>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Konfiguracja respondenta</h2>
          <p className="text-sm text-gray-500 mb-6">
            Wypełniasz ankietę oceniającą Jana Kowalskiego. Wybierz swoją rolę.
          </p>

          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
              Twoja rola wobec ocenianego
            </label>
            <div className="space-y-2">
              {(Object.entries(ROLES) as [RoleKey, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSetup((s) => ({ ...s, role: key }))}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium
                    ${setup.role === key
                      ? 'bg-purple-50 text-purple-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  style={setup.role === key ? { borderColor: '#7a00df' } : {}}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setScreen('survey')}
            className="w-full py-3 rounded-xl text-white font-semibold hover:opacity-90 transition shadow-md"
            style={{ background: '#7a00df' }}
          >
            Rozpocznij ankietę →
          </button>
        </div>
      </div>
    );
  }

  // HOME
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: 'linear-gradient(135deg, #1a0040 0%, #2d006b 50%, #003f8a 100%)' }}
    >
      {/* Logo */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <span className="text-white text-lg font-black">BS</span>
          </div>
          <span className="text-white/80 text-lg font-light tracking-wide">Brain Stream</span>
        </div>
        <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
          Raport 360°
        </h1>
        <p className="text-purple-200 text-base max-w-md">
          System oceny kompetencji menedżerskich z interpretacją AI i planem działań
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full mb-8">
        {/* Demo card */}
        <button
          onClick={loadDemo}
          className="bg-white rounded-2xl p-6 text-left hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 group"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
            style={{ background: '#7a00df15' }}
          >
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-purple-700 transition-colors">
            Zobacz raport demo
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Gotowy raport dla Jana Kowalskiego — Kierownika Operacyjnego SUUS. Pełne wykresy, analiza AI i rekomendacje.
          </p>
          <div
            className="mt-4 text-sm font-semibold"
            style={{ color: '#7a00df' }}
          >
            Otwórz raport →
          </div>
        </button>

        {/* Fill survey card */}
        <button
          onClick={() => setScreen('setup')}
          className="rounded-2xl p-6 text-left hover:-translate-y-1 transition-all duration-200 group"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <span className="text-2xl">✏️</span>
          </div>
          <h3 className="font-bold text-white text-lg mb-2">Wypełnij ankietę</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,180,255,0.9)' }}>
            Oceń Jana Kowalskiego w 5 kompetencjach i wygeneruj własny raport na podstawie odpowiedzi.
          </p>
          <div className="mt-4 text-sm font-semibold text-purple-300 group-hover:text-white transition-colors">
            Zacznij ocenę →
          </div>
        </button>
      </div>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-2 max-w-xl">
        {[
          '5 kompetencji menedżerskich',
          '4 perspektywy oceny',
          'Analiza luk i rozbieżności',
          'Interpretacja AI',
          'Rekomendacje + plan 90 dni',
        ].map((f) => (
          <span
            key={f}
            className="text-xs px-3 py-1.5 rounded-full"
            style={{ color: 'rgba(200,180,255,0.8)', border: '1px solid rgba(122,0,223,0.4)' }}
          >
            {f}
          </span>
        ))}
      </div>

      <p className="mt-8 text-xs" style={{ color: 'rgba(150,120,200,0.6)' }}>
        brain-stream.pl · Wersja demonstracyjna · SUUS Logistics
      </p>
    </div>
  );
}
