"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Plan", href: "#plan" },
  { label: "Faq", href: "#faq" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0f0d]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.png"
            alt="Infinity Digital Trade"
            width={48}
            height={48}
            className="rounded-md"
          />
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#b4f12c] group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          href="/register"
          className="hidden md:inline-flex items-center px-6 py-4 rounded-lg bg-[#7b6ef6] text-white text-sm font-semibold hover:bg-[#6a5de6] transition-all duration-300">
          Get Started
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu">
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-[#0a0f0d]/95 backdrop-blur-lg ${mobileOpen ? "max-h-96 pb-6" : "max-h-0"}`}>
        <ul className="flex flex-col items-center gap-4 pt-4">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/register"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#7b6ef6] text-white text-sm font-semibold hover:bg-[#6a5de6] transition-all duration-300">
              Get Started
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
