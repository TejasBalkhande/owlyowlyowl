// app/ged/Practice-Questions/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
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
        name: "Reading",
        description: "Comprehend, analyze, and interpret complex literary and informational texts.",
        hours: "~50 hours",
        skills: [
          "Determine central ideas or themes and analyze their development",
          "Analyze how individuals, events, and ideas develop and interact",
          "Interpret words and phrases, including connotative and figurative meanings",
          "Analyze text structure and how sentences/paragraphs relate",
          "Compare two or more texts addressing similar themes or topics",
          "Analyze how data or visuals extend, clarify, or contradict text"
        ]
      },
      {
        name: "Writing & Language",
        description: "Demonstrate command of grammar, usage, editing, and revision skills.",
        hours: "~30 hours",
        skills: [
          "Demonstrate command of standard English grammar and usage",
          "Edit for capitalization, punctuation, and sentence structure",
          "Revise to eliminate wordiness, awkward constructions, and run-ons",
          "Use transitional words and conjunctive adverbs effectively",
          "Ensure subject-verb agreement and proper pronoun usage",
          "Correct frequently confused words and homonyms"
        ]
      },
      {
        name: "Extended Response",
        description: "Produce an analytic essay using evidence from source texts.",
        hours: "~35 hours",
        skills: [
          "Generate text-based arguments using relevant evidence",
          "Organize ideas logically with a clear structure and focus",
          "Write clearly with appropriate tone and style",
          "Demonstrate command of standard English conventions",
          "Analyze and evaluate arguments within source texts",
          "Develop ideas thoroughly with well-chosen examples"
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
        description: "Number sense, operations, ratios, geometry, data, and probability.",
        hours: "~60 hours",
        skills: [
          "Order rational numbers, absolute value, multiples, factors, exponents",
          "Perform operations with rational, fraction, and decimal numbers",
          "Calculate and use ratios, percents, and scale factors",
          "Compute dimensions, perimeter, area, and circumference of 2D figures",
          "Compute volume and surface area of 3D figures (prisms, cylinders, spheres)",
          "Interpret and create data displays (bar graphs, histograms, box plots)",
          "Calculate mean, median, mode, weighted average, and range",
          "Use counting techniques and determine probabilities"
        ]
      },
      {
        name: "Algebraic Problem Solving",
        description: "Expressions, equations, functions, and graphing.",
        hours: "~60 hours",
        skills: [
          "Write, evaluate, and compute with expressions and polynomials",
          "Write, manipulate, and solve linear equations (one variable, systems)",
          "Write, manipulate, and solve quadratic equations",
          "Connect and interpret graphs and functions (linear/nonlinear)",
          "Connect coordinates, lines, and equations (slope, parallel/perpendicular)",
          "Compare, represent, and evaluate functions in different forms"
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
        description: "Human body, health, energy flow, heredity, and evolution.",
        hours: "~20 hours",
        skills: [
          "Understand body systems, homeostasis, nutrition, and disease",
          "Analyze energy flow in ecosystems (photosynthesis, food webs, energy pyramids)",
          "Explain organization of life (cells, tissues, organs, systems)",
          "Apply concepts of heredity (DNA, Punnett squares, genotypes/phenotypes)",
          "Understand evolution, natural selection, adaptation, and speciation"
        ]
      },
      {
        name: "Physical Science",
        description: "Energy, motion, forces, and chemical properties.",
        hours: "~20 hours",
        skills: [
          "Conservation, transformation, and flow of energy (kinetic, chemical, thermal)",
          "Work, motion, and forces (Newton's Laws, gravity, momentum)",
          "Chemical properties, reactions, and balancing equations",
          "Properties of waves, electromagnetic radiation, and energy transfer"
        ]
      },
      {
        name: "Earth & Space Science",
        description: "Earth's systems, resources, and the cosmos.",
        hours: "~20 hours",
        skills: [
          "Interactions between Earth's systems and living things (cycles, hazards, resources)",
          "Earth's structure (atmosphere, oceans, interior, tectonic plates)",
          "Structures of the cosmos (galaxies, stars, solar systems, Earth's motion)",
          "Understand the age and development of the universe and Earth"
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
        name: "Civics & Government",
        description: "Types of government, constitutional principles, and civic rights.",
        hours: "~25 hours",
        skills: [
          "Identify types of modern and historical governments",
          "Understand principles of American constitutional democracy (separation of powers, federalism)",
          "Structure and design of U.S. government (branches, powers, amendment process)",
          "Individual rights, civic responsibilities, and the Bill of Rights",
          "Political parties, campaigns, elections, and public policy"
        ]
      },
      {
        name: "U.S. History",
        description: "Key events, eras, and documents that shaped the nation.",
        hours: "~15 hours",
        skills: [
          "Analyze major eras (Colonial, Revolution, Civil War, Industrialization, 20th century)",
          "Understand key documents (Declaration of Independence, Constitution, Bill of Rights)",
          "Evaluate causes and impacts of wars (Revolutionary, Civil, World Wars)",
          "Analyze social movements (civil rights, women's suffrage)"
        ]
      },
      {
        name: "Economics",
        description: "Fundamental concepts, micro/macroeconomics, and consumer economics.",
        hours: "~10 hours",
        skills: [
          "Fundamental concepts (markets, incentives, opportunity cost, specialization)",
          "Microeconomics and macroeconomics (supply/demand, fiscal policy, GDP, unemployment)",
          "Consumer economics (credit, savings, banking, consumer protection laws)",
          "Economic causes and impacts of wars, exploration, and industrial revolutions"
        ]
      },
      {
        name: "Geography & the World",
        description: "Environment, borders, migration, and human interaction with place.",
        hours: "~10 hours",
        skills: [
          "Relationship between environment and societal development (resources, sustainability)",
          "Borders between peoples and nations (region, place, cultural diversity)",
          "Human migration (immigration, emigration, population trends, urbanization)",
          "Development of classical civilizations and geographic tools"
        ]
      }
    ]
  }
];

export default function GEDPracticeQuestionsPage() {
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

  // Handle start practice
  const handleStartPractice = () => {
    if (selectedSkills.size === 0) {
      alert("Please select at least one skill to practice.");
      return;
    }
    alert(`Starting practice with ${selectedSkills.size} selected skill(s). Question engine coming soon!`);
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