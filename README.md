# Portfolio Template

A personal portfolio template built around a signature WebGL flow shader, a magnetic
morphing portrait, Lenis smooth scroll, and a calm black-and-white design system.
Designed for individual designers and engineers who want a brand-ready scaffold with a
distinctive look on day one. **Free to use in personal and commercial projects.**

## Built With

- **Angular 21** — standalone components, signals, zoneless-friendly OnPush
- **TypeScript** — strict mode
- **Tailwind CSS v4** — token-driven theming
- **OGL** — WebGL flow shader and morphing portrait
- **Lenis** — smooth scrolling
- **Matter.js** — physics-driven stack chips
- **@lucide/angular** — icons

## Special Features

- Light and dark mode with a view-transition reveal
- WebGL flow shader backdrop
- Magnetic morphing portrait on hover
- Smooth scroll with Lenis
- Physics-driven tech stack chips
- One-click copy-email contact card
- Fully responsive
- Optimized for accessibility (skip link, focus rings, ARIA, reduced-motion guards)
- SEO and Open Graph ready
- Easy to customize from a single config

## Included Sections

- Animated pill nav with theme toggle
- Hero with shader, headline, and morphing portrait
- Projects grid with hover lift and image zoom
- Polaroid strip on the about page
- Skills grid
- Interactive tech stack chips
- Expandable experience timeline
- Education list
- Contact card with an embedded shader
- Site-wide shader backdrop

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200).

## Scripts

| Command         | Description          |
| --------------- | -------------------- |
| `npm start`     | Start the dev server |
| `npm run build` | Build for production |
| `npm run watch` | Build in watch mode  |
| `npm test`      | Run unit tests       |

## Project Structure

```text
src/
  app/
    components/
      about/        # Education, experience, skills, polaroids, Matter.js stack, shared entry/chip
      contact/      # Contact button and card
      hero/         # Hero and WebGL portrait morph
      layout/       # Nav and page backdrop
      projects/     # Projects grid
      shaders/      # Reusable OGL flow shader
      ui/           # Shared call-to-action row
    pages/          # Home, Projects, and About routes
    services/       # Theme and smooth-scroll services
    app.ts          # Root component (+ app.html, app.config.ts, app.routes.ts)
    portfolio-data.ts
  index.html        # Document shell with the pre-bootstrap theme script
  styles.css        # Tailwind import, design tokens, global animations
public/             # Portraits, favicon/icon SVGs, social icons, manifest
```

## Customization

- Update content in `src/app/portfolio-data.ts`.
- Update hero copy in `src/app/components/hero/hero.component.ts`.
- Update the about-page prose in `src/app/pages/about-page.component.ts`.
- Replace `public/josh.webp` and `public/josh_wave.webp` with same-ratio portrait images.
- Replace the placeholder project images in `portfolio-data.ts` with your own work.
- Update email and social links in the contact components and `portfolio-data.ts`.
- Tune shader inputs on `<app-shader-flow>` in the backdrop and contact card.

## License

[MIT](LICENSE) — free to use in personal and commercial projects.
