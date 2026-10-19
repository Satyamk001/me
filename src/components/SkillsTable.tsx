"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  SKILLS_LIST,
  SKILL_FAMILIES,
  SkillElement,
} from "../data/portfolioData";
import TechIcon from "./TechIcon";

/** Mirrors the reference grid: 4 / 6 / 8 columns with the same breakpoints. */
function useGridColumns() {
  const [columns, setColumns] = useState(8);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setColumns(width <= 640 ? 4 : width <= 1100 ? 6 : 8);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return columns;
}

export default function SkillsTable() {
  const [selectedFamily, setSelectedFamily] = useState<string>("All");
  const [activeSkill, setActiveSkill] = useState<SkillElement>(SKILLS_LIST[0]);
  const columns = useGridColumns();
  const gridRef = useRef<HTMLUListElement | null>(null);
  const [gridInView, setGridInView] = useState(false);

  // Reveal the grid once, with the same diagonal stagger as the reference.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const reducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      requestAnimationFrame(() => setGridInView(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setGridInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="sec" aria-labelledby="skills-title">
      <div className="wrap">
        {/* Top Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8 rv">
          <div>
            <p className="tag">
              <b>02</b> — Skills
            </p>
            <h2 className="h2" id="skills-title">
              The periodic table
              <br />
              of my <span className="it">stack.</span>
            </h2>
          </div>
          <p className="lede max-w-[420px] text-[#6f6b64]">
            {SKILLS_LIST.length} elements from the résumé across {SKILL_FAMILIES.length - 1} domains. Hover, focus or tap any tile to inspect its properties and project applications.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div
          className="flex flex-wrap gap-2 my-8"
          role="group"
          aria-label="Filter skills by family"
        >
          {SKILL_FAMILIES.map((family) => {
            const count =
              family === "All"
                ? SKILLS_LIST.length
                : SKILLS_LIST.filter((s) => s.family === family).length;
            const isSelected = selectedFamily === family;

            return (
              <button
                key={family}
                type="button"
                onClick={() => setSelectedFamily(family)}
                aria-pressed={isSelected}
                className={`h-10 px-4 rounded-full text-[13px] font-medium inline-flex items-center gap-2 transition-colors duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-[#0d0d0d] text-white shadow-sm"
                    : "bg-white text-[#3a3a3a] shadow-[0_0_0_1px_rgba(13,13,13,0.12)] hover:shadow-[0_0_0_1px_#0d0d0d] hover:text-[#0d0d0d]"
                }`}
              >
                <span>{family}</span>
                <small className="font-mono text-[10.5px] opacity-60">
                  {count}
                </small>
              </button>
            );
          })}
        </div>

        {/* Interactive Periodic Grid + Sticky Inspector */}
        <div className="grid grid-cols-1 min-[901px]:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
          {/* Periodic Elements Grid */}
          <ul
            ref={gridRef}
            className={`skills-grid grid grid-cols-4 min-[640px]:grid-cols-6 min-[1100px]:grid-cols-8 gap-2 list-none p-0 m-0 ${
              gridInView ? "skills-grid-in" : ""
            }`}
            aria-label="Skills Grid"
          >
            {SKILLS_LIST.map((skill, index) => {
              const isDimmed =
                selectedFamily !== "All" && skill.family !== selectedFamily;
              const isSelected = activeSkill.num === skill.num;
              const delay =
                (Math.floor(index / columns) + (index % columns)) * 40;

              return (
                <li
                  key={skill.num}
                  className="skill-cell"
                  style={{ "--d": `${delay}ms` } as React.CSSProperties}
                >
                  <button
                    type="button"
                    onClick={() => setActiveSkill(skill)}
                    onMouseEnter={() => setActiveSkill(skill)}
                    onFocus={() => setActiveSkill(skill)}
                    aria-label={`${skill.name} — ${skill.family}${
                      skill.isRecent ? ", recently used" : ""
                    }`}
                    aria-pressed={isSelected}
                    aria-controls="skill-inspector"
                    className={`relative w-full aspect-[1/1.08] rounded-xl p-2.5 text-left flex flex-col justify-between transition-all duration-300 cursor-pointer select-none ${
                      isSelected
                        ? "bg-[#0d0d0d] text-white shadow-lg -translate-y-1 z-10"
                        : "bg-white text-[#0d0d0d] shadow-[0_0_0_1px_rgba(13,13,13,0.08)] hover:-translate-y-0.5 hover:shadow-md"
                    } ${
                      isDimmed
                        ? "opacity-[0.22] grayscale"
                        : "opacity-100"
                    }`}
                  >
                    {/* Top Row: Index and recent dot */}
                    <div
                      className="flex justify-between items-center w-full font-mono text-[9px] text-[#6f6b64]"
                      aria-hidden="true"
                    >
                      <span className={isSelected ? "text-white/60" : ""}>
                        {skill.num}
                      </span>
                      {skill.isRecent && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? "bg-accent-lit" : "bg-accent"
                          }`}
                          title="Recently used in production"
                        />
                      )}
                    </div>

                    {/* Chemical Symbol & Tech Icon */}
                    <div
                      className="flex items-center justify-between w-full my-auto"
                      aria-hidden="true"
                    >
                      <div
                        className={`font-bold text-[clamp(17px,1.8vw,23px)] tracking-tight leading-none ${
                          isSelected ? "text-white" : "text-[#0d0d0d]"
                        }`}
                      >
                        {skill.sym}
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md grid place-items-center transition-colors ${
                          isSelected ? "bg-white/15" : "bg-black/[0.04]"
                        }`}
                        title={`${skill.name} icon`}
                      >
                        <TechIcon
                          name={skill.name}
                          size={14}
                          className={`w-3.5 h-3.5 ${
                            isSelected ? "brightness-0 invert" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* Element Name */}
                    <div
                      className="text-[10px] font-semibold leading-tight line-clamp-2 min-h-[2.2em]"
                      aria-hidden="true"
                    >
                      {skill.name}
                    </div>

                    {/* Category Acronym */}
                    <div
                      className={`hidden min-[640px]:block font-mono text-[8px] uppercase tracking-wider truncate ${
                        isSelected ? "text-white/50" : "text-[#6f6b64]"
                      }`}
                      aria-hidden="true"
                    >
                      {skill.family.split(" ")[0]}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Sticky Inspector Panel */}
          <aside
            id="skill-inspector"
            className="min-[901px]:sticky min-[901px]:top-24 rounded-3xl bg-white p-6 shadow-[0_0_0_1px_rgba(13,13,13,0.08),0_24px_60px_-20px_rgba(13,13,13,0.14)] flex flex-col justify-between min-h-[460px]"
            aria-label="Skill inspector"
            aria-live="polite"
          >
            <div>
              {/* Header: Element Number & Symbol */}
              <div className="flex justify-between font-mono text-xs uppercase tracking-wider text-[#6f6b64]">
                <span>Element No. {activeSkill.num}</span>
                <span className="font-bold text-[#0d0d0d]">{activeSkill.sym}</span>
              </div>

              {/* Glowing Aura Emblem with Tech Icon */}
              <div className="relative h-44 my-4 grid place-items-center">
                <div
                  className="absolute w-40 h-40 rounded-full blur-xl transition-all duration-500 bg-accent-soft"
                  aria-hidden="true"
                />
                <div
                  key={activeSkill.name}
                  className="skill-pop relative z-10 flex flex-col items-center justify-center w-32 h-32 rounded-2xl bg-[#f4f2ee] shadow-[0_0_0_1px_rgba(13,13,13,0.08)] p-3"
                >
                  <TechIcon
                    name={activeSkill.name}
                    size={52}
                    className="w-[52px] h-[52px] mb-2 drop-shadow-sm"
                  />
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#6f6b64]">
                    <span className="font-bold text-[#0d0d0d]">{activeSkill.sym}</span>
                    <span>·</span>
                    <span>No. {activeSkill.num}</span>
                  </div>
                </div>
              </div>

              {/* Title & Domain */}
              <h3 className="text-2xl font-bold tracking-tight text-[#0d0d0d]">
                {activeSkill.name}
              </h3>
              <p className="text-xs font-mono uppercase tracking-wider text-[#6f6b64] mt-1">
                {activeSkill.family}
                {activeSkill.isRecent && (
                  <span className="text-accent"> · recently used</span>
                )}
              </p>

              {/* Detailed Description / Sub-Features */}
              <p className="text-sm text-[#3a3a3a] mt-3 leading-relaxed">
                {activeSkill.note}
              </p>
            </div>

            {/* Used In Projects */}
            <div className="pt-6 border-t border-[rgba(13,13,13,0.08)] mt-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#6f6b64] mb-2">
                Applied in projects
              </p>
              {activeSkill.usedIn.length > 0 ? (
                <ul className="list-none p-0 m-0 flex flex-wrap gap-1.5">
                  {activeSkill.usedIn.map((item) => (
                    <li
                      key={item}
                      className="chip text-[11.5px] px-2.5 py-1 bg-[#f4f2ee] shadow-[0_0_0_1px_rgba(13,13,13,0.08)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-xs text-[#6f6b64]">
                  Not tied to a featured project
                </span>
              )}
            </div>
          </aside>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#6f6b64] mt-8 pt-4 border-t border-[rgba(13,13,13,0.08)]">
          <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
          <span>
            {SKILLS_LIST.filter((skill) => skill.isRecent).length} of{" "}
            {SKILLS_LIST.length} elements are in active production use today.
          </span>
        </div>
      </div>
    </section>
  );
}
