# Alexander Nachtmann — Portfolio

My personal portfolio: a calm black-and-white design system carrying a signature WebGL flow
shader, a morphing illustrated portrait, physics-driven tech-stack chips, and a Claude-powered
assistant that answers questions about my work — all server-rendered with Angular SSR.

**[· Live → ancplua.up.railway.app ·](https://ancplua.up.railway.app)**

[![Angular 22](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Angular SSR](https://img.shields.io/badge/SSR-Angular%20%2B%20Express-000000?logo=express&logoColor=white)](https://angular.dev/guide/ssr)
[![Renovate](https://img.shields.io/badge/Renovate-auto--merge-1A1F6C?logo=renovatebot&logoColor=white)](.github/renovate.json)

## Built with

- **Angular 22** — standalone components, signals, zoneless-friendly `OnPush`
- **Angular SSR** (`@angular/ssr` + Express) — server-side rendering with prerendered routes
- **TypeScript** — strict mode
- **Tailwind CSS v4** — token-driven theming
- **OGL** — the WebGL flow shader and morphing portrait
- **Lenis** — smooth scrolling
- **Matter.js** — the draggable physics tech-stack
- **@anthropic-ai/sdk** — the assistant (Claude), streamed over SSE from the server
- **@lucide/angular** — icons

## Features

- Server-side rendering with three prerendered routes (`/`, `/projects`, `/about`)
- Claude assistant on the home page — streamed token-by-token, grounded strictly in my CV,
  with the API key kept server-side and prompt-injection guards in the system prompt
- Light/dark mode with a circular view-transition reveal (and a no-flash pre-paint script)
- WebGL flow-shader backdrop and a neutral ↔ wave morphing portrait
- A drag-around physics tech-stack (Matter.js), lazy-loaded so it never blocks first paint
- Certifications badge strip, one-click copy-email contact card
- Accessibility-first: skip link, focus rings, ARIA live regions, `prefers-reduced-motion`
  guards on every animation
- SEO and Open Graph ready

## Architecture

Feature-first, standalone-only. Components own their template and styles; the data layer is a
single typed source of truth; the assistant's only server dependency (the API key) never reaches
the browser.

```text
src/
  app/
    components/
      about/        # experience, education, skills, certifications, Matter.js stack
      assistant/    # Claude assistant UI (signals + SSE streaming)
      contact/      # copy-email button and card
      hero/         # hero and morphing portrait
      layout/       # nav and page backdrop
      projects/     # projects grid
      shaders/      # reusable OGL flow shader
      ui/           # shared call-to-action row
    pages/          # Home, Projects, About — one component per route
    services/       # theme (view-transition) and Lenis smooth-scroll
    portfolio-data.ts   # projects, experience, education, skills, stack, certifications
    profile.ts          # owner identity + the assistant's grounding context
  server.ts         # Express SSR entry + the /api/chat streaming endpoint
  styles.css        # Tailwind import, design tokens, global animations
public/             # portrait, certification badges, icons, manifest
```

## Local development

```bash
npm install
npm start          # dev server at http://localhost:4200
```

The assistant calls the Anthropic API, so it needs an `ANTHROPIC_API_KEY` at runtime. To wire
the key in from the macOS keychain during local development:

```bash
npm run dev        # ng serve with ANTHROPIC_API_KEY pulled from the keychain
```

Without a key the rest of the site runs normally and `/api/chat` returns a friendly 503.

## Scripts

| Command                       | Description                                    |
| ----------------------------- | ---------------------------------------------- |
| `npm start`                   | Dev server                                     |
| `npm run dev`                 | Dev server with `ANTHROPIC_API_KEY` (keychain) |
| `npm run build`               | Production build (browser + SSR server)        |
| `npm test`                    | Unit tests (`ng test`, Vitest under the hood)  |
| `npm run watch`               | Build in watch mode                            |
| `npm run serve:ssr:portfolio` | Run the built SSR server                       |

## Deployment

Server-rendered on [Railway](https://railway.app) (`railway.json`, Dockerfile builder): `npm run build`,
then `node dist/portfolio/server/server.mjs`. Railway gates each deploy on a successful build, so
a bad dependency bump can never replace the live site. Set `ANTHROPIC_API_KEY` in the environment
to power the assistant.

## Maintenance

Dependencies are kept current by [Renovate](.github/renovate.json), extending my shared
[`ANcpLua/renovate-config`](https://github.com/ANcpLua/renovate-config) baseline. Safe updates
(patches, dev-dependency minors, digests, lockfile maintenance) auto-merge; runtime majors and
minors wait on the dependency dashboard for a manual look.

## Customization

- Content lives in `src/app/portfolio-data.ts`; identity and the assistant's grounding in
  `src/app/profile.ts`.
- Hero copy is in `src/app/components/hero/hero.component.ts`; the about prose in
  `src/app/pages/about-page.component.ts`.
- Replace `public/alexander.webp` / `public/alexander_wave.webp` with same-ratio portraits.

## License

[MIT](LICENSE)
