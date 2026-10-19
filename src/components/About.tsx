"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PERSONAL_INFO } from "../data/portfolioData";
import { useFinePointer } from "../hooks/useFinePointer";

export default function About() {
  const [isFlipped, setIsFlipped] = useState(false);
  const isFinePointer = useFinePointer();
  const lanyardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Spring physics pendulum simulation for the hanging lanyard
    const lanyard = lanyardRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!lanyard || prefersReducedMotion) return;

    let angle = 0;
    let velocity = 0;
    let lastClientX = 0;
    let lastTime = 0;
    let lastMoveTime = 0;
    let rafId = 0;
    let lastTimestamp = 0;
    let active = false;

    const animatePhysics = (timestamp: number) => {
      const dt = Math.min(0.033, (timestamp - (lastTimestamp || timestamp)) / 1000) || 0.016;
      lastTimestamp = timestamp;

      // Restoring force towards equilibrium with subtle sinusoidal ambient pendulum drift
      const targetAngle = timestamp - lastMoveTime > 1400 ? 1.6 * Math.sin(timestamp / 1300) : 0;
      const acceleration = -38 * (angle - targetAngle) - 3.2 * velocity;

      velocity += acceleration * dt;
      angle += velocity * dt;
      angle = Math.max(-24, Math.min(24, angle));

      lanyard.style.transform = `rotate(${angle.toFixed(3)}deg)`;
      rafId = requestAnimationFrame(animatePhysics);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (lastTime && now - lastTime < 80) {
        const deltaX = (e.clientX - lastClientX) / Math.max(1, now - lastTime);
        velocity += Math.max(-60, Math.min(60, -(9 * deltaX)));
      }
      lastClientX = e.clientX;
      lastTime = now;
      lastMoveTime = now;
    };

    const stopSimulation = () => {
      active = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
    };

    const startSimulation = () => {
      if (!active) {
        active = true;
        lastTimestamp = 0;
        rafId = requestAnimationFrame(animatePhysics);
        window.addEventListener("pointermove", handlePointerMove, { passive: true });
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          startSimulation();
        } else {
          stopSimulation();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(lanyard.closest("section") || lanyard);

    return () => {
      observer.disconnect();
      stopSimulation();
    };
  }, []);

  return (
    <section id="about" className="sec" aria-labelledby="about-title">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_320px_1.1fr] gap-8 lg:gap-14 items-stretch">
          {/* Left Column: Narrative Bio */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="tag">
                <b>01</b> — About
              </p>
              <h2 className="h2" id="about-title">
                Hi, I’m <span className="it">Satyam.</span>
              </h2>

              <p className="lede mt-6 text-[#3a3a3a] leading-relaxed">
                {PERSONAL_INFO.fullBio}
              </p>

              <div className="mt-5 pl-4 border-l-2 border-[#0d0d0d] text-[14.5px] leading-relaxed text-[#8a8781]">
                Specialized in production GenAI engineering: supervisor-worker multi-agent graphs,
                hybrid dense/sparse vector retrieval, contextual document compression, and
                high-throughput event architectures with Kafka and RabbitMQ.
              </div>
            </div>

            {/* Social & Action Links */}
            <div className="flex flex-wrap items-center gap-2.5 pt-8 mt-6">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost btn-sm"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost btn-sm"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.6V9h3.5v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              <a href="#contact" className="btn btn-primary btn-sm">
                Get in touch
              </a>
            </div>
          </div>

          {/* Middle Column: Hanging Lanyard with Real Spring Physics */}
          <div className="flex flex-col items-center my-6 lg:my-0 ab-mid">
            <div ref={lanyardRef} className="ab-hang">
              {/* Lanyard Fabric Strap with continuous scrolling text */}
              <div className="ab-strap" aria-hidden="true">
                <div className="ab-strap-text">
                  <span>SATYAM KUMAR · SOFTWARE &amp; AI ENGINEER ·</span>
                  <span>SATYAM KUMAR · SOFTWARE &amp; AI ENGINEER ·</span>
                  <span>SATYAM KUMAR · SOFTWARE &amp; AI ENGINEER ·</span>
                  <span>SATYAM KUMAR · SOFTWARE &amp; AI ENGINEER ·</span>
                </div>
              </div>

              {/* Chrome Metallic Clip Fixture */}
              <div className="ab-clip" aria-hidden="true">
                <i className="c1" />
                <i className="c2" />
                <i className="c3" />
              </div>

              {/* The 3D Double-Sided Flip Card */}
              <div
                className={`ab-card ${isFlipped ? "is-flipped" : ""}`}
                onClick={() => !isFinePointer && setIsFlipped(!isFlipped)}
                onMouseEnter={() => isFinePointer && setIsFlipped(true)}
                onMouseLeave={() => isFinePointer && setIsFlipped(false)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setIsFlipped(!isFlipped);
                  }
                }}
                aria-pressed={isFlipped}
                aria-label={`ID card for ${PERSONAL_INFO.name}. Press to flip to the ${isFlipped ? "front" : "back"}.`}
              >
                <div className="ab-flip">
                  {/* FRONT FACE */}
                  <div className="ab-face ab-front">
                    <div className="ab-band">
                      <b>DEVELOPER ID</b>
                      <span>SK-2025</span>
                    </div>

                    <div className="ab-front-body">
                      {/* Avatar Photo Frame with Metallic Bezel */}
                      <div className="ab-photo">
                        <div className="ab-photo-in relative bg-[#0d0d0d] overflow-hidden">
                          <Image
                            src={PERSONAL_INFO.avatar}
                            alt={`${PERSONAL_INFO.name} — Developer ID Photo`}
                            fill
                            sizes="128px"
                            priority
                            className="object-cover object-center"
                          />
                        </div>
                      </div>

                      {/* Name & Role */}
                      <p className="ab-name">{PERSONAL_INFO.name}</p>
                      <p className="ab-role">{PERSONAL_INFO.title}</p>

                      {/* Metadata Table */}
                      <dl className="ab-rows">
                        <div>
                          <dt>ID No.</dt>
                          <dd>satyamk001</dd>
                        </div>
                        <div>
                          <dt>Dept.</dt>
                          <dd>Agentic AI &amp; Systems</dd>
                        </div>
                        <div>
                          <dt>Valid till</dt>
                          <dd>2025+</dd>
                        </div>
                      </dl>

                      {/* Card Footer: Barcode & Hologram Seal */}
                      <div className="ab-foot">
                        <div
                          className="ab-bar"
                          style={{
                            background:
                              "repeating-linear-gradient(90deg, #0d0d0d 0px, #0d0d0d 2px, transparent 2px, transparent 4px, #0d0d0d 4px, #0d0d0d 7px, transparent 7px, transparent 9px)",
                          }}
                          aria-hidden="true"
                        />
                        <div className="ab-holo" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div className="ab-face ab-back">
                    <div className="p-6 flex flex-col h-full pt-8">
                      <h3 className="text-xl font-bold tracking-tight text-[#0d0d0d]">
                        What <span className="it">I am</span>
                      </h3>

                      <ul className="list-none p-0 mt-3 grid gap-2.5 text-[12px] text-[#3a3a3a] leading-relaxed">
                        <li className="grid grid-cols-[18px_1fr] items-start">
                          <span className="font-mono text-[10px] text-[#8a8781]">01</span>
                          <span>Software Engineer at MapmyIndia building distributed real-time pipelines</span>
                        </li>
                        <li className="grid grid-cols-[18px_1fr] items-start">
                          <span className="font-mono text-[10px] text-[#8a8781]">02</span>
                          <span>B.Tech in ECE from MSIT Delhi (2021–2025, CGPA: 7.9)</span>
                        </li>
                        <li className="grid grid-cols-[18px_1fr] items-start">
                          <span className="font-mono text-[10px] text-[#8a8781]">03</span>
                          <span>Creator of DevAgent (LangGraph supervisor multi-agent assistant)</span>
                        </li>
                        <li className="grid grid-cols-[18px_1fr] items-start">
                          <span className="font-mono text-[10px] text-[#8a8781]">04</span>
                          <span>Shipped enterprise RAG chatbot with Groq Llama 3.3 &amp; hybrid search</span>
                        </li>
                        <li className="grid grid-cols-[18px_1fr] items-start">
                          <span className="font-mono text-[10px] text-[#8a8781]">05</span>
                          <span>Solved 600+ DSA problems across LeetCode &amp; GeeksforGeeks</span>
                        </li>
                      </ul>

                      <div className="mt-auto pt-4 border-t border-[rgba(13,13,13,0.08)]">
                        <p className="font-serif italic text-2xl text-[#0d0d0d]">Satyam Kumar</p>
                        <small className="block mt-1 font-mono text-[10.5px] text-[#8a8781]">
                          If found, say hello · {PERSONAL_INFO.email}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flip & swing hint */}
              <p className="mt-3 font-mono text-[11px] text-[#8a8781] uppercase tracking-wider text-center">
                {isFinePointer ? "Hover to flip · move mouse to swing" : "Tap card to flip ↺"}
              </p>
            </div>
          </div>

          {/* Right Column: Quick Facts & Pull Quote */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#8a8781] mb-4">
                Quick facts
              </h3>

              <dl className="grid text-[13.5px]">
                <div className="grid grid-cols-[110px_1fr] gap-4 py-3 border-y border-[rgba(13,13,13,0.08)]">
                  <dt className="font-mono text-xs uppercase tracking-wide text-[#8a8781]">
                    Based in
                  </dt>
                  <dd className="font-medium text-[#0d0d0d]">{PERSONAL_INFO.location}</dd>
                </div>

                <div className="grid grid-cols-[110px_1fr] gap-4 py-3 border-b border-[rgba(13,13,13,0.08)]">
                  <dt className="font-mono text-xs uppercase tracking-wide text-[#8a8781]">
                    Role
                  </dt>
                  <dd className="font-medium text-[#0d0d0d]">
                    Associate Software Developer · {PERSONAL_INFO.currentCompany}
                  </dd>
                </div>

                <div className="grid grid-cols-[110px_1fr] gap-4 py-3 border-b border-[rgba(13,13,13,0.08)]">
                  <dt className="font-mono text-xs uppercase tracking-wide text-[#8a8781]">
                    Education
                  </dt>
                  <dd className="font-medium text-[#0d0d0d]">B.Tech ECE · MSIT Delhi</dd>
                </div>

                <div className="grid grid-cols-[110px_1fr] gap-4 py-3 border-b border-[rgba(13,13,13,0.08)]">
                  <dt className="font-mono text-xs uppercase tracking-wide text-[#8a8781]">
                    DSA
                  </dt>
                  <dd className="font-medium text-[#0d0d0d]">600+ Problems Solved</dd>
                </div>

                <div className="grid grid-cols-[110px_1fr] gap-4 py-3 border-b border-[rgba(13,13,13,0.08)]">
                  <dt className="font-mono text-xs uppercase tracking-wide text-[#8a8781]">
                    Email
                  </dt>
                  <dd className="font-medium text-[#0d0d0d] truncate">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="hover:underline underline-offset-2"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Editorial Pull Quote */}
            <blockquote className="mt-8 pt-6 border-t border-[rgba(13,13,13,0.08)]">
              <p className="font-serif italic text-[clamp(20px,2vw,26px)] leading-snug text-[#0d0d0d] tracking-tight">
                &ldquo;Architecting resilient distributed backends and autonomous multi-agent intelligence.&rdquo;
              </p>
              <footer className="mt-3 font-mono text-xs text-[#8a8781]">
                — {PERSONAL_INFO.name}, {PERSONAL_INFO.title}
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
