// Silnik rekomendacji — portowany z recommendations_full_v2.py
// Uproszczony dla demo: 2 kluczowe rekomendacje per kompetencja + analiza globalna

export interface Recommendation {
  title: string;
  body: string;
  actions: string[];
  indicators: string[];
}

export interface CompetencyRec {
  intro: string;
  direction: string;
  keyRec: Recommendation;
  secondRec: Recommendation;
  watchFor: string[];
}

export type CompetencyRecs = Record<string, CompetencyRec>;

// Generuje rekomendacje dynamicznie na podstawie wyników
export function generateRecs(
  competencyId: string,
  avgSelf: number,
  avgOthers: number,
  _lowestRole: string
): CompetencyRec {
  const gap = avgSelf - avgOthers;
  const isHigh = avgOthers >= 4.7;
  const isMedium = avgOthers >= 4.0 && avgOthers < 4.7;
  const isLow = avgOthers < 4.0;
  const bigGap = gap > 0.7;

  const recs: Record<string, CompetencyRec> = {
    K1: {
      intro: isHigh
        ? `Wynik w obszarze kierowania zespołem operacyjnym wskazuje na sprawnego operacyjnie kierownika, dobrze ocenianego przez wszystkie grupy. Jednocześnie różnica między samooceną (${avgSelf.toFixed(1)}) a oceną zespołu podległego (${avgOthers.toFixed(1)}) sugeruje, że sprawność może nie zostawiać zespołowi przestrzeni na samodzielność.`
        : `Wynik w obszarze kierowania zespołem (średnia inna niż samoocena: ${avgSelf.toFixed(1)} vs ${avgOthers.toFixed(1)}) wskazuje na obszar wymagający uwagi. ${bigGap ? 'Różnica powyżej 0,7 punktu to sygnał, że intencja nie przekłada się w pełni na odbiór.' : ''}`,
      direction:
        'Rekomenduje się rozwijanie tej kompetencji poprzez świadome delegowanie odpowiedzialności do liderów zmianowych, regularny rytm spotkań indywidualnych oraz spójność komunikatów między zmianami.',
      keyRec: {
        title: 'Wprowadź cykliczne spotkania indywidualne z liderami zmianowymi',
        body: 'Kluczowym elementem rozwojowym jest wprowadzenie stałych, trzydziestominutowych spotkań z każdym liderem zmianowym — co tydzień, ta sama godzina, trzy punkty agendy: co działa, co nie działa, jaka jedna decyzja operacyjna pozostaje w rękach lidera. Po sześciu tygodniach takiej praktyki wzrośnie samodzielność liderów i spadnie liczba decyzji eskalowanych do kierownika.',
        actions: [
          'Zaplanuj spotkania indywidualne z 3 liderami zmianowymi (co tydzień, 30 min, stała godzina)',
          'Wprowadź trzy punkty agendy: co działa / co nie działa / jedna decyzja w rękach lidera',
          'Zanotuj wyniki każdego spotkania i śledź tendencje przez 6 tygodni',
        ],
        indicators: [
          'Wzrost liczby decyzji podejmowanych samodzielnie przez liderów (cel: min. 3 na tydzień)',
          'Spadek liczby spraw eskalowanych do kierownika w sytuacjach standardowych',
          'Liderzy oceniają swój poziom samodzielności wyżej po 6 tygodniach',
        ],
      },
      secondRec: {
        title: 'Stwórz wspólny dashboard dnia jako narzędzie komunikacji między zmianami',
        body: 'Brak spójności komunikatów między zmianami to jeden z sygnałów ujawniających się w wynikach. Jedno wspólne miejsce (tablica lub plik) z pięcioma kluczowymi wskaźnikami (wolumen, błędy, opóźnienia, BHP) aktualizowanym przed każdą odprawą wyrównuje obraz pracy między grupami.',
        actions: [
          'Stwórz jeden fizyczny lub elektroniczny dashboard z 5 wskaźnikami dnia',
          'Ustal format odprawy zmianowej: 10 minut, 4 punkty (priorytet / ryzyko / BHP / pozytyw)',
          'Wprowadź zasadę, że dashboard jest aktualizowany przed każdą zmianą',
        ],
        indicators: [
          'Spójna informacja między zmianami — brak rozbieżności w relacjach liderów',
          'Kierownik postrzegany jako osoba budująca samodzielność, nie centrum decyzyjne',
        ],
      },
      watchFor: [
        'Czy decyzje operacyjne są podejmowane przez kierownika z nawyku, czy z realnej konieczności?',
        'Czy liderzy zmianowi otrzymują jasny zakres autonomii decyzyjnej?',
        'Czy odprawy zmianowe są rytuałem porządkującym, czy okazjonalnymi spotkaniami?',
      ],
    },

    K2: {
      intro: isLow
        ? `Wynik w obszarze komunikacji i feedbacku jest najniższy w całym raporcie — co wymaga traktowania tego obszaru jako najwyższego priorytetu rozwojowego. Luka ${bigGap ? `wynosząca ${gap.toFixed(1)} punktu między samooceną a oceną podwładnych` : ''} wskazuje, że Jan nie w pełni zdaje sobie sprawę, jak jego styl komunikacji jest odbierany przez zespół.`
        : isMedium
        ? `Wynik w obszarze komunikacji i feedbacku (${avgOthers.toFixed(1)}/6) wskazuje na obszar o dużym potencjale wzrostu. Różnica między samooceną (${avgSelf.toFixed(1)}) a oceną otoczenia sygnalizuje, że istotne działania komunikacyjne mogą nie być wystarczająco widoczne dla zespołu.`
        : `Wynik w obszarze komunikacji jest dobry (${avgOthers.toFixed(1)}/6), jednak zawsze warto utrzymywać i rozwijać jakość informacji zwrotnej jako fundament kultury zespołu.`,
      direction:
        'Rekomenduje się potraktowanie obszaru komunikacji i feedbacku jako priorytetu i skoncentrowanie działań na trzech wymiarach: regularności pochwał, strukturze rozmów korygujących oraz tworzeniu przestrzeni na głos pracownika.',
      keyRec: {
        title: 'Wprowadź codzienną zasadę jednej konkretnej pochwały',
        body: 'Każdego dnia roboczego, do godziny czternastej, Jan podchodzi do jednej osoby z zespołu i mówi konkretnie, co ta osoba zrobiła dobrze. Konkret = imię + opis zachowania + wpływ na wynik lub zespół. Zero ogólnych formuł ("dobra robota"). Po czterech tygodniach takiej praktyki kultura zespołu zaczyna się zmieniać — ludzie wiedzą, że dobre rzeczy są zauważane.',
        actions: [
          'Codziennie do 14:00 — jedna konkretna pochwała dla jednej osoby z zespołu',
          'Format: imię + konkretne zachowanie + jego wpływ na zespół / wynik / klienta',
          'Unikaj formuł ogólnych: "dobra robota", "świetnie" — to nie niesie informacji',
        ],
        indicators: [
          '3 z 5 zapytanych osób pamięta konkretną pochwałę z ostatniego miesiąca',
          'Wzrost subiektywnego poczucia bycia docenianym w zespole',
          'Mniej sygnałów braku feedbacku w nieformalnych rozmowach',
        ],
      },
      secondRec: {
        title: 'Wprowadź strukturę rozmowy korygującej: Sytuacja-Zachowanie-Wpływ',
        body: 'Przy rozmowie korygującej stosuj stałą strukturę trzech elementów: (1) opis sytuacji — kiedy i gdzie, (2) opis konkretnego zachowania — co dokładnie, (3) opis wpływu — co to oznaczało dla zespołu lub klienta. Ta struktura zajmuje trzydzieści sekund dłużej, ale daje pracownikowi obraz "co konkretnie zmienić".',
        actions: [
          'Każda rozmowa korygująca: sytuacja + zachowanie + wpływ — w tej kolejności',
          'Zanim zaczniesz, wymień konkretny fakt (nie "zawsze", nie "nigdy")',
          'Zakończ pytaniem: "co zrobimy inaczej następnym razem?"',
        ],
        indicators: [
          'Pracownicy po rozmowie korygującej wiedzą, co konkretnie zmienić (weryfikuj po tygodniu)',
          'Spadek liczby powtarzających się tych samych błędów po rozmowie korygującej',
        ],
      },
      watchFor: [
        'Czy informacja zwrotna istnieje wyłącznie jako reakcja na błąd, czy jest codzienną praktyką?',
        'Czy zespół pamięta konkretną pochwałę z ostatniego miesiąca?',
        'Czy nowi pracownicy rozumieją skróty komunikacyjne, których używasz pod presją?',
      ],
    },

    K3: {
      intro: isHigh
        ? `Zarządzanie zmianą i adaptacja to mocna strona — wynik (${avgOthers.toFixed(1)}/6) jest jednym z najwyższych w badaniu. Co istotne, w tej kompetencji otoczenie ocenia Jana wyżej niż on sam siebie — rzadki sygnał, że jego wpływ jest bardziej doceniany, niż się spodziewał.`
        : `Wynik w obszarze zarządzania zmianą (${avgOthers.toFixed(1)}/6) wskazuje na solidną bazę, którą warto świadomie wzmacniać i rozwijać.`,
      direction:
        'Przy wysokim wyniku działania nie powinny "naprawiać" kompetencji, lecz ją utrwalać i świadomie skalować. Kluczowe: wzmocnienie komunikacji "dlaczego" przy zmianach oraz włączanie liderów w fazę projektowania zmiany.',
      keyRec: {
        title: 'Komunikuj sens zmiany ("dlaczego") — nie tylko zakres i termin',
        body: 'Silną stroną jest wdrażanie zmian bez utraty ciągłości pracy. Jeden konkretny element do wzmocnienia: komunikowanie sensu i kontekstu biznesowego każdej zmiany. Przy każdej kolejnej zmianie zacznij od jednego zdania zaczynającego się od słowa "ponieważ". Zespół, który rozumie sens zmiany, wdraża ją trwalej — nie wraca do starych nawyków po pierwszych dwóch tygodniach.',
        actions: [
          'Każdą zmianę operacyjną zaczynaj od zdania "ponieważ..." (kontekst biznesowy)',
          'Stwórz jednostronicową "kartę zmiany": tytuł / kogo dotyczy / co / dlaczego / do kogo z pytaniami',
          'Karta wisi przy odprawach zmianowych przez pierwsze 2 tygodnie po wdrożeniu',
        ],
        indicators: [
          '70% zespołu potrafi powtórzyć powód zmiany własnymi słowami po 2 tygodniach',
          'Zmiana nie tylko wdrożona, ale zakotwiczona — brak powrotów do starych nawyków',
        ],
      },
      secondRec: {
        title: 'Włącz liderów zmianowych w projektowanie — nie tylko wdrożenie',
        body: 'Przed każdą większą zmianą zorganizuj godzinny warsztat z liderami zmianowymi: co może nie zadziałać, co najbardziej zaboli pracowników w pierwszym tygodniu, co byśmy zrobili lepiej. Zespół przynosi obserwacje, których kierownik nie widzi zza biurka. A liderzy stają się sojusznikami w czasie wdrożenia.',
        actions: [
          'Przed każdą większą zmianą: godzinny warsztat z 2-3 liderami zmianowymi',
          'Trzy pytania startowe: co może nie zadziałać / co zaboli / co zrobimy lepiej',
          'Zanotuj min. 2 uwagi, które uwzględnisz w planie wdrożenia',
        ],
        indicators: [
          'Min. 2 uwagi liderów uwzględnione w fazie projektowania każdej zmiany',
          'Liderzy postrzegani przez zespół jako ambasadorzy zmiany, nie tylko wykonawcy',
        ],
      },
      watchFor: [
        'Czy zespół rozumie powód zmiany, czy jedynie wykonuje jej zakres?',
        'Czy tempo wdrażania odpowiada gotowości zespołu, czy jest pochodną Twojego tempa?',
        'Czy wysoka kompetencja jest dzielona z innymi liderami w organizacji?',
      ],
    },

    K4: {
      intro: `Wynik w obszarze orientacji na klienta i partnerstwa (${avgOthers.toFixed(1)}/6) ujawnia asymetrię: ${bigGap ? `przełożony ocenia wyżej niż podwładni — luka ${gap.toFixed(1)} punktu. ` : ''}Współpraca z innymi działami jest odbierana jako bardziej transakcyjna niż partnerska — dotrzymujesz zobowiązań, ale niekoniecznie budujesz wspólne rozwiązania.`,
      direction:
        'Rekomenduje się świadome przesunięcie z modelu "mój magazyn i inni" do modelu "jeden ekosystem klienta". Trzy kierunki: regularny rytm spotkań z innymi działami, proaktywna komunikacja z opiekunami klientów, włączanie głosu klienta do codziennej pracy zespołu.',
      keyRec: {
        title: 'Wprowadź miesięczne spotkania z kierownikami z innych działów',
        body: 'Jedno spotkanie miesięcznie z kierownikiem z innego działu (transport, obsługa klienta, jakość, IT) — po kolei, rotacyjnie. Bez agendy operacyjnej. Pytanie startowe: "co w mojej pracy ułatwia ci życie, a co utrudnia?". Notowanie odpowiedzi i wprowadzanie konkretnych ulepszeń buduje partnerstwo, którego dziś brakuje.',
        actions: [
          'Zaplanuj 4 spotkania na kolejny kwartał: po jednym z transportem, obsługą klienta, jakością, IT',
          'Format: 30 minut, bez agendy operacyjnej, pytanie startowe + 2-3 odpowiedzi do działania',
          'Po każdym spotkaniu: jeden konkretny krok do zrobienia w ciągu 2 tygodni',
        ],
        indicators: [
          '4 spotkania z innymi działami w skali roku',
          'Kierownicy z innych działów oceniają Jana jako partnera, nie tylko "operatora"',
        ],
      },
      secondRec: {
        title: 'Raz w tygodniu podziel się z zespołem informacją od klienta',
        body: 'Raz w tygodniu, podczas odprawy zmianowej, Jan dzieli się jedną konkretną rzeczą, którą klient powiedział o pracy zespołu — pochwałą, uwagą, oczekiwaniem. Konkret + imię klienta. Jedno zdanie. Po kilku tygodniach tej praktyki abstrakcyjny "klient" staje się konkretną osobą z konkretną reakcją — i zespół pracuje z innym poziomem świadomości.',
        actions: [
          'Co tydzień na odprawie: jedna informacja od klienta (pochwała / uwaga / oczekiwanie)',
          'Zawsze konkret: co dokładnie klient powiedział, którego klienta dotyczy',
          'Pytaj opiekuna handlowego raz w tygodniu o jeden sygnał z terenu',
        ],
        indicators: [
          'Zespół potrafi przytoczyć ostatnią pozytywną informację od klienta',
          'Wzrost liczby inicjatyw i usprawnień zgłaszanych przez pracowników pod kątem klienta',
        ],
      },
      watchFor: [
        'Czy język rozmów z innymi działami jest partnerski czy transakcyjny?',
        'Czy byłeś u realnego klienta zewnętrznego w ostatnich 12 miesiącach?',
        'Czy zespół słyszy głos klienta w codziennej pracy, czy tylko gdy pojawia się reklamacja?',
      ],
    },

    K5: {
      intro: `Wynik w obszarze decyzyjności i odpowiedzialności (${avgOthers.toFixed(1)}/6) wskazuje na wysoką odwagę decyzyjną. Jednocześnie ${bigGap ? `luka ${gap.toFixed(1)} punktu między samooceną (${avgSelf.toFixed(1)}) a oceną podwładnych jest najwyższą w całym raporcie. ` : ''}Zespół ufa decyzjom, ale nie zawsze czuje się włączony w ich powstawanie i nie zawsze rozumie uzasadnienie.`,
      direction:
        'Rekomenduje się rozwijanie decyzyjności w trzech wymiarach: świadomego komunikowania uzasadnienia decyzji, rozróżniania decyzji odwracalnych i nieodwracalnych oraz włączania liderów w decyzje dotyczące zespołu.',
      keyRec: {
        title: 'Wprowadź trzyzdaniowy komunikat decyzji jako standard',
        body: 'Po każdej istotnej decyzji wpływającej na pracę zespołu: trzy zdania. (1) Co decyduję. (2) Dlaczego (krótkie uzasadnienie lub alternatywy, które rozważałem). (3) Co ta decyzja oznacza dla zespołu. Komunikat na czacie, tablicy lub ustnie podczas odprawy. Sześćdziesiąt sekund. Po trzydziestu dniach odbiór decyzji zmienia się z "znowu szef zdecydował" na "rozumiem, dlaczego".',
        actions: [
          'Każda istotna decyzja = 3 zdania: co decyduję / dlaczego / co to oznacza dla zespołu',
          'Kanał: grupowy czat, tablica przy odprawach, lub ustnie na pre-shifcie',
          'Zanotuj przez 2 tygodnie, ile decyzji zakomunikowałeś w tym formacie',
        ],
        indicators: [
          'Każda decyzja wpływająca na zespół zakomunikowana w formacie 3 zdań',
          'Wzrost subiektywnego poczucia włączenia w decyzje w badaniu follow-up',
          '"Wiem co i wiem dlaczego" — zmiana narracji w pytaniach otwartych',
        ],
      },
      secondRec: {
        title: 'Rozróżniaj decyzje odwracalne i nieodwracalne — i działaj inaczej',
        body: 'Dziś Jan traktuje wszystkie decyzje z podobną wagą, co spowalnia tempo przy drobnych sprawach i może niedostatecznie konsultować sprawy poważne. Decyzje nieodwracalne (zwolnienie, zobowiązanie wobec klienta) — więcej czasu i konsultacji. Decyzje odwracalne (układ stanowisk, format raportu) — szybko, eksperymentalnie, samodzielnie.',
        actions: [
          'Przed każdą decyzją zadaj sobie pytanie: czy ta decyzja jest odwracalna, czy nie?',
          'Decyzje odwracalne: podejmuj szybko, informuj po fakcie',
          'Decyzje nieodwracalne: konsultuj min. z 2 osobami, zanim zdecydujesz',
        ],
        indicators: [
          'Szybsze tempo decyzji operacyjnych (odwracalnych) — mniej "wiszących" tematów',
          'Wyższy poziom konsultacji przy decyzjach długofalowych',
        ],
      },
      watchFor: [
        'Czy zespół rozumie powód decyzji, czy widzi tylko jej skutek?',
        'Czy decyzje odwracalne są podejmowane z taką samą wagą jak nieodwracalne?',
        'Czy liderzy zmianowi są pytani o opinię przed decyzjami dotyczącymi ich pracy?',
      ],
    },
  };

  return recs[competencyId] || recs['K1'];
}

// Analiza globalna — generowana dynamicznie na podstawie profilu wyników
export function generateGlobalAnalysis(
  scores: Record<string, Record<string, number>>
): {
  summary: string;
  strengths: { title: string; desc: string }[];
  developments: { title: string; desc: string }[];
  keyInsight: string;
} {
  const competencyNames: Record<string, string> = {
    K1: 'Kierowanie zespołem',
    K2: 'Komunikacja i feedback',
    K3: 'Zarządzanie zmianą',
    K4: 'Orientacja na klienta',
    K5: 'Decyzyjność',
  };

  // Oblicz średnią innych (bez samooceny) per kompetencja
  const othersAvg: Record<string, number> = {};
  const gaps: Record<string, number> = {};
  for (const [kid, roleScores] of Object.entries(scores)) {
    const selfScore = roleScores['sam'] ?? 0;
    const others = ['prz', 'wsp', 'pod']
      .map((r) => roleScores[r])
      .filter((v) => v > 0);
    const avg = others.length > 0 ? others.reduce((a, b) => a + b, 0) / others.length : selfScore;
    othersAvg[kid] = avg;
    gaps[kid] = selfScore - avg;
  }

  const sorted = Object.entries(othersAvg).sort((a, b) => b[1] - a[1]);
  const top2 = sorted.slice(0, 2);
  const bottom2 = sorted.slice(-2).reverse();

  const strengths = top2.map(([kid, avg]) => ({
    title: competencyNames[kid] ?? kid,
    desc: `Wysoka ocena otoczenia (${avg.toFixed(1)}/6). Fundament postrzeganej skuteczności.`,
  }));

  const developments = bottom2.map(([kid, avg]) => ({
    title: competencyNames[kid] ?? kid,
    desc: `Najniższa ocena otoczenia (${avg.toFixed(1)}/6). Obszar o największym potencjale wzrostu.`,
  }));

  const bigGaps = Object.entries(gaps)
    .filter(([, g]) => g > 0.7)
    .map(([kid]) => competencyNames[kid] ?? kid);

  const keyInsight =
    bigGaps.length > 0
      ? `Kluczowy sygnał z badania: w ${bigGaps.length === 1 ? 'kompetencji' : 'kompetencjach'} ${bigGaps.join(', ')} różnica między samooceną a oceną otoczenia przekracza 0,7 punktu. To nie błąd percepcji otoczenia — to informacja, że intencja nie zawsze przekłada się w pełni na odbiór zachowań przez ludzi pracujących na co dzień.`
      : 'Samoocena i oceny otoczenia są bliskie, co świadczy o dobrym wglądzie w swoje mocne strony i obszary do pracy.';

  return {
    summary: `Na podstawie badania 360 stopni obejmującego ${Object.keys(scores).length} kompetencji menedżerskich wyłania się profil lidera operacyjnego z wyraźnymi zasobami skuteczności. Wyniki wskazują osobę, która posiada solidne fundamenty przywódcze, jednocześnie z konkretnymi obszarami, w których intencjonalne działania przyniosą największy zwrot z inwestycji w rozwój.`,
    strengths,
    developments,
    keyInsight,
  };
}
