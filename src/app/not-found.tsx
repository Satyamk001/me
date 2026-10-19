import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — Satyam Kumar",
  description: "That URL does not exist. Head back to the portfolio.",
};

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
        <div className="wrap relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-[#6f6b64] hover:text-[#0d0d0d] transition-colors"
          >
            <span className="grid place-items-center w-8 h-8 rounded-full text-[11px] font-bold tracking-tight shadow-[inset_0_0_0_1.5px_#0d0d0d] text-[#0d0d0d]">
              SK
            </span>
            Back to portfolio
          </Link>

          <p className="tag mt-12">
            <b>404</b> — Not found
          </p>

          <h1 className="h2 max-w-[20ch]">
            This page took a <span className="it">wrong turn.</span>
          </h1>

          <p className="lede mt-6">
            The URL you followed does not exist on this site. The work, the skills and the
            contact details are all one click away.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/" className="btn btn-primary">
              <span>Back to the portfolio</span>
            </Link>
            <Link href="/#work" className="btn btn-ghost">
              See the work
            </Link>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-[var(--gutter)] bottom-[-3vw] font-extrabold tracking-[-0.06em] leading-none text-[clamp(120px,26vw,420px)] text-transparent z-0"
          style={{ WebkitTextStroke: "1.2px rgba(13, 13, 13, 0.12)" }}
        >
          404
        </span>
      </section>
    </main>
  );
}
