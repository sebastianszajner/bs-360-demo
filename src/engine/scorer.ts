import { COMPETENCIES, type RoleKey } from '../data/model';

export interface SurveyAnswers {
  // key: behaviorId, value: score 1-6 per role
  [behaviorId: string]: Partial<Record<RoleKey, number>>;
}

export interface PersonaData {
  name: string;
  position: string;
  location: string;
  teamSize: string;
  tenure: string;
}

export interface CompetencyScore {
  id: string;
  name: string;
  avgByRole: Record<RoleKey, number>;
  avgOthers: number;
  gap: number;
  behaviorScores: { id: string; text: string; avg: number }[];
  topBehavior: { text: string; avg: number };
  bottomBehavior: { text: string; avg: number };
}

export interface ScoringResult {
  persona: PersonaData;
  respondentCount: Record<RoleKey, number>;
  competencies: CompetencyScore[];
  globalTop: CompetencyScore;
  globalBottom: CompetencyScore;
  biggestGapComp: CompetencyScore;
}

export function scoreAnswers(
  answers: SurveyAnswers,
  persona: PersonaData,
  respondentCount: Record<RoleKey, number>
): ScoringResult {
  const roles: RoleKey[] = ['sam', 'prz', 'wsp', 'pod'];

  const competencyScores: CompetencyScore[] = COMPETENCIES.map((comp) => {
    const avgByRole: Record<RoleKey, number> = { sam: 0, prz: 0, wsp: 0, pod: 0 };

    for (const role of roles) {
      const vals = comp.behaviors
        .map((b) => answers[b.id]?.[role])
        .filter((v): v is number => v !== undefined && v > 0);
      avgByRole[role] = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    }

    const othersVals = (['prz', 'wsp', 'pod'] as RoleKey[])
      .map((r) => avgByRole[r])
      .filter((v) => v > 0);
    const avgOthers =
      othersVals.length > 0 ? othersVals.reduce((a, b) => a + b, 0) / othersVals.length : 0;
    const gap = avgByRole.sam - avgOthers;

    const behaviorScores = comp.behaviors.map((b) => {
      const allVals = roles
        .map((r) => answers[b.id]?.[r])
        .filter((v): v is number => v !== undefined && v > 0);
      const avg = allVals.length > 0 ? allVals.reduce((a, b) => a + b, 0) / allVals.length : 0;
      return { id: b.id, text: b.text, avg };
    });

    const sorted = [...behaviorScores].sort((a, b) => b.avg - a.avg);

    return {
      id: comp.id,
      name: comp.name,
      avgByRole,
      avgOthers,
      gap,
      behaviorScores,
      topBehavior: sorted[0] ?? { text: '', avg: 0 },
      bottomBehavior: sorted[sorted.length - 1] ?? { text: '', avg: 0 },
    };
  });

  const sortedByOthers = [...competencyScores].sort((a, b) => b.avgOthers - a.avgOthers);
  const sortedByGap = [...competencyScores].sort((a, b) => b.gap - a.gap);

  return {
    persona,
    respondentCount,
    competencies: competencyScores,
    globalTop: sortedByOthers[0],
    globalBottom: sortedByOthers[sortedByOthers.length - 1],
    biggestGapComp: sortedByGap[0],
  };
}

// Buduje ScoringResult bezpośrednio z DEMO_SCORES — pomija pipeline SurveyAnswers.
// Gwarantuje poprawne wartości gap i role averages.
export function buildDemoResult(
  compScores: Record<string, Record<RoleKey, number>>,
  behaviorScoresFlat: Record<string, number>,
  persona: PersonaData,
  respondentCount: Record<RoleKey, number>
): ScoringResult {
  const competencyScores: CompetencyScore[] = COMPETENCIES.map((comp) => {
    const roleAvg = compScores[comp.id] ?? { sam: 0, prz: 0, wsp: 0, pod: 0 };

    const othersVals = (['prz', 'wsp', 'pod'] as RoleKey[]).map((r) => roleAvg[r]);
    const avgOthers = othersVals.reduce((a, b) => a + b, 0) / othersVals.length;
    const gap = roleAvg.sam - avgOthers;

    const behaviorScores = comp.behaviors.map((b) => ({
      id: b.id,
      text: b.text,
      avg: behaviorScoresFlat[b.id] ?? avgOthers,
    }));

    const sorted = [...behaviorScores].sort((a, b) => b.avg - a.avg);

    return {
      id: comp.id,
      name: comp.name,
      avgByRole: roleAvg as Record<RoleKey, number>,
      avgOthers,
      gap,
      behaviorScores,
      topBehavior: sorted[0] ?? { text: '', avg: 0 },
      bottomBehavior: sorted[sorted.length - 1] ?? { text: '', avg: 0 },
    };
  });

  const sortedByOthers = [...competencyScores].sort((a, b) => b.avgOthers - a.avgOthers);
  const sortedByGap = [...competencyScores].sort((a, b) => b.gap - a.gap);

  return {
    persona,
    respondentCount,
    competencies: competencyScores,
    globalTop: sortedByOthers[0],
    globalBottom: sortedByOthers[sortedByOthers.length - 1],
    biggestGapComp: sortedByGap[0],
  };
}
