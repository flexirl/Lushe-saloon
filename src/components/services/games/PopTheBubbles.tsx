'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface PopTheBubblesProps {
  onWin: () => void;
  onSkip: () => void;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  phase: number;
  popped: boolean;
  emoji: string;
}

const EMOJIS = ['✨', '💆‍♀️', '💇‍♀️', '💅', '🌸'];
const TARGET = 5;

export default function PopTheBubbles({ onWin, onSkip }: PopTheBubblesProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [popped, setPopped] = useState(0);
  const [won, setWon] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const wonRef = useRef(false);
  const nextIdRef = useRef(0);

  /* ── Spawn a bubble ── */
  const spawnBubble = useCallback((): Bubble => {
    const id = nextIdRef.current++;
    return {
      id,
      x: 10 + Math.random() * 80,
      y: 105 + Math.random() * 15,
      size: 42 + Math.random() * 18,
      speed: 8 + Math.random() * 6,
      drift: (Math.random() - 0.5) * 2,
      phase: Math.random() * Math.PI * 2,
      popped: false,
      emoji: EMOJIS[id % EMOJIS.length],
    };
  }, []);

  /* ── Initialize bubbles ── */
  useEffect(() => {
    const initial: Bubble[] = [];
    for (let i = 0; i < TARGET; i++) {
      const b = spawnBubble();
      b.y = 20 + Math.random() * 60;
      initial.push(b);
    }
    setBubbles(initial);
  }, [spawnBubble]);

  /* ── Animation loop ── */
  useEffect(() => {
    const animate = (time: number) => {
      if (wonRef.current) return;

      const delta = lastTimeRef.current ? (time - lastTimeRef.current) / 1000 : 0.016;
      lastTimeRef.current = time;

      setBubbles((prev) => {
        const updated = prev.map((b) => {
          if (b.popped) return b;
          const newY = b.y - b.speed * delta;
          const newX = b.x + Math.sin(time / 800 + b.phase) * b.drift * delta * 10;

          /* Respawn if off top */
          if (newY < -15) {
            return {
              ...spawnBubble(),
              id: b.id,
              emoji: b.emoji,
            };
          }

          return { ...b, x: Math.max(5, Math.min(95, newX)), y: newY };
        });
        return updated;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [spawnBubble]);

  /* ── Pop bubble ── */
  const popBubble = useCallback(
    (id: number) => {
      if (wonRef.current) return;

      setBubbles((prev) =>
        prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
      );

      const newCount = popped + 1;
      setPopped(newCount);

      if (newCount >= TARGET) {
        wonRef.current = true;
        setWon(true);
        setTimeout(onWin, 600);
      }
    },
    [popped, onWin]
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-sans text-sm text-espresso/70 text-center">
        Pop all 5 bubbles to unlock beauty prices!
      </p>

      {/* Game area */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[320px] aspect-square rounded-xl overflow-hidden border-2 border-blush/30 shadow-lg bg-gradient-to-b from-cream via-ivory to-cream select-none"
      >
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle, var(--blush) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />

        {/* Bubbles */}
        {bubbles.map((b) =>
          b.popped ? (
            <div
              key={b.id}
              className="absolute pointer-events-none animate-ping"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: b.size,
                height: b.size,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <span className="text-lg">✨</span>
            </div>
          ) : (
            <button
              key={b.id}
              type="button"
              onClick={() => popBubble(b.id)}
              className="absolute rounded-full flex items-center justify-center transition-transform duration-100 hover:scale-110 active:scale-90 cursor-pointer"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: b.size,
                height: b.size,
                transform: 'translate(-50%, -50%)',
                background:
                  'radial-gradient(circle at 35% 35%, rgba(201, 160, 142, 0.35), rgba(199, 168, 106, 0.2))',
                border: '1.5px solid rgba(201, 160, 142, 0.4)',
                boxShadow: 'inset 0 -4px 8px rgba(255,255,255,0.3), 0 2px 8px rgba(201,160,142,0.2)',
              }}
            >
              <span className="text-base select-none" style={{ fontSize: b.size * 0.45 }}>
                {b.emoji}
              </span>
            </button>
          )
        )}

        {/* Win overlay */}
        {won && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-ivory/80 backdrop-blur-sm animate-in fade-in duration-500">
            <span className="text-5xl mb-2">🌸</span>
            <p className="font-display text-xl font-light text-espresso">Prices Unlocked!</p>
          </div>
        )}
      </div>

      {/* Counter */}
      <div className="flex items-center gap-3">
        {Array.from({ length: TARGET }).map((_, i) => (
          <div
            key={i}
            className={`size-3 rounded-full transition-all duration-300 ${
              i < popped ? 'bg-blush scale-110' : 'bg-beige/40'
            }`}
          />
        ))}
        <span className="text-xs text-taupe ml-1">
          {won ? '🎉 Done!' : `${popped}/${TARGET}`}
        </span>
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
