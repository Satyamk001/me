"use client";

import React, { useState, useRef, useEffect } from "react";
import { PERSONAL_INFO } from "../data/portfolioData";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const mosaicRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* Clipboard blocked (insecure context or denied permission) — leave the
         label untouched rather than claiming a copy that never happened. */
      setCopied(false);
    }
  };

  const triggerHop = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;
    if (!el.classList.contains("hop")) {
      el.classList.add("hop");
      el.addEventListener("animationend", () => el.classList.remove("hop"), { once: true });
    }
  };

  useEffect(() => {
    const mosaicEl = mosaicRef.current;
    if (!mosaicEl) return;

    const tiles = Array.from(mosaicEl.querySelectorAll<HTMLElement>(".mo-t"));
    let rafId = 0;
    let pointerX = -10000;
    let pointerY = -10000;

    const updateLift = () => {
      rafId = 0;
      const rect = mosaicEl.getBoundingClientRect();
      const tileWidth = rect.width / 8;
      const tileHeight = rect.height / 10;
      const radius = 2.2 * Math.max(tileWidth, tileHeight);

      tiles.forEach((tile, idx) => {
        const col = idx % 8;
        const row = Math.floor(idx / 8);
        const tileCenterX = rect.left + (col + 0.5) * tileWidth;
        const tileCenterY = rect.top + (row + 0.5) * tileHeight;

        const distance = Math.hypot(tileCenterX - pointerX, tileCenterY - pointerY);
        const lift = Math.max(0, 1 - distance / radius);
        tile.style.setProperty("--lift", lift.toFixed(3));
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(updateLift);
      }
    };

    const handlePointerLeave = () => {
      pointerX = -10000;
      pointerY = -10000;
      if (!rafId) {
        rafId = requestAnimationFrame(updateLift);
      }
    };

    // Stagger entrance on scroll intersection
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          mosaicEl.classList.add("is-in");
          setTimeout(() => mosaicEl.classList.add("is-live"), 1600);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(mosaicEl);

    mosaicEl.addEventListener("pointermove", handlePointerMove);
    mosaicEl.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      observer.disconnect();
      mosaicEl.removeEventListener("pointermove", handlePointerMove);
      mosaicEl.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Generate 8x10 mosaic tiles with sliced background image coordinates
  const mosaicTiles = [];
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 8; c++) {
      const idx = r * 8 + c;
      const delay = Math.round((r + (7 - c)) * 45);
      const rot = ((idx * 17) % 11 - 5) * 3;
      // 1:1 square image mapped across 8x10 square tiles (10 tiles wide x 10 tiles high)
      // Horizontally centered across the 10-tile image width (1 tile cropped on left, 1 on right)
      const bx = ((c + 1) / 9) * 100;
      const by = (r / 9) * 100;
      mosaicTiles.push(
        <span
          key={idx}
          className="mo-t"
          style={
            {
              "--bx": `${bx.toFixed(4)}%`,
              "--by": `${by.toFixed(4)}%`,
              "--d": `${delay}ms`,
              "--rot": `${rot}deg`,
            } as React.CSSProperties
          }
        />
      );
    }
  }

  const renderHoppingText = (text: string, accent = false) => {
    return text.split(" ").map((word, wIdx) => (
      <span key={wIdx} className="inline-block whitespace-nowrap mr-3 last:mr-0">
        <span className={accent ? "it" : ""}>
          {word.split("").map((char, cIdx) => (
            <span
              key={cIdx}
              onPointerEnter={triggerHop}
              className="cn-l cursor-default"
            >
              {char}
            </span>
          ))}
        </span>
      </span>
    ));
  };

  return (
    <section id="contact" className="sec pb-0" aria-labelledby="cn-title">
      <div className="wrap">
        <p className="tag">
          <b>06</b> — Contact
        </p>

        {/* Giant Animated Typography with Hover Hop Physics */}
        <h2
          id="cn-title"
          aria-label="Let’s build something together."
          className="text-[clamp(44px,8.2vw,130px)] font-bold tracking-[-0.055em] leading-[0.92] text-[#0d0d0d] my-6 rv"
        >
          <span className="block">{renderHoppingText("Let’s build")}</span>
          <span className="block">
            {renderHoppingText("something")} {renderHoppingText("together.", true)}
          </span>
        </h2>

        {/* Contact Grid: Direct Info Left, Interactive Visual Stamp & Proximity Mosaic Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_360px] gap-12 lg:gap-16 items-end mt-12">
          {/* Left Column */}
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-[clamp(22px,3.6vw,50px)] font-bold tracking-tight text-[#0d0d0d] border-b-2 border-[#0d0d0d] hover:text-accent hover:border-accent transition-colors duration-300"
              >
                {PERSONAL_INFO.email}
              </a>

              <button
                type="button"
                onClick={() => void handleCopy()}
                className={`h-9 px-4 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                  copied
                    ? "bg-[#0d0d0d] text-white"
                    : "bg-white text-[#0d0d0d] shadow-[inset_0_0_0_1px_rgba(13,13,13,0.2)] hover:bg-[#0d0d0d] hover:text-white"
                }`}
                aria-label="Copy email address"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {copied ? (
                    <polyline points="20 6 9 17 4 12" />
                  ) : (
                    <>
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </>
                  )}
                </svg>
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>

              <span role="status" aria-live="polite" className="sr-only">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </div>

            {/* Communication & Social Links */}
            <ul className="list-none p-0 m-0 flex flex-wrap gap-2.5 mt-8">
              <li>
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9+]/g, "")}`}
                  className="btn btn-ghost btn-sm"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{PERSONAL_INFO.phone}</span>
                </a>
              </li>

              <li>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
                  </svg>
                  <span>GitHub</span>
                  <span className="text-[11px]">↗</span>
                </a>
              </li>

              <li>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.6V9h3.5v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" />
                  </svg>
                  <span>LinkedIn</span>
                  <span className="text-[11px]">↗</span>
                </a>
              </li>
            </ul>

            <p className="mt-8 text-sm text-[#6f6b64]">
              {PERSONAL_INFO.title} · {PERSONAL_INFO.currentCompany} · {PERSONAL_INFO.location}
            </p>
          </div>

          {/* Right Column: Rotating Stamp & Interactive 3D Proximity Mosaic Avatar */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Spinning Circular Badge Stamp */}
            <div
              className="absolute -left-6 -top-10 z-20 w-28 h-28 rounded-full bg-[#f4f2ee] shadow-[0_0_0_1px_rgba(13,13,13,0.12)] grid place-items-center select-none pointer-events-none"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 120 120"
                className="absolute inset-0 w-full h-full animate-[cn-spin_18s_linear_infinite]"
              >
                <defs>
                  <path
                    id="circle-text-path"
                    d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0"
                  />
                </defs>
                <text
                  textLength="286"
                  lengthAdjust="spacing"
                  className="font-mono text-[10px] uppercase tracking-widest fill-[#0d0d0d]"
                >
                  <textPath href="#circle-text-path" textLength="286" lengthAdjust="spacing">
                    say hello · open to work · say hello ·
                  </textPath>
                </text>
              </svg>
              <span className="w-10 h-10 rounded-full bg-[#0d0d0d] text-white grid place-items-center font-bold text-sm">
                ↗
              </span>
            </div>

            {/* Interactive Mosaic Grid reacting to cursor proximity */}
            <div
              ref={mosaicRef}
              className="mo max-w-[360px]"
              role="img"
              aria-label={`Interactive portrait mosaic of ${PERSONAL_INFO.name}`}
              style={{ "--src": "url(/my_image.jpeg)" } as React.CSSProperties}
            >
              <div className="mo-grid" aria-hidden="true">
                {mosaicTiles}
              </div>

              {/* Floating Center Identity Badge */}
              <div className="absolute inset-x-4 bottom-4 z-10 rounded-2xl bg-white/90 p-4 shadow-sm backdrop-blur-md flex items-center justify-between pointer-events-none">
                <div>
                  <p className="font-bold text-sm text-[#0d0d0d]">
                    {PERSONAL_INFO.name}
                  </p>
                  <p className="text-[11px] text-[#6f6b64]">
                    {PERSONAL_INFO.currentCompany} · Delhi
                  </p>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#0d0d0d] text-white">
                  Available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-28 py-8 border-t border-[rgba(13,13,13,0.1)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#6f6b64]">
          <span>© 2026 {PERSONAL_INFO.name}. Built with Next.js, Lenis &amp; Tailwind CSS.</span>

          <div className="flex items-center gap-5">
            <a href="/privacy" className="hover:text-[#0d0d0d] transition-colors">
              Privacy
            </a>

            <a
              href="#hero"
              className="inline-flex items-center gap-2 text-[#0d0d0d] font-semibold hover:text-accent transition-colors"
            >
              <span>Back to top</span>
              <span
                className="grid place-items-center w-7 h-7 rounded-full bg-white shadow-[0_0_0_1px_rgba(13,13,13,0.1)]"
                aria-hidden="true"
              >
                ↑
              </span>
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
