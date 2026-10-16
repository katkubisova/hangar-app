# HANGAR app: clickable prototype

Mobile-only web prototype of the HANGARGYMS app, for presenting the launch scope to the client. Hardcoded data, no backend: payments, e-mails, push, permissions, maps and app stores are simulated (marked "Simulace").

- Brief and rules: `CLAUDE.md` · Code conventions: `AGENTS.md`
- Live: https://hangar-app-xi.vercel.app (every PR gets its own preview)

```
pnpm install
pnpm dev        # http://localhost:3000
pnpm check      # Biome
pnpm test:run   # demo-state logic
pnpm build
```

## How to demo

**On a phone (recommended):** open the link, then Share → "Přidat na plochu". It opens full-screen like an installed app. On a desktop the app sits in a phone frame, with a QR code to open it on a phone and the demo panel beside it.

**Demo panel** (desktop: next to the frame; phone: Profil → Nastavení → Demo):

| Scenario | What you see |
|---|---|
| Nový uživatel | Logged out: Welcome, sign up, onboarding |
| Aktivní členství | Tereza with a 12-month membership in Brno, history, cards, a kid account |
| Bez členství | Logged in, nothing bought: the buying flow |
| Expirované členství | A membership that ran out 12 days ago: renewing |

System switches: maintenance, forced update, recommended update, feedback prompt, blocked user, payment error on the next checkout. "Poslat push notifikaci" shows a push banner. "Resetovat demo data" starts over.

Demo data lives in the browser (localStorage), so each phone has its own copy. Any e-mail and password sign in.

## Not in this prototype

Real accounts, payments or check-in; Apple Pay / Google Pay (open question); schedule, missions, social, e-shop and the rest of "Fáze X" (see `CLAUDE.md`).
