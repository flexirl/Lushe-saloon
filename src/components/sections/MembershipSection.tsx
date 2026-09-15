'use client';

import { useState } from 'react';
import { Check, Crown, Star, Gem, ArrowUpRight } from 'lucide-react';

interface MembershipTier {
  id: string;
  name: string;
  icon: React.ReactNode;
  price: string;
  value: string;
  validity: string;
  credit: string;
  benefits: string[];
  highlight?: boolean;
  accentColor: string;
}

const TIERS: MembershipTier[] = [
  {
    id: 'silver',
    name: 'Silver',
    icon: <Star size={22} />,
    price: '₹5,000',
    value: '₹7,000',
    validity: '6 months',
    credit: '₹7,000 salon credit',
    benefits: [
      '5% off retail products',
      'Priority appointment booking',
      'Complimentary birthday blow-dry & styling',
      'Free welcome beverage on every visit',
    ],
    accentColor: 'text-taupe',
  },
  {
    id: 'gold',
    name: 'Gold',
    icon: <Crown size={22} />,
    price: '₹10,000',
    value: '₹14,000',
    validity: '9 months',
    credit: '₹14,000 salon credit',
    benefits: [
      '10% off retail products',
      '10% off additional services beyond balance',
      'Free express hair spa (1 session)',
      'Complimentary birthday service (hair spa or pedicure)',
      'Priority bookings',
    ],
    highlight: true,
    accentColor: 'text-champagne',
  },
  {
    id: 'platinum',
    name: 'Platinum',
    icon: <Gem size={22} />,
    price: '₹15,000',
    value: '₹20,000',
    validity: '12 months',
    credit: '₹20,000 salon credit',
    benefits: [
      '15% off retail products',
      '15% off additional services',
      '2 complimentary premium hair spas',
      'Free manicure & pedicure on birthday month',
      'Priority booking',
      'Exclusive member-only offers',
    ],
    accentColor: 'text-blush',
  },
];

export default function MembershipSection() {
  const [activeTier, setActiveTier] = useState<string>('gold');

  return (
    <section
      id="memberships"
      className="bg-cream/60 px-5 py-24 text-espresso md:px-10 md:py-36 xl:px-16 border-t border-beige/40"
      aria-label="Membership Plans"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="eyebrow text-taupe">Save More</p>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[0.9] text-espresso">
            Memberships
          </h2>
          <p className="mt-4 font-sans text-base text-taupe max-w-md mx-auto leading-relaxed">
            More beauty, more savings — join the Lushè family and enjoy exclusive perks
          </p>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TIERS.map((tier) => {
            const isActive = activeTier === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setActiveTier(tier.id)}
                className={`relative rounded-2xl p-7 md:p-8 transition-all duration-500 cursor-pointer group ${
                  tier.highlight
                    ? 'bg-espresso text-ivory border-2 border-champagne/40 shadow-xl md:scale-105'
                    : isActive
                      ? 'bg-ivory border-2 border-champagne/50 shadow-lg'
                      : 'bg-ivory border border-beige/60 hover:border-beige hover:shadow-md'
                }`}
              >
                {/* Most Popular Badge */}
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-champagne text-espresso text-[0.65rem] font-semibold uppercase tracking-widest whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                {/* Tier Header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className={tier.highlight ? 'text-champagne' : tier.accentColor}>
                    {tier.icon}
                  </span>
                  <h3 className={`font-display text-2xl font-light ${
                    tier.highlight ? 'text-ivory' : 'text-espresso'
                  }`}>
                    {tier.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="mb-2">
                  <span className={`font-display text-4xl md:text-5xl font-light ${
                    tier.highlight ? 'text-ivory' : 'text-espresso'
                  }`}>
                    {tier.price}
                  </span>
                </div>

                {/* Value + Validity */}
                <div className={`flex flex-wrap gap-3 text-xs font-sans mb-6 ${
                  tier.highlight ? 'text-ivory/70' : 'text-taupe'
                }`}>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border ${
                    tier.highlight ? 'border-ivory/20' : 'border-beige/60'
                  }`}>
                    Worth {tier.value}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border ${
                    tier.highlight ? 'border-ivory/20' : 'border-beige/60'
                  }`}>
                    Valid {tier.validity}
                  </span>
                </div>

                {/* Credit */}
                <p className={`font-sans text-sm font-medium mb-5 pb-5 border-b ${
                  tier.highlight
                    ? 'text-champagne border-ivory/15'
                    : 'text-espresso border-beige/40'
                }`}>
                  {tier.credit}
                </p>

                {/* Benefits */}
                <ul className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-2.5 font-sans text-sm leading-relaxed ${
                        tier.highlight ? 'text-ivory/85' : 'text-charcoal/80'
                      }`}
                    >
                      <Check
                        size={15}
                        className={`shrink-0 mt-0.5 ${
                          tier.highlight ? 'text-champagne' : 'text-blush'
                        }`}
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`https://wa.me/918796783680?text=${encodeURIComponent(
                    `Hi Lushè, I'm interested in the ${tier.name} Membership (${tier.price}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition-all ${
                    tier.highlight
                      ? 'bg-champagne text-espresso hover:bg-champagne/90 shadow-md'
                      : 'bg-espresso text-ivory hover:bg-charcoal'
                  }`}
                >
                  <span>Join {tier.name}</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="mt-10 text-center text-xs text-taupe font-sans">
          All memberships are non-transferable. Terms & conditions apply. Contact us on WhatsApp for more details.
        </p>
      </div>
    </section>
  );
}
