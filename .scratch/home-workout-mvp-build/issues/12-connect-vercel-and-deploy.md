# 12: Connect Vercel and deploy

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), section "Stack and hosting"

**What to build:** the app is live on Vercel and redeploys automatically from `main`, so every finished ticket can be tried in a real browser. HITL: connecting the account is the human's step.

**Blocked by:** [01: Scaffold the app shell with the credit footer](01-scaffold-app-shell.md)

**Status:** ready-for-human

- [x] The human imports the GitHub repo into Vercel (Vite preset, no server functions)
- [x] Pushes to `main` deploy automatically
- [x] Reloading any route on the deployment works (catch-all rewrite)
- [x] The credit footer and source link are visible on the deployment
- [x] The deployment URL is recorded in the README
