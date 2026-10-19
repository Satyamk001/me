"use client";

import React, { useRef, useState, useEffect } from "react";
import { PERSONAL_INFO } from "../data/portfolioData";

export interface HeroVideo {
  webm: string | null;
  mp4: string | null;
  poster: string | null;
}

interface HeroProps {
  video?: HeroVideo | null;
}

export default function Hero({ video }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const wantsSoundRef = useRef(true);
  const inViewRef = useRef(true);
  const lowPowerRef = useRef(false);

  // 1. Initial play attempt on mount: tries unmuted play.
  // If browser blocks unmuted autoplay, it mutes and sets isBlocked = true (triggers .is-blocked pulse ring)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      wantsSoundRef.current = false;
      return;
    }

    video.muted = false;
    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        video.muted = true;
        setIsBlocked(true);
        video.play().catch(() => {});
      });
  }, []);

  // 2. Global interaction unblock:
  // When isBlocked is true, any user interaction on the window (click, tap, keypress)
  // except directly on the sound button unblocks audio and resumes unmuted video playback.
  useEffect(() => {
    if (!isBlocked) return;

    const handleUserInteract = (e: Event) => {
      if (btnRef.current && e.target instanceof Node && btnRef.current.contains(e.target)) {
        return;
      }
      const video = videoRef.current;
      if (video && wantsSoundRef.current) {
        video.muted = false;
        (inViewRef.current ? video.play() : Promise.resolve())
          .then(() => {
            setIsPlaying(true);
            setIsBlocked(false);
          })
          .catch(() => {
            video.muted = true;
          });
      }
    };

    const opts = { capture: true, passive: true };
    window.addEventListener("pointerdown", handleUserInteract, opts);
    window.addEventListener("keydown", handleUserInteract, opts);
    window.addEventListener("touchend", handleUserInteract, opts);

    return () => {
      window.removeEventListener("pointerdown", handleUserInteract, opts);
      window.removeEventListener("keydown", handleUserInteract, opts);
      window.removeEventListener("touchend", handleUserInteract, opts);
    };
  }, [isBlocked]);

  // 3. IntersectionObserver & Tab Visibility:
  // Automatically pauses video when scrolled out of view (threshold < 0.35) or when tab is blurred.
  // Resumes playback when returning into viewport or tab.
  useEffect(() => {
    const sec = sectionRef.current;
    const video = videoRef.current;
    if (!sec || !video || typeof window === "undefined" || !("IntersectionObserver" in window))
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        inViewRef.current = entry.intersectionRatio >= 0.35;
        if (inViewRef.current) {
          if (video.paused && (!lowPowerRef.current || !video.muted)) {
            video.play().catch(() => {});
          }
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.2, 0.35, 0.5, 1] }
    );

    observer.observe(sec);

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        if (inViewRef.current && (!lowPowerRef.current || !video.muted)) {
          video.play().catch(() => {});
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // 4. Sound button toggle: switches between unmuted video with pause icon and muted with play icon
  const handleSoundToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.muted = true;
      wantsSoundRef.current = false;
      setIsPlaying(false);
      if (lowPowerRef.current) {
        video.pause();
      }
    } else {
      wantsSoundRef.current = true;
      video.muted = false;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsBlocked(false);
        })
        .catch(() => {
          video.muted = true;
        });
    }
  };

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
            <span className="hr-line">Software Engineer &amp;</span>
            <span className="hr-line">
              AI <span className="it">Engineer.</span>
            </span>
          </h1>
        </div>

        {/* Center Media: Video element with hero.webm + hero.mp4 + poster.webp & sound toggle button */}
        <div className="hr-media">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            poster={video?.poster || "/hero/poster.webp"}
            aria-label="Video: a short spoken self-introduction by Satyam Kumar"
          >
            <source src={video?.webm || "/hero/hero.webm"} type="video/webm" />
            <source src={video?.mp4 || "/hero/hero.mp4"} type="video/mp4" />
          </video>

          <button
            ref={btnRef}
            type="button"
            className={`hr-sound${isBlocked && !isPlaying ? " is-blocked" : ""}`}
            onClick={handleSoundToggle}
            aria-pressed={isPlaying}
            aria-label={isPlaying ? "Mute the intro video" : "Play the intro video with sound"}
            title={isPlaying ? "Mute the intro video" : "Play the intro video with sound"}
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
            <span className="hr-scroll-icon" aria-hidden="true">
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
            <span className="hr-scroll-text">Scroll</span>
          </a>
        </div>
      </div>
    </section>
  );
}
