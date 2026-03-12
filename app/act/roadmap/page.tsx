// app/act/roadmap/page.tsx
import Navbar from "@/components/Navbar";
import { sections, type Section, type SectionOption, type PracticeLevel } from "../lib/actSections";
import { roadmapOrder } from "../lib/roadmapOrder";
import { MenuItem } from "@/types/menu";
import fs from "fs";
import path from "path";
import RoadmapClient from "./RoadmapClient";
import { getCurrentUser } from "@/lib/session";
import { turso } from "@/lib/db";

const schoolMenu: MenuItem[] = [
  { label: "Mock-Test", href: "/act/Practice-Questions#full-length-mock-test" },
  { label: "Study-Resources", href: "/act" },
  { label: "Practice-Questions", href: "/act/Practice-Questions" },
  { label: "Courses", href: "/act/courses" },
  { label: "Roadmap", href: "/act/roadmap" },
  { label: "Account", href: "/act" },
];

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

function getSubjectColor(sectionName: string): { bg: string; text: string; border: string; lightBg: string } {
  switch (sectionName) {
    case "English":
      return { bg: "bg-emerald-600", text: "text-emerald-700", border: "border-emerald-200", lightBg: "bg-emerald-50" };
    case "Mathematics":
      return { bg: "bg-blue-600", text: "text-blue-700", border: "border-blue-200", lightBg: "bg-blue-50" };
    case "Reading":
      return { bg: "bg-purple-600", text: "text-purple-700", border: "border-purple-200", lightBg: "bg-purple-50" };
    case "Science":
      return { bg: "bg-amber-600", text: "text-amber-700", border: "border-amber-200", lightBg: "bg-amber-50" };
    default:
      return { bg: "bg-gray-600", text: "text-gray-700", border: "border-gray-200", lightBg: "bg-gray-50" };
  }
}

function getQuestionCount(section: Section, level: PracticeLevel): number {
  const sectionSlug = slugify(section.name);
  const levelSlug = slugify(level.title);
  const jsonPath = path.join(
    process.cwd(),
    "public",
    "1-act",
    sectionSlug,
    levelSlug,
    "questions.json"
  );
  try {
    if (fs.existsSync(jsonPath)) {
      const fileContents = fs.readFileSync(jsonPath, "utf8");
      const data = JSON.parse(fileContents);
      return data.questions?.length || 0;
    }
  } catch (err) {
    console.error(`Failed to load questions for ${section.name} / ${level.title}:`, err);
  }
  return 0;
}

function buildInitialRoadmap() {
  const items: Array<{
    id: number;
    section: Section;
    option: SectionOption;
    level: PracticeLevel;
    questionCount: number;
    subjectColor: ReturnType<typeof getSubjectColor>;
  }> = [];

  for (const item of roadmapOrder) {
    const section = sections.find(s => s.name === item.section);
    if (!section) continue;

    for (const option of section.options) {
      const level = option.practiceLevels.find(l => l.title === item.levelTitle);
      if (level) {
        items.push({
          id: item.id,
          section,
          option,
          level,
          questionCount: getQuestionCount(section, level),
          subjectColor: getSubjectColor(section.name),
        });
        break;
      }
    }
  }
  return items;
}
export default async function RoadmapPage() {
  const initialItems = buildInitialRoadmap();
  const originalOrder = roadmapOrder.map(item => item.id);

  const user = await getCurrentUser();
  const userResults: Record<string, { correct: number; total: number; timeSeconds: number; date: string }> = {};
  let userOrder: number[] | null = null;

  if (user) {
    const resultsRows = await turso.execute({
      sql: "SELECT item_id, correct, total, time_seconds, completed_at FROM user_roadmap_results WHERE user_id = ? AND exam = ?",
      args: [user.id, 'act'],   // <-- added exam filter
    });
    resultsRows.rows.forEach(row => {
      userResults[String(row.item_id)] = {
        correct: Number(row.correct),
        total: Number(row.total),
        timeSeconds: Number(row.time_seconds),
        date: String(row.completed_at),
      };
    });

    const orderRows = await turso.execute({
      sql: "SELECT order_json FROM user_roadmap_order WHERE user_id = ? AND exam = ?",
      args: [user.id, 'act'],   // <-- added exam filter
    });
    if (orderRows.rows.length > 0) {
      userOrder = JSON.parse(orderRows.rows[0].order_json as string);
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar items={schoolMenu} logo="OwlenForge" />
      <RoadmapClient
        initialItems={initialItems}
        originalOrder={originalOrder}
        initialUserResults={userResults}
        initialUserOrder={userOrder}
        isLoggedIn={!!user}
      />
    </div>
  );
}