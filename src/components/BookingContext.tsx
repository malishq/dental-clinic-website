"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type Booking = { doctorId: string | null; time: string | null; stamp: number };

const EMPTY: Booking = { doctorId: null, time: null, stamp: 0 };

const BookingCtx = createContext<{ booking: Booking; book: (next: Partial<Booking>) => void }>({ booking: EMPTY, book: () => {} });

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<Booking>(EMPTY);
  const book = useCallback((next: Partial<Booking>) => setBooking((prev) => ({ ...prev, ...next, stamp: Date.now() })), []);
  const value = useMemo(() => ({ booking, book }), [booking, book]);
  return <BookingCtx.Provider value={value}>{children}</BookingCtx.Provider>;
}

export function useBooking() {
  return useContext(BookingCtx);
}
