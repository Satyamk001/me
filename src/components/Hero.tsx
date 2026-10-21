import type { CSSProperties } from "react";
import Image from "next/image";
import { PERSONAL_INFO } from "../data/portfolioData";

export default function Hero() {
  return (
    <section id="hero" className="hr" aria-labelledby="hero-title">
      {/* Giant Background Outlined Ghost Name */}
      <p className="hr-ghost" aria-hidden="true">
        SATYAM
      </p>

      <div className="wrap hr-stage">
        {/* Left Column: Kicker & Display Title */}
        <div className="hr-left">
          <p className="hr-kicker hr-fade" style={{ "--i": 0 } as CSSProperties}>
            <span className="hr-dot" aria-hidden="true" />
            <span>Satyam Kumar · Delhi</span>
          </p>

          <h1 id="hero-title" className="hr-fade" style={{ "--i": 1 } as CSSProperties}>
            <span className="hr-line">Software Engineer &amp;</span>
            <span className="hr-line">
              AI <span className="it">Engineer.</span>
            </span>
          </h1>
        </div>

        {/* Center: Pixel portrait on a printed plinth */}
        <div className="hr-media">
          <div className="hr-sprite-wrap">
            <Image
              src="/hero/satyam-pixel.webp"
              alt="Pixel-art portrait of Satyam Kumar standing with his hands in his pockets"
              width={932}
              height={2918}
              sizes="(max-width: 1023px) 160px, 300px"
              preload
              className="hr-sprite"
            />
            <span className="hr-scan" aria-hidden="true" />
          </div>

          <div className="hr-plinth" aria-hidden="true">
            <span className="hr-plinth-rule" />
            <span className="hr-plinth-label">Pixel portrait</span>
          </div>
        </div>

        {/* Right Column: Bio, CTAs, and Scroll Cue */}
        <div className="hr-right">
          <p className="hr-intro hr-fade" style={{ "--i": 2 } as CSSProperties}>
            Software Engineer with ~1 year of experience building event-driven real-time systems in
            Node.js &amp; TypeScript, now focused on Agentic AI and GenAI engineering. Currently at{" "}
            <strong className="text-[#0d0d0d] font-semibold">{PERSONAL_INFO.currentCompany}</strong>.
          </p>

          <div className="hr-cta hr-fade" style={{ "--i": 3 } as CSSProperties}>
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
              href="/Satyam_Kumar_Resume.pdf"
              download="Satyam_Kumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              title="Download Satyam Kumar's Résumé (PDF)"
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
            style={{ "--i": 4 } as CSSProperties}
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
