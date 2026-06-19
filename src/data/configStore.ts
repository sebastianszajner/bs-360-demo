// Przechowywanie modelu konfiguracyjnego w localStorage.
// Panel admina zapisuje tu zmiany; raport i ankieta czytają aktualny model.
import { DEFAULT_MODEL, DEFAULT_ZONES, type ModelConfig } from './modelConfig';

const STORAGE_KEY = 'bs360_model_v1';

// Migracja modeli z localStorage zapisanych przed dodaniem stref.
function migrate(m: ModelConfig): ModelConfig {
  if (!m.scale.zones || m.scale.zones.length < 5) {
    m.scale.zones = structuredClone(DEFAULT_ZONES);
  }
  return m;
}

export function loadModel(): ModelConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_MODEL);
    const parsed = JSON.parse(raw) as ModelConfig;
    // prosta walidacja kształtu
    if (!parsed.competencies || !parsed.scale || !parsed.roles) return structuredClone(DEFAULT_MODEL);
    return migrate(parsed);
  } catch {
    return structuredClone(DEFAULT_MODEL);
  }
}

export function lastSavedAt(): string | null {
  return localStorage.getItem(STORAGE_KEY + '_savedAt');
}

export function saveModel(model: ModelConfig, savedAtIso?: string): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(model));
  if (savedAtIso) localStorage.setItem(STORAGE_KEY + '_savedAt', savedAtIso);
}

export function resetModel(): ModelConfig {
  localStorage.removeItem(STORAGE_KEY);
  return structuredClone(DEFAULT_MODEL);
}

export function exportModelJSON(model: ModelConfig): string {
  return JSON.stringify(model, null, 2);
}

export function importModelJSON(json: string): ModelConfig {
  const parsed = JSON.parse(json) as ModelConfig;
  if (!parsed.competencies || !parsed.scale || !parsed.roles) {
    throw new Error('Niepoprawny model: brakuje competencies / scale / roles.');
  }
  return parsed;
}
