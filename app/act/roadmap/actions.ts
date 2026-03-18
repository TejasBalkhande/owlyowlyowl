"use server";

import { cookies } from "next/headers";
import { getDb } from "@/app/lib/db";
import { redirect } from "next/navigation";

// Existing table for user roadmap order
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

// New table for practice results
async function ensurePracticeResultsTable() {
  const { client } = getDb();
  await client.execute(`
    CREATE TABLE IF NOT EXISTS user_practice_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      level_id INTEGER NOT NULL,
      correct_count INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      time_seconds INTEGER NOT NULL,
      total_time_seconds INTEGER NOT NULL,
      last_attempt DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(user_id, level_id)
    )
  `);
}

// Helper to get current user id from session
async function getCurrentUserId(): Promise<number | null> {
  const cookieStore = await cookies();
  const username = cookieStore.get("session")?.value;
  if (!username) return null;
  const { client } = getDb();
  const userResult = await client.execute({
    sql: "SELECT id FROM users WHERE username = ?",
    args: [username],
  });
  if (userResult.rows.length === 0) return null;
  return userResult.rows[0].id as number;
}

// Get saved roadmap order for current user
export async function getUserRoadmapOrder(): Promise<number[] | null> {
  const userId = await getCurrentUserId();
  if (!userId) return null;

  const { client } = getDb();
  await ensureTable();

  try {
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

// Save roadmap order for current user
export async function saveUserRoadmapOrder(order: number[]) {
  const userId = await getCurrentUserId();
  if (!userId) {
    redirect("/account");
  }

  const { client } = getDb();
  await ensureTable();

  try {
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

// Get all practice results for current user (mapped by level_id)
export async function getUserPracticeResults(): Promise<Record<number, { correct: number; total: number; timeSeconds: number; lastAttempt: string }> | null> {
  const userId = await getCurrentUserId();
  if (!userId) return null;

  const { client } = getDb();
  await ensurePracticeResultsTable();

  try {
    const results = await client.execute({
      sql: `SELECT level_id, correct_count, total_questions, time_seconds, last_attempt
            FROM user_practice_results
            WHERE user_id = ?`,
      args: [userId],
    });
    const map: Record<number, { correct: number; total: number; timeSeconds: number; lastAttempt: string }> = {};
    for (const row of results.rows) {
      map[row.level_id as number] = {
        correct: row.correct_count as number,
        total: row.total_questions as number,
        timeSeconds: row.time_seconds as number,
        lastAttempt: row.last_attempt as string,
      };
    }
    return map;
  } catch (e) {
    console.error("Failed to get user practice results", e);
    return null;
  }
}

// Save a practice result for current user (upsert)
export async function savePracticeResult(
  levelId: number,
  correct: number,
  total: number,
  timeSeconds: number
): Promise<{ success: boolean; error?: string }> {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "User not logged in" };
  }

  const { client } = getDb();
  await ensurePracticeResultsTable();

  try {
    await client.execute({
      sql: `
        INSERT INTO user_practice_results (user_id, level_id, correct_count, total_questions, time_seconds, total_time_seconds, last_attempt, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        ON CONFLICT(user_id, level_id) DO UPDATE SET
          correct_count = excluded.correct_count,
          total_questions = excluded.total_questions,
          time_seconds = excluded.time_seconds,
          total_time_seconds = total_time_seconds + excluded.time_seconds,
          last_attempt = excluded.last_attempt,
          updated_at = excluded.updated_at
      `,
      args: [userId, levelId, correct, total, timeSeconds, timeSeconds],
    });
    return { success: true };
  } catch (e) {
    console.error("Failed to save practice result", e);
    return { success: false, error: "Database error" };
  }
}