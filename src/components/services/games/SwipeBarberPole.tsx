'use client';

import { useState, useRef, useCallback } from 'react';

interface SwipeBarberPoleProps {
  onWin: () => void;
  onSkip: () => void;
}

export default function SwipeBarberPole({ onWin, onSkip }: SwipeBarberPoleProps) {
  const [progress, setProgress] = useState(0);
  const [won, setWon] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const wonRef = useRef(false);

  const updateProgress = useCallback(
    (clientY: number) => {
      if (!trackRef.current || wonRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const relY = clientY - rect.top;
      const pct = Math.max(0, Math.min(100, (relY / rect.height) * 100));
      setProgress(pct);

      if (pct >= 95 && !wonRef.current) {
        wonRef.current = true;
        setWon(true);
        setProgress(100);
        setTimeout(onWin, 600);
      }
    },
    [onWin]
  );

  const handleStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      isDraggingRef.current = true;
      const point = 'touches' in e ? e.touches[0] : e;
      updateProgress(point.clientY);
    },
    [updateProgress]
  );

  const handleMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      const point = 'touches' in e ? e.touches[0] : e;
      updateProgress(point.clientY);
    },
    [updateProgress]
  );

  const handleEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-sans text-sm text-espresso/70 text-center">
        Swipe the handle down the barber pole!
      </p>

      <div className="flex items-center gap-6">
        {/* Barber Pole Track */}
        <div
          ref={trackRef}
          className="relative w-14 h-64 sm:h-72 rounded-full overflow-hidden border-2 border-espresso/20 shadow-inner cursor-grab active:cursor-grabbing select-none touch-none"
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          style={{
            background: `repeating-linear-gradient(
              -45deg,
              #FFFFFF 0px,
              #FFFFFF 8px,
              #C9423E 8px,
              #C9423E 16px,
              #FFFFFF 16px,
              #FFFFFF 24px,
              #3B6CB4 24px,
              #3B6CB4 32px
            )`,
            backgroundSize: '100% 45px',
            backgroundPosition: `0 ${progress * -0.5}px`,
          }}
        >
          {/* Progress fill overlay */}
          <div
            className="absolute inset-x-0 top-0 bg-champagne/25 backdrop-blur-[1px] transition-all duration-75 ease-out"
            style={{ height: `${progress}%` }}
          />

          {/* Draggable handle */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 size-11 rounded-full border-3 flex items-center justify-center text-lg shadow-lg transition-transform duration-75 ${
              won
                ? 'bg-champagne border-champagne/60 scale-110'
                : 'bg-ivory border-espresso/30 hover:scale-105'
            }`}
            style={{
              top: `calc(${progress}% - 22px)`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            {won ? '🎉' : '💈'}
          </div>
        </div>

        {/* Visual indicator */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-taupe font-semibold">
            {won ? 'Unlocked!' : 'Drag down'}
          </span>

          <div className="flex flex-col gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-8 h-1.5 rounded-full transition-all duration-300 ${
                  progress >= (i + 1) * 20 ? 'bg-champagne' : 'bg-beige/30'
                }`}
              />
            ))}
          </div>

          <span className="text-xs text-taupe">
            {won ? '🎉 Done!' : `${Math.round(progress)}%`}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onSkip}
        className="text-xs text-taupe/60 hover:text-taupe transition-colors underline underline-offset-2"
      >
        Just show prices
      </button>
    </div>
  );
}
