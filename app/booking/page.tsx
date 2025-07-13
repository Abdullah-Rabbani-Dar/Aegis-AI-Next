'use client';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import BookingForm from './BookingForm';

export default function BookingPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading booking form...</div>}>
      <BookingForm />
    </Suspense>
  );
}
