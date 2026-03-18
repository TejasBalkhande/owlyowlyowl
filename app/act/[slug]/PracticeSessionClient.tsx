"use client";

import { useEffect, useState, useRef, useCallback, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { MenuItem } from "@/types/menu";
import { PracticeLevel, Section } from "../lib/actSections";
import renderMathInElement from "katex/contrib/auto-render";
import "katex/dist/katex.min.css";
import Cal from "@/components/Cal";

const schoolMenu: MenuItem[] = [
  { label: "Mock-Test", href: "/act" },
  { label: "Study-Resources", href: "/act" },
  { label: "Practice-Questions", href: "/act/Practice-Questions" },
  { label: "Courses", href: "/act" },
  { label: "Roadmap", href: "/act" },
  { label: "Account", href: "/act" },
];

interface QuestionData {
  passages: { passageId: string; passageHtml: string }[];
  questions: {
    questionId: string;
    passageId: string;
    passageHighlight: string;
    questionHtml: string;
    options: Record<string, string>;
    correctOption: string;
    explanationHtml: string;
  }[];
}

interface PracticeSessionClientProps {
  initialData: QuestionData | null;
  levelInfo: { section: Section; level: PracticeLevel };
  imageBasePath: string;
  isRoadmap?: boolean;
}

export default function PracticeSessionClient({
  initialData,
  levelInfo,
  imageBasePath,
  isRoadmap = false,
}: PracticeSessionClientProps) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const [startTime] = useState<number>(isRoadmap ? Date.now() : 0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const passageRef = useRef<HTMLDivElement>(null);

  const isMath = levelInfo.section.name === "Mathematics";

  // ⏱️ Timer effect (unchanged)
  useEffect(() => {
    if (!isRoadmap) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRoadmap, startTime]);

  // 📥 Fetch questions on client if not provided
  useEffect(() => {
    if (!data) {
      const fetchData = async () => {
        try {
          const jsonUrl = `${imageBasePath}questions.json`;
          const res = await fetch(jsonUrl);
          if (res.ok) {
            const json = await res.json();
            setData(json);
          } else {
            console.error(`Failed to fetch questions: ${res.status}`);
          }
        } catch (err) {
          console.error("Error fetching questions:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [data, imageBasePath]);

  const transformHtml = useCallback(
    (html: string, highlight?: string): string => {
      if (!html) return "";
      let transformed = html.replace(
        /src="images\/([^"]+)"/g,
        (match, fileName) => `src="${imageBasePath}images/${fileName}"`
      );
      const highlightRegex = /\[highlight-(\d+)\]([\s\S]*?)\[\/highlight-\1\]/g;
      transformed = transformed.replace(highlightRegex, (match, num, innerContent) => {
        if (highlight && num === highlight) {
          return `<span class="bg-yellow-200">${innerContent}</span>`;
        } else {
          return innerContent;
        }
      });
      return transformed;
    },
    [imageBasePath]
  );

  // ✅ KaTeX effect – now uses useLayoutEffect to run before paint
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
  }, [data, selectedOptions, currentIndex, elapsedSeconds]); // elapsedSeconds still triggers re-render, but layout effect hides the flash

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

  const handleFinish = () => {
    if (!data || !isRoadmap) return;
    let correctCount = 0;
    data.questions.forEach((q) => {
      if (selectedOptions[q.questionId] === q.correctOption) correctCount++;
    });
    const totalQuestions = data.questions.length;
    const timeSeconds = elapsedSeconds;
    const slug = levelInfo.level.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const result = { correct: correctCount, total: totalQuestions, timeSeconds, date: new Date().toISOString() };
    const stored = localStorage.getItem("roadmapResults");
    const results = stored ? JSON.parse(stored) : {};
    results[slug] = result;
    localStorage.setItem("roadmapResults", JSON.stringify(results));
    router.push("/act/roadmap");
  };

  // 🌀 Loading state
  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar items={schoolMenu} logo="OwlenForge" />
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-3xl font-semibold text-[#1E4A76] mb-2">
            {levelInfo.level.title} Practice
          </h1>
          <p className="text-[#4A5568] font-times text-[17px] mb-6">
            {levelInfo.section.name} • {levelInfo.level.description}
          </p>
          <div className="border border-[#E2E8F0] rounded-2xl p-12 bg-white shadow-sm">
            <p className="text-[#718096] text-lg">Loading questions...</p>
          </div>
        </div>
      </div>
    );
  }

  // ❌ No data after fetch – show placeholder
  if (!data || data.questions.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar items={schoolMenu} logo="OwlenForge" />
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-3xl font-semibold text-[#1E4A76] mb-2">
            {levelInfo.level.title} Practice
          </h1>
          <p className="text-[#4A5568] font-times text-[17px] mb-6">
            {levelInfo.section.name} • {levelInfo.level.description}
          </p>
          <div className="border border-[#E2E8F0] rounded-2xl p-12 bg-white shadow-sm">
            <p className="text-[#718096] text-lg">
              🚧 Questions are being prepared. Check back soon!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = data.questions[currentIndex];
  const currentPassage = data.passages.find((p) => p.passageId === currentQuestion.passageId);
  const hasPassage = !!currentPassage;
  const selected = selectedOptions[currentQuestion.questionId];
  const isCorrect = selected === currentQuestion.correctOption;

  let passageQuestionIndex = 1;
  let passageQuestionCount = data.questions.length;
  if (hasPassage) {
    const questionsForPassage = data.questions.filter((q) => q.passageId === currentQuestion.passageId);
    passageQuestionCount = questionsForPassage.length;
    const pos = questionsForPassage.findIndex((q) => q.questionId === currentQuestion.questionId);
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
        {/* Header – unchanged */}
        <div className="flex flex-wrap items-center justify-between mb-4 font-sans">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-shrink-0">
              <Image src="/owl-apple.png" alt="Award" width={90} height={90} className="object-contain" />
            </div>
            <div>
              <h1 className="text-2xl md:text-2xl font-semibold text-[#1E4A76]">
                {levelInfo.level.title} Practice
              </h1>
              <p className="text-[#4A5568] font-times text-[17px]">
                {levelInfo.section.name} • {levelInfo.level.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isRoadmap && (
              <div className="text-sm bg-gray-100 px-3 py-1.5 rounded-full text-gray-700 font-mono">
                ⏱️ {Math.floor(elapsedSeconds / 60)}:{(elapsedSeconds % 60).toString().padStart(2, "0")}
              </div>
            )}
            {isMath && (
              <button
                onClick={() => setShowCalculator(!showCalculator)}
                className="px-4 py-2 bg-[#1E4A76] text-white rounded-lg hover:bg-[#163A5E] transition shadow-sm flex items-center gap-2"
              >
                <span>{showCalculator ? "Hide" : "Show"} Calculator</span>
              </button>
            )}
          </div>
        </div>

        {/* Calculator popup – unchanged */}
        {isMath && showCalculator && (
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

        {/* Main content card – unchanged */}
        <div className="border border-[#E2E8F0] rounded-2xl bg-white shadow-sm overflow-hidden flex-1 min-h-0 flex flex-col">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0] flex-1">
            {/* Left column – unchanged */}
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
                      __html: transformHtml(currentPassage.passageHtml, currentQuestion.passageHighlight),
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
                    dangerouslySetInnerHTML={{ __html: transformHtml(currentQuestion.questionHtml) }}
                  />
                </>
              )}
            </div>

            {/* Right column – unchanged */}
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
                    dangerouslySetInnerHTML={{ __html: transformHtml(currentQuestion.questionHtml) }}
                  />
                </div>
              )}

              {/* Options – unchanged */}
              <div className="space-y-3">
                <h4 className="font-medium text-[#4A5568]">Choose your answer</h4>
                {Object.entries(currentQuestion.options).map(([key, value]) => {
                  let optionClasses = "p-4 border rounded-xl cursor-pointer transition-all ";
                  if (selected) {
                    if (key === currentQuestion.correctOption) {
                      optionClasses += "bg-green-50 border-green-500 ring-1 ring-green-500 ";
                    } else if (key === selected && key !== currentQuestion.correctOption) {
                      optionClasses += "bg-red-50 border-red-500 ring-1 ring-red-500 ";
                    } else {
                      optionClasses += "bg-white border-[#E2E8F0] opacity-60 ";
                    }
                  } else {
                    optionClasses += "bg-white border-[#E2E8F0] hover:border-[#1E4A76] hover:shadow-sm ";
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

              {/* Explanation – unchanged */}
              {selected && (
                <div className="mt-6 p-5 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                  <h4 className="font-semibold text-[#1E4A76] mb-2">Explanation</h4>
                  <div
                    className="prose max-w-none text-sm text-[#2D3748]"
                    dangerouslySetInnerHTML={{ __html: transformHtml(currentQuestion.explanationHtml) }}
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

              {/* Navigation – unchanged */}
              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={goToPrevious}
                  disabled={currentIndex === 0}
                  className="px-5 py-2 border border-[#E2E8F0] rounded-lg text-[#2D3748] bg-white hover:bg-[#F7F9FC] disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
                >
                  ← Previous
                </button>
                {isRoadmap ? (
                  <button
                    onClick={handleFinish}
                    className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm font-medium"
                  >
                    Finish Practice
                  </button>
                ) : null}
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
          Select an option to see the explanation. Use the progress bar to track your position.
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