'use client';

import { useEffect, useRef } from 'react';
import { ArrowUpRight, Phone, MapPin, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function InstagramIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function ContactSection() {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="visit"
      className="bg-cream px-5 py-24 text-espresso md:px-10 md:py-36 xl:px-16"
      aria-label="Visit and Appointments"
    >
      <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-12">
        {/* Left Headline */}
        <div className="lg:col-span-7">
          <p data-reveal className="eyebrow text-taupe">
            Visit Us
          </p>
          <h2
            data-reveal
            className="mt-7 font-display text-[clamp(4rem,9vw,9rem)] font-light leading-[0.82] text-espresso"
          >
            Come{' '}
            <em className="italic text-blush">Visit</em>
          </h2>
          <p data-reveal className="mt-4 font-sans text-lg text-taupe">
            We'd love to see you
          </p>
        </div>

        {/* Right Info Stack */}
        <div data-reveal className="lg:col-span-5 lg:col-start-8 lg:pt-12">
          <div className="space-y-8 border-t border-beige/60 pt-8">
            <div>
              <p className="eyebrow text-taupe flex items-center gap-1.5">
                <MapPin size={13} className="text-blush" /> Find us
              </p>
              <p className="mt-3 text-xl font-display text-espresso font-normal group relative">
                <a
                  href="https://maps.app.goo.gl/ftPs1pUF8KcDYQz89"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-champagne transition-colors"
                >
                  Shop No. 79, 1st Floor, High St 52
                  <br />
                  <span className="text-sm font-sans text-taupe group-hover:text-champagne/80 transition-colors">
                    Sector 52, Gurugram, Haryana 122003
                  </span>
                </a>
              </p>
            </div>

            <div>
              <p className="eyebrow text-taupe flex items-center gap-1.5">
                <Phone size={13} className="text-blush" /> Appointments
              </p>
              <p className="mt-3 text-xl font-display text-espresso font-normal">
                +91 87967 83680
                <br />
                <span className="text-sm font-sans text-taupe">
                  Call or WhatsApp for reservations & inquiries
                </span>
              </p>
            </div>

            <div>
              <p className="eyebrow text-taupe flex items-center gap-1.5">
                <Clock size={13} className="text-blush" /> Studio hours
              </p>
              <p className="mt-3 text-xl font-display text-espresso font-normal">
                Monday – Sunday: 10:30 AM – 9:00 PM
                <br />
                <span className="text-sm font-sans text-taupe">
                  Walk-ins welcome based on stylist availability
                </span>
              </p>
            </div>
          </div>

          {/* Action buttons matching Lovable pill style */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/918796783680?text=Hi%20Lushè,%20I'd%20like%20to%20book%20an%20appointment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-espresso px-6 py-3 text-xs font-semibold uppercase tracking-wider text-espresso transition-all hover:bg-espresso hover:text-ivory"
            >
              <span>Book on WhatsApp</span>
              <ArrowUpRight size={14} />
            </a>

            <a
              href="https://instagram.com/lushe_beauty"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lushè Instagram"
              className="inline-flex size-11 items-center justify-center rounded-full border border-espresso text-espresso transition-all hover:bg-espresso hover:text-ivory"
            >
              <InstagramIcon size={17} />
            </a>

            <a
              href="tel:+918796783680"
              className="inline-flex items-center gap-2 rounded-full border border-beige px-6 py-3 text-xs font-semibold uppercase tracking-wider text-taupe transition-all hover:border-espresso hover:text-espresso"
            >
              Call Studio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
