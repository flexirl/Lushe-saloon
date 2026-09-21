'use client';

import { useEffect } from 'react';
import { initLenis, destroyLenis } from '@/lib/smoothScroll';
import { BookingProvider } from '@/components/booking/BookingContext';
import BookingModal from '@/components/booking/BookingModal';
import Navbar from '@/components/navigation/Navbar';
import Hero from '@/components/hero/Hero';
import IntroSection from '@/components/sections/IntroSection';
import InteractiveRitualsSection from '@/components/sections/InteractiveRitualsSection';
import ServicesSection from '@/components/services/ServicesSection';
import MembershipSection from '@/components/sections/MembershipSection';
import ExpandingCTASection from '@/components/sections/ExpandingCTASection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import GallerySection from '@/components/gallery/GallerySection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/footer/Footer';
import MascotCompanion from '@/components/mascot/MascotCompanion';

export default function Home() {
  /* Initialize Lenis smooth scroll */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      initLenis();
    }
    return () => destroyLenis();
  }, []);

  return (
    <BookingProvider>
      <Navbar />
      <main>
        <Hero />
        <IntroSection />
        <InteractiveRitualsSection />
        <ServicesSection />
        <MembershipSection />
        <GallerySection />
        <ExpandingCTASection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <MascotCompanion />
      <BookingModal />
    </BookingProvider>
  );
}
