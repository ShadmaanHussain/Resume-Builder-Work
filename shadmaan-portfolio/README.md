# Shadmaan Hussain — Portfolio

An interactive, animated portfolio built with **Vite + React + TypeScript**, **Tailwind CSS**, and **Framer Motion**. Supports a hidden resume-variant switch (Full Stack vs Power Platform) controlled by an environment variable.

## Features

- 🎨 Aurora-gradient animated background, animated section reveals
- 🌗 Light / Dark mode toggle with `localStorage` + system preference
- 🎯 Variant-aware content (`fullstack` / `powerplatform`) via a single env var
- 📄 One-click PDF resume download (variant-aware)
- ♿ Respects `prefers-reduced-motion`, keyboard-friendly nav, semantic landmarks
- 🚀 Production-ready Vite build, ESLint + Prettier configured

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Resume variant switch

The site shows **one** resume to visitors. Pick which one with `VITE_RESUME_VARIANT`:

| Value             | Shown content                            |
| ----------------- | ---------------------------------------- |
| `fullstack`       | Full Stack Software Engineer (default)   |
| `powerplatform`   | Dynamics 365 & Power Platform Developer  |

Set it in `.env.local` (already created for you):

```bash
VITE_RESUME_VARIANT=powerplatform
```

Then restart `npm run dev`. Vite only injects `VITE_*` env vars at build/dev time, so the variant is **baked in** at build — visitors can't see or toggle it.

## Resume PDFs

Drop your compiled PDFs into `public/resumes/`:

```
public/resumes/Resume_FullStack.pdf
public/resumes/Resume_PowerPlatform.pdf
```

The **Download Resume** button serves whichever matches the active variant.

## Scripts

| Script             | What it does                       |
| ------------------ | ---------------------------------- |
| `npm run dev`      | Start the Vite dev server          |
| `npm run build`    | Type-check + production build      |
| `npm run preview`  | Preview the production build       |
| `npm run lint`     | Run ESLint                         |
| `npm run format`   | Format with Prettier               |

## Project structure

```
src/
  components/      # Navbar, ThemeToggle, ResumeDownloadButton, AnimatedBackground, ...
  sections/        # Hero, About, Experience, Skills, Footer
  data/            # fullstack.ts, powerplatform.ts (typed resume data)
  config/          # variant.ts (env-driven variant selection)
  providers/       # ThemeProvider
  types/           # ResumeData type
  lib/             # utils (cn helper)
```

## Editing your content

All copy lives in [src/data/fullstack.ts](src/data/fullstack.ts) and [src/data/powerplatform.ts](src/data/powerplatform.ts) — edit those files to update text, bullets, skills, contact info, and the PDF path.

## Building for production

```bash
npm run build
npm run preview
```

The `dist/` folder is fully static and can be deployed to Vercel, Netlify, GitHub Pages, Azure Static Web Apps, etc.
