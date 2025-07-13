'use server'

import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { redirect } from 'next/navigation';

export interface BookingFormData {
  name: string;
  email: string;
  contact: string;
  companyName: string;
  companySize: string;
  bookingType: 'demo' | 'call' | 'sales';
}

export async function createBooking(formData: FormData) {
  try {
    await connectDB();

    const bookingData: BookingFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      contact: formData.get('contact') as string,
      companyName: formData.get('companyName') as string,
      companySize: formData.get('companySize') as string,
      bookingType: formData.get('bookingType') as 'demo' | 'call' | 'sales',
    };

    // Validate required fields
    const requiredFields = ['name', 'email', 'contact', 'companyName', 'companySize', 'bookingType'];
    for (const field of requiredFields) {
      if (!bookingData[field as keyof BookingFormData]) {
        throw new Error(`${field} is required`);
      }
    }

    // Create new booking
    const booking = new Booking(bookingData);
    await booking.save();

    console.log('Booking created successfully:', booking._id);
    
  } catch (error: any) {
    console.error('Error creating booking:', error);
    throw new Error(error.message || 'Failed to create booking');
  }

  // Redirect to success page
  redirect('/booking/success');
}

export async function getAllBookings() {
  try {
    await connectDB();
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(bookings));
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw new Error('Failed to fetch bookings');
  }
}