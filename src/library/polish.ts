// Polish names and steps, keyed by ExerciseDB `exerciseId` like ./curation.ts.
// Each entry has as many steps as the English record. An Exercise missing here
// shows its English text until it is translated and reviewed (#41).

import type { ExerciseText } from './types.ts'

export const polish: Record<string, ExerciseText> = {
  I4hDWkc: {
    name: 'pompka',
    steps: [
      'Zacznij w podporze przodem na prostych rękach, z dłońmi rozstawionymi nieco szerzej niż barki i złączonymi stopami.',
      'Napnij brzuch i opuść ciało w stronę podłogi, zginając łokcie i utrzymując ciało w jednej linii.',
      'Zatrzymaj się na chwilę, gdy klatka piersiowa jest tuż nad podłogą, a potem wypchnij się do pozycji wyjściowej, prostując ręce.',
      'Powtórz tyle razy, ile zakłada seria.',
    ],
  },
  RJgzwny: {
    name: 'wspinaczka',
    steps: [
      'Zacznij w podporze przodem na prostych rękach, z dłońmi pod barkami i ciałem w jednej linii.',
      'Napnij brzuch i przyciągnij prawe kolano do klatki piersiowej, a potem szybko zmień nogi i przyciągnij lewe kolano.',
      'Zmieniaj nogi dalej jak w biegu, trzymając biodra nisko i napięty brzuch.',
      'Utrzymuj równe tempo i oddychaj spokojnie przez całe ćwiczenie.',
      'Powtórz tyle razy, ile zakłada seria.',
    ],
  },
  dK9394r: {
    name: 'burpee',
    steps: [
      'Stań w rozkroku na szerokość barków.',
      'Zejdź do przysiadu, zginając kolana, i połóż dłonie na podłodze przed sobą.',
      'Wyrzuć nogi do tyłu do pozycji jak do pompki.',
      'Zrób pompkę, utrzymując ciało w jednej linii.',
      'Doskocz stopami z powrotem do przysiadu.',
      'Wyskocz dynamicznie w górę, sięgając rękami nad głowę.',
      'Wyląduj miękko i od razu zejdź do przysiadu, zaczynając kolejne powtórzenie.',
    ],
  },
  GibBPPg: {
    name: 'most biodrowy z marszem',
    steps: [
      'Połóż się na plecach z ugiętymi kolanami i stopami płasko na podłodze.',
      'Napnij pośladki i unieś biodra, tak aby kolana, biodra i barki tworzyły prostą linię.',
      'Trzymając biodra w górze, unieś jedną stopę i przyciągnij kolano do klatki piersiowej.',
      'Opuść stopę na podłogę i powtórz ruch drugą nogą.',
      'Zmieniaj nogi dalej jak w marszu, utrzymując pozycję mostu.',
      'Powtórz tyle razy, ile zakłada seria.',
    ],
  },
}
