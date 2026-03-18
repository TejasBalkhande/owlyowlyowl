"use server";

import { getDb } from "../lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// 1. ESLINT FIX: Define a strict type instead of using 'any'
export type ActionState = { error: string | null; success: string | null } | null | undefined;

async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "salt_123");
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// 2. ESLINT FIX: Use the strict ActionState type for prevState
export async function signUp(prevState: ActionState, formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match.", success: null };
  }

  const { client } = getDb();

  try {
    const hashedPassword = await hashPassword(password);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT,
        account TEXT DEFAULT 'free',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.execute({
      sql: `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      args: [username, email, hashedPassword]
    });
    
    return { success: "Account created! You can now login.", error: null };
  } catch (e: unknown) {
    // 3. ESLINT FIX: Catch errors as 'unknown', then safely cast them
    const err = e as Error;
    if (err.message?.includes("UNIQUE constraint failed: users.username")) {
       return { error: "That username is already taken.", success: null };
    }
    if (err.message?.includes("UNIQUE constraint failed: users.email")) {
       return { error: "That email is already registered.", success: null };
    }
    return { error: `Turso Error: ${err.message || "Unknown error"}`, success: null };
  }
}

// 4. ESLINT FIX: Use the strict ActionState type for prevState
export async function login(prevState: ActionState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { client } = getDb(); 
  let success = false;
  let loggedInUsername = "";

  try {
    const hashedPassword = await hashPassword(password);
    
    const result = await client.execute({
      sql: `SELECT username, email FROM users WHERE email = ? AND password = ? LIMIT 1`,
      args: [email, hashedPassword]
    });

    if (result.rows.length > 0) {
      const cookieStore = await cookies();
      loggedInUsername = (result.rows[0].username as string) || email;
      
      cookieStore.set("session", loggedInUsername, { httpOnly: true, secure: true, path: "/" });
      success = true;
    } else {
      return { error: "Invalid credentials.", success: null };
    }
  } catch (e: unknown) {
    // 5. ESLINT FIX: Catch errors as 'unknown', then safely cast them
    const err = e as Error;
    if (err.message?.includes("no such table")) {
        return { error: "Invalid credentials (no users exist yet).", success: null };
    }
    return { error: `Turso Error: ${err.message || "Unknown error"}`, success: null };
  }

  if (success) redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}