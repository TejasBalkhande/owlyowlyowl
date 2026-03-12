// app/act/roadmap/page.tsx
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { sections, type Section, type SectionOption, type PracticeLevel } from "../lib/actSections";
import { MenuItem } from "@/types/menu";
import fs from "fs";
import path from "path";

// Menu for the navbar (same as other ACT pages)
const schoolMenu: MenuItem[] = [
  { label: "Mock-Test", href: "/act/Practice-Questions#full-length-mock-test" },
  { label: "Study-Resources", href: "/act" },
  { label: "Practice-Questions", href: "/act/Practice-Questions" },
  { label: "Courses", href: "/act/courses" },
  { label: "Roadmap", href: "/act/roadmap" },
  { label: "Account", href: "/act" },
];

// Helper to slugify a title (must match the one in [slug]/page.tsx)
const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

// Get all practice levels in the order they appear in sections
function getAllPracticeLevels() {
  const levels: Array<{
    section: Section;
    option: SectionOption;
    level: PracticeLevel;
  }> = [];

  for (const section of sections) {
    for (const option of section.options) {
      for (const level of option.practiceLevels) {
        levels.push({ section, option, level });
      }
    }
  }
  return levels;
}

// Helper to get subject-specific colors
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

// Read the question count from the JSON file for a given level
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

export default function RoadmapPage() {
  const roadmap = getAllPracticeLevels();

  // Add question count to each item
  const roadmapWithCounts = roadmap.map((item) => ({
    ...item,
    questionCount: getQuestionCount(item.section, item.level),
  }));

  return (
    <div className="bg-white min-h-screen">
      <Navbar items={schoolMenu} logo="OwlenForge" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#1E4A76]">ACT Roadmap</h1>
          <p className="text-[#4A5568] font-times text-[17px] mt-3 max-w-2xl mx-auto">
            Follow the recommended sequence of practice topics. Unlock one at a time.
          </p>
        </div>

        {/* Vertical list of cards */}
        <div className="space-y-5">
          {roadmapWithCounts.map((item) => {
            const { section, option, level, questionCount } = item;
            // All topics are unlocked – no locking logic
            const isLocked = false;
            const slug = slugify(level.title);
            const subjectColor = getSubjectColor(section.name);

            return (
              <div
                key={`${section.name}-${option.name}-${level.title}`}
                className={`
                  group relative flex overflow-hidden rounded-2xl bg-white 
                  border border-gray-100 shadow-sm transition-all duration-200
                  ${isLocked ? "opacity-50 pointer-events-none" : "hover:shadow-lg hover:border-gray-200"}
                `}
              >
                {/* Colored accent bar based on subject */}
                <div className={`w-2 flex-shrink-0 ${subjectColor.bg}`} />

                {/* Main card content */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between p-5 gap-4">
                  {/* Left side: subject, title, description, and start button */}
                  <div className="flex-1 min-w-0">
                    {/* Subject badge + option name + question count */}
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${subjectColor.lightBg} ${subjectColor.text} border ${subjectColor.border}`}
                      >
                        {section.name}
                      </span>
                      <span className="text-sm text-gray-500">{option.name}</span>
                      {/* Question count badge */}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        {questionCount} questions
                      </span>
                      {/* Lock badge is omitted because isLocked is always false */}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">
                      {level.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                      {level.description}
                    </p>

                    {/* Start Practice button – always a link */}
                    <div className="mt-3">
                      <Link
                        href={`/act/${slug}`}
                        className="inline-flex items-center px-4 py-2 bg-[#1E4A76] text-white rounded-xl text-sm font-medium hover:bg-[#163A5E] transition shadow-sm"
                      >
                        <svg
                          className="w-4 h-4 mr-1.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Start Practice
                      </Link>
                    </div>
                  </div>

                  {/* Right side: Label + Notes & Video buttons */}
                  <div className="flex flex-col items-start sm:items-stretch gap-1">
                    <span className="text-xs text-gray-500">First understand with:</span>
                    <div className="flex flex-row sm:flex-col gap-2 items-start sm:items-stretch w-full">
                      <button
                        className="inline-flex items-center justify-center px-4 py-2 border rounded-xl text-sm font-medium transition border-gray-200 text-[#4A5568] bg-white hover:bg-gray-50 hover:border-gray-300"
                      >
                        <svg
                          className="w-4 h-4 mr-1.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        Notes
                      </button>
                      <button
                        className="inline-flex items-center justify-center px-4 py-2 border rounded-xl text-sm font-medium transition border-gray-200 text-[#4A5568] bg-white hover:bg-gray-50 hover:border-gray-300"
                      >
                        <svg
                          className="w-4 h-4 mr-1.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        Video
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer hint – you may adjust this text if desired */}
        <p className="text-xs text-[#A0AEC0] text-center mt-10">
          Practice each topic to master the ACT.
        </p>
      </div>
    </div>
  );
}