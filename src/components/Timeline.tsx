"use client";

import React, { useRef, useEffect } from "react";
import { EXPERIENCE_LIST } from "../data/portfolioData";
import TechIcon from "./TechIcon";

export default function Timeline() {
  const pathRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const pathEl = pathRef.current;
    if (!pathEl) return;

    let rafId = 0;
    const handleScroll = () => {
      rafId = 0;
      const rect = pathEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = rect.top - windowHeight * 0.75;
      const totalSpan = rect.height + windowHeight * 0.75 - windowHeight * 0.45;

      const progress = totalSpan <= 0 ? 1 : Math.min(1, Math.max(0, -start / totalSpan));
      pathEl.style.setProperty("--p", progress.toFixed(4));

      // Calculate where the fill head is in viewport coordinates
      const fillHead = rect.top + progress * pathEl.offsetHeight;

      itemsRef.current.forEach((item) => {
        if (!item) return;
        const itemTop = item.getBoundingClientRect().top + 14;
        item.classList.toggle("is-lit", itemTop <= fillHead + 4);
      });
    };

    const requestTick = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(handleScroll);
      }
    };

    handleScroll();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);

    return () => {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="experience" className="sec" aria-labelledby="xp-title">
      <div className="wrap">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16 rv">
          <div>
            <p className="tag">
              <b>04</b> — Experience &amp; education
            </p>
            <h2 className="h2" id="xp-title">
              One continuous <span className="it">path.</span>
            </h2>
          </div>
          <p className="lede max-w-[420px] text-[#6f6b64]">
            Education and work in chronological order — from Computer Engineering &amp; DSA foundation at MSIT Delhi to event-driven architectures and Agentic AI at MapmyIndia.
          </p>
        </div>

        {/* Timeline Path with Interactive Filled Spine */}
        <div ref={pathRef} className="xp-path">
          {/* Vertical Spine Line filled by scroll progress --p */}
          <span className="xp-spine" aria-hidden="true">
            <i />
          </span>

          <ol className="list-none m-0 p-0 flex flex-col gap-14 sm:gap-20">
            {EXPERIENCE_LIST.map((item, idx) => (
              <li
                key={item.id}
                ref={(el) => {
                  itemsRef.current[idx] = el;
                }}
                className="xp-stop relative grid grid-cols-1 md:grid-cols-[170px_1fr] gap-4 md:gap-12 items-start"
              >
                {/* Glowing Active Dot */}
                <span className="xp-dot" aria-hidden="true" />

                {/* Left Year & Period */}
                <div className="font-mono text-[#6f6b64]">
                  <span className="xp-year block font-sans font-bold text-3xl sm:text-5xl tracking-tighter leading-none">
                    {item.year}
                  </span>
                  <span className="block mt-2 text-xs uppercase tracking-wider text-[#6f6b64] whitespace-nowrap">
                    {item.period}
                  </span>
                </div>

                {/* Right Card Content */}
                <div className="flex flex-col">
                  <span className="inline-flex self-start items-center h-6 px-3 rounded-full text-[10.5px] font-mono uppercase tracking-wider text-[#6f6b64] shadow-[0_0_0_1px_rgba(13,13,13,0.1)] bg-white mb-2">
                    {item.kind}
                  </span>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#0d0d0d] leading-tight">
                    {item.role}
                  </h3>

                  <p className="text-[15px] font-medium text-[#0d0d0d] mt-1">
                    {item.company} ·{" "}
                    <span className="text-[#6f6b64] font-normal">{item.location}</span>
                  </p>

                  <ul className="list-none p-0 m-0 mt-4 grid gap-2.5 max-w-2xl">
                    {item.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="relative pl-5 text-[14px] leading-relaxed text-[#3a3a3a] before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-2 before:h-[1.5px] before:bg-[#6f6b64]"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {item.techStack && item.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[rgba(13,13,13,0.06)]">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="chip text-[11px] px-2.5 py-0.5 bg-white shadow-[0_0_0_1px_rgba(13,13,13,0.08)] inline-flex items-center gap-1.5"
                        >
                          <TechIcon name={tech} size={12} className="w-3 h-3" />
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}

            {/* Next Stop Callout */}
            <li
              ref={(el) => {
                itemsRef.current[EXPERIENCE_LIST.length] = el;
              }}
              className="xp-stop relative grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-12 items-start pt-4"
            >
              <span className="xp-dot" aria-hidden="true" />

              <div className="font-mono text-[#6f6b64]">
                <span className="xp-year block font-sans font-bold text-3xl sm:text-5xl tracking-tighter leading-none">
                  Next
                </span>
                <span className="block mt-2 text-xs uppercase tracking-wider text-[#6f6b64]">
                  Future
                </span>
              </div>

              <div>
                <a
                  href="#contact"
                  className="group rounded-3xl border-2 border-dashed border-[rgba(13,13,13,0.25)] p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4 bg-white/40 hover:bg-white hover:border-[#0d0d0d] transition-colors duration-300 text-left"
                >
                  <div>
                    <small className="block font-mono text-xs uppercase tracking-wider text-[#6f6b64] mb-1">
                      Next destination —
                    </small>
                    <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0d0d0d]">
                      Your engineering team<span className="it">?</span>
                    </div>
                  </div>

                  <span className="btn btn-primary btn-sm group-hover:translate-x-1 transition-transform">
                    Let’s talk →
                  </span>
                </a>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
