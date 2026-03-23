// app/act/page.tsx (Server Component) – with fixed types
import { cookies } from "next/headers";
import { getDb } from "@/app/lib/db";
import { sections, type Section, type PracticeLevel } from "./lib/actSections";
import { roadmapOrder } from "./lib/roadmapOrder";
import ActClient from "./ActClient";

// Type for practice results rows
interface PracticeResultRow {
  level_id: number;
  correct_count: number;
  total_questions: number;
  last_attempt: string;
}

// Helper to get user id from session
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

// Helper to get username from session
async function getCurrentUsername(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("session")?.value || null;
}

// Helper to compute streak from dates (returns number of consecutive days including today)
function computeStreak(dates: string[]): number {
  if (!dates.length) return 0;
  // Convert to date strings (YYYY-MM-DD)
  const uniqueDates = new Set(dates.map(d => d.split('T')[0]));
  const sortedDates = Array.from(uniqueDates).sort().reverse();
  let streak = 0;
  let expected = new Date().toISOString().split('T')[0];
  for (const date of sortedDates) {
    if (date === expected) {
      streak++;
      const prev = new Date(expected);
      prev.setDate(prev.getDate() - 1);
      expected = prev.toISOString().split('T')[0];
    } else {
      break;
    }
  }
  return streak;
}

// Build mapping from level id to subject and level title
async function buildLevelMap() {
  const items: Array<{ id: number; section: Section; level: PracticeLevel }> = [];
  for (const item of roadmapOrder) {
    const section = sections.find(s => s.name === item.section);
    if (!section) continue;
    for (const option of section.options) {
      const level = option.practiceLevels.find(l => l.title === item.levelTitle);
      if (level) {
        items.push({
          id: item.id,
          section,
          level,
        });
        break;
      }
    }
  }
  const map = new Map<number, { subject: string; levelTitle: string }>();
  items.forEach(item => {
    map.set(item.id, {
      subject: item.section.name,
      levelTitle: item.level.title,
    });
  });
  return map;
}

export default async function ActPage() {
  const username = await getCurrentUsername();
  const userId = await getCurrentUserId();
  let practiceResults: PracticeResultRow[] = [];
  let levelMap = new Map<number, { subject: string; levelTitle: string }>();

  if (userId) {
    const { client } = getDb();
    // Ensure practice results table exists
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
    const results = await client.execute({
      sql: `SELECT level_id, correct_count, total_questions, last_attempt
            FROM user_practice_results
            WHERE user_id = ?`,
      args: [userId],
    });
    // Cast through unknown to satisfy TypeScript; we know the shape matches PracticeResultRow
    practiceResults = results.rows as unknown as PracticeResultRow[];
    // Build level map
    levelMap = await buildLevelMap();
  }

  // Compute dashboard stats
  let totalQuestions = 0;
  let correctAnswers = 0;
  const weakAreas: string[] = [];
  const recentActivities: { date: string; activity: string; score: string }[] = [];
  const practiceDates: string[] = [];

  // For each practice result, aggregate and process
  for (const result of practiceResults) {
    const levelId = result.level_id;
    const correct = result.correct_count;
    const total = result.total_questions;
    const lastAttempt = result.last_attempt;

    totalQuestions += total;
    correctAnswers += correct;

    const accuracy = total > 0 ? correct / total : 0;
    const levelInfo = levelMap.get(levelId);
    if (levelInfo) {
      if (accuracy < 0.7) {
        weakAreas.push(`${levelInfo.subject}: ${levelInfo.levelTitle}`);
      }
      // For recent activities, we need to sort later
      recentActivities.push({
        date: new Date(lastAttempt).toLocaleDateString(),
        activity: `${levelInfo.subject} - ${levelInfo.levelTitle}`,
        score: `${Math.round(accuracy * 100)}%`,
      });
      practiceDates.push(lastAttempt);
    }
  }

  // Sort recent activities by date descending and take top 3
  recentActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const recentActivity = recentActivities.slice(0, 3);

  const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  const predictedScore = Math.round((accuracy / 100) * 36);
  const streak = computeStreak(practiceDates);
  const targetScore = 32; // default target; could be stored per user

  const dashboardStats = {
    totalQuestions,
    correctAnswers,
    accuracy: Math.round(accuracy),
    streak,
    predictedScore,
    targetScore,
    weakAreas: weakAreas.slice(0, 3), // show top 3 weak areas
    upcomingMock: "Full Test #4 - This Saturday", // static for now
    recentActivity,
  };

  // Pass data to client component
  return (
    <ActClient
      username={username}
      isLoggedIn={!!userId}
      dashboardStats={dashboardStats}
    />
  );
}