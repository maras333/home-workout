# Design refresh

Make the app friendlier to look at and easier to tap mid-workout, while keeping its minimal character.

## Scope

Visual layer only: colour tokens, theme, buttons, spacing. Screens and flows stay as they are. UX changes (layout of the form, Follow-along screen) are out of scope.

## Decisions

### Colour

- **One accent colour**, from the lime family. Everything else stays neutral grey. See [ADR 0001](../../docs/adr/0001-one-accent-colour-and-system-dark-mode.md).
- The accent is used sparingly: primary actions, Follow-along progress, selected options.
- Text on the accent is near-black in both themes (white on lime fails contrast). In the light theme the accent is slightly deeper so it does not glare on white.
- No semantic colours for Difficulty or Blocks. Colouring them is a separate, later topic.
- Shade: **lime (prototype variant A)**: `oklch(0.841 0.238 128.85)` (`#a3e635`) in dark, a deeper `oklch(0.8 0.22 130)` in light. Neon yellow-green and mint were rejected. Prototype kept on branch `prototype/design-refresh`.

### Dark mode

- Follows the system by default; a manual override cycles **System → Light → Dark**, remembered in `localStorage`.
- Control: a single icon button next to the "EN | PL" switch (monitor / sun / moon), state announced via `aria-label`.
- Dark palette: shadcn's neutral dark (`oklch(0.145 0 0)` / `#171717`), matching the current PWA `theme-color`.
- Follow-along uses the same theme as the rest of the app (no forced dark "workout mode").
- Exercise pictures (GIFs and Key poses) stay on their light rounded tiles; in dark mode the tile is toned down slightly (white → ~`#f5f5f5`).
- `<meta name="theme-color">` follows the active theme (white / `#171717`). The manifest's splash `background_color` stays dark (it is static).

### Buttons

- Primary actions (generate, start, next/pause in Follow-along): **48px pill** (`rounded-full`) in the accent colour.
- Secondary actions: at least **40px**, outline or ghost.

## Delivery

1. Throwaway prototype on the real app (dev builds only, `src/prototype/`): a floating switcher re-themes every screen with the three accent candidates (`?variant=A|B|C`), light and dark (`?theme=`). Found while building it: `text-primary` links become unreadable with a light accent, so links stay in the text colour.
2. Pick a shade; record it here.
3. Implement colour tokens and new buttons (visible in light theme).
4. Implement dark mode: theme switch, `.dark` class, `theme-color`.
5. Delete the prototype route.
