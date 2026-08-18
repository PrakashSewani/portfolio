# Prakash Sewani — Portfolio

[prakashsewani.com](https://prakashsewani.com)

Personal portfolio of Prakash Sewani, Senior Software Engineer. A brutalist single-page application showcasing selected work, expertise, career history, and contact.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** build tooling
- **Motion** (Framer Motion) for animations
- **Lucide Icons**
- Custom CSS with CSS variables, no UI framework

## Run Locally

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run preview
```

Output is in `dist/`.

## Project Structure

```
src/
├── App.tsx                    # Layout, theme, scroll progress, command palette
├── main.tsx                   # Entry point
├── components/
│   ├── Navbar.tsx             # Fixed header with section navigation
│   ├── HeroDashboard.tsx      # Hiring-focused hero with architecture proof
│   ├── Projects.tsx           # Selected work case studies
│   ├── Expertise.tsx          # Technical strengths + production scope
│   ├── Experience.tsx         # Career timeline + certifications
│   ├── Interests.tsx          # Working approach + principles
│   ├── Contact.tsx            # Hiring contact section
│   └── CommandPalette.tsx     # Optional Cmd/Ctrl+K navigation
├── data/
│   ├── navigation.ts          # Shared section navigation contract
│   └── portfolio.ts           # Profile, projects, capabilities, career data
└── lib/
    └── index.css              # All styles (CSS variables, brutalist design)
```

## Icons

All favicons and social preview images live in `public/`. They use a PS monogram on black with acid-green (`#c7ff1a`) to match the site's brutalist theme.

- `favicon.ico` — multi-resolution ICO (16/32/48/256)
- `favicon-16x16.png` / `favicon-32x32.png` — PNG favicons
- `apple-touch-icon.png` — 180x180 for iOS home screen
- `android-chrome-192x192.png` / `android-chrome-512x512.png` — PWA icons
- `og-image.png` — 1200x630 social preview card

To regenerate from an SVG source using [sharp](https://sharp.pixelplumbing.com/):

```bash
npx sharp -i icon.svg -o public/favicon-32x32.png resize 32 32
```

## License

Personal project. All rights reserved.
