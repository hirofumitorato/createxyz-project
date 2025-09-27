"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "ABOUT", href: "#about" },
    { label: "WORKS", href: "#works" },
    { label: "ACTIVITY", href: "#activity" },
    { label: "CONTACT", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0d0d0d] to-[#1a1a1a] border-b border-[#00ffff]/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="relative">
            <h1 
              className="text-[28px] font-bold text-white tracking-wider"
              style={{ fontFamily: "Orbitron, monospace" }}
            >
              TORATO LAB
            </h1>
            <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#00ffff] to-[#a855f7] opacity-60"></div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className="relative text-white text-[14px] font-medium tracking-wider hover:text-[#00ffff] transition-all duration-300 group"
                style={{ fontFamily: "Noto Sans JP, sans-serif" }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00ffff] group-hover:w-full transition-all duration-300 shadow-[0_0_8px_#00ffff]"></span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#00ffff] transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-[#00ffff]/20">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className="text-white text-[14px] font-medium tracking-wider hover:text-[#00ffff] transition-colors text-left"
                  style={{ fontFamily: "Noto Sans JP, sans-serif" }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}