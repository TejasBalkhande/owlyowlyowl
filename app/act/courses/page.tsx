"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { MenuItem } from "@/types/menu";
import { courses, Course } from "./coursesData";

const schoolMenu: MenuItem[] = [
  { label: "Mock-Test", href: "/act/Practice-Questions#full-length-mock-test" },
  { label: "Study-Resources", href: "/act" },
  { label: "Practice-Questions", href: "/act/Practice-Questions" },
  { label: "Courses", href: "/act/courses" },
  { label: "Roadmap", href: "/act" },
  { label: "Account", href: "/act" },
];

// Brand‑aligned category colours (deeper, more sophisticated tones)
const categoryColorMap: Record<string, string> = {
  Math: "#1f324c",     // deep navy
  English: "#2e5634",  // forest green
  Reading: "#92162d",  // rich burgundy
  Science: "#1e1e1e",  // almost black (softened)
  Writing: "#1f324c",  // reuse navy
  Grammar: "#2e5634",  // reuse green
};

function getCategoryColor(category: string): string {
  return categoryColorMap[category] || "#6b7280"; // gray-500 fallback
}

// Map category to local image path
function getCategoryImageSrc(category: string): string {
  const map: Record<string, string> = {
    Math: "/1-act/thum/act-math.png",
    English: "/1-act/thum/act-eng.png",
    Reading: "/1-act/thum/act-reading.png",
    Science: "/1-act/thum/act-science.png",
  };
  return map[category] || "/1-act/thum/act-eng.png"; // fallback to English image
}

export default function CoursesPage() {
  return (
    <div className="bg-[#fafafa] min-h-screen">
      <Navbar items={schoolMenu} logo="OwlenForge" />
      <main className="courses-content container max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* Header with refined typography */}
        <header className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-semibold font-sans leading-tight tracking-tight text-gray-900 md:px-0 px-3">
            ACT Courses
          </h1>
          <p className="text-gray-600 font-times text-lg md:text-xl max-w-3xl mx-auto sm:mx-0 mt-2 leading-relaxed">
            Choose a subject and start mastering the ACT with our expert video lessons all completely free.
          </p>
        </header>

        {/* Courses Grid – slightly larger gap for better breathing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 auto-rows-fr">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>

        {/* Footer Info – clean, minimal */}
        <footer className="mt-20 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500 font-medium tracking-wide">
            📚 New courses added regularly • All videos are free • Downloadable resources coming soon
          </p>
        </footer>
      </main>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const [imgError, setImgError] = useState(false);
  const thumbnailSrc = getCategoryImageSrc(course.category);
  const badgeColor = getCategoryColor(course.category);

  return (
    <article className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden flex flex-col h-full">
      {/* Thumbnail container with subtle overlay */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        {!imgError ? (
          <Image
            src={thumbnailSrc}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Soft gradient overlay for better badge readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content area – more generous padding */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-sans font-semibold text-lg text-gray-900 line-clamp-2 mb-1">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
          {course.description}
        </p>

        {/* Full‑width call‑to‑action – now with a subtle hover effect */}
        <Link
          href={`/act/courses/${course.slug}`}
          className="w-full inline-flex items-center justify-center gap-2 text-white font-medium py-2 px-4 mb-1 rounded-lg transition-all hover:brightness-110 hover:shadow-md font-sans text-sm"
          style={{ backgroundColor: badgeColor }}
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Start Learning
        </Link>

        {/* Stats row – refined icons and spacing */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {course.videoCount} videos
          </span>
        </div>

        
      </div>
    </article>
  );
}