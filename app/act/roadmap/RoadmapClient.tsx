// app/act/roadmap/RoadmapClient.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Section, SectionOption, PracticeLevel } from "../lib/actSections";

// Props received from the server component
interface RoadmapItem {
  id: number;
  section: Section;
  option: SectionOption;
  level: PracticeLevel;
  questionCount: number;
  subjectColor: {
    bg: string;
    text: string;
    border: string;
    lightBg: string;
  };
}

interface RoadmapClientProps {
  initialItems: RoadmapItem[];
  originalOrder: number[];
}

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const getOptionKey = (item: RoadmapItem): string =>
  `${item.section.name}|${item.option.name}`;

// Subject-specific color configs for the modal
const getSubjectConfig = (sectionName: string) => {
  switch (sectionName) {
    case "English":
      return {
        badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
        accent: "bg-emerald-500",
        ring: "ring-emerald-400",
        selectedBtn: "bg-emerald-600 border-emerald-1000 text-white shadow-emerald-200",
        dot: "bg-emerald-500",
        groupBg: "bg-emerald-50/60 border-emerald-100",
        headerDot: "bg-emerald-400",
      };
    case "Mathematics":
      return {
        badge: "bg-blue-100 text-blue-800 border-blue-200",
        accent: "bg-blue-500",
        ring: "ring-blue-400",
        selectedBtn: "bg-blue-600 border-blue-300 text-white shadow-blue-200",
        dot: "bg-blue-500",
        groupBg: "bg-blue-50/60 border-blue-00",
        headerDot: "bg-blue-400",
      };
    case "Reading":
      return {
        badge: "bg-purple-100 text-purple-800 border-purple-200",
        accent: "bg-purple-500",
        ring: "ring-purple-400",
        selectedBtn: "bg-purple-600 border-purple-600 text-white shadow-purple-200",
        dot: "bg-purple-500",
        groupBg: "bg-purple-50/60 border-purple-100",
        headerDot: "bg-purple-400",
      };
    case "Science":
      return {
        badge: "bg-amber-100 text-amber-800 border-amber-200",
        accent: "bg-amber-500",
        ring: "ring-amber-400",
        selectedBtn: "bg-amber-600 border-amber-1000 text-white shadow-amber-200",
        dot: "bg-amber-500",
        groupBg: "bg-amber-50/60 border-amber-100",
        headerDot: "bg-amber-400",
      };
    default:
      return {
        badge: "bg-gray-100 text-gray-800 border-gray-200",
        accent: "bg-gray-500",
        ring: "ring-gray-400",
        selectedBtn: "bg-gray-600 border-gray-600 text-white shadow-gray-200",
        dot: "bg-gray-500",
        groupBg: "bg-gray-50 border-gray-100",
        headerDot: "bg-gray-400",
      };
  }
};

const ratingConfig = [
  {
    value: 1,
    label: "Weak",
    emoji: "/emoji/weak-emoji.png",
    emojiClass: "w-11 h-11",
    color: "text-rose-600",
    selectedBg: "bg-rose-300 border-rose-300 text-rose-900 shadow-rose-100",
    pillBg: "bg-rose-50 border-rose-200 text-rose-700",
    pillDot: "bg-rose-300",
    barColor: "bg-rose-300",
    barWidth: "w-1/3",
  },
  {
    value: 2,
    label: "Fine",
    emoji: "/emoji/normal-emoji.png",
    emojiClass: "w-10 h-10",
    color: "text-blue-600",
    selectedBg: "bg-blue-300 border-blue-300 text-blue-900 shadow-blue-100",
    pillBg: "bg-blue-50 border-blue-200 text-blue-700",
    pillDot: "bg-blue-300",
    barColor: "bg-blue-300",
    barWidth: "w-2/3",
  },
  {
    value: 3,
    label: "Strong",
    emoji: "/emoji/strong-emoji.png",
    emojiClass: "w-9 h-9",
    color: "text-teal-600",
    selectedBg: "bg-teal-300 border-teal-300 text-teal-900 shadow-teal-100",
    pillBg: "bg-teal-50 border-teal-200 text-teal-700",
    pillDot: "bg-teal-300",
    barColor: "bg-teal-300",
    barWidth: "w-full",
  },
];

const TOP_LEVEL_TITLES = [
  "Topic Development",
  "Linear Equations",
  "Key Ideas and Details 1",
  "Tables and Graphs 1",
  "Linear and Exponential"
];

// Fisher‑Yates shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Type for saved practice result
interface PracticeResult {
  correct: number;
  total: number;
  timeSeconds: number;
  date: string; // ISO string
}

export default function RoadmapClient({ initialItems, originalOrder }: RoadmapClientProps) {
  const [currentOrder, setCurrentOrder] = useState<number[]>(originalOrder);
  const [showModal, setShowModal] = useState(false);
  const [optionRatings, setOptionRatings] = useState<Record<string, number>>(() => {
    const optionsMap: Record<string, number> = {};
    initialItems.forEach(item => {
      const key = getOptionKey(item);
      optionsMap[key] = 2; // default to "Fine"
    });
    return optionsMap;
  });

  // State for saved practice results (keyed by level slug) – lazy initializer from localStorage
  const [results, setResults] = useState<Record<string, PracticeResult>>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("roadmapResults");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error("Failed to parse roadmap results", e);
        }
      }
    }
    return {};
  });

  const allSubjects = useMemo(
    () => Array.from(new Set(initialItems.map(item => item.section.name))),
    [initialItems]
  );
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string>>(new Set(allSubjects));

  const groupedOptions = useMemo(() => {
    const groups = new Map<string, {
      key: string;
      sectionName: string;
      optionName: string;
      levelIds: number[];
    }>();
    initialItems.forEach(item => {
      const key = getOptionKey(item);
      if (!groups.has(key)) {
        groups.set(key, { key, sectionName: item.section.name, optionName: item.option.name, levelIds: [] });
      }
      groups.get(key)!.levelIds.push(item.id);
    });
    return Array.from(groups.values());
  }, [initialItems]);

  const orderedItems = currentOrder
    .map(id => initialItems.find(item => item.id === id))
    .filter((item): item is RoadmapItem => item !== undefined);

  const handleRatingChange = (optionKey: string, value: number) => {
    setOptionRatings(prev => ({ ...prev, [optionKey]: value }));
  };

  const applyPersonalizedOrder = () => {
    const allItems = [...initialItems];
    const topItems = allItems.filter(item => TOP_LEVEL_TITLES.includes(item.level.title));
    const otherItems = allItems.filter(item => !TOP_LEVEL_TITLES.includes(item.level.title));
    const shuffledTop = shuffleArray(topItems);
    const sortedOthers = [...otherItems].sort((a, b) => {
      const ratingA = optionRatings[getOptionKey(a)] ?? 2;
      const ratingB = optionRatings[getOptionKey(b)] ?? 2;
      if (ratingA !== ratingB) return ratingA - ratingB;
      return originalOrder.indexOf(a.id) - originalOrder.indexOf(b.id);
    });
    const newOrder = [...shuffledTop, ...sortedOthers].map(item => item.id);
    setCurrentOrder(newOrder);
    setShowModal(false);
  };

  const resetOrder = () => {
    setCurrentOrder(originalOrder);
    const defaultRatings: Record<string, number> = {};
    groupedOptions.forEach(opt => { defaultRatings[opt.key] = 2; });
    setOptionRatings(defaultRatings);
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev => {
      const next = new Set(prev);
      next.has(subject) ? next.delete(subject) : next.add(subject);
      return next;
    });
  };

  const selectAllSubjects = () => setSelectedSubjects(new Set(allSubjects));
  const clearAllSubjects = () => setSelectedSubjects(new Set());

  // Group options by subject for the modal
  const filteredGroupedOptions = groupedOptions.filter(opt => selectedSubjects.has(opt.sectionName));
  const groupedBySubject = useMemo(() => {
    const map = new Map<string, typeof filteredGroupedOptions>();
    filteredGroupedOptions.forEach(opt => {
      if (!map.has(opt.sectionName)) map.set(opt.sectionName, []);
      map.get(opt.sectionName)!.push(opt);
    });
    return map;
  }, [filteredGroupedOptions]);

  // Stats for the summary bar
  const ratingCounts = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0 };
    filteredGroupedOptions.forEach(opt => {
      const r = optionRatings[opt.key] ?? 2;
      counts[r as 1 | 2 | 3]++;
    });
    return counts;
  }, [optionRatings, filteredGroupedOptions]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold text-[#1E4A76]">ACT Roadmap</h1>
          <p className="text-[#4A5568] font-times text-[17px] mt-3 max-w-2xl">
            Follow the recommended sequence of practice topics. Unlock one at a time.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 bg-[#1E4A76] text-white rounded-xl text-sm font-medium hover:bg-[#163A5E] transition shadow-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Personalised
          </button>
          {currentOrder !== originalOrder && (
            <button
              onClick={resetOrder}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Vertical list of cards */}
      <div className="space-y-5">
        {orderedItems.map((item) => {
          const { id, section, option, level, questionCount, subjectColor } = item;
          const isLocked = false;
          const slug = slugify(level.title);
          const result = results[slug];

          return (
            <div
              key={id}
              className={`
                group relative flex overflow-hidden rounded-2xl bg-white 
                border border-gray-100 shadow-sm transition-all duration-200
                ${isLocked ? "opacity-50 pointer-events-none" : "hover:shadow-lg hover:border-gray-200"}
              `}
            >
              <div className={`w-2 flex-shrink-0 ${subjectColor.bg}`} />
              <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between p-5 gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${subjectColor.lightBg} ${subjectColor.text} border ${subjectColor.border}`}>
                      {section.name}
                    </span>
                    <span className="text-sm text-gray-500">{option.name}</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {questionCount} questions
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">{level.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{level.description}</p>

                  {/* Display last attempt result if available */}
                  {result && (
                    <div className="mt-2 flex items-center gap-3 text-xs">
                      <span className="font-medium text-gray-700">Last attempt:</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${result.correct === result.total ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {result.correct}/{result.total} correct
                      </span>
                      <span className="text-gray-500">
                        {Math.floor(result.timeSeconds / 60)}:{(result.timeSeconds % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  )}

                  <div className="mt-3">
                    <Link
                      href={`/act/${slug}?from=roadmap`}
                      className="inline-flex items-center px-4 py-2 bg-[#1E4A76] text-white rounded-xl text-sm font-medium hover:bg-[#163A5E] transition shadow-sm"
                    >
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Start Practice
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-stretch gap-1">
                  <span className="text-xs text-gray-500">First understand with:</span>
                  <div className="flex flex-row sm:flex-col gap-2 items-start sm:items-stretch w-full">
                    <button className="inline-flex items-center justify-center px-4 py-2 border rounded-xl text-sm font-medium transition border-gray-200 text-[#4A5568] bg-white hover:bg-gray-50 hover:border-gray-300">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Notes
                    </button>
                    <button className="inline-flex items-center justify-center px-4 py-2 border rounded-xl text-sm font-medium transition border-gray-200 text-[#4A5568] bg-white hover:bg-gray-50 hover:border-gray-300">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
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

      <p className="text-xs text-[#A0AEC0] text-center mt-10">
        Practice each topic to master the ACT.
      </p>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(10, 20, 40, 0.65)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="bg-white w-full flex flex-col overflow-hidden"
            style={{
              maxWidth: "760px",
              height: "90vh",
              borderRadius: "20px",
              boxShadow: "0 32px 80px rgba(10, 20, 60, 0.22), 0 2px 8px rgba(10,20,60,0.08)",
            }}
          >
            {/* ── Modal Header ── */}
            <div className="flex-shrink-0 px-7 pt-6 pb-5 border-b border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #1E4A76 0%, #2d6bb0 100%)" }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 leading-tight">Rate Your Weaknesses</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Your roadmap will prioritise the topics you find hardest</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* ── Rating legend with emoji images ── */}
              <div className="mt-4 flex items-center gap-4 flex-wrap">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-700 mr-1">Scale:</span>
                {ratingConfig.map(r => (
                  <div key={r.value} className="inline-flex items-center gap-1 text-[12px] font-sans font-medium text-gray-700">
                    <img src={r.emoji} alt={r.label} className={r.emojiClass} />
                    <span className="mr-1">{r.value} = {r.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Two-column body: sidebar left, topic list right ── */}
            <div className="flex flex-1 overflow-hidden">

              {/* Left sidebar: Subject filter */}
              <div className="flex-shrink-0 w-48 flex flex-col border-r border-gray-100 bg-gray-50/50">
                <div className="px-4 pt-4 pb-4 flex-1 overflow-y-auto">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Subjects</span>
                    <div className="flex gap-2">
                      <button onClick={selectAllSubjects} className="text-[10px] font-medium text-[#1E4A76] hover:underline">All</button>
                      <span className="text-gray-300 text-[10px]">|</span>
                      <button onClick={clearAllSubjects} className="text-[10px] font-medium text-[#1E4A76] hover:underline">None</button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {allSubjects.map(subject => {
                      const cfg = getSubjectConfig(subject);
                      const isOn = selectedSubjects.has(subject);
                      return (
                        <button
                          key={subject}
                          onClick={() => toggleSubject(subject)}
                          className={`
                            w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-150 text-left
                            ${isOn
                              ? `${cfg.badge} shadow-sm`
                              : "bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600"
                            }
                          `}
                        >
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isOn ? cfg.dot : "bg-gray-300"}`} />
                          {subject}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right: Scrollable topic list */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                {Array.from(groupedBySubject.entries()).map(([subjectName, opts]) => {
                  const cfg = getSubjectConfig(subjectName);
                  return (
                    <div key={subjectName}>
                      {/* Subject heading */}
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${cfg.headerDot}`} />
                        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">{subjectName}</span>
                        <div className="flex-1 h-px bg-gray-100" />
                      </div>

                      {/* Options */}
                      <div className="space-y-2">
                        {opts.map(opt => {
                          const currentRating = optionRatings[opt.key] ?? 2;
                          const ratingInfo = ratingConfig[currentRating - 1];
                          return (
                            <div
                              key={opt.key}
                              className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white transition-all duration-150"
                            >
                              {/* Topic name + current rating label */}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 font-sans leading-tight truncate">{opt.optionName}</p>
                                <div className={`text-xs font-medium mt-0.5 font-sans flex items-center gap-1 ${ratingInfo.color}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full inline-block ${ratingInfo.pillDot}`} />
                                  <span>{ratingInfo.label}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                {ratingConfig.map(r => {
                                  const isSelected = currentRating === r.value;
                                  return (
                                    <button
                                      key={r.value}
                                      onClick={() => handleRatingChange(opt.key, r.value)}
                                      title={r.label}
                                      className={`
                                        w-9 h-9 rounded-full border-2 flex items-center justify-center
                                        text-[13px] font-bold transition-all duration-150 select-none tracking-wide
                                        ${isSelected
                                          ? `scale-105 shadow-sm ${r.selectedBg}`
                                          : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-700 hover:scale-105"
                                        }
                                      `}
                                    >
                                      {r.value}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {filteredGroupedOptions.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
                    <svg className="w-10 h-10 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                    </svg>
                    <p className="text-sm font-medium">No subjects selected</p>
                    <p className="text-xs mt-1">Enable at least one subject on the left</p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Footer with ratings and buttons in same row ── */}
            <div className="flex-shrink-0 border-t border-gray-100 px-7 py-2.5">
              <div className="flex items-center justify-between gap-4">
                {/* Left: ratings summary */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-gray-400 font-medium">Your ratings:</span>
                  {ratingConfig.map(r => (
                    ratingCounts[r.value as 1 | 2 | 3] > 0 ? (
                      <div key={r.value} className="flex items-center gap-1">
                        <img src={r.emoji} alt={r.label} className="w-5 h-5" />
                        <span className="text-sm font-medium text-gray-700">{ratingCounts[r.value as 1 | 2 | 3]}</span>
                      </div>
                    ) : null
                  ))}
                </div>

                {/* Right: buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl text-sm font-sans font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={applyPersonalizedOrder}
                    className="px-6 py-2.5 text-white rounded-xl text-sm font-sans font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                      background: "#2d6bb0",
                      boxShadow: "0 4px 20px rgba(30, 74, 118, 0.35)",
                    }}
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}