"use client";

import React, { useState } from "react";
import { PROJECTS_LIST } from "../data/portfolioData";
import { useFinePointer } from "../hooks/useFinePointer";

export default function ProjectsRail() {
  const [openProjectId, setOpenProjectId] = useState<string>(PROJECTS_LIST[0].id);
  const isFinePointer = useFinePointer();

  return (
    <section id="work" className="sec" aria-labelledby="work-title">
      <div className="wrap">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 rv">
          <div>
            <p className="tag">
              <b>03</b> — Selected work
            </p>
            <h2 className="h2" id="work-title">
              Things I’ve <span className="it">built.</span>
            </h2>
          </div>
          <p className="lede max-w-[420px] text-[#6f6b64]">
            Agentic AI systems, enterprise RAG pipelines, and distributed event-driven architectures from the résumé. Hover or click any project rail to expand its architecture and details.
          </p>
        </div>

        {/* Desktop Rail / Mobile Accordion */}
        <div className="flex flex-col lg:flex-row gap-3 min-h-[580px] lg:min-h-[620px]">
          {PROJECTS_LIST.map((proj) => {
            const isOpen = openProjectId === proj.id;

            return (
              <article
                key={proj.id}
                onMouseEnter={() => isFinePointer && setOpenProjectId(proj.id)}
                className={`relative rounded-3xl bg-white shadow-[0_0_0_1px_rgba(13,13,13,0.08)] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isOpen
                    ? "lg:flex-[8] shadow-[0_0_0_1px_rgba(13,13,13,0.08),0_30px_70px_-25px_rgba(13,13,13,0.25)]"
                    : "lg:flex-[1] hover:bg-white/80 cursor-pointer"
                }`}
              >
                {/* Collapsed Spine Button (Desktop) */}
                <button
                  type="button"
                  onClick={() => setOpenProjectId(proj.id)}
                  aria-expanded={isOpen}
                  inert={isOpen}
                  className={`hidden lg:flex absolute inset-0 w-full h-full flex-col items-center justify-between py-8 cursor-pointer select-none transition-opacity duration-300 ${
                    isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                  aria-label={`Expand project ${proj.title}`}
                >
                  <span className="font-mono text-xs text-[#6f6b64]">{proj.num}</span>
                  <span className="[writing-mode:vertical-rl] rotate-180 font-bold text-lg tracking-tight text-[#0d0d0d] whitespace-nowrap">
                    {proj.title}
                  </span>
                  <span className="grid place-items-center w-9 h-9 rounded-full shadow-[inset_0_0_0_1px_rgba(13,13,13,0.15)] text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white transition-all">
                    +
                  </span>
                </button>

                {/* Collapsed Header (Mobile) */}
                <button
                  type="button"
                  onClick={() => setOpenProjectId(isOpen ? "" : proj.id)}
                  aria-expanded={isOpen}
                  className="lg:hidden flex items-center justify-between w-full p-6 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#6f6b64]">{proj.num}</span>
                    <span className="font-bold text-xl text-[#0d0d0d]">{proj.title}</span>
                  </div>
                  <span className="text-xl font-mono text-[#6f6b64]">{isOpen ? "−" : "+"}</span>
                </button>

                {/* Expanded Project Content Body */}
                <div
                  className={`p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-full transition-opacity duration-500 ${
                    isOpen ? "flex opacity-100" : "hidden opacity-0"
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-10 items-stretch h-full">
                    {/* Left Details Column */}
                    <div className="flex flex-col justify-between">
                      <div>
                        {/* Kicker & Title */}
                        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-[#6f6b64]">
                          <b className="text-[#0d0d0d]">{proj.num}</b>
                          <span>{proj.kicker}</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0d0d0d] mt-2 mb-3">
                          {proj.title}
                        </h3>

                        <p className="text-sm sm:text-[14.5px] leading-relaxed text-[#3a3a3a] mb-6">
                          {proj.desc}
                        </p>

                        {/* Key Features List */}
                        <div className="mb-6">
                          <p className="font-mono text-[11px] uppercase tracking-wider text-[#6f6b64] mb-2">
                            Key architectural highlights
                          </p>
                          <ul className="list-none p-0 m-0 grid gap-2">
                            {proj.features.map((feat, i) => (
                              <li
                                key={i}
                                className="relative pl-4 text-xs sm:text-[12.5px] leading-relaxed text-[#3a3a3a] before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#0d0d0d]"
                              >
                                {feat}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Tech Stack Chips & GitHub CTA */}
                      <div>
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[rgba(13,13,13,0.08)]">
                          {proj.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="chip text-[11px] px-2.5 py-1 bg-[#f4f2ee]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {proj.githubUrl && (
                          <div className="mt-4">
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-ghost btn-sm"
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
                              </svg>
                              <span>More on GitHub</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Illustrative Architecture Window */}
                    <div className="relative rounded-2xl bg-[#f4f2ee] p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-inner border border-[rgba(13,13,13,0.06)] min-h-[300px]">
                      {/* Top Chrome Window Bar */}
                      <div className="flex items-center justify-between pb-3 border-b border-[rgba(13,13,13,0.08)]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#cfcbc4]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#cfcbc4]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#cfcbc4]" />
                          <span className="ml-2 font-mono text-[10px] text-[#6f6b64]">
                            arch://{proj.id}.graph
                          </span>
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#6f6b64]">
                          Active architecture
                        </span>
                      </div>

                      {/* Interactive Architecture Schematics based on Diagram Type */}
                      <div className="my-auto py-4">
                        {proj.diagramType === "devagent" && (
                          <div className="flex flex-col gap-3 font-mono text-xs">
                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                              <div className="rounded-lg bg-white p-3 shadow-xs">
                                <span className="text-[#6f6b64] block">AGENT 1</span>
                                <strong className="text-[#0d0d0d] text-xs">Supervisor</strong>
                                <p className="text-[9.5px] text-[#6f6b64] mt-1">
                                  Task decomposition &amp; routing
                                </p>
                              </div>
                              <div className="rounded-lg bg-white p-3 shadow-xs">
                                <span className="text-[#6f6b64] block">AGENT 2</span>
                                <strong className="text-[#0d0d0d] text-xs">Planner</strong>
                                <p className="text-[9.5px] text-[#6f6b64] mt-1">
                                  Step breakdown &amp; dependencies
                                </p>
                              </div>
                              <div className="rounded-lg bg-white p-3 shadow-xs">
                                <span className="text-[#6f6b64] block">AGENT 3</span>
                                <strong className="text-[#0d0d0d] text-xs">Coder (ReAct)</strong>
                                <p className="text-[9.5px] text-[#6f6b64] mt-1">
                                  File read/write &amp; code gen
                                </p>
                              </div>
                              <div className="rounded-lg bg-accent-soft border border-[rgba(164,71,31,0.22)] p-3 shadow-xs">
                                <span className="text-accent block font-semibold">TEST LOOP</span>
                                <strong className="text-[#0d0d0d] text-xs">Reviewer / Tester</strong>
                                <p className="text-[9.5px] text-[#6f6b64] mt-1">
                                  pytest execution [PASSED]
                                </p>
                              </div>
                            </div>
                            <div className="rounded-md bg-[#0d0d0d] text-white p-3 text-[10.5px]">
                              <span className="text-[#6f6b64]">$ pytest tests/test_agent.py</span>
                              <div className="text-accent-lit mt-1">
                                ✓ test_supervisor_dispatch PASSED [0.12s]
                              </div>
                              <div className="text-accent-lit">
                                ✓ test_send_api_fanout PASSED [0.24s]
                              </div>
                              <div className="text-white/60 text-[9.5px] mt-1">
                                Checkpointed to SQLite · LangSmith traced
                              </div>
                            </div>
                          </div>
                        )}

                        {proj.diagramType === "rag" && (
                          <div className="flex flex-col gap-2.5 font-mono text-xs">
                            <div className="rounded-lg bg-white p-3 shadow-xs">
                              <div className="flex justify-between text-[10px] text-[#6f6b64] mb-1">
                                <span>INGESTION PIPELINE</span>
                                <span>PDFLoader → RecursiveChunker</span>
                              </div>
                              <div className="w-full bg-[#f4f2ee] h-2 rounded-full overflow-hidden">
                                <div className="bg-[#0d0d0d] h-full w-full" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                              <div className="rounded-lg bg-white p-3 shadow-xs">
                                <span className="text-[#6f6b64] block">EMBEDDINGS</span>
                                <strong className="text-[#0d0d0d]">Google Gemini</strong>
                                <span className="block text-[9.5px] text-[#6f6b64] mt-0.5">
                                  Pinecone top-k similarity
                                </span>
                              </div>
                              <div className="rounded-lg bg-white p-3 shadow-xs">
                                <span className="text-[#6f6b64] block">RETRIEVAL</span>
                                <strong className="text-[#0d0d0d]">Hybrid Search</strong>
                                <span className="block text-[9.5px] text-[#6f6b64] mt-0.5">
                                  Contextual compression
                                </span>
                              </div>
                            </div>
                            <div className="rounded-lg bg-[#0d0d0d] text-white p-3 text-[10.5px]">
                              <span className="text-[#6f6b64] block text-[9px]">GENERATION MODEL</span>
                              <span className="text-accent-lit font-semibold">Groq Llama 3.3 70B</span>
                              <p className="text-[10px] text-[#b5b2ac] mt-1">
                                Grounded source attribution with highlighted citations
                              </p>
                            </div>
                          </div>
                        )}

                        {proj.diagramType === "kukufun" && (
                          <div className="flex flex-col gap-2.5 font-mono text-xs">
                            <div className="rounded-lg bg-white p-3 shadow-xs">
                              <div className="flex justify-between items-center text-[10px] mb-2">
                                <span className="font-semibold text-[#0d0d0d]">Socket.IO Cluster</span>
                                <span className="text-accent bg-accent-soft px-2 py-0.5 rounded text-[9px]">
                                  Redis Adapter Synced
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-1.5 text-center text-[9px] text-[#6f6b64]">
                                <div className="p-1.5 rounded bg-[#f4f2ee]">Instance #1</div>
                                <div className="p-1.5 rounded bg-[#f4f2ee]">Instance #2</div>
                                <div className="p-1.5 rounded bg-[#f4f2ee]">Instance #3</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                              <div className="rounded-lg bg-white p-3 shadow-xs">
                                <span className="text-[#6f6b64] block">BROKER</span>
                                <strong className="text-[#0d0d0d]">Apache Kafka</strong>
                                <span className="block text-[9.5px] text-[#6f6b64] mt-0.5">
                                  SASL/TLS authenticated
                                </span>
                              </div>
                              <div className="rounded-lg bg-white p-3 shadow-xs">
                                <span className="text-[#6f6b64] block">PROTECTION</span>
                                <strong className="text-[#0d0d0d]">Rate Limiter</strong>
                                <span className="block text-[9.5px] text-accent mt-0.5 font-semibold">
                                  30 DMs / 10s window
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {proj.diagramType === "apimonitor" && (
                          <div className="flex flex-col gap-2.5 font-mono text-xs">
                            <div className="rounded-lg bg-white p-3 shadow-xs">
                              <span className="text-[#6f6b64] block text-[9.5px] mb-1">
                                EVENT-DRIVEN QUEUES
                              </span>
                              <div className="flex items-center justify-between text-[10.5px]">
                                <span>RabbitMQ Topic Exchange</span>
                                <span className="text-accent font-bold">99.9% Durable</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                              <div className="rounded-lg bg-white p-3 shadow-xs">
                                <span className="text-[#6f6b64] block">RESILIENCE</span>
                                <strong className="text-[#0d0d0d]">Circuit Breakers</strong>
                                <span className="block text-[9.5px] text-[#6f6b64] mt-0.5">
                                  Exponential backoff retries
                                </span>
                              </div>
                              <div className="rounded-lg bg-white p-3 shadow-xs">
                                <span className="text-[#6f6b64] block">STORAGE</span>
                                <strong className="text-[#0d0d0d]">MongoDB &amp; Docker</strong>
                                <span className="block text-[9.5px] text-[#6f6b64] mt-0.5">
                                  Time-series TTL indexes
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Diagram Tag */}
                      <div className="flex justify-end">
                        <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#6f6b64] bg-white px-2.5 py-1 rounded-full shadow-xs">
                          Illustrative Architecture
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
