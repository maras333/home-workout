# Issue tracker: GitHub Issues

Issues for this repo live in GitHub Issues on `maras333/home-workout`; use the `gh` CLI. The repo is public, so everything written there is public.

Specs stay as markdown in the repo: `.scratch/<feature-slug>/spec.md`. The `.scratch/*/issues/` files are the archive of the MVP's tickets, each migrated to an issue (decisions #1–#10, build tickets #11–#22) and pointing at it. Write new tickets as issues.

## Conventions

- One issue per ticket, never a single combined tickets issue.
- Title: what to build or decide, in the domain words of `GLOSSARY.md`.
- Body: a link to the spec section it implements, `**Blocked by:** #N, #N` (or `None`), then the acceptance criteria as a checklist.
- One type label: `mvp-build` (implementation) or `decision` (a planning question). Add a new type label when a new effort needs one.
- Triage state is a label from `triage-labels.md`.
- Conversation goes in issue comments.

## Closing a ticket

When a ticket's work is committed:

1. Tick every checklist item the work satisfies. If one stays open, say why in a comment.
2. Comment with the commits, the choices made, and anything later tickets need to know.
3. Close it as completed: `gh issue close <N> --reason completed` (or `--reason "not planned"` with the `wontfix` label).

A ticket is open while its issue is open.

## When a skill says "publish to the issue tracker"

Create an issue: `gh issue create --title … --body-file … --label …`.

## When a skill says "fetch the relevant ticket"

`gh issue view <N> --comments`. The user will normally pass the issue number or URL.

## Wayfinding operations

Used by `/wayfinder`. The **map** is one issue with one **child** issue per question.

- **Map**: an issue labelled `map` holding the Notes / Decisions-so-far / Fog body.
- **Child ticket**: an issue labelled `decision` with the question in the body and `Map: #N` on its first line. A `Type:` line records the ticket type (`research`/`prototype`/`grilling`/`task`).
- **Blocking**: a `Blocked by: #N, #N` line near the top. A child is unblocked when every issue it lists is closed.
- **Frontier**: open children of the map that are unblocked and unassigned; lowest number wins.
- **Claim**: assign yourself (`gh issue edit <N> --add-assignee @me`) before any work.
- **Resolve**: comment the answer under an `## Answer` heading, close the issue, then add a context pointer (gist + `#N`) to the map's Decisions-so-far.
