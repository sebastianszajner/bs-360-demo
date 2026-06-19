// Generator danych demo dla Jana Kowalskiego.
// Z docelowych średnich per rola (z PDF) tworzy surowe odpowiedzi wielu respondentów,
// żeby agregacja zmiennych liczb i histogramy działały jak w realnym badaniu.
// Deterministyczny (bez losowości) — ten sam wynik przy każdym uruchomieniu.

import type { ModelConfig, RoleKey } from './modelConfig';
import type { RawAnswers, RespondentCounts } from '../engine/fitness';

export const DEMO_PERSONA = {
  name: 'Jan Kowalski',
  position: 'Kierownik Operacyjny Magazynu',
  location: 'Centrum Logistyczne Łódź',
  teamSize: '18 osób (3 liderów zmianowych, 12 magazynierów, 3 operatorów wózków)',
  tenure: '6 lat w SUUS',
  surveyDate: 'marzec 2026',
};

// Liczba respondentów per rola (zmienna — do 7 podwładnych, 5 współpracowników).
export const DEMO_COUNTS: RespondentCounts = { sam: 1, prz: 1, wsp: 5, pod: 7 };

// Docelowe średnie natężenia per kompetencja per rola (1:1 z PDF Jana).
const ROLE_MEANS: Record<string, Record<RoleKey, number>> = {
  K1: { sam: 5.2, prz: 5.0, wsp: 4.6, pod: 4.4 },
  K2: { sam: 4.5, prz: 4.0, wsp: 3.8, pod: 3.4 },
  K3: { sam: 4.8, prz: 5.2, wsp: 4.9, pod: 4.7 },
  K4: { sam: 5.0, prz: 4.8, wsp: 4.3, pod: 4.0 },
  K5: { sam: 5.4, prz: 5.1, wsp: 4.7, pod: 4.2 },
};

// Odchylenie zachowania od średniej kompetencji (oddaje relacje z PDF, suma ≈ 0 per kompetencja).
const BEH_OFFSET: Record<string, number> = {
  K1B1: -0.1, K1B2: -0.3, K1B3: 0.1, K1B4: 0.3,      // BHP najwyżej
  K2B1: -0.4, K2B2: -0.1, K2B3: 0.4, K2B4: 0.1,      // feedback najniżej
  K3B1: 0.2, K3B2: 0.0, K3B3: -0.4, K3B4: 0.2,       // sens zmiany niżej
  K4B1: 0.0, K4B2: -0.3, K4B3: 0.3, K4B4: 0.0,       // partnerstwo niżej
  K5B1: 0.4, K5B2: 0.2, K5B3: -0.6, K5B4: 0.0,       // uzasadnienie decyzji najniżej
};

// Deterministyczny rozrzut per respondent (indeks w roli) — daje realistyczny histogram.
const JITTER = [0, 0.5, -0.4, 0.3, -0.2, 0.45, -0.35];

function clamp(v: number): number {
  return Math.max(1, Math.min(6, v));
}

export function buildDemoAnswers(model: ModelConfig): RawAnswers {
  const answers: RawAnswers = {};
  for (const comp of model.competencies) {
    const means = ROLE_MEANS[comp.id];
    if (!means) continue;
    for (const beh of comp.behaviors) {
      const offset = BEH_OFFSET[beh.id] ?? 0;
      const cell: Partial<Record<RoleKey, number[]>> = {};
      for (const role of model.roles) {
        const n = DEMO_COUNTS[role.key];
        if (!n) continue;
        const base = means[role.key] + offset;
        const vals: number[] = [];
        for (let i = 0; i < n; i++) {
          // samoocena i przełożony (n=1) bez rozrzutu; grupy z rozrzutem
          const jitter = n === 1 ? 0 : JITTER[i % JITTER.length];
          vals.push(clamp(Math.round(base + jitter)));
        }
        cell[role.key] = vals;
      }
      answers[beh.id] = cell;
    }
  }
  return answers;
}
