// Silnik trafności — serce modelu "punktów przegięcia".
// Bierze surowe natężenie (1-6) z odpowiedzi respondentów i porównuje z targetem
// skalibrowanym przez admina. Zwraca: odchył, stan (za mało/OK/za dużo), trafność %,
// pozycję na suwaku 5-stopniowym i interpretację zależną od kierunku odchyłu.

import type {
  ModelConfig, CompetencyConfig, BehaviorConfig, RoleKey, FitnessState, ZoneConfig,
} from '../data/modelConfig';
import { DEFAULT_ZONES } from '../data/modelConfig';

// Mapa stref: stan → konfiguracja strefy (etykieta, kolor, akcja). Z modelu lub domyślna.
export type ZoneMap = Record<FitnessState, ZoneConfig>;

export function buildZoneMap(zones?: ZoneConfig[]): ZoneMap {
  const map = {} as ZoneMap;
  for (const z of DEFAULT_ZONES) map[z.key] = z;       // domyślne jako fallback
  if (zones) for (const z of zones) if (z?.key) map[z.key] = z;
  return map;
}

export const DEFAULT_ZONE_MAP: ZoneMap = buildZoneMap();

// Surowe odpowiedzi: behaviorId → rola → lista natężeń (1-6) od respondentów tej roli.
export type RawAnswers = Record<string, Partial<Record<RoleKey, number[]>>>;

// Ile osób odpowiedziało per rola.
export type RespondentCounts = Record<RoleKey, number>;

export interface BehaviorFitness {
  id: string;
  text: string;
  type: BehaviorConfig['type'];
  target: number;
  tolerance: number;
  avgIntensity: number;     // średnie natężenie z otoczenia (bez samooceny)
  selfIntensity: number;    // natężenie samooceny
  deviation: number;        // avgIntensity - target (znak = kierunek odchyłu)
  state: FitnessState;      // far_low | low | ok | high | far_high
  fitnessPct: number;       // 0-100, jak blisko optimum (100 = w punkcie)
  sliderPos: number;        // 0-100, pozycja markera na suwaku za mało↔za dużo
  interpretation: string;   // tekst zależny od stanu
  byRole: Partial<Record<RoleKey, number>>; // średnie natężenie per rola
}

export interface CompetencyFitness {
  id: string;
  name: string;
  nameShort: string;
  color: string;
  definition: string;
  behaviors: BehaviorFitness[];
  avgByRole: Record<RoleKey, number>;
  avgOthers: number;        // średnia otoczenia (bez samooceny)
  selfAvg: number;
  perceptionGap: number;    // samoocena - otoczenie (klasyczna luka percepcji)
  fitnessPct: number;       // średnia trafność kompetencji
  state: FitnessState;      // dominujący stan kompetencji
  offTargetCount: number;   // ile zachowań poza pasmem OK
}

export interface FitnessResult {
  competencies: CompetencyFitness[];
  respondentCounts: RespondentCounts;
  totalRespondents: number;
  globalFitnessPct: number;
  topFit: CompetencyFitness;       // najbliżej optimum
  bottomFit: CompetencyFitness;    // najdalej od optimum
  biggestGap: CompetencyFitness;   // największa luka percepcji
}

const OTHERS: RoleKey[] = ['prz', 'wsp', 'pod'];

function mean(xs: number[]): number {
  const v = xs.filter((x) => x > 0);
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0;
}

// Stan trafności na podstawie odchyłu od targetu i typu zachowania.
function classify(beh: BehaviorConfig, avg: number): FitnessState {
  const dev = avg - beh.target;
  const tol = beh.tolerance;
  if (beh.type === 'monotonic') {
    // tylko "za mało" ma sens; powyżej targetu = OK
    if (avg >= beh.target - tol) return 'ok';
    if (avg >= beh.target - tol * 2.2) return 'low';
    return 'far_low';
  }
  // optimal: odchył w obie strony
  if (Math.abs(dev) <= tol) return 'ok';
  if (dev < 0) return dev >= -tol * 2.2 ? 'low' : 'far_low';
  return dev <= tol * 2.2 ? 'high' : 'far_high';
}

// Trafność 0-100: 100 w punkcie target (lub w paśmie dla monotonic powyżej targetu).
function fitnessPercent(beh: BehaviorConfig, avg: number): number {
  const span = beh.target - 1; // maksymalny sensowny odchył w dół do dolnej granicy
  if (beh.type === 'monotonic') {
    if (avg >= beh.target) return 100;
    return Math.max(0, Math.round((1 - (beh.target - avg) / Math.max(span, 0.1)) * 100));
  }
  const dev = Math.abs(avg - beh.target);
  const maxDev = Math.max(beh.target - 1, 6 - beh.target, 0.1);
  return Math.max(0, Math.round((1 - dev / maxDev) * 100));
}

// Pozycja markera 0-100 na suwaku "za mało ↔ za dużo". Środek (50) = target.
function sliderPosition(beh: BehaviorConfig, avg: number, scaleMin: number, scaleMax: number): number {
  // mapuje natężenie na 0-100 względem skali, target ląduje w 50
  const below = beh.target - scaleMin;
  const above = scaleMax - beh.target;
  if (avg <= beh.target) {
    const t = below > 0 ? (avg - scaleMin) / below : 1;
    return Math.round(t * 50);
  }
  const t = above > 0 ? (avg - beh.target) / above : 0;
  return Math.round(50 + t * 50);
}

function pickInterp(beh: BehaviorConfig, state: FitnessState): string {
  if (state === 'ok') return beh.interp.ok;
  if (state === 'low' || state === 'far_low') return beh.interp.low;
  return beh.interp.high || beh.interp.ok;
}

function scoreBehavior(beh: BehaviorConfig, answers: RawAnswers, model: ModelConfig): BehaviorFitness {
  const cell = answers[beh.id] ?? {};
  const byRole: Partial<Record<RoleKey, number>> = {};
  for (const role of model.roles) {
    const vals = cell[role.key];
    if (vals && vals.length) byRole[role.key] = mean(vals);
  }
  const othersVals = OTHERS.flatMap((r) => cell[r] ?? []);
  const avgIntensity = mean(othersVals);
  const selfIntensity = mean(cell.sam ?? []);
  const state = classify(beh, avgIntensity);
  return {
    id: beh.id,
    text: beh.text,
    type: beh.type,
    target: beh.target,
    tolerance: beh.tolerance,
    avgIntensity,
    selfIntensity,
    deviation: +(avgIntensity - beh.target).toFixed(2),
    state,
    fitnessPct: fitnessPercent(beh, avgIntensity),
    sliderPos: sliderPosition(beh, avgIntensity, model.scale.min, model.scale.max),
    interpretation: pickInterp(beh, state),
    byRole,
  };
}

// Ogólny stan kompetencji: kierunek wg przewagi odchyłów, siła wg udziału poza pasmem.
// (Nie bierze najgorszego zachowania, żeby badge nie był zbyt alarmujący przy dobrym profilu.)
function dominantState(behs: BehaviorFitness[]): FitnessState {
  const offTarget = behs.filter((b) => b.state !== 'ok');
  if (offTarget.length === 0) return 'ok';
  const tooHigh = behs.filter((b) => b.state === 'high' || b.state === 'far_high').length;
  const tooLow = behs.filter((b) => b.state === 'low' || b.state === 'far_low').length;
  const ratio = offTarget.length / behs.length;
  const strong = ratio >= 0.6; // większość zachowań poza pasmem
  if (tooHigh > tooLow) return strong ? 'far_high' : 'high';
  return strong ? 'far_low' : 'low';
}

function scoreCompetency(comp: CompetencyConfig, answers: RawAnswers, model: ModelConfig): CompetencyFitness {
  const behaviors = comp.behaviors.map((b) => scoreBehavior(b, answers, model));

  const avgByRole = { sam: 0, prz: 0, wsp: 0, pod: 0 } as Record<RoleKey, number>;
  for (const role of model.roles) {
    const vals = behaviors.map((b) => b.byRole[role.key]).filter((v): v is number => v != null && v > 0);
    avgByRole[role.key] = vals.length ? +mean(vals).toFixed(2) : 0;
  }
  const othersAvgs = OTHERS.map((r) => avgByRole[r]).filter((v) => v > 0);
  const avgOthers = othersAvgs.length ? +mean(othersAvgs).toFixed(2) : 0;
  const selfAvg = avgByRole.sam;
  const fitnessPct = Math.round(mean(behaviors.map((b) => b.fitnessPct)));

  return {
    id: comp.id,
    name: comp.name,
    nameShort: comp.nameShort,
    color: comp.color,
    definition: comp.definition,
    behaviors,
    avgByRole,
    avgOthers,
    selfAvg,
    perceptionGap: +(selfAvg - avgOthers).toFixed(2),
    fitnessPct,
    state: dominantState(behaviors),
    offTargetCount: behaviors.filter((b) => b.state !== 'ok').length,
  };
}

export function computeFitness(model: ModelConfig, answers: RawAnswers, counts: RespondentCounts): FitnessResult {
  const competencies = model.competencies.map((c) => scoreCompetency(c, answers, model));
  const byFit = [...competencies].sort((a, b) => b.fitnessPct - a.fitnessPct);
  const byGap = [...competencies].sort((a, b) => Math.abs(b.perceptionGap) - Math.abs(a.perceptionGap));
  const total = (Object.values(counts) as number[]).reduce((a, b) => a + b, 0);

  return {
    competencies,
    respondentCounts: counts,
    totalRespondents: total,
    globalFitnessPct: Math.round(mean(competencies.map((c) => c.fitnessPct))),
    topFit: byFit[0],
    bottomFit: byFit[byFit.length - 1],
    biggestGap: byGap[0],
  };
}

// Domyślne etykiety/kolory/akcje wyprowadzone z DEFAULT_ZONE_MAP — fallback,
// gdy komponent nie dostał edytowanych stref z modelu.
const STATES: FitnessState[] = ['far_low', 'low', 'ok', 'high', 'far_high'];
export const STATE_LABEL = Object.fromEntries(STATES.map((s) => [s, DEFAULT_ZONE_MAP[s].label])) as Record<FitnessState, string>;
export const STATE_SHORT = Object.fromEntries(STATES.map((s) => [s, DEFAULT_ZONE_MAP[s].short])) as Record<FitnessState, string>;
export const STATE_COLOR = Object.fromEntries(STATES.map((s) => [s, DEFAULT_ZONE_MAP[s].color])) as Record<FitnessState, string>;
export const STATE_ACTION = Object.fromEntries(STATES.map((s) => [s, DEFAULT_ZONE_MAP[s].action])) as Record<FitnessState, string>;
