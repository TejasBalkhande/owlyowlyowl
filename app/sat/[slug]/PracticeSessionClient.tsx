// app/sat/[slug]/PracticeSessionClient.tsx
"use client";

import { useEffect, useState, useRef, useCallback, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { MenuItem } from "@/types/menu";
import renderMathInElement from "katex/contrib/auto-render";
import Cal from "@/components/Cal";

const schoolMenu: MenuItem[] = [
  { label: "Mock-Test", href: "/sat" },
  { label: "Study-Resources", href: "/sat" },
  { label: "Practice-Questions", href: "/sat/Practice-Questions" },
  { label: "Courses", href: "/sat" },
  { label: "Roadmap", href: "/sat" },
  { label: "Account", href: "/sat" },
];

interface Passage {
  passageId: string;
  passageHtml: string;
}

interface Question {
  questionId: string;
  passageId: string | null;
  passageHighlight?: string;
  questionHtml: string;
  options: Record<string, string>;
  correctOption: string;
  explanationHtml: string;
  section?: string;
}

interface PracticeData {
  passages: Passage[];
  questions: Question[];
}

// Helper to convert a skill name into a folder‑safe string (same as ACT)
function toFolderName(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// Fetch one skill’s data from the public folder
async function fetchSkillData(section: string, skillName: string): Promise<PracticeData | null> {
  const folder = toFolderName(skillName);
  const basePath =
    section === "reading"
      ? `/2-sat/rw/${folder}`
      : `/2-sat/ma/${folder}`;
  const jsonUrl = `${basePath}/questions.json`;

  try {
    const res = await fetch(jsonUrl);
    if (!res.ok) return null;
    const data = await res.json();
    // Add section info to each question (used to show calculator)
    if (data.questions) {
      data.questions = data.questions.map((q: Question) => ({ ...q, section }));
    }
    return data as PracticeData;
  } catch (err) {
    console.error(`Failed to fetch ${jsonUrl}:`, err);
    return null;
  }
}

// Aggregate passages and questions from multiple skill IDs
async function aggregateQuestions(skillIds: string[]): Promise<PracticeData> {
  const allPassages: Passage[] = [];
  const allQuestions: (Question & { section?: string })[] = [];
  const passageMap = new Map<string, Passage>();

  for (const skillId of skillIds) {
    const [section, , skillName] = skillId.split("|");
    if (!section || !skillName) continue;

    const skillData = await fetchSkillData(section, skillName);
    if (!skillData) continue;

    // Add unique passages
    for (const passage of skillData.passages || []) {
      if (!passageMap.has(passage.passageId)) {
        passageMap.set(passage.passageId, passage);
        allPassages.push(passage);
      }
    }

    // Add questions
    for (const question of skillData.questions || []) {
      allQuestions.push({
        ...question,
        section,
      });
    }
  }

  return { passages: allPassages, questions: allQuestions };
}

export function PracticeSessionClient({ skillIds }: { skillIds: string[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PracticeData | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const passageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    aggregateQuestions(skillIds).then((result) => {
      if (isMounted) {
        setData(result);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [skillIds]);

  const transformHtml = useCallback(
    (html: string, highlight?: string): string => {
      if (!html) return "";
      // Rewrite image src paths – images are stored in `public/2-sat/images/`
      let transformed = html.replace(
        /src="images\/([^"]+)"/g,
        (_, fileName) => `/2-sat/images/${fileName}`
      );
      // Handle highlight placeholders [highlight-1]...[/highlight-1]
      const highlightRegex = /\[highlight-(\d+)\]([\s\S]*?)\[\/highlight-\1\]/g;
      transformed = transformed.replace(highlightRegex, (_, num, innerContent) => {
        if (highlight && num === highlight) {
          return `<span class="bg-yellow-200">${innerContent}</span>`;
        }
        return innerContent;
      });
      return transformed;
    },
    []
  );

  useLayoutEffect(() => {
    if (contentRef.current && data) {
      try {
        renderMathInElement(contentRef.current, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "\\[", right: "\\]", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
          ],
          throwOnError: false,
        });
      } catch (e) {
        console.error("KaTeX rendering error:", e);
      }
    }
  }, [data, selectedOptions, currentIndex]);

  useEffect(() => {
    if (passageRef.current) {
      const highlighted = passageRef.current.querySelector(".bg-yellow-200");
      if (highlighted) {
        highlighted.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentIndex, data]);

  const handleOptionSelect = (questionId: string, optionKey: string) => {
    setSelectedOptions((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const goToPrevious = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const goToNext = () => {
    if (data) setCurrentIndex((prev) => Math.min(data.questions.length - 1, prev + 1));
  };

  const handleBackToTopics = () => {
    router.push("/sat/Practice-Questions");
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar items={schoolMenu} logo="OwlenForge" />
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <div className="border border-[#E2E8F0] rounded-2xl p-12 bg-white shadow-sm">
            <p className="text-[#718096] text-lg">Loading questions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.questions.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar items={schoolMenu} logo="OwlenForge" />
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <div className="border border-[#E2E8F0] rounded-2xl p-12 bg-white shadow-sm">
            <p className="text-[#718096] text-lg">
              No questions found for the selected skills. Please check that the JSON files exist.
            </p>
            <button
              onClick={handleBackToTopics}
              className="mt-4 px-5 py-2 bg-[#1E4A76] text-white rounded-lg hover:bg-[#163A5E] transition"
            >
              ← Back to Topics
            </button>
          </div>
        </div>
      </div>
    );
  }

  const includesMath = data.questions.some((q) => q.section === "math");
  const currentQuestion = data.questions[currentIndex];
  const currentPassage = currentQuestion.passageId
    ? data.passages.find((p) => p.passageId === currentQuestion.passageId)
    : null;
  const hasPassage = !!currentPassage;
  const selected = selectedOptions[currentQuestion.questionId];
  const isCorrect = selected === currentQuestion.correctOption;

  let passageQuestionIndex = 1;
  let passageQuestionCount = data.questions.length;
  if (hasPassage) {
    const questionsForPassage = data.questions.filter(
      (q) => q.passageId === currentQuestion.passageId
    );
    passageQuestionCount = questionsForPassage.length;
    const pos = questionsForPassage.findIndex(
      (q) => q.questionId === currentQuestion.questionId
    );
    passageQuestionIndex = pos + 1;
  }

  const questionHeading = hasPassage
    ? `Passage Question ${passageQuestionIndex} of ${passageQuestionCount}`
    : `Question ${currentIndex + 1} of ${data.questions.length}`;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar items={schoolMenu} logo="OwlenForge" />
      <div
        className="flex-1 w-full max-w-7.5xl mx-auto px-4 sm:px-6 lg:px-10 py-6 flex flex-col"
        ref={contentRef}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-4 font-sans">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-shrink-0">
              <Image
                src="/owl-apple.png"
                alt="Award"
                width={90}
                height={90}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-2xl font-semibold text-[#1E4A76]">
                SAT Practice Session
              </h1>
              <p className="text-[#4A5568] font-times text-[17px]">
                {data.questions.length} questions • Custom selection
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {includesMath && (
              <button
                onClick={() => setShowCalculator(!showCalculator)}
                className="px-4 py-2 bg-[#1E4A76] text-white rounded-lg hover:bg-[#163A5E] transition shadow-sm flex items-center gap-2"
              >
                <span>{showCalculator ? "Hide" : "Show"} Calculator</span>
              </button>
            )}
          </div>
        </div>

        {/* Calculator popup */}
        {includesMath && showCalculator && (
          <div className="fixed top-20 right-4 z-50 w-80 bg-white rounded-xl shadow-xl border border-[#E2E8F0] overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 bg-[#F7F9FC] border-b border-[#E2E8F0]">
              <span className="font-semibold text-[#1E4A76]">Calculator</span>
              <button
                onClick={() => setShowCalculator(false)}
                className="text-[#718096] hover:text-[#1E4A76] text-lg leading-none"
                aria-label="Close calculator"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <Cal />
            </div>
          </div>
        )}

        {/* Main content card */}
        <div className="border border-[#E2E8F0] rounded-2xl bg-white shadow-sm overflow-hidden flex-1 min-h-0 flex flex-col">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0] flex-1">
            {/* Left column – Passage or standalone question */}
            <div
              className={`md:p-6 px-3 py-3 overflow-y-auto ${
                hasPassage ? "bg-[#F7F9FC]/50" : "bg-white"
              }`}
              ref={hasPassage ? passageRef : null}
            >
              {hasPassage ? (
                <>
                  <h3 className="text-lg font-semibold text-[#1E4A76] mb-2 flex items-center gap-2 font-sans">
                    Passage
                  </h3>
                  <div
                    className="prose max-w-none text-[#4A5568] font-sans"
                    dangerouslySetInnerHTML={{
                      __html: transformHtml(
                        currentPassage.passageHtml,
                        currentQuestion.passageHighlight
                      ),
                    }}
                  />
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-[#1E4A76] flex items-center gap-2 font-sans">
                      Question
                    </h3>
                    <span className="text-sm bg-[#EDF2F7] text-[#4A5568] px-3 py-1 rounded-full">
                      {currentIndex + 1} / {data.questions.length}
                    </span>
                  </div>
                  <div
                    className="prose max-w-none text-[#2D3748] font-sans"
                    dangerouslySetInnerHTML={{
                      __html: transformHtml(currentQuestion.questionHtml),
                    }}
                  />
                </>
              )}
            </div>

            {/* Right column – Options & explanation */}
            <div className="p-6 overflow-y-auto">
              {hasPassage && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-[#1E4A76] flex items-center gap-2 font-sans">
                      {questionHeading}
                    </h3>
                    <span className="text-sm bg-[#EDF2F7] text-[#4A5568] px-3 py-1 rounded-full">
                      {currentIndex + 1} / {data.questions.length}
                    </span>
                  </div>
                  <div
                    className="prose max-w-none text-[#2D3748] font-sans"
                    dangerouslySetInnerHTML={{
                      __html: transformHtml(currentQuestion.questionHtml),
                    }}
                  />
                </div>
              )}

              {/* Answer options */}
              <div className="space-y-3">
                <h4 className="font-medium text-[#4A5568]">Choose your answer</h4>
                {Object.entries(currentQuestion.options).map(([key, value]) => {
                  let optionClasses =
                    "p-4 border rounded-xl cursor-pointer transition-all ";
                  if (selected) {
                    if (key === currentQuestion.correctOption) {
                      optionClasses +=
                        "bg-green-50 border-green-500 ring-1 ring-green-500 ";
                    } else if (key === selected && key !== currentQuestion.correctOption) {
                      optionClasses +=
                        "bg-red-50 border-red-500 ring-1 ring-red-500 ";
                    } else {
                      optionClasses += "bg-white border-[#E2E8F0] opacity-60 ";
                    }
                  } else {
                    optionClasses +=
                      "bg-white border-[#E2E8F0] hover:border-[#1E4A76] hover:shadow-sm ";
                  }
                  return (
                    <div
                      key={key}
                      className={optionClasses}
                      onClick={() => !selected && handleOptionSelect(currentQuestion.questionId, key)}
                    >
                      <span className="font-bold mr-2 text-[#1E4A76]">{key}.</span>
                      <span
                        className="text-[#2D3748]"
                        dangerouslySetInnerHTML={{ __html: transformHtml(value) }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Explanation after answering */}
              {selected && (
                <div className="mt-6 p-5 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                  <h4 className="font-semibold text-[#1E4A76] mb-2">Explanation</h4>
                  <div
                    className="prose max-w-none text-sm text-[#2D3748]"
                    dangerouslySetInnerHTML={{
                      __html: transformHtml(currentQuestion.explanationHtml),
                    }}
                  />
                  <p className="mt-3 text-sm font-medium">
                    {isCorrect ? (
                      <span className="text-green-600">✓ Correct! Well done.</span>
                    ) : (
                      <span className="text-red-600">
                        ✗ Incorrect. The correct answer is {currentQuestion.correctOption}.
                      </span>
                    )}
                  </p>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={goToPrevious}
                  disabled={currentIndex === 0}
                  className="px-5 py-2 border border-[#E2E8F0] rounded-lg text-[#2D3748] bg-white hover:bg-[#F7F9FC] disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
                >
                  ← Previous
                </button>
                <button
                  onClick={handleBackToTopics}
                  className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition shadow-sm font-medium"
                >
                  Back to Topics
                </button>
                <button
                  onClick={goToNext}
                  disabled={currentIndex === data.questions.length - 1}
                  className="px-5 py-2 bg-[#1E4A76] text-white rounded-lg hover:bg-[#163A5E] disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#A0AEC0] text-center mt-4">
          Select an option to see the explanation. Use the navigation buttons to move between questions.
        </p>
      </div>

      <style jsx>{`
        .prose img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
}