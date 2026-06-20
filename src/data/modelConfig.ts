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
  { key: 'low', label: 'Trochę za mało', short: 'lekki niedobór', action: 'wzmocnij', color: '#c5e1a5' },
  { key: 'ok', label: 'W sam raz', short: 'optimum', action: 'utrzymaj', color: '#00d084' },
  { key: 'high', label: 'Trochę za dużo', short: 'lekki nadmiar', action: 'odpuść', color: '#ffab40' },
  { key: 'far_high', label: 'Zdecydowanie powyżej normy', short: 'wyraźny nadmiar', action: 'odpuść', color: '#ff5252' },
];

// Opisy per strefa. far_low/far_high opcjonalne — jeśli puste, dziedziczą z low/high.
// Dzięki temu osobno opisujemy "lekko za mało" i "wyraźnie za mało".
export interface BehaviorInterp {
  far_low?: string;      // wyraźny niedobór (jeśli puste, użyje 'low')
  low: string;           // lekki niedobór / za mało
  ok: string;            // w sam raz
  high: string;          // lekki nadmiar / za dużo (dla monotonic nie pokazywana)
  far_high?: string;     // wyraźny nadmiar (jeśli puste, użyje 'high')
}

export interface BehaviorConfig {
  id: string;
  text: string;
  type: BehaviorType;
  target: number;        // docelowe natężenie na skali (np. 4.5 z 6)
  tolerance: number;     // połowa szerokości pasma OK (np. 0.5 → OK = target ± 0.5)
  interp: BehaviorInterp;
}

// Kolory rotowane dla nowych kompetencji.
const NEW_COLORS = ['#7a00df', '#0693e3', '#00d084', '#ff6900', '#003f8a', '#c8442a', '#5b6af0'];

// Tworzy puste zachowanie z neutralnymi domyślnymi.
export function newBehavior(compId: string, n: number): BehaviorConfig {
  return {
    id: `${compId}B${n}`,
    text: 'Nowe zachowanie — wpisz treść',
    type: 'optimal',
    target: 4.5,
    tolerance: 0.6,
    interp: { low: '', ok: '', high: '' },
  };
}

// Tworzy pustą kompetencję z jednym zachowaniem.
export function newCompetency(existing: CompetencyConfig[]): CompetencyConfig {
  const nums = existing.map((c) => parseInt(c.id.replace(/\D/g, ''), 10)).filter((n) => !isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  const id = `K${next}`;
  return {
    id,
    name: 'Nowa kompetencja',
    nameShort: 'Nowa',
    color: NEW_COLORS[(next - 1) % NEW_COLORS.length],
    definition: '',
    behaviors: [newBehavior(id, 1)],
  };
}

// Następny numer zachowania w kompetencji (unikalny).
export function nextBehaviorNum(comp: CompetencyConfig): number {
  const nums = comp.behaviors.map((b) => parseInt(b.id.replace(/^.*B/, ''), 10)).filter((n) => !isNaN(n));
  return (nums.length ? Math.max(...nums) : 0) + 1;
}

// Wybór opisu dokładnie wg strefy, z dziedziczeniem far_* → low/high.
export function interpForState(interp: BehaviorInterp, state: FitnessState): string {
  switch (state) {
    case 'far_low': return interp.far_low?.trim() || interp.low;
    case 'low': return interp.low;
    case 'ok': return interp.ok;
    case 'high': return interp.high;
    case 'far_high': return interp.far_high?.trim() || interp.high;
  }
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
        'Codzienne zarządzanie pracą zespołu. Planuje zmiany, ustala priorytety i sprawdza wykonanie. Dba o bezpieczeństwo i jakość pracy w magazynie.',
      behaviors: [
        {
          id: 'K1B1', text: 'Komunikuje cele dnia i tygodnia każdej zmianie', type: 'optimal', target: 5.0, tolerance: 0.6,
          interp: {
            low: 'Zespół nie zawsze wie, co jest priorytetem dnia. Wprowadź krótki, stały rytm komunikowania celów.',
            ok: 'Cele są jasne i podane w sam raz. Zespół wie, na czym się skupić, i nie czuje się zasypany instrukcjami.',
            high: 'Cele bywają podawane zbyt drobiazgowo. Nadmiar instrukcji odbiera liderom zmianowym przestrzeń na własne decyzje.',
          },
        },
        {
          id: 'K1B2', text: 'Trafnie rozkłada zadania w zespole', type: 'optimal', target: 5.0, tolerance: 0.6,
          interp: {
            low: 'Obciążenie bywa nierówne. Przed startem zmiany sprawdzaj, kto czym jest obłożony.',
            ok: 'Zadania pasują do możliwości zespołu. Obciążenia są dobrze wyważone.',
            high: 'Kierownik za mocno steruje podziałem zadań. Zespół traci poczucie wpływu na własną pracę.',
          },
        },
        {
          id: 'K1B3', text: 'Reaguje na odchylenia od planu na bieżąco', type: 'optimal', target: 4.5, tolerance: 0.6,
          interp: {
            low: 'Odchylenia wychodzą na jaw za późno. Wzmocnij wczesne sygnały, na przykład krótkie check-iny w trakcie zmiany.',
            ok: 'Reakcja na odchylenia jest szybka i pasuje do skali problemu.',
            high: 'Kierownik sam reaguje na każde drobne odchylenie. To utrwala gaszenie pożarów i uzależnia zespół od jednej osoby.',
          },
        },
        {
          id: 'K1B4', text: 'Dba o bezpieczeństwo i przestrzeganie procedur BHP', type: 'monotonic', target: 6.0, tolerance: 0.6,
          interp: {
            low: 'Przestrzeganie procedur bywa nierówne. Tu nie ma miejsca na kompromis. Wzmocnij konsekwencję.',
            ok: 'Bezpieczeństwo i BHP są na pierwszym miejscu i pilnowane konsekwentnie. To fundament stabilnej pracy.',
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
        'Daje pracownikom regularną i konkretną informację zwrotną. Prowadzi trudne rozmowy, słucha i zadaje pytania. Widzi mocne strony i to, co wymaga poprawy.',
      behaviors: [
        {
          id: 'K2B1', text: 'Daje regularną informację zwrotną członkom zespołu', type: 'optimal', target: 4.5, tolerance: 0.6,
          interp: {
            far_low: 'Informacji zwrotnej prawie nie ma. Zespół pracuje bez sygnału, czy robi dobrze, czy źle. To realne ryzyko spadku zaangażowania i odejść.',
            low: 'Informacja zwrotna pojawia się głównie po błędzie. Brakuje pochwał i rozmów rozwojowych.',
            ok: 'Feedback jest regularny i wyważony. Zespół wie, na czym stoi, i nie czuje się stale oceniany.',
            high: 'Feedback bywa zbyt częsty i drobiazgowy. Nadmiar uwag zaciera to, co naprawdę ważne, i męczy zespół.',
            far_high: 'Feedback jest tak intensywny, że zespół przestaje go słyszeć. Ciągłe uwagi do wszystkiego budują napięcie i bezradność.',
          },
        },
        {
          id: 'K2B2', text: 'Słucha pracowników, zanim podejmie decyzję', type: 'optimal', target: 5.0, tolerance: 0.6,
          interp: {
            low: 'Decyzje bywają podejmowane bez wysłuchania zespołu. Zostawiaj świadomie miejsce na głos pracownika.',
            ok: 'Kierownik słucha i bierze pod uwagę głos zespołu w sam raz. Decyzje nie grzęzną.',
            high: 'Za dużo konsultacji spowalnia decyzje i zaciera odpowiedzialność za ostateczny wybór.',
          },
        },
        {
          id: 'K2B3', text: 'Prowadzi trudne rozmowy bez eskalacji', type: 'monotonic', target: 5.5, tolerance: 0.6,
          interp: {
            low: 'Trudne rozmowy bywają odkładane albo eskalują. Wzmocnij strukturę rozmowy korygującej.',
            ok: 'Trudne rozmowy idą spokojnie i bez utraty relacji. To mocna strona w komunikacji.',
            high: '',
          },
        },
        {
          id: 'K2B4', text: 'Docenia dobrą pracę w widoczny sposób', type: 'optimal', target: 4.5, tolerance: 0.6,
          interp: {
            low: 'Dobra praca bywa niezauważona. Wprowadź nawyk konkretnej, codziennej pochwały.',
            ok: 'Docenianie jest konkretne i wiarygodne. Zespół czuje, że dobra praca jest widziana.',
            high: 'Pochwały padają tak często, że tracą wartość. Kto chwali wszystko, nie chwali niczego.',
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
        'Wdraża nowe procesy, narzędzia i procedury. Szybko reaguje na zmiany z zewnątrz, takie jak klient, wolumeny czy przepisy. Prowadzi zespół przez czas niepewności.',
      behaviors: [
        {
          id: 'K3B1', text: 'Dostosowuje się do nowych procedur i narzędzi', type: 'optimal', target: 4.5, tolerance: 0.6,
          interp: {
            low: 'Tempo zmian wyprzedza tempo adaptacji. Testuj nowe rozwiązania wcześniej.',
            ok: 'Tempo adaptacji jest dobre. Szybkie, a zespół zachowuje stabilność.',
            high: 'Nowości wchodzą szybciej, niż zespół jest gotowy. Sprawdzaj, czy ludzie nadążają.',
          },
        },
        {
          id: 'K3B2', text: 'Wdraża zmiany bez przerywania pracy zespołu', type: 'monotonic', target: 5.5, tolerance: 0.6,
          interp: {
            low: 'Zmiany bywają wdrażane kosztem ciągłości pracy. Lepiej zaplanuj okres przejściowy.',
            ok: 'Zmiany wchodzą płynnie, praca się nie zatrzymuje. To wyraźna mocna strona.',
            high: '',
          },
        },
        {
          id: 'K3B3', text: 'Tłumaczy zespołowi sens zmiany, nie tylko jej zakres', type: 'monotonic', target: 5.5, tolerance: 0.6,
          interp: {
            low: 'Komunikat o zmianie mówi, co i jak, ale pomija dlaczego. Przez to zmiany nie utrwalają się na dłużej.',
            ok: 'Sens zmiany jest jasny. Zespół rozumie kontekst, nie tylko zakres.',
            high: '',
          },
        },
        {
          id: 'K3B4', text: 'Reaguje spokojnie na nieprzewidziane sytuacje', type: 'monotonic', target: 5.0, tolerance: 0.6,
          interp: {
            low: 'Nieprzewidziane sytuacje rodzą napięcie. Wzmocnij spokojną reakcję krok po kroku.',
            ok: 'Reakcja na nieprzewidziane jest spokojna i pomocna. Stabilizuje zespół w niepewności.',
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
        'Rozumie potrzeby klienta wewnętrznego i zewnętrznego. Buduje relacje oparte na zaufaniu i sam rozwiązuje problemy. Wprost odwołuje się do wartości SUUS: partnerstwo i one step ahead.',
      behaviors: [
        {
          id: 'K4B1', text: 'Rozumie potrzeby klienta, nie tylko wskaźniki', type: 'monotonic', target: 5.5, tolerance: 0.6,
          interp: {
            low: 'Wskaźniki operacyjne przesłaniają perspektywę klienta. Częściej pytaj, co dana liczba znaczy dla klienta.',
            ok: 'Potrzeby klienta są dobrze rozumiane i widać je w codziennych decyzjach.',
            high: '',
          },
        },
        {
          id: 'K4B2', text: 'Rozmawia z innymi działami po partnersku', type: 'optimal', target: 5.0, tolerance: 0.6,
          interp: {
            low: 'Inne działy odbierają współpracę jako czysto transakcyjną. Buduj relacje także poza bieżącymi sprawami.',
            ok: 'Współpraca z innymi działami jest partnerska i oparta na zaufaniu.',
            high: 'Relacje międzydziałowe pochłaniają czas potrzebny własnemu zespołowi. Pilnuj równowagi.',
          },
        },
        {
          id: 'K4B3', text: 'Sygnalizuje ryzyka, zanim staną się problemem', type: 'optimal', target: 4.5, tolerance: 0.6,
          interp: {
            low: 'Ryzyka wychodzą dopiero jako gotowy problem. Wzmocnij wczesne ostrzeganie.',
            ok: 'Ryzyka idą w sam raz. Wcześnie, ale bez siania paniki.',
            high: 'Zbyt częste alarmy o ryzykach osłabiają ich wagę. Partnerzy przestają reagować na kolejny sygnał.',
          },
        },
        {
          id: 'K4B4', text: 'Działa one step ahead, uprzedza potrzebę', type: 'optimal', target: 4.5, tolerance: 0.6,
          interp: {
            low: 'Działanie bywa reaktywne. Buduj nawyk wyprzedzania potrzeb klienta i działów.',
            ok: 'Dobra równowaga między wyprzedzaniem potrzeb a tym, co naprawdę potrzebne.',
            high: 'Część działań idzie na zapas, pod potrzeby, których nie ma. To rozprasza zasoby.',
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
        'Podejmuje decyzje w niepewności i przy niepełnych danych. Bierze odpowiedzialność za wynik swój i zespołu. Działa rozliczalnie, otwarcie i dotrzymuje zobowiązań.',
      behaviors: [
        {
          id: 'K5B1', text: 'Podejmuje decyzje szybko, gdy sytuacja tego wymaga', type: 'optimal', target: 4.5, tolerance: 0.6,
          interp: {
            far_low: 'Decyzje grzęzną. Zespół czeka, procesy stoją. Brak decyzji spowalnia całą operację.',
            low: 'Decyzje bywają odkładane i spowalniają zespół. Oddziel decyzje odwracalne, które mogą być szybkie, od nieodwracalnych.',
            ok: 'Tempo decyzji jest trafne. Szybkie tam, gdzie trzeba, ostrożne przy sprawach nieodwracalnych.',
            high: 'Decyzje bywają zbyt pochopne. Pośpiech zamiast rozmowy buduje dystans i grozi błędem.',
            far_high: 'Decyzje zapadają błyskawicznie i bez rozmowy. Zespół gubi kierunek i traci poczucie wpływu na to, co się dzieje.',
          },
        },
        {
          id: 'K5B2', text: 'Bierze odpowiedzialność za wynik zespołu, nie szuka winnych', type: 'monotonic', target: 5.5, tolerance: 0.6,
          interp: {
            low: 'Odpowiedzialność bywa rozmywana. Bierz wynik na siebie, zwłaszcza w trudnych chwilach.',
            ok: 'Kierownik bierze odpowiedzialność za wynik zespołu. To fundament zaufania i poczucia bezpieczeństwa.',
            high: '',
          },
        },
        {
          id: 'K5B3', text: 'Wyjaśnia powód decyzji zrozumiale dla zespołu', type: 'monotonic', target: 5.5, tolerance: 0.6,
          interp: {
            low: 'Zespół zna decyzje, ale nie zawsze wie, dlaczego zapadły. Dodawaj powód, nie tylko treść decyzji.',
            ok: 'Powód decyzji jest jasny. Zespół rozumie kontekst i czuje się włączony.',
            high: '',
          },
        },
        {
          id: 'K5B4', text: 'Wraca do decyzji i poprawia je, gdy okazują się błędne', type: 'optimal', target: 4.5, tolerance: 0.6,
          interp: {
            low: 'Błędne decyzje bywają utrzymywane za długo. Wprowadź krótką retrospektywę decyzji.',
            ok: 'Dobra równowaga. Poprawia błędy i nie podważa własnej decyzyjności.',
            high: 'Zbyt częste zmiany decyzji rozmywają kierunek. Zespół przestaje wierzyć w trwałość ustaleń.',
          },
        },
      ],
    },
  ],
};
