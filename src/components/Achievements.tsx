"use client";

import React, { useRef, useEffect } from "react";
import { ACHIEVEMENTS_LIST } from "../data/portfolioData";

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sec = sectionRef.current;
    const track = trackRef.current;
    const prog = progRef.current;
    if (!sec || !track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>(".ac-card"));
    const animatedCards = new Set<HTMLElement>();
    let maxScroll = 0;
    let rafId = 0;

    /* Phones and reduced-motion users get a natively swipeable row
       instead of the pinned horizontal scroll. */
    const nativeQuery = window.matchMedia("(max-width: 1023px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let native = false;

    const syncMode = () => {
      native = nativeQuery.matches || motionQuery.matches;
      sec.classList.toggle("is-native", native);
      if (native) {
        track.style.transform = "";
        sec.style.height = "";
        prog?.style.removeProperty("--p");
        cards.forEach((card) => card.classList.remove("is-near"));
      }
      return native;
    };

    const animateNumber = (card: HTMLElement) => {
      animatedCards.add(card);
      const targetEl = card.querySelector<HTMLElement>("[data-to]");
      if (!targetEl) return;
      const targetVal = parseFloat(targetEl.dataset.to || "0");
      const isFloat = targetEl.dataset.to?.includes(".");
      const startTime = performance.now();
      const duration = 1400;

      const step = (now: number) => {
        const progress = Math.min(1, (now - startTime) / duration);
        // Quartic ease out
        const eased = 1 - Math.pow(1 - progress, 4);
        const currentVal = eased * targetVal;
        targetEl.textContent = isFloat ? currentVal.toFixed(1) : Math.round(currentVal).toString();
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    };

    const updateMeasurements = () => {
      if (native) return;
      maxScroll = Math.max(0, track.scrollWidth - window.innerWidth + 80);
      sec.style.height = `calc(100svh + ${maxScroll}px)`;
      onScroll();
    };

    const onScroll = () => {
      rafId = 0;
      if (native) return;
      const rect = sec.getBoundingClientRect();
      const scrollRatio = maxScroll > 0 ? Math.min(1, Math.max(0, -rect.top / maxScroll)) : 0;

      track.style.transform = `translate3d(${(-scrollRatio * maxScroll).toFixed(1)}px, 0, 0)`;
      if (prog) {
        prog.style.setProperty("--p", scrollRatio.toFixed(4));
      }

      const viewportCenter = window.innerWidth / 2;
      let nearestIdx = 0;
      let minDistance = Infinity;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const cardRect = card.getBoundingClientRect();
        const distToCenter = Math.abs(cardRect.left + cardRect.width / 2 - viewportCenter);

        if (distToCenter < minDistance) {
          minDistance = distToCenter;
          nearestIdx = i;
        }

        // Trigger number animation when card enters viewport
        if (
          cardRect.left < 0.92 * window.innerWidth &&
          rect.top < 0.6 * window.innerHeight &&
          !animatedCards.has(card)
        ) {
          animateNumber(card);
        }
      }

      const isPinned = rect.top <= 2 && rect.bottom >= window.innerHeight - 2;
      cards.forEach((card, idx) => {
        card.classList.toggle("is-near", isPinned && idx === nearestIdx);
      });

      if (counterRef.current) {
        counterRef.current.textContent = String(nearestIdx + 1).padStart(2, "0");
      }
    };

    const requestTick = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(onScroll);
      }
    };

    syncMode();
    updateMeasurements();
    const resizeObserver = new ResizeObserver(updateMeasurements);
    resizeObserver.observe(track);
    window.addEventListener("resize", updateMeasurements);
    window.addEventListener("scroll", requestTick, { passive: true });

    const handleModeChange = () => {
      if (!syncMode()) updateMeasurements();
    };
    nativeQuery.addEventListener("change", handleModeChange);
    motionQuery.addEventListener("change", handleModeChange);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateMeasurements);
      window.removeEventListener("scroll", requestTick);
      nativeQuery.removeEventListener("change", handleModeChange);
      motionQuery.removeEventListener("change", handleModeChange);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const totalCards = String(ACHIEVEMENTS_LIST.length).padStart(2, "0");

  return (
    <section ref={sectionRef} id="achievements" className="ac" aria-labelledby="ac-title">
      <div className="ac-pin">
        <div className="wrap ac-head">
          <div>
            <p className="tag">
              <b>05</b> — Key metrics
            </p>
            <h2 className="h2" id="ac-title">
              Numbers worth <span className="it">keeping.</span>
            </h2>
          </div>

          {/* Interactive Progress Indicator */}
          <div ref={progRef} className="ac-prog" aria-hidden="true">
            <span>
              <b>
                <span ref={counterRef}>01</span>
              </b>
              <em>/ {totalCards}</em>
            </span>
            <i />
          </div>
        </div>

        {/* Viewport with Horizontal Scroll Track */}
        <div className="ac-viewport">
          <div ref={trackRef} className="ac-track">
            {ACHIEVEMENTS_LIST.map((ach, idx) => (
              <article
                key={ach.id}
                className="ac-card"
                aria-label={`${ach.num}${ach.suffix || ""} ${ach.label} — ${ach.cap}`}
              >
                <div className="flex justify-between items-start">
                  <span className="w-12 h-12 rounded-2xl bg-accent-soft shadow-[0_0_0_1px_rgba(164,71,31,0.16)] grid place-items-center font-mono font-bold text-sm text-accent">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-end justify-between gap-4 mt-6">
                  <div className="max-w-[60%]">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#0d0d0d] leading-tight">
                      {ach.label}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#3a3a3a] mt-1 leading-snug">
                      {ach.cap}
                    </p>
                    <p className="text-[11px] text-[#6f6b64] mt-1 leading-snug">
                      {ach.detail}
                    </p>
                  </div>

                  <div className="text-right whitespace-nowrap">
                    <div className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tighter text-[#0d0d0d] leading-none tabular-nums">
                      <span data-to={ach.num}>{ach.num}</span>
                      {ach.suffix && (
                        <small className="text-lg sm:text-2xl text-[#6f6b64] ml-0.5 font-normal">
                          {ach.suffix}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <p className="flex-none self-center flex items-center gap-3 px-12 font-serif italic text-3xl sm:text-5xl text-[#6f6b64] whitespace-nowrap">
              and counting →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
