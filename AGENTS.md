# Lushè Beauty Studio — Agent Instructions (AGENTS.md)

## Project Identity

This is the **Lushè Beauty Studio** website — a premium beauty salon in Sector 52, Gurugram, India.

**DO NOT** treat this as a generic template project. Every decision must respect the actual brand identity derived from the real salon interior photographs.

---

## Critical Rules for AI Agents

### 1. Brand Fidelity
- The color palette is **warm ivory/cream/beige/champagne** — derived from the actual salon interior
- **NEVER** introduce bright pink, neon colors, blue, cyan, or saturated gold
- **NEVER** make it look like a SaaS product or corporate website
- **NEVER** use excessive glassmorphism or dark-mode-first design
- The luxury comes from **typography + photography + spacing + motion + composition**, not flashy effects

### 2. Design Tokens
Always use the centralized design tokens defined in `src/app/globals.css`. Key values:
```
--ivory: #F5F0E8      (primary background)
--cream: #EDE8DE      (secondary bg, navbar scrolled)
--beige: #D6C6AE      (borders, accents)
--taupe: #B7A28C      (secondary text)
--blush: #C9A08E      (warm accent)
--champagne: #C7A86A  (gold accent, subtle)
--espresso: #29231F   (primary dark text)
--charcoal: #1E1C1A   (darkest text)
```

### 3. Typography
- **Display/Headlines**: Cormorant Garamond (serif, editorial, fashion-magazine feel)
- **Body/UI/Nav**: DM Sans (clean, modern sans-serif)
- **NEVER** use system fonts or browser defaults for visible text
- Typography should feel like luxury beauty editorial, not corporate

### 4. Tech Stack
- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS
- GSAP + ScrollTrigger for animations
- Lenis for smooth scrolling
- CSS 3D perspective for depth effects (no Three.js)

### 5. Motion Guidelines
- **Slow, elegant, cinematic** — never fast or bouncy
- Easing: ease-out-quad or custom cubic-bezier
- Duration: 300ms (micro), 600ms (standard), 1200ms (cinematic)
- Always respect `prefers-reduced-motion`
- Clean up GSAP animations in useEffect cleanup functions

### 6. Component Architecture
- Components are modular and isolated
- Hero section lives in `src/components/hero/`
- Navigation lives in `src/components/navigation/`
- Each section gets its own component under `src/components/sections/`
- Footer lives in `src/components/footer/`
- Shared hooks go in `src/hooks/`
- Shared types go in `src/types/`

### 7. Asset Handling
- All brand assets go in `public/assets/lushe/`
- Source photographs in `Assets/images_interior_service/`
- Use descriptive filenames: `hero-interior-01.webp`, `salon-reception.webp`
- Always use WebP format for production images
- Optimize images before committing
- Use Next.js `<Image>` component for all images

### 8. Performance
- Lazy load images below the fold
- Use `will-change` sparingly and only during active animations
- GPU-accelerated transforms: translate3d, scale3d, opacity
- Avoid layout thrashing in scroll handlers
- Target 60fps for all animations

### 9. Code Quality
- TypeScript strict mode — no `any` types
- No giant monolithic components
- No hardcoded repeated values — use design tokens
- Comments only where they provide genuine value
- Descriptive variable and component names

### 10. Project Scope
**Full static showcase site**: Navbar + Hero + About + Services + Gallery + Contact + Footer.
- Do NOT build any backend, API routes, database, or server-side logic
- Do NOT add booking forms, user accounts, loyalty systems, CMS, or admin features
- All "Book" CTAs link to WhatsApp or phone call
- All content is hardcoded — no CMS integration

---

## Key Documents
- `PRD.md` — Full product requirements
- `PROJECT_BRAIN.md` — Architecture decisions and context
- `src/app/globals.css` — Design token source of truth

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
