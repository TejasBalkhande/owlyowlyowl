"use client";

import { useEffect, useState, useRef, useCallback } from "react";
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
  passages: {
    passageId: string;
    passageHtml: string;
  }[];
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
  levelInfo: {
    section: Section;
    level: PracticeLevel;
  };
  imageBasePath: string;
}

export default function PracticeSessionClient({
  initialData,
  levelInfo,
  imageBasePath,
}: PracticeSessionClientProps) {
  const [data] = useState(initialData);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const passageRef = useRef<HTMLDivElement>(null);

  const isMath = levelInfo.section.name === "Mathematics";

  // Transform HTML: replace image src and handle highlight tags
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

  // Run KaTeX after every render
  useEffect(() => {
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

  // Scroll to highlighted part of passage
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

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    if (data) {
      setCurrentIndex((prev) => Math.min(data.questions.length - 1, prev + 1));
    }
  };

  // Missing data state
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

  // Passage‑relative question numbers
  let passageQuestionIndex = 1;
  let passageQuestionCount = data.questions.length;
  if (hasPassage) {
    const questionsForPassage = data.questions.filter((q) => q.passageId === currentQuestion.passageId);
    passageQuestionCount = questionsForPassage.length;
    const pos = questionsForPassage.findIndex((q) => q.questionId === currentQuestion.questionId);
    passageQuestionIndex = pos + 1;
  }

  // Common heading for the question
  const questionHeading = hasPassage
    ? `Passage Question ${passageQuestionIndex} of ${passageQuestionCount}`
    : `Question ${currentIndex + 1} of ${data.questions.length}`;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar items={schoolMenu} logo="OwlenForge" />

      {/* Main content area – takes remaining vertical space */}
      <div
        className="flex-1 w-full max-w-7.5xl mx-auto px-4 sm:px-6 lg:px-10 py-6 flex flex-col"
        ref={contentRef}
      >
        {/* Header with calculator toggle */}
        <div className="flex flex-wrap items-center justify-between mb-4 font-sans">
          <div className="flex items-center gap-2 mb-1">
            {/* Award Image */}
            <div className="flex-shrink-0">
              <Image
                src="/owl-apple.png"
                alt="Award"
                width={90}
                height={90}
                className="object-contain"
              />
            </div>

            {/* Your Original Div (Unchanged) */}
            <div className="flex flex-wrap items-center justify-between font-sans">
              <div>
                <h1 className="text-2xl md:text-2xl font-semibold text-[#1E4A76]">
                  {levelInfo.level.title} Practice
                </h1>
                <p className="text-[#4A5568] font-times text-[17px]">
                  {levelInfo.section.name} • {levelInfo.level.description}
                </p>
              </div>
            </div>
          </div>
          {isMath && (
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="mt-2 sm:mt-0 px-4 py-2 bg-[#1E4A76] text-white rounded-lg hover:bg-[#163A5E] transition shadow-sm flex items-center gap-2"
            >
              <span>{showCalculator ? "Hide" : "Show"} Calculator</span>
            </button>
          )}
        </div>

        {/* Calculator popup (math only) */}
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

        {/* Main content card – fills remaining space and scrolls internally */}
        <div className="border border-[#E2E8F0] rounded-2xl bg-white shadow-sm overflow-hidden flex-1 min-h-0 flex flex-col">
          {/* Always two columns – use flex-1 to fill card height */}
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0] flex-1">
            {/* LEFT COLUMN */}
            <div
              className={`md:p-6 px-3 py-3 overflow-y-auto ${
                hasPassage ? "bg-[#F7F9FC]/50" : "bg-white"
              }`}
              ref={hasPassage ? passageRef : null}
              
            >
              {hasPassage ? (
                // Passage content
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
                // Question content (when no passage)
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

            {/* RIGHT COLUMN */}
            <div className="p-6 overflow-y-auto">
              {hasPassage && (
                // If passage exists, show question heading and question HTML here
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

              {/* Options (always shown in right column) */}
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

              {/* Explanation (always in right column) */}
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

              {/* Navigation (always at bottom of right column) */}
              <div className="mt-8 flex justify-between">
                <button
                  onClick={goToPrevious}
                  disabled={currentIndex === 0}
                  className="px-5 py-2 border border-[#E2E8F0] rounded-lg text-[#2D3748] bg-white hover:bg-[#F7F9FC] disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
                >
                  ← Previous
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

        {/* Footer hint */}
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