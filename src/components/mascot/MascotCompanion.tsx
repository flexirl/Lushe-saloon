'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';

interface MascotSection {
  sectionId: string;
  image: string;
  bubble: string;
}

const MASCOT_SECTIONS: MascotSection[] = [
  { sectionId: 'top',           image: '/assets/lushe/mascot/welcome.png',       bubble: 'Hey there! Welcome to Lushè 🐾' },
  { sectionId: 'story',         image: '/assets/lushe/mascot/welcome.png',       bubble: 'Let me tell you our story! 💕' },
  { sectionId: 'artistry',      image: '/assets/lushe/mascot/pamper.png',        bubble: 'Time to get pampered! ✨' },
  { sectionId: 'services',      image: '/assets/lushe/mascot/nails.png',         bubble: 'Check out our services! 💅' },
  { sectionId: 'memberships',   image: '/assets/lushe/mascot/pamper.png',        bubble: 'Join the Lushè family! 🎀' },
  { sectionId: 'booking-cta',   image: '/assets/lushe/mascot/waiting.png',       bubble: "We can't wait to see you! 🐶" },
  { sectionId: 'testimonials',  image: '/assets/lushe/mascot/relax.png',         bubble: 'Our guests love it here! 💕' },
  { sectionId: 'gallery',       image: '/assets/lushe/mascot/relax.png',         bubble: 'Take a peek inside! 👀' },
  { sectionId: 'faq',           image: '/assets/lushe/mascot/questions.png',     bubble: 'Got questions? I got answers! 🤓' },
  { sectionId: 'visit',         image: '/assets/lushe/mascot/come_visit_us.png', bubble: 'Come say hi! We\'re waiting 🐾' },
];

const FOOTER_MASCOT: MascotSection = {
  sectionId: 'footer',
  image: '/assets/lushe/mascot/see_you_soon.png',
  bubble: 'See you soon! 👋',
};

export default function MascotCompanion() {
  const [activeMascot, setActiveMascot] = useState<MascotSection>(MASCOT_SECTIONS[0]);
  const [isVisible, setIsVisible] = useState(true);
  const [showBubble, setShowBubble] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSectionChange = useCallback((newMascot: MascotSection) => {
    setActiveMascot((prev) => {
      if (prev.sectionId === newMascot.sectionId) return prev;
      // Show bubble briefly on change
      setShowBubble(true);
      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
      bubbleTimeoutRef.current = setTimeout(() => setShowBubble(false), 4000);
      return newMascot;
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const triggers: ScrollTrigger[] = [];

    // Create a ScrollTrigger for each section
    MASCOT_SECTIONS.forEach((mascotSection) => {
      const element = document.getElementById(mascotSection.sectionId);
      if (!element) return;

      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => handleSectionChange(mascotSection),
        onEnterBack: () => handleSectionChange(mascotSection),
      });
      triggers.push(trigger);
    });

    // Footer detection
    const footer = document.querySelector('footer');
    if (footer) {
      const footerTrigger = ScrollTrigger.create({
        trigger: footer,
        start: 'top 70%',
        onEnter: () => handleSectionChange(FOOTER_MASCOT),
        onEnterBack: () => handleSectionChange(FOOTER_MASCOT),
      });
      triggers.push(footerTrigger);
    }

    // Auto-hide bubble after initial display
    bubbleTimeoutRef.current = setTimeout(() => setShowBubble(false), 5000);

    return () => {
      triggers.forEach((t) => t.kill());
      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    };
  }, [handleSectionChange]);

  // Idle floating animation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!containerRef.current || !isVisible) return;

    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        y: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="mascot-container"
      aria-label="Lushè mascot companion"
      role="complementary"
    >
      {/* Dismiss button */}
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="mascot-dismiss"
        aria-label="Hide mascot"
      >
        <X size={12} />
      </button>

      {/* Speech bubble */}
      <div className={`mascot-bubble ${showBubble ? 'mascot-bubble--visible' : ''}`}>
        <p>{activeMascot.bubble}</p>
        <div className="mascot-bubble-tail" />
      </div>

      {/* Mascot images with crossfade */}
      <div className="mascot-image-wrapper">
        {[...MASCOT_SECTIONS, FOOTER_MASCOT].map((section) => {
          // Deduplicate by image path
          return null; // We'll render unique images below
        })}
        {/* Render all unique mascot images, only the active one is visible */}
        {getUniqueImages([...MASCOT_SECTIONS, FOOTER_MASCOT]).map((imgPath) => (
          <div
            key={imgPath}
            className={`mascot-image ${activeMascot.image === imgPath ? 'mascot-image--active' : ''}`}
          >
            <Image
              src={imgPath}
              alt="Lushè salon mascot — a fluffy Shih Tzu dog"
              width={160}
              height={160}
              sizes="(max-width: 768px) 100px, 160px"
              className="mascot-img"
              priority={imgPath === '/assets/lushe/mascot/welcome.png'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Extract unique image paths to avoid rendering duplicates */
function getUniqueImages(sections: MascotSection[]): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const s of sections) {
    if (!seen.has(s.image)) {
      seen.add(s.image);
      unique.push(s.image);
    }
  }
  return unique;
}
