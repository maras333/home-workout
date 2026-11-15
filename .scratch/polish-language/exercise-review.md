# Polish review: every Exercise (#41)

Draft by an agent on branch `issue-41-exercise-polish`; the Polish text lives in `src/library/polish.ts`. Please correct it there, then rerun `node scripts/polish-review.ts` to regenerate this file and `npm test` to recheck that every Exercise has a Polish name and as many Polish steps as English ones.

How the draft was made:

- Second-person imperative, as Polish trainers write ("Stań…", "Napnij brzuch…"), masculine forms where a verb needs a gender ("jakbyś siadał na krześle"), as in the Workout Request form.
- One Polish step for every English step: nothing dropped or merged, even where an English step is filler ("This will be your starting position.").
- Names are lowercase like the English ones; "(male)", "v. 2" and similar dataset suffixes are dropped.
- Distances in feet and inches are given in centimetres (two feet → około 60 cm, 6 inches → około 15 cm).

## Terminology choices

One Polish term per concept, used across every Exercise:

| English | Polish |
| --- | --- |
| Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |
| …, then switch sides / legs / arms. | …, a potem zmień stronę / nogę / rękę. |
| Continue alternating sides for the desired number of repetitions. | Kontynuuj, zmieniając strony, tyle razy, ile zakłada seria. |
| for the desired duration | przez zaplanowany czas |
| starting position | pozycja wyjściowa |
| high plank / push-up position | podpór przodem na prostych rękach / podpór przodem |
| plank, side plank, reverse plank | deska, deska bokiem, deska tyłem |
| on all fours | klęk podparty |
| squat, lunge | przysiad, wykrok |
| feet shoulder-width apart | w rozkroku na szerokość barków |
| feet hip-width apart | ze stopami na szerokość bioder |
| engage your core | napnij brzuch (the Muscle group word for core) |
| hinge forward at the hips | pochyl tułów do przodu, zginając się w biodrach |
| keep your body in a straight line | utrzymuj ciało w jednej linii |
| balls of your feet | przednia część stóp |
| squeeze your shoulder blades together | ściągnij łopatki |
| glutes, hamstrings, quads | pośladki, tył uda, przód uda |
| biceps, triceps | biceps, triceps (loanwords Polish trainers use) |
| arms / upper arm / shoulders | ręce / ramię / barki |
| dumbbell | hantla (plural hantle, as in the glossary) |
| band, resistance band | guma, guma oporowa |
| kettlebell | kettlebell (declined as a masculine noun: kettlebella, kettlebellem) |
| pause for a moment at the top / bottom | zatrzymaj się na chwilę w górze / w dolnej pozycji |
| hold the stretch for 20-30 seconds | utrzymaj rozciąganie przez 20–30 sekund |
| overhand / underhand grip | nachwyt / podchwyt |

Loanwords kept because Polish trainers use them: burpee, kettlebell, swing, thruster, goblet, dead bug, russian twist, skip A, biceps, triceps.

## Please check

Translations I am unsure of, most doubtful first:

1. **Loanword names:** `iny3m5y` dead bug (or "martwy robak"), `XVDdcoj` russian twist (or "rosyjski skręt"), `yWxMvB5` thruster z kettlebellem, `yn8yg1r`/`ZA8b5hc` przysiad goblet (or "przysiad kielichowy"), `xdYPUtE` przysiad sissy.
2. **Coined names with no settled Polish term:** `XPUDTt7` pompka z odwróconego V do kobry (pike-to-cobra), `hCjGsRQ` deska góra–dół (power point plank), `8ARQ9Hw` przyciąganie kettlebella do brody w rozkroku sumo (sumo high pull), `FS63wTN` wyciskanie hantli z podbiciem nóg (push press), `O95afRA` chód boczny z gumą (monster walk), `gUjqdei` przysiad skrzyżny (curtsey squat), `2Dk4xQV` żaba z kołysaniem (rocking frog), `pZwUsKB` żelazny krzyż (iron cross).
3. **Names that describe the steps, not the English name:** `6YUfHPL` quads → przysiad do równoległej; `ealLwvX` high knee against wall → skip A przy ścianie; `PrQbjvB` push to run → pompka ze wspinaczką; `tnaj0mT` swing 360 → wymachy rąk ze skrętem tułowia; `f38OEuO` kneeling lat stretch → rozciąganie boku pleców w klęku.
4. **`mr7pkqP` jack burpee → burpee z pajacykiem:** the English steps have no jumping jack, so the Polish steps don't either; the name follows the English name.
5. **`DFGXwZr` world greatest stretch → najlepsze rozciąganie świata** and **`01qpYSe` upward facing dog → pies z głową w górę** (the yoga name), literal but in use.
6. **`wbUYILZ` elbow lift - reverse push-up → unoszenie na łokciach – odwrócona pompka:** a literal translation of an unclear English name.
7. **Dips:** `RrLske5` bench dip (knees bent) → pompka w podporze tyłem z ugiętymi kolanami, `7aVz15j` triceps dips floor → pompka w podporze tyłem na tricepsy (Polish trainers also say "dipy").
8. **`dK9394r` burpee step 3** changed from the sample's "do pozycji jak do pompki" to "do podporu przodem", to match the push-up position term everywhere else.


## Exercises

144 of 144 curated Exercises have Polish text, in the order of `src/library/curation.ts`.

### `uL9CsKm` ankle circles → krążenia stóp

| # | English | Polish |
| --- | --- | --- |
| 1 | Sit on the ground with your legs extended in front of you. | Usiądź na podłodze z nogami wyprostowanymi przed sobą. |
| 2 | Lift one leg off the ground and rotate your ankle in a circular motion. | Unieś jedną nogę nad podłogę i rób krążenia stopą. |
| 3 | Perform the desired number of circles in one direction, then switch to the other direction. | Wykonaj zaplanowaną liczbę krążeń w jedną stronę, a potem zmień kierunek. |
| 4 | Repeat with the other leg. | Powtórz drugą nogą. |

### `QChZi3x` squat to overhead reach → przysiad z wyciągnięciem rąk w górę

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and toes slightly turned out. | Stań w rozkroku na szerokość barków, z palcami stóp lekko na zewnątrz. |
| 2 | Lower your body down into a squat position by bending your knees and pushing your hips back. | Zejdź do przysiadu, zginając kolana i cofając biodra. |
| 3 | As you come up from the squat, extend your arms overhead, reaching towards the ceiling. | Wstając z przysiadu, wyciągnij ręce nad głowę, sięgając w stronę sufitu. |
| 4 | Return to the starting position by lowering your arms and bending your knees to squat down again. | Opuść ręce i zegnij kolana, schodząc z powrotem do przysiadu. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `2zNKRUB` wrist circles → krążenia nadgarstków

| # | English | Polish |
| --- | --- | --- |
| 1 | Extend your arms straight out in front of you. | Wyciągnij proste ręce przed siebie. |
| 2 | Make a fist with both hands. | Zaciśnij obie dłonie w pięści. |
| 3 | Rotate your wrists in a circular motion, keeping your arms still. | Rób krążenia nadgarstkami, nie ruszając rękami. |
| 4 | Continue the wrist circles for the desired number of repetitions. | Kontynuuj krążenia tyle razy, ile zakłada seria. |

### `X7jbxra` circles knee stretch → krążenia kolan

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and your hands on your hips. | Stań w rozkroku na szerokość barków, z dłońmi na biodrach. |
| 2 | Bend your knees slightly and lift your heels off the ground, balancing on the balls of your feet. | Lekko ugnij kolana i unieś pięty, balansując na przedniej części stóp. |
| 3 | Keeping your knees bent, rotate your knees in a circular motion, first clockwise and then counterclockwise. | Nie prostując kolan, rób nimi krążenia, najpierw zgodnie z ruchem wskazówek zegara, a potem przeciwnie. |
| 4 | Perform the movement for the desired number of repetitions. | Wykonuj ruch tyle razy, ile zakłada seria. |

### `tnaj0mT` swing 360 → wymachy rąk ze skrętem tułowia

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and knees slightly bent. | Stań w rozkroku na szerokość barków, z lekko ugiętymi kolanami. |
| 2 | Hold your arms straight out in front of you, parallel to the ground. | Wyciągnij proste ręce przed siebie, równolegle do podłogi. |
| 3 | Engage your core and swing your arms in a circular motion, rotating your torso as you do so. | Napnij brzuch i rób rękami zamachy po okręgu, skręcając przy tym tułów. |
| 4 | Continue the circular motion, swinging your arms and rotating your torso for the desired number of repetitions. | Kontynuuj zamachy rąk i skręty tułowia tyle razy, ile zakłada seria. |
| 5 | Remember to breathe throughout the exercise. | Pamiętaj o oddychaniu przez całe ćwiczenie. |

### `3uj0Ozg` dynamic chest stretch (male) → dynamiczne rozciąganie klatki piersiowej

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand tall with your feet shoulder-width apart. | Stań prosto w rozkroku na szerokość barków. |
| 2 | Extend your arms straight out to the sides, parallel to the ground. | Wyciągnij proste ręce w bok, równolegle do podłogi. |
| 3 | Slowly bring your arms forward, crossing them in front of your body. | Powoli przenieś ręce do przodu, krzyżując je przed sobą. |
| 4 | Feel the stretch in your chest muscles. | Poczuj rozciąganie mięśni klatki piersiowej. |
| 5 | Hold the stretch for 10-30 seconds. | Utrzymaj rozciąganie przez 10–30 sekund. |
| 6 | Return to the starting position and repeat for the desired number of repetitions. | Wróć do pozycji wyjściowej i powtórz tyle razy, ile zakłada seria. |

### `BbfB8Gb` basic toe touch (male) → skłon do palców stóp

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and your arms by your sides. | Stań w rozkroku na szerokość barków, z rękami wzdłuż tułowia. |
| 2 | Bend forward at the waist, keeping your back straight and your knees slightly bent. | Pochyl tułów do przodu, zginając się w biodrach, z prostymi plecami i lekko ugiętymi kolanami. |
| 3 | Reach down towards your toes with your hands, keeping your legs as straight as possible. | Sięgnij dłońmi w stronę palców stóp, utrzymując nogi możliwie proste. |
| 4 | Pause for a moment at the bottom, then slowly return to the starting position. | Zatrzymaj się na chwilę w dolnej pozycji, a potem powoli wróć do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `ErqK3UL` posterior step to overhead reach → wykrok w tył z wyciągnięciem rąk w górę

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet hip-width apart and your arms by your sides. | Stań ze stopami na szerokość bioder, z rękami wzdłuż tułowia. |
| 2 | Take a step back with your right foot, landing on the ball of your foot. | Zrób krok w tył prawą nogą, stawiając ją na przedniej części stopy. |
| 3 | Bend your left knee and lower your body into a lunge position. | Zegnij lewe kolano i zejdź do wykroku. |
| 4 | As you lower into the lunge, simultaneously reach your arms overhead. | Schodząc do wykroku, jednocześnie wyciągnij ręce nad głowę. |
| 5 | Pause for a moment at the bottom of the lunge, then return to the starting position by pushing through your left heel and bringing your right foot forward. | Zatrzymaj się na chwilę w dolnej pozycji, a potem wróć do pozycji wyjściowej, odpychając się lewą piętą i dostawiając prawą nogę. |
| 6 | Repeat the movement on the other side, stepping back with your left foot and bending your right knee. | Powtórz ruch na drugą stronę: krok w tył lewą nogą i zgięcie prawego kolana. |
| 7 | Continue alternating sides for the desired number of repetitions. | Kontynuuj, zmieniając strony, tyle razy, ile zakłada seria. |

### `ZgsNQ6d` inchworm → gąsienica

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a standing position with your feet hip-width apart. | Stań ze stopami na szerokość bioder. |
| 2 | Bend forward at the waist and place your hands on the ground in front of you. | Pochyl tułów do przodu, zginając się w biodrach, i połóż dłonie na podłodze przed sobą. |
| 3 | Walk your hands forward until you are in a high plank position, with your body in a straight line from head to toe. | Przejdź dłońmi do przodu do podporu przodem na prostych rękach, z ciałem w jednej linii od głowy do pięt. |
| 4 | Pause for a moment, then walk your hands back towards your feet, keeping your legs as straight as possible. | Zatrzymaj się na chwilę, a potem przejdź dłońmi z powrotem w stronę stóp, utrzymując nogi możliwie proste. |
| 5 | Once your hands reach your feet, stand back up to the starting position. | Gdy dłonie dojdą do stóp, wyprostuj się do pozycji wyjściowej. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `ealLwvX` high knee against wall → skip A przy ścianie

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand facing a wall with your feet hip-width apart. | Stań przodem do ściany, ze stopami na szerokość bioder. |
| 2 | Place your hands on the wall for support. | Oprzyj dłonie o ścianę. |
| 3 | Engage your core and lift your right knee up towards your chest, while keeping your left foot on the ground. | Napnij brzuch i unieś prawe kolano w stronę klatki piersiowej, trzymając lewą stopę na podłodze. |
| 4 | Quickly switch legs, bringing your left knee up towards your chest and lowering your right foot back down. | Szybko zmień nogi: unieś lewe kolano w stronę klatki piersiowej i opuść prawą stopę. |
| 5 | Continue alternating legs in a running motion, bringing your knees up as high as possible. | Zmieniaj nogi dalej jak w biegu, unosząc kolana jak najwyżej. |
| 6 | Maintain a fast pace and keep your upper body stable throughout the exercise. | Utrzymuj szybkie tempo i stabilną górę ciała przez całe ćwiczenie. |
| 7 | Repeat for the desired duration or number of repetitions. | Kontynuuj przez zaplanowany czas lub tyle razy, ile zakłada seria. |

### `oLrKqDH` run → bieg w miejscu

| # | English | Polish |
| --- | --- | --- |
| 1 | Start by standing upright with your feet hip-width apart. | Stań prosto, ze stopami na szerokość bioder. |
| 2 | Engage your core and keep your upper body relaxed. | Napnij brzuch i rozluźnij górę ciała. |
| 3 | Begin jogging in place, lifting your knees up towards your chest and landing softly on the balls of your feet. | Zacznij truchtać w miejscu, unosząc kolana w stronę klatki piersiowej i lądując miękko na przedniej części stóp. |
| 4 | Maintain a steady pace and continue jogging for the desired duration or distance. | Utrzymuj równe tempo i biegnij przez zaplanowany czas. |
| 5 | Remember to breathe deeply and maintain good posture throughout the exercise. | Pamiętaj o głębokim oddechu i dobrej postawie przez całe ćwiczenie. |

### `1g5bPpA` jack jump (male) → pajacyk

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet together and your arms by your sides. | Stań ze złączonymi stopami, z rękami wzdłuż tułowia. |
| 2 | Jump up, spreading your feet apart and raising your arms above your head. | Podskocz, rozstawiając stopy i unosząc ręce nad głowę. |
| 3 | As you land, quickly jump back to the starting position. | Po wylądowaniu szybko doskocz z powrotem do pozycji wyjściowej. |
| 4 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `mweqJin` quick feet v. 2 → szybkie stopy

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and your arms by your sides. | Stań w rozkroku na szerokość barków, z rękami wzdłuż tułowia. |
| 2 | Begin by rapidly moving your feet up and down, as if you were running in place. | Zacznij szybko przebierać stopami, jak w biegu w miejscu. |
| 3 | Keep your movements quick and light, focusing on staying on the balls of your feet. | Ruszaj się szybko i lekko, pozostając na przedniej części stóp. |
| 4 | Continue for the desired duration or number of repetitions. | Kontynuuj przez zaplanowany czas lub tyle razy, ile zakłada seria. |

### `ia6kIIl` half knee bends (male) → półprzysiad

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart. | Stań w rozkroku na szerokość barków. |
| 2 | Bend your knees and lower your body down as if you were sitting back into a chair. | Zegnij kolana i opuść ciało, jakbyś siadał na krześle. |
| 3 | Keep your chest up and your weight in your heels. | Trzymaj klatkę piersiową wysoko, a ciężar ciała na piętach. |
| 4 | Pause for a moment at the bottom, then push through your heels to return to the starting position. | Zatrzymaj się na chwilę w dolnej pozycji, a potem odepchnij się piętami i wróć do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `DFGXwZr` world greatest stretch → najlepsze rozciąganie świata

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a lunge position with your right foot forward and your left foot back. | Zacznij w wykroku, z prawą nogą z przodu i lewą z tyłu. |
| 2 | Place your hands on the ground on either side of your right foot. | Połóż dłonie na podłodze po obu stronach prawej stopy. |
| 3 | Lower your left knee to the ground and extend your right leg, keeping your right foot flat on the ground. | Opuść lewe kolano na podłogę i wysuń prawą nogę, trzymając prawą stopę płasko na podłodze. |
| 4 | Rotate your torso to the right, reaching your right arm up towards the ceiling. | Skręć tułów w prawo, sięgając prawą ręką w stronę sufitu. |
| 5 | Hold this position for a few seconds, then return to the starting position. | Wytrzymaj kilka sekund, a potem wróć do pozycji wyjściowej. |
| 6 | Switch sides and repeat the stretch with your left foot forward. | Zmień stronę i powtórz rozciąganie z lewą nogą z przodu. |

### `6sYyrRX` bent knee lying twist (male) → skręt w leżeniu z ugiętymi kolanami

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie flat on your back with your knees bent and feet flat on the ground. | Połóż się na plecach z ugiętymi kolanami i stopami płasko na podłodze. |
| 2 | Extend your arms out to the sides, perpendicular to your body. | Rozłóż ręce w bok, prostopadle do tułowia. |
| 3 | Keeping your knees together, slowly lower them to one side, aiming to touch the ground with your knees. | Trzymając kolana razem, powoli opuść je na jedną stronę, starając się dotknąć nimi podłogi. |
| 4 | Pause for a moment, then engage your core and slowly lift your knees back to the starting position. | Zatrzymaj się na chwilę, a potem napnij brzuch i powoli unieś kolana do pozycji wyjściowej. |
| 5 | Repeat the movement to the other side. | Powtórz ruch na drugą stronę. |
| 6 | Continue alternating sides for the desired number of repetitions. | Kontynuuj, zmieniając strony, tyle razy, ile zakłada seria. |

### `znP9SIh` hug keens to chest → przyciąganie kolan do klatki piersiowej

| # | English | Polish |
| --- | --- | --- |
| 1 | Start by standing with your feet shoulder-width apart. | Stań w rozkroku na szerokość barków. |
| 2 | Bend your knees and lower your body down into a squat position. | Zegnij kolana i zejdź do przysiadu. |
| 3 | As you squat down, bring your knees up towards your chest and hug them with your arms. | W przysiadzie przyciągnij kolana do klatki piersiowej i obejmij je rękami. |
| 4 | Hold this position for a moment, then slowly return to the starting position. | Wytrzymaj chwilę w tej pozycji, a potem powoli wróć do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `I4hDWkc` push-up → pompka

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a high plank position with your hands slightly wider than shoulder-width apart and your feet together. | Zacznij w podporze przodem na prostych rękach, z dłońmi rozstawionymi nieco szerzej niż barki i złączonymi stopami. |
| 2 | Engage your core and lower your body towards the ground by bending your elbows, keeping your body in a straight line. | Napnij brzuch i opuść ciało w stronę podłogi, zginając łokcie i utrzymując ciało w jednej linii. |
| 3 | Pause for a moment when your chest is just above the ground, then push yourself back up to the starting position by straightening your arms. | Zatrzymaj się na chwilę, gdy klatka piersiowa jest tuż nad podłogą, a potem wypchnij się do pozycji wyjściowej, prostując ręce. |
| 4 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `ZOuKWir` kneeling push-up (male) → pompka na kolanach

| # | English | Polish |
| --- | --- | --- |
| 1 | Start by kneeling on the ground with your hands shoulder-width apart, fingers pointing forward. | Uklęknij na podłodze, z dłońmi na szerokość barków i palcami skierowanymi do przodu. |
| 2 | Extend your legs behind you, resting on the balls of your feet, so that your body forms a straight line from head to heels. | Wysuń nogi do tyłu, opierając się na przedniej części stóp, tak aby ciało tworzyło prostą linię od głowy do pięt. |
| 3 | Engage your core and lower your body towards the ground by bending your elbows, keeping them close to your sides. | Napnij brzuch i opuść ciało w stronę podłogi, zginając łokcie i trzymając je blisko tułowia. |
| 4 | Continue lowering until your chest is just above the ground, then push back up to the starting position by straightening your arms. | Opuszczaj się, aż klatka piersiowa znajdzie się tuż nad podłogą, a potem wypchnij się do pozycji wyjściowej, prostując ręce. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `LEH9jxP` push-up (wall) → pompka przy ścianie

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand facing a wall, about arm's length away. | Stań przodem do ściany, mniej więcej na długość ręki od niej. |
| 2 | Place your hands on the wall at shoulder height, slightly wider than shoulder-width apart. | Oprzyj dłonie o ścianę na wysokości barków, nieco szerzej niż barki. |
| 3 | Step back a few feet, keeping your body straight and your feet hip-width apart. | Cofnij stopy o krok lub dwa, z ciałem wyprostowanym i stopami na szerokość bioder. |
| 4 | Bend your elbows and lower your chest towards the wall, keeping your body in a straight line. | Zegnij łokcie i zbliż klatkę piersiową do ściany, utrzymując ciało w jednej linii. |
| 5 | Push back up to the starting position, straightening your arms. | Wypchnij się do pozycji wyjściowej, prostując ręce. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `B1EVP9F` incline push-up → pompka z rękami na podwyższeniu

| # | English | Polish |
| --- | --- | --- |
| 1 | Place your hands on an elevated surface, such as a bench or step, slightly wider than shoulder-width apart. | Oprzyj dłonie na podwyższeniu, np. ławce lub stopniu, nieco szerzej niż barki. |
| 2 | Extend your legs behind you, resting on the balls of your feet, creating a straight line from your head to your heels. | Wysuń nogi do tyłu, opierając się na przedniej części stóp, tak aby ciało tworzyło prostą linię od głowy do pięt. |
| 3 | Lower your chest towards the elevated surface by bending your elbows, keeping your body in a straight line. | Zegnij łokcie i opuść klatkę piersiową w stronę podwyższenia, utrzymując ciało w jednej linii. |
| 4 | Pause for a moment at the bottom, then push yourself back up to the starting position by straightening your arms. | Zatrzymaj się na chwilę w dolnej pozycji, a potem wypchnij się do pozycji wyjściowej, prostując ręce. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `jV65tKx` scapula push-up → pompka łopatkowa

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a high plank position with your hands directly under your shoulders and your body in a straight line. | Zacznij w podporze przodem na prostych rękach, z dłońmi pod barkami i ciałem w jednej linii. |
| 2 | Lower your chest towards the ground, keeping your elbows close to your body. | Opuść klatkę piersiową w stronę podłogi, trzymając łokcie blisko tułowia. |
| 3 | As you lower, squeeze your shoulder blades together and push your chest forward. | Opuszczając się, ściągnij łopatki i wypchnij klatkę piersiową do przodu. |
| 4 | Pause for a moment at the bottom, then push back up to the starting position. | Zatrzymaj się na chwilę w dolnej pozycji, a potem wypchnij się do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `JmMVpR3` wide hand push up → pompka szeroka

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a high plank position with your hands wider than shoulder-width apart. | Zacznij w podporze przodem na prostych rękach, z dłońmi szerzej niż barki. |
| 2 | Keep your body in a straight line from head to toe. | Utrzymuj ciało w jednej linii od głowy do pięt. |
| 3 | Lower your chest towards the ground by bending your elbows, keeping them close to your sides. | Zegnij łokcie i opuść klatkę piersiową w stronę podłogi, trzymając łokcie blisko tułowia. |
| 4 | Push through your palms to extend your arms and return to the starting position. | Odepchnij się dłońmi, prostując ręce, i wróć do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `epOSYUZ` modified hindu push-up (male) → zmodyfikowana pompka hinduska

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a push-up position with your hands slightly wider than shoulder-width apart and your feet hip-width apart. | Zacznij w podporze przodem, z dłońmi nieco szerzej niż barki i stopami na szerokość bioder. |
| 2 | Lower your body towards the ground, bending your elbows and keeping your core engaged. | Opuść ciało w stronę podłogi, zginając łokcie i trzymając napięty brzuch. |
| 3 | As you lower your body, shift your weight back and lift your hips up towards the ceiling, creating an inverted V shape with your body. | Opuszczając się, przenieś ciężar ciała do tyłu i unieś biodra w stronę sufitu, tak aby ciało tworzyło odwrócone V. |
| 4 | Continue to lower your body until your chest is just above the ground, then reverse the movement, pushing your hips back down and extending your arms to return to the starting position. | Opuszczaj się dalej, aż klatka piersiowa znajdzie się tuż nad podłogą, a potem odwróć ruch: opuść biodra i wyprostuj ręce, wracając do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `i5cEhka` decline push-up → pompka ze stopami na podwyższeniu

| # | English | Polish |
| --- | --- | --- |
| 1 | Place your hands on the ground slightly wider than shoulder-width apart, with your feet elevated on a stable surface. | Połóż dłonie na podłodze nieco szerzej niż barki, a stopy oprzyj na stabilnym podwyższeniu. |
| 2 | Keep your body in a straight line from head to toe, engaging your core muscles. | Utrzymuj ciało w jednej linii od głowy do pięt i napnij brzuch. |
| 3 | Lower your chest towards the ground by bending your elbows, keeping them close to your body. | Zegnij łokcie i opuść klatkę piersiową w stronę podłogi, trzymając łokcie blisko tułowia. |
| 4 | Push through your palms to extend your arms and return to the starting position. | Odepchnij się dłońmi, prostując ręce, i wróć do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `4GqRrAk` superman push-up → pompka superman

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a high plank position with your hands slightly wider than shoulder-width apart and your feet together. | Zacznij w podporze przodem na prostych rękach, z dłońmi rozstawionymi nieco szerzej niż barki i złączonymi stopami. |
| 2 | Engage your core and lower your body towards the ground, keeping your elbows close to your sides. | Napnij brzuch i opuść ciało w stronę podłogi, trzymając łokcie blisko tułowia. |
| 3 | As you lower your body, simultaneously lift your right arm and left leg off the ground, extending them straight out. | Opuszczając się, jednocześnie unieś nad podłogę prawą rękę i lewą nogę, wyciągając je prosto. |
| 4 | Pause for a moment at the top, then lower your arm and leg back down while pushing yourself back up to the starting position. | Zatrzymaj się na chwilę, a potem opuść rękę i nogę, wypychając się do pozycji wyjściowej. |
| 5 | Repeat the movement, this time lifting your left arm and right leg. | Powtórz ruch, tym razem unosząc lewą rękę i prawą nogę. |
| 6 | Continue alternating sides for the desired number of repetitions. | Kontynuuj, zmieniając strony, tyle razy, ile zakłada seria. |

### `qEse6fe` shoulder tap push-up → pompka z dotknięciem barku

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a high plank position with your hands slightly wider than shoulder-width apart and your body in a straight line from head to heels. | Zacznij w podporze przodem na prostych rękach, z dłońmi nieco szerzej niż barki i ciałem w jednej linii od głowy do pięt. |
| 2 | Lower your body towards the ground by bending your elbows, keeping them close to your sides. | Zegnij łokcie i opuść ciało w stronę podłogi, trzymając łokcie blisko tułowia. |
| 3 | As you push back up, lift your right hand off the ground and tap your left shoulder. | Wypychając się w górę, oderwij prawą dłoń od podłogi i dotknij nią lewego barku. |
| 4 | Return your right hand to the ground and repeat the push-up, this time lifting your left hand and tapping your right shoulder. | Postaw prawą dłoń z powrotem na podłodze i zrób kolejną pompkę, tym razem dotykając lewą dłonią prawego barku. |
| 5 | Continue alternating shoulder taps with each push-up repetition. | Po każdej pompce dotykaj naprzemiennie barków. |
| 6 | Maintain a stable core and avoid excessive hip rotation throughout the exercise. | Przez całe ćwiczenie trzymaj napięty brzuch i nie pozwól biodrom się skręcać. |
| 7 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `A9qxk2F` archer push up → pompka łucznika

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a push-up position with your hands slightly wider than shoulder-width apart. | Zacznij w podporze przodem, z dłońmi nieco szerzej niż barki. |
| 2 | Extend one arm straight out to the side, parallel to the ground. | Wyciągnij jedną rękę prosto w bok, równolegle do podłogi. |
| 3 | Lower your body by bending your elbows, keeping your back straight and core engaged. | Opuść ciało, zginając łokieć, z prostymi plecami i napiętym brzuchem. |
| 4 | Push back up to the starting position. | Wypchnij się do pozycji wyjściowej. |
| 5 | Repeat on the other side, extending the opposite arm out to the side. | Powtórz na drugą stronę, wyciągając w bok drugą rękę. |
| 6 | Continue alternating sides for the desired number of repetitions. | Kontynuuj, zmieniając strony, tyle razy, ile zakłada seria. |

### `soIB2rj` diamond push-up → pompka diamentowa

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a high plank position with your hands close together, forming a diamond shape with your thumbs and index fingers. | Zacznij w podporze przodem na prostych rękach, z dłońmi blisko siebie, tak aby kciuki i palce wskazujące tworzyły kształt diamentu. |
| 2 | Keep your body in a straight line from head to toe, engaging your core and glutes. | Utrzymuj ciało w jednej linii od głowy do pięt, z napiętym brzuchem i pośladkami. |
| 3 | Lower your chest towards the diamond shape formed by your hands, keeping your elbows close to your body. | Opuść klatkę piersiową w stronę dłoni, trzymając łokcie blisko tułowia. |
| 4 | Pause for a moment at the bottom, then push yourself back up to the starting position. | Zatrzymaj się na chwilę w dolnej pozycji, a potem wypchnij się do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `RrLske5` bench dip (knees bent) → pompka w podporze tyłem z ugiętymi kolanami

| # | English | Polish |
| --- | --- | --- |
| 1 | Sit on the edge of a bench or chair with your hands gripping the edge next to your hips. | Usiądź na brzegu ławki lub krzesła i chwyć jego krawędź dłońmi przy biodrach. |
| 2 | Slide your butt off the bench and straighten your legs in front of you, keeping your heels on the ground. | Zsuń pośladki z ławki i wyprostuj nogi przed sobą, opierając pięty na podłodze. |
| 3 | Bend your elbows and lower your body towards the ground, keeping your back close to the bench. | Zegnij łokcie i opuść ciało w stronę podłogi, trzymając plecy blisko ławki. |
| 4 | Pause for a moment at the bottom, then push yourself back up to the starting position. | Zatrzymaj się na chwilę w dolnej pozycji, a potem wypchnij się do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `v3vLFW0` close-grip push-up (on knees) → pompka wąska na kolanach

| # | English | Polish |
| --- | --- | --- |
| 1 | Start by getting on your hands and knees, with your hands shoulder-width apart and your knees hip-width apart. | Uklęknij w klęku podpartym, z dłońmi na szerokość barków i kolanami na szerokość bioder. |
| 2 | Lower your upper body towards the ground by bending your elbows, keeping them close to your sides. | Zegnij łokcie i opuść górę ciała w stronę podłogi, trzymając łokcie blisko tułowia. |
| 3 | Pause for a moment when your chest is just above the ground. | Zatrzymaj się na chwilę, gdy klatka piersiowa jest tuż nad podłogą. |
| 4 | Push through your palms to straighten your arms and return to the starting position. | Odepchnij się dłońmi, prostując ręce, i wróć do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `x6KpKpq` close-grip push-up → pompka wąska

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a high plank position with your hands placed close together, directly under your shoulders. | Zacznij w podporze przodem na prostych rękach, z dłońmi blisko siebie, dokładnie pod barkami. |
| 2 | Engage your core and lower your body towards the ground, keeping your elbows close to your sides. | Napnij brzuch i opuść ciało w stronę podłogi, trzymając łokcie blisko tułowia. |
| 3 | Push through your palms to extend your arms and return to the starting position. | Odepchnij się dłońmi, prostując ręce, i wróć do pozycji wyjściowej. |
| 4 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `7aVz15j` triceps dips floor → pompka w podporze tyłem na tricepsy

| # | English | Polish |
| --- | --- | --- |
| 1 | Sit on the edge of a chair or bench with your hands next to your hips, fingers pointing forward. | Usiądź na brzegu krzesła lub ławki, z dłońmi przy biodrach i palcami skierowanymi do przodu. |
| 2 | Slide your butt off the front of the chair with your legs extended in front of you. | Zsuń pośladki do przodu z krzesła, z nogami wyprostowanymi przed sobą. |
| 3 | Straighten your arms, keeping a little bend in your elbows to keep tension on your triceps and off your elbow joints. | Wyprostuj ręce, zostawiając lekkie ugięcie w łokciach, żeby napięcie było w tricepsach, a nie w stawach łokciowych. |
| 4 | Slowly bend your elbows to lower your body toward the floor until your elbows are at about a 90-degree angle. | Powoli zginaj łokcie i opuszczaj ciało w stronę podłogi, aż łokcie zegną się mniej więcej pod kątem prostym. |
| 5 | Once you reach the bottom of the movement, press down into the chair to straighten your elbows, returning to the starting position. | W dolnej pozycji wypchnij się, naciskając dłońmi na krzesło i prostując łokcie, i wróć do pozycji wyjściowej. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `wbUYILZ` elbow lift - reverse push-up → unoszenie na łokciach – odwrócona pompka

| # | English | Polish |
| --- | --- | --- |
| 1 | Start by lying face down on the ground with your legs extended and your hands placed directly under your shoulders. | Połóż się na brzuchu z wyprostowanymi nogami i dłońmi dokładnie pod barkami. |
| 2 | Engage your core and press through your palms to lift your upper body off the ground, keeping your elbows close to your sides. | Napnij brzuch, odepchnij się dłońmi i unieś górę ciała nad podłogę, trzymając łokcie blisko tułowia. |
| 3 | Pause at the top for a moment, squeezing your upper back muscles. | Zatrzymaj się na chwilę w górze, napinając mięśnie górnej części pleców. |
| 4 | Slowly lower your body back down to the starting position. | Powoli opuść ciało do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `uTv34oq` bodyweight standing row (with towel) → wiosłowanie z ręcznikiem w staniu

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and hold a towel in front of you with both hands. | Stań w rozkroku na szerokość barków i trzymaj ręcznik przed sobą oburącz. |
| 2 | Bend your knees slightly and hinge forward at the hips, keeping your back straight. | Lekko ugnij kolana i pochyl tułów do przodu, zginając się w biodrach, z prostymi plecami. |
| 3 | Pull the towel towards your chest, squeezing your shoulder blades together. | Przyciągnij ręcznik do klatki piersiowej, ściągając łopatki. |
| 4 | Pause for a moment at the top, then slowly release the tension and return to the starting position. | Zatrzymaj się na chwilę w górze, a potem powoli zwolnij napięcie i wróć do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `BReCuOn` bodyweight squatting row (with towel) → wiosłowanie z ręcznikiem w przysiadzie

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart, holding a towel in front of you with your palms facing down. | Stań w rozkroku na szerokość barków i trzymaj ręcznik przed sobą nachwytem. |
| 2 | Bend your knees and lower your body into a squat position, keeping your back straight and your chest up. | Zegnij kolana i zejdź do przysiadu, z prostymi plecami i klatką piersiową wysoko. |
| 3 | As you lower into the squat, simultaneously pull the towel towards your chest, squeezing your shoulder blades together. | Schodząc do przysiadu, jednocześnie przyciągnij ręcznik do klatki piersiowej, ściągając łopatki. |
| 4 | Pause for a moment at the bottom of the squat, then slowly return to the starting position while extending your arms. | Zatrzymaj się na chwilę w dolnej pozycji, a potem powoli wróć do pozycji wyjściowej, prostując ręce. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `XPUDTt7` pike-to-cobra push-up → pompka z odwróconego V do kobry

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a push-up position with your hands slightly wider than shoulder-width apart and your feet together. | Zacznij w podporze przodem, z dłońmi nieco szerzej niż barki i złączonymi stopami. |
| 2 | Engage your core and lift your hips up towards the ceiling, forming an inverted V shape with your body. | Napnij brzuch i unieś biodra w stronę sufitu, tak aby ciało tworzyło odwrócone V. |
| 3 | Lower your upper body towards the ground by bending your elbows, keeping them close to your body. | Zegnij łokcie i opuść górę ciała w stronę podłogi, trzymając łokcie blisko tułowia. |
| 4 | As you lower down, shift your weight forward and transition into a cobra pose by straightening your arms and lifting your chest up. | Opuszczając się, przenieś ciężar ciała do przodu i przejdź do pozycji kobry, prostując ręce i unosząc klatkę piersiową. |
| 5 | Reverse the movement by bending your elbows and lowering your chest back down towards the ground. | Odwróć ruch: zegnij łokcie i opuść klatkę piersiową z powrotem w stronę podłogi. |
| 6 | Push through your hands to return to the inverted V position. | Odepchnij się dłońmi i wróć do pozycji odwróconego V. |
| 7 | Continue the movement by lowering your hips back down towards the ground, returning to the starting push-up position. | Opuść biodra w stronę podłogi i wróć do podporu przodem. |
| 8 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `h1ezqSu` kneeling plank tap shoulder (male) → dotykanie barków w desce z klęku

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a kneeling position with your hands on the ground, shoulder-width apart. | Uklęknij i oprzyj dłonie na podłodze na szerokość barków. |
| 2 | Extend your legs behind you, resting on your toes, and lift your body into a plank position. | Wysuń nogi do tyłu, oprzyj się na palcach stóp i unieś ciało do deski. |
| 3 | Keeping your core engaged and your hips stable, lift one hand off the ground and tap the opposite shoulder. | Z napiętym brzuchem i stabilnymi biodrami oderwij jedną dłoń od podłogi i dotknij nią przeciwnego barku. |
| 4 | Return the hand to the ground and repeat with the other hand. | Postaw dłoń z powrotem na podłodze i powtórz drugą ręką. |
| 5 | Continue alternating sides for the desired number of repetitions. | Kontynuuj, zmieniając strony, tyle razy, ile zakłada seria. |

### `yRpV5TC` shoulder tap → dotykanie barków w podporze

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a high plank position with your hands directly under your shoulders and your body in a straight line. | Zacznij w podporze przodem na prostych rękach, z dłońmi pod barkami i ciałem w jednej linii. |
| 2 | Engage your core and lift your right hand off the ground, reaching across to tap your left shoulder. | Napnij brzuch, oderwij prawą dłoń od podłogi i dotknij nią lewego barku. |
| 3 | Place your right hand back on the ground and repeat with your left hand tapping your right shoulder. | Postaw prawą dłoń z powrotem na podłodze i powtórz, dotykając lewą dłonią prawego barku. |
| 4 | Continue alternating shoulder taps while keeping your hips and torso stable. | Dotykaj naprzemiennie barków, utrzymując stabilne biodra i tułów. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `BJ0Hz5L` dumbbell bent over row → wiosłowanie hantlami w opadzie tułowia

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart, knees slightly bent, and hold a dumbbell in each hand with your palms facing your body. | Stań w rozkroku na szerokość barków, z lekko ugiętymi kolanami, i trzymaj w każdej dłoni hantlę, z dłońmi zwróconymi do ciała. |
| 2 | Bend forward at the hips, keeping your back straight and your core engaged. | Pochyl tułów do przodu, zginając się w biodrach, z prostymi plecami i napiętym brzuchem. |
| 3 | Let your arms hang straight down towards the floor, with your elbows slightly bent. | Opuść ręce swobodnie w stronę podłogi, z lekko ugiętymi łokciami. |
| 4 | Pull the dumbbells up towards your chest, squeezing your shoulder blades together. | Przyciągnij hantle do klatki piersiowej, ściągając łopatki. |
| 5 | Pause for a moment at the top, then slowly lower the dumbbells back down to the starting position. | Zatrzymaj się na chwilę w górze, a potem powoli opuść hantle do pozycji wyjściowej. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `peAeMR3` band shoulder press → wyciskanie gumy nad głowę

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and place the band under your feet. | Stań w rozkroku na szerokość barków i przydepnij gumę stopami. |
| 2 | Hold the band with your palms facing forward and raise your hands to shoulder height, elbows bent. | Chwyć gumę, z dłońmi zwróconymi do przodu, i unieś dłonie na wysokość barków, z ugiętymi łokciami. |
| 3 | Press the band overhead, fully extending your arms. | Wypchnij gumę nad głowę, prostując całkowicie ręce. |
| 4 | Pause for a moment at the top, then slowly lower the band back to shoulder height. | Zatrzymaj się na chwilę w górze, a potem powoli opuść gumę na wysokość barków. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `DsgkuIt` dumbbell lateral raise → unoszenie hantli bokiem

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and hold a dumbbell in each hand, palms facing your body. | Stań w rozkroku na szerokość barków i trzymaj w każdej dłoni hantlę, z dłońmi zwróconymi do ciała. |
| 2 | Keep your back straight and engage your core. | Trzymaj proste plecy i napnij brzuch. |
| 3 | Raise your arms out to the sides until they are parallel to the floor, keeping a slight bend in your elbows. | Unieś ręce bokiem, aż będą równoległe do podłogi, z lekko ugiętymi łokciami. |
| 4 | Pause for a moment at the top, then slowly lower your arms back down to the starting position. | Zatrzymaj się na chwilę w górze, a potem powoli opuść ręce do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `A6wtbuL` dumbbell standing overhead press → wyciskanie hantli nad głowę w staniu

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart, holding a dumbbell in each hand at shoulder level with your palms facing forward. | Stań w rozkroku na szerokość barków, trzymając w każdej dłoni hantlę na wysokości barków, z dłońmi zwróconymi do przodu. |
| 2 | Press the dumbbells upward until your arms are fully extended overhead. | Wypchnij hantle w górę, aż ręce będą całkowicie wyprostowane nad głową. |
| 3 | Pause for a moment at the top, then slowly lower the dumbbells back down to shoulder level. | Zatrzymaj się na chwilę w górze, a potem powoli opuść hantle na wysokość barków. |
| 4 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `FS63wTN` dumbbell push press → wyciskanie hantli z podbiciem nóg

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart, holding a dumbbell in each hand at shoulder level. | Stań w rozkroku na szerokość barków, trzymając w każdej dłoni hantlę na wysokości barków. |
| 2 | Bend your knees slightly and dip your body down, then explosively extend your legs and press the dumbbells overhead. | Lekko ugnij kolana i obniż ciało, a potem dynamicznie wyprostuj nogi i wypchnij hantle nad głowę. |
| 3 | Lock out your arms at the top of the movement, then lower the dumbbells back to shoulder level. | Zablokuj proste ręce w górze, a potem opuść hantle na wysokość barków. |
| 4 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `EAs3xL9` dumbbell reverse fly → odwrotne rozpiętki z hantlami

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and hold a dumbbell in each hand. | Stań w rozkroku na szerokość barków i trzymaj w każdej dłoni hantlę. |
| 2 | Bend your knees slightly and hinge forward at the hips, keeping your back straight. | Lekko ugnij kolana i pochyl tułów do przodu, zginając się w biodrach, z prostymi plecami. |
| 3 | Extend your arms straight down in front of you, palms facing each other. | Opuść proste ręce przed sobą, z dłońmi zwróconymi do siebie. |
| 4 | Keeping a slight bend in your elbows, raise your arms out to the sides until they are parallel to the ground. | Z lekko ugiętymi łokciami unieś ręce bokiem, aż będą równoległe do podłogi. |
| 5 | Pause for a moment at the top, then slowly lower your arms back down to the starting position. | Zatrzymaj się na chwilę w górze, a potem powoli opuść ręce do pozycji wyjściowej. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `SpYC0Kp` dumbbell bench press → wyciskanie hantli na ławce

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie flat on a bench with your feet flat on the ground and your back pressed against the bench. | Połóż się na ławce, ze stopami płasko na podłodze i plecami dociśniętymi do ławki. |
| 2 | Hold a dumbbell in each hand, with your palms facing forward and your arms extended above your chest. | Trzymaj w każdej dłoni hantlę, z dłońmi zwróconymi do przodu i rękami wyprostowanymi nad klatką piersiową. |
| 3 | Lower the dumbbells slowly to the sides of your chest, keeping your elbows at a 90-degree angle. | Powoli opuść hantle po bokach klatki piersiowej, aż łokcie zegną się pod kątem prostym. |
| 4 | Pause for a moment, then push the dumbbells back up to the starting position, fully extending your arms. | Zatrzymaj się na chwilę, a potem wypchnij hantle do pozycji wyjściowej, prostując całkowicie ręce. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `NbVPDMW` dumbbell biceps curl → uginanie rąk z hantlami

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand up straight with a dumbbell in each hand, palms facing forward and arms fully extended. | Stań prosto, z hantlą w każdej dłoni, dłońmi zwróconymi do przodu i całkowicie wyprostowanymi rękami. |
| 2 | Keeping your upper arms stationary, exhale and curl the weights while contracting your biceps. | Nie ruszając ramionami, zrób wydech i ugnij ręce, napinając bicepsy. |
| 3 | Continue to raise the weights until your biceps are fully contracted and the dumbbells are at shoulder level. | Unoś hantle, aż bicepsy będą w pełni napięte, a hantle znajdą się na wysokości barków. |
| 4 | Hold the contracted position for a brief pause as you squeeze your biceps. | Zatrzymaj się na chwilę w tej pozycji, mocno napinając bicepsy. |
| 5 | Inhale and slowly begin to lower the dumbbells back to the starting position. | Zrób wdech i powoli opuść hantle do pozycji wyjściowej. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `slDvUAU` dumbbell hammer curl → uginanie rąk z hantlami chwytem młotkowym

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand up straight with a dumbbell in each hand, palms facing your torso. | Stań prosto, z hantlą w każdej dłoni, z dłońmi zwróconymi do tułowia. |
| 2 | Keep your elbows close to your torso and rotate the palms of your hands until they are facing forward. | Trzymaj łokcie blisko tułowia i obróć dłonie tak, aby były zwrócone do przodu. |
| 3 | This will be your starting position. | To jest pozycja wyjściowa. |
| 4 | Now, keeping the upper arms stationary, exhale and curl the weights while contracting your biceps. | Teraz, nie ruszając ramionami, zrób wydech i ugnij ręce, napinając bicepsy. |
| 5 | Continue to raise the weights until your biceps are fully contracted and the dumbbells are at shoulder level. | Unoś hantle, aż bicepsy będą w pełni napięte, a hantle znajdą się na wysokości barków. |
| 6 | Hold the contracted position for a brief pause as you squeeze your biceps. | Zatrzymaj się na chwilę w tej pozycji, mocno napinając bicepsy. |
| 7 | Then, inhale and slowly begin to lower the dumbbells back to the starting position. | Potem zrób wdech i powoli opuść hantle do pozycji wyjściowej. |
| 8 | Repeat for the recommended amount of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `W6PxUkg` dumbbell kickback → prostowanie rąk z hantlami w opadzie tułowia

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and hold a dumbbell in each hand. | Stań w rozkroku na szerokość barków i trzymaj w każdej dłoni hantlę. |
| 2 | Bend your knees slightly and hinge forward at the hips, keeping your back straight. | Lekko ugnij kolana i pochyl tułów do przodu, zginając się w biodrach, z prostymi plecami. |
| 3 | Bring your upper arms close to your sides, with your elbows bent at a 90-degree angle. | Przyciśnij ramiona do tułowia, z łokciami zgiętymi pod kątem prostym. |
| 4 | Extend your arms straight back, squeezing your triceps at the top of the movement. | Wyprostuj ręce do tyłu, napinając tricepsy w końcowej pozycji. |
| 5 | Pause for a moment, then slowly lower the dumbbells back to the starting position. | Zatrzymaj się na chwilę, a potem powoli wróć hantlami do pozycji wyjściowej. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `PdmaD0N` dumbbell standing triceps extension → wyciskanie francuskie hantli w staniu

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and hold a dumbbell in one hand. | Stań w rozkroku na szerokość barków i trzymaj hantlę w jednej dłoni. |
| 2 | Raise the dumbbell overhead, keeping your arm straight. | Unieś hantlę nad głowę, z prostą ręką. |
| 3 | Bend your elbow and lower the dumbbell behind your head, keeping your upper arm stationary. | Zegnij łokieć i opuść hantlę za głowę, nie ruszając ramieniem. |
| 4 | Extend your arm back up to the starting position. | Wyprostuj rękę i wróć do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `3omWx6P` band alternating biceps curl → naprzemienne uginanie rąk z gumą

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and hold the band with an underhand grip, palms facing up. | Stań w rozkroku na szerokość barków i trzymaj gumę podchwytem, z dłońmi zwróconymi w górę. |
| 2 | Keep your elbows close to your sides and slowly curl one arm up towards your shoulder, squeezing your biceps at the top. | Trzymaj łokcie blisko tułowia i powoli ugnij jedną rękę w stronę barku, napinając biceps w górze. |
| 3 | Lower the arm back down to the starting position and repeat with the other arm. | Opuść rękę do pozycji wyjściowej i powtórz drugą ręką. |
| 4 | Continue alternating arms for the desired number of repetitions. | Kontynuuj, zmieniając ręce, tyle razy, ile zakłada seria. |

### `aHDy5O5` band y-raise → unoszenie rąk z gumą w literę Y

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and hold the band in front of your thighs with your palms facing inwards. | Stań w rozkroku na szerokość barków i trzymaj gumę przed udami, z dłońmi zwróconymi do siebie. |
| 2 | Keep your arms straight and lift them up and out to the sides, forming a 'Y' shape with your body. | Trzymając proste ręce, unieś je w górę i na boki, tak aby ciało tworzyło literę Y. |
| 3 | Squeeze your shoulder blades together at the top of the movement. | W górze ściągnij łopatki. |
| 4 | Slowly lower your arms back down to the starting position. | Powoli opuść ręce do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `g9AsZ8P` kettlebell one arm row → wiosłowanie kettlebellem jednorącz

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart, holding a kettlebell in one hand with an overhand grip. | Stań w rozkroku na szerokość barków, trzymając kettlebell w jednej dłoni nachwytem. |
| 2 | Bend your knees slightly and hinge forward at the hips, keeping your back straight and your core engaged. | Lekko ugnij kolana i pochyl tułów do przodu, zginając się w biodrach, z prostymi plecami i napiętym brzuchem. |
| 3 | Pull the kettlebell up towards your chest, keeping your elbow close to your body and squeezing your shoulder blades together. | Przyciągnij kettlebell do klatki piersiowej, trzymając łokieć blisko tułowia i ściągając łopatki. |
| 4 | Pause for a moment at the top, then slowly lower the kettlebell back down to the starting position. | Zatrzymaj się na chwilę w górze, a potem powoli opuść kettlebell do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions, then switch sides and repeat with the other arm. | Powtórz tyle razy, ile zakłada seria, a potem zmień rękę. |

### `rg59QCH` kettlebell one arm floor press → wyciskanie kettlebella jednorącz w leżeniu na podłodze

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie flat on your back on the floor with your knees bent and feet flat on the ground. | Połóż się na plecach na podłodze z ugiętymi kolanami i stopami płasko na podłodze. |
| 2 | Hold the kettlebell in one hand with your palm facing towards your feet and your arm extended straight up towards the ceiling. | Trzymaj kettlebell w jednej dłoni, z dłonią zwróconą w stronę stóp i ręką wyprostowaną w stronę sufitu. |
| 3 | Slowly lower the kettlebell towards your chest by bending your elbow, keeping your upper arm close to your body. | Powoli opuść kettlebell w stronę klatki piersiowej, zginając łokieć i trzymając ramię blisko tułowia. |
| 4 | Pause for a moment when the kettlebell is just above your chest, then push it back up to the starting position by extending your elbow. | Zatrzymaj się na chwilę, gdy kettlebell jest tuż nad klatką piersiową, a potem wypchnij go do pozycji wyjściowej, prostując łokieć. |
| 5 | Repeat for the desired number of repetitions, then switch to the other arm. | Powtórz tyle razy, ile zakłada seria, a potem zmień rękę. |

### `u0cNiij` low glute bridge on floor → most biodrowy na podłodze

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie flat on your back with your knees bent and feet flat on the ground. | Połóż się na plecach z ugiętymi kolanami i stopami płasko na podłodze. |
| 2 | Place your arms by your sides, palms facing down. | Połóż ręce wzdłuż tułowia, dłońmi w dół. |
| 3 | Engage your glutes and core, then lift your hips off the ground until your body forms a straight line from your knees to your shoulders. | Napnij pośladki i brzuch, a potem unieś biodra, aż ciało utworzy prostą linię od kolan do barków. |
| 4 | Pause for a moment at the top, squeezing your glutes. | Zatrzymaj się na chwilę w górze, mocno napinając pośladki. |
| 5 | Slowly lower your hips back down to the starting position. | Powoli opuść biodra do pozycji wyjściowej. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `kMzUs9Y` forward lunge (male) → wykrok w przód

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet hip-width apart and hands on your hips. | Stań ze stopami na szerokość bioder, z dłońmi na biodrach. |
| 2 | Take a big step forward with your right foot, lowering your body into a lunge position. | Zrób duży krok w przód prawą nogą i zejdź do wykroku. |
| 3 | Bend your right knee to about 90 degrees, keeping your knee aligned with your ankle. | Zegnij prawe kolano mniej więcej pod kątem prostym, trzymając kolano nad kostką. |
| 4 | Push off with your right foot and return to the starting position. | Odepchnij się prawą stopą i wróć do pozycji wyjściowej. |
| 5 | Repeat with your left leg, alternating sides for the desired number of repetitions. | Powtórz lewą nogą i zmieniaj nogi, tyle razy, ile zakłada seria. |

### `bJYHBIN` bodyweight standing calf raise → wspięcia na palce w staniu

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart, toes pointing forward. | Stań w rozkroku na szerokość barków, z palcami stóp skierowanymi do przodu. |
| 2 | Place your hands on a wall or stable surface for balance. | Oprzyj dłonie o ścianę lub stabilny mebel, żeby utrzymać równowagę. |
| 3 | Slowly raise your heels off the ground, lifting your body weight onto the balls of your feet. | Powoli unieś pięty, przenosząc ciężar ciała na przednią część stóp. |
| 4 | Pause for a moment at the top, then slowly lower your heels back down to the starting position. | Zatrzymaj się na chwilę w górze, a potem powoli opuść pięty do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `6YUfHPL` quads → przysiad do równoległej

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart. | Stań w rozkroku na szerokość barków. |
| 2 | Lower your body by bending your knees and pushing your hips back as if sitting on a chair. | Zejdź w dół, zginając kolana i cofając biodra, jakbyś siadał na krześle. |
| 3 | Keep your chest up and your back straight. | Trzymaj klatkę piersiową wysoko i proste plecy. |
| 4 | Lower yourself until your thighs are parallel to the ground. | Opuszczaj się, aż uda będą równoległe do podłogi. |
| 5 | Push through your heels to return to the starting position. | Odepchnij się piętami i wróć do pozycji wyjściowej. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `7WaDzyL` side hip abduction → odwodzenie nogi w bok w staniu

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and your hands on your hips. | Stań w rozkroku na szerokość barków, z dłońmi na biodrach. |
| 2 | Shift your weight to one leg and lift the opposite leg out to the side, keeping it straight. | Przenieś ciężar ciała na jedną nogę i unieś drugą prostą nogę w bok. |
| 3 | Pause for a moment at the top, then slowly lower your leg back down to the starting position. | Zatrzymaj się na chwilę w górze, a potem powoli opuść nogę do pozycji wyjściowej. |
| 4 | Repeat on the other side. | Powtórz na drugą stronę. |
| 5 | Continue alternating sides for the desired number of repetitions. | Kontynuuj, zmieniając strony, tyle razy, ile zakłada seria. |

### `mQ1tBXn` straight leg outer hip abductor → odwodzenie prostej nogi w leżeniu bokiem

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie on your side with your legs straight and stacked on top of each other. | Połóż się na boku z prostymi nogami ułożonymi jedna na drugiej. |
| 2 | Place your bottom arm under your head for support. | Podłóż dolną rękę pod głowę. |
| 3 | Engage your core and lift your top leg as high as possible without rotating your hips or leaning backward. | Napnij brzuch i unieś górną nogę jak najwyżej, nie skręcając bioder i nie odchylając się do tyłu. |
| 4 | Pause for a moment at the top, then slowly lower your leg back down to the starting position. | Zatrzymaj się na chwilę w górze, a potem powoli opuść nogę do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions, then switch sides. | Powtórz tyle razy, ile zakłada seria, a potem zmień stronę. |

### `C5jncD2` standing single leg curl → uginanie nogi w staniu

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet hip-width apart and your hands on your hips. | Stań ze stopami na szerokość bioder, z dłońmi na biodrach. |
| 2 | Shift your weight onto your left leg and lift your right foot off the ground, bending your knee. | Przenieś ciężar ciała na lewą nogę i unieś prawą stopę nad podłogę, zginając kolano. |
| 3 | Slowly curl your right heel towards your glutes, squeezing your hamstring. | Powoli przyciągnij prawą piętę do pośladka, napinając tył uda. |
| 4 | Pause for a moment at the top, then slowly lower your right foot back down to the starting position. | Zatrzymaj się na chwilę w górze, a potem powoli opuść prawą stopę do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions, then switch legs. | Powtórz tyle razy, ile zakłada seria, a potem zmień nogę. |

### `9E25EOx` split squats → przysiad wykroczny

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart. | Stań w rozkroku na szerokość barków. |
| 2 | Take a step forward with one foot and place it about two feet in front of the other foot. | Zrób krok w przód jedną nogą, stawiając ją około 60 cm przed drugą stopą. |
| 3 | Lower your body by bending your knees and hips, keeping your back straight. | Zejdź w dół, zginając kolana i biodra, z prostymi plecami. |
| 4 | Continue lowering until your front thigh is parallel to the ground, and your back knee is hovering just above the ground. | Opuszczaj się, aż przednie udo będzie równoległe do podłogi, a tylne kolano zawiśnie tuż nad podłogą. |
| 5 | Pause for a moment, then push through your front heel to return to the starting position. | Zatrzymaj się na chwilę, a potem odepchnij się piętą przedniej nogi i wróć do pozycji wyjściowej. |
| 6 | Repeat for the desired number of repetitions, then switch legs and repeat. | Powtórz tyle razy, ile zakłada seria, a potem zmień nogę. |

### `gUjqdei` curtsey squat → przysiad skrzyżny

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart. | Stań w rozkroku na szerokość barków. |
| 2 | Take a step diagonally behind and across your body with your right foot, crossing it behind your left leg. | Zrób krok prawą nogą po skosie w tył, krzyżując ją za lewą nogą. |
| 3 | Bend both knees as if you were curtsying, lowering your body towards the ground. | Zegnij oba kolana jak przy dygnięciu i opuść ciało w stronę podłogi. |
| 4 | Keep your torso upright and your weight on your front foot. | Trzymaj tułów wyprostowany, a ciężar ciała na przedniej stopie. |
| 5 | Push through your front foot to return to the starting position. | Odepchnij się przednią stopą i wróć do pozycji wyjściowej. |
| 6 | Repeat on the other side, stepping diagonally behind and across your body with your left foot. | Powtórz na drugą stronę, robiąc krok lewą nogą po skosie w tył. |

### `GibBPPg` glute bridge march → most biodrowy z marszem

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie flat on your back with your knees bent and feet flat on the ground. | Połóż się na plecach z ugiętymi kolanami i stopami płasko na podłodze. |
| 2 | Engage your glutes and lift your hips off the ground, forming a straight line from your knees to your shoulders. | Napnij pośladki i unieś biodra, tak aby kolana, biodra i barki tworzyły prostą linię. |
| 3 | While keeping your hips lifted, lift one foot off the ground and bring your knee towards your chest. | Trzymając biodra w górze, unieś jedną stopę i przyciągnij kolano do klatki piersiowej. |
| 4 | Lower your foot back to the ground and repeat the movement with the other leg. | Opuść stopę na podłogę i powtórz ruch drugą nogą. |
| 5 | Continue alternating legs in a marching motion while maintaining the bridge position. | Zmieniaj nogi dalej jak w marszu, utrzymując pozycję mostu. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `rmEukuS` single leg bridge with outstretched leg → most biodrowy na jednej nodze

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie on your back with your knees bent and feet flat on the ground. | Połóż się na plecach z ugiętymi kolanami i stopami płasko na podłodze. |
| 2 | Extend one leg straight out in front of you. | Wyprostuj jedną nogę przed sobą. |
| 3 | Engage your glutes and lift your hips off the ground, forming a straight line from your knees to your shoulders. | Napnij pośladki i unieś biodra, tak aby ciało tworzyło prostą linię od kolan do barków. |
| 4 | Hold for a moment at the top, then slowly lower your hips back down to the starting position. | Wytrzymaj chwilę w górze, a potem powoli opuść biodra do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions, then switch legs. | Powtórz tyle razy, ile zakłada seria, a potem zmień nogę. |

### `0jp9Rlz` one leg floor calf raise → wspięcia na palce na jednej nodze

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet hip-width apart and place your hands on a wall or sturdy object for balance. | Stań ze stopami na szerokość bioder i oprzyj dłonie o ścianę lub stabilny mebel, żeby utrzymać równowagę. |
| 2 | Lift one foot off the ground and balance on the other foot. | Unieś jedną stopę nad podłogę i stań na drugiej nodze. |
| 3 | Slowly raise your heel off the ground, lifting your body up onto the ball of your foot. | Powoli unieś piętę, wspinając się na przednią część stopy. |
| 4 | Pause for a moment at the top, then slowly lower your heel back down to the starting position. | Zatrzymaj się na chwilę w górze, a potem powoli opuść piętę do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions, then switch legs and repeat. | Powtórz tyle razy, ile zakłada seria, a potem zmień nogę. |

### `sVQCCeG` march sit (wall) → krzesełko przy ścianie z marszem

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your back against a wall and your feet hip-width apart. | Stań plecami do ściany, ze stopami na szerokość bioder. |
| 2 | Slowly slide your back down the wall until your knees are bent at a 90-degree angle. | Powoli zsuń się plecami po ścianie, aż kolana zegną się pod kątem prostym. |
| 3 | Lift your right foot off the ground and bring your knee towards your chest. | Unieś prawą stopę nad podłogę i przyciągnij kolano w stronę klatki piersiowej. |
| 4 | Lower your right foot back down and lift your left foot off the ground, bringing your knee towards your chest. | Opuść prawą stopę i unieś lewą, przyciągając kolano w stronę klatki piersiowej. |
| 5 | Continue alternating between lifting your right and left foot for the desired number of repetitions. | Kontynuuj, unosząc naprzemiennie prawą i lewą stopę, tyle razy, ile zakłada seria. |

### `LIlE5Tn` jump squat → przysiad z wyskokiem

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart. | Stań w rozkroku na szerokość barków. |
| 2 | Lower your body into a squat position by bending your knees and pushing your hips back. | Zejdź do przysiadu, zginając kolana i cofając biodra. |
| 3 | Jump explosively off the ground, extending your hips, knees, and ankles. | Wyskocz dynamicznie w górę, prostując biodra, kolana i stawy skokowe. |
| 4 | While in mid-air, quickly bring your arms forward for balance. | W locie szybko wyrzuć ręce do przodu dla równowagi. |
| 5 | Land softly on the balls of your feet and immediately go into the next repetition. | Wyląduj miękko na przedniej części stóp i od razu przejdź do kolejnego powtórzenia. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `uZKq7lo` forward jump → skok w przód

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart. | Stań w rozkroku na szerokość barków. |
| 2 | Bend your knees and lower your body into a squat position. | Zegnij kolana i zejdź do przysiadu. |
| 3 | Swing your arms back for momentum. | Zamachnij się rękami do tyłu. |
| 4 | Jump forward explosively, extending your hips, knees, and ankles. | Skocz dynamicznie do przodu, prostując biodra, kolana i stawy skokowe. |
| 5 | Land softly on the balls of your feet and immediately go into the next jump. | Wyląduj miękko na przedniej części stóp i od razu przejdź do kolejnego skoku. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `PM1PZjg` lunge with jump → wykrok z wyskokiem

| # | English | Polish |
| --- | --- | --- |
| 1 | Start by standing with your feet shoulder-width apart. | Stań w rozkroku na szerokość barków. |
| 2 | Take a step forward with your right foot, lowering your body into a lunge position. | Zrób krok w przód prawą nogą i zejdź do wykroku. |
| 3 | Push off with your right foot and jump into the air, switching the position of your feet mid-air. | Odepchnij się prawą stopą i wyskocz w górę, zmieniając nogi w locie. |
| 4 | Land softly with your left foot forward and immediately lower your body into a lunge position. | Wyląduj miękko z lewą nogą z przodu i od razu zejdź do wykroku. |
| 5 | Continue alternating between lunges and jumps for the desired number of repetitions. | Kontynuuj wykroki i wyskoki tyle razy, ile zakłada seria. |

### `C31LMnP` one leg squat → przysiad na jednej nodze

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart. | Stań w rozkroku na szerokość barków. |
| 2 | Extend one leg forward, keeping it off the ground. | Wysuń jedną nogę do przodu, trzymając ją nad podłogą. |
| 3 | Bend your standing leg and lower your body down as if sitting back into a chair. | Zegnij nogę, na której stoisz, i opuść ciało, jakbyś siadał na krześle. |
| 4 | Keep your chest up and your back straight. | Trzymaj klatkę piersiową wysoko i proste plecy. |
| 5 | Push through your heel to return to the starting position. | Odepchnij się piętą i wróć do pozycji wyjściowej. |
| 6 | Repeat with the other leg. | Powtórz drugą nogą. |

### `xdYPUtE` sissy squat → przysiad sissy

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and your toes pointing slightly outward. | Stań w rozkroku na szerokość barków, z palcami stóp lekko na zewnątrz. |
| 2 | Hold onto a stable object for balance if needed. | W razie potrzeby przytrzymaj się stabilnego mebla, żeby utrzymać równowagę. |
| 3 | Slowly lower your body by bending your knees and leaning back, keeping your torso upright. | Powoli opuść ciało, zginając kolana i odchylając się do tyłu, z wyprostowanym tułowiem. |
| 4 | Continue lowering until your thighs are parallel to the ground or as far as you can comfortably go. | Opuszczaj się, aż uda będą równoległe do podłogi albo tak nisko, jak możesz bez dyskomfortu. |
| 5 | Pause for a moment, then push through your heels to return to the starting position. | Zatrzymaj się na chwilę, a potem odepchnij się piętami i wróć do pozycji wyjściowej. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `WL4EmxJ` side bridge hip abduction → deska bokiem z odwodzeniem nogi

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie on your side with your legs extended and stacked on top of each other. | Połóż się na boku z wyprostowanymi nogami ułożonymi jedna na drugiej. |
| 2 | Prop yourself up on your forearm, keeping your elbow directly below your shoulder. | Oprzyj się na przedramieniu, z łokciem dokładnie pod barkiem. |
| 3 | Engage your core and lift your hips off the ground, creating a straight line from your head to your feet. | Napnij brzuch i unieś biodra nad podłogę, tak aby ciało tworzyło prostą linię od głowy do stóp. |
| 4 | While keeping your core engaged, lift your top leg as high as possible without rotating your hips. | Nie rozluźniając brzucha, unieś górną nogę jak najwyżej, nie skręcając bioder. |
| 5 | Pause for a moment at the top, then lower your leg back down. | Zatrzymaj się na chwilę w górze, a potem opuść nogę. |
| 6 | Repeat for the desired number of repetitions, then switch sides. | Powtórz tyle razy, ile zakłada seria, a potem zmień stronę. |

### `yn8yg1r` dumbbell goblet squat → przysiad goblet z hantlą

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart, holding a dumbbell vertically against your chest with both hands. | Stań w rozkroku na szerokość barków, trzymając oburącz pionowo hantlę przy klatce piersiowej. |
| 2 | Keeping your chest up and core engaged, lower your body down into a squat position by pushing your hips back and bending your knees. | Z klatką piersiową wysoko i napiętym brzuchem zejdź do przysiadu, cofając biodra i zginając kolana. |
| 3 | Continue lowering until your thighs are parallel to the ground, or as low as you can comfortably go. | Opuszczaj się, aż uda będą równoległe do podłogi albo tak nisko, jak możesz bez dyskomfortu. |
| 4 | Pause for a moment at the bottom, then push through your heels to return to the starting position. | Zatrzymaj się na chwilę w dolnej pozycji, a potem odepchnij się piętami i wróć do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `UHJlbu3` kettlebell swing → swing kettlebellem

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart, toes pointed slightly outward. | Stań w rozkroku na szerokość barków, z palcami stóp lekko na zewnątrz. |
| 2 | Hold the kettlebell with both hands in front of your body, arms extended. | Trzymaj kettlebell oburącz przed sobą, na wyprostowanych rękach. |
| 3 | Bend your knees slightly and hinge at the hips, pushing your butt back. | Lekko ugnij kolana i pochyl tułów do przodu, cofając biodra. |
| 4 | Swing the kettlebell back between your legs, keeping your arms straight and maintaining a flat back. | Przenieś kettlebell zamachem do tyłu między nogami, z prostymi rękami i prostymi plecami. |
| 5 | Drive your hips forward and swing the kettlebell up to shoulder height, using the momentum generated by your hips. | Wypchnij biodra do przodu i wymachnij kettlebell do wysokości barków, wykorzystując siłę z bioder. |
| 6 | Allow the kettlebell to swing back down between your legs and repeat the movement for the desired number of repetitions. | Pozwól kettlebellowi opaść z powrotem między nogi i powtórz ruch tyle razy, ile zakłada seria. |

### `rR0LJzx` dumbbell romanian deadlift → martwy ciąg rumuński z hantlami

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart, holding a dumbbell in each hand with an overhand grip. | Stań w rozkroku na szerokość barków, trzymając w każdej dłoni hantlę nachwytem. |
| 2 | Keeping your back straight and your core engaged, hinge at the hips and lower the dumbbells towards the ground, allowing your knees to bend slightly. | Z prostymi plecami i napiętym brzuchem pochyl tułów do przodu, zginając się w biodrach, i opuść hantle w stronę podłogi, pozwalając kolanom lekko się ugiąć. |
| 3 | Lower the dumbbells until you feel a stretch in your hamstrings, then push through your heels and engage your glutes to return to the starting position. | Opuszczaj hantle, aż poczujesz rozciąganie z tyłu ud, a potem odepchnij się piętami, napnij pośladki i wróć do pozycji wyjściowej. |
| 4 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `SSsBDwB` dumbbell rear lunge → wykrok w tył z hantlami

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart, holding a dumbbell in each hand. | Stań w rozkroku na szerokość barków, trzymając w każdej dłoni hantlę. |
| 2 | Take a step backward with your right foot, lowering your body into a lunge position. | Zrób krok w tył prawą nogą i zejdź do wykroku. |
| 3 | Bend your left knee and lower your body until your left thigh is parallel to the ground. | Zegnij lewe kolano i opuszczaj się, aż lewe udo będzie równoległe do podłogi. |
| 4 | Pause for a moment, then push through your left heel to return to the starting position. | Zatrzymaj się na chwilę, a potem odepchnij się lewą piętą i wróć do pozycji wyjściowej. |
| 5 | Repeat on the other side, stepping back with your left foot. | Powtórz na drugą stronę, robiąc krok w tył lewą nogą. |

### `aXtJhlg` dumbbell step-up → wejście na podwyższenie z hantlami

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand in front of a bench or step with a dumbbell in each hand, palms facing your body. | Stań przed ławką lub stopniem, z hantlą w każdej dłoni i dłońmi zwróconymi do ciała. |
| 2 | Place your right foot on the bench or step, ensuring your entire foot is in contact with the surface. | Postaw prawą stopę na ławce lub stopniu, całą stopą na powierzchni. |
| 3 | Push through your right heel and lift your body up onto the bench or step, straightening your right leg. | Odepchnij się prawą piętą i wejdź na ławkę lub stopień, prostując prawą nogę. |
| 4 | Bring your left foot up onto the bench or step, standing fully upright. | Dostaw lewą stopę i wyprostuj się całkowicie. |
| 5 | Step back down with your left foot, followed by your right foot, returning to the starting position. | Zejdź najpierw lewą, a potem prawą nogą i wróć do pozycji wyjściowej. |
| 6 | Repeat for the desired number of repetitions, then switch legs. | Powtórz tyle razy, ile zakłada seria, a potem zmień nogę. |

### `qx4fgX7` dumbbell single leg split squat → przysiad bułgarski z hantlami

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart, holding a dumbbell in each hand. | Stań w rozkroku na szerokość barków, trzymając w każdej dłoni hantlę. |
| 2 | Take a step forward with one foot and position your feet so that your front foot is flat on the ground and your back foot is elevated on a bench or step. | Zrób krok w przód jedną nogą i ustaw stopy tak, aby przednia stała płasko na podłodze, a tylna była oparta na ławce lub stopniu. |
| 3 | Lower your body by bending your front knee and hip, keeping your back knee slightly bent and your back heel off the ground. | Zejdź w dół, zginając przednie kolano i biodro, z lekko ugiętym tylnym kolanem i uniesioną tylną piętą. |
| 4 | Continue lowering until your front thigh is parallel to the ground, then push through your front heel to return to the starting position. | Opuszczaj się, aż przednie udo będzie równoległe do podłogi, a potem odepchnij się piętą przedniej nogi i wróć do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions, then switch legs and repeat. | Powtórz tyle razy, ile zakłada seria, a potem zmień nogę. |

### `TUZLh71` band squat → przysiad z gumą

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart, with the band placed just above your knees. | Stań w rozkroku na szerokość barków, z gumą założoną tuż nad kolanami. |
| 2 | Keeping your chest up and core engaged, push your hips back and bend your knees to lower into a squat position. | Z klatką piersiową wysoko i napiętym brzuchem cofnij biodra i zegnij kolana, schodząc do przysiadu. |
| 3 | Make sure your knees are tracking over your toes and your weight is in your heels. | Pilnuj, żeby kolana szły w linii palców stóp, a ciężar ciała był na piętach. |
| 4 | Pause for a moment at the bottom, then push through your heels to return to the starting position. | Zatrzymaj się na chwilę w dolnej pozycji, a potem odepchnij się piętami i wróć do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `E4R8Hz1` band hip lift → most biodrowy z gumą

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie on your back with your knees bent and feet flat on the ground. | Połóż się na plecach z ugiętymi kolanami i stopami płasko na podłodze. |
| 2 | Place a resistance band just above your knees. | Załóż gumę oporową tuż nad kolanami. |
| 3 | Engage your glutes and core muscles. | Napnij pośladki i brzuch. |
| 4 | Press your heels into the ground and lift your hips off the floor, squeezing your glutes at the top. | Wciśnij pięty w podłogę i unieś biodra, mocno napinając pośladki w górze. |
| 5 | Pause for a moment at the top, then slowly lower your hips back down to the starting position. | Zatrzymaj się na chwilę w górze, a potem powoli opuść biodra do pozycji wyjściowej. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `kuMiR2T` band stiff leg deadlift → martwy ciąg na prostych nogach z gumą

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and place the band around your ankles. | Stań w rozkroku na szerokość barków i załóż gumę na kostki. |
| 2 | Hold the band with both hands in front of your thighs, palms facing your body. | Chwyć gumę oburącz przed udami, z dłońmi zwróconymi do ciała. |
| 3 | Keeping your back straight and your core engaged, hinge at the hips and slowly lower your upper body towards the ground. | Z prostymi plecami i napiętym brzuchem pochyl się w biodrach i powoli opuszczaj tułów w stronę podłogi. |
| 4 | As you lower, push your hips back and allow your knees to bend slightly. | Opuszczając się, cofaj biodra i pozwól kolanom lekko się ugiąć. |
| 5 | Lower the band towards the ground, feeling a stretch in your hamstrings. | Opuść gumę w stronę podłogi, aż poczujesz rozciąganie z tyłu ud. |
| 6 | Pause for a moment at the bottom, then engage your glutes and hamstrings to lift your upper body back up to the starting position. | Zatrzymaj się na chwilę w dolnej pozycji, a potem napnij pośladki i tył ud i wróć tułowiem do pozycji wyjściowej. |
| 7 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `O95afRA` monster walk → chód boczny z gumą

| # | English | Polish |
| --- | --- | --- |
| 1 | Place a resistance band around your ankles. | Załóż gumę oporową na kostki. |
| 2 | Stand with your feet shoulder-width apart and slightly bend your knees. | Stań w rozkroku na szerokość barków i lekko ugnij kolana. |
| 3 | Take a step to the side with your right foot, maintaining tension on the resistance band. | Zrób krok w bok prawą nogą, utrzymując napięcie gumy. |
| 4 | Follow with your left foot, stepping to the side to return to the starting position. | Dostaw lewą nogę krokiem w bok i wróć do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions, then switch sides. | Powtórz tyle razy, ile zakłada seria, a potem zmień stronę. |

### `0xDpB4L` resistance band seated hip abduction → odwodzenie nóg z gumą w siadzie

| # | English | Polish |
| --- | --- | --- |
| 1 | Sit on a chair or bench with your back straight and feet flat on the ground. | Usiądź na krześle lub ławce, z prostymi plecami i stopami płasko na podłodze. |
| 2 | Wrap the resistance band around your thighs, just above your knees. | Załóż gumę oporową na uda, tuż nad kolanami. |
| 3 | Place your hands on the sides of the chair or bench for support. | Oprzyj dłonie po bokach krzesła lub ławki. |
| 4 | Engage your abductors (outer thigh muscles) and slowly push your knees apart, against the resistance of the band. | Napnij mięśnie zewnętrznej strony ud i powoli rozsuń kolana, pokonując opór gumy. |
| 5 | Pause for a moment at the end of the movement, then slowly bring your knees back together. | Zatrzymaj się na chwilę w końcowej pozycji, a potem powoli zsuń kolana. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `ZA8b5hc` kettlebell goblet squat → przysiad goblet z kettlebellem

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart, holding a kettlebell close to your chest with both hands. | Stań w rozkroku na szerokość barków, trzymając oburącz kettlebell blisko klatki piersiowej. |
| 2 | Keeping your chest up and core engaged, lower your body down into a squat position by bending at the knees and hips. | Z klatką piersiową wysoko i napiętym brzuchem zejdź do przysiadu, zginając kolana i biodra. |
| 3 | Continue lowering until your thighs are parallel to the ground, or as low as you can comfortably go. | Opuszczaj się, aż uda będą równoległe do podłogi albo tak nisko, jak możesz bez dyskomfortu. |
| 4 | Pause for a moment at the bottom, then push through your heels to return to the starting position. | Zatrzymaj się na chwilę w dolnej pozycji, a potem odepchnij się piętami i wróć do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `WKMQzCD` kettlebell lunge pass through → wykrok z przekładaniem kettlebella pod nogą

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart, holding a kettlebell in front of your chest with both hands. | Stań w rozkroku na szerokość barków, trzymając oburącz kettlebell przed klatką piersiową. |
| 2 | Take a step forward with your right foot, lowering your body into a lunge position. | Zrób krok w przód prawą nogą i zejdź do wykroku. |
| 3 | As you lunge forward, pass the kettlebell under your right thigh and transfer it to your left hand. | W wykroku przełóż kettlebell pod prawym udem do lewej dłoni. |
| 4 | Push off with your right foot to return to the starting position, while simultaneously passing the kettlebell back to your right hand. | Odepchnij się prawą stopą i wróć do pozycji wyjściowej, jednocześnie przekładając kettlebell z powrotem do prawej dłoni. |
| 5 | Repeat the lunge on the opposite side, passing the kettlebell under your left thigh. | Powtórz wykrok na drugą stronę, przekładając kettlebell pod lewym udem. |
| 6 | Continue alternating lunges and passing the kettlebell between hands for the desired number of repetitions. | Kontynuuj wykroki i przekładanie kettlebella z ręki do ręki tyle razy, ile zakłada seria. |

### `iny3m5y` dead bug → dead bug

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie flat on your back with your arms extended towards the ceiling. | Połóż się na plecach z rękami wyciągniętymi w stronę sufitu. |
| 2 | Bend your knees and lift your legs off the ground, creating a 90-degree angle at your hips and knees. | Zegnij kolana i unieś nogi, tak aby biodra i kolana były zgięte pod kątem prostym. |
| 3 | Engage your core and lower back to press your lower back into the ground. | Napnij brzuch i dociśnij dolną część pleców do podłogi. |
| 4 | Slowly lower your right arm and left leg towards the ground, keeping them straight and hovering just above the floor. | Powoli opuść prawą rękę i lewą nogę w stronę podłogi, prostując je i zatrzymując tuż nad podłogą. |
| 5 | Pause for a moment, then return to the starting position. | Zatrzymaj się na chwilę, a potem wróć do pozycji wyjściowej. |
| 6 | Repeat the movement with your left arm and right leg. | Powtórz ruch lewą ręką i prawą nogą. |
| 7 | Continue alternating sides for the desired number of repetitions. | Kontynuuj, zmieniając strony, tyle razy, ile zakłada seria. |

### `TFqbd8t` crunch floor → brzuszek

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie flat on your back with your knees bent and feet flat on the ground. | Połóż się na plecach z ugiętymi kolanami i stopami płasko na podłodze. |
| 2 | Place your hands behind your head with your elbows pointing outwards. | Połóż dłonie za głową, z łokciami skierowanymi na boki. |
| 3 | Engage your abs and lift your shoulders off the ground, curling forward towards your knees. | Napnij brzuch i oderwij barki od podłogi, zwijając tułów w stronę kolan. |
| 4 | Pause for a moment at the top, then slowly lower your shoulders back down to the starting position. | Zatrzymaj się na chwilę w górze, a potem powoli opuść barki do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `nCU1Ekp` reverse crunch → odwrotny brzuszek

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie flat on your back with your arms extended along your sides. | Połóż się na plecach z rękami wyciągniętymi wzdłuż tułowia. |
| 2 | Bend your knees and lift your feet off the ground, bringing your thighs perpendicular to the floor. | Zegnij kolana i unieś stopy nad podłogę, tak aby uda były prostopadłe do podłogi. |
| 3 | Contract your abs and curl your hips off the floor, bringing your knees towards your chest. | Napnij brzuch i oderwij biodra od podłogi, przyciągając kolana do klatki piersiowej. |
| 4 | Pause for a moment at the top, then slowly lower your hips back down to the starting position. | Zatrzymaj się na chwilę w górze, a potem powoli opuść biodra do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `NKJ8o6x` pelvic tilt → przechylanie miednicy

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie flat on your back with your knees bent and feet flat on the ground. | Połóż się na plecach z ugiętymi kolanami i stopami płasko na podłodze. |
| 2 | Place your hands by your sides. | Połóż dłonie wzdłuż tułowia. |
| 3 | Engage your abs and tilt your pelvis upward, pressing your lower back into the ground. | Napnij brzuch i podwiń miednicę, dociskając dolną część pleców do podłogi. |
| 4 | Hold this position for a few seconds, focusing on contracting your abs. | Wytrzymaj kilka sekund, skupiając się na napięciu brzucha. |
| 5 | Release the tilt and return to the starting position. | Rozluźnij miednicę i wróć do pozycji wyjściowej. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `qaZVsGk` alternate heel touchers → naprzemienne dotykanie pięt

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie flat on your back with your knees bent and feet flat on the ground. | Połóż się na plecach z ugiętymi kolanami i stopami płasko na podłodze. |
| 2 | Extend your arms straight out to the sides, parallel to the ground. | Wyciągnij proste ręce w bok, równolegle do podłogi. |
| 3 | Engaging your abs, lift your shoulders off the ground and reach your right hand towards your right heel. | Napinając brzuch, oderwij barki od podłogi i sięgnij prawą dłonią do prawej pięty. |
| 4 | Return to the starting position and repeat on the left side, reaching your left hand towards your left heel. | Wróć do pozycji wyjściowej i powtórz na lewą stronę, sięgając lewą dłonią do lewej pięty. |
| 5 | Continue alternating sides for the desired number of repetitions. | Kontynuuj, zmieniając strony, tyle razy, ile zakłada seria. |

### `rbu5UUb` cross body crunch → brzuszek skośny

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie flat on your back with your knees bent and feet flat on the ground. | Połóż się na plecach z ugiętymi kolanami i stopami płasko na podłodze. |
| 2 | Place your hands behind your head with your elbows pointing outwards. | Połóż dłonie za głową, z łokciami skierowanymi na boki. |
| 3 | Engaging your abs, lift your upper body off the ground and twist to bring your right elbow towards your left knee. | Napinając brzuch, oderwij górę ciała od podłogi i skręć tułów, przyciągając prawy łokieć do lewego kolana. |
| 4 | Pause for a moment at the top, then slowly lower your upper body back down to the starting position. | Zatrzymaj się na chwilę w górze, a potem powoli opuść górę ciała do pozycji wyjściowej. |
| 5 | Repeat on the other side, bringing your left elbow towards your right knee. | Powtórz na drugą stronę, przyciągając lewy łokieć do prawego kolana. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `2jl9K55` spine twist → skręty tułowia w siadzie

| # | English | Polish |
| --- | --- | --- |
| 1 | Sit on the ground with your legs extended in front of you. | Usiądź na podłodze z nogami wyprostowanymi przed sobą. |
| 2 | Bend your knees and place your feet flat on the ground, hip-width apart. | Zegnij kolana i postaw stopy płasko na podłodze, na szerokość bioder. |
| 3 | Place your hands behind your head with your elbows pointing outwards. | Połóż dłonie za głową, z łokciami skierowanymi na boki. |
| 4 | Engage your abs and slowly twist your torso to the right, bringing your right elbow towards your left knee. | Napnij brzuch i powoli skręć tułów w prawo, przyciągając prawy łokieć do lewego kolana. |
| 5 | Pause for a moment at the end of the twist, then slowly return to the starting position. | Zatrzymaj się na chwilę w skręcie, a potem powoli wróć do pozycji wyjściowej. |
| 6 | Repeat the twist to the left side, bringing your left elbow towards your right knee. | Powtórz skręt w lewo, przyciągając lewy łokieć do prawego kolana. |
| 7 | Continue alternating sides for the desired number of repetitions. | Kontynuuj, zmieniając strony, tyle razy, ile zakłada seria. |

### `ANbbry2` lower back curl → unoszenie tułowia w leżeniu na brzuchu

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie flat on your stomach with your legs extended and your arms by your sides. | Połóż się na brzuchu z wyprostowanymi nogami i rękami wzdłuż tułowia. |
| 2 | Engage your glutes and hamstrings, and slowly lift your upper body off the ground, curling your back upwards. | Napnij pośladki i tył ud, a potem powoli unieś górę ciała nad podłogę, wyginając plecy w górę. |
| 3 | Pause for a moment at the top, then slowly lower your upper body back down to the starting position. | Zatrzymaj się na chwilę w górze, a potem powoli opuść górę ciała do pozycji wyjściowej. |
| 4 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `XVDdcoj` russian twist → russian twist

| # | English | Polish |
| --- | --- | --- |
| 1 | Sit on the ground with your knees bent and feet flat on the floor. | Usiądź na podłodze z ugiętymi kolanami i stopami płasko na podłodze. |
| 2 | Lean back slightly while keeping your back straight and your core engaged. | Odchyl się lekko do tyłu, z prostymi plecami i napiętym brzuchem. |
| 3 | Hold your hands together in front of your chest or hold a weight if desired. | Złącz dłonie przed klatką piersiową albo, jeśli chcesz, trzymaj w nich obciążenie. |
| 4 | Lift your feet off the ground, balancing on your sit bones. | Unieś stopy nad podłogę, balansując na pośladkach. |
| 5 | Twist your torso to the right, bringing your hands or weight towards the right side of your body. | Skręć tułów w prawo, przenosząc dłonie lub obciążenie na prawą stronę ciała. |
| 6 | Pause for a moment, then twist your torso to the left, bringing your hands or weight towards the left side of your body. | Zatrzymaj się na chwilę, a potem skręć tułów w lewo, przenosząc dłonie lub obciążenie na lewą stronę ciała. |
| 7 | Continue alternating sides for the desired number of repetitions. | Kontynuuj, zmieniając strony, tyle razy, ile zakłada seria. |

### `1ZFqTDN` air bike → rowerek

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie flat on your back with your hands placed behind your head. | Połóż się na plecach z dłońmi za głową. |
| 2 | Lift your legs off the ground and bend your knees at a 90-degree angle. | Unieś nogi nad podłogę i zegnij kolana pod kątem prostym. |
| 3 | Bring your right elbow towards your left knee while simultaneously straightening your right leg. | Przyciągnij prawy łokieć do lewego kolana, jednocześnie prostując prawą nogę. |
| 4 | Return to the starting position and repeat the movement on the opposite side, bringing your left elbow towards your right knee while straightening your left leg. | Wróć do pozycji wyjściowej i powtórz ruch na drugą stronę, przyciągając lewy łokieć do prawego kolana i prostując lewą nogę. |
| 5 | Continue alternating sides in a pedaling motion for the desired number of repetitions. | Kontynuuj, zmieniając strony jak przy pedałowaniu, tyle razy, ile zakłada seria. |

### `AQIhRjM` lying elbow to knee → łokieć do kolana w leżeniu

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie flat on your back with your knees bent and feet flat on the ground. | Połóż się na plecach z ugiętymi kolanami i stopami płasko na podłodze. |
| 2 | Place your hands behind your head with your elbows pointing outwards. | Połóż dłonie za głową, z łokciami skierowanymi na boki. |
| 3 | Engage your abs and lift your upper body off the ground, bringing your right elbow towards your left knee. | Napnij brzuch i oderwij górę ciała od podłogi, przyciągając prawy łokieć do lewego kolana. |
| 4 | At the same time, extend your right leg straight out and lift it off the ground. | Jednocześnie wyprostuj prawą nogę i unieś ją nad podłogę. |
| 5 | Pause for a moment, then return to the starting position. | Zatrzymaj się na chwilę, a potem wróć do pozycji wyjściowej. |
| 6 | Repeat the movement, this time bringing your left elbow towards your right knee and extending your left leg. | Powtórz ruch, tym razem przyciągając lewy łokieć do prawego kolana i prostując lewą nogę. |
| 7 | Continue alternating sides for the desired number of repetitions. | Kontynuuj, zmieniając strony, tyle razy, ile zakłada seria. |

### `9IxJdtC` lying leg-hip raise → unoszenie nóg w leżeniu

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie flat on your back with your legs extended and your arms by your sides. | Połóż się na plecach z wyprostowanymi nogami i rękami wzdłuż tułowia. |
| 2 | Place your hands under your glutes for support. | Wsuń dłonie pod pośladki. |
| 3 | Engage your core and lift your legs off the ground, raising them towards the ceiling. | Napnij brzuch i unieś nogi nad podłogę, w stronę sufitu. |
| 4 | Pause for a moment at the top, then slowly lower your legs back down to the starting position. | Zatrzymaj się na chwilę w górze, a potem powoli opuść nogi do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `BMMolZ3` tuck crunch → brzuszek z przyciąganiem kolan

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie flat on your back with your knees bent and feet flat on the ground. | Połóż się na plecach z ugiętymi kolanami i stopami płasko na podłodze. |
| 2 | Place your hands behind your head with your elbows pointing outwards. | Połóż dłonie za głową, z łokciami skierowanymi na boki. |
| 3 | Engaging your abs, lift your shoulder blades off the ground and bring your knees towards your chest, simultaneously curling your upper body towards your knees. | Napinając brzuch, oderwij łopatki od podłogi i przyciągnij kolana do klatki piersiowej, jednocześnie zwijając tułów w stronę kolan. |
| 4 | Pause for a moment at the top, then slowly lower your shoulder blades and extend your legs back to the starting position. | Zatrzymaj się na chwilę w górze, a potem powoli opuść łopatki i wyprostuj nogi do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `UVo2Qs2` flutter kicks → nożyce pionowe

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie flat on your back with your legs extended and your hands by your sides. | Połóż się na plecach z wyprostowanymi nogami i dłońmi wzdłuż tułowia. |
| 2 | Engage your core and lift your legs off the ground about 6 inches. | Napnij brzuch i unieś nogi około 15 cm nad podłogę. |
| 3 | Keeping your legs straight, alternate lifting one leg slightly higher than the other. | Trzymając proste nogi, unoś naprzemiennie jedną nogę nieco wyżej niż drugą. |
| 4 | Continue this fluttering motion for the desired number of repetitions. | Kontynuuj ten ruch nożycowy tyle razy, ile zakłada seria. |

### `5VXmnV5` bodyweight incline side plank → deska bokiem

| # | English | Polish |
| --- | --- | --- |
| 1 | Start by lying on your side with your legs extended and stacked on top of each other. | Połóż się na boku z wyprostowanymi nogami ułożonymi jedna na drugiej. |
| 2 | Place your forearm on the ground directly below your shoulder, with your elbow bent at a 90-degree angle. | Oprzyj przedramię na podłodze dokładnie pod barkiem, z łokciem zgiętym pod kątem prostym. |
| 3 | Engage your core and lift your hips off the ground, creating a straight line from your head to your feet. | Napnij brzuch i unieś biodra nad podłogę, tak aby ciało tworzyło prostą linię od głowy do stóp. |
| 4 | Hold this position for the desired amount of time. | Utrzymaj tę pozycję przez zaplanowany czas. |
| 5 | Lower your hips back down to the ground and repeat on the other side. | Opuść biodra na podłogę i powtórz na drugą stronę. |

### `CosupLu` front plank with twist → deska ze skrętem

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a high plank position with your hands directly under your shoulders and your body in a straight line from head to toe. | Zacznij w podporze przodem na prostych rękach, z dłońmi pod barkami i ciałem w jednej linii od głowy do pięt. |
| 2 | Engage your core and glutes to maintain a stable position. | Napnij brzuch i pośladki, żeby utrzymać stabilną pozycję. |
| 3 | Rotate your torso to the right, lifting your right arm and extending it towards the ceiling. | Skręć tułów w prawo, unosząc prawą rękę i wyciągając ją w stronę sufitu. |
| 4 | Keep your hips and legs stable as you twist. | Podczas skrętu trzymaj biodra i nogi stabilnie. |
| 5 | Hold for a moment, then return to the starting position. | Wytrzymaj chwilę, a potem wróć do pozycji wyjściowej. |
| 6 | Repeat the twist on the left side. | Powtórz skręt na lewą stronę. |
| 7 | Continue alternating sides for the desired number of repetitions. | Kontynuuj, zmieniając strony, tyle razy, ile zakłada seria. |

### `hCjGsRQ` power point plank → deska góra–dół

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a high plank position with your hands directly under your shoulders and your body in a straight line from head to toe. | Zacznij w podporze przodem na prostych rękach, z dłońmi pod barkami i ciałem w jednej linii od głowy do pięt. |
| 2 | Engage your core and squeeze your glutes to maintain a stable position. | Napnij brzuch i mocno napnij pośladki, żeby utrzymać stabilną pozycję. |
| 3 | Lower your body down onto your forearms, one arm at a time, maintaining a straight line from head to toe. | Zejdź na przedramiona, po jednej ręce, utrzymując ciało w jednej linii od głowy do pięt. |
| 4 | Hold this position for the desired amount of time, keeping your core and glutes engaged. | Utrzymaj tę pozycję przez zaplanowany czas, z napiętym brzuchem i pośladkami. |
| 5 | To return to the starting position, push through your forearms and lift your body back up into a high plank position. | Aby wrócić do pozycji wyjściowej, odepchnij się od przedramion i wróć do podporu przodem na prostych rękach. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `ZuXu4Eq` v-sit on floor → siad V na podłodze

| # | English | Polish |
| --- | --- | --- |
| 1 | Sit on the floor with your legs extended in front of you. | Usiądź na podłodze z nogami wyprostowanymi przed sobą. |
| 2 | Lean back slightly and lift your legs off the ground, keeping them straight. | Odchyl się lekko do tyłu i unieś proste nogi nad podłogę. |
| 3 | Simultaneously, lift your upper body off the ground and reach your arms towards your legs. | Jednocześnie unieś górę ciała i sięgnij rękami w stronę nóg. |
| 4 | Hold this position for a few seconds, then slowly lower your upper body and legs back down to the starting position. | Wytrzymaj kilka sekund, a potem powoli opuść górę ciała i nogi do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `tFToB7l` reverse plank with leg lift → deska tyłem z unoszeniem nogi

| # | English | Polish |
| --- | --- | --- |
| 1 | Sit on the ground with your legs extended in front of you and your hands resting on the ground behind you, fingers pointing towards your feet. | Usiądź na podłodze z nogami wyprostowanymi przed sobą i dłońmi opartymi na podłodze za sobą, palcami w stronę stóp. |
| 2 | Press through your hands and lift your hips off the ground, coming into a reverse plank position. | Odepchnij się dłońmi i unieś biodra nad podłogę, przechodząc do deski tyłem. |
| 3 | Engage your core and lift one leg off the ground, extending it straight up towards the ceiling. | Napnij brzuch i unieś jedną prostą nogę w stronę sufitu. |
| 4 | Hold for a moment, then lower your leg back down. | Wytrzymaj chwilę, a potem opuść nogę. |
| 5 | Repeat with the other leg. | Powtórz drugą nogą. |
| 6 | Continue alternating legs for the desired number of repetitions. | Kontynuuj, zmieniając nogi, tyle razy, ile zakłada seria. |

### `UpWmA5E` l-sit on floor → siad L na podłodze

| # | English | Polish |
| --- | --- | --- |
| 1 | Sit on the floor with your legs extended in front of you. | Usiądź na podłodze z nogami wyprostowanymi przed sobą. |
| 2 | Place your hands on the floor beside your hips, fingers pointing forward. | Oprzyj dłonie na podłodze przy biodrach, z palcami skierowanymi do przodu. |
| 3 | Engage your core and lift your legs off the ground, keeping them straight. | Napnij brzuch i unieś proste nogi nad podłogę. |
| 4 | Try to bring your legs parallel to the floor, forming an 'L' shape with your body. | Postaraj się utrzymać nogi równolegle do podłogi, tak aby ciało tworzyło literę L. |
| 5 | Hold this position for as long as you can. | Utrzymaj tę pozycję tak długo, jak dasz radę. |
| 6 | Slowly lower your legs back down to the starting position. | Powoli opuść nogi do pozycji wyjściowej. |
| 7 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `KhHJ338` push-up to side plank → pompka z przejściem do deski bokiem

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a push-up position with your hands shoulder-width apart and your body in a straight line. | Zacznij w podporze przodem, z dłońmi na szerokość barków i ciałem w jednej linii. |
| 2 | Lower your body towards the ground by bending your elbows, keeping your core engaged. | Zegnij łokcie i opuść ciało w stronę podłogi, z napiętym brzuchem. |
| 3 | Push back up to the starting position. | Wypchnij się do pozycji wyjściowej. |
| 4 | Shift your weight onto your left hand and rotate your body to the right, lifting your right arm towards the ceiling. | Przenieś ciężar ciała na lewą dłoń i obróć ciało w prawo, unosząc prawą rękę w stronę sufitu. |
| 5 | Hold the side plank position for a few seconds, then return to the starting position. | Wytrzymaj kilka sekund w desce bokiem, a potem wróć do pozycji wyjściowej. |
| 6 | Repeat the push-up and side plank on the opposite side. | Powtórz pompkę i deskę bokiem na drugą stronę. |
| 7 | Continue alternating sides for the desired number of repetitions. | Kontynuuj, zmieniając strony, tyle razy, ile zakłada seria. |

### `IpONWYv` dumbbell side bend → skłony boczne z hantlą

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand up straight with your feet shoulder-width apart and hold a dumbbell in one hand, letting it hang down by your side. | Stań prosto w rozkroku na szerokość barków i trzymaj hantlę w jednej dłoni, z ręką swobodnie opuszczoną wzdłuż boku. |
| 2 | Keeping your back straight and your core engaged, slowly bend sideways at the waist towards the opposite side of the dumbbell, lowering the weight as far as you comfortably can. | Z prostymi plecami i napiętym brzuchem powoli pochyl tułów w bok, w stronę przeciwną do hantli, opuszczając ciężar tak nisko, jak możesz bez dyskomfortu. |
| 3 | Pause for a moment, then slowly return to the starting position. | Zatrzymaj się na chwilę, a potem powoli wróć do pozycji wyjściowej. |
| 4 | Repeat for the desired number of repetitions, then switch sides and repeat. | Powtórz tyle razy, ile zakłada seria, a potem zmień stronę. |

### `L4ay0PW` kettlebell figure 8 → ósemki z kettlebellem

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart, holding a kettlebell in one hand. | Stań w rozkroku na szerokość barków, trzymając kettlebell w jednej dłoni. |
| 2 | Bend your knees slightly and hinge forward at the hips, keeping your back straight. | Lekko ugnij kolana i pochyl tułów do przodu, zginając się w biodrach, z prostymi plecami. |
| 3 | Pass the kettlebell between your legs, switching hands as it reaches the back of your legs. | Przełóż kettlebell między nogami, zmieniając rękę za nogami. |
| 4 | As the kettlebell comes forward, pass it to the other hand between your legs. | Gdy kettlebell wraca do przodu, przełóż go między nogami do drugiej ręki. |
| 5 | Continue passing the kettlebell between your legs in a figure 8 motion. | Kontynuuj przekładanie kettlebella między nogami po torze ósemki. |
| 6 | Maintain a steady pace and engage your core throughout the exercise. | Utrzymuj równe tempo i napięty brzuch przez całe ćwiczenie. |
| 7 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `9Tkqa9O` kettlebell windmill → wiatrak z kettlebellem

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart, holding a kettlebell in your right hand overhead. | Stań w rozkroku na szerokość barków, trzymając kettlebell w prawej dłoni nad głową. |
| 2 | Rotate your left foot outwards about 45 degrees and keep your right foot pointing forward. | Obróć lewą stopę na zewnątrz o około 45 stopni, a prawą zostaw skierowaną do przodu. |
| 3 | Bend your torso to the left side, keeping your right arm extended overhead and your eyes on the kettlebell. | Pochyl tułów w lewo, trzymając prawą rękę wyprostowaną nad głową i patrząc na kettlebell. |
| 4 | Lower your torso as far as you can while keeping your right arm straight and your left arm extended to the side. | Opuść tułów tak nisko, jak możesz, z prostą prawą ręką i lewą ręką wyciągniętą w bok. |
| 5 | Pause for a moment, then return to the starting position by pushing through your right foot and engaging your obliques. | Zatrzymaj się na chwilę, a potem wróć do pozycji wyjściowej, odpychając się prawą stopą i napinając mięśnie skośne brzucha. |
| 6 | Repeat for the desired number of repetitions, then switch sides. | Powtórz tyle razy, ile zakłada seria, a potem zmień stronę. |

### `Ha7SZ3y` kettlebell turkish get up (squat style) → tureckie wstawanie z kettlebellem przez przysiad

| # | English | Polish |
| --- | --- | --- |
| 1 | Start by lying on your back with your legs extended and the kettlebell held in your right hand, arm fully extended above your shoulder. | Połóż się na plecach z wyprostowanymi nogami, trzymając kettlebell w prawej dłoni, z ręką wyprostowaną nad barkiem. |
| 2 | Bend your right knee and place your right foot flat on the ground, keeping your left leg extended. | Zegnij prawe kolano i postaw prawą stopę płasko na podłodze, z lewą nogą wyprostowaną. |
| 3 | Pressing through your right foot, lift your hips off the ground, coming into a bridge position. | Odpychając się prawą stopą, unieś biodra nad podłogę do pozycji mostu. |
| 4 | Slide your left leg underneath your body, bending your left knee and placing your left foot flat on the ground. | Wsuń lewą nogę pod siebie, zginając lewe kolano i stawiając lewą stopę płasko na podłodze. |
| 5 | Rotate your torso to the left, bringing your left hand to the ground for support. | Skręć tułów w lewo i oprzyj lewą dłoń na podłodze. |
| 6 | Pressing through your right foot and left hand, lift your torso off the ground, coming into a kneeling position. | Odpychając się prawą stopą i lewą dłonią, unieś tułów nad podłogę i przejdź do klęku. |
| 7 | From the kneeling position, stand up, keeping the kettlebell extended overhead. | Z klęku wstań, trzymając kettlebell wyprostowaną ręką nad głową. |
| 8 | Reverse the movement to return to the starting position. | Odwróć ruch i wróć do pozycji wyjściowej. |
| 9 | Repeat the exercise on the other side, starting with the kettlebell in your left hand. | Powtórz ćwiczenie na drugą stronę, z kettlebellem w lewej dłoni. |

### `RJgzwny` mountain climber → wspinaczka

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a high plank position with your hands directly under your shoulders and your body in a straight line. | Zacznij w podporze przodem na prostych rękach, z dłońmi pod barkami i ciałem w jednej linii. |
| 2 | Engage your core and bring your right knee towards your chest, then quickly switch and bring your left knee towards your chest. | Napnij brzuch i przyciągnij prawe kolano do klatki piersiowej, a potem szybko zmień nogi i przyciągnij lewe kolano. |
| 3 | Continue alternating legs in a running motion, keeping your hips low and your core engaged. | Zmieniaj nogi dalej jak w biegu, trzymając biodra nisko i napięty brzuch. |
| 4 | Maintain a steady pace and breathe evenly throughout the exercise. | Utrzymuj równe tempo i oddychaj spokojnie przez całe ćwiczenie. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `zfNHMN9` skater hops → skoki łyżwiarza

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart. | Stań w rozkroku na szerokość barków. |
| 2 | Bend your knees slightly and jump to the right, landing on your right foot. | Lekko ugnij kolana i skocz w prawo, lądując na prawej stopie. |
| 3 | As you land, swing your left leg behind your right leg and tap the ground with your left toes. | Lądując, przenieś lewą nogę za prawą i dotknij podłogi palcami lewej stopy. |
| 4 | Immediately jump to the left, landing on your left foot. | Od razu skocz w lewo, lądując na lewej stopie. |
| 5 | As you land, swing your right leg behind your left leg and tap the ground with your right toes. | Lądując, przenieś prawą nogę za lewą i dotknij podłogi palcami prawej stopy. |
| 6 | Continue alternating sides, jumping and tapping the ground with each leg. | Kontynuuj skoki na zmianę w obie strony, dotykając podłogi raz jedną, raz drugą nogą. |
| 7 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `dK9394r` burpee → burpee

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a standing position with your feet shoulder-width apart. | Stań w rozkroku na szerokość barków. |
| 2 | Lower your body into a squat position by bending your knees and placing your hands on the floor in front of you. | Zejdź do przysiadu, zginając kolana, i połóż dłonie na podłodze przed sobą. |
| 3 | Kick your feet back into a push-up position. | Wyrzuć nogi do tyłu do podporu przodem. |
| 4 | Perform a push-up, keeping your body in a straight line. | Zrób pompkę, utrzymując ciało w jednej linii. |
| 5 | Jump your feet back into the squat position. | Doskocz stopami z powrotem do przysiadu. |
| 6 | Jump up explosively, reaching your arms overhead. | Wyskocz dynamicznie w górę, sięgając rękami nad głowę. |
| 7 | Land softly and immediately lower back into a squat position to begin the next repetition. | Wyląduj miękko i od razu zejdź do przysiadu, zaczynając kolejne powtórzenie. |

### `fNGumX0` back and forth step → kroki w przód i w tył

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart. | Stań w rozkroku na szerokość barków. |
| 2 | Step forward with your right foot, bending your knee and lowering your body into a lunge position. | Zrób krok w przód prawą nogą, zginając kolano i schodząc do wykroku. |
| 3 | Push off with your right foot and step back to the starting position. | Odepchnij się prawą stopą i wróć krokiem do pozycji wyjściowej. |
| 4 | Repeat the movement with your left foot, alternating legs with each step. | Powtórz ruch lewą nogą, zmieniając nogi przy każdym kroku. |
| 5 | Continue stepping back and forth, maintaining a steady pace. | Kontynuuj kroki w przód i w tył w równym tempie. |
| 6 | Repeat for the desired duration or number of repetitions. | Kontynuuj przez zaplanowany czas lub tyle razy, ile zakłada seria. |

### `hoXt6wv` left hook. boxing → lewy sierpowy

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and your knees slightly bent. | Stań w rozkroku na szerokość barków, z lekko ugiętymi kolanami. |
| 2 | Keep your left hand up to protect your face and your right hand by your chin. | Trzymaj lewą dłoń wysoko, osłaniając twarz, a prawą przy brodzie. |
| 3 | Rotate your hips and pivot on your left foot as you extend your left arm forward in a punching motion. | Skręć biodra i obróć się na lewej stopie, wyprowadzając lewą ręką cios do przodu. |
| 4 | Twist your torso and engage your core muscles to generate power in the punch. | Skręć tułów i napnij brzuch, żeby nadać ciosowi siłę. |
| 5 | Snap your arm back to the starting position and repeat for the desired number of repetitions. | Szybko cofnij rękę do pozycji wyjściowej i powtórz tyle razy, ile zakłada seria. |

### `HtfCpfi` star jump (male) → skok gwiazda

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and your arms by your sides. | Stań w rozkroku na szerokość barków, z rękami wzdłuż tułowia. |
| 2 | Bend your knees slightly and jump up explosively. | Lekko ugnij kolana i wyskocz dynamicznie w górę. |
| 3 | As you jump, spread your legs and extend your arms out to the sides, forming a star shape with your body. | W wyskoku rozłóż nogi i wyciągnij ręce w bok, tak aby ciało tworzyło gwiazdę. |
| 4 | Land softly on the balls of your feet with your knees slightly bent. | Wyląduj miękko na przedniej części stóp, z lekko ugiętymi kolanami. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `Eh2v5Iu` scissor jumps (male) → skoki nożycowe

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart. | Stań w rozkroku na szerokość barków. |
| 2 | Jump off the ground and simultaneously cross your right leg in front of your left leg. | Podskocz i jednocześnie skrzyżuj prawą nogę przed lewą. |
| 3 | As you land, quickly switch legs, crossing your left leg in front of your right leg. | Przy lądowaniu szybko zmień nogi, krzyżując lewą nogę przed prawą. |
| 4 | Continue alternating legs and jumping as quickly as possible. | Kontynuuj skoki ze zmianą nóg jak najszybciej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `J9zIWig` walking high knees lunge → wykroki w marszu z wysokim kolanem

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet hip-width apart. | Stań ze stopami na szerokość bioder. |
| 2 | Lift your right knee up towards your chest as high as you can while balancing on your left leg. | Unieś prawe kolano jak najwyżej w stronę klatki piersiowej, balansując na lewej nodze. |
| 3 | Step forward with your right foot and lower your body into a lunge position, bending both knees to a 90-degree angle. | Zrób krok w przód prawą nogą i zejdź do wykroku, zginając oba kolana pod kątem prostym. |
| 4 | Push off with your right foot and bring your left knee up towards your chest. | Odepchnij się prawą stopą i unieś lewe kolano w stronę klatki piersiowej. |
| 5 | Step forward with your left foot and lower your body into a lunge position. | Zrób krok w przód lewą nogą i zejdź do wykroku. |
| 6 | Continue alternating legs and lunging forward, keeping your core engaged and maintaining a steady pace. | Kontynuuj wykroki w przód, zmieniając nogi, z napiętym brzuchem i w równym tempie. |
| 7 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `0Yz8WdV` bear crawl → chód niedźwiedzia

| # | English | Polish |
| --- | --- | --- |
| 1 | Start on all fours with your hands directly under your shoulders and your knees directly under your hips. | Zacznij w klęku podpartym, z dłońmi pod barkami i kolanami pod biodrami. |
| 2 | Lift your knees slightly off the ground, keeping your back flat and your core engaged. | Unieś kolana lekko nad podłogę, z prostymi plecami i napiętym brzuchem. |
| 3 | Move your right hand and left foot forward simultaneously, followed by your left hand and right foot. | Przesuń do przodu jednocześnie prawą dłoń i lewą stopę, a potem lewą dłoń i prawą stopę. |
| 4 | Continue crawling forward, alternating your hand and foot movements. | Kontynuuj chód do przodu, naprzemiennie przestawiając dłonie i stopy. |
| 5 | Maintain a steady pace and keep your core tight throughout the exercise. | Utrzymuj równe tempo i napięty brzuch przez całe ćwiczenie. |
| 6 | Continue for the desired distance or time. | Kontynuuj na zaplanowanym dystansie lub przez zaplanowany czas. |

### `mr7pkqP` jack burpee → burpee z pajacykiem

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a standing position with your feet shoulder-width apart. | Stań w rozkroku na szerokość barków. |
| 2 | Lower your body into a squat position, placing your hands on the ground in front of you. | Zejdź do przysiadu i połóż dłonie na podłodze przed sobą. |
| 3 | Kick your feet back, landing in a push-up position. | Wyrzuć nogi do tyłu, lądując w podporze przodem. |
| 4 | Perform a push-up, lowering your chest to the ground and then pushing back up. | Zrób pompkę, opuszczając klatkę piersiową do podłogi i wypychając się z powrotem. |
| 5 | Jump your feet forward, landing in a squat position. | Doskocz stopami do przodu, lądując w przysiadzie. |
| 6 | Jump up explosively, reaching your arms overhead. | Wyskocz dynamicznie w górę, sięgając rękami nad głowę. |
| 7 | Land softly and immediately lower back into the squat position to begin the next repetition. | Wyląduj miękko i od razu zejdź do przysiadu, zaczynając kolejne powtórzenie. |

### `PrQbjvB` push to run → pompka ze wspinaczką

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a push-up position with your hands shoulder-width apart and your body in a straight line. | Zacznij w podporze przodem, z dłońmi na szerokość barków i ciałem w jednej linii. |
| 2 | Lower your chest towards the ground by bending your elbows, keeping your body straight. | Zegnij łokcie i opuść klatkę piersiową w stronę podłogi, utrzymując ciało prosto. |
| 3 | Push through your hands to extend your arms and return to the starting position. | Odepchnij się dłońmi, prostując ręce, i wróć do pozycji wyjściowej. |
| 4 | Quickly bring one knee towards your chest, then quickly switch and bring the other knee towards your chest. | Szybko przyciągnij jedno kolano do klatki piersiowej, a potem szybko zmień nogi i przyciągnij drugie. |
| 5 | Continue alternating knees as fast as you can while maintaining good form. | Zmieniaj nogi jak najszybciej, zachowując dobrą technikę. |
| 6 | Continue for the desired duration or number of repetitions. | Kontynuuj przez zaplanowany czas lub tyle razy, ile zakłada seria. |

### `0JtKWum` dumbbell burpee → burpee z hantlami

| # | English | Polish |
| --- | --- | --- |
| 1 | Start in a standing position with your feet shoulder-width apart and a dumbbell in each hand. | Stań w rozkroku na szerokość barków, z hantlą w każdej dłoni. |
| 2 | Lower your body into a squat position, placing the dumbbells on the ground in front of you. | Zejdź do przysiadu i połóż hantle na podłodze przed sobą. |
| 3 | Kick your feet back into a push-up position, keeping your body in a straight line. | Wyrzuć nogi do tyłu do podporu przodem, utrzymując ciało w jednej linii. |
| 4 | Perform a push-up, bending your elbows and lowering your chest towards the ground. | Zrób pompkę, zginając łokcie i opuszczając klatkę piersiową w stronę podłogi. |
| 5 | Jump your feet back towards your hands, landing in a squat position. | Doskocz stopami do dłoni, lądując w przysiadzie. |
| 6 | Stand up explosively, lifting the dumbbells off the ground and bringing them to your shoulders. | Wstań dynamicznie, unosząc hantle z podłogi do barków. |
| 7 | Press the dumbbells overhead, fully extending your arms. | Wypchnij hantle nad głowę, prostując całkowicie ręce. |
| 8 | Lower the dumbbells back to your shoulders and repeat the entire sequence for the desired number of repetitions. | Opuść hantle do barków i powtórz całą sekwencję tyle razy, ile zakłada seria. |

### `yWxMvB5` kettlebell thruster → thruster z kettlebellem

| # | English | Polish |
| --- | --- | --- |
| 1 | Start by standing with your feet shoulder-width apart, holding a kettlebell in front of your chest with both hands, palms facing each other. | Stań w rozkroku na szerokość barków, trzymając oburącz kettlebell przed klatką piersiową, z dłońmi zwróconymi do siebie. |
| 2 | Lower into a squat position by bending your knees and pushing your hips back, keeping your chest up and your back straight. | Zejdź do przysiadu, zginając kolana i cofając biodra, z klatką piersiową wysoko i prostymi plecami. |
| 3 | As you reach the bottom of the squat, explosively drive through your heels to stand up, simultaneously pressing the kettlebell overhead. | Z dolnej pozycji przysiadu dynamicznie odepchnij się piętami i wstań, jednocześnie wypychając kettlebell nad głowę. |
| 4 | Lock out your arms at the top of the movement, fully extending your elbows. | Zablokuj ręce w górze, prostując całkowicie łokcie. |
| 5 | Lower the kettlebell back to the starting position by reversing the movement, bending your elbows and lowering the weight back to your chest. | Odwróć ruch i opuść kettlebell do pozycji wyjściowej, zginając łokcie i sprowadzając ciężar do klatki piersiowej. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `8ARQ9Hw` kettlebell sumo high pull → przyciąganie kettlebella do brody w rozkroku sumo

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet wider than shoulder-width apart, toes pointing outwards. | Stań w rozkroku szerszym niż barki, z palcami stóp skierowanymi na zewnątrz. |
| 2 | Hold a kettlebell with both hands in front of your body, arms extended downwards. | Trzymaj kettlebell oburącz przed sobą, na rękach wyprostowanych w dół. |
| 3 | Bend your knees and lower your hips into a squat position, keeping your back straight. | Zegnij kolana i zejdź biodrami do przysiadu, z prostymi plecami. |
| 4 | Drive through your heels and explosively extend your hips and knees, pulling the kettlebell up towards your chin. | Odepchnij się piętami i dynamicznie wyprostuj biodra i kolana, przyciągając kettlebell w stronę brody. |
| 5 | As you pull the kettlebell up, keep your elbows high and wide, and squeeze your shoulder blades together. | Przyciągając kettlebell, trzymaj łokcie wysoko i szeroko i ściągnij łopatki. |
| 6 | Lower the kettlebell back down to the starting position and repeat for the desired number of repetitions. | Opuść kettlebell do pozycji wyjściowej i powtórz tyle razy, ile zakłada seria. |

### `BWnJR72` lying (side) quads stretch → rozciąganie przodu uda w leżeniu bokiem

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie on your side with your legs straight. | Połóż się na boku z prostymi nogami. |
| 2 | Bend your top leg and grab your ankle or foot with your hand. | Zegnij górną nogę i chwyć dłonią kostkę lub stopę. |
| 3 | Gently pull your ankle or foot towards your glutes until you feel a stretch in your quads. | Delikatnie przyciągnij kostkę lub stopę do pośladka, aż poczujesz rozciąganie z przodu uda. |
| 4 | Hold the stretch for 20-30 seconds. | Utrzymaj rozciąganie przez 20–30 sekund. |
| 5 | Release the stretch and repeat on the other side. | Puść nogę i powtórz na drugą stronę. |

### `QY39eBr` seated piriformis stretch → rozciąganie mięśnia gruszkowatego w siadzie

| # | English | Polish |
| --- | --- | --- |
| 1 | Sit on the ground with your legs extended in front of you. | Usiądź na podłodze z nogami wyprostowanymi przed sobą. |
| 2 | Bend your right knee and place your right foot on the outside of your left knee. | Zegnij prawe kolano i postaw prawą stopę po zewnętrznej stronie lewego kolana. |
| 3 | Place your left elbow on the outside of your right knee and gently twist your torso to the right. | Oprzyj lewy łokieć o zewnętrzną stronę prawego kolana i delikatnie skręć tułów w prawo. |
| 4 | Hold the stretch for 20-30 seconds, then switch sides and repeat. | Utrzymaj rozciąganie przez 20–30 sekund, a potem zmień stronę i powtórz. |

### `bWlZvXh` butterfly yoga pose → motyl

| # | English | Polish |
| --- | --- | --- |
| 1 | Sit on the floor with your legs extended in front of you. | Usiądź na podłodze z nogami wyprostowanymi przed sobą. |
| 2 | Bend your knees and bring the soles of your feet together, allowing your knees to fall out to the sides. | Zegnij kolana i złącz podeszwy stóp, pozwalając kolanom opaść na boki. |
| 3 | Hold onto your ankles or feet with your hands. | Chwyć dłońmi kostki lub stopy. |
| 4 | Sit up tall and lengthen your spine. | Wyprostuj się i wydłuż kręgosłup. |
| 5 | Gently press your knees down towards the floor, feeling a stretch in your inner thighs. | Delikatnie dociskaj kolana w stronę podłogi, aż poczujesz rozciąganie po wewnętrznej stronie ud. |
| 6 | Hold this position for a few breaths. | Wytrzymaj w tej pozycji kilka oddechów. |
| 7 | To release, slowly bring your knees back up and extend your legs. | Aby zakończyć, powoli unieś kolana i wyprostuj nogi. |

### `0mB6wHO` runners stretch → rozciąganie biegacza

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet hip-width apart. | Stań ze stopami na szerokość bioder. |
| 2 | Take a step forward with your right foot, keeping your left foot planted. | Zrób krok w przód prawą nogą, zostawiając lewą stopę w miejscu. |
| 3 | Bend your right knee and lower your body down, keeping your left leg straight. | Zegnij prawe kolano i opuść ciało, trzymając lewą nogę prosto. |
| 4 | Place your hands on your right thigh for support. | Oprzyj dłonie na prawym udzie. |
| 5 | Hold the stretch for 20-30 seconds, then switch sides and repeat. | Utrzymaj rozciąganie przez 20–30 sekund, a potem zmień stronę i powtórz. |

### `f38OEuO` kneeling lat stretch → rozciąganie boku pleców w klęku

| # | English | Polish |
| --- | --- | --- |
| 1 | Kneel on the ground with your knees hip-width apart and your toes pointing back. | Uklęknij na podłodze, z kolanami na szerokość bioder i palcami stóp skierowanymi do tyłu. |
| 2 | Extend your arms overhead and interlace your fingers. | Wyciągnij ręce nad głowę i spleć palce. |
| 3 | Keeping your back straight, slowly lean to the right side, feeling a stretch in your left lat muscle. | Z prostymi plecami powoli przechyl się w prawo, aż poczujesz rozciąganie lewego boku pleców. |
| 4 | Hold the stretch for 20-30 seconds, then return to the starting position. | Utrzymaj rozciąganie przez 20–30 sekund, a potem wróć do pozycji wyjściowej. |
| 5 | Repeat the stretch on the left side, leaning to the left and feeling a stretch in your right lat muscle. | Powtórz rozciąganie na lewą stronę, przechylając się w lewo, aż poczujesz rozciąganie prawego boku pleców. |
| 6 | Continue alternating sides for the desired number of repetitions. | Kontynuuj, zmieniając strony, tyle razy, ile zakłada seria. |

### `DIVyqrU` sphinx → sfinks

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie face down on the ground with your forearms flat on the floor, elbows directly under your shoulders. | Połóż się na brzuchu, z przedramionami płasko na podłodze i łokciami dokładnie pod barkami. |
| 2 | Engage your core and lift your chest off the ground, keeping your forearms and toes on the floor. | Napnij brzuch i unieś klatkę piersiową nad podłogę, trzymając przedramiona i palce stóp na podłodze. |
| 3 | Hold this position for a few seconds, making sure to keep your neck in a neutral position. | Wytrzymaj kilka sekund, utrzymując szyję w neutralnej pozycji. |
| 4 | Slowly lower your chest back down to the starting position. | Powoli opuść klatkę piersiową do pozycji wyjściowej. |
| 5 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `2Dk4xQV` rocking frog stretch → żaba z kołysaniem

| # | English | Polish |
| --- | --- | --- |
| 1 | Start by kneeling on the ground with your knees hip-width apart. | Uklęknij na podłodze, z kolanami na szerokość bioder. |
| 2 | Place your hands on the ground in front of you for support. | Oprzyj dłonie na podłodze przed sobą. |
| 3 | Slowly lean forward, shifting your weight onto your hands and extending your legs behind you. | Powoli pochyl się do przodu, przenosząc ciężar ciała na dłonie i wysuwając nogi do tyłu. |
| 4 | Keep your back straight and engage your glutes as you push your hips back and up towards the ceiling. | Trzymaj proste plecy i napnij pośladki, przesuwając biodra do tyłu i w górę. |
| 5 | Hold this position for a few seconds, feeling a stretch in your glutes. | Wytrzymaj kilka sekund, czując rozciąganie w pośladkach. |
| 6 | Slowly return to the starting position by bending your knees and lowering your hips back down. | Powoli wróć do pozycji wyjściowej, zginając kolana i opuszczając biodra. |
| 7 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `pZwUsKB` iron cross stretch → żelazny krzyż

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie flat on your back with your arms extended out to the sides. | Połóż się na plecach z rękami rozłożonymi w bok. |
| 2 | Raise your legs up towards the ceiling, keeping them straight. | Unieś proste nogi w stronę sufitu. |
| 3 | Slowly lower your legs to one side, aiming to touch the floor with your feet. | Powoli opuść nogi na jedną stronę, starając się dotknąć stopami podłogi. |
| 4 | Hold the stretch for a few seconds, then return your legs to the starting position. | Utrzymaj rozciąganie przez kilka sekund, a potem wróć nogami do pozycji wyjściowej. |
| 5 | Repeat the stretch on the other side. | Powtórz rozciąganie na drugą stronę. |
| 6 | Continue alternating sides for the desired number of repetitions. | Kontynuuj, zmieniając strony, tyle razy, ile zakłada seria. |

### `HIgYKAB` seated wide angle pose sequence → skłon w siadzie rozkrocznym

| # | English | Polish |
| --- | --- | --- |
| 1 | Sit on the ground with your legs extended in a wide angle. | Usiądź na podłodze z nogami wyprostowanymi w szerokim rozkroku. |
| 2 | Flex your feet and engage your quadriceps. | Przyciągnij palce stóp do siebie i napnij mięśnie przodu ud. |
| 3 | Place your hands on the ground behind you for support. | Oprzyj dłonie na podłodze za sobą. |
| 4 | Keeping your back straight, lean forward from your hips. | Z prostymi plecami pochyl się do przodu, zginając się w biodrach. |
| 5 | Continue leaning forward until you feel a stretch in your hamstrings. | Pochylaj się dalej, aż poczujesz rozciąganie z tyłu ud. |
| 6 | Hold this position for a few breaths. | Wytrzymaj w tej pozycji kilka oddechów. |
| 7 | Slowly release the stretch and return to the starting position. | Powoli wyjdź z rozciągania i wróć do pozycji wyjściowej. |
| 8 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `01qpYSe` upward facing dog → pies z głową w górę

| # | English | Polish |
| --- | --- | --- |
| 1 | Lie face down on the floor with your legs extended behind you. | Połóż się na brzuchu z nogami wyprostowanymi za sobą. |
| 2 | Place your hands on the floor next to your lower ribs, fingers pointing forward. | Połóż dłonie na podłodze przy dolnych żebrach, z palcami skierowanymi do przodu. |
| 3 | Press your hands firmly into the floor and straighten your arms, lifting your torso and thighs off the ground. | Mocno wciśnij dłonie w podłogę i wyprostuj ręce, unosząc tułów i uda nad podłogę. |
| 4 | Roll your shoulders back and down, opening your chest and lifting your gaze towards the ceiling. | Ściągnij barki w tył i w dół, otwierając klatkę piersiową i kierując wzrok w stronę sufitu. |
| 5 | Hold this position for a few breaths, then slowly lower your body back down to the starting position. | Wytrzymaj w tej pozycji kilka oddechów, a potem powoli opuść ciało do pozycji wyjściowej. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `99rWm7w` hamstring stretch → rozciąganie tyłu uda

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart. | Stań w rozkroku na szerokość barków. |
| 2 | Step forward with your right foot and shift your weight onto your right leg. | Zrób krok w przód prawą nogą i przenieś na nią ciężar ciała. |
| 3 | Keeping your back straight, slowly bend forward at the hips, reaching towards your right foot with both hands. | Z prostymi plecami powoli pochyl się do przodu, zginając się w biodrach, i sięgnij obiema dłońmi w stronę prawej stopy. |
| 4 | Hold the stretch for 20-30 seconds, then return to the starting position. | Utrzymaj rozciąganie przez 20–30 sekund, a potem wróć do pozycji wyjściowej. |
| 5 | Repeat on the other side. | Powtórz na drugą stronę. |

### `DeDThfG` seated glute stretch → rozciąganie pośladków w siadzie

| # | English | Polish |
| --- | --- | --- |
| 1 | Sit on the ground with your legs extended in front of you. | Usiądź na podłodze z nogami wyprostowanymi przed sobą. |
| 2 | Bend your right knee and cross your right ankle over your left thigh. | Zegnij prawe kolano i połóż prawą kostkę na lewym udzie. |
| 3 | Place your right hand on the ground behind you for support. | Oprzyj prawą dłoń na podłodze za sobą. |
| 4 | With your left hand, gently press down on your right knee to deepen the stretch. | Lewą dłonią delikatnie dociśnij prawe kolano, żeby pogłębić rozciąganie. |
| 5 | Hold the stretch for 30 seconds to 1 minute. | Utrzymaj rozciąganie przez 30 sekund do 1 minuty. |
| 6 | Switch sides and repeat. | Zmień stronę i powtórz. |

### `Uto7l43` chest and front of shoulder stretch → rozciąganie klatki piersiowej i przodu barków

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand tall with your feet shoulder-width apart. | Stań prosto w rozkroku na szerokość barków. |
| 2 | Extend your arms straight out in front of you at shoulder height. | Wyciągnij proste ręce przed siebie na wysokości barków. |
| 3 | Cross your arms in front of your body, with your right arm on top of your left arm. | Skrzyżuj ręce przed sobą, prawą na lewej. |
| 4 | Interlace your fingers and press your palms together. | Spleć palce i dociśnij dłonie do siebie. |
| 5 | Gently squeeze your shoulder blades together and push your hands forward, feeling a stretch in your chest and front of your shoulders. | Delikatnie ściągnij łopatki i wypchnij dłonie do przodu, aż poczujesz rozciąganie klatki piersiowej i przodu barków. |
| 6 | Hold the stretch for 20-30 seconds, then release. | Utrzymaj rozciąganie przez 20–30 sekund, a potem rozluźnij. |
| 7 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `1jXLYEw` standing lateral stretch → skłon boczny w staniu

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand with your feet shoulder-width apart and your knees slightly bent. | Stań w rozkroku na szerokość barków, z lekko ugiętymi kolanami. |
| 2 | Extend your arms straight out to the sides, parallel to the ground. | Wyciągnij proste ręce w bok, równolegle do podłogi. |
| 3 | Slowly lean your upper body to one side, feeling a stretch in your side and lats. | Powoli przechyl górę ciała na jedną stronę, aż poczujesz rozciąganie boku tułowia i pleców. |
| 4 | Hold the stretch for 15-30 seconds. | Utrzymaj rozciąganie przez 15–30 sekund. |
| 5 | Return to the starting position and repeat on the other side. | Wróć do pozycji wyjściowej i powtórz na drugą stronę. |
| 6 | Repeat for the desired number of repetitions. | Powtórz tyle razy, ile zakłada seria. |

### `m0tCHqc` calf stretch with hands against wall → rozciąganie łydki przy ścianie

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand facing a wall with your feet hip-width apart. | Stań przodem do ściany, ze stopami na szerokość bioder. |
| 2 | Place your hands against the wall at shoulder height. | Oprzyj dłonie o ścianę na wysokości barków. |
| 3 | Step your right foot back, keeping your heel on the ground and your leg straight. | Cofnij prawą nogę, trzymając ją prosto, z piętą na podłodze. |
| 4 | Bend your left knee and lean forward, keeping your back leg straight and your heel on the ground. | Zegnij lewe kolano i pochyl się do przodu, z prostą tylną nogą i piętą na podłodze. |
| 5 | Hold the stretch for 20-30 seconds. | Utrzymaj rozciąganie przez 20–30 sekund. |
| 6 | Switch legs and repeat the stretch. | Zmień nogi i powtórz rozciąganie. |

### `uOV3Itw` triceps stretch → rozciąganie tricepsa

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand or sit upright with your back straight. | Stań lub usiądź prosto, z wyprostowanymi plecami. |
| 2 | Extend one arm overhead, bending it at the elbow. | Unieś jedną rękę nad głowę i zegnij ją w łokciu. |
| 3 | Place your opposite hand on the bent elbow and gently pull it towards your head. | Połóż drugą dłoń na zgiętym łokciu i delikatnie przyciągnij go w stronę głowy. |
| 4 | Hold the stretch for 15-30 seconds, feeling a gentle stretch in your triceps. | Utrzymaj rozciąganie przez 15–30 sekund, czując delikatne rozciąganie tricepsa. |
| 5 | Release the stretch and repeat on the other arm. | Puść rękę i powtórz drugą ręką. |

### `xifhB5W` rear deltoid stretch → rozciąganie tylnej części barku

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand tall with your feet shoulder-width apart. | Stań prosto w rozkroku na szerokość barków. |
| 2 | Extend your right arm across your chest, placing your left hand on your right elbow. | Przełóż prawą rękę przed klatką piersiową i połóż lewą dłoń na prawym łokciu. |
| 3 | Gently pull your right arm towards your left shoulder, feeling a stretch in your right shoulder. | Delikatnie przyciągnij prawą rękę do lewego barku, aż poczujesz rozciąganie prawego barku. |
| 4 | Hold the stretch for 15-30 seconds, then release. | Utrzymaj rozciąganie przez 15–30 sekund, a potem rozluźnij. |
| 5 | Repeat on the other side. | Powtórz na drugą stronę. |

### `x2chWLO` neck side stretch → rozciąganie boku szyi

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand or sit up straight with your shoulders relaxed. | Stań lub usiądź prosto, z rozluźnionymi barkami. |
| 2 | Tilt your head to one side, bringing your ear towards your shoulder. | Przechyl głowę na bok, zbliżając ucho do barku. |
| 3 | Hold the stretch for 15-30 seconds. | Utrzymaj rozciąganie przez 15–30 sekund. |
| 4 | Repeat on the other side. | Powtórz na drugą stronę. |
| 5 | Perform 2-4 sets on each side. | Wykonaj 2–4 serie na każdą stronę. |

### `GSDioYu` upper back stretch → rozciąganie górnej części pleców

| # | English | Polish |
| --- | --- | --- |
| 1 | Stand up straight with your feet shoulder-width apart. | Stań prosto w rozkroku na szerokość barków. |
| 2 | Extend your arms straight in front of you, parallel to the ground. | Wyciągnij proste ręce przed siebie, równolegle do podłogi. |
| 3 | Interlace your fingers and rotate your palms away from your body. | Spleć palce i obróć dłonie wnętrzem od siebie. |
| 4 | Slowly raise your arms overhead, keeping them straight and parallel to each other. | Powoli unieś ręce nad głowę, trzymając je prosto i równolegle do siebie. |
| 5 | As you raise your arms, squeeze your shoulder blades together. | Unosząc ręce, ściągnij łopatki. |
| 6 | Hold the stretch for 15-30 seconds, then release and repeat. | Utrzymaj rozciąganie przez 15–30 sekund, a potem rozluźnij i powtórz. |
