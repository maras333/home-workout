// Writes the side-by-side review of the Polish Exercise text for the maintainer:
// English and Polish name and steps for every curated Exercise, in curation order.
//
//   node scripts/polish-review.ts
//
// Rerun it after changing src/library/polish.ts; edit the notes at the top here.

import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { curation } from '../src/library/curation.ts'
import { polish } from '../src/library/polish.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const recordsFile = path.join(root, 'src/library/exercisedb/exercises.json')
const reviewFile = path.join(root, '.scratch/polish-language/exercise-review.md')

type ExerciseRecord = { exerciseId: string; name: string; instructions: string[] }

const notes = `# Polish review: every Exercise (#41)

Draft by an agent on branch \`issue-41-exercise-polish\`; the Polish text lives in \`src/library/polish.ts\`. Please correct it there, then rerun \`node scripts/polish-review.ts\` to regenerate this file and \`npm test\` to recheck that every Exercise has a Polish name and as many Polish steps as English ones.

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

1. **Loanword names:** \`iny3m5y\` dead bug (or "martwy robak"), \`XVDdcoj\` russian twist (or "rosyjski skręt"), \`yWxMvB5\` thruster z kettlebellem, \`yn8yg1r\`/\`ZA8b5hc\` przysiad goblet (or "przysiad kielichowy"), \`xdYPUtE\` przysiad sissy.
2. **Coined names with no settled Polish term:** \`XPUDTt7\` pompka z odwróconego V do kobry (pike-to-cobra), \`hCjGsRQ\` deska góra–dół (power point plank), \`8ARQ9Hw\` przyciąganie kettlebella do brody w rozkroku sumo (sumo high pull), \`FS63wTN\` wyciskanie hantli z podbiciem nóg (push press), \`O95afRA\` chód boczny z gumą (monster walk), \`gUjqdei\` przysiad skrzyżny (curtsey squat), \`2Dk4xQV\` żaba z kołysaniem (rocking frog), \`pZwUsKB\` żelazny krzyż (iron cross).
3. **Names that describe the steps, not the English name:** \`6YUfHPL\` quads → przysiad do równoległej; \`ealLwvX\` high knee against wall → skip A przy ścianie; \`PrQbjvB\` push to run → pompka ze wspinaczką; \`tnaj0mT\` swing 360 → wymachy rąk ze skrętem tułowia; \`f38OEuO\` kneeling lat stretch → rozciąganie boku pleców w klęku.
4. **\`mr7pkqP\` jack burpee → burpee z pajacykiem:** the English steps have no jumping jack, so the Polish steps don't either; the name follows the English name.
5. **\`DFGXwZr\` world greatest stretch → najlepsze rozciąganie świata** and **\`01qpYSe\` upward facing dog → pies z głową w górę** (the yoga name), literal but in use.
6. **\`wbUYILZ\` elbow lift - reverse push-up → unoszenie na łokciach – odwrócona pompka:** a literal translation of an unclear English name.
7. **Dips:** \`RrLske5\` bench dip (knees bent) → pompka w podporze tyłem z ugiętymi kolanami, \`7aVz15j\` triceps dips floor → pompka w podporze tyłem na tricepsy (Polish trainers also say "dipy").
8. **\`dK9394r\` burpee step 3** changed from the sample's "do pozycji jak do pompki" to "do podporu przodem", to match the push-up position term everywhere else.
`

function cell(text: string): string {
  return text.replaceAll('|', '\\|')
}

async function main() {
  const records = JSON.parse(await readFile(recordsFile, 'utf8')) as ExerciseRecord[]
  const byId = new Map(records.map((record) => [record.exerciseId, record]))
  const ids = Object.keys(curation)

  const sections = ids.map((id) => {
    const record = byId.get(id)
    if (!record) throw new Error(`No dataset record for ${id}`)
    const english = record.instructions.map((step) => step.replace(/^Step:\d+\s+/, ''))
    const text = polish[id]
    const steps = Array.from(
      { length: Math.max(english.length, text?.steps.length ?? 0) },
      (_, i) => [i + 1, cell(english[i] ?? '—'), cell(text?.steps[i] ?? '—')].join(' | '),
    )
    return [
      `### \`${id}\` ${record.name} → ${text?.name ?? '(no Polish text)'}`,
      '',
      '| # | English | Polish |',
      '| --- | --- | --- |',
      ...steps.map((row) => `| ${row} |`),
    ].join('\n')
  })

  const translated = ids.filter((id) => polish[id]).length
  const body = [
    notes,
    `## Exercises\n\n${translated} of ${ids.length} curated Exercises have Polish text, in the order of \`src/library/curation.ts\`.`,
    ...sections,
  ].join('\n\n')
  await writeFile(reviewFile, body + '\n')
  console.log(`Wrote ${path.relative(root, reviewFile)} (${translated}/${ids.length} translated)`)
}

await main()
