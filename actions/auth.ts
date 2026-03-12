// actions/auth.ts
"use server";

import { turso, tursoWrite } from "@/lib/db";
import { hashPassword, comparePassword, createToken, setAuthCookie } from "@/lib/auth";
import { cookies } from "next/headers";

type ActionState = {
  error?: string;
  success?: boolean;
} | null;

export async function signup(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!username || !email || !password || password.length < 6) {
    return { error: "All fields are required and password must be at least 6 characters." };
  }

  // Check existing user
  const existing = await turso.execute({
    sql: "SELECT id FROM users WHERE email = ? OR username = ?",
    args: [email, username],
  });
  if (existing.rows.length > 0) {
    return { error: "User with this email or username already exists." };
  }

  const hashed = await hashPassword(password);
  const result = await tursoWrite.execute({
    sql: "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?) RETURNING id",
    args: [username, email, hashed],
  });

  const userId = result.rows[0]?.id as number;
  if (!userId) {
    return { error: "Failed to create user. Please try again." };
  }

  const token = createToken(userId);
  await setAuthCookie(token);

  // Set a non‑HTTP‑only cookie so the client can detect login state
  const cookieStore = await cookies();
  cookieStore.set("user-logged-in", "true", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return { success: true };
}

export async function login(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const result = await turso.execute({
    sql: "SELECT id, username, password_hash FROM users WHERE email = ?",
    args: [email],
  });

  const user = result.rows[0];
  if (!user) {
    return { error: "Invalid email or password." };
  }

  const isValid = await comparePassword(password, user.password_hash as string);
  if (!isValid) {
    return { error: "Invalid email or password." };
  }

  const token = createToken(user.id as number);
  await setAuthCookie(token);

  // Set a non‑HTTP‑only cookie so the client can detect login state
  const cookieStore = await cookies();
  cookieStore.set("user-logged-in", "true", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return { success: true };
}