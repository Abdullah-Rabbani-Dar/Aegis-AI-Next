import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JWTPayload {
  adminId: string;
  username: string;
  email: string;
  role: string;
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token');
  return token?.value || null;
}

export async function verifyAuth(): Promise<JWTPayload | null> {
  const token = await getAuthToken();
  if (!token) return null;
  
  return verifyToken(token);
}