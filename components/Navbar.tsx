"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Syne, Inter } from "next/font/google";
import { MenuItem } from "@/types/menu";

// Font configuration
const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-syne",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

type NavbarProps = {
  items: MenuItem[];
  logo?: string;
};

export default function Navbar({ items, logo = "Logo" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Update navbar height whenever its size changes (menu open/close, resize)
  useEffect(() => {
    if (!navbarRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setNavbarHeight(entry.contentRect.height);
      }
    });
    observer.observe(navbarRef.current);
    return () => observer.disconnect();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (index: number) =>
    setOpenDropdown(openDropdown === index ? null : index);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <>
      {/* Spacer that matches navbar height – prevents content from hiding behind fixed navbar */}
      <div style={{ height: navbarHeight }} />

      {/* Fixed navbar container */}
      <div
        ref={navbarRef}
        className={`${syne.variable} ${inter.variable} fixed top-0 left-0 w-full z-50`}
      >
        {/* Accent gradient bar */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#5fb3f7] via-30% to-[#a78bfa] to-70% to-transparent" />

        {/* Navigation bar */}
        <nav className="bg-[#0f2440] border-b border-white/10 shadow-[0_2px_32px_rgba(0,0,0,0.35)]">
          <div className="max-w-[1360px] mx-auto px-5 h-[60px] flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 no-underline"
              onClick={handleLinkClick}
            >
              <div className="w-[45px] h-[45px] rounded-[10px] bg-white border border-white/20 flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo-c.png"
                  alt="logo"
                  width={43}
                  height={43}
                  priority
                />
              </div>
              <div>
                <span
                  className={`${syne.className} font-bold text-[1.2rem] text-white tracking-[0.02em]`}
                >
                  {logo}
                </span>
                <span
                  className={`${syne.className} block text-[0.6rem] font-semibold tracking-[0.12em] text-[#5fb3f7] uppercase -mt-1`}
                >
                  ACT Prep
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="max-[919px]:hidden min-[920px]:flex items-center gap-0.5">
              {items.map((item, idx) => {
                const isCTA = item.label === "My Account";
                return (
                  <div key={idx} className="relative group">
                    {item.children ? (
                      <>
                        <button
                          className={`${inter.className} text-[0.84rem] font-medium text-white/65 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors duration-200 hover:text-white hover:bg-white/10 group-hover:text-white group-hover:bg-white/10`}
                        >
                          {item.label}
                          <svg
                            className="w-3 h-3 stroke-current fill-none opacity-70 transition-transform duration-200 group-hover:rotate-180 group-hover:opacity-100"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        <div
                          className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1 opacity-0 invisible transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto min-w-[210px] bg-[#0f2440] border border-[#5fb3f7]/20 rounded-lg p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)]"
                        >
                          {item.children.map((child, ci) => (
                            <Link
                              key={ci}
                              href={child.href || "#"}
                              className={`${inter.className} flex items-center gap-2 px-3 py-2 rounded-md text-[0.83rem] font-normal text-white/65 transition-colors duration-150 hover:bg-[#5fb3f7]/10 hover:text-white before:content-[''] before:w-1 before:h-1 before:rounded-full before:bg-[#5fb3f7]/40 before:transition-colors hover:before:bg-[#5fb3f7]`}
                              onClick={handleLinkClick}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : isCTA ? (
                      <Link
                        href={item.href || "#"}
                        onClick={handleLinkClick}
                        className="ml-2"
                      >
                        <button
                          className={`${syne.className} text-[0.8rem] font-semibold tracking-[0.04em] uppercase text-[#0f2440] bg-[#5fb3f7] border-none rounded-md px-[18px] py-2 cursor-pointer transition-all duration-200 hover:bg-[#7dc4ff] hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(95,179,247,0.4)]`}
                        >
                          {item.label}
                        </button>
                      </Link>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className={`${inter.className} text-[0.84rem] font-medium text-white/65 px-3 py-1.5 rounded-md transition-colors duration-200 hover:text-white hover:bg-white/10`}
                        onClick={handleLinkClick}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Hamburger Button */}
            <button
              className="flex max-[919px]:flex min-[920px]:hidden items-center justify-center bg-white/10 border border-white/15 rounded-lg p-1.5 text-white/80 transition-colors duration-200 hover:bg-white/20 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="bg-[#0a1c35] border-t border-white/5 px-4 py-3 pb-6 max-[919px]:block min-[920px]:hidden"
            >
              {items.map((item, idx) => (
                <div key={idx}>
                  {item.children ? (
                    <>
                      <button
                        className={`${inter.className} flex justify-between items-center w-full text-left text-[0.9rem] font-medium text-white/70 px-2.5 py-2.5 rounded-lg transition-colors duration-150 hover:bg-white/5 hover:text-white`}
                        onClick={() => toggleDropdown(idx)}
                      >
                        {item.label}
                        <svg
                          width="14"
                          height="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                          className={`transition-transform duration-200 opacity-50 ${
                            openDropdown === idx ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {openDropdown === idx && (
                        <div className="pl-3.5 mt-1 border-l border-[#5fb3f7]/30 ml-2.5">
                          {item.children.map((child, ci) => (
                            <Link
                              key={ci}
                              href={child.href || "#"}
                              className={`${inter.className} block text-[0.84rem] text-white/50 px-2.5 py-2 rounded-md transition-colors duration-150 hover:text-[#5fb3f7] hover:bg-[#5fb3f7]/10`}
                              onClick={handleLinkClick}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      className={`${inter.className} block text-[0.9rem] font-medium text-white/70 px-2.5 py-2.5 rounded-lg transition-colors duration-150 hover:bg-white/5 hover:text-white`}
                      onClick={handleLinkClick}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </nav>
      </div>
    </>
  );
}