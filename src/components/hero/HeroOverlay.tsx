'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(overlayRef.current.children, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const title = document.querySelector('.hero-title');
      const subtitle = document.querySelector('.hero-subtitle');
      const ctas = document.querySelector('.hero-ctas');

      const tl = gsap.timeline();
      
      tl.fromTo(
        title,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      )
      .fromTo(
        subtitle,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        ctas,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );
    }, overlayRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      style={{ zIndex: 20 }}
    >
      <p
        className="hero-subtitle font-sans uppercase tracking-widest text-white/80 mb-6 text-xs md:text-sm"
      >
        Welcome to Sector 52, Gurugram
      </p>

      <h1
        className="hero-title font-serif text-white uppercase tracking-wider mb-8"
        style={{
          fontSize: 'clamp(3.5rem, 12vw, 9rem)',
          fontWeight: 300,
          lineHeight: 0.9,
        }}
      >
        Lushè
        <span
          className="mt-2 block font-sans text-[clamp(0.75rem,2.5vw,1.6rem)] font-medium uppercase tracking-[0.35em] text-white/70"
        >
          Unisex Saloon
        </span>
      </h1>

      <p
        className="hero-subtitle font-serif italic text-white/90 text-lg md:text-2xl mb-12 max-w-xl mx-auto"
      >
        Beauty is personal. The experience should be too.
      </p>

      <div className="hero-ctas flex flex-wrap gap-4 justify-center">
        <a
          href="#book"
          className="font-sans uppercase text-xs md:text-sm font-medium tracking-wider px-8 py-4 bg-white text-[var(--espresso)] hover:bg-[var(--champagne)] hover:text-white transition-colors duration-300"
        >
          Book Appointment
        </a>
        <a
          href="#services"
          className="font-sans uppercase text-xs md:text-sm font-medium tracking-wider px-8 py-4 border border-white/40 text-white hover:bg-white/10 hover:border-white transition-all duration-300"
        >
          Explore Services
        </a>
      </div>
    </div>
  );
}
