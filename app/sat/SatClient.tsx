// app/sat/SatClient.tsx (Client Component)
"use client";

import Navbar from "@/components/Navbar";
import { MenuItem } from "@/types/menu";
import Image from 'next/image';
import React from "react";
import Link from "next/link";
import * as LucideIcons from 'lucide-react';
import { understandingCards } from "./lib/cards";
import { readingWritingDomains, mathDomains } from "./lib/domainData";

const testSections = [
  {
    section: "Reading and Writing",
    module: "Module 1",
    time: "32 Minutes",
    questions: "27 Questions",
    format: "25 operational questions and 2 pretest questions"
  },
  {
    section: "Reading and Writing",
    module: "Module 2",
    time: "32 Minutes",
    questions: "27 Questions",
    format: "25 operational questions and 2 pretest questions"
  },
  {
    section: "Math",
    module: "Module 1",
    time: "35 Minutes",
    questions: "22 Questions",
    format: "20 operational questions and 2 pretest questions"
  },
  {
    section: "Math",
    module: "Module 2",
    time: "35 Minutes",
    questions: "22 Questions",
    format: "20 operational questions and 2 pretest questions"
  }
];

const subjects = [
  {
    title: "Reading & Writing",
    time: "64 Minutes",
    items: [
      { label: "Craft and Structure", pct: 28, desc: "Vocabulary, text structure, and connections." },
      { label: "Information and Ideas", pct: 26, desc: "Central ideas, evidence, and data interpretation." },
      { label: "Standard English Conventions", pct: 26, desc: "Boundaries, form, structure, and punctuation." }
    ]
  },
  {
    title: "Mathematics",
    time: "70 Minutes",
    items: [
      { label: "Algebra", pct: 35, desc: "Linear equations, inequalities, and functions." },
      { label: "Advanced Math", pct: 35, desc: "Quadratic and exponential functions." },
      { label: "Problem Solving", pct: 15, desc: "Ratios, rates, and data analysis." }
    ]
  }
];

interface DashboardStats {
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  streak: number;
  predictedScore: number;
  targetScore: number;
  weakAreas: string[];
  upcomingMock: string;
  recentActivity: { date: string; activity: string; score: string }[];
}

interface SatClientProps {
  username: string | null;
  isLoggedIn: boolean;
  dashboardStats: DashboardStats;
}

const schoolMenu: MenuItem[] = [
  { label: "Practice Tests", href: "/sat/Practice-Questions#full-length-mock-test" },
  { label: "Study Resources", href: "/sat" },
  { label: "Practice Questions", href: "/sat/Practice-Questions" },
  { label: "Courses", href: "/sat/courses" },
  { label: "Study Plan", href: "/sat/roadmap" },
  { label: "My Account", href: "/account" }
];

const iconMap: Record<string, React.ElementType> = {
  Award: LucideIcons.Award,
  Clock: LucideIcons.Clock,
  HelpCircle: LucideIcons.HelpCircle,
  BookOpen: LucideIcons.BookOpen,
  Brain: LucideIcons.Brain,
  PenTool: LucideIcons.PenTool,
};

export default function SatClient({ username, isLoggedIn, dashboardStats }: SatClientProps) {
  const [showAllUnderstanding, setShowAllUnderstanding] = React.useState(false);

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
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-4 space-y-8">

              <div
                className="relative z-10 w-full bg-white rounded-2xl mb-0 px-4 md:px-9 py-3 md:py-0
                          flex flex-col md:flex-row items-center gap-6 transition-shadow duration-300"
                style={{ boxShadow: "0 -2px 6px rgba(43, 43, 43, 0.10), 0 16px 28px rgba(69, 69, 69,0.05)" }}
              >
                <div className="w-full md:w-3/5 flex flex-col space-y-2">
                  <div className="flex items-center border border-[#E2E8F0] rounded-full px-3 py-1.5 md:py-2 w-full bg-white text-sm shadow-sm focus-within:ring-2 focus-within:ring-[#1E4A76]/20 transition mt-3 md:mt-6">
                    <LucideIcons.Search className="h-4 w-4 md:h-5 md:w-5 text-[#A0AEC0] shrink-0" />
                    <input
                      type="text"
                      placeholder="Search for SAT books, notes, Question Banks"
                      className="ml-2 w-full outline-none bg-transparent text-[#2D3748] placeholder-[#A0AEC0] text-sm"
                    />
                  </div>

                  <div className="flex flex-row items-center gap-1 sm:gap-4">
                    <div className="shrink-0 flex justify-center">
                      <Image
                        src="/hero-left-2.png"
                        alt="OwenForge logo"
                        width={200}
                        height={200}
                        className="object-contain w-[75px] sm:w-[100px] md:w-[150px] h-auto"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-[15px] sm:text-lg md:text-3xl font-bold font-sans leading-snug">
                        <span className="text-black">Strategic SAT Preparation</span>{" "}
                        <span className="text-[#1E4A76]">for Excellence</span>
                      </h1>
                      <p className="text-[#4A5568] font-times text-[12px] sm:text-[14px] md:text-[17px] mt-1 leading-snug">
                        Comprehensive Digital SAT Guide: Strategies, Practice, and Resources to Maximize Your Score
                      </p>
                      <button className="mt-2 md:mt-4 mb-3 md:mb-8 px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-base bg-[#1E4A76] text-white rounded-lg hover:bg-[#163A5E] transition shadow-md w-fit">
                        Start SAT Prep
                      </button>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex w-full md:w-2/5 justify-center">
                  <Image
                    src="/image10.png"
                    alt="Hero"
                    width={340}
                    height={340}
                    className="object-contain w-full max-w-[340px] h-auto md:-mr-4"
                  />
                </div>
              </div>

              {/* Quick nav */}
              <div className="w-full overflow-x-auto pt-3 pb-4 mb-3">
                <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-2 justify-center md:justify-start">
                  {[
                    { id: 'understanding-sat', label: 'Understanding the SAT', icon: 'BookOpen' },
                    { id: 'topic-weight', label: 'Section Weight', icon: 'PieChart' },
                    { id: 'test-structure', label: 'Test Structure', icon: 'LayoutTemplate' },
                    { id: 'content-domains', label: 'Content Domains', icon: 'Table' },
                  ].map((item) => {
                    const IconComponent = LucideIcons[item.icon as keyof typeof LucideIcons] as React.ElementType;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-sm text-[#2D3748] text-xs md:text-sm font-medium hover:border-[#1E4A76] hover:bg-[#F0F7FF] transition-all duration-200 cursor-pointer"
                      >
                        {IconComponent && <IconComponent className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#1E4A76]" />}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mocks and Questions */}
              <section>
                <div className="w-full py-3 flex flex-col-reverse md:flex-row items-center md:items-start gap-6">
                  <div className="w-full md:w-1/2 flex flex-col items-start space-y-2">
                    <h1 className="text-2xl font-semibold text-left font-sans">
                      <span className="text-black">Digital SAT</span>{" "}
                      <span className="text-[#1E4A76]">Adaptive Practice</span>
                    </h1>
                    <h2 className="text-[#4A5568] text-left font-times text-[17px] lg:w-150">
                      Master the Digital SAT with adaptive practice questions, full-length mocks, and instant explanations.
                    </h2>
                    <div className="flex flex-col gap-3 pt-4 w-full md:w-auto font-medium">
                      <Link href="/sat/Practice-Questions#full-length-mock-test" className="w-full md:w-64 border border-[#1E4A76] bg-white text-[#1E4A76] py-2 rounded-md hover:bg-[#1E4A76] hover:text-white transition text-center block shadow-sm">
                        Full-Length SAT Mocks
                      </Link>
                      <Link href="/sat/Practice-Questions" className="w-full md:w-64 border border-[#1E4A76] bg-white text-[#1E4A76] py-2 rounded-md hover:bg-[#1E4A76] hover:text-white transition text-center block shadow-sm">
                        Topic-wise Practice
                      </Link>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-5">
                    <Image src="/LaptopMock.png" width={700} height={420} alt="Laptop" className="w-full max-w-xs md:max-w-sm lg:max-w-md object-contain drop-shadow-lg" />
                  </div>
                </div>
              </section>

              <div className="w-full flex justify-center my-5">
                <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent"></div>
              </div>

              {/* Video courses section */}
              <section>
                <div className="w-full py-4 flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-full md:w-auto flex justify-center md:justify-start">
                    <Image
                      src="/imagelap.png"
                      alt="Video lessons preview"
                      width={500}
                      height={400}
                      className="object-contain w-full max-w-sm md:max-w-md "
                    />
                  </div>
                  <div className="w-full md:flex-1 flex flex-col space-y-4">
                    <h1 className="text-2xl font-semibold font-sans md:text-right text-center text-[#1E4A76]">
                      Free Video Lessons
                    </h1>
                    <h2 className="text-[#4A5568] font-times text-[17px] md:text-right text-center">
                      Free video lessons covering SAT subjects, strategies, and practice problems to help you
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

              {/* Books Section */}
              <section className="w-full">
                <div className="w-full py-6">
                  <h1 className="text-2xl font-semibold font-sans text-[#1E4A76]">SAT Study Resources</h1>
                  <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="relative w-full h-52 md:h-64 bg-gray-50 rounded-xl">
                        <Image src="/books.png" alt="SAT Books" fill className="object-contain" />
                      </div>
                      <button className="px-4 py-2 border border-[#1E4A76] text-[#1E4A76] rounded-md hover:bg-[#1E4A76] hover:text-white transition text-sm">Download Guide</button>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="relative w-full h-52 md:h-64 bg-gray-50 rounded-xl">
                        <Image src="/question-sheet.png" alt="SAT Questions" fill className="object-contain" />
                      </div>
                      <button className="px-4 py-2 border border-[#1E4A76] text-[#1E4A76] rounded-md hover:bg-[#1E4A76] hover:text-white transition text-sm">Download Sheet</button>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="relative w-full h-52 md:h-64 bg-gray-50 rounded-xl">
                        <Image src="/notes-img.png" alt="SAT Notes" fill className="object-contain" />
                      </div>
                      <button className="px-4 py-2 border border-[#1E4A76] text-[#1E4A76] rounded-md hover:bg-[#1E4A76] hover:text-white transition text-sm">Download Notes</button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN - DASHBOARD */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-5">
                <h2 className="text-xl font-semibold text-[#1E4A76] flex items-center gap-2">
                  <LucideIcons.LayoutDashboard className="w-5 h-5" />
                  SAT Dashboard
                </h2>
                <p className="text-xs text-[#718096] mt-1">Welcome back, Explorer!</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-5">
                  <h3 className="font-semibold text-[#2D3748] mb-3">Mastery</h3>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle cx="24" cy="24" r="20" stroke="#E2E8F0" strokeWidth="4" fill="none" />
                        <circle cx="24" cy="24" r="20" stroke="#1E4A76" strokeWidth="4" fill="none" strokeDasharray="125.7" strokeDashoffset={125.7} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-[#1E4A76]">0%</span>
                      </div>
                    </div>
                    <p className="text-sm text-[#4A5568]">0 / 0 questions</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-5">
                  <h3 className="font-semibold text-[#2D3748] mb-3">SAT Score Predictor</h3>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold text-[#1E4A76]">400</p>
                      <p className="text-xs text-[#718096]">predicted total</p>
                    </div>
                    <p className="text-sm font-medium text-[#2D3748]">Target: 1550</p>
                  </div>
                  <div className="w-full bg-[#EDF2F7] h-2 rounded-full mt-3">
                    <div className="bg-[#1E4A76] h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-5">
                  <h3 className="font-semibold text-[#2D3748] mb-2">Next Mock</h3>
                  <div className="flex items-center gap-3 text-sm">
                    <LucideIcons.Calendar className="w-5 h-5 text-[#1E4A76]" />
                    <span className="text-[#4A5568]">SAT Mock #1</span>
                  </div>
                </div>

                <div className="bg-[#EBF5FF] rounded-xl p-4 border border-[#B8D1E6]">
                  <div className="flex gap-2">
                    <LucideIcons.Lightbulb className="w-5 h-5 text-[#1E4A76] flex-shrink-0" />
                    <p className="text-xs text-[#2D3748]">
                      <span className="font-semibold">SAT Tip:</span> The Digital SAT is adaptive! Your performance on the first module determines the difficulty of the second.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div className="w-full flex justify-center my-10">
            <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent"></div>
          </div>

          {/* Understanding the SAT Exam */}
          <section id="understanding-sat" className="w-full bg-gradient-to-b from-[#F7F9FC] via-white to-white mt-10 py-10 md:px-10 px-0">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col-reverse md:flex-row items-center gap-8">
                <div className="w-full md:w-2/3 text-center md:text-left">
                  <h1 className="text-2xl font-semibold font-sans leading-tight tracking-tight text-[#1E4A76] md:px-0 px-3">
                    Understanding the SAT Exam
                  </h1>
                  <p className="mt-3 text-[#4A5568] font-times text-[17px] md:text-lg max-w-3xl mx-auto md:mx-0 md:px-0 px-3">
                    SAT Overview — Format, sections, scoring, and essential strategies to guide your preparation and test-day performance.
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4 justify-center md:justify-start md:px-0 px-3">
                    <a
                      href="sat/Practice-Questions"
                      className="inline-block px-5 py-3 rounded-lg bg-[#3e6286] text-white text-sm font-semibold shadow hover:bg-[#163A5E] transition hover:shadow-lg"
                      aria-label="Get started with SAT preparation"
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
                        SAT
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-sm text-[#718096]">
                        Digital adaptive test, 2 sections + optional essay
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-8"></div>

              <div id="details" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {understandingCards.map((card, index) => {
                  const hideOnMobile = !showAllUnderstanding && index >= 3;
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
                  onClick={() => setShowAllUnderstanding(!showAllUnderstanding)}
                  className="px-5 py-2 rounded-lg bg-[#EDF2F7] text-[#2D3748] text-sm font-medium hover:bg-[#E2E8F0] transition"
                >
                  {showAllUnderstanding ? 'Show less' : 'Show more'}
                </button>
              </div>
            </div>
          </section>

          {/* Test Structure Section (Responsive) */}
          <section id="test-structure" className="w-full bg-white py-8 md:px-6 px-0">
            <div className="max-w-6xl mx-auto md:px-4 px-2">
              <div className="w-full py-4 text-center">
                <h1 className="text-2xl font-semibold font-sans text-[#1E4A76]">
                  Test Structure
                </h1>
                <h2 className="text-[#4A5568] font-times text-[17px] max-w-3xl mx-auto mt-2">
                  SAT exam format, section breakdown, and timing information to help you prepare effectively.
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
                        <tr key={idx} className="group hover:bg-[#F8FAFC] transition-colors duration-150">
                          <td className="px-6 py-3 font-medium text-[#111827]">
                            {row.section}
                            <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                              {row.module}
                            </span>
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
                      className="border border-[#E2E8F0] rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-[#1E4A76]"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-semibold text-[#111827]">{item.section}</h3>
                            <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                              {item.module}
                            </span>
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

                <p className="text-sm text-[#718096] mt-3">* Each module includes operational and pretest questions.</p>
              </div>
            </div>
          </section>

          <section id="topic-weight" className="w-full bg-gradient-to-b from-[#F7F9FC] via-white to-white py-12 md:px-5 px-0 font-sans">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col-reverse md:flex-row items-center gap-4 mb-10">
                <div className="w-full md:w-2/3 text-center md:text-left">
                  <h1 className="text-2xl font-semibold font-sans leading-tight tracking-tight text-[#1E4A76] md:px-0">
                    Topic / Section Weight
                  </h1>
                  <p className="mt-3 text-[#4A5568] font-times text-[17px] md:text-lg max-w-3xl mx-auto md:mx-0 md:px-0 px-3">
                    SAT content distribution and high-yield areas to prioritise in your preparation. Use the quick bars to scan high-weight focuses and drill down to practice.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                    <Link href="/sat/Practice-Questions" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1E4A76] text-white text-sm font-semibold shadow hover:bg-[#163A5E] transition hover:shadow-lg">
                      Explore Sections
                    </Link>
                    <a href="#content-domains" className="inline-block px-4 py-3 rounded-lg border border-[#E2E8F0] text-sm text-[#2D3748] font-medium hover:bg-[#F7F9FC] transition bg-white shadow-sm hover:shadow-md">
                      Content Domains
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-stretch">
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
                      <a href={`/sat/Practice-Questions#${s.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-medium text-[#1E4A76] hover:underline">Practice →</a>
                      <div className="text-xs text-[#A0AEC0]">{s.items.length} focus areas</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ========== CONTENT DOMAINS SECTION – NO ICONS, ADJUSTED WIDTHS ========== */}
          <section id="content-domains" className="w-full bg-gradient-to-b from-[#F7F9FC] via-white to-white py-12">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-semibold text-[#1E4A76] mb-3">
                  Content Domains and Question Distribution
                </h1>
                <p className="text-[#4A5568] font-times text-[17px] max-w-3xl mx-auto">
                  Detailed breakdown of what each SAT section tests, including specific skills and approximate question counts.
                </p>
              </div>

              {/* Reading and Writing Table – No Icons, adjusted column widths */}
              <div className="mb-12">
                <h2 className="text-xl font-semibold text-[#1E4A76] mb-4">Reading and Writing</h2>

                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg border border-[#E2E8F0] bg-white">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#1E4A76] to-[#2C5A82] text-white">
                        <th className="px-5 py-3 text-left font-semibold rounded-tl-xl w-[22%]">Content Domain</th>
                        <th className="px-5 py-3 text-left font-semibold w-[38%]">Description</th>
                        <th className="px-5 py-3 text-left font-semibold w-[30%]">Skills Tested</th>
                        <th className="px-5 py-3 text-left font-semibold rounded-tr-xl w-[10%]"># of Questions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] bg-white">
                      {readingWritingDomains.map((row, idx) => (
                        <tr
                          key={idx}
                          className={`${idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'} hover:bg-[#F0F7FF] transition-colors duration-150`}
                        >
                          <td className="px-5 py-4 font-semibold text-[#2D3748] border-r border-[#E2E8F0] align-top">
                            {row.domain}
                          </td>
                          <td className="px-5 py-4 text-[#4A5568] align-top border-r border-[#E2E8F0] text-sm leading-relaxed">
                            {row.description}
                          </td>
                          <td className="px-5 py-4 text-[#4A5568] align-top border-r border-[#E2E8F0]">
                            <div className="space-y-1">
                              {row.skills.split(';').map((skill, i) => (
                                <div key={i} className="flex items-start gap-1">
                                  <span className="text-[#1E4A76] text-xs mt-0.5">•</span>
                                  <span className="text-sm">{skill.trim()}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-5 py-4 text-[#1E4A76] font-bold whitespace-nowrap align-top">
                            <span className="inline-flex items-center rounded-full bg-[#EBF5FF] px-2.5 py-0.5 text-xs font-medium text-[#1E4A76]">
                              {row.questions}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards – No icons */}
                <div className="md:hidden space-y-4">
                  {readingWritingDomains.map((row, idx) => (
                    <article key={idx} className="border border-[#E2E8F0] rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-[#1E4A76]">
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                        <h4 className="text-base font-semibold text-[#2D3748]">{row.domain}</h4>
                        <span className="inline-flex items-center rounded-full bg-[#EBF5FF] px-2.5 py-0.5 text-xs font-medium text-[#1E4A76]">
                          {row.questions}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-[#4A5568] space-y-2">
                        <div>
                          <span className="font-medium text-[#2D3748]">Description:</span> {row.description}
                        </div>
                        <div>
                          <span className="font-medium text-[#2D3748]">Skills:</span>
                          <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
                            {row.skills.split(';').map((skill, i) => (
                              <li key={i} className="text-sm">{skill.trim()}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Mathematics Table – No Icons, adjusted column widths */}
              <div>
                <h2 className="text-xl font-semibold text-[#1E4A76] mb-4">Mathematics</h2>

                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg border border-[#E2E8F0] bg-white">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#1E4A76] to-[#2C5A82] text-white">
                        <th className="px-5 py-3 text-left font-semibold rounded-tl-xl w-[22%]">Content Domain</th>
                        <th className="px-5 py-3 text-left font-semibold w-[38%]">Description</th>
                        <th className="px-5 py-3 text-left font-semibold w-[30%]">Skills Tested</th>
                        <th className="px-5 py-3 text-left font-semibold rounded-tr-xl w-[10%]"># of Questions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] bg-white">
                      {mathDomains.map((row, idx) => (
                        <tr
                          key={idx}
                          className={`${idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'} hover:bg-[#F0F7FF] transition-colors duration-150`}
                        >
                          <td className="px-5 py-4 font-semibold text-[#2D3748] border-r border-[#E2E8F0] align-top">
                            {row.domain}
                          </td>
                          <td className="px-5 py-4 text-[#4A5568] align-top border-r border-[#E2E8F0] text-sm leading-relaxed">
                            {row.description}
                          </td>
                          <td className="px-5 py-4 text-[#4A5568] align-top border-r border-[#E2E8F0]">
                            <div className="space-y-1">
                              {row.skills.split(';').map((skill, i) => (
                                <div key={i} className="flex items-start gap-1">
                                  <span className="text-[#1E4A76] text-xs mt-0.5">•</span>
                                  <span className="text-sm">{skill.trim()}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-5 py-4 text-[#1E4A76] font-bold whitespace-nowrap align-top">
                            <span className="inline-flex items-center rounded-full bg-[#EBF5FF] px-2.5 py-0.5 text-xs font-medium text-[#1E4A76]">
                              {row.questions}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards – No icons */}
                <div className="md:hidden space-y-4">
                  {mathDomains.map((row, idx) => (
                    <article key={idx} className="border border-[#E2E8F0] rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-[#1E4A76]">
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                        <h4 className="text-base font-semibold text-[#2D3748]">{row.domain}</h4>
                        <span className="inline-flex items-center rounded-full bg-[#EBF5FF] px-2.5 py-0.5 text-xs font-medium text-[#1E4A76]">
                          {row.questions}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-[#4A5568] space-y-2">
                        <div>
                          <span className="font-medium text-[#2D3748]">Description:</span> {row.description}
                        </div>
                        <div>
                          <span className="font-medium text-[#2D3748]">Skills:</span>
                          <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
                            {row.skills.split(';').map((skill, i) => (
                              <li key={i} className="text-sm">{skill.trim()}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}