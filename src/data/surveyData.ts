// Dane kampanii badania, kto ma oceniać menadżera, kto już uzupełnił, kto nie.
// Demo: fikcyjne persony (RODO). Statusy przypomnień zapisywane w localStorage,
// żeby panel pokazywał, że dane trwają i można do nich wracać.
import type { RoleKey } from './modelConfig';

export interface Respondent {
  id: string;
  name: string;
  email: string;
  role: RoleKey;
  reason: string;       // dlaczego ta osoba ocenia (kontekst dla admina)
  completed: boolean;
  completedAt?: string; // data uzupełnienia (demo)
}

export interface SurveyCampaign {
  managerId: string;
  managerName: string;
  position: string;
  location: string;
  surveyDate: string;
  deadline: string;
  respondents: Respondent[];
}

// Demo kampania dla Jana Kowalskiego, 1 samoocena + 1 przełożony + 5 współpracowników + 7 podwładnych.
export const DEMO_CAMPAIGN: SurveyCampaign = {
  managerId: 'jan-kowalski',
  managerName: 'Jan Kowalski',
  position: 'Kierownik Operacyjny Magazynu',
  location: 'Centrum Logistyczne Łódź',
  surveyDate: 'marzec 2026',
  deadline: '31 marca 2026',
  respondents: [
    { id: 'r-sam', name: 'Jan Kowalski', email: 'jan.kowalski@firma.example', role: 'sam', reason: 'Samoocena, punkt odniesienia dla luki percepcji.', completed: true, completedAt: '12 marca' },

    { id: 'r-prz', name: 'Marek Adamczyk', email: 'm.adamczyk@firma.example', role: 'prz', reason: 'Bezpośredni przełożony (Dyrektor Regionu), ocenia decyzyjność i partnerstwo biznesowe.', completed: true, completedAt: '13 marca' },

    { id: 'r-wsp1', name: 'Anna Lewicka', email: 'a.lewicka@firma.example', role: 'wsp', reason: 'Kierownik Transportu, codzienna współpraca międzydziałowa.', completed: true, completedAt: '14 marca' },
    { id: 'r-wsp2', name: 'Tomasz Górski', email: 't.gorski@firma.example', role: 'wsp', reason: 'Kierownik Obsługi Klienta, partnerstwo przy realizacji zleceń.', completed: true, completedAt: '15 marca' },
    { id: 'r-wsp3', name: 'Katarzyna Woś', email: 'k.wos@firma.example', role: 'wsp', reason: 'Kierownik Jakości, wspólne procesy kontroli i reklamacji.', completed: true, completedAt: '14 marca' },
    { id: 'r-wsp4', name: 'Piotr Zając', email: 'p.zajac@firma.example', role: 'wsp', reason: 'Kierownik IT, wdrożenia systemów magazynowych.', completed: false },
    { id: 'r-wsp5', name: 'Magdalena Król', email: 'm.krol@firma.example', role: 'wsp', reason: 'Kierownik BHP, bezpieczeństwo operacji.', completed: false },

    { id: 'r-pod1', name: 'Lider zmiany A', email: 'lider.a@firma.example', role: 'pod', reason: 'Lider zmiany porannej, bezpośrednia podległość, ocenia delegowanie i feedback.', completed: true, completedAt: '13 marca' },
    { id: 'r-pod2', name: 'Lider zmiany B', email: 'lider.b@firma.example', role: 'pod', reason: 'Lider zmiany popołudniowej, ocenia komunikację międzyzmianową.', completed: true, completedAt: '14 marca' },
    { id: 'r-pod3', name: 'Lider zmiany C', email: 'lider.c@firma.example', role: 'pod', reason: 'Lider zmiany nocnej, ocenia dostępność i decyzyjność kierownika.', completed: true, completedAt: '16 marca' },
    { id: 'r-pod4', name: 'Magazynier senior', email: 'mag.1@firma.example', role: 'pod', reason: 'Magazynier z najdłuższym stażem, perspektywa doświadczonego pracownika.', completed: true, completedAt: '15 marca' },
    { id: 'r-pod5', name: 'Magazynier', email: 'mag.2@firma.example', role: 'pod', reason: 'Magazynier, perspektywa szeregowego pracownika operacji.', completed: true, completedAt: '17 marca' },
    { id: 'r-pod6', name: 'Operator wózka', email: 'op.1@firma.example', role: 'pod', reason: 'Operator wózka widłowego, ocenia organizację pracy i BHP.', completed: false },
    { id: 'r-pod7', name: 'Magazynier (nowy)', email: 'mag.3@firma.example', role: 'pod', reason: 'Pracownik z krótkim stażem, perspektywa wdrożenia i komunikacji dla nowych.', completed: false },
  ],
};

// Szablon przypomnienia do skopiowania (mail wysyła człowiek, nie aplikacja).
export function reminderText(r: Respondent, c: SurveyCampaign): string {
  const why = r.reason.replace(/\.$/, '').replace(/, /g, ', ');
  return `Temat: Przypomnienie o ankiecie 360° dla ${c.managerName} (termin ${c.deadline})

Cześć,

prosimy o wypełnienie krótkiej ankiety 360°, która ocenia pracę ${c.managerName} (${c.position}).
Twoja perspektywa jest ważna, bo ${why.charAt(0).toLowerCase() + why.slice(1)}.

Ankieta zajmuje około 8 minut i jest w pełni poufna. Wyniki raportujemy zbiorczo, bez wskazywania pojedynczych odpowiedzi.
Termin wypełnienia to ${c.deadline}.

Link do ankiety: [wklej link]

Dziękujemy,
zespół Brain Stream`;
}

// Persystencja statusu przypomnień w localStorage.
const REM_KEY = 'bs360_reminders';

export function loadReminders(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(REM_KEY) || '{}'); } catch { return {}; }
}
export function saveReminder(respondentId: string, whenIso: string): void {
  const all = loadReminders();
  all[respondentId] = whenIso;
  localStorage.setItem(REM_KEY, JSON.stringify(all));
}
