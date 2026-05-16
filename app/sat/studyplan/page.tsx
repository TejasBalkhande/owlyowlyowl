// app/sat/studyplan/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import Navbar from "@/components/Navbar";
import { MenuItem } from "@/types/menu";
import { readingWritingDomains, mathDomains } from "../lib/domainData";

// Navigation menu items (consistent with other SAT pages)
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

// Structure of a roadmap step
interface RoadmapStep {
  id: string;
  skillName: string;
  domainName: string;
  section: "reading" | "math";
}

// Get all available skills from both sections
const getAllAvailableSkills = (): RoadmapStep[] => {
  const steps: RoadmapStep[] = [];

  // Reading & Writing skills
  readingWritingDomains.forEach((domain) => {
    const skills = splitSkills(domain.skills);
    skills.forEach((skill) => {
      steps.push({
        id: getSkillId("reading", domain.domain, skill),
        skillName: skill,
        domainName: domain.domain,
        section: "reading",
      });
    });
  });

  // Math skills
  mathDomains.forEach((domain) => {
    const skills = splitSkills(domain.skills);
    skills.forEach((skill) => {
      steps.push({
        id: getSkillId("math", domain.domain, skill),
        skillName: skill,
        domainName: domain.domain,
        section: "math",
      });
    });
  });

  return steps;
};

// Build default roadmap sequence: all Reading skills first, then all Math skills
const getDefaultRoadmap = (): RoadmapStep[] => {
  return getAllAvailableSkills();
};

export default function StudyPlanPage() {
  // Core state: current roadmap steps (saved version)
  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>(getDefaultRoadmap());
  // Completion tracking: set of step ids that are marked as done
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  // Personalization mode
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  // Draft steps for personalization (so we can discard changes)
  const [draftSteps, setDraftSteps] = useState<RoadmapStep[]>([]);
  // For managing "Add skill" dropdown visibility
  const [showAddDropdown, setShowAddDropdown] = useState(false);

  // Enter personalization mode: copy current steps to draft
  const enablePersonalization = () => {
    setDraftSteps([...roadmapSteps]);
    setIsPersonalizing(true);
    setShowAddDropdown(false);
  };

  // Cancel personalization: discard draft changes
  const cancelPersonalization = () => {
    setIsPersonalizing(false);
    setDraftSteps([]);
    setShowAddDropdown(false);
  };

  // Save personalization: apply draft steps as new roadmap
  const savePersonalization = () => {
    setRoadmapSteps(draftSteps);
    setIsPersonalizing(false);
    setDraftSteps([]);
    setShowAddDropdown(false);
    // Optionally clear completed steps that no longer exist? Better keep only existing step ids
    setCompletedSteps((prev) => {
      const newSet = new Set<string>();
      const stepIds = new Set(draftSteps.map((step) => step.id));
      prev.forEach((id) => {
        if (stepIds.has(id)) newSet.add(id);
      });
      return newSet;
    });
  };

  // Reset to default roadmap (clear personalization)
  const resetToDefault = () => {
    const defaultSteps = getDefaultRoadmap();
    if (isPersonalizing) {
      setDraftSteps(defaultSteps);
    } else {
      setRoadmapSteps(defaultSteps);
      // Reset completion to only those that exist in default
      const defaultIds = new Set(defaultSteps.map((s) => s.id));
      setCompletedSteps((prev) => {
        const newSet = new Set<string>();
        prev.forEach((id) => {
          if (defaultIds.has(id)) newSet.add(id);
        });
        return newSet;
      });
    }
  };

  // --- Draft manipulation functions (only active in personalization mode) ---

  // Move step up in draft
  const moveStepUp = (index: number) => {
    if (index <= 0) return;
    const newSteps = [...draftSteps];
    [newSteps[index - 1], newSteps[index]] = [newSteps[index], newSteps[index - 1]];
    setDraftSteps(newSteps);
  };

  // Move step down in draft
  const moveStepDown = (index: number) => {
    if (index >= draftSteps.length - 1) return;
    const newSteps = [...draftSteps];
    [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
    setDraftSteps(newSteps);
  };

  // Remove step from draft
  const removeStep = (index: number) => {
    const newSteps = [...draftSteps];
    newSteps.splice(index, 1);
    setDraftSteps(newSteps);
  };

  // Add a skill to draft (if not already present)
  const addSkillToDraft = (skill: RoadmapStep) => {
    const alreadyExists = draftSteps.some((step) => step.id === skill.id);
    if (alreadyExists) {
      alert("This skill is already in your roadmap.");
      return;
    }
    setDraftSteps([...draftSteps, skill]);
    setShowAddDropdown(false);
  };

  // Add all missing skills to draft (from complete list)
  const addAllMissingSkills = () => {
    const allSkills = getAllAvailableSkills();
    const existingIds = new Set(draftSteps.map((s) => s.id));
    const missing = allSkills.filter((skill) => !existingIds.has(skill.id));
    if (missing.length === 0) {
      alert("All skills are already in your roadmap.");
      return;
    }
    setDraftSteps([...draftSteps, ...missing]);
  };

  // Clear all steps from draft
  const clearAllSteps = () => {
    if (confirm("Remove all steps from your roadmap?")) {
      setDraftSteps([]);
    }
  };

  // --- Completion toggle (non-personalization mode) ---
  const toggleCompletion = (stepId: string) => {
    setCompletedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  // Compute progress percentage
  const progressPercentage = roadmapSteps.length > 0 ? (completedSteps.size / roadmapSteps.length) * 100 : 0;

  // Group available skills by section for the add dropdown
  const allSkills = getAllAvailableSkills();
  const readingSkills = allSkills.filter((s) => s.section === "reading");
  const mathSkills = allSkills.filter((s) => s.section === "math");

  // Current steps to display (either draft or saved roadmap)
  const displaySteps = isPersonalizing ? draftSteps : roadmapSteps;

  return (
    <div className="bg-white min-h-screen">
      <Navbar items={schoolMenu} logo="OwlenForge" />

      <div className="bg-gray-50 w-full overflow-visible">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* LEFT COLUMN - Main Roadmap Area */}
            <div className="lg:col-span-4 space-y-8">
              {/* Page Header */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]">
                <div className="flex items-center gap-3 mb-3">
                  <LucideIcons.Map className="h-7 w-7 text-[#1E4A76]" />
                  <h1 className="text-2xl md:text-3xl font-semibold text-[#1E4A76]">
                    Your SAT Study Roadmap
                  </h1>
                </div>
                <p className="text-[#4A5568] text-[17px] max-w-3xl">
                  Follow a structured sequence of skills across Reading & Writing and Mathematics.
                  Track your progress and personalize the roadmap to focus on what matters most to you.
                </p>

                {/* Progress Summary & Action Buttons */}
                <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-[#2D3748]">Overall Progress</span>
                      <span className="text-[#1E4A76] font-semibold">{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="w-full bg-[#EDF2F7] h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#1E4A76] h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#718096] mt-1">
                      {completedSteps.size} of {roadmapSteps.length} skills completed
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {!isPersonalizing ? (
                      <button
                        onClick={enablePersonalization}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E4A76] text-white text-sm font-semibold shadow hover:bg-[#163A5E] transition"
                      >
                        <LucideIcons.Pencil className="h-4 w-4" />
                        Personalize Roadmap
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={savePersonalization}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-700 text-white text-sm font-semibold shadow hover:bg-green-800 transition"
                        >
                          <LucideIcons.Save className="h-4 w-4" />
                          Save Changes
                        </button>
                        <button
                          onClick={cancelPersonalization}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E2E8F0] text-sm text-[#2D3748] font-medium hover:bg-gray-50 transition"
                        >
                          <LucideIcons.X className="h-4 w-4" />
                          Cancel
                        </button>
                      </>
                    )}
                    <button
                      onClick={resetToDefault}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E2E8F0] text-sm text-[#2D3748] font-medium hover:bg-gray-50 transition"
                    >
                      <LucideIcons.RotateCcw className="h-4 w-4" />
                      Reset to Default
                    </button>
                  </div>
                </div>
              </div>

              {/* Personalization Controls (only visible in edit mode) */}
              {isPersonalizing && (
                <div className="bg-[#F0F7FF] rounded-xl border border-[#B8D1E6] p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <LucideIcons.Settings className="h-5 w-5 text-[#1E4A76]" />
                      <span className="font-semibold text-[#1E4A76] text-sm">Personalization Mode</span>
                      <span className="text-xs text-[#4A5568]">Drag or use buttons to reorder, add, or remove skills.</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={addAllMissingSkills}
                        className="px-3 py-1.5 text-xs bg-white border border-[#1E4A76] text-[#1E4A76] rounded-md hover:bg-[#EBF5FF] transition"
                      >
                        Add All Missing
                      </button>
                      <button
                        onClick={clearAllSteps}
                        className="px-3 py-1.5 text-xs bg-white border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition"
                      >
                        Clear All Steps
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setShowAddDropdown(!showAddDropdown)}
                          className="px-3 py-1.5 text-xs bg-[#1E4A76] text-white rounded-md hover:bg-[#163A5E] transition flex items-center gap-1"
                        >
                          <LucideIcons.Plus className="h-3 w-3" />
                          Add Skill
                        </button>
                        {showAddDropdown && (
                          <div className="absolute right-0 mt-2 w-72 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-20 p-2 max-h-80 overflow-y-auto">
                            <div className="text-xs font-semibold text-[#2D3748] px-2 py-1 bg-gray-50 sticky top-0">Reading & Writing</div>
                            {readingSkills.map((skill) => (
                              <button
                                key={skill.id}
                                onClick={() => addSkillToDraft(skill)}
                                className="w-full text-left px-2 py-1.5 text-xs hover:bg-[#F0F7FF] rounded flex items-start gap-2"
                              >
                                <LucideIcons.PlusCircle className="h-3 w-3 text-[#1E4A76] mt-0.5 flex-shrink-0" />
                                <span className="text-[#2D3748]">{skill.skillName}</span>
                              </button>
                            ))}
                            <div className="text-xs font-semibold text-[#2D3748] px-2 py-1 bg-gray-50 mt-2 sticky top-0">Mathematics</div>
                            {mathSkills.map((skill) => (
                              <button
                                key={skill.id}
                                onClick={() => addSkillToDraft(skill)}
                                className="w-full text-left px-2 py-1.5 text-xs hover:bg-[#F0F7FF] rounded flex items-start gap-2"
                              >
                                <LucideIcons.PlusCircle className="h-3 w-3 text-[#1E4A76] mt-0.5 flex-shrink-0" />
                                <span className="text-[#2D3748]">{skill.skillName}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {displaySteps.length === 0 && (
                    <p className="text-sm text-amber-700 bg-amber-50 p-2 rounded">Your roadmap is empty. Add skills using the dropdown above or click &quot;Add All Missing&quot;.</p>
                  )}
                </div>
              )}

              {/* Roadmap Steps List */}
              {displaySteps.length === 0 && !isPersonalizing ? (
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center">
                  <LucideIcons.ClipboardList className="h-12 w-12 text-[#A0AEC0] mx-auto mb-3" />
                  <p className="text-[#4A5568]">No skills in your roadmap yet. Click &quot;Personalize Roadmap&quot; to add skills.</p>
                  <button
                    onClick={enablePersonalization}
                    className="mt-4 px-4 py-2 bg-[#1E4A76] text-white rounded-lg text-sm"
                  >
                    Personalize Now
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {displaySteps.map((step, idx) => {
                    const isCompleted = !isPersonalizing && completedSteps.has(step.id);
                    return (
                      <div
                        key={step.id}
                        className={`bg-white rounded-xl border transition-all duration-200 ${
                          isCompleted ? "border-green-200 bg-green-50/30" : "border-[#E2E8F0] hover:shadow-sm"
                        }`}
                      >
                        <div className="p-4 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex-1 min-w-0 flex items-start gap-3">
                            {/* Step number / icon */}
                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F0F4F8] flex items-center justify-center text-sm font-semibold text-[#1E4A76]">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                    step.section === "reading"
                                      ? "bg-lime-100 text-lime-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {step.section === "reading" ? "Reading & Writing" : "Mathematics"}
                                </span>
                                <span className="text-xs text-[#718096]">{step.domainName}</span>
                              </div>
                              <h3 className={`text-[15px] font-medium ${isCompleted ? "text-[#4A5568] line-through" : "text-[#2D3748]"}`}>
                                {step.skillName}
                              </h3>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-1">
                            {!isPersonalizing ? (
                              <button
                                onClick={() => toggleCompletion(step.id)}
                                className={`p-1.5 rounded-md transition ${
                                  isCompleted
                                    ? "text-green-600 bg-green-100 hover:bg-green-200"
                                    : "text-[#A0AEC0] hover:text-[#1E4A76] hover:bg-[#F0F7FF]"
                                }`}
                                title={isCompleted ? "Mark as incomplete" : "Mark as completed"}
                              >
                                {isCompleted ? (
                                  <LucideIcons.CheckCircle className="h-5 w-5" />
                                ) : (
                                  <LucideIcons.Circle className="h-5 w-5" />
                                )}
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() => moveStepUp(idx)}
                                  disabled={idx === 0}
                                  className={`p-1 rounded-md ${
                                    idx === 0
                                      ? "text-gray-300 cursor-not-allowed"
                                      : "text-[#718096] hover:text-[#1E4A76] hover:bg-[#F0F7FF]"
                                  }`}
                                >
                                  <LucideIcons.ArrowUp className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => moveStepDown(idx)}
                                  disabled={idx === displaySteps.length - 1}
                                  className={`p-1 rounded-md ${
                                    idx === displaySteps.length - 1
                                      ? "text-gray-300 cursor-not-allowed"
                                      : "text-[#718096] hover:text-[#1E4A76] hover:bg-[#F0F7FF]"
                                  }`}
                                >
                                  <LucideIcons.ArrowDown className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => removeStep(idx)}
                                  className="p-1 rounded-md text-[#718096] hover:text-red-600 hover:bg-red-50"
                                >
                                  <LucideIcons.Trash2 className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Motivational / Tip Section */}
              <div className="bg-gradient-to-r from-[#1E4A76]/5 to-transparent rounded-xl p-5 border border-[#E2E8F0]">
                <div className="flex gap-3 items-start">
                  <LucideIcons.Lightbulb className="h-5 w-5 text-[#1E4A76] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#2D3748] text-sm">Study Tip</h4>
                    <p className="text-sm text-[#4A5568] mt-1">
                      Focus on mastering 2-3 skills per day. Revisit completed skills weekly to reinforce retention.
                      Use the personalization tools to reorder skills based on your upcoming mock tests.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Stats & Quick Links */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Progress Summary Card */}
              <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-5">
                <h3 className="font-semibold text-[#2D3748] flex items-center gap-2 mb-3">
                  <LucideIcons.TrendingUp className="h-4 w-4 text-[#1E4A76]" />
                  Study Snapshot
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#718096]">Total Skills</span>
                    <span className="font-semibold text-[#2D3748]">{roadmapSteps.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#718096]">Completed</span>
                    <span className="font-semibold text-green-600">{completedSteps.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#718096]">Remaining</span>
                    <span className="font-semibold text-[#1E4A76]">{roadmapSteps.length - completedSteps.size}</span>
                  </div>
                  <div className="pt-2">
                    <div className="w-full bg-[#EDF2F7] h-2 rounded-full">
                      <div
                        className="bg-[#1E4A76] h-2 rounded-full transition-all"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 border-b border-[#E2E8F0]">
                  <p className="text-xs font-semibold text-[#2D3748]">Quick Resources</p>
                </div>
                {[
                  { label: "Practice by Topic", href: "/sat/Practice-Questions", icon: "Target" },
                  { label: "Full-Length Mocks", href: "/sat/Practice-Questions#full-length-mock-test", icon: "FileText" },
                  { label: "Video Lessons", href: "/sat/courses", icon: "PlayCircle" },
                  { label: "Study Resources", href: "/sat", icon: "BookOpen" },
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
                  <LucideIcons.ClipboardList className="w-5 h-5 text-[#1E4A76] flex-shrink-0" />
                  <p className="text-xs text-[#2D3748]">
                    <span className="font-semibold">Adaptive Strategy:</span> Use this roadmap alongside your practice test results. Personalize the order to prioritize weak areas identified by the platform.
                  </p>
                </div>
              </div>

              {/* Need help? */}
              <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-4">
                <h3 className="font-semibold text-[#2D3748] text-sm mb-2">Need guidance?</h3>
                <p className="text-xs text-[#718096] mb-3">
                  Not sure which skill to tackle first? Take a diagnostic quiz to identify your weakest domains.
                </p>
                <Link
                  href="/sat/Practice-Questions"
                  className="text-xs text-[#1E4A76] font-medium hover:underline inline-flex items-center gap-1"
                >
                  Start diagnostic quiz <LucideIcons.ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}