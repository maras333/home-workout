# Phone layout and PWA

Issue: [#27](https://github.com/maras333/home-workout/issues/27) (use the app on a phone: mobile layout, PWA). Builds on the [Home Workout MVP spec](../home-workout-mvp/spec.md) and the [Polish Language spec](../polish-language/spec.md).

## Problem Statement

The app was designed for a laptop browser. Most people who train at home prop up a phone instead. On a phone the screens are cramped: fixed grids and wide padding squeeze the Workout Request form, the Workout preview's buttons crowd the top, and Follow-along stacks its Timeline above the Exercise, so the clock and the GIF are small and far down while the user stands two metres away. The app also lives only in a browser tab, so there is no icon to open it from and every visit needs the network.

## Solution

Every screen works on a phone from 360 px wide, in portrait, and Follow-along in landscape too. Follow-along on a phone shows only what matters from a distance: the Exercise's GIF, its name and target, and a large clock, with big Back / Pause / Skip buttons under the thumb. The Timeline opens on demand.

The app can be installed from the browser as a PWA: it opens from the home screen without the browser's bars, works offline (the GIFs once seen), and picks up a new version the next time it opens, never mid-Workout.

## User Stories

### Every screen on a phone

1. As a user on a phone, I want every screen to fit from 360 px wide without sideways scrolling, so that I can use the app on any common phone.
2. As a user on a phone, I want the Workout Request form in its usual order with options laid out to fit (workout types in two columns, Time in four, Difficulty in one with its hints), so that I can fill it in comfortably.
3. As a user on a phone, I want Start Workout fixed at the bottom of the Workout preview, so that the main action is always under my thumb while I scroll the Exercises.
4. As a user on a phone, I want Change request, Generate another and Save at the top of the preview, so that they stay out of the way of Start Workout.
5. As a user on a phone, I want the Exercise detail dialog, the End Workout dialog and the Favourite delete dialog to fit the screen and scroll, so that nothing is cut off.
6. As a user on a phone, I want the Favourites, the "EN | PL" switch and the footer to fit, so that nothing overflows.

### Follow-along on a phone

7. As a user with my phone propped up, I want Follow-along to show the GIF, the Exercise's name and target and a large clock readable from about two metres, so that I can follow along without stepping closer.
8. As a user with my phone upright, I want the GIF above the name and the clock, so that the portrait screen is used well.
9. As a user with my phone on its side, I want the GIF beside the name and the clock, so that both are larger in landscape.
10. As a user on a phone in portrait, I want Back, Pause/Resume and Skip as large buttons in a bar fixed at the bottom, so that I can hit them quickly between Sets.
11. As a user on a phone in landscape, I want Back, Pause/Resume and Skip under the clock, so that they sit beside the GIF.
12. As a user on a phone, I want the Timeline, 🔔, 🗣 and End Workout as small buttons at the top, so that the rare actions stay apart from the frequent ones.
13. As a user on a phone, I want the Timeline hidden until I tap "Timeline" ("Przebieg"), then shown as a panel from the bottom, so that it doesn't take the space the clock needs.
14. As a user, I want the Workout to keep running while the Timeline is open, with the current Set shown live in it, so that looking at what's ahead doesn't interrupt my Workout.
15. As a user, I want to close the Timeline with a button or by tapping outside it, so that I get back to the clock quickly.
16. As a user on a phone, I want large buttons and no gestures, so that nothing triggers by accident while I exercise.
17. As a user on a laptop, I want Follow-along unchanged, with the Timeline always beside the Exercise, so that the wide layout keeps working as it does.

### Installing the app

18. As a user, I want to install the app from my browser (Chrome's install prompt, or Share → Add to Home Screen on an iPhone), so that I can open it from my home screen.
19. As a user, I want the installed app called "Home Workout", with "Workout" under its icon, so that I recognise it.
20. As a user, I want the installed app to open without the browser's bars, so that it feels like an app and Follow-along has the whole screen.
21. As a user, I want the installed app to open and work without the network, so that a weak Wi-Fi doesn't stop a Workout.
22. As a user, I want an Exercise's GIF to show offline once I've seen it, so that the Workouts I do often work anywhere.
23. As a user, I want a new version of the app to arrive the next time I open it, never by reloading during a Workout, so that an update never interrupts me.

## Implementation Decisions

- **Two efforts in one spec.** The phone layout comes first, screen by screen; the PWA comes last and needs no layout work to start.
- **Widths and orientation:**
  - The narrowest supported width is 360 CSS px; the layout must also hold at 375 px (iPhone SE) and in landscape phones (about 640–930 × 360–430).
  - Follow-along chooses its phone layout from the viewport (narrow, or short and wide for landscape), not from the device type; the laptop layout is unchanged from the current `lg` breakpoint up.
- **Follow-along on a phone:**
  - Portrait: top row of small buttons (Timeline, 🔔, 🗣, End Workout); then the GIF, the Block and Round line, the name, the target, the side badge and the clock, sized to fill the screen; a bottom bar fixed to the screen with Back, Pause/Resume and Skip, each at least 44 px tall.
  - Landscape: the GIF on the left; the name, target, clock and the three controls on the right.
  - The keys (Space, N, B) keep working.
  - The Timeline is a panel sliding up from the bottom (a dialog), opened by a "Timeline" / "Przebieg" button and closed by a button or the backdrop. It does not pause the Workout, unlike End Workout. It shows the same content as the laptop Timeline, scrolled to the current Set.
  - The screen Wake Lock stays as it is.
  - Follow-along takes the whole screen, covering the page's header and footer, so the "EN | PL" switch is hidden during a Workout on a phone; the Language is chosen before starting.
- **Workout preview on a phone:** Start Workout is a full-width button fixed to the bottom of the screen; the list leaves room for it. Change request, Generate another and Save stay at the top and wrap.
- **Workout Request form on a phone:** same order; workout types in two columns, Time in four, Difficulty in one; less padding. Nothing is fixed to the screen.
- **Dialogs** fit the screen with a margin and scroll inside.
- **Installed app (PWA):**
  - Built with `vite-plugin-pwa`: it generates the web app manifest and a Workbox service worker.
  - Manifest: name "Home Workout", short name "Workout", `display: standalone`, no locked orientation, theme and background colours from the app's palette, and icons in the sizes Android and iOS need (including a maskable icon and an Apple touch icon). The icon is a simple mark drawn for this (a dumbbell on the app's colour), replaceable later.
  - The manifest has one name in every Language.
  - Offline: the app shell (HTML, scripts, styles, fonts and the Exercise data) is precached; the GIFs are cached at runtime the first time they are shown, cache-first.
  - Updates: a new service worker waits and takes over the next time the app is opened; nothing reloads the page while it is open, and there is no "new version" prompt.
  - No install button of our own: installing is left to the browser.
  - The SPA rewrite on Vercel stays; the service worker must not be served stale (no long cache on it).

## Testing Decisions

- **What a good test is:** as before, behaviour a user can see, through the whole app (React Testing Library, the existing fakes). Layout is not testable in jsdom, which computes no layout.
- **Seam 1: the whole app** gains tests for the Timeline on a phone: the "Timeline" / "Przebieg" button opens and closes it, the Workout keeps counting down while it is open, and the current Set is marked in it. The phone layout is chosen through the viewport, which a test sets with a matchMedia fake.
- **Seam 2: the build.** A check that the production build emits the manifest with the agreed name, short name, display and icons, and a service worker that precaches the app shell and the Exercise data.
- **Manual checklist** (part of the last ticket): every screen at 360 × 640 portrait; Follow-along in landscape on a phone; an iPhone (Safari) and an Android phone (Chrome): install, open from the home screen, airplane mode with a Workout whose GIFs were seen, and an update arriving on the next open.
- **Not tested here:** the layout itself in a real browser; that belongs to the end-to-end tests ([#33](https://github.com/maras333/home-workout/issues/33)).
- **Prior art:** the Follow-along app tests (fake timers, speech and audio fakes) and the Polish suites.

## Out of Scope

- A native app or an app-store listing.
- An install button or banner of our own.
- Precaching every GIF for offline use before it has been seen.
- Gestures (swipe, tap anywhere) in Follow-along.
- Locking the screen orientation or a full-screen button.
- Widths below 360 px and tablets beyond what the current layouts already do.
- Push notifications and background sync.
- Automated layout tests in a real browser ([#33](https://github.com/maras333/home-workout/issues/33)).

## Further Notes

- The grilling for this spec added **Timeline** to `GLOSSARY.md` ("Przebieg" in Polish); "plan" stays an avoided word, since the glossary already avoids it for a Workout.
- Follow-along's speech and sound settings are unchanged; on a phone the 🗣 hint for a missing Polish voice must still fit next to the toggles.
- Once this ships, #27 closes.
