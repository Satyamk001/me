"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PERSONAL_INFO } from "../data/portfolioData";

/** Optional hero intro video. The server component passes this only when the
 *  files actually exist in `public/hero/`, so the hero falls back to the
 *  portrait instead of rendering a broken <video>. */
export type HeroVideo = {
  webm: string | null;
  mp4: string | null;
  poster: string | null;
};

const INTRO =
  "Hi, I'm Satyam Kumar — Software Engineer and AI Engineer building event-driven real-time systems and LangGraph multi-agent architectures at MapmyIndia. Welcome to my portfolio.";

export default function Hero({ video = null }: { video?: HeroVideo | null }) {
  const isVideo = Boolean(video && (video.webm || video.mp4));

  const sectionRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  /** Audio is actually audible right now (video unmuted / speech started). */
  const [soundOn, setSoundOn] = useState(false);
  /** Video only: the browser refused unmuted autoplay, so we are "blocked". */
  const [blocked, setBlocked] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  /** Video: "the intro should be playing" — starts true like the reference, so
   *  the first gesture anywhere can unblock the sound. Speech: "the utterance
   *  should be running" — false until the visitor starts it. */
  const wantsPlayRef = useRef(isVideo);
  const inViewRef = useRef(true);
  const reduceRef = useRef(false);

  /* ---------- reduced motion ------------------------------------------
   * Mirrors the reference: under `prefers-reduced-motion: reduce` nothing
   * starts by itself and the pulsing affordance is suppressed (its
   * animation is disabled globally, so a frozen ring would look broken). */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduceRef.current = mq.matches;
      setReduceMotion(mq.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* ---------- video: unmuted autoplay, then muted fallback ------------- */
  useEffect(() => {
    if (!isVideo) return;
    const v = videoRef.current;
    if (!v) return;
    if (reduceRef.current) {
      wantsPlayRef.current = false;
      return;
    }
    v.muted = false;
    v.play()
      .then(() => setSoundOn(true))
      .catch(() => {
        // Autoplay with sound was refused: loop silently and flag "blocked".
        v.muted = true;
        setBlocked(true);
        v.play().catch(() => {});
      });
  }, [isVideo]);

  /* ---------- video: first gesture anywhere enables sound ------------- */
  useEffect(() => {
    if (!isVideo || !blocked) return;
    const onGesture = (e: Event) => {
      if (btnRef.current && e.target instanceof Node && btnRef.current.contains(e.target)) return;
      const v = videoRef.current;
      if (!v || !wantsPlayRef.current) return;
      v.muted = false;
      (inViewRef.current ? v.play() : Promise.resolve())
        .then(() => {
          setSoundOn(true);
          setBlocked(false);
        })
        .catch(() => {
          v.muted = true;
        });
    };
    const opts = { capture: true, passive: true };
    window.addEventListener("pointerdown", onGesture, opts);
    window.addEventListener("keydown", onGesture, opts);
    window.addEventListener("touchend", onGesture, opts);
    return () => {
      window.removeEventListener("pointerdown", onGesture, opts);
      window.removeEventListener("keydown", onGesture, opts);
      window.removeEventListener("touchend", onGesture, opts);
    };
  }, [isVideo, blocked]);

  /* ---------- start / stop speech ------------------------------------- */
  const startSpeech = useCallback(() => {
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(INTRO);
    utterance.rate = 1;
    utterance.pitch = 1;

    const voices = synth.getVoices();
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

    // Report "sound on" only once the browser really started speaking.
    utterance.onstart = () => {
      wantsPlayRef.current = true;
      setSoundOn(true);
    };
    const stop = () => {
      wantsPlayRef.current = false;
      setSoundOn(false);
    };
    utterance.onend = stop;
    utterance.onerror = stop;

    utteranceRef.current = utterance;
    synth.speak(utterance);
  }, []);

  /* ---------- play / mute button -------------------------------------- */
  const toggleAudio = () => {
    if (isVideo) {
      const v = videoRef.current;
      if (!v) return;
      if (soundOn) {
        v.muted = true;
        wantsPlayRef.current = false;
        setSoundOn(false);
        if (reduceRef.current) v.pause();
        return;
      }
      wantsPlayRef.current = true;
      v.muted = false;
      v.play()
        .then(() => {
          setSoundOn(true);
          setBlocked(false);
        })
        .catch(() => {
          v.muted = true;
        });
      return;
    }

    if (soundOn) {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      utteranceRef.current = null;
      wantsPlayRef.current = false;
      setSoundOn(false);
      return;
    }
    startSpeech();
  };

  /* ---------- viewport / tab lifecycle -------------------------------- */
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec || typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const setInView = (inView: boolean) => {
      inViewRef.current = inView;

      if (isVideo) {
        const v = videoRef.current;
        if (!v) return;
        if (!inView) {
          v.pause();
        } else if (!(reduceRef.current && v.muted)) {
          v.play().catch(() => {});
        }
        return;
      }

      if (!("speechSynthesis" in window)) return;
      if (!inView) {
        window.speechSynthesis.pause();
      } else if (wantsPlayRef.current) {
        window.speechSynthesis.resume();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setInView(entry.intersectionRatio >= 0.35);
      },
      { threshold: [0, 0.2, 0.35, 0.5, 1] }
    );
    observer.observe(sec);

    const handleVisibility = () => {
      if (document.hidden) {
        if (isVideo) videoRef.current?.pause();
        else if ("speechSynthesis" in window) window.speechSynthesis.pause();
        return;
      }
      setInView(inViewRef.current);
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isVideo]);

  useEffect(
    () => () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    },
    []
  );

  const showPing = !soundOn && !reduceMotion && (!isVideo || blocked);

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

        {/* Center Column: Portrait (or intro video) in exact 768/960 stage with multiply blend */}
        <div className="hr-media">
          {isVideo ? (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              poster={video?.poster ?? undefined}
              aria-label={`Video: a short spoken self-introduction by ${PERSONAL_INFO.name}`}
            >
              {video?.webm ? <source src={video.webm} type="video/webm" /> : null}
              {video?.mp4 ? <source src={video.mp4} type="video/mp4" /> : null}
            </video>
          ) : (
            <Image
              src="/my_image_stage.webp"
              alt="Portrait of Satyam Kumar — Software Engineer & AI Engineer"
              fill
              priority
              sizes="(max-width: 860px) 100vw, 832px"
              className="w-full h-full object-contain object-bottom"
            />
          )}

          <button
            ref={btnRef}
            type="button"
            className={`hr-sound${showPing ? " is-blocked" : ""}`}
            onClick={toggleAudio}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Mute the intro audio" : "Play the intro audio with sound"}
            title={soundOn ? "Mute the intro audio" : "Play the intro audio with sound"}
          >
            {soundOn ? (
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
