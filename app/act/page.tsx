// app/act/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import { MenuItem } from "@/types/menu";
import Image from 'next/image';
import { highYieldTopics } from "./lib/highYieldTopics";
import HighYieldTopicsTable from "./components/HighYieldTopicsTable";
import React from "react";
import Link from "next/link";

// Helper to read a cookie on the client
function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

const subjects = [
  {
    title: "English",
    time: "35 min",
    items: [
      { label: "Production of Writing", pct: 40, desc: "Topic development, organization, cohesion" },
      { label: "Conventions of Standard English", pct: 40, desc: "Grammar, punctuation, sentence structure" },
      { label: "Knowledge of Language", pct: 20, desc: "Word choice, tone, concision" },
    ],
  },
  {
    title: "Mathematics",
    time: "50 min",
    items: [
      { label: "Core Categories", pct: 80, desc: "Algebra, Functions, Geometry, Number & Quantity, Statistics" },
      { label: "Integrating Essential Skills", pct: 20, desc: "Multi‑concept application" },
    ],
  },
  {
    title: "Reading",
    time: "40 min",
    items: [
      { label: "Key Ideas & Details", pct: 48, desc: "Central ideas, inferences, evidence" },
      { label: "Craft & Structure", pct: 30, desc: "Tone, author purpose, structure" },
      { label: "Integration", pct: 22, desc: "Arguments, graphics, multiple texts" },
    ],
  },
  {
    title: "Science",
    time: "40 min",
    items: [
      { label: "Interpretation of Data", pct: 44, desc: "Graphs, trends, tables and experiments" },
      { label: "Scientific Investigation", pct: 25, desc: "Design, variables" },
      { label: "Evaluation of Arguments", pct: 31, desc: "Models, evidence" },
    ],
  },
];

export default function ActPage() {
  const [showAll, setShowAll] = React.useState(false);

  // Determine login status from the non‑HTTP‑only cookie
  const isLoggedIn = getCookie("user-logged-in") === "true";

  // Build the menu dynamically based on auth status
  const schoolMenu: MenuItem[] = [
    { label: "Mock-Test", href: "/act/Practice-Questions#full-length-mock-test" },
    { label: "Study-Resources", href: "/act" },
    { label: "Practice-Questions", href: "/act/Practice-Questions" },
    { label: "Courses", href: "/act/courses" },
    { label: "Roadmap", href: "/act/roadmap" },
    { label: "Account", href: "/account" }
  ];

  const cards = [
    {
      title: 'Scoring',
      text: 'Sections scored 1–36. Composite = average of English, Math, Reading, Science. Writing (essay) scored 2–12 separately. Many colleges accept superscores.',
      icon: '📊',
    },
    {
      title: 'Timing',
      text: 'Total time usually ~2h20–2h55 depending on sections. With Writing, expect ~3h40. Practice with section timers to build pacing.',
      icon: '⏱️',
    },
    {
      title: 'Question Types',
      text: 'Mostly multiple-choice (4 options). Writing requires an analytical essay comparing perspectives — practice planning and timing.',
      icon: '❓',
    },
    {
      title: 'Resources',
      text: 'Combine official ACT materials with targeted practice (reading speed drills, timed math sets, and science reasoning passages).',
      icon: '📚',
    },
    {
      title: 'Strategy',
      text: 'Work high-confidence items first, skip & mark for review, and watch pacing. No penalty for guessing — answer every question.',
      icon: '🧠',
    },
    {
      title: 'Practice',
      text: 'Use official practice tests, simulate test-day conditions, and review mistakes thoroughly to improve accuracy and speed.',
      icon: '✍️',
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar items={schoolMenu} logo="OwlenForge" />
      <div className="bg-[bg-gray-50] w-full overflow-visible">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-4 md:pt-2 lg:pt-2">
          {/* Top right link */}
          <div className="w-full text-right font-times md:text-[17px] text-[15px]">
            <p className="text-black">Terms & Conditions</p>
          </div>

          {/* Hero Section */}
          <div
            className="mt-6 relative z-10 w-full bg-white rounded-2xl mb-0 px-6 md:px-9 py-4 md:py-0
                      flex flex-col md:flex-row items-center gap-6 transition-shadow duration-300"
            style={{ boxShadow: "0 -2px 6px rgba(43, 43, 43, 0.03), 0 16px 28px rgba(69, 69, 69,0.06)" }}
          >
            <div className="w-full md:w-3/5 flex flex-col space-y-2">
              {/* Search Bar */}
              <div className="flex items-center border border-[#E2E8F0] rounded-full px-4 py-2 w-full bg-white text-sm shadow-sm focus-within:ring-2 focus-within:ring-[#1E4A76]/20 transition mt-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#A0AEC0]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search for books, notes, Question Banks"
                  className="ml-2 w-full outline-none bg-transparent text-[#2D3748] placeholder-[#A0AEC0]"
                />
              </div>

              {/* Two Columns Below Search Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
                {/* Left Sub‑Column: Logo – takes 1/3 width */}
                <div className="w-full sm:w-1/3 flex justify-center sm:justify-start mt-2 mb-3">
                  <Image
                    src="/hero-left-2.png"
                    alt="OwenForge logo"
                    width={200}
                    height={200}
                    className="object-contain w-full max-w-[150px] sm:max-w-[200px] h-auto"
                  />
                </div>

                {/* Right Sub‑Column: Heading, Description, Button – takes 2/3 width */}
                <div className="w-full sm:w-2/3 text-center sm:text-left">
                  <h1 className="md:text-2xl text-xl font-semibold font-sans text-[#1E4A76]">
                    Strategic ACT Preparation for Excellence
                  </h1>
                  <p className="text-[#4A5568] font-times md:text-[17px] text-[15px] mt-2">
                    Comprehensive ACT Exam Guide: Strategies, Practice, and Resources to Maximize Your Score
                  </p>
                  <button className="mt-4 mb-8 px-6 py-2 bg-[#1E4A76] text-white rounded-lg hover:bg-[#163A5E] transition shadow-md">
                    Start Preparation
                  </button>
                </div>
              </div>
            </div>

            {/* Right Overall Column: girlhero.png – aligned bottom and shifted right */}
            <div className="hidden md:flex w-full md:w-2/5 justify-center md:justify-end self-end">
              <Image
                src="/girlhero.png"
                alt="Girl hero"
                width={400}
                height={400}
                className="object-contain w-full max-w-[400px] h-auto md:-mr-6"
              />
            </div>
          </div>

          {/* Section Navigation scroll to respective section */}
          <div className="w-full overflow-x-auto pt-3 font-times md:text-[17px] text-[15px] mb-3">
            <div className="flex flex-wrap md:flex-nowrap gap-x-8 gap-y-1 md:gap-y-0 text-[#2D3748] font-medium leading-tight pb-2">
              {[
                { id: 'understanding-act', label: 'Understanding the ACT Exam' },
                { id: 'topic-weight', label: 'Topic/Section Weight' },
                { id: 'test-structure', label: 'Test Structure' },
                { id: 'high-yield', label: 'High-Yield' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="cursor-pointer pb-1 underline underline-offset-4 decoration-[#2D3748]
                            hover:text-[#1E4A76] hover:decoration-[#1E4A76]
                            active:text-[#2563EB] active:decoration-[#2563EB]
                            transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mocks and Questions */}
          <section>
            <div className="w-full py-3 flex flex-col-reverse md:flex-row items-center md:items-start gap-6">
              <div className="w-full md:w-1/2 flex flex-col items-start space-y-4">
                <h1 className="text-2xl font-semibold text-left font-sans text-[#1E4A76]">ACT Test Simulator</h1>
                <h2 className="text-[#4A5568] text-left font-times text-[17px] lg:w-150">
                  detailed explanations, full-length mock exams, and topic-wise practice questions to strengthen concepts and improve your score.
                </h2>

                <div className="flex flex-col gap-3 pt-4 w-full md:w-auto font-medium">
                  <Link
                    href="/act/Practice-Questions#full-length-mock-test"
                    className="w-full md:w-64 border border-[#1E4A76] bg-white text-[#1E4A76] py-2 rounded-md hover:bg-[#1E4A76] hover:text-white transition text-center block shadow-sm hover:shadow-md"
                  >
                    Full-Length Mock Tests
                  </Link>
                  <Link href="/act/Practice-Questions">
                    <button className="w-full md:w-64 border border-[#1E4A76] bg-white text-[#1E4A76] py-2 rounded-md hover:bg-[#1E4A76] hover:text-white transition shadow-sm hover:shadow-md">
                      Topic-wise Questions
                    </button>
                  </Link>
                </div>
              </div>

              <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-5">
                <Image
                  src="/LaptopMock.png"
                  width={700}
                  height={420}
                  alt="Laptop mock"
                  className="w-full max-w-xs md:max-w-sm lg:max-w-md object-contain drop-shadow-lg"
                  style={{ userSelect: 'none' }}
                />
              </div>
            </div>
          </section>

          {/* Section Divider */}
          <div className="w-full flex justify-center mb-5 mt-10">
            <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent"></div>
          </div>

          {/* video courses section */}
          <section>
            <div className="w-full py-10 flex flex-col md:flex-row md:items-start gap-6">
              <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                <Image
                  src="/video-img-9.png"
                  alt="Video lessons preview"
                  width={300}
                  height={200}
                  className="object-contain w-full max-w-sm md:max-w-md drop-shadow-xl"
                />
              </div>

              <div className="w-full md:w-1/2 flex flex-col space-y-4">
                <h1 className="text-2xl font-semibold font-sans md:text-right text-center text-[#1E4A76]">
                  Free Video Lessons
                </h1>
                <h2 className="text-[#4A5568] font-times text-[17px] md:text-right text-center">
                  Free video lessons covering ACT subjects, strategies, and practice problems to help you
                  master exam content and boost confidence.
                </h2>

                {/* Buttons container - now with font-medium to match first section */}
                <div className="flex flex-wrap gap-3 pt-2 md:items-center md:justify-end justify-center font-medium">
                  <button className="w-full md:w-64 border border-[#1E4A76] bg-white text-[#1E4A76] py-2 rounded-md hover:bg-[#1E4A76] hover:text-white transition shadow-sm hover:shadow-md">
                    Video Lectures
                  </button>
                  <button className="w-full md:w-64 border border-[#1E4A76] bg-white text-[#1E4A76] py-2 rounded-md hover:bg-[#1E4A76] hover:text-white transition shadow-sm hover:shadow-md">
                    Create Roadmap
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section Divider */}
          <div className="w-full flex justify-center my-5">
            <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent"></div>
          </div>

          {/* Books & Notes Section */}
          <section className="w-full">
            <div className="w-full py-6">
              <div className="w-full flex flex-col space-y-2">
                <h1 className="text-2xl font-semibold font-sans text-[#1E4A76]">Books & Written Notes For ACT Prep</h1>
                <h2 className="text-[#4A5568] font-times text-[17px] mb-4 w-full">
                  Books for ACT Exam Preparation: Comprehensive Guides, Practice Tests, and Subject-Specific Resources to Ace the ACT
                </h2>
              </div>

              <div className="w-full mt-6">
                {/* Three-column grid: stacks on mobile, three equal columns on medium+ screens */}
                <div className="flex flex-col md:flex-row items-stretch gap-8">
                  {/* Books column */}
                  <div className="w-full md:w-1/3 flex flex-col items-center text-center space-y-4">
                    <div className="w-full max-w-md rounded-xl overflow-hidden transition">
                      <div className="relative w-full h-52 md:h-64">
                        <Image
                          src="/books.png"
                          alt="ACT books"
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <a
                      href="/books.png"
                      download="ACT-books.png"
                      className="inline-block mt-2 w-11/12 md:w-2/3 text-center px-4 py-2 border border-[#1E4A76] text-[#1E4A76] rounded-md bg-white hover:bg-[#1E4A76] hover:text-white transition text-sm font-medium shadow-sm hover:shadow-md"
                      aria-label="Download ACT books image"
                    >
                      Download Book
                    </a>
                    <p className="text-xs text-[#718096] mt-2 max-w-xs">
                      Detailed book covers and descriptions — click Download to save the PDF/image.
                    </p>
                  </div>

                  {/* Questions Sheet column (new) */}
                  <div className="w-full md:w-1/3 flex flex-col items-center text-center space-y-4">
                    <div className="w-full max-w-md rounded-xl overflow-hidden">
                      <div className="relative w-full h-52 md:h-64">
                        <Image
                          src="/question-sheet.png"
                          alt="ACT question sheet"
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <a
                      href="/question-sheet.png"
                      download="ACT-question-sheet.png"
                      className="inline-block mt-2 w-11/12 md:w-2/3 text-center px-4 py-2 border border-[#1E4A76] text-[#1E4A76] rounded-md bg-white hover:bg-[#1E4A76] hover:text-white transition text-sm font-medium shadow-sm hover:shadow-md"
                      aria-label="Download ACT question sheet"
                    >
                      Download Question Sheet
                    </a>
                    <p className="text-xs text-[#718096] mt-2 max-w-xs">
                      Practice questions and answer sheets — click Download to save the PDF/image.
                    </p>
                  </div>

                  {/* Notes column */}
                  <div className="w-full md:w-1/3 flex flex-col items-center text-center space-y-4">
                    <div className="w-full max-w-md rounded-xl overflow-hidden">
                      <div className="relative w-full h-52 md:h-64">
                        <Image
                          src="/notes-img.png"
                          alt="ACT notes"
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <a
                      href="/notes-img.png"
                      download="ACT-notes.png"
                      className="inline-block mt-2 w-11/12 md:w-2/3 text-center px-4 py-2 border border-[#1E4A76] text-[#1E4A76] rounded-md bg-white hover:bg-[#1E4A76] hover:text-white transition text-sm font-medium shadow-sm hover:shadow-md"
                      aria-label="Download ACT notes image"
                    >
                      Download Notes
                    </a>
                    <p className="text-xs text-[#718096] mt-2 max-w-xs">
                      High-resolution notes — click Download to save the PDF/image.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section Divider */}
          <div className="w-full flex justify-center my-5">
            <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent"></div>
          </div>

          {/* ===== Understanding the ACT Exam ===== */}
          <section id="understanding-act" className="w-full bg-gradient-to-b from-[#F7F9FC] via-white to-white mt-10 py-10 md:px-10 px-0">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col-reverse md:flex-row items-center gap-8">
                <div className="w-full md:w-2/3 text-center md:text-left">
                  <h1 className="text-2xl font-semibold font-sans leading-tight tracking-tight text-[#1E4A76] md:px-0 px-3">
                    Understanding the ACT Exam
                  </h1>
                  <p className="mt-3 text-[#4A5568] font-times text-[17px] md:text-lg max-w-3xl mx-auto md:mx-0 md:px-0 px-3">
                    ACT Overview — Format, sections, scoring, and essential strategies to guide your preparation and test-day performance.
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4 justify-center md:justify-start md:px-0 px-3">
                    <a
                      href="act/Practice-Questions"
                      className="inline-block px-5 py-3 rounded-lg bg-[#3e6286] text-white text-sm font-semibold shadow hover:bg-[#163A5E] transition hover:shadow-lg"
                      aria-label="Get started with ACT preparation"
                    >
                      Start Preparing
                    </a>
                    <button
                      onClick={() => scrollToSection('topic-weight')}
                      className="inline-block mt-3 sm:mt-0 px-4 py-3 rounded-lg border border-[#E2E8F0] text-sm text-[#2D3748] font-medium hover:bg-[#F7F9FC] transition bg-white shadow-sm hover:shadow-md"
                    >
                      See detailed breakdown
                    </button>
                  </div>
                </div>

                <div className="w-full md:w-1/3 flex justify-center md:justify-end">
                  <div className="w-56 bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-lg hover:shadow-xl transition">
                    <div className="flex items-center justify-center h-28">
                      <div className="w-24 h-24 rounded-full bg-[#EBF5FF] flex items-center justify-center text-[#1E4A76] text-4xl font-bold">
                        ACT
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-sm text-[#718096]">
                        Timed, multiple-choice sections + optional essay
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-8"></div>

              <div id="details" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => {
                  const hideOnMobile = !showAll && index >= 3;
                  return (
                    <article
                      key={index}
                      className={`bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm hover:shadow-md transition transform hover:-translate-y-1 ${
                        hideOnMobile ? 'hidden sm:block' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{card.icon}</span>
                        <h3 className="text-lg font-semibold text-[#2D3748]">{card.title}</h3>
                      </div>
                      <p className="text-[#4A5568] text-sm">{card.text}</p>
                    </article>
                  );
                })}
              </div>

              <div className="flex justify-center mt-6 sm:hidden">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-5 py-2 rounded-lg bg-[#EDF2F7] text-[#2D3748] text-sm font-medium hover:bg-[#E2E8F0] transition"
                >
                  {showAll ? 'Show less' : 'Show more'}
                </button>
              </div>
            </div>
          </section>

          {/* ===== Test Structure ===== */}
          <section id="test-structure" className="w-full bg-white py-8 md:px-6 px-0">
            <div className="max-w-6xl mx-auto md:px-4 px:2">
              <div className="w-full py-4 text-center">
                <h1 className="text-2xl font-semibold font-sans text-[#1E4A76]">Test Structure</h1>
                <h2 className="text-[#4A5568] font-times text-[17px] max-w-3xl mx-auto mt-2">
                  Test Structure: ACT exam format, section breakdown, and timing information to help you prepare effectively.
                </h2>
              </div>

              <div className="mt-6">
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto rounded-lg border border-[#E2E8F0] shadow-sm">
                  <table className="min-w-full bg-white">
                    <thead className="bg-[#EDF2F7]">
                      <tr className="text-left">
                        <th className="px-6 py-3 text-sm font-semibold border-b border-[#E2E8F0] sticky top-0 bg-[#EDF2F7] text-[#2D3748]">Section</th>
                        <th className="px-6 py-3 text-sm font-semibold border-b border-[#E2E8F0] sticky top-0 bg-[#EDF2F7] text-[#2D3748]">Time</th>
                        <th className="px-6 py-3 text-sm font-semibold border-b border-[#E2E8F0] sticky top-0 bg-[#EDF2F7] text-[#2D3748]">Questions</th>
                        <th className="px-6 py-3 text-sm font-semibold border-b border-[#E2E8F0] sticky top-0 bg-[#EDF2F7] text-[#2D3748]">Format</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-[#4A5568]">
                      <tr className="odd:bg-white even:bg-[#F7F9FC] border-b border-[#E2E8F0]">
                        <td className="px-6 py-4 font-medium">English</td>
                        <td className="px-6 py-4">35 minutes</td>
                        <td className="px-6 py-4">50 (40 scored)</td>
                        <td className="px-6 py-4">Multiple-choice, passage-based</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-[#F7F9FC] border-b border-[#E2E8F0]">
                        <td className="px-6 py-4 font-medium">Mathematics</td>
                        <td className="px-6 py-4">50 minutes</td>
                        <td className="px-6 py-4">45 (41 scored)</td>
                        <td className="px-6 py-4">Multiple-choice, calculator allowed</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-[#F7F9FC] border-b border-[#E2E8F0]">
                        <td className="px-6 py-4 font-medium">Reading</td>
                        <td className="px-6 py-4">40 minutes</td>
                        <td className="px-6 py-4">36 (27 scored)</td>
                        <td className="px-6 py-4">Multiple-choice, passage-based</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-[#F7F9FC] border-b border-[#E2E8F0]">
                        <td className="px-6 py-4 font-medium">Science (Optional)</td>
                        <td className="px-6 py-4">40 minutes</td>
                        <td className="px-6 py-4">40 (34 scored)</td>
                        <td className="px-6 py-4">Data representation, research summaries, conflicting viewpoints</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-[#F7F9FC]">
                        <td className="px-6 py-4 font-medium">Writing (Optional)</td>
                        <td className="px-6 py-4">40 minutes</td>
                        <td className="px-6 py-4">1 essay</td>
                        <td className="px-6 py-4">Essay analyzing a complex issue & perspectives</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Mobile stacked cards */}
                <div className="md:hidden space-y-3">
                  {[
                    { title: 'English', time: '35 min', q: '50 (40 scored)', format: 'Multiple-choice, passage-based' },
                    { title: 'Mathematics', time: '50 min', q: '45 (41 scored)', format: 'Multiple-choice, calculator allowed' },
                    { title: 'Reading', time: '40 min', q: '36 (27 scored)', format: 'Multiple-choice, passage-based' },
                    { title: 'Science (Optional)', time: '40 min', q: '40 (34 scored)', format: 'Data representation, research summaries, conflicting viewpoints' },
                    { title: 'Writing (Optional)', time: '40 min', q: '1 essay', format: 'Essay analyzing a complex issue & perspectives' },
                  ].map((item, idx) => (
                    <article key={idx} className="border border-[#E2E8F0] rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-[#2D3748]">{item.title}</h3>
                          <p className="text-sm text-[#4A5568] mt-1">{item.format}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-[#1E4A76]">{item.time}</p>
                          <p className="text-xs text-[#718096] mt-1">{item.q}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <p className="text-sm text-[#718096] mt-3">* Scored questions only; some items are pretest/unscored.</p>
              </div>
            </div>
          </section>

          {/* Section Divider */}
          <div className="w-full flex justify-center mb-10">
            <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent"></div>
          </div>

          {/* ===== Topic/Section Weight ===== */}
          <section id="topic-weight" className="w-full bg-gradient-to-b from-[#F7F9FC] via-white to-white py-12 py-5 md:px-10 px-0">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col-reverse md:flex-row items-center gap-8 mb-10">
                <div className="w-full md:w-2/3 text-center md:text-left">
                  <h1 className="text-2xl font-semibold font-sans leading-tight tracking-tight text-[#1E4A76] md:px-0 px-3">Topic / Section Weight</h1>
                  <p className="mt-3 text-[#4A5568] font-times text-[17px] md:text-lg max-w-3xl mx-auto md:mx-0 md:px-0 px-3">
                    ACT content distribution and high-yield areas to prioritise in your preparation. Use the quick bars to scan high-weight focuses and drill down to practice.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                    <Link href="/act/Practice-Questions" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1E4A76] text-white text-sm font-semibold shadow hover:bg-[#163A5E] transition hover:shadow-lg">
                      Explore Sections
                    </Link>

                    <a href="#high-yield" className="inline-block px-4 py-3 rounded-lg border border-[#E2E8F0] text-sm text-[#2D3748] font-medium hover:bg-[#F7F9FC] transition bg-white shadow-sm hover:shadow-md">
                      High-Yield Topics
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                {subjects.map((s) => (
                  <article
                    key={s.title}
                    className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition transform hover:-translate-y-1 flex flex-col h-full"
                  >
                    <header className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[#2D3748]">{s.title}</h3>
                        <p className="text-sm text-[#718096] mt-1">{s.time}</p>
                      </div>
                      <span className="text-xs bg-[#EBF5FF] text-[#1E4A76] px-2 py-1 rounded-full font-medium">Summary</span>
                    </header>

                    <div className="space-y-4">
                      {s.items.map((it) => (
                        <div key={it.label}>
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-[#2D3748]">{it.label}</p>
                            <p className="text-sm text-[#718096]">{it.pct}%</p>
                          </div>

                          <div className="mt-2 h-2 w-full bg-[#EDF2F7] rounded-full overflow-hidden" aria-hidden>
                            <div
                              className="h-full rounded-full shadow-inner"
                              style={{ width: `${it.pct}%`, background: 'linear-gradient(90deg, #1E4A76, #3A6D9C)' }}
                            />
                          </div>

                          <p className="text-xs text-[#718096] mt-2">{it.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-6">
                      <a href={`#${s.title.toLowerCase()}`} className="text-sm font-medium text-[#1E4A76] hover:underline">
                        Practice →
                      </a>
                      <div className="text-xs text-[#A0AEC0]">{s.items.length} focus areas</div>
                    </div>
                  </article>
                ))}

                {/* Writing: full width card */}
                <article className="lg:col-span-3 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col h-full">
                  <header className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-[#2D3748]">Writing (Optional)</h3>
                    <span className="text-sm text-[#718096]">Essay Rubric</span>
                  </header>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                    <div>
                      <p className="font-medium text-[#2D3748]">Ideas & Analysis</p>
                      <p className="text-[#718096] text-sm mt-1">Engage multiple perspectives</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#2D3748]">Development & Support</p>
                      <p className="text-[#718096] text-sm mt-1">Reasoning, examples, implications</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#2D3748]">Organization</p>
                      <p className="text-[#718096] text-sm mt-1">Clear structure and flow</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#2D3748]">Language & Conventions</p>
                      <p className="text-[#718096] text-sm mt-1">Grammar, tone, style</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#A0AEC0] mt-6">Each domain contributes equally to the essay score (2–12).</p>
                </article>
              </div>
            </div>
          </section>

          {/* ===== High‑Yield Topics ===== */}
          <section id="high-yield" className="w-full py-6 md:px-8 px-0">
            <div className="w-full flex flex-col items-center text-center space-y-2 mb-6">
              <h1 className="text-2xl font-semibold font-sans text-[#1E4A76]">High-Yield Topics</h1>
              <h2 className="text-[#4A5568] font-times text-[17px] lg:w-180 max-w-3xl">
                Most frequently tested subjects and question types on the ACT exam, along with targeted study strategies to maximize your score.
              </h2>
            </div>

            <div className="space-y-4">
              <HighYieldTopicsTable title="English" data={highYieldTopics.english} />
              <HighYieldTopicsTable title="Mathematics" data={highYieldTopics.mathematics} />
              <HighYieldTopicsTable title="Reading" data={highYieldTopics.reading} />
              <HighYieldTopicsTable title="Science (Optional)" data={highYieldTopics.science} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}