'use client';

import { ArrowUpRight } from 'lucide-react';
import { useBooking } from '@/components/booking/BookingContext';

interface ServiceItem {
  name: string;
  price: string;
  note?: string;
  isNew?: boolean;
}

interface ServiceListProps {
  services: ServiceItem[];
  categoryId: string;
  isUnlocked: boolean;
}

export default function ServiceList({ services, categoryId, isUnlocked }: ServiceListProps) {
  const { openBooking } = useBooking();

  return (
    <div className="flex flex-col divide-y divide-ivory/10">
      {services.map((service, idx) => (
        <div
          key={`${categoryId}-${idx}`}
          className="group flex items-center justify-between py-4 md:py-5 px-2 md:px-4 transition-colors duration-200 hover:bg-ivory/[0.03] rounded-lg"
        >
          {/* Service name */}
          <div className="flex items-center gap-3 md:gap-5">
            <span className="font-sans text-xs text-ivory/30 w-6">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-display text-lg md:text-xl font-light text-ivory group-hover:text-blush transition-colors">
                {service.name}
                {service.isNew && (
                  <span className="ml-2 inline-block px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider bg-champagne/20 text-champagne rounded-full">
                    New
                  </span>
                )}
              </h3>
              {service.note && (
                <p className="font-sans text-xs text-ivory/50 mt-0.5">{service.note}</p>
              )}
            </div>
          </div>

          {/* Price — locked or unlocked */}
          <div className="flex items-center gap-4 md:gap-6 shrink-0">
            {isUnlocked ? (
              <>
                <span className="font-display text-lg md:text-xl font-light text-champagne animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {service.price}
                </span>
                <button
                  type="button"
                  onClick={() => openBooking({ category: categoryId, service: service.name })}
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-champagne/70 hover:text-ivory transition-colors cursor-pointer"
                >
                  <span>Book</span>
                  <ArrowUpRight size={12} />
                </button>
              </>
            ) : (
              <span className="font-display text-lg md:text-xl font-light text-ivory/20 tracking-wider select-none">
                — · —
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
