export type Video = {
  title: string;
  publicId: string;
  description?: string;
  duration?: string; // optional, e.g. "12:34"
};

export type Course = {
  slug: string;
  title: string;
  description: string;
  category: string;
  duration: string;        // human readable, e.g. "4.5 hours"
  videoCount: number;
  thumbnailPublicId: string; // Cloudinary public ID for the course thumbnail
  videos: Video[];
};

// ---------- Maths ----------
const mathVideos: Video[] = [
  { title: "Lines-Graphs and Equations", publicId: "12._Lines-Graphs_and_Equations_dcinmq", duration: "08:22" },
  { title: "Parallel and Perpendicular Lines", publicId: "15._Parallel_and_Perpendicular_Lines_p2sjvu", duration: "06:15" },
  { title: "Distance Formula", publicId: "6._Distance_Formula_mbtn6r", duration: "05:47" },
  { title: "Midpoint Formula", publicId: "14._Midpoint_Formula_a6ok3y", duration: "04:30" },
  { title: "Circles-Graphs and Equations", publicId: "3._Circles-Graphs_and_Equations_de8smu", duration: "09:10" },
  { title: "Exponent Rules and Simplifying using Exponent Rules", publicId: "8._Exponent_Rules_and_Simplifying_using_Exponent_Rules_leuqsc", duration: "11:20" },
  { title: "Simplifying Radicals", publicId: "19._Simplifying_Radicals_jpqbmi", duration: "07:45" },
  { title: "Polynomials", publicId: "16._Polynomials_pf2fp6", duration: "10:05" },
  { title: "Factoring", publicId: "10._Factoring_aynpwt", duration: "12:30" },
  { title: "Solving Quadratic Equations", publicId: "20._Solving_Quadratic_Equations_hokfqi", duration: "14:15" },
  { title: "Functions", publicId: "11._Functions_zrmtez", duration: "08:50" },
  { title: "Absolute Value Equations", publicId: "1._Absolute_Value_Equations_1_fbwynz", duration: "06:40" },
  { title: "Absolute Value Inequalities", publicId: "2_Absolute_Value_Inequalities_k0bw6w", duration: "07:20" },
  { title: "Rational Expressions", publicId: "18._Rational_Expressions_ewnsmn", duration: "09:35" },
  { title: "Rational Equations", publicId: "17._Rational_Equations_xew2rf", duration: "08:25" },
  { title: "Application of exponential function", publicId: "9._Application_of_exponential_function_tog1uh", duration: "05:55" },
  { title: "Compound Interest", publicId: "4._Compound_Interest_ahaabz", duration: "07:10" },
];

// ---------- English ----------
const englishVideos: Video[] = [
  { title: "ACT English Intro: What to Expect, Strategy, and How to Prepare", publicId: "1._ACT_English_Intro_What_to_Expect_Strategy_and_How_to_Prepare_1_qzieg4", duration: "10:22" },
  { title: "ACT English Punctuation Guide Part 1", publicId: "2._ACT_English_Punctuation_Guide_Part_1_g9rlxn", duration: "08:45" },
  { title: "ACT English Punctuation Guide Part 2", publicId: "3._ACT_English_Punctuation_Guide_Part_2_jpqgzl", duration: "09:15" },
  { title: "ACT English Concepts Part 1", publicId: "4._ACT_English_Concepts_Part_1_1_dkkmtd", duration: "12:00" },
  { title: "ACT English Concepts Part 2", publicId: "5._ACT_English_Concepts_Part_2_zuqzwo", duration: "11:30" },
  { title: "ACT English Concepts Part 3", publicId: "6._ACT_English_Concepts_Part_3_qupign", duration: "10:50" },
  { title: "ACT English Verb and Answer Explanation Practice Problems", publicId: "7._ACT_English_Verb_and_Answer_Explanation_Practice_Problems_qrxjjx", duration: "15:20" },
];

// ---------- Reading ----------
const readingVideos: Video[] = [
  { title: "ACT Reading Comprehension: Strategy and Approach", publicId: "1._ACT_Reading_Comprehension__Strategy_and_Approach_oxufqw", duration: "09:40" },
  { title: "ACT Reading Comprehension: How to Improve Pacing", publicId: "2._ACT_Reading_Comprehension_How_to_Improve_Pacing_ukgrbn", duration: "08:30" },
];

// ---------- Science ----------
const scienceVideos: Video[] = [
  { title: "ACT Science Graph and Special Question Types", publicId: "1._ACT_Science_Graph_and_Special_Question_Types_1_zzlw5n", duration: "07:55" },
  { title: "ACT Science Concepts Part 1", publicId: "2._ACT_Science_Concepts_Part_1_1_rrk7rl", duration: "10:15" },
  { title: "ACT Science Concepts Part 2", publicId: "3._ACT_Science__Concepts_Part_2_1_gtwffs", duration: "09:45" },
  { title: "ACT Science Concepts Part 3", publicId: "4._ACT_Science__Concepts_Part_3_1_cf9xmw", duration: "11:20" },
];

// Build course objects
export const courses: Course[] = [
  {
    slug: 'math',
    title: 'Mathematics',
    description: 'Master algebra, geometry, and advanced math topics with step‑by‑step video lessons.',
    category: 'Math',
    duration: '~3.5 hours',
    videoCount: mathVideos.length,
    thumbnailPublicId: 'math_course_thumb', // replace with a real publicId if available
    videos: mathVideos,
  },
  {
    slug: 'english',
    title: 'English',
    description: 'Crack ACT English with punctuation guides, grammar concepts, and practice problems.',
    category: 'English',
    duration: '~2.5 hours',
    videoCount: englishVideos.length,
    thumbnailPublicId: 'english_course_thumb',
    videos: englishVideos,
  },
  {
    slug: 'reading',
    title: 'Reading',
    description: 'Improve pacing and comprehension with proven strategies for the ACT Reading section.',
    category: 'Reading',
    duration: '~1 hour',
    videoCount: readingVideos.length,
    thumbnailPublicId: 'reading_course_thumb',
    videos: readingVideos,
  },
  {
    slug: 'science',
    title: 'Science',
    description: 'Interpret graphs, data, and scientific concepts quickly and accurately.',
    category: 'Science',
    duration: '~1.5 hours',
    videoCount: scienceVideos.length,
    thumbnailPublicId: 'science_course_thumb',
    videos: scienceVideos,
  },
];

// Optional: export raw video data as JSON (for external use)
export const videosJson = {
  math: mathVideos,
  english: englishVideos,
  reading: readingVideos,
  science: scienceVideos,
};