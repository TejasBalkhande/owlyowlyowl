"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Section, SectionOption, PracticeLevel } from "../lib/actSections";
import { saveUserRoadmapOrder } from "./actions";

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
  initialOrder: number[];
  isLoggedIn: boolean;
  initialResults: Record<number, { correct: number; total: number; timeSeconds: number; lastAttempt: string }>;
}

const slugify = (text: string): string =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const getOptionKey = (item: RoadmapItem): string =>
  `${item.section.name}|${item.option.name}`;

const getSubjectConfig = (sectionName: string) => {
  switch (sectionName) {
    case "English":
      return {
        badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
        accent: "bg-emerald-500",
        ring: "ring-emerald-400",
        selectedBtn: "bg-emerald-600 border-emerald-600 text-white shadow-emerald-200",
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
        groupBg: "bg-blue-50/60 border-blue-100",
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
        selectedBtn: "bg-amber-600 border-amber-600 text-white shadow-amber-200",
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
  },
];

const TOP_LEVEL_TITLES = [
  "Topic Development",
  "Linear Equations",
  "Key Ideas and Details 1",
  "Tables and Graphs 1",
  "Linear and Exponential",
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// ─── Sidebar data ─────────────────────────────────────────────────────────────

const MOTIVATIONAL_QUOTES = [
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { quote: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { quote: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { quote: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { quote: "Perseverance is not a long race; it is many short races one after another.", author: "Walter Elliot" },
];

// One image per day — atmospheric study/library photos from Unsplash
const QUOTE_IMAGES = [
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=640&q=75",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=640&q=75",
  "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=640&q=75",
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=640&q=75",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=640&q=75",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=640&q=75",
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=640&q=75",
];

const STUDY_TIPS = [
  { tip: "Use timed practice to simulate real ACT conditions — aim for 45 seconds per English question.", label: "Timing" },
  { tip: "For Reading, annotate the passage while reading before jumping to the questions.", label: "Reading" },
  { tip: "On Math, eliminate obviously out-of-range choices before solving the full problem.", label: "Mathematics" },
  { tip: "Science questions test data interpretation — trust the graphs, not prior knowledge.", label: "Science" },
  { tip: "In English, the most concise grammatically correct option is almost always right.", label: "English" },
  { tip: "Review every wrong answer — understanding your mistakes beats doing more questions.", label: "Review" },
  { tip: "Space your practice across multiple sessions — spaced repetition significantly boosts retention.", label: "Retention" },
];

const ACT_LINKS = [
  {
    label: "Register for the ACT",
    url: "https://www.act.org",
    desc: "Official registration & account",
  },
  {
    label: "Free Practice Resources",
    url: "https://www.act.org/content/act/en/products-and-services/the-act/test-preparation.html",
    desc: "Official ACT prep materials",
  },
  {
    label: "View Score Reports",
    url: "https://www.act.org/content/act/en/products-and-services/the-act/scores.html",
    desc: "Access your official ACT scores",
  },
  {
    label: "Test Dates & Deadlines",
    url: "https://www.act.org/content/act/en/products-and-services/the-act/registration.html",
    desc: "Upcoming test windows",
  },
];

const SUBJECT_META: Record<string, { bar: string; bg: string; text: string; label: string }> = {
  English:     { bar: "bg-emerald-500", bg: "bg-emerald-50",  text: "text-emerald-700", label: "ENG" },
  Mathematics: { bar: "bg-blue-500",    bg: "bg-blue-50",     text: "text-blue-700",    label: "MTH" },
  Reading:     { bar: "bg-purple-500",  bg: "bg-purple-50",   text: "text-purple-700",  label: "RDG" },
  Science:     { bar: "bg-amber-500",   bg: "bg-amber-50",    text: "text-amber-700",   label: "SCI" },
};

const SCORE_BANDS = [
  { range: "33–36", tier: "Elite",      pct: 100, color: "bg-emerald-500", textColor: "text-emerald-700", bg: "bg-emerald-50" },
  { range: "28–32", tier: "Strong",     pct: 82,  color: "bg-blue-500",    textColor: "text-blue-700",    bg: "bg-blue-50"    },
  { range: "24–27", tier: "Above Avg",  pct: 64,  color: "bg-indigo-400",  textColor: "text-indigo-700",  bg: "bg-indigo-50"  },
  { range: "18–23", tier: "Average",    pct: 46,  color: "bg-amber-400",   textColor: "text-amber-700",   bg: "bg-amber-50"   },
  { range: "1–17",  tier: "Below Avg",  pct: 28,  color: "bg-rose-300",    textColor: "text-rose-700",    bg: "bg-rose-50"    },
];

// ─── Sidebar shared primitives ────────────────────────────────────────────────

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-white border border-gray-100 shadow-[0_1px_6px_rgba(0,0,0,0.05)] overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-gray-400 mb-3.5 leading-none">
      {children}
    </p>
  );
}

// ─── Quote card — image background ───────────────────────────────────────────

function QuoteCard() {
  const dayIndex = new Date().getDay();
  const { quote, author } = MOTIVATIONAL_QUOTES[dayIndex % MOTIVATIONAL_QUOTES.length];
  const imgSrc = QUOTE_IMAGES[dayIndex % QUOTE_IMAGES.length];

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.10)]"
      style={{ minHeight: 210 }}
    >
      {/* Background image */}
      <img
        src={imgSrc}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.72) saturate(0.85)" }}
      />

      {/* Gradient — fades to near-black at bottom for text contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.78) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between p-5" style={{ minHeight: 210 }}>
        {/* Top pill label */}
        <span
          className="self-start text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.75)", backdropFilter: "blur(4px)" }}
        >
          Daily Motivation
        </span>

        {/* Quote block */}
        <div className="mt-6">
          <svg className="w-6 h-6 mb-2 opacity-40" fill="currentColor" viewBox="0 0 32 32" style={{ color: "#fff" }}>
            <path d="M10 8C5.6 8 2 11.6 2 16v8h8v-8H6c0-2.2 1.8-4 4-4V8zm14 0c-4.4 0-8 3.6-8 8v8h8v-8h-4c0-2.2 1.8-4 4-4V8z" />
          </svg>
          <p className="text-[15px] font-medium text-white leading-snug tracking-tight">
            {quote}
          </p>
          <p className="mt-3 text-xs font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.55)" }}>
            — {author}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Progress card ────────────────────────────────────────────────────────────

function ProgressCard({
  initialItems,
  initialResults,
}: {
  initialItems: RoadmapItem[];
  initialResults: Record<number, { correct: number; total: number; timeSeconds: number; lastAttempt: string }>;
}) {
  const totalTopics = initialItems.length;
  const attempted = Object.keys(initialResults).length;
  const mastered = Object.entries(initialResults).filter(
    ([, r]) => r.total > 0 && r.correct / r.total >= 0.8
  ).length;
  const overallPct = totalTopics > 0 ? Math.round((attempted / totalTopics) * 100) : 0;

  const subjectStats = useMemo(() => {
    const map: Record<string, { total: number; attempted: number }> = {};
    initialItems.forEach(item => {
      const sn = item.section.name;
      if (!map[sn]) map[sn] = { total: 0, attempted: 0 };
      map[sn].total++;
      if (initialResults[item.id]) map[sn].attempted++;
    });
    return map;
  }, [initialItems, initialResults]);

  const circumference = 2 * Math.PI * 20;

  return (
    <Card>
      <div className="px-5 pt-5 pb-4">
        <SectionLabel>Your Progress</SectionLabel>

        {/* Circle + numbers row */}
        <div className="flex items-center gap-4 mb-5">
          {/* SVG ring */}
          <div className="relative flex-shrink-0 w-[56px] h-[56px]">
            <svg viewBox="0 0 48 48" className="w-full h-full -rotate-90">
              <circle cx="24" cy="24" r="20" fill="none" stroke="#F3F4F6" strokeWidth="4.5" />
              <circle
                cx="24" cy="24" r="20" fill="none"
                stroke="#1E4A76" strokeWidth="4.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - overallPct / 100)}
                style={{ transition: "stroke-dashoffset 0.8s ease" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-[#1E4A76]">
              {overallPct}%
            </span>
          </div>

          {/* Stats */}
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-gray-900 leading-none">{attempted}</span>
              <span className="text-xs text-gray-400">/ {totalTopics} started</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-gray-900 leading-none">{mastered}</span>
              <span className="text-xs text-gray-400">mastered ≥ 80%</span>
            </div>
          </div>
        </div>

        {/* Thin divider */}
        <div className="h-px bg-gray-50 -mx-5 mb-4" />

        {/* Per-subject bars */}
        <div className="space-y-3">
          {Object.entries(subjectStats).map(([subject, stats]) => {
            const m = SUBJECT_META[subject];
            const pct = stats.total > 0 ? Math.round((stats.attempted / stats.total) * 100) : 0;
            return (
              <div key={subject}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${m?.bg ?? "bg-gray-100"} ${m?.text ?? "text-gray-500"} tracking-widest`}>
                      {m?.label ?? subject.slice(0, 3).toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">{subject}</span>
                  </div>
                  <span className="text-xs font-medium text-gray-400 tabular-nums">
                    {stats.attempted}/{stats.total}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-1.5 ${m?.bar ?? "bg-gray-400"} rounded-full`}
                    style={{ width: `${pct}%`, transition: "width 0.7s ease" }}
                  />
                </div>
              </div>
            );
          })}
          {attempted === 0 && (
            <p className="text-xs text-gray-400 pt-0.5">Complete a topic to see progress here.</p>
          )}
        </div>
      </div>
    </Card>
  );
}

// ─── Study tip ────────────────────────────────────────────────────────────────

function StudyTipCard() {
  const dayIndex = new Date().getDay();
  const { tip, label } = STUDY_TIPS[dayIndex % STUDY_TIPS.length];
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3.5">
          <SectionLabel>Study Tip of the Day</SectionLabel>
          <span className="text-[10px] font-bold text-[#1E4A76] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full -mt-1 flex-shrink-0 tracking-wide">
            {label}
          </span>
        </div>
        <div className="flex gap-3">
          <div className="w-[2px] bg-[#1E4A76]/12 rounded-full flex-shrink-0 self-stretch" />
          <p className="text-sm text-gray-600 leading-relaxed">{tip}</p>
        </div>
      </div>
    </Card>
  );
}

// ─── ACT resources ────────────────────────────────────────────────────────────

const LinkArrow = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0 text-gray-300 group-hover:text-[#1E4A76] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

function ResourcesCard() {
  return (
    <Card>
      <div className="px-5 pt-5 pb-1">
        <SectionLabel>ACT Official Links</SectionLabel>
      </div>
      <ul className="pb-2">
        {ACT_LINKS.map((link, i) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 px-5 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-800 group-hover:text-[#1E4A76] transition-colors leading-tight">
                  {link.label}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">{link.desc}</p>
              </div>
              <LinkArrow />
            </a>
            {i < ACT_LINKS.length - 1 && (
              <div className="h-px bg-gray-50 mx-5" />
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}

// ─── Score scale ──────────────────────────────────────────────────────────────

function ScaleCard() {
  return (
    <Card>
      <div className="p-5">
        <SectionLabel>ACT Score Scale</SectionLabel>
        <div className="space-y-2">
          {SCORE_BANDS.map(({ range, tier, pct, color, textColor, bg }) => (
            <div key={range} className="flex items-center gap-2.5">
              <span className={`text-[11px] font-bold tabular-nums px-2 py-1 rounded-lg flex-shrink-0 w-[52px] text-center ${bg} ${textColor}`}>
                {range}
              </span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-1.5 ${color} rounded-full`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-[11px] text-gray-400 w-[68px] text-right flex-shrink-0">{tier}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RoadmapClient({
  initialItems,
  originalOrder,
  initialOrder,
  isLoggedIn,
  initialResults,
}: RoadmapClientProps) {
  const [currentOrder, setCurrentOrder] = useState<number[]>(initialOrder);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [optionRatings, setOptionRatings] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    initialItems.forEach(item => { map[getOptionKey(item)] = 2; });
    return map;
  });

  const allSubjects = useMemo(
    () => Array.from(new Set(initialItems.map(item => item.section.name))),
    [initialItems]
  );
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string>>(new Set(allSubjects));

  const groupedOptions = useMemo(() => {
    const groups = new Map<string, { key: string; sectionName: string; optionName: string; levelIds: number[] }>();
    initialItems.forEach(item => {
      const key = getOptionKey(item);
      if (!groups.has(key)) groups.set(key, { key, sectionName: item.section.name, optionName: item.option.name, levelIds: [] });
      groups.get(key)!.levelIds.push(item.id);
    });
    return Array.from(groups.values());
  }, [initialItems]);

  const orderedItems = currentOrder
    .map(id => initialItems.find(item => item.id === id))
    .filter((item): item is RoadmapItem => item !== undefined);

  const handleRatingChange = (optionKey: string, value: number) =>
    setOptionRatings(prev => ({ ...prev, [optionKey]: value }));

  const applyPersonalizedOrder = async () => {
    const allItems = [...initialItems];
    const topItems = allItems.filter(item => TOP_LEVEL_TITLES.includes(item.level.title));
    const otherItems = allItems.filter(item => !TOP_LEVEL_TITLES.includes(item.level.title));
    const shuffledTop = shuffleArray(topItems);
    const sortedOthers = [...otherItems].sort((a, b) => {
      const rA = optionRatings[getOptionKey(a)] ?? 2;
      const rB = optionRatings[getOptionKey(b)] ?? 2;
      if (rA !== rB) return rA - rB;
      return originalOrder.indexOf(a.id) - originalOrder.indexOf(b.id);
    });
    const newOrder = [...shuffledTop, ...sortedOthers].map(item => item.id);
    setCurrentOrder(newOrder);
    setShowModal(false);
    if (isLoggedIn) {
      setIsSaving(true);
      try { await saveUserRoadmapOrder(newOrder); }
      catch (e) { console.error("Failed to save roadmap order", e); }
      finally { setIsSaving(false); }
    }
  };

  const resetOrder = () => {
    setCurrentOrder(originalOrder);
    const defaults: Record<string, number> = {};
    groupedOptions.forEach(opt => { defaults[opt.key] = 2; });
    setOptionRatings(defaults);
  };

  const toggleSubject = (subject: string) =>
    setSelectedSubjects(prev => {
      const next = new Set(prev);
      next.has(subject) ? next.delete(subject) : next.add(subject);
      return next;
    });

  const filteredGroupedOptions = groupedOptions.filter(opt => selectedSubjects.has(opt.sectionName));

  const groupedBySubject = useMemo(() => {
    const map = new Map<string, typeof filteredGroupedOptions>();
    filteredGroupedOptions.forEach(opt => {
      if (!map.has(opt.sectionName)) map.set(opt.sectionName, []);
      map.get(opt.sectionName)!.push(opt);
    });
    return map;
  }, [filteredGroupedOptions]);

  const ratingCounts = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0 };
    filteredGroupedOptions.forEach(opt => {
      const r = optionRatings[opt.key] ?? 2;
      counts[r as 1 | 2 | 3]++;
    });
    return counts;
  }, [optionRatings, filteredGroupedOptions]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* ── Header ── */}
      <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold text-[#1E4A76]">ACT Roadmap</h1>
          <p className="text-[#4A5568] font-times text-[17px] mt-3 max-w-2xl">
            Follow the recommended sequence of practice topics. Unlock one at a time.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (!isLoggedIn) { window.location.href = "/account"; return; }
              setShowModal(true);
            }}
            disabled={isSaving}
            className="px-5 py-2.5 bg-[#1E4A76] text-white rounded-xl text-sm font-medium hover:bg-[#163A5E] transition shadow-sm flex items-center gap-2 disabled:opacity-50"
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

      {/* ── Two-column layout ── */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* ── LEFT: Topic list (unchanged) ── */}
        <div className="flex-1 min-w-0">
          <div className="space-y-5">
            {orderedItems.map((item) => {
              const { id, section, option, level, questionCount, subjectColor } = item;
              const isLocked = false;
              const slug = slugify(level.title);
              const result = initialResults[id];

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

                      {result && (
                        <div className="mt-2 flex items-center gap-3 text-xs">
                          <span className="font-medium text-gray-700">Last attempt:</span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${result.correct === result.total ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                            {result.correct}/{result.total} correct
                          </span>
                          <span className="text-gray-500">
                            {Math.floor(result.timeSeconds / 60)}:{(result.timeSeconds % 60).toString().padStart(2, "0")}
                          </span>
                        </div>
                      )}

                      <div className="mt-3">
                        <Link
                          href={`/act/${slug}?from=roadmap&levelId=${id}`}
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
        </div>

        {/* ── RIGHT: Sidebar ── */}
        <aside className="w-full lg:w-[300px] xl:w-[310px] flex-shrink-0 lg:sticky lg:top-8 space-y-3.5">
          <QuoteCard />
          <ProgressCard initialItems={initialItems} initialResults={initialResults} />
          <StudyTipCard />
          <ResourcesCard />
          <ScaleCard />
        </aside>
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(10,20,40,0.65)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="bg-white w-full flex flex-col overflow-hidden"
            style={{
              maxWidth: "760px",
              height: "90vh",
              borderRadius: "20px",
              boxShadow: "0 32px 80px rgba(10,20,60,0.22), 0 2px 8px rgba(10,20,60,0.08)",
            }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100 flex-shrink-0">
              <div>
                <h2 className="text-xl font-bold text-[#1E4A76]">Personalise Your Roadmap</h2>
                <p className="text-sm text-gray-500 mt-0.5">Rate your comfort in each topic group to reorder your roadmap.</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Subject filter */}
            <div className="px-7 py-3 border-b border-gray-50 flex-shrink-0 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400 font-medium mr-1">Filter:</span>
              {allSubjects.map(subject => {
                const cfg = getSubjectConfig(subject);
                const active = selectedSubjects.has(subject);
                return (
                  <button
                    key={subject}
                    onClick={() => toggleSubject(subject)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${
                      active ? cfg.selectedBtn + " shadow" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {subject}
                  </button>
                );
              })}
              <button onClick={() => setSelectedSubjects(new Set(allSubjects))} className="text-xs text-blue-500 hover:underline ml-1">All</button>
              <button onClick={() => setSelectedSubjects(new Set())} className="text-xs text-gray-400 hover:underline">None</button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-7 py-5 space-y-6">
              {Array.from(groupedBySubject.entries()).map(([sectionName, options]) => {
                const cfg = getSubjectConfig(sectionName);
                return (
                  <div key={sectionName}>
                    <div className={`flex items-center gap-2 mb-3 px-3 py-2 rounded-xl ${cfg.groupBg} border`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${cfg.headerDot}`} />
                      <span className="text-sm font-bold text-gray-700">{sectionName}</span>
                    </div>
                    <div className="space-y-3">
                      {options.map(opt => {
                        const currentRating = optionRatings[opt.key] ?? 2;
                        return (
                          <div key={opt.key} className="rounded-xl border border-gray-100 bg-gray-50/40 p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <p className="text-sm font-semibold text-gray-800">{opt.optionName}</p>
                                <p className="text-xs text-gray-400">{opt.levelIds.length} topics</p>
                              </div>
                              {(() => {
                                const rc = ratingConfig.find(r => r.value === currentRating);
                                return rc ? (
                                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${rc.pillBg}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${rc.pillDot}`} />
                                    {rc.label}
                                  </span>
                                ) : null;
                              })()}
                            </div>
                            <div className="flex gap-2">
                              {ratingConfig.map(rc => (
                                <button
                                  key={rc.value}
                                  onClick={() => handleRatingChange(opt.key, rc.value)}
                                  className={`flex-1 flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl border text-xs font-semibold transition shadow-sm ${
                                    currentRating === rc.value
                                      ? rc.selectedBg + " shadow-md"
                                      : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                                  }`}
                                >
                                  <img src={rc.emoji} alt={rc.label} className={rc.emojiClass} />
                                  <span>{rc.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal footer */}
            <div className="px-7 py-4 border-t border-gray-100 flex-shrink-0 flex items-center justify-between gap-4 bg-gray-50/50">
              <div className="flex items-center gap-3 flex-wrap">
                {ratingConfig.map(rc => (
                  <span key={rc.value} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${rc.pillBg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${rc.pillDot}`} />
                    {rc.label}: {ratingCounts[rc.value as 1 | 2 | 3]}
                  </span>
                ))}
              </div>
              <button
                onClick={applyPersonalizedOrder}
                className="px-6 py-2.5 bg-[#1E4A76] text-white rounded-xl text-sm font-semibold hover:bg-[#163A5E] transition shadow-sm flex-shrink-0"
              >
                Apply Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}