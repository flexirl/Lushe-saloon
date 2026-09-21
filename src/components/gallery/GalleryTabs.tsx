'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { type GalleryCategory, CATEGORY_TABS, getCategoryCount } from '@/data/galleryData';

interface GalleryTabsProps {
  activeCategory: GalleryCategory;
  onCategoryChange: (category: GalleryCategory) => void;
}

export default function GalleryTabs({ activeCategory, onCategoryChange }: GalleryTabsProps) {
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  /** Measure the active tab and position the pill indicator */
  const updatePill = useCallback(() => {
    const activeTab = tabRefs.current.get(activeCategory);
    const tabList = tabListRef.current;
    if (!activeTab || !tabList) return;

    const tabRect = activeTab.getBoundingClientRect();
    const listRect = tabList.getBoundingClientRect();

    setPillStyle({
      left: tabRect.left - listRect.left + tabList.scrollLeft,
      width: tabRect.width,
    });
  }, [activeCategory]);

  /** Check scroll fade indicators */
  const updateFades = useCallback(() => {
    const el = tabListRef.current;
    if (!el) return;
    setShowLeftFade(el.scrollLeft > 4);
    setShowRightFade(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    updatePill();
    updateFades();
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [updatePill, updateFades]);

  const handleTabClick = (key: GalleryCategory) => {
    onCategoryChange(key);

    // Scroll active tab into view on mobile
    const activeTab = tabRefs.current.get(key);
    activeTab?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <div className="relative mt-10 md:mt-14" data-reveal>
      {/* Fade edge masks (mobile horizontal scroll indicators) */}
      <div
        className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-ivory to-transparent transition-opacity duration-300 md:hidden ${
          showLeftFade ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-ivory to-transparent transition-opacity duration-300 md:hidden ${
          showRightFade ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Tab list container */}
      <div
        ref={tabListRef}
        role="tablist"
        aria-label="Gallery categories"
        className="relative flex gap-1 overflow-x-auto scrollbar-hide snap-x snap-mandatory md:justify-center md:overflow-visible"
        onScroll={updateFades}
      >
        {/* Animated pill indicator */}
        <div
          className="absolute bottom-0 top-0 z-0 rounded-full bg-cream transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          style={{
            left: `${pillStyle.left}px`,
            width: `${pillStyle.width}px`,
          }}
        />

        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.key;
          const count = getCategoryCount(tab.key);

          return (
            <button
              key={tab.key}
              ref={(el) => {
                if (el) tabRefs.current.set(tab.key, el);
              }}
              role="tab"
              id={`gallery-tab-${tab.key}`}
              aria-selected={isActive}
              aria-controls="gallery-panel"
              onClick={() => handleTabClick(tab.key)}
              className={`relative z-10 flex shrink-0 snap-center items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium tracking-wide transition-colors duration-300 md:px-6 md:py-3 md:text-base ${
                isActive
                  ? 'text-espresso'
                  : 'text-taupe hover:text-espresso'
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-2 py-0.5 font-body text-[11px] font-semibold tabular-nums transition-all duration-300 ${
                  isActive
                    ? 'bg-blush/20 text-blush'
                    : 'bg-beige/40 text-taupe'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
