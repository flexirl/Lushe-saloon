'use client';

import { useState, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useBooking } from '@/components/booking/BookingContext';
import ServiceGroup from './ServiceGroup';
import PriceUnlockModal from './PriceUnlockModal';

/* ═══════════════════════════════════════════════════
   Service Data — organised by group
   ═══════════════════════════════════════════════════ */

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

type GroupId = 'nails' | 'womens' | 'mens';

interface ServiceGroupData {
  groupId: GroupId;
  title: string;
  emoji: string;
  menuImage: string;
  menuImageAlt: string;
  categories: ServiceCategory[];
}

const SERVICE_GROUPS: ServiceGroupData[] = [
  {
    groupId: 'nails',
    title: 'Nails',
    emoji: '💅',
    menuImage: '/assets/lushe/services/nail-menu.jpg',
    menuImageAlt: 'Lushè Unisex Saloon — Nail Services & Nail Art rate card',
    categories: [
      {
        id: 'nails',
        label: 'Nail Services',
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
    ],
  },
  {
    groupId: 'womens',
    title: "Women's Services",
    emoji: '✨',
    menuImage: '/assets/lushe/services/womens-menu.jpg',
    menuImageAlt: "Lushè Unisex Saloon — Women's Hair Services rate card",
    categories: [
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
    ],
  },
  {
    groupId: 'mens',
    title: "Men's Grooming",
    emoji: '💈',
    menuImage: '/assets/lushe/services/mens-menu.jpg',
    menuImageAlt: "Lushè Unisex Saloon — Men's Grooming Services rate card",
    categories: [
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
    ],
  },
];

/* ═══════════════════════════════════════════════════
   ServicesSection Component
   ═══════════════════════════════════════════════════ */

export default function ServicesSection() {
  const { openBooking } = useBooking();
  const [unlockedGroups, setUnlockedGroups] = useState<Set<GroupId>>(new Set());
  const [activeGame, setActiveGame] = useState<GroupId | null>(null);

  const unlockGroup = useCallback((groupId: GroupId) => {
    setUnlockedGroups((prev) => new Set(prev).add(groupId));
    setActiveGame(null);
  }, []);

  const skipGroup = useCallback((groupId: GroupId) => {
    setUnlockedGroups((prev) => new Set(prev).add(groupId));
  }, []);

  const activeGroupData = activeGame
    ? SERVICE_GROUPS.find((g) => g.groupId === activeGame)
    : null;

  return (
    <>
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
                Every ritual is unhurried and tailored just for you. Unlock each
                menu with a quick mini-game, or browse freely.
              </p>
            </div>
          </div>

          {/* Service Groups */}
          <div className="mt-16 flex flex-col gap-20">
            {SERVICE_GROUPS.map((group) => (
              <ServiceGroup
                key={group.groupId}
                groupId={group.groupId}
                title={group.title}
                categories={group.categories}
                isUnlocked={unlockedGroups.has(group.groupId)}
                onPlayGame={() => setActiveGame(group.groupId)}
                onSkip={() => skipGroup(group.groupId)}
                menuImage={group.menuImage}
                menuImageAlt={group.menuImageAlt}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <button
            type="button"
            onClick={() => openBooking()}
            className="group mt-20 flex w-full items-center justify-between border-t border-b border-ivory/20 py-9 text-left transition-colors hover:border-ivory/50 cursor-pointer"
          >
            <span className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-ivory group-hover:text-blush transition-colors">
              Book your appointment or package
            </span>
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-ivory/40 text-ivory transition-all duration-500 group-hover:rotate-45 group-hover:border-blush group-hover:text-blush">
              <ArrowUpRight size={22} />
            </span>
          </button>
        </div>
      </section>

      {/* Game Modal — rendered outside the section for proper z-indexing */}
      {activeGame && activeGroupData && (
        <PriceUnlockModal
          groupId={activeGame}
          groupTitle={activeGroupData.title}
          groupEmoji={activeGroupData.emoji}
          onWin={() => unlockGroup(activeGame)}
          onClose={() => {
            skipGroup(activeGame);
          }}
        />
      )}
    </>
  );
}
