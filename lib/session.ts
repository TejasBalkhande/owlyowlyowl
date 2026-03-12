// lib/session.ts
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { turso } from '@/lib/db';

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  const result = await turso.execute({
    sql: 'SELECT id, username, email, created_at as createdAt FROM users WHERE id = ?',
    args: [payload.userId],
  });

  const user = result.rows[0];
  if (!user) return null;

  // Convert Turso's Value types to plain strings/numbers
  return {
    id: Number(user.id),               // assume id is numeric
    username: String(user.username),    // username is text
    email: String(user.email),          // email is text
    createdAt: user.createdAt ? String(user.createdAt) : null, // ensure string or null
  };
}