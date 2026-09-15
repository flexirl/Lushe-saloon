# Lushè Beauty Studio — Product Requirements Document (PRD)

**Version**: 2.0
**Last Updated**: 2026-09-04
**Status**: Active — Full Scope

---

## 1. Product Overview

**Lushè Beauty Studio** is a premium nails & beauty salon located at **Sector 52, Gurugram, India**. This website is a **fully static, single-page, animation-driven showcase** — a digital sign that tells customers everything they need to know about the salon while making them *feel* the warmth and craft of the space.

**Primary Objective**: Create a premium, cinematic, animation-rich website that makes visitors feel they are entering the actual Lushè salon — warm, sophisticated, approachable, and beautiful.

**Full Brand Name**: LUSHÉ — Nails & Beauty Studio
**Short Brand Name**: LUSHÈ
**Logo**: LN monogram with LUSHÉ wordmark (round backlit sign)

### What This Is
- A fully static front-end showcase website
- Single page with smooth scroll-driven sections
- Premium animation-heavy experience (GSAP + ScrollTrigger)
- Informational — tells customers about services, location, vibe
- CTAs link to WhatsApp / phone call for appointments

### What This Is NOT
- ❌ No backend / API / database
- ❌ No user accounts or authentication
- ❌ No online booking system
- ❌ No loyalty points or gift cards
- ❌ No CMS or admin dashboard
- ❌ No e-commerce

---

## 2. Brand Identity

### 2.1 Visual Identity Source
The salon interior photographs are the **source of truth** for the visual identity:
- Warm peach/blush walls with soft floral wallpaper panels (cherry blossom motif)
- Champagne/golden ambient lighting — backlit logo signage, warm downlights
- Natural oak wood vertical slat panels
- Dusty-rose and blush leather furniture with floral cushions
- Gold-framed nail art illustrations on the walls
- "You Glow Girl" warm-white neon on floral wallpaper
- "Selfie Here" lavender neon sign
- Extensive nail color display wall with warm shelf lighting
- Natural wood live-edge coffee table, warm woven rug
- Round backlit LUSHÈ logo sign on wooden slat wall

### 2.2 Brand Personality
The website should feel:
**Warm · Editorial · Premium · Feminine · Playful · Sophisticated · Approachable · Cozy**

The brand is premium but not cold. It has personality — the neon signs, the plushies on the shelves, the floral wallpaper. It's curated warmth, not corporate luxury.

### 2.3 What It Should NOT Be
- Generic pink beauty salon template
- SaaS/corporate website
- Futuristic/cyberpunk
- Excessive glassmorphism or dark-mode-first
- Black-and-gold generic luxury
- Cold, sterile, minimalist

---

## 3. Design System

### 3.1 Color Tokens
```css
--ivory: #F5F0E8;       /* Primary background */
--cream: #EDE8DE;        /* Secondary background, scrolled navbar */
--beige: #D6C6AE;        /* Borders, subtle accents */
--taupe: #B7A28C;        /* Secondary text, muted elements */
--blush: #C9A08E;        /* Warm accent */
--champagne: #C7A86A;    /* Gold accent (subtle) */
--warm-brown: #8B7355;   /* Medium text */
--espresso: #29231F;     /* Primary dark text */
--charcoal: #1E1C1A;     /* Darkest text */
```

### 3.2 Typography
| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Display/Hero | Cormorant Garamond | 300, 400, 500, 600, 700 | Headlines, hero text, editorial |
| Body/UI | DM Sans | 400, 500, 600 | Navigation, body, buttons |

### 3.3 Spacing Scale
Based on 4px grid: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 160

### 3.4 Motion Language
- Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)
- Duration: 300ms (micro), 600ms (standard), 1200ms (cinematic)
- Scroll animations: Smooth, 60fps, GPU-accelerated
- Style: Slow, elegant, cinematic — never fast or aggressive
- Personality: Graceful reveals, parallax depth, staggered entries

---

## 4. Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15.x | Framework (App Router, static export) |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility CSS |
| GSAP | 3.x | Animation engine |
| ScrollTrigger | 3.x | Scroll-driven animations |
| Lenis | Latest | Smooth scrolling |

---

## 5. Page Structure

The entire site is a **single scrollable page** with the following sections:

### 5.1 Navbar
```
Desktop:  [LUSHÈ]      [About · Services · Gallery · Contact]      [Book Now] [IG] [WA]
Mobile:   [LUSHÈ]                                                    [Book] [☰]
```

| State | Background | Text Color | Blur | Trigger |
|-------|-----------|------------|------|---------|
| Initial | transparent | ivory/white | none | page top |
| Scrolled | rgba(245,240,232,0.9) | espresso | 12px | scroll > 50px |

Mobile: Full-screen menu overlay with staggered reveal animation.
"Book Now" opens WhatsApp with pre-filled message.

---

### 5.2 Hero Section
**Concept**: Cinematic scroll-driven salon reveal. The user "enters" the salon as they scroll.

| Frame | Scroll % | Visual | Typography |
|-------|---------|--------|------------|
| 1 | 0-15% | Dark/blurred salon | LUSHÈ + BEAUTY STUDIO mask reveal |
| 2 | 15-35% | Salon comes into focus, parallax forward | Brand text fades |
| 3 | 35-60% | Deeper salon view, furniture/mirrors visible | — |
| 4 | 60-80% | Logo wall prominent, golden backlight | — |
| 5 | 80-100% | Final composition resolves | "Beauty, thoughtfully refined." + CTAs |

**Technical Approach**: Layered parallax photo composition with CSS 3D perspective, GSAP ScrollTrigger-driven camera movement.

**CTAs**:
- Primary: "Book via WhatsApp" (cream bg, dark text) → opens WhatsApp
- Secondary: "Explore Lushè" (outlined) → smooth scrolls to About
- Hover: Magnetic movement + subtle bg transition

**Mobile**: Simplified scroll-driven zoom + focus + opacity transitions.

---

### 5.3 About / Story Section
**Purpose**: A brief, warm editorial intro — who Lushè is and what the experience feels like.

**Content**:
- Headline: e.g., "Where Beauty Feels Like Home"
- 2-3 sentences of brand story — the warmth, the craft, the personal touch
- A curated interior photo (the reception area with logo wall, or the seating area with floral cushions)
- Subtle scroll-triggered text reveal animation

**Animation**: Text lines reveal with staggered fade-up. Image parallax on scroll. Elegant, slow.

---

### 5.4 Services Overview Section
**Purpose**: Clean visual showcase of what Lushè offers. No pricing, no booking — just beautiful category cards.

**Service Categories** (placeholder — to be confirmed):
- Nails (the specialty — gel, acrylic, nail art, extensions)
- Hair (cuts, color, treatments, styling)
- Skin (facials, cleanup, skincare)
- Makeup (bridal, party, everyday glam)
- Spa & Body (waxing, body treatments)

**Layout**: Grid of cards or horizontal scroll. Each card has:
- Service category name (Cormorant Garamond, elegant)
- A brief one-line description
- A subtle image or icon

**Animation**: Staggered card reveal on scroll. Hover: gentle scale + shadow lift.

---

### 5.5 Interior Gallery Section
**Purpose**: Let the photography sell the experience. Show off the beautiful salon space.

**Layout**: Masonry or asymmetric grid of curated interior photos:
- The reception area with backlit LUSHÈ logo
- The seating area with blush chairs and floral cushions
- "You Glow Girl" neon wall
- Nail color display shelves
- Service stations with mirrors
- Detail shots (products, flowers, textures)

**Animation**: Scroll-driven parallax. Images reveal with subtle scale-in. Staggered masonry load.

---

### 5.6 Contact & Location Section
**Purpose**: Everything a customer needs to visit or reach out.

**Content**:
- Google Maps embed (Sector 52, Gurugram)
- Full address
- Phone number (tap-to-call on mobile)
- WhatsApp link (tap-to-chat)
- Instagram link
- Working hours

**Layout**: Split — info on one side, map on the other. Warm background color.

---

### 5.7 Footer
Minimal, elegant:
- LUSHÈ logo
- Social links (Instagram, WhatsApp)
- "© 2026 Lushè Beauty Studio. All rights reserved."
- Optional: "Made with ♡ in Gurugram"

---

## 6. Performance Requirements

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total page asset size: < 5MB (compressed)
- Images: WebP/AVIF, responsive srcSet, lazy loaded below fold
- 60fps scroll animations
- GPU-accelerated transforms only
- Proper cleanup of animation listeners
- `prefers-reduced-motion` respected throughout

---

## 7. Responsive Breakpoints

| Breakpoint | Target |
|-----------|--------|
| 1440px+ | Full experience |
| 1280px | Desktop standard |
| 1024px | Tablet landscape |
| 768px | Tablet portrait |
| 480px | Mobile landscape |
| 375px | Mobile portrait |

---

## 8. Accessibility

- WCAG 2.1 AA compliance target
- `prefers-reduced-motion`: static hero, no scroll animations
- Keyboard navigation for all interactive elements
- Focus-visible states
- Semantic HTML5 elements
- Proper ARIA labels
- Color contrast ratios met
- Screen reader friendly navigation

---

## 9. Asset Structure

```
public/assets/lushe/
├── logo/
├── hero/
├── interior/
├── services/
└── gallery/
```

Source photographs in `Assets/images_interior_service/` (32 images).

---

## 10. Success Criteria

- Lushè identity immediately recognizable from first viewport
- Actual salon interior is the visual hero — photography sells the experience
- Navbar is minimal and premium
- Hero has meaningful scroll-driven depth and cinematic feel
- About section tells the brand story with warmth
- Services are presented beautifully without clutter
- Gallery showcases the real salon space
- Contact section has everything a customer needs to visit or call
- Motion is smooth (60fps), elegant, never aggressive
- Typography feels editorial, like a luxury beauty magazine
- Colors match the real salon interior
- Desktop looks premium, mobile remains beautiful
- No generic template feeling anywhere
- The entire site feels like one cohesive, breathing experience
