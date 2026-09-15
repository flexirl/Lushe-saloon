'use client';

import { useState } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  ritual: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ananya Deshmukh',
    location: 'DLF Phase 5, Gurugram',
    ritual: 'Russian Gel Art & Hair Ritual',
    quote:
      'Lushè is a breath of fresh air. The arched mirrors, warm wood slatted walls, and peaceful ambiance immediately put you at ease. My Russian gel manicure lasted four full weeks without a single chip, and the hair gloss gave my hair incredible luster.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Meher Varma',
    location: 'Golf Course Road, Gurugram',
    ritual: 'Bespoke Hydrating Facial',
    quote:
      'Found my forever salon in Gurugram! The team takes time to thoroughly assess your skin rather than rushing through treatments. The bespoke facial left my complexion luminous and so nourished before my sister’s celebrations.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Pooja Singhania',
    location: 'Sector 52, Gurugram',
    ritual: 'Bridal Artistry Consultation',
    quote:
      'The bridal trial was an absolute dream. Every detail — from deep skin prep to the nuanced kohl waterline and satin lip finish — was executed with world-class precision. It felt unhurried, luxurious, and deeply personal.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Radhika Malhotra',
    location: 'Nirvana Country, Gurugram',
    ritual: 'Dimensional Color & Styling',
    quote:
      'Such an exceptionally curated studio. You feel like you’ve stepped into a private beauty suite in Milan. The hygiene, tea service, and attentiveness make it the finest salon experience in Delhi NCR.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);

  const active = TESTIMONIALS[activeIndex];

  return (
    <section
      id="testimonials"
      className="bg-cream/60 py-24 md:py-36 px-5 md:px-10 xl:px-16 border-t border-beige/40 text-espresso"
      aria-label="Client Testimonials & Stories"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <p className="eyebrow text-taupe">Reviews</p>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[0.9] text-espresso">
            What Our Clients{' '}
            <em className="italic text-blush font-normal">Say</em>
          </h2>
          <p className="mt-4 font-sans text-base text-taupe leading-relaxed">
            Real love from real guests
          </p>
        </div>

        {/* Main Testimonial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Active Featured Card */}
          <div className="lg:col-span-8 rounded-3xl bg-ivory p-8 md:p-14 border border-beige/60 shadow-lg relative overflow-hidden transition-all duration-500">
            <Quote
              size={90}
              className="absolute -top-4 -right-4 text-beige/25 pointer-events-none"
            />

            {/* Stars */}
            <div className="flex gap-1.5 mb-6" aria-label="5 out of 5 stars">
              {[...Array(active.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={17}
                  className="fill-champagne text-champagne"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-display text-xl md:text-3xl font-light text-espresso leading-relaxed italic">
              &ldquo;{active.quote}&rdquo;
            </blockquote>

            {/* Client Info */}
            <div className="mt-8 pt-6 border-t border-beige/40 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-sans text-base font-semibold text-espresso">
                  {active.name}
                </p>
                <p className="font-sans text-xs text-taupe uppercase tracking-wider mt-0.5">
                  {active.location} · <span className="text-blush font-medium">{active.ritual}</span>
                </p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="size-11 rounded-full border border-beige flex items-center justify-center text-espresso hover:bg-beige/30 transition-colors"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next testimonial"
                  className="size-11 rounded-full border border-beige flex items-center justify-center text-espresso hover:bg-beige/30 transition-colors"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Selectable List */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-3">
            {TESTIMONIALS.map((item, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-ivory border-champagne shadow-md translate-x-2'
                      : 'bg-cream/40 border-beige/40 hover:bg-ivory/60 hover:border-beige'
                  }`}
                >
                  <p className="font-sans text-xs font-semibold uppercase tracking-wider text-espresso">
                    {item.name}
                  </p>
                  <p className="font-sans text-[0.72rem] text-taupe mt-0.5">
                    {item.location}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Indicator Dots */}
        <div className="mt-8 flex justify-center gap-2 lg:hidden">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-8 bg-espresso' : 'w-2 bg-beige'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
