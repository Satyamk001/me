"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "../data/portfolioData";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"agents" | "rag" | "stream">("agents");

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-end pt-24 pb-12 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Giant Background Outlined Ghost Name */}
      <div
        className="absolute left-1/2 top-[clamp(90px,18vh,190px)] -translate-x-1/2 select-none pointer-events-none whitespace-nowrap font-extrabold tracking-[-0.06em] leading-[0.8] text-[clamp(80px,21vw,360px)] text-transparent z-0 animate-[hr-ghost_1.6s_var(--ease)_both]"
        style={{ WebkitTextStroke: "1.2px rgba(13, 13, 13, 0.14)" }}
        aria-hidden="true"
      >
        SATYAM
      </div>

      <div className="wrap relative z-10 w-full">
        {/* Stage Grid: Left Bio / Title, Center High-Tech Visual, Right Intro & CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_auto_1.1fr] items-end gap-8 lg:gap-10">
          {/* Left Column */}
          <div className="flex flex-col pb-2 lg:pb-12">
            {/* Live Kicker with pulsing dot */}
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-[#8a8781] mb-4">
              <span
                className="w-2.5 h-2.5 rounded-full bg-[#0d0d0d] shadow-[0_0_0_0_rgba(13,13,13,0.35)] animate-[hr-live_2.4s_ease-out_infinite]"
                aria-hidden="true"
              />
              <span>{PERSONAL_INFO.name} · Delhi, India</span>
            </div>

            <h1
              id="hero-title"
              className="text-[clamp(44px,5.8vw,92px)] font-bold tracking-[-0.05em] leading-[0.94] text-[#0d0d0d] m-0"
            >
              Software Engineer &amp;
              <br />
              AI <span className="it text-[1.04em]">Engineer.</span>
            </h1>

            <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-[#8a8781]">
              <span className="px-2.5 py-1 rounded-md bg-white/70 shadow-[0_0_0_1px_rgba(13,13,13,0.08)]">
                LangGraph Multi-Agent
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/70 shadow-[0_0_0_1px_rgba(13,13,13,0.08)]">
                Enterprise RAG
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/70 shadow-[0_0_0_1px_rgba(13,13,13,0.08)]">
                Event-Driven Systems
              </span>
            </div>
          </div>

          {/* Center Column: Interactive Architect / Engine Visual Card */}
          <div className="flex justify-center my-4 lg:my-0">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-[24px] bg-white p-5 shadow-[0_0_0_1px_rgba(13,13,13,0.08),0_24px_50px_-20px_rgba(13,13,13,0.18)] flex flex-col gap-4">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-[rgba(13,13,13,0.08)] pb-3 font-mono text-[11px] text-[#8a8781]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e4e1db]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e4e1db]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e4e1db]" />
                  <span className="ml-1 text-[#0d0d0d] font-semibold">sys://core-engine</span>
                </div>
                <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ONLINE
                </span>
              </div>

              {/* Engine Switcher Tabs */}
              <div className="flex rounded-full bg-[#f4f2ee] p-1 text-[11px] font-mono text-[#8a8781]">
                <button
                  type="button"
                  onClick={() => setActiveTab("agents")}
                  className={`flex-1 py-1.5 rounded-full transition-all duration-300 ${
                    activeTab === "agents" ? "bg-[#0d0d0d] text-white shadow-xs" : "hover:text-[#0d0d0d]"
                  }`}
                >
                  LangGraph
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("rag")}
                  className={`flex-1 py-1.5 rounded-full transition-all duration-300 ${
                    activeTab === "rag" ? "bg-[#0d0d0d] text-white shadow-xs" : "hover:text-[#0d0d0d]"
                  }`}
                >
                  Hybrid RAG
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("stream")}
                  className={`flex-1 py-1.5 rounded-full transition-all duration-300 ${
                    activeTab === "stream" ? "bg-[#0d0d0d] text-white shadow-xs" : "hover:text-[#0d0d0d]"
                  }`}
                >
                  Kafka Stream
                </button>
              </div>

              {/* Dynamic Visual Content */}
              <div className="rounded-xl bg-[#0d0d0d] text-[#f4f2ee] p-4 font-mono text-[11px] leading-relaxed min-h-[175px] flex flex-col justify-between overflow-hidden shadow-inner">
                {activeTab === "agents" && (
                  <div className="flex flex-col gap-1.5 animate-fadeIn">
                    <div className="text-[#8a8781] text-[10px] flex justify-between">
                      <span>SUPERVISOR GRAPH</span>
                      <span className="text-emerald-400">ACTIVE</span>
                    </div>
                    <div className="text-white font-semibold">
                      › dispatching task: &ldquo;Refactor &amp; Verify&rdquo;
                    </div>
                    <div className="pl-2 border-l border-white/20 text-[10.5px] text-[#b5b2ac] flex flex-col gap-1">
                      <div>├─ Planner: strategy generated (3 files)</div>
                      <div>├─ Coder: tool_call (read_file, write_file)</div>
                      <div>└─ Tester: pytest execution [6/6 PASSED]</div>
                    </div>
                    <div className="mt-2 text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded-sm flex items-center justify-between">
                      <span>Checkpoint saved</span>
                      <span>LangSmith traced</span>
                    </div>
                  </div>
                )}

                {activeTab === "rag" && (
                  <div className="flex flex-col gap-1.5 animate-fadeIn">
                    <div className="text-[#8a8781] text-[10px] flex justify-between">
                      <span>RETRIEVAL PIPELINE</span>
                      <span className="text-amber-400">INDEXED</span>
                    </div>
                    <div className="text-white font-semibold">
                      › hybrid query: dense + BM25 sparse
                    </div>
                    <div className="pl-2 border-l border-white/20 text-[10.5px] text-[#b5b2ac] flex flex-col gap-1">
                      <div>├─ Ingestion: PDFLoader (chunk_size: 512)</div>
                      <div>├─ Vector Store: Pinecone (top_k: 5)</div>
                      <div>└─ Compression: contextual filter applied</div>
                    </div>
                    <div className="mt-2 text-[10px] text-amber-300 bg-amber-950/40 px-2 py-1 rounded-sm flex items-center justify-between">
                      <span>LLM: Groq Llama 3.3 70B</span>
                      <span>Latency: 280ms</span>
                    </div>
                  </div>
                )}

                {activeTab === "stream" && (
                  <div className="flex flex-col gap-1.5 animate-fadeIn">
                    <div className="text-[#8a8781] text-[10px] flex justify-between">
                      <span>EVENT STREAM (SASL/TLS)</span>
                      <span className="text-cyan-400">CONNECTED</span>
                    </div>
                    <div className="text-white font-semibold">
                      › Kafka topic: &ldquo;chat.direct-messages&rdquo;
                    </div>
                    <div className="pl-2 border-l border-white/20 text-[10.5px] text-[#b5b2ac] flex flex-col gap-1">
                      <div>├─ Socket.IO: Redis distributed adapter</div>
                      <div>├─ Rate Limit: 30 DMs / 10s sliding-window</div>
                      <div>└─ Fallback: graceful direct socket mode</div>
                    </div>
                    <div className="mt-2 text-[10px] text-cyan-300 bg-cyan-950/40 px-2 py-1 rounded-sm flex items-center justify-between">
                      <span>Durability: 99.9%</span>
                      <span>Presence: synced</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom specs */}
              <div className="flex items-center justify-between text-[11px] font-mono text-[#8a8781] px-1">
                <span>MapmyIndia · Systems</span>
                <span className="font-semibold text-[#0d0d0d]">600+ DSA Solved</span>
              </div>
            </div>
          </div>

          {/* Right Column: Intro, CTAs, and Scroll Indicator */}
          <div className="flex flex-col gap-6 pb-2 lg:pb-12 lg:max-w-[360px] lg:justify-self-end">
            <p className="text-[15.5px] leading-relaxed text-[#3a3a3a] m-0">
              {PERSONAL_INFO.shortBio} Currently at{" "}
              <strong className="text-[#0d0d0d] font-semibold">
                {PERSONAL_INFO.currentCompany}
              </strong>
              .
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a href="#work" className="btn btn-primary">
                <span>Explore work</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>

              <a href="#contact" className="btn btn-ghost">
                Let’s talk
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
                title="View GitHub Profile"
              >
                GitHub
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </a>
            </div>

            {/* Scroll Down Trigger */}
            <a
              href="#about"
              className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-[#8a8781] hover:text-[#0d0d0d] transition-colors mt-2"
            >
              <span
                className="grid place-items-center w-7 h-7 rounded-full shadow-[0_0_0_1px_rgba(13,13,13,0.12)] bg-white animate-[hr-bob_2.4s_var(--ease)_infinite]"
                aria-hidden="true"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
              </span>
              <span>Scroll down</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
