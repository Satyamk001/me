"use client";

import React, { useState } from "react";
import { PROJECTS_LIST } from "../data/portfolioData";
import { useFinePointer } from "../hooks/useFinePointer";
import TechIcon from "./TechIcon";

export default function ProjectsRail() {
  const [openProjectId, setOpenProjectId] = useState<string>(PROJECTS_LIST[0].id);
  const isFinePointer = useFinePointer();

  return (
    <section id="work" className="sec" aria-labelledby="work-title">
      <div className="wrap">
        {/* Header */}
        <div className="wk-top rv">
          <header>
            <p className="tag">
              <b>03</b> — Selected work
            </p>
            <h2 className="h2" id="work-title">
              Things I’ve <span className="it">built.</span>
            </h2>
          </header>
          <p className="lede">
            Agentic AI systems, enterprise RAG pipelines, and distributed
            event-driven architectures from the résumé. Hover or tap any rail to
            expand its architecture.
          </p>
        </div>

        {/* Rail Container */}
        <div className="wk-rail rv">
          {PROJECTS_LIST.map((proj) => {
            const isOpen = openProjectId === proj.id;

            return (
              <article
                key={proj.id}
                onMouseEnter={() => isFinePointer && setOpenProjectId(proj.id)}
                className={`wk-panel ${isOpen ? "is-open" : ""}`}
                aria-labelledby={`wk-${proj.id}-t`}
              >
                {/* Desktop Collapsed Spine Button */}
                <button
                  type="button"
                  className="wk-spine"
                  onClick={() => setOpenProjectId(proj.id)}
                  aria-expanded={isOpen}
                  aria-controls={`wk-${proj.id}`}
                  tabIndex={isOpen ? -1 : 0}
                  aria-label={`Open project ${proj.title}`}
                >
                  <span className="wk-spine-n">{proj.num}</span>
                  <span className="wk-spine-t">{proj.title}</span>
                  <span className="wk-plus" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                  <span className="sr-only">Open project {proj.title}</span>
                </button>

                {/* Mobile Collapsed/Expanded Header Button */}
                <button
                  type="button"
                  className="wk-head"
                  onClick={() => setOpenProjectId(isOpen ? "" : proj.id)}
                  aria-expanded={isOpen}
                  aria-controls={`wk-${proj.id}`}
                >
                  <span className="wk-spine-n">{proj.num}</span>
                  <span className="wk-head-t">{proj.title}</span>
                  <span className="wk-plus" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>

                {/* Expanded Content: Left Text + Right UI */}
                <div
                  id={`wk-${proj.id}`}
                  className="wk-body"
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                >
                  {/* Left Column: Details & Tech */}
                  <div className="wk-text">
                    <div>
                      <p className="wk-kick">
                        <b>{proj.num}</b> {proj.kicker}
                      </p>
                      <h3 id={`wk-${proj.id}-t`}>{proj.title}</h3>
                      <p className="wk-desc">{proj.desc}</p>
                      <ul className="wk-feat">
                        {proj.features.map((feat, i) => (
                          <li key={i}>{feat}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <ul className="wk-tech" aria-label="Tech stack">
                        {proj.techStack.map((tech) => (
                          <li key={tech} className="chip">
                            <TechIcon
                              name={tech}
                              size={14}
                              className="w-3.5 h-3.5"
                            />
                            <span>{tech}</span>
                          </li>
                        ))}
                      </ul>
                      {proj.githubUrl && (
                        <div className="wk-gh">
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

                  {/* Right Column: Illustrative Architecture UI */}
                  <div className="wk-ui" aria-hidden="true">
                    <div className="p-4 sm:p-5 flex flex-col justify-between h-full">
                      {/* Window Bar */}
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
                          Active Architecture
                        </span>
                      </div>

                      {/* Schematic Content */}
                      <div className="my-auto py-3">
                        {proj.diagramType === "devagent" && (
                          <div className="flex flex-col gap-2.5 font-mono text-xs">
                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                              <div className="rounded-lg bg-white p-2.5 shadow-xs">
                                <span className="text-[#6f6b64] block text-[9px]">AGENT 1</span>
                                <strong className="text-[#0d0d0d] text-xs">Supervisor</strong>
                                <p className="text-[9.5px] text-[#6f6b64] mt-0.5">
                                  Task triage &amp; dispatch
                                </p>
                              </div>
                              <div className="rounded-lg bg-white p-2.5 shadow-xs">
                                <span className="text-[#6f6b64] block text-[9px]">AGENT 2</span>
                                <strong className="text-[#0d0d0d] text-xs">Planner</strong>
                                <p className="text-[9.5px] text-[#6f6b64] mt-0.5">
                                  Dependency graph &amp; plan
                                </p>
                              </div>
                              <div className="rounded-lg bg-white p-2.5 shadow-xs">
                                <span className="text-[#6f6b64] block text-[9px]">AGENT 3</span>
                                <strong className="text-[#0d0d0d] text-xs">Coder (ReAct)</strong>
                                <p className="text-[9.5px] text-[#6f6b64] mt-0.5">
                                  File read/write &amp; code gen
                                </p>
                              </div>
                              <div className="rounded-lg bg-accent-soft border border-[rgba(164,71,31,0.22)] p-2.5 shadow-xs">
                                <span className="text-accent block font-semibold text-[9px]">TEST LOOP</span>
                                <strong className="text-[#0d0d0d] text-xs">Tester / Reviewer</strong>
                                <p className="text-[9.5px] text-[#6f6b64] mt-0.5">
                                  pytest execution [PASSED]
                                </p>
                              </div>
                            </div>
                            <div className="rounded-md bg-[#0d0d0d] text-white p-2.5 text-[10px]">
                              <span className="text-[#6f6b64]">$ pytest tests/test_agent.py</span>
                              <div className="text-accent-lit mt-0.5">
                                ✓ test_supervisor_dispatch PASSED [0.12s]
                              </div>
                              <div className="text-accent-lit">
                                ✓ test_send_api_fanout PASSED [0.24s]
                              </div>
                              <div className="text-white/60 text-[9px] mt-0.5">
                                Checkpointed to SQLite · LangSmith traced
                              </div>
                            </div>
                          </div>
                        )}

                        {proj.diagramType === "rag" && (
                          <div className="flex flex-col gap-2.5 font-mono text-xs">
                            <div className="rounded-lg bg-white p-2.5 shadow-xs">
                              <div className="flex justify-between text-[9.5px] text-[#6f6b64] mb-1">
                                <span>INGESTION PIPELINE</span>
                                <span>PDFLoader → RecursiveChunker</span>
                              </div>
                              <div className="w-full bg-[#f4f2ee] h-2 rounded-full overflow-hidden">
                                <div className="bg-[#0d0d0d] h-full w-full" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                              <div className="rounded-lg bg-white p-2.5 shadow-xs">
                                <span className="text-[#6f6b64] block text-[9px]">EMBEDDINGS</span>
                                <strong className="text-[#0d0d0d]">Google Gemini</strong>
                                <span className="block text-[9px] text-[#6f6b64] mt-0.5">
                                  Pinecone top-k similarity
                                </span>
                              </div>
                              <div className="rounded-lg bg-white p-2.5 shadow-xs">
                                <span className="text-[#6f6b64] block text-[9px]">RETRIEVAL</span>
                                <strong className="text-[#0d0d0d]">Hybrid Search</strong>
                                <span className="block text-[9px] text-[#6f6b64] mt-0.5">
                                  Contextual compression
                                </span>
                              </div>
                            </div>
                            <div className="rounded-lg bg-[#0d0d0d] text-white p-2.5 text-[10px]">
                              <span className="text-[#6f6b64] block text-[8.5px]">GENERATION MODEL</span>
                              <span className="text-accent-lit font-semibold">Groq Llama 3.3 70B</span>
                              <p className="text-[9.5px] text-[#b5b2ac] mt-0.5">
                                Grounded source attribution with highlighted citations
                              </p>
                            </div>
                          </div>
                        )}

                        {proj.diagramType === "kukufun" && (
                          <div className="flex flex-col gap-2.5 font-mono text-xs">
                            <div className="rounded-lg bg-white p-2.5 shadow-xs">
                              <div className="flex justify-between items-center text-[9.5px] mb-1.5">
                                <span className="font-semibold text-[#0d0d0d]">Socket.IO Cluster</span>
                                <span className="text-accent bg-accent-soft px-1.5 py-0.5 rounded text-[8.5px]">
                                  Redis Adapter Synced
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-1.5 text-center text-[8.5px] text-[#6f6b64]">
                                <div className="p-1.5 rounded bg-[#f4f2ee]">Instance #1</div>
                                <div className="p-1.5 rounded bg-[#f4f2ee]">Instance #2</div>
                                <div className="p-1.5 rounded bg-[#f4f2ee]">Instance #3</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                              <div className="rounded-lg bg-white p-2.5 shadow-xs">
                                <span className="text-[#6f6b64] block text-[9px]">BROKER</span>
                                <strong className="text-[#0d0d0d]">Apache Kafka</strong>
                                <span className="block text-[9px] text-[#6f6b64] mt-0.5">
                                  SASL/TLS authenticated
                                </span>
                              </div>
                              <div className="rounded-lg bg-white p-2.5 shadow-xs">
                                <span className="text-[#6f6b64] block text-[9px]">PROTECTION</span>
                                <strong className="text-[#0d0d0d]">Rate Limiter</strong>
                                <span className="block text-[9px] text-accent mt-0.5 font-semibold">
                                  30 DMs / 10s window
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {proj.diagramType === "apimonitor" && (
                          <div className="flex flex-col gap-2.5 font-mono text-xs">
                            <div className="rounded-lg bg-white p-2.5 shadow-xs">
                              <span className="text-[#6f6b64] block text-[9px] mb-0.5">
                                EVENT-DRIVEN QUEUES
                              </span>
                              <div className="flex items-center justify-between text-[10px]">
                                <span>RabbitMQ Topic Exchange</span>
                                <span className="text-accent font-bold">99.9% Durable</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                              <div className="rounded-lg bg-white p-2.5 shadow-xs">
                                <span className="text-[#6f6b64] block text-[9px]">RESILIENCE</span>
                                <strong className="text-[#0d0d0d]">Circuit Breakers</strong>
                                <span className="block text-[9px] text-[#6f6b64] mt-0.5">
                                  Exponential backoff retries
                                </span>
                              </div>
                              <div className="rounded-lg bg-white p-2.5 shadow-xs">
                                <span className="text-[#6f6b64] block text-[9px]">STORAGE</span>
                                <strong className="text-[#0d0d0d]">MongoDB &amp; Docker</strong>
                                <span className="block text-[9px] text-[#6f6b64] mt-0.5">
                                  Time-series TTL indexes
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Bottom Tag */}
                      <div className="flex justify-end pt-2">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#6f6b64] bg-white px-2 py-0.5 rounded-full shadow-xs">
                          Live Architecture
                        </span>
                      </div>
                    </div>

                    <span className="wk-ui-label">Illustrative UI</span>
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
