'use server'

import connectDB from '@/lib/mongodb';
import NotificationEmail from '@/models/NotificationEmail';
import { revalidatePath } from 'next/cache';

export async function getNotificationEmails() {
  try {
    await connectDB();
    const emails = await NotificationEmail.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(emails));
  } catch (error) {
    console.error('Error fetching notification emails:', error);
    throw new Error('Failed to fetch notification emails');
  }
}

export async function addNotificationEmail(formData: FormData) {
  try {
    await connectDB();

    const emailData = {
      email: formData.get('email') as string,
      label: formData.get('label') as string,
      isActive: true
    };

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(emailData.email)) {
      throw new Error('Please enter a valid email address');
    }

    // Check if email already exists
    const existingEmail = await NotificationEmail.findOne({ email: emailData.email });
    if (existingEmail) {
      throw new Error('This email address is already added');
    }

    const notificationEmail = new NotificationEmail(emailData);
    await notificationEmail.save();

    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Email added successfully' };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to add email');
  }
}

export async function deleteNotificationEmail(emailId: string) {
  try {
    await connectDB();
    
    const deletedEmail = await NotificationEmail.findByIdAndDelete(emailId);
    
    if (!deletedEmail) {
      throw new Error('Email not found');
    }

    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Email deleted successfully' };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to delete email');
  }
}

export async function toggleNotificationEmail(emailId: string) {
  try {
    await connectDB();
    
    const email = await NotificationEmail.findById(emailId);
    if (!email) {
      throw new Error('Email not found');
    }

    email.isActive = !email.isActive;
    await email.save();

    revalidatePath('/admin/dashboard');
    return { success: true, message: `Email ${email.isActive ? 'activated' : 'deactivated'} successfully` };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update email status');
  }
}