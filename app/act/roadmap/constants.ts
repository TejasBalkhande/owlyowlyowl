// app/act/roadmap/constants.ts

export function getSubjectConfig(sectionName: string) {
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
}

export const ratingConfig = [
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

export const TOP_LEVEL_TITLES = [
  "Topic Development",
  "Linear Equations",
  "Key Ideas and Details 1",
  "Tables and Graphs 1",
  "Linear and Exponential",
];

export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const MOTIVATIONAL_QUOTES = [
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { quote: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { quote: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { quote: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { quote: "Perseverance is not a long race; it is many short races one after another.", author: "Walter Elliot" },
];

export const QUOTE_IMAGES = [
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=640&q=75",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=640&q=75",
  "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=640&q=75",
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=640&q=75",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=640&q=75",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=640&q=75",
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=640&q=75",
];

export const STUDY_TIPS = [
  { tip: "Use timed practice to simulate real ACT conditions — aim for 45 seconds per English question.", label: "Timing" },
  { tip: "For Reading, annotate the passage while reading before jumping to the questions.", label: "Reading" },
  { tip: "On Math, eliminate obviously out-of-range choices before solving the full problem.", label: "Mathematics" },
  { tip: "Science questions test data interpretation — trust the graphs, not prior knowledge.", label: "Science" },
  { tip: "In English, the most concise grammatically correct option is almost always right.", label: "English" },
  { tip: "Review every wrong answer — understanding your mistakes beats doing more questions.", label: "Review" },
  { tip: "Space your practice across multiple sessions — spaced repetition significantly boosts retention.", label: "Retention" },
];

export const ACT_LINKS = [
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

export const SUBJECT_META: Record<string, { bar: string; bg: string; text: string; label: string }> = {
  English:     { bar: "bg-emerald-500", bg: "bg-emerald-50",  text: "text-emerald-700", label: "ENG" },
  Mathematics: { bar: "bg-blue-500",    bg: "bg-blue-50",     text: "text-blue-700",    label: "MTH" },
  Reading:     { bar: "bg-purple-500",  bg: "bg-purple-50",   text: "text-purple-700",  label: "RDG" },
  Science:     { bar: "bg-amber-500",   bg: "bg-amber-50",    text: "text-amber-700",   label: "SCI" },
};

export const SCORE_BANDS = [
  { range: "33–36", tier: "Elite",      pct: 100, color: "bg-emerald-500", textColor: "text-emerald-700", bg: "bg-emerald-50" },
  { range: "28–32", tier: "Strong",     pct: 82,  color: "bg-blue-500",    textColor: "text-blue-700",    bg: "bg-blue-50"    },
  { range: "24–27", tier: "Above Avg",  pct: 64,  color: "bg-indigo-400",  textColor: "text-indigo-700",  bg: "bg-indigo-50"  },
  { range: "18–23", tier: "Average",    pct: 46,  color: "bg-amber-400",   textColor: "text-amber-700",   bg: "bg-amber-50"   },
  { range: "1–17",  tier: "Below Avg",  pct: 28,  color: "bg-rose-300",    textColor: "text-rose-700",    bg: "bg-rose-50"    },
];