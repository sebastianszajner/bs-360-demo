// Treść przewodnika dla przełożonego — jak prowadzić rozmowę rozwojową na bazie raportu 360.
// Pytania coachingowe dobierane do stanu kompetencji (luka percepcji, za mało, za dużo).

export const SUPERVISOR_INTRO = [
  'Ten przewodnik jest dla Ciebie jako przełożonego. Raport 360 to nie ocena, lecz materiał do rozmowy. Twoja rola nie polega na tym, by przekazać wyniki, ale by pomóc menedżerowi samodzielnie zobaczyć, co z nich wynika.',
  'Zasada jest jedna: więcej pytań niż tez. Im więcej menedżer sam nazwie, tym większa szansa, że coś zmieni. Twoje zdania zostawiaj na koniec, gdy on już powie swoje.',
];

// Jak czytać luki — krótki słownik dla przełożonego.
export const SUPERVISOR_READING = [
  ['Luka dodatnia (widzi siebie wyżej niż zespół)', 'Najczęstszy wzorzec. Nie znaczy „zawyża". Znaczy, że intencja nie zawsze dociera. Pytaj o konkretne sytuacje, nie o wynik.'],
  ['Luka ujemna (zespół widzi go wyżej niż on sam)', 'Niedoceniana mocna strona. Warto ją nazwać i utrwalić — menedżerowie rzadko o niej wiedzą.'],
  ['Zachowanie przegięte (za dużo)', 'Mocna strona zrobiona w nadmiarze. Tu nie chodzi o „rób więcej", tylko o wyważenie. To trudniejsza rozmowa niż o deficycie.'],
] as const;

// Pytania coachingowe per stan zachowania/kompetencji.
export const COACHING_QUESTIONS: Record<string, string[]> = {
  gap_high: [
    'Jak myślisz, jak ten obszar ocenia Twój zespół? Skąd może brać się różnica między Twoim a ich spojrzeniem?',
    'Przypomnij sobie konkretną sytuację z ostatnich dwóch tygodni. Co zrobiłeś, a jak mogło to zostać odebrane?',
    'Co musiałoby się stać, żeby zespół zobaczył to tak jak Ty?',
  ],
  too_low: [
    'Co utrudnia Ci robienie tego częściej? Czego potrzebowałbyś, żeby to weszło w rytm?',
    'Gdyby to zachowanie pojawiało się dwa razy częściej, co zmieniłoby się w zespole?',
    'Jaki najmniejszy pierwszy krok mógłbyś zrobić już w tym tygodniu?',
  ],
  too_high: [
    'Kiedy tego bywa za dużo? Po czym poznajesz, że przeginasz?',
    'Co by się stało, gdybyś w tym obszarze odpuścił o 20 procent? Kto by zyskał?',
    'Gdzie ta mocna strona pomaga, a gdzie zaczyna przeszkadzać zespołowi?',
  ],
  ok: [
    'To obszar w równowadze. Co konkretnie robisz, że to działa? Jak to świadomie utrzymać?',
    'Czego inni mogliby się od Ciebie w tym nauczyć?',
  ],
};

export const SUPERVISOR_STRUCTURE = [
  ['Cel (5 min)', 'Zapytaj, co menedżer wyniósł z raportu sam. „Co Cię najbardziej zastanowiło?". Nie zaczynaj od swoich wniosków.'],
  ['Rzeczywistość (15 min)', 'Wejdźcie w jeden, najwyżej dwa obszary. Pytaj o konkretne sytuacje, nie o liczby. Słuchaj dłużej, niż mówisz.'],
  ['Opcje (15 min)', 'Niech menedżer sam wymieni, co mógłby zrobić inaczej. Dopiero gdy się zatrzyma, dorzuć jedną swoją obserwację.'],
  ['Zobowiązanie (10 min)', 'Jeden konkretny krok na najbliższy tydzień. Zapisany, z terminem. Umówcie krótki follow-up za 30 dni.'],
] as const;

export const SUPERVISOR_WATCHOUTS = [
  'Nie czytaj raportu na głos. Menedżer już go widział. Twoja wartość to rozmowa, nie streszczenie.',
  'Nie broń zespołu i nie broń menedżera. Trzymaj się tego, co mówią dane i jego własne słowa.',
  'Nie wychodź z pięcioma zadaniami. Jeden krok wdrożony bije pięć obiecanych.',
  'Nie zamieniaj rozmowy rozwojowej w ocenę roczną. To dwie różne rozmowy, w dwóch różnych dniach.',
];
