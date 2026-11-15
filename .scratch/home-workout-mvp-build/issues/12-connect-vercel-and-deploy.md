# 12: Connect Vercel and deploy

> Archived: this ticket now lives in GitHub issue [#22](https://github.com/maras333/home-workout/issues/22).

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), section "Stack and hosting"

**What to build:** the app is live on Vercel and redeploys automatically from `main`, so every finished ticket can be tried in a real browser. HITL: connecting the account is the human's step.

**Blocked by:** [01: Scaffold the app shell with the credit footer](01-scaffold-app-shell.md)

**Status:** done

- [x] The human imports the GitHub repo into Vercel (Vite preset, no server functions)
- [x] Pushes to `main` deploy automatically
- [x] Reloading any route on the deployment works (catch-all rewrite)
- [x] The credit footer and source link are visible on the deployment
- [x] The deployment URL is recorded in the README

## Comments

Done by the human: live at https://home-workout-mauve.vercel.app, deployed automatically from `main` (URL in the README). GitHub Actions CI (`npm run check`) runs alongside it since `b7f1c4c`.
