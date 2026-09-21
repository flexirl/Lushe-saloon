'use client';

import { useEffect, useState } from 'react';

interface CelebrationEffectProps {
  active: boolean;
}

const PARTICLE_COUNT = 14;

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
  delay: number;
  rotation: number;
}

const COLORS = [
  'var(--champagne)',
  'var(--blush)',
  'var(--beige)',
  '#E8D5A8',
  '#D4B87A',
  'var(--ivory)',
];

export default function CelebrationEffect({ active }: CelebrationEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;

    const generated: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 20,
      y: 50 + (Math.random() - 0.5) * 10,
      angle: (360 / PARTICLE_COUNT) * i + (Math.random() - 0.5) * 30,
      distance: 60 + Math.random() * 100,
      size: 4 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 0.15,
      rotation: Math.random() * 720 - 360,
    }));

    setParticles(generated);
    setVisible(true);

    const timer = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(timer);
  }, [active]);

  if (!visible || particles.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden="true">
      {particles.map((p) => {
        const radians = (p.angle * Math.PI) / 180;
        const endX = Math.cos(radians) * p.distance;
        const endY = Math.sin(radians) * p.distance;

        return (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              animation: `confetti-burst 1.2s ${p.delay}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
              '--end-x': `${endX}px`,
              '--end-y': `${endY}px`,
              '--end-rotation': `${p.rotation}deg`,
              opacity: 0,
            } as React.CSSProperties}
          />
        );
      })}

      <style jsx>{`
        @keyframes confetti-burst {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(0);
            opacity: 1;
          }
          20% {
            opacity: 1;
            transform: translate(
                calc(var(--end-x) * 0.3),
                calc(var(--end-y) * 0.3)
              )
              rotate(calc(var(--end-rotation) * 0.3))
              scale(1.2);
          }
          100% {
            transform: translate(var(--end-x), calc(var(--end-y) + 30px))
              rotate(var(--end-rotation))
              scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
