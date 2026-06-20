// Dane grupy menedżerów dla raportu zbiorczego HR (demo, fikcyjne persony).
// Z docelowych średnich per kompetencja generuje surowe odpowiedzi i fitness
// dla każdego menedżera — HR widzi przekrój całej grupy, nie pojedyncze osoby.
import type { ModelConfig, RoleKey } from './modelConfig';
import { computeFitness, type RawAnswers, type RespondentCounts, type FitnessResult } from '../engine/fitness';

export interface GroupManager {
  id: string;
  name: string;
  position: string;
  location: string;
  means: Record<string, Record<RoleKey, number>>; // per kompetencja per rola
}

const COUNTS: RespondentCounts = { sam: 1, prz: 1, wsp: 5, pod: 7 };
const JITTER = [0, 0.5, -0.4, 0.3, -0.2, 0.45, -0.35];
const clamp = (v: number) => Math.max(1, Math.min(6, v));

// Pięciu menedżerów z różnymi profilami — pokazują wzorce systemowe w grupie.
export const GROUP: GroupManager[] = [
  {
    id: 'jan', name: 'Jan Kowalski', position: 'Kierownik Operacyjny Magazynu', location: 'CL Łódź',
    means: { K1: { sam: 5.2, prz: 5.0, wsp: 4.6, pod: 4.4 }, K2: { sam: 4.5, prz: 4.0, wsp: 3.8, pod: 3.4 }, K3: { sam: 4.8, prz: 5.2, wsp: 4.9, pod: 4.7 }, K4: { sam: 5.0, prz: 4.8, wsp: 4.3, pod: 4.0 }, K5: { sam: 5.4, prz: 5.1, wsp: 4.7, pod: 4.2 } },
  },
  {
    id: 'anna', name: 'Anna Mazur', position: 'Kierownik Centrum Dystrybucji', location: 'CL Wrocław',
    means: { K1: { sam: 4.6, prz: 4.8, wsp: 4.7, pod: 4.6 }, K2: { sam: 4.4, prz: 4.6, wsp: 4.5, pod: 4.3 }, K3: { sam: 4.2, prz: 4.0, wsp: 3.9, pod: 3.7 }, K4: { sam: 4.8, prz: 4.9, wsp: 4.6, pod: 4.5 }, K5: { sam: 4.3, prz: 4.1, wsp: 4.0, pod: 3.8 } },
  },
  {
    id: 'piotr', name: 'Piotr Nowak', position: 'Kierownik Operacyjny Magazynu', location: 'CL Gdańsk',
    means: { K1: { sam: 5.6, prz: 5.4, wsp: 5.5, pod: 5.6 }, K2: { sam: 4.0, prz: 3.6, wsp: 3.5, pod: 3.2 }, K3: { sam: 4.5, prz: 4.4, wsp: 4.3, pod: 4.2 }, K4: { sam: 4.4, prz: 4.2, wsp: 4.0, pod: 3.9 }, K5: { sam: 5.7, prz: 5.6, wsp: 5.5, pod: 5.4 } },
  },
  {
    id: 'kasia', name: 'Katarzyna Wójcik', position: 'Kierownik Logistyki Kontraktowej', location: 'CL Poznań',
    means: { K1: { sam: 4.4, prz: 4.5, wsp: 4.4, pod: 4.3 }, K2: { sam: 5.0, prz: 5.1, wsp: 5.0, pod: 4.9 }, K3: { sam: 4.6, prz: 4.5, wsp: 4.4, pod: 4.3 }, K4: { sam: 4.9, prz: 5.0, wsp: 4.8, pod: 4.7 }, K5: { sam: 4.2, prz: 4.0, wsp: 3.8, pod: 3.6 } },
  },
  {
    id: 'marek', name: 'Marek Lis', position: 'Kierownik Operacyjny Magazynu', location: 'CL Katowice',
    means: { K1: { sam: 4.8, prz: 4.6, wsp: 4.5, pod: 4.3 }, K2: { sam: 4.2, prz: 3.9, wsp: 3.7, pod: 3.5 }, K3: { sam: 4.7, prz: 4.8, wsp: 4.7, pod: 4.6 }, K4: { sam: 4.3, prz: 4.1, wsp: 3.9, pod: 3.7 }, K5: { sam: 5.1, prz: 4.9, wsp: 4.8, pod: 4.6 } },
  },
];

function buildAnswers(model: ModelConfig, means: Record<string, Record<RoleKey, number>>): RawAnswers {
  const answers: RawAnswers = {};
  for (const comp of model.competencies) {
    const m = means[comp.id];
    if (!m) continue;
    comp.behaviors.forEach((beh, bi) => {
      const offset = (bi - (comp.behaviors.length - 1) / 2) * 0.18; // delikatne zróżnicowanie zachowań
      const cell: Partial<Record<RoleKey, number[]>> = {};
      for (const role of model.roles) {
        const n = COUNTS[role.key];
        if (!n) continue;
        const base = (m[role.key] ?? 4) + offset;
        cell[role.key] = Array.from({ length: n }, (_, i) => clamp(Math.round(base + (n === 1 ? 0 : JITTER[i % JITTER.length]))));
      }
      answers[beh.id] = cell;
    });
  }
  return answers;
}

export interface ManagerFitness { manager: GroupManager; fitness: FitnessResult; }

export function computeGroup(model: ModelConfig): ManagerFitness[] {
  return GROUP.map((manager) => ({ manager, fitness: computeFitness(model, buildAnswers(model, manager.means), COUNTS) }));
}
