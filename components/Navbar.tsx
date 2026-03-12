"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MenuItem } from "@/types/menu";
import Image from "next/image";

type NavbarProps = {
  items: MenuItem[];              // menu items for this page
  logo?: string;                  // optional logo text / image
};

export default function Navbar({ items, logo = "Logo" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null); // for mobile submenus
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle submenu on mobile
  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // Close everything after navigation
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-2 sm:px-4">
      {/* Main header row */}
      <div className="flex justify-between items-center h-16">
        {/* Logo – flush left with small padding from nav */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-medium text-black font-times"
        >
          <Image
            src="/logo1.png"
            alt="logo"
            width={55}
            height={55}
            priority
          />
          <span>{logo}</span>
        </Link>

        {/* Desktop Menu – visible from 920px and up */}
        <div className="hidden min-[920px]:flex space-x-6">
          {items.map((item, idx) => (
            <div key={idx} className="relative group">
              {item.children ? (
                <>
                  <button className="text-gray-700 hover:text-blue-600 text-sm py-2 inline-flex items-center">
                    {item.label}
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {/* Dropdown - visible on hover */}
                  <div className="absolute left-0 mt-2 w-70 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    {item.children.map((child, childIdx) => (
                      <Link
                        key={childIdx}
                        href={child.href || "#"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLinkClick}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href || "#"}
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 inline-block"
                  onClick={handleLinkClick}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Hamburger – hidden from 920px and up */}
        <button
          className="min-[920px]:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu – visible only below 920px when open */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="min-[910px]:hidden py-4 border-t bg-white"
        >
          {items.map((item, idx) => (
            <div key={idx} className="px-2 py-1">
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleDropdown(idx)}
                    className="flex justify-between items-center w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2"
                  >
                    {item.label}
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === idx ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {/* Submenu for mobile */}
                  <div
                    className={`pl-4 mt-1 space-y-1 ${
                      openDropdown === idx ? "block" : "hidden"
                    }`}
                  >
                    {item.children.map((child, childIdx) => (
                      <Link
                        key={childIdx}
                        href={child.href || "#"}
                        className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                        onClick={handleLinkClick}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href || "#"}
                  className="block text-gray-700 hover:text-blue-600 font-medium py-2"
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
  );
}