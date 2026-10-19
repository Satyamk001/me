"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { PERSONAL_INFO } from "../data/portfolioData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  const pillRef = useRef<HTMLDivElement>(null);
  const indRef = useRef<HTMLSpanElement>(null);

  const navLinks = [
    { id: "about", label: "About", num: "01" },
    { id: "skills", label: "Skills", num: "02" },
    { id: "work", label: "Work", num: "03" },
    { id: "experience", label: "Experience", num: "04" },
    { id: "achievements", label: "Achievements", num: "05" },
    { id: "contact", label: "Contact", num: "06" },
  ];

  // Update sliding pill indicator position
  const updateIndicator = useCallback(() => {
    const ind = indRef.current;
    const pill = pillRef.current;
    if (!ind || !pill) return;

    const activeEl = pill.querySelector<HTMLAnchorElement>(`a[data-id="${activeSection}"]`);
    if (!activeEl) {
      ind.style.opacity = "0";
      return;
    }

    ind.style.opacity = "1";
    ind.style.width = `${activeEl.offsetWidth}px`;
    ind.style.transform = `translateX(${activeEl.offsetLeft}px)`;
  }, [activeSection]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? currentScroll / totalScroll : 0);
      setScrolled(currentScroll > 40);

      const sections = ["about", "skills", "work", "experience", "achievements", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>

      <nav
        className={`fixed inset-x-0 top-0 z-50 pointer-events-none transition-all duration-500 ${
          scrolled ? "is-scrolled" : ""
        }`}
        aria-label="Primary"
      >
        {/* Top Scroll Progress Bar */}
        <div
          className="absolute left-0 top-0 h-[2.5px] bg-[#0d0d0d] origin-left transition-transform duration-100 ease-out will-change-transform z-10"
          style={{ width: "100%", transform: `scaleX(${scrollProgress})` }}
          aria-hidden="true"
        />

        {/* Soft blur backdrop on scroll */}
        <div
          className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#f4f2ee]/95 to-transparent transition-opacity duration-500 pointer-events-none ${
            scrolled ? "opacity-100 backdrop-blur-md" : "opacity-0"
          }`}
          aria-hidden="true"
        />

        <div className="relative flex items-center justify-between gap-4 px-[var(--gutter)] pt-4 pb-2">
          {/* Brand mark */}
          <a
            href="#hero"
            className="group flex items-center gap-3 rounded-full pointer-events-auto"
            aria-label="Satyam Kumar — back to top"
          >
            <span
              className={`grid place-items-center w-11 h-11 rounded-full text-[13px] font-bold tracking-tight shadow-[inset_0_0_0_1.5px_#0d0d0d] transition-all duration-500 group-hover:rotate-[360deg] ${
                scrolled ? "bg-[#0d0d0d] text-white" : "bg-[#f4f2ee]/70 text-[#0d0d0d]"
              }`}
            >
              SK
            </span>
            <span
              className={`font-semibold tracking-tight text-[15px] transition-all duration-500 whitespace-nowrap ${
                scrolled ? "opacity-0 -translate-x-2 pointer-events-none" : "opacity-100 translate-x-0"
              }`}
            >
              {PERSONAL_INFO.name}
            </span>
          </a>

          {/* Desktop Floating Pill Menu with Sliding Indicator */}
          <div
            ref={pillRef}
            className={`hidden md:flex relative items-center p-1 rounded-full pointer-events-auto transition-all duration-500 ${
              scrolled
                ? "bg-white/80 shadow-[0_0_0_1px_rgba(13,13,13,0.08),0_10px_30px_-18px_rgba(13,13,13,0.35)] backdrop-blur-md"
                : "bg-white/40 shadow-[0_0_0_1px_rgba(13,13,13,0.06)] hover:bg-white/70"
            }`}
          >
            {/* Sliding Background Indicator Pill */}
            <span
              ref={indRef}
              className="absolute top-1 left-0 h-[calc(100%-8px)] rounded-full bg-[#0d0d0d] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none z-0"
              aria-hidden="true"
            />

            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  data-id={link.id}
                  className={`relative z-10 px-4 py-2 rounded-full text-[13.5px] font-medium transition-colors duration-400 select-none ${
                    isActive ? "text-white" : "text-[#3a3a3a] hover:text-[#0d0d0d]"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden pointer-events-auto flex items-center gap-2.5 h-11 px-5 rounded-full text-sm font-semibold bg-white/80 shadow-[0_0_0_1px_rgba(13,13,13,0.1)] backdrop-blur-md text-[#0d0d0d]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-overlay"
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            <span className="flex flex-col gap-1 w-3.5" aria-hidden="true">
              <span
                className={`block h-[1.5px] bg-current transition-transform duration-300 ${
                  menuOpen ? "translate-y-[2.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] bg-current transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[2.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed inset-0 z-40 bg-[#f4f2ee] flex flex-col justify-between px-[var(--gutter)] pt-28 pb-10 overflow-y-auto transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen
            ? "opacity-100 pointer-events-auto visible"
            : "opacity-0 pointer-events-none invisible"
        }`}
      >
        <ol className="list-none m-0 p-0 grid gap-2">
          {navLinks.map((link, idx) => (
            <li key={link.id} className="overflow-hidden">
              <a
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className={`flex items-baseline gap-4 text-[clamp(36px,10vw,64px)] font-bold tracking-tight leading-tight transition-transform duration-500 hover:translate-x-2 ${
                  menuOpen ? "translate-y-0" : "translate-y-full"
                }`}
                style={{ transitionDelay: `${0.1 + idx * 0.05}s` }}
              >
                <small className="font-mono text-xs font-normal text-[#8a8781]">
                  {link.num}
                </small>
                {link.label}
              </a>
            </li>
          ))}
        </ol>

        <div className="pt-10 border-t border-[rgba(13,13,13,0.1)] flex flex-wrap gap-4 text-sm text-[#8a8781]">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-[#0d0d0d] font-mono text-xs"
          >
            {PERSONAL_INFO.email}
          </a>
          <span>·</span>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0d0d0d]"
          >
            GitHub ↗
          </a>
          <span>·</span>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0d0d0d]"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </>
  );
}
