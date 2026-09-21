'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface BookingPreselect {
  category?: string;
  service?: string;
}

interface BookingContextType {
  isOpen: boolean;
  preselect: BookingPreselect | null;
  openBooking: (preselect?: BookingPreselect) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export function useBooking(): BookingContextType {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselect, setPreselect] = useState<BookingPreselect | null>(null);

  const openBooking = useCallback((ps?: BookingPreselect) => {
    setPreselect(ps ?? null);
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
    setPreselect(null);
  }, []);

  return (
    <BookingContext.Provider value={{ isOpen, preselect, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
}
