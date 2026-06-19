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
      'Na podstawie uzyskanego wyniku w obszarze kierowania zespołem operacyjnym można wnioskować, że Jan jest postrzegany jako sprawnie operacyjny kierownik magazynu, którego znajomość procesów stanowi podstawę stabilności pracy całego centrum logistycznego. Jednocześnie wynik ujawnia istotną różnicę między samooceną (5,2) a oceną zespołu podległego (4,4) — różnica ta nie wynika z braku kompetencji operacyjnych, lecz raczej z tego, że sprawność Jana jest na tyle oczywista, że nie zostawia zespołowi przestrzeni do samodzielnego podejmowania decyzji. Z perspektywy podwładnych może być to odbierane jako brak wiary w ich kompetencje lub jako sygnał, że ich rola w procesie decyzyjnym jest ograniczona.',
    znaczenie:
      'W środowisku organizacyjnym ta kompetencja ma fundamentalne znaczenie, ponieważ wpływa na tempo realizacji zadań magazynowych, jakość obsługi klienta zewnętrznego, poziom samodzielności liderów zmianowych oraz odporność operacyjną centrum w sytuacjach przeciążenia lub nieobecności kluczowych osób. Sposób, w jaki kierownik magazynu organizuje pracę zespołu, deleguje odpowiedzialność i utrzymuje rytm operacyjny, bezpośrednio przekłada się nie tylko na wskaźniki wydajności, ale również na poziom zaufania zespołu do lidera oraz na zdolność centrum do skalowania operacji bez utraty jakości.',
    kierunek:
      'W związku z tym rekomenduje się, aby Jan rozwijał tę kompetencję przede wszystkim poprzez większą intencjonalność w trzech wymiarach: świadomym delegowaniu odpowiedzialności do liderów zmianowych, wprowadzeniu regularnego rytmu spotkań indywidualnych oraz budowaniu spójności komunikatów między zmianami.',
    punkty: [
      [
        'Wprowadziła stały, niczym nieprzerywany rytm spotkań indywidualnych z liderami zmianowymi',
        'Kluczowym elementem rozwojowym będzie wprowadzenie cyklicznych, trzydziestominutowych spotkań indywidualnych z każdym z trzech liderów zmianowych. Spotkania powinny odbywać się w stałych dniach i godzinach, z prostą agendą trzech punktów: co działa w mojej zmianie, co nie działa, jaka jedna decyzja operacyjna pozostaje w moich rękach na ten tydzień. Po sześciu do ośmiu tygodniach takiej praktyki zauważalny stanie się wzrost samodzielności liderów oraz spadek liczby decyzji eskalowanych do kierownika.',
      ],
      [
        'Świadomie delegowała powtarzalne typy decyzji operacyjnych',
        'Warto, aby Jan wybrał trzy do pięciu kategorii decyzji operacyjnych, które dziś podejmuje samodzielnie, a które mogą zostać oddane liderom zmianowym (na przykład reorganizacja stanowisk przy peakach, decyzje o nadgodzinach do czterech godzin, lokalizacja niestandardowych przyjęć). Spisanie tych kategorii, omówienie ich podczas spotkania indywidualnego oraz formalne przekazanie odpowiedzialności tworzy ramę, w której liderzy mają jasność co do swojej autonomii decyzyjnej.',
      ],
      [
        'Wprowadziła wspólny dashboard dnia jako narzędzie wyrównywania komunikatów między zmianami',
        'Jednym z sygnałów ujawniających się w wynikach jest brak spójności komunikatów między zmianami. Wprowadzenie jednego, wspólnego miejsca (fizyczna tablica w biurze kierownictwa lub dokument elektroniczny) z pięcioma kluczowymi wskaźnikami (wolumen przyjęć, wolumen wydań, błędy, opóźnienia, sytuacje BHP), aktualizowanego przed każdą odprawą, wyrównuje obraz pracy między grupami i odciąża kierownika z roli osobistego centrum informacyjnego.',
      ],
      [
        'Wprowadziła standardową odprawę zmianową w stałym formacie',
        'Dziś odprawy odbywają się nieregularnie, a każda zmiana ma własny format. Warto wprowadzić dziesięciominutową odprawę przed startem każdej zmiany w stałym formacie czterech punktów: priorytet dnia, kluczowe ryzyka, sprawa BHP wymagająca uwagi, jedna pozytywna obserwacja z poprzedniej zmiany. Stała struktura buduje rytm, obniża poczucie chaosu i buduje ciągłość informacyjną między zmianami.',
      ],
      [
        'Świadomie obserwowała własny wzorzec podejmowania decyzji',
        'Pomocnym elementem rozwojowym będzie wprowadzenie krótkiej refleksji pod koniec każdego dnia roboczego: ile decyzji operacyjnych podjąłem dziś samodzielnie, ile zostawiłem zespołowi, która z nich była naprawdę nieodwracalna, a która mogła zostać podjęta przez lidera. Po kilku tygodniach takiej obserwacji pojawia się świadomość własnych nawyków decyzyjnych, która jest punktem wyjścia do realnej zmiany sposobu działania.',
      ],
      [
        'Wzmacniała widoczność liderów zmianowych jako współgospodarzy centrum',
        'Rozwojowo istotne będzie świadome budowanie pozycji liderów zmianowych jako współgospodarzy centrum, a nie wyłącznie wykonawców poleceń kierownika. W praktyce oznacza to publiczne delegowanie decyzji w obecności zespołu, podkreślanie roli lidera w komunikatach do innych działów oraz włączanie liderów do rozmów z opiekunami klientów wewnętrznych. Tak zbudowana widoczność wspiera ich rozwój, ale również obniża zależność operacji od jednej osoby.',
      ],
    ],
    uwagi: [
      'Czy obecny styl zarządzania utrwala zależność zespołu od kierownika, czy buduje samodzielność?',
      'Czy decyzje operacyjne są podejmowane przez kierownika z nawyku, czy z realnej konieczności?',
      'Czy liderzy zmianowi otrzymują jasny zakres autonomii decyzyjnej, czy działają w obszarze niedopowiedzeń?',
      'Czy odprawy zmianowe są rytuałem porządkującym pracę, czy okazjonalnymi spotkaniami informacyjnymi?',
      'Czy istnieje wspólny obraz operacyjny dnia, dostępny dla wszystkich zmian?',
    ],
    dzialania: [
      'wprowadzenie cyklicznych spotkań indywidualnych z liderami zmianowymi (co tydzień, 30 minut, stała godzina)',
      'spisanie listy trzech do pięciu kategorii decyzji do delegowania i formalne przekazanie ich liderom',
      'utworzenie wspólnego dashboardu dnia jako narzędzia komunikacji międzyzmianowej',
      'wdrożenie standardowej odprawy zmianowej w formacie czterech punktów',
      'udział w warsztacie poświęconym przywództwu sytuacyjnemu i delegowaniu odpowiedzialności',
      'praca z mentorem nad analizą realnych sytuacji decyzyjnych z ostatniego miesiąca',
    ],
    wskazniki: [
      'wzrost liczby decyzji operacyjnych podejmowanych samodzielnie przez liderów zmianowych (cel: minimum 3 na tydzień)',
      'spadek liczby spraw eskalowanych do kierownika w sytuacjach standardowych',
      'obecność spójnego obrazu operacyjnego dnia, dostępnego dla każdej zmiany',
      'wzrost subiektywnej oceny samodzielności wyrażanej przez liderów w spotkaniach indywidualnych',
      'obniżenie liczby skarg na chaos komunikacyjny zgłaszanych przez podwładnych',
      'kierownik postrzegany jako osoba budująca dojrzałość zespołu, a nie tylko zarządzająca operacjami',
    ],
  },
  K2: {
    wprowadzenie:
      'Wynik w obszarze komunikacji i informacji zwrotnej jest najniższym wynikiem w całym raporcie i jednocześnie zawiera największą lukę między samooceną (4,5) a oceną zespołu podległego (3,4). Różnica wynosząca 1,1 punktu wskazuje, że Jan nie do końca zdaje sobie sprawę z tego, jak jego obecny sposób komunikowania się z zespołem jest odbierany przez pracowników. Z perspektywy otoczenia komunikat ten ma postać dość jednoznaczną — w pytaniach otwartych członkowie zespołu wprost mówią: „brakuje mi konkretnego feedbacku, nie wiem, czy robię dobrze, czy źle, słyszę tylko jak coś zawalę”. Nie jest to sygnał o braku umiejętności komunikacyjnych — Jan potrafi prowadzić nawet trudne rozmowy bez utraty relacji. Jest to sygnał o braku rytmu i przewidywalności informacji zwrotnej w codziennej pracy.',
    znaczenie:
      'W praktyce organizacyjnej ta kompetencja ma kluczowe znaczenie, ponieważ wpływa bezpośrednio na poziom zaangażowania zespołu, identyfikację pracowników z firmą, gotowość do zgłaszania problemów oraz zdolność do uczenia się na bieżąco. Brak rytmu informacji zwrotnej obniża poczucie bezpieczeństwa psychologicznego — pracownicy zaczynają funkcjonować w trybie czekania na złe wiadomości, co osłabia ich inicjatywę i sprzyja postawom zachowawczym. W kontekście SUUS jako operatora logistycznego, w którym 18-osobowy zespół magazynowy odpowiada za realizację zobowiązań wobec kluczowych klientów, obniżona kultura informacji zwrotnej przekłada się również na wskaźnik retencji oraz na koszty rekrutacji i wdrażania nowych pracowników.',
    kierunek:
      'Z uwagi na skalę i znaczenie tej luki rekomenduje się potraktowanie obszaru komunikacji rozwojowej jako najwyższego priorytetu rozwojowego Jana w nadchodzących trzech do sześciu miesięcy. Rekomendowane kierunki działania koncentrują się na trzech wymiarach: regularności pochwał i informacji pozytywnej, strukturze rozmów korygujących oraz świadomym tworzeniu przestrzeni dla głosu pracownika.',
    punkty: [
      [
        'Wprowadziła codzienny rytuał konkretnej pochwały, niezależnie od sytuacji',
        'Kluczowym pierwszym krokiem jest wprowadzenie zasady jednej konkretnej pochwały dziennie. Każdego dnia roboczego, do godziny czternastej, Jan podchodzi do jednej osoby z zespołu i mówi konkretnie, co ta osoba zrobiła dobrze. Konkret oznacza tu trzy elementy: imię osoby, opis konkretnego zachowania (nie ogólnej cechy charakteru) oraz opis wpływu tego zachowania na zespół, klienta lub wynik pracy. Zasadnicze jest unikanie ogólnych formuł typu „dobra robota” lub „świetnie sobie radzisz”, które nie niosą żadnej realnej informacji. Po cztery tygodniach takiej praktyki nawyk zaczyna działać samoczynnie i kultura zespołu zauważalnie się zmienia.',
      ],
      [
        'Stosowała stałą strukturę informacji zwrotnej w sytuacjach korygujących',
        'Drugim kierunkiem jest wprowadzenie powtarzalnej struktury rozmów korygujących, opartej na trzech elementach: opis sytuacji (kiedy i gdzie zdarzenie miało miejsce), opis konkretnego zachowania (co dokładnie pracownik zrobił lub czego nie zrobił), opis wpływu (jaki to miało skutek dla zespołu, klienta lub procesu). Ta struktura zajmuje trzydzieści sekund dłużej niż zwykła uwaga, ale buduje u pracownika obraz „co dokładnie zmienić”. Bez tej struktury pracownik często nie wie, co konkretnie zrobił niewłaściwie — wie tylko, że szef jest niezadowolony.',
      ],
      [
        'Świadomie wprowadziła pauzę po zadawaniu pytań',
        'Pod presją Jan ma tendencję do odpowiadania na własne pytania, zanim zespół zdąży je przemyśleć. Świadome wprowadzenie trzysekundowej pauzy po zadanym pytaniu zmienia dynamikę rozmowy. Pracownicy z dłuższym czasem przetwarzania, którzy potrzebują chwili na sformułowanie myśli, zaczynają wnosić więcej do rozmowy. Ćwiczenie tego nawyku można zacząć na spotkaniach indywidualnych, gdzie tempo jest spokojniejsze, a następnie przenosić na odprawy zmianowe.',
      ],
      [
        'Wprowadziła miesięczne, krótkie rozmowy rozwojowe z każdym członkiem zespołu',
        'Czwartym krokiem jest wprowadzenie regularnych, krótkich (trzydzieści minut) rozmów rozwojowych raz w miesiącu z każdym z osiemnastu podwładnych. Stała data, stałe miejsce, stała struktura trzech pytań: co poszło najlepiej w tym miesiącu, co najbardziej przeszkadzało w pracy, czego chciałbyś nauczyć się w kolejnym miesiącu. Notowanie odpowiedzi pozwala po trzech miesiącach zbudować realną mapę zespołu — narzędzie, którego dziś brak. Inwestycja czasowa to około jeden tydzień pracy w skali roku, a wartość jest wielokrotnie większa.',
      ],
      [
        'Świadomie prosiła zespół o informację zwrotną dla siebie',
        'Piąty kierunek jest najbardziej zaawansowany, ale również najpotężniejszy. Raz w tygodniu Jan prosi dwie osoby z zespołu o krótką informację zwrotną dotyczącą jego własnego sposobu komunikacji. Pytanie: „co w mojej komunikacji w tym tygodniu pomogło ci w pracy, a co utrudniło?”. To narzędzie zmienia własny styl komunikacji szybciej niż jakiekolwiek szkolenie i jednocześnie modeluje kulturę informacji zwrotnej dla całego zespołu — bo jeśli kierownik prosi o feedback dla siebie, zespół zaczyna rozumieć, że feedback jest wartością, a nie zagrożeniem.',
      ],
      [
        'Adresowała różnice komunikacyjne między pracownikami z różnym stażem',
        'Pod presją Jan komunikuje się w skrótach, które są zrozumiałe dla osób z dłuższym stażem, ale dla nowych pracowników są niejasne. Świadome rozróżnienie sposobu komunikacji w zależności od stażu pracownika (więcej wyjaśnień dla nowych, bardziej skondensowane komunikaty dla doświadczonych) jest praktyczną kompetencją, którą można rozwijać poprzez samoobserwację i prośby o informację zwrotną od osób o różnym stażu w zespole.',
      ],
    ],
    uwagi: [
      'Czy informacja zwrotna istnieje wyłącznie jako reakcja na błąd, czy także jako codzienna praktyka?',
      'Czy zespół pamięta konkretną pochwałę z ostatniego miesiąca?',
      'Czy nowi pracownicy rozumieją skróty komunikacyjne, których używa kierownik pod presją?',
      'Czy istnieje rytm rozmów rozwojowych, czy spotkania indywidualne pojawiają się tylko gdy coś nie działa?',
      'Czy kierownik zna trzy najważniejsze potrzeby rozwojowe każdej osoby w zespole?',
    ],
    dzialania: [
      'wprowadzenie codziennej zasady jednej konkretnej pochwały do godziny czternastej',
      'stosowanie struktury Sytuacja-Zachowanie-Wpływ w każdej rozmowie korygującej',
      'wprowadzenie miesięcznych trzydziestominutowych rozmów rozwojowych z każdym podwładnym',
      'cotygodniowa prośba o informację zwrotną od dwóch osób z zespołu',
      'udział w warsztacie poświęconym informacji zwrotnej i komunikacji rozwojowej',
      'praca z mentorem nad nagraniem własnych rozmów i analizą stylu komunikacji',
    ],
    wskazniki: [
      'trzy z pięciu zapytanych osób z zespołu pamięta konkretną pochwałę z ostatniego miesiąca',
      'regularność miesięcznych rozmów rozwojowych z wszystkimi podwładnymi (cel: 100% w skali kwartału)',
      'wzrost subiektywnego poczucia bezpieczeństwa psychologicznego w zespole (mierzony jakościowo)',
      'spadek liczby skarg na brak informacji zwrotnej w pytaniach otwartych w kolejnym badaniu',
      'wzrost liczby pracowników proaktywnie zgłaszających pomysły usprawnień',
      'kierownik postrzegany jako osoba, która buduje rozwój ludzi, nie tylko zarządza operacjami',
    ],
  },
  K3: {
    wprowadzenie:
      'Bardzo wysoki wynik w obszarze zarządzania zmianą wskazuje, że Jan jest postrzegany jako lider, który potrafi skutecznie prowadzić zespół przez sytuacje niepewności, transformacji oraz wdrażania nowych rozwiązań operacyjnych. Wynik ten jest jedyną kompetencją w raporcie, w której zespół podległy ocenia Jana wyżej niż on sam siebie — co stanowi istotny sygnał pozytywnego wpływu i wskazuje, że jego praca w obszarze zmiany jest doceniana mocniej niż on sam jest tego świadomy. Z perspektywy Centrum Logistycznego w Łodzi jest to kompetencja o szczególnym znaczeniu, ponieważ branża logistyczna znajduje się w fazie ciągłej transformacji systemów, procesów i wymagań klientów.',
    znaczenie:
      'W praktyce biznesowej ta kompetencja jest jednym z kluczowych zasobów strategicznych SUUS w kontekście planowanego wzrostu wolumenu operacji, otwierania nowych centrów oraz wdrażania nowych systemów informatycznych i procesów obsługi klienta. Kierownik operacyjny, który potrafi prowadzić zespół przez zmianę bez utraty ciągłości pracy, jest osobą, na której organizacja może oprzeć inicjatywy transformacyjne. Skuteczne zarządzanie zmianą bezpośrednio przekłada się na trzy wymiary biznesowe: tempo wdrażania nowych rozwiązań, koszty błędów w okresie przejściowym oraz poziom retencji pracowników w fazie zmian.',
    kierunek:
      'W przypadku tak wysokiego wyniku działania rozwojowe nie powinny koncentrować się na „naprawianiu” kompetencji, lecz na jej utrwalaniu, świadomym skalowaniu oraz wykorzystywaniu jako mocnej strony przywódczej w szerszym kontekście organizacyjnym. Jednocześnie warto adresować jeden konkretny obszar do dalszego doskonalenia: świadome komunikowanie sensu zmiany („dlaczego”), które dzisiaj bywa pomijane na rzecz komunikatu „co” i „jak”.',
    punkty: [
      [
        'Utrzymywała wysoki standard wdrażania zmian, jednocześnie wzmacniając komunikację „dlaczego”',
        'Silną stroną Jana jest umiejętność wdrażania zmian operacyjnych bez utraty ciągłości pracy. Rozwojowo warto wzmacniać jeden konkretny element, który dziś bywa pomijany — komunikowanie sensu zmiany, jej kontekstu biznesowego oraz powodu, dla którego zmiana jest wprowadzana. Przy każdej kolejnej zmianie warto rozpocząć komunikat od jednego zdania zaczynającego się od słowa „ponieważ”. Zespół wykonuje zmianę szybciej, ale nie zawsze rozumie jej sens, co osłabia trwałość wdrożenia i sprzyja powracaniu do starych nawyków po zakończeniu okresu początkowej presji.',
      ],
      [
        'Świadomie włączała liderów zmianowych w fazę projektowania zmiany',
        'Drugim kierunkiem jest wprowadzenie nawyku zapraszania dwóch lub trzech liderów zmianowych do roli ambasadorów zmiany przed jej formalnym wdrożeniem. Godzinny warsztat z trzema pytaniami: co tu może nie zadziałać, co najbardziej zaboli pracowników w pierwszym tygodniu, co byśmy zrobili lepiej, gdybyśmy mieli o tym pomyśleć od początku. Zwykle zespół przyniesie pięć do dziesięciu obserwacji, których kierownik nie widzi zza biurka. Jednocześnie te osoby stają się sojusznikami w czasie wdrożenia.',
      ],
      [
        'Wprowadziła kartę zmiany jako standard komunikacyjny w centrum',
        'Trzecim krokiem jest wprowadzenie jednostronicowego standardu komunikacji każdej istotnej zmiany operacyjnej. Karta zmiany zawiera: tytuł, datę startu, kogo dotyczy, co się zmienia, po co, do kogo z pytaniami, kiedy odbędzie się retrospektywa po wdrożeniu. Karta wisi przy odprawach zmianowych przez pierwsze dwa tygodnie po wdrożeniu. To narzędzie standaryzujące komunikację i jednocześnie zapobiegające plotce „znowu coś nam zmieniają”.',
      ],
      [
        'Świadomie dzieliła się dobrymi praktykami z innymi kierownikami operacji w SUUS',
        'Przy bardzo wysokim wyniku warto rozważyć wykorzystanie tej kompetencji nie tylko na poziomie własnego zespołu, ale również jako elementu wpływu organizacyjnego. Jan może pełnić rolę wewnętrznego ambasadora dobrych praktyk w obszarze prowadzenia zmian, wspierając innych kierowników poprzez nieformalne dzielenie się narzędziami, opowiadanie konkretnych przypadków lub udział w spotkaniach regionalnych z innymi kierownikami centrów logistycznych.',
      ],
      [
        'Dbała o równowagę między tempem wdrażania a realną gotowością zespołu do adaptacji',
        'Wysoka kompetencja w obszarze zmiany bywa powiązana z większą naturalną tolerancją lidera na niepewność i dynamikę niż u części pracowników. Rozwojowo istotne będzie świadome obserwowanie, czy tempo wdrażania zmian odpowiada realnej gotowości zespołu, czy też wynika z osobistej łatwości funkcjonowania kierownika w zmienności. Warto pytać liderów zmianowych o ich subiektywne poczucie tempa zmian — i traktować ich opinie jako realny wskaźnik.',
      ],
      [
        'Rozwijała refleksyjność wokół własnego stylu przywództwa w zmianie',
        'Nawet bardzo wysoki wynik warto traktować jako zasób, który można dalej doskonalić poprzez świadomą refleksję. Pomocne będzie okresowe (raz na kwartał, trzydzieści minut) przyglądanie się temu, które konkretne działania jako lidera najmocniej wsparły zespół w ostatniej zmianie, jakie praktyki dały najwyższą skuteczność wdrożeniową oraz w jaki sposób można te praktyki wzmacniać świadomie, a nie wyłącznie intuicyjnie.',
      ],
    ],
    uwagi: [
      'Czy zespół rozumie powód zmiany, czy jedynie wykonuje jej zakres?',
      'Czy liderzy zmianowi są włączeni w fazę projektowania, czy tylko we wdrożenie?',
      'Czy istnieje standardowa karta zmiany jako narzędzie komunikacyjne?',
      'Czy tempo wdrażania zmian odpowiada gotowości zespołu, czy jest pochodną tempa kierownika?',
      'Czy wysoka kompetencja kierownika jest dzielona z innymi liderami w organizacji, czy pozostaje zasobem indywidualnym?',
    ],
    dzialania: [
      'wprowadzenie formuły komunikacyjnej rozpoczynającej każdą zmianę od słowa „ponieważ”',
      'organizowanie godzinnych warsztatów z liderami zmianowymi przed każdą większą zmianą',
      'stworzenie i wdrożenie standardu karty zmiany jako narzędzia komunikacyjnego',
      'kwartalna refleksja nad własnym stylem prowadzenia zmian (30 minut, samodzielnie lub z mentorem)',
      'udział w spotkaniach regionalnych jako naturalny ambasador dobrych praktyk',
      'rozważenie roli mentora dla innych kierowników operacji w SUUS',
    ],
    wskazniki: [
      'siedemdziesiąt procent zespołu potrafi powtórzyć powód zmiany własnymi słowami po dwóch tygodniach',
      'minimum dwie uwagi liderów zmianowych uwzględnione w fazie projektowania każdej zmiany',
      'każda istotna zmiana operacyjna ma swoją kartę zmiany',
      'kierownik postrzegany jako wiarygodny i stabilny lider transformacji',
      'praktyki Jana są świadomie powielane przez liderów zmianowych w ich własnej pracy',
      'zmiana nie tylko jest wdrażana, ale również trwale zakotwicza się w sposobie pracy zespołu',
    ],
  },
  K4: {
    wprowadzenie:
      'Wynik w obszarze orientacji na klienta i partnerstwa biznesowego ujawnia istotną asymetrię w sposobie postrzegania Jana przez różne grupy oceniające. Przełożony widzi go jako rzetelnego partnera biznesowego (4,8), współpracownicy z innych działów oceniają go niżej (4,3), a podwładni najsłabiej (4,0). Klient zewnętrzny widzi w Janie operatora przewidywalnego, na którym można polegać. Inne działy oraz członkowie zespołu odbierają jego współpracę jako bardziej transakcyjną — taką, która polega na dotrzymywaniu zobowiązań, ale nie na wspólnym budowaniu rozwiązań. Luka między samooceną (5,0) a oceną podwładnych (4,0) wynosi jeden punkt i jest drugą najwyższą w raporcie.',
    znaczenie:
      'W kontekście SUUS jako operatora logistycznego klasy premium, kompetencja partnerstwa biznesowego ma znaczenie strategiczne. Każda relacja kierownika operacyjnego z opiekunem handlowym, z transportem, z obsługą klienta, z jakością czy z IT bezpośrednio przekłada się na efektywność całego łańcucha dostaw klienta zewnętrznego. W centrach, w których kierownicy operacji praktykują regularny kontakt z innymi działami, średnia długość kontraktu z klientem jest dłuższa, a wskaźnik satysfakcji wyższy. To są dane bezpośrednio związane z przewagą konkurencyjną SUUS oraz z realizacją wartości PARTNERSTWO i ONE STEP AHEAD, które firma deklaruje publicznie.',
    kierunek:
      'Rekomenduje się, aby Jan rozwijał tę kompetencję poprzez świadome przesunięcie postrzegania współpracy z modelu „mój magazyn i inni” do modelu „jeden ekosystem klienta”. Trzy kluczowe kierunki to: regularny rytm spotkań międzydziałowych, proaktywna komunikacja z opiekunami klientów oraz włączanie głosu klienta do codziennej pracy zespołu.',
    punkty: [
      [
        'Wprowadziła kwartalne wizyty u kluczowych klientów wraz z opiekunem handlowym',
        'Najbardziej rozwojowym działaniem w tej kompetencji jest świadome zaplanowanie jednej wizyty u kluczowego klienta SUUS raz na kwartał, wspólnie z opiekunem handlowym po stronie obsługi klienta. Najszybszy sposób, aby zobaczyć, co dzieje się z paletą po wyjściu z bramy magazynu, to zobaczyć to na własne oczy. Po jednej takiej wizycie język rozmów wewnętrznych Jana zmienia się na sześć miesięcy do przodu — jest to doświadczenie, którego nie da się zastąpić żadnym raportem.',
      ],
      [
        'Wprowadziła rytm miesięcznych spotkań z kierownikami z innych działów',
        'Drugim kierunkiem jest wprowadzenie stałego rytmu trzydziestominutowych spotkań z kierownikami z innych działów (po kolei: transport, obsługa klienta, jakość, IT). Jedno spotkanie miesięcznie. Bez agendy operacyjnej, bez listy spraw do załatwienia. Pytanie startowe: „co w mojej pracy ułatwia tobie życie, a co utrudnia”. Notowanie odpowiedzi i wprowadzanie konkretnych ulepszeń buduje partnerstwo, którego dziś brakuje.',
      ],
      [
        'Wprowadziła cotygodniowy kanał komunikacji z opiekunami handlowymi kluczowych klientów',
        'Trzeci krok rozwojowy to wprowadzenie cotygodniowej krótkiej wiadomości do opiekunów handlowych po stronie obsługi klienta. Trzy elementy: jedno zdanie statusu, jedno ryzyko, jedna pozytywna obserwacja. Dziesięć minut pracy w skali tygodnia. To narzędzie buduje obraz „operacja, która myśli o sprzedaży” oraz pełni funkcję wczesnego ostrzegania w sytuacjach problemowych.',
      ],
      [
        'Włączała głos klienta do odpraw zmianowych zespołu',
        'Czwarty kierunek dotyczy zespołu, nie tylko Jana. Raz w tygodniu, podczas odprawy zmianowej, Jan dzieli się jedną konkretną rzeczą, którą klient powiedział o pracy zespołu — pochwałą, uwagą, oczekiwaniem. Konkret + imię klienta. To jedno zdanie zmienia abstrakcyjnego klienta w konkretną osobę z konkretną reakcją. Po kilku tygodniach takiej praktyki zespół zaczyna pracować z innym poziomem świadomości tego, co dzieje się poza bramą magazynu.',
      ],
      [
        'Świadomie nazywała wartość wspólnego rezultatu w rozmowach z innymi działami',
        'Piąty krok rozwojowy to świadome przesunięcie języka rozmów wewnętrznych z perspektywy „interes mojego magazynu” na perspektywę „interes wspólny klienta”. W praktyce oznacza to, że w rozmowach z transportem czy obsługą klienta Jan świadomie używa formuł typu „co byłoby najlepsze dla klienta X w tej sytuacji”, zamiast „co jest możliwe z mojej strony”. Ta drobna zmiana języka buduje kulturę partnerstwa.',
      ],
      [
        'Świadomie modelowała zachowania partnerskie w obecności zespołu',
        'Szósty krok dotyczy modelowania kultury. Zespół podległy Jana obserwuje, jak rozmawia on z innymi działami i z opiekunami klientów. Świadome rozmowy partnerskie w obecności pracowników są najsilniejszym narzędziem zmiany kultury zespołu — bo ludzie uczą się przez obserwację lidera, nie przez słuchanie jego deklaracji o partnerstwie.',
      ],
    ],
    uwagi: [
      'Czy język rozmów Jana z innymi działami jest partnerski czy transakcyjny?',
      'Czy Jan był u realnego klienta zewnętrznego w ostatnich dwunastu miesiącach?',
      'Czy istnieje stały rytm komunikacji z opiekunami handlowymi kluczowych klientów?',
      'Czy zespół słyszy głos klienta w codziennej pracy, czy tylko wtedy, gdy pojawia się reklamacja?',
      'Czy Jan modeluje partnerstwo zachowaniem, czy tylko deklaracją?',
    ],
    dzialania: [
      'zaplanowanie kwartalnej wizyty u kluczowego klienta wraz z opiekunem handlowym',
      'wprowadzenie miesięcznych spotkań z kierownikami z innych działów (transport, obsługa klienta, jakość, IT)',
      'wprowadzenie cotygodniowej wiadomości do opiekunów handlowych kluczowych klientów',
      'włączenie głosu klienta do cotygodniowych odpraw zmianowych',
      'udział w warsztacie poświęconym partnerstwu biznesowemu i orientacji na klienta',
      'wspólny projekt usprawnieniowy z innym działem (transport lub obsługa klienta)',
    ],
    wskazniki: [
      'minimum jedna wizyta u klienta zewnętrznego w skali kwartału',
      'cztery odbyte spotkania z kierownikami z innych działów w skali roku',
      'regularny cotygodniowy kanał komunikacji z opiekunami handlowymi',
      'zespół potrafi przytoczyć ostatnią pozytywną informację od klienta',
      'wzrost subiektywnej oceny Jana w oczach kierowników z innych działów',
      'kierownik postrzegany jako partner biznesowy, nie tylko jako wykonawca operacyjny',
    ],
  },
  K5: {
    wprowadzenie:
      'Wynik w obszarze decyzyjności i odpowiedzialności za wynik wskazuje, że Jan jest postrzegany jako kierownik o wysokiej odwadze decyzyjnej i wyraźnym poczuciu odpowiedzialności. Cytat przełożonego z pytań otwartych mówi wprost: „gdy jest pożar, wszyscy patrzą na niego”. Jednocześnie luka między samooceną Jana (5,4) a oceną zespołu podległego (4,2) wynosi 1,2 punktu, co jest najwyższą luką w całym raporcie. Zespół ufa decyzjom Jana, ale jednocześnie nie czuje się włączony w proces ich podejmowania i nie zawsze rozumie ich uzasadnienie. W cytatach z pytań otwartych pojawia się fraza: „wiem co, ale nie wiem dlaczego”.',
    znaczenie:
      'W praktyce organizacyjnej decyzyjność operacyjna jest jedną z najważniejszych kompetencji kierowniczych w środowisku logistycznym, w którym czas reakcji na odchylenie od planu bezpośrednio wpływa na wskaźniki obsługi klienta. Wysoka odwaga decyzyjna Jana jest zasobem strategicznym SUUS, który należy świadomie utrwalać. Jednocześnie sposób komunikowania decyzji ma równie istotne znaczenie dla zaangażowania zespołu, bo niezaangażowany zespół generuje wyższe koszty operacyjne, niższą inicjatywę i wyższą rotację. Kompetencja decyzyjności w pełnym wymiarze obejmuje zatem nie tylko podejmowanie decyzji, ale również ich komunikację oraz włączanie zespołu w proces.',
    kierunek:
      'Rekomenduje się, aby Jan rozwijał tę kompetencję w trzech wymiarach: świadomego komunikowania uzasadnienia decyzji, rozróżniania decyzji odwracalnych i nieodwracalnych oraz włączania liderów zmianowych w proces decyzyjny dotyczący spraw bezpośrednio dotykających zespołu.',
    punkty: [
      [
        'Wprowadziła trzyzdaniowy komunikat decyzji jako standard komunikacyjny',
        'Najmocniejszą rekomendacją w tej kompetencji jest wprowadzenie zasady, że po każdej istotnej decyzji wpływającej na pracę zespołu Jan wysyła trzy zdania. Pierwsze: co decyduję. Drugie: dlaczego (krótkie uzasadnienie, ewentualnie wymienienie alternatyw, które rozważał). Trzecie: co ta decyzja oznacza dla zespołu. Komunikat może być wysłany na grupowy czat, na tablicę ogłoszeń lub przekazany ustnie podczas odprawy. Cały proces zajmuje sześćdziesiąt sekund. Po trzydziestu dniach takiej praktyki odbiór decyzji w zespole zmienia się z „znowu szef tak zdecydował” na „rozumiem, dlaczego”.',
      ],
      [
        'Świadomie rozróżniała decyzje odwracalne i nieodwracalne',
        'Drugim kierunkiem rozwojowym jest wprowadzenie świadomego rozróżnienia między dwoma typami decyzji. Decyzje nieodwracalne (zwolnienie pracownika, zakup sprzętu, zobowiązanie wobec klienta) wymagają więcej konsultacji, więcej czasu, więcej rozważenia alternatyw. Decyzje odwracalne (układ stanowisk, harmonogram odprawy, format raportu, organizacja pre-shift) można podejmować szybko, eksperymentalnie, samodzielnie. Dziś Jan traktuje wszystkie decyzje podobnie, co spowalnia tempo pracy zespołu i sprawia, że drobne sprawy zajmują tyle samo czasu co sprawy strategiczne.',
      ],
      [
        'Świadomie konsultowała z liderami zmianowymi decyzje dotyczące zespołu',
        'Trzecim krokiem jest wprowadzenie nawyku zadawania jednego pytania liderom zmianowym przed podjęciem decyzji bezpośrednio dotyczącej pracy zespołu. Pytanie: „co o tym myślicie, zanim zdecyduję”. Decyzja może się nie zmienić. Ale zespół zyskuje poczucie sprawczości. Dziś podwładni dają Janowi 4,2 w tej kompetencji głównie dlatego, że nie czują się włączeni w proces — nie dlatego, że nie ufają jego decyzjom.',
      ],
      [
        'Wprowadziła comiesięczny przegląd własnych decyzji jako praktykę uczenia się',
        'Czwartym krokiem rozwojowym jest praktyka świadomego uczenia się z własnych decyzji. Raz w miesiącu, trzydzieści minut, samodzielnie lub z mentorem: weź trzy do pięciu ostatnich istotnych decyzji i odpowiedz sobie na trzy pytania: co dziś z tej decyzji działa, co nie działa, co zrobiłbym dziś inaczej. Notowanie odpowiedzi przez sześć miesięcy buduje mapę własnych wzorców decyzyjnych — narzędzie, którego większość kierowników operacji nigdy nie ma.',
      ],
      [
        'Świadomie nazywała alternatywy w komunikacji decyzji',
        'Piąty kierunek to świadome wzbogacanie komunikatu decyzji o krótką wzmiankę o alternatywach, które zostały rozważone i odrzucone. To nie jest dyskusja o decyzji — to jest sygnał dla zespołu, że decyzja powstała w wyniku przemyślanego procesu, a nie impulsu. Buduje to zaufanie do decyzyjności kierownika i jednocześnie modeluje sposób myślenia, który mogą przejmować liderzy zmianowi w swoich własnych decyzjach.',
      ],
      [
        'Świadomie zarządzała tempem decyzji dla utrzymania energii zespołu',
        'Szósty krok rozwojowy dotyczy energii. Decyzje podejmowane szybko, w trybie kryzysowym, w obecności presji, mogą być trafne, ale wyczerpują zespół, jeśli pojawiają się zbyt często. Świadome zarządzanie tempem (które decyzje są pilne, które mogą poczekać do następnej zmiany, które do następnego tygodnia) chroni energię zespołu i pozwala utrzymać wysoką jakość podejmowanych wyborów w długim horyzoncie czasowym.',
      ],
    ],
    uwagi: [
      'Czy zespół rozumie powód decyzji, czy widzi tylko jej skutek?',
      'Czy decyzje odwracalne są podejmowane z taką samą wagą jak nieodwracalne?',
      'Czy liderzy zmianowi są pytani o opinię przed decyzjami dotyczącymi zespołu?',
      'Czy istnieje praktyka uczenia się z własnych decyzji, czy decyzje są podejmowane bez retrospektywy?',
      'Czy tempo decyzji odpowiada realnej energii zespołu, czy wyczerpuje go w długim horyzoncie?',
    ],
    dzialania: [
      'wprowadzenie standardu trzyzdaniowego komunikatu decyzji',
      'wprowadzenie świadomego rozróżnienia decyzji odwracalnych i nieodwracalnych',
      'wprowadzenie pytania „co o tym myślicie, zanim zdecyduję” przed decyzjami dotyczącymi zespołu',
      'comiesięczny trzydziestominutowy przegląd własnych decyzji (samodzielnie lub z mentorem)',
      'udział w warsztacie poświęconym podejmowaniu decyzji w warunkach niepewności',
      'praca z mentorem nad analizą realnych przypadków decyzyjnych z ostatniego kwartału',
    ],
    wskazniki: [
      'każda istotna decyzja wpływająca na zespół jest komunikowana w formacie trzech zdań',
      'świadome rozróżnienie decyzji odwracalnych i nieodwracalnych w codziennej praktyce',
      'minimum cztery pytania „co o tym myślicie” do liderów zmianowych w skali tygodnia',
      'comiesięczny zapis refleksji nad własnymi decyzjami',
      'wzrost subiektywnego poczucia włączenia w proces decyzyjny w zespole podległym',
      'kierownik postrzegany jako osoba, która podejmuje decyzje świadomie i komunikuje je przejrzyście',
    ],
  },
};

export const GLOBAL_ANALYSIS = {
  wprowadzenie: [
    'Na podstawie przeprowadzonego badania 360 stopni, uwzględniającego ocenę pięciu kompetencji menedżerskich (kierowanie zespołem operacyjnym, komunikacja i informacja zwrotna, zarządzanie zmianą i adaptacja, orientacja na klienta i partnerstwo biznesowe, decyzyjność i odpowiedzialność za wynik), widać, że Jan Kowalski prezentuje określony, względnie spójny styl funkcjonowania zawodowego, którego istotą jest sposób łączenia perspektywy zadaniowej, operacyjnej i odpowiedzialnościowej w codziennym działaniu kierownika centrum logistycznego.',
    'Całościowy obraz wyników wskazuje, że Jan jest postrzegany jako profesjonalista posiadający wyraźne zasoby liderskie i operacyjne, jednak jednocześnie ujawniają się obszary, których dalszy rozwój może istotnie zwiększyć jego skuteczność w roli, jakość wpływu na zespół oraz zdolność do budowania bardziej dojrzałego i przewidywalnego środowiska współpracy. Wyniki sugerują, że funkcjonowanie Jana nie powinno być interpretowane jednowymiarowo — nie jest to profil ani jednoznacznie silny we wszystkich aspektach, ani jednoznacznie deficytowy. Raczej wskazuje on na lidera operacyjnego, który posiada zauważalne fundamenty skuteczności, ale dla osiągania wyższej dojrzałości potrzebuje większej konsekwencji, intencjonalności i integracji pomiędzy sposobem myślenia a codziennymi zachowaniami komunikacyjnymi.',
  ],
  wnioski_glowne: [
    'Patrząc całościowo szczególnie istotne jest, że wyniki w poszczególnych kompetencjach wzajemnie się uzupełniają i pozwalają dostrzec szerszy wzorzec działania. Jan funkcjonuje w oparciu o wyraźne zasoby — operacyjną sprawność, odwagę decyzyjną, zdolność wdrażania zmian bez utraty ciągłości pracy oraz wysoką rzetelność wobec zobowiązań. Te kompetencje stanowią fundament jego pozycji w organizacji i są dostrzegane przez wszystkie grupy oceniające.',
    'Jednocześnie wyniki wskazują, że dalszy wzrost skuteczności Jana będzie w dużym stopniu zależał nie tyle od zwiększania indywidualnego zaangażowania, ile od rozwijania bardziej dojrzałych praktyk przywódczych — przede wszystkim w obszarze komunikacji rozwojowej, włączania zespołu w proces decyzyjny oraz świadomego budowania partnerstwa z innymi działami i z klientem zewnętrznym. Tego typu profil jest częsty u osób, które dobrze funkcjonują w działaniu, ale dla wejścia na wyższy poziom skuteczności potrzebują przesunąć akcent z „samodzielnego dowożenia” na „świadome prowadzenie ludzi i procesów”.',
    'Istotnym sygnałem rozwojowym wynikającym z analizy globalnej są różnice między samooceną Jana a oceną otoczenia, szczególnie w grupie podwładnych. We wszystkich pięciu kompetencjach Jan ocenia siebie wyżej niż jego zespół podległy, a w trzech kompetencjach (komunikacja, decyzyjność, orientacja na klienta) różnica wynosi powyżej 0,7 punktu. Rozbieżności tego typu nie powinny być interpretowane jako błąd percepcyjny zespołu, lecz jako informacja o tym, że intencja Jana nie zawsze przekłada się w pełni na odbiór jego działań przez ludzi, którzy z nim pracują na co dzień.',
  ],
  mocne_strony: [
    [
      'Operacyjna sprawność i znajomość procesów',
      'Wyjątkowa znajomość procesów Centrum Logistycznego w Łodzi. Cytat przełożonego: „operacyjnie najlepszy w regionie”. → Wdrażanie nowych klientów retail, projekty optymalizacyjne, mentoring innych kierowników operacji w SUUS.',
    ],
    [
      'Odwaga decyzyjna i odpowiedzialność za wynik',
      'Podejmuje decyzje szybko, bez odraczania, bez przerzucania odpowiedzialności na zespół. Cytat: „gdy jest pożar, wszyscy patrzą na niego”. → Zarządzanie sytuacjami kryzysowymi, peak operacyjny, awarie sprzętu, niestandardowe przyjęcia od klientów strategicznych.',
    ],
    [
      'Naturalna gotowość do wdrażania zmian operacyjnych',
      'Najmocniejsza kompetencja w raporcie. Otwartość na nowe narzędzia i procedury. Zespół ocenia wyżej niż samoocena. → Pilotaże nowych systemów, transformacje procesowe, wdrażanie nowych standardów obsługi klienta na poziomie regionu.',
    ],
    [
      'Wysoka rzetelność wobec zobowiązań i lojalność wobec firmy',
      'Dotrzymuje słowa wobec klienta zewnętrznego. Fundamenty reputacji centrum w oczach kluczowych klientów SUUS. → Reprezentowanie SUUS wobec klientów strategicznych, eskalacje wymagające jednoznacznego stanowiska, sytuacje wymagające zaufania.',
    ],
  ] as [string, string][],
  obszary_rozwoju: [
    [
      'Rozwijanie kultury informacji zwrotnej',
      'Najwyższy priorytet rozwojowy. Informacja zwrotna istnieje tylko jako reakcja na błąd, brak rytmu pochwał. → Pierwszy krok: Od jutra jedna konkretna pochwała dziennie do godziny czternastej (imię osoby + zachowanie + skutek).',
    ],
    [
      'Włączanie zespołu i liderów zmianowych w decyzje',
      'Zespół ufa decyzjom Jana, ale nie czuje się włączony w ich powstawanie. Cytat z badania: „wiem co, ale nie wiem dlaczego”. → Pierwszy krok: Przed kolejną decyzją wpływającą na zespół zadać liderom zmianowym jedno pytanie: „co o tym myślicie, zanim zdecyduję”.',
    ],
    [
      'Budowanie partnerstwa z innymi działami',
      'Współpraca z transportem, obsługą klienta, jakością i IT odbierana jako transakcyjna, nie partnerska. Klucz dla wartości PARTNERSTWO. → Pierwszy krok: W tym tygodniu umówić jedno trzydziestominutowe nieformalne spotkanie z kierownikiem z innego działu, bez agendy operacyjnej.',
    ],
    [
      'Komunikowanie sensu („dlaczego”) przy decyzjach i zmianach',
      'Zespół wykonuje, ale nie zawsze rozumie kontekst. To prosta zmiana adresująca jednocześnie luki w trzech kompetencjach. → Pierwszy krok: Przy następnej decyzji wysłać trzy zdania: co decyduję, dlaczego, co to oznacza dla zespołu. Może być na czacie — sześćdziesiąt sekund.',
    ],
  ] as [string, string][],
  synteza: [
    'Biorąc pod uwagę całościowy obraz wyników, widać, że Jan posiada potencjał do skutecznego funkcjonowania w roli kierownika centrum logistycznego w środowisku wymagającym łączenia odpowiedzialności za wyniki, współpracy z innymi działami oraz reagowania na zmienne warunki działania. Jednocześnie wyniki wskazują, że dalszy wzrost skuteczności będzie w dużym stopniu zależał od rozwijania bardziej dojrzałych praktyk przywódczych — przede wszystkim w obszarze komunikacji rozwojowej, włączania zespołu w decyzje oraz budowania partnerstwa z innymi działami.',
    'Kluczowym zadaniem rozwojowym dla Jana w nadchodzącym kwartale jest przejście od skuteczności opartej głównie na indywidualnym działaniu i bieżącym reagowaniu do skuteczności opartej na świadomym przywództwie, przewidywalności komunikacji oraz umiejętności integrowania ludzi, procesów i perspektywy biznesowej. Ten proces nie wymaga zmiany osobowości Jana ani porzucenia jego naturalnych mocnych stron — wymaga jedynie świadomego dodania kilku konkretnych nawyków komunikacyjnych do tego, co już dziś robi dobrze.',
  ],
  kierunki_koncowe: [
    [
      'Wzmocnienie własnej roli jako lidera nadającego kierunek',
      'Jan powinien zwrócić szczególną uwagę na to, czy w codziennej praktyce wystarczająco jasno komunikuje priorytety, oczekiwania i sens podejmowanych decyzji. Im wyższa złożoność środowiska, tym większe znaczenie ma rola kierownika jako osoby, która porządkuje rzeczywistość i redukuje niejasność w zespole.',
    ],
    [
      'Rozwijanie konsekwencji w pracy z liderami zmianowymi',
      'Warto przeanalizować, na ile obecny styl zarządzania wspiera odpowiedzialność, samodzielność i dojrzałość liderów zmianowych, a na ile utrwala zależność od bieżącej interwencji kierownika. Rozwojowo ważne będzie wzmacnianie rytmu spotkań indywidualnych, jakości delegowania, informacji zwrotnej i świadomego budowania kompetencji decyzyjnych liderów.',
    ],
    [
      'Świadome prowadzenie ludzi przez zmianę i decyzje',
      'Zmiany operacyjne i decyzje powinny być komunikowane nie tylko formalnie, ale również w sposób, który pomaga zespołowi rozumieć kontekst, przewidywać kolejne kroki i odnajdywać swoje miejsce w nowej sytuacji. Szczególnej uwagi wymaga jakość komunikacji „dlaczego”, dostępność kierownika oraz gotowość do pracy z naturalnym oporem zespołu.',
    ],
    [
      'Większe osadzanie codziennych działań w perspektywie klienta zewnętrznego',
      'Niezależnie od formalnej roli warto wzmacniać nawyk zadawania sobie pytania, na ile podejmowane decyzje i działania odpowiadają na realne potrzeby klientów obsługiwanych przez Centrum Logistyczne w Łodzi. Rozwojowo istotne będzie przechodzenie od myślenia procesowego do myślenia procesowo-klienckiego.',
    ],
    [
      'Budowanie większej spójności między intencją a odbiorem działań',
      'Warto, aby Jan regularnie weryfikował, czy sposób, w jaki postrzega własne działania, jest zgodny z tym, jak odbiera je otoczenie. Konkretnie oznacza to większą gotowość do zbierania informacji zwrotnej, przyglądania się skutkom własnego stylu działania oraz korygowania zachowań tam, gdzie dobra intencja nie przekłada się automatycznie na pożądany efekt.',
    ],
  ] as [string, string][],
};

export const KLUCZOWY_WNIOSEK =
  'Jan jest kierownikiem operacyjnym o wysokiej skuteczności w działaniu — zespół mu ufa, klient się na nim opiera, przełożony go ceni. Największa dźwignia rozwojowa nie leży w nauce nowych kompetencji, tylko w świadomym dodaniu warstwy komunikacyjnej do tego, co już dziś robi dobrze. Trzy nawyki: jedna pochwała dziennie, trzy zdania uzasadnienia decyzji, jedno pytanie do liderów przed wdrożeniem zmiany. To jest cały plan rozwojowy.';

export const ANALITYKA_LUKI = [
  'We wszystkich pięciu kompetencjach Jan ocenia siebie wyżej niż jego otoczenie — z jednym ważnym wyjątkiem: w obszarze zarządzania zmianą zespół ocenia go wyżej niż on sam siebie. To jest jedyny obszar pozytywnego wpływu — coś, co Jan robi mocniej niż jest tego świadomy.',
  'Największe luki dodatnie pojawiają się w komunikacji i informacji zwrotnej (+0,77), decyzyjności (+0,73) oraz orientacji na klienta (+0,63). Wszystkie trzy dotyczą jednego wspólnego mianownika: sposobu, w jaki Jan komunikuje swoje działania innym ludziom. Sama jakość pracy nie jest kwestionowana — kwestionowany jest sposób, w jaki doświadczają jej ci, którzy są jej odbiorcami.',
  'Praktyczna rekomendacja jest jednoznaczna: największą zmianę przyniesie nie wzmacnianie kompetencji jako takich, ale konsekwentne dodanie warstwy komunikacyjnej do tego, co Jan już dziś robi dobrze. Trzy zdania uzasadnienia decyzji, jedna konkretna pochwała dziennie, jedno pytanie więcej przed wdrożeniem zmiany.',
];

export const REFLEKSJA_LUKI =
  'Spójrz na swoją największą lukę dodatnią (komunikacja: +0,77). Pomyśl o ostatnich dwóch tygodniach pracy z zespołem. Jak myślisz — co konkretnie robisz dobrze w komunikacji, z czego nie zdajesz sobie sprawy, że nie jest dostrzegane przez Twoich ludzi? Zapisz jedną odpowiedź. Następnie zadaj to samo pytanie jednemu liderowi zmianowemu i porównaj odpowiedzi. Różnica między nimi jest mapą Twojego rozwoju komunikacyjnego.';

export const PYTANIA_OTWARTE = {
  za_co: [
    ['Przełożony', 'Niezawodny w sytuacjach kryzysowych — gdy jest pożar, wszyscy patrzą na niego. Bierze odpowiedzialność, nie szuka winnych. Operacyjnie jest najlepszy w regionie.'],
    ['Współpracownik', 'Bardzo szybko wdraża nowe procedury, nie boi się zmiany. Można na niego liczyć, gdy klient ma niestandardowe oczekiwania.'],
    ['Współpracownik', 'Konkretny, rzeczowy. Nie owija w bawełnę, mówi co działa, a co nie.'],
    ['Podwładny', 'Zna magazyn jak własną kieszeń, nigdy nie zgubi się w temacie operacyjnym.'],
    ['Podwładny', 'Spokojny pod presją. Gdy peak, gdy chaos — nie panikuje, trzyma zespół w ryzach.'],
    ['Współpracownik', 'Zawsze dotrzymuje słowa wobec klienta. To rzadkie.'],
    ['Podwładny', 'Sprawiedliwy. Jak coś jest dobrze, to powie. Jak źle, też powie.'],
  ] as [string, string][],
  do_rozwoju: [
    ['Podwładny', 'Mogłoby być więcej rozmów 1:1 z ludźmi z mojej zmiany. Dziś rozmawiamy tylko, jak coś nie działa.'],
    ['Współpracownik', 'Czasem decyzje zapadają bez konsultacji z nami, a wpływają na nasze działy.'],
    ['Podwładny', 'Brakuje mi konkretnego feedbacku — nie wiem, czy robię dobrze, czy źle. Słyszę tylko, jak coś zawalę.'],
    ['Przełożony', 'Ma tendencję do brania wszystkiego na siebie. Czasem warto delegować więcej do liderów zmianowych — ma silnych ludzi.'],
    ['Podwładny', 'Pod presją bywa zbyt szybki w komunikacji. Trzy zdania zamiast jednego, i nie zawsze nadążamy.'],
    ['Współpracownik', 'Mógłby być bardziej proaktywny w kontakcie z innymi działami.'],
    ['Podwładny', 'Chciałbym wiedzieć więcej o tym, „dlaczego” pewne decyzje są podejmowane. Wiem co, ale nie wiem dlaczego.'],
  ] as [string, string][],
};

// Plan działań 90 dni
export const PLAN_DZIALAN = {
  utrzymac: [
    ['Zarządzanie zmianą i adaptacja', 'Średnia 4.93/6 — najwyższy wynik w badaniu. Naturalna gotowość do testowania nowych rozwiązań i utrzymywania ciągłości operacji w trakcie wdrożeń.'],
    ['Decyzyjność w kryzysie', 'Średnia 4.67/6 z otoczenia, samoocena 5.4. „Gdy jest pożar, wszyscy patrzą na niego”. Branie odpowiedzialności bez przerzucania na zespół.'],
    ['Operacyjne kierowanie zespołem', 'Średnia 4.67/6. Najlepsza znajomość procesów magazynowych w regionie, konsekwencja w BHP i jakości.'],
  ] as [string, string][],
  zmienic: [
    ['Brak rytmu pozytywnej informacji zwrotnej', 'Najniższy wynik w raporcie (3.4/6 od podwładnych). To jest dźwignia numer 1 — drobna zmiana o największym efekcie.'],
    ['Brak włączania zespołu w decyzje', 'Luka samoocena vs podwładni: +1.2. Cytat: „Wiem co, ale nie wiem dlaczego”. Buduje subtelny dystans.'],
    ['Transakcyjna współpraca z działami', 'Cytat: „Mógłby być bardziej proaktywny w kontakcie z nami”. Klucz dla wartości PARTNERSTWO i One Step Ahead.'],
  ] as [string, string][],
  priorytety: [
    {
      naglowek: 'Priorytet 1 — działanie natychmiastowe (ten tydzień)',
      tytul: 'JEDNA KONKRETNA POCHWAŁA DZIENNIE',
      tresc: [
        'Każdego dnia, do godziny 14:00, podejdź do jednej osoby z zespołu i powiedz konkretnie, co zrobiła dobrze. Konkret = nazwisko zachowania + sytuacja + skutek.',
        'Przykład: zamiast „dobra robota” powiedz „Tomasz, dziś przy przyjęciu od klienta bardzo szybko rozpoznałeś niezgodność na palecie — gdyby to przeszło dalej, mielibyśmy reklamację. Dzięki.”',
        'Kosztuje 30 sekund. To jest dźwignia numer 1 z całego raportu.',
      ],
    },
    {
      naglowek: 'Priorytet 2 — nawyk do zbudowania w 30 dni',
      tytul: 'STAŁY RYTM 1:1 Z LIDERAMI ZMIANOWYMI',
      tresc: [
        'Raz w tygodniu, 30 minut z każdym z trzech liderów zmianowych. Stały dzień, stała godzina, wpisane do kalendarza Outlook jako wydarzenie cykliczne.',
        'Agenda spotkania:',
        '1. Co działa (5 minut — niech lider mówi)',
        '2. Co nie działa (10 minut — niech lider proponuje rozwiązanie)',
        '3. Jedna decyzja, którą Ty podejmiesz, jedna którą oni (15 minut)',
      ],
    },
    {
      naglowek: 'Priorytet 3 — rozwój do monitorowania w 90 dni',
      tytul: 'PARTNERSTWO Z INNYMI DZIAŁAMI',
      tresc: [
        'Cel długoterminowy: zmiana percepcji u kierowników innych działów (transport, obsługa klienta, jakość, IT) z transakcyjnej na partnerską.',
        'Konkretne kroki:',
        '1. Co miesiąc — 30 minut nieformalnego spotkania z 1 kierownikiem.',
        '2. Raz w tygodniu — krótka wiadomość do opiekunów handlowych.',
        '3. Raz na kwartał — wizyta u jednego klienta z opiekunem handlowym.',
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
    opis: 'Różnica między tym jak Ty oceniasz swoje zachowanie a jak ocenia je otoczenie. Wartość +1.0 oznacza, że widzisz siebie o 1 punkt wyżej niż zespół. To NIE jest błąd zespołu — to informacja o tym, że Twoja intencja nie zawsze trafia do odbiorcy w taki sposób, jak chciałbyś.',
  },
  {
    termin: 'Ukryty wpływ',
    opis: 'Sytuacja, gdy luka percepcji jest dodatnia (powyżej +0.4). Robisz coś dobrze, ale zespół nie widzi tego z taką samą siłą. Nie jest to deficyt kompetencji — jest to deficyt komunikacji albo widoczności konkretnego zachowania.',
  },
  {
    termin: 'Pozytywny wpływ',
    opis: 'Sytuacja, gdy luka percepcji jest ujemna (poniżej -0.2). Zespół widzi Cię wyżej niż Ty sam. Często niedoceniana mocna strona. Warto rozumieć dlaczego i świadomie ją utrwalać.',
  },
];

// Legenda kolorów
export const LEGENDA_KOLORY = [
  ['#003f8a', 'GRANAT — Twoje dane', 'Wyniki, średnie z otoczenia, nagłówki kompetencji, kluczowe liczby. To kolor faktów.'],
  ['#7aa83e', 'ZIELONY — mocne strony', 'Obszary, w których jesteś rozpoznawany jako skuteczny. Co warto utrzymywać i wzmacniać.'],
  ['#ff6900', 'POMARAŃCZOWY — uwaga / rozwój', 'Luki percepcji, obszary do rozwoju, priorytet 1. To kolor zmiany.'],
  ['#0693e3', 'JASNY NIEBIESKI — kontekst', 'Tła boxów rekomendacyjnych, nawigacja, dodatkowe informacje. To kolor wsparcia.'],
  ['#999999', 'SZARY — luka neutralna', 'Tam, gdzie różnica między samooceną a otoczeniem jest minimalna (poniżej ±0.2).'],
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
      'Przejrzyj cytaty z pytań otwartych — czytaj te, które poruszą',
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
  tresc: 'To jest mapa tego, kim możesz się stać. Wyniki pokazują punkt startu — nie wyrok. Każda liczba w tym raporcie to zaproszenie do rozmowy: z samym sobą, z zespołem, z przełożonym. Rozwój nie dzieje się w PDF. Dzieje się w pierwszej konkretnej pochwale w poniedziałek o 9:00, w pierwszym pytaniu „co o tym myślicie” przed decyzją, w pierwszym trzyzdaniowym komunikacie wysłanym na czat zespołu.',
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
