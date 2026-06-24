# Alexander Nachtmann — Portfolio

My personal portfolio, built around a signature WebGL flow shader, a morphing illustrated
portrait, Lenis smooth scroll, a physics-driven tech stack, and an Anthropic-powered AI
assistant — on a calm black-and-white design system, server-rendered with Angular SSR.

## Built With

- **Angular 21** — standalone components, signals, zoneless-friendly OnPush
- **Angular SSR** (`@angular/ssr` + Express) — server-side rendering and prerendering
- **TypeScript** — strict mode
- **Tailwind CSS v4** — token-driven theming
- **OGL** — WebGL flow shader and morphing portrait
- **Lenis** — smooth scrolling
- **Matter.js** — physics-driven stack chips
- **@anthropic-ai/sdk** — the AI assistant (Claude)
- **@lucide/angular** — icons

## Features

- Server-side rendering with prerendered routes
- AI assistant (Claude) on the home page
- Light and dark mode with a view-transition reveal
- WebGL flow shader backdrop
- Morphing illustrated portrait (neutral ↔ wave)
- Smooth scroll with Lenis
- Physics-driven tech-stack chips you can drag around
- Certifications badge strip on the about page
- One-click copy-email contact card
- Fully responsive
- Accessibility: skip link, focus rings, ARIA, reduced-motion guards
- SEO and Open Graph ready

## Sections

- **Home** (`/`) — hero with shader + morphing portrait, AI assistant, contact card
- **Projects** (`/projects`) — projects grid with hover lift and image zoom
- **About** (`/about`) — bio, certifications badge strip, experience timeline, education, skills, physics-driven stack

## Getting Started

```bash
npm install
npm start          # dev server at http://localhost:4200
```

The AI assistant calls the Anthropic API, so it needs an `ANTHROPIC_API_KEY` at runtime.
For local development with the key wired in:

```bash
npm run dev        # ng serve with ANTHROPIC_API_KEY pulled from the macOS keychain
```

## Scripts

| Command                       | Description                                   |
| ----------------------------- | --------------------------------------------- |
| `npm start`                   | Dev server                                    |
| `npm run dev`                 | Dev server with `ANTHROPIC_API_KEY` (keychain) |
| `npm run build`               | Production build (browser + SSR server)       |
| `npm run watch`               | Build in watch mode                           |
| `npm test`                    | Unit tests                                    |
| `npm run serve:ssr:portfolio` | Run the built SSR server                      |

## Project Structure

```text
src/
  app/
    components/
      about/        # bio sections, certifications strip, skills, Matter.js stack, shared entry/chip
      assistant/    # Anthropic-powered AI assistant
      contact/      # contact button and card
      hero/         # hero and morphing portrait
      layout/       # nav and page backdrop
      projects/     # projects grid
      shaders/      # reusable OGL flow shader
      ui/           # shared call-to-action row
    pages/          # Home, Projects, and About routes
    services/       # theme and smooth-scroll services
    portfolio-data.ts
  server.ts         # Express SSR entry
  styles.css        # Tailwind import, design tokens, global animations
public/             # portraits, certification badges, icons, manifest
```

## Deployment

Server-rendered and deployed to Railway (`railway.json`, NIXPACKS): `npm run build`, then
`node dist/portfolio/server/server.mjs`. Set `ANTHROPIC_API_KEY` in the environment for the
AI assistant.

## Customization

- Update content in `src/app/portfolio-data.ts`.
- Update hero copy in `src/app/components/hero/hero.component.ts`.
- Update the about-page prose in `src/app/pages/about-page.component.ts`.
- Replace `public/alexander.webp` and `public/alexander_wave.webp` with same-ratio portrait images.
- Update email and social links in the contact components and `portfolio-data.ts`.
- Set `ANTHROPIC_API_KEY` to power the AI assistant.

## License

[MIT](LICENSE)
