# Lushè Beauty Studio — Project Brain

## What Is This File?

This file captures key architectural decisions, context, and conventions for the Lushè Beauty Studio website. It serves as a **persistent memory** so that any AI agent (or developer) can quickly understand the project without re-deriving decisions from scratch.

---

## Project Overview

| Key | Value |
|-----|-------|
| Project | Lushè Beauty Studio Website |
| Type | Premium animated single-page showcase |
| Location | Sector 52, Gurugram, India |
| Brand | LUSHÉ — Nails & Beauty Studio |
| Logo | LN monogram + LUSHÉ wordmark (round backlit sign) |
| Scope | Full site — Hero, About, Services, Gallery, Contact, Footer |
| Backend | None — fully static front-end |

---

## Architecture Decisions

### AD-001: Next.js App Router (Static)
**Decision**: Use Next.js 15 with App Router. The site is fully static with no server-side data fetching.
**Rationale**: Modern React patterns, excellent image optimization via `next/image`, clean layout system. Static export possible for simple hosting.

### AD-002: GSAP over CSS-only animations
**Decision**: Use GSAP + ScrollTrigger for all scroll-driven animations and complex motion.
**Rationale**: CSS scroll-driven animations lack the precise control needed for cinematic sequences. GSAP provides scrubbed timeline control, pinning, smooth interpolation, and staggered reveals.

### AD-003: CSS 3D Parallax (No WebGL/Three.js)
**Decision**: Use CSS 3D perspective + GSAP parallax layers for depth effects. No Three.js dependency.
**Rationale**: Full WebGL is overkill for a photo-based showcase site. CSS perspective + GSAP achieves compelling depth with a fraction of the bundle size and better mobile performance.

### AD-004: Mobile fallback strategy
**Decision**: Mobile hero uses simplified GSAP zoom/fade sequence instead of 3D parallax.
**Rationale**: Mobile GPU limitations and smaller viewport make full 3D parallax unnecessary. The cinematic feel is preserved through zoom, blur, and opacity transitions.

### AD-005: Lenis smooth scroll
**Decision**: Use Lenis for smooth scrolling.
**Rationale**: GSAP ScrollTrigger integrates well with Lenis. Provides the smooth, premium scroll feel expected in luxury websites.

### AD-006: Cormorant Garamond + DM Sans
**Decision**: Serif display font + sans-serif UI font combination.
**Rationale**: Cormorant Garamond has the high-contrast, editorial quality of fashion/beauty magazines. DM Sans is clean and readable for UI elements.

### AD-007: No Backend, No CMS
**Decision**: All content is hardcoded. No database, no API, no CMS.
**Rationale**: The site is a static showcase. Content changes are infrequent and can be made by editing the source code directly. This keeps the stack simple, fast, and free to host.

### AD-008: WhatsApp as Primary CTA
**Decision**: "Book" buttons open WhatsApp with a pre-filled message instead of an in-app booking form.
**Rationale**: No backend = no booking system. WhatsApp is the most natural communication channel for Indian salon customers. Direct, personal, immediate.

---

## Color System Rationale

Colors are extracted from actual salon photographs:
- The **walls** are warm peach/blush with floral wallpaper panels → `--ivory`, `--blush`
- The **vertical wooden slat panels** and shelving are warm oak → `--beige`, `--taupe`
- The **leather seating** is dusty rose and champagne → `--blush`, `--cream`
- The **ambient lighting** throughout is warm golden → `--champagne`
- The **logo signage** uses dark text on light background with golden backlight → `--espresso`, `--champagne`
- The **nail art frames** have gold frames on blush walls → `--champagne`, `--blush`
- The **overall mood** is warm, never cold → entire palette skews warm

---

## Component Map

```
src/components/
├── navigation/
│   ├── Navbar.tsx          # Main navbar (transparent → scrolled)
│   └── MobileMenu.tsx      # Full-screen mobile menu overlay
├── hero/
│   ├── Hero.tsx            # Master hero container (scroll logic)
│   ├── HeroScene.tsx       # Layered 3D photo composition
│   ├── HeroOverlay.tsx     # Typography + CTAs
│   └── ScrollIndicator.tsx # "SCROLL TO DISCOVER" element
├── sections/
│   ├── AboutSection.tsx    # Brand story + interior photo
│   ├── ServicesSection.tsx # Service category cards
│   ├── GallerySection.tsx  # Interior photo gallery (masonry/parallax)
│   └── ContactSection.tsx  # Map + address + phone + hours
└── footer/
    └── Footer.tsx          # Logo + social + copyright
```

---

## Section Animation Strategy

| Section | Animation Approach |
|---------|-------------------|
| Hero | GSAP ScrollTrigger pinned timeline — 5-frame parallax reveal |
| About | Staggered text line reveals (fade-up) + image parallax |
| Services | Staggered card reveals on scroll entry |
| Gallery | Masonry images with scroll-driven scale-in + parallax |
| Contact | Fade-up reveal for info blocks, map lazy-loads |
| Footer | Subtle fade-in on scroll |

All animations respect `prefers-reduced-motion`.

---

## Key Conventions

### File Naming
- Components: PascalCase (`Navbar.tsx`)
- Hooks: camelCase with `use` prefix (`useScrollProgress.ts`)
- Utils: camelCase (`smoothScroll.ts`)
- Assets: kebab-case (`hero-interior-01.webp`)

### Image Assets
- Optimized images in `public/assets/lushe/`
- Source photographs in `Assets/images_interior_service/`
- WebP format preferred for production
- Descriptive filenames that indicate content and usage
- Use Next.js `<Image>` component for all images

### CSS Custom Properties
- All design tokens in `globals.css` using `--` prefix
- Integrated with Tailwind via `@theme` (Tailwind v4)
- Components reference tokens, never hardcode colors

### Animation Cleanup
- All GSAP animations wrapped in `useGSAP` hook or `useEffect` with cleanup
- ScrollTrigger instances killed on component unmount
- Lenis instance destroyed on unmount

---

## Known Constraints

1. **Source images are unoptimized JPGs**: The 32 source photos in `Assets/` need to be converted to WebP and sized appropriately before use in production.
2. **Logo file not yet available**: The `public/assets/lushe/logo/` directory is empty. May need to extract/recreate from photos or receive from brand owner.
3. **Placeholder content**: Service descriptions, about text, and contact details use placeholder content until confirmed by the business owner.

---

## Reference Websites (Design Inspiration)

| Site | Inspiration |
|------|-------------|
| ever.co.id | Full-screen hero, serif typography, "SCROLL TO EXPLORE" indicator, cinematic feel |
| beautyqueenhk.com | Beauty salon digital experience |
| Lunaria (Dribbble) | Premium beauty studio web design, warm palette, editorial layout |
| laconique concept | Salon hero with interior photography, elegant nav |

---

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Token Budget Tips for AI Agents

1. Read this file FIRST before analyzing the codebase
2. Design tokens are in `src/app/globals.css`
3. The PRD has full specs — don't re-derive brand colors
4. Check AGENTS.md for strict rules before making changes
5. The entire site scope is: Navbar + Hero + About + Services + Gallery + Contact + Footer
6. There is NO backend — do not create API routes, database schemas, or server-side logic
