"use client";

import React, { useRef, useEffect } from "react";
import { ACHIEVEMENTS_LIST } from "../data/portfolioData";
import TechIcon from "./TechIcon";

/**
 * "05 — Key metrics".
 *
 * The panel pins to the viewport and the card rail travels horizontally as
 * the page scrolls past it — the same behaviour on desktop and mobile, with
 * the card nearest the centre of the screen lifting and the counters in it
 * running up. Only `prefers-reduced-motion` falls back to a swipeable row.
 */
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

    const pin = sec.querySelector<HTMLElement>(".ac-pin");
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".ac-card"));
    const numbers = Array.from(track.querySelectorAll<HTMLElement>("[data-to]"));
    const counted = new Set<HTMLElement>();

    let maxScroll = 0;
    let lastWidth = -1;
    let rafId = 0;
    let native = false;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const countUp = (card: HTMLElement) => {
      counted.add(card);
      const el = card.querySelector<HTMLElement>("[data-to]");
      if (!el) return;

      const target = Number(el.dataset.to);
      if (!Number.isFinite(target)) return;

      const raw = String(el.dataset.to ?? "");
      const decimals = (raw.split(".")[1] || "").length;
      const startedAt = performance.now();

      const step = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / 1400);
        // Quartic ease out
        const eased = 1 - Math.pow(1 - progress, 4);
        const value = target * eased;
        el.textContent = decimals ? value.toFixed(decimals) : String(Math.round(value));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const resetCounters = () => {
      counted.clear();
      numbers.forEach((el) => {
        el.textContent = "0";
      });
    };

    /* Phones and desktop share the pinned rail; reduced motion gets a
       natively swipeable row instead. */
    const syncMode = () => {
      native = motionQuery.matches;
      sec.classList.toggle("is-native", native);

      if (native) {
        track.style.transform = "";
        sec.style.height = "";
        prog?.style.removeProperty("--p");
        cards.forEach((card) => card.classList.remove("is-near"));
        numbers.forEach((el) => {
          el.textContent = String(el.dataset.to);
        });
      }
      return native;
    };

    const onScroll = () => {
      rafId = 0;
      if (native) return;

      const rect = sec.getBoundingClientRect();
      const scrollRatio = maxScroll > 0 ? Math.min(1, Math.max(0, -rect.top / maxScroll)) : 0;

      track.style.transform = `translate3d(${(-scrollRatio * maxScroll).toFixed(1)}px, 0, 0)`;
      prog?.style.setProperty("--p", scrollRatio.toFixed(4));

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

        // Trigger the number animation when the card enters the viewport
        if (
          cardRect.left < 0.92 * window.innerWidth &&
          rect.top < 0.6 * window.innerHeight &&
          !counted.has(card)
        ) {
          countUp(card);
        }
      }

      // Lift the centred card while the section owns the viewport, and as it
      // scrolls into place, so the rail reads as one continuous move.
      const pinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      const lifted = pinned || rect.top < 0.5 * window.innerHeight;
      cards.forEach((card, idx) => {
        card.classList.toggle("is-near", lifted && idx === nearestIdx);
      });

      if (counterRef.current) {
        counterRef.current.textContent = String(nearestIdx + 1).padStart(2, "0");
      }
    };

    const measure = (force = false) => {
      if (native) return;
      // Travel distance is width-driven, so an address-bar resize on mobile
      // does not need to re-measure (and re-measuring would thrash the pin).
      if (!force && window.innerWidth === lastWidth) {
        onScroll();
        return;
      }
      lastWidth = window.innerWidth;
      maxScroll = Math.max(0, track.scrollWidth - window.innerWidth);
      sec.style.height = `calc(${pin?.offsetHeight || window.innerHeight}px + ${maxScroll}px)`;
      onScroll();
    };

    const requestTick = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(onScroll);
      }
    };

    const onResize = () => measure();

    syncMode();
    if (!native) resetCounters();
    measure(true);

    const resizeObserver = new ResizeObserver(() => measure(true));
    resizeObserver.observe(track);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", requestTick, { passive: true });

    const handleModeChange = () => {
      if (syncMode()) return;
      resetCounters();
      measure(true);
    };
    motionQuery.addEventListener("change", handleModeChange);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", requestTick);
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
                  {ach.techStack && (
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/[0.03]">
                      {ach.techStack.map((tech) => (
                        <div
                          key={tech}
                          className="w-6 h-6 rounded-lg bg-white shadow-xs grid place-items-center"
                          title={tech}
                        >
                          <TechIcon name={tech} size={14} className="w-3.5 h-3.5" />
                        </div>
                      ))}
                    </div>
                  )}
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
