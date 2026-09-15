'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 45,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="bg-ivory px-5 py-24 text-espresso md:px-10 md:py-40 xl:px-16"
      aria-label="Gallery and Salon Interior"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p data-reveal className="eyebrow text-taupe">
              Gallery
            </p>
            <h2
              data-reveal
              className="mt-7 font-display text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.9] text-espresso"
            >
              Our{' '}
              <em className="italic text-blush">Studio</em>
            </h2>
          </div>

          <p data-reveal className="max-w-xs pb-2 text-base leading-relaxed text-taupe">
            Step inside our beauty haven — soft lighting, warm textures, and a space designed
            to make every visit feel special.
          </p>
        </div>

        {/* Editorial Asymmetric Photo Composition */}
        <div className="mt-20 grid gap-8 md:grid-cols-12 md:gap-y-28 items-center">
          {/* 1. Reception Wall with Illuminated Logo */}
          <figure
            data-reveal
            className="image-frame relative h-[68vh] min-h-[500px] overflow-hidden md:col-span-5"
          >
            <div data-parallax className="relative size-full">
              <Image
                src="/assets/lushe/hero/hero-logo-wall.jpg"
                alt="LUSHÈ reception desk with illuminated gold salon wordmark and natural wood slatted wall"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="size-full object-cover"
              />
            </div>
          </figure>

          {/* 2. Styling Station with Arched Backlit Mirror */}
          <figure
            data-reveal
            className="image-frame relative h-[52vh] min-h-[380px] overflow-hidden md:col-span-6 md:col-start-7 md:mt-24"
          >
            <div data-parallax className="relative size-full">
              <Image
                src="/assets/lushe/interior/interior-mirror.jpg"
                alt="Warm LUSHÈ styling station with arched backlit mirror and leather armchair"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="size-full object-cover"
              />
            </div>
          </figure>

          {/* 3. Studio Wide & Nail Stations */}
          <figure
            data-reveal
            className="image-frame relative h-[56vh] min-h-[400px] overflow-hidden md:col-span-8 md:col-start-3"
          >
            <div data-parallax className="relative size-full">
              <Image
                src="/assets/lushe/hero/hero-salon-wide.jpg"
                alt="LUSHÈ studio lounge and nail stations in warm golden ambiance"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="size-full object-cover"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
