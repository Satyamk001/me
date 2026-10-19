"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { PERSONAL_INFO } from "../data/portfolioData";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlocked, setIsBlocked] = useState(true);
  const activeRef = useRef(false);
  const inViewRef = useRef(true);

  // Audio speech introduction toggle
  const toggleAudio = () => {
    if (typeof window === "undefined") return;
    setIsBlocked(false);

    if (isPlaying) {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      activeRef.current = false;
      setIsPlaying(false);
      return;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const text =
        "Hi, I'm Satyam Kumar — Software Engineer and AI Engineer building event-driven real-time systems and LangGraph multi-agent architectures at MapmyIndia. Welcome to my portfolio.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find(
          (v) =>
            v.lang.startsWith("en") &&
            (v.name.includes("Natural") ||
              v.name.includes("Google") ||
              v.name.includes("Samantha") ||
              v.name.includes("Daniel"))
        ) || voices.find((v) => v.lang.startsWith("en"));

      if (preferred) utterance.voice = preferred;

      utterance.onend = () => {
        setIsPlaying(false);
        activeRef.current = false;
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        activeRef.current = false;
      };

      activeRef.current = true;
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Window interaction unblock listener (mirrors reference site)
  useEffect(() => {
    if (!isBlocked) return;
    const handleInteract = (e: Event) => {
      if (btnRef.current && e.target instanceof Node && btnRef.current.contains(e.target)) {
        return;
      }
      setIsBlocked(false);
    };
    const opts = { capture: true, passive: true };
    window.addEventListener("pointerdown", handleInteract, opts);
    window.addEventListener("keydown", handleInteract, opts);
    window.addEventListener("touchend", handleInteract, opts);
    return () => {
      window.removeEventListener("pointerdown", handleInteract, opts);
      window.removeEventListener("keydown", handleInteract, opts);
      window.removeEventListener("touchend", handleInteract, opts);
    };
  }, [isBlocked]);

  // IntersectionObserver: pauses audio when scrolled out of view (threshold 0.35)
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec || typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        inViewRef.current = entry.intersectionRatio >= 0.35;
        if (!inViewRef.current) {
          if ("speechSynthesis" in window) {
            window.speechSynthesis.pause();
          }
        } else if (activeRef.current) {
          if ("speechSynthesis" in window && window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        }
      },
      { threshold: [0, 0.2, 0.35, 0.5, 1] }
    );

    observer.observe(sec);

    const handleVisibility = () => {
      if (document.hidden) {
        if ("speechSynthesis" in window) window.speechSynthesis.pause();
      } else if (inViewRef.current && activeRef.current) {
        if ("speechSynthesis" in window && window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="hr" aria-labelledby="hero-title">
      {/* Giant Background Outlined Ghost Name */}
      <p className="hr-ghost" aria-hidden="true">
        SATYAM
      </p>

      <div className="wrap hr-stage">
        {/* Left Column: Kicker & Display Title */}
        <div className="hr-left">
          <p className="hr-kicker hr-fade" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="hr-dot" aria-hidden="true" />
            <span>Satyam Kumar · Delhi</span>
          </p>

          <h1 id="hero-title" className="hr-fade" style={{ "--i": 1 } as React.CSSProperties}>
            Software Engineer &amp;
            <br />
            AI <span className="it">Engineer.</span>
          </h1>
        </div>

        {/* Center Column: Portrait in exact 768/960 stage with multiply blend */}
        <div className="hr-media">
          <Image
            src="/my_image_stage.webp"
            alt="Portrait of Satyam Kumar — Software Engineer & AI Engineer"
            fill
            priority
            sizes="(max-width: 860px) 100vw, 832px"
            className="w-full h-full object-contain object-bottom"
          />

          <button
            ref={btnRef}
            type="button"
            className={`hr-sound${isBlocked && !isPlaying ? " is-blocked" : ""}`}
            onClick={toggleAudio}
            aria-pressed={isPlaying}
            aria-label={isPlaying ? "Mute the intro audio" : "Play the intro audio with sound"}
            title={isPlaying ? "Mute the intro audio" : "Play the intro audio with sound"}
          >
            {isPlaying ? (
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <rect x="3.5" y="2.5" width="3" height="11" rx="1" />
                <rect x="9.5" y="2.5" width="3" height="11" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M4 2.5v11l9.5-5.5z" />
              </svg>
            )}
          </button>
        </div>

        {/* Right Column: Bio, CTAs, and Scroll Cue */}
        <div className="hr-right">
          <p className="hr-intro hr-fade" style={{ "--i": 2 } as React.CSSProperties}>
            Software Engineer with ~1 year of experience building event-driven real-time systems in
            Node.js &amp; TypeScript, now focused on Agentic AI and GenAI engineering. Currently at{" "}
            <strong className="text-[#0d0d0d] font-semibold">{PERSONAL_INFO.currentCompany}</strong>.
          </p>

          <div className="hr-cta hr-fade" style={{ "--i": 3 } as React.CSSProperties}>
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
                <path d="M4 12h16M14 6l6 6-6 6" />
              </svg>
            </a>

            <a href="#contact" className="btn btn-ghost">
              Let’s talk
            </a>

            <a
              href="/Satyam_Kumar_Resume.txt"
              download="Satyam_Kumar_Resume.txt"
              className="btn btn-ghost"
              title="Download Satyam Kumar's Résumé"
            >
              <span>Résumé</span>
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
                <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
              </svg>
            </a>
          </div>

          <a
            href="#about"
            className="hr-scroll hr-fade"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <span aria-hidden="true">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 4v16M6 14l6 6 6-6" />
              </svg>
            </span>
            <span>Scroll</span>
          </a>
        </div>
      </div>
    </section>
  );
}
