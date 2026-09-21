'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ── Hero image cinematic entrance ── */
      gsap.from('[data-hero-image]', {
        scale: 1.03,
        duration: 1.4,
        ease: 'expo.out',
      });

      /* ── Overlay gradient fade-in ── */
      gsap.from('[data-hero-shade]', {
        opacity: 0.3,
        duration: 0.9,
        ease: 'power2.out',
      });

      /* ── Headline clip-reveal ── */
      gsap.from('[data-hero-line]', {
        yPercent: 110,
        duration: 1.25,
        stagger: 0.12,
        delay: 0.2,
        ease: 'power3.out',
      });

      /* ── Eyebrow & bottom subtitle/CTA fade-up ── */
      gsap.from('[data-hero-meta]', {
        opacity: 0,
        y: 20,
        delay: 0.7,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
      });

      /* ── Parallax scale & drift on scroll ── */
      if (heroRef.current) {
        gsap.to('[data-hero-image]', {
          scale: 1.05,
          yPercent: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        /* ── Title fades and lifts on scroll ── */
        gsap.to('[data-hero-title]', {
          opacity: 0,
          yPercent: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: '18% top',
            end: '62% top',
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative h-svh min-h-[760px] overflow-hidden bg-charcoal text-ivory"
      aria-label="Lushè Unisex Saloon hero"
    >
      <div className="relative h-full w-full overflow-hidden">
        {/* Real salon interior photograph with responsive crops for Mobile, Tablet, and Desktop */}
        <div
          data-hero-image
          ref={imageRef}
          className="absolute inset-0 size-full origin-center will-change-transform"
        >
          {/* Mobile Image (< 768px) */}
          <div className="relative size-full block md:hidden">
            <Image
              src="/assets/lushe/hero/hero-mobile.png"
              alt="Warm illuminated interior of Lushè Unisex Saloon with backlit arched mirrors, wood slat walls, and styling stations"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="size-full object-cover object-center"
            />
          </div>

          {/* Tablet Image (768px - 1023px) */}
          <div className="relative size-full hidden md:block lg:hidden">
            <Image
              src="/assets/lushe/hero/hero-tablet.png"
              alt="Warm illuminated interior of Lushè Unisex Saloon with backlit arched mirrors, wood slat walls, and styling stations"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="size-full object-cover object-center"
            />
          </div>

          {/* Desktop & Wide Screen Image (>= 1024px) */}
          <div className="relative size-full hidden lg:block">
            <Image
              src="/assets/lushe/hero/hero-desktop.png"
              alt="Warm illuminated interior of Lushè Unisex Saloon with backlit arched mirrors, wood slat walls, and styling stations"
              fill
              priority
              quality={95}
              sizes="100vw"
              className="size-full object-cover object-[center_42%]"
            />
          </div>
        </div>

        {/* Ambient dark vignette & contrast gradient overlay */}
        <div data-hero-shade className="hero-shade absolute inset-0 pointer-events-none" />

        {/* Hero typography block pinned near bottom */}
        <div
          ref={titleRef}
          data-hero-title
          className="absolute inset-x-0 bottom-[6vh] lg:bottom-[8vh] px-5 md:px-10 xl:px-16"
        >
          {/* Eyebrow */}
          <p
            data-hero-meta
            className="mb-3 md:mb-5 text-xs font-medium uppercase tracking-[0.2em] text-ivory/90 drop-shadow-sm"
          >
            Unisex Salon · Sector 52 · Gurugram
          </p>

          {/* Huge luxury serif display headline with brand lockup */}
          <h1 className="overflow-hidden font-display text-[clamp(4.5rem,14vw,12rem)] font-light uppercase leading-[0.72] tracking-normal !text-white text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
            <span data-hero-line className="block !text-white text-white" style={{ color: '#ffffff' }}>
              Lushè
            </span>
            <span
              data-hero-line
              className="mt-2 md:mt-3 block font-sans text-[clamp(0.85rem,2.8vw,2rem)] font-medium uppercase tracking-[0.35em] text-white/75 drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
            >
              Unisex Saloon
            </span>
          </h1>

          {/* Bottom line divider and actions */}
          <div
            data-hero-meta
            className="mt-7 flex flex-wrap items-end justify-between gap-6 border-t border-ivory/30 pt-5"
          >
            <p className="max-w-sm font-display text-2xl font-light leading-tight md:text-3xl text-ivory/95 drop-shadow-sm">
              Beauty, thoughtfully refined.
            </p>

            <a
              href="#story"
              className="group flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:text-blush drop-shadow-sm"
            >
              <span>Enter the studio</span>
              <span className="flex size-10 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:translate-y-0.5 group-hover:scale-105">
                <ArrowDown size={15} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
