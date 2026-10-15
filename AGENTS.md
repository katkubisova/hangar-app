# AGENTS.md

Adapted from hangar-web's AGENTS.md. This repo is a clickable prototype:
no tRPC, database or i18n. See CLAUDE.md for the brief and hard rules.

## Quick Commands

| Command | Description |
| ------- | ------------ |
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm test` | Run tests in watch mode |
| `pnpm check` | Run Biome check and fix |

## Development Philosophy

**"Measure twice, cut once"** — Think before implementing. Prioritize:
- **Readability**: Code should be self-explanatory
- **Safety**: Correctness over cleverness
- **Simplicity**: Avoid premature abstraction; follow existing patterns. It's a prototype: clean and minimal beats complete

## Key Conventions

- **TypeScript**: Strict mode, `import type` for type-only imports
- **Imports**: External first, then internal via `@/*` alias
- **Naming**: PascalCase components, camelCase functions, UPPER_SNAKE_CASE constants
- **React**: Server Components by default, `"use client"` when needed (anything reading the demo state is a client component)
- **Exports**: Prefer named exports (except pages, layouts, config)
- **Type Files**: `src/lib/types/`, one file per type, no single `types.ts`
- **Barrel Exports**: Do not use `index.ts` re-export files
- **Feature Structure**: Main component at root, sub-components in `components/`
- **Copy**: all user-facing text in Czech; code, comments and file names in English
- **When Uncertain**: Ask first. Flag, don't guess

## App-specific rules

- **No `position: fixed` inside the app.** The app runs inside a phone frame on desktop. Screens use `Screen` (header + own scroll area); sheets, alerts and banners render through `Overlay`, which portals into the app shell.
- **Safe areas**: use the `pt-safe` / `pb-safe` / `top-safe` utilities, never `env()` directly. Inside the desktop frame they're set to the iPhone's status bar and home indicator.
- **No `vw` units**: the viewport is the desktop window, not the phone.
- **Demo data** lives in `src/lib/data/`; demo state (scenarios, storage, context) in `src/lib/demo/`. Every localStorage access is wrapped in try/catch.
- **Prices** come only from `price-lists.ts` (verified against the live sites). Never change one without re-verifying.
- **Simulated native UI** (alerts, push, store, mail) copies the OS look and carries a `SimulatedTag`.

## Project Structure

```
src/
├── app/         # Next.js App Router: (auth), (tabs), notifications
├── components/  # ui (shadcn), brand, shell (frame, app shell, sheets…), demo
├── features/    # Screens per area (main component at root, sub-components in components/)
└── lib/         # data, demo state, types, utils
```

## Documentation

| Topic | File |
| ----- | ---- |
| Code Review | [docs/code-review.md](docs/code-review.md) |
| React Conventions | [docs/react-conventions.md](docs/react-conventions.md) |
