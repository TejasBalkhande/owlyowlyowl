"use server";

import { cookies } from "next/headers";
import { getDb } from "@/app/lib/db";
import { redirect } from "next/navigation";

/**
 * Ensures the user_roadmap_order table exists.
 */
async function ensureTable() {
  const { client } = getDb();
  await client.execute(`
    CREATE TABLE IF NOT EXISTS user_roadmap_order (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      order_data TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
}

/**
 * Fetches the saved roadmap order for the currently logged-in user.
 * Returns the order array, or null if none exists / user not logged in.
 */
export async function getUserRoadmapOrder(): Promise<number[] | null> {
  const cookieStore = await cookies();
  const username = cookieStore.get("session")?.value;
  if (!username) return null;

  const { client } = getDb();
  await ensureTable();

  try {
    // Get user id from username
    const userResult = await client.execute({
      sql: "SELECT id FROM users WHERE username = ?",
      args: [username],
    });
    if (userResult.rows.length === 0) return null;
    const userId = userResult.rows[0].id;

    const orderResult = await client.execute({
      sql: "SELECT order_data FROM user_roadmap_order WHERE user_id = ?",
      args: [userId],
    });
    if (orderResult.rows.length === 0) return null;

    const orderData = orderResult.rows[0].order_data as string;
    return JSON.parse(orderData) as number[];
  } catch (e) {
    console.error("Failed to get user roadmap order", e);
    return null;
  }
}

/**
 * Saves (upserts) the given roadmap order for the currently logged-in user.
 * Redirects to /account if no user is logged in.
 */
export async function saveUserRoadmapOrder(order: number[]) {
  const cookieStore = await cookies();
  const username = cookieStore.get("session")?.value;
  if (!username) {
    redirect("/account");
  }

  const { client } = getDb();
  await ensureTable();

  try {
    // Get user id
    const userResult = await client.execute({
      sql: "SELECT id FROM users WHERE username = ?",
      args: [username],
    });
    if (userResult.rows.length === 0) {
      throw new Error("User not found");
    }
    const userId = userResult.rows[0].id;

    const orderJson = JSON.stringify(order);
    await client.execute({
      sql: `
        INSERT INTO user_roadmap_order (user_id, order_data, updated_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(user_id) DO UPDATE SET
          order_data = excluded.order_data,
          updated_at = excluded.updated_at
      `,
      args: [userId, orderJson],
    });
  } catch (e) {
    console.error("Failed to save user roadmap order", e);
    throw new Error("Could not save roadmap order");
  }
}