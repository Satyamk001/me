"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  SKILLS_LIST,
  SKILL_FAMILIES,
  SkillElement,
} from "../data/portfolioData";
import TechIcon from "./TechIcon";

/** Mirrors reference grid: 4 / 6 / 8 columns with the same breakpoints. */
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

  // Reveal the grid once with reference diagonal stagger
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
        <div className="sk-top rv">
          <header>
            <p className="tag">
              <b>02</b> — Skills
            </p>
            <h2 className="h2" id="skills-title">
              The periodic table
              <br />
              of my <span className="it">stack.</span>
            </h2>
          </header>
          <p className="lede">
            {SKILLS_LIST.length} elements from the résumé across{" "}
            {SKILL_FAMILIES.length - 1} domains. Hover, focus or tap any tile to
            inspect its properties and project applications.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div
          className="sk-chips rv"
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
                className="sk-chip"
                aria-pressed={isSelected}
                onClick={() => setSelectedFamily(family)}
              >
                <span>{family}</span>
                <small>{count}</small>
              </button>
            );
          })}
        </div>

        {/* Body: Grid + Sticky Inspector */}
        <div className="sk-body">
          {/* Periodic Elements Grid */}
          <ul
            ref={gridRef}
            className={`sk-grid ${gridInView ? "sk-in" : ""}`}
            aria-label="Skills"
          >
            {SKILLS_LIST.map((skill, index) => {
              const isDimmed =
                selectedFamily !== "All" && skill.family !== selectedFamily;
              const isSelected = activeSkill.num === skill.num;
              const delay =
                (Math.floor(index / columns) + (index % columns)) * 40;

              return (
                <li key={skill.num}>
                  <button
                    type="button"
                    onClick={() => setActiveSkill(skill)}
                    onMouseEnter={() => setActiveSkill(skill)}
                    onFocus={() => setActiveSkill(skill)}
                    aria-label={`${skill.name} — ${skill.family}${
                      skill.isRecent ? ", recently used" : ""
                    }`}
                    aria-pressed={isSelected}
                    aria-controls="sk-inspector"
                    className={`sk-tile ${isSelected ? "is-active" : ""} ${
                      isDimmed ? "is-dim" : ""
                    }`}
                    style={{ "--d": `${delay}ms` } as React.CSSProperties}
                  >
                    <span className="sk-num" aria-hidden="true">
                      <span>{skill.num}</span>
                      {skill.isRecent && (
                        <i
                          className="sk-new"
                          title="Recently used in production"
                        />
                      )}
                    </span>
                    <span className="sk-sym" aria-hidden="true">
                      {skill.sym}
                    </span>
                    <span className="sk-name" aria-hidden="true">
                      {skill.name}
                    </span>
                    <span className="sk-fam" aria-hidden="true">
                      {skill.family.split(" ")[0]}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Sticky Inspector Panel */}
          <aside
            id="sk-inspector"
            className="sk-insp"
            aria-live="polite"
            aria-label="Skill inspector"
          >
            <div className="sk-insp-top">
              <span>No. {activeSkill.num}</span>
              <span>{activeSkill.sym}</span>
            </div>

            <div
              className="sk-logo"
              style={
                {
                  "--tint": "rgba(164, 71, 31, 0.2)",
                } as React.CSSProperties
              }
            >
              <div key={activeSkill.name} className="sk-logo-in">
                <TechIcon
                  name={activeSkill.name}
                  size={60}
                  className="w-[60px] h-[60px] drop-shadow-sm"
                />
              </div>
            </div>

            <h3 title={activeSkill.name}>{activeSkill.name}</h3>
            <p className="sk-insp-fam">
              {activeSkill.family}
              {activeSkill.isRecent && (
                <span className="text-accent font-medium"> · recently used</span>
              )}
            </p>
            <p className="sk-insp-note">{activeSkill.note}</p>

            <div className="sk-used">
              <p>Applied in</p>
              {activeSkill.usedIn.length > 0 ? (
                <ul>
                  {activeSkill.usedIn.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <span className="none">Not tied to a featured project</span>
              )}
            </div>
          </aside>
        </div>

        {/* Legend */}
        <p className="sk-legend">
          <span>
            <i aria-hidden="true" /> Recently used
          </span>
          <span>
            {SKILLS_LIST.filter((skill) => skill.isRecent).length} of{" "}
            {SKILLS_LIST.length} elements are in active production use today
          </span>
        </p>
      </div>
    </section>
  );
}
