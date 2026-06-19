// Model kompetencji SUUS — portowany 1:1 z build_report_v3.py
// Demo: Jan Kowalski, Kierownik Operacyjny Magazynu, Centrum Logistyczne Łódź

export type RoleKey = 'sam' | 'prz' | 'wsp' | 'pod';

export const ROLES: Record<RoleKey, string> = {
  sam: 'Samoocena',
  prz: 'Przełożony',
  wsp: 'Współpracownicy',
  pod: 'Podwładni',
};

export const ROLE_SHORT: Record<RoleKey, string> = {
  sam: 'Sam.',
  prz: 'Przeł.',
  wsp: 'Współp.',
  pod: 'Podwł.',
};

// Kolory perspektyw — granat = dane/otoczenie, pomarańcz = samoocena (zgodnie z legendą)
export const ROLE_COLORS: Record<RoleKey, string> = {
  sam: '#7a00df',
  prz: '#0693e3',
  wsp: '#00d084',
  pod: '#ff6900',
};

// Paleta brandowa Brain Stream + SUUS (1:1 z build_report_v3.py)
export const BRAND = {
  primary: '#7a00df',
  secondary: '#0693e3',
  green: '#00d084',
  orange: '#ff6900',
  dark: '#313131',
  grayMid: '#666666',
  grayLight: '#eeeeee',
  suusNavy: '#003f8a',
  suusGreen: '#7aa83e',
};

export interface Behavior {
  id: string;
  text: string;
  score: number; // średnia ocena z otoczenia dla tego zachowania
}

export interface Competency {
  id: string;
  name: string;
  nameShort: string;
  definition: string;
  color: string;
  behaviors: Behavior[];
}

export const COMPETENCIES: Competency[] = [
  {
    id: 'K1',
    name: 'Kierowanie zespołem operacyjnym',
    nameShort: 'Kierowanie zespołem',
    color: '#003f8a',
    definition:
      'Codzienne zarządzanie pracą zespołu: planowanie zmian, ustalanie priorytetów, kontrola wykonania, dbanie o bezpieczeństwo i jakość operacji magazynowych.',
    behaviors: [
      { id: 'K1B1', text: 'Jasno komunikuje cele dnia / tygodnia każdej zmianie', score: 4.9 },
      { id: 'K1B2', text: 'Adekwatnie rozkłada zadania w zespole', score: 4.7 },
      { id: 'K1B3', text: 'Reaguje na odchylenia od planu w czasie rzeczywistym', score: 5.1 },
      { id: 'K1B4', text: 'Dba o bezpieczeństwo i przestrzeganie procedur BHP', score: 5.2 },
    ],
  },
  {
    id: 'K2',
    name: 'Komunikacja i informacja zwrotna',
    nameShort: 'Komunikacja i feedback',
    color: '#ff6900',
    definition:
      'Udzielanie pracownikom regularnej, konkretnej informacji zwrotnej. Umiejętność prowadzenia trudnych rozmów, słuchania, zadawania pytań oraz zauważania zarówno mocnych stron, jak i obszarów do poprawy.',
    behaviors: [
      { id: 'K2B1', text: 'Udziela regularnej informacji zwrotnej członkom zespołu', score: 3.4 },
      { id: 'K2B2', text: 'Słucha pracowników, zanim podejmie decyzję', score: 3.7 },
      { id: 'K2B3', text: 'Potrafi prowadzić trudne rozmowy bez eskalacji', score: 4.2 },
      { id: 'K2B4', text: 'Docenia dobre wykonanie zadań w sposób zauważalny dla zespołu', score: 3.9 },
    ],
  },
  {
    id: 'K3',
    name: 'Zarządzanie zmianą i adaptacja',
    nameShort: 'Zarządzanie zmianą',
    color: '#7aa83e',
    definition:
      'Wdrażanie nowych procesów, narzędzi i procedur. Umiejętność szybkiej reakcji na zmiany zewnętrzne (klient, wolumeny, regulacje) oraz prowadzenia zespołu przez okresy niepewności.',
    behaviors: [
      { id: 'K3B1', text: 'Szybko adaptuje się do nowych procedur i narzędzi', score: 5.1 },
      { id: 'K3B2', text: 'Wdraża zmiany operacyjne bez utraty ciągłości pracy', score: 4.9 },
      { id: 'K3B3', text: 'Tłumaczy zespołowi sens zmiany, a nie tylko jej zakres', score: 4.5 },
      { id: 'K3B4', text: 'Reaguje konstruktywnie na nieprzewidziane odchylenia', score: 5.0 },
    ],
  },
  {
    id: 'K4',
    name: 'Orientacja na klienta i partnerstwo biznesowe',
    nameShort: 'Orientacja na klienta',
    color: '#0693e3',
    definition:
      'Rozumienie potrzeb klienta wewnętrznego i zewnętrznego, budowanie relacji opartych na zaufaniu, proaktywne rozwiązywanie problemów klienta. W kontekście wartości SUUS: PARTNERSTWO i ONE STEP AHEAD.',
    behaviors: [
      { id: 'K4B1', text: 'Rozumie potrzeby klienta zewnętrznego, a nie tylko wskaźniki operacyjne', score: 4.3 },
      { id: 'K4B2', text: 'Komunikuje się z innymi działami w sposób partnerski, nie transakcyjny', score: 4.0 },
      { id: 'K4B3', text: 'Proaktywnie sygnalizuje ryzyka, zanim pojawią się jako problem', score: 4.6 },
      { id: 'K4B4', text: 'Działa „one step ahead” — uprzedza potrzebę, nie reaguje', score: 4.5 },
    ],
  },
  {
    id: 'K5',
    name: 'Decyzyjność i odpowiedzialność za wynik',
    nameShort: 'Decyzyjność',
    color: '#7a00df',
    definition:
      'Podejmowanie decyzji w warunkach niepewności i niepełnych danych. Branie odpowiedzialności za wynik własny i zespołu. Rozliczalność, transparentność, dotrzymywanie zobowiązań.',
    behaviors: [
      { id: 'K5B1', text: 'Podejmuje decyzje szybko, gdy sytuacja tego wymaga', score: 5.3 },
      { id: 'K5B2', text: 'Bierze odpowiedzialność za wynik zespołu, nie szuka winnych', score: 5.1 },
      { id: 'K5B3', text: 'Komunikuje uzasadnienie decyzji w sposób zrozumiały dla zespołu', score: 4.0 },
      { id: 'K5B4', text: 'Wraca do podjętych decyzji i koryguje je, gdy okazują się błędne', score: 4.2 },
    ],
  },
];

// Predefiniowane wyniki demo (Jan Kowalski) — 1:1 z PDF
export const DEMO_SCORES: Record<string, Record<RoleKey, number>> = {
  K1: { sam: 5.2, prz: 5.0, wsp: 4.6, pod: 4.4 },
  K2: { sam: 4.5, prz: 4.0, wsp: 3.8, pod: 3.4 },
  K3: { sam: 4.8, prz: 5.2, wsp: 4.9, pod: 4.7 },
  K4: { sam: 5.0, prz: 4.8, wsp: 4.3, pod: 4.0 },
  K5: { sam: 5.4, prz: 5.1, wsp: 4.7, pod: 4.2 },
};

// Demo — oceny per zachowanie (z model.behaviors.score, spłaszczone)
export const DEMO_BEHAVIOR_SCORES: Record<string, number> = Object.fromEntries(
  COMPETENCIES.flatMap((c) => c.behaviors.map((b) => [b.id, b.score]))
);

// Histogram rozkładu odpowiedzi 11 respondentów (ROZPROSZENIA z build_report_v3.py)
export const DISTRIBUTIONS: Record<string, Record<number, number>> = {
  K1: { 1: 0, 2: 1, 3: 4, 4: 9, 5: 18, 6: 12 },
  K2: { 1: 2, 2: 6, 3: 12, 4: 14, 5: 8, 6: 2 },
  K3: { 1: 0, 2: 0, 3: 3, 4: 8, 5: 19, 6: 14 },
  K4: { 1: 1, 2: 3, 3: 6, 4: 13, 5: 15, 6: 6 },
  K5: { 1: 0, 2: 2, 3: 5, 4: 10, 5: 17, 6: 10 },
};

// Głosy zespołu — cytat wiodący per kompetencja (sekcja "Głosy zespołu")
export const COMP_VOICES: Record<string, { text: string; author: string }> = {
  K1: { text: 'Operacyjnie jest najlepszy w regionie. Zna magazyn jak własną kieszeń.', author: 'Przełożony' },
  K2: {
    text: 'Brakuje mi konkretnego feedbacku — nie wiem, czy robię dobrze, czy źle. Słyszę tylko, jak coś zawalę.',
    author: 'Podwładny',
  },
  K3: { text: 'Bardzo szybko wdraża nowe procedury, nie boi się zmiany.', author: 'Współpracownik' },
  K4: { text: 'Zawsze dotrzymuje słowa wobec klienta. To rzadkie.', author: 'Współpracownik' },
  K5: {
    text: 'Niezawodny w sytuacjach kryzysowych — gdy jest pożar, wszyscy patrzą na niego. Bierze odpowiedzialność.',
    author: 'Przełożony',
  },
};

// Strefa poziomu kompetencji na podstawie średniej z otoczenia
export function competencyZone(avgOthers: number): string {
  if (avgOthers >= 4.0) return 'MOCNA STRONA';
  if (avgOthers >= 3.0) return 'KONSOLIDACJA';
  return 'OBSZAR ROZWOJU';
}

export const DEMO_PERSONA = {
  name: 'Jan Kowalski',
  position: 'Kierownik Operacyjny Magazynu',
  location: 'Centrum Logistyczne Łódź',
  teamSize: '18 osób (3 liderów zmianowych, 12 magazynierów, 3 operatorów wózków)',
  tenure: '6 lat w SUUS',
  surveyDate: 'marzec 2026',
  respondentCount: 11,
};

export const RESPONDENT_BREAKDOWN: { role: RoleKey; label: string; count: number }[] = [
  { role: 'sam', label: 'Samoocena', count: 1 },
  { role: 'prz', label: 'Przełożony', count: 1 },
  { role: 'wsp', label: 'Współpracownicy z innych działów', count: 4 },
  { role: 'pod', label: 'Pracownicy podlegli', count: 5 },
];
