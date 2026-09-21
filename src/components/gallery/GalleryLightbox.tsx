'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import type { GalleryItem } from '@/data/galleryData';
import { useBooking } from '@/components/booking/BookingContext';

interface GalleryLightboxProps {
  items: GalleryItem[];
  activeIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({
  items,
  activeIndex,
  isOpen,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const { openBooking } = useBooking();

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const currentItem = items[activeIndex];
  const isVideo = currentItem?.type === 'video';

  /** Body scroll lock */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /** Entry/exit animation */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isOpen) {
      if (prefersReduced) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'power2.out' }
        );
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, scale: 0.92, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.1 }
        );
      });
      return () => ctx.revert();
    }
  }, [isOpen]);

  /** Animate content on item change */
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0.4, x: 0 },
        { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
      );
    });

    return () => ctx.revert();
  }, [activeIndex, isOpen]);

  /** Reset video state when item changes */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setIsMuted(true);

    // Auto-play videos (muted)
    if (isOpen && isVideo && videoRef.current) {
      const v = videoRef.current;
      const tryPlay = () => {
        v.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      };
      if (v.readyState >= 2) {
        tryPlay();
      } else {
        v.addEventListener('loadeddata', tryPlay, { once: true });
      }
    }
  }, [activeIndex, isOpen, isVideo]);

  /** Keyboard navigation */
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeIndex, items.length]);

  const goToPrev = useCallback(() => {
    const newIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    onNavigate(newIndex);
  }, [activeIndex, items.length, onNavigate]);

  const goToNext = useCallback(() => {
    const newIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    onNavigate(newIndex);
  }, [activeIndex, items.length, onNavigate]);

  /** Touch swipe handling */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0) goToPrev();
      else goToNext();
    }
  };

  /** Video controls */
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setProgress(
      videoRef.current.duration
        ? (videoRef.current.currentTime / videoRef.current.duration) * 100
        : 0
    );
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = ratio * videoRef.current.duration;
  };

  const handleBookThisLook = () => {
    onClose();
    setTimeout(() => {
      if (currentItem?.bookingCategory) {
        openBooking({ category: currentItem.bookingCategory });
      } else {
        openBooking();
      }
    }, 350);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen || !currentItem) return null;

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'interior': return 'Interior';
      case 'happy-faces': return 'Happy Faces';
      case 'nails': return 'Nail Art';
      case 'reels': return 'Reels';
      default: return cat;
    }
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery viewer"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 backdrop-blur-lg"
      onClick={handleBackdropClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close gallery viewer"
        className="absolute left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 text-ivory backdrop-blur-sm transition-all duration-200 hover:bg-ivory/20 md:left-6 md:top-6 md:h-12 md:w-12"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 md:h-6 md:w-6">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Counter + Category badge */}
      <div className="absolute right-4 top-4 z-50 flex items-center gap-3 md:right-6 md:top-6">
        <span className="rounded-full bg-blush/20 px-3 py-1 font-body text-xs font-medium text-blush backdrop-blur-sm">
          {getCategoryLabel(currentItem.category)}
        </span>
        <span className="font-body text-sm tabular-nums text-ivory/60">
          {activeIndex + 1} / {items.length}
        </span>
      </div>

      {/* Navigation arrows (desktop) */}
      <button
        onClick={(e) => { e.stopPropagation(); goToPrev(); }}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 z-50 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/10 text-ivory backdrop-blur-sm transition-all duration-200 hover:bg-ivory/20 md:flex"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); goToNext(); }}
        aria-label="Next image"
        className="absolute right-3 top-1/2 z-50 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/10 text-ivory backdrop-blur-sm transition-all duration-200 hover:bg-ivory/20 md:flex"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Main content area */}
      <div
        ref={contentRef}
        className="relative flex max-h-[90vh] max-w-[92vw] flex-col items-center gap-4 md:max-w-[85vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media container */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-xl md:rounded-2xl">
          {isVideo ? (
            <div className="relative">
              <video
                ref={videoRef}
                src={currentItem.src}
                muted={isMuted}
                playsInline
                loop
                className="max-h-[75vh] max-w-full rounded-xl object-contain md:rounded-2xl"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlay}
              />

              {/* Custom video controls */}
              <div className="absolute inset-x-0 bottom-0 rounded-b-xl bg-gradient-to-t from-espresso/80 to-transparent px-4 pb-3 pt-10 md:rounded-b-2xl md:px-6 md:pb-4">
                {/* Progress bar */}
                <div
                  className="mb-3 h-1 w-full cursor-pointer rounded-full bg-ivory/20"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full rounded-full bg-champagne transition-[width] duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center gap-4">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="flex h-8 w-8 items-center justify-center text-ivory transition-colors hover:text-champagne"
                  >
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5">
                        <path d="M8 5.14v13.72a1 1 0 001.5.86l11.2-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
                      </svg>
                    )}
                  </button>

                  {/* Time */}
                  <span className="font-body text-xs tabular-nums text-ivory/80">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>

                  <div className="flex-1" />

                  {/* Mute toggle */}
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="flex h-8 w-8 items-center justify-center text-ivory transition-colors hover:text-champagne"
                  >
                    {isMuted ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                        <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="23" y1="9" x2="17" y2="15" strokeLinecap="round" />
                        <line x1="17" y1="9" x2="23" y2="15" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                        <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" strokeLinecap="round" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Center play/pause overlay for video (tap) */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={togglePlay}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-espresso/60 text-ivory backdrop-blur-sm transition-all duration-200 hover:bg-espresso/80"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-8 w-8">
                      <path d="M8 5.14v13.72a1 1 0 001.5.86l11.2-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative flex items-center justify-center">
              <Image
                src={currentItem.src}
                alt={currentItem.alt}
                width={1200}
                height={1600}
                quality={90}
                className="max-h-[78vh] w-auto rounded-xl object-contain md:rounded-2xl"
                priority
              />
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleBookThisLook}
            className="flex items-center gap-2 rounded-full bg-champagne/90 px-5 py-2.5 font-body text-xs font-semibold tracking-wide text-espresso transition-all duration-300 hover:bg-champagne hover:shadow-lg hover:shadow-champagne/20 md:text-sm"
          >
            {currentItem.category === 'interior' || currentItem.category === 'happy-faces' ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
                Visit Us
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path
                    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Book This Look
              </>
            )}
          </button>
        </div>

        {/* Dot indicators (mobile) */}
        <div className="flex gap-1.5 md:hidden">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              aria-label={`Go to item ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'w-6 bg-champagne' : 'w-1.5 bg-ivory/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
