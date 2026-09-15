# Lushè Beauty Studio

A premium, animation-driven showcase website for **LUSHÉ — Nails & Beauty Studio**, located in Sector 52, Gurugram, India.

## About

This is a fully static, single-page website built to give customers a cinematic, immersive feel of the Lushè salon experience. No backend, no databases — just beautiful front-end craft.

## Tech Stack

- **Next.js 15** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **GSAP 3** + ScrollTrigger (animations)
- **Lenis** (smooth scrolling)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Design tokens & base styles
│   ├── layout.tsx         # Root layout (fonts, metadata)
│   └── page.tsx           # Single page entry
├── components/
│   ├── navigation/        # Navbar + MobileMenu
│   ├── hero/              # Cinematic hero section
│   ├── sections/          # About, Services, Gallery, Contact
│   └── footer/            # Footer
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities (smooth scroll, etc.)
└── types/                 # TypeScript type definitions
```

## Key Documents

| Document | Purpose |
|----------|---------|
| `PRD.md` | Full product requirements & specifications |
| `PROJECT_BRAIN.md` | Architecture decisions & conventions |
| `AGENTS.md` | Rules for AI agents working on this project |

## Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Ivory | `#F5F0E8` | Primary background |
| Cream | `#EDE8DE` | Secondary background |
| Beige | `#D6C6AE` | Borders, accents |
| Taupe | `#B7A28C` | Secondary text |
| Blush | `#C9A08E` | Warm accent |
| Champagne | `#C7A86A` | Gold accent |
| Espresso | `#29231F` | Primary dark text |

## License

Private — All rights reserved.
