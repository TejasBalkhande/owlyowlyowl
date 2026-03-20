// app/act/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import { MenuItem } from "@/types/menu";
import Image from 'next/image';
import { highYieldTopics } from "./lib/highYieldTopics";
import { subjects } from "./lib/subjects";
import { understandingCards } from "./lib/cards";
import { testSections } from "./lib/testStructure";
import HighYieldTopicsTable from "./components/HighYieldTopicsTable";
import React from "react";
import Link from "next/link";
import * as LucideIcons from 'lucide-react';

// Helper to read a cookie on the client
function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export default function ActPage() {
  const [showAll, setShowAll] = React.useState(false);
  const [showAllHighYield, setShowAllHighYield] = React.useState(false);

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

  // Map icon names to actual Lucide components
  const iconMap: Record<string, React.ElementType> = {
    Award: LucideIcons.Award,
    Clock: LucideIcons.Clock,
    HelpCircle: LucideIcons.HelpCircle,
    BookOpen: LucideIcons.BookOpen,
    Brain: LucideIcons.Brain,
    PenTool: LucideIcons.PenTool,
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Prepare high‑yield subjects array
  const highYieldSubjects = [
    { title: "English", data: highYieldTopics.english },
    { title: "Mathematics", data: highYieldTopics.mathematics },
    { title: "Reading", data: highYieldTopics.reading },
    { title: "Science (Optional)", data: highYieldTopics.science },
  ];

  const visibleHighYield = showAllHighYield ? highYieldSubjects : highYieldSubjects.slice(0, 2);

  // Mock data for the dashboard
  const dashboardStats = {
    totalQuestions: 1240,
    correctAnswers: 982,
    accuracy: 79,
    streak: 12,
    predictedScore: 29,
    targetScore: 32,
    weakAreas: ["Punctuation", "Algebra", "Data Interpretation"],
    upcomingMock: "Full Test #4 - This Saturday",
    recentActivity: [
      { date: "Today", activity: "Math Practice - 30 questions", score: "85%" },
      { date: "Yesterday", activity: "Reading Passage - Social Science", score: "78%" },
      { date: "2 days ago", activity: "English - Rhetorical Skills", score: "92%" },
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar items={schoolMenu} logo="OwlenForge" />
      <div className="bg-[bg-gray-50] w-full overflow-visible">
        {/* Main container with responsive grid - expanded to max-w-7xl to accommodate sidebar */}
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Changed from lg:grid-cols-4 to lg:grid-cols-5 to give more width to main content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* LEFT COLUMN – Main content (now 4/5 width on large screens) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Hero Section */}
              <div
                className="relative z-10 w-full bg-white rounded-2xl mb-0 px-6 md:px-9 py-4 md:py-0
                          flex flex-col md:flex-row items-center gap-6 transition-shadow duration-300"
                style={{ boxShadow: "0 -2px 6px rgba(43, 43, 43, 0.10), 0 16px 28px rgba(69, 69, 69,0.05)" }}
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
                    <div className="w-full sm:w-1/3 flex justify-center sm:justify-start mt-2 mb-3">
                      <Image
                        src="/hero-left-2.png"
                        alt="OwenForge logo"
                        width={200}
                        height={200}
                        className="object-contain w-full max-w-[150px] sm:max-w-[200px] h-auto"
                      />
                    </div>
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

              {/* Quick navigation links */}
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

              {/* Divider */}
              <div className="w-full flex justify-center mb-5 mt-10">
                <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent"></div>
              </div>

              {/* Video courses section */}
              <section>
  <div className="w-full py-10 flex flex-col md:flex-row md:items-start gap-6">
    <div className="w-full md:w-auto flex justify-center md:justify-start">
      <Image
        src="/video-img-9.png"
        alt="Video lessons preview"
        width={500}
        height={400}
        className="object-contain w-full max-w-sm md:max-w-md drop-shadow-xl rounded-md hover:bg-[#1E4A76]"
      />
    </div>

    <div className="w-full md:flex-1 flex flex-col space-y-4">
      <h1 className="text-2xl font-semibold font-sans md:text-right text-center text-[#1E4A76]">
        Free Video Lessons
      </h1>
      <h2 className="text-[#4A5568] font-times text-[17px] md:text-right text-center">
        Free video lessons covering ACT subjects, strategies, and practice problems to help you
        master exam content and boost confidence.
      </h2>
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

              {/* Divider */}
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
                      {/* Questions Sheet column */}
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
            </div> {/* End left column */}

            {/* RIGHT COLUMN – Detailed Dashboard (1/5 width on large screens) */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Dashboard Header */}
              <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-5">
                <h2 className="text-xl font-semibold text-[#1E4A76] flex items-center gap-2">
                  <LucideIcons.LayoutDashboard className="w-5 h-5" />
                  Your Dashboard
                </h2>
                <p className="text-xs text-[#718096] mt-1">Track your progress and stay on target</p>
              </div>

              {/* Progress Overview Card */}
              <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-[#2D3748]">Overall Progress</h3>
                  <span className="text-xs bg-green-100 text-green-700 px-1.5 py-1 rounded-full">On track</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle cx="24" cy="24" r="20" stroke="#E2E8F0" strokeWidth="4" fill="none" />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="#1E4A76"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="125.7"
                        strokeDashoffset={125.7 * (1 - dashboardStats.accuracy / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-[#1E4A76]">
                        {dashboardStats.accuracy}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-[#4A5568]">
                      <span className="font-medium">{dashboardStats.correctAnswers}</span> / {dashboardStats.totalQuestions} correct
                    </p>
                    <p className="text-sm text-[#4A5568] mt-1">
                      🔥 {dashboardStats.streak} day streak
                    </p>
                  </div>
                </div>
              </div>

              {/* Score Predictor Card */}
              <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-5">
                <h3 className="font-semibold text-[#2D3748] mb-3">Score Predictor</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-[#1E4A76]">{dashboardStats.predictedScore}</p>
                    <p className="text-xs text-[#718096]">predicted composite</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#2D3748]">Target: {dashboardStats.targetScore}</p>
                    <p className="text-xs text-[#718096]">
                      {dashboardStats.targetScore - dashboardStats.predictedScore > 0
                        ? `${dashboardStats.targetScore - dashboardStats.predictedScore} points to go`
                        : 'Target achieved!'}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-[#EDF2F7] h-2 rounded-full mt-3">
                  <div
                    className="bg-[#1E4A76] h-2 rounded-full"
                    style={{ width: `${(dashboardStats.predictedScore / 36) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Weak Areas Card */}
              <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-5">
                <h3 className="font-semibold text-[#2D3748] mb-3">Focus Areas</h3>
                <ul className="space-y-2">
                  {dashboardStats.weakAreas.map((area, i) => (
                    <li key={i} className="flex items-center justify-between text-sm">
                      <span className="text-[#4A5568]">{area}</span>
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">needs work</span>
                    </li>
                  ))}
                </ul>
                <Link href="/act/Practice-Questions" className="block text-center mt-4 text-sm font-medium text-[#1E4A76] border border-[#1E4A76] rounded-lg py-2 hover:bg-[#1E4A76] hover:text-white transition">
                  Practice Weak Topics
                </Link>
              </div>

              {/* Upcoming Mock Card */}
              <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-5">
                <h3 className="font-semibold text-[#2D3748] mb-2">Upcoming Mock</h3>
                <div className="flex items-center gap-3 text-sm">
                  <LucideIcons.Calendar className="w-5 h-5 text-[#1E4A76]" />
                  <span className="text-[#4A5568]">{dashboardStats.upcomingMock}</span>
                </div>
                <button className="w-full mt-4 bg-[#1E4A76] text-white text-sm font-medium py-2 rounded-lg hover:bg-[#163A5E] transition">
                  View Details
                </button>
              </div>

              {/* Recent Activity Card */}
              <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-5">
                <h3 className="font-semibold text-[#2D3748] mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  {dashboardStats.recentActivity.map((act, i) => (
                    <div key={i} className="border-b border-[#E2E8F0] pb-2 last:border-0 last:pb-0">
                      <p className="text-xs text-[#718096]">{act.date}</p>
                      <p className="text-sm text-[#2D3748] font-medium">{act.activity}</p>
                      <p className="text-xs text-green-600">Score: {act.score}</p>
                    </div>
                  ))}
                </div>
                <Link href="/act/analytics" className="block text-center mt-4 text-sm text-[#1E4A76] hover:underline">
                  View full analytics →
                </Link>
              </div>

              {/* Quick Tip Card */}
              <div className="bg-[#EBF5FF] rounded-xl p-4 border border-[#B8D1E6]">
                <div className="flex gap-2">
                  <LucideIcons.Lightbulb className="w-5 h-5 text-[#1E4A76] flex-shrink-0" />
                  <p className="text-xs text-[#2D3748]">
                    <span className="font-semibold">Pro tip:</span> Review your incorrect answers daily to reinforce weak areas. Consistency beats cramming!
                  </p>
                </div>
              </div>
            </aside>
          </div> {/* End grid */}

          {/* MOVED SECTIONS – now full width and centered */}
          {/* Divider before Understanding ACT */}
          <div className="w-full flex justify-center my-5">
            <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent"></div>
          </div>

          {/* Understanding the ACT Exam */}
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
                {understandingCards.map((card, index) => {
                  const hideOnMobile = !showAll && index >= 3;
                  const IconComponent = iconMap[card.icon];
                  return (
                    <article
                      key={index}
                      className={`bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm hover:shadow-md transition transform hover:-translate-y-1 ${
                        hideOnMobile ? 'hidden sm:block' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-full bg-[#F0F4F8]">
                          {IconComponent && <IconComponent className="w-6 h-6 text-[#4A5568]" />}
                        </div>
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

          {/* Test Structure */}
          <section id="test-structure" className="w-full bg-white py-8 md:px-6 px-0">
            <div className="max-w-6xl mx-auto md:px-4 px-2">
              <div className="w-full py-4 text-center">
                <h1 className="text-2xl font-semibold font-sans text-[#1E4A76]">
                  Test Structure
                </h1>
                <h2 className="text-[#4A5568] font-times text-[17px] max-w-3xl mx-auto mt-2">
                  Test Structure: ACT exam format, section breakdown, and timing
                  information to help you prepare effectively.
                </h2>
              </div>

              <div className="mt-6">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-hidden rounded-xl shadow-lg border border-[#E2E8F0] bg-white font-sans">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-[#1E4A76] text-white">
                        <th className="px-6 py-3 text-left font-semibold tracking-wide">Section</th>
                        <th className="px-6 py-3 text-left font-semibold tracking-wide whitespace-nowrap">Time</th>
                        <th className="px-6 py-3 text-left font-semibold tracking-wide">Questions</th>
                        <th className="px-6 py-3 text-left font-semibold tracking-wide">Format</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] bg-white">
                      {testSections.map((row, idx) => (
                        <tr key={idx} className={`group hover:bg-[#F8FAFC] transition-colors duration-150 ${row.optional ? 'bg-[#F9FAFB]' : ''}`}>
                          <td className="px-6 py-3 font-medium text-[#111827]">
                            {row.section}
                            {row.optional && (
                              <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                                Optional
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-3 text-[#1E4A76] font-semibold whitespace-nowrap text-sm">{row.time}</td>
                          <td className="px-6 py-3 text-[#111827] font-medium whitespace-nowrap text-sm">{row.questions}</td>
                          <td className="px-6 py-3 text-[#4B5563] max-w-sm text-sm">{row.format}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {testSections.map((item, idx) => (
                    <article
                      key={idx}
                      className={`border border-[#E2E8F0] rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200 border-l-4 ${
                        item.optional ? 'border-l-amber-400' : 'border-l-[#1E4A76]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-semibold text-[#111827]">{item.section}</h3>
                            {item.optional && (
                              <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                                Optional
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-[#4B5563] mt-1">{item.format}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-sm font-semibold text-[#1E4A76] whitespace-nowrap">{item.time}</p>
                          <p className="text-xs font-medium text-[#111827] mt-1 whitespace-nowrap">{item.questions}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <p className="text-sm text-[#718096] mt-3">* Scored questions only; some items are pretest/unscored.</p>
              </div>
            </div>
          </section>

          {/* Divider after Test Structure */}
          <div className="w-full flex justify-center mb-10">
            <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent"></div>
          </div>

          {/* Topic/Section Weight */}
          <section id="topic-weight" className="w-full bg-gradient-to-b from-[#F7F9FC] via-white to-white py-12 md:px-5 px-0 font-sans">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col-reverse md:flex-row items-center gap-4 mb-10">
                <div className="w-full md:w-2/3 text-center md:text-left">
                  <h1 className="text-2xl font-semibold font-sans leading-tight tracking-tight text-[#1E4A76] md:px-0">Topic / Section Weight</h1>
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
                  <article key={s.title} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition transform hover:-translate-y-1 flex flex-col h-full">
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
                      <a href={`#${s.title.toLowerCase()}`} className="text-sm font-medium text-[#1E4A76] hover:underline">Practice →</a>
                      <div className="text-xs text-[#A0AEC0]">{s.items.length} focus areas</div>
                    </div>
                  </article>
                ))}

                {/* Writing card */}
                <article className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition transform hover:-translate-y-1 flex flex-col h-full">
                  <header className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#2D3748]">Writing</h3>
                      <p className="text-sm text-[#718096] mt-1">40 min · Optional</p>
                    </div>
                    <span className="text-xs bg-[#EBF5FF] text-[#1E4A76] px-2 py-1 rounded-full font-medium">Essay Rubric</span>
                  </header>
                  <div className="space-y-4">
                    {[
                      { label: "Ideas & Analysis", desc: "Engage and evaluate multiple perspectives" },
                      { label: "Development & Support", desc: "Reasoning, examples, and implications" },
                      { label: "Organization", desc: "Clear structure and logical flow" },
                      { label: "Language & Conventions", desc: "Grammar, tone, and style" },
                    ].map((it) => (
                      <div key={it.label}>
                        <p className="text-sm font-medium text-[#2D3748]">{it.label}</p>
                        <p className="text-xs text-[#718096] mt-1">{it.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <a href="#writing" className="text-sm font-medium text-[#1E4A76] hover:underline">Practice →</a>
                    <div className="text-xs text-[#A0AEC0]">Score: 2–12</div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* High‑Yield Topics */}
          <section id="high-yield" className="w-full py-6 md:px-8 px-0 font-sans ">
            <div className="max-w-6xl mx-auto">
            <div className="w-full flex flex-col items-center text-center space-y-2 mb-6 ">
              <h1 className="text-2xl font-semibold font-sans text-[#1E4A76]">High-Yield Topics</h1>
              <h2 className="text-[#4A5568] font-times text-[17px] lg:w-180 max-w-3xl">
                Most frequently tested subjects and question types on the ACT exam,
                along with targeted study strategies to maximize your score.
              </h2>
            </div>

            <div className="space-y-8">
              {visibleHighYield.map((subject) => (
                <div key={subject.title}>
                  <h3 className="text-lg font-semibold text-[#1E4A76] mb-3 pl-1">{subject.title}</h3>

                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg border border-[#E2E8F0] bg-white">
                    <table className="min-w-full text-sm table-fixed">
                      <thead>
                        <tr className="bg-[#1E4A76] text-white">
                          <th className="px-6 py-2 text-left font-semibold tracking-wide w-[20%]">Category</th>
                          <th className="px-6 py-2 text-left font-semibold tracking-wide whitespace-nowrap w-[12%]">Weight</th>
                          <th className="px-6 py-2 text-left font-semibold tracking-wide w-[12%]">Difficulty</th>
                          <th className="px-6 py-2 text-left font-semibold tracking-wide w-[28%]">Skills</th>
                          <th className="px-6 py-2 text-left font-semibold tracking-wide w-[28%]">Why It Matters</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2E8F0] bg-white">
                        {subject.data.map((row, rowIdx) => {
                          let difficultyClass = '';
                          if (row.difficulty.includes('High') || row.difficulty.includes('Hard')) {
                            difficultyClass = 'bg-red-100 text-red-700';
                          } else if (row.difficulty === 'Medium') {
                            difficultyClass = 'bg-yellow-100 text-yellow-700';
                          } else {
                            difficultyClass = 'bg-green-100 text-green-700';
                          }
                          return (
                            <tr key={rowIdx} className="group hover:bg-[#F8FAFC] transition-colors duration-150">
                              <td className="px-6 py-2 font-medium text-[#2D3748] break-words">{row.category}</td>
                              <td className="px-6 py-2 text-[#4A5568] whitespace-nowrap">
                                <span className="inline-flex items-center rounded-full bg-[#EBF5FF] px-2.5 py-0.5 text-xs font-medium text-[#1E4A76]">
                                  {row.weight}
                                </span>
                              </td>
                              <td className="px-6 py-2 text-[#4A5568]">
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyClass}`}>
                                  {row.difficulty}
                                </span>
                              </td>
                              <td className="px-6 py-2 text-[#4A5568] text-sm break-words">{row.skills}</td>
                              <td className="px-6 py-2 text-[#4A5568] text-sm break-words">{row.why}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden space-y-4">
                    {subject.data.map((row, rowIdx) => {
                      let difficultyClass = '';
                      if (row.difficulty.includes('High') || row.difficulty.includes('Hard')) {
                        difficultyClass = 'bg-red-100 text-red-700';
                      } else if (row.difficulty === 'Medium') {
                        difficultyClass = 'bg-yellow-100 text-yellow-700';
                      } else {
                        difficultyClass = 'bg-green-100 text-green-700';
                      }
                      return (
                        <article key={rowIdx} className="border border-[#E2E8F0] rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-[#1E4A76]">
                          <div className="flex items-start justify-between flex-wrap gap-2">
                            <h4 className="text-base font-semibold text-[#2D3748]">{row.category}</h4>
                            <div className="flex gap-2">
                              <span className="inline-flex items-center rounded-full bg-[#EBF5FF] px-2.5 py-0.5 text-xs font-medium text-[#1E4A76]">
                                {row.weight}
                              </span>
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyClass}`}>
                                {row.difficulty}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 text-sm text-[#4A5568] space-y-2">
                            <p><span className="font-medium text-[#2D3748]">Skills:</span> {row.skills}</p>
                            <p><span className="font-medium text-[#2D3748]">Why:</span> {row.why}</p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowAllHighYield(!showAllHighYield)}
                className="px-5 py-2 rounded-lg bg-[#EDF2F7] text-[#2D3748] text-sm font-medium hover:bg-[#E2E8F0] transition"
              >
                {showAllHighYield ? 'Show less' : 'Show More'}
              </button>
            </div>
            </div>
          </section>
        </div> {/* End main container */}
      </div>
    </div>
  );
}