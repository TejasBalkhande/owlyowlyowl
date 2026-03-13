// actions/roadmap.ts
"use server";

import { tursoWrite } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function savePracticeResult(
  itemId: number,
  correct: number,
  total: number,
  timeSeconds: number,
  exam: string
) {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error("Not authenticated");

    await tursoWrite.execute({
      sql: `
        INSERT INTO user_roadmap_results (user_id, item_id, correct, total, time_seconds, completed_at, exam)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)
        ON CONFLICT(user_id, item_id, exam) DO UPDATE SET
          correct = excluded.correct,
          total = excluded.total,
          time_seconds = excluded.time_seconds,
          completed_at = excluded.completed_at
      `,
      args: [user.id, itemId, correct, total, timeSeconds, exam],
    });

    revalidatePath("/act/roadmap");
  } catch (error) {
    console.error("🔥 savePracticeResult error:", error);
    throw new Error("Failed to save practice result: " + (error as Error).message);
  }
}

export async function saveRoadmapOrder(orderIds: number[], exam: string) {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error("Not authenticated");

    await tursoWrite.execute({
      sql: `
        INSERT INTO user_roadmap_order (user_id, order_json, updated_at, exam)
        VALUES (?, ?, CURRENT_TIMESTAMP, ?)
        ON CONFLICT(user_id, exam) DO UPDATE SET
          order_json = excluded.order_json,
          updated_at = excluded.updated_at
      `,
      args: [user.id, JSON.stringify(orderIds), exam],
    });

    revalidatePath("/act/roadmap");
  } catch (error) {
    console.error("🔥 saveRoadmapOrder error:", error);
    throw new Error("Failed to save roadmap order: " + (error as Error).message);
  }
}