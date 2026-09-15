'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import gsap from 'gsap';

const navItems = [
  { label: 'Story', href: '#story' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit', href: '#visit' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  /* GSAP stagger animation for mobile menu items */
  useEffect(() => {
    if (!menuOpen || !mobileNavRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const links = mobileNavRef.current.querySelectorAll('[data-mobile-link]');
    const cta = mobileNavRef.current.querySelector('[data-mobile-cta]');
    const footer = mobileNavRef.current.querySelector('[data-mobile-footer]');

    const ctx = gsap.context(() => {
      gsap.from(links, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.15,
        ease: 'power3.out',
      });
      if (cta) {
        gsap.from(cta, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          delay: 0.45,
          ease: 'power3.out',
        });
      }
      if (footer) {
        gsap.from(footer, {
          opacity: 0,
          duration: 0.6,
          delay: 0.55,
          ease: 'power2.out',
        });
      }
    }, mobileNavRef);

    return () => ctx.revert();
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-600 ${
          scrolled || menuOpen
            ? 'border-b border-beige/40 bg-cream/92 text-espresso backdrop-blur-lg shadow-xs'
            : 'text-ivory'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 md:h-24 md:px-10 xl:px-16">
          {/* Boxed outline logo badge */}
          <a
            href="#top"
            className={`font-display text-sm md:text-base font-normal uppercase tracking-[0.22em] border px-3.5 py-1 transition-all duration-500 hover:opacity-80 ${
              scrolled || menuOpen
                ? 'border-espresso/30'
                : 'border-ivory/50'
            }`}
            aria-label="LUSHÈ home"
          >
            Lushè
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-10 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link text-xs font-medium uppercase tracking-[0.15em] text-current"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Book now */}
          <div className="flex items-center gap-4">
            <a
              href="#visit"
              className="book-link hidden text-xs font-semibold uppercase sm:inline-flex items-center gap-1.5 group"
            >
              Book now{' '}
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`inline-flex size-10 items-center justify-center rounded-full border lg:hidden transition-colors duration-500 ${
                scrolled || menuOpen
                  ? 'border-espresso/35'
                  : 'border-ivory/35'
              }`}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      <div
        ref={mobileNavRef}
        className={`fixed inset-0 z-40 flex flex-col bg-ivory px-6 pt-28 transition-all duration-500 lg:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex w-full flex-col h-full" aria-label="Mobile navigation">
          <div className="flex flex-col">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
                data-mobile-link
                className="flex items-center justify-between border-b border-border py-5 font-display text-4xl uppercase text-espresso hover:text-blush transition-colors"
              >
                <span>{item.label}</span>
                <span className="font-sans text-xs text-taupe font-normal">0{index + 1}</span>
              </a>
            ))}
          </div>

          <div className="mt-8" data-mobile-cta>
            <a
              href="#visit"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 border border-espresso px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-espresso hover:bg-espresso hover:text-ivory transition-colors"
            >
              Book now <ArrowUpRight size={14} />
            </a>
          </div>

          <p data-mobile-footer className="mt-auto pb-10 text-xs uppercase tracking-widest text-taupe">
            Sector 52 · Gurugram
          </p>
        </nav>
      </div>
    </>
  );
}
