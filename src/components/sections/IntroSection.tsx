'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ── Animated counter hook ── */
function useCounter(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const happyClients = useCounter(2500, 1800, statsVisible);
  const yearsExp = useCounter(5, 1200, statsVisible);
  const services = useCounter(50, 1400, statsVisible);
  const rating = useCounter(49, 1600, statsVisible);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 48,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 86%',
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: -4 },
          {
            yPercent: 4,
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

      /* Trigger counter animation when stats come into view */
      ScrollTrigger.create({
        trigger: '[data-stats-row]',
        start: 'top 85%',
        once: true,
        onEnter: () => setStatsVisible(true),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="bg-ivory px-5 py-24 text-espresso md:px-10 md:py-40 xl:px-16"
      aria-label="Our Story"
    >
      <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p data-reveal className="eyebrow text-taupe">
            About Us
          </p>
          <h2
            data-reveal
            className="mt-8 max-w-4xl font-display text-[clamp(3.2rem,7.5vw,7.5rem)] font-light leading-[0.88] text-espresso"
          >
            About{' '}
            <em className="font-light italic text-blush">Lushè</em>
          </h2>
          <p data-reveal className="mt-5 font-sans text-lg text-taupe max-w-lg">
            Where beauty feels like home
          </p>
        </div>

        <div data-reveal className="lg:col-span-4 lg:col-start-9 lg:pt-36">
          <p className="text-lg leading-relaxed text-taupe">
            LUSHÈ is a warm pause in the middle of the city — a place where thoughtful craft,
            personal attention, and playful beauty come together.
          </p>
          <p className="mt-6 text-base leading-relaxed text-taupe/90">
            From the glow of our studio to every finishing touch, your time here is designed to
            feel unhurried, considered, and entirely yours.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-20 grid max-w-[1500px] gap-8 md:grid-cols-12 md:items-stretch">
        <figure
          data-reveal
          className="image-frame relative h-[50vh] min-h-[380px] overflow-hidden md:col-span-7"
        >
          <div data-parallax className="relative size-full">
            <Image
              src="/assets/lushe/interior/about.png"
              alt="About Lushè Beauty Studio"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="size-full object-cover"
              quality={90}
            />
          </div>
        </figure>

        {/* ── Counter Stats — stacked to the right of image ── */}
        <div
          data-stats-row
          className="flex flex-row flex-wrap md:flex-col justify-between gap-6 md:col-span-4 md:col-start-9 md:py-4"
        >
          <div data-reveal className="flex-1 min-w-[120px] md:flex-none">
            <p className="font-display text-4xl md:text-5xl font-light text-espresso leading-none">
              {happyClients.toLocaleString()}<span className="text-blush">+</span>
            </p>
            <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-taupe">
              Happy Clients
            </p>
          </div>
          <div data-reveal className="flex-1 min-w-[120px] md:flex-none">
            <p className="font-display text-4xl md:text-5xl font-light text-espresso leading-none">
              {yearsExp}<span className="text-blush">+</span>
            </p>
            <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-taupe">
              Years Experience
            </p>
          </div>
          <div data-reveal className="flex-1 min-w-[120px] md:flex-none">
            <p className="font-display text-4xl md:text-5xl font-light text-espresso leading-none">
              {services}<span className="text-blush">+</span>
            </p>
            <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-taupe">
              Services Offered
            </p>
          </div>
          <div data-reveal className="flex-1 min-w-[120px] md:flex-none">
            <p className="font-display text-4xl md:text-5xl font-light text-espresso leading-none">
              {(rating / 10).toFixed(1)}<span className="text-champagne ml-1">★</span>
            </p>
            <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-taupe">
              Google Rating
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
