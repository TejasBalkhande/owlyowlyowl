"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import Navbar from "@/components/Navbar";
import { MenuItem } from "@/types/menu";
import { Course, Video } from "../coursesData";

const schoolMenu: MenuItem[] = [
  { label: "Mock-Test", href: "/act/Practice-Questions#full-length-mock-test" },
  { label: "Study-Resources", href: "/act" },
  { label: "Practice-Questions", href: "/act/Practice-Questions" },
  { label: "Courses", href: "/act/courses" },
  { label: "Roadmap", href: "/act" },
  { label: "Account", href: "/act" },
];

const categoryColorMap: Record<string, string> = {
  Math: "#1f324c",
  English: "#2e5634",
  Reading: "#92162d",
  Science: "#1e1e1e",
  Writing: "#1f324c",
  Grammar: "#2e5634",
};

function getCategoryColor(category: string): string {
  return categoryColorMap[category] || "#6b7280";
}

// Map course categories to local thumbnail images
const categoryThumbnailMap: Record<string, string> = {
  Math: "/1-act/thum/act-math.png",
  English: "/1-act/thum/act-eng.png",
  Reading: "/1-act/thum/act-reading.png",
  Science: "/1-act/thum/act-science.png",
};

function getThumbnailForCategory(category: string): string {
  // Fallback to English thumbnail if category not found (safe default)
  return categoryThumbnailMap[category] || "/1-act/thum/act-eng.png";
}

export default function CourseDetailClient({ course }: { course: Course }) {
  const [currentVideo, setCurrentVideo] = useState<Video>(course.videos[0]);
  const categoryColor = getCategoryColor(course.category);

  const currentIndex = course.videos.findIndex(
    (v) => v.publicId === currentVideo.publicId
  );
  const nextVideo = course.videos[currentIndex + 1];

  // Auto-scroll to top when video changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentVideo]);

  // Get the appropriate static thumbnail for this course
  const thumbnailSrc = getThumbnailForCategory(course.category);

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans antialiased text-slate-900">
      <Navbar items={schoolMenu} logo="OwlenForge" />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-3">
          
          {/* Main Content: Player & Details */}
          <div className="flex-1 min-w-0">
            {/* Video Player Container */}
            <div className="relative group rounded-2xl overflow-hidden bg-black shadow-xl ring-1 ring-white/10">
              <div className="aspect-video w-full">
                <CldVideoPlayer
                  key={currentVideo.publicId}
                  width="1920"
                  height="1080"
                  src={currentVideo.publicId}
                  colors={{ accent: categoryColor, base: "#000000", text: "#ffffff" }}
                  fontFace="Inter, sans-serif"
                  preload="auto"
                  controls
                  className="rounded-2xl"
                />
              </div>
            </div>

            {/* Content Metadata */}
            <div className="mt-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1 font-sans">{currentVideo.title}</h2>
                  <p className="text-slate-500 flex items-center gap-2 text-sm">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {currentVideo.duration}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span>Lesson {currentIndex + 1} of {course.videoCount}</span>
                  </p>
                </div>
                
                {nextVideo && (
                  <button 
                    onClick={() => setCurrentVideo(nextVideo)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                  >
                    Next Lesson
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </button>
                )}
              </div>

              <div className="py-8 prose prose-slate max-w-none">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">About this lesson</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {currentVideo.description || "In this lesson, we'll dive deep into the core concepts of this module. Follow along with the video and take notes on the key strategies discussed."}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar: Course Playlist */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="sticky top-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-4rem)]">
              <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900 text-lg">Course Content</h3>
                  <span className="text-xs font-bold text-slate-400 bg-slate-200/50 px-2 py-1 rounded">
                    {course.videoCount} VIDEOS
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-4">
                  <div 
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{ 
                      width: `${((currentIndex + 1) / course.videoCount) * 100}%`,
                      backgroundColor: categoryColor 
                    }}
                  />
                </div>
              </div>

              <div className="overflow-y-auto p-3 space-y-2 custom-scrollbar">
                {course.videos.map((video, idx) => {
                  const isActive = currentVideo.publicId === video.publicId;
                  const isCompleted = idx < currentIndex;
                  
                  return (
                    <button
                      key={video.publicId}
                      onClick={() => setCurrentVideo(video)}
                      className={`w-full group relative flex items-start gap-4 p-3 rounded-xl transition-all border ${
                        isActive 
                        ? "bg-slate-50 border-slate-200 shadow-sm" 
                        : "bg-transparent border-transparent hover:bg-slate-50/80"
                      }`}
                    >
                      {/* Video Status/Thumbnail - using static image instead of Cloudinary poster */}
                      {/* Thumbnail size increased to w-28, dark overlay removed */}
                      <div className="relative flex-shrink-0 w-28 aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                        <Image
                          src={thumbnailSrc}
                          alt=""
                          fill
                          className={`object-cover transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                          sizes="112px"
                        />
                        {/* Overlay - dark background removed, only icon remains */}
                        <div className="absolute inset-0 flex items-center justify-center transition-colors">
                          {isActive ? (
                            <div className="flex gap-1 items-end h-3">
                              <span className="w-1 bg-white animate-[bounce_1s_infinite_0ms]" style={{height: '60%'}}></span>
                              <span className="w-1 bg-white animate-[bounce_1s_infinite_200ms]" style={{height: '100%'}}></span>
                              <span className="w-1 bg-white animate-[bounce_1s_infinite_400ms]" style={{height: '80%'}}></span>
                            </div>
                          ) : (
                            <svg className="w-6 h-6 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.841z" /></svg>
                          )}
                        </div>
                      </div>

                      {/* Text Info */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-left  gap-2 mb-1">
                          <span className={`text-[10px] font-semibold uppercase tracking-wider ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                            Lesson {idx + 1}
                          </span>
                          {isCompleted && (
                            <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                          )}
                        </div>
                        <p className={`text-left text-sm font-semibold leading-snug line-clamp-2 ${isActive ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"}`}>
                          {video.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-1.5 font-medium flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {video.duration}
                        </p>
                      </div>

                      {/* Active Pill Indicator */}
                      {isActive && (
                        <div 
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 rounded-r-full" 
                          style={{ backgroundColor: categoryColor }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}