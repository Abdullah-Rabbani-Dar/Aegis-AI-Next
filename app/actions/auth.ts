'use server'

import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { generateToken, verifyAuth } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(formData: FormData) {
  try {
    await connectDB();

    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    // Find admin by username or email
    const admin = await Admin.findOne({
      $or: [{ username }, { email: username }]
    });

    if (!admin) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = generateToken({
      adminId: admin._id.toString(),
      username: admin.username,
      email: admin.email,
      role: admin.role
    });

    // Set cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

  } catch (error: any) {
    throw new Error(error.message || 'Login failed');
  }

  redirect('/admin/dashboard');
}

export async function logoutAdmin() {
  cookies().delete('auth-token');
  redirect('/admin/login');
}

export async function createAdmin(formData: FormData) {
  try {
    await connectDB();

    const adminData = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      role: (formData.get('role') as string) || 'admin'
    };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ username: adminData.username }, { email: adminData.email }]
    });

    if (existingAdmin) {
      throw new Error('Admin with this username or email already exists');
    }

    const admin = new Admin(adminData);
    await admin.save();

    return { success: true, message: 'Admin created successfully' };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create admin');
  }
}

export async function checkAuth() {
  return await verifyAuth();
}