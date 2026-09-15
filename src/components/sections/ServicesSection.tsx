'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  name: string;
  price: string;
  note?: string;
  isNew?: boolean;
}

interface ServiceCategory {
  id: string;
  label: string;
  services: ServiceItem[];
  footnote?: string;
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'nails',
    label: 'Nails',
    services: [
      { name: 'Gel Nail Extension', price: '₹1,200' },
      { name: 'Acrylic Nail Extension', price: '₹1,500' },
      { name: 'Gel Polish', price: '₹600' },
      { name: 'Nail Refilling', price: '₹1,100', isNew: true },
      { name: 'Nail Repair', price: '₹200', note: 'Per Nail', isNew: true },
      { name: 'Gel Paint', price: '₹600' },
      { name: 'Gel Paint Removal', price: '₹250' },
      { name: 'Nail Extension Removal', price: '₹500' },
    ],
  },
  {
    id: 'nail-art',
    label: 'Nail Art',
    services: [
      { name: 'Chrome Art', price: '₹500' },
      { name: 'Cat Eye Art', price: '₹500' },
      { name: 'Ombre Art', price: '₹500' },
      { name: 'French Tips', price: '₹500' },
      { name: 'Glitter Art', price: '₹500' },
      { name: '3D Nail Art', price: '₹150', note: 'Per Finger' },
      { name: 'Custom Nail Art', price: '₹100', note: 'Per Finger' },
    ],
    footnote: 'All nail art prices are additional to the selected nail service.',
  },
  {
    id: 'women-hair',
    label: "Women's Hair",
    services: [
      { name: 'Hair Cut', price: '₹499' },
      { name: 'Hair Wash (Handwash)', price: '₹349' },
      { name: 'Normal Blow Dry', price: '₹299' },
      { name: 'Blow Dry (In/Out)', price: '₹349' },
      { name: 'Ironing / Curls', price: '₹499' },
      { name: 'Tong Curls', price: '₹499' },
      { name: 'Hair Do / Styling', price: '₹699' },
    ],
  },
  {
    id: 'hair-colour',
    label: 'Hair Colour',
    services: [
      { name: "Root Touch-Up — L'Oréal INOA", price: '₹1,199' },
      { name: "Root Touch-Up — L'Oréal Majirel", price: '₹1,099' },
      { name: 'Global Colour', price: '₹2,500' },
      { name: 'Balayage / Ombre', price: '₹6,000' },
      { name: 'Highlights (Full Head)', price: '₹6,000' },
      { name: 'Highlights (Crown)', price: '₹4,000' },
      { name: 'Highlights (Per Streak)', price: '₹300' },
    ],
  },
  {
    id: 'hair-treatments',
    label: 'Hair Treatments',
    services: [
      { name: 'Keratin', price: '₹3,500' },
      { name: 'Botox', price: '₹4,000' },
      { name: 'Nanoplastia', price: '₹5,000' },
      { name: 'Smoothing', price: '₹4,000' },
    ],
  },
  {
    id: 'head-massage',
    label: 'Head Massage',
    services: [
      { name: 'Coconut Oil', price: '₹499' },
      { name: 'Almond Oil', price: '₹499' },
      { name: 'Olive Oil', price: '₹599' },
    ],
  },
  {
    id: 'men-grooming',
    label: "Men's Grooming",
    services: [
      { name: 'Hair Cut', price: '₹299' },
      { name: 'Hair Wash & Style', price: '₹299' },
      { name: 'Hair Spa', price: '₹599' },
      { name: 'Beard Trimming', price: '₹199' },
      { name: 'Clean Shave', price: '₹199' },
      { name: 'Beard Colour', price: '₹499' },
      { name: "Hair Colour — L'Oréal INOA", price: '₹999' },
      { name: "Hair Colour — Majirel", price: '₹799' },
    ],
  },
  {
    id: 'skin-care',
    label: 'Skin Care',
    services: [
      { name: 'Hydra Facial', price: '₹1,999' },
      { name: 'Normal Facial', price: '₹999' },
      { name: 'Clean Up', price: '₹699' },
      { name: 'Normal De-Tan', price: '₹399' },
      { name: 'O+3 De-Tan', price: '₹699' },
      { name: 'Full Face Wax', price: '₹399' },
      { name: 'Manicure', price: '₹499' },
      { name: 'Pedicure', price: '₹599' },
    ],
  },
];

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState('nails');
  const category = SERVICE_CATEGORIES.find((c) => c.id === activeCategory) ?? SERVICE_CATEGORIES[0];

  return (
    <section
      id="services"
      className="bg-espresso px-5 py-24 text-ivory md:px-10 md:py-36 xl:px-16"
      aria-label="Services & Pricing"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Header */}
        <div className="grid gap-12 border-b border-ivory/20 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow text-ivory/60">What We Offer</p>
            <h2 className="mt-7 font-display text-[clamp(3.5rem,8vw,8.5rem)] font-light leading-[0.85] text-ivory">
              Our{' '}
              <em className="italic text-blush">Services</em>
            </h2>
          </div>

          <div className="flex items-end lg:col-span-4 lg:col-start-9">
            <p className="max-w-md text-base leading-relaxed text-ivory/70">
              Every ritual is unhurried and tailored just for you. Browse our full menu below
              and book directly on WhatsApp.
            </p>
          </div>
        </div>

        {/* Category Tab Bar */}
        <div className="mt-10 flex flex-wrap gap-2 md:gap-3">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-champagne text-espresso shadow-md'
                  : 'bg-ivory/10 text-ivory/70 hover:bg-ivory/15 hover:text-ivory'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Service List */}
        <div className="mt-10 flex flex-col divide-y divide-ivory/10">
          {category.services.map((service, idx) => (
            <div
              key={`${category.id}-${idx}`}
              className="group flex items-center justify-between py-5 md:py-6 px-2 md:px-4 transition-colors duration-200 hover:bg-ivory/[0.03] rounded-lg"
            >
              <div className="flex items-center gap-3 md:gap-5">
                <span className="font-sans text-xs text-ivory/30 w-6">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-light text-ivory group-hover:text-blush transition-colors">
                    {service.name}
                    {service.isNew && (
                      <span className="ml-2 inline-block px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider bg-champagne/20 text-champagne rounded-full">
                        New
                      </span>
                    )}
                  </h3>
                  {service.note && (
                    <p className="font-sans text-xs text-ivory/50 mt-0.5">{service.note}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-6 shrink-0">
                <span className="font-display text-lg md:text-xl font-light text-champagne">
                  {service.price}
                </span>
                <a
                  href={`https://wa.me/918796783680?text=${encodeURIComponent(
                    `Hi Lushè, I'd like to book ${service.name} (${service.price}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-champagne/70 hover:text-ivory transition-colors"
                >
                  <span>Book</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        {category.footnote && (
          <p className="mt-4 text-xs text-ivory/50 font-sans italic px-4">
            * {category.footnote}
          </p>
        )}

        {/* Bottom CTA */}
        <a
          href="https://wa.me/918796783680?text=Hi%20Lushè,%20I'd%20like%20to%20inquire%20about%20your%20complete%20service%20menu"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-16 flex items-center justify-between border-t border-b border-ivory/20 py-9 transition-colors hover:border-ivory/50"
        >
          <span className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-ivory group-hover:text-blush transition-colors">
            View all packages & pricing
          </span>
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-ivory/40 text-ivory transition-all duration-500 group-hover:rotate-45 group-hover:border-blush group-hover:text-blush">
            <ArrowUpRight size={22} />
          </span>
        </a>
      </div>
    </section>
  );
}
