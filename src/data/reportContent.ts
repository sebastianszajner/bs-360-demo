// Pełna narracja raportu 360° — Jan Kowalski / SUUS.
// Portowana 1:1 z recommendations_full_v2.py + build_report_v3.py + PDF.
// To jest treść demonstracyjna identyczna z wysłanym plikiem PDF (61 stron).

export interface CompetencyNarrative {
  wprowadzenie: string;
  znaczenie: string;
  kierunek: string;
  punkty: [string, string][]; // [tytuł, opis] × 6
  uwagi: string[];
  dzialania: string[];
  wskazniki: string[];
}

export const COMPETENCY_NARRATIVES: Record<string, CompetencyNarrative> = {
  K1: {
    wprowadzenie:
      'Zespół widzi Jana jako sprawnego kierownika magazynu. Jego znajomość procesów daje stabilność całemu centrum logistycznemu. Wynik pokazuje jednak różnicę między samooceną (5,2) a oceną zespołu (4,4). Ta różnica nie bierze się z braku kompetencji. Sprawność Jana jest tak oczywista, że nie zostawia zespołowi miejsca na własne decyzje. Podwładni mogą to odbierać jako brak wiary w nich. Czują, że ich rola w decyzjach jest mała.',
    znaczenie:
      'Ta kompetencja jest fundamentem pracy centrum. Wpływa na tempo zadań magazynowych i jakość obsługi klienta. Decyduje o samodzielności liderów zmianowych. Buduje odporność centrum, gdy brakuje kluczowych osób albo gdy spada przeciążenie. To, jak kierownik organizuje pracę, deleguje i trzyma rytm, przekłada się na wyniki. Wpływa też na zaufanie zespołu do lidera. Od tego zależy, czy centrum urośnie bez utraty jakości.',
    kierunek:
      'Jan rozwinie tę kompetencję przez większą świadomość w trzech obszarach. Po pierwsze, świadomie deleguj odpowiedzialność liderom zmianowym. Po drugie, wprowadź stały rytm spotkań indywidualnych. Po trzecie, ujednolić komunikaty między zmianami.',
    punkty: [
      [
        'Wprowadź stały rytm spotkań indywidualnych z liderami zmianowymi',
        'Zacznij od cyklicznych, trzydziestominutowych spotkań z każdym z trzech liderów zmianowych. Ustal stałe dni i godziny. Agenda ma trzy punkty: co działa w mojej zmianie, co nie działa, jaką jedną decyzję operacyjną podejmuję w tym tygodniu. Po sześciu do ośmiu tygodniach liderzy stają się bardziej samodzielni. Spada liczba decyzji, które trafiają do kierownika.',
      ],
      [
        'Świadomie deleguj powtarzalne decyzje operacyjne',
        'Wybierz trzy do pięciu kategorii decyzji, które dziś podejmujesz sam. Oddaj je liderom zmianowym. Mogą to być na przykład reorganizacja stanowisk przy peakach, nadgodziny do czterech godzin albo lokalizacja niestandardowych przyjęć. Spisz te kategorie. Omów je na spotkaniu indywidualnym. Formalnie przekaż odpowiedzialność. Liderzy zyskują jasność, gdzie kończy się ich autonomia.',
      ],
      [
        'Wprowadź wspólny dashboard dnia, żeby ujednolicić komunikaty między zmianami',
        'Wyniki pokazują brak spójności komunikatów między zmianami. Stwórz jedno wspólne miejsce. Może to być tablica w biurze kierownictwa albo dokument elektroniczny. Umieść tam pięć wskaźników: wolumen przyjęć, wolumen wydań, błędy, opóźnienia, sytuacje BHP. Aktualizuj je przed każdą odprawą. Każda zmiana widzi ten sam obraz pracy. Kierownik przestaje być osobistym centrum informacji.',
      ],
      [
        'Wprowadź standardową odprawę zmianową w stałym formacie',
        'Dziś odprawy są nieregularne, a każda zmiana ma własny format. Wprowadź dziesięciominutową odprawę przed startem każdej zmiany. Format ma cztery punkty: priorytet dnia, kluczowe ryzyka, sprawa BHP do uwagi, jedna dobra obserwacja z poprzedniej zmiany. Stała struktura buduje rytm. Obniża poczucie chaosu. Łączy informacje między zmianami.',
      ],
      [
        'Świadomie obserwuj własny wzorzec podejmowania decyzji',
        'Wprowadź krótką refleksję na koniec każdego dnia. Zadaj sobie cztery pytania. Ile decyzji podjąłem dziś sam? Ile zostawiłem zespołowi? Która z nich była naprawdę nieodwracalna? Którą mógł podjąć lider? Po kilku tygodniach poznajesz własne nawyki decyzyjne. To jest punkt wyjścia do realnej zmiany.',
      ],
      [
        'Wzmacniaj pozycję liderów zmianowych jako współgospodarzy centrum',
        'Buduj pozycję liderów zmianowych jako współgospodarzy centrum, nie tylko wykonawców poleceń. W praktyce deleguj decyzje publicznie, w obecności zespołu. Podkreślaj rolę lidera w komunikatach do innych działów. Włączaj liderów do rozmów z opiekunami klientów wewnętrznych. Taka widoczność wspiera ich rozwój. Obniża też zależność operacji od jednej osoby.',
      ],
    ],
    uwagi: [
      'Czy Twój styl zarządzania buduje samodzielność zespołu, czy zależność od Ciebie?',
      'Czy podejmujesz decyzje operacyjne z nawyku, czy z realnej potrzeby?',
      'Czy liderzy zmianowi znają jasny zakres swojej autonomii, czy działają w niedopowiedzeniach?',
      'Czy odprawy zmianowe porządkują pracę, czy są tylko okazjonalnym spotkaniem?',
      'Czy istnieje wspólny obraz dnia, dostępny dla każdej zmiany?',
    ],
    dzialania: [
      'wprowadź cykliczne spotkania indywidualne z liderami zmianowymi (co tydzień, 30 minut, stała godzina)',
      'spisz trzy do pięciu kategorii decyzji do delegowania i formalnie przekaż je liderom',
      'utwórz wspólny dashboard dnia jako narzędzie komunikacji między zmianami',
      'wdróż standardową odprawę zmianową w formacie czterech punktów',
      'weź udział w warsztacie o przywództwie sytuacyjnym i delegowaniu',
      'pracuj z mentorem nad realnymi sytuacjami decyzyjnymi z ostatniego miesiąca',
    ],
    wskazniki: [
      'liderzy zmianowi podejmują więcej decyzji samodzielnie (cel: minimum 3 na tydzień)',
      'mniej spraw trafia do kierownika w sytuacjach standardowych',
      'każda zmiana ma dostęp do spójnego obrazu dnia',
      'liderzy w spotkaniach indywidualnych mówią o większej samodzielności',
      'mniej skarg na chaos komunikacyjny od podwładnych',
      'zespół widzi w kierowniku osobę, która buduje jego dojrzałość, nie tylko zarządza operacjami',
    ],
  },
  K2: {
    wprowadzenie:
      'To najniższy wynik w całym raporcie. Ma też największą lukę między samooceną (4,5) a oceną zespołu (3,4). Różnica 1,1 punktu pokazuje, że Jan nie widzi w pełni, jak zespół odbiera jego komunikację. Pracownicy mówią to wprost. W pytaniach otwartych piszą: „brakuje mi konkretnego feedbacku, nie wiem, czy robię dobrze, czy źle, słyszę tylko jak coś zawalę”. To nie jest brak umiejętności. Jan potrafi prowadzić trudne rozmowy bez utraty relacji. To jest brak rytmu i przewidywalności informacji zwrotnej w codziennej pracy.',
    znaczenie:
      'Ta kompetencja ma kluczowe znaczenie. Wpływa na zaangażowanie zespołu i więź pracowników z firmą. Decyduje, czy ludzie zgłaszają problemy i czy uczą się na bieżąco. Brak rytmu informacji zwrotnej obniża poczucie bezpieczeństwa. Pracownicy zaczynają czekać tylko na złe wiadomości. Tracą inicjatywę i grają zachowawczo. W SUUS osiemnastoosobowy zespół magazynowy odpowiada za zobowiązania wobec kluczowych klientów. Słaba kultura feedbacku obniża retencję. Podnosi koszty rekrutacji i wdrażania nowych ludzi.',
    kierunek:
      'Ta luka jest duża i ważna. Komunikacja rozwojowa to najwyższy priorytet Jana na najbliższe trzy do sześciu miesięcy. Działaj w trzech obszarach. Po pierwsze, dawaj regularne pochwały i pozytywny feedback. Po drugie, prowadź rozmowy korygujące według stałej struktury. Po trzecie, świadomie twórz przestrzeń dla głosu pracownika.',
    punkty: [
      [
        'Wprowadź codzienny rytuał konkretnej pochwały, niezależnie od sytuacji',
        'Zacznij od zasady jednej konkretnej pochwały dziennie. Każdego dnia roboczego, do godziny czternastej, podejdź do jednej osoby i powiedz konkretnie, co zrobiła dobrze. Konkret ma trzy elementy: imię osoby, opis konkretnego zachowania (nie cechy charakteru) oraz wpływ tego zachowania na zespół, klienta albo wynik. Unikaj ogólników typu „dobra robota” czy „świetnie sobie radzisz”. One nic nie niosą. Po czterech tygodniach nawyk działa sam, a kultura zespołu się zmienia.',
      ],
      [
        'Stosuj stałą strukturę feedbacku w rozmowach korygujących',
        'Wprowadź powtarzalną strukturę rozmów korygujących z trzech elementów. Opis sytuacji: kiedy i gdzie zdarzenie miało miejsce. Opis zachowania: co dokładnie pracownik zrobił albo czego nie zrobił. Opis wpływu: jaki to miało skutek dla zespołu, klienta albo procesu. Ta struktura zajmuje trzydzieści sekund dłużej niż zwykła uwaga. Daje pracownikowi jasność, co dokładnie zmienić. Bez niej pracownik często wie tylko tyle, że szef jest niezadowolony.',
      ],
      [
        'Świadomie rób pauzę po zadanym pytaniu',
        'Pod presją Jan odpowiada na własne pytania, zanim zespół zdąży je przemyśleć. Wprowadź trzysekundową pauzę po pytaniu. To zmienia dynamikę rozmowy. Pracownicy, którzy potrzebują chwili na sformułowanie myśli, zaczynają wnosić więcej. Ćwicz ten nawyk na spotkaniach indywidualnych, gdzie tempo jest spokojniejsze. Potem przenoś go na odprawy zmianowe.',
      ],
      [
        'Wprowadź krótkie, miesięczne rozmowy rozwojowe z każdym z zespołu',
        'Wprowadź krótkie rozmowy rozwojowe, trzydzieści minut, raz w miesiącu, z każdym z osiemnastu podwładnych. Ustal stałą datę, stałe miejsce i stałe trzy pytania: co poszło najlepiej w tym miesiącu, co najbardziej przeszkadzało w pracy, czego chcesz nauczyć się w kolejnym miesiącu. Zapisuj odpowiedzi. Po trzech miesiącach masz realną mapę zespołu, której dziś brak. To około jeden tydzień pracy w skali roku, a wartość jest wielokrotnie większa.',
      ],
      [
        'Świadomie proś zespół o feedback dla siebie',
        'To najbardziej zaawansowany, ale i najmocniejszy krok. Raz w tygodniu poproś dwie osoby z zespołu o krótki feedback na temat swojej komunikacji. Pytanie: „co w mojej komunikacji w tym tygodniu pomogło ci w pracy, a co utrudniło?”. To zmienia Twój styl szybciej niż jakiekolwiek szkolenie. Modeluje też kulturę feedbacku w całym zespole. Gdy kierownik prosi o feedback dla siebie, zespół rozumie, że feedback jest wartością, nie zagrożeniem.',
      ],
      [
        'Dostosuj komunikację do stażu pracownika',
        'Pod presją Jan mówi skrótami. Rozumieją je osoby z dłuższym stażem, ale dla nowych są niejasne. Rozróżniaj sposób komunikacji świadomie. Dawaj więcej wyjaśnień nowym osobom. Skracaj komunikaty dla doświadczonych. To praktyczna umiejętność. Rozwijaj ją przez samoobserwację i prośby o feedback od osób z różnym stażem.',
      ],
    ],
    uwagi: [
      'Czy feedback pojawia się tylko po błędzie, czy także jako codzienna praktyka?',
      'Czy zespół pamięta konkretną pochwałę z ostatniego miesiąca?',
      'Czy nowi pracownicy rozumieją skróty, których używasz pod presją?',
      'Czy rozmowy rozwojowe mają swój rytm, czy pojawiają się tylko, gdy coś nie działa?',
      'Czy znasz trzy najważniejsze potrzeby rozwojowe każdej osoby w zespole?',
    ],
    dzialania: [
      'wprowadź codzienną zasadę jednej konkretnej pochwały do godziny czternastej',
      'stosuj strukturę Sytuacja-Zachowanie-Wpływ w każdej rozmowie korygującej',
      'wprowadź miesięczne trzydziestominutowe rozmowy rozwojowe z każdym podwładnym',
      'co tydzień poproś o feedback dwie osoby z zespołu',
      'weź udział w warsztacie o informacji zwrotnej i komunikacji rozwojowej',
      'pracuj z mentorem nad nagraniem własnych rozmów i analizą stylu komunikacji',
    ],
    wskazniki: [
      'trzy z pięciu zapytanych osób pamięta konkretną pochwałę z ostatniego miesiąca',
      'rozmowy rozwojowe odbywają się co miesiąc ze wszystkimi (cel: 100% w skali kwartału)',
      'rośnie poczucie bezpieczeństwa w zespole (ocena jakościowa)',
      'w kolejnym badaniu spada liczba skarg na brak feedbacku w pytaniach otwartych',
      'więcej pracowników samo zgłasza pomysły usprawnień',
      'zespół widzi w kierowniku osobę, która rozwija ludzi, nie tylko zarządza operacjami',
    ],
  },
  K3: {
    wprowadzenie:
      'Bardzo wysoki wynik pokazuje, że zespół widzi w Janie lidera zmiany. Jan dobrze prowadzi ludzi przez niepewność, transformacje i nowe rozwiązania operacyjne. To jedyna kompetencja w raporcie, w której zespół ocenia go wyżej niż on sam siebie. To mocny sygnał pozytywnego wpływu. Jego praca przy zmianie jest doceniana bardziej, niż on sam to widzi. Dla Centrum Logistycznego w Łodzi ma to szczególne znaczenie. Branża logistyczna ciągle zmienia systemy, procesy i wymagania klientów.',
    znaczenie:
      'Ta kompetencja to jeden z kluczowych zasobów SUUS. Firma planuje wzrost wolumenu operacji, otwiera nowe centra i wdraża nowe systemy oraz procesy obsługi klienta. Kierownik, który prowadzi zespół przez zmianę bez utraty ciągłości pracy, jest oparciem dla całej transformacji. Skuteczna zmiana wpływa na trzy obszary biznesowe. Pierwszy to tempo wdrażania nowych rozwiązań. Drugi to koszty błędów w okresie przejściowym. Trzeci to retencja pracowników w czasie zmian.',
    kierunek:
      'Wynik jest tak wysoki, że ta kompetencja nie wymaga naprawy. Utrwalaj ją, świadomie skaluj i wykorzystuj jako mocną stronę w całej organizacji. Doskonal jeden konkretny obszar. Świadomie komunikuj sens zmiany, czyli „dlaczego”. Dziś Jan pomija ten element na rzecz komunikatu „co” i „jak”.',
    punkty: [
      [
        'Trzymaj wysoki standard wdrażania zmian i wzmacniaj komunikację „dlaczego”',
        'Jan dobrze wdraża zmiany operacyjne bez utraty ciągłości pracy. Wzmacniaj jeden element, który dziś bywa pomijany. Komunikuj sens zmiany, jej kontekst biznesowy i powód, dla którego ją wprowadzasz. Przy każdej zmianie zacznij komunikat od jednego zdania ze słowem „ponieważ”. Dziś zespół wykonuje zmianę szybko, ale nie zawsze rozumie jej sens. To osłabia trwałość wdrożenia. Po pierwszej presji ludzie wracają do starych nawyków.',
      ],
      [
        'Włączaj liderów zmianowych w fazę projektowania zmiany',
        'Zapraszaj dwóch albo trzech liderów zmianowych do roli ambasadorów zmiany, zanim ją wdrożysz. Zrób godzinny warsztat z trzema pytaniami. Co tu może nie zadziałać? Co najbardziej zaboli pracowników w pierwszym tygodniu? Co zrobilibyśmy lepiej, gdybyśmy pomyśleli o tym od początku? Zespół zwykle przyniesie pięć do dziesięciu obserwacji, których nie widzisz zza biurka. Te osoby stają się sojusznikami w czasie wdrożenia.',
      ],
      [
        'Wprowadź kartę zmiany jako standard komunikacji w centrum',
        'Wprowadź jednostronicowy standard komunikacji dla każdej ważnej zmiany operacyjnej. Karta zmiany zawiera: tytuł, datę startu, kogo dotyczy, co się zmienia, po co, do kogo kierować pytania, kiedy odbędzie się retrospektywa. Powieś kartę przy odprawach zmianowych na pierwsze dwa tygodnie. To narzędzie porządkuje komunikację. Zapobiega też plotce „znowu coś nam zmieniają”.',
      ],
      [
        'Dziel się dobrymi praktykami z innymi kierownikami operacji w SUUS',
        'Wynik jest bardzo wysoki. Wykorzystaj tę kompetencję nie tylko w swoim zespole, ale w całej organizacji. Jan może być wewnętrznym ambasadorem dobrych praktyk w prowadzeniu zmian. Wspieraj innych kierowników. Dziel się narzędziami nieformalnie. Opowiadaj konkretne przypadki. Bierz udział w spotkaniach regionalnych z kierownikami innych centrów logistycznych.',
      ],
      [
        'Dbaj o równowagę między tempem wdrażania a gotowością zespołu',
        'Lider z wysoką kompetencją w zmianie często lepiej znosi niepewność i dynamikę niż część pracowników. Obserwuj świadomie, czy tempo zmian odpowiada gotowości zespołu. Sprawdź, czy nie bierze się ono z Twojej łatwości w zmienności. Pytaj liderów zmianowych, jak odbierają tempo zmian. Traktuj ich opinie jako realny wskaźnik.',
      ],
      [
        'Rozwijaj refleksję nad własnym stylem przywództwa w zmianie',
        'Nawet bardzo wysoki wynik możesz dalej doskonalić przez świadomą refleksję. Raz na kwartał, przez trzydzieści minut, przyjrzyj się ostatniej zmianie. Które Twoje działania najmocniej wsparły zespół? Które praktyki dały najwyższą skuteczność wdrożenia? Jak możesz je wzmacniać świadomie, nie tylko intuicyjnie?',
      ],
    ],
    uwagi: [
      'Czy zespół rozumie powód zmiany, czy tylko wykonuje jej zakres?',
      'Czy liderzy zmianowi projektują zmianę z Tobą, czy tylko ją wdrażają?',
      'Czy istnieje standardowa karta zmiany jako narzędzie komunikacji?',
      'Czy tempo zmian odpowiada gotowości zespołu, czy wynika z Twojego tempa?',
      'Czy dzielisz tę mocną kompetencję z innymi liderami, czy zostaje tylko u Ciebie?',
    ],
    dzialania: [
      'zaczynaj każdą zmianę od komunikatu ze słowem „ponieważ”',
      'organizuj godzinne warsztaty z liderami zmianowymi przed każdą większą zmianą',
      'stwórz i wdróż standard karty zmiany',
      'co kwartał zrób refleksję nad swoim stylem prowadzenia zmian (30 minut, sam lub z mentorem)',
      'bierz udział w spotkaniach regionalnych jako ambasador dobrych praktyk',
      'rozważ rolę mentora dla innych kierowników operacji w SUUS',
    ],
    wskazniki: [
      'po dwóch tygodniach 70% zespołu potrafi powtórzyć powód zmiany własnymi słowami',
      'w projekcie każdej zmiany uwzględniasz minimum dwie uwagi liderów zmianowych',
      'każda ważna zmiana operacyjna ma swoją kartę zmiany',
      'zespół widzi w kierowniku wiarygodnego i stabilnego lidera transformacji',
      'liderzy zmianowi świadomie powielają praktyki Jana w swojej pracy',
      'zmiana nie tylko wchodzi w życie, ale trwale zostaje w sposobie pracy zespołu',
    ],
  },
  K4: {
    wprowadzenie:
      'Wynik pokazuje, że różne grupy widzą Jana inaczej. Przełożony widzi w nim rzetelnego partnera biznesowego (4,8). Współpracownicy z innych działów oceniają go niżej (4,3). Podwładni najsłabiej (4,0). Klient zewnętrzny widzi w Janie operatora, na którym można polegać. Inne działy i zespół odbierają jego współpracę bardziej transakcyjnie. Jan dotrzymuje zobowiązań, ale nie buduje rozwiązań razem z nimi. Luka między samooceną (5,0) a oceną podwładnych (4,0) wynosi jeden punkt. To druga najwyższa luka w raporcie.',
    znaczenie:
      'SUUS to operator logistyczny klasy premium. Partnerstwo biznesowe ma tu znaczenie strategiczne. Każda relacja kierownika z opiekunem handlowym, transportem, obsługą klienta, jakością i IT wpływa na cały łańcuch dostaw klienta. W centrach, gdzie kierownicy operacji regularnie rozmawiają z innymi działami, kontrakty z klientem trwają dłużej, a satysfakcja jest wyższa. To dane wprost związane z przewagą SUUS. Wiążą się też z wartościami PARTNERSTWO i ONE STEP AHEAD, które firma deklaruje publicznie.',
    kierunek:
      'Jan rozwinie tę kompetencję, gdy zmieni sposób patrzenia na współpracę. Przejdź z modelu „mój magazyn i inni” do modelu „jeden ekosystem klienta”. Działaj w trzech obszarach. Po pierwsze, ustal stały rytm spotkań między działami. Po drugie, rozmawiaj proaktywnie z opiekunami klientów. Po trzecie, wnoś głos klienta do codziennej pracy zespołu.',
    punkty: [
      [
        'Wprowadź kwartalne wizyty u kluczowych klientów z opiekunem handlowym',
        'To najmocniejsze działanie w tej kompetencji. Zaplanuj jedną wizytę u kluczowego klienta SUUS raz na kwartał. Jedź razem z opiekunem handlowym po stronie obsługi klienta. Najszybciej zobaczysz, co dzieje się z paletą po wyjściu z bramy magazynu, gdy zobaczysz to na własne oczy. Po jednej wizycie język rozmów wewnętrznych Jana zmienia się na sześć miesięcy do przodu. Żaden raport tego nie zastąpi.',
      ],
      [
        'Wprowadź rytm miesięcznych spotkań z kierownikami innych działów',
        'Ustal stały rytm trzydziestominutowych spotkań z kierownikami innych działów. Idź po kolei: transport, obsługa klienta, jakość, IT. Jedno spotkanie w miesiącu. Bez agendy operacyjnej i listy spraw do załatwienia. Pytanie na start: „co w mojej pracy ułatwia tobie życie, a co utrudnia”. Zapisuj odpowiedzi i wprowadzaj konkretne ulepszenia. Tak buduje się partnerstwo, którego dziś brakuje.',
      ],
      [
        'Wprowadź cotygodniowy kanał komunikacji z opiekunami handlowymi kluczowych klientów',
        'Wysyłaj co tydzień krótką wiadomość do opiekunów handlowych po stronie obsługi klienta. Trzy elementy: jedno zdanie statusu, jedno ryzyko, jedna dobra obserwacja. Dziesięć minut pracy w skali tygodnia. To buduje obraz operacji, która myśli o sprzedaży. Działa też jak wczesne ostrzeganie, gdy pojawia się problem.',
      ],
      [
        'Wnoś głos klienta do odpraw zmianowych zespołu',
        'Ten krok dotyczy zespołu, nie tylko Jana. Raz w tygodniu, na odprawie zmianowej, podziel się jedną konkretną rzeczą, którą klient powiedział o pracy zespołu. Może to być pochwała, uwaga albo oczekiwanie. Podaj konkret i imię klienta. To jedno zdanie zmienia abstrakcyjnego klienta w konkretną osobę z konkretną reakcją. Po kilku tygodniach zespół ma większą świadomość tego, co dzieje się poza bramą magazynu.',
      ],
      [
        'Nazywaj wartość wspólnego rezultatu w rozmowach z innymi działami',
        'Zmień język rozmów wewnętrznych. Przejdź z perspektywy „interes mojego magazynu” na „wspólny interes klienta”. W rozmowach z transportem czy obsługą klienta pytaj: „co byłoby najlepsze dla klienta X w tej sytuacji”. Nie pytaj tylko: „co jest możliwe z mojej strony”. Ta drobna zmiana języka buduje kulturę partnerstwa.',
      ],
      [
        'Modeluj zachowania partnerskie w obecności zespołu',
        'Ten krok dotyczy kultury. Zespół obserwuje, jak Jan rozmawia z innymi działami i z opiekunami klientów. Rozmowy partnerskie w obecności pracowników to najsilniejsze narzędzie zmiany kultury. Ludzie uczą się przez obserwację lidera, nie przez jego deklaracje o partnerstwie.',
      ],
    ],
    uwagi: [
      'Czy język Twoich rozmów z innymi działami jest partnerski, czy transakcyjny?',
      'Czy byłeś u realnego klienta zewnętrznego w ostatnich dwunastu miesiącach?',
      'Czy masz stały rytm komunikacji z opiekunami handlowymi kluczowych klientów?',
      'Czy zespół słyszy głos klienta na co dzień, czy tylko przy reklamacji?',
      'Czy budujesz partnerstwo zachowaniem, czy tylko deklaracją?',
    ],
    dzialania: [
      'zaplanuj kwartalną wizytę u kluczowego klienta z opiekunem handlowym',
      'wprowadź miesięczne spotkania z kierownikami innych działów (transport, obsługa klienta, jakość, IT)',
      'wysyłaj cotygodniową wiadomość do opiekunów handlowych kluczowych klientów',
      'wnoś głos klienta do cotygodniowych odpraw zmianowych',
      'weź udział w warsztacie o partnerstwie biznesowym i orientacji na klienta',
      'zrób wspólny projekt usprawnienia z innym działem (transport lub obsługa klienta)',
    ],
    wskazniki: [
      'minimum jedna wizyta u klienta zewnętrznego w skali kwartału',
      'cztery spotkania z kierownikami innych działów w skali roku',
      'działa stały cotygodniowy kanał komunikacji z opiekunami handlowymi',
      'zespół potrafi przytoczyć ostatnią dobrą informację od klienta',
      'kierownicy z innych działów oceniają Jana wyżej',
      'zespół widzi w kierowniku partnera biznesowego, nie tylko wykonawcę operacyjnego',
    ],
  },
  K5: {
    wprowadzenie:
      'Wynik pokazuje, że zespół widzi w Janie kierownika z odwagą decyzyjną i poczuciem odpowiedzialności. Przełożony mówi wprost: „gdy jest pożar, wszyscy patrzą na niego”. Luka między samooceną (5,4) a oceną zespołu (4,2) wynosi 1,2 punktu. To najwyższa luka w całym raporcie. Zespół ufa decyzjom Jana. Nie czuje się jednak włączony w ich powstawanie i nie zawsze rozumie ich powód. W pytaniach otwartych pada zdanie: „wiem co, ale nie wiem dlaczego”.',
    znaczenie:
      'Decyzyjność operacyjna to jedna z najważniejszych kompetencji kierowniczych w logistyce. Czas reakcji na odchylenie od planu wprost wpływa na obsługę klienta. Wysoka odwaga decyzyjna Jana to strategiczny zasób SUUS. Warto go świadomie utrwalać. Sposób komunikowania decyzji jest równie ważny dla zaangażowania zespołu. Niezaangażowany zespół generuje wyższe koszty, niższą inicjatywę i wyższą rotację. Pełna decyzyjność to nie tylko podejmowanie decyzji. To także ich komunikacja i włączanie zespołu w proces.',
    kierunek:
      'Jan rozwinie tę kompetencję w trzech obszarach. Po pierwsze, świadomie komunikuj powód decyzji. Po drugie, rozróżniaj decyzje odwracalne i nieodwracalne. Po trzecie, włączaj liderów zmianowych w decyzje, które wprost dotyczą zespołu.',
    punkty: [
      [
        'Wprowadź trzyzdaniowy komunikat decyzji jako standard',
        'To najmocniejsza rekomendacja w tej kompetencji. Po każdej ważnej decyzji wpływającej na zespół wyślij trzy zdania. Pierwsze: co decyduję. Drugie: dlaczego (krótki powód, ewentualnie alternatywy, które rozważałeś). Trzecie: co ta decyzja oznacza dla zespołu. Wyślij to na grupowy czat, powieś na tablicy ogłoszeń albo powiedz na odprawie. Cały proces zajmuje sześćdziesiąt sekund. Po trzydziestu dniach odbiór decyzji zmienia się z „znowu szef tak zdecydował” na „rozumiem, dlaczego”.',
      ],
      [
        'Rozróżniaj decyzje odwracalne i nieodwracalne',
        'Rozróżniaj świadomie dwa typy decyzji. Decyzje nieodwracalne wymagają więcej konsultacji, czasu i alternatyw. To na przykład zwolnienie pracownika, zakup sprzętu albo zobowiązanie wobec klienta. Decyzje odwracalne podejmuj szybko, na próbę, samodzielnie. To na przykład układ stanowisk, harmonogram odprawy, format raportu albo organizacja pre-shift. Dziś Jan traktuje wszystkie decyzje podobnie. To spowalnia pracę zespołu. Drobne sprawy zajmują tyle samo czasu co strategiczne.',
      ],
      [
        'Konsultuj z liderami zmianowymi decyzje dotyczące zespołu',
        'Wprowadź nawyk jednego pytania do liderów zmianowych, zanim podejmiesz decyzję dotyczącą pracy zespołu. Pytanie: „co o tym myślicie, zanim zdecyduję”. Decyzja może się nie zmienić. Zespół zyskuje jednak poczucie sprawczości. Dziś podwładni dają Janowi 4,2 głównie dlatego, że nie czują się włączeni. Nie dlatego, że nie ufają jego decyzjom.',
      ],
      [
        'Rób comiesięczny przegląd własnych decyzji, żeby się z nich uczyć',
        'Ucz się świadomie z własnych decyzji. Raz w miesiącu, przez trzydzieści minut, sam lub z mentorem, weź trzy do pięciu ostatnich ważnych decyzji. Odpowiedz na trzy pytania: co dziś z tej decyzji działa, co nie działa, co zrobiłbym dziś inaczej. Zapisuj odpowiedzi przez sześć miesięcy. Tak budujesz mapę własnych wzorców decyzyjnych. Większość kierowników operacji jej nie ma.',
      ],
      [
        'Nazywaj alternatywy w komunikacie decyzji',
        'Dodawaj do komunikatu decyzji krótką wzmiankę o alternatywach, które rozważyłeś i odrzuciłeś. To nie jest otwieranie dyskusji. To sygnał dla zespołu, że decyzja powstała w przemyślanym procesie, nie z impulsu. Buduje to zaufanie do Twojej decyzyjności. Modeluje też sposób myślenia, który liderzy zmianowi mogą przejąć w swoich decyzjach.',
      ],
      [
        'Zarządzaj tempem decyzji, żeby chronić energię zespołu',
        'Ten krok dotyczy energii. Decyzje podejmowane szybko, w kryzysie i pod presją, bywają trafne. Gdy pojawiają się zbyt często, wyczerpują zespół. Zarządzaj tempem świadomie. Sprawdzaj, które decyzje są pilne, które mogą poczekać do następnej zmiany, a które do następnego tygodnia. Tak chronisz energię zespołu. Utrzymujesz też wysoką jakość wyborów w dłuższym czasie.',
      ],
    ],
    uwagi: [
      'Czy zespół rozumie powód decyzji, czy widzi tylko jej skutek?',
      'Czy traktujesz decyzje odwracalne z taką samą wagą jak nieodwracalne?',
      'Czy pytasz liderów zmianowych o opinię przed decyzjami dotyczącymi zespołu?',
      'Czy uczysz się z własnych decyzji, czy podejmujesz je bez retrospektywy?',
      'Czy tempo decyzji odpowiada energii zespołu, czy wyczerpuje go w dłuższym czasie?',
    ],
    dzialania: [
      'wprowadź standard trzyzdaniowego komunikatu decyzji',
      'rozróżniaj świadomie decyzje odwracalne i nieodwracalne',
      'pytaj „co o tym myślicie, zanim zdecyduję” przed decyzjami dotyczącymi zespołu',
      'rób comiesięczny trzydziestominutowy przegląd własnych decyzji (sam lub z mentorem)',
      'weź udział w warsztacie o podejmowaniu decyzji w warunkach niepewności',
      'pracuj z mentorem nad realnymi przypadkami decyzyjnymi z ostatniego kwartału',
    ],
    wskazniki: [
      'każdą ważną decyzję wpływającą na zespół komunikujesz w formacie trzech zdań',
      'na co dzień rozróżniasz decyzje odwracalne i nieodwracalne',
      'minimum cztery pytania „co o tym myślicie” do liderów zmianowych w skali tygodnia',
      'co miesiąc zapisujesz refleksję nad własnymi decyzjami',
      'zespół czuje się bardziej włączony w proces decyzyjny',
      'zespół widzi w kierowniku osobę, która decyduje świadomie i komunikuje to przejrzyście',
    ],
  },
};

export const GLOBAL_ANALYSIS = {
  wprowadzenie: [
    'Badanie 360 stopni objęło pięć kompetencji menedżerskich. To kierowanie zespołem operacyjnym, komunikacja i informacja zwrotna, zarządzanie zmianą i adaptacja, orientacja na klienta i partnerstwo biznesowe oraz decyzyjność i odpowiedzialność za wynik. Wyniki pokazują, że Jan Kowalski ma spójny styl pracy. Łączy w nim perspektywę zadaniową, operacyjną i odpowiedzialność za wynik w codziennej pracy kierownika centrum logistycznego.',
    'Całość wyników pokazuje w Janie profesjonalistę z wyraźnymi zasobami liderskimi i operacyjnymi. Widać też obszary, których rozwój zwiększy jego skuteczność. Wpłynie na jakość jego wpływu na zespół. Pomoże zbudować bardziej dojrzałe i przewidywalne środowisko współpracy. Tego profilu nie da się czytać jednowymiarowo. Jan nie jest ani silny we wszystkim, ani deficytowy. To lider operacyjny z mocnymi fundamentami skuteczności. Do wyższej dojrzałości potrzebuje większej konsekwencji i świadomości. Potrzebuje też lepiej łączyć sposób myślenia z codzienną komunikacją.',
  ],
  wnioski_glowne: [
    'Wyniki w poszczególnych kompetencjach uzupełniają się i tworzą szerszy wzorzec. Jan pracuje na wyraźnych zasobach. Ma operacyjną sprawność i odwagę decyzyjną. Wdraża zmiany bez utraty ciągłości pracy. Jest bardzo rzetelny wobec zobowiązań. Te kompetencje są fundamentem jego pozycji w organizacji. Widzą je wszystkie grupy oceniające.',
    'Dalszy wzrost skuteczności Jana nie zależy od większego zaangażowania. Zależy od bardziej dojrzałych praktyk przywódczych. Chodzi głównie o komunikację rozwojową, włączanie zespołu w decyzje oraz budowanie partnerstwa z innymi działami i klientem zewnętrznym. Taki profil jest częsty u osób, które dobrze działają. Aby wejść wyżej, muszą przesunąć akcent z samodzielnego dowożenia na świadome prowadzenie ludzi i procesów.',
    'Ważnym sygnałem są różnice między samooceną Jana a oceną otoczenia, zwłaszcza wśród podwładnych. We wszystkich pięciu kompetencjach Jan ocenia siebie wyżej niż jego zespół. W trzech kompetencjach (komunikacja, decyzyjność, orientacja na klienta) różnica przekracza 0,7 punktu. To nie jest błąd percepcji zespołu. To informacja, że intencja Jana nie zawsze przekłada się na odbiór jego działań przez ludzi, którzy pracują z nim na co dzień.',
  ],
  mocne_strony: [
    [
      'Operacyjna sprawność i znajomość procesów',
      'Wyjątkowa znajomość procesów Centrum Logistycznego w Łodzi. Cytat przełożonego: „operacyjnie najlepszy w regionie”. Gdzie to wykorzystać: wdrażanie nowych klientów retail, projekty optymalizacyjne, mentoring innych kierowników operacji w SUUS.',
    ],
    [
      'Odwaga decyzyjna i odpowiedzialność za wynik',
      'Podejmuje decyzje szybko. Nie odracza ich i nie przerzuca odpowiedzialności na zespół. Cytat: „gdy jest pożar, wszyscy patrzą na niego”. Gdzie to wykorzystać: sytuacje kryzysowe, peak operacyjny, awarie sprzętu, niestandardowe przyjęcia od klientów strategicznych.',
    ],
    [
      'Naturalna gotowość do wdrażania zmian operacyjnych',
      'Najmocniejsza kompetencja w raporcie. Otwartość na nowe narzędzia i procedury. Zespół ocenia ją wyżej niż samoocena. Gdzie to wykorzystać: pilotaże nowych systemów, transformacje procesowe, nowe standardy obsługi klienta na poziomie regionu.',
    ],
    [
      'Wysoka rzetelność wobec zobowiązań i lojalność wobec firmy',
      'Dotrzymuje słowa wobec klienta zewnętrznego. Buduje reputację centrum w oczach kluczowych klientów SUUS. Gdzie to wykorzystać: reprezentowanie SUUS wobec klientów strategicznych, eskalacje wymagające jasnego stanowiska, sytuacje wymagające zaufania.',
    ],
  ] as [string, string][],
  obszary_rozwoju: [
    [
      'Rozwijanie kultury informacji zwrotnej',
      'Najwyższy priorytet rozwojowy. Feedback pojawia się tylko po błędzie. Brakuje rytmu pochwał. Pierwszy krok: od jutra jedna konkretna pochwała dziennie do godziny czternastej (imię osoby, zachowanie, skutek).',
    ],
    [
      'Włączanie zespołu i liderów zmianowych w decyzje',
      'Zespół ufa decyzjom Jana, ale nie czuje się włączony w ich powstawanie. Cytat z badania: „wiem co, ale nie wiem dlaczego”. Pierwszy krok: przed kolejną decyzją wpływającą na zespół zadaj liderom zmianowym jedno pytanie: „co o tym myślicie, zanim zdecyduję”.',
    ],
    [
      'Budowanie partnerstwa z innymi działami',
      'Współpraca z transportem, obsługą klienta, jakością i IT jest transakcyjna, nie partnerska. To klucz dla wartości PARTNERSTWO. Pierwszy krok: w tym tygodniu umów jedno trzydziestominutowe nieformalne spotkanie z kierownikiem innego działu, bez agendy operacyjnej.',
    ],
    [
      'Komunikowanie sensu („dlaczego”) przy decyzjach i zmianach',
      'Zespół wykonuje, ale nie zawsze rozumie kontekst. Ta prosta zmiana domyka luki w trzech kompetencjach naraz. Pierwszy krok: przy następnej decyzji wyślij trzy zdania: co decyduję, dlaczego, co to oznacza dla zespołu. Może być na czacie. Zajmuje sześćdziesiąt sekund.',
    ],
  ] as [string, string][],
  synteza: [
    'Całość wyników pokazuje, że Jan ma potencjał na skutecznego kierownika centrum logistycznego. To rola, która wymaga łączenia odpowiedzialności za wyniki, współpracy z innymi działami i reagowania na zmienne warunki. Dalszy wzrost skuteczności zależy od bardziej dojrzałych praktyk przywódczych. Chodzi głównie o komunikację rozwojową, włączanie zespołu w decyzje i budowanie partnerstwa z innymi działami.',
    'Kluczowe zadanie Jana na najbliższy kwartał to jedna zmiana. Przejdź od skuteczności opartej na własnym działaniu i bieżącym reagowaniu do skuteczności opartej na świadomym przywództwie. Buduj przewidywalność komunikacji. Łącz ludzi, procesy i perspektywę biznesową. Ten proces nie wymaga zmiany osobowości ani porzucenia mocnych stron. Wystarczy świadomie dodać kilka konkretnych nawyków komunikacyjnych do tego, co już dziś działa dobrze.',
  ],
  kierunki_koncowe: [
    [
      'Wzmocnienie własnej roli jako lidera nadającego kierunek',
      'Sprawdzaj, czy na co dzień jasno komunikujesz priorytety, oczekiwania i sens decyzji. Im bardziej złożone środowisko, tym ważniejsza rola kierownika. To on porządkuje rzeczywistość i zmniejsza niejasność w zespole.',
    ],
    [
      'Rozwijanie konsekwencji w pracy z liderami zmianowymi',
      'Przeanalizuj, na ile Twój styl zarządzania wspiera odpowiedzialność, samodzielność i dojrzałość liderów zmianowych. Sprawdź, na ile utrwala zależność od Twojej bieżącej interwencji. Wzmacniaj rytm spotkań indywidualnych, jakość delegowania i feedback. Świadomie buduj kompetencje decyzyjne liderów.',
    ],
    [
      'Świadome prowadzenie ludzi przez zmianę i decyzje',
      'Komunikuj zmiany i decyzje nie tylko formalnie. Pomóż zespołowi zrozumieć kontekst, przewidzieć kolejne kroki i odnaleźć swoje miejsce w nowej sytuacji. Zwróć uwagę na jakość komunikacji „dlaczego”. Bądź dostępny. Pracuj z naturalnym oporem zespołu.',
    ],
    [
      'Większe osadzanie codziennych działań w perspektywie klienta zewnętrznego',
      'Niezależnie od roli wzmacniaj jeden nawyk. Pytaj siebie, na ile Twoje decyzje i działania odpowiadają na realne potrzeby klientów Centrum Logistycznego w Łodzi. Przechodź od myślenia procesowego do myślenia procesowo-klienckiego.',
    ],
    [
      'Budowanie większej spójności między intencją a odbiorem działań',
      'Regularnie sprawdzaj, czy Twój obraz własnych działań zgadza się z tym, jak odbiera je otoczenie. W praktyce zbieraj feedback częściej. Przyglądaj się skutkom swojego stylu. Koryguj zachowania tam, gdzie dobra intencja nie daje pożądanego efektu.',
    ],
  ] as [string, string][],
};

export const KLUCZOWY_WNIOSEK =
  'Jan jest skutecznym kierownikiem operacyjnym. Zespół mu ufa, klient się na nim opiera, przełożony go ceni. Największa dźwignia rozwoju nie leży w nowych kompetencjach. Leży w dodaniu warstwy komunikacyjnej do tego, co już dziś robi dobrze. Trzy nawyki: jedna pochwała dziennie, trzy zdania powodu decyzji, jedno pytanie do liderów przed wdrożeniem zmiany. To jest cały plan rozwojowy.';

export const ANALITYKA_LUKI = [
  'We wszystkich pięciu kompetencjach Jan ocenia siebie wyżej niż otoczenie. Jest jeden wyjątek. W zarządzaniu zmianą zespół ocenia go wyżej niż on sam siebie. To jedyny obszar pozytywnego wpływu. Jan robi to mocniej, niż jest tego świadomy.',
  'Największe luki dodatnie są w komunikacji i informacji zwrotnej (+0,77), decyzyjności (+0,73) oraz orientacji na klienta (+0,63). Wszystkie trzy mają wspólny mianownik. To sposób, w jaki Jan komunikuje swoje działania innym ludziom. Nikt nie kwestionuje jakości jego pracy. Pytanie dotyczy tego, jak doświadczają jej odbiorcy.',
  'Praktyczna rekomendacja jest jasna. Największą zmianę da dodanie warstwy komunikacyjnej do tego, co Jan już dziś robi dobrze. Trzy zdania powodu decyzji, jedna konkretna pochwała dziennie, jedno pytanie więcej przed wdrożeniem zmiany.',
];

export const REFLEKSJA_LUKI =
  'Spójrz na swoją największą lukę dodatnią (komunikacja: +0,77). Pomyśl o ostatnich dwóch tygodniach pracy z zespołem. Co robisz dobrze w komunikacji, choć Twoi ludzie tego nie dostrzegają? Zapisz jedną odpowiedź. Potem zadaj to samo pytanie jednemu liderowi zmianowemu i porównaj odpowiedzi. Różnica między nimi to mapa Twojego rozwoju komunikacyjnego.';

export const PYTANIA_OTWARTE = {
  za_co: [
    ['Przełożony', 'Niezawodny w sytuacjach kryzysowych. Gdy jest pożar, wszyscy patrzą na niego. Bierze odpowiedzialność, nie szuka winnych. Operacyjnie jest najlepszy w regionie.'],
    ['Współpracownik', 'Bardzo szybko wdraża nowe procedury, nie boi się zmiany. Można na niego liczyć, gdy klient ma niestandardowe oczekiwania.'],
    ['Współpracownik', 'Konkretny, rzeczowy. Nie owija w bawełnę, mówi co działa, a co nie.'],
    ['Podwładny', 'Zna magazyn jak własną kieszeń, nigdy nie zgubi się w temacie operacyjnym.'],
    ['Podwładny', 'Spokojny pod presją. Gdy peak, gdy chaos, nie panikuje. Trzyma zespół w ryzach.'],
    ['Współpracownik', 'Zawsze dotrzymuje słowa wobec klienta. To rzadkie.'],
    ['Podwładny', 'Sprawiedliwy. Jak coś jest dobrze, to powie. Jak źle, też powie.'],
  ] as [string, string][],
  do_rozwoju: [
    ['Podwładny', 'Mogłoby być więcej rozmów 1:1 z ludźmi z mojej zmiany. Dziś rozmawiamy tylko, jak coś nie działa.'],
    ['Współpracownik', 'Czasem decyzje zapadają bez konsultacji z nami, a wpływają na nasze działy.'],
    ['Podwładny', 'Brakuje mi konkretnego feedbacku. Nie wiem, czy robię dobrze, czy źle. Słyszę tylko, jak coś zawalę.'],
    ['Przełożony', 'Ma tendencję do brania wszystkiego na siebie. Czasem warto delegować więcej do liderów zmianowych. Ma silnych ludzi.'],
    ['Podwładny', 'Pod presją bywa zbyt szybki w komunikacji. Trzy zdania zamiast jednego, i nie zawsze nadążamy.'],
    ['Współpracownik', 'Mógłby być bardziej proaktywny w kontakcie z innymi działami.'],
    ['Podwładny', 'Chciałbym wiedzieć więcej o tym, „dlaczego” pewne decyzje są podejmowane. Wiem co, ale nie wiem dlaczego.'],
  ] as [string, string][],
};

// Plan działań 90 dni
export const PLAN_DZIALAN = {
  utrzymac: [
    ['Zarządzanie zmianą i adaptacja', 'Średnia 4.93/6. Najwyższy wynik w badaniu. Naturalna gotowość do testowania nowych rozwiązań i utrzymywania ciągłości operacji w trakcie wdrożeń.'],
    ['Decyzyjność w kryzysie', 'Średnia 4.67/6 z otoczenia, samoocena 5.4. „Gdy jest pożar, wszyscy patrzą na niego”. Branie odpowiedzialności bez przerzucania na zespół.'],
    ['Operacyjne kierowanie zespołem', 'Średnia 4.67/6. Najlepsza znajomość procesów magazynowych w regionie, konsekwencja w BHP i jakości.'],
  ] as [string, string][],
  zmienic: [
    ['Brak rytmu pozytywnej informacji zwrotnej', 'Najniższy wynik w raporcie (3.4/6 od podwładnych). To dźwignia numer 1. Drobna zmiana o największym efekcie.'],
    ['Brak włączania zespołu w decyzje', 'Luka samoocena vs podwładni: +1.2. Cytat: „Wiem co, ale nie wiem dlaczego”. Buduje subtelny dystans.'],
    ['Transakcyjna współpraca z działami', 'Cytat: „Mógłby być bardziej proaktywny w kontakcie z nami”. Klucz dla wartości PARTNERSTWO i One Step Ahead.'],
  ] as [string, string][],
  priorytety: [
    {
      naglowek: 'Priorytet 1 · działanie natychmiastowe (ten tydzień)',
      tytul: 'JEDNA KONKRETNA POCHWAŁA DZIENNIE',
      tresc: [
        'Każdego dnia, do godziny 14:00, podejdź do jednej osoby z zespołu i powiedz konkretnie, co zrobiła dobrze. Konkret to nazwa zachowania, sytuacja i skutek.',
        'Przykład. Zamiast „dobra robota” powiedz: „Tomasz, dziś przy przyjęciu od klienta bardzo szybko rozpoznałeś niezgodność na palecie. Gdyby to przeszło dalej, mielibyśmy reklamację. Dzięki.”',
        'Kosztuje 30 sekund. To dźwignia numer 1 z całego raportu.',
      ],
    },
    {
      naglowek: 'Priorytet 2 · nawyk do zbudowania w 30 dni',
      tytul: 'STAŁY RYTM 1:1 Z LIDERAMI ZMIANOWYMI',
      tresc: [
        'Raz w tygodniu, 30 minut z każdym z trzech liderów zmianowych. Ustal stały dzień i stałą godzinę. Wpisz to do kalendarza Outlook jako wydarzenie cykliczne.',
        'Agenda spotkania:',
        '1. Co działa (5 minut, niech lider mówi)',
        '2. Co nie działa (10 minut, niech lider proponuje rozwiązanie)',
        '3. Jedna decyzja, którą Ty podejmiesz, jedna którą oni (15 minut)',
      ],
    },
    {
      naglowek: 'Priorytet 3 · rozwój do monitorowania w 90 dni',
      tytul: 'PARTNERSTWO Z INNYMI DZIAŁAMI',
      tresc: [
        'Cel długoterminowy: zmień percepcję u kierowników innych działów (transport, obsługa klienta, jakość, IT) z transakcyjnej na partnerską.',
        'Konkretne kroki:',
        '1. Co miesiąc 30 minut nieformalnego spotkania z 1 kierownikiem.',
        '2. Raz w tygodniu krótka wiadomość do opiekunów handlowych.',
        '3. Raz na kwartał wizyta u jednego klienta z opiekunem handlowym.',
      ],
    },
  ],
  sciezki: [
    {
      nr: 'Ścieżka 1',
      tytul: 'SAMODZIELNIE',
      kroki: [
        'Wybierz 1 priorytet z planu działań',
        'Wpisz do kalendarza w tym tygodniu',
        'Codziennie 5 min refleksji wieczorem',
        'Po 30 dniach: wróć do raportu, sprawdź postęp',
      ],
    },
    {
      nr: 'Ścieżka 2',
      tytul: 'Z PRZEŁOŻONYM',
      kroki: [
        'Umów 45 min rozmowy w 7 dni od raportu',
        'Pokaż 3 priorytety i poproś o feedback',
        'Ustal mid-point review za 30 dni',
        'Poproś o wsparcie w jednej decyzji',
      ],
    },
    {
      nr: 'Ścieżka 3',
      tytul: 'Z COACHEM',
      kroki: [
        '4-6 sesji × 60 min w 3 miesiącach',
        'Pierwsza sesja: dekonstrukcja raportu',
        'Sesje 2-5: praca nad 1-2 nawykami',
        'Sesja końcowa: pomiar zmiany w zespole',
      ],
    },
  ],
};

// Słownik kluczowych pojęć
export const SLOWNIK = [
  {
    termin: 'Luka percepcji (Δ)',
    opis: 'Różnica między tym, jak Ty oceniasz swoje zachowanie, a jak ocenia je otoczenie. Wartość +1.0 oznacza, że widzisz siebie o 1 punkt wyżej niż zespół. To nie błąd zespołu. To informacja, że Twoja intencja nie zawsze trafia do odbiorcy tak, jak chcesz.',
  },
  {
    termin: 'Ukryty wpływ',
    opis: 'Sytuacja, gdy luka percepcji jest dodatnia (powyżej +0.4). Robisz coś dobrze, ale zespół nie widzi tego z taką samą siłą. To nie deficyt kompetencji. To deficyt komunikacji albo widoczności konkretnego zachowania.',
  },
  {
    termin: 'Pozytywny wpływ',
    opis: 'Sytuacja, gdy luka percepcji jest ujemna (poniżej -0.2). Zespół widzi Cię wyżej niż Ty sam. Często to niedoceniana mocna strona. Zrozum, skąd się bierze, i świadomie ją utrwalaj.',
  },
];

// Legenda kolorów
export const LEGENDA_KOLORY = [
  ['#003f8a', 'GRANAT · Twoje dane', 'Wyniki, średnie z otoczenia, nagłówki kompetencji, kluczowe liczby. To kolor faktów.'],
  ['#7aa83e', 'ZIELONY · mocne strony', 'Obszary, w których otoczenie widzi Cię jako skutecznego. To warto utrzymywać i wzmacniać.'],
  ['#ff6900', 'POMARAŃCZOWY · uwaga i rozwój', 'Luki percepcji, obszary do rozwoju, priorytet 1. To kolor zmiany.'],
  ['#0693e3', 'JASNY NIEBIESKI · kontekst', 'Tła boxów rekomendacyjnych, nawigacja, dodatkowe informacje. To kolor wsparcia.'],
  ['#999999', 'SZARY · luka neutralna', 'Tam, gdzie różnica między samooceną a otoczeniem jest minimalna (poniżej ±0.2).'],
] as [string, string, string][];

// Scenariusze czytania
export const SCENARIUSZE = [
  {
    czas: '10 min',
    nazwa: 'EXECUTIVE BRIEF',
    punkty: [
      'Przeczytaj „Wyniki w pigułce” i karty kompetencji',
      'Spójrz na 3 mocne strony i 3 obszary do rozwoju w „Analizie globalnej”',
      'Zatrzymaj się przy jednej rekomendacji w „Planie działań”',
    ],
  },
  {
    czas: '30 min',
    nazwa: 'KIEROWNIK',
    punkty: [
      'Powyższe + rozdział poświęcony Twojej najsłabszej kompetencji (K2)',
      'Przejrzyj cytaty z pytań otwartych, czytaj te, które poruszą',
      'Wybierz 1 rekomendację, którą wprowadzisz w tym tygodniu',
    ],
  },
  {
    czas: '90 min',
    nazwa: 'PEŁNA REFLEKSJA',
    punkty: [
      'Przeczytaj cały raport sekcja po sekcji',
      'Wybierz 2-3 kompetencje do priorytetu na 90 dni',
      'Wypełnij szablon „Plan rozwoju 90 dni”',
      'Umów się na 45-minutową rozmowę z przełożonym',
    ],
  },
];

export const MANIFEST = {
  naglowek: 'To nie jest raport o tym, kim jesteś.',
  tresc: 'To mapa tego, kim możesz się stać. Wyniki pokazują punkt startu, nie wyrok. Każda liczba w tym raporcie to zaproszenie do rozmowy. Z samym sobą, z zespołem, z przełożonym. Rozwój nie dzieje się w PDF. Dzieje się w pierwszej konkretnej pochwale w poniedziałek o 9:00. W pierwszym pytaniu „co o tym myślicie” przed decyzją. W pierwszym trzyzdaniowym komunikacie wysłanym na czat zespołu.',
  podpis: 'Brain Stream · Raport rozwojowy 360° · SUUS Logistics',
};

// Skala odpowiedzi 1-6
export const SKALA = [
  ['1', 'zdecydowanie się nie zgadzam / nigdy / poniżej oczekiwań'],
  ['2', 'raczej się nie zgadzam / rzadko'],
  ['3', 'trudno powiedzieć / czasem'],
  ['4', 'raczej się zgadzam / często'],
  ['5', 'zdecydowanie się zgadzam / prawie zawsze / powyżej oczekiwań'],
  ['6', 'wybitne / wzór dla innych'],
] as [string, string][];
