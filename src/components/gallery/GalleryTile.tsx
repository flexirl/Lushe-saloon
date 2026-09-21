'use client';

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import type { GalleryItem } from '@/data/galleryData';

interface GalleryTileProps {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}

export default function GalleryTile({ item, index, onClick }: GalleryTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const aspectClass = getAspectClass(item.aspect);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    // For videos: start muted preview after 500ms hover delay (desktop only)
    if (item.type === 'video' && videoRef.current) {
      hoverTimerRef.current = setTimeout(() => {
        videoRef.current?.play().catch(() => {});
      }, 500);
    }
  }, [item.type]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [item.type]);

  return (
    <button
      data-gallery-item
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative block w-full overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush ${aspectClass}`}
      aria-label={`View: ${item.title}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Shimmer placeholder */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-cream via-beige/30 to-cream transition-opacity duration-500 ${
          imageLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {item.type === 'image' ? (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={80}
          className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      ) : (
        <>
          {/* Video poster (static frame) */}
          <video
            ref={videoRef}
            src={item.src}
            muted
            playsInline
            loop
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            onLoadedData={() => setImageLoaded(true)}
          />

          {/* Play icon badge */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-full bg-espresso/60 backdrop-blur-sm transition-all duration-300 ${
                isHovering ? 'scale-110 bg-espresso/80' : ''
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="ml-0.5 h-6 w-6 text-ivory"
              >
                <path
                  d="M8 5.14v13.72a1 1 0 001.5.86l11.2-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </>
      )}

      {/* Hover overlay — "View" icon */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-espresso/0 transition-all duration-400 ${
          item.type === 'image' ? 'group-hover:bg-espresso/20' : ''
        }`}
      >
        {item.type === 'image' && (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory/90 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-espresso">
              <path
                d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>


      {/* Champagne border glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-champagne/0 transition-all duration-400 group-hover:ring-2 group-hover:ring-champagne/40" />
    </button>
  );
}

function getAspectClass(aspect: string): string {
  switch (aspect) {
    case '3:2':
      return 'aspect-[3/2]';
    case '4:5':
      return 'aspect-[4/5]';
    case '1:1':
      return 'aspect-square';
    case '9:16':
      return 'aspect-[9/16]';
    default:
      return 'aspect-square';
  }
}
