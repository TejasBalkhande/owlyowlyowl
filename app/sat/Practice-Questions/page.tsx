// app/sat/Practice-Questions/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ADDED for navigation
import * as LucideIcons from "lucide-react";
import Navbar from "@/components/Navbar";
import { MenuItem } from "@/types/menu";
import { readingWritingDomains, mathDomains } from "../lib/domainData";

// Navigation menu items (same as main SAT page)
const schoolMenu: MenuItem[] = [
  { label: "Practice Tests", href: "/sat/Practice-Questions#full-length-mock-test" },
  { label: "Study Resources", href: "/sat" },
  { label: "Practice Questions", href: "/sat/Practice-Questions" },
  { label: "Courses", href: "/sat/courses" },
  { label: "Study Plan", href: "/sat/studyplan" },
  { label: "My Account", href: "/account" },
];

// Helper: split skills string into array
const splitSkills = (skillsStr: string): string[] => {
  return skillsStr.split(";").map((s) => s.trim()).filter(Boolean);
};

// Generate a unique ID for each skill
const getSkillId = (section: string, domainName: string, skill: string) => {
  return `${section}|${domainName}|${skill}`;
};

export default function PracticeQuestionsPage() {
  const router = useRouter(); // ADDED
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());

  // Toggle a single skill
  const toggleSkill = (skillId: string) => {
    setSelectedSkills((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(skillId)) {
        newSet.delete(skillId);
      } else {
        newSet.add(skillId);
      }
      return newSet;
    });
  };

  // Select / deselect all skills within a domain
  const toggleAllSkillsInDomain = (
    section: string,
    domainName: string,
    skills: string[]
  ) => {
    const domainSkillIds = skills.map((skill) =>
      getSkillId(section, domainName, skill)
    );
    const allSelected = domainSkillIds.every((id) => selectedSkills.has(id));

    setSelectedSkills((prev) => {
      const newSet = new Set(prev);
      if (allSelected) {
        domainSkillIds.forEach((id) => newSet.delete(id));
      } else {
        domainSkillIds.forEach((id) => newSet.add(id));
      }
      return newSet;
    });
  };

  // Check if all skills in a domain are selected
  const isAllSelectedInDomain = (section: string, domainName: string, skills: string[]) => {
    const domainSkillIds = skills.map((skill) =>
      getSkillId(section, domainName, skill)
    );
    return domainSkillIds.every((id) => selectedSkills.has(id));
  };

  // Handle start practice - UPDATED to navigate to dynamic session
  const handleStartPractice = () => {
    if (selectedSkills.size === 0) {
      alert("Please select at least one skill to practice.");
      return;
    }
    const skillsParam = Array.from(selectedSkills).join(",");
    // Navigate to the dynamic route (slug can be any value; we use "practice")
    router.push(`/sat/practice?skills=${encodeURIComponent(skillsParam)}`);
  };

  // Clear all selections
  const clearAllSelections = () => {
    setSelectedSkills(new Set());
  };

  // Get selected skills count
  const selectedCount = selectedSkills.size;

  return (
    <div className="bg-white min-h-screen">
      <Navbar items={schoolMenu} logo="OwlenForge" />

      <div className="bg-gray-50 w-full overflow-visible">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* LEFT COLUMN - Topic Selection Area */}
            <div className="lg:col-span-4 space-y-8">
              {/* Page Header */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]">
                <div className="flex items-center gap-3 mb-3">
                  <LucideIcons.Target className="h-7 w-7 text-[#1E4A76]" />
                  <h1 className="text-2xl md:text-3xl font-semibold text-[#1E4A76]">
                    Practice by Topic
                  </h1>
                </div>
                <p className="text-[#4A5568] text-[17px] max-w-3xl">
                  Select specific skills or entire domains from Reading & Writing and Mathematics.
                  Customize your practice session to focus on exactly what you need to improve.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={clearAllSelections}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E2E8F0] text-sm text-[#2D3748] font-medium hover:bg-gray-50 transition"
                  >
                    <LucideIcons.Eraser className="h-4 w-4" />
                    Clear All
                  </button>
                  <button
                    onClick={handleStartPractice}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#1E4A76] text-white text-sm font-semibold shadow hover:bg-[#163A5E] transition"
                  >
                    <LucideIcons.Play className="h-4 w-4" />
                    Start Practice ({selectedCount})
                  </button>
                </div>
              </div>

              {/* READING & WRITING SECTION */}
              <div>
                <div className="flex items-center gap-3 mb-5 pb-2 border-b-2 border-gray-200">
                  <div className="bg-lime-600 p-2 rounded-full shadow-sm">
                    <LucideIcons.ScrollText className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                    Reading & Writing
                  </h2>
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    4 domains
                  </span>
                </div>
                <div className="space-y-5">
                  {readingWritingDomains.map((domain) => {
                    const skillsList = splitSkills(domain.skills);
                    const allSelected = isAllSelectedInDomain(
                      "reading",
                      domain.domain,
                      skillsList
                    );
                    return (
                      <div
                        key={`reading-${domain.domain}`}
                        className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition overflow-hidden"
                      >
                        <div className="p-5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-[#1E4A76]">
                                {domain.domain}
                              </h3>
                              <p className="text-sm text-[#4A5568] mt-1 max-w-none">
                                {domain.description}
                              </p>
                              <p className="text-xs text-[#718096] mt-1">
                                Approx. {domain.questions} questions on test
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                toggleAllSkillsInDomain(
                                  "reading",
                                  domain.domain,
                                  skillsList
                                )
                              }
                              className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border border-[#1E4A76] text-[#1E4A76] bg-white hover:bg-[#F0F7FF] transition"
                            >
                              {allSelected ? (
                                <>
                                  <LucideIcons.CheckSquare className="h-3.5 w-3.5" />
                                  Deselect All
                                </>
                              ) : (
                                <>
                                  <LucideIcons.Square className="h-3.5 w-3.5" />
                                  Select All
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {skillsList.map((skill) => {
                              const skillId = getSkillId(
                                "reading",
                                domain.domain,
                                skill
                              );
                              const isSelected = selectedSkills.has(skillId);
                              return (
                                <label
                                  key={skillId}
                                  className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleSkill(skillId)}
                                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1E4A76] focus:ring-[#1E4A76] focus:ring-offset-0"
                                  />
                                  <span className="text-sm text-[#2D3748] leading-tight">
                                    {skill}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* MATHEMATICS SECTION */}
              <div>
                <div className="flex items-center gap-3 mb-5 pb-2 border-b-2 border-gray-200">
                  <div className="bg-red-600 p-2 rounded-full shadow-sm">
                    <LucideIcons.Sigma className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                    Mathematics
                  </h2>
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    4 domains
                  </span>
                </div>
                <div className="space-y-5">
                  {mathDomains.map((domain) => {
                    const skillsList = splitSkills(domain.skills);
                    const allSelected = isAllSelectedInDomain(
                      "math",
                      domain.domain,
                      skillsList
                    );
                    return (
                      <div
                        key={`math-${domain.domain}`}
                        className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition overflow-hidden"
                      >
                        <div className="p-5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-[#1E4A76]">
                                {domain.domain}
                              </h3>
                              <p className="text-sm text-[#4A5568] mt-1 max-w-none">
                                {domain.description}
                              </p>
                              <p className="text-xs text-[#718096] mt-1">
                                Approx. {domain.questions} questions on test
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                toggleAllSkillsInDomain(
                                  "math",
                                  domain.domain,
                                  skillsList
                                )
                              }
                              className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border border-[#1E4A76] text-[#1E4A76] bg-white hover:bg-[#F0F7FF] transition"
                            >
                              {allSelected ? (
                                <>
                                  <LucideIcons.CheckSquare className="h-3.5 w-3.5" />
                                  Deselect All
                                </>
                              ) : (
                                <>
                                  <LucideIcons.Square className="h-3.5 w-3.5" />
                                  Select All
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {skillsList.map((skill) => {
                              const skillId = getSkillId(
                                "math",
                                domain.domain,
                                skill
                              );
                              const isSelected = selectedSkills.has(skillId);
                              return (
                                <label
                                  key={skillId}
                                  className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleSkill(skillId)}
                                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1E4A76] focus:ring-[#1E4A76] focus:ring-offset-0"
                                  />
                                  <span className="text-sm text-[#2D3748] leading-tight">
                                    {skill}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom action bar for mobile */}
              <div className="sticky bottom-4 lg:hidden bg-white rounded-xl shadow-lg border border-[#E2E8F0] p-4 flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-[#2D3748]">
                    {selectedCount} skill(s) selected
                  </span>
                </div>
                <button
                  onClick={handleStartPractice}
                  className="px-5 py-2 bg-[#1E4A76] text-white rounded-lg text-sm font-semibold shadow"
                >
                  Practice Now
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN - Summary Dashboard */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Quick links */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 border-b border-[#E2E8F0]">
                  <p className="text-xs font-semibold text-[#2D3748]">Quick Links</p>
                </div>
                {[
                  { label: "Full-Length Mocks", href: "#full-length-mock-test", icon: "FileText" },
                  { label: "Study Roadmap", href: "/sat/roadmap", icon: "Map" },
                  { label: "Video Lessons", href: "/sat/courses", icon: "PlayCircle" },
                ].map((link) => {
                  const Icon = LucideIcons[link.icon as keyof typeof LucideIcons] as React.ElementType;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="flex items-center justify-between px-4 py-3 text-xs text-[#4A5568] hover:bg-[#F0F7FF] hover:text-[#1E4A76] transition-colors duration-150 border-b border-[#E2E8F0] last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-[#1E4A76]" />
                        {link.label}
                      </div>
                      <LucideIcons.ArrowRight className="w-3 h-3" />
                    </Link>
                  );
                })}
              </div>

              <div className="bg-[#EBF5FF] rounded-xl p-4 border border-[#B8D1E6]">
                <div className="flex gap-2">
                  <LucideIcons.Lightbulb className="w-5 h-5 text-[#1E4A76] flex-shrink-0" />
                  <p className="text-xs text-[#2D3748]">
                    <span className="font-semibold">Pro Tip:</span> Focus on 2–3 related skills per practice session. Quality over quantity helps build deeper understanding.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-4">
                <h3 className="font-semibold text-[#2D3748] text-sm mb-2">Need guidance?</h3>
                <p className="text-xs text-[#718096] mb-3">
                  Not sure where to start? Check your weak areas from your dashboard or take a diagnostic quiz.
                </p>
                <Link
                  href="/sat"
                  className="text-xs text-[#1E4A76] font-medium hover:underline inline-flex items-center gap-1"
                >
                  View full SAT prep <LucideIcons.ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}