// Dodatkowe elementy raportu z briefu (wariant ROZBUDOWANY):
// indywidualny plan rozwoju do wypełnienia oraz kalendarz 90 dni do wycięcia.

// Tabela planu do samodzielnego wypełnienia. Kolumny + puste wiersze.
export const PLAN_TEMPLATE = {
  intro: 'Wybierz trzy obszary z raportu. Zapisz, co zmienisz, kiedy zaczniesz i po czym poznasz, że działa. Im konkretniej, tym większa szansa, że to zrobisz.',
  columns: ['Obszar', 'Co zmienię', 'Kiedy zaczynam', 'Po czym poznam, że działa'],
  rows: 3,
};

// Kalendarz 90 dni. Cztery fazy po trzy tygodnie. Każdy tydzień to jedno proste działanie.
export const KALENDARZ_90 = {
  intro: 'Dwanaście tygodni, jedno działanie na tydzień. Wytnij tę stronę i powieś nad biurkiem.',
  phases: [
    {
      name: 'Faza 1 · Pierwsze nawyki',
      weeks: [
        ['Tydzień 1', 'Codziennie jedna konkretna pochwała do godziny 14:00.'],
        ['Tydzień 2', 'Do każdej decyzji dodaj „dlaczego". Trzy zdania.'],
        ['Tydzień 3', 'Zapytaj jednego lidera „co o tym myślisz" przed decyzją.'],
      ],
    },
    {
      name: 'Faza 2 · Rytm',
      weeks: [
        ['Tydzień 4', 'Wpisz cykliczne spotkania 1:1 z liderami do kalendarza.'],
        ['Tydzień 5', 'Przeprowadź pierwsze spotkanie 1:1 z każdym liderem.'],
        ['Tydzień 6', 'Wprowadź krótką odprawę zmianową w stałym formacie.'],
      ],
    },
    {
      name: 'Faza 3 · Partnerstwo',
      weeks: [
        ['Tydzień 7', 'Umów nieformalne spotkanie z kierownikiem innego działu.'],
        ['Tydzień 8', 'Wyślij cotygodniową wiadomość do opiekuna klienta.'],
        ['Tydzień 9', 'Na odprawie podziel się jedną opinią klienta o zespole.'],
      ],
    },
    {
      name: 'Faza 4 · Utrwalenie',
      weeks: [
        ['Tydzień 10', 'Poproś dwie osoby z zespołu o feedback dla siebie.'],
        ['Tydzień 11', 'Przejrzyj swoje decyzje z miesiąca. Co działa, co nie.'],
        ['Tydzień 12', 'Wróć do raportu. Sprawdź, co naprawdę się zmieniło.'],
      ],
    },
  ],
};
