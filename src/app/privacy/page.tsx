import type { Metadata } from "next";
import Link from "next/link";
import { PERSONAL_INFO } from "../../data/portfolioData";

export const metadata: Metadata = {
  title: "Privacy — Satyam Kumar",
  description:
    "What this portfolio does and does not collect: no cookies, no analytics, no tracking.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <section className="sec pb-24">
        <div className="wrap max-w-[760px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-[#6f6b64] hover:text-[#0d0d0d] transition-colors"
          >
            <span className="grid place-items-center w-8 h-8 rounded-full text-[11px] font-bold tracking-tight shadow-[inset_0_0_0_1.5px_#0d0d0d] text-[#0d0d0d]">
              SK
            </span>
            Back to portfolio
          </Link>

          <h1 className="h2 mt-12">Privacy</h1>

          <p className="lede mt-6">
            This is a personal portfolio. It has no accounts, no forms, no newsletter and no
            comment section — there is nothing here for you to sign up to.
          </p>

          <dl className="mt-12 grid text-[14.5px]">
            {[
              {
                term: "Cookies",
                detail:
                  "None are set. The site stores nothing in your browser and keeps no local preferences.",
              },
              {
                term: "Analytics",
                detail:
                  "None. No third-party analytics, tag managers, pixels, heatmaps or session recording scripts are loaded.",
              },
              {
                term: "Third parties",
                detail:
                  "Fonts are self-hosted and served from this domain, so no request is made to Google Fonts. No advertising or tracking networks are involved.",
              },
              {
                term: "Server logs",
                detail:
                  "The host records standard request logs (IP address, user agent, timestamp) for security and abuse prevention, as any web server does.",
              },
              {
                term: "Your messages",
                detail:
                  "If you email or call me, I use your details only to reply. Nothing is added to a mailing list or shared with anyone.",
              },
            ].map((row) => (
              <div
                key={row.term}
                className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-2 sm:gap-6 py-5 border-t border-[rgba(13,13,13,0.1)]"
              >
                <dt className="font-mono text-xs uppercase tracking-wide text-[#6f6b64]">
                  {row.term}
                </dt>
                <dd className="text-[#3a3a3a] leading-relaxed">{row.detail}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 text-sm text-[#6f6b64] leading-relaxed">
            Questions about any of this? Email{" "}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-[#0d0d0d] underline underline-offset-2 hover:text-accent transition-colors"
            >
              {PERSONAL_INFO.email}
            </a>
            .
          </p>

          <p className="mt-8 text-xs font-mono text-[#6f6b64]">
            Last updated 19 October 2026
          </p>
        </div>
      </section>
    </main>
  );
}
