'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X, Send, Phone } from 'lucide-react';
import gsap from 'gsap';
import { useBooking } from './BookingContext';

/* ═══════════════════════════════════════════════════
   Service data for the booking form
   ═══════════════════════════════════════════════════ */

interface ServiceOption {
  name: string;
  price: string;
}

interface CategoryOption {
  id: string;
  label: string;
  group: string;
  services: ServiceOption[];
}

const BOOKING_CATEGORIES: CategoryOption[] = [
  {
    id: 'nails',
    label: 'Nail Services',
    group: 'Nails',
    services: [
      { name: 'Gel Nail Extension', price: '₹1,200' },
      { name: 'Acrylic Nail Extension', price: '₹1,500' },
      { name: 'Gel Polish', price: '₹600' },
      { name: 'Nail Refilling', price: '₹1,100' },
      { name: 'Nail Repair', price: '₹200' },
      { name: 'Gel Paint', price: '₹600' },
      { name: 'Gel Paint Removal', price: '₹250' },
      { name: 'Nail Extension Removal', price: '₹500' },
    ],
  },
  {
    id: 'nail-art',
    label: 'Nail Art',
    group: 'Nails',
    services: [
      { name: 'Chrome Art', price: '₹500' },
      { name: 'Cat Eye Art', price: '₹500' },
      { name: 'Ombre Art', price: '₹500' },
      { name: 'French Tips', price: '₹500' },
      { name: 'Glitter Art', price: '₹500' },
      { name: '3D Nail Art', price: '₹150/finger' },
      { name: 'Custom Nail Art', price: '₹100/finger' },
    ],
  },
  {
    id: 'women-hair',
    label: "Women's Hair",
    group: "Women's Services",
    services: [
      { name: 'Hair Cut', price: '₹499' },
      { name: 'Hair Wash (Handwash)', price: '₹349' },
      { name: 'Normal Blow Dry', price: '₹299' },
      { name: 'Blow Dry (In/Out)', price: '₹349' },
      { name: 'Ironing / Curls', price: '₹499' },
      { name: 'Tong Curls', price: '₹499' },
      { name: 'Hair Do / Styling', price: '₹699' },
    ],
  },
  {
    id: 'hair-colour',
    label: 'Hair Colour',
    group: "Women's Services",
    services: [
      { name: "Root Touch-Up — L'Oréal INOA", price: '₹1,199' },
      { name: "Root Touch-Up — L'Oréal Majirel", price: '₹1,099' },
      { name: 'Global Colour', price: '₹2,500' },
      { name: 'Balayage / Ombre', price: '₹6,000' },
      { name: 'Highlights (Full Head)', price: '₹6,000' },
      { name: 'Highlights (Crown)', price: '₹4,000' },
      { name: 'Highlights (Per Streak)', price: '₹300' },
    ],
  },
  {
    id: 'hair-treatments',
    label: 'Hair Treatments',
    group: "Women's Services",
    services: [
      { name: 'Keratin', price: '₹3,500' },
      { name: 'Botox', price: '₹4,000' },
      { name: 'Nanoplastia', price: '₹5,000' },
      { name: 'Smoothing', price: '₹4,000' },
    ],
  },
  {
    id: 'head-massage',
    label: 'Head Massage',
    group: "Women's Services",
    services: [
      { name: 'Coconut Oil', price: '₹499' },
      { name: 'Almond Oil', price: '₹499' },
      { name: 'Olive Oil', price: '₹599' },
    ],
  },
  {
    id: 'skin-care',
    label: 'Skin Care',
    group: "Women's Services",
    services: [
      { name: 'Hydra Facial', price: '₹1,999' },
      { name: 'Normal Facial', price: '₹999' },
      { name: 'Clean Up', price: '₹699' },
      { name: 'Normal De-Tan', price: '₹399' },
      { name: 'O+3 De-Tan', price: '₹699' },
      { name: 'Full Face Wax', price: '₹399' },
      { name: 'Manicure', price: '₹499' },
      { name: 'Pedicure', price: '₹599' },
    ],
  },
  {
    id: 'men-grooming',
    label: "Men's Grooming",
    group: "Men's Grooming",
    services: [
      { name: 'Hair Cut', price: '₹299' },
      { name: 'Hair Wash & Style', price: '₹299' },
      { name: 'Hair Spa', price: '₹599' },
      { name: 'Beard Trimming', price: '₹199' },
      { name: 'Clean Shave', price: '₹199' },
      { name: 'Beard Colour', price: '₹499' },
      { name: "Hair Colour — L'Oréal INOA", price: '₹999' },
      { name: "Hair Colour — Majirel", price: '₹799' },
      { name: 'D-Tan Pack', price: '₹399' },
      { name: 'Face Clean-Up', price: '₹499' },
      { name: 'Charcoal Face Mask', price: '₹399' },
      { name: 'Head Massage', price: '₹299' },
      { name: 'Manicure', price: '₹399' },
      { name: 'Pedicure', price: '₹499' },
    ],
  },
  {
    id: 'memberships',
    label: 'Studio Memberships',
    group: 'Memberships',
    services: [
      { name: 'Silver Tier Membership', price: '₹5,000' },
      { name: 'Gold Tier Membership', price: '₹10,000' },
      { name: 'Diamond Tier Membership', price: '₹20,000' },
    ],
  },
];

const TIME_SLOTS = ['Morning (10:30 AM – 1 PM)', 'Afternoon (1 PM – 5 PM)', 'Evening (5 PM – 9 PM)'];

const WHATSAPP_NUMBER = '918796783680';

/* ═══════════════════════════════════════════════════
   BookingModal Component
   ═══════════════════════════════════════════════════ */

export default function BookingModal() {
  const { isOpen, preselect, closeBooking } = useBooking();

  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  /* ── Form state ── */
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ── Derive groups for the dropdown ── */
  const groups = useMemo(() => {
    const map = new Map<string, CategoryOption[]>();
    BOOKING_CATEGORIES.forEach((cat) => {
      const existing = map.get(cat.group) ?? [];
      existing.push(cat);
      map.set(cat.group, existing);
    });
    return map;
  }, []);

  /* ── Active category services ── */
  const activeCategory = BOOKING_CATEGORIES.find((c) => c.id === selectedCategory);

  /* ── Dynamic services list ensuring preselected service is visible ── */
  const availableServices = useMemo(() => {
    if (!activeCategory) return [];
    const list = [...activeCategory.services];
    selectedServices.forEach((svc) => {
      if (!list.some((s) => s.name.toLowerCase() === svc.toLowerCase())) {
        list.unshift({ name: svc, price: 'Selected' });
      }
    });
    return list;
  }, [activeCategory, selectedServices]);

  /* ── Handle preselect when modal opens ── */
  useEffect(() => {
    if (!isOpen) return;

    /* Reset form */
    setName('');
    setPhone('');
    setPreferredDate('');
    setPreferredTime('');
    setMessage('');
    setErrors({});
    setSelectedServices(new Set());

    if (preselect?.category) {
      /* Find matching category by id or group name */
      const matchedCat = BOOKING_CATEGORIES.find(
        (c) =>
          c.id === preselect.category ||
          c.group.toLowerCase().includes(preselect.category?.toLowerCase() ?? '') ||
          c.label.toLowerCase().includes(preselect.category?.toLowerCase() ?? '')
      );
      if (matchedCat) {
        setSelectedCategory(matchedCat.id);
      }
    } else {
      setSelectedCategory('');
    }

    if (preselect?.service) {
      const targetService = preselect.service;
      const lowerSvc = targetService.toLowerCase();
      setSelectedServices(new Set([targetService]));

      /* Also auto-detect category if not set */
      if (!preselect.category) {
        const matchedCat = BOOKING_CATEGORIES.find((c) =>
          c.services.some(
            (s) => {
              const lowerName = s.name.toLowerCase();
              return (
                lowerName === lowerSvc ||
                lowerSvc.includes(lowerName) ||
                lowerName.includes(lowerSvc)
              );
            }
          )
        );
        if (matchedCat) {
          setSelectedCategory(matchedCat.id);
        } else {
          const keywordCat = BOOKING_CATEGORIES.find(
            (c) =>
              lowerSvc.includes(c.group.toLowerCase()) ||
              lowerSvc.includes(c.label.toLowerCase()) ||
              (lowerSvc.includes('nail') && c.id === 'nails') ||
              (lowerSvc.includes('hair') && c.id === 'women-hair') ||
              (lowerSvc.includes('facial') && c.id === 'skin-care') ||
              (lowerSvc.includes('skin') && c.id === 'skin-care') ||
              (lowerSvc.includes('massage') && c.id === 'head-massage') ||
              (lowerSvc.includes('membership') && c.id === 'memberships')
          );
          if (keywordCat) {
            setSelectedCategory(keywordCat.id);
          }
        }
      }
    }
  }, [isOpen, preselect]);

  /* ── GSAP entrance ── */
  useEffect(() => {
    if (!isOpen || !overlayRef.current || !cardRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(overlayRef.current, { opacity: 1 });
      gsap.set(cardRef.current, { opacity: 1, scale: 1, y: 0 });
      return;
    }

    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.95, y: 24 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.3)', delay: 0.1 }
    );
  }, [isOpen]);

  /* ── Escape to close ── */
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBooking();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, closeBooking]);

  /* ── Body scroll lock ── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* ── Toggle service ── */
  const toggleService = useCallback((serviceName: string) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(serviceName)) {
        next.delete(serviceName);
      } else {
        next.add(serviceName);
      }
      return next;
    });
  }, []);

  /* ── Validate and submit ── */
  const handleSubmit = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Please enter your name';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Please enter a valid phone number';
    if (selectedServices.size === 0) newErrors.services = 'Please select at least one service';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    /* Build the WhatsApp message */
    const groupName = activeCategory?.group ?? 'General';
    const serviceList = Array.from(selectedServices)
      .map((s) => `• ${s}`)
      .join('\n');

    const dateStr = preferredDate
      ? new Date(preferredDate).toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Flexible';

    const timeStr = preferredTime || 'Any available slot';

    const lines = [
      `Hello Lushè Unisex Saloon,`,
      ``,
      `I'd like to request an appointment.`,
      ``,
      `For: ${groupName}`,
      ``,
      `Selected Services:`,
      serviceList,
      ``,
      `Name: ${name.trim()}`,
      `Phone: +91 ${phone.replace(/\D/g, '').slice(-10)}`,
      `Preferred Date: ${dateStr}`,
      `Preferred Time: ${timeStr}`,
    ];

    if (message.trim()) {
      lines.push(``, `Note: ${message.trim()}`);
    }

    lines.push(``, `Please let me know the available slot. Thank you.`);

    const fullMessage = lines.join('\n');
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
    closeBooking();
  }, [name, phone, selectedServices, preferredDate, preferredTime, message, activeCategory, closeBooking]);

  /* ── Today's date for min attribute ── */
  const today = useMemo(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }, []);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Book an appointment"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-md" onClick={closeBooking} />

      {/* Modal card */}
      <div
        ref={cardRef}
        className="relative z-10 w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-ivory shadow-2xl border border-beige/40"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-ivory/95 backdrop-blur-sm border-b border-beige/30 px-6 py-5 flex items-center justify-between">
          <div>
            <h3 className="font-display text-2xl font-light text-espresso">
              Book Your <em className="italic text-blush">Appointment</em>
            </h3>
            <p className="font-sans text-xs text-taupe mt-0.5">
              Fill in your details & we&apos;ll confirm on WhatsApp
            </p>
          </div>
          <button
            type="button"
            onClick={closeBooking}
            className="size-9 flex items-center justify-center rounded-full bg-cream hover:bg-beige/40 transition-colors text-espresso/60 hover:text-espresso shrink-0"
            aria-label="Close booking form"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form body */}
        <div className="px-6 py-6 space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="booking-name" className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1.5">
              Name <span className="text-blush">*</span>
            </label>
            <input
              id="booking-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              className={`w-full rounded-lg border bg-cream/50 px-4 py-3 font-sans text-sm text-espresso placeholder:text-taupe/50 focus:outline-none focus:ring-2 focus:ring-champagne/50 transition-all ${
                errors.name ? 'border-red-400' : 'border-beige/50'
              }`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="booking-phone" className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1.5">
              Phone <span className="text-blush">*</span>
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-beige/50 bg-beige/20 text-xs font-semibold text-taupe">
                +91
              </span>
              <input
                id="booking-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98765 43210"
                autoComplete="tel"
                className={`w-full rounded-r-lg border bg-cream/50 px-4 py-3 font-sans text-sm text-espresso placeholder:text-taupe/50 focus:outline-none focus:ring-2 focus:ring-champagne/50 transition-all ${
                  errors.phone ? 'border-red-400' : 'border-beige/50'
                }`}
              />
            </div>
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </div>

          {/* Category dropdown */}
          <div>
            <label htmlFor="booking-category" className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1.5">
              Service Category <span className="text-blush">*</span>
            </label>
            <select
              id="booking-category"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedServices(new Set());
              }}
              className="w-full rounded-lg border border-beige/50 bg-cream/50 px-4 py-3 font-sans text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-champagne/50 transition-all appearance-none cursor-pointer"
            >
              <option value="">Select a category...</option>
              {Array.from(groups.entries()).map(([groupName, cats]) => (
                <optgroup key={groupName} label={groupName}>
                  {cats.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Services checkboxes */}
          {activeCategory && (
            <div>
              <p className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-2">
                Select Services <span className="text-blush">*</span>
              </p>
              <div className={`space-y-1 max-h-48 overflow-y-auto rounded-lg border p-3 ${
                errors.services ? 'border-red-400' : 'border-beige/40'
              } bg-cream/30`}>
                {availableServices.map((svc) => (
                  <label
                    key={svc.name}
                    className="flex items-center justify-between gap-3 py-2 px-2 rounded-md hover:bg-beige/20 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedServices.has(svc.name)}
                        onChange={() => toggleService(svc.name)}
                        className="size-4 rounded border-beige text-champagne focus:ring-champagne/50 accent-[var(--champagne)] cursor-pointer"
                      />
                      <span className="font-sans text-sm text-espresso">{svc.name}</span>
                    </div>
                    <span className="font-sans text-xs text-taupe shrink-0">{svc.price}</span>
                  </label>
                ))}
              </div>
              {errors.services && <p className="mt-1 text-xs text-red-500">{errors.services}</p>}
            </div>
          )}

          {/* Date & Time row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="booking-date" className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1.5">
                Preferred Date
              </label>
              <input
                id="booking-date"
                type="date"
                value={preferredDate}
                min={today}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full rounded-lg border border-beige/50 bg-cream/50 px-4 py-3 font-sans text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-champagne/50 transition-all"
              />
            </div>
            <div>
              <label htmlFor="booking-time" className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1.5">
                Preferred Time
              </label>
              <select
                id="booking-time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full rounded-lg border border-beige/50 bg-cream/50 px-4 py-3 font-sans text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-champagne/50 transition-all appearance-none cursor-pointer"
              >
                <option value="">Any time</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="booking-notes" className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1.5">
              Additional Notes
            </label>
            <textarea
              id="booking-notes"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any special requests or preferences..."
              rows={2}
              className="w-full rounded-lg border border-beige/50 bg-cream/50 px-4 py-3 font-sans text-sm text-espresso placeholder:text-taupe/50 focus:outline-none focus:ring-2 focus:ring-champagne/50 transition-all resize-none"
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 z-20 bg-ivory/95 backdrop-blur-sm border-t border-beige/30 px-6 py-4 space-y-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2.5 rounded-full bg-espresso px-6 py-4 text-sm font-semibold uppercase tracking-wider text-ivory transition-all hover:bg-charcoal hover:shadow-lg active:scale-[0.98] cursor-pointer"
          >
            <Send size={16} />
            Send on WhatsApp
          </button>

          <p className="text-center text-xs text-taupe">
            or call directly:{' '}
            <a href="tel:+918796783680" className="font-semibold text-espresso hover:text-blush transition-colors inline-flex items-center gap-1">
              <Phone size={11} /> +91 87967 83680
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
