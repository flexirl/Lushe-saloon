export interface NavLink {
  label: string;
  href: string;
}

export interface HeroLayer {
  src: string;
  alt: string;
  zDepth: number;
  parallaxSpeed: number;
  scale?: number;
}

export interface ScrollState {
  progress: number;
  isScrolled: boolean;
  direction: 'up' | 'down' | null;
}
