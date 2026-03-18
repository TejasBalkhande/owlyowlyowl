// app/act/Practice-Questions/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { MenuItem } from "@/types/menu";
import { sections } from "../lib/actSections";

const schoolMenu: MenuItem[] = [
  { label: "Mock-Test", href: "/act" },
  { label: "Study-Resources", href: "/act" },
  { label: "Practice-Questions", href: "/act/Practice-Questions" },
  { label: "Courses", href: "/act" },
  { label: "Roadmap", href: "/act" },
  { label: "Account", href: "/act" },
];

// Helper to slugify a string (for URL)
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export default function PracticeQuestionsPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<{
    section: string;
    option: (typeof sections)[number]["options"][number];
  } | null>(null);

  const practicePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedOption && practicePanelRef.current) {
      practicePanelRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedOption]);

  const getLevelBadgeColor = (level: { level: number }) => {
    const palette = [
      { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300" },       // 2
      { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-300" },           // 3
      { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300" },           // 4
      { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-300" },     // 5
      { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300" },     // 6
      { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-300" },     // 7
      { bg: "bg-pink-100", text: "text-pink-700", border: "border-pink-300" },           // 8
      { bg: "bg-teal-100", text: "text-teal-700", border: "border-teal-300" },           // 9
    ];

    // Use the level number (1-based) to pick a color; fallback to index 0 if level is missing
    const index = (level.level - 1) % palette.length;
    const colors = palette[index] || palette[0];
    return `${colors.bg} ${colors.text} ${colors.border}`;
  };

  const handleStartPractice = (levelTitle: string) => {
    const slug = slugify(levelTitle);
    router.push(`/act/${slug}`);
  };

  return (
    <div className="bg-gradient-to-b from-white to-slate-50 min-h-screen">
      <Navbar items={schoolMenu} logo="OwlenForge" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-sans">
        <div className="mb-5">
        <div className="flex items-center gap-4 mb-4 font-sans">

          {/* Image */}
          <div className="flex-shrink-0">
            <Image
              src="/owl-think.png"
              alt="Topic-wise Practice"
              width={90}
              height={90}
              className="object-contain"
            />
          </div>

          {/* Text */}
          <div>
            <h1 className="text-2xl md:text-2xl font-semibold text-[#1E4A76]">
              Topic-wise Practice
            </h1>
            <p className="text-[#4A5568] font-times text-[17px]">
              Select a topic below to build confidence step by step.
            </p>
          </div>

        </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {sections.map((section) => (
            <div
              key={section.name}
              className="group bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl px-6 py-6 shadow-md hover:shadow-xl transition-all duration-300 hover:border-[#3e6286]/30"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
                {section.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {section.options.map((option) => {
                  const isActive =
                    selectedOption?.section === section.name &&
                    selectedOption?.option.name === option.name;
                  return (
                    <button
                      key={option.name}
                      onClick={() =>
                        setSelectedOption({ section: section.name, option })
                      }
                      className={`
                        px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 mb-1
                        ${
                          isActive
                            ? "bg-[#3e6286] border-[#3e6286] text-white shadow-md shadow-[#3e6286]/30 "
                            : "bg-white border-gray-300 text-gray-700 hover:border-[#3e6286] hover:bg-[#3e6286]/5 hover:scale-105"
                        }
                      `}
                    >
                      {option.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Practice Levels Panel */}
        {selectedOption && (
          <div ref={practicePanelRef} className="mb-24 scroll-mt-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold font-sans text-gray-900">
                Practice Levels for{" "}
                <span className="text-[#3e6286] relative">
                  {selectedOption.option.name}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#3e6286]/30 rounded-full"></span>
                </span>
              </h2>
              <p className="text-gray-600 font-serif text-lg mt-3">
                {selectedOption.section} • Choose your difficulty
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedOption.option.practiceLevels.map((level) => (
                <div
                  key={level.level}
                  className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Header with level badge and title */}
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold border ${getLevelBadgeColor(
                        level
                      )}`}
                    >
                      {level.level}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {level.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-5 leading-relaxed flex-1">
                    {level.description}
                  </p>
                  <button
                    onClick={() => handleStartPractice(level.title)}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-[#3e6286] to-[#2c4a6e] text-white rounded-lg font-medium shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#3e6286] focus:ring-offset-2"
                  >
                    Start Practice
                  </button>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 text-center mt-10 italic">
              Each practice set contains 10–15 questions. Full explanations provided after submission.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}