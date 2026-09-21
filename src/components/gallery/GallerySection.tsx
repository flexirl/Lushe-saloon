'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  type GalleryCategory,
  type GalleryItem,
  getItemsByCategory,
} from '@/data/galleryData';
import GalleryTabs from './GalleryTabs';
import GalleryGrid from './GalleryGrid';
import GalleryLightbox from './GalleryLightbox';

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('happy-faces');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = getItemsByCategory(activeCategory);

  /** GSAP scroll-triggered reveals for header elements */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCategoryChange = useCallback((category: GalleryCategory) => {
    setActiveCategory(category);
  }, []);

  const handleItemClick = useCallback((_item: GalleryItem, index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const handleLightboxNavigate = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="gallery"
        className="bg-ivory px-5 py-20 text-espresso md:px-10 md:py-32 xl:px-16"
        aria-label="Gallery"
      >
        <div className="mx-auto max-w-[1500px]">
          {/* ── Section Header ── */}
          <div className="text-center">
            <p data-reveal className="eyebrow text-taupe">
              Gallery
            </p>
            <h2
              data-reveal
              className="mx-auto mt-6 max-w-3xl font-display text-[clamp(3rem,7vw,7rem)] font-light leading-[0.9] text-espresso"
            >
              Our{' '}
              <em className="italic text-blush">Artistry</em>
            </h2>
            <p
              data-reveal
              className="mx-auto mt-5 max-w-md font-body text-base leading-relaxed text-taupe md:text-lg"
            >
              Every look tells a story. Browse our curated collection of transformations,
              interiors, and creative nail art.
            </p>
          </div>

          {/* ── Category Tabs ── */}
          <GalleryTabs
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* ── Media Grid ── */}
          <GalleryGrid
            items={filteredItems}
            onItemClick={handleItemClick}
            animationKey={activeCategory}
          />

          {/* ── Instagram Follow CTA ── */}
          <div data-reveal className="mt-16 flex items-center justify-center gap-3 md:mt-20">
            <span className="text-champagne/60">—</span>
            <p className="font-body text-sm text-taupe md:text-base">
              Follow our journey on{' '}
              <a
                href="https://www.instagram.com/lushebeauty.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-espresso underline decoration-champagne/40 decoration-1 underline-offset-4 transition-colors duration-200 hover:text-blush hover:decoration-blush"
              >
                @lushebeauty.studio
              </a>
            </p>
            <span className="text-champagne/60">—</span>
          </div>
        </div>
      </section>

      {/* ── Lightbox (portal-level, above everything) ── */}
      <GalleryLightbox
        items={filteredItems}
        activeIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={handleLightboxClose}
        onNavigate={handleLightboxNavigate}
      />
    </>
  );
}
