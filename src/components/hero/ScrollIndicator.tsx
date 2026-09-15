'use client';

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollIndicatorProps {
  heroRef: RefObject<HTMLDivElement | null>;
}

export default function ScrollIndicator({ heroRef }: ScrollIndicatorProps) {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!indicatorRef.current || !heroRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      /* Pulsing line animation */
      const line = indicatorRef.current.querySelector('.scroll-line-inner');
      if (line) {
        gsap.to(line, {
          scaleY: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
          delay: 1.5,
        });
      }

      /* Fade out on scroll */
      gsap.to(indicatorRef.current, {
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=10%',
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === heroRef.current) {
          // Only kill scroll indicators, not all triggers
        }
      });
    };
  }, [heroRef]);

  return (
    <div
      ref={indicatorRef}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      style={{
        zIndex: 25,
        pointerEvents: 'none',
      }}
    >
      <span
        className="font-sans uppercase"
        style={{
          fontSize: '0.6rem',
          letterSpacing: '0.25em',
          color: 'rgba(245, 240, 232, 0.5)',
          fontWeight: 500,
        }}
      >
        Scroll to discover
      </span>
      <div
        className="scroll-line"
        style={{
          width: '1px',
          height: '40px',
          backgroundColor: 'rgba(245, 240, 232, 0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="scroll-line-inner"
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--champagne)',
            transform: 'scaleY(0)',
            transformOrigin: 'top',
            opacity: 0.6,
          }}
        />
      </div>
    </div>
  );
}
