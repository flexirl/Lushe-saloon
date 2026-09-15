'use client';

import { useEffect, useState } from 'react';

interface UseScrollProgressOptions {
  threshold?: number;
}

interface UseScrollProgressReturn {
  progress: number;
  isScrolled: boolean;
  direction: 'up' | 'down' | null;
}

export function useScrollProgress({ threshold = 50 }: UseScrollProgressOptions = {}): UseScrollProgressReturn {
  const [state, setState] = useState<UseScrollProgressReturn>({
    progress: 0,
    isScrolled: false,
    direction: null,
  });

  useEffect(() => {
    let lastScroll = 0;

    function handleScroll() {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      const direction = scrollY > lastScroll ? 'down' : scrollY < lastScroll ? 'up' : null;
      lastScroll = scrollY;

      setState({
        progress,
        isScrolled: scrollY > threshold,
        direction,
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return state;
}
