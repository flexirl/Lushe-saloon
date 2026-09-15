'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles, ArrowUpRight, MessageCircle } from 'lucide-react';

interface ServiceHotspot {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  whatsappMessage: string;
  position: {
    desktop: { top: string; left: string };
    mobile: { top: string; left: string };
  };
}

const SERVICE_HOTSPOTS: ServiceHotspot[] = [
  {
    id: 'hair-styling',
    number: '01',
    title: 'Hair Styling & Blowout',
    category: 'Hair',
    description:
      'Bouncy curls, sleek ironing, or a full hair-do — our stylists create the perfect look for any occasion. Starting from ₹299.',
    whatsappMessage: "Hi Lushè, I'd like to book a Hair Styling appointment.",
    position: {
      desktop: { top: '30%', left: '32%' },
      mobile: { top: '30%', left: '32%' },
    },
  },
  {
    id: 'facial-glow',
    number: '02',
    title: 'Facial & Skin Glow',
    category: 'Skin Care',
    description:
      'Hydra facials, clean-ups, and de-tan treatments that leave your skin dewy and radiant. Hydra Facial starting at ₹1,999.',
    whatsappMessage: "Hi Lushè, I'd like to book a Facial treatment.",
    position: {
      desktop: { top: '45%', left: '50%' },
      mobile: { top: '45%', left: '50%' },
    },
  },
  {
    id: 'nail-art',
    number: '03',
    title: 'Nail Art & Extensions',
    category: 'Nails',
    description:
      'Gel extensions, chrome art, 3D designs, and french tips — express yourself through stunning nail art. Extensions from ₹1,200.',
    whatsappMessage: "Hi Lushè, I'd like to book a Nail Art session.",
    position: {
      desktop: { top: '78%', left: '46%' },
      mobile: { top: '78%', left: '46%' },
    },
  },
  {
    id: 'hair-colour',
    number: '04',
    title: 'Hair Colour & Highlights',
    category: 'Colour',
    description:
      "Balayage, ombre, highlights, or a full global colour — using L'Oréal INOA & Majirel for salon-perfect results. Root touch-up from ₹1,099.",
    whatsappMessage: "Hi Lushè, I'd like to inquire about Hair Colour services.",
    position: {
      desktop: { top: '32%', left: '68%' },
      mobile: { top: '32%', left: '68%' },
    },
  },
  {
    id: 'head-massage',
    number: '05',
    title: 'Head & Scalp Massage',
    category: 'Relaxation',
    description:
      'Unwind with a relaxing coconut, almond, or olive oil head massage. Pure bliss starting at ₹499.',
    whatsappMessage: "Hi Lushè, I'd like to book a Head Massage.",
    position: {
      desktop: { top: '15%', left: '50%' },
      mobile: { top: '15%', left: '50%' },
    },
  },
  {
    id: 'treatments',
    number: '06',
    title: 'Keratin & Smoothing',
    category: 'Treatments',
    description:
      'Keratin, botox, nanoplastia, and smoothing treatments for silky, frizz-free hair that lasts. Starting from ₹3,500.',
    whatsappMessage: "Hi Lushè, I'd like to book a Hair Treatment session.",
    position: {
      desktop: { top: '42%', left: '72%' },
      mobile: { top: '42%', left: '72%' },
    },
  },
];

export default function InteractiveRitualsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SERVICE_HOTSPOTS[activeIndex];

  return (
    <section
      id="artistry"
      className="relative min-h-[90vh] lg:min-h-screen w-full overflow-hidden bg-cream text-espresso py-20 lg:py-0 flex items-center justify-center border-t border-beige/40"
      aria-label="Explore Our Salon Services"
    >
      {/* ── Background Ambient Marquee Typography ── */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center overflow-hidden select-none opacity-[0.06] z-0"
        aria-hidden="true"
      >
        <div className="whitespace-nowrap flex animate-marquee" style={{ animationDuration: '60s' }}>
          <span className="font-display text-[15vw] font-light uppercase tracking-[0.2em] leading-none text-charcoal">
            LUSHÈ · BEAUTY STUDIO · SALON SERVICES ·&nbsp;
          </span>
          <span className="font-display text-[15vw] font-light uppercase tracking-[0.2em] leading-none text-charcoal">
            LUSHÈ · BEAUTY STUDIO · SALON SERVICES ·&nbsp;
          </span>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="eyebrow text-taupe">Explore</p>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[0.9] text-espresso">
            Our <em className="italic text-blush">Salon</em>
          </h2>
          <p className="mt-4 font-sans text-base text-taupe leading-relaxed">
            Tap the pins to discover what we do best
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Salon model photo with hotspot markers */}
          <div className="relative w-full max-w-[460px] lg:max-w-[500px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-beige/50 bg-cream">
            <Image
              src="/assets/lushe/rituals/salon-model-portrait.jpg"
              alt="Model in Lushè salon with styled hair, glowing skin, and beautiful nail art"
              fill
              sizes="(max-width: 768px) 90vw, 500px"
              className="size-full object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
              priority
            />

            {/* Soft ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent pointer-events-none" />

            {/* Interactive Hotspot Markers */}
            {SERVICE_HOTSPOTS.map((hotspot, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={hotspot.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Explore service ${hotspot.number}: ${hotspot.title}`}
                  className={`group absolute -translate-x-1/2 -translate-y-1/2 size-10 md:size-12 rounded-full flex items-center justify-center transition-all duration-300 z-20 cursor-pointer ${isActive
                    ? 'bg-ivory text-espresso shadow-[0_0_24px_rgba(199,168,106,0.7)] scale-110 border-2 border-champagne'
                    : 'bg-espresso/55 backdrop-blur-md text-ivory/90 border border-ivory/40 hover:bg-espresso/80 hover:scale-105'
                    }`}
                  style={{
                    top: hotspot.position.desktop.top,
                    left: hotspot.position.desktop.left,
                  }}
                >
                  {/* Subtle pulse ring for active marker */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-champagne/30 pointer-events-none" />
                  )}
                  <span className="font-sans text-xs md:text-sm font-semibold tracking-wider">
                    {hotspot.number}
                  </span>
                </button>
              );
            })}

            {/* Micro hint on bottom image */}
            <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-espresso/60 backdrop-blur-sm text-[0.65rem] uppercase tracking-widest text-ivory/80">
                <Sparkles size={11} className="text-champagne" />
                Tap pins to explore services
              </span>
            </div>
          </div>

          {/* ── Service Detail Card ── */}
          <div className="w-full lg:max-w-[420px] flex flex-col justify-center">
            <div className="relative rounded-2xl bg-cream/80 backdrop-blur-md p-8 md:p-10 border border-beige/70 shadow-xl transition-all duration-500">
              {/* Category and Index badge */}
              <div className="flex items-center justify-between border-b border-beige/40 pb-4 mb-6">
                <span className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-taupe font-semibold">
                  {active.category}
                </span>
                <span className="font-display text-2xl font-light text-champagne">
                  {active.number} / 06
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl md:text-3xl font-light text-espresso leading-tight">
                {active.title}
              </h3>

              {/* Description */}
              <p className="mt-4 font-sans text-sm md:text-base leading-relaxed text-charcoal/80">
                {active.description}
              </p>

              {/* ── Two CTAs ── */}
              <div className="mt-8 pt-6 border-t border-beige/40 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* CTA 1: View Services — scrolls to #services */}
                <a
                  href="#services"
                  className="group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full border border-espresso text-espresso text-xs font-semibold uppercase tracking-[0.14em] hover:bg-espresso hover:text-ivory transition-all duration-300"
                >
                  <span>View Services</span>
                  <ArrowUpRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                {/* CTA 2: Book on WhatsApp */}
                <a
                  href={`https://wa.me/918796783680?text=${encodeURIComponent(active.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#8B7355] text-ivory text-xs font-semibold uppercase tracking-[0.14em] hover:bg-espresso transition-all duration-300 shadow-md"
                >
                  <MessageCircle size={14} />
                  <span>Book on WhatsApp</span>
                </a>
              </div>

              {/* Quick switcher dots */}
              <div className="mt-6 flex items-center justify-center gap-2 pt-2">
                {SERVICE_HOTSPOTS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Select service ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === activeIndex ? 'w-8 bg-espresso' : 'w-2 bg-beige hover:bg-taupe'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
