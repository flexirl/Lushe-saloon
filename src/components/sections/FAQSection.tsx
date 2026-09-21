'use client';

import { useState } from 'react';
import { Plus, Minus, MessageCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'booking',
    question: 'How do I book an appointment or bespoke consultation?',
    answer:
      'To ensure each guest receives our unhurried, dedicated attention, we operate primarily by reservation. You can book instantaneously via WhatsApp (+91 87967 83680) or phone. Walk-in guests are welcomed subject to studio chair availability.',
  },
  {
    id: 'products',
    question: 'What premium brands and formulations are used during treatments?',
    answer:
      'We curate only world-class, certified formulations. For hair therapies, we use Olaplex, Kérastase, and L’Oréal Professionnel. Our nail studio exclusively uses gentle, hypoallergenic Russian gel overlays and OPI lacquers. Skin therapies feature medical-grade Dermalogica and botanical actives.',
  },
  {
    id: 'bridal',
    question: 'Do you offer bridal, bridesmaid, and private event packages?',
    answer:
      'Yes. Our bespoke bridal suite includes comprehensive pre-wedding skin preparation, personalized nail architecture, hair design trials, and day-of makeup artistry. We also offer private studio buyout packages for bridal parties and intimate gatherings.',
  },
  {
    id: 'location',
    question: 'Where in Gurugram is the studio located, and is parking available?',
    answer:
      'Lushè Unisex Saloon is located in Sector 52, Gurugram, easily accessible from Golf Course Road, Ardee City, and South City. We provide dedicated on-site parking and valet assistance for all our visitors.',
  },
  {
    id: 'hygiene',
    question: 'What are your studio sanitation and sterilization protocols?',
    answer:
      'Hygiene is absolute at Lushè. All stainless-steel manicure, pedicure, and facial implements undergo hospital-grade ultrasonic cleansing and autoclave sterilization. Single-use biodegradable disposables and freshly sanitized linens are standard for every guest.',
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('booking');

  const toggle = (id: string) => {
    setOpenId((curr) => (curr === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="bg-ivory py-24 md:py-36 px-5 md:px-10 xl:px-16 border-t border-beige/40 text-espresso"
      aria-label="Frequently Asked Questions"
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="eyebrow text-taupe">Help</p>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[0.9] text-espresso">
            Frequently Asked{' '}
            <em className="italic text-blush font-normal">Questions</em>
          </h2>
          <p className="mt-4 font-sans text-base text-taupe leading-relaxed">
            Everything you need to know
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'bg-cream/50 border-beige/80 shadow-sm'
                    : 'bg-cream/20 border-beige/40 hover:border-beige/70'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-6 md:p-7 text-left cursor-pointer gap-4"
                >
                  <span className="font-display text-lg md:text-xl font-light text-espresso">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 size-8 rounded-full border border-beige flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-espresso text-ivory border-espresso' : 'text-taupe'
                    }`}
                  >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-7 md:px-7 md:pb-8 pt-0 text-charcoal/80 font-sans text-sm md:text-base leading-relaxed border-t border-beige/30">
                    <p className="mt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct WhatsApp Callout */}
        <div className="mt-16 rounded-2xl bg-cream/70 border border-beige/60 p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="font-display text-2xl font-light text-espresso">
              Have a bespoke inquiry or special request?
            </h3>
            <p className="font-sans text-xs md:text-sm text-taupe mt-1">
              Our studio coordinator is available on WhatsApp to assist you immediately.
            </p>
          </div>

          <a
            href="https://wa.me/918796783680?text=Hi%20Lushè,%20I%20have%20a%20question%20regarding%20your%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-espresso text-ivory text-xs font-semibold uppercase tracking-[0.14em] hover:bg-charcoal transition-all shadow-sm"
          >
            <MessageCircle size={16} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
