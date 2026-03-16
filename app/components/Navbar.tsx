'use client';

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className=" max-w-7xl mx-auto w-full    py-4 flex items-center justify-between sticky top-0 z-50 ">
      {/* Logo */}
      <a href="#" className="flex items-center gap-2 shrink-0">
        {/* W icon */}
        <svg
          width="36"
          height="28"
          viewBox="0 0 36 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L6 28L12 10L18 28L24 10L30 28L36 0H30L26 16L22 0H14L10 16L6 0H0Z"
            fill="#22C55E"
          />
        </svg>
        <span className="text-gray-900 font-semibold text-lg tracking-tight">
          webermelon
        </span>
      </a>

      {/* Desktop Nav Menu */}
      <nav className="hidden md:flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1.5">
        {["Home", "About", "Services", "Portfolio", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              item === "Home"
                ? "bg-gray-800 text-white shadow"
                : "text-gray-600 hover:text-gray-900 hover:bg-white"
            }`}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* CTA Button */}
      <div className="hidden md:flex items-center">
        <a
          href="#contact"
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200"
        >
          <span className="text-green-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79a15.09 15.09 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z" />
            </svg>
          </span>
          Lets Talk
        </a>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 flex flex-col items-start gap-1 px-6 py-4 md:hidden">
          {["Home", "About", "Services", "Portfolio", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium ${
                item === "Home"
                  ? "bg-gray-800 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-3 flex items-center gap-2 bg-gray-800 text-white text-sm font-medium px-5 py-2.5 rounded-full"
          >
            <span className="text-green-400">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6.62 10.79a15.09 15.09 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z" />
              </svg>
            </span>
            Lets Talk
          </a>
        </div>
      )}
    </header>
  );
}
