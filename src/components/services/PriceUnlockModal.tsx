'use client';

import { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import ScratchCard from './games/ScratchCard';
import PopTheBubbles from './games/PopTheBubbles';
import SwipeBarberPole from './games/SwipeBarberPole';

type GroupId = 'nails' | 'womens' | 'mens';

interface PriceUnlockModalProps {
  groupId: GroupId;
  groupTitle: string;
  groupEmoji: string;
  onWin: () => void;
  onClose: () => void;
}

const GAME_MAP: Record<GroupId, React.ComponentType<{ onWin: () => void; onSkip: () => void }>> = {
  nails: ScratchCard,
  womens: PopTheBubbles,
  mens: SwipeBarberPole,
};

export default function PriceUnlockModal({
  groupId,
  groupTitle,
  groupEmoji,
  onWin,
  onClose,
}: PriceUnlockModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  /* ── GSAP entrance ── */
  useEffect(() => {
    if (!overlayRef.current || !cardRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(overlayRef.current, { opacity: 1 });
      gsap.set(cardRef.current, { opacity: 1, scale: 1, y: 0 });
      return;
    }

    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.92, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)', delay: 0.1 }
    );
  }, []);

  /* ── Escape to close ── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  /* ── Lock body scroll ── */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleWin = useCallback(() => {
    onWin();
  }, [onWin]);

  const GameComponent = GAME_MAP[groupId];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Unlock ${groupTitle} prices`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal card */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-md rounded-2xl bg-ivory px-6 py-8 shadow-2xl border border-beige/40"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 size-8 flex items-center justify-center rounded-full bg-cream hover:bg-beige/40 transition-colors text-espresso/60 hover:text-espresso"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-4xl block mb-2">{groupEmoji}</span>
          <h3 className="font-display text-2xl font-light text-espresso">
            Unlock <em className="italic text-blush">{groupTitle}</em> Prices
          </h3>
          <p className="font-sans text-xs text-taupe mt-1.5 uppercase tracking-wider">
            Play the mini-game below!
          </p>
        </div>

        {/* Game */}
        <GameComponent onWin={handleWin} onSkip={onClose} />
      </div>
    </div>
  );
}
