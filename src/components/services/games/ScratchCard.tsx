'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

interface ScratchCardProps {
  onWin: () => void;
  onSkip: () => void;
}

export default function ScratchCard({ onWin, onSkip }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawingRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [won, setWon] = useState(false);
  const hasWonRef = useRef(false);

  /* ── Setup canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    /* Golden gradient fill */
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, '#C7A86A');
    grad.addColorStop(0.3, '#D4B87A');
    grad.addColorStop(0.5, '#E8D5A8');
    grad.addColorStop(0.7, '#D4B87A');
    grad.addColorStop(1, '#C7A86A');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    /* Shimmer text */
    ctx.fillStyle = 'rgba(41, 35, 31, 0.3)';
    ctx.font = `600 ${Math.max(14, rect.width * 0.05)}px var(--font-dm-sans), sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH ME ✨', rect.width / 2, rect.height / 2);
  }, []);

  /* ── Scratch logic ── */
  const scratch = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas || hasWonRef.current) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const x = (clientX - rect.left) * dpr;
      const y = (clientY - rect.top) * dpr;
      const brushSize = 28 * dpr;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();

      /* Calculate scratch percentage */
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparent = 0;
      for (let i = 3; i < imgData.data.length; i += 4) {
        if (imgData.data[i] === 0) transparent++;
      }
      const pct = Math.round((transparent / (imgData.data.length / 4)) * 100);
      setProgress(pct);

      if (pct >= 55 && !hasWonRef.current) {
        hasWonRef.current = true;
        setWon(true);
        setTimeout(onWin, 600);
      }
    },
    [onWin]
  );

  const handleStart = useCallback(() => {
    isDrawingRef.current = true;
  }, []);

  const handleEnd = useCallback(() => {
    isDrawingRef.current = false;
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();
      const point =
        'touches' in e ? e.touches[0] : e;
      scratch(point.clientX, point.clientY);
    },
    [scratch]
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-sans text-sm text-espresso/70 text-center">
        Scratch the golden card to reveal nail prices!
      </p>

      <div
        ref={containerRef}
        className="relative w-full max-w-[320px] aspect-[3/2] rounded-xl overflow-hidden border-2 border-champagne/40 shadow-lg select-none touch-none"
      >
        {/* Underneath: revealed content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-ivory to-cream">
          <span className="text-5xl mb-2">💅</span>
          <p className="font-display text-xl font-light text-espresso">Prices Unlocked!</p>
          <p className="font-sans text-xs text-taupe mt-1">Nail services revealed</p>
        </div>

        {/* Scratch canvas on top */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 cursor-crosshair transition-opacity duration-500 ${won ? 'opacity-0' : ''}`}
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onMouseMove={handleMove}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          onTouchMove={handleMove}
        />
      </div>

      {/* Progress */}
      <div className="w-full max-w-[320px]">
        <div className="h-1.5 rounded-full bg-beige/40 overflow-hidden">
          <div
            className="h-full rounded-full bg-champagne transition-all duration-200 ease-out"
            style={{ width: `${Math.min(progress / 55 * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-taupe mt-1.5 text-center">
          {won ? '🎉 Unlocked!' : `${Math.min(Math.round(progress / 55 * 100), 99)}% — keep scratching!`}
        </p>
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
