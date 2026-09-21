'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import type { GalleryItem } from '@/data/galleryData';
import GalleryTile from './GalleryTile';

interface GalleryGridProps {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem, index: number) => void;
  animationKey: string;
}

const DESKTOP_VISIBLE = 9;
const MOBILE_VISIBLE = 6;

export default function GalleryGrid({ items, onItemClick, animationKey }: GalleryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prevKeyRef = useRef(animationKey);

  const visibleCount = isMobile ? MOBILE_VISIBLE : DESKTOP_VISIBLE;
  const displayItems = isExpanded ? items : items.slice(0, visibleCount);
  const hasMore = items.length > visibleCount;
  const remainingCount = items.length - visibleCount;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /** Reset expanded state when category changes */
  useEffect(() => {
    setIsExpanded(false);
  }, [animationKey]);

  /** Animate items in when category changes or items expand */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const grid = gridRef.current;
    if (!grid) return;

    const tileEls = grid.querySelectorAll('[data-gallery-item]');
    if (tileEls.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        tileEls,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          clearProps: 'transform',
        }
      );
    }, grid);

    prevKeyRef.current = animationKey;

    return () => ctx.revert();
  }, [animationKey, isExpanded]);

  const handleExpandToggle = useCallback(() => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      // Collapse: scroll back to top of grid smoothly
      const grid = gridRef.current;
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Delay collapse to let scroll happen
        setTimeout(() => setIsExpanded(false), 400);
      } else {
        setIsExpanded(false);
      }
    }
  }, [isExpanded]);

  return (
    <div>
      {/* Grid */}
      <div
        ref={gridRef}
        id="gallery-panel"
        role="tabpanel"
        aria-labelledby={`gallery-tab-${animationKey}`}
        className="mt-8 grid grid-cols-2 gap-3 md:mt-12 md:grid-cols-3 md:gap-4 lg:gap-5"
      >
        {displayItems.map((item, idx) => (
          <GalleryTile
            key={item.id}
            item={item}
            index={idx}
            onClick={() => onItemClick(item, isExpanded ? idx : idx)}
          />
        ))}
      </div>

      {/* Expand / Collapse Button */}
      {hasMore && (
        <div className="mt-8 flex justify-center md:mt-12">
          <button
            onClick={handleExpandToggle}
            className="group flex items-center gap-3 rounded-full border border-beige/60 bg-cream/50 px-7 py-3.5 font-body text-sm font-medium tracking-wide text-espresso backdrop-blur-sm transition-all duration-300 hover:border-champagne/60 hover:bg-cream hover:shadow-lg hover:shadow-champagne/10"
          >
            {isExpanded ? (
              <>
                Show Less
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5">
                  <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            ) : (
              <>
                Explore More Works
                <span className="rounded-full bg-blush/15 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-blush">
                  +{remainingCount}
                </span>
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
