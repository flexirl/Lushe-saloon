'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current || !imgRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Very slow cinematic zoom on load
      gsap.fromTo(
        imgRef.current,
        { scale: 1.15, filter: 'brightness(0.5)' },
        { scale: 1.05, filter: 'brightness(0.75)', duration: 6, ease: 'power2.out' }
      );
      
      // Warm overlay fade
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0.8 },
          { opacity: 0.3, duration: 4, ease: 'power2.out' }
        );
      }
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sceneRef} className="absolute inset-0" style={{ zIndex: 0 }}>
      {/* Background Image Container */}
      <div 
        ref={imgRef} 
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform, filter' }}
      >
        <Image
          src="/assets/lushe/hero/hero-salon-wide.jpg"
          alt="Lushè Unisex Saloon — panoramic salon interior"
          fill
          priority
          quality={85}
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center 40%',
          }}
        />
      </div>

      {/* Atmosphere gradient overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          zIndex: 10,
          background: 'rgba(41, 35, 31, 0.45)', // Warm espresso tint
          pointerEvents: 'none',
        }}
      />

      {/* Bottom gradient for text readability and transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          zIndex: 11,
          background: 'linear-gradient(to top, var(--ivory) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
