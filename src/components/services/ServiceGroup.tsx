'use client';

import { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import ServiceList from './ServiceList';
import ServiceMenuImage from './ServiceMenuImage';
import CelebrationEffect from './CelebrationEffect';

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

interface ServiceGroupProps {
  groupId: string;
  title: string;
  categories: ServiceCategory[];
  isUnlocked: boolean;
  onPlayGame: () => void;
  onSkip: () => void;
  menuImage: string;
  menuImageAlt: string;
}

export default function ServiceGroup({
  groupId,
  title,
  categories,
  isUnlocked,
  onPlayGame,
  onSkip,
  menuImage,
  menuImageAlt,
}: ServiceGroupProps) {
  const [activeTab, setActiveTab] = useState(categories[0]?.id ?? '');
  const [celebrating, setCelebrating] = useState(false);

  const activeCategory = categories.find((c) => c.id === activeTab) ?? categories[0];

  /* Trigger celebration when freshly unlocked */
  const prevUnlockedRef = useState(false);
  if (isUnlocked && !prevUnlockedRef[0]) {
    prevUnlockedRef[0] = true;
    if (!celebrating) {
      setCelebrating(true);
      setTimeout(() => setCelebrating(false), 1500);
    }
  }

  return (
    <div className="relative" id={`group-${groupId}`}>
      {/* Celebration confetti */}
      <CelebrationEffect active={celebrating} />

      {/* Group header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-2xl md:text-3xl font-light text-ivory">
            {title}
          </h3>
          <span className="text-xs font-sans uppercase tracking-wider text-ivory/40">
            {categories.length} {categories.length === 1 ? 'category' : 'categories'}
          </span>
        </div>

        {/* Lock status */}
        <div className="flex items-center gap-2">
          {isUnlocked ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-champagne">
              <Unlock size={14} /> Unlocked
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ivory/40">
              <Lock size={14} /> Locked
            </span>
          )}
        </div>
      </div>

      {/* Category tabs (within this group) */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-champagne text-espresso shadow-md'
                  : 'bg-ivory/10 text-ivory/70 hover:bg-ivory/15 hover:text-ivory'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Service list */}
      <ServiceList
        services={activeCategory.services}
        categoryId={activeCategory.id}
        isUnlocked={isUnlocked}
      />

      {/* Footnote */}
      {activeCategory.footnote && (
        <p className="mt-3 text-xs text-ivory/50 font-sans italic px-4">
          * {activeCategory.footnote}
        </p>
      )}

      {/* Unlock button — shown when locked */}
      {!isUnlocked && (
        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={onPlayGame}
            className="group relative flex items-center gap-3 px-8 py-4 rounded-full border-2 border-champagne/50 bg-champagne/10 text-champagne font-semibold uppercase text-sm tracking-wider transition-all duration-500 hover:bg-champagne/20 hover:border-champagne hover:shadow-lg hover:shadow-champagne/10 cursor-pointer"
          >
            {/* Pulsing glow ring */}
            <span className="absolute inset-0 rounded-full animate-pulse bg-champagne/5" />
            <Lock size={16} className="relative z-10" />
            <span className="relative z-10">Play to Unlock Prices</span>
          </button>

          <button
            type="button"
            onClick={onSkip}
            className="text-xs text-ivory/30 hover:text-ivory/60 transition-colors underline underline-offset-2"
          >
            Just show prices
          </button>
        </div>
      )}

      {/* Rate card image — shown when unlocked */}
      <ServiceMenuImage
        src={menuImage}
        alt={menuImageAlt}
        visible={isUnlocked}
      />
    </div>
  );
}
