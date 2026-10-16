# HANGAR app: clickable prototype

## What this is

A **clickable, mobile-only web prototype** of the HANGARGYMS mobile app, built to present to the client (Hangar, "Climbing playground by Adam Ondra"; bouldering/climbing gyms in Brno and Ostrava, with Praha, Plzeň and Olomouc planned).

The real app will be native iOS + Android (backend: Hasam + Blackfish middleware + Firebase). **This prototype is none of that.** It is a web app that looks and behaves like a native app, so the client can tap through the launch scope on their own phone.

- **Agency:** Blackfish · **PM:** Kateřina Kubisová
- **Type:** Branded mid-fidelity prototype. Hardcoded data, no backend
- **UI language:** Czech (all user-facing copy). Code, comments, file names: English
- **Sister project:** website prototype in `../hangar-web` (GitHub `katkubisova/hangar-web`). Brand already applied and approved there. **Copy** its tokens, UI components and data into this repo as the starting point; never import from it at runtime.
- **Brand source of truth:** `HANGAR_Brand_Guidelines_2026.pdf` (this folder, git-ignored) + assets in `public/brand/`.
- **Source of truth for scope:** Figma board "HANGARGYMS・app": screen flow (node 0-1) and architecture (node 2-623). This file contains the in-scope summary of both.

---

## Hard rules

1. **Mobile only. Never render a desktop/website layout.**
   - Viewport < 640px: the app fills the screen edge to edge.
   - Viewport ≥ 640px: render the app inside a centred **phone frame (390 × 844)** on a branded background. Next to the frame, show a QR code of the current URL with the line "Otevřete na telefonu" and the **demo panel** (see below). Nothing stretches beyond 430px wide, ever.
   - The app content must work identically inside the frame and full-screen. This means: **no `position: fixed` inside the app.** Fixed would escape the frame on desktop. Use an app-shell container (`relative`, `h-full`, own scroll area) with header and tab bar positioned inside it.
2. **Flag, don't guess.** If the scope below doesn't answer something (a rule, a price, a label), stop and ask. Don't invent business logic. Visual filler (fake user name, fake history) is fine.
3. **In scope only.** Do not build, tease or link anything from the "Out of scope" list, not even as "coming soon" tiles, unless explicitly asked.
4. **No backend.** No API calls, auth providers, databases or analytics. All data lives in `lib/data/`. Payments, emails, push, permissions and app-store redirects are **simulated**.
5. **shadcn/ui for UI primitives, Tailwind for styling.** No CSS modules, no inline styles, no extra UI libraries without asking.
6. **Prototype, not production.** Keep it clean and minimal. No tRPC, database, i18n framework, or state libraries beyond React context. A few tests for the demo-state logic are fine; nothing more.
7. **One branch and one PR per build step.** Nothing is committed until Kateřina has reviewed it (same as hangar-web).

---

## Stack

Same setup as `hangar-web`, minus everything server-side:

| | Notes |
|---|---|
| Next.js 16 (App Router), TypeScript strict, `src/` folder | Same version as hangar-web. Next 16 differs from most tutorials. Check the docs for the installed version |
| pnpm, Biome | Same scripts as hangar-web (`pnpm dev`, `pnpm build`, `pnpm check`) |
| Tailwind CSS 4 | CSS-first config in `src/app/globals.css`. Copy the brand tokens from hangar-web's `globals.css` |
| shadcn/ui | `base-nova` style, `@base-ui/react` primitives, **not Radix**. Copy the already-restyled components from hangar-web's `src/components/ui/` and `src/components/brand/` |
| TDesign icons | Via an `icons` wrapper like hangar-web's `@/components/ui/icons`. **Not lucide** (brand rule) |
| react-leaflet + OpenStreetMap tiles | Gym map. No API key needed |
| qrcode.react | Check-in QR + "open on phone" QR |
| Vercel | Deploy target. The client gets a URL |

**Not carried over from hangar-web:** tRPC, Drizzle/Postgres, next-intl, framer-motion (CSS transitions are enough). Ask before adding any other dependency.

**Code conventions:** follow hangar-web's `AGENTS.md`. Copy it into this repo and drop the tRPC/DB parts. Key points: `src/lib/types/` one file per type, no `index.ts` barrel files, named exports, Server Components by default.

---

## Mobile-web behaviour (make it feel native)

- `viewport`: `width=device-width, initial-scale=1, viewport-fit=cover`. Respect safe areas (`env(safe-area-inset-*)`) for the header, tab bar and bottom sheets.
- Use `100dvh`, not `100vh`. `overscroll-behavior: none` on the body, so the page doesn't bounce or pull-to-refresh outside the app shell.
- **Inputs at 16px minimum**, so iOS doesn't zoom on focus. Don't disable pinch-zoom.
- **PWA:** `manifest.webmanifest` (`display: standalone`, theme colour, icons) + `apple-mobile-web-app-capable`. Added to the home screen, it opens without browser chrome. This is the recommended way to demo.
- Native patterns: bottom tab bar, large titles, back chevron in header, bottom sheets for actions/filters, segmented controls, toggles, swipe-friendly lists, pressed states (`active:` styles), `-webkit-tap-highlight-color: transparent`.
- **Simulated native UI.** iOS-style system alerts for permission pop-ups and confirmations, a share-sheet mock, and a "mail app" mock screen for email links. Label simulated screens subtly (e.g. small "Simulace" tag) so the client doesn't think we're building them.
- Light screen transitions only (slide on push, fade on tab switch). No heavy animation.

---

## Brand (approved, don't re-litigate)

Source: `HANGAR_Brand_Guidelines_2026.pdf` and hangar-web's implementation (its `/styleguide` page shows every token and component). The app must look like the same brand as the website.

- **Colours:** Alabaster `#FAFAFA` and Cod Gray `#0D0D0D` carry surfaces and text. Electric Violet `#6034FF`, Trinidad `#F25D0D` and Orient `#006B8F` are **signal accents only**, never large fills. Saturated gradients only for campaign moments; soft gradients for everyday UI. One accent system for all branches, no colour per branch.
- **Type:** Geist for everything (headings included). N27 is the brand heading font, but there's no web licence yet. Headings: −4% letter spacing, 120% line height; body: −2%, 140%. Page/section titles in capitals.
- **Shape:** square corners (decided for the website). Native patterns like bottom sheets and tab bars also use square corners. If something genuinely needs rounding to read as native (e.g. the phone frame itself), flag it.
- **Never** underline, outline or gradient text, or add text shadows. On photos, fix contrast with a dark overlay or put text on black.
- **Icons:** TDesign line icons. Sharp corners, no fills.
- **Logo:** `public/brand/logo/` (full, short, HNG, heart). Respect the safe zone (50% of the "H" height) and minimum widths (primary 120px, secondary 100px, HNG 60px). Don't recolour, rotate, stretch or add gradients. Good use of HNG: app icon, splash, PWA icon.
- **Wall profiles** (`public/brand/profiles/`): brand graphics, usable as decoration (e.g. onboarding, empty states).
- **Rockets** (`public/brand/rockets/`) is the kids' climbing team sub-brand. Use only where the Rockets team itself is mentioned. Not for kid accounts.
- **Photos:** `public/photos/` (stand-ins from the live sites, same as the website). Use them for home, gym detail and product imagery.
- **Errors:** black text with a Trinidad marker (website decision).
- The brand PDF is 18.8 MB: **add it to `.gitignore`**, like in hangar-web.

---

## Data (`lib/data/`)

Real where we have it, realistic fake where we don't.

Copy from hangar-web's `src/lib/data/` and `src/lib/types/`, then keep only the Czech (`cs`) side of localized fields:
- `gyms.ts`: addresses, opening hours, contacts, links
- `price-lists.ts`: verified cell for cell against the live sites. **Don't change any price.**
- ~~`benefit-cards.ts`~~: not copied. In hangar-web it holds job-ad perks, not MultiSport/ISIC. The Slevy copy lives in `discount-card-info.ts` (from the price-list notes).
- `faq-items.ts`: FAQ in Settings

- **Gyms:** Brno and Ostrava are live. Praha, Plzeň and Olomouc are shown as "Připravujeme" (on the map list, not tappable into a detail). Add coordinates if hangar-web doesn't have them.
- **Products:** built from `price-lists.ts`. Map them to the app's two product types:
  - **Členství** (memberships): recurring, can be cancelled
  - **Balíčky** (packages): e.g. multi-entry cards, one-off payment
  Anything that doesn't fit cleanly → flag it.
- **Demo user:** fake Czech name, entry history, two saved cards, one active membership, one expired package, one kid account, purchase history over ~6 months.
- **Notifications:** 6–8 realistic items (purchase confirmed, membership ending soon, payment failed, gym news, recommended update), each deep-linking to a screen.

### Demo state

Single React context, persisted to `localStorage` (wrapped in try/catch; app must work without it). Purchases, cancellations, edits, added cards and kids, and login state actually change the UI.

**Demo panel:** on desktop next to the frame; on mobile via Profil → Nastavení → "Demo" (bottom of the list). It lets the presenter:
- Jump to a user scenario: **Nový uživatel** (logged out) · **Aktivní členství** · **Bez členství** · **Expirované členství**
- Trigger system states: maintenance mode, forced update, recommended update, feedback prompt, blocked user, payment error on next checkout
- Reset all demo data

---

## Navigation

**Bottom tab bar (5):** Domů · Produkty · **Vstup (QR, centre, emphasised)** · Mapa · Profil
Notifications: bell icon with badge in the Domů header.
**Location switcher:** gym selector in the Domů header. Selected gym filters home content and products, and persists.

---

## In-scope screens (launch / Fáze 1)

Based on the Figma screen flow; only in-scope branches. "Hasam" / "middleware" notes from the flow are irrelevant here (all simulated).

### 1. Auth and account
- Splash → Welcome (sign in / sign up)
- Sign in (email + password, inline validation, any credentials pass)
- Sign up → Profile setup → App onboarding (2–3 swipeable intro slides) → Home
- Forgot password → Reset confirmation → "Go to mail app" (simulated mail with link) → Password reset → back to Welcome
- Sign out (double confirmation → Welcome)
- Delete account (double confirmation → Welcome)

### 2. Domů (Home)
- Greeting, gym switcher, membership status card with quick link to QR, entries this month, opening hours today for selected gym, recommended products for selected gym.
- **Blocked user** state: home replaced by explanation + "Kontaktovat podporu".

### 3. Vstup (QR / membership)
- Large check-in QR (bright, high contrast), member name, active product and validity.
- Membership info (type, valid until, remaining entries for packages).
- Troubleshooting: info + gym contacts ("QR nefunguje?").
- No valid product → empty state with CTA to Produkty.

### 4. Profil
- Account detail: view + edit
- Statistics: number of entries (total, per month, per gym). Keep it simple; missions come later
- My memberships/packages → links to Moje produkty
- Purchase history (list + detail)
- Payment cards: list, view, edit/delete, add new card
- Discounts and agreements: MultiSport (add/validate card, simulated), ISIC (add/validate, simulated), kid accounts (list, view, edit, add kid), waivers and agreements. **Kid accounts depend on Hasam support.** Build them, but keep them visually separate so they're easy to remove.
- Settings: notification preferences (toggle per type), privacy policy, terms of service, FAQ (all "open in browser"; simulated), contact support (simulated mail), rate the app (simulated store), sign out, delete account

### 5. Produkty (purchase)
- Segmented: **Koupit** / **Moje produkty**
- Koupit: memberships list → detail → payment → confirmation / error (repeat payment); packages list → detail → payment → confirmation / error
- Moje produkty: Active / Expired tabs → product detail → purchase again; cancel recurring payment (memberships only) → confirmation of cancellation
- Payment: choose saved card or add new. Discount (MultiSport/ISIC) shown if applicable. **Apple Pay / Google Pay: open question, don't show until confirmed.**

### 6. Mapa (gym map)
- Map with pins + list view toggle, sort/filter (distance, city, open now), gym detail (photos, address, hours, contacts, navigate → simulated maps app, products available here)

### 7. Notifikace
- In-app notification list (read/unread), each deep-links to its screen
- Simulated push banner (triggered from the demo panel) sliding in from the top

### 8. System / non-functional
- Maintenance mode (full-screen block)
- Forced update (full-screen, only "Aktualizovat" → simulated store) / Recommended update (dismissible)
- Feedback prompt: "Líbí se vám aplikace?" → positive → store rating (simulated) / negative → feedback form
- Permissions: in-app pre-prompt → simulated native pop-up, for **push** (after onboarding) and **location** (first time on Mapa). Choices saved; Mapa works without location (no distance sort).

---

## Out of scope (Fáze X): do not build

Schedule/events/RSVP · Missions/challenges/milestones · Leaderboards · Social (profiles, follow) · Hangouts · Messages · VOD · E-shop · Climbing journal. Also not in this prototype: gift memberships, referrals, trainer marketplace, ads.

---

## Suggested folder structure

```
src/
  app/
    (auth)/        welcome, sign-in, sign-up, forgot-password, reset-password, onboarding
    (tabs)/        home, products, qr, map, profile (+ nested routes)
    notifications/
    layout.tsx     → DeviceFrame + AppShell + DemoProvider
  components/
    ui/            shadcn (copied + restyled from hangar-web)
    brand/         Logo, WallProfile, etc. (copied from hangar-web)
    shell/         DeviceFrame, AppShell, TabBar, Header, BottomSheet, SystemAlert, PushBanner
    demo/          DemoPanel
  features/        home, qr, profile, products, map, notifications, system
  lib/
    data/          gyms, price-lists, faq-items, products, product-families, demo-user, notifications
    demo/          context, scenarios, storage
    types/         one file per type
```

## Build order

1. Setup + shell (copy brand foundation from hangar-web; frame, tab bar, safe areas, PWA, demo context and panel)
2. Auth and onboarding
3. Domů + Vstup (QR)
4. Produkty + payment
5. Profil + settings + discounts
6. Mapa
7. Notifikace + system states
8. Polish pass on a real phone (iOS Safari + Android Chrome) → deploy

After each step: run it, check at 375px and 430px widths and inside the desktop frame, then stop for review.
