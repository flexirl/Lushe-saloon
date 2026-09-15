'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { NavLink } from '@/types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !linksRef.current) return;

    const overlay = overlayRef.current;
    const linkElements = linksRef.current.querySelectorAll('.mobile-link');

    if (isOpen) {
      gsap.set(overlay, { display: 'flex' });
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
      gsap.fromTo(
        linkElements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.15,
        }
      );
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
        },
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 flex-col items-center justify-center"
      style={{
        display: 'none',
        opacity: 0,
        backgroundColor: 'var(--cream)',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <nav ref={linksRef} className="flex flex-col items-center gap-6">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="mobile-link font-serif"
            onClick={onClose}
            style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 300,
              color: 'var(--espresso)',
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              transition: `color var(--duration-normal) var(--ease-out-quad)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--champagne)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--espresso)';
            }}
          >
            {link.label}
          </a>
        ))}

        {/* ── CTA ── */}
        <div className="mobile-link mt-8">
          <a
            href="#book"
            className="btn-primary"
            onClick={onClose}
          >
            <span>Book Appointment</span>
          </a>
        </div>

        {/* ── Contact Info ── */}
        <div
          className="mobile-link mt-6 font-sans text-center"
          style={{
            fontSize: '0.75rem',
            color: 'var(--taupe)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <p>Sector 52, Gurugram</p>
          <p className="mt-1">India</p>
        </div>
      </nav>
    </div>
  );
}
