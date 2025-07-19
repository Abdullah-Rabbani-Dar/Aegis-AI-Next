import { Resend } from 'resend';
import { render } from '@react-email/render';
import CustomerBookingConfirmation from '@/emails/CustomerBookingConfirmation';
import InternalBookingNotification from '@/emails/InternalBookingNotification';
import NotificationEmail from '@/models/NotificationEmail';
import connectDB from '@/lib/mongodb';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface BookingEmailData {
  name: string;
  email: string;
  contact: string;
  companyName: string;
  companySize: string;
  bookingType: 'demo' | 'call' | 'sales';
  createdAt: string;
}

export async function sendBookingEmails(bookingData: BookingEmailData) {
  try {
    await connectDB();
    
    // Get active internal notification emails
    const internalEmails = await NotificationEmail.find({ isActive: true });
    const internalEmailAddresses = internalEmails.map(email => email.email);

    // Render email templates
    const customerEmailHtml = await render(CustomerBookingConfirmation({ booking: bookingData }));
    const internalEmailHtml = await render(InternalBookingNotification({ booking: bookingData }));

    console.log('Customer Email HTML:', customerEmailHtml);
    console.log('Internal Email HTML:', internalEmailHtml);

    const emailPromises = [];

    // Send confirmation email to customer
    emailPromises.push(
      resend.emails.send({
        from: 'anything@resend.dev',
        to: [bookingData.email],
        subject: `Booking Confirmation - ${getBookingTypeLabel(bookingData.bookingType)}`,
        html: customerEmailHtml,
      })
    );

    // Send notification emails to internal team
    if (internalEmailAddresses.length > 0) {
      emailPromises.push(
        resend.emails.send({
          from:'anythingresend.dev',
          to: internalEmailAddresses,
          subject: `New ${getBookingTypeLabel(bookingData.bookingType)} Booking - ${bookingData.name}`,
          html: internalEmailHtml,
        })
      );
    }

    // Send all emails
    const results = await Promise.allSettled(emailPromises);
    
    // Log results
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Email ${index + 1} sent successfully:`, result.value);
      } else {
        console.error(`Email ${index + 1} failed:`, result.reason);
      }
    });

    return {
      success: true,
      customerEmailSent: results[0]?.status === 'fulfilled',
      internalEmailsSent: results[1]?.status === 'fulfilled',
      internalEmailCount: internalEmailAddresses.length
    };

  } catch (error) {
    console.error('Error sending booking emails:', error);
    throw error;
  }
}

function getBookingTypeLabel(type: string): string {
  switch (type) {
    case 'demo': return 'Demo Request';
    case 'call': return 'Consultation Call';
    case 'sales': return 'Sales Inquiry';
    default: return 'Booking Request';
  }
}
