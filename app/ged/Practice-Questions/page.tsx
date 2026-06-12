// app/GED/Practice-Questions/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as LucideIcons from "lucide-react";
import Navbar from "@/components/Navbar";
import { MenuItem } from "@/types/menu";

// Navigation menu items for GED section
const gedMenu: MenuItem[] = [
  { label: "Practice Tests", href: "/ged/Practice-Questions#full-length-mock-test" },
  { label: "Study Resources", href: "/ged" },
  { label: "Practice Questions", href: "/ged/Practice-Questions" },
  { label: "Courses", href: "/ged/courses" },
  { label: "Study Plan", href: "/ged/studyplan" },
  { label: "My Account", href: "/account" },
];

// Generate a unique ID for each skill (subject + domain + skill)
const getSkillId = (subjectId: string, domainName: string, skill: string): string => {
  return `${subjectId}|${domainName}|${skill}`;
};

// Domain data structure
interface Domain {
  name: string;
  description: string;
  hours: string;
  skills: string[];
}

interface Subject {
  id: string;
  name: string;
  icon: React.ElementType;
  iconBgColor: string;
  domains: Domain[];
}

// ============================================
// GED SUBJECTS, DOMAINS & SKILLS (from PDF)
// ============================================

const subjects: Subject[] = [
  {
    id: "rla",
    name: "Reasoning Through Language Arts",
    icon: LucideIcons.ScrollText,
    iconBgColor: "bg-lime-600",
    domains: [
      {
        name: "Reading for Meaning",
        description: "Read closely to analyze literary and informational texts, understand author purpose and tone, interpret figurative language, and compare different ways ideas are presented.",
        hours: "~40 hours",
        skills: [
          "Events plots characters settings and ideas",
          "Understanding main ideas and details",
          "Point of view and purpose",
          "Tone and figurative language",
          "Organizing ideas",
          "Comparing different ways of presenting ideas"
        ]
      },
      {
        name: "Identifying and Creating Arguments",
        description: "Evaluate evidence, draw conclusions, analyze arguments, interpret data and graphics, and write an evidence-based argumentative essay.",
        hours: "~35 hours",
        skills: [
          "Relationship of evidence to main ideas and details",
          "Drawing conclusions making inferences and evaluating evidence",
          "Analyzing data graphs or pictures as evidence",
          "Extending understanding to new situations",
          "Writing an argumentative essay (extended response)"
        ]
      },
      {
        name: "Grammar and Language",
        description: "Apply standard English conventions to edit and revise texts for clarity, correct word usage, sentence structure, transitions, and punctuation.",
        hours: "~25 hours",
        skills: [
          "Correcting word usage",
          "Sentence structure",
          "Using effective transition words and phrases",
          "Capitalization, punctuation, and apostrophes"
        ]
      }
    ]
  },
  {
    id: "math",
    name: "Mathematical Reasoning",
    icon: LucideIcons.Sigma,
    iconBgColor: "bg-red-600",
    domains: [
      {
        name: "Quantitative Problem Solving",
        description: "Apply basic math, statistics, geometry, and data interpretation to solve real-world problems (45% of the exam).",
        hours: "~55 hours",
        skills: [
          "Fractions Decimals and Order of Operations",
          "Ratios Proportions and Percentages",
          "Data Analysis, Probability, and Scatterplots",
          "Interpreting Graphs and Tables",
          "Perimeter, Area, Surface Area, and Volume"
        ]
      },
      {
        name: "Algebraic Problem Solving",
        description: "Create, evaluate, and interpret equations, inequalities, and functions in real-world scenarios (55% of the exam).",
        hours: "~65 hours",
        skills: [
          "Simplifying Expressions, Exponents, and Radicals",
          "Solving Linear Equations and Inequalities",
          "Systems of Equations and Quadratic Equations",
          "Graphing on the Coordinate Plane and Finding Slope",
          "Evaluating and Interpreting Functions"
        ]
      }
    ]
  },
  {
    id: "science",
    name: "Science",
    icon: LucideIcons.FlaskConical,
    iconBgColor: "bg-emerald-600",
    domains: [
      {
        name: "Life Science",
        description: "Apply scientific reasoning to interpret data and experiments related to human body systems, genetics, and ecosystems (40% of the exam).",
        hours: "~25 hours",
        skills: [
          "Cell Structures and Human Body Systems",
          "Genetics, Heredity, and Punnett Squares",
          "Ecosystems, Energy Flow, and Natural Selection",
          "Understanding Experimental Design in Biology"
        ]
      },
      {
        name: "Physical Science",
        description: "Evaluate scientific conclusions and analyze graphs related to chemistry, physics, and thermodynamics (40% of the exam).",
        hours: "~25 hours",
        skills: [
          "Atoms, Molecules, and Chemical Reactions",
          "Forces, Motion, and Newton's Laws",
          "Work, Energy Conservation, and Waves",
          "Interpreting Scientific Data and Graphs"
        ]
      },
      {
        name: "Earth and Space Science",
        description: "Analyze evidence and interpret charts investigating the Earth's structure, weather systems, and the universe (20% of the exam).",
        hours: "~10 hours",
        skills: [
          "Earth's Structure and Plate Tectonics",
          "Weather, Climate, and the Water Cycle",
          "The Solar System and Universe",
          "Analyzing Scientific Conclusions in Earth Science"
        ]
      }
    ]
  },
  {
    id: "social",
    name: "Social Studies",
    icon: LucideIcons.Globe2,
    iconBgColor: "bg-purple-600",
    domains: [
      {
        name: "Civics and Government",
        description: "Evaluate reasoning and interpret primary sources related to the U.S. Constitution, government branches, and the electoral system (50% of the exam).",
        hours: "~30 hours",
        skills: [
          "Analyzing Primary Source Documents",
          "The U.S. Constitution and Branches of Government",
          "Elections, Political Parties, and Civic Duties",
          "Interpreting Political Cartoons"
        ]
      },
      {
        name: "United States History",
        description: "Analyze historical documents and evaluate cause-and-effect relationships across key eras and societal shifts (20% of the exam).",
        hours: "~12 hours",
        skills: [
          "Historical Document Analysis",
          "Cause and Effect in US History",
          "Revolutionary War to Reconstruction",
          "Industrialization, Global Conflicts, and Civil Rights"
        ]
      },
      {
        name: "Economics",
        description: "Interpret graphs and data to understand fundamental market systems, government economic policies, and trade (15% of the exam).",
        hours: "~9 hours",
        skills: [
          "Microeconomics: Supply, Demand, and Prices",
          "Macroeconomics: Government Policy and Labor",
          "Evaluating Economic Data and Global Trade"
        ]
      },
      {
        name: "Geography and the World",
        description: "Interpret maps, understand human migration, and evaluate evidence of human-environment interactions (15% of the exam).",
        hours: "~9 hours",
        skills: [
          "Interpreting Maps and Demographic Data",
          "Human Migration and Population Trends",
          "Human-Environment Interaction and Resources"
        ]
      }
    ]
  }
];

export default function GEDPracticeQuestionsPage() {
  const router = useRouter();
  // Set of selected skill IDs
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
  const toggleAllSkillsInDomain = (subjectId: string, domainName: string, skills: string[]) => {
    const domainSkillIds = skills.map((skill) => getSkillId(subjectId, domainName, skill));
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
  const isAllSelectedInDomain = (subjectId: string, domainName: string, skills: string[]) => {
    const domainSkillIds = skills.map((skill) => getSkillId(subjectId, domainName, skill));
    return domainSkillIds.every((id) => selectedSkills.has(id));
  };

  // Handle start practice - navigate to dynamic session
  const handleStartPractice = () => {
    if (selectedSkills.size === 0) {
      alert("Please select at least one skill to practice.");
      return;
    }
    const skillsParam = Array.from(selectedSkills).join(",");
    router.push(`/ged/practice?skills=${encodeURIComponent(skillsParam)}`);
  };

  // Clear all selections
  const clearAllSelections = () => {
    setSelectedSkills(new Set());
  };

  const selectedCount = selectedSkills.size;

  return (
    <div className="bg-white min-h-screen">
      <Navbar items={gedMenu} logo="OwlenForge" />

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
                    GED Practice by Topic
                  </h1>
                </div>
                <p className="text-[#4A5568] text-[17px] max-w-3xl">
                  Select specific skills or entire domains across all four GED subjects: Reasoning Through Language Arts,
                  Mathematical Reasoning, Science, and Social Studies. Customize your practice session to focus on exactly
                  what you need to improve.
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

              {/* DYNAMIC SECTIONS FOR EACH SUBJECT */}
              {subjects.map((subject) => (
                <div key={subject.id}>
                  <div className="flex items-center gap-3 mb-5 pb-2 border-b-2 border-gray-200">
                    <div className={`${subject.iconBgColor} p-2 rounded-full shadow-sm`}>
                      <subject.icon className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                      {subject.name}
                    </h2>
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {subject.domains.length} domains
                    </span>
                  </div>
                  <div className="space-y-5">
                    {subject.domains.map((domain) => {
                      const allSelected = isAllSelectedInDomain(
                        subject.id,
                        domain.name,
                        domain.skills
                      );
                      return (
                        <div
                          key={`${subject.id}-${domain.name}`}
                          className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition overflow-hidden"
                        >
                          <div className="p-5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-[#1E4A76]">
                                  {domain.name}
                                </h3>
                                <p className="text-sm text-[#4A5568] mt-1 max-w-none">
                                  {domain.description}
                                </p>
                                <p className="text-xs text-[#718096] mt-1">
                                  Recommended study time: {domain.hours}
                                </p>
                              </div>
                              <button
                                onClick={() =>
                                  toggleAllSkillsInDomain(
                                    subject.id,
                                    domain.name,
                                    domain.skills
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
                              {domain.skills.map((skill) => {
                                const skillId = getSkillId(subject.id, domain.name, skill);
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
              ))}

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
                  { label: "Study Roadmap", href: "/ged/roadmap", icon: "Map" },
                  { label: "Video Lessons", href: "/ged/courses", icon: "PlayCircle" },
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

              {/* Pro Tip Card */}
              <div className="bg-[#EBF5FF] rounded-xl p-4 border border-[#B8D1E6]">
                <div className="flex gap-2">
                  <LucideIcons.Lightbulb className="w-5 h-5 text-[#1E4A76] flex-shrink-0" />
                  <p className="text-xs text-[#2D3748]">
                    <span className="font-semibold">GED Pro Tip:</span> Focus on 2–3 related skills per session. Use the
                    notional time estimates to plan your weekly study schedule effectively.
                  </p>
                </div>
              </div>

              {/* Guidance Card */}
              <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-4">
                <h3 className="font-semibold text-[#2D3748] text-sm mb-2">Need a study plan?</h3>
                <p className="text-xs text-[#718096] mb-3">
                  Not sure where to start? Review your weak areas from the GED Ready® practice test or take a diagnostic quiz.
                </p>
                <Link
                  href="/ged"
                  className="text-xs text-[#1E4A76] font-medium hover:underline inline-flex items-center gap-1"
                >
                  View GED prep hub <LucideIcons.ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Official GED Note */}
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
                <p className="text-[11px] text-amber-800">
                  Based on official GED® test content topics and notional learning time recommendations (Aug. 2022).
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}