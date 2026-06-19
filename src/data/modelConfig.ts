// Model konfiguracyjny 360° — punkty przegięcia / matryca trafności.
// Rdzeń USP: kompetencja nie jest "im więcej tym lepiej", tylko ma OPTIMUM.
// Zachowanie może być: za mało / OK / za dużo. Admin kalibruje target i interpretacje.
// Cały model jest danymi (config), edytowalnymi w panelu admina i zapisywanymi w localStorage.

export type RoleKey = 'sam' | 'prz' | 'wsp' | 'pod';

export interface RoleConfig {
  key: RoleKey;
  label: string;       // pełna nazwa
  short: string;       // skrót do tabel
  color: string;       // kolor perspektywy
  isSelf: boolean;     // samoocena (nie wchodzi do "otoczenia")
  maxCount: number;    // maksymalna liczba respondentów w tej roli
}

export const ROLE_DEFS: RoleConfig[] = [
  { key: 'sam', label: 'Samoocena', short: 'Sam.', color: '#7a00df', isSelf: true, maxCount: 1 },
  { key: 'prz', label: 'Przełożony', short: 'Przeł.', color: '#0693e3', isSelf: false, maxCount: 1 },
  { key: 'wsp', label: 'Współpracownicy', short: 'Współp.', color: '#00d084', isSelf: false, maxCount: 7 },
  { key: 'pod', label: 'Podwładni', short: 'Podwł.', color: '#ff6900', isSelf: false, maxCount: 7 },
];

// Typ zachowania: optymalne (środek = OK, da się przegiąć) lub monotoniczne (więcej = lepiej).
export type BehaviorType = 'optimal' | 'monotonic';

// Stan trafności po porównaniu wyniku z targetem.
export type FitnessState = 'far_low' | 'low' | 'ok' | 'high' | 'far_high';

// Strefa trafności — pięć obszarów z edytowalnymi nazwami. Kalibrowane w panelu admina.
export interface ZoneConfig {
  key: FitnessState;
  label: string;   // pełna nazwa, np. "Zdecydowanie poniżej normy"
  short: string;   // krótka etykieta do badge, np. "wyraźny niedobór"
  action: string;  // kierunek pracy: wzmocnij / utrzymaj / odpuść
  color: string;   // kolor strefy
}

export const DEFAULT_ZONES: ZoneConfig[] = [
  { key: 'far_low', label: 'Zdecydowanie poniżej normy', short: 'wyraźny niedobór', action: 'wzmocnij', color: '#9ccc65' },
  { key: 'low', label: 'Za mało, ale w skali', short: 'lekki niedobór', action: 'wzmocnij', color: '#c5e1a5' },
  { key: 'ok', label: 'W sam raz', short: 'optimum', action: 'utrzymaj', color: '#00d084' },
  { key: 'high', label: 'Za dużo, ale w skali', short: 'lekki nadmiar', action: 'odpuść', color: '#ffab40' },
  { key: 'far_high', label: 'Zdecydowanie powyżej normy', short: 'wyraźny nadmiar', action: 'odpuść', color: '#ff5252' },
];

export interface BehaviorConfig {
  id: string;
  text: string;
  type: BehaviorType;
  target: number;        // docelowe natężenie na skali (np. 4.5 z 6)
  tolerance: number;     // połowa szerokości pasma OK (np. 0.5 → OK = target ± 0.5)
  interp: {
    low: string;         // interpretacja "za mało"
    ok: string;          // interpretacja "w sam raz"
    high: string;        // interpretacja "za dużo" (dla monotonic zwykle nie pokazywana)
  };
}

export interface CompetencyConfig {
  id: string;
  name: string;
  nameShort: string;
  color: string;
  definition: string;
  behaviors: BehaviorConfig[];
}

export interface ScaleConfig {
  min: number;           // dolna granica skali natężenia
  max: number;           // górna granica
  labels: string[];      // opisy stopni skali (min..max)
  zones: ZoneConfig[];   // pięć stref trafności (edytowalne nazwy)
}

export interface ModelConfig {
  version: number;
  clientName: string;
  scale: ScaleConfig;
  roles: RoleConfig[];
  competencies: CompetencyConfig[];
}

// ─────────────────────────────────────────────────────────────────────────────
// DOMYŚLNY MODEL SUUS — 5 kompetencji × 4 zachowania, skalibrowany na trafność.
// Skala natężenia 1-6: respondent ocenia "jak często / jak intensywnie".
// target = optymalne natężenie. Miks optimal / monotonic pokazuje USP punktów przegięcia.
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_SCALE: ScaleConfig = {
  min: 1,
  max: 6,
  labels: [
    'Zdecydowanie za rzadko / nigdy',
    'Za rzadko',
    'Raczej rzadko',
    'Raczej często',
    'Często',
    'Bardzo często / w każdej sytuacji',
  ],
  zones: DEFAULT_ZONES,
};

export const DEFAULT_MODEL: ModelConfig = {
  version: 1,
  clientName: 'SUUS Logistics',
  scale: DEFAULT_SCALE,
  roles: ROLE_DEFS,
  competencies: [
    {
      id: 'K1',
      name: 'Kierowanie zespołem operacyjnym',
      nameShort: 'Kierowanie zespołem',
      color: '#003f8a',
      definition:
        'Codzienne zarządzanie pracą zespołu: planowanie zmian, ustalanie priorytetów, kontrola wykonania, dbanie o bezpieczeństwo i jakość operacji magazynowych.',
      behaviors: [
        {
          id: 'K1B1', text: 'Komunikuje cele dnia / tygodnia każdej zmianie', type: 'optimal', target: 5.0, tolerance: 0.6,
          interp: {
            low: 'Zespół nie zawsze wie, co jest priorytetem dnia. Warto wprowadzić stały, krótki rytm komunikowania celów.',
            ok: 'Cele są komunikowane jasno i w sam raz. Zespół wie, na czym się skupić, bez poczucia przeciążenia instrukcjami.',
            high: 'Komunikat celów bywa zbyt drobiazgowy. Nadmiar instrukcji odbiera liderom zmianowym przestrzeń decyzyjną.',
          },
        },
        {
          id: 'K1B2', text: 'Adekwatnie rozkłada zadania w zespole', type: 'optimal', target: 5.0, tolerance: 0.6,
          interp: {
            low: 'Obciążenie bywa nierówne. Warto świadomie przeglądać, kto czym jest obłożony przed startem zmiany.',
            ok: 'Zadania rozłożone trafnie do możliwości zespołu. Dobra równowaga obciążeń.',
            high: 'Rozkład zadań bywa nadmiernie sterowany przez kierownika. Zespół traci poczucie sprawczości w organizacji własnej pracy.',
          },
        },
        {
          id: 'K1B3', text: 'Reaguje na odchylenia od planu w czasie rzeczywistym', type: 'optimal', target: 4.5, tolerance: 0.6,
          interp: {
            low: 'Odchylenia bywają wyłapywane za późno. Warto wzmocnić wczesne sygnały (krótkie check-iny w trakcie zmiany).',
            ok: 'Reakcja na odchylenia jest szybka i proporcjonalna do skali problemu.',
            high: 'Kierownik reaguje na każde drobne odchylenie osobiście. To utrwala gaszenie pożarów i zależność zespołu od jednej osoby.',
          },
        },
        {
          id: 'K1B4', text: 'Dba o bezpieczeństwo i przestrzeganie procedur BHP', type: 'monotonic', target: 6.0, tolerance: 0.6,
          interp: {
            low: 'Przestrzeganie procedur bywa nierówne. To obszar bez kompromisów — warto wzmocnić konsekwencję.',
            ok: 'Bezpieczeństwo i BHP są traktowane priorytetowo i konsekwentnie. Fundament stabilności operacji.',
            high: '',
          },
        },
      ],
    },
    {
      id: 'K2',
      name: 'Komunikacja i informacja zwrotna',
      nameShort: 'Komunikacja i feedback',
      color: '#ff6900',
      definition:
        'Udzielanie pracownikom regularnej, konkretnej informacji zwrotnej. Umiejętność prowadzenia trudnych rozmów, słuchania, zadawania pytań oraz zauważania mocnych stron i obszarów do poprawy.',
      behaviors: [
        {
          id: 'K2B1', text: 'Udziela regularnej informacji zwrotnej członkom zespołu', type: 'optimal', target: 4.5, tolerance: 0.6,
          interp: {
            low: 'Informacja zwrotna pojawia się głównie jako reakcja na błąd. Brakuje rytmu feedbacku pozytywnego i rozwojowego.',
            ok: 'Feedback jest regularny i proporcjonalny. Zespół wie, na czym stoi, bez poczucia ciągłej oceny.',
            high: 'Feedback bywa zbyt częsty i drobiazgowy. Nadmiar uwag rozmywa to, co naprawdę ważne, i męczy zespół.',
          },
        },
        {
          id: 'K2B2', text: 'Słucha pracowników, zanim podejmie decyzję', type: 'optimal', target: 5.0, tolerance: 0.6,
          interp: {
            low: 'Decyzje bywają podejmowane bez wysłuchania zespołu. Warto świadomie zostawiać przestrzeń na głos pracownika.',
            ok: 'Kierownik słucha i uwzględnia głos zespołu w sam raz — bez paraliżu decyzyjnego.',
            high: 'Nadmiar konsultacji potrafi spowalniać decyzje i rozmywać odpowiedzialność za ostateczny wybór.',
          },
        },
        {
          id: 'K2B3', text: 'Potrafi prowadzić trudne rozmowy bez eskalacji', type: 'monotonic', target: 5.5, tolerance: 0.6,
          interp: {
            low: 'Trudne rozmowy bywają odkładane lub eskalują. Warto wzmocnić strukturę rozmowy korygującej.',
            ok: 'Trudne rozmowy prowadzone są spokojnie i bez utraty relacji. Mocna strona komunikacyjna.',
            high: '',
          },
        },
        {
          id: 'K2B4', text: 'Docenia dobre wykonanie zadań w sposób zauważalny', type: 'optimal', target: 4.5, tolerance: 0.6,
          interp: {
            low: 'Dobre wykonanie bywa niezauważone. Warto wprowadzić nawyk konkretnej, codziennej pochwały.',
            ok: 'Docenianie jest konkretne i wiarygodne. Zespół czuje, że dobra praca jest widziana.',
            high: 'Pochwały bywają tak częste, że tracą wartość. Docenianie wszystkiego oznacza docenianie niczego.',
          },
        },
      ],
    },
    {
      id: 'K3',
      name: 'Zarządzanie zmianą i adaptacja',
      nameShort: 'Zarządzanie zmianą',
      color: '#7aa83e',
      definition:
        'Wdrażanie nowych procesów, narzędzi i procedur. Szybka reakcja na zmiany zewnętrzne (klient, wolumeny, regulacje) oraz prowadzenie zespołu przez okresy niepewności.',
      behaviors: [
        {
          id: 'K3B1', text: 'Adaptuje się do nowych procedur i narzędzi', type: 'optimal', target: 4.5, tolerance: 0.6,
          interp: {
            low: 'Adaptacja bywa wolniejsza niż wymaga tego tempo zmian. Warto wcześniej testować nowe rozwiązania.',
            ok: 'Tempo adaptacji jest dobre — szybkie, ale nie kosztem stabilności zespołu.',
            high: 'Tempo wdrażania nowości bywa szybsze niż gotowość zespołu. Warto sprawdzać, czy ludzie nadążają.',
          },
        },
        {
          id: 'K3B2', text: 'Wdraża zmiany operacyjne bez utraty ciągłości pracy', type: 'monotonic', target: 5.5, tolerance: 0.6,
          interp: {
            low: 'Zmiany bywają wdrażane kosztem ciągłości pracy. Warto wzmocnić planowanie okresu przejściowego.',
            ok: 'Zmiany wdrażane płynnie, bez utraty ciągłości operacji. Wyraźna mocna strona.',
            high: '',
          },
        },
        {
          id: 'K3B3', text: 'Tłumaczy zespołowi sens zmiany, a nie tylko jej zakres', type: 'monotonic', target: 5.5, tolerance: 0.6,
          interp: {
            low: 'Komunikat zmiany koncentruje się na "co" i "jak", pomijając "dlaczego". To osłabia trwałość wdrożeń.',
            ok: 'Sens zmiany jest komunikowany jasno. Zespół rozumie kontekst, nie tylko zakres.',
            high: '',
          },
        },
        {
          id: 'K3B4', text: 'Reaguje konstruktywnie na nieprzewidziane odchylenia', type: 'monotonic', target: 5.0, tolerance: 0.6,
          interp: {
            low: 'Nieprzewidziane sytuacje bywają źródłem napięcia. Warto wzmocnić spokojną, ustrukturyzowaną reakcję.',
            ok: 'Reakcja na nieprzewidziane jest spokojna i konstruktywna. Stabilizuje zespół w niepewności.',
            high: '',
          },
        },
      ],
    },
    {
      id: 'K4',
      name: 'Orientacja na klienta i partnerstwo biznesowe',
      nameShort: 'Orientacja na klienta',
      color: '#0693e3',
      definition:
        'Rozumienie potrzeb klienta wewnętrznego i zewnętrznego, budowanie relacji opartych na zaufaniu, proaktywne rozwiązywanie problemów. W kontekście wartości SUUS: PARTNERSTWO i ONE STEP AHEAD.',
      behaviors: [
        {
          id: 'K4B1', text: 'Rozumie potrzeby klienta zewnętrznego, nie tylko wskaźniki', type: 'monotonic', target: 5.5, tolerance: 0.6,
          interp: {
            low: 'Perspektywa klienta bywa przesłonięta wskaźnikami operacyjnymi. Warto częściej pytać "co to znaczy dla klienta".',
            ok: 'Potrzeby klienta są dobrze rozumiane i obecne w codziennych decyzjach.',
            high: '',
          },
        },
        {
          id: 'K4B2', text: 'Komunikuje się z innymi działami partnersko, nie transakcyjnie', type: 'optimal', target: 5.0, tolerance: 0.6,
          interp: {
            low: 'Współpraca międzydziałowa bywa odbierana jako transakcyjna. Warto budować relacje poza bieżącymi sprawami.',
            ok: 'Współpraca z innymi działami jest partnerska i oparta na zaufaniu.',
            high: 'Czas na relacje międzydziałowe bywa kosztem własnego zespołu. Warto pilnować równowagi.',
          },
        },
        {
          id: 'K4B3', text: 'Proaktywnie sygnalizuje ryzyka, zanim staną się problemem', type: 'optimal', target: 4.5, tolerance: 0.6,
          interp: {
            low: 'Ryzyka bywają zgłaszane dopiero jako problem. Warto wzmocnić wczesne ostrzeganie.',
            ok: 'Ryzyka są sygnalizowane w sam raz — wcześnie, ale bez nadmiernego alarmizmu.',
            high: 'Zbyt częste sygnalizowanie ryzyk osłabia ich wagę. Partnerzy przestają reagować na "kolejny alarm".',
          },
        },
        {
          id: 'K4B4', text: 'Działa „one step ahead” — uprzedza potrzebę, nie reaguje', type: 'optimal', target: 4.5, tolerance: 0.6,
          interp: {
            low: 'Działanie bywa reaktywne. Warto budować nawyk wyprzedzania potrzeb klienta i działów.',
            ok: 'Dobra równowaga między wyprzedzaniem potrzeb a realnym zapotrzebowaniem.',
            high: 'Wyprzedzanie potrzeb bywa robione na zapas, na potrzeby, których nie ma. To rozprasza zasoby.',
          },
        },
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
        {
          id: 'K5B1', text: 'Podejmuje decyzje szybko, gdy sytuacja tego wymaga', type: 'optimal', target: 4.5, tolerance: 0.6,
          interp: {
            low: 'Decyzje bywają odkładane, co spowalnia zespół. Warto rozróżniać decyzje odwracalne (szybkie) od nieodwracalnych.',
            ok: 'Tempo decyzji jest trafne — szybkie tam, gdzie trzeba, rozważne przy sprawach nieodwracalnych.',
            high: 'Decyzje bywają zbyt pochopne. Szybkość kosztem konsultacji buduje dystans i ryzyko błędu.',
          },
        },
        {
          id: 'K5B2', text: 'Bierze odpowiedzialność za wynik zespołu, nie szuka winnych', type: 'monotonic', target: 5.5, tolerance: 0.6,
          interp: {
            low: 'Odpowiedzialność bywa rozmywana. Warto wzmocnić branie wyniku na siebie, zwłaszcza w trudnych sytuacjach.',
            ok: 'Kierownik bierze odpowiedzialność za wynik zespołu. Fundament zaufania i bezpieczeństwa.',
            high: '',
          },
        },
        {
          id: 'K5B3', text: 'Komunikuje uzasadnienie decyzji zrozumiale dla zespołu', type: 'monotonic', target: 5.5, tolerance: 0.6,
          interp: {
            low: 'Zespół zna decyzje, ale nie zawsze rozumie ich powód („wiem co, ale nie wiem dlaczego”). Warto dodać „dlaczego”.',
            ok: 'Uzasadnienie decyzji jest komunikowane jasno. Zespół rozumie kontekst i czuje się włączony.',
            high: '',
          },
        },
        {
          id: 'K5B4', text: 'Wraca do decyzji i koryguje je, gdy okazują się błędne', type: 'optimal', target: 4.5, tolerance: 0.6,
          interp: {
            low: 'Błędne decyzje bywają utrzymywane zbyt długo. Warto wprowadzić krótką retrospektywę decyzji.',
            ok: 'Dobra równowaga: korygowanie błędów bez podważania własnej decyzyjności.',
            high: 'Zbyt częste rewidowanie decyzji osłabia poczucie kierunku. Zespół przestaje ufać trwałości ustaleń.',
          },
        },
      ],
    },
  ],
};
