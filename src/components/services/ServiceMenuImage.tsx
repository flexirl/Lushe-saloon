'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface ServiceMenuImageProps {
  src: string;
  alt: string;
  visible: boolean;
}

export default function ServiceMenuImage({ src, alt, visible }: ServiceMenuImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible || !containerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
      }
    );
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="mt-8 overflow-hidden rounded-xl border border-beige/30 shadow-xl opacity-0"
    >
      <div className="relative w-full aspect-[3/4] max-h-[600px]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 500px"
          className="size-full object-contain bg-espresso/5"
          quality={90}
        />
      </div>
    </div>
  );
}
