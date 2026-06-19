// Model kompetencji SUUS — portowany z build_report_v3.py
// Demo: Jan Kowalski, Kierownik Operacyjny Magazynu, Centrum Logistyczne Łódź

export type RoleKey = 'sam' | 'prz' | 'wsp' | 'pod';

export const ROLES: Record<RoleKey, string> = {
  sam: 'Samoocena',
  prz: 'Przełożony',
  wsp: 'Współpracownicy',
  pod: 'Podwładni',
};

export const ROLE_COLORS: Record<RoleKey, string> = {
  sam: '#7a00df',
  prz: '#0693e3',
  wsp: '#00d084',
  pod: '#ff6900',
};

export interface Behavior {
  id: string;
  text: string;
}

export interface Competency {
  id: string;
  name: string;
  nameShort: string;
  definition: string;
  behaviors: Behavior[];
}

export const COMPETENCIES: Competency[] = [
  {
    id: 'K1',
    name: 'Kierowanie zespołem operacyjnym',
    nameShort: 'Kierowanie zespołem',
    definition:
      'Codzienne zarządzanie pracą zespołu: planowanie zmian, ustalanie priorytetów, kontrola wykonania, dbanie o bezpieczeństwo i jakość operacji magazynowych.',
    behaviors: [
      { id: 'K1B1', text: 'Jasno komunikuje cele dnia / tygodnia każdej zmianie' },
      { id: 'K1B2', text: 'Adekwatnie rozkłada zadania w zespole' },
      { id: 'K1B3', text: 'Reaguje na odchylenia od planu w czasie rzeczywistym' },
      { id: 'K1B4', text: 'Dba o bezpieczeństwo i przestrzeganie procedur BHP' },
    ],
  },
  {
    id: 'K2',
    name: 'Komunikacja i feedback rozwojowy',
    nameShort: 'Komunikacja i feedback',
    definition:
      'Jakość codziennej komunikacji z zespołem: udzielanie informacji zwrotnej, słuchanie, jasność oczekiwań, budowanie otwartości.',
    behaviors: [
      { id: 'K2B1', text: 'Regularnie udziela konkretnej informacji zwrotnej' },
      { id: 'K2B2', text: 'Aktywnie słucha i zadaje pytania' },
      { id: 'K2B3', text: 'Jasno komunikuje oczekiwania co do wyników' },
      { id: 'K2B4', text: 'Tworzy przestrzeń, w której ludzie mogą zgłaszać problemy' },
    ],
  },
  {
    id: 'K3',
    name: 'Zarządzanie zmianą i adaptacja',
    nameShort: 'Zarządzanie zmianą',
    definition:
      'Skuteczne prowadzenie zespołu przez zmiany operacyjne, nowe procedury i transformacje. Własna otwartość na zmiany i gotowość do adaptacji.',
    behaviors: [
      { id: 'K3B1', text: 'Sprawnie wdraża nowe procedury bez utraty ciągłości pracy' },
      { id: 'K3B2', text: 'Wyjaśnia zespołowi cel i sens zmiany' },
      { id: 'K3B3', text: 'Działa stabilnie i spokojnie w sytuacjach niepewności' },
      { id: 'K3B4', text: 'Wspiera innych w adaptacji do nowych warunków' },
    ],
  },
  {
    id: 'K4',
    name: 'Orientacja na klienta i partnerstwo biznesowe',
    nameShort: 'Orientacja na klienta',
    definition:
      'Jakość współpracy z klientami wewnętrznymi i zewnętrznymi. Aktywne budowanie relacji z innymi działami i dbałość o potrzeby klienta.',
    behaviors: [
      { id: 'K4B1', text: 'Rozumie i uwzględnia potrzeby klienta zewnętrznego' },
      { id: 'K4B2', text: 'Buduje relacje partnerskie z innymi działami w SUUS' },
      { id: 'K4B3', text: 'Proaktywnie informuje o odchyleniach i ryzykach' },
      { id: 'K4B4', text: 'Szuka wspólnych rozwiązań, nie tylko broni swoich interesów' },
    ],
  },
  {
    id: 'K5',
    name: 'Decyzyjność i odpowiedzialność za wynik',
    nameShort: 'Decyzyjność',
    definition:
      'Jakość podejmowania decyzji: tempo, odwaga, klarowność uzasadnienia. Branie odpowiedzialności za wyniki — własne i zespołu.',
    behaviors: [
      { id: 'K5B1', text: 'Podejmuje decyzje operacyjne sprawnie i terminowo' },
      { id: 'K5B2', text: 'Wyjaśnia uzasadnienie decyzji zespołowi' },
      { id: 'K5B3', text: 'Bierze odpowiedzialność za wyniki zespołu' },
      { id: 'K5B4', text: 'W sytuacjach kryzysowych działa szybko i skutecznie' },
    ],
  },
];

// Predefiniowane wyniki demo (Jan Kowalski) — załadowane gdy klik "Demo"
export const DEMO_SCORES: Record<string, Record<RoleKey, number>> = {
  K1: { sam: 5.2, prz: 5.0, wsp: 4.6, pod: 4.4 },
  K2: { sam: 4.5, prz: 4.0, wsp: 3.8, pod: 3.4 },
  K3: { sam: 4.8, prz: 5.2, wsp: 4.9, pod: 4.7 },
  K4: { sam: 5.0, prz: 4.8, wsp: 4.3, pod: 4.0 },
  K5: { sam: 5.4, prz: 5.1, wsp: 4.7, pod: 4.2 },
};

// Demo — odpowiedzi per zachowanie
export const DEMO_BEHAVIOR_SCORES: Record<string, number> = {
  K1B1: 4.9, K1B2: 4.7, K1B3: 5.1, K1B4: 5.2,
  K2B1: 3.8, K2B2: 4.1, K2B3: 4.2, K2B4: 3.6,
  K3B1: 5.0, K3B2: 4.7, K3B3: 5.2, K3B4: 4.9,
  K4B1: 4.4, K4B2: 4.3, K4B3: 4.5, K4B4: 4.2,
  K5B1: 5.1, K5B2: 4.5, K5B3: 5.3, K5B4: 5.2,
};

export const DEMO_PERSONA = {
  name: 'Jan Kowalski',
  position: 'Kierownik Operacyjny Magazynu',
  location: 'Centrum Logistyczne Łódź',
  teamSize: '18 osób (3 liderów zmianowych, 12 magazynierów, 3 operatorów wózków)',
  tenure: '6 lat w SUUS',
  surveyDate: 'marzec 2026',
  respondentCount: 11,
};
