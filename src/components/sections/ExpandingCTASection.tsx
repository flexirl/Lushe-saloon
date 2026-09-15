'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ExpandingCTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!containerRef.current || !mediaRef.current || !cardRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 110%',
          end: 'top 0%',
          scrub: 1.5,
        },
      });

      // Expand image from 48% inset frame to 100% full-bleed
      tl.fromTo(
        mediaRef.current,
        {
          width: '52%',
          height: '65%',
          borderRadius: '24px',
        },
        {
          width: '100%',
          height: '100%',
          borderRadius: '0px',
          ease: 'power2.out',
          duration: 0.4,
        },
        0
      );

      // Card smoothly reveals and scales into focus
      tl.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.94,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'power2.out',
        },
        0.2
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100svh] overflow-hidden bg-espresso flex items-center justify-center"
      id="booking-cta"
    >
      {/* Fullscreen Viewport for Pinning */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Expanding Background Image Container */}
        <div
          ref={mediaRef}
          className="relative overflow-hidden shadow-2xl transition-all will-change-transform"
          style={{ width: '52%', height: '65%' }}
        >
          <Image
            src="/assets/lushe/interior/cta-desktop.png"
            alt="Lushè Beauty Studio warm illuminated interior"
            fill
            sizes="100vw"
            className="hidden md:block size-full object-cover object-center brightness-[0.75]"
            priority
          />
          <Image
            src="/assets/lushe/interior/cta-phone.png"
            alt="Lushè Beauty Studio warm illuminated interior"
            fill
            sizes="100vw"
            className="block md:hidden size-full object-cover object-center brightness-[0.75]"
            priority
          />

          {/* Luxury Warm Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/40 to-espresso/60" />
        </div>

        {/* Center Floating Editorial Booking Card */}
        <div
          ref={cardRef}
          className="absolute inset-0 flex items-center justify-center px-4 md:px-8 pointer-events-none z-10"
        >
          <div className="pointer-events-auto w-full max-w-2xl rounded-3xl bg-espresso/80 backdrop-blur-xl border border-champagne/30 p-8 md:p-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <a
              href="https://maps.app.goo.gl/ftPs1pUF8KcDYQz89"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans text-xs uppercase tracking-[0.35em] text-champagne font-medium mb-4 hover:text-ivory transition-colors cursor-pointer"
            >
              Sector 52 · Gurugram <ArrowUpRight className="inline-block mb-1 w-3 h-3" />
            </a>

            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-ivory uppercase tracking-wide leading-[1.05]">
              Book Your
              <br />
              <em className="italic text-blush">Visit</em>
            </h2>

            <p className="mt-5 font-sans text-sm md:text-base leading-relaxed text-ivory/80 max-w-lg mx-auto">
              Step into your beauty sanctuary — reserved appointments ensure your experience is peaceful, private, and personal.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/918796783680?text=Hi%20Lushè,%20I'd%20like%20to%20reserve%20an%20appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-champagne text-espresso text-xs font-semibold uppercase tracking-[0.16em] hover:bg-champagne/90 hover:scale-[1.02] transition-all shadow-lg"
              >
                <MessageCircle size={17} />
                <span>Reserve on WhatsApp</span>
              </a>

              <a
                href="tel:+918796783680"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-ivory/30 text-ivory text-xs font-semibold uppercase tracking-[0.16em] hover:bg-ivory/10 hover:border-ivory/60 transition-all"
              >
                <Phone size={16} />
                <span>Call Studio</span>
              </a>
            </div>

            <p className="mt-6 text-[0.7rem] uppercase tracking-widest text-ivory/50">
              Open Daily: 10:30 AM – 9:00 PM · Valet Available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
