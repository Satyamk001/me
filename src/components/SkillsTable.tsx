"use client";

import React, { useState } from "react";
import {
  SKILLS_LIST,
  SKILL_FAMILIES,
  SkillElement,
} from "../data/portfolioData";
import TechIcon from "./TechIcon";

export default function SkillsTable() {
  const [selectedFamily, setSelectedFamily] = useState<string>("All");
  const [activeSkill, setActiveSkill] = useState<SkillElement>(SKILLS_LIST[0]);

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
            {SKILLS_LIST.length} elements from the résumé across {SKILL_FAMILIES.length - 1} domains. Hover or tap any tile to inspect its properties and project applications.
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Periodic Elements Grid */}
          <ul
            className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 list-none p-0 m-0"
            aria-label="Skills Grid"
          >
            {SKILLS_LIST.map((skill) => {
              const isDimmed =
                selectedFamily !== "All" && skill.family !== selectedFamily;
              const isSelected = activeSkill.num === skill.num;

              return (
                <li key={skill.num}>
                  <button
                    type="button"
                    onClick={() => setActiveSkill(skill)}
                    onMouseEnter={() => setActiveSkill(skill)}
                    onFocus={() => setActiveSkill(skill)}
                    aria-label={`${skill.name} — ${skill.family}`}
                    aria-pressed={isSelected}
                    className={`relative w-full aspect-[1/1.08] rounded-xl p-2.5 text-left flex flex-col justify-between transition-all duration-300 cursor-pointer select-none ${
                      isSelected
                        ? "bg-[#0d0d0d] text-white shadow-lg -translate-y-1 z-10"
                        : "bg-white text-[#0d0d0d] shadow-[0_0_0_1px_rgba(13,13,13,0.08)] hover:-translate-y-0.5 hover:shadow-md"
                    } ${isDimmed ? "opacity-25" : "opacity-100"}`}
                  >
                    {/* Top Row: Index and recent dot */}
                    <div className="flex justify-between items-center w-full font-mono text-[9px] text-[#6f6b64]">
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
                    <div className="flex items-center justify-between w-full my-auto">
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
                    <div className="text-[10px] font-semibold leading-tight line-clamp-1">
                      {skill.name}
                    </div>

                    {/* Category Acronym */}
                    <div
                      className={`font-mono text-[8px] uppercase tracking-wider truncate ${
                        isSelected ? "text-white/50" : "text-[#6f6b64]"
                      }`}
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
            className="lg:sticky lg:top-24 rounded-3xl bg-white p-6 shadow-[0_0_0_1px_rgba(13,13,13,0.08),0_24px_60px_-20px_rgba(13,13,13,0.14)] flex flex-col justify-between min-h-[440px]"
            aria-label="Skill inspector"
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
                  className="absolute w-36 h-36 rounded-full blur-xl transition-all duration-500 bg-accent-soft"
                  aria-hidden="true"
                />
                <div className="relative z-10 flex flex-col items-center justify-center w-28 h-28 rounded-2xl bg-[#f4f2ee] shadow-[0_0_0_1px_rgba(13,13,13,0.08)] p-3">
                  <TechIcon
                    name={activeSkill.name}
                    size={40}
                    className="w-10 h-10 mb-2 drop-shadow-sm"
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
